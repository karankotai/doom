-- Migration: 013_comparative_advantage_seed
-- Description: Seed comparative advantage applet data

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES

-- ═══════════════════════════════════════════════════
-- Puzzle 1: Classic two-country trade (Wheat & Cloth)
-- USA vs Japan — clear absolute advantage, different comparative advantage
-- ═══════════════════════════════════════════════════
(
    'comparative-advantage',
    'USA vs Japan: Absolute Advantage',
    'Absolute & Comparative Advantage',
    'Absolute advantage means one party can produce MORE of a good. Opportunity cost is what you give up to produce one unit of something.',
    '{
        "parties": [
            { "name": "USA", "emoji": "🇺🇸", "production": { "Wheat (tons)": 100, "Cloth (yards)": 20 } },
            { "name": "Japan", "emoji": "🇯🇵", "production": { "Wheat (tons)": 60, "Cloth (yards)": 40 } }
        ],
        "goods": ["Wheat (tons)", "Cloth (yards)"],
        "steps": [
            {
                "instruction": "Look at the table. How many tons of Wheat can the USA produce?",
                "good": "Wheat (tons)",
                "questionType": "absolute",
                "partyIndex": 0,
                "correctAnswer": 100,
                "explanation": "The USA can produce 100 tons of Wheat. Since 100 > 60, the USA has the absolute advantage in Wheat."
            },
            {
                "instruction": "How many yards of Cloth can Japan produce?",
                "good": "Cloth (yards)",
                "questionType": "absolute",
                "partyIndex": 1,
                "correctAnswer": 40,
                "explanation": "Japan produces 40 yards of Cloth vs the USA''s 20. Japan has the absolute advantage in Cloth."
            },
            {
                "instruction": "For the USA, what is the opportunity cost of producing 1 ton of Wheat? (How many yards of Cloth does it give up?)",
                "good": "Wheat (tons)",
                "questionType": "opportunity-cost",
                "partyIndex": 0,
                "correctAnswer": 0.2,
                "tolerance": 0.05,
                "explanation": "USA gives up 20 Cloth for 100 Wheat → 20/100 = 0.2 yards of Cloth per ton of Wheat."
            },
            {
                "instruction": "For Japan, what is the opportunity cost of producing 1 ton of Wheat?",
                "good": "Wheat (tons)",
                "questionType": "opportunity-cost",
                "partyIndex": 1,
                "correctAnswer": 0.7,
                "tolerance": 0.05,
                "explanation": "Japan gives up 40 Cloth for 60 Wheat → 40/60 ≈ 0.67 yards of Cloth per ton of Wheat. The USA has the lower opportunity cost, so the USA has the comparative advantage in Wheat."
            },
            {
                "instruction": "For the USA, what is the opportunity cost of 1 yard of Cloth? (How many tons of Wheat does it give up?)",
                "good": "Cloth (yards)",
                "questionType": "opportunity-cost",
                "partyIndex": 0,
                "correctAnswer": 5.0,
                "tolerance": 0.2,
                "explanation": "USA gives up 100 Wheat for 20 Cloth → 100/20 = 5 tons of Wheat per yard of Cloth."
            },
            {
                "instruction": "For Japan, what is the opportunity cost of 1 yard of Cloth?",
                "good": "Cloth (yards)",
                "questionType": "opportunity-cost",
                "partyIndex": 1,
                "correctAnswer": 1.5,
                "tolerance": 0.1,
                "explanation": "Japan gives up 60 Wheat for 40 Cloth → 60/40 = 1.5 tons of Wheat per yard of Cloth. Japan has the lower opportunity cost, so Japan has the comparative advantage in Cloth!"
            }
        ]
    }',
    1,
    ARRAY['economics', 'trade', 'comparative-advantage', 'absolute-advantage']
),

