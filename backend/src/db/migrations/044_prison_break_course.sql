-- Migration: 044_prison_break_course
-- Description: "The Great Escape" course — a gamified deep dive into prison security,
-- escape history, engineering, survival skills, and criminal justice through the lens of
-- breaking out. Educational, entertaining, and packed with real history.
-- 5 Units, 18 Lessons, ~54 applets with explanations on every applet.

-- =================================================================
-- COURSE
-- =================================================================
INSERT INTO courses (id, title, description, emoji, color, is_published, sort_order) VALUES
('c0000000-0000-0000-0000-000000000004', 'The Great Escape', 'Study the world''s most daring prison escapes — and the security science designed to stop them.', '🔓', '#FF9500', true, 4);

-- =================================================================
-- UNIT 1 — Know Your Prison (Understanding Confinement)
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b3000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000004', 'Know Your Prison', 'Understand the different types of prisons, security levels, and what makes them (almost) inescapable.', 1);

-- ─── Lesson 1.1 — Security Levels ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d3000000-0000-0000-0000-000000000001', 'b3000000-0000-0000-0000-000000000001', 'Security Levels', 'From minimum-security camps to supermax — how prisons are classified.', '🏛️', 1, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3010000-0000-0000-0000-000000000001', 'ordering', 'Prison Tiers', 'Rank these prison security levels from LOWEST to HIGHEST.', 'Think about the number of physical barriers between you and freedom.',
'Minimum security ("camps") often have no fences — inmates are trusted with work details. Low security has fences and some patrols. Medium security adds razor wire, electronic detection, and cell blocks. Maximum security has walls, armed towers, and constant surveillance. Supermax (ADX Florence) uses solitary confinement in poured-concrete cells with almost zero human contact — the most restrictive conditions in the US prison system.',
'{"items":[{"id":"i1","label":"Minimum security (Federal camp)","emoji":"🏕️"},{"id":"i2","label":"Low security","emoji":"🏠"},{"id":"i3","label":"Medium security","emoji":"🏢"},{"id":"i4","label":"Maximum security","emoji":"🏰"},{"id":"i5","label":"Supermax (ADX Florence)","emoji":"🔒"}],"correctOrder":["i1","i2","i3","i4","i5"],"direction":"top-down"}', 1, ARRAY['prison','security','classification']),

('a3010000-0000-0000-0000-000000000002', 'mcq', 'Supermax Stats', 'How many inmates have ever escaped from ADX Florence, the US federal supermax?', 'This facility was designed to be literally inescapable.',
'Zero. ADX Florence in Colorado was specifically built after high-profile escapes from other maximum-security facilities. Inmates spend 23 hours per day in a 7x12 foot poured-concrete cell. Windows are 4-inch slits that show only sky. There are 1,400 remotely controlled steel doors. It has been called "a cleaner version of hell" — and no one has ever escaped.',
'{"options":[{"id":"a","text":"0 — no one has ever escaped"},{"id":"b","text":"1 — but they were caught within hours"},{"id":"c","text":"3 — over its 30-year history"},{"id":"d","text":"It''s classified"}],"correctOptionId":"a"}', 1, ARRAY['prison','security','supermax']),

('a3010000-0000-0000-0000-000000000003', 'categorization-grid', 'Security Features', 'Categorize each security feature by which prison level first introduces it.', 'Lower security prisons rely on trust. Higher ones rely on physics.',
'Minimum-security facilities use dormitories and honor systems — escape is technically easy but consequences severe. Perimeter fencing starts at low security. Cell blocks with controlled movement begin at medium. Guard towers with armed officers appear at maximum. Supermax introduces 23-hour solitary confinement — the ultimate control mechanism. Each tier adds physical and procedural barriers.',
'{"categories":[{"id":"min","label":"Minimum","emoji":"🏕️"},{"id":"med","label":"Medium","emoji":"🏢"},{"id":"max","label":"Maximum","emoji":"🏰"}],"items":[{"id":"i1","text":"Dormitory-style housing"},{"id":"i2","text":"Razor wire perimeter fencing"},{"id":"i3","text":"Guard towers with armed officers"},{"id":"i4","text":"Electronic motion sensors"},{"id":"i5","text":"Cell blocks with controlled doors"},{"id":"i6","text":"Work-release programs"}],"correctMapping":{"i1":"min","i2":"med","i3":"max","i4":"med","i5":"med","i6":"min"},"layout":"columns"}', 2, ARRAY['prison','security','features']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000001', 'a3010000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000001', 'a3010000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000001', 'a3010000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 1.2 — Anatomy of a Prison ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d3000000-0000-0000-0000-000000000002', 'b3000000-0000-0000-0000-000000000001', 'Anatomy of a Prison', 'Layers of defense: walls, zones, headcounts, and the kill zone.', '🧱', 2, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3020000-0000-0000-0000-000000000001', 'ordering', 'Layers of Confinement', 'Order the layers of prison security from INNERMOST to OUTERMOST.', 'Think concentric rings — cell outward to freedom.',
'Prison security follows a defense-in-depth model. The cell is the first containment. The cell block with controlled doors is the second. The yard is monitored open space. The perimeter wall (often double) is the main physical barrier. The buffer zone (clear area with sensors) exists between walls. Beyond that lies the surrounding environment — often remote, deserted, or patrolled. Each layer must be defeated sequentially.',
'{"items":[{"id":"i1","label":"Individual cell (locked door)","emoji":"🚪"},{"id":"i2","label":"Cell block (controlled wing)","emoji":"🏢"},{"id":"i3","label":"Exercise yard (monitored)","emoji":"🏟️"},{"id":"i4","label":"Perimeter wall + razor wire","emoji":"🧱"},{"id":"i5","label":"Buffer zone (sensors, lights)","emoji":"💡"},{"id":"i6","label":"External environment (roads, terrain)","emoji":"🌲"}],"correctOrder":["i1","i2","i3","i4","i5","i6"],"direction":"top-down"}', 2, ARRAY['prison','anatomy','layers']),

('a3020000-0000-0000-0000-000000000002', 'mcq', 'The Count', 'How often do maximum-security prisons conduct headcounts?', 'Missing the count is how most escapes are initially detected.',
'Maximum-security prisons conduct formal counts approximately 5 times per day — typically at 12 AM, 3 AM, 5 AM, 4 PM, and 10 PM. Inmates must be physically visible (not under blankets). Some facilities also do random "standing counts" where inmates must stand at their cell door. This means an escapee has a maximum window of about 4-5 hours before they are officially missed.',
'{"options":[{"id":"a","text":"Once at morning and once at night"},{"id":"b","text":"About 5 times per day, including overnight"},{"id":"c","text":"Every 30 minutes via CCTV"},{"id":"d","text":"Only when inmates leave their cells"}],"correctOptionId":"b"}', 2, ARRAY['prison','anatomy','headcount']),

