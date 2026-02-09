-- Migration: 038_venn_diagram_course
-- Description: Seed the first course - Venn Diagrams - with units, lessons, and applets

-- =================================================================
-- COURSE
-- =================================================================
INSERT INTO courses (id, title, description, emoji, color, is_published, sort_order) VALUES
('c0000000-0000-0000-0000-000000000001', 'Venn Diagrams', 'Master set theory visually — from basic regions to multi-circle logic puzzles.', '⭕', '#1CB0F6', true, 1);

-- =================================================================
-- UNIT 1: Foundations — What Is a Set?
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Foundations', 'Learn what sets are and how to read a Venn diagram.', 1);

-- Lesson 1.1 — Identify sets (Remember level)
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'What Is a Set?', 'Learn to identify and describe sets.', '📦', 1, 10);

-- Applets for lesson 1.1
INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0010000-0000-0000-0000-000000000001', 'mcq', 'Definition of a Set', 'Which of the following is a well-defined set?', 'A set must have a clear rule for membership.',
'{"options":[{"id":"a","text":"All tall people"},{"id":"b","text":"All even numbers less than 10"},{"id":"c","text":"Nice colors"},{"id":"d","text":"Good movies"}],"correctOptionId":"b"}', 1, ARRAY['sets','venn','foundations']),
('a0010000-0000-0000-0000-000000000002', 'mcq', 'Set Notation', 'How is the set of vowels written in roster form?', 'List each element inside curly braces.',
'{"options":[{"id":"a","text":"{a, e, i, o, u}"},{"id":"b","text":"(a, e, i, o, u)"},{"id":"c","text":"[a, e, i, o, u]"},{"id":"d","text":"{vowels}"}],"correctOptionId":"a"}', 1, ARRAY['sets','venn','notation']),
('a0010000-0000-0000-0000-000000000003', 'fill-blanks', 'Set Membership', 'Complete: An element that belongs to set A is written as ___.', 'Use the "element of" symbol.',
'{"segments":[{"type":"text","content":"An element x that belongs to set A is written as x "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" A."}],"answerBlocks":[{"id":"ans1","content":"∈"},{"id":"d1","content":"⊂"},{"id":"d2","content":"∪"},{"id":"d3","content":"="}]}', 1, ARRAY['sets','venn','notation']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000001', 'a0010000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000001', 'a0010000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000001', 'a0010000-0000-0000-0000-000000000003', 3);

-- Lesson 1.2 — Reading Venn diagrams (Understand level)
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'Reading Venn Diagrams', 'Understand regions of a two-circle Venn diagram.', '👁️', 2, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0020000-0000-0000-0000-000000000001', 'venn-diagram', 'Find A Only', 'Color the region that contains elements ONLY in set A (not in B).', 'Exclude anything that overlaps with B.',
'{"labels":["A","B"],"correctRegions":["a-only"]}', 1, ARRAY['sets','venn','regions']),
('a0020000-0000-0000-0000-000000000002', 'venn-diagram', 'Find B Only', 'Color the region that contains elements ONLY in set B.', 'Exclude the overlap with A.',
'{"labels":["A","B"],"correctRegions":["b-only"]}', 1, ARRAY['sets','venn','regions']),
('a0020000-0000-0000-0000-000000000003', 'venn-diagram', 'Find the Overlap', 'Color the region where both sets A and B overlap.', 'This is the area inside both circles.',
'{"labels":["A","B"],"correctRegions":["a-and-b"]}', 1, ARRAY['sets','venn','regions']),
('a0020000-0000-0000-0000-000000000004', 'mcq', 'Outside Both Sets', 'What is the region outside both circles called?', 'It contains elements in neither set.',
'{"options":[{"id":"a","text":"The complement of A ∪ B"},{"id":"b","text":"The intersection"},{"id":"c","text":"The union"},{"id":"d","text":"Set A minus B"}],"correctOptionId":"a"}', 1, ARRAY['sets','venn','regions']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000002', 'a0020000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000002', 'a0020000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000002', 'a0020000-0000-0000-0000-000000000003', 3),
('d0000000-0000-0000-0000-000000000002', 'a0020000-0000-0000-0000-000000000004', 4);

-- Lesson 1.3 — Unit 1 Checkpoint Review
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'Foundations Review', 'Test your understanding of basic set concepts.', '🏁', 3, 15, true);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0030000-0000-0000-0000-000000000001', 'mcq', 'Review: Set Definition', 'Which statement about sets is FALSE?', 'Sets have well-defined elements and no duplicates.',
'{"options":[{"id":"a","text":"Sets can contain numbers, letters, or objects"},{"id":"b","text":"A set can have duplicate elements"},{"id":"c","text":"The empty set has no elements"},{"id":"d","text":"Sets are denoted with curly braces"}],"correctOptionId":"b"}', 1, ARRAY['sets','venn','review']),
('a0030000-0000-0000-0000-000000000002', 'venn-diagram', 'Review: Outside Both', 'Color the region that is in neither A nor B.', 'Look for the area outside both circles.',
'{"labels":["A","B"],"correctRegions":["neither"]}', 1, ARRAY['sets','venn','review']),
('a0030000-0000-0000-0000-000000000003', 'match-pairs', 'Review: Region Names', 'Match each Venn diagram region to its description.', 'Think about what each region contains.',
'{"leftItems":[{"id":"l1","text":"A ∩ B"},{"id":"l2","text":"A only"},{"id":"l3","text":"Neither"},{"id":"l4","text":"B only"}],"rightItems":[{"id":"r1","text":"Elements in both sets"},{"id":"r2","text":"Outside all circles"},{"id":"r3","text":"In A but not B"},{"id":"r4","text":"In B but not A"}],"correctPairs":{"l1":"r1","l2":"r3","l3":"r2","l4":"r4"},"leftColumnLabel":"Symbol","rightColumnLabel":"Meaning"}', 1, ARRAY['sets','venn','review']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000003', 'a0030000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000003', 'a0030000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000003', 'a0030000-0000-0000-0000-000000000003', 3);

-- =================================================================
-- UNIT 2: Set Operations
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'Set Operations', 'Apply union, intersection, complement, and difference.', 2);

