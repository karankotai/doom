-- Migration: 017_color_mixing_seed
-- Description: Seed color mixing applet data with diverse color theory puzzles

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
    'color-mixing',
    'RGB Primary Mix: Yellow',
    'Mix the right colors of light to create yellow.',
    'In additive mixing, yellow is made by combining the two warm primary colors of light.',
    '{
        "targetHex": "#FFFF00",
        "targetLabel": "Yellow",
        "colorBlocks": [
            {"id": "red", "label": "Red", "hex": "#FF0000"},
            {"id": "green", "label": "Green", "hex": "#00FF00"},
            {"id": "blue", "label": "Blue", "hex": "#0000FF"}
        ],
        "correctBlockIds": ["red", "green"],
        "mode": "additive"
    }',
    1,
    ARRAY['color-theory', 'additive', 'primary-colors']
),
(
    'color-mixing',
    'RGB Primary Mix: Cyan',
    'Mix the right colors of light to create cyan.',
    'Cyan is made by combining the two cool primary colors of light.',
    '{
        "targetHex": "#00FFFF",
        "targetLabel": "Cyan",
        "colorBlocks": [
            {"id": "red", "label": "Red", "hex": "#FF0000"},
            {"id": "green", "label": "Green", "hex": "#00FF00"},
            {"id": "blue", "label": "Blue", "hex": "#0000FF"}
        ],
        "correctBlockIds": ["green", "blue"],
        "mode": "additive"
    }',
    1,
    ARRAY['color-theory', 'additive', 'primary-colors']
),
(
    'color-mixing',
    'RGB Primary Mix: Magenta',
    'Mix the right colors of light to create magenta.',
    'Magenta is created by mixing the warmest and coolest primary lights.',
    '{
        "targetHex": "#FF00FF",
        "targetLabel": "Magenta",
        "colorBlocks": [
            {"id": "red", "label": "Red", "hex": "#FF0000"},
            {"id": "green", "label": "Green", "hex": "#00FF00"},
            {"id": "blue", "label": "Blue", "hex": "#0000FF"}
        ],
        "correctBlockIds": ["red", "blue"],
        "mode": "additive"
    }',
    1,
    ARRAY['color-theory', 'additive', 'primary-colors']
),
(
    'color-mixing',
    'RGB Light Mix: White',
    'Mix colors of light to create white light.',
    'White light contains all colors of the visible spectrum.',
    '{
        "targetHex": "#FFFFFF",
        "targetLabel": "White",
        "colorBlocks": [
            {"id": "red", "label": "Red", "hex": "#FF0000"},
            {"id": "green", "label": "Green", "hex": "#00FF00"},
            {"id": "blue", "label": "Blue", "hex": "#0000FF"},
            {"id": "yellow", "label": "Yellow", "hex": "#FFFF00"}
        ],
        "correctBlockIds": ["red", "green", "blue"],
        "mode": "additive"
    }',
    2,
    ARRAY['color-theory', 'additive', 'white-light']
),
(
    'color-mixing',
    'Paint Mixing: Green',
    'Mix the right paint colors to create green.',
    'In subtractive mixing, think about which two primary pigments combine to make green.',
    '{
        "targetHex": "#00FFFF",
        "targetLabel": "Green (paint)",
        "colorBlocks": [
            {"id": "cyan", "label": "Cyan", "hex": "#00FFFF"},
            {"id": "magenta", "label": "Magenta", "hex": "#FF00FF"},
            {"id": "yellow", "label": "Yellow", "hex": "#FFFF00"}
        ],
        "correctBlockIds": ["cyan", "yellow"],
        "mode": "subtractive"
    }',
    2,
    ARRAY['color-theory', 'subtractive', 'paint-mixing']
),
(
    'color-mixing',
    'Paint Mixing: Red',
    'Mix the right paint colors to create red.',
    'In subtractive (paint) mixing, red is made from the two warm CMY primaries.',
    '{
        "targetHex": "#FF00FF",
        "targetLabel": "Red (paint)",
        "colorBlocks": [
            {"id": "cyan", "label": "Cyan", "hex": "#00FFFF"},
            {"id": "magenta", "label": "Magenta", "hex": "#FF00FF"},
            {"id": "yellow", "label": "Yellow", "hex": "#FFFF00"}
        ],
        "correctBlockIds": ["magenta", "yellow"],
        "mode": "subtractive"
    }',
    2,
    ARRAY['color-theory', 'subtractive', 'paint-mixing']
),
(
    'color-mixing',
    'Paint Mixing: Dark Blue',
    'Mix the right paint colors to create dark blue.',
    'In subtractive mixing, blue is made from the two cool CMY primaries.',
    '{
        "targetHex": "#0000FF",
        "targetLabel": "Blue (paint)",
        "colorBlocks": [
            {"id": "cyan", "label": "Cyan", "hex": "#00FFFF"},
            {"id": "magenta", "label": "Magenta", "hex": "#FF00FF"},
            {"id": "yellow", "label": "Yellow", "hex": "#FFFF00"}
        ],
        "correctBlockIds": ["cyan", "magenta"],
        "mode": "subtractive"
    }',
    2,
    ARRAY['color-theory', 'subtractive', 'paint-mixing']
);
