-- Migration: 042_house_heist_explanations
-- Description: Add explanation text to all applets in the House Heist course.
-- These are shown to users after they check their answer via the "Why this answer?" button.

-- === Unit 1: Casing the Joint ===

-- Lesson 1.1 — What Makes a Target?
UPDATE applets SET explanation = 'A dark house with overgrown bushes signals the owner is away or inattentive, and the bushes provide concealment near windows. Burglars avoid well-lit homes, dogs, cameras, and watchful neighbors — all of which increase risk of detection.' WHERE id = 'a1010000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'An unoccupied appearance is the #1 green light — it means zero chance of confrontation. No security system means no alarm or footage. Concealed entry points come next. Visible wealth (expensive car) is actually low priority; burglars care more about risk than reward when choosing targets.' WHERE id = 'a1010000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'Piling mail, open garages, and uncovered windows are all signals of vulnerability or absence. Motion lights, doorbell cameras, and neighborhood watch signs are active deterrents that raise the risk for burglars. The key principle: anything that makes detection more likely makes a home a SKIP.' WHERE id = 'a1010000-0000-0000-0000-000000000003';

-- Lesson 1.2 — Timing is Everything
UPDATE applets SET explanation = 'Contrary to the Hollywood image of nighttime break-ins, most burglaries happen during work hours (10 AM–3 PM). Homes are empty, burglars can see clearly, and suspicious activity looks like a normal delivery or service visit. Nighttime burglaries are riskier because occupants may be sleeping inside.' WHERE id = 'a1020000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'July and June have the highest burglary rates. Longer daylight hours mean more comfortable operating conditions, and families are often on vacation — leaving homes empty for extended periods. December is lowest because people are home for holidays and it gets dark early.' WHERE id = 'a1020000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'Each step in this decision tree reduces risk: weekday (likely empty), no cars (confirms empty), no movement (double confirms), no neighbors watching (no witnesses), concealed entry (no passerby sighting). Burglars systematically eliminate risk factors before committing. Interrupting ANY step in this chain deters them.' WHERE id = 'a1020000-0000-0000-0000-000000000003';

-- Lesson 1.3 — Social Engineering
UPDATE applets SET explanation = 'Each tactic targets a specific piece of intelligence. Door-knocking tests occupancy without suspicion. Mailbox checks reveal time away. Window-peeking maps valuables and room layouts. Neighbor chats reveal schedules. Understanding these tactics helps you recognize when your home is being "cased."' WHERE id = 'a1030000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'The primary goal of a fake delivery attempt is to determine if anyone is home. If nobody answers, the house goes on the target list. This is why video doorbells are so effective — they allow you to "answer" even when you''re not home, making the burglar think the house is occupied.' WHERE id = 'a1030000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'The Hawaii post is most valuable because it confirms a 2-week window of absence. Work schedules reveal daily patterns. Morning jog habits show when you leave (and the house is briefly empty). The TV purchase tells them what to steal but NOT when — making it least useful for planning the actual break-in.' WHERE id = 'a1030000-0000-0000-0000-000000000003';

-- Lesson 1.4 — Unit 1 Checkpoint
UPDATE applets SET explanation = 'In surveys of convicted burglars, signs of occupancy (lights, sounds, cars) are the #1 deterrent — even above dogs or cameras. A burglar''s worst nightmare is confronting someone inside. This is why smart lights on random timers and leaving a TV on can be more effective than expensive alarm systems.' WHERE id = 'a1040000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'Random timed lights and TV sounds simulate a person at home. Newspapers and overgrown lawns scream "nobody''s here." A car in the driveway is one of the strongest occupancy signals. When you''re away, use every trick to make your home look lived-in.' WHERE id = 'a1040000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'FBI and DOJ data consistently show burglaries peak on weekdays during daytime work hours (10 AM–3 PM). People are at work, kids are at school, and the streets are quiet. This is why retirees and work-from-home households are statistically less likely to be burglarized.' WHERE id = 'a1040000-0000-0000-0000-000000000003';

-- === Unit 2: Breaking & Entering ===