-- Lesson 2.1 — Intersection (Apply level)
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000002', 'Intersection', 'Elements in BOTH sets at the same time.', '🔗', 1, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0040000-0000-0000-0000-000000000001', 'venn-diagram', 'A ∩ B', 'Color the intersection of A and B.', 'Select only the overlapping area.',
'{"labels":["A","B"],"correctRegions":["a-and-b"]}', 1, ARRAY['sets','venn','intersection']),
('a0040000-0000-0000-0000-000000000002', 'mcq', 'Intersection Meaning', 'If A = {1,2,3,4} and B = {3,4,5,6}, what is A ∩ B?', 'Find elements common to both.',
'{"options":[{"id":"a","text":"{3, 4}"},{"id":"b","text":"{1, 2, 3, 4, 5, 6}"},{"id":"c","text":"{1, 2}"},{"id":"d","text":"{5, 6}"}],"correctOptionId":"a"}', 1, ARRAY['sets','venn','intersection']),
('a0040000-0000-0000-0000-000000000003', 'fill-blanks', 'Intersection Symbol', 'The symbol for intersection is ___ and it means elements in ___ sets.', 'The symbol looks like an upside-down U.',
'{"segments":[{"type":"text","content":"The symbol for intersection is "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" and it means elements in "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" sets."}],"answerBlocks":[{"id":"ans1","content":"∩"},{"id":"ans2","content":"both"},{"id":"d1","content":"∪"},{"id":"d2","content":"either"},{"id":"d3","content":"no"}]}', 1, ARRAY['sets','venn','intersection']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000004', 'a0040000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000004', 'a0040000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000004', 'a0040000-0000-0000-0000-000000000003', 3);

-- Lesson 2.2 — Union (Apply level)
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000002', 'Union', 'Elements in A OR B (or both).', '🤝', 2, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0050000-0000-0000-0000-000000000001', 'venn-diagram', 'A ∪ B', 'Color the union of A and B.', 'Select ALL colored regions — both circles completely.',
'{"labels":["A","B"],"correctRegions":["a-only","b-only","a-and-b"]}', 1, ARRAY['sets','venn','union']),
('a0050000-0000-0000-0000-000000000002', 'mcq', 'Union Meaning', 'If A = {1,2,3} and B = {3,4,5}, what is A ∪ B?', 'Combine all elements, no duplicates.',
'{"options":[{"id":"a","text":"{1, 2, 3, 4, 5}"},{"id":"b","text":"{3}"},{"id":"c","text":"{1, 2, 4, 5}"},{"id":"d","text":"{1, 2, 3, 3, 4, 5}"}],"correctOptionId":"a"}', 1, ARRAY['sets','venn','union']),
('a0050000-0000-0000-0000-000000000003', 'thought-tree', 'Union Decision Tree', 'Determine: Is element 7 in the union of A = {2,4,6} and B = {7,8,9}?', 'Check each set one at a time.',
'{"nodes":[{"id":"n1","question":"Is 7 in set A = {2, 4, 6}?","leftChoice":{"id":"n1l","text":"Yes"},"rightChoice":{"id":"n1r","text":"No"},"correctChoiceId":"n1r"},{"id":"n2","question":"Is 7 in set B = {7, 8, 9}?","leftChoice":{"id":"n2l","text":"Yes"},"rightChoice":{"id":"n2r","text":"No"},"correctChoiceId":"n2l"},{"id":"n3","question":"Since 7 is in at least one set, is 7 in A ∪ B?","leftChoice":{"id":"n3l","text":"Yes"},"rightChoice":{"id":"n3r","text":"No"},"correctChoiceId":"n3l"}],"finalAnswer":"Yes, 7 ∈ A ∪ B because it is in set B."}', 1, ARRAY['sets','venn','union']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000005', 'a0050000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000005', 'a0050000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000005', 'a0050000-0000-0000-0000-000000000003', 3);

-- Lesson 2.3 — Complement (Apply level)
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000002', 'Complement', 'Everything NOT in a given set.', '🔄', 3, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0060000-0000-0000-0000-000000000001', 'venn-diagram', 'Complement of A', 'Color the complement of A (everything not in A).', 'Select regions outside circle A, including the area outside both circles.',
'{"labels":["A","B"],"correctRegions":["b-only","neither"]}', 2, ARRAY['sets','venn','complement']),
('a0060000-0000-0000-0000-000000000002', 'venn-diagram', 'Complement of B', 'Color the complement of B (everything not in B).', 'Select regions outside circle B.',
'{"labels":["A","B"],"correctRegions":["a-only","neither"]}', 2, ARRAY['sets','venn','complement']),
('a0060000-0000-0000-0000-000000000003', 'mcq', 'Complement Cardinality', 'If the universal set U has 20 elements and |A| = 8, how many elements are in A''?', 'Complement = Universal minus the set.',
'{"options":[{"id":"a","text":"12"},{"id":"b","text":"8"},{"id":"c","text":"20"},{"id":"d","text":"28"}],"correctOptionId":"a"}', 2, ARRAY['sets','venn','complement']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000006', 'a0060000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000006', 'a0060000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000006', 'a0060000-0000-0000-0000-000000000003', 3);

-- Lesson 2.4 — Set Difference & Symmetric Difference (Analyze level)
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000002', 'Difference & Symmetric Difference', 'A minus B and the exclusive-or of sets.', '➖', 4, 15);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0070000-0000-0000-0000-000000000001', 'venn-diagram', 'A \\ B (A minus B)', 'Color the set difference A minus B — elements in A that are NOT in B.', 'This is A only, excluding the overlap.',
'{"labels":["A","B"],"correctRegions":["a-only"]}', 2, ARRAY['sets','venn','difference']),
('a0070000-0000-0000-0000-000000000002', 'venn-diagram', 'Symmetric Difference', 'Color the symmetric difference A △ B — elements in exactly one set, not both.', 'Select the non-overlapping parts of both circles.',
'{"labels":["A","B"],"correctRegions":["a-only","b-only"]}', 2, ARRAY['sets','venn','symmetric-difference']),
('a0070000-0000-0000-0000-000000000003', 'mcq', 'Difference vs Symmetric', 'If A = {1,2,3,4} and B = {3,4,5}, which elements are in A △ B?', 'Symmetric difference = elements in exactly one of the two sets.',
'{"options":[{"id":"a","text":"{1, 2, 5}"},{"id":"b","text":"{3, 4}"},{"id":"c","text":"{1, 2, 3, 4, 5}"},{"id":"d","text":"{1, 2}"}],"correctOptionId":"a"}', 2, ARRAY['sets','venn','symmetric-difference']),
('a0070000-0000-0000-0000-000000000004', 'ordering', 'Operation Inclusion', 'Order these set expressions from FEWEST to MOST elements (given two overlapping sets).', 'Intersection is smallest; union is largest.',
'{"items":[{"id":"i1","label":"A ∩ B"},{"id":"i2","label":"A \\\\ B"},{"id":"i3","label":"A △ B"},{"id":"i4","label":"A ∪ B"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['sets','venn','operations']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000007', 'a0070000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000007', 'a0070000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000007', 'a0070000-0000-0000-0000-000000000003', 3),
('d0000000-0000-0000-0000-000000000007', 'a0070000-0000-0000-0000-000000000004', 4);

