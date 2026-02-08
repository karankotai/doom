-- Migration: 018_color_mixing_advanced_seed
-- Description: Advanced color mixing puzzles requiring 3 colors, with distractors

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
    'color-mixing',
    'Light Mix: Warm White',
    'Mix three colors of light to produce warm white. Choose wisely — not all colors are needed!',
    'Warm white is made of all three RGB primaries, but biased toward the warmer end.',
    '{
        "targetHex": "#FFFFFF",
        "targetLabel": "White",
        "colorBlocks": [
            {"id": "red", "label": "Red", "hex": "#FF0000"},
            {"id": "green", "label": "Green", "hex": "#00FF00"},
            {"id": "blue", "label": "Blue", "hex": "#0000FF"},
            {"id": "cyan", "label": "Cyan", "hex": "#00FFFF"},
            {"id": "yellow", "label": "Yellow", "hex": "#FFFF00"}
        ],
        "correctBlockIds": ["red", "green", "blue"],
        "mode": "additive"
    }',
    3,
    ARRAY['color-theory', 'additive', 'three-color', 'advanced']
),
(
    'color-mixing',
    'Additive Secondary: White from Secondaries',
    'Can you create white light using only secondary colors of light? Pick the right combination from 5 options.',
    'Secondary colors of light are Cyan, Magenta, and Yellow. But does mixing them additively give white?',
    '{
        "targetHex": "#FFFFFF",
        "targetLabel": "White",
        "colorBlocks": [
            {"id": "cyan", "label": "Cyan", "hex": "#00FFFF"},
            {"id": "magenta", "label": "Magenta", "hex": "#FF00FF"},
            {"id": "yellow", "label": "Yellow", "hex": "#FFFF00"},
            {"id": "red", "label": "Red", "hex": "#FF0000"},
            {"id": "orange", "label": "Orange", "hex": "#FF8800"}
        ],
        "correctBlockIds": ["cyan", "magenta", "yellow"],
        "mode": "additive"
    }',
    3,
    ARRAY['color-theory', 'additive', 'three-color', 'secondary']
),
(
    'color-mixing',
    'Paint Mixing: Black',
    'Mix paint pigments to create the darkest possible color — black.',
    'In subtractive mixing, combining all three CMY primaries absorbs all light.',
    '{
        "targetHex": "#000000",
        "targetLabel": "Black",
        "colorBlocks": [
            {"id": "cyan", "label": "Cyan", "hex": "#00FFFF"},
            {"id": "magenta", "label": "Magenta", "hex": "#FF00FF"},
            {"id": "yellow", "label": "Yellow", "hex": "#FFFF00"},
            {"id": "red", "label": "Red", "hex": "#FF0000"},
            {"id": "green", "label": "Green", "hex": "#00FF00"}
        ],
        "correctBlockIds": ["cyan", "magenta", "yellow"],
        "mode": "subtractive"
    }',
    3,
    ARRAY['color-theory', 'subtractive', 'three-color', 'black']
),
(
    'color-mixing',
    'Subtractive: Dark Olive',
    'Mix paint colors to create a dark olive green. You''ll need three pigments.',
    'Start with yellow as a base, then add cyan for green, and magenta to darken and desaturate.',
    '{
        "targetHex": "#00FFFF",
        "targetLabel": "Dark Olive",
        "colorBlocks": [
            {"id": "cyan", "label": "Cyan", "hex": "#00FFFF"},
            {"id": "magenta", "label": "Magenta", "hex": "#FF00FF"},
            {"id": "yellow", "label": "Yellow", "hex": "#FFFF00"},
            {"id": "red", "label": "Red", "hex": "#FF0000"},
            {"id": "blue", "label": "Blue", "hex": "#0000FF"}
        ],
        "correctBlockIds": ["cyan", "magenta", "yellow"],
        "mode": "subtractive"
    }',
    4,
    ARRAY['color-theory', 'subtractive', 'three-color', 'advanced']
),
(
    'color-mixing',
    'Additive: Light Gray',
    'Create a neutral light gray by mixing three primary lights. Choose the right 3 from 5 options.',
    'Gray is made by mixing all three primaries at equal, moderate intensities.',
    '{
        "targetHex": "#FFFFFF",
        "targetLabel": "Light Gray",
        "colorBlocks": [
            {"id": "red", "label": "Red", "hex": "#FF0000"},
            {"id": "green", "label": "Green", "hex": "#00FF00"},
            {"id": "blue", "label": "Blue", "hex": "#0000FF"},
            {"id": "magenta", "label": "Magenta", "hex": "#FF00FF"},
            {"id": "orange", "label": "Orange", "hex": "#FF8800"}
        ],
        "correctBlockIds": ["red", "green", "blue"],
        "mode": "additive"
    }',
    3,
    ARRAY['color-theory', 'additive', 'three-color', 'grayscale']
),
(
    'color-mixing',
    'Tricky Additive: Orange Light',
    'Create orange-colored light. You need exactly two colors — but which two from these five?',
    'Orange light needs red, plus something that adds a little green component.',
    '{
        "targetHex": "#FF8800",
        "targetLabel": "Orange",
        "colorBlocks": [
            {"id": "red", "label": "Red", "hex": "#FF0000"},
            {"id": "half-green", "label": "Dim Green", "hex": "#008800"},
            {"id": "blue", "label": "Blue", "hex": "#0000FF"},
            {"id": "cyan", "label": "Cyan", "hex": "#00FFFF"},
            {"id": "magenta", "label": "Magenta", "hex": "#FF00FF"}
        ],
        "correctBlockIds": ["red", "half-green"],
        "mode": "additive"
    }',
    4,
    ARRAY['color-theory', 'additive', 'intermediate', 'orange']
),
(
    'color-mixing',
    'Three-Way Light: Pastel Pink',
    'Mix light to create a soft pastel pink. You''ll need three specific colors.',
    'Pink light needs full red, some blue to push toward magenta-pink, and some green to lighten.',
    '{
        "targetHex": "#FF88FF",
        "targetLabel": "Pastel Pink",
        "colorBlocks": [
            {"id": "red", "label": "Red", "hex": "#FF0000"},
            {"id": "half-green", "label": "Soft Green", "hex": "#008800"},
            {"id": "blue", "label": "Blue", "hex": "#0000FF"},
            {"id": "half-blue", "label": "Soft Blue", "hex": "#000088"},
            {"id": "yellow", "label": "Yellow", "hex": "#FFFF00"}
        ],
        "correctBlockIds": ["red", "half-green", "blue"],
        "mode": "additive"
    }',
    4,
    ARRAY['color-theory', 'additive', 'three-color', 'pastel']
),
(
    'color-mixing',
    'Subtractive Tertiary: Brick Red',
    'Mix paints to create a muted brick red. Choose 2 of the 5 available pigments.',
    'Start with the warm pigments — magenta and yellow together create red tones.',
    '{
        "targetHex": "#FF00FF",
        "targetLabel": "Brick Red",
        "colorBlocks": [
            {"id": "cyan", "label": "Cyan", "hex": "#00FFFF"},
            {"id": "magenta", "label": "Magenta", "hex": "#FF00FF"},
            {"id": "yellow", "label": "Yellow", "hex": "#FFFF00"},
            {"id": "blue", "label": "Blue", "hex": "#0000FF"},
            {"id": "green", "label": "Green", "hex": "#00FF00"}
        ],
        "correctBlockIds": ["magenta", "yellow"],
        "mode": "subtractive"
    }',
    3,
    ARRAY['color-theory', 'subtractive', 'tertiary', 'advanced']
);
