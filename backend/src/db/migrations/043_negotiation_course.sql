-- Migration: 043_negotiation_course
-- Description: "The Art of Negotiation" course — master persuasion, deal-making,
-- conflict resolution, and strategic communication through interactive exercises.
-- 5 Units, 17 Lessons, ~52 applets with explanations on every applet.

-- =================================================================
-- COURSE
-- =================================================================
INSERT INTO courses (id, title, description, emoji, color, is_published, sort_order) VALUES
('c0000000-0000-0000-0000-000000000003', 'The Art of Negotiation', 'From salary talks to hostage crises — learn the science and psychology of getting what you want.', '🤝', '#6C63FF', true, 3);

-- =================================================================
-- UNIT 1 — Foundations (Psychology of Negotiation)
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b2000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', 'The Psychology of Deals', 'Understand the cognitive biases and emotional drivers behind every negotiation.', 1);

-- ─── Lesson 1.1 — What is Negotiation? ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000001', 'What is Negotiation?', 'It''s not about winning — it''s about finding a deal both sides prefer to no deal.', '💬', 1, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2010000-0000-0000-0000-000000000001', 'mcq', 'Negotiation Defined', 'Which statement BEST defines negotiation?', 'Think about what makes negotiation different from arguing.',
'Negotiation is a structured process where parties with different interests seek a mutually acceptable outcome. Unlike arguing (to win), debating (to persuade an audience), or compromising (splitting the difference), negotiation aims to create value so both sides leave better off than their alternative.',
'{"options":[{"id":"a","text":"A process where the stronger party gets what they want"},{"id":"b","text":"A discussion where parties with different interests seek a mutually acceptable agreement"},{"id":"c","text":"A debate to prove who is right"},{"id":"d","text":"The art of convincing someone to give you what you want"}],"correctOptionId":"b"}', 1, ARRAY['negotiation','foundations']),

('a2010000-0000-0000-0000-000000000002', 'categorization-grid', 'Negotiation or Not?', 'Categorize each scenario as a NEGOTIATION or NOT a negotiation.', 'Negotiation requires two parties with different interests who can walk away.',
'Buying a used car involves back-and-forth offers — classic negotiation. A judge sentencing someone is a unilateral decision, not a negotiation. Salary discussions involve mutual agreement on terms. Paying a parking ticket is a fixed penalty — no room for discussion. Dividing chores requires agreement between parties. A store sale is a take-it-or-leave-it offer, not negotiation.',
'{"categories":[{"id":"yes","label":"Negotiation","emoji":"🤝"},{"id":"no","label":"Not Negotiation","emoji":"❌"}],"items":[{"id":"i1","text":"Buying a used car"},{"id":"i2","text":"A judge sentencing a defendant"},{"id":"i3","text":"Discussing salary at a job offer"},{"id":"i4","text":"Paying a parking ticket"},{"id":"i5","text":"Dividing household chores"},{"id":"i6","text":"Buying items on sale at a store"}],"correctMapping":{"i1":"yes","i2":"no","i3":"yes","i4":"no","i5":"yes","i6":"no"},"layout":"columns"}', 1, ARRAY['negotiation','foundations']),

('a2010000-0000-0000-0000-000000000003', 'fill-blanks', 'The Core Equation', 'A negotiation only works if the deal is better than each side''s ___ — their Best Alternative to a ___ Agreement.', 'The acronym is BATNA.',
'BATNA (Best Alternative To a Negotiated Agreement) is the single most important concept in negotiation theory. Coined by Fisher and Ury in "Getting to Yes," it represents your plan B if negotiations fail. A strong BATNA gives you leverage — you can confidently walk away. A weak BATNA means you''re desperate and likely to accept bad terms.',
'{"segments":[{"type":"text","content":"A negotiation only works if the deal is better than each side''s "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" — their Best Alternative to a "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" Agreement."}],"answerBlocks":[{"id":"ans1","content":"BATNA"},{"id":"ans2","content":"Negotiated"},{"id":"d1","content":"position"},{"id":"d2","content":"Final"},{"id":"d3","content":"WATNA"},{"id":"d4","content":"Settled"}]}', 1, ARRAY['negotiation','foundations','batna']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000001', 'a2010000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000001', 'a2010000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000001', 'a2010000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 1.2 — Cognitive Biases ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000002', 'b2000000-0000-0000-0000-000000000001', 'Cognitive Biases', 'The mental shortcuts that sabotage your deals.', '🧠', 2, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2020000-0000-0000-0000-000000000001', 'match-pairs', 'Bias Spotter', 'Match each cognitive bias to the negotiation mistake it causes.', 'Each bias creates a specific blind spot.',
'Anchoring makes us fixate on the first number we hear — whoever states a price first sets the mental reference point. Loss aversion means we irrationally overvalue what we have vs. what we could gain. The endowment effect makes sellers overvalue their possessions. Confirmation bias makes us only hear evidence supporting our position, missing creative solutions.',
'{"leftItems":[{"id":"l1","text":"Anchoring bias"},{"id":"l2","text":"Loss aversion"},{"id":"l3","text":"Endowment effect"},{"id":"l4","text":"Confirmation bias"}],"rightItems":[{"id":"r1","text":"Fixating on the first number mentioned"},{"id":"r2","text":"Fearing losses more than valuing gains"},{"id":"r3","text":"Overvaluing what you already own"},{"id":"r4","text":"Only hearing what supports your position"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Cognitive Bias","rightColumnLabel":"Negotiation Mistake"}', 2, ARRAY['negotiation','biases','psychology']),

('a2020000-0000-0000-0000-000000000002', 'mcq', 'The Anchoring Trap', 'A seller lists their car at $15,000 (knowing it''s worth $10,000). You think "I''ll offer $12,000 — that''s $3,000 less!" What just happened?', 'The seller set the mental starting point.',
'You got anchored. The seller''s $15,000 list price became your unconscious reference point. Your "discount" of $3,000 still leaves you $2,000 above market value. This is why experienced negotiators either make the first offer (to set the anchor) or completely ignore the other side''s opening number and reset with independent research.',
'{"options":[{"id":"a","text":"You made a fair counter-offer"},{"id":"b","text":"You got anchored to their inflated starting price"},{"id":"c","text":"You used good negotiation tactics"},{"id":"d","text":"The seller is being unreasonable"}],"correctOptionId":"b"}', 2, ARRAY['negotiation','biases','anchoring']),