-- Lesson 2.5 — Unit 2 Checkpoint Review
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000002', 'Operations Review', 'Review all set operations before moving on.', '🏁', 5, 20, true);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0080000-0000-0000-0000-000000000001', 'match-pairs', 'Match Operations', 'Match each set operation symbol to its name.', 'Recall the symbols from previous lessons.',
'{"leftItems":[{"id":"l1","text":"∩"},{"id":"l2","text":"∪"},{"id":"l3","text":"A''"},{"id":"l4","text":"A △ B"}],"rightItems":[{"id":"r1","text":"Intersection"},{"id":"r2","text":"Union"},{"id":"r3","text":"Complement"},{"id":"r4","text":"Symmetric Difference"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Symbol","rightColumnLabel":"Name"}', 2, ARRAY['sets','venn','review']),
('a0080000-0000-0000-0000-000000000002', 'venn-diagram', 'Review: Complement of Union', 'Color (A ∪ B)'' — the complement of the union of A and B.', 'First find A ∪ B, then take its complement.',
'{"labels":["A","B"],"correctRegions":["neither"]}', 2, ARRAY['sets','venn','review']),
('a0080000-0000-0000-0000-000000000003', 'mcq', 'Review: De Morgan Hint', 'Which expression equals (A ∪ B)''?', 'De Morgan''s law links complement of union to intersection of complements.',
'{"options":[{"id":"a","text":"A'' ∩ B''"},{"id":"b","text":"A'' ∪ B''"},{"id":"c","text":"A ∩ B"},{"id":"d","text":"A △ B"}],"correctOptionId":"a"}', 3, ARRAY['sets','venn','demorgan','review']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000008', 'a0080000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000008', 'a0080000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000008', 'a0080000-0000-0000-0000-000000000003', 3);

-- =================================================================
-- UNIT 3: Multi-Circle Diagrams
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'Three-Circle Diagrams', 'Extend your skills to three overlapping sets.', 3);