('a3020000-0000-0000-0000-000000000003', 'match-pairs', 'Defense vs. Purpose', 'Match each prison security feature to its primary purpose.', 'Each feature addresses a specific escape vector.',
'Razor wire deters and slows anyone climbing the wall — the lacerations make silent crossing impossible. Seismic sensors detect tunneling vibrations underground. Guard towers provide elevated visual coverage of blind spots. Sally ports (double-gate systems) prevent "tailgating" through a single gate — one door must close before the next opens. Each feature addresses a distinct attack vector.',
'{"leftItems":[{"id":"l1","text":"Razor/concertina wire"},{"id":"l2","text":"Seismic ground sensors"},{"id":"l3","text":"Elevated guard towers"},{"id":"l4","text":"Sally port (double-gate)"}],"rightItems":[{"id":"r1","text":"Prevents quiet wall climbing"},{"id":"r2","text":"Detects tunnel vibrations underground"},{"id":"r3","text":"Provides elevated sight lines over walls"},{"id":"r4","text":"Prevents tailgating through a single gate"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Security Feature","rightColumnLabel":"Primary Purpose"}', 2, ARRAY['prison','anatomy','features']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000002', 'a3020000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000002', 'a3020000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000002', 'a3020000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 1.3 — Famous Prisons ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d3000000-0000-0000-0000-000000000003', 'b3000000-0000-0000-0000-000000000001', 'Famous Prisons', 'Alcatraz, Château d''If, Colditz — the legends of confinement.', '🏝️', 3, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3030000-0000-0000-0000-000000000001', 'match-pairs', 'Prison Legends', 'Match each famous prison to its defining characteristic.', 'Each prison became famous for a unique feature.',
'Alcatraz sat in San Francisco Bay — the freezing, shark-patrolled waters were the real prison, not the walls. Devil''s Island in French Guiana used jungle and ocean isolation as barriers. The Château d''If (made famous by The Count of Monte Cristo) used island isolation in the Mediterranean. ADX Florence uses modern technology and solitary confinement. Each represents a different philosophy of containment.',
'{"leftItems":[{"id":"l1","text":"Alcatraz"},{"id":"l2","text":"Devil''s Island (French Guiana)"},{"id":"l3","text":"Château d''If (France)"},{"id":"l4","text":"ADX Florence (USA)"}],"rightItems":[{"id":"r1","text":"Freezing bay waters as natural barrier"},{"id":"r2","text":"Impenetrable jungle + ocean isolation"},{"id":"r3","text":"Island fortress; inspired Monte Cristo"},{"id":"r4","text":"23-hour solitary, poured-concrete cells"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Prison","rightColumnLabel":"Defining Feature"}', 2, ARRAY['prison','history','famous']),

('a3030000-0000-0000-0000-000000000002', 'mcq', 'Alcatraz Escapes', 'How many inmates officially successfully escaped from Alcatraz?', 'The FBI maintains a specific official position on this.',
'The official answer is zero. While 36 inmates attempted escape in 14 incidents, most were caught, shot, or drowned. The most famous attempt — the 1962 escape by Frank Morris and the Anglin brothers — remains unsolved. They were never found, dead or alive. The FBI closed the case in 1979, but the US Marshals Service keeps it open to this day. Most experts believe the frigid 54°F waters were fatal.',
'{"options":[{"id":"a","text":"0 — according to the official record"},{"id":"b","text":"3 — Morris and the Anglin brothers"},{"id":"c","text":"7 — over its 29-year history"},{"id":"d","text":"1 — but they were recaptured"}],"correctOptionId":"a"}', 2, ARRAY['prison','history','alcatraz']),

('a3030000-0000-0000-0000-000000000003', 'ordering', 'Worst to Best Odds', 'Rank these prisons from HARDEST to EASIEST to escape from.', 'Consider geography, technology, and design era.',
'ADX Florence is purpose-built to be inescapable with modern technology. Alcatraz combined physical barriers with deadly cold water. Devil''s Island used jungle and ocean — some did escape but most died trying. Colditz Castle (WWII POW camp) saw 31 successful escapes because it was a converted medieval castle, not a purpose-built prison, and held prisoners with military training and nation-state resources supporting them.',
'{"items":[{"id":"i1","label":"ADX Florence (supermax, 0 escapes)","emoji":"🔒"},{"id":"i2","label":"Alcatraz (bay, 0 confirmed)","emoji":"🏝️"},{"id":"i3","label":"Devil''s Island (jungle + ocean)","emoji":"🌴"},{"id":"i4","label":"Colditz Castle (WWII, 31 escapes)","emoji":"🏰"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['prison','history','ranking']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000003', 'a3030000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000003', 'a3030000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000003', 'a3030000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 1.4 — Unit 1 Checkpoint ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d3000000-0000-0000-0000-000000000004', 'b3000000-0000-0000-0000-000000000001', 'Prison Knowledge Review', 'How well do you know your prison?', '🏁', 4, 15, true);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3040000-0000-0000-0000-000000000001', 'fill-blanks', 'Review: Headcount Window', 'At a max-security prison, formal headcounts happen about ___ times per day, giving an escapee a maximum window of roughly ___ hours.', 'Count frequency determines the head start.',
'With approximately 5 counts per day (including overnight), the longest gap is typically 4-5 hours (e.g., 10 PM to 3 AM). This means even a perfectly executed escape gives you less than half a night''s head start. This is why many historical escapes used dummy heads in beds — to pass the overnight visual checks and buy time until the morning standing count.',
'{"segments":[{"type":"text","content":"At a max-security prison, formal headcounts happen about "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" times per day, giving an escapee a maximum window of roughly "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" hours."}],"answerBlocks":[{"id":"ans1","content":"5"},{"id":"ans2","content":"4-5"},{"id":"d1","content":"2"},{"id":"d2","content":"12"},{"id":"d3","content":"8-10"},{"id":"d4","content":"10"}]}', 2, ARRAY['prison','review','headcount']),

('a3040000-0000-0000-0000-000000000002', 'mcq', 'Review: Why Supermax?', 'What is the PRIMARY philosophy behind supermax facilities like ADX Florence?', 'It''s not about punishment — it''s about prevention.',
'Supermax prisons exist primarily for total incapacitation — making escape, violence against staff, and even communication with other inmates physically impossible. The 23-hour solitary, concrete construction, and remote-controlled everything eliminate virtually all human variables. Whether this constitutes cruel punishment or necessary security remains one of the most contentious debates in criminal justice.',
'{"options":[{"id":"a","text":"Punish the worst offenders as harshly as possible"},{"id":"b","text":"Total incapacitation — make escape and violence physically impossible"},{"id":"c","text":"Rehabilitate inmates through isolation and reflection"},{"id":"d","text":"Save money on guards by using technology instead"}],"correctOptionId":"b"}', 2, ARRAY['prison','review','philosophy']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000004', 'a3040000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000004', 'a3040000-0000-0000-0000-000000000002', 2);

-- =================================================================
-- UNIT 2 — Classic Escape Methods
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b3000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000004', 'Classic Escape Methods', 'Tunnels, walls, disguises, and inside jobs — the methods that made history.', 2);

-- ─── Lesson 2.1 — Tunneling ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d3000000-0000-0000-0000-000000000005', 'b3000000-0000-0000-0000-000000000002', 'Going Under', 'The engineering behind the most famous tunnel escapes.', '⛏️', 1, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3050000-0000-0000-0000-000000000001', 'mcq', 'The Great Escape (1944)', 'In the famous WWII Stalag Luft III escape, how long was the tunnel "Harry"?', 'Allied POWs dug three tunnels named Tom, Dick, and Harry.',
'Tunnel "Harry" was 336 feet (102 meters) long and 30 feet deep. It took over a year to dig with improvised tools. The POWs solved air supply with a hand-pumped bellows system, used bed boards for shoring, and even installed electric lighting tapped from the camp''s power grid. 76 men escaped, though 73 were recaptured and 50 were executed by the Gestapo. It remains the most ambitious tunnel escape in history.',
'{"options":[{"id":"a","text":"About 50 feet"},{"id":"b","text":"About 150 feet"},{"id":"c","text":"About 336 feet (102 meters)"},{"id":"d","text":"About 600 feet"}],"correctOptionId":"c"}', 2, ARRAY['prison','tunnels','wwii']),

