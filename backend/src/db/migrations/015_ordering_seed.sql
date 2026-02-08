-- Migration: 015_ordering_seed
-- Description: Seed ordering applet data with diverse hierarchical ordering puzzles

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
    'ordering',
    'Biological Taxonomy',
    'Arrange the levels of biological classification from broadest to most specific.',
    'Remember: King Philip Came Over For Good Spaghetti.',
    '{
        "items": [
            {"id": "species", "label": "Species", "emoji": "🐕", "subtitle": "e.g. Canis lupus familiaris"},
            {"id": "kingdom", "label": "Kingdom", "emoji": "👑", "subtitle": "e.g. Animalia"},
            {"id": "family", "label": "Family", "emoji": "👪", "subtitle": "e.g. Canidae"},
            {"id": "order", "label": "Order", "emoji": "📋", "subtitle": "e.g. Carnivora"},
            {"id": "genus", "label": "Genus", "emoji": "🔬", "subtitle": "e.g. Canis"},
            {"id": "class", "label": "Class", "emoji": "🎓", "subtitle": "e.g. Mammalia"},
            {"id": "phylum", "label": "Phylum", "emoji": "🧬", "subtitle": "e.g. Chordata"}
        ],
        "correctOrder": ["kingdom", "phylum", "class", "order", "family", "genus", "species"],
        "direction": "top-down"
    }',
    2,
    ARRAY['biology', 'taxonomy', 'classification']
),
(
    'ordering',
    'Maslow''s Hierarchy of Needs',
    'Arrange Maslow''s hierarchy of needs from the most basic (bottom) to the highest level (top).',
    'Basic survival needs come first, then safety, belonging, esteem, and finally self-fulfillment.',
    '{
        "items": [
            {"id": "self-actual", "label": "Self-Actualization", "emoji": "🌟", "subtitle": "Achieving full potential"},
            {"id": "esteem", "label": "Esteem", "emoji": "🏆", "subtitle": "Respect, recognition, confidence"},
            {"id": "belonging", "label": "Love & Belonging", "emoji": "❤️", "subtitle": "Friendship, family, connection"},
            {"id": "safety", "label": "Safety", "emoji": "🛡️", "subtitle": "Security, health, stability"},
            {"id": "physiological", "label": "Physiological", "emoji": "🍞", "subtitle": "Food, water, shelter, sleep"}
        ],
        "correctOrder": ["physiological", "safety", "belonging", "esteem", "self-actual"],
        "direction": "bottom-up"
    }',
    1,
    ARRAY['psychology', 'maslow', 'hierarchy']
),
(
    'ordering',
    'Solar System Planets by Distance',
    'Arrange the planets in order of distance from the Sun, closest to farthest.',
    'My Very Educated Mother Just Served Us Nachos.',
    '{
        "items": [
            {"id": "mars", "label": "Mars", "emoji": "🔴", "subtitle": "The Red Planet"},
            {"id": "jupiter", "label": "Jupiter", "emoji": "🟤", "subtitle": "The Gas Giant"},
            {"id": "mercury", "label": "Mercury", "emoji": "⚫", "subtitle": "Closest to the Sun"},
            {"id": "saturn", "label": "Saturn", "emoji": "🪐", "subtitle": "The Ringed Planet"},
            {"id": "venus", "label": "Venus", "emoji": "🟡", "subtitle": "Earth''s twin"},
            {"id": "neptune", "label": "Neptune", "emoji": "🔵", "subtitle": "The Ice Giant"},
            {"id": "earth", "label": "Earth", "emoji": "🌍", "subtitle": "Our home planet"},
            {"id": "uranus", "label": "Uranus", "emoji": "🫧", "subtitle": "The tilted planet"}
        ],
        "correctOrder": ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"],
        "direction": "top-down"
    }',
    1,
    ARRAY['astronomy', 'solar-system', 'planets']
),
(
    'ordering',
    'French Revolution Timeline',
    'Arrange these events of the French Revolution in chronological order, earliest to latest.',
    'The revolution began in 1789 and Napoleon rose to power by the end of the century.',
    '{
        "items": [
            {"id": "napoleon", "label": "Napoleon becomes First Consul", "emoji": "🎖️", "subtitle": "1799"},
            {"id": "bastille", "label": "Storming of the Bastille", "emoji": "🏰", "subtitle": "July 1789"},
            {"id": "terror", "label": "Reign of Terror begins", "emoji": "⚔️", "subtitle": "1793"},
            {"id": "estates", "label": "Estates-General convened", "emoji": "📜", "subtitle": "May 1789"},
            {"id": "execution", "label": "Execution of Louis XVI", "emoji": "👑", "subtitle": "January 1793"},
            {"id": "declaration", "label": "Declaration of the Rights of Man", "emoji": "📋", "subtitle": "August 1789"}
        ],
        "correctOrder": ["estates", "bastille", "declaration", "execution", "terror", "napoleon"],
        "direction": "top-down"
    }',
    3,
    ARRAY['history', 'french-revolution', 'chronology']
),
(
    'ordering',
    'OSI Network Model',
    'Arrange the OSI model layers from the lowest (physical) to the highest (application).',
    'Please Do Not Throw Sausage Pizza Away — from layer 1 to 7.',
    '{
        "items": [
            {"id": "application", "label": "Application Layer", "emoji": "💻", "subtitle": "Layer 7 — HTTP, FTP, DNS"},
            {"id": "transport", "label": "Transport Layer", "emoji": "📦", "subtitle": "Layer 4 — TCP, UDP"},
            {"id": "physical", "label": "Physical Layer", "emoji": "🔌", "subtitle": "Layer 1 — Cables, signals"},
            {"id": "network", "label": "Network Layer", "emoji": "🌐", "subtitle": "Layer 3 — IP, routing"},
            {"id": "session", "label": "Session Layer", "emoji": "🔗", "subtitle": "Layer 5 — Sessions, connections"},
            {"id": "datalink", "label": "Data Link Layer", "emoji": "🔀", "subtitle": "Layer 2 — MAC, switches"},
            {"id": "presentation", "label": "Presentation Layer", "emoji": "🎨", "subtitle": "Layer 6 — Encryption, formatting"}
        ],
        "correctOrder": ["physical", "datalink", "network", "transport", "session", "presentation", "application"],
        "direction": "bottom-up"
    }',
    2,
    ARRAY['computer-science', 'networking', 'osi-model']
);