-- Lesson 3.1 — Reading 3-circle diagrams (Understand)
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000003', 'Three Sets', 'Identify the 8 regions of a three-circle Venn diagram.', '🔵', 1, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0090000-0000-0000-0000-000000000001', 'venn-diagram', 'Center of Three', 'Color the region where ALL three sets overlap (A ∩ B ∩ C).', 'It is the very center of all three circles.',
'{"labels":["A","B","C"],"correctRegions":["ABC"]}', 2, ARRAY['sets','venn','three-circle']),
('a0090000-0000-0000-0000-000000000002', 'venn-diagram', 'Only A and B', 'Color the region where A and B overlap but NOT C.', 'Exclude anything touching C.',
'{"labels":["A","B","C"],"correctRegions":["AB"]}', 2, ARRAY['sets','venn','three-circle']),
('a0090000-0000-0000-0000-000000000003', 'mcq', 'How Many Regions?', 'A three-circle Venn diagram has how many distinct regions?', 'Count: A only, B only, C only, AB, AC, BC, ABC, and neither.',
'{"options":[{"id":"a","text":"8"},{"id":"b","text":"6"},{"id":"c","text":"7"},{"id":"d","text":"9"}],"correctOptionId":"a"}', 2, ARRAY['sets','venn','three-circle']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000009', 'a0090000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000009', 'a0090000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000009', 'a0090000-0000-0000-0000-000000000003', 3);

-- Lesson 3.2 — Three-circle operations (Analyze)
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000003', 'Three-Set Operations', 'Apply union, intersection, and difference with three sets.', '🧮', 2, 15);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0100000-0000-0000-0000-000000000001', 'venn-diagram', 'A ∪ B but not C', 'Color all regions that are in A or B (or both) but NOT in C.', 'Select everything in circles A and B, but exclude any part that touches C.',
'{"labels":["A","B","C"],"correctRegions":["A","B","AB"]}', 3, ARRAY['sets','venn','three-circle','operations']),
('a0100000-0000-0000-0000-000000000002', 'venn-diagram', 'At Least Two Sets', 'Color all regions where elements belong to at least two of the three sets.', 'Any pairwise or triple overlap counts.',
'{"labels":["A","B","C"],"correctRegions":["AB","AC","BC","ABC"]}', 3, ARRAY['sets','venn','three-circle','operations']),
('a0100000-0000-0000-0000-000000000003', 'venn-diagram', 'Exactly One Set', 'Color the regions where elements belong to exactly ONE of the three sets.', 'Exclude all overlapping areas.',
'{"labels":["A","B","C"],"correctRegions":["A","B","C"]}', 3, ARRAY['sets','venn','three-circle','operations']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000010', 'a0100000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000010', 'a0100000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000010', 'a0100000-0000-0000-0000-000000000003', 3);

-- Lesson 3.3 — Unit 3 Checkpoint Review
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000003', 'Three-Circle Review', 'Checkpoint quiz on three-set diagrams.', '🏁', 3, 20, true);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0110000-0000-0000-0000-000000000001', 'venn-diagram', 'Review: Only A and C', 'Color the region in A and C but NOT B.', 'Find the overlap of A and C that does not touch B.',
'{"labels":["A","B","C"],"correctRegions":["AC"]}', 3, ARRAY['sets','venn','review','three-circle']),
('a0110000-0000-0000-0000-000000000002', 'categorization-grid', 'Classify Regions', 'Sort these regions into the correct category.', 'Think about how many circles each region touches.',
'{"categories":[{"id":"one","label":"Exactly 1 set","emoji":"1️⃣"},{"id":"two","label":"Exactly 2 sets","emoji":"2️⃣"},{"id":"three","label":"All 3 sets","emoji":"3️⃣"}],"items":[{"id":"i1","text":"A only"},{"id":"i2","text":"A ∩ B (not C)"},{"id":"i3","text":"A ∩ B ∩ C"},{"id":"i4","text":"C only"},{"id":"i5","text":"B ∩ C (not A)"}],"correctMapping":{"i1":"one","i2":"two","i3":"three","i4":"one","i5":"two"},"layout":"columns"}', 3, ARRAY['sets','venn','review','three-circle']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000011', 'a0110000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000011', 'a0110000-0000-0000-0000-000000000002', 2);

-- =================================================================
-- UNIT 4: Word Problems & Applications (Evaluate / Create)
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'Real-World Applications', 'Solve word problems using Venn diagrams.', 4);

