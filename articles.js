(async () => {
  const target = document.getElementById("recent-articles");
  if (!target) return;
  const section = document.getElementById("recent-insights");
  const githubContentsApi =
    "https://api.github.com/repos/Kim-Clear/accountable-ai-site/contents/articles";

  const escapeHTML = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const markdownToExcerpt = (markdown) => {
    const lines = markdown
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(
        (line) =>
          line &&
          !line.startsWith("#") &&
          !line.startsWith("!") &&
          !/^Kim Stevens$/i.test(line) &&
          !/^(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}$/i.test(line)
      );

    if (lines.length > 1) lines.shift();

    return lines
      .join(" ")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`]/g, "")
      .slice(0, 220)
      .replace(/\s+\S*$/, "");
  };

  const firstHeading = (markdown, fallback) => {
    const firstLine = markdown
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find(Boolean);

    if (firstLine && !firstLine.startsWith("#")) return firstLine;

    const heading = markdown.match(/^#{1,6}\s*(.+)$/m);
    if (heading) return heading[1].trim();

    return firstLine || fallback;
  };

  const frontMatterValue = (markdown, key) => {
    const match = markdown.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
    return match ? match[1].replace(/^["']|["']$/g, "").trim() : "";
  };

  const dateFromMarkdown = (markdown) => {
    const frontMatterDate = frontMatterValue(markdown, "date");
    if (frontMatterDate) return frontMatterDate;

    const isoDate = markdown.match(/\b\d{4}-\d{2}-\d{2}\b/);
    if (isoDate) return isoDate[0];

    const writtenDate = markdown.match(
      /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/i
    );

    return writtenDate ? writtenDate[0] : "";
  };

  const pathForBrowser = (path) => encodeURI(path).replace(/#/g, "%23");
  const articlePageHref = (path, image) => {
    const params = new URLSearchParams({ path });
    if (image) params.set("image", image);
    return `article.html?${params.toString()}`;
  };

  const articleFromFiles = (files) => {
    const markdownFile = files.find(
      (file) => file.type === "file" && file.name.toLowerCase().endsWith(".md")
    );
    const imageFile = files.find(
      (file) =>
        file.type === "file" &&
        /\.(png|jpe?g|webp|gif)$/i.test(file.name)
    );

    if (!markdownFile || !imageFile) return null;

    return {
      markdown: pathForBrowser(markdownFile.path),
      image: pathForBrowser(imageFile.path),
    };
  };

  const discoverFromGithub = async () => {
    const rootResponse = await fetch(githubContentsApi);
    if (!rootResponse.ok) return [];

    const rootItems = await rootResponse.json();
    const folders = rootItems.filter((item) => item.type === "dir");
    const articles = await Promise.all(
      folders.map(async (folder) => {
        const folderResponse = await fetch(folder.url);
        if (!folderResponse.ok) return null;

        return articleFromFiles(await folderResponse.json());
      })
    );

    return articles.filter(Boolean);
  };

  const linksFromDirectory = async (path) => {
    const response = await fetch(path);
    if (!response.ok) return [];

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    return [...doc.querySelectorAll("a")]
      .map((link) => link.getAttribute("href"))
      .filter(Boolean);
  };

  const discoverArticles = async () => {
    try {
      const githubArticles = await discoverFromGithub();
      if (githubArticles.length) return githubArticles;
    } catch (error) {
      // Keep trying local sources when the deployed discovery route is unavailable.
    }

    try {
      const manifestResponse = await fetch("articles/index.json");
      if (manifestResponse.ok) return manifestResponse.json();
    } catch (error) {
      // Directory listing below is the final fallback for local previews.
    }

    const folders = (await linksFromDirectory("articles/"))
      .filter((href) => href.endsWith("/") && !href.startsWith(".") && href !== "../")
      .map((href) => `articles/${href.replace(/^articles\//, "")}`);

    const discovered = await Promise.all(
      folders.map(async (folder) => {
        const links = await linksFromDirectory(folder);
        const markdownFile =
          links.find((href) => href.endsWith(".md")) || "index.md";
        const imageFile =
          links.find((href) => href.toLowerCase().endsWith(".png")) || "image.png";
        const markdown = pathForBrowser(`${folder}${markdownFile}`);

        return {
          markdown,
          image: pathForBrowser(`${folder}${imageFile}`),
        };
      })
    );

    return discovered;
  };

  try {
    const articles = await discoverArticles();
    const hydrated = await Promise.all(
      articles
        .filter((article) => article.markdown && article.image)
        .map(async (article) => {
          const markdownResponse = await fetch(article.markdown);
          if (!markdownResponse.ok) return null;

          const markdown = await markdownResponse.text();
          const date =
            article.date ||
            dateFromMarkdown(markdown) ||
            (article.markdown.match(/(\d{4}-\d{2}-\d{2})/) || [])[1];

          return {
            ...article,
            markdownContent: markdown,
            date,
          };
        })
    );

    const latest = hydrated
      .filter(Boolean)
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    const cards = latest.map((article) => {
        const markdown = article.markdownContent;
        const title = article.title || firstHeading(markdown, "Observation");
        const excerpt = article.excerpt || markdownToExcerpt(markdown);
        const href =
          article.href && !article.href.toLowerCase().endsWith(".md")
            ? article.href
            : articlePageHref(article.markdown, article.image);
        const date = article.date
          ? new Intl.DateTimeFormat("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(article.date))
          : "";

        return `
          <article class="article-card">
            <a class="article-image-link" href="${escapeHTML(href)}" aria-label="${escapeHTML(title)}">
              <img src="${escapeHTML(article.image)}" alt="${escapeHTML(article.imageAlt || "")}" />
            </a>
            <div class="article-card-body">
              ${date ? `<p class="article-date">${escapeHTML(date)}</p>` : ""}
              <h3><a href="${escapeHTML(href)}">${escapeHTML(title)}</a></h3>
              <p>${escapeHTML(excerpt)}...</p>
            </div>
          </article>
        `;
      });

    if (!cards.length) return;

    target.innerHTML = cards.join("");
    if (section) section.hidden = false;
  } catch (error) {
    if (target.children.length && section) section.hidden = false;
  }
})();