('a3050000-0000-0000-0000-000000000002', 'ordering', 'Tunnel Engineering', 'Order the tunnel escape challenges from FIRST to LAST in difficulty to solve.', 'Each challenge must be solved before the next one matters.',
'Direction comes first — without knowing which way you''re going, nothing else matters (POWs used compasses made from magnetized needles). Air supply is next — carbon dioxide buildup kills in minutes underground. Soil disposal is the logistical nightmare — tons of excavated dirt must be hidden. Structural support prevents collapse. Detection avoidance (noise, sensors) is the ongoing challenge throughout.',
'{"items":[{"id":"i1","label":"Direction (knowing where you''re heading)","emoji":"🧭"},{"id":"i2","label":"Air supply (preventing suffocation)","emoji":"💨"},{"id":"i3","label":"Soil disposal (hiding excavated dirt)","emoji":"🪣"},{"id":"i4","label":"Structural support (preventing collapse)","emoji":"🪵"},{"id":"i5","label":"Detection avoidance (noise, sensors)","emoji":"🤫"}],"correctOrder":["i1","i2","i3","i4","i5"],"direction":"top-down"}', 2, ARRAY['prison','tunnels','engineering']),

('a3050000-0000-0000-0000-000000000003', 'match-pairs', 'Tunnel Countermeasures', 'Match each modern anti-tunneling technology to how it works.', 'Modern prisons make tunneling nearly impossible.',
'Seismic sensors detect the vibrations of digging through soil. Underground microphones listen for scraping and hammering sounds. Ground-penetrating radar can reveal voids and disturbed soil. Deep concrete foundations (30+ feet) make reaching beneath the walls impractical with improvised tools. Together, these technologies have made tunnel escapes from modern facilities virtually impossible.',
'{"leftItems":[{"id":"l1","text":"Seismic sensors"},{"id":"l2","text":"Underground microphones"},{"id":"l3","text":"Ground-penetrating radar"},{"id":"l4","text":"Deep concrete foundations"}],"rightItems":[{"id":"r1","text":"Detect vibrations from digging"},{"id":"r2","text":"Listen for scraping and hammering"},{"id":"r3","text":"Reveal underground voids via scan"},{"id":"r4","text":"Make reaching below walls impractical"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Technology","rightColumnLabel":"How It Works"}', 2, ARRAY['prison','tunnels','countermeasures']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000005', 'a3050000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000005', 'a3050000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000005', 'a3050000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 2.2 — Over the Wall ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d3000000-0000-0000-0000-000000000006', 'b3000000-0000-0000-0000-000000000002', 'Over the Wall', 'Climbing, cutting, and flying over prison barriers.', '🪜', 2, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3060000-0000-0000-0000-000000000001', 'categorization-grid', 'Escape Vector', 'Categorize each escape method by whether it goes OVER, THROUGH, or AROUND the wall.', 'Think about the physical path to freedom.',
'Over-the-wall methods include helicopters, grappling hooks, and ladders. Through-the-wall methods use cutting or breaking (holes in walls, cut fences). Around-the-wall methods avoid barriers entirely — walking out in disguise, hiding in vehicles, or using legitimate exits with forged credentials. The most creative escapes often combine multiple vectors.',
'{"categories":[{"id":"over","label":"Over","emoji":"⬆️"},{"id":"through","label":"Through","emoji":"➡️"},{"id":"around","label":"Around","emoji":"↩️"}],"items":[{"id":"i1","text":"Helicopter extraction"},{"id":"i2","text":"Cutting through chain-link fence"},{"id":"i3","text":"Walking out in a guard uniform"},{"id":"i4","text":"Grappling hook + rope"},{"id":"i5","text":"Hiding in a laundry truck"},{"id":"i6","text":"Tunneling under the wall"}],"correctMapping":{"i1":"over","i2":"through","i3":"around","i4":"over","i5":"around","i6":"through"},"layout":"columns"}', 2, ARRAY['prison','walls','methods']),

('a3060000-0000-0000-0000-000000000002', 'mcq', 'Helicopter Escapes', 'How many successful helicopter prison escapes have occurred worldwide?', 'It has happened more than you think.',
'There have been over 40 documented helicopter escape attempts worldwide, with many succeeding at least initially. The most famous was Pascal Payet, who escaped TWICE from French prisons by helicopter (2001 and 2007) and even helped other inmates escape. This led to France installing anti-helicopter cables and nets over prison yards. Several countries now use these "helicopter nets" as standard equipment.',
'{"options":[{"id":"a","text":"2 — it''s extremely rare"},{"id":"b","text":"About 10"},{"id":"c","text":"Over 40 attempts worldwide"},{"id":"d","text":"0 — it only happens in movies"}],"correctOptionId":"c"}', 2, ARRAY['prison','walls','helicopter']),

('a3060000-0000-0000-0000-000000000003', 'ordering', 'Wall Defenses', 'Rank these wall countermeasures from OLDEST to NEWEST technology.', 'Trace the evolution of keeping people in.',
'High stone walls are ancient technology (thousands of years). Barbed wire was invented in the 1870s for cattle, then adapted for prisons. Razor/concertina wire became standard in the 20th century. Electric fences were adopted mid-century. Motion sensors and laser detection systems are modern additions. Anti-helicopter nets/cables are the newest, emerging after the helicopter escape trend of the 2000s.',
'{"items":[{"id":"i1","label":"High stone/concrete walls","emoji":"🧱"},{"id":"i2","label":"Barbed and razor wire","emoji":"🪡"},{"id":"i3","label":"Electrified fencing","emoji":"⚡"},{"id":"i4","label":"Motion sensors and laser beams","emoji":"📡"},{"id":"i5","label":"Anti-helicopter nets and cables","emoji":"🚁"}],"correctOrder":["i1","i2","i3","i4","i5"],"direction":"top-down"}', 2, ARRAY['prison','walls','history']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000006', 'a3060000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000006', 'a3060000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000006', 'a3060000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 2.3 — Deception & Disguise ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d3000000-0000-0000-0000-000000000007', 'b3000000-0000-0000-0000-000000000002', 'Deception & Disguise', 'The escapes that used brains instead of brawn.', '🎭', 3, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3070000-0000-0000-0000-000000000001', 'mcq', 'The Alcatraz Dummy Heads', 'In the 1962 Alcatraz escape, what did Morris and the Anglins use for their decoy heads?', 'They needed to pass visual bed checks.',
'They crafted remarkably realistic dummy heads from a mixture of soap, toilet paper, and real hair swept up from the prison barbershop. Painted with flesh tones from art supplies, the heads fooled guards during nighttime bed checks for hours. This was critical — it bought them from lights-out (~9:30 PM) until the 7 AM morning count, giving them a ~9-hour head start. The heads are now on display at the Alcatraz museum.',
'{"options":[{"id":"a","text":"Wadded-up blankets under the sheets"},{"id":"b","text":"Sculpted heads from soap, paper, and real human hair"},{"id":"c","text":"Rubber Halloween masks"},{"id":"d","text":"Deflated basketballs painted pink"}],"correctOptionId":"b"}', 2, ARRAY['prison','deception','alcatraz']),