-- Lesson 4.1 — Survey word problems (Evaluate)
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000004', 'Survey Problems', 'Use Venn diagrams to solve survey-style word problems.', '📋', 1, 15);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0120000-0000-0000-0000-000000000001', 'mcq', 'Survey: Two Activities', 'In a class of 30, 18 play soccer, 15 play basketball, and 5 play both. How many play neither?', 'Use: |Neither| = Total - |A ∪ B| where |A ∪ B| = |A| + |B| - |A ∩ B|.',
'{"options":[{"id":"a","text":"2"},{"id":"b","text":"5"},{"id":"c","text":"3"},{"id":"d","text":"7"}],"correctOptionId":"a"}', 3, ARRAY['sets','venn','word-problems']),
('a0120000-0000-0000-0000-000000000002', 'mcq', 'Survey: Three Subjects', 'Out of 50 students: 30 like Math, 25 like Science, 20 like English. 10 like Math & Science, 8 like Science & English, 12 like Math & English, 5 like all three. How many like at least one?', 'Use inclusion-exclusion: |A∪B∪C| = |A|+|B|+|C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|.',
'{"options":[{"id":"a","text":"50"},{"id":"b","text":"45"},{"id":"c","text":"40"},{"id":"d","text":"55"}],"correctOptionId":"a"}', 3, ARRAY['sets','venn','word-problems','inclusion-exclusion']),
('a0120000-0000-0000-0000-000000000003', 'fill-blanks', 'Inclusion-Exclusion Formula', 'For two sets: |A ∪ B| = |A| + |B| ___ |A ∩ B|.', 'We subtract the overlap to avoid counting it twice.',
'{"segments":[{"type":"text","content":"|A ∪ B| = |A| + |B| "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" |A ∩ B|"}],"answerBlocks":[{"id":"ans1","content":"−"},{"id":"d1","content":"+"},{"id":"d2","content":"×"},{"id":"d3","content":"÷"}]}', 2, ARRAY['sets','venn','inclusion-exclusion']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000012', 'a0120000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000012', 'a0120000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000012', 'a0120000-0000-0000-0000-000000000003', 3);

-- Lesson 4.2 — De Morgan's Laws (Evaluate)
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d0000000-0000-0000-0000-000000000013', 'b0000000-0000-0000-0000-000000000004', 'De Morgan''s Laws', 'Relate complements of unions and intersections.', '⚡', 2, 15);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0130000-0000-0000-0000-000000000001', 'match-pairs', 'De Morgan Equivalences', 'Match each expression to its De Morgan equivalent.', 'De Morgan swaps ∪ with ∩ and complements each set.',
'{"leftItems":[{"id":"l1","text":"(A ∪ B)''"},{"id":"l2","text":"(A ∩ B)''"},{"id":"l3","text":"A'' ∩ B''"},{"id":"l4","text":"A'' ∪ B''"}],"rightItems":[{"id":"r1","text":"A'' ∩ B''"},{"id":"r2","text":"A'' ∪ B''"},{"id":"r3","text":"(A ∪ B)''"},{"id":"r4","text":"(A ∩ B)''"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Expression","rightColumnLabel":"Equivalent"}', 3, ARRAY['sets','venn','demorgan']),
('a0130000-0000-0000-0000-000000000002', 'venn-diagram', 'Verify De Morgan', 'Color (A ∩ B)'' — everything NOT in the intersection of A and B.', 'Select everything except the center overlap.',
'{"labels":["A","B"],"correctRegions":["a-only","b-only","neither"]}', 3, ARRAY['sets','venn','demorgan']),
('a0130000-0000-0000-0000-000000000003', 'venn-diagram', 'Verify De Morgan 2', 'Now color A'' ∪ B'' — it should match (A ∩ B)''!', 'A'' includes b-only and neither. B'' includes a-only and neither. Their union is everything except a-and-b.',
'{"labels":["A","B"],"correctRegions":["a-only","b-only","neither"]}', 3, ARRAY['sets','venn','demorgan']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000013', 'a0130000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000013', 'a0130000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000013', 'a0130000-0000-0000-0000-000000000003', 3);

-- Lesson 4.3 — Final Course Review (Evaluate / Create)
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d0000000-0000-0000-0000-000000000014', 'b0000000-0000-0000-0000-000000000004', 'Final Review', 'Put it all together — master-level Venn diagram challenge.', '🏆', 3, 25, true);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a0140000-0000-0000-0000-000000000001', 'venn-diagram', 'Challenge: Complex Region', 'Color (A ∪ B) ∩ C'' — elements in A or B, but NOT in C.', 'First find everything in A ∪ B (all of A and B), then exclude any part touching C.',
'{"labels":["A","B","C"],"correctRegions":["A","B","AB"]}', 4, ARRAY['sets','venn','challenge']),
('a0140000-0000-0000-0000-000000000002', 'mcq', 'Challenge: Cardinality', 'If |A| = 15, |B| = 12, |C| = 10, |A∩B| = 5, |A∩C| = 4, |B∩C| = 3, |A∩B∩C| = 2, what is |A∪B∪C|?', 'Inclusion-exclusion: add singles, subtract pairs, add triple.',
'{"options":[{"id":"a","text":"27"},{"id":"b","text":"37"},{"id":"c","text":"25"},{"id":"d","text":"30"}],"correctOptionId":"a"}', 4, ARRAY['sets','venn','challenge','inclusion-exclusion']),
('a0140000-0000-0000-0000-000000000003', 'ordering', 'Set Properties Order', 'Order these set relationships from always true to never true.', 'Think about which relationships hold universally.',
'{"items":[{"id":"i1","label":"A ∩ B ⊆ A","subtitle":"Always true"},{"id":"i2","label":"A ⊆ A ∪ B","subtitle":"Always true"},{"id":"i3","label":"|A ∪ B| = |A| + |B|","subtitle":"Only when disjoint"},{"id":"i4","label":"A = B","subtitle":"Not guaranteed"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 4, ARRAY['sets','venn','challenge']),
('a0140000-0000-0000-0000-000000000004', 'venn-diagram', 'Challenge: 4-Set Center', 'Color the region where ALL four sets overlap.', 'Find the very center where all four circles meet.',
'{"labels":["A","B","C","D"],"correctRegions":["ABCD"]}', 4, ARRAY['sets','venn','challenge','four-circle']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d0000000-0000-0000-0000-000000000014', 'a0140000-0000-0000-0000-000000000001', 1),
('d0000000-0000-0000-0000-000000000014', 'a0140000-0000-0000-0000-000000000002', 2),
('d0000000-0000-0000-0000-000000000014', 'a0140000-0000-0000-0000-000000000003', 3),
('d0000000-0000-0000-0000-000000000014', 'a0140000-0000-0000-0000-000000000004', 4);