-- Lesson 2.1 — Door Vulnerabilities
UPDATE applets SET explanation = 'FBI stats show about 34% of burglars enter through the front door — the single most common entry point. Shockingly, many of these are through unlocked doors. People assume burglars sneak through windows, but the front door is simpler, faster, and often completely unsecured.' WHERE id = 'a1050000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'A spring latch (the kind that clicks shut) can be opened with a credit card in seconds. A single-cylinder deadbolt is good but not pick-proof. Smart locks add auto-locking (you can''t forget) but depend on batteries. A double-cylinder deadbolt with a reinforced 3" screw strike plate is the gold standard — it resists kicking, picking, and prying.' WHERE id = 'a1050000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'The door frame (specifically the strike plate area) is the weakest point. Most forced entries involve kicking the door — which doesn''t break the lock, it breaks the thin wood frame around the strike plate. Upgrading to 3-inch screws that anchor into the wall stud costs about $5 and is one of the most effective security upgrades you can make.' WHERE id = 'a1050000-0000-0000-0000-000000000003';

-- Lesson 2.2 — Windows & Side Entries
UPDATE applets SET explanation = 'Unlocked ground-floor windows and unbarred sliding doors are easiest — they take seconds with zero noise or tools. Pet doors (medium) let a smaller person or a tool through. Second-story windows and reinforced doors require ladders, more time, and more noise — dramatically increasing the risk of detection.' WHERE id = 'a1060000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'A simple wooden dowel (or cut broomstick) placed in the sliding door track prevents the door from being forced open, even if the lock is bypassed. It costs almost nothing and takes seconds to install. Many security experts consider it the single best bang-for-buck home security upgrade.' WHERE id = 'a1060000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'Burglars evaluate windows the same way they evaluate doors: visibility, lock status, alarm presence, and accessibility. A window hidden from the street, unlocked, with no sensors and at ground level is the perfect entry point. Each security layer you add forces them to the next decision point — and most give up after 1-2 obstacles.' WHERE id = 'a1060000-0000-0000-0000-000000000003';

-- Lesson 2.3 — Tools of the Trade
UPDATE applets SET explanation = 'Each tool exploits a specific weakness: crowbars defeat weak frames, picks defeat cheap pins, glass cutters bypass window locks, bump keys defeat standard pin-tumbler deadbolts. Matching the right defense to each attack vector is the principle of defense in depth.' WHERE id = 'a1070000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'Studies and interviews with convicted burglars consistently show 60 seconds is the threshold. Beyond that, the risk of a neighbor noticing, a passerby calling police, or an alarm response makes the attempt not worthwhile. This is why "delay" is one of the four pillars of security (Deter, Detect, Delay, Deny).' WHERE id = 'a1070000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'Sliding open an unlocked window is virtually silent. Lock picking makes soft clicking sounds. Prying produces loud creaking and cracking. Smashing glass creates an immediate loud noise that can be heard hundreds of feet away. Burglars strongly prefer silent methods, which is why locked windows with security film (prevents silent cutting) are so effective.' WHERE id = 'a1070000-0000-0000-0000-000000000003';

-- Lesson 2.4 — Unit 2 Checkpoint
UPDATE applets SET explanation = 'The front door is the #1 entry point at ~34% of burglaries. People focus on windows and back doors but often leave their front door with a cheap lock and a weak frame. Securing the front door with a quality deadbolt and reinforced strike plate should be your first priority.' WHERE id = 'a1080000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'The 60-second rule is well-documented in criminology research. If a burglar can''t gain entry within about a minute, the risk-reward ratio flips — the chance of detection exceeds the expected value of stolen goods. Every security upgrade you make is essentially a "time tax" on the burglar.' WHERE id = 'a1080000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'A solid wood door with a deadbolt is inherently strong. A hollow-core door with a spring latch can literally be kicked in with one foot. Security film prevents silent glass cutting. An unbarred sliding door is one of the weakest entry points in any home. Understanding these levels helps you prioritize your security budget.' WHERE id = 'a1080000-0000-0000-0000-000000000003';

-- === Unit 3: Inside the House ===

-- Lesson 3.1 — The Burglar's Playbook
UPDATE applets SET explanation = 'The master bedroom is always first because that''s where people keep jewelry, cash, watches, and personal safes. Home offices have laptops and electronics. Living rooms have some electronics but are more visible from outside. Kitchens are rarely targeted because valuables are almost never stored there.' WHERE id = 'a1090000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'Under the mattress and the sock drawer are the first two places every experienced burglar checks — it takes about 5 seconds each. Behind paintings is a movie cliché that real burglars also know. The freezer is slightly less common but still well-known. A bolted floor safe or off-site storage are the only truly secure options.' WHERE id = 'a1090000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'Burglars optimize for value-to-weight ratio and traceability. Cash is untraceable and light. Jewelry is small and high-value. Laptops are portable and easy to fence. A 65" TV is heavy, hard to carry, and easily identified. Paintings are too distinctive to sell. Prescription medications (especially opioids) are sadly a high-value target due to street resale.' WHERE id = 'a1090000-0000-0000-0000-000000000003';