('a3070000-0000-0000-0000-000000000002', 'ordering', 'History''s Best Disguise Escapes', 'Rank these disguise escapes from MOST to LEAST audacious.', 'Think about the level of deception required.',
'Steven Jay Russell impersonated a judge, doctor, and FBI agent across multiple escapes — he escaped FOUR times using social engineering alone. Frank Abagnale (Catch Me If You Can) bluffed his way out by impersonating a Bureau of Prisons inspector. The Libby Prison tunnel was impressive engineering but straightforward. John Dillinger allegedly carved a fake gun from wood and shoe polish to walk out the front door.',
'{"items":[{"id":"i1","label":"Steven Jay Russell — impersonated a judge to order his own release","emoji":"⚖️"},{"id":"i2","label":"John Dillinger — carved a fake gun from wood to bluff guards","emoji":"🔫"},{"id":"i3","label":"Frank Abagnale — posed as a prison inspector","emoji":"🕴️"},{"id":"i4","label":"Libby Prison (1864) — tunnel disguised as a fireplace","emoji":"🧱"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 3, ARRAY['prison','deception','history']),

('a3070000-0000-0000-0000-000000000003', 'thought-tree', 'The Social Engineer', 'You''re planning a deception-based escape. Walk through the psychological vulnerabilities you''d exploit.', 'Guards are human. Routines breed complacency.',
'This decision tree maps the psychology of deception-based escapes. Guards follow routines and develop trust in familiar faces — that''s the complacency to exploit. Authority bias means people comply with someone who LOOKS like they have authority (uniforms, clipboards). Shift changes create handoff gaps. The visitor impersonation approach is the safest because it avoids guard confrontation entirely. Every famous social-engineering escape exploited these exact psychological patterns.',
'{"nodes":[{"id":"n1","question":"What''s the biggest psychological vulnerability in prison guards?","leftChoice":{"id":"n1l","text":"Routine complacency — they stop scrutinizing familiar patterns"},"rightChoice":{"id":"n1r","text":"They''re not well-trained"},"correctChoiceId":"n1l"},{"id":"n2","question":"When is a guard most likely to miss something?","leftChoice":{"id":"n2l","text":"During shift change handoffs"},"rightChoice":{"id":"n2r","text":"During lunch breaks"},"correctChoiceId":"n2l"},{"id":"n3","question":"Which disguise exploits authority bias most effectively?","leftChoice":{"id":"n3l","text":"A guard or official uniform with a clipboard"},"rightChoice":{"id":"n3r","text":"Inmate clothes from a different wing"},"correctChoiceId":"n3l"},{"id":"n4","question":"What''s the safest deception approach?","leftChoice":{"id":"n4l","text":"Leave disguised as a visitor during visiting hours"},"rightChoice":{"id":"n4r","text":"Bribe a guard to let you walk out"},"correctChoiceId":"n4l"}],"finalAnswer":"The best deception escapes exploit complacency, authority bias, transition gaps, and legitimate traffic patterns. Modern countermeasures: biometrics, numbered wristbands, and strict visitor protocols make these much harder today."}', 3, ARRAY['prison','deception','psychology']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000007', 'a3070000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000007', 'a3070000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000007', 'a3070000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 2.4 — Unit 2 Checkpoint ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d3000000-0000-0000-0000-000000000008', 'b3000000-0000-0000-0000-000000000002', 'Escape Methods Review', 'Over, under, or around — test your escape IQ.', '🏁', 4, 15, true);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3080000-0000-0000-0000-000000000001', 'categorization-grid', 'Review: Brains or Brawn?', 'Categorize each escape as relying primarily on ENGINEERING or DECEPTION.', 'Some escapes use physics. Others use psychology.',
'Tunneling, wall climbing, and fence cutting are engineering challenges — they defeat physical barriers. Disguises, forged documents, and impersonation defeat human barriers. The most successful escapes in history (like Alcatraz 1962) combined both: engineering the escape route AND using decoy heads to deceive guards during headcounts.',
'{"categories":[{"id":"engineering","label":"Engineering","emoji":"⚙️"},{"id":"deception","label":"Deception","emoji":"🎭"}],"items":[{"id":"i1","text":"Digging a 336-foot tunnel"},{"id":"i2","text":"Fake dummy heads in beds"},{"id":"i3","text":"Cutting through a fence"},{"id":"i4","text":"Walking out in a guard uniform"},{"id":"i5","text":"Building a raft from raincoats"}],"correctMapping":{"i1":"engineering","i2":"deception","i3":"engineering","i4":"deception","i5":"engineering"},"layout":"columns"}', 2, ARRAY['prison','review','methods']),

('a3080000-0000-0000-0000-000000000002', 'fill-blanks', 'Review: The Tunnel Challenge', 'The five key tunnel challenges in order are: direction, ___, soil disposal, structural support, and ___.', 'First you need to breathe. Last you need to stay hidden.',
'Air supply must be solved almost immediately — CO2 buildup in an enclosed tunnel can cause unconsciousness in minutes. The Great Escape solved this with a hand-operated bellows system pumping air through a duct made from kit bags. Detection avoidance is the ongoing challenge throughout the entire project — one overheard scraping sound or misplaced pile of dirt, and the whole operation is blown.',
'{"segments":[{"type":"text","content":"The five key tunnel challenges in order are: direction, "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":", soil disposal, structural support, and "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":"."}],"answerBlocks":[{"id":"ans1","content":"air supply"},{"id":"ans2","content":"detection avoidance"},{"id":"d1","content":"lighting"},{"id":"d2","content":"water drainage"},{"id":"d3","content":"temperature control"},{"id":"d4","content":"exit concealment"}]}', 2, ARRAY['prison','review','tunnels']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000008', 'a3080000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000008', 'a3080000-0000-0000-0000-000000000002', 2);

-- =================================================================
-- UNIT 3 — Survival After Escape
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b3000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000004', 'Survival After Escape', 'Getting out is only half the problem. Staying free is the real challenge.', 3);

-- ─── Lesson 3.1 — The First 24 Hours ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d3000000-0000-0000-0000-000000000009', 'b3000000-0000-0000-0000-000000000003', 'The First 24 Hours', 'The critical window between escape and recapture.', '⏰', 1, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3090000-0000-0000-0000-000000000001', 'ordering', 'Manhunt Escalation', 'Order the manhunt response from FIRST to LAST as time passes after an escape is discovered.', 'Response escalates from local to national.',
'The internal lockdown and perimeter search happen within minutes. K-9 units arrive within the first hour — dogs can track scent trails up to 48 hours old. Roadblocks go up within 2-3 hours covering major routes. Helicopters with thermal imaging deploy for wider area searches. Federal alerts (BOLO, media) broadcast the escapee''s face nationally. Every hour that passes without recapture dramatically increases the search area — which is why the first 4-6 hours are critical for both sides.',
'{"items":[{"id":"i1","label":"Internal lockdown + perimeter search","emoji":"🚨"},{"id":"i2","label":"K-9 tracking units deployed","emoji":"🐕"},{"id":"i3","label":"Roadblocks on major routes","emoji":"🚧"},{"id":"i4","label":"Helicopter + thermal imaging","emoji":"🚁"},{"id":"i5","label":"Federal BOLO + media alert","emoji":"📺"}],"correctOrder":["i1","i2","i3","i4","i5"],"direction":"top-down"}', 2, ARRAY['prison','survival','manhunt']),

('a3090000-0000-0000-0000-000000000002', 'mcq', 'Recapture Rate', 'What percentage of prison escapees in the US are eventually recaptured?', 'Running is easy. Staying hidden is not.',
'Approximately 94% of all prison escapees are eventually recaptured, most within 24-48 hours. Modern technology — surveillance cameras, electronic banking trails, license plate readers, facial recognition, and social media monitoring — has made it nearly impossible to establish a new identity. The 6% who remain free typically escaped from minimum-security facilities and had strong external support networks.',
'{"options":[{"id":"a","text":"About 50%"},{"id":"b","text":"About 75%"},{"id":"c","text":"About 94%"},{"id":"d","text":"About 99.9%"}],"correctOptionId":"c"}', 2, ARRAY['prison','survival','statistics']),

('a3090000-0000-0000-0000-000000000003', 'thought-tree', 'The 24-Hour Clock', 'You''ve escaped at 2 AM. The 5 AM count is in 3 hours. Plan your first moves.', 'Every decision trades speed against stealth.',
'The escape window analysis is critical: 3 hours until the count means 3 hours before K-9 units deploy. Water nullifies scent trails — rivers, streams, and rain are an escapee''s best friend. Pre-staged supplies (hidden by an accomplice) eliminate the need to interact with people or stores. Traveling at night avoids visual detection but modern thermal cameras can spot body heat from helicopters. The optimal strategy: move fast to water, then slow and hidden.',
'{"nodes":[{"id":"n1","question":"You have 3 hours before the 5 AM count. Priority?","leftChoice":{"id":"n1l","text":"Put maximum distance between you and the prison"},"rightChoice":{"id":"n1r","text":"Find a hiding spot nearby and wait"},"correctChoiceId":"n1l"},{"id":"n2","question":"K-9 units will track your scent. How do you counter?","leftChoice":{"id":"n2l","text":"Travel through water — rivers, streams, rain"},"rightChoice":{"id":"n2r","text":"Run as fast as possible in one direction"},"correctChoiceId":"n2l"},{"id":"n3","question":"You need food, clothes, and transportation. How?","leftChoice":{"id":"n3l","text":"Pre-staged supplies hidden by an outside contact"},"rightChoice":{"id":"n3r","text":"Break into a house nearby"},"correctChoiceId":"n3l"},{"id":"n4","question":"Dawn is approaching. Helicopters will fly. Your move?","leftChoice":{"id":"n4l","text":"Find dense cover and wait until nightfall"},"rightChoice":{"id":"n4r","text":"Keep moving — speed is everything"},"correctChoiceId":"n4l"}],"finalAnswer":"Sprint → water (kill scent trail) → pre-staged supplies → hide during daylight. The 94% recapture rate proves: the ones who get caught are the ones who interacted with people, used electronics, or kept moving during the day."}', 3, ARRAY['prison','survival','planning']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000009', 'a3090000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000009', 'a3090000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000009', 'a3090000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 3.2 — Disappearing ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d3000000-0000-0000-0000-000000000010', 'b3000000-0000-0000-0000-000000000003', 'Disappearing', 'Why it''s nearly impossible to vanish in the modern world.', '👻', 2, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3100000-0000-0000-0000-000000000001', 'ordering', 'Technologies That Track You', 'Rank these tracking technologies from EASIEST to HARDEST for an escapee to avoid.', 'Some require active choices. Others are passive and invisible.',
'Social media is easiest to avoid — just don''t use it. Credit cards create an instant location trail but can be avoided with cash. CCTV coverage varies by location but is avoidable in rural areas. Cell phone tracking is harder because phones communicate with towers even when not in use — you must abandon it entirely. Facial recognition is hardest because it''s passive, automated, and can identify you from cameras you don''t even know exist.',
'{"items":[{"id":"i1","label":"Social media posts","emoji":"📱"},{"id":"i2","label":"Credit card transactions","emoji":"💳"},{"id":"i3","label":"CCTV surveillance cameras","emoji":"📹"},{"id":"i4","label":"Cell phone location tracking","emoji":"📡"},{"id":"i5","label":"Facial recognition AI systems","emoji":"🤖"}],"correctOrder":["i1","i2","i3","i4","i5"],"direction":"top-down"}', 3, ARRAY['prison','survival','technology']),

('a3100000-0000-0000-0000-000000000002', 'mcq', 'The Digital Footprint', 'What ultimately led to the recapture of most modern-era escapees?', 'Old habits die hard — even for fugitives.',
'Electronic communications are overwhelmingly the #1 way modern escapees get caught. Cell phones, social media, email, and even ATM withdrawals create precise location data that law enforcement can access quickly. Many fugitives are caught because they contacted family members — phone records and email metadata are routinely monitored for known associates of escaped prisoners.',
'{"options":[{"id":"a","text":"Fingerprints at crime scenes"},{"id":"b","text":"Contacting family via phone, email, or social media"},{"id":"c","text":"Being recognized by random citizens"},{"id":"d","text":"Running out of money"}],"correctOptionId":"b"}', 3, ARRAY['prison','survival','digital']),

('a3100000-0000-0000-0000-000000000003', 'match-pairs', 'Old Escape vs. Modern Problem', 'Match each historical escape method to the modern technology that now prevents it.', 'Technology has closed most historical loopholes.',
'Fake identity documents are now defeated by biometric databases (fingerprints, facial recognition) that link every ID to biological data. Changing appearance is countered by gait analysis and AI that recognizes people by how they walk. Pre-digital cash economies allowed anonymous survival — modern cash transactions above $10K trigger reports, and most commerce requires ID. Cross-border flight is blocked by digital passport systems and international fugitive databases.',
'{"leftItems":[{"id":"l1","text":"Forging identity documents"},{"id":"l2","text":"Changing appearance (hair, glasses)"},{"id":"l3","text":"Living on cash anonymously"},{"id":"l4","text":"Fleeing across country borders"}],"rightItems":[{"id":"r1","text":"Biometric databases link IDs to biology"},{"id":"r2","text":"AI gait analysis recognizes your walk"},{"id":"r3","text":"Cash reporting rules + digital economy"},{"id":"r4","text":"International fugitive databases + biometric passports"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Old Method","rightColumnLabel":"Modern Counter"}', 3, ARRAY['prison','survival','technology']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000010', 'a3100000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000010', 'a3100000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000010', 'a3100000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 3.3 — Unit 3 Checkpoint ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d3000000-0000-0000-0000-000000000011', 'b3000000-0000-0000-0000-000000000003', 'Survival Review', 'Could you survive the manhunt?', '🏁', 3, 15, true);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3110000-0000-0000-0000-000000000001', 'fill-blanks', 'Review: The Numbers', 'About ___% of prison escapees are recaptured, most within ___ hours.', 'The odds are overwhelmingly against the escapee.',
'The 94% recapture rate and 24-48 hour typical window tell the whole story: modern manhunt capabilities make long-term evasion nearly impossible. The remaining 6% are statistical anomalies — usually minimum-security walkaways with established outside support, not dramatic prison-break escapees. Technology has fundamentally tilted the odds against anyone trying to disappear.',
'{"segments":[{"type":"text","content":"About "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":"% of prison escapees are recaptured, most within "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" hours."}],"answerBlocks":[{"id":"ans1","content":"94"},{"id":"ans2","content":"24-48"},{"id":"d1","content":"50"},{"id":"d2","content":"99"},{"id":"d3","content":"1-2"},{"id":"d4","content":"7 days"}]}', 2, ARRAY['prison','review','statistics']),

('a3110000-0000-0000-0000-000000000002', 'ordering', 'Review: Why Escapees Get Caught', 'Rank the reasons escapees are recaptured from MOST to LEAST common.', 'Human connections are the biggest vulnerability.',
'Contacting family/friends is the #1 way escapees are found — law enforcement monitors all known associates. Electronic/financial trails (phone, ATM, credit card) are #2. Tips from the public (often triggered by media alerts) are #3. Being recognized in person is #4. Physical evidence at the escape scene is rarely how fugitives are found — it helps convict them after capture, but rarely locates them.',
'{"items":[{"id":"i1","label":"Contacted family or friends (monitored)","emoji":"📞"},{"id":"i2","label":"Electronic/financial trail (phone, ATM)","emoji":"💳"},{"id":"i3","label":"Tip from the public","emoji":"👀"},{"id":"i4","label":"Recognized in person","emoji":"🔍"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 3, ARRAY['prison','review','recapture']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000011', 'a3110000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000011', 'a3110000-0000-0000-0000-000000000002', 2);

-- =================================================================
-- UNIT 4 — The Greatest Escapes in History
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b3000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000004', 'Greatest Escapes in History', 'Case studies of the most ingenious, daring, and audacious prison breaks ever.', 4);

-- ─── Lesson 4.1 — Alcatraz 1962 ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d3000000-0000-0000-0000-000000000012', 'b3000000-0000-0000-0000-000000000004', 'Alcatraz 1962', 'Frank Morris and the Anglin brothers: the escape that closed a prison.', '🏝️', 1, 15);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3120000-0000-0000-0000-000000000001', 'ordering', 'The Alcatraz Plan', 'Order the steps of the 1962 Alcatraz escape from FIRST to LAST.', 'It took months of preparation before one night of execution.',
'The escape took over 6 months to prepare. First they identified the weakness — the ventilation grating behind their cells was old and crumbling. They widened the openings using sharpened spoons over months. The dummy heads were built concurrently to buy time during the actual escape. They climbed through the utility corridor to the roof. The raincoat raft was their final engineering challenge — 50+ stolen raincoats glued together with contact cement. They launched at night into the bay, and were never seen again.',
'{"items":[{"id":"i1","label":"Identified weak ventilation grating behind cells","emoji":"🔍"},{"id":"i2","label":"Widened openings using sharpened spoons (6 months)","emoji":"🥄"},{"id":"i3","label":"Built dummy heads from soap, paper, and hair","emoji":"🎭"},{"id":"i4","label":"Climbed through utility corridor to the roof","emoji":"🪜"},{"id":"i5","label":"Launched raincoat raft into San Francisco Bay","emoji":"🛟"}],"correctOrder":["i1","i2","i3","i4","i5"],"direction":"top-down"}', 2, ARRAY['prison','alcatraz','history']),