-- ═══════════════════════════════════════════════════
-- Puzzle 2: Two workers — Alice & Bob (Cookies & Cakes)
-- Person-level scenario, simpler numbers
-- ═══════════════════════════════════════════════════
(
    'comparative-advantage',
    'Alice vs Bob: Baking Battle',
    'Who Should Bake What?',
    'Even if one person is better at BOTH tasks, trade can still benefit both if they specialise in what they''re relatively best at.',
    '{
        "parties": [
            { "name": "Alice", "emoji": "👩‍🍳", "production": { "Cookies": 60, "Cakes": 30 } },
            { "name": "Bob", "emoji": "👨‍🍳", "production": { "Cookies": 20, "Cakes": 20 } }
        ],
        "goods": ["Cookies", "Cakes"],
        "steps": [
            {
                "instruction": "How many Cookies can Alice make in a day?",
                "good": "Cookies",
                "questionType": "absolute",
                "partyIndex": 0,
                "correctAnswer": 60,
                "explanation": "Alice makes 60 cookies. Since 60 > 20, Alice has the absolute advantage in Cookies."
            },
            {
                "instruction": "How many Cakes can Alice make in a day?",
                "good": "Cakes",
                "questionType": "absolute",
                "partyIndex": 0,
                "correctAnswer": 30,
                "explanation": "Alice makes 30 cakes vs Bob''s 20. Alice has the absolute advantage in BOTH goods! But that doesn''t mean she should make everything..."
            },
            {
                "instruction": "What is Alice''s opportunity cost of 1 Cake? (How many Cookies does she give up?)",
                "good": "Cakes",
                "questionType": "opportunity-cost",
                "partyIndex": 0,
                "correctAnswer": 2.0,
                "tolerance": 0.1,
                "explanation": "Alice gives up 60 Cookies for 30 Cakes → 60/30 = 2 Cookies per Cake."
            },
            {
                "instruction": "What is Bob''s opportunity cost of 1 Cake?",
                "good": "Cakes",
                "questionType": "opportunity-cost",
                "partyIndex": 1,
                "correctAnswer": 1.0,
                "tolerance": 0.1,
                "explanation": "Bob gives up 20 Cookies for 20 Cakes → 20/20 = 1 Cookie per Cake. Bob has the LOWER opportunity cost for Cakes, so Bob has the comparative advantage in Cakes — even though Alice is faster at both!"
            }
        ]
    }',
    1,
    ARRAY['economics', 'trade', 'comparative-advantage', 'opportunity-cost']
),