-- Lesson 3.2 — Time Inside
UPDATE applets SET explanation = 'DOJ research consistently shows the average residential burglar spends 8-10 minutes inside a home. They are not browsing — they have a systematic routine. This tight window means that anything that costs them time (locked internal doors, safes, hidden valuables) dramatically reduces what they can steal.' WHERE id = 'a1100000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'Experienced burglars first locate exits (in case they need to flee), then hit the master bedroom (highest value per minute), sweep the office for electronics, and grab easy items near the exit on their way out. Understanding this sequence tells you exactly what to secure: bedroom valuables and easy-grab items near doors.' WHERE id = 'a1100000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'A beeping alarm countdown means a monitoring company is about to be notified, and police will be called. Even though average police response is 7+ minutes, the UNCERTAINTY is what matters — it could be 3 minutes. Smart burglars bail immediately because any items grabbed aren''t worth an arrest. This is why monitored alarms (not just sirens) are so effective.' WHERE id = 'a1100000-0000-0000-0000-000000000003';

-- Lesson 3.3 — Unit 3 Checkpoint
UPDATE applets SET explanation = 'The 8-10 minute average is well-documented across multiple studies. The master bedroom is the first stop because it has the highest concentration of portable valuables per square foot. These two facts together mean: put your most valuable items somewhere that takes MORE than 10 minutes to access (like a bolted safe).' WHERE id = 'a1110000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'Under the mattress is checked first by virtually all burglars — it''s a 3-second check. Sock drawers are next. A bolted floor safe requires tools and time most burglars don''t have. A bank safe deposit box is the ultimate security — it''s literally impossible to steal during a home burglary. The pattern: distance from the bedroom = security level.' WHERE id = 'a1110000-0000-0000-0000-000000000002';

-- === Unit 4: The Getaway ===

-- Lesson 4.1 — Escape Planning
UPDATE applets SET explanation = 'Parking right in front is too identifiable. Parking blocks away wastes escape time. Around the corner is the sweet spot — close enough for a quick getaway, far enough to not be directly associated with the target house, and typically out of range of doorbell cameras pointed at the front.' WHERE id = 'a1120000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'Avoiding identification (cameras, witnesses) is paramount — it''s the difference between getting away and getting arrested. Quick calm departure is next; running attracts attention. Fingerprints are a concern but secondary. Maximizing theft is actually LAST priority during escape — most burglars will abandon goods if they feel at risk.' WHERE id = 'a1120000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'High-mounted cameras capture the tops of heads (useless for ID). Cameras behind windows get glare and reflections. Garage cameras miss the approach. Eye-level cameras at entry points capture full facial features, which is exactly what police need for identification. Position your cameras where they''ll capture faces, not hat brims.' WHERE id = 'a1120000-0000-0000-0000-000000000003';

-- Lesson 4.2 — How They Get Caught
UPDATE applets SET explanation = 'Neighbor and witness reports are the #1 way burglars are identified, followed closely by camera footage (especially doorbell cameras). Fence operations and forensic evidence (DNA, fingerprints) are less common because most burglaries don''t get that level of investigation due to the sheer volume of cases.' WHERE id = 'a1130000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'The ~14% clearance rate for burglary is one of the lowest of any crime category. The main reasons: little physical evidence is left behind, police departments are overwhelmed with cases, and victims often can''t identify what was stolen specifically enough. This is why prevention is so much more important than investigation.' WHERE id = 'a1130000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'The rise of doorbell cameras (Ring, Nest) combined with community platforms (Nextdoor, neighborhood Facebook groups) has created a distributed surveillance network. Footage gets shared within minutes, and community members help identify suspects. This is the single biggest technological shift in residential burglary prevention in the last decade.' WHERE id = 'a1130000-0000-0000-0000-000000000003';

