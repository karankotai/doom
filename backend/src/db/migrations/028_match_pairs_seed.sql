-- Migration: 028_match_pairs_seed
-- Description: Seed match pairs applets across diverse subjects

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
-- 1) Spanish verb conjugation: hablar (present tense)
(
    'match-pairs',
    'Spanish: Hablar (Present)',
    'Match each person with the correct present tense conjugation of "hablar" (to speak).',
    'Remember: yo -o, tú -as, él/ella -a, nosotros -amos, ellos -an.',
    '{
        "leftItems": [
            {"id": "yo", "text": "Yo"},
            {"id": "tu", "text": "Tú"},
            {"id": "el", "text": "Él / Ella"},
            {"id": "nos", "text": "Nosotros"},
            {"id": "ellos", "text": "Ellos / Ellas"}
        ],
        "rightItems": [
            {"id": "hablo", "text": "hablo"},
            {"id": "hablas", "text": "hablas"},
            {"id": "habla", "text": "habla"},
            {"id": "hablamos", "text": "hablamos"},
            {"id": "hablan", "text": "hablan"}
        ],
        "correctPairs": {
            "yo": "hablo",
            "tu": "hablas",
            "el": "habla",
            "nos": "hablamos",
            "ellos": "hablan"
        },
        "leftColumnLabel": "Person",
        "rightColumnLabel": "Conjugation"
    }',
    1,
    ARRAY['spanish', 'language', 'conjugation', 'present-tense']
),
-- 2) French verb conjugation: être (to be)
(
    'match-pairs',
    'French: Être (Present)',
    'Match each subject pronoun with the correct form of "être" (to be).',
    'Être is irregular: je suis, tu es, il est, nous sommes, vous êtes, ils sont.',
    '{
        "leftItems": [
            {"id": "je", "text": "Je"},
            {"id": "tu", "text": "Tu"},
            {"id": "il", "text": "Il / Elle"},
            {"id": "nous", "text": "Nous"},
            {"id": "vous", "text": "Vous"},
            {"id": "ils", "text": "Ils / Elles"}
        ],
        "rightItems": [
            {"id": "suis", "text": "suis"},
            {"id": "es", "text": "es"},
            {"id": "est", "text": "est"},
            {"id": "sommes", "text": "sommes"},
            {"id": "etes", "text": "êtes"},
            {"id": "sont", "text": "sont"}
        ],
        "correctPairs": {
            "je": "suis",
            "tu": "es",
            "il": "est",
            "nous": "sommes",
            "vous": "etes",
            "ils": "sont"
        },
        "leftColumnLabel": "Subject",
        "rightColumnLabel": "Verb Form"
    }',
    2,
    ARRAY['french', 'language', 'conjugation', 'irregular-verbs']
),
-- 3) Chemistry: Element symbols
(
    'match-pairs',
    'Element Symbols',
    'Match each element name to its chemical symbol.',
    'Some symbols come from Latin names — for example, Gold is Au from "Aurum".',
    '{
        "leftItems": [
            {"id": "gold", "text": "Gold", "emoji": "🥇"},
            {"id": "iron", "text": "Iron"},
            {"id": "sodium", "text": "Sodium"},
            {"id": "potassium", "text": "Potassium"},
            {"id": "silver", "text": "Silver"},
            {"id": "copper", "text": "Copper"}
        ],
        "rightItems": [
            {"id": "Au", "text": "Au"},
            {"id": "Fe", "text": "Fe"},
            {"id": "Na", "text": "Na"},
            {"id": "K", "text": "K"},
            {"id": "Ag", "text": "Ag"},
            {"id": "Cu", "text": "Cu"}
        ],
        "correctPairs": {
            "gold": "Au",
            "iron": "Fe",
            "sodium": "Na",
            "potassium": "K",
            "silver": "Ag",
            "copper": "Cu"
        },
        "leftColumnLabel": "Element",
        "rightColumnLabel": "Symbol"
    }',
    2,
    ARRAY['chemistry', 'elements', 'periodic-table']
),
-- 4) Biology: Organelles and functions
(
    'match-pairs',
    'Cell Organelles',
    'Match each organelle to its primary function.',
    'Think about what each organelle does — the mitochondria is the powerhouse of the cell!',
    '{
        "leftItems": [
            {"id": "mito", "text": "Mitochondria"},
            {"id": "ribo", "text": "Ribosome"},
            {"id": "nucleus", "text": "Nucleus"},
            {"id": "golgi", "text": "Golgi Apparatus"},
            {"id": "er", "text": "Endoplasmic Reticulum"}
        ],
        "rightItems": [
            {"id": "energy", "text": "Produces energy (ATP)"},
            {"id": "protein", "text": "Synthesizes proteins"},
            {"id": "dna", "text": "Stores DNA"},
            {"id": "package", "text": "Packages & ships proteins"},
            {"id": "transport", "text": "Transports materials"}
        ],
        "correctPairs": {
            "mito": "energy",
            "ribo": "protein",
            "nucleus": "dna",
            "golgi": "package",
            "er": "transport"
        },
        "leftColumnLabel": "Organelle",
        "rightColumnLabel": "Function"
    }',
    2,
    ARRAY['biology', 'cells', 'organelles']
),
-- 5) History: Inventions and inventors
(
    'match-pairs',
    'Inventions & Inventors',
    'Match each invention to its inventor.',
    'Think about which historical figure is most associated with each breakthrough.',
    '{
        "leftItems": [
            {"id": "bulb", "text": "Light Bulb", "emoji": "💡"},
            {"id": "telephone", "text": "Telephone", "emoji": "📞"},
            {"id": "gravity", "text": "Laws of Gravity", "emoji": "🍎"},
            {"id": "radium", "text": "Radium", "emoji": "☢️"},
            {"id": "relativity", "text": "Theory of Relativity", "emoji": "⚡"}
        ],
        "rightItems": [
            {"id": "edison", "text": "Thomas Edison"},
            {"id": "bell", "text": "Alexander Graham Bell"},
            {"id": "newton", "text": "Isaac Newton"},
            {"id": "curie", "text": "Marie Curie"},
            {"id": "einstein", "text": "Albert Einstein"}
        ],
        "correctPairs": {
            "bulb": "edison",
            "telephone": "bell",
            "gravity": "newton",
            "radium": "curie",
            "relativity": "einstein"
        },
        "leftColumnLabel": "Discovery",
        "rightColumnLabel": "Scientist"
    }',
    1,
    ARRAY['history', 'science', 'inventions']
),
-- 6) Geography: Countries and capitals
(
    'match-pairs',
    'Countries & Capitals',
    'Match each country with its capital city.',
    'Think about famous cities — some capitals are not the largest city in the country!',
    '{
        "leftItems": [
            {"id": "japan", "text": "Japan", "emoji": "🇯🇵"},
            {"id": "brazil", "text": "Brazil", "emoji": "🇧🇷"},
            {"id": "australia", "text": "Australia", "emoji": "🇦🇺"},
            {"id": "canada", "text": "Canada", "emoji": "🇨🇦"},
            {"id": "egypt", "text": "Egypt", "emoji": "🇪🇬"},
            {"id": "india", "text": "India", "emoji": "🇮🇳"}
        ],
        "rightItems": [
            {"id": "tokyo", "text": "Tokyo"},
            {"id": "brasilia", "text": "Brasília"},
            {"id": "canberra", "text": "Canberra"},
            {"id": "ottawa", "text": "Ottawa"},
            {"id": "cairo", "text": "Cairo"},
            {"id": "newdelhi", "text": "New Delhi"}
        ],
        "correctPairs": {
            "japan": "tokyo",
            "brazil": "brasilia",
            "australia": "canberra",
            "canada": "ottawa",
            "egypt": "cairo",
            "india": "newdelhi"
        },
        "leftColumnLabel": "Country",
        "rightColumnLabel": "Capital"
    }',
    1,
    ARRAY['geography', 'capitals', 'countries']
),
-- 7) Music: Instruments and families
(
    'match-pairs',
    'Instrument Families',
    'Match each instrument to its family.',
    'Brass instruments are made of metal and played by buzzing lips. Woodwinds use a reed or air stream. Strings are bowed or plucked.',
    '{
        "leftItems": [
            {"id": "trumpet", "text": "Trumpet", "emoji": "🎺"},
            {"id": "violin", "text": "Violin", "emoji": "🎻"},
            {"id": "flute", "text": "Flute"},
            {"id": "drums", "text": "Timpani", "emoji": "🥁"},
            {"id": "clarinet", "text": "Clarinet"},
            {"id": "cello", "text": "Cello"}
        ],
        "rightItems": [
            {"id": "brass1", "text": "Brass"},
            {"id": "strings1", "text": "Strings"},
            {"id": "woodwind1", "text": "Woodwind"},
            {"id": "percussion1", "text": "Percussion"},
            {"id": "woodwind2", "text": "Woodwind"},
            {"id": "strings2", "text": "Strings"}
        ],
        "correctPairs": {
            "trumpet": "brass1",
            "violin": "strings1",
            "flute": "woodwind1",
            "drums": "percussion1",
            "clarinet": "woodwind2",
            "cello": "strings2"
        },
        "leftColumnLabel": "Instrument",
        "rightColumnLabel": "Family"
    }',
    1,
    ARRAY['music', 'instruments', 'arts']
),
-- 8) CS: Data structures and descriptions
(
    'match-pairs',
    'Data Structures',
    'Match each data structure to its defining characteristic.',
    'Think about how each structure organizes and accesses data differently.',
    '{
        "leftItems": [
            {"id": "array", "text": "Array"},
            {"id": "stack", "text": "Stack"},
            {"id": "queue", "text": "Queue"},
            {"id": "hashmap", "text": "Hash Map"},
            {"id": "tree", "text": "Binary Tree"}
        ],
        "rightItems": [
            {"id": "indexed", "text": "Indexed, fixed-size collection"},
            {"id": "lifo", "text": "Last In, First Out (LIFO)"},
            {"id": "fifo", "text": "First In, First Out (FIFO)"},
            {"id": "keyval", "text": "Key-value pairs, O(1) lookup"},
            {"id": "hierarchy", "text": "Hierarchical, max 2 children"}
        ],
        "correctPairs": {
            "array": "indexed",
            "stack": "lifo",
            "queue": "fifo",
            "hashmap": "keyval",
            "tree": "hierarchy"
        },
        "leftColumnLabel": "Structure",
        "rightColumnLabel": "Characteristic"
    }',
    2,
    ARRAY['computer-science', 'data-structures', 'programming']
),
-- 9) Math: Shapes and formulas (area)
(
    'match-pairs',
    'Area Formulas',
    'Match each shape to its area formula.',
    'Remember: circles use pi, triangles use half base times height.',
    '{
        "leftItems": [
            {"id": "circle", "text": "Circle", "emoji": "⭕"},
            {"id": "rectangle", "text": "Rectangle", "emoji": "⬜"},
            {"id": "triangle", "text": "Triangle", "emoji": "🔺"},
            {"id": "trapezoid", "text": "Trapezoid"},
            {"id": "parallelogram", "text": "Parallelogram"}
        ],
        "rightItems": [
            {"id": "pi_r2", "text": "A = πr²"},
            {"id": "lw", "text": "A = l × w"},
            {"id": "half_bh", "text": "A = ½ × b × h"},
            {"id": "half_ab_h", "text": "A = ½(a + b) × h"},
            {"id": "bh", "text": "A = b × h"}
        ],
        "correctPairs": {
            "circle": "pi_r2",
            "rectangle": "lw",
            "triangle": "half_bh",
            "trapezoid": "half_ab_h",
            "parallelogram": "bh"
        },
        "leftColumnLabel": "Shape",
        "rightColumnLabel": "Area Formula"
    }',
    2,
    ARRAY['math', 'geometry', 'formulas', 'area']
),
-- 10) Physics: SI units
(
    'match-pairs',
    'SI Units',
    'Match each physical quantity to its SI unit.',
    'Think about what unit you would measure each quantity in.',
    '{
        "leftItems": [
            {"id": "force", "text": "Force"},
            {"id": "energy", "text": "Energy"},
            {"id": "pressure", "text": "Pressure"},
            {"id": "frequency", "text": "Frequency"},
            {"id": "electric_charge", "text": "Electric Charge"},
            {"id": "power", "text": "Power"}
        ],
        "rightItems": [
            {"id": "newton", "text": "Newton (N)"},
            {"id": "joule", "text": "Joule (J)"},
            {"id": "pascal", "text": "Pascal (Pa)"},
            {"id": "hertz", "text": "Hertz (Hz)"},
            {"id": "coulomb", "text": "Coulomb (C)"},
            {"id": "watt", "text": "Watt (W)"}
        ],
        "correctPairs": {
            "force": "newton",
            "energy": "joule",
            "pressure": "pascal",
            "frequency": "hertz",
            "electric_charge": "coulomb",
            "power": "watt"
        },
        "leftColumnLabel": "Quantity",
        "rightColumnLabel": "SI Unit"
    }',
    2,
    ARRAY['physics', 'units', 'measurement']
),
-- 11) Spanish: Ser (preterite tense)
(
    'match-pairs',
    'Spanish: Ser (Preterite)',
    'Match each subject with the correct preterite tense form of "ser" (to be).',
    'Ser is irregular in the preterite: fui, fuiste, fue, fuimos, fueron.',
    '{
        "leftItems": [
            {"id": "yo", "text": "Yo"},
            {"id": "tu", "text": "Tú"},
            {"id": "el", "text": "Él / Ella"},
            {"id": "nos", "text": "Nosotros"},
            {"id": "ellos", "text": "Ellos / Ellas"}
        ],
        "rightItems": [
            {"id": "fui", "text": "fui"},
            {"id": "fuiste", "text": "fuiste"},
            {"id": "fue", "text": "fue"},
            {"id": "fuimos", "text": "fuimos"},
            {"id": "fueron", "text": "fueron"}
        ],
        "correctPairs": {
            "yo": "fui",
            "tu": "fuiste",
            "el": "fue",
            "nos": "fuimos",
            "ellos": "fueron"
        },
        "leftColumnLabel": "Person",
        "rightColumnLabel": "Conjugation"
    }',
    3,
    ARRAY['spanish', 'language', 'conjugation', 'preterite']
),
-- 12) Economics: Terminology
(
    'match-pairs',
    'Economics Terms',
    'Match each economic concept to its definition.',
    'Think about the basic principles of supply, demand, and market behavior.',
    '{
        "leftItems": [
            {"id": "gdp", "text": "GDP"},
            {"id": "inflation", "text": "Inflation"},
            {"id": "elasticity", "text": "Elasticity"},
            {"id": "opportunity", "text": "Opportunity Cost"},
            {"id": "subsidy", "text": "Subsidy"}
        ],
        "rightItems": [
            {"id": "total_output", "text": "Total value of goods produced"},
            {"id": "price_rise", "text": "General rise in price levels"},
            {"id": "responsiveness", "text": "Responsiveness of demand to price"},
            {"id": "next_best", "text": "Value of the next best alternative"},
            {"id": "gov_payment", "text": "Government payment to producers"}
        ],
        "correctPairs": {
            "gdp": "total_output",
            "inflation": "price_rise",
            "elasticity": "responsiveness",
            "opportunity": "next_best",
            "subsidy": "gov_payment"
        },
        "leftColumnLabel": "Concept",
        "rightColumnLabel": "Definition"
    }',
    2,
    ARRAY['economics', 'terminology', 'definitions']
);