-- ═══════════════════════════════════════════════════
-- Puzzle 3: Brazil vs Germany (Coffee & Cars)
-- Real-world feel, larger numbers
-- ═══════════════════════════════════════════════════
(
    'comparative-advantage',
    'Brazil vs Germany: Trade Partners',
    'Why Do Countries Trade?',
    'Even when a country is better at producing everything, both countries benefit by specialising in what they produce at the lowest relative cost.',
    '{
        "parties": [
            { "name": "Brazil", "emoji": "🇧🇷", "production": { "Coffee (tons)": 80, "Cars": 10 } },
            { "name": "Germany", "emoji": "🇩🇪", "production": { "Coffee (tons)": 20, "Cars": 40 } }
        ],
        "goods": ["Coffee (tons)", "Cars"],
        "steps": [
            {
                "instruction": "How many tons of Coffee can Brazil produce?",
                "good": "Coffee (tons)",
                "questionType": "absolute",
                "partyIndex": 0,
                "correctAnswer": 80,
                "explanation": "Brazil produces 80 tons of Coffee — far more than Germany''s 20. Brazil has the absolute advantage in Coffee."
            },
            {
                "instruction": "How many Cars can Germany produce?",
                "good": "Cars",
                "questionType": "absolute",
                "partyIndex": 1,
                "correctAnswer": 40,
                "explanation": "Germany produces 40 Cars vs Brazil''s 10. Germany has the absolute advantage in Cars."
            },
            {
                "instruction": "For Brazil, what is the opportunity cost of producing 1 Car? (How many tons of Coffee does it give up?)",
                "good": "Cars",
                "questionType": "opportunity-cost",
                "partyIndex": 0,
                "correctAnswer": 8.0,
                "tolerance": 0.3,
                "explanation": "Brazil gives up 80 Coffee for 10 Cars → 80/10 = 8 tons of Coffee per Car. That''s expensive!"
            },
            {
                "instruction": "For Germany, what is the opportunity cost of producing 1 Car?",
                "good": "Cars",
                "questionType": "opportunity-cost",
                "partyIndex": 1,
                "correctAnswer": 0.5,
                "tolerance": 0.05,
                "explanation": "Germany gives up 20 Coffee for 40 Cars → 20/40 = 0.5 tons of Coffee per Car. Germany''s opportunity cost is much lower → Germany has the comparative advantage in Cars."
            },
            {
                "instruction": "For Germany, what is the opportunity cost of 1 ton of Coffee? (How many Cars does it give up?)",
                "good": "Coffee (tons)",
                "questionType": "opportunity-cost",
                "partyIndex": 1,
                "correctAnswer": 2.0,
                "tolerance": 0.1,
                "explanation": "Germany gives up 40 Cars for 20 Coffee → 40/20 = 2 Cars per ton of Coffee."
            },
            {
                "instruction": "For Brazil, what is the opportunity cost of 1 ton of Coffee?",
                "good": "Coffee (tons)",
                "questionType": "opportunity-cost",
                "partyIndex": 0,
                "correctAnswer": 0.1,
                "tolerance": 0.02,
                "explanation": "Brazil gives up 10 Cars for 80 Coffee → 10/80 = 0.125 Cars per ton of Coffee. Brazil has the comparative advantage in Coffee! Each country should specialise in what it does relatively best."
            }
        ]
    }',
    2,
    ARRAY['economics', 'trade', 'comparative-advantage', 'real-world']
),

-- ═══════════════════════════════════════════════════
-- Puzzle 4: Two firms — TechCo & DesignCo (Apps & Websites)
-- Business context, equal in one good
-- ═══════════════════════════════════════════════════
(
    'comparative-advantage',
    'TechCo vs DesignCo: Digital Services',
    'Which Firm Should Specialise?',
    'Opportunity cost = what you sacrifice. To find it, divide the production of the OTHER good by the production of THIS good.',
    '{
        "parties": [
            { "name": "TechCo", "emoji": "💻", "production": { "Apps": 12, "Websites": 24 } },
            { "name": "DesignCo", "emoji": "🎨", "production": { "Apps": 8, "Websites": 24 } }
        ],
        "goods": ["Apps", "Websites"],
        "steps": [
            {
                "instruction": "Both firms can produce 24 Websites. How many Apps can TechCo produce?",
                "good": "Apps",
                "questionType": "absolute",
                "partyIndex": 0,
                "correctAnswer": 12,
                "explanation": "TechCo makes 12 Apps vs DesignCo''s 8. TechCo has the absolute advantage in Apps. They tie on Websites (24 each)."
            },
            {
                "instruction": "For TechCo, what is the opportunity cost of 1 App? (How many Websites does it give up?)",
                "good": "Apps",
                "questionType": "opportunity-cost",
                "partyIndex": 0,
                "correctAnswer": 2.0,
                "tolerance": 0.1,
                "explanation": "TechCo gives up 24 Websites for 12 Apps → 24/12 = 2 Websites per App."
            },
            {
                "instruction": "For DesignCo, what is the opportunity cost of 1 App?",
                "good": "Apps",
                "questionType": "opportunity-cost",
                "partyIndex": 1,
                "correctAnswer": 3.0,
                "tolerance": 0.1,
                "explanation": "DesignCo gives up 24 Websites for 8 Apps → 24/8 = 3 Websites per App. TechCo''s cost is lower (2 < 3), so TechCo has the comparative advantage in Apps."
            },
            {
                "instruction": "For DesignCo, what is the opportunity cost of 1 Website?",
                "good": "Websites",
                "questionType": "opportunity-cost",
                "partyIndex": 1,
                "correctAnswer": 0.3,
                "tolerance": 0.04,
                "explanation": "DesignCo gives up 8 Apps for 24 Websites → 8/24 ≈ 0.33 Apps per Website. Compare to TechCo''s 12/24 = 0.5 Apps per Website. DesignCo has the comparative advantage in Websites!"
            }
        ]
    }',
    2,
    ARRAY['economics', 'trade', 'comparative-advantage', 'business']
),