('a3120000-0000-0000-0000-000000000002', 'mcq', 'The Raincoat Raft', 'What was the Alcatraz escapees'' raft made from?', 'They used materials available in prison.',
'The raft and life vests were made from over 50 stolen rubber-backed raincoats, glued together with contact cement pilfered from the prison glove shop. They also fabricated oars from plywood. MythBusters later proved that a similar raft COULD survive the bay crossing if paddled at the right angle relative to currents. The FBI concluded they drowned, but the US Marshals Service remains unconvinced and keeps the case open.',
'{"options":[{"id":"a","text":"Stolen life jackets from the prison boat"},{"id":"b","text":"Over 50 raincoats glued together with contact cement"},{"id":"c","text":"Driftwood tied with bed sheets"},{"id":"d","text":"An inflatable raft smuggled in by an accomplice"}],"correctOptionId":"b"}', 2, ARRAY['prison','alcatraz','raft']),

('a3120000-0000-0000-0000-000000000003', 'thought-tree', 'Did They Survive?', 'Analyze the evidence: did Morris and the Anglins survive the crossing?', 'Weigh the evidence objectively.',
'This is one of history''s great unsolved mysteries. The key evidence: personal effects were found floating (suggesting the raft broke apart), but no bodies were ever recovered despite extensive searching. The water temperature (54°F) causes hypothermia in 20-30 minutes but is survivable with a raft. A 2015 letter allegedly from one of the Anglin brothers claimed they survived. MythBusters showed the crossing was physically possible. The FBI says dead; the Marshals say open case.',
'{"nodes":[{"id":"n1","question":"Personal effects were found floating in the bay. What does this suggest?","leftChoice":{"id":"n1l","text":"The raft may have broken apart"},"rightChoice":{"id":"n1r","text":"They deliberately dumped their stuff"},"correctChoiceId":"n1l"},{"id":"n2","question":"No bodies were ever found. What does this suggest?","leftChoice":{"id":"n2l","text":"They could have survived — bodies aren''t always recovered in the bay"},"rightChoice":{"id":"n2r","text":"They definitely drowned — the water was too cold"},"correctChoiceId":"n2l"},{"id":"n3","question":"MythBusters recreated the raft. Result?","leftChoice":{"id":"n3l","text":"It survived the crossing when paddled at the right angle"},"rightChoice":{"id":"n3r","text":"It sank within minutes"},"correctChoiceId":"n3l"},{"id":"n4","question":"Given ALL the evidence, the most honest conclusion is:","leftChoice":{"id":"n4l","text":"We genuinely don''t know — the evidence is inconclusive"},"rightChoice":{"id":"n4r","text":"They definitely survived"},"correctChoiceId":"n4l"}],"finalAnswer":"The honest answer is: we don''t know. The evidence supports both survival and drowning. What we DO know is that their planning — months of preparation, decoy heads, engineered raft — was brilliant enough to create a mystery that persists 60+ years later."}', 3, ARRAY['prison','alcatraz','mystery']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000012', 'a3120000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000012', 'a3120000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000012', 'a3120000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 4.2 — El Chapo's Tunnel ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d3000000-0000-0000-0000-000000000013', 'b3000000-0000-0000-0000-000000000004', 'El Chapo''s Tunnel', 'The $50 million tunnel that embarrassed a nation.', '🇲🇽', 2, 15);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3130000-0000-0000-0000-000000000001', 'mcq', 'The Tunnel Specs', 'How long was the tunnel El Chapo used to escape Altiplano prison in 2015?', 'It was a professional engineering project.',
'The tunnel was approximately 1 mile (1.5 km) long and 33 feet deep. It was fully equipped with ventilation, lighting, a modified motorcycle on rails (for transporting dirt), and reinforced walls. The exit was inside a half-built house purchased specifically for the escape. Estimated cost: $50 million. It took approximately one year to build. This wasn''t a prison escape — it was a construction project.',
'{"options":[{"id":"a","text":"About 100 meters"},{"id":"b","text":"About 500 meters"},{"id":"c","text":"About 1 mile (1.5 km)"},{"id":"d","text":"About 5 miles"}],"correctOptionId":"c"}', 2, ARRAY['prison','elchapo','tunnel']),

