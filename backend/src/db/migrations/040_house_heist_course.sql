-- Migration: 040_house_heist_course
-- Description: Seed the "How to Rob a House" course — a cheeky, gamified deep dive into
-- home security, threat modeling, and critical thinking through the lens of a heist.
-- 5 Units, 16 Lessons, ~50 applets using diverse applet types.

-- =================================================================
-- COURSE
-- =================================================================
INSERT INTO courses (id, title, description, emoji, color, is_published, sort_order) VALUES
('c0000000-0000-0000-0000-000000000002', 'How to Rob a House', 'Think like a burglar to protect like a pro. Master home security through heist-based critical thinking.', '🏠', '#FF3B5C', true, 2);

-- =================================================================
-- UNIT 1 — Casing the Joint (Reconnaissance)
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b1000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', 'Casing the Joint', 'Learn how burglars scout targets — and how to make your home unappealing.', 1);

-- Lesson 1.1 — What Makes a Target?
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'What Makes a Target?', 'Identify the features that make a home attractive to burglars.', '🎯', 1, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1010000-0000-0000-0000-000000000001', 'mcq', 'Easy Pickings', 'Which house is MOST likely to be targeted by a burglar?', 'Burglars look for easy entry and low risk of detection.',
'{"options":[{"id":"a","text":"Well-lit house with dog barking inside"},{"id":"b","text":"Dark house with overgrown bushes near windows"},{"id":"c","text":"House with security cameras and alarm sign"},{"id":"d","text":"House with neighbors sitting on their porch"}],"correctOptionId":"b"}', 1, ARRAY['heist','recon','security']),

('a1010000-0000-0000-0000-000000000002', 'ordering', 'Burglar Priority', 'Rank these factors from MOST to LEAST important for a burglar choosing a target.', 'Think about what reduces risk for the burglar.',
'{"items":[{"id":"i1","label":"No visible security system","emoji":"🔓"},{"id":"i2","label":"Hidden entry points (bushes, fences)","emoji":"🌳"},{"id":"i3","label":"Expensive car in driveway","emoji":"🚗"},{"id":"i4","label":"House appears unoccupied","emoji":"🏚️"}],"correctOrder":["i4","i1","i2","i3"],"direction":"top-down"}', 1, ARRAY['heist','recon','priorities']),

('a1010000-0000-0000-0000-000000000003', 'categorization-grid', 'Target or Skip?', 'Categorize each observation as something that makes a house a TARGET or a SKIP for burglars.', 'Burglars avoid detection and complications.',
'{"categories":[{"id":"target","label":"Target","emoji":"🎯"},{"id":"skip","label":"Skip","emoji":"🚫"}],"items":[{"id":"i1","text":"Mail piling up on porch"},{"id":"i2","text":"Motion-activated lights"},{"id":"i3","text":"Open garage door"},{"id":"i4","text":"Ring doorbell camera"},{"id":"i5","text":"No curtains on windows"},{"id":"i6","text":"Neighborhood watch sign"}],"correctMapping":{"i1":"target","i2":"skip","i3":"target","i4":"skip","i5":"target","i6":"skip"},"layout":"columns"}', 1, ARRAY['heist','recon','categorization']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000001', 'a1010000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000001', 'a1010000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000001', 'a1010000-0000-0000-0000-000000000003', 3);

-- Lesson 1.2 — Timing is Everything
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'Timing is Everything', 'Understand when homes are most vulnerable.', '⏰', 2, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1020000-0000-0000-0000-000000000001', 'mcq', 'Peak Break-in Hours', 'When do most residential burglaries occur?', 'Think about when homes are empty.',
'{"options":[{"id":"a","text":"2 AM - 5 AM (dead of night)"},{"id":"b","text":"10 AM - 3 PM (workday hours)"},{"id":"c","text":"6 PM - 9 PM (dinner time)"},{"id":"d","text":"5 AM - 7 AM (early morning)"}],"correctOptionId":"b"}', 1, ARRAY['heist','timing','statistics']),

('a1020000-0000-0000-0000-000000000002', 'chart-reading', 'Burglary by Month', 'Select the TWO months with the highest burglary rates.', 'Summer months have more burglaries — longer days and vacations.',
'{"chartType":"bar","chartTitle":"Residential Burglaries by Month","data":[{"id":"jan","label":"Jan","value":7},{"id":"feb","label":"Feb","value":6},{"id":"mar","label":"Mar","value":7},{"id":"apr","label":"Apr","value":8},{"id":"may","label":"May","value":9},{"id":"jun","label":"Jun","value":11},{"id":"jul","label":"Jul","value":12},{"id":"aug","label":"Aug","value":11},{"id":"sep","label":"Sep","value":9},{"id":"oct","label":"Oct","value":8},{"id":"nov","label":"Nov","value":7},{"id":"dec","label":"Dec","value":5}],"xAxisLabel":"Month","yAxisLabel":"% of Annual Burglaries","selectCount":2,"correctIds":["jul","jun"]}', 2, ARRAY['heist','timing','statistics']),

