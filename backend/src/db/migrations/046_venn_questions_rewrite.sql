-- Migration: 046_venn_questions_rewrite
-- Description: Rewrite venn-diagram questions to remove explicit math notation
-- The user should figure out the operation from context, not be spoon-fed symbols

-- ============================================================
-- 008 seed applets (matched by title since they have no fixed IDs)
-- ============================================================

UPDATE applets SET
  question = 'Color the region where A and B overlap.',
  hint = 'Look for the area that belongs to BOTH sets at the same time.'
WHERE type = 'venn-diagram' AND title = 'Set Intersection';

UPDATE applets SET
  question = 'Color every region that belongs to A, B, or both.',
  hint = 'If it touches either circle, select it.'
WHERE type = 'venn-diagram' AND title = 'Set Union';

UPDATE applets SET
  title = 'Not in A',
  question = 'Color everything that is NOT inside A.',
  hint = 'Select every region that does not touch circle A — including outside both circles.'
WHERE type = 'venn-diagram' AND title = 'Complement of A';

UPDATE applets SET
  question = 'Color the regions that belong to exactly one set — A or B, but not both.',
  hint = 'Exclude the overlapping area in the middle.'
WHERE type = 'venn-diagram' AND title = 'Symmetric Difference';

-- ============================================================
-- 038 course applets (matched by fixed UUID)
-- ============================================================

-- Lesson 2.1 — Intersection
UPDATE applets SET
  title = 'Both A and B',
  question = 'Color the region shared by both A and B.',
  hint = 'Select only the overlapping area.'
WHERE id = 'a0040000-0000-0000-0000-000000000001';

-- Lesson 2.2 — Union
UPDATE applets SET
  title = 'All of A and B',
  question = 'Color every part of both circles — anything that belongs to A, B, or both.',
  hint = 'Select ALL colored regions — both circles completely.'
WHERE id = 'a0050000-0000-0000-0000-000000000001';

-- Lesson 2.4 — Set Difference
UPDATE applets SET
  title = 'A without B',
  question = 'Color the part of A that does NOT overlap with B.',
  hint = 'This is the portion of A that is exclusively its own.'
WHERE id = 'a0070000-0000-0000-0000-000000000001';

-- Lesson 2.4 — Symmetric Difference
UPDATE applets SET
  title = 'Exclusive Parts',
  question = 'Color the parts that belong to exactly one set — either A alone or B alone, not both.',
  hint = 'Select the non-overlapping parts of both circles.'
WHERE id = 'a0070000-0000-0000-0000-000000000002';

-- Lesson 2.5 — Complement of Union review
UPDATE applets SET
  title = 'Review: Outside Both',
  question = 'Color everything that is NOT in A and NOT in B.',
  hint = 'Nothing inside either circle should be selected.'
WHERE id = 'a0080000-0000-0000-0000-000000000002';

-- Lesson 3.1 — Center of Three
UPDATE applets SET
  title = 'Center of Three',
  question = 'Color the region where ALL three sets overlap.',
  hint = 'It is the very center of all three circles.'
WHERE id = 'a0090000-0000-0000-0000-000000000001';

-- Lesson 3.2 — A or B but not C
UPDATE applets SET
  title = 'A or B, not C',
  question = 'Color all regions that are in A or B (or both) but NOT in C.',
  hint = 'Select everything in circles A and B, but exclude any part that touches C.'
WHERE id = 'a0100000-0000-0000-0000-000000000001';

-- Lesson 4.2 — De Morgan verify 1
UPDATE applets SET
  title = 'Not in the Overlap',
  question = 'Color everything that is NOT in the shared region of A and B.',
  hint = 'Select everything except the center overlap.'
WHERE id = 'a0130000-0000-0000-0000-000000000002';

-- Lesson 4.2 — De Morgan verify 2
UPDATE applets SET
  title = 'Outside A or Outside B',
  question = 'Color every region that is outside A, outside B, or both. Does it match your previous answer?',
  hint = 'If a point is missing from at least one circle, select it.'
WHERE id = 'a0130000-0000-0000-0000-000000000003';

-- Lesson 4.3 — Challenge complex region
UPDATE applets SET
  title = 'Challenge: A or B, excluding C',
  question = 'Color the regions that belong to A or B, but leave out anything in C.',
  hint = 'First think about everything in A or B, then remove the parts that touch C.'
WHERE id = 'a0140000-0000-0000-0000-000000000001';