('a3130000-0000-0000-0000-000000000002', 'match-pairs', 'Tunnel Features', 'Match each feature of El Chapo''s tunnel to its purpose.', 'This tunnel had features that legitimate mines would envy.',
'The motorcycle-on-rails system transported thousands of tons of excavated soil quickly and silently. The ventilation system prevented CO2 buildup over the mile-long distance. Lighting was necessary for the construction crew working underground for months. PVC pipe reinforcement prevented collapse in the sandy soil. Each feature solved a specific engineering challenge that the Stalag Luft III tunnelers had faced with primitive solutions 70 years earlier.',
'{"leftItems":[{"id":"l1","text":"Motorcycle on rails"},{"id":"l2","text":"Ventilation system"},{"id":"l3","text":"Electric lighting"},{"id":"l4","text":"PVC pipe reinforcement"}],"rightItems":[{"id":"r1","text":"Transport soil and materials quickly"},{"id":"r2","text":"Prevent suffocation over 1-mile length"},{"id":"r3","text":"Enable 24-hour construction work"},{"id":"r4","text":"Prevent tunnel collapse in sandy soil"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Feature","rightColumnLabel":"Purpose"}', 2, ARRAY['prison','elchapo','engineering']),

('a3130000-0000-0000-0000-000000000003', 'fill-blanks', 'The Price of Escape', 'El Chapo''s tunnel cost approximately $___ million, took ___ year(s) to build, and ended in a ___ purchased for the escape.', 'Resources that only a billionaire drug lord could muster.',
'The $50 million budget, one-year timeline, and purpose-built safe house demonstrate that this wasn''t an individual escape — it was an organized operation by the Sinaloa cartel using professional engineers. The tunnel exit was inside a house purchased under a fake identity 1 mile from the prison. Altiplano was supposed to be Mexico''s most secure prison. After this escape, El Chapo was eventually recaptured and sent to ADX Florence — the one prison no tunnel can reach.',
'{"segments":[{"type":"text","content":"El Chapo''s tunnel cost approximately $"},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" million, took "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" year(s) to build, and ended in a "},{"type":"slot","slotId":"s3","correctAnswerId":"ans3"},{"type":"text","content":" purchased for the escape."}],"answerBlocks":[{"id":"ans1","content":"50"},{"id":"ans2","content":"1"},{"id":"ans3","content":"house"},{"id":"d1","content":"5"},{"id":"d2","content":"3"},{"id":"d3","content":"warehouse"},{"id":"d4","content":"100"},{"id":"d5","content":"truck"}]}', 2, ARRAY['prison','elchapo','cost']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000013', 'a3130000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000013', 'a3130000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000013', 'a3130000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 4.3 — Unit 4 Checkpoint ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d3000000-0000-0000-0000-000000000014', 'b3000000-0000-0000-0000-000000000004', 'History Review', 'Test your knowledge of the greatest escapes.', '🏁', 3, 15, true);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3140000-0000-0000-0000-000000000001', 'ordering', 'Review: Escape Timeline', 'Order these famous escapes chronologically from EARLIEST to LATEST.', 'Trace the evolution of prison escape.',
'The Château d''If (1800s, fictionalized in Monte Cristo) represents the era of stone fortresses. Stalag Luft III (1944) was the golden age of POW tunnel escapes. Alcatraz (1962) combined engineering with deception in a modern prison. El Chapo (2015) used unlimited cartel resources against 21st-century security. The progression shows how both escape methods and countermeasures have evolved dramatically.',
'{"items":[{"id":"i1","label":"Château d''If escapes (1800s era)","emoji":"🏰"},{"id":"i2","label":"The Great Escape, Stalag Luft III (1944)","emoji":"✈️"},{"id":"i3","label":"Alcatraz escape (1962)","emoji":"🏝️"},{"id":"i4","label":"El Chapo''s tunnel escape (2015)","emoji":"🇲🇽"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['prison','review','timeline']),

('a3140000-0000-0000-0000-000000000002', 'mcq', 'Review: Common Thread', 'What single factor connects ALL successful prison escapes throughout history?', 'Look for the universal element.',
'Every successful escape in history — from medieval castle breakouts to El Chapo''s tunnel — required extensive preparation over weeks, months, or years. Spontaneous escapes almost never work. The 1962 Alcatraz escape took 6+ months of nightly work. The Great Escape took over a year. El Chapo''s tunnel took a year of professional construction. Patience and planning trump everything else.',
'{"options":[{"id":"a","text":"They all used tunnels"},{"id":"b","text":"They all had outside help"},{"id":"c","text":"Months or years of meticulous preparation"},{"id":"d","text":"They all happened at night"}],"correctOptionId":"c"}', 2, ARRAY['prison','review','patterns']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000014', 'a3140000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000014', 'a3140000-0000-0000-0000-000000000002', 2);

-- =================================================================
-- UNIT 5 — The Big Picture (Justice, Ethics & the Future)
-- =================================================================
INSERT INTO course_units (id, course_id, title, description, sort_order) VALUES
('b3000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000004', 'The Big Picture', 'Why people escape, whether they should, and what prisons of the future look like.', 5);

-- ─── Lesson 5.1 — Why People Escape ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d3000000-0000-0000-0000-000000000015', 'b3000000-0000-0000-0000-000000000005', 'Why People Escape', 'The psychology and ethics of seeking freedom.', '💭', 1, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3150000-0000-0000-0000-000000000001', 'ordering', 'Motivations', 'Rank the most common motivations for prison escape from MOST to LEAST frequent.', 'Not all escapes are about freedom.',
'Fear for personal safety (from other inmates or guards) is the most commonly cited motivation. Desperation from harsh conditions drives many escape attempts. Desire for freedom/family is a universal human need. Wrongful conviction provides the strongest moral justification but is actually less common as a primary motivator. Understanding motivations helps design prisons that reduce the desperation that drives escape attempts.',
'{"items":[{"id":"i1","label":"Fear for personal safety inside prison","emoji":"😰"},{"id":"i2","label":"Desperation from harsh conditions","emoji":"😔"},{"id":"i3","label":"Desire for freedom and family","emoji":"👨‍👩‍👧"},{"id":"i4","label":"Belief in wrongful conviction","emoji":"⚖️"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 2, ARRAY['prison','psychology','motivation']),

('a3150000-0000-0000-0000-000000000002', 'mcq', 'The German Paradox', 'In Germany and several other countries, the act of escaping prison is:', 'Their legal system views escape differently than the US.',
'In Germany, Austria, and Mexico, escaping prison itself is NOT a crime. The legal reasoning: the desire for freedom is a fundamental human instinct that the law should not punish. However, any crimes committed DURING the escape (breaking doors, assaulting guards, stealing vehicles) ARE prosecuted. This reflects a fundamentally different philosophy about incarceration and human nature compared to the US system.',
'{"options":[{"id":"a","text":"Punished by an additional 20 years automatically"},{"id":"b","text":"Not a crime — the desire for freedom is considered a basic human instinct"},{"id":"c","text":"A capital offense in some states"},{"id":"d","text":"Handled the same as in the US"}],"correctOptionId":"b"}', 2, ARRAY['prison','ethics','law']),

('a3150000-0000-0000-0000-000000000003', 'categorization-grid', 'Ethics of Escape', 'Categorize each scenario by whether escape is generally considered JUSTIFIABLE or NOT JUSTIFIABLE by ethicists.', 'Think about proportionality and alternatives.',
'Ethicists generally agree: escape from torture or imminent death threats has strong moral justification — self-preservation is a fundamental right. Wrongful conviction cases (especially with exhausted legal appeals) also garner wide sympathy. Escaping humane conditions from a fair conviction is generally not considered justified. Violent escape that harms innocent people is almost universally condemned regardless of circumstances.',
'{"categories":[{"id":"justifiable","label":"More Justifiable","emoji":"✅"},{"id":"not","label":"Less Justifiable","emoji":"❌"}],"items":[{"id":"i1","text":"Escaping torture or imminent death threats"},{"id":"i2","text":"Wrongfully convicted, appeals exhausted"},{"id":"i3","text":"Fairly convicted, humane conditions"},{"id":"i4","text":"Violent escape that injures guards"},{"id":"i5","text":"Escaping to provide for starving family"}],"correctMapping":{"i1":"justifiable","i2":"justifiable","i3":"not","i4":"not","i5":"justifiable"},"layout":"columns"}', 3, ARRAY['prison','ethics','morality']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000015', 'a3150000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000015', 'a3150000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000015', 'a3150000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 5.2 — The Future of Prisons ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward) VALUES
('d3000000-0000-0000-0000-000000000016', 'b3000000-0000-0000-0000-000000000005', 'The Future of Prisons', 'From AI guards to open prisons — where is incarceration heading?', '🔮', 2, 10);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3160000-0000-0000-0000-000000000001', 'match-pairs', 'Future Tech', 'Match each emerging technology to its impact on prison security.', 'Each technology closes a different escape vector.',
'AI-powered cameras can detect unusual behavior patterns (someone lingering near a fence, or missing from their usual location) without human attention. Biometric scanning at every checkpoint makes identity deception impossible. Drone patrols can cover perimeter areas that guards cannot. GPS ankle monitors create "invisible walls" that track movement without physical barriers — enabling open prisons where the technology IS the fence.',
'{"leftItems":[{"id":"l1","text":"AI-powered behavioral cameras"},{"id":"l2","text":"Biometric scanning (iris, fingerprint)"},{"id":"l3","text":"Autonomous drone patrols"},{"id":"l4","text":"GPS ankle monitors"}],"rightItems":[{"id":"r1","text":"Detect suspicious behavior patterns automatically"},{"id":"r2","text":"Eliminate identity deception at checkpoints"},{"id":"r3","text":"Cover vast perimeter areas without guards"},{"id":"r4","text":"Create invisible boundaries without walls"}],"correctPairs":{"l1":"r1","l2":"r2","l3":"r3","l4":"r4"},"leftColumnLabel":"Technology","rightColumnLabel":"Security Impact"}', 3, ARRAY['prison','future','technology']),

('a3160000-0000-0000-0000-000000000002', 'mcq', 'The Nordic Model', 'Norway''s Halden Prison has no bars on windows, private rooms with flatscreen TVs, and a recidivism rate of:', 'Their approach prioritizes rehabilitation over punishment.',
'Norway''s Halden Prison has a recidivism rate of about 20%, compared to approximately 76% in the United States. The philosophy: if you treat people like animals, they behave like animals when released. If you treat them like people who need to learn to live in society, they''re more likely to succeed upon release. The escape rate is also extremely low because inmates have more to lose (comfortable conditions, early release prospects) and less motivation to flee.',
'{"options":[{"id":"a","text":"About 20% (vs. 76% in the US)"},{"id":"b","text":"About 50% (similar to the US)"},{"id":"c","text":"About 80% (worse than the US)"},{"id":"d","text":"About 5% (virtually zero)"}],"correctOptionId":"a"}', 2, ARRAY['prison','future','nordic']),

('a3160000-0000-0000-0000-000000000003', 'categorization-grid', 'Walls or Wellness?', 'Categorize each approach as SECURITY-focused or REHABILITATION-focused.', 'Modern penology debates these two philosophies intensely.',
'The security vs. rehabilitation debate is the central tension in modern criminal justice. Solitary confinement and electronic monitoring are pure security tools — they prevent escape but don''t change behavior. Job training and mental health programs address the root causes of crime. Community integration programs and restorative justice represent the furthest extreme of rehabilitation. The evidence increasingly supports rehabilitation as more effective for public safety long-term.',
'{"categories":[{"id":"security","label":"Security Focus","emoji":"🔒"},{"id":"rehab","label":"Rehabilitation Focus","emoji":"🌱"}],"items":[{"id":"i1","text":"Solitary confinement"},{"id":"i2","text":"Job training programs"},{"id":"i3","text":"Electronic monitoring + GPS"},{"id":"i4","text":"Mental health counseling"},{"id":"i5","text":"Guard towers with rifles"},{"id":"i6","text":"Community reintegration programs"}],"correctMapping":{"i1":"security","i2":"rehab","i3":"security","i4":"rehab","i5":"security","i6":"rehab"},"layout":"columns"}', 2, ARRAY['prison','future','philosophy']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000016', 'a3160000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000016', 'a3160000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000016', 'a3160000-0000-0000-0000-000000000003', 3);

-- ─── Lesson 5.3 — Final Exam ───
INSERT INTO course_lessons (id, unit_id, title, description, emoji, sort_order, xp_reward, is_checkpoint_review) VALUES
('d3000000-0000-0000-0000-000000000017', 'b3000000-0000-0000-0000-000000000005', 'The Final Breakout', 'The ultimate test — plan, execute, and survive.', '🏆', 3, 25, true);

INSERT INTO applets (id, type, title, question, hint, explanation, content, difficulty, tags) VALUES
('a3170000-0000-0000-0000-000000000001', 'thought-tree', 'Plan Your Escape', 'You''re in a medium-security prison. Using everything you''ve learned, plan a full escape.', 'Apply every lesson from the course.',
'This final simulation integrates every concept: tunnel engineering fails because modern sensors detect it — you must adapt. Shift changes create a 15-minute gap (deception unit). Disguise exploits authority bias (psychology). The exercise yard at dusk provides the best window (security analysis). A pre-staged vehicle from an outside contact is better than improvising (survival unit). Each correct choice references a specific lesson from the course.',
'{"nodes":[{"id":"n1","question":"Your approach: tunnel, wall, or deception?","leftChoice":{"id":"n1l","text":"Deception — exploit a human vulnerability"},"rightChoice":{"id":"n1r","text":"Tunnel — it worked for El Chapo"},"correctChoiceId":"n1l"},{"id":"n2","question":"When do you make your move?","leftChoice":{"id":"n2l","text":"During shift change — 15-minute gap in coverage"},"rightChoice":{"id":"n2r","text":"During the night count — everyone''s asleep"},"correctChoiceId":"n2l"},{"id":"n3","question":"How do you handle the gate checkpoint?","leftChoice":{"id":"n3l","text":"Walk through in maintenance uniform with a clipboard"},"rightChoice":{"id":"n3r","text":"Sprint past when the guard is distracted"},"correctChoiceId":"n3l"},{"id":"n4","question":"You''re outside the wall. First priority?","leftChoice":{"id":"n4l","text":"Reach pre-staged vehicle from outside contact"},"rightChoice":{"id":"n4r","text":"Run into the woods and hide"},"correctChoiceId":"n4l"},{"id":"n5","question":"The 5 AM count is in 4 hours. How do you use this time?","leftChoice":{"id":"n5l","text":"Drive to water source, ditch phone, change clothes, go to ground"},"rightChoice":{"id":"n5r","text":"Drive as far as possible on the highway"},"correctChoiceId":"n5l"}],"finalAnswer":"Deception over brute force. Shift change timing. Authority bias at checkpoints. Pre-staged resources. Counter-tracking techniques. Every choice maps back to a lesson. But remember: 94% are recaptured, and the additional charges make the sentence much worse. The real lesson? The best escape is not needing one."}', 4, ARRAY['prison','final','simulation']),

('a3170000-0000-0000-0000-000000000002', 'ordering', 'The Ultimate Ranking', 'Rank the factors that most determine whether an escape succeeds, from MOST to LEAST important.', 'Think about what the historical cases teach us.',
'Preparation time is king — every successful escape took months or years. Outside support (safe houses, vehicles, money, accomplices) is essential for staying free. The security level of the facility determines baseline difficulty. Physical fitness matters but is the least important factor — the most successful escapes (social engineering, tunnels) relied on patience and intelligence, not athleticism.',
'{"items":[{"id":"i1","label":"Months/years of meticulous preparation","emoji":"📋"},{"id":"i2","label":"Outside support network (people, resources)","emoji":"👥"},{"id":"i3","label":"Security level of the facility","emoji":"🏰"},{"id":"i4","label":"Physical fitness and athleticism","emoji":"💪"}],"correctOrder":["i1","i2","i3","i4"],"direction":"top-down"}', 3, ARRAY['prison','final','ranking']),

('a3170000-0000-0000-0000-000000000003', 'fill-blanks', 'The Final Lesson', 'The most important thing this course teaches is not how to ___ of prison, but how ___ works.', 'Zoom out to the big picture.',
'This course used the lens of prison escape to teach security engineering, historical analysis, psychology, ethics, and critical thinking. Understanding how security works — layers of defense, human vulnerabilities, the arms race between attackers and defenders — applies to cybersecurity, home security, institutional design, and countless other fields. The escape is the hook; the education is the point.',
'{"segments":[{"type":"text","content":"The most important thing this course teaches is not how to "},{"type":"slot","slotId":"s1","correctAnswerId":"ans1"},{"type":"text","content":" of prison, but how "},{"type":"slot","slotId":"s2","correctAnswerId":"ans2"},{"type":"text","content":" works."}],"answerBlocks":[{"id":"ans1","content":"break out"},{"id":"ans2","content":"security"},{"id":"d1","content":"stay out"},{"id":"d2","content":"freedom"},{"id":"d3","content":"survive"},{"id":"d4","content":"punishment"}]}', 2, ARRAY['prison','final','philosophy']),

('a3170000-0000-0000-0000-000000000004', 'mcq', 'The Real Escape', 'Given everything you''ve learned, what is the BEST strategy for escaping prison?', 'Think about this from every angle.',
'The single most effective strategy is to never be in prison in the first place. But for those who are: legal appeals, good behavior for early release, and parole are successful thousands of times more often than physical escape. Of the ~600,000 people released from US prisons annually, virtually all leave through legal channels. The 94% recapture rate, additional charges, and worsened conditions make escape a losing bet by any rational calculation.',
'{"options":[{"id":"a","text":"A well-planned tunnel escape"},{"id":"b","text":"Social engineering and disguise"},{"id":"c","text":"Legal appeals, good behavior, and parole"},{"id":"d","text":"Helicopter extraction by accomplices"}],"correctOptionId":"c"}', 3, ARRAY['prison','final','wisdom']);

INSERT INTO lesson_applets (lesson_id, applet_id, sort_order) VALUES
('d3000000-0000-0000-0000-000000000017', 'a3170000-0000-0000-0000-000000000001', 1),
('d3000000-0000-0000-0000-000000000017', 'a3170000-0000-0000-0000-000000000002', 2),
('d3000000-0000-0000-0000-000000000017', 'a3170000-0000-0000-0000-000000000003', 3),
('d3000000-0000-0000-0000-000000000017', 'a3170000-0000-0000-0000-000000000004', 4);