-- ═══════════════════════════════════════════════════
-- Puzzle 5: England vs Portugal — classic Ricardian example (Wine & Cloth)
-- The famous David Ricardo example
-- ═══════════════════════════════════════════════════
(
    'comparative-advantage',
    'Ricardo''s Classic: England vs Portugal',
    'The Original Trade Argument',
    'David Ricardo showed that even if one country is better at everything, BOTH benefit from trade if they specialise in their comparative advantage.',
    '{
        "parties": [
            { "name": "England", "emoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "production": { "Wine (barrels)": 50, "Cloth (bolts)": 100 } },
            { "name": "Portugal", "emoji": "🇵🇹", "production": { "Wine (barrels)": 80, "Cloth (bolts)": 90 } }
        ],
        "goods": ["Wine (barrels)", "Cloth (bolts)"],
        "steps": [
            {
                "instruction": "Who produces more Wine? Slide to Portugal''s Wine production.",
                "good": "Wine (barrels)",
                "questionType": "absolute",
                "partyIndex": 1,
                "correctAnswer": 80,
                "explanation": "Portugal produces 80 barrels of Wine vs England''s 50. Portugal has the absolute advantage in Wine."
            },
            {
                "instruction": "Who produces more Cloth? Slide to England''s Cloth production.",
                "good": "Cloth (bolts)",
                "questionType": "absolute",
                "partyIndex": 0,
                "correctAnswer": 100,
                "explanation": "England produces 100 bolts of Cloth vs Portugal''s 90. England has the absolute advantage in Cloth."
            },
            {
                "instruction": "For England, what is the opportunity cost of 1 barrel of Wine?",
                "good": "Wine (barrels)",
                "questionType": "opportunity-cost",
                "partyIndex": 0,
                "correctAnswer": 2.0,
                "tolerance": 0.1,
                "explanation": "England gives up 100 Cloth for 50 Wine → 100/50 = 2 bolts of Cloth per barrel of Wine."
            },
            {
                "instruction": "For Portugal, what is the opportunity cost of 1 barrel of Wine?",
                "good": "Wine (barrels)",
                "questionType": "opportunity-cost",
                "partyIndex": 1,
                "correctAnswer": 1.1,
                "tolerance": 0.1,
                "explanation": "Portugal gives up 90 Cloth for 80 Wine → 90/80 = 1.125 bolts of Cloth per barrel of Wine. Portugal''s cost is lower → Portugal has the comparative advantage in Wine."
            },
            {
                "instruction": "For Portugal, what is the opportunity cost of 1 bolt of Cloth?",
                "good": "Cloth (bolts)",
                "questionType": "opportunity-cost",
                "partyIndex": 1,
                "correctAnswer": 0.9,
                "tolerance": 0.05,
                "explanation": "Portugal gives up 80 Wine for 90 Cloth → 80/90 ≈ 0.89 barrels of Wine per bolt of Cloth."
            },
            {
                "instruction": "For England, what is the opportunity cost of 1 bolt of Cloth?",
                "good": "Cloth (bolts)",
                "questionType": "opportunity-cost",
                "partyIndex": 0,
                "correctAnswer": 0.5,
                "tolerance": 0.05,
                "explanation": "England gives up 50 Wine for 100 Cloth → 50/100 = 0.5 barrels of Wine per bolt of Cloth. England''s cost is lower → England has the comparative advantage in Cloth! Both countries benefit by trading."
            }
        ]
    }',
    3,
    ARRAY['economics', 'trade', 'comparative-advantage', 'ricardo', 'history']
);
