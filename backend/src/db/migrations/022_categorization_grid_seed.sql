-- Migration: 022_categorization_grid_seed
-- Description: Seed categorization grid applet data across multiple subjects

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
    'categorization-grid',
    'Similes vs Metaphors',
    'Sort these phrases into similes and metaphors.',
    'Similes use "like" or "as" to compare. Metaphors state that something IS something else.',
    '{
        "categories": [
            {"id": "simile", "label": "Simile", "emoji": "🔗"},
            {"id": "metaphor", "label": "Metaphor", "emoji": "🎭"}
        ],
        "items": [
            {"id": "s1", "text": "Her smile was like sunshine"},
            {"id": "s2", "text": "He ran as fast as a cheetah"},
            {"id": "s3", "text": "The classroom was as quiet as a library"},
            {"id": "m1", "text": "Time is money"},
            {"id": "m2", "text": "The world is a stage"},
            {"id": "m3", "text": "He has a heart of stone"},
            {"id": "s4", "text": "She sings like an angel"},
            {"id": "m4", "text": "Life is a rollercoaster"}
        ],
        "correctMapping": {
            "s1": "simile",
            "s2": "simile",
            "s3": "simile",
            "s4": "simile",
            "m1": "metaphor",
            "m2": "metaphor",
            "m3": "metaphor",
            "m4": "metaphor"
        },
        "layout": "columns"
    }',
    1,
    ARRAY['english', 'figurative-language', 'literature']
),
(
    'categorization-grid',
    'Economics Goods Matrix',
    'Classify these goods into the correct quadrant of the goods matrix.',
    'Excludable means people can be prevented from using it. Rival means one person''s use reduces availability for others.',
    '{
        "categories": [
            {"id": "private", "label": "Private Good", "emoji": "🔒"},
            {"id": "club", "label": "Club Good", "emoji": "🎫"},
            {"id": "common", "label": "Common Resource", "emoji": "🌊"},
            {"id": "public", "label": "Public Good", "emoji": "🌍"}
        ],
        "items": [
            {"id": "i1", "text": "A sandwich", "emoji": "🥪"},
            {"id": "i2", "text": "Netflix subscription", "emoji": "📺"},
            {"id": "i3", "text": "Fish in the ocean", "emoji": "🐟"},
            {"id": "i4", "text": "National defense", "emoji": "🛡️"},
            {"id": "i5", "text": "A pair of jeans", "emoji": "👖"},
            {"id": "i6", "text": "A gym membership", "emoji": "🏋️"},
            {"id": "i7", "text": "Clean air", "emoji": "💨"},
            {"id": "i8", "text": "Groundwater", "emoji": "💧"}
        ],
        "correctMapping": {
            "i1": "private",
            "i2": "club",
            "i3": "common",
            "i4": "public",
            "i5": "private",
            "i6": "club",
            "i7": "public",
            "i8": "common"
        },
        "layout": "matrix",
        "matrixAxes": {
            "rowLabel": "Rival",
            "colLabel": "Excludable"
        }
    }',
    3,
    ARRAY['economics', 'goods-matrix', 'microeconomics']
),
(
    'categorization-grid',
    'Renewable vs Non-Renewable Energy',
    'Sort these energy sources into renewable and non-renewable categories.',
    'Renewable energy comes from sources that naturally replenish. Non-renewable sources are finite.',
    '{
        "categories": [
            {"id": "renewable", "label": "Renewable", "emoji": "♻️"},
            {"id": "non-renewable", "label": "Non-Renewable", "emoji": "⛏️"}
        ],
        "items": [
            {"id": "e1", "text": "Solar power", "emoji": "☀️"},
            {"id": "e2", "text": "Coal", "emoji": "⬛"},
            {"id": "e3", "text": "Wind energy", "emoji": "💨"},
            {"id": "e4", "text": "Natural gas", "emoji": "🔥"},
            {"id": "e5", "text": "Hydroelectric", "emoji": "🌊"},
            {"id": "e6", "text": "Nuclear fission", "emoji": "⚛️"},
            {"id": "e7", "text": "Geothermal", "emoji": "🌋"},
            {"id": "e8", "text": "Petroleum (oil)", "emoji": "🛢️"}
        ],
        "correctMapping": {
            "e1": "renewable",
            "e2": "non-renewable",
            "e3": "renewable",
            "e4": "non-renewable",
            "e5": "renewable",
            "e6": "non-renewable",
            "e7": "renewable",
            "e8": "non-renewable"
        },
        "layout": "columns"
    }',
    1,
    ARRAY['science', 'energy', 'environment']
),
(
    'categorization-grid',
    'Acids vs Bases',
    'Classify these common substances as acids or bases.',
    'Acids taste sour and have pH < 7. Bases taste bitter, feel slippery, and have pH > 7.',
    '{
        "categories": [
            {"id": "acid", "label": "Acid (pH < 7)", "emoji": "🍋"},
            {"id": "base", "label": "Base (pH > 7)", "emoji": "🧼"}
        ],
        "items": [
            {"id": "c1", "text": "Lemon juice", "emoji": "🍋"},
            {"id": "c2", "text": "Baking soda", "emoji": "🧁"},
            {"id": "c3", "text": "Vinegar"},
            {"id": "c4", "text": "Soap", "emoji": "🧴"},
            {"id": "c5", "text": "Stomach acid"},
            {"id": "c6", "text": "Bleach"},
            {"id": "c7", "text": "Orange juice", "emoji": "🍊"},
            {"id": "c8", "text": "Ammonia"}
        ],
        "correctMapping": {
            "c1": "acid",
            "c2": "base",
            "c3": "acid",
            "c4": "base",
            "c5": "acid",
            "c6": "base",
            "c7": "acid",
            "c8": "base"
        },
        "layout": "columns"
    }',
    2,
    ARRAY['chemistry', 'acids-bases', 'ph']
),
(
    'categorization-grid',
    'Prokaryotes vs Eukaryotes',
    'Classify these organisms as prokaryotes or eukaryotes.',
    'Prokaryotes lack a nucleus and membrane-bound organelles. Eukaryotes have both.',
    '{
        "categories": [
            {"id": "prok", "label": "Prokaryote", "emoji": "🦠"},
            {"id": "euk", "label": "Eukaryote", "emoji": "🧬"}
        ],
        "items": [
            {"id": "b1", "text": "E. coli bacteria"},
            {"id": "b2", "text": "Human cell"},
            {"id": "b3", "text": "Yeast"},
            {"id": "b4", "text": "Streptococcus"},
            {"id": "b5", "text": "Amoeba"},
            {"id": "b6", "text": "Cyanobacteria"},
            {"id": "b7", "text": "Mushroom", "emoji": "🍄"},
            {"id": "b8", "text": "Archaea"}
        ],
        "correctMapping": {
            "b1": "prok",
            "b2": "euk",
            "b3": "euk",
            "b4": "prok",
            "b5": "euk",
            "b6": "prok",
            "b7": "euk",
            "b8": "prok"
        },
        "layout": "columns"
    }',
    2,
    ARRAY['biology', 'cells', 'organisms']
),
(
    'categorization-grid',
    'Market Structures',
    'Classify these real-world examples into their market structure.',
    'Perfect competition has many sellers with identical products. Monopoly has one seller. Oligopoly has a few dominant firms. Monopolistic competition has many sellers with differentiated products.',
    '{
        "categories": [
            {"id": "perfect", "label": "Perfect Competition", "emoji": "🌾"},
            {"id": "monopolistic", "label": "Monopolistic Competition", "emoji": "🍽️"},
            {"id": "oligopoly", "label": "Oligopoly", "emoji": "🏭"},
            {"id": "monopoly", "label": "Monopoly", "emoji": "👑"}
        ],
        "items": [
            {"id": "m1", "text": "Wheat farming", "emoji": "🌾"},
            {"id": "m2", "text": "Local restaurants", "emoji": "🍽️"},
            {"id": "m3", "text": "Smartphone OS (iOS/Android)", "emoji": "📱"},
            {"id": "m4", "text": "Local water utility", "emoji": "🚰"},
            {"id": "m5", "text": "Stock market shares", "emoji": "📈"},
            {"id": "m6", "text": "Clothing brands", "emoji": "👗"},
            {"id": "m7", "text": "Airlines", "emoji": "✈️"},
            {"id": "m8", "text": "Regional electric company", "emoji": "⚡"}
        ],
        "correctMapping": {
            "m1": "perfect",
            "m2": "monopolistic",
            "m3": "oligopoly",
            "m4": "monopoly",
            "m5": "perfect",
            "m6": "monopolistic",
            "m7": "oligopoly",
            "m8": "monopoly"
        },
        "layout": "matrix",
        "matrixAxes": {
            "rowLabel": "Number of Sellers",
            "colLabel": "Product Differentiation"
        }
    }',
    3,
    ARRAY['economics', 'market-structures', 'microeconomics']
),
(
    'categorization-grid',
    'Literary Devices',
    'Sort these examples into the correct literary device category.',
    'Alliteration repeats initial consonant sounds. Personification gives human traits to non-human things. Hyperbole uses extreme exaggeration.',
    '{
        "categories": [
            {"id": "allit", "label": "Alliteration", "emoji": "🔤"},
            {"id": "person", "label": "Personification", "emoji": "🌸"},
            {"id": "hyper", "label": "Hyperbole", "emoji": "📢"}
        ],
        "items": [
            {"id": "l1", "text": "Peter Piper picked a peck"},
            {"id": "l2", "text": "The wind whispered through the trees"},
            {"id": "l3", "text": "I''ve told you a million times"},
            {"id": "l4", "text": "She sells seashells by the seashore"},
            {"id": "l5", "text": "The sun smiled down on us"},
            {"id": "l6", "text": "I''m so hungry I could eat a horse"},
            {"id": "l7", "text": "Big brown bears bounced boldly"},
            {"id": "l8", "text": "The flowers danced in the breeze"},
            {"id": "l9", "text": "This bag weighs a ton"}
        ],
        "correctMapping": {
            "l1": "allit",
            "l2": "person",
            "l3": "hyper",
            "l4": "allit",
            "l5": "person",
            "l6": "hyper",
            "l7": "allit",
            "l8": "person",
            "l9": "hyper"
        },
        "layout": "columns"
    }',
    2,
    ARRAY['english', 'literary-devices', 'literature']
),
(
    'categorization-grid',
    'Layers of the Earth',
    'Sort these characteristics into the correct layer of the Earth.',
    'The crust is the thinnest outer layer. The mantle is the thickest layer. The core is the innermost, densest layer.',
    '{
        "categories": [
            {"id": "crust", "label": "Crust", "emoji": "🏔️"},
            {"id": "mantle", "label": "Mantle", "emoji": "🌋"},
            {"id": "core", "label": "Core", "emoji": "🔴"}
        ],
        "items": [
            {"id": "g1", "text": "Thinnest layer (5-70 km)"},
            {"id": "g2", "text": "Contains convection currents"},
            {"id": "g3", "text": "Made mostly of iron and nickel"},
            {"id": "g4", "text": "Where tectonic plates exist"},
            {"id": "g5", "text": "Thickest layer (~2,900 km)"},
            {"id": "g6", "text": "Temperatures over 5,000°C"},
            {"id": "g7", "text": "Made of silicate rocks"},
            {"id": "g8", "text": "Divided into inner and outer parts"},
            {"id": "g9", "text": "Continental and oceanic types"}
        ],
        "correctMapping": {
            "g1": "crust",
            "g2": "mantle",
            "g3": "core",
            "g4": "crust",
            "g5": "mantle",
            "g6": "core",
            "g7": "mantle",
            "g8": "core",
            "g9": "crust"
        },
        "layout": "columns"
    }',
    2,
    ARRAY['geology', 'earth-science', 'layers']
),
(
    'categorization-grid',
    'Parts of Speech',
    'Sort these words into the correct part of speech.',
    'Nouns name things. Verbs show action or state. Adjectives describe nouns. Adverbs modify verbs, adjectives, or other adverbs.',
    '{
        "categories": [
            {"id": "noun", "label": "Noun", "emoji": "📦"},
            {"id": "verb", "label": "Verb", "emoji": "🏃"},
            {"id": "adj", "label": "Adjective", "emoji": "✨"},
            {"id": "adv", "label": "Adverb", "emoji": "⚡"}
        ],
        "items": [
            {"id": "w1", "text": "beautiful"},
            {"id": "w2", "text": "running"},
            {"id": "w3", "text": "happiness"},
            {"id": "w4", "text": "quickly"},
            {"id": "w5", "text": "enormous"},
            {"id": "w6", "text": "whispered"},
            {"id": "w7", "text": "freedom"},
            {"id": "w8", "text": "silently"}
        ],
        "correctMapping": {
            "w1": "adj",
            "w2": "verb",
            "w3": "noun",
            "w4": "adv",
            "w5": "adj",
            "w6": "verb",
            "w7": "noun",
            "w8": "adv"
        },
        "layout": "matrix",
        "matrixAxes": {
            "rowLabel": "Function",
            "colLabel": "Type"
        }
    }',
    1,
    ARRAY['english', 'grammar', 'parts-of-speech']
);
