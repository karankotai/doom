-- Migration: 024_fraction_visualizer_seed
-- Description: Seed fraction visualizer puzzles with varied shapes and divisions

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
-- 1) Rectangle: 3 sections (top half + two bottom quarters) — matches reference image
(
    'fraction-visualizer',
    'Finding Half',
    'Color 1/2 of the shape.',
    'Half means the colored area should be the same size as the uncolored area.',
    '{
        "shape": "rectangle",
        "sections": [
            {"id": "top", "fractionValue": 0.5, "svg": {"type": "rect", "x": 10, "y": 10, "width": 280, "height": 140}},
            {"id": "bl", "fractionValue": 0.25, "svg": {"type": "rect", "x": 10, "y": 150, "width": 140, "height": 140}},
            {"id": "br", "fractionValue": 0.25, "svg": {"type": "rect", "x": 150, "y": 150, "width": 140, "height": 140}}
        ],
        "targetNumerator": 1,
        "targetDenominator": 2,
        "viewBox": {"width": 300, "height": 300}
    }',
    1,
    ARRAY['math', 'fractions', 'halves']
),
-- 2) Rectangle: 4 equal quarters — color 3/4
(
    'fraction-visualizer',
    'Three Quarters',
    'Color 3/4 of the shape.',
    'Three quarters means 3 out of 4 equal parts should be colored.',
    '{
        "shape": "rectangle",
        "sections": [
            {"id": "tl", "fractionValue": 0.25, "svg": {"type": "rect", "x": 10, "y": 10, "width": 140, "height": 140}},
            {"id": "tr", "fractionValue": 0.25, "svg": {"type": "rect", "x": 150, "y": 10, "width": 140, "height": 140}},
            {"id": "bl", "fractionValue": 0.25, "svg": {"type": "rect", "x": 10, "y": 150, "width": 140, "height": 140}},
            {"id": "br", "fractionValue": 0.25, "svg": {"type": "rect", "x": 150, "y": 150, "width": 140, "height": 140}}
        ],
        "targetNumerator": 3,
        "targetDenominator": 4,
        "viewBox": {"width": 300, "height": 300}
    }',
    1,
    ARRAY['math', 'fractions', 'quarters']
),
-- 3) Circle: 4 equal pie slices — color 1/4
(
    'fraction-visualizer',
    'Quarter Circle',
    'Color 1/4 of the circle.',
    'One quarter is one out of four equal slices.',
    '{
        "shape": "circle",
        "sections": [
            {"id": "q1", "fractionValue": 0.25, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": -90, "endAngle": 0}},
            {"id": "q2", "fractionValue": 0.25, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 0, "endAngle": 90}},
            {"id": "q3", "fractionValue": 0.25, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 90, "endAngle": 180}},
            {"id": "q4", "fractionValue": 0.25, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 180, "endAngle": 270}}
        ],
        "targetNumerator": 1,
        "targetDenominator": 4,
        "viewBox": {"width": 300, "height": 300}
    }',
    1,
    ARRAY['math', 'fractions', 'quarters', 'circle']
),
-- 4) Circle: 3 equal slices — color 2/3
(
    'fraction-visualizer',
    'Two Thirds',
    'Color 2/3 of the circle.',
    'Two thirds means coloring 2 out of 3 equal slices.',
    '{
        "shape": "circle",
        "sections": [
            {"id": "s1", "fractionValue": 0.3333, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": -90, "endAngle": 30}},
            {"id": "s2", "fractionValue": 0.3333, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 30, "endAngle": 150}},
            {"id": "s3", "fractionValue": 0.3334, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 150, "endAngle": 270}}
        ],
        "targetNumerator": 2,
        "targetDenominator": 3,
        "viewBox": {"width": 300, "height": 300}
    }',
    2,
    ARRAY['math', 'fractions', 'thirds', 'circle']
),
-- 5) Rectangle: 3 horizontal strips — color 1/3
(
    'fraction-visualizer',
    'One Third Strip',
    'Color 1/3 of the rectangle.',
    'One third is 1 out of 3 equal rows.',
    '{
        "shape": "rectangle",
        "sections": [
            {"id": "r1", "fractionValue": 0.3333, "svg": {"type": "rect", "x": 10, "y": 10, "width": 280, "height": 90}},
            {"id": "r2", "fractionValue": 0.3333, "svg": {"type": "rect", "x": 10, "y": 100, "width": 280, "height": 90}},
            {"id": "r3", "fractionValue": 0.3334, "svg": {"type": "rect", "x": 10, "y": 190, "width": 280, "height": 90}}
        ],
        "targetNumerator": 1,
        "targetDenominator": 3,
        "viewBox": {"width": 300, "height": 290}
    }',
    1,
    ARRAY['math', 'fractions', 'thirds']
),
-- 6) Rectangle: unequal divisions — 1 large half + 2 small quarters + 2 tiny eighths = color 3/8
(
    'fraction-visualizer',
    'Finding Three Eighths',
    'Color 3/8 of the shape.',
    'Think about how many eighths each section represents. The large section is 4/8, the medium ones are 2/8 each, and the small ones are 1/8 each.',
    '{
        "shape": "rectangle",
        "sections": [
            {"id": "big", "fractionValue": 0.5, "svg": {"type": "rect", "x": 10, "y": 10, "width": 280, "height": 140}},
            {"id": "ml", "fractionValue": 0.25, "svg": {"type": "rect", "x": 10, "y": 150, "width": 140, "height": 140}},
            {"id": "tr", "fractionValue": 0.125, "svg": {"type": "rect", "x": 150, "y": 150, "width": 140, "height": 70}},
            {"id": "br", "fractionValue": 0.125, "svg": {"type": "rect", "x": 150, "y": 220, "width": 140, "height": 70}}
        ],
        "targetNumerator": 3,
        "targetDenominator": 8,
        "viewBox": {"width": 300, "height": 300}
    }',
    3,
    ARRAY['math', 'fractions', 'eighths']
),
-- 7) Circle: 8 equal slices — color 5/8
(
    'fraction-visualizer',
    'Five Eighths Pie',
    'Color 5/8 of the circle.',
    'Five eighths means coloring 5 out of 8 equal slices.',
    '{
        "shape": "circle",
        "sections": [
            {"id": "s1", "fractionValue": 0.125, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": -90, "endAngle": -45}},
            {"id": "s2", "fractionValue": 0.125, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": -45, "endAngle": 0}},
            {"id": "s3", "fractionValue": 0.125, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 0, "endAngle": 45}},
            {"id": "s4", "fractionValue": 0.125, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 45, "endAngle": 90}},
            {"id": "s5", "fractionValue": 0.125, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 90, "endAngle": 135}},
            {"id": "s6", "fractionValue": 0.125, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 135, "endAngle": 180}},
            {"id": "s7", "fractionValue": 0.125, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 180, "endAngle": 225}},
            {"id": "s8", "fractionValue": 0.125, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 225, "endAngle": 270}}
        ],
        "targetNumerator": 5,
        "targetDenominator": 8,
        "viewBox": {"width": 300, "height": 300}
    }',
    2,
    ARRAY['math', 'fractions', 'eighths', 'circle']
),
-- 8) Rectangle: 6 equal cells (2x3 grid) — color 1/6
(
    'fraction-visualizer',
    'One Sixth',
    'Color 1/6 of the rectangle.',
    'One sixth means coloring just 1 out of 6 equal sections.',
    '{
        "shape": "rectangle",
        "sections": [
            {"id": "c1", "fractionValue": 0.1667, "svg": {"type": "rect", "x": 10, "y": 10, "width": 90, "height": 135}},
            {"id": "c2", "fractionValue": 0.1667, "svg": {"type": "rect", "x": 100, "y": 10, "width": 90, "height": 135}},
            {"id": "c3", "fractionValue": 0.1667, "svg": {"type": "rect", "x": 190, "y": 10, "width": 90, "height": 135}},
            {"id": "c4", "fractionValue": 0.1667, "svg": {"type": "rect", "x": 10, "y": 145, "width": 90, "height": 135}},
            {"id": "c5", "fractionValue": 0.1667, "svg": {"type": "rect", "x": 100, "y": 145, "width": 90, "height": 135}},
            {"id": "c6", "fractionValue": 0.1665, "svg": {"type": "rect", "x": 190, "y": 145, "width": 90, "height": 135}}
        ],
        "targetNumerator": 1,
        "targetDenominator": 6,
        "viewBox": {"width": 290, "height": 290}
    }',
    1,
    ARRAY['math', 'fractions', 'sixths']
),
-- 9) Triangle: 4 equal sub-triangles — color 1/2
(
    'fraction-visualizer',
    'Half a Triangle',
    'Color 1/2 of the triangle.',
    'Two of the four small triangles make up half the total area.',
    '{
        "shape": "triangle",
        "sections": [
            {"id": "t1", "fractionValue": 0.25, "svg": {"type": "path", "d": "M 150 20 L 80 140 L 220 140 Z"}},
            {"id": "t2", "fractionValue": 0.25, "svg": {"type": "path", "d": "M 80 140 L 10 260 L 150 260 Z"}},
            {"id": "t3", "fractionValue": 0.25, "svg": {"type": "path", "d": "M 220 140 L 150 260 L 290 260 Z"}},
            {"id": "t4", "fractionValue": 0.25, "svg": {"type": "path", "d": "M 80 140 L 220 140 L 150 260 Z"}}
        ],
        "targetNumerator": 1,
        "targetDenominator": 2,
        "viewBox": {"width": 300, "height": 280}
    }',
    2,
    ARRAY['math', 'fractions', 'halves', 'triangle']
),
-- 10) Rectangle: mixed sizes — L-shape puzzle, color 3/4
(
    'fraction-visualizer',
    'Three Quarters Challenge',
    'Color 3/4 of the shape.',
    'Each section has a different size. Look at how many sections you need to reach 3/4 total.',
    '{
        "shape": "rectangle",
        "sections": [
            {"id": "a", "fractionValue": 0.5, "svg": {"type": "rect", "x": 10, "y": 10, "width": 180, "height": 280}},
            {"id": "b", "fractionValue": 0.25, "svg": {"type": "rect", "x": 190, "y": 10, "width": 100, "height": 140}},
            {"id": "c", "fractionValue": 0.125, "svg": {"type": "rect", "x": 190, "y": 150, "width": 100, "height": 70}},
            {"id": "d", "fractionValue": 0.125, "svg": {"type": "rect", "x": 190, "y": 220, "width": 100, "height": 70}}
        ],
        "targetNumerator": 3,
        "targetDenominator": 4,
        "viewBox": {"width": 300, "height": 300}
    }',
    3,
    ARRAY['math', 'fractions', 'quarters', 'mixed']
),
-- 11) Circle: 6 equal slices — color 1/2
(
    'fraction-visualizer',
    'Half a Pie',
    'Color 1/2 of the circle.',
    'Half means 3 out of 6 equal slices.',
    '{
        "shape": "circle",
        "sections": [
            {"id": "s1", "fractionValue": 0.1667, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": -90, "endAngle": -30}},
            {"id": "s2", "fractionValue": 0.1667, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": -30, "endAngle": 30}},
            {"id": "s3", "fractionValue": 0.1667, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 30, "endAngle": 90}},
            {"id": "s4", "fractionValue": 0.1667, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 90, "endAngle": 150}},
            {"id": "s5", "fractionValue": 0.1667, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 150, "endAngle": 210}},
            {"id": "s6", "fractionValue": 0.1665, "svg": {"type": "arc", "cx": 150, "cy": 150, "r": 130, "startAngle": 210, "endAngle": 270}}
        ],
        "targetNumerator": 1,
        "targetDenominator": 2,
        "viewBox": {"width": 300, "height": 300}
    }',
    2,
    ARRAY['math', 'fractions', 'halves', 'circle', 'sixths']
),
-- 12) Rectangle: 5 horizontal strips — color 2/5
(
    'fraction-visualizer',
    'Two Fifths',
    'Color 2/5 of the rectangle.',
    'Two fifths means coloring 2 out of 5 equal strips.',
    '{
        "shape": "rectangle",
        "sections": [
            {"id": "r1", "fractionValue": 0.2, "svg": {"type": "rect", "x": 10, "y": 10, "width": 260, "height": 52}},
            {"id": "r2", "fractionValue": 0.2, "svg": {"type": "rect", "x": 10, "y": 62, "width": 260, "height": 52}},
            {"id": "r3", "fractionValue": 0.2, "svg": {"type": "rect", "x": 10, "y": 114, "width": 260, "height": 52}},
            {"id": "r4", "fractionValue": 0.2, "svg": {"type": "rect", "x": 10, "y": 166, "width": 260, "height": 52}},
            {"id": "r5", "fractionValue": 0.2, "svg": {"type": "rect", "x": 10, "y": 218, "width": 260, "height": 52}}
        ],
        "targetNumerator": 2,
        "targetDenominator": 5,
        "viewBox": {"width": 280, "height": 280}
    }',
    2,
    ARRAY['math', 'fractions', 'fifths']
);
