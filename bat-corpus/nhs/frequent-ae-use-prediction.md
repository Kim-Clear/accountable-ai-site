# Predicting Frequent A&E Use

Reference ID: `PW-001`
Status: `source-extracted`
Original test-library entry:
`BAT-accountability-methodology/BAT-Test-Library/PW-001 NHS Frequent A&E User Prediction`

## Source References

- NHS England, "NHS artificial intelligence (AI) giving patients better care and
  support", 12 December 2024:
  https://www.england.nhs.uk/2024/12/nhs-ai-giving-patients-better-care-and-support/
- NHS England, "Digital clinical safety assurance", version 1.2, updated
  4 March 2025:
  https://www.england.nhs.uk/long-read/digital-clinical-safety-assurance/

Accessed: 2026-05-25

## Workflow Summary

NHS teams use routinely collected hospital data and AI-powered prediction
software to identify patients who may be at risk of frequently attending A&E.
The workflow is connected to High Intensity Use services and earlier
preventative support.

## What the AI Does

The AI uses routinely collected hospital data to identify patients who may
require immediate preventative support to avoid future unplanned hospital visits.

## Who Relies on the Output

NHS teams and healthcare professionals involved in High Intensity Use pathways
and community-based preventative support.

## Action That Follows

Staff proactively reach out to identified patients and offer personalised
preventative support, self-management advice, and community-based intervention.

## Human Review or Oversight

Human involvement is present because a healthcare professional contacts the
patient and provides support. The published source frames AI as identifying who
may need support, not as replacing care decisions.

## Impact Type

Individual patients, with possible aggregate service impact through reduced A&E
attendance and pressure on emergency services.

## Published Governance or Safety Controls

The workflow source describes targeted outreach and earlier support for
vulnerable patients. It does not describe a workflow-specific AI safety case.

Relevant wider NHS safety controls include DCB0129 and DCB0160 clinical risk
management, clinical risk assessment, hazard logs, clinical safety cases, and
Clinical Safety Officer responsibilities for relevant health IT.

## BAT Reliance Point

Reliance appears to occur when teams use the AI-generated risk identification to
decide which patients should receive outreach and preventative support.

## BAT Questions

- What evidence shows why a patient was selected for outreach?
- Is the AI-generated risk flag visible, recorded, or explainable in the
  operational record?
- Who is accountable for deciding that outreach is appropriate?
- What happens to patients not flagged by the system?
- Is there monitoring for false positives, false negatives, and equity impact?

## Evidence Gaps for Follow-Up

- Local implementation controls are not described in the public article.
- The source does not specify model performance, threshold setting, appeal or
  correction routes, audit logs, or patient communication about AI involvement.
