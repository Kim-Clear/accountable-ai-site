# Retinal / Diabetic Retinopathy Referral Support

Reference ID: `PW-004`
Status: `source-extracted`
Original test-library entry:
`BAT-accountability-methodology/BAT-Test-Library/PW-004 NHS Referral Recommendation Support`

## Source References

- NHS England, "Round 1 AI in Health and Care Awards":
  https://www.england.nhs.uk/aac/what-we-do/how-can-the-aac-help-me/ai-award/round-1/
- NHS England, "Digital clinical safety assurance", version 1.2, updated
  4 March 2025:
  https://www.england.nhs.uk/long-read/digital-clinical-safety-assurance/

Accessed: 2026-05-25

## Workflow Summary

The NHS England Round 1 AI in Health and Care Awards page describes OptosAI as
using machine learning to analyse images of the back of the eye for the presence
or severity of diabetic retinopathy, and to advise whether referral to an eye
care specialist is needed based on the local clinical pathway.

## What the AI Does

The AI analyses retinal images and advises whether referral to an eye care
specialist is needed.

## Who Relies on the Output

Clinicians and eye-care pathways responsible for diabetic retinopathy referral
and follow-up.

## Action That Follows

Referral may be triggered or avoided based on the AI recommendation and the
local clinical pathway.

## Human Review or Oversight

The published source describes the system as advising on referral rather than
autonomously ordering care. Human oversight is inferred through the local
clinical pathway, but the public award page does not describe the full review
process.

## Impact Type

Individual patients, with possible aggregate effect on referral capacity and
screening pathway workload.

## Published Governance or Safety Controls

The source explicitly refers to local clinical pathway dependence. Wider
relevant controls may include DCB0129/DCB0160 clinical safety assurance,
clinical risk assessment, hazard logs, clinical safety case reports, and
Clinical Safety Officer oversight.

## BAT Reliance Point

Reliance appears to occur when the AI referral advice shapes whether the patient
is referred to specialist eye care.

## BAT Questions

- Is the AI referral advice recorded with the image and pathway decision?
- What evidence shows clinician acceptance, override, or review?
- Can local pathway rules in force at the time be reconstructed?
- How are false negatives, false positives, and delayed referrals monitored?
- Who is accountable for threshold setting and pathway changes?

## Evidence Gaps for Follow-Up

- The public award page gives only a short product description.
- Local protocol, implementation, audit, and evaluation material would be needed
  before using this entry for BAT validation claims.