('a1020000-0000-0000-0000-000000000003', 'thought-tree', 'Should I Rob Now?', 'As a burglar scoping out a house at 2 PM on a Tuesday, walk through the decision.', 'Think about occupancy, daylight, and neighbor visibility.',
'{"nodes":[{"id":"n1","question":"Is it a weekday during work hours?","leftChoice":{"id":"n1l","text":"Yes"},"rightChoice":{"id":"n1r","text":"No"},"correctChoiceId":"n1l"},{"id":"n2","question":"Are there cars in the driveway?","leftChoice":{"id":"n2l","text":"Yes (risky)"},"rightChoice":{"id":"n2r","text":"No (likely empty)"},"correctChoiceId":"n2r"},{"id":"n3","question":"Can I see movement inside through windows?","leftChoice":{"id":"n3l","text":"Yes (abort!)"},"rightChoice":{"id":"n3r","text":"No (proceed)"},"correctChoiceId":"n3r"},{"id":"n4","question":"Are neighbors outside watching?","leftChoice":{"id":"n4l","text":"Yes (too risky)"},"rightChoice":{"id":"n4r","text":"No (green light)"},"correctChoiceId":"n4r"},{"id":"n5","question":"Is the entry point shielded from street view?","leftChoice":{"id":"n5l","text":"Yes (go)"},"rightChoice":{"id":"n5r","text":"No (find another)"},"correctChoiceId":"n5l"}],"finalAnswer":"A weekday afternoon with no cars, no movement, no neighbors watching, and a concealed entry = prime burglary window."}', 2, ARRAY['heist','timing','decision']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000002', 'a1020000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000002', 'a1020000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000002', 'a1020000-0000-0000-0000-000000000003', 3);

-- Lesson 1.3 — Social Engineering
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', 'Social Engineering', 'How burglars gather info without breaking in.', '🎭', 3, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1030000-0000-0000-0000-000000000001', 'match-pairs', 'Recon Techniques', 'Match each social engineering tactic to what it reveals.', 'Each technique gathers different intel.',
'{"leftItems":[{"id":"l1","text":"Knocking on front door"},{"id":"l2","text":"Checking mailbox overflow"},{"id":"l3","text":"Peeking through windows"},{"id":"l4","text":"Chatting with neighbors"}],"rightItems":[{"id":"r1","text":"Whether anyone is home"},{"id":"r2","text":"How long owner has been away"},{"id":"r3","text":"Valuables and layout"},{"id":"r4","text":"Owner schedule and habits"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Tactic","rightColumnLabel":"Intel Gained"}', 2, ARRAY['heist','social-engineering']),

('a1030000-0000-0000-0000-000000000002', 'mcq', 'Fake Deliveries', 'A burglar poses as a delivery driver. What is their primary goal?', 'They are testing the waters.',
'{"options":[{"id":"a","text":"Steal the package"},{"id":"b","text":"Check if anyone answers the door"},{"id":"c","text":"Distract the homeowner"},{"id":"d","text":"Leave a tracking device"}],"correctOptionId":"b"}', 2, ARRAY['heist','social-engineering']),

('a1030000-0000-0000-0000-000000000003', 'ordering', 'Social Media OPSEC Fails', 'Rank these social media posts from MOST to LEAST useful for a burglar.', 'Location and timing information are gold.',
'{"items":[{"id":"i1","label":"\"Off to Hawaii for 2 weeks! ✈️\"","emoji":"🏖️"},{"id":"i2","label":"\"Just bought a new 75\" TV!\"","emoji":"📺"},{"id":"i3","label":"\"At work until 9 tonight 😩\"","emoji":"💼"},{"id":"i4","label":"\"Love my morning jogs at 6 AM\"","emoji":"🏃"}],"correctOrder":["i1","i3","i4","i2"],"direction":"top-down"}', 2, ARRAY['heist','social-engineering','opsec']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000003', 'a1030000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000003', 'a1030000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000003', 'a1030000-0000-0000-0000-000000000003', 3);

-- Lesson 1.4 — Unit 1 Checkpoint
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000001', 'Recon Review', 'Test your knowledge of burglar reconnaissance.', '🏁', 4, 15, true);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1040000-0000-0000-0000-000000000001', 'mcq', 'Review: Top Deterrent', 'According to surveys of convicted burglars, what deters them MOST?', 'Think about what creates the most uncertainty.',
'{"options":[{"id":"a","text":"A large dog"},{"id":"b","text":"Security cameras"},{"id":"c","text":"Signs of occupancy"},{"id":"d","text":"High fences"}],"correctOptionId":"c"}', 2, ARRAY['heist','review','deterrents']),

('a1040000-0000-0000-0000-000000000002', 'categorization-grid', 'Review: Threat Signals', 'Categorize these signs as what a burglar interprets as OCCUPIED or EMPTY.', 'Think like a burglar scanning from the street.',
'{"categories":[{"id":"occupied","label":"Occupied","emoji":"🏡"},{"id":"empty","label":"Empty","emoji":"🏚️"}],"items":[{"id":"i1","text":"Lights on a timer (random)"},{"id":"i2","text":"3 days of newspapers"},{"id":"i3","text":"TV sounds from inside"},{"id":"i4","text":"Overgrown lawn"},{"id":"i5","text":"Car in driveway"}],"correctMapping":{"i1":"occupied","i2":"empty","i3":"occupied","i4":"empty","i5":"occupied"},"layout":"columns"}', 2, ARRAY['heist','review','signals']),

('a1040000-0000-0000-0000-000000000003', 'fill-blanks', 'Review: Burglary Stats', 'Complete: Most burglaries happen during ___ hours on ___.', 'Think workdays, think when people leave.',
'{"segments":[{"type":"text","content":"Most burglaries happen during "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" hours on "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":"."}],"answerBlocks":[{"id":"ans1","content":"daytime"},{"id":"ans2","content":"weekdays"},{"id":"d1","content":"nighttime"},{"id":"d2","content":"weekends"},{"id":"d3","content":"holidays"}]}', 1, ARRAY['heist','review','statistics']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000004', 'a1040000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000004', 'a1040000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000004', 'a1040000-0000-0000-0000-000000000003', 3);

-- =================================================================
-- UNIT 2 — Breaking & Entering (Entry Methods)
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b1000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'Breaking & Entering', 'Understand common entry methods and how to defend against them.', 2);

