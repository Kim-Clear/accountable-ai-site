# AI Skin Lesion Triage With DERM

Reference ID: `PW-002`
Status: `source-extracted`
Original test-library entry:
`BAT-accountability-methodology/BAT-Test-Library/PW-002 NHS Skin Lesion Triage`

## Source References

- NHS England, "AI based skin lesion analysis technology":
  https://www.england.nhs.uk/elective-care/best-practice-solutions/ai-based-skin-lesion-analysis-technology/
- NICE, "Artificial intelligence (AI) for assessing and triaging skin lesions
  referred to the urgent suspected skin cancer pathway" (HTE24), linked from
  NHS England source:
  https://www.nice.org.uk/

Accessed: 2026-05-25

## Workflow Summary

DERM is used in teledermatology pathways after referral from primary care. A
smartphone and dermoscopic lens are used to capture lesion images, which are
uploaded to the DERM platform for AI-based analysis and suspected diagnosis.

## What the AI Does

DERM analyses dermoscopic images using a fixed algorithm and provides a
suspected diagnosis. It helps decide whether further dermatologist assessment is
needed.

## Who Relies on the Output

NHS dermatology services, teledermatology pathways, clinicians, and pathway
staff responsible for triage and management.

## Action That Follows

If DERM labels a lesion as benign, the person can be discharged from the urgent
suspected skin cancer pathway with advice to monitor and seek further advice if
needed. If DERM labels the lesion as pre-cancer or cancer, an NHS dermatologist
reviews the case and decides the management plan.

## Human Review or Oversight

DERM is authorised for use as an automated tool or with a healthcare
professional "second read". NHS England recommends that sites consider using a
second clinical read when DERM is first introduced. NHS England also recommends
a second read for patients with black or brown skin throughout the 3-year
evidence generation period.

## Impact Type

Individual patients, with possible aggregate waiting-list and dermatology
capacity impact.

## Published Governance or Safety Controls

Published controls include NICE early value assessment, conditional
recommendation over a 3-year evidence generation period, patient information and
informed consent, local implementation guidance, second-read recommendations,
data collection for evidence generation, an independent data oversight group,
and a GIRFT community of practice.

## BAT Reliance Point

Reliance appears to occur when the AI-generated classification is used to route
the person toward discharge, second read, or dermatologist review.

## BAT Questions

- What evidence is retained when DERM labels a lesion benign and the patient is
  discharged?
- How is second-read activity documented?
- Can later reviewers reconstruct whether autonomous use or second-read use was
  in place at the site and date of decision?
- How are patient consent, image quality, lesion metadata, and advice recorded?
- What is the escalation path when AI output, clinician judgement, or patient
  concern diverge?

## Evidence Gaps for Follow-Up

- Local site implementation details will vary and are not fully captured by the
  national summary.
- The public page does not provide an operational example of a complete patient
  record or audit trail.