-- Lesson 4.3 — Unit 4 Checkpoint
UPDATE applets SET explanation = 'Gloves and parking distance are classic evasion tactics. Using your own phone creates a cell tower record placing you at the scene. Bragging to friends is one of the most common ways burglars get caught — someone eventually tells police. Repeat offenses in the same area dramatically increase the chance of recognition by witnesses or cameras.' WHERE id = 'a1140000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'The low solve rate isn''t because police don''t try — it''s a combination of minimal physical evidence, high case volume, and the fact that most stolen items are generic (cash, electronics) and hard to trace. This statistical reality underscores why PREVENTION matters more than relying on police to solve a burglary after it happens.' WHERE id = 'a1140000-0000-0000-0000-000000000002';

-- === Unit 5: Fortify Your Home ===

-- Lesson 5.1 — Layered Security
UPDATE applets SET explanation = 'Defense in depth means each layer must be defeated in sequence. Neighborhood awareness is the outermost ring — if a neighbor sees something suspicious, the burglar is stopped before they even reach your property. Then perimeter, then entry hardening, then interior defenses. Each layer costs the burglar more time and increases detection risk.' WHERE id = 'a1150000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'Motion-sensor lights cost about $30, install in minutes, and deter more burglars per dollar than almost any other upgrade. They eliminate concealment (burglars'' biggest ally), they signal "this home has security-conscious residents," and they alert neighbors to movement. Expensive gadgets are nice, but don''t overlook the basics.' WHERE id = 'a1150000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'This decision tree mirrors a real security audit. Visible yard = no concealment. Motion lights = detection layer. Hardened entries = delay layer. Alarm/cameras = response layer. Secured valuables = last resort protection. Most homes fail at 2-3 of these points. Addressing all five makes you a hard target that burglars will skip for easier houses.' WHERE id = 'a1150000-0000-0000-0000-000000000003';

-- Lesson 5.2 — Smart Home Defense
UPDATE applets SET explanation = 'Each smart device addresses a specific vulnerability in the burglary chain. Doorbells deter the knock-test recon. Smart lights remove the "dark = empty" signal. Sensors provide real-time entry detection. GPS trackers enable stolen item recovery. The most effective smart home setup combines all four to cover the full attack timeline.' WHERE id = 'a1160000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'Ring doorbells, smart locks, window film, and smart lights can all be installed by homeowners in under an hour each. Hardwired alarm systems, reinforced door frames, and monitored panic buttons typically need professional installation for proper wiring, structural reinforcement, or 24/7 monitoring service setup.' WHERE id = 'a1160000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'While Bluetooth hacking makes headlines, the practical risk is extremely low — it requires specialized equipment and proximity. The REAL risk with smart locks is mundane: batteries dying while you''re out, causing a lockout, or the auto-lock feature failing in the unlocked position. Always have a physical backup key hidden securely.' WHERE id = 'a1160000-0000-0000-0000-000000000003';

-- Lesson 5.3 — Final Security Audit
UPDATE applets SET explanation = 'This simulation shows that layered defense works by forcing decision points. The first house had visible cameras and an alarm sign — the burglar moved on in seconds. The second house had multiple vulnerabilities stacked: no cameras, signs of absence, unlocked side gate, unbarred slider. But the hidden alarm was the final trap. Every layer you add makes the burglar''s job harder.' WHERE id = 'a1170000-0000-0000-0000-000000000001';

UPDATE applets SET explanation = 'Motion-sensor lights are ranked first because they''re the highest-impact, lowest-cost upgrade. They deter approach, eliminate concealment, and cost $30. The deadbolt + strike plate is next because the front door is the #1 entry point. Video doorbell provides evidence and deters recon. Window bars are effective but expensive and affect aesthetics — hence last.' WHERE id = 'a1170000-0000-0000-0000-000000000002';

UPDATE applets SET explanation = 'Most homes have the same weak points: ground-floor windows that are unlocked, garages connected to the house with weak interior doors, sliding doors without security bars, and minimal exterior lighting. Standard deadbolts and aware neighbors are typically the only two things working in a typical home''s favor. Knowing these defaults tells you exactly where to invest.' WHERE id = 'a1170000-0000-0000-0000-000000000003';

UPDATE applets SET explanation = 'This is the golden rule of home security: you don''t need to be Fort Knox. You just need to be harder to rob than the next house on the block. Burglars are opportunistic — they pick the easiest target. Making your home even slightly harder (better locks, motion lights, camera) pushes them to someone else''s house. It''s economics, not perfection.' WHERE id = 'a1170000-0000-0000-0000-000000000004';