('a2020000-0000-0000-0000-000000000003', 'thought-tree', 'Bias Check', 'You''re buying a used laptop listed at $800. Walk through each bias trap.', 'At each step, identify and counter the bias.',
'Each decision point in this tree maps to a specific bias. The $800 anchor should be replaced with independent research. The sunk cost of time spent is irrelevant to value. The urgency trick exploits scarcity bias. The bundle "deal" uses the decoy effect. Successful negotiators recognize these patterns in real-time and reset to objective criteria.',
'{"nodes":[{"id":"n1","question":"The seller says $800. Do you counter based on that price?","leftChoice":{"id":"n1l","text":"No — research value independently"},"rightChoice":{"id":"n1r","text":"Yes — offer 20% less"},"correctChoiceId":"n1l"},{"id":"n2","question":"You''ve spent 2 hours negotiating. Accept $650 to not waste more time?","leftChoice":{"id":"n2l","text":"No — sunk cost is irrelevant"},"rightChoice":{"id":"n2r","text":"Yes — I''ve invested too much time"},"correctChoiceId":"n2l"},{"id":"n3","question":"\"Someone else is interested\" — increase your offer?","leftChoice":{"id":"n3l","text":"No — verify, don''t react to pressure"},"rightChoice":{"id":"n3r","text":"Yes — I might lose it"},"correctChoiceId":"n3l"},{"id":"n4","question":"\"I''ll throw in a free case\" — does that change the deal?","leftChoice":{"id":"n4l","text":"No — a $10 case doesn''t change laptop value"},"rightChoice":{"id":"n4r","text":"Yes — more value!"},"correctChoiceId":"n4l"}],"finalAnswer":"Every step had a bias trap: anchoring, sunk cost, scarcity, and the decoy effect. Counter each with independent research and objective criteria."}', 2, ARRAY['negotiation','biases','decision']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000002', 'a2020000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000002', 'a2020000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000002', 'a2020000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 1.3 — Emotional Intelligence ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000003', 'b2000000-0000-0000-0000-000000000001', 'Emotional Intelligence', 'Feelings drive deals more than facts. Learn to read and manage them.', '❤️', 3, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2030000-0000-0000-0000-000000000001', 'ordering', 'Emotional Escalation', 'Rank these negotiation situations from LOWEST to HIGHEST emotional stakes.', 'Think about how personal the outcome feels.',
'Splitting a restaurant bill is low-stakes and impersonal. Salary negotiations feel personal but are somewhat routine. Divorce settlements combine financial and deep emotional stakes. Custody battles are the most emotionally charged because a child''s wellbeing is at stake. As emotional stakes rise, rational thinking decreases — which is why mediators exist for high-stakes disputes.',
'{"items":[{"id":"i1","label":"Splitting a restaurant bill","emoji":"🍕"},{"id":"i2","label":"Negotiating a salary raise","emoji":"💰"},{"id":"i3","label":"Settling a divorce agreement","emoji":"💔"},{"id":"i4","label":"Negotiating child custody","emoji":"👶"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 1, ARRAY['negotiation','emotions']),

('a2030000-0000-0000-0000-000000000002', 'match-pairs', 'Emotion Decoder', 'Match the body language signal to the emotion it reveals during negotiation.', 'Nonverbal cues often contradict words.',
'Crossed arms signal defensiveness — the person feels threatened or closed off. Leaning forward shows genuine interest and engagement. Avoiding eye contact typically indicates discomfort or deception. Steepled fingers (fingertips touching) is a classic confidence/power display. Reading these signals lets you adjust your approach in real-time — soften when they''re defensive, push when they''re engaged.',
'{"leftItems":[{"id":"l1","text":"Arms crossed tightly"},{"id":"l2","text":"Leaning forward, nodding"},{"id":"l3","text":"Avoiding eye contact"},{"id":"l4","text":"Steepled fingers"}],"rightItems":[{"id":"r1","text":"Defensive / closed off"},{"id":"r2","text":"Engaged / interested"},{"id":"r3","text":"Uncomfortable / hiding something"},{"id":"r4","text":"Confident / in control"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Body Language","rightColumnLabel":"Emotional State"}', 2, ARRAY['negotiation','emotions','body-language']),

('a2030000-0000-0000-0000-000000000003', 'mcq', 'The Empathy Move', 'Your counterpart says "This just isn''t fair!" The BEST response is:', 'Mirror their emotion before addressing the issue.',
'Chris Voss (former FBI hostage negotiator) calls this "tactical empathy." Labeling someone''s emotion ("It sounds like you feel this is unfair") validates their feelings without agreeing or disagreeing. This lowers their defensive walls and moves them from emotional reaction to rational thinking. Dismissing emotions ("let''s stick to facts") creates adversarial dynamics.',
'{"options":[{"id":"a","text":"\"Let''s focus on the facts, not feelings\""},{"id":"b","text":"\"I understand you feel that way. Tell me what fairness looks like to you\""},{"id":"c","text":"\"Life isn''t fair — let''s move on\""},{"id":"d","text":"\"You''re being emotional. Take a break and come back\"."}],"correctOptionId":"b"}', 2, ARRAY['negotiation','emotions','empathy']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000003', 'a2030000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000003', 'a2030000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000003', 'a2030000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 1.4 — Unit 1 Checkpoint ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d2000000-0000-0000-0000-000000000004', 'b2000000-0000-0000-0000-000000000001', 'Psychology Review', 'Test your grasp of negotiation psychology.', '🏁', 4, 15, true);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2040000-0000-0000-0000-000000000001', 'fill-blanks', 'Review: BATNA', 'Your ___ is your power. The better your alternative, the more confidently you can ___ from a bad deal.', 'The concept comes from Harvard''s negotiation project.',
'Your BATNA is quite literally your negotiation superpower. If you have a job offer from Company B, you can negotiate fearlessly with Company A because you have a great alternative. If Company A is your only option, they hold all the leverage. Before ANY negotiation, invest time improving your BATNA — it''s the single highest-ROI preparation step.',
'{"segments":[{"type":"text","content":"Your "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" is your power. The better your alternative, the more confidently you can "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" from a bad deal."}],"answerBlocks":[{"id":"ans1","content":"BATNA"},{"id":"ans2","content":"walk away"},{"id":"d1","content":"offer"},{"id":"d2","content":"profit"},{"id":"d3","content":"position"},{"id":"d4","content":"push back"}]}', 2, ARRAY['negotiation','review','batna']),

('a2040000-0000-0000-0000-000000000002', 'categorization-grid', 'Review: Bias or Strategy?', 'Is each behavior a cognitive BIAS (harmful) or a legitimate STRATEGY (helpful)?', 'Biases are unconscious traps. Strategies are deliberate choices.',
'Anchoring with the first offer is a deliberate strategy — you set the reference point. Getting emotionally attached to an outcome is a bias that clouds judgment. Making a time-limited offer is strategic pressure. Overvaluing what you''re selling (endowment effect) is an unconscious bias. Preparation with market research is strategic. Refusing to budge is ego-driven bias.',
'{"categories":[{"id":"bias","label":"Cognitive Bias","emoji":"🧠"},{"id":"strategy","label":"Strategy","emoji":"♟️"}],"items":[{"id":"i1","text":"Making the first offer to set the anchor"},{"id":"i2","text":"Getting emotionally attached to a specific outcome"},{"id":"i3","text":"Making a time-limited offer"},{"id":"i4","text":"Overvaluing what you own (seller)"},{"id":"i5","text":"Researching market rates before negotiating"},{"id":"i6","text":"Refusing to budge because \"I deserve it\""}],"correctMapping":{"i1":"strategy","i2":"bias","i3":"strategy","i4":"bias","i5":"strategy","i6":"bias"},"layout":"columns"}', 2, ARRAY['negotiation','review','biases']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000004', 'a2040000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000004', 'a2040000-0000-0000-0000-000000000002', 2);

-- =================================================================
-- UNIT 2 — Preparation & Strategy
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b2000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000003', 'Preparation & Strategy', 'The deal is won before you sit down. Learn how to prepare like a pro.', 2);

-- ─── Lesson 2.1 — Know Your Numbers ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000005', 'b2000000-0000-0000-0000-000000000002', 'Know Your Numbers', 'BATNA, reservation price, aspiration price, ZOPA — the math of deals.', '🔢', 1, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2050000-0000-0000-0000-000000000001', 'ordering', 'The Negotiation Range', 'Order these negotiation concepts from the point you''d WALK AWAY to your DREAM outcome.', 'BATNA is the floor. Aspiration is the ceiling.',
'Your BATNA is the absolute floor — if the deal isn''t better than this, walk away. Your reservation price is the minimum you''d accept (slightly above BATNA). The ZOPA (Zone of Possible Agreement) is where both parties'' ranges overlap — this is where deals happen. Your aspiration price is the ambitious but realistic goal. Always prepare all four before negotiating.',
'{"items":[{"id":"i1","label":"BATNA (your alternative if no deal)","emoji":"🚪"},{"id":"i2","label":"Reservation price (minimum acceptable)","emoji":"⚠️"},{"id":"i3","label":"ZOPA (zone where deal can happen)","emoji":"🤝"},{"id":"i4","label":"Aspiration price (your ideal outcome)","emoji":"⭐"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['negotiation','preparation','zopa']),

('a2050000-0000-0000-0000-000000000002', 'mcq', 'Finding the ZOPA', 'A buyer will pay up to $300K for a house. The seller won''t accept less than $280K. What is the ZOPA?', 'ZOPA is where ranges overlap.',
'The ZOPA (Zone of Possible Agreement) is $280K–$300K. The buyer''s ceiling is $300K, the seller''s floor is $280K, so there''s a $20K overlap where both would prefer a deal over no deal. If the buyer would only pay $270K and the seller needs $280K, there''s NO ZOPA — no deal is possible regardless of negotiation skill.',
'{"options":[{"id":"a","text":"There is no ZOPA"},{"id":"b","text":"$280K – $300K"},{"id":"c","text":"$0 – $300K"},{"id":"d","text":"Exactly $290K"}],"correctOptionId":"b"}', 2, ARRAY['negotiation','preparation','zopa']),

('a2050000-0000-0000-0000-000000000003', 'chart-reading', 'Salary Negotiation Data', 'You''re negotiating a software engineer salary. Select the TWO data points that represent the strongest BATNA evidence.', 'BATNA evidence is objective data about alternatives.',
'The median salary ($135K) and the competing offer ($140K) are the strongest BATNA evidence because they represent real, verifiable alternatives. "What I think I''m worth" is subjective and unconvincing. Your current salary anchors you to the past. Cost of living is relevant but doesn''t constitute a BATNA. Always ground negotiation in external, verifiable data points.',
'{"chartType":"bar","chartTitle":"Software Engineer Compensation Data","data":[{"id":"median","label":"Industry Median","value":135},{"id":"offer","label":"Competing Offer","value":140},{"id":"self","label":"What I Think","value":155},{"id":"current","label":"Current Salary","value":120},{"id":"cost","label":"Cost of Living","value":48}],"xAxisLabel":"Data Source","yAxisLabel":"Amount ($K)","selectCount":2,"correctIds":["median","offer"]}', 2, ARRAY['negotiation','preparation','salary']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000005', 'a2050000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000005', 'a2050000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000005', 'a2050000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 2.2 — Interests vs. Positions ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000006', 'b2000000-0000-0000-0000-000000000002', 'Interests vs. Positions', 'The #1 mistake: arguing positions instead of uncovering interests.', '🎯', 2, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2060000-0000-0000-0000-000000000001', 'categorization-grid', 'Position or Interest?', 'Categorize each statement as a POSITION (what they say) or INTEREST (what they actually need).', 'Positions are demands. Interests are the reasons behind demands.',
'Positions are rigid demands ("I want X"). Interests are the underlying needs that could be satisfied in multiple ways. "I need $80K" is a position, but the interest might be "I need financial security" — which could be met via salary, bonus, equity, or benefits. Uncovering interests opens creative solutions that positions block.',
'{"categories":[{"id":"position","label":"Position","emoji":"📌"},{"id":"interest","label":"Interest","emoji":"🎯"}],"items":[{"id":"i1","text":"\"I want a corner office\""},{"id":"i2","text":"\"I need to feel respected by the team\""},{"id":"i3","text":"\"The price must be $50 or less\""},{"id":"i4","text":"\"I need this project to stay within budget\""},{"id":"i5","text":"\"I want to work from home every day\""},{"id":"i6","text":"\"I need flexibility for childcare pickup\""}],"correctMapping":{"i1":"position","i2":"interest","i3":"position","i4":"interest","i5":"position","i6":"interest"},"layout":"columns"}', 2, ARRAY['negotiation','interests','positions']),

('a2060000-0000-0000-0000-000000000002', 'mcq', 'The Orange Story', 'Two siblings fight over the last orange. Their mom cuts it in half. Why was this a BAD negotiation outcome?', 'Think about what each child actually wanted the orange FOR.',
'This is the most famous negotiation parable. One child wanted the juice (to drink), the other wanted the peel (to bake). Cutting it in half gave each child 50% of what they needed. If mom had asked WHY each wanted the orange, she could have given the juice to one and the peel to the other — 100% satisfaction for both. This is the power of asking about interests, not just positions.',
'{"options":[{"id":"a","text":"Because one child deserved more than the other"},{"id":"b","text":"Because she didn''t ask WHY each child wanted the orange — one wanted juice, the other wanted peel"},{"id":"c","text":"Because she should have bought another orange"},{"id":"d","text":"Because halving is always unfair"}],"correctOptionId":"b"}', 2, ARRAY['negotiation','interests','classic']),

('a2060000-0000-0000-0000-000000000003', 'ordering', 'Questions That Unlock', 'Rank these questions from LEAST to MOST effective at uncovering interests.', 'The best questions ask WHY, not WHAT.',
'Closed questions ("Is $50K your final offer?") get yes/no answers that lock in positions. "What do you want?" still asks for a position. "What would this deal need to include for you to feel great about it?" explores interests more broadly. "Help me understand why that''s important to you" is the gold standard — it goes directly to the underlying motivation without judgment.',
'{"items":[{"id":"i1","label":"\"Is that your final offer?\"","emoji":"❌"},{"id":"i2","label":"\"What do you want?\"","emoji":"😐"},{"id":"i3","label":"\"What would make this deal feel great for you?\"","emoji":"👍"},{"id":"i4","label":"\"Help me understand why that''s important to you\"","emoji":"⭐"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['negotiation','interests','questions']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000006', 'a2060000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000006', 'a2060000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000006', 'a2060000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 2.3 — Preparation Checklist ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000007', 'b2000000-0000-0000-0000-000000000002', 'The Prep Checklist', 'Everything you must know before sitting down at the table.', '📋', 3, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2070000-0000-0000-0000-000000000001', 'ordering', 'Prep Priority', 'Order these preparation steps from FIRST to LAST.', 'You must understand yourself before understanding the other side.',
'Research comes first — you can''t negotiate without data. Then define YOUR BATNA so you know your walkaway point. Then analyze THEIR situation (interests, constraints, BATNA). Finally, plan your opening because it should be informed by all the previous steps. Many negotiators jump straight to "what should I say first?" — skipping the homework that makes their opening effective.',
'{"items":[{"id":"i1","label":"Research market data and benchmarks","emoji":"📊"},{"id":"i2","label":"Define your BATNA and reservation price","emoji":"🚪"},{"id":"i3","label":"Analyze the other side''s interests and constraints","emoji":"🔍"},{"id":"i4","label":"Plan your opening offer and framing","emoji":"💬"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['negotiation','preparation','checklist']),

('a2070000-0000-0000-0000-000000000002', 'mcq', 'Know Their Side', 'What is the MOST important thing to research about your counterpart before negotiating?', 'Understanding their constraints tells you where flexibility exists.',
'Knowing their constraints and pressures reveals where they have flexibility and where they don''t. A vendor under quarterly revenue pressure might discount for a quick close. A hiring manager who''s been searching for months might offer more to avoid restarting. Their personal style, your market data, and their authority matter — but their constraints are the key to creative deal-making.',
'{"options":[{"id":"a","text":"Their personal negotiation style"},{"id":"b","text":"Their constraints, pressures, and what they need most"},{"id":"c","text":"How much money they have"},{"id":"d","text":"Whether they''ve negotiated with people like you before"}],"correctOptionId":"b"}', 2, ARRAY['negotiation','preparation','research']),

('a2070000-0000-0000-0000-000000000003', 'fill-blanks', 'The Preparation Rule', 'Harvard research shows that negotiators who prepare spend ___ the time at the table and get ___ outcomes.', 'Preparation is the highest-ROI negotiation activity.',
'Multiple studies from Harvard and Wharton show that prepared negotiators achieve significantly better outcomes in less time. Preparation eliminates uncertainty, builds confidence, and lets you react to surprises without panic. The rule of thumb: spend at least twice as much time preparing as you expect to spend negotiating.',
'{"segments":[{"type":"text","content":"Harvard research shows that negotiators who prepare spend "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" the time at the table and get "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" outcomes."}],"answerBlocks":[{"id":"ans1","content":"half"},{"id":"ans2","content":"better"},{"id":"d1","content":"double"},{"id":"d2","content":"triple"},{"id":"d3","content":"worse"},{"id":"d4","content":"similar"}]}', 2, ARRAY['negotiation','preparation','research']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000007', 'a2070000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000007', 'a2070000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000007', 'a2070000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 2.4 — Unit 2 Checkpoint ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d2000000-0000-0000-0000-000000000008', 'b2000000-0000-0000-0000-000000000002', 'Strategy Review', 'Can you plan a negotiation from scratch?', '🏁', 4, 15, true);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2080000-0000-0000-0000-000000000001', 'thought-tree', 'Salary Prep Simulation', 'You''re preparing to negotiate a raise. Walk through your prep strategy.', 'Preparation before communication.',
'This simulation walks through the ideal preparation sequence: first establish market data (objective anchor), then assess your alternatives (BATNA power), then understand your boss''s constraints (their budget reality), then choose your framing (interests, not demands). Skipping any step weakens your position and increases the chance of an emotional, unsuccessful conversation.',
'{"nodes":[{"id":"n1","question":"First step: What should you research?","leftChoice":{"id":"n1l","text":"Market salary data for your role"},"rightChoice":{"id":"n1r","text":"What your coworkers earn"},"correctChoiceId":"n1l"},{"id":"n2","question":"Next: Define your power. What matters most?","leftChoice":{"id":"n2l","text":"Your BATNA (other job offers)"},"rightChoice":{"id":"n2r","text":"How long you''ve been at the company"},"correctChoiceId":"n2l"},{"id":"n3","question":"Now: Understand their side. What''s key?","leftChoice":{"id":"n3l","text":"Their budget cycle and constraints"},"rightChoice":{"id":"n3r","text":"Whether they like you personally"},"correctChoiceId":"n3l"},{"id":"n4","question":"Finally: How do you frame your ask?","leftChoice":{"id":"n4l","text":"\"Based on market data and my contributions...\""},"rightChoice":{"id":"n4r","text":"\"I deserve more because I work hard\""},"correctChoiceId":"n4l"},{"id":"n5","question":"They say the budget is tight. Your move?","leftChoice":{"id":"n5l","text":"Ask about non-salary options (title, equity, PTO)"},"rightChoice":{"id":"n5r","text":"Accept and try again next year"},"correctChoiceId":"n5l"}],"finalAnswer":"Great preparation: market data → BATNA → their constraints → interest-based framing → creative alternatives when blocked. This sequence maximizes your outcome."}', 3, ARRAY['negotiation','review','salary']),

('a2080000-0000-0000-0000-000000000002', 'match-pairs', 'Review: Concepts', 'Match each negotiation concept to its definition.', 'These are the building blocks of every negotiation.',
'These four concepts form the complete analytical framework for any negotiation. BATNA tells you when to walk away. ZOPA tells you where a deal can exist. Reservation price is your personal line in the sand. Aspiration price is your stretch goal. Together they create a complete map of the negotiation landscape before you even begin talking.',
'{"leftItems":[{"id":"l1","text":"BATNA"},{"id":"l2","text":"ZOPA"},{"id":"l3","text":"Reservation price"},{"id":"l4","text":"Aspiration price"}],"rightItems":[{"id":"r1","text":"Best alternative if no deal is reached"},{"id":"r2","text":"The range where both sides can agree"},{"id":"r3","text":"The minimum you would accept"},{"id":"r4","text":"Your ideal, ambitious target"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Concept","rightColumnLabel":"Definition"}', 2, ARRAY['negotiation','review','concepts']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000008', 'a2080000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000008', 'a2080000-0000-0000-0000-000000000002', 2);

-- =================================================================
-- UNIT 3 — Tactics & Techniques
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b2000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 'Tactics & Techniques', 'The specific moves that win deals — from anchoring to silence to logrolling.', 3);

-- ─── Lesson 3.1 — Opening Moves ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000009', 'b2000000-0000-0000-0000-000000000003', 'Opening Moves', 'How to start strong — first offers, framing, and anchoring.', '♟️', 1, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2090000-0000-0000-0000-000000000001', 'mcq', 'Who Goes First?', 'In a salary negotiation, should YOU make the first offer?', 'First offers set the anchor, but only if informed.',
'Research by Adam Galinsky (Columbia) shows that making the first offer leads to better outcomes — IF you have good information. The first number becomes the anchor around which all subsequent discussion revolves. However, if you lack information, going first risks anchoring too low. The rule: go first when informed, let them go first when uncertain.',
'{"options":[{"id":"a","text":"Never — let them reveal their number first"},{"id":"b","text":"Yes, if you have strong market data to anchor high"},{"id":"c","text":"Always — it shows confidence"},{"id":"d","text":"It doesn''t matter who goes first"}],"correctOptionId":"b"}', 2, ARRAY['negotiation','tactics','opening']),

('a2090000-0000-0000-0000-000000000002', 'ordering', 'The Opening Sequence', 'Order these opening moves from FIRST to LAST for maximum effectiveness.', 'Build rapport before numbers.',
'Starting with rapport builds trust. Framing the discussion as collaborative (not adversarial) sets the tone. Asking about their priorities reveals interests before you commit to specifics. THEN making your anchored first offer — informed by everything you just learned. This sequence ensures your offer is both bold and responsive to their actual needs.',
'{"items":[{"id":"i1","label":"Build rapport — find common ground","emoji":"😊"},{"id":"i2","label":"Frame: \"Let''s find something that works for both of us\"","emoji":"🤝"},{"id":"i3","label":"Ask about their priorities and constraints","emoji":"❓"},{"id":"i4","label":"Make your anchored first offer with rationale","emoji":"💰"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['negotiation','tactics','opening']),

('a2090000-0000-0000-0000-000000000003', 'fill-blanks', 'The Anchor Effect', 'Research shows that first offers explain ___% of the variance in final outcomes. This is called the ___ effect.', 'The first number on the table has outsized influence.',
'Anchoring is one of the most powerful phenomena in negotiation science. Studies consistently show that the first offer explains roughly 50% of the variance in the final agreement. Once a number is stated, both parties unconsciously use it as a reference point. Even experienced negotiators struggle to fully adjust away from an anchor.',
'{"segments":[{"type":"text","content":"Research shows that first offers explain "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":"% of the variance in final outcomes. This is called the "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" effect."}],"answerBlocks":[{"id":"ans1","content":"50"},{"id":"ans2","content":"anchoring"},{"id":"d1","content":"10"},{"id":"d2","content":"90"},{"id":"d3","content":"framing"},{"id":"d4","content":"priming"}]}', 2, ARRAY['negotiation','tactics','anchoring']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000009', 'a2090000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000009', 'a2090000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000009', 'a2090000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 3.2 — Power Moves ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000010', 'b2000000-0000-0000-0000-000000000003', 'Power Moves', 'Silence, mirroring, labeling — the FBI''s favorite techniques.', '🎙️', 2, 15);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2100000-0000-0000-0000-000000000001', 'match-pairs', 'FBI Techniques', 'Match each technique (from Chris Voss''s "Never Split the Difference") to its effect.', 'These are real hostage negotiation tools adapted for business.',
'These techniques come from decades of FBI hostage negotiation. Mirroring (repeating their last 1-3 words) encourages them to elaborate. Labeling ("It seems like...") validates emotions and builds trust. Calibrated questions ("How am I supposed to do that?") make them solve your problem. Strategic silence creates pressure that makes people fill the void with concessions or information.',
'{"leftItems":[{"id":"l1","text":"Mirroring (repeat last words)"},{"id":"l2","text":"Labeling (\"It seems like...\")"},{"id":"l3","text":"Calibrated questions (\"How...\")"},{"id":"l4","text":"Strategic silence"}],"rightItems":[{"id":"r1","text":"Gets them to elaborate without feeling interrogated"},{"id":"r2","text":"Validates their emotions and builds rapport"},{"id":"r3","text":"Makes them solve YOUR problem for you"},{"id":"r4","text":"Creates discomfort that prompts concessions"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Technique","rightColumnLabel":"Effect"}', 3, ARRAY['negotiation','tactics','fbi']),

('a2100000-0000-0000-0000-000000000002', 'mcq', 'The Power of Silence', 'You make your offer. They say nothing. What should you do?', 'The urge to fill silence is almost irresistible.',
'Silence is one of the most powerful and underused tools in negotiation. After making an offer, most people feel uncomfortable and start talking — often negotiating against themselves ("Well, I could also accept..."). The correct move is to wait. Let them process. Let the silence create productive tension. The first person to speak after an offer typically makes a concession.',
'{"options":[{"id":"a","text":"Immediately lower your price to break the tension"},{"id":"b","text":"Say nothing. Wait. Let the silence work."},{"id":"c","text":"Ask \"Is that too much?\" to gauge their reaction"},{"id":"d","text":"Repeat your offer louder and more confidently"}],"correctOptionId":"b"}', 3, ARRAY['negotiation','tactics','silence']),

('a2100000-0000-0000-0000-000000000003', 'thought-tree', 'Mirroring in Action', 'Your counterpart says "We just can''t go above $200K on this." Use FBI techniques to respond.', 'Mirror first, then label, then calibrated question.',
'This sequence demonstrates the FBI "trinity" in action. Mirroring ("can''t go above $200K?") invites them to elaborate on WHY. Labeling ("it sounds like budget is a real constraint") shows you understand. The calibrated question ("how do we make this work within your constraints?") enrolls them in solving the problem collaboratively. This is 10x more effective than arguing.',
'{"nodes":[{"id":"n1","question":"They say: \"We can''t go above $200K.\" Your first move?","leftChoice":{"id":"n1l","text":"Mirror: \"Can''t go above $200K?\""},"rightChoice":{"id":"n1r","text":"\"Well I need at least $250K\""},"correctChoiceId":"n1l"},{"id":"n2","question":"They elaborate: \"Budget is frozen this quarter.\" Your move?","leftChoice":{"id":"n2l","text":"Label: \"It sounds like timing is a real constraint\""},"rightChoice":{"id":"n2r","text":"\"That''s not my problem\""},"correctChoiceId":"n2l"},{"id":"n3","question":"They nod. Now what?","leftChoice":{"id":"n3l","text":"\"How could we structure this to work within your timeline?\""},"rightChoice":{"id":"n3r","text":"\"Then let''s just do $200K\""},"correctChoiceId":"n3l"},{"id":"n4","question":"They suggest: \"What about $200K now + $60K next quarter?\" Accept?","leftChoice":{"id":"n4l","text":"Yes — creative solution that meets both needs!"},"rightChoice":{"id":"n4r","text":"No — I want it all now"},"correctChoiceId":"n4l"}],"finalAnswer":"Mirror → Label → Calibrated Question → Creative Solution. You got $260K total by understanding their constraint (timing, not value) and working with it instead of against it."}', 3, ARRAY['negotiation','tactics','fbi','mirroring']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000010', 'a2100000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000010', 'a2100000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000010', 'a2100000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 3.3 — Dirty Tricks & Counters ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000011', 'b2000000-0000-0000-0000-000000000003', 'Dirty Tricks & Counters', 'Recognize manipulative tactics and shut them down gracefully.', '⚠️', 3, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2110000-0000-0000-0000-000000000001', 'match-pairs', 'Trick Spotting', 'Match each dirty tactic to the best counter-move.', 'Name the tactic out loud to neutralize it.',
'Good cop/bad cop loses power when you acknowledge it directly — "I see you''re doing a good cop/bad cop routine." Artificial deadlines should be tested by calling the bluff. Extreme anchors should be ignored entirely and replaced with your own researched number. Emotional outbursts are best met with calm labeling rather than matching their energy.',
'{"leftItems":[{"id":"l1","text":"Good cop / bad cop"},{"id":"l2","text":"Artificial deadline pressure"},{"id":"l3","text":"Extreme lowball/highball offer"},{"id":"l4","text":"Emotional outburst / anger"}],"rightItems":[{"id":"r1","text":"Name it: \"It seems like you two have different views\""},{"id":"r2","text":"Test it: \"What happens if we take more time?\""},{"id":"r3","text":"Ignore and re-anchor with your researched number"},{"id":"r4","text":"Label calmly: \"It sounds like this is really important to you\""}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Dirty Tactic","rightColumnLabel":"Counter-Move"}', 3, ARRAY['negotiation','tactics','dirty-tricks']),

('a2110000-0000-0000-0000-000000000002', 'mcq', 'The Nibble', 'Right before signing, they say: "Oh, and we''ll also need you to include free shipping." This is called:', 'It''s a small last-minute add-on designed to catch you off guard.',
'"The Nibble" is a classic last-minute tactic where a small concession is requested after the main deal is agreed upon. It works because people feel committed and don''t want to risk the whole deal over something small. The counter: either nibble back ("Sure, if you can add a 2-year commitment") or flag it ("I''d prefer to keep the agreement as we discussed").',
'{"options":[{"id":"a","text":"The Flinch"},{"id":"b","text":"The Nibble — a last-minute add-on after the deal is \"done\""},{"id":"c","text":"Bait and Switch"},{"id":"d","text":"The Decoy"}],"correctOptionId":"b"}', 3, ARRAY['negotiation','tactics','dirty-tricks']),

('a2110000-0000-0000-0000-000000000003', 'categorization-grid', 'Ethical or Manipulative?', 'Categorize each negotiation tactic as ETHICAL or MANIPULATIVE.', 'Ethical tactics are transparent and don''t exploit vulnerability.',
'Anchoring with real data is ethical — it''s persuasion based on facts. Lying about competing offers is fraud. Strategic silence is uncomfortable but honest. Pretending to have authority you don''t is deception. Asking open-ended questions is good faith exploration. Hidden fees exploit trust and information asymmetry. The line: ethical tactics withstand scrutiny; manipulation relies on deception.',
'{"categories":[{"id":"ethical","label":"Ethical","emoji":"✅"},{"id":"manipulative","label":"Manipulative","emoji":"🚫"}],"items":[{"id":"i1","text":"Anchoring with market data"},{"id":"i2","text":"Lying about a competing offer"},{"id":"i3","text":"Using strategic silence after an offer"},{"id":"i4","text":"Pretending you don''t have authority to decide"},{"id":"i5","text":"Asking open-ended questions about their needs"},{"id":"i6","text":"Adding hidden fees after agreement"}],"correctMapping":{"i1":"ethical","i2":"manipulative","i3":"ethical","i4":"manipulative","i5":"ethical","i6":"manipulative"},"layout":"columns"}', 3, ARRAY['negotiation','tactics','ethics']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000011', 'a2110000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000011', 'a2110000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000011', 'a2110000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 3.4 — Unit 3 Checkpoint ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d2000000-0000-0000-0000-000000000012', 'b2000000-0000-0000-0000-000000000003', 'Tactics Review', 'Put your techniques to the test.', '🏁', 4, 15, true);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2120000-0000-0000-0000-000000000001', 'ordering', 'Review: Response Priority', 'When the other side makes an aggressive demand, rank these responses from BEST to WORST.', 'The best responses explore rather than react.',
'Asking "How did you arrive at that number?" forces them to justify an extreme position (often they can''t). Silence lets the awkwardness of an unreasonable demand sink in. Countering with your own data is solid but skips the exploration phase. Immediately splitting the difference rewards their extreme position and anchors to it.',
'{"items":[{"id":"i1","label":"\"Help me understand how you got to that number\"","emoji":"🔍"},{"id":"i2","label":"Pause in silence and let them fill the gap","emoji":"🤐"},{"id":"i3","label":"Counter with your own researched number","emoji":"📊"},{"id":"i4","label":"Split the difference immediately","emoji":"✂️"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 3, ARRAY['negotiation','review','tactics']),

('a2120000-0000-0000-0000-000000000002', 'fill-blanks', 'Review: The FBI Trinity', 'The three core FBI negotiation techniques are: ___, labeling, and ___ questions.', 'Chris Voss describes these as the foundation of tactical empathy.',
'Mirroring (repeating the last 1-3 words), labeling (naming emotions with "It sounds like..."), and calibrated questions (open-ended "How/What" questions) form the core toolkit of FBI-style negotiation. Together, they gather information, build rapport, and guide the other party toward solutions — all without direct confrontation.',
'{"segments":[{"type":"text","content":"The three core FBI negotiation techniques are: "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":", labeling, and "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" questions."}],"answerBlocks":[{"id":"ans1","content":"mirroring"},{"id":"ans2","content":"calibrated"},{"id":"d1","content":"anchoring"},{"id":"d2","content":"leading"},{"id":"d3","content":"reflecting"},{"id":"d4","content":"closed"}]}', 2, ARRAY['negotiation','review','fbi']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000012', 'a2120000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000012', 'a2120000-0000-0000-0000-000000000002', 2);

-- =================================================================
-- UNIT 4 — Real-World Scenarios
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b2000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000003', 'Real-World Scenarios', 'Apply your skills to salary talks, business deals, and everyday life.', 4);

-- ─── Lesson 4.1 — Salary Negotiation ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000013', 'b2000000-0000-0000-0000-000000000004', 'Salary Negotiation', 'The negotiation you''ll do most often — and most people skip it entirely.', '💼', 1, 15);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2130000-0000-0000-0000-000000000001', 'mcq', 'The $1M Mistake', 'Research shows that NOT negotiating a starting salary costs you approximately how much over a 45-year career?', 'Compound interest applies to salary too.',
'Linda Babcock''s research at Carnegie Mellon found that failing to negotiate a starting salary can cost over $1 million over a career due to compounding. Every raise, bonus, and 401K match is calculated as a percentage of your base salary. A $5,000 difference in year one compounds into a massive gap over decades. This is why salary negotiation is the highest-ROI skill you can develop.',
'{"options":[{"id":"a","text":"$50,000"},{"id":"b","text":"$250,000"},{"id":"c","text":"$600,000 – $1,000,000+"},{"id":"d","text":"$5,000,000+"}],"correctOptionId":"c"}', 2, ARRAY['negotiation','salary','statistics']),

('a2130000-0000-0000-0000-000000000002', 'thought-tree', 'The Offer Call', 'You just received a job offer at $95K. You researched the market at $105-115K. Navigate the call.', 'Express enthusiasm before negotiating.',
'This simulation teaches the crucial offer-response framework: (1) Express genuine enthusiasm first — the company needs to know you WANT the role. (2) Ask for time — never negotiate in the moment. (3) Come back with data — market research is inarguable. (4) Give a range (your target to stretch) — it feels collaborative, not combative. (5) Handle pushback gracefully with non-salary alternatives.',
'{"nodes":[{"id":"n1","question":"They offer $95K. Your immediate response?","leftChoice":{"id":"n1l","text":"\"I''m really excited about this role! Can I take a day to review the full package?\""},"rightChoice":{"id":"n1r","text":"\"That''s lower than I expected. I need $115K.\""},"correctChoiceId":"n1l"},{"id":"n2","question":"You call back. How do you open?","leftChoice":{"id":"n2l","text":"\"Based on market data, the range for this role is $105-115K...\""},"rightChoice":{"id":"n2r","text":"\"I need more money or I can''t take it\""},"correctChoiceId":"n2l"},{"id":"n3","question":"They say \"Budget allows up to $105K.\" Your move?","leftChoice":{"id":"n3l","text":"\"I appreciate that. Could we bridge the gap with a signing bonus or equity?\""},"rightChoice":{"id":"n3r","text":"\"Then I''ll take $105K\""},"correctChoiceId":"n3l"},{"id":"n4","question":"They offer $105K + $5K signing bonus. Accept?","leftChoice":{"id":"n4l","text":"\"That works well. I''m in!\""},"rightChoice":{"id":"n4r","text":"\"I want more. $115K or nothing.\""},"correctChoiceId":"n4l"}],"finalAnswer":"You went from $95K to $110K effective ($105K + $5K bonus) by being enthusiastic, data-driven, and creative. That $15K difference compounds to ~$150K+ over the next decade."}', 3, ARRAY['negotiation','salary','simulation']),

('a2130000-0000-0000-0000-000000000003', 'ordering', 'Negotiation Email', 'Order these elements of a salary counter-offer email from FIRST to LAST.', 'Lead with enthusiasm, end with flexibility.',
'The structure matters enormously. Leading with enthusiasm prevents the email from feeling combative. Specifically citing achievements proves your value. Market data depersonalizes the ask ("the market says" vs "I want"). A clear number with justification is concrete and respectable. Ending with flexibility and appreciation shows good faith and makes it easy for them to say yes.',
'{"items":[{"id":"i1","label":"Express enthusiasm for the role and team","emoji":"😊"},{"id":"i2","label":"Highlight your specific value (achievements, skills)","emoji":"⭐"},{"id":"i3","label":"Share market data supporting your target","emoji":"📊"},{"id":"i4","label":"State your desired number with rationale","emoji":"💰"},{"id":"i5","label":"Show flexibility: \"I''m open to creative solutions\"","emoji":"🤝"}],"correctOrder":["i1","i2","i3","i4","i5"],"direction":"top-down"}', 2, ARRAY['negotiation','salary','email']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000013', 'a2130000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000013', 'a2130000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000013', 'a2130000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 4.2 — Everyday Negotiations ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000014', 'b2000000-0000-0000-0000-000000000004', 'Everyday Negotiations', 'Rent, bills, returns, freelance rates — negotiation is everywhere.', '🛒', 2, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2140000-0000-0000-0000-000000000001', 'categorization-grid', 'Negotiable or Fixed?', 'Categorize each expense as typically NEGOTIABLE or FIXED.', 'More things are negotiable than most people think.',
'Hospital bills are among the most negotiable expenses in America — billing departments expect negotiation and often reduce by 20-50%. Rent can be negotiated especially at renewal time or in slow markets. Cell phone plans have retention departments specifically empowered to offer discounts. Sales tax and utility rates are genuinely fixed by law or regulation. Credit card fees (annual, interest) are very negotiable if you call.',
'{"categories":[{"id":"negotiable","label":"Negotiable","emoji":"🤝"},{"id":"fixed","label":"Fixed","emoji":"🔒"}],"items":[{"id":"i1","text":"Hospital / medical bills"},{"id":"i2","text":"Sales tax"},{"id":"i3","text":"Rent at lease renewal"},{"id":"i4","text":"Utility rates"},{"id":"i5","text":"Cell phone plan"},{"id":"i6","text":"Credit card annual fee"}],"correctMapping":{"i1":"negotiable","i2":"fixed","i3":"negotiable","i4":"fixed","i5":"negotiable","i6":"negotiable"},"layout":"columns"}', 2, ARRAY['negotiation','everyday','bills']),

('a2140000-0000-0000-0000-000000000002', 'mcq', 'The Magic Phrase', 'When calling to lower a bill, which opening line is MOST effective?', 'Companies have special departments for retention.',
'"I''m considering switching" triggers the retention department protocol. Customer retention teams have higher discount authority than regular support. They''re measured on saves/retentions, so they WANT to offer you a deal. Being polite but firm about leaving creates the perfect BATNA dynamic — they know your alternative is a competitor.',
'{"options":[{"id":"a","text":"\"I want to cancel my account\""},{"id":"b","text":"\"I''ve been a loyal customer and I''m considering switching to [competitor]. Is there anything you can do?\""},{"id":"c","text":"\"Your prices are too high\""},{"id":"d","text":"\"Can I speak to your manager?\""}],"correctOptionId":"b"}', 2, ARRAY['negotiation','everyday','bills']),

('a2140000-0000-0000-0000-000000000003', 'fill-blanks', 'The Freelancer''s Rule', 'When quoting freelance rates, always state your price and then ___. The first person to speak after a price is quoted usually ___.', 'Silence is your best friend after naming a number.',
'After stating your rate, stop talking. Most freelancers nervously justify their price or immediately offer a discount. Silence creates space for the client to accept (which they often do!) or counter — but their counter will be closer to your number than if you had talked yourself down. The person who speaks first after a price is stated usually makes a concession.',
'{"segments":[{"type":"text","content":"When quoting freelance rates, always state your price and then "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":". The first person to speak after a price is quoted usually "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":"."}],"answerBlocks":[{"id":"ans1","content":"stop talking"},{"id":"ans2","content":"concedes"},{"id":"d1","content":"explain yourself"},{"id":"d2","content":"wins"},{"id":"d3","content":"apologize"},{"id":"d4","content":"walks away"}]}', 2, ARRAY['negotiation','everyday','freelance']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000014', 'a2140000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000014', 'a2140000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000014', 'a2140000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 4.3 — Unit 4 Checkpoint ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d2000000-0000-0000-0000-000000000015', 'b2000000-0000-0000-0000-000000000004', 'Scenarios Review', 'Prove you can negotiate anything.', '🏁', 3, 15, true);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2150000-0000-0000-0000-000000000001', 'mcq', 'Review: The Best Leverage', 'What gives you the MOST negotiating leverage in any situation?', 'It''s the same answer every time.',
'A strong BATNA (Best Alternative To a Negotiated Agreement) is always the answer to "what gives me leverage?" It''s the universal principle because it applies to every negotiation context: salary, business deals, buying a car, rent negotiation. If you can genuinely walk away to something good, you negotiate from strength. Everything else — charm, data, tactics — is secondary to BATNA.',
'{"options":[{"id":"a","text":"Being more likeable than the other person"},{"id":"b","text":"Having a strong BATNA — a genuine alternative"},{"id":"c","text":"Knowing more tactics than they do"},{"id":"d","text":"Being willing to be more aggressive"}],"correctOptionId":"b"}', 2, ARRAY['negotiation','review','leverage']),

('a2150000-0000-0000-0000-000000000002', 'ordering', 'Review: Handling a Lowball', 'You ask for $120K and they counter with $85K. Order your response steps.', 'Don''t react emotionally to a lowball.',
'Pause first to avoid an emotional reaction. Asking for their reasoning forces them to justify an extreme number (they often can''t). Re-anchoring with YOUR data brings the conversation back to reality. Exploring non-salary options shows creativity and gives them face-saving alternatives. This sequence turns a potential deal-breaker into a productive conversation.',
'{"items":[{"id":"i1","label":"Pause — don''t react emotionally","emoji":"😌"},{"id":"i2","label":"Ask: \"Help me understand how you reached that number\"","emoji":"🔍"},{"id":"i3","label":"Re-anchor: \"Market data shows $110-120K for this role\"","emoji":"📊"},{"id":"i4","label":"Explore: \"If base is limited, what about equity or bonus?\"","emoji":"🤝"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 3, ARRAY['negotiation','review','lowball']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000015', 'a2150000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000015', 'a2150000-0000-0000-0000-000000000002', 2);

-- =================================================================
-- UNIT 5 — Mastery (Advanced & Closing)
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b2000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000003', 'Mastery & Closing', 'Advanced strategies, multi-party deals, and how to close with confidence.', 5);

-- ─── Lesson 5.1 — Creating Value ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000016', 'b2000000-0000-0000-0000-000000000005', 'Creating Value', 'Expand the pie before dividing it. The secret to win-win deals.', '🥧', 1, 15);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2160000-0000-0000-0000-000000000001', 'mcq', 'Logrolling', 'What is "logrolling" in negotiation?', 'Think about trading things you value differently.',
'Logrolling is trading concessions on issues you value differently. If you care about price and they care about timeline, give them a faster timeline (cheap for you) in exchange for a better price (cheap for them). This creates value because both sides give up something low-cost and receive something high-value. It''s the core mechanism of win-win deals.',
'{"options":[{"id":"a","text":"Rolling logs at each other until someone gives up"},{"id":"b","text":"Trading concessions on issues each side values differently to create mutual gains"},{"id":"c","text":"Steadily increasing pressure until the other side cracks"},{"id":"d","text":"Making many small offers in rapid succession"}],"correctOptionId":"b"}', 3, ARRAY['negotiation','advanced','logrolling']),

('a2160000-0000-0000-0000-000000000002', 'categorization-grid', 'Expand or Split?', 'Categorize each approach as EXPANDING the pie (creating value) or SPLITTING it (claiming value).', 'Creating value makes both sides better off. Claiming fights over a fixed amount.',
'Adding issues (like delivery terms) to discuss creates new trade opportunities — that''s expanding. Insisting on your number is pure claiming. Asking about priorities reveals potential trades — expanding. Anchoring high claims more of a fixed resource. Bundling different items creates logrolling opportunities. "Take it or leave it" is the ultimate claiming move with no room for expansion.',
'{"categories":[{"id":"expand","label":"Expanding Pie","emoji":"🥧"},{"id":"split","label":"Splitting Pie","emoji":"🔪"}],"items":[{"id":"i1","text":"Adding more issues to discuss (delivery, terms, support)"},{"id":"i2","text":"Insisting on a specific dollar amount"},{"id":"i3","text":"Asking what they value most to find trades"},{"id":"i4","text":"Anchoring with an aggressive first offer"},{"id":"i5","text":"Bundling products/services together"},{"id":"i6","text":"\"Take it or leave it\" ultimatum"}],"correctMapping":{"i1":"expand","i2":"split","i3":"expand","i4":"split","i5":"expand","i6":"split"},"layout":"columns"}', 3, ARRAY['negotiation','advanced','value-creation']),

('a2160000-0000-0000-0000-000000000003', 'thought-tree', 'The Freelance Deal', 'A client wants a website for $3,000. You normally charge $5,000. Find a win-win.', 'Don''t just lower your price — find what you can trade.',
'This simulation teaches the value creation mindset. Instead of simply lowering price (lose-lose), ask about their timeline — flexible timelines let you fit the project around higher-paying work. Testimonials have marketing value. A retainer creates predictable income. The outcome: $3,500 + testimonial + retainer > $5,000 one-time in long-term value. This is what "expanding the pie" looks like in practice.',
'{"nodes":[{"id":"n1","question":"They say $3K. You need $5K. First move?","leftChoice":{"id":"n1l","text":"Ask what matters most: price, timeline, or scope?"},"rightChoice":{"id":"n1r","text":"\"I can''t do it for less than $5K\""},"correctChoiceId":"n1l"},{"id":"n2","question":"They say timeline is flexible. This helps you because...","leftChoice":{"id":"n2l","text":"You can fit it around higher-paying projects"},"rightChoice":{"id":"n2r","text":"It doesn''t help at all"},"correctChoiceId":"n2l"},{"id":"n3","question":"Can you ask for something non-monetary?","leftChoice":{"id":"n3l","text":"\"A testimonial and case study would be really valuable\""},"rightChoice":{"id":"n3r","text":"No, cash only matters"},"correctChoiceId":"n3l"},{"id":"n4","question":"Final offer: $3,500 + testimonial + 3-month retainer at $500/mo. Take it?","leftChoice":{"id":"n4l","text":"Yes! More total value than the original $5K"},"rightChoice":{"id":"n4r","text":"No, hold firm at $5K"},"correctChoiceId":"n4l"}],"finalAnswer":"By exploring interests (timeline flexibility) and adding non-monetary value (testimonial, retainer), you turned a $3K vs $5K standoff into a $5K+ deal that both sides love."}', 3, ARRAY['negotiation','advanced','freelance']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000016', 'a2160000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000016', 'a2160000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000016', 'a2160000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 5.2 — Closing & Commitment ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d2000000-0000-0000-0000-000000000017', 'b2000000-0000-0000-0000-000000000005', 'Closing the Deal', 'Getting from "almost" to "done" — the art of closing.', '📝', 2, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2170000-0000-0000-0000-000000000001', 'ordering', 'Closing Sequence', 'Order these closing steps from FIRST to LAST.', 'Summarize before asking for commitment.',
'Summarizing everything agreed upon ensures nothing is forgotten or misunderstood. Addressing final concerns prevents last-minute objections. Using a specific closing phrase moves from discussion to decision. Getting written confirmation prevents "I don''t remember agreeing to that" later. This sequence converts verbal agreement into binding commitment.',
'{"items":[{"id":"i1","label":"Summarize all agreed terms clearly","emoji":"📋"},{"id":"i2","label":"Address any remaining concerns","emoji":"❓"},{"id":"i3","label":"Use closing language: \"Shall we go ahead on these terms?\"","emoji":"✅"},{"id":"i4","label":"Get written confirmation (email, contract)","emoji":"📝"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['negotiation','closing','commitment']),

('a2170000-0000-0000-0000-000000000002', 'mcq', 'Handling "Let Me Think About It"', 'They say "I need to think about it." What''s the best response?', 'Don''t let them leave without understanding the hesitation.',
'When someone says "I need to think about it," there''s usually a specific concern they haven''t voiced. Asking "Of course — what specifically are you weighing?" (with genuine curiosity, not pressure) often surfaces the real obstacle. If it''s a legitimate need for time, set a specific follow-up. If it''s a hidden concern, you can address it now. Never pressure — but always understand.',
'{"options":[{"id":"a","text":"\"No problem. Take your time\" (and hope for the best)"},{"id":"b","text":"\"Of course. What specifically are you weighing? I might be able to help.\""},{"id":"c","text":"\"If you don''t decide now, the offer expires\""},{"id":"d","text":"\"What''s there to think about?\""}],"correctOptionId":"b"}', 3, ARRAY['negotiation','closing','objections']),

('a2170000-0000-0000-0000-000000000003', 'match-pairs', 'Closing Techniques', 'Match each closing technique to when it works best.', 'Different situations call for different closing styles.',
'The assumptive close works when momentum is strong — it nudges naturally. The summary close works when deals are complex with many terms to confirm. The alternative close works when someone is indecisive between options (both result in a yes). The deadline close works when there''s genuine time pressure (artificial deadlines are manipulative). Match the technique to the situation, never force a close.',
'{"leftItems":[{"id":"l1","text":"Assumptive close (\"So, shall I send over the contract?\")"},{"id":"l2","text":"Summary close (\"So we''ve agreed on X, Y, Z...\")"},{"id":"l3","text":"Alternative close (\"Would you prefer A or B?\")"},{"id":"l4","text":"Deadline close (\"This rate is available until Friday\")"}],"rightItems":[{"id":"r1","text":"When momentum is strong and they''re leaning yes"},{"id":"r2","text":"When the deal is complex with many terms"},{"id":"r3","text":"When they''re hesitant between options (both = yes)"},{"id":"r4","text":"When there''s genuine time-limited value"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Technique","rightColumnLabel":"Best Used When"}', 3, ARRAY['negotiation','closing','techniques']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000017', 'a2170000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000017', 'a2170000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000017', 'a2170000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 5.3 — Final Exam ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d2000000-0000-0000-0000-000000000018', 'b2000000-0000-0000-0000-000000000005', 'Negotiation Mastery Exam', 'The ultimate test — can you close the deal?', '🏆', 3, 25, true);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a2180000-0000-0000-0000-000000000001', 'thought-tree', 'The Full Negotiation', 'You''re buying a used car listed at $18,000. KBB says $14,000. Play through the complete negotiation.', 'Apply every technique from the entire course.',
'This final simulation tests every concept: independent research (KBB = your anchor), rapport before numbers, interests over positions (maybe they need a quick sale for a move), tactical silence after your offer, handling emotional reactions with labeling, creative value expansion (warranties, delivery), and confident closing. The journey from $18K to $13.5K + extras demonstrates the power of integrated negotiation skills.',
'{"nodes":[{"id":"n1","question":"Your opening move with the seller?","leftChoice":{"id":"n1l","text":"Build rapport: ask about the car''s history, show genuine interest"},"rightChoice":{"id":"n1r","text":"\"I''ll give you $12K cash right now\""},"correctChoiceId":"n1l"},{"id":"n2","question":"You learn they''re moving next month. This means:","leftChoice":{"id":"n2l","text":"They need a quick sale — time pressure is your advantage"},"rightChoice":{"id":"n2r","text":"Nothing useful"},"correctChoiceId":"n2l"},{"id":"n3","question":"Time to make your offer. How?","leftChoice":{"id":"n3l","text":"\"KBB values this at $14K. I was thinking $13,000.\" Then silence."},"rightChoice":{"id":"n3r","text":"\"Would you take $10K? I''m on a budget.\""},"correctChoiceId":"n3l"},{"id":"n4","question":"They counter $16K and seem frustrated. Your move?","leftChoice":{"id":"n4l","text":"Label: \"I sense this car means a lot to you.\" Then: \"How about $13,500 + I handle pickup this week?\""},"rightChoice":{"id":"n4r","text":"\"Meet in the middle at $14,500?\""},"correctChoiceId":"n4l"},{"id":"n5","question":"They pause and say \"...Let me think about it.\" Your move?","leftChoice":{"id":"n5l","text":"\"Of course. What specifically are you weighing?\""},"rightChoice":{"id":"n5r","text":"\"Take your time\" and leave"},"correctChoiceId":"n5l"}],"finalAnswer":"Rapport → research → interests (their time pressure) → anchored offer with silence → emotional labeling → creative solution (quick pickup solves THEIR problem). Result: $13,500 + fast close — you saved $4,500 while helping them meet their timeline."}', 4, ARRAY['negotiation','final','simulation']),

('a2180000-0000-0000-0000-000000000002', 'ordering', 'The Negotiator''s Creed', 'Rank these negotiation principles from MOST to LEAST fundamental.', 'Start with the foundation, end with the technique.',
'Preparation is the foundation — everything else fails without it. Understanding interests (yours and theirs) is the core analytical skill. Creating value (expanding the pie) makes deals better for everyone. Closing technique is the final step that converts work into results. Without the preceding three, closing techniques are just manipulation.',
'{"items":[{"id":"i1","label":"Prepare thoroughly before every negotiation","emoji":"📋"},{"id":"i2","label":"Seek to understand interests, not just positions","emoji":"🎯"},{"id":"i3","label":"Create value before claiming it","emoji":"🥧"},{"id":"i4","label":"Close with confidence and clarity","emoji":"✅"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 3, ARRAY['negotiation','final','principles']),

('a2180000-0000-0000-0000-000000000003', 'fill-blanks', 'The Golden Rule of Negotiation', 'Never ___ the difference. Always ___ the pie first.', 'The amateur''s instinct vs. the master''s approach.',
'"Never split the difference" (the title of Chris Voss''s bestselling book) captures the central insight of modern negotiation: splitting feels fair but usually means both sides get less than possible. Instead, always expand the pie first by exploring interests, adding issues, and finding creative trades. THEN divide the larger pie. The result: both sides get more than a simple split would have given them.',
'{"segments":[{"type":"text","content":"Never "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" the difference. Always "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" the pie first."}],"answerBlocks":[{"id":"ans1","content":"split"},{"id":"ans2","content":"expand"},{"id":"d1","content":"accept"},{"id":"d2","content":"divide"},{"id":"d3","content":"ignore"},{"id":"d4","content":"shrink"}]}', 2, ARRAY['negotiation','final','philosophy']),

('a2180000-0000-0000-0000-000000000004', 'mcq', 'Final Question', 'What is the single most important thing you can do to improve your negotiation outcomes?', 'It''s not a technique or tactic.',
'Practice in low-stakes situations. Negotiation is a skill, not knowledge. You can read every book and ace every quiz, but the only way to get comfortable with silence, anchoring, labeling, and creative problem-solving is to DO it. Negotiate your next coffee order, phone bill, hotel rate, or salary. Every negotiation is practice for the next one.',
'{"options":[{"id":"a","text":"Read more negotiation books"},{"id":"b","text":"Memorize FBI techniques"},{"id":"c","text":"Practice negotiating in every low-stakes opportunity you can find"},{"id":"d","text":"Always make the first offer"}],"correctOptionId":"c"}', 2, ARRAY['negotiation','final','practice']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d2000000-0000-0000-0000-000000000018', 'a2180000-0000-0000-0000-000000000001', 1),
('d2000000-0000-0000-0000-000000000018', 'a2180000-0000-0000-0000-000000000002', 2),
('d2000000-0000-0000-0000-000000000018', 'a2180000-0000-0000-0000-000000000003', 3),
('d2000000-0000-0000-0000-000000000018', 'a2180000-0000-0000-0000-000000000004', 4);
