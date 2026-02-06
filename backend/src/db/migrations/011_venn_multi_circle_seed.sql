-- Seed Venn diagrams with 3, 4, and 5 circles
INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
  'venn-diagram',
  'Three-Way Classification',
  'Color the regions representing items that are both mammals AND pets but NOT farm animals.',
  'Think about which animals fit in exactly two categories.',
  '{
    "labels": ["Mammals", "Pets", "Farm Animals"],
    "correctRegions": ["AB"]
  }'::jsonb,
  2,
  ARRAY['logic', 'sets', 'classification']
),
(
  'venn-diagram',
  'Triple Intersection',
  'Highlight all regions that include at least TWO of: Fruits, Red items, Round items.',
  'Look for overlaps between any two or all three circles.',
  '{
    "labels": ["Fruits", "Red", "Round"],
    "correctRegions": ["AB", "AC", "BC", "ABC"]
  }'::jsonb,
  2,
  ARRAY['logic', 'sets', 'math']
),
(
  'venn-diagram',
  'Four Set Problem',
  'Select regions representing things that are BOTH electronic AND portable.',
  'Electronic AND portable means the intersection of those two sets.',
  '{
    "labels": ["Electronic", "Portable", "Expensive", "Work-related"],
    "correctRegions": ["AB", "ABC", "ABD", "ABCD"]
  }'::jsonb,
  3,
  ARRAY['logic', 'sets', 'classification']
),
(
  'venn-diagram',
  'Exclusive Categories',
  'Find the region for items that are ONLY in Science (not Math, not History, not Art).',
  'Look for the part of Science that does not overlap with any other circle.',
  '{
    "labels": ["Science", "Math", "History", "Art"],
    "correctRegions": ["A"]
  }'::jsonb,
  3,
  ARRAY['logic', 'sets', 'education']
),
(
  'venn-diagram',
  'Five Set Challenge',
  'Highlight the center region where ALL five categories overlap.',
  'The center is where all circles intersect.',
  '{
    "labels": ["A", "B", "C", "D", "E"],
    "correctRegions": ["ABCDE"]
  }'::jsonb,
  4,
  ARRAY['logic', 'sets', 'advanced']
),
(
  'venn-diagram',
  'Complex Union',
  'Select all regions that are in A OR B (or both), but NOT in C.',
  'Include anything touching A or B that does not touch C.',
  '{
    "labels": ["Set A", "Set B", "Set C"],
    "correctRegions": ["A", "B", "AB"]
  }'::jsonb,
  3,
  ARRAY['logic', 'sets', 'math']
);