-- Lesson 2.1 — Door Vulnerabilities
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000002', 'Door Vulnerabilities', 'The front door is the #1 entry point. Learn why.', '🚪', 1, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1050000-0000-0000-0000-000000000001', 'mcq', 'Most Common Entry', 'What percentage of burglars enter through the front door?', 'It is shockingly high because many doors are unlocked or weak.',
'{"options":[{"id":"a","text":"About 10%"},{"id":"b","text":"About 22%"},{"id":"c","text":"About 34%"},{"id":"d","text":"About 50%"}],"correctOptionId":"c"}', 1, ARRAY['heist','entry','doors']),

('a1050000-0000-0000-0000-000000000002', 'ordering', 'Lock Strength', 'Rank these lock types from WEAKEST to STRONGEST security.', 'More pins and mechanisms = harder to pick.',
'{"items":[{"id":"i1","label":"Simple spring latch (no deadbolt)","emoji":"😰"},{"id":"i2","label":"Single-cylinder deadbolt","emoji":"🔒"},{"id":"i3","label":"Smart lock with auto-lock","emoji":"📱"},{"id":"i4","label":"Double-cylinder deadbolt + strike plate","emoji":"🛡️"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['heist','entry','locks']),

('a1050000-0000-0000-0000-000000000003', 'fill-blanks', 'Door Frame Weakness', 'A door is only as strong as its ___. Most break-ins use ___ rather than picking.', 'Kicking a door targets the weakest structural point.',
'{"segments":[{"type":"text","content":"A door is only as strong as its "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":". Most break-ins use "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" rather than picking."}],"answerBlocks":[{"id":"ans1","content":"frame"},{"id":"ans2","content":"force"},{"id":"d1","content":"lock"},{"id":"d2","content":"stealth"},{"id":"d3","content":"hinges"},{"id":"d4","content":"tools"}]}', 2, ARRAY['heist','entry','doors']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000005', 'a1050000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000005', 'a1050000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000005', 'a1050000-0000-0000-0000-000000000003', 3);

-- Lesson 2.2 — Windows & Side Entries
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000002', 'Windows & Side Entries', 'Windows, garages, and basements are secondary targets.', '🪟', 2, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1060000-0000-0000-0000-000000000001', 'categorization-grid', 'Entry Point Difficulty', 'Categorize each entry point by difficulty for a burglar.', 'Think about noise, tools needed, and visibility.',
'{"categories":[{"id":"easy","label":"Easy","emoji":"🟢"},{"id":"medium","label":"Medium","emoji":"🟡"},{"id":"hard","label":"Hard","emoji":"🔴"}],"items":[{"id":"i1","text":"Unlocked ground-floor window"},{"id":"i2","text":"Sliding glass door (no bar)"},{"id":"i3","text":"Second-story window"},{"id":"i4","text":"Pet door (large dog size)"},{"id":"i5","text":"Basement window with well"},{"id":"i6","text":"Reinforced steel door"}],"correctMapping":{"i1":"easy","i2":"easy","i3":"hard","i4":"medium","i5":"medium","i6":"hard"},"layout":"columns"}', 2, ARRAY['heist','entry','windows']),

('a1060000-0000-0000-0000-000000000002', 'mcq', 'Sliding Door Hack', 'What simple $3 tool can prevent a sliding glass door from being forced open?', 'It blocks the track.',
'{"options":[{"id":"a","text":"A wooden dowel in the track"},{"id":"b","text":"Super glue on the lock"},{"id":"c","text":"A chair propped against it"},{"id":"d","text":"Aluminum foil on the glass"}],"correctOptionId":"a"}', 1, ARRAY['heist','entry','windows','defense']),

('a1060000-0000-0000-0000-000000000003', 'thought-tree', 'Window Entry Decision', 'Walk through a burglar''s thought process at a ground-floor window.', 'Each check trades time against risk.',
'{"nodes":[{"id":"n1","question":"Is the window visible from the street?","leftChoice":{"id":"n1l","text":"Yes (risky)"},"rightChoice":{"id":"n1r","text":"No (good)"},"correctChoiceId":"n1r"},{"id":"n2","question":"Is it locked?","leftChoice":{"id":"n2l","text":"Yes"},"rightChoice":{"id":"n2r","text":"No (jackpot!)"},"correctChoiceId":"n2r"},{"id":"n3","question":"Is there a window sensor or alarm sticker?","leftChoice":{"id":"n3l","text":"Yes (move on)"},"rightChoice":{"id":"n3r","text":"No (clear)"},"correctChoiceId":"n3r"},{"id":"n4","question":"Can I reach it without a ladder?","leftChoice":{"id":"n4l","text":"Yes (quick entry)"},"rightChoice":{"id":"n4r","text":"No (too slow)"},"correctChoiceId":"n4l"}],"finalAnswer":"An unlocked, concealed, ground-level window with no alarm = easiest entry. Lock your windows!"}', 2, ARRAY['heist','entry','windows','decision']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000006', 'a1060000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000006', 'a1060000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000006', 'a1060000-0000-0000-0000-000000000003', 3);

-- Lesson 2.3 — Tools of the Trade
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000002', 'Tools of the Trade', 'Common tools burglars carry and how defenses counter them.', '🔧', 3, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1070000-0000-0000-0000-000000000001', 'match-pairs', 'Tool vs Defense', 'Match each burglar tool to the defense that counters it.', 'Think about what each tool targets.',
'{"leftItems":[{"id":"l1","text":"Crowbar (pry door)"},{"id":"l2","text":"Lock picks"},{"id":"l3","text":"Glass cutter"},{"id":"l4","text":"Bump key"}],"rightItems":[{"id":"r1","text":"Reinforced strike plate"},{"id":"r2","text":"High-security pin tumbler"},{"id":"r3","text":"Security film on windows"},{"id":"r4","text":"Bump-proof deadbolt"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Burglar Tool","rightColumnLabel":"Counter-Defense"}', 2, ARRAY['heist','tools','defense']),

('a1070000-0000-0000-0000-000000000002', 'mcq', 'Time Limit', 'Most burglars will abandon an entry attempt if it takes longer than...', 'Speed is their top priority.',
'{"options":[{"id":"a","text":"30 seconds"},{"id":"b","text":"60 seconds"},{"id":"c","text":"5 minutes"},{"id":"d","text":"10 minutes"}],"correctOptionId":"b"}', 2, ARRAY['heist','tools','timing']),

('a1070000-0000-0000-0000-000000000003', 'ordering', 'Noise Level', 'Rank these entry methods from QUIETEST to LOUDEST.', 'Less noise = less attention.',
'{"items":[{"id":"i1","label":"Picking a lock","emoji":"🤫"},{"id":"i2","label":"Sliding open an unlocked window","emoji":"😶"},{"id":"i3","label":"Prying open a door with crowbar","emoji":"📢"},{"id":"i4","label":"Smashing a window","emoji":"💥"}],"correctOrder":["i2","i1","i3","i4"],"direction":"top-down"}', 2, ARRAY['heist','tools','noise']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000007', 'a1070000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000007', 'a1070000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000007', 'a1070000-0000-0000-0000-000000000003', 3);

-- Lesson 2.4 — Unit 2 Checkpoint
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d1000000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000002', 'Entry Methods Review', 'Can you defend every entry point?', '🏁', 4, 15, true);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1080000-0000-0000-0000-000000000001', 'mcq', 'Review: Weakest Link', 'Which entry point is MOST commonly exploited?', 'Hint: people forget to secure the obvious.',
'{"options":[{"id":"a","text":"Skylight"},{"id":"b","text":"Front door"},{"id":"c","text":"Chimney"},{"id":"d","text":"Crawl space"}],"correctOptionId":"b"}', 1, ARRAY['heist','review','entry']),

('a1080000-0000-0000-0000-000000000002', 'fill-blanks', 'Review: The 60-Second Rule', 'If a burglar can''t get in within ___ seconds, they typically ___.', 'Think about risk vs. reward.',
'{"segments":[{"type":"text","content":"If a burglar can''t get in within "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" seconds, they typically "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":"."}],"answerBlocks":[{"id":"ans1","content":"60"},{"id":"ans2","content":"move on"},{"id":"d1","content":"30"},{"id":"d2","content":"120"},{"id":"d3","content":"try harder"},{"id":"d4","content":"call backup"}]}', 2, ARRAY['heist','review','timing']),

('a1080000-0000-0000-0000-000000000003', 'match-pairs', 'Review: Vulnerability Audit', 'Match each home feature to its security risk level.', 'Think like a burglar assessing each point.',
'{"leftItems":[{"id":"l1","text":"Solid wood door, deadbolt"},{"id":"l2","text":"Hollow core door, spring latch"},{"id":"l3","text":"Window with security film"},{"id":"l4","text":"Sliding door, no bar"}],"rightItems":[{"id":"r1","text":"High security"},{"id":"r2","text":"Very low security"},{"id":"r3","text":"Good security"},{"id":"r4","text":"Low security"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Feature","rightColumnLabel":"Security Level"}', 2, ARRAY['heist','review','entry']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000008', 'a1080000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000008', 'a1080000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000008', 'a1080000-0000-0000-0000-000000000003', 3);

-- =================================================================
-- UNIT 3 — Inside the House (What to Grab)
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b1000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000002', 'Inside the House', 'Where burglars go first, what they grab, and how to outsmart them.', 3);

-- Lesson 3.1 — The Burglar's Playbook
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d1000000-0000-0000-0000-000000000009', 'b1000000-0000-0000-0000-000000000003', 'The Burglar''s Playbook', 'Where burglars go first and what they look for.', '📖', 1, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1090000-0000-0000-0000-000000000001', 'ordering', 'Room Priority', 'Rank the rooms a burglar searches in order from FIRST to LAST.', 'Burglars go where valuables concentrate — bedrooms first.',
'{"items":[{"id":"i1","label":"Master bedroom","emoji":"🛏️"},{"id":"i2","label":"Home office / study","emoji":"💻"},{"id":"i3","label":"Living room","emoji":"🛋️"},{"id":"i4","label":"Kitchen","emoji":"🍳"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['heist','interior','rooms']),

('a1090000-0000-0000-0000-000000000002', 'mcq', 'Hiding Spot Fail', 'Which common hiding spot do burglars check FIRST?', 'Everyone thinks they are clever with this one.',
'{"options":[{"id":"a","text":"Inside books on a shelf"},{"id":"b","text":"Under the mattress / in sock drawer"},{"id":"c","text":"Behind a painting"},{"id":"d","text":"In the freezer"}],"correctOptionId":"b"}', 2, ARRAY['heist','interior','hiding']),

('a1090000-0000-0000-0000-000000000003', 'categorization-grid', 'Grab or Leave?', 'What would a burglar grab vs. leave behind? (Think: value-to-weight ratio)', 'Burglars want small, valuable, untraceable items.',
'{"categories":[{"id":"grab","label":"Grab","emoji":"💰"},{"id":"leave","label":"Leave","emoji":"❌"}],"items":[{"id":"i1","text":"Cash in a drawer"},{"id":"i2","text":"Heavy 65\" TV"},{"id":"i3","text":"Jewelry box"},{"id":"i4","text":"Laptop"},{"id":"i5","text":"Large painting"},{"id":"i6","text":"Prescription medications"}],"correctMapping":{"i1":"grab","i2":"leave","i3":"grab","i4":"grab","i5":"leave","i6":"grab"},"layout":"columns"}', 2, ARRAY['heist','interior','valuables']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000009', 'a1090000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000009', 'a1090000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000009', 'a1090000-0000-0000-0000-000000000003', 3);

-- Lesson 3.2 — Time Inside
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d1000000-0000-0000-0000-000000000010', 'b1000000-0000-0000-0000-000000000003', 'The 8-Minute Rule', 'Average burglars spend 8-10 minutes inside. Every second counts.', '⏱️', 2, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1100000-0000-0000-0000-000000000001', 'mcq', 'Average Time Inside', 'How long does the average burglar spend inside a home?', 'They are in and out fast.',
'{"options":[{"id":"a","text":"2-3 minutes"},{"id":"b","text":"8-10 minutes"},{"id":"c","text":"20-30 minutes"},{"id":"d","text":"Over an hour"}],"correctOptionId":"b"}', 1, ARRAY['heist','interior','timing']),

('a1100000-0000-0000-0000-000000000002', 'ordering', 'Smash-and-Grab Timeline', 'Order the actions a burglar takes once inside, from FIRST to LAST.', 'Speed and efficiency are key.',
'{"items":[{"id":"i1","label":"Check master bedroom dresser","emoji":"🗄️"},{"id":"i2","label":"Locate and check exits","emoji":"🚪"},{"id":"i3","label":"Sweep office for electronics","emoji":"💻"},{"id":"i4","label":"Grab easy items near entrance","emoji":"🎒"}],"correctOrder":["i2","i1","i3","i4"],"direction":"top-down"}', 2, ARRAY['heist','interior','timeline']),

('a1100000-0000-0000-0000-000000000003', 'thought-tree', 'Alarm Goes Off!', 'You''re a burglar and an alarm starts blaring 30 seconds after entry. What do you do?', 'Think about police response times vs. payoff.',
'{"nodes":[{"id":"n1","question":"Is it a local alarm (siren only) or monitored (calls police)?","leftChoice":{"id":"n1l","text":"Local siren"},"rightChoice":{"id":"n1r","text":"Monitored system"},"correctChoiceId":"n1l"},{"id":"n2","question":"Police response is ~7 min. Do you have time for a quick grab?","leftChoice":{"id":"n2l","text":"Yes, grab and go"},"rightChoice":{"id":"n2r","text":"No, bail immediately"},"correctChoiceId":"n2l"},{"id":"n3","question":"You have 2 minutes max. Hit the master bedroom?","leftChoice":{"id":"n3l","text":"Yes, jewelry first"},"rightChoice":{"id":"n3r","text":"No, grab what''s near exit"},"correctChoiceId":"n3r"},{"id":"n4","question":"Are neighbors coming out to investigate?","leftChoice":{"id":"n4l","text":"Yes (run NOW)"},"rightChoice":{"id":"n4r","text":"No (30 more seconds)"},"correctChoiceId":"n4l"}],"finalAnswer":"Even with a local alarm, smart burglars grab items near the exit and flee in under 90 seconds. Monitored alarms with fast response are the best defense."}', 3, ARRAY['heist','interior','alarms','decision']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000010', 'a1100000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000010', 'a1100000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000010', 'a1100000-0000-0000-0000-000000000003', 3);

-- Lesson 3.3 — Unit 3 Checkpoint
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d1000000-0000-0000-0000-000000000011', 'b1000000-0000-0000-0000-000000000003', 'Inside Job Review', 'Prove you know the burglar''s playbook.', '🏁', 3, 15, true);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1110000-0000-0000-0000-000000000001', 'fill-blanks', 'Review: Time & Targets', 'Burglars spend about ___ minutes inside and target the ___ first.', 'Think fast, think valuable.',
'{"segments":[{"type":"text","content":"Burglars spend about "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" minutes inside and target the "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" first."}],"answerBlocks":[{"id":"ans1","content":"8-10"},{"id":"ans2","content":"master bedroom"},{"id":"d1","content":"2-3"},{"id":"d2","content":"30+"},{"id":"d3","content":"kitchen"},{"id":"d4","content":"garage"}]}', 2, ARRAY['heist','review','interior']),

('a1110000-0000-0000-0000-000000000002', 'match-pairs', 'Review: Hiding vs. Safe', 'Match each valuables storage method to its security rating.', 'Burglars know all the classic hiding spots.',
'{"leftItems":[{"id":"l1","text":"Under the mattress"},{"id":"l2","text":"Bolted floor safe"},{"id":"l3","text":"Sock drawer"},{"id":"l4","text":"Bank safe deposit box"}],"rightItems":[{"id":"r1","text":"Terrible - checked first"},{"id":"r2","text":"Excellent - near impossible"},{"id":"r3","text":"Bad - top 3 spots checked"},{"id":"r4","text":"Best - offsite entirely"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Storage Method","rightColumnLabel":"Security Rating"}', 2, ARRAY['heist','review','hiding']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000011', 'a1110000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000011', 'a1110000-0000-0000-0000-000000000002', 2);

-- =================================================================
-- UNIT 4 — The Getaway (Escape & Fencing)
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b1000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000002', 'The Getaway', 'How burglars escape, fence stolen goods, and get caught.', 4);

-- Lesson 4.1 — Escape Planning
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d1000000-0000-0000-0000-000000000012', 'b1000000-0000-0000-0000-000000000004', 'Escape Planning', 'How burglars plan their exit — and how cameras catch them.', '🏃', 1, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1120000-0000-0000-0000-000000000001', 'mcq', 'Getaway Vehicle', 'Where do most burglars park their getaway vehicle?', 'They avoid suspicion by blending in.',
'{"options":[{"id":"a","text":"Right in front of the house"},{"id":"b","text":"Around the corner / nearby street"},{"id":"c","text":"In the target''s own driveway"},{"id":"d","text":"In a parking garage blocks away"}],"correctOptionId":"b"}', 2, ARRAY['heist','getaway','escape']),

('a1120000-0000-0000-0000-000000000002', 'ordering', 'Escape Priority', 'Rank what a burglar prioritizes during escape from MOST to LEAST important.', 'Not being identified trumps everything.',
'{"items":[{"id":"i1","label":"Avoid cameras and witnesses","emoji":"📷"},{"id":"i2","label":"Leave quickly and calmly","emoji":"🚶"},{"id":"i3","label":"Take the most valuables possible","emoji":"💎"},{"id":"i4","label":"Leave no fingerprints","emoji":"🧤"}],"correctOrder":["i1","i2","i4","i3"],"direction":"top-down"}', 2, ARRAY['heist','getaway','priorities']),

('a1120000-0000-0000-0000-000000000003', 'mcq', 'Camera Placement', 'Where is the MOST effective place to install a security camera?', 'You want to capture faces, not hats.',
'{"options":[{"id":"a","text":"High up on the roof pointing down"},{"id":"b","text":"Eye level at entry points"},{"id":"c","text":"Inside the garage"},{"id":"d","text":"Behind a window looking out"}],"correctOptionId":"b"}', 2, ARRAY['heist','getaway','cameras','defense']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000012', 'a1120000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000012', 'a1120000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000012', 'a1120000-0000-0000-0000-000000000003', 3);

-- Lesson 4.2 — How Burglars Get Caught
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d1000000-0000-0000-0000-000000000013', 'b1000000-0000-0000-0000-000000000004', 'How They Get Caught', 'The mistakes that lead to arrests.', '🚔', 2, 10);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1130000-0000-0000-0000-000000000001', 'ordering', 'Top Reasons Caught', 'Rank the reasons burglars get caught from MOST to LEAST common.', 'Witnesses and cameras dominate.',
'{"items":[{"id":"i1","label":"Neighbor or witness reported them","emoji":"👀"},{"id":"i2","label":"Caught on camera / doorbell footage","emoji":"📹"},{"id":"i3","label":"Sold stolen items to undercover","emoji":"🕵️"},{"id":"i4","label":"Left DNA or fingerprints at scene","emoji":"🧬"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['heist','caught','forensics']),

('a1130000-0000-0000-0000-000000000002', 'mcq', 'Burglary Solve Rate', 'What percentage of burglaries in the US are solved (cleared)?', 'The rate is disappointingly low.',
'{"options":[{"id":"a","text":"About 14%"},{"id":"b","text":"About 35%"},{"id":"c","text":"About 55%"},{"id":"d","text":"About 75%"}],"correctOptionId":"a"}', 2, ARRAY['heist','caught','statistics']),

('a1130000-0000-0000-0000-000000000003', 'fill-blanks', 'Digital Evidence', 'Modern burglars are most often caught by ___ footage shared on ___ platforms.', 'Think Ring doorbells and Nextdoor.',
'{"segments":[{"type":"text","content":"Modern burglars are most often caught by "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" footage shared on "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" platforms."}],"answerBlocks":[{"id":"ans1","content":"doorbell camera"},{"id":"ans2","content":"community"},{"id":"d1","content":"satellite"},{"id":"d2","content":"gaming"},{"id":"d3","content":"drone"},{"id":"d4","content":"social media"}]}', 2, ARRAY['heist','caught','technology']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000013', 'a1130000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000013', 'a1130000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000013', 'a1130000-0000-0000-0000-000000000003', 3);

-- Lesson 4.3 — Unit 4 Checkpoint
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d1000000-0000-0000-0000-000000000014', 'b1000000-0000-0000-0000-000000000004', 'Getaway Review', 'Can you trace the burglar''s escape and downfall?', '🏁', 3, 15, true);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1140000-0000-0000-0000-000000000001', 'categorization-grid', 'Review: What Gets You Caught', 'Categorize each factor as something that HELPS burglars evade or LEADS to their capture.', 'Think about what creates evidence.',
'{"categories":[{"id":"evade","label":"Helps Evade","emoji":"🏃"},{"id":"caught","label":"Gets Caught","emoji":"🚔"}],"items":[{"id":"i1","text":"Wearing gloves"},{"id":"i2","text":"Using own phone during heist"},{"id":"i3","text":"Parking blocks away"},{"id":"i4","text":"Bragging to friends after"},{"id":"i5","text":"Hitting same neighborhood twice"}],"correctMapping":{"i1":"evade","i2":"caught","i3":"evade","i4":"caught","i5":"caught"},"layout":"columns"}', 2, ARRAY['heist','review','caught']),

('a1140000-0000-0000-0000-000000000002', 'mcq', 'Review: Solve Rate', 'Why is the burglary solve rate so low (~14%)?', 'Think about evidence and prioritization.',
'{"options":[{"id":"a","text":"Police don''t investigate them"},{"id":"b","text":"Low physical evidence + high volume of cases"},{"id":"c","text":"Burglars are master criminals"},{"id":"d","text":"Victims don''t report them"}],"correctOptionId":"b"}', 2, ARRAY['heist','review','statistics']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000014', 'a1140000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000014', 'a1140000-0000-0000-0000-000000000002', 2);

-- =================================================================
-- UNIT 5 — Fortify Your Home (Defense Masterclass)
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b1000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000002', 'Fortify Your Home', 'Now flip the script — use everything you learned to make your home impenetrable.', 5);

-- Lesson 5.1 — Layered Security
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d1000000-0000-0000-0000-000000000015', 'b1000000-0000-0000-0000-000000000005', 'Layered Security', 'Defense in depth: perimeter, entry points, interior, and response.', '🛡️', 1, 15);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1150000-0000-0000-0000-000000000001', 'ordering', 'Security Layers', 'Order these security layers from OUTERMOST to INNERMOST.', 'Think concentric rings of defense.',
'{"items":[{"id":"i1","label":"Neighborhood awareness (watch groups)","emoji":"👥"},{"id":"i2","label":"Perimeter (fences, lights, cameras)","emoji":"🔦"},{"id":"i3","label":"Entry hardening (locks, doors, windows)","emoji":"🔒"},{"id":"i4","label":"Interior (safe, alarm, dog)","emoji":"🐕"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['heist','defense','layers']),

('a1150000-0000-0000-0000-000000000002', 'mcq', 'Best Bang for Buck', 'Which single security upgrade provides the MOST deterrence per dollar?', 'Visibility and community awareness deter more than any gadget.',
'{"options":[{"id":"a","text":"$500 smart lock"},{"id":"b","text":"$30 motion-sensor lights"},{"id":"c","text":"$200 security camera"},{"id":"d","text":"$1000 alarm system"}],"correctOptionId":"b"}', 2, ARRAY['heist','defense','cost']),

('a1150000-0000-0000-0000-000000000003', 'thought-tree', 'Build Your Security Plan', 'Walk through building a layered security plan for a typical suburban home.', 'Start from the outside and work inward.',
'{"nodes":[{"id":"n1","question":"First layer: Is your yard visible from the street?","leftChoice":{"id":"n1l","text":"Yes (good)"},"rightChoice":{"id":"n1r","text":"No (trim bushes)"},"correctChoiceId":"n1l"},{"id":"n2","question":"Do you have exterior lighting?","leftChoice":{"id":"n2l","text":"Yes, motion-activated"},"rightChoice":{"id":"n2r","text":"No"},"correctChoiceId":"n2l"},{"id":"n3","question":"Are all entry points hardened (deadbolts, bars, film)?","leftChoice":{"id":"n3l","text":"Yes"},"rightChoice":{"id":"n3r","text":"Not yet"},"correctChoiceId":"n3l"},{"id":"n4","question":"Do you have a monitored alarm or cameras?","leftChoice":{"id":"n4l","text":"Yes"},"rightChoice":{"id":"n4r","text":"No"},"correctChoiceId":"n4l"},{"id":"n5","question":"Are valuables in a bolted safe or off-site?","leftChoice":{"id":"n5l","text":"Yes"},"rightChoice":{"id":"n5r","text":"No, hiding spots only"},"correctChoiceId":"n5l"}],"finalAnswer":"A fully layered approach — visible yard, lighting, hardened entries, alarm, and secured valuables — makes your home one of the hardest targets on the block."}', 3, ARRAY['heist','defense','planning']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000015', 'a1150000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000015', 'a1150000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000015', 'a1150000-0000-0000-0000-000000000003', 3);

-- Lesson 5.2 — Smart Home Defense
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d1000000-0000-0000-0000-000000000016', 'b1000000-0000-0000-0000-000000000005', 'Smart Home Defense', 'Modern tech that makes burglary obsolete.', '📱', 2, 15);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1160000-0000-0000-0000-000000000001', 'match-pairs', 'Tech vs. Threat', 'Match each smart home device to the burglary threat it counters.', 'Each device covers a specific vulnerability.',
'{"leftItems":[{"id":"l1","text":"Smart doorbell (Ring/Nest)"},{"id":"l2","text":"Smart lights (random schedule)"},{"id":"l3","text":"Window/door sensors"},{"id":"l4","text":"GPS asset trackers (AirTag)"}],"rightItems":[{"id":"r1","text":"Deters recon knocking"},{"id":"r2","text":"Simulates occupancy"},{"id":"r3","text":"Detects entry in real-time"},{"id":"r4","text":"Tracks stolen items"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Smart Device","rightColumnLabel":"Threat Countered"}', 2, ARRAY['heist','defense','smart-home']),

('a1160000-0000-0000-0000-000000000002', 'categorization-grid', 'DIY vs. Pro Install', 'Categorize each security measure as DIY-friendly or professional installation.', 'Some require wiring or monitoring contracts.',
'{"categories":[{"id":"diy","label":"DIY Friendly","emoji":"🔨"},{"id":"pro","label":"Professional","emoji":"👷"}],"items":[{"id":"i1","text":"Ring doorbell camera"},{"id":"i2","text":"Hardwired alarm system"},{"id":"i3","text":"Window security film"},{"id":"i4","text":"Smart lock replacement"},{"id":"i5","text":"Reinforced door frame"},{"id":"i6","text":"Monitored panic button"}],"correctMapping":{"i1":"diy","i2":"pro","i3":"diy","i4":"diy","i5":"pro","i6":"pro"},"layout":"columns"}', 2, ARRAY['heist','defense','smart-home','installation']),

('a1160000-0000-0000-0000-000000000003', 'mcq', 'Smart Lock Risk', 'What is the biggest security risk of a smart lock?', 'Tech can fail or be exploited.',
'{"options":[{"id":"a","text":"It looks fancy and attracts burglars"},{"id":"b","text":"Battery dying leaves you locked out or unlocked"},{"id":"c","text":"Hackers can easily break the Bluetooth"},{"id":"d","text":"They''re too complicated for most people"}],"correctOptionId":"b"}', 2, ARRAY['heist','defense','smart-home','risks']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000016', 'a1160000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000016', 'a1160000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000016', 'a1160000-0000-0000-0000-000000000003', 3);

-- Lesson 5.3 — Final Exam: Home Security Audit
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d1000000-0000-0000-0000-000000000017', 'b1000000-0000-0000-0000-000000000005', 'Final Security Audit', 'The ultimate test — can you think like a burglar AND a defender?', '🏆', 3, 25, true);

INSERT INTO applets (id, type, title, question, hint, content, difficulty, tags) VALUES
('a1170000-0000-0000-0000-000000000001', 'thought-tree', 'Full Heist Simulation', 'You''re a burglar approaching a suburban home at 1 PM on a Wednesday. Run through your full decision tree.', 'Every step has risk. Think through each one.',
'{"nodes":[{"id":"n1","question":"You see a Ring doorbell and an alarm sign. Proceed?","leftChoice":{"id":"n1l","text":"No, find easier target"},"rightChoice":{"id":"n1r","text":"Yes, could be fake"},"correctChoiceId":"n1l"},{"id":"n2","question":"Next house: no cameras, piled-up mail, dark inside. Try the front door?","leftChoice":{"id":"n2l","text":"Yes, test the handle"},"rightChoice":{"id":"n2r","text":"No, check side entry"},"correctChoiceId":"n2r"},{"id":"n3","question":"Side gate is unlocked. Check the back?","leftChoice":{"id":"n3l","text":"Yes"},"rightChoice":{"id":"n3r","text":"No, too exposed"},"correctChoiceId":"n3l"},{"id":"n4","question":"Sliding door has no bar. Force it open?","leftChoice":{"id":"n4l","text":"Yes (quick entry)"},"rightChoice":{"id":"n4r","text":"No (might have alarm)"},"correctChoiceId":"n4l"},{"id":"n5","question":"You''re in. Alarm panel is beeping a countdown. Run?","leftChoice":{"id":"n5l","text":"Yes, bail immediately!"},"rightChoice":{"id":"n5r","text":"No, grab and go fast"},"correctChoiceId":"n5l"}],"finalAnswer":"The monitored alarm made this a bad target after all. Even a 30-second countdown means police are called. The best defense: layers that force burglars to give up at every stage."}', 4, ARRAY['heist','final','simulation']),

('a1170000-0000-0000-0000-000000000002', 'ordering', 'Security Budget Priority', 'You have $500 to spend. Rank these purchases from MOST to LEAST impactful.', 'Prioritize deterrence and delay.',
'{"items":[{"id":"i1","label":"Motion-sensor flood lights ($30)","emoji":"💡"},{"id":"i2","label":"Deadbolt + strike plate upgrade ($80)","emoji":"🔒"},{"id":"i3","label":"Video doorbell camera ($100)","emoji":"📹"},{"id":"i4","label":"Window security bars ($200)","emoji":"🪟"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 3, ARRAY['heist','final','budget']),

('a1170000-0000-0000-0000-000000000003', 'categorization-grid', 'Final Audit: Your Home', 'Rate each area of a typical home as SECURE or NEEDS WORK based on the defaults.', 'Most homes have the same weak points.',
'{"categories":[{"id":"secure","label":"Usually Secure","emoji":"✅"},{"id":"weak","label":"Usually Weak","emoji":"⚠️"}],"items":[{"id":"i1","text":"Front door lock (standard deadbolt)"},{"id":"i2","text":"Ground floor windows (no locks engaged)"},{"id":"i3","text":"Garage (connected to house, auto-opener)"},{"id":"i4","text":"Sliding glass door (no security bar)"},{"id":"i5","text":"Exterior lighting (porch light only)"},{"id":"i6","text":"Neighbors aware of your schedule"}],"correctMapping":{"i1":"secure","i2":"weak","i3":"weak","i4":"weak","i5":"weak","i6":"secure"},"layout":"columns"}', 3, ARRAY['heist','final','audit']),

('a1170000-0000-0000-0000-000000000004', 'fill-blanks', 'Security Mantra', 'The golden rule: make your home ___ than your neighbor''s, not ___.', 'Burglars choose the easiest target.',
'{"segments":[{"type":"text","content":"The golden rule: make your home "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" than your neighbor''s, not "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":"."}],"answerBlocks":[{"id":"ans1","content":"harder to rob"},{"id":"ans2","content":"impenetrable"},{"id":"d1","content":"more expensive"},{"id":"d2","content":"prettier"},{"id":"d3","content":"invisible"},{"id":"d4","content":"easier to sell"}]}', 2, ARRAY['heist','final','philosophy']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d1000000-0000-0000-0000-000000000017', 'a1170000-0000-0000-0000-000000000001', 1),
('d1000000-0000-0000-0000-000000000017', 'a1170000-0000-0000-0000-000000000002', 2),
('d1000000-0000-0000-0000-000000000017', 'a1170000-0000-0000-0000-000000000003', 3),
('d1000000-0000-0000-0000-000000000017', 'a1170000-0000-0000-0000-000000000004', 4);
