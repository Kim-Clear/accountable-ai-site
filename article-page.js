(async () => {
  const target = document.getElementById("article-detail");
  if (!target) return;

  const params = new URLSearchParams(window.location.search);
  const articlePath = params.get("path");
  const imagePath = params.get("image");

  const escapeHTML = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const firstHeading = (markdown) => {
    const firstLine = markdown
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find(Boolean);

    if (firstLine && !firstLine.startsWith("#")) return firstLine;

    const heading = markdown.match(/^#{1,6}\s*(.+)$/m);
    return heading ? heading[1].trim() : firstLine || "Article";
  };

  const dateFromMarkdown = (markdown) => {
    const writtenDate = markdown.match(
      /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/i
    );

    return writtenDate ? writtenDate[0] : "";
  };

  const formatDate = (date) =>
    date
      ? new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(date))
      : "";

  const inlineMarkdown = (text) =>
    escapeHTML(text)
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");

  const markdownToHTML = (markdown) => {
    const lines = markdown.split(/\r?\n/);
    const blocks = [];
    let paragraph = [];
    let list = [];

    const flushParagraph = () => {
      if (!paragraph.length) return;
      blocks.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    };

    const flushList = () => {
      if (!list.length) return;
      blocks.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      list = [];
    };

    lines.forEach((rawLine) => {
      const line = rawLine.trim();

      if (!line) {
        flushParagraph();
        flushList();
        return;
      }

      const heading = line.match(/^(#{2,6})\s*(.+)$/);
      if (heading) {
        flushParagraph();
        flushList();
        const level = Math.min(heading[1].length, 4);
        blocks.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
        return;
      }

      const bullet = line.match(/^[-*]\s+(.+)$/);
      if (bullet) {
        flushParagraph();
        list.push(bullet[1]);
        return;
      }

      if (line.startsWith(">")) {
        flushParagraph();
        flushList();
        blocks.push(`<blockquote>${inlineMarkdown(line.replace(/^>\s*/, ""))}</blockquote>`);
        return;
      }

      if (!line.startsWith("#")) paragraph.push(line);
    });

    flushParagraph();
    flushList();

    return blocks.join("");
  };

  const articleBodyMarkdown = (markdown, title) => {
    const lines = markdown.split(/\r?\n/);
    let skippedTitle = false;

    return lines
      .filter((line) => {
        const trimmed = line.trim();

        if (!skippedTitle) {
          const normalizedTitle = trimmed.replace(/^#{1,6}\s*/, "");
          if (normalizedTitle === title) {
            skippedTitle = true;
            return false;
          }
        }

        if (/^Kim Stevens$/i.test(trimmed)) return false;
        if (/^(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}$/i.test(trimmed)) {
          return false;
        }

        return true;
      })
      .join("\n");
  };

  if (!articlePath || !articlePath.startsWith("articles/") || !articlePath.endsWith(".md")) {
    target.innerHTML = "<p>Article not found.</p>";
    return;
  }

  try {
    const response = await fetch(articlePath);
    if (!response.ok) throw new Error("Article request failed");

    const markdown = await response.text();
    const title = firstHeading(markdown);
    const date = formatDate(dateFromMarkdown(markdown));

    document.title = `${title} | Accountable AI`;
    target.innerHTML = `
      <a class="article-back-link" href="index.html#recent-insights">Back to recent insights</a>
      <header class="article-detail-header">
        <p class="eyebrow">Recent insight</p>
        <h1>${escapeHTML(title)}</h1>
        ${date ? `<p class="article-detail-date">${escapeHTML(date)}</p>` : ""}
      </header>
      ${
        imagePath
          ? `<img class="article-detail-image" src="${escapeHTML(imagePath)}" alt="" />`
          : ""
      }
      <div class="article-content">
        ${markdownToHTML(articleBodyMarkdown(markdown, title))}
      </div>
    `;
  } catch (error) {
    target.innerHTML = "<p>Article could not be loaded.</p>";
  }
})();
