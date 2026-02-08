-- Migration: 032_interactive_diagram_detailed
-- Description: Replace existing interactive-diagram applets with much more detailed SVG diagrams

DELETE FROM applets WHERE type = 'interactive-diagram';

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
-- ============================================================
-- 1) Geometry: Corresponding angles — detailed
-- Full parallel lines with tick marks, angle arcs, arrow heads
-- ============================================================
(
    'interactive-diagram',
    'Corresponding Angles',
    'Select a pair of corresponding angles formed by the transversal.',
    'Corresponding angles are in the same position at each intersection — one above and one below, on the same side of the transversal.',
    '{
        "elements": [
            {"id": "bg-rect", "type": "rect", "attrs": {"x": 0, "y": 0, "width": 500, "height": 420}, "style": {"fill": "#FAFBFC", "stroke": "none"}},

            {"id": "line-top", "type": "line", "attrs": {"x1": 20, "y1": 150, "x2": 480, "y2": 150}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "line-bot", "type": "line", "attrs": {"x1": 20, "y1": 290, "x2": 480, "y2": 290}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "transversal", "type": "line", "attrs": {"x1": 120, "y1": 20, "x2": 380, "y2": 410}, "style": {"stroke": "#636E72", "strokeWidth": 2.5}},

            {"id": "arrow-l1", "type": "polygon", "attrs": {"points": "475,147 480,150 475,153"}, "style": {"fill": "#2D3436"}},
            {"id": "arrow-l2", "type": "polygon", "attrs": {"points": "475,287 480,290 475,293"}, "style": {"fill": "#2D3436"}},
            {"id": "arrow-t", "type": "polygon", "attrs": {"points": "378,405 380,410 374,407"}, "style": {"fill": "#636E72"}},

            {"id": "tick-top1", "type": "line", "attrs": {"x1": 95, "y1": 144, "x2": 100, "y2": 156}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "tick-top2", "type": "line", "attrs": {"x1": 100, "y1": 144, "x2": 105, "y2": 156}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "tick-bot1", "type": "line", "attrs": {"x1": 95, "y1": 284, "x2": 100, "y2": 296}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "tick-bot2", "type": "line", "attrs": {"x1": 100, "y1": 284, "x2": 105, "y2": 296}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},

            {"id": "arc-1", "type": "path", "attrs": {"d": "M 178,150 A 22,22 0 0,0 193,128"}, "style": {"fill": "none", "stroke": "#B2BEC3", "strokeWidth": 1.5}},
            {"id": "arc-2", "type": "path", "attrs": {"d": "M 217,128 A 22,22 0 0,0 232,150"}, "style": {"fill": "none", "stroke": "#B2BEC3", "strokeWidth": 1.5}},
            {"id": "arc-3", "type": "path", "attrs": {"d": "M 232,150 A 22,22 0 0,0 217,172"}, "style": {"fill": "none", "stroke": "#B2BEC3", "strokeWidth": 1.5}},
            {"id": "arc-4", "type": "path", "attrs": {"d": "M 193,172 A 22,22 0 0,0 178,150"}, "style": {"fill": "none", "stroke": "#B2BEC3", "strokeWidth": 1.5}},
            {"id": "arc-5", "type": "path", "attrs": {"d": "M 273,290 A 22,22 0 0,0 288,268"}, "style": {"fill": "none", "stroke": "#B2BEC3", "strokeWidth": 1.5}},
            {"id": "arc-6", "type": "path", "attrs": {"d": "M 312,268 A 22,22 0 0,0 327,290"}, "style": {"fill": "none", "stroke": "#B2BEC3", "strokeWidth": 1.5}},
            {"id": "arc-7", "type": "path", "attrs": {"d": "M 327,290 A 22,22 0 0,0 312,312"}, "style": {"fill": "none", "stroke": "#B2BEC3", "strokeWidth": 1.5}},
            {"id": "arc-8", "type": "path", "attrs": {"d": "M 288,312 A 22,22 0 0,0 273,290"}, "style": {"fill": "none", "stroke": "#B2BEC3", "strokeWidth": 1.5}},

            {"id": "label-l1", "type": "text", "attrs": {"x": 30, "y": 142, "content": "l\u2081", "fontSize": 16, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#2D3436"}},
            {"id": "label-l2", "type": "text", "attrs": {"x": 30, "y": 282, "content": "l\u2082", "fontSize": 16, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#2D3436"}},
            {"id": "label-t", "type": "text", "attrs": {"x": 125, "y": 16, "content": "t", "fontSize": 16, "fontWeight": "bold", "textAnchor": "middle"}, "style": {"fill": "#636E72"}},

            {"id": "label-1", "type": "text", "attrs": {"x": 180, "y": 138, "content": "1", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-2", "type": "text", "attrs": {"x": 222, "y": 138, "content": "2", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-3", "type": "text", "attrs": {"x": 222, "y": 168, "content": "3", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-4", "type": "text", "attrs": {"x": 180, "y": 168, "content": "4", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-5", "type": "text", "attrs": {"x": 275, "y": 278, "content": "5", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-6", "type": "text", "attrs": {"x": 317, "y": 278, "content": "6", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-7", "type": "text", "attrs": {"x": 317, "y": 308, "content": "7", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-8", "type": "text", "attrs": {"x": 275, "y": 308, "content": "8", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},

            {"id": "dot-top", "type": "circle", "attrs": {"cx": 205, "cy": 150, "r": 4}, "style": {"fill": "#2D3436"}},
            {"id": "dot-bot", "type": "circle", "attrs": {"cx": 300, "cy": 290, "r": 4}, "style": {"fill": "#2D3436"}},

            {"id": "angle-1", "type": "polygon", "attrs": {"points": "205,150 155,150 183,88"}, "label": "Angle 1", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-2", "type": "polygon", "attrs": {"points": "205,150 255,150 227,88"}, "label": "Angle 2", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-3", "type": "polygon", "attrs": {"points": "205,150 255,150 227,212"}, "label": "Angle 3", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-4", "type": "polygon", "attrs": {"points": "205,150 155,150 183,212"}, "label": "Angle 4", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-5", "type": "polygon", "attrs": {"points": "300,290 250,290 278,228"}, "label": "Angle 5", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-6", "type": "polygon", "attrs": {"points": "300,290 350,290 322,228"}, "label": "Angle 6", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-7", "type": "polygon", "attrs": {"points": "300,290 350,290 322,352"}, "label": "Angle 7", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-8", "type": "polygon", "attrs": {"points": "300,290 250,290 278,352"}, "label": "Angle 8", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},

            {"id": "note", "type": "text", "attrs": {"x": 250, "y": 408, "content": "l\u2081 \u2225 l\u2082", "fontSize": 13}, "style": {"fill": "#999"}}
        ],
        "correctIds": ["angle-1", "angle-5"],
        "viewBox": {"width": 500, "height": 420},
        "diagramTitle": "Parallel Lines & Transversal"
    }',
    1,
    ARRAY['geometry', 'angles', 'parallel-lines']
),
-- ============================================================
-- 2) Geometry: Alternate interior angles — detailed
-- ============================================================
(
    'interactive-diagram',
    'Alternate Interior Angles',
    'Select the pair of alternate interior angles.',
    'Alternate interior angles are between the parallel lines, on opposite sides of the transversal. They are equal.',
    '{
        "elements": [
            {"id": "bg-rect", "type": "rect", "attrs": {"x": 0, "y": 0, "width": 500, "height": 420}, "style": {"fill": "#FAFBFC", "stroke": "none"}},

            {"id": "line-top", "type": "line", "attrs": {"x1": 20, "y1": 150, "x2": 480, "y2": 150}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "line-bot", "type": "line", "attrs": {"x1": 20, "y1": 290, "x2": 480, "y2": 290}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "transversal", "type": "line", "attrs": {"x1": 120, "y1": 20, "x2": 380, "y2": 410}, "style": {"stroke": "#636E72", "strokeWidth": 2.5}},

            {"id": "tick-top1", "type": "line", "attrs": {"x1": 95, "y1": 144, "x2": 100, "y2": 156}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "tick-top2", "type": "line", "attrs": {"x1": 100, "y1": 144, "x2": 105, "y2": 156}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "tick-bot1", "type": "line", "attrs": {"x1": 95, "y1": 284, "x2": 100, "y2": 296}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "tick-bot2", "type": "line", "attrs": {"x1": 100, "y1": 284, "x2": 105, "y2": 296}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},

            {"id": "shading-interior", "type": "rect", "attrs": {"x": 20, "y": 150, "width": 460, "height": 140}, "style": {"fill": "#DFE6E9", "stroke": "none", "opacity": 0.3}},
            {"id": "interior-label", "type": "text", "attrs": {"x": 440, "y": 224, "content": "Interior", "fontSize": 11, "textAnchor": "end"}, "style": {"fill": "#B2BEC3"}},

            {"id": "label-l1", "type": "text", "attrs": {"x": 30, "y": 142, "content": "l\u2081", "fontSize": 16, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#2D3436"}},
            {"id": "label-l2", "type": "text", "attrs": {"x": 30, "y": 282, "content": "l\u2082", "fontSize": 16, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#2D3436"}},

            {"id": "dot-top", "type": "circle", "attrs": {"cx": 205, "cy": 150, "r": 4}, "style": {"fill": "#2D3436"}},
            {"id": "dot-bot", "type": "circle", "attrs": {"cx": 300, "cy": 290, "r": 4}, "style": {"fill": "#2D3436"}},

            {"id": "label-3", "type": "text", "attrs": {"x": 222, "y": 168, "content": "3", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-4", "type": "text", "attrs": {"x": 180, "y": 168, "content": "4", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-5", "type": "text", "attrs": {"x": 275, "y": 278, "content": "5", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-6", "type": "text", "attrs": {"x": 317, "y": 278, "content": "6", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},

            {"id": "angle-3", "type": "polygon", "attrs": {"points": "205,150 255,150 227,212"}, "label": "Angle 3", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-4", "type": "polygon", "attrs": {"points": "205,150 155,150 183,212"}, "label": "Angle 4", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-5", "type": "polygon", "attrs": {"points": "300,290 250,290 278,228"}, "label": "Angle 5", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-6", "type": "polygon", "attrs": {"points": "300,290 350,290 322,228"}, "label": "Angle 6", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},

            {"id": "note", "type": "text", "attrs": {"x": 250, "y": 408, "content": "l\u2081 \u2225 l\u2082", "fontSize": 13}, "style": {"fill": "#999"}}
        ],
        "correctIds": ["angle-3", "angle-6"],
        "viewBox": {"width": 500, "height": 420},
        "diagramTitle": "Parallel Lines & Transversal"
    }',
    1,
    ARRAY['geometry', 'angles', 'parallel-lines']
),
-- ============================================================
-- 3) Geometry: Vertical angles — detailed
-- ============================================================
(
    'interactive-diagram',
    'Vertical Angles',
    'Select a pair of vertical (vertically opposite) angles at the top intersection.',
    'Vertical angles are formed by two intersecting lines and are directly opposite each other. They are always equal.',
    '{
        "elements": [
            {"id": "bg-rect", "type": "rect", "attrs": {"x": 0, "y": 0, "width": 500, "height": 420}, "style": {"fill": "#FAFBFC", "stroke": "none"}},
            {"id": "line-top", "type": "line", "attrs": {"x1": 20, "y1": 150, "x2": 480, "y2": 150}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "line-bot", "type": "line", "attrs": {"x1": 20, "y1": 290, "x2": 480, "y2": 290}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "transversal", "type": "line", "attrs": {"x1": 120, "y1": 20, "x2": 380, "y2": 410}, "style": {"stroke": "#636E72", "strokeWidth": 2.5}},

            {"id": "tick-top1", "type": "line", "attrs": {"x1": 95, "y1": 144, "x2": 100, "y2": 156}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "tick-top2", "type": "line", "attrs": {"x1": 100, "y1": 144, "x2": 105, "y2": 156}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "tick-bot1", "type": "line", "attrs": {"x1": 95, "y1": 284, "x2": 100, "y2": 296}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "tick-bot2", "type": "line", "attrs": {"x1": 100, "y1": 284, "x2": 105, "y2": 296}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},

            {"id": "dot-top", "type": "circle", "attrs": {"cx": 205, "cy": 150, "r": 4}, "style": {"fill": "#2D3436"}},

            {"id": "guide-circle", "type": "circle", "attrs": {"cx": 205, "cy": 150, "r": 35}, "style": {"fill": "none", "stroke": "#DFE6E9", "strokeWidth": 1}},

            {"id": "label-1", "type": "text", "attrs": {"x": 180, "y": 132, "content": "1", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-2", "type": "text", "attrs": {"x": 222, "y": 132, "content": "2", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-3", "type": "text", "attrs": {"x": 222, "y": 175, "content": "3", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-4", "type": "text", "attrs": {"x": 180, "y": 175, "content": "4", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},

            {"id": "angle-1", "type": "polygon", "attrs": {"points": "205,150 155,150 183,88"}, "label": "Angle 1", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-2", "type": "polygon", "attrs": {"points": "205,150 255,150 227,88"}, "label": "Angle 2", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-3", "type": "polygon", "attrs": {"points": "205,150 255,150 227,212"}, "label": "Angle 3", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-4", "type": "polygon", "attrs": {"points": "205,150 155,150 183,212"}, "label": "Angle 4", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},

            {"id": "note", "type": "text", "attrs": {"x": 250, "y": 370, "content": "Vertically opposite angles are equal", "fontSize": 12}, "style": {"fill": "#B2BEC3"}}
        ],
        "correctIds": ["angle-1", "angle-3"],
        "viewBox": {"width": 500, "height": 400},
        "diagramTitle": "Vertical Angles"
    }',
    1,
    ARRAY['geometry', 'angles', 'vertical-angles']
),
-- ============================================================
-- 4) Geometry: Co-interior angles — detailed
-- ============================================================
(
    'interactive-diagram',
    'Co-interior Angles',
    'Select the pair of co-interior (same-side interior) angles.',
    'Co-interior angles are between the parallel lines on the same side of the transversal. They add up to 180\u00b0.',
    '{
        "elements": [
            {"id": "bg-rect", "type": "rect", "attrs": {"x": 0, "y": 0, "width": 500, "height": 420}, "style": {"fill": "#FAFBFC", "stroke": "none"}},
            {"id": "line-top", "type": "line", "attrs": {"x1": 20, "y1": 150, "x2": 480, "y2": 150}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "line-bot", "type": "line", "attrs": {"x1": 20, "y1": 290, "x2": 480, "y2": 290}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "transversal", "type": "line", "attrs": {"x1": 120, "y1": 20, "x2": 380, "y2": 410}, "style": {"stroke": "#636E72", "strokeWidth": 2.5}},

            {"id": "tick-top1", "type": "line", "attrs": {"x1": 95, "y1": 144, "x2": 100, "y2": 156}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "tick-top2", "type": "line", "attrs": {"x1": 100, "y1": 144, "x2": 105, "y2": 156}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "tick-bot1", "type": "line", "attrs": {"x1": 95, "y1": 284, "x2": 100, "y2": 296}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "tick-bot2", "type": "line", "attrs": {"x1": 100, "y1": 284, "x2": 105, "y2": 296}, "style": {"stroke": "#2D3436", "strokeWidth": 2}},

            {"id": "shading-interior", "type": "rect", "attrs": {"x": 20, "y": 150, "width": 460, "height": 140}, "style": {"fill": "#DFE6E9", "stroke": "none", "opacity": 0.3}},
            {"id": "same-side-line", "type": "line", "attrs": {"x1": 160, "y1": 150, "x2": 255, "y2": 290}, "style": {"stroke": "#FDCB6E", "strokeWidth": 1.5, "opacity": 0.5}},

            {"id": "label-l1", "type": "text", "attrs": {"x": 30, "y": 142, "content": "l\u2081", "fontSize": 16, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#2D3436"}},
            {"id": "label-l2", "type": "text", "attrs": {"x": 30, "y": 282, "content": "l\u2082", "fontSize": 16, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#2D3436"}},
            {"id": "dot-top", "type": "circle", "attrs": {"cx": 205, "cy": 150, "r": 4}, "style": {"fill": "#2D3436"}},
            {"id": "dot-bot", "type": "circle", "attrs": {"cx": 300, "cy": 290, "r": 4}, "style": {"fill": "#2D3436"}},

            {"id": "label-3", "type": "text", "attrs": {"x": 222, "y": 168, "content": "3", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-4", "type": "text", "attrs": {"x": 180, "y": 168, "content": "4", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-5", "type": "text", "attrs": {"x": 275, "y": 278, "content": "5", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},
            {"id": "label-6", "type": "text", "attrs": {"x": 317, "y": 278, "content": "6", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#6C5CE7"}},

            {"id": "angle-4", "type": "polygon", "attrs": {"points": "205,150 155,150 183,212"}, "label": "Angle 4", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-6", "type": "polygon", "attrs": {"points": "300,290 350,290 322,228"}, "label": "Angle 6", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-3", "type": "polygon", "attrs": {"points": "205,150 255,150 227,212"}, "label": "Angle 3", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},
            {"id": "angle-5", "type": "polygon", "attrs": {"points": "300,290 250,290 278,228"}, "label": "Angle 5", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#999", "strokeWidth": 1, "opacity": 0.6}},

            {"id": "note", "type": "text", "attrs": {"x": 250, "y": 408, "content": "Co-interior angles sum to 180\u00b0", "fontSize": 12}, "style": {"fill": "#B2BEC3"}}
        ],
        "correctIds": ["angle-4", "angle-6"],
        "viewBox": {"width": 500, "height": 420},
        "diagramTitle": "Co-interior (Same-Side Interior) Angles"
    }',
    2,
    ARRAY['geometry', 'angles', 'parallel-lines']
),
-- ============================================================
-- 5) Biology: Digestive system — mechanical digestion (detailed)
-- Full tract with connectors, gallbladder, rectum, salivary glands
-- ============================================================
(
    'interactive-diagram',
    'Digestive System: Mechanical Digestion',
    'Where does mechanical digestion begin? Select the correct organ.',
    'Mechanical digestion involves physically breaking down food — think about chewing.',
    '{
        "elements": [
            {"id": "bg", "type": "rect", "attrs": {"x": 0, "y": 0, "width": 500, "height": 440}, "style": {"fill": "#FAFBFC", "stroke": "none"}},
            {"id": "body-outline", "type": "path", "attrs": {"d": "M 250 25 Q 170 25 145 60 Q 120 95 120 140 L 120 350 Q 120 400 170 410 L 330 410 Q 380 400 380 350 L 380 140 Q 380 95 355 60 Q 330 25 250 25 Z"}, "style": {"fill": "#F5F6FA", "stroke": "#DFE6E9", "strokeWidth": 1.5}},

            {"id": "salivary-l", "type": "ellipse", "attrs": {"cx": 205, "cy": 58, "rx": 10, "ry": 7}, "style": {"fill": "#E8D5E8", "stroke": "#9B59B6", "strokeWidth": 1}},
            {"id": "salivary-r", "type": "ellipse", "attrs": {"cx": 295, "cy": 58, "rx": 10, "ry": 7}, "style": {"fill": "#E8D5E8", "stroke": "#9B59B6", "strokeWidth": 1}},
            {"id": "salivary-label", "type": "text", "attrs": {"x": 340, "y": 55, "content": "Salivary", "fontSize": 9, "textAnchor": "start"}, "style": {"fill": "#999"}},
            {"id": "salivary-label2", "type": "text", "attrs": {"x": 340, "y": 65, "content": "Glands", "fontSize": 9, "textAnchor": "start"}, "style": {"fill": "#999"}},

            {"id": "mouth", "type": "path", "attrs": {"d": "M 225 45 Q 225 35 250 35 Q 275 35 275 45 Q 275 60 265 65 Q 250 70 235 65 Q 225 60 225 45 Z"}, "label": "Mouth", "selectable": true, "style": {"fill": "#FADADD", "stroke": "#C0392B", "strokeWidth": 1.5}},
            {"id": "teeth-top", "type": "path", "attrs": {"d": "M 232 44 L 238 44 L 244 44 L 250 44 L 256 44 L 262 44 L 268 44"}, "style": {"fill": "none", "stroke": "#FFFFFF", "strokeWidth": 2}},

            {"id": "pharynx", "type": "rect", "attrs": {"x": 243, "y": 70, "width": 14, "height": 20, "rx": 3}, "label": "Pharynx", "style": {"fill": "#F0D0C6", "stroke": "#C0392B", "strokeWidth": 1}},

            {"id": "esophagus", "type": "path", "attrs": {"d": "M 250 90 Q 248 105 246 120 Q 244 135 243 145"}, "label": "Esophagus", "selectable": true, "style": {"fill": "none", "stroke": "#E67E22", "strokeWidth": 10}},
            {"id": "eso-inner", "type": "path", "attrs": {"d": "M 250 90 Q 248 105 246 120 Q 244 135 243 145"}, "style": {"fill": "none", "stroke": "#F5CBA7", "strokeWidth": 6}},

            {"id": "stomach", "type": "path", "attrs": {"d": "M 238 145 Q 200 155 195 185 Q 190 215 200 240 Q 210 260 240 262 Q 270 264 280 240 Q 290 215 285 185 Q 282 160 265 145 Z"}, "label": "Stomach", "selectable": true, "style": {"fill": "#FDEBD0", "stroke": "#E67E22", "strokeWidth": 1.5}},
            {"id": "stomach-rugae1", "type": "path", "attrs": {"d": "M 210 180 Q 230 175 250 180"}, "style": {"fill": "none", "stroke": "#E8C9A0", "strokeWidth": 1}},
            {"id": "stomach-rugae2", "type": "path", "attrs": {"d": "M 215 200 Q 235 195 255 200"}, "style": {"fill": "none", "stroke": "#E8C9A0", "strokeWidth": 1}},
            {"id": "stomach-rugae3", "type": "path", "attrs": {"d": "M 218 220 Q 238 215 258 220"}, "style": {"fill": "none", "stroke": "#E8C9A0", "strokeWidth": 1}},

            {"id": "liver", "type": "path", "attrs": {"d": "M 140 130 Q 128 140 130 165 Q 132 190 150 195 Q 170 200 190 192 Q 205 185 210 165 Q 215 145 200 132 Q 185 125 165 125 Q 148 125 140 130 Z"}, "label": "Liver", "selectable": true, "style": {"fill": "#C39B7E", "stroke": "#8B5E3C", "strokeWidth": 1.5}},
            {"id": "liver-detail1", "type": "path", "attrs": {"d": "M 155 150 Q 175 145 190 155"}, "style": {"fill": "none", "stroke": "#A07050", "strokeWidth": 0.8}},
            {"id": "liver-detail2", "type": "path", "attrs": {"d": "M 150 170 Q 170 165 185 172"}, "style": {"fill": "none", "stroke": "#A07050", "strokeWidth": 0.8}},

            {"id": "gallbladder", "type": "path", "attrs": {"d": "M 200 185 Q 205 195 202 205 Q 198 210 195 205 Q 192 195 200 185 Z"}, "label": "Gallbladder", "selectable": true, "style": {"fill": "#A8E6CF", "stroke": "#27AE60", "strokeWidth": 1.5}},

            {"id": "pancreas", "type": "path", "attrs": {"d": "M 270 258 Q 290 252 310 254 Q 330 256 340 260 Q 345 264 335 268 Q 320 270 300 268 Q 280 266 270 262 Z"}, "label": "Pancreas", "selectable": true, "style": {"fill": "#FAD7A0", "stroke": "#D4AC0D", "strokeWidth": 1.5}},
            {"id": "pancreas-duct", "type": "path", "attrs": {"d": "M 275 260 Q 265 262 260 258"}, "style": {"fill": "none", "stroke": "#D4AC0D", "strokeWidth": 1}},

            {"id": "sm-int", "type": "path", "attrs": {"d": "M 245 268 Q 210 280 215 300 Q 220 320 250 315 Q 280 310 285 295 Q 290 280 265 278 Q 240 282 238 298 Q 236 310 255 308 Q 270 305 272 290"}, "label": "Small Intestine", "selectable": true, "style": {"fill": "none", "stroke": "#E07050", "strokeWidth": 9}},
            {"id": "sm-int-inner", "type": "path", "attrs": {"d": "M 245 268 Q 210 280 215 300 Q 220 320 250 315 Q 280 310 285 295 Q 290 280 265 278 Q 240 282 238 298 Q 236 310 255 308 Q 270 305 272 290"}, "style": {"fill": "none", "stroke": "#F5B7A5", "strokeWidth": 5}},

            {"id": "lg-int", "type": "path", "attrs": {"d": "M 165 268 L 165 330 Q 165 365 195 365 L 305 365 Q 335 365 335 330 L 335 268"}, "label": "Large Intestine", "selectable": true, "style": {"fill": "none", "stroke": "#8B5E3C", "strokeWidth": 12}},
            {"id": "lg-int-inner", "type": "path", "attrs": {"d": "M 165 268 L 165 330 Q 165 365 195 365 L 305 365 Q 335 365 335 330 L 335 268"}, "style": {"fill": "none", "stroke": "#C4A882", "strokeWidth": 7}},

            {"id": "appendix", "type": "path", "attrs": {"d": "M 335 268 Q 345 278 340 290"}, "style": {"fill": "none", "stroke": "#8B5E3C", "strokeWidth": 4}},
            {"id": "appendix-lbl", "type": "text", "attrs": {"x": 352, "y": 285, "content": "Appendix", "fontSize": 8, "textAnchor": "start"}, "style": {"fill": "#999"}},

            {"id": "rectum", "type": "rect", "attrs": {"x": 240, "y": 370, "width": 20, "height": 22, "rx": 4}, "label": "Rectum", "style": {"fill": "#D2B48C", "stroke": "#8B5E3C", "strokeWidth": 1.5}},

            {"id": "lbl-mouth", "type": "text", "attrs": {"x": 155, "y": 48, "content": "?", "fontSize": 13, "fontWeight": "bold", "textAnchor": "end"}, "style": {"fill": "#B2BEC3"}},
            {"id": "lbl-eso", "type": "text", "attrs": {"x": 280, "y": 115, "content": "?", "fontSize": 13, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#B2BEC3"}},
            {"id": "lbl-stomach", "type": "text", "attrs": {"x": 300, "y": 200, "content": "?", "fontSize": 13, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#B2BEC3"}},
            {"id": "lbl-liver", "type": "text", "attrs": {"x": 120, "y": 155, "content": "?", "fontSize": 13, "fontWeight": "bold", "textAnchor": "end"}, "style": {"fill": "#B2BEC3"}},
            {"id": "lbl-si", "type": "text", "attrs": {"x": 315, "y": 300, "content": "?", "fontSize": 13, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#B2BEC3"}},
            {"id": "lbl-li", "type": "text", "attrs": {"x": 355, "y": 340, "content": "?", "fontSize": 13, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#B2BEC3"}}
        ],
        "correctIds": ["mouth"],
        "viewBox": {"width": 500, "height": 440},
        "diagramTitle": "Human Digestive System"
    }',
    1,
    ARRAY['biology', 'digestive-system', 'anatomy']
),
-- ============================================================
-- 6) Biology: Digestive — nutrient absorption (same detailed diagram)
-- ============================================================
(
    'interactive-diagram',
    'Digestive System: Nutrient Absorption',
    'Where are most nutrients absorbed? Select the correct organ.',
    'This long, coiled organ has villi that vastly increase its surface area for absorption.',
    '{
        "elements": [
            {"id": "bg", "type": "rect", "attrs": {"x": 0, "y": 0, "width": 500, "height": 440}, "style": {"fill": "#FAFBFC", "stroke": "none"}},
            {"id": "body-outline", "type": "path", "attrs": {"d": "M 250 25 Q 170 25 145 60 Q 120 95 120 140 L 120 350 Q 120 400 170 410 L 330 410 Q 380 400 380 350 L 380 140 Q 380 95 355 60 Q 330 25 250 25 Z"}, "style": {"fill": "#F5F6FA", "stroke": "#DFE6E9", "strokeWidth": 1.5}},
            {"id": "mouth", "type": "path", "attrs": {"d": "M 225 45 Q 225 35 250 35 Q 275 35 275 45 Q 275 60 265 65 Q 250 70 235 65 Q 225 60 225 45 Z"}, "label": "Mouth", "selectable": true, "style": {"fill": "#FADADD", "stroke": "#C0392B", "strokeWidth": 1.5}},
            {"id": "esophagus", "type": "path", "attrs": {"d": "M 250 70 Q 248 105 246 120 Q 244 135 243 145"}, "label": "Esophagus", "selectable": true, "style": {"fill": "none", "stroke": "#E67E22", "strokeWidth": 10}},
            {"id": "eso-inner", "type": "path", "attrs": {"d": "M 250 70 Q 248 105 246 120 Q 244 135 243 145"}, "style": {"fill": "none", "stroke": "#F5CBA7", "strokeWidth": 6}},
            {"id": "stomach", "type": "path", "attrs": {"d": "M 238 145 Q 200 155 195 185 Q 190 215 200 240 Q 210 260 240 262 Q 270 264 280 240 Q 290 215 285 185 Q 282 160 265 145 Z"}, "label": "Stomach", "selectable": true, "style": {"fill": "#FDEBD0", "stroke": "#E67E22", "strokeWidth": 1.5}},
            {"id": "stomach-rugae1", "type": "path", "attrs": {"d": "M 210 180 Q 230 175 250 180"}, "style": {"fill": "none", "stroke": "#E8C9A0", "strokeWidth": 1}},
            {"id": "stomach-rugae2", "type": "path", "attrs": {"d": "M 215 200 Q 235 195 255 200"}, "style": {"fill": "none", "stroke": "#E8C9A0", "strokeWidth": 1}},
            {"id": "liver", "type": "path", "attrs": {"d": "M 140 130 Q 128 140 130 165 Q 132 190 150 195 Q 170 200 190 192 Q 205 185 210 165 Q 215 145 200 132 Q 185 125 165 125 Q 148 125 140 130 Z"}, "label": "Liver", "selectable": true, "style": {"fill": "#C39B7E", "stroke": "#8B5E3C", "strokeWidth": 1.5}},
            {"id": "gallbladder", "type": "path", "attrs": {"d": "M 200 185 Q 205 195 202 205 Q 198 210 195 205 Q 192 195 200 185 Z"}, "label": "Gallbladder", "selectable": true, "style": {"fill": "#A8E6CF", "stroke": "#27AE60", "strokeWidth": 1.5}},
            {"id": "pancreas", "type": "path", "attrs": {"d": "M 270 258 Q 290 252 310 254 Q 330 256 340 260 Q 345 264 335 268 Q 320 270 300 268 Q 280 266 270 262 Z"}, "label": "Pancreas", "selectable": true, "style": {"fill": "#FAD7A0", "stroke": "#D4AC0D", "strokeWidth": 1.5}},
            {"id": "sm-int", "type": "path", "attrs": {"d": "M 245 268 Q 210 280 215 300 Q 220 320 250 315 Q 280 310 285 295 Q 290 280 265 278 Q 240 282 238 298 Q 236 310 255 308 Q 270 305 272 290"}, "label": "Small Intestine", "selectable": true, "style": {"fill": "none", "stroke": "#E07050", "strokeWidth": 9}},
            {"id": "sm-int-inner", "type": "path", "attrs": {"d": "M 245 268 Q 210 280 215 300 Q 220 320 250 315 Q 280 310 285 295 Q 290 280 265 278 Q 240 282 238 298 Q 236 310 255 308 Q 270 305 272 290"}, "style": {"fill": "none", "stroke": "#F5B7A5", "strokeWidth": 5}},
            {"id": "lg-int", "type": "path", "attrs": {"d": "M 165 268 L 165 330 Q 165 365 195 365 L 305 365 Q 335 365 335 330 L 335 268"}, "label": "Large Intestine", "selectable": true, "style": {"fill": "none", "stroke": "#8B5E3C", "strokeWidth": 12}},
            {"id": "lg-int-inner", "type": "path", "attrs": {"d": "M 165 268 L 165 330 Q 165 365 195 365 L 305 365 Q 335 365 335 330 L 335 268"}, "style": {"fill": "none", "stroke": "#C4A882", "strokeWidth": 7}}
        ],
        "correctIds": ["sm-int"],
        "viewBox": {"width": 500, "height": 440},
        "diagramTitle": "Human Digestive System"
    }',
    2,
    ARRAY['biology', 'digestive-system', 'anatomy']
),
-- ============================================================
-- 7) Biology: Digestive — bile production (same detailed diagram)
-- ============================================================
(
    'interactive-diagram',
    'Digestive System: Bile Production',
    'Which organ produces bile? Select it on the diagram.',
    'This large organ on the right side of the body has many functions including detoxification and bile production.',
    '{
        "elements": [
            {"id": "bg", "type": "rect", "attrs": {"x": 0, "y": 0, "width": 500, "height": 440}, "style": {"fill": "#FAFBFC", "stroke": "none"}},
            {"id": "body-outline", "type": "path", "attrs": {"d": "M 250 25 Q 170 25 145 60 Q 120 95 120 140 L 120 350 Q 120 400 170 410 L 330 410 Q 380 400 380 350 L 380 140 Q 380 95 355 60 Q 330 25 250 25 Z"}, "style": {"fill": "#F5F6FA", "stroke": "#DFE6E9", "strokeWidth": 1.5}},
            {"id": "mouth", "type": "path", "attrs": {"d": "M 225 45 Q 225 35 250 35 Q 275 35 275 45 Q 275 60 265 65 Q 250 70 235 65 Q 225 60 225 45 Z"}, "label": "Mouth", "selectable": true, "style": {"fill": "#FADADD", "stroke": "#C0392B", "strokeWidth": 1.5}},
            {"id": "esophagus", "type": "path", "attrs": {"d": "M 250 70 Q 248 105 246 120 Q 244 135 243 145"}, "label": "Esophagus", "selectable": true, "style": {"fill": "none", "stroke": "#E67E22", "strokeWidth": 10}},
            {"id": "eso-inner", "type": "path", "attrs": {"d": "M 250 70 Q 248 105 246 120 Q 244 135 243 145"}, "style": {"fill": "none", "stroke": "#F5CBA7", "strokeWidth": 6}},
            {"id": "stomach", "type": "path", "attrs": {"d": "M 238 145 Q 200 155 195 185 Q 190 215 200 240 Q 210 260 240 262 Q 270 264 280 240 Q 290 215 285 185 Q 282 160 265 145 Z"}, "label": "Stomach", "selectable": true, "style": {"fill": "#FDEBD0", "stroke": "#E67E22", "strokeWidth": 1.5}},
            {"id": "stomach-rugae1", "type": "path", "attrs": {"d": "M 210 180 Q 230 175 250 180"}, "style": {"fill": "none", "stroke": "#E8C9A0", "strokeWidth": 1}},
            {"id": "stomach-rugae2", "type": "path", "attrs": {"d": "M 215 200 Q 235 195 255 200"}, "style": {"fill": "none", "stroke": "#E8C9A0", "strokeWidth": 1}},
            {"id": "liver", "type": "path", "attrs": {"d": "M 140 130 Q 128 140 130 165 Q 132 190 150 195 Q 170 200 190 192 Q 205 185 210 165 Q 215 145 200 132 Q 185 125 165 125 Q 148 125 140 130 Z"}, "label": "Liver", "selectable": true, "style": {"fill": "#C39B7E", "stroke": "#8B5E3C", "strokeWidth": 1.5}},
            {"id": "liver-detail1", "type": "path", "attrs": {"d": "M 155 150 Q 175 145 190 155"}, "style": {"fill": "none", "stroke": "#A07050", "strokeWidth": 0.8}},
            {"id": "liver-detail2", "type": "path", "attrs": {"d": "M 150 170 Q 170 165 185 172"}, "style": {"fill": "none", "stroke": "#A07050", "strokeWidth": 0.8}},
            {"id": "gallbladder", "type": "path", "attrs": {"d": "M 200 185 Q 205 195 202 205 Q 198 210 195 205 Q 192 195 200 185 Z"}, "label": "Gallbladder", "selectable": true, "style": {"fill": "#A8E6CF", "stroke": "#27AE60", "strokeWidth": 1.5}},
            {"id": "bile-duct", "type": "path", "attrs": {"d": "M 198 207 Q 210 225 225 240"}, "style": {"fill": "none", "stroke": "#27AE60", "strokeWidth": 1}},
            {"id": "pancreas", "type": "path", "attrs": {"d": "M 270 258 Q 290 252 310 254 Q 330 256 340 260 Q 345 264 335 268 Q 320 270 300 268 Q 280 266 270 262 Z"}, "label": "Pancreas", "selectable": true, "style": {"fill": "#FAD7A0", "stroke": "#D4AC0D", "strokeWidth": 1.5}},
            {"id": "sm-int", "type": "path", "attrs": {"d": "M 245 268 Q 210 280 215 300 Q 220 320 250 315 Q 280 310 285 295 Q 290 280 265 278 Q 240 282 238 298 Q 236 310 255 308 Q 270 305 272 290"}, "label": "Small Intestine", "selectable": true, "style": {"fill": "none", "stroke": "#E07050", "strokeWidth": 9}},
            {"id": "sm-int-inner", "type": "path", "attrs": {"d": "M 245 268 Q 210 280 215 300 Q 220 320 250 315 Q 280 310 285 295 Q 290 280 265 278 Q 240 282 238 298 Q 236 310 255 308 Q 270 305 272 290"}, "style": {"fill": "none", "stroke": "#F5B7A5", "strokeWidth": 5}},
            {"id": "lg-int", "type": "path", "attrs": {"d": "M 165 268 L 165 330 Q 165 365 195 365 L 305 365 Q 335 365 335 330 L 335 268"}, "label": "Large Intestine", "selectable": true, "style": {"fill": "none", "stroke": "#8B5E3C", "strokeWidth": 12}},
            {"id": "lg-int-inner", "type": "path", "attrs": {"d": "M 165 268 L 165 330 Q 165 365 195 365 L 305 365 Q 335 365 335 330 L 335 268"}, "style": {"fill": "none", "stroke": "#C4A882", "strokeWidth": 7}}
        ],
        "correctIds": ["liver"],
        "viewBox": {"width": 500, "height": 440},
        "diagramTitle": "Human Digestive System"
    }',
    2,
    ARRAY['biology', 'digestive-system', 'anatomy']
),
-- ============================================================
-- 8) Biology: Animal cell — ATP (detailed with cytoplasm texture, more organelles)
-- ============================================================
(
    'interactive-diagram',
    'Animal Cell: Energy Production',
    'Select the organelle that produces energy (ATP) for the cell.',
    'This bean-shaped organelle is often called the "powerhouse of the cell".',
    '{
        "elements": [
            {"id": "bg", "type": "rect", "attrs": {"x": 0, "y": 0, "width": 500, "height": 420}, "style": {"fill": "#FAFBFC", "stroke": "none"}},
            {"id": "membrane", "type": "ellipse", "attrs": {"cx": 250, "cy": 210, "rx": 210, "ry": 175}, "label": "Cell Membrane", "style": {"fill": "#EDF3F8", "stroke": "#7BA3C9", "strokeWidth": 4}},
            {"id": "membrane-inner", "type": "ellipse", "attrs": {"cx": 250, "cy": 210, "rx": 206, "ry": 171}, "style": {"fill": "none", "stroke": "#A8CCE3", "strokeWidth": 1}},

            {"id": "cyto-dot1", "type": "circle", "attrs": {"cx": 90, "cy": 220, "r": 2}, "style": {"fill": "#D6E4EE"}},
            {"id": "cyto-dot2", "type": "circle", "attrs": {"cx": 410, "cy": 190, "r": 2}, "style": {"fill": "#D6E4EE"}},
            {"id": "cyto-dot3", "type": "circle", "attrs": {"cx": 150, "cy": 330, "r": 2}, "style": {"fill": "#D6E4EE"}},
            {"id": "cyto-dot4", "type": "circle", "attrs": {"cx": 370, "cy": 310, "r": 2}, "style": {"fill": "#D6E4EE"}},

            {"id": "rough-er", "type": "path", "attrs": {"d": "M 165 130 Q 145 150 150 175 Q 155 200 140 220 Q 130 235 140 255"}, "label": "Rough ER", "selectable": true, "style": {"fill": "none", "stroke": "#27AE60", "strokeWidth": 4}},
            {"id": "rough-er2", "type": "path", "attrs": {"d": "M 172 135 Q 152 155 157 180 Q 162 205 147 225 Q 137 240 147 260"}, "style": {"fill": "none", "stroke": "#2ECC71", "strokeWidth": 2}},
            {"id": "rer-rib1", "type": "circle", "attrs": {"cx": 150, "cy": 155, "r": 4}, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1}},
            {"id": "rer-rib2", "type": "circle", "attrs": {"cx": 153, "cy": 185, "r": 4}, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1}},
            {"id": "rer-rib3", "type": "circle", "attrs": {"cx": 144, "cy": 215, "r": 4}, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1}},
            {"id": "rer-rib4", "type": "circle", "attrs": {"cx": 138, "cy": 245, "r": 4}, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1}},

            {"id": "smooth-er", "type": "path", "attrs": {"d": "M 120 270 Q 110 285 115 300 Q 120 310 112 320"}, "label": "Smooth ER", "selectable": true, "style": {"fill": "none", "stroke": "#27AE60", "strokeWidth": 3}},

            {"id": "nucleus-envelope", "type": "circle", "attrs": {"cx": 250, "cy": 205, "r": 65}, "label": "Nucleus", "selectable": true, "style": {"fill": "#D4E6F1", "stroke": "#5B9BD5", "strokeWidth": 3}},
            {"id": "nucleus-inner", "type": "circle", "attrs": {"cx": 250, "cy": 205, "r": 61}, "style": {"fill": "none", "stroke": "#A9CCE3", "strokeWidth": 1}},
            {"id": "nuclear-pore1", "type": "circle", "attrs": {"cx": 205, "cy": 158, "r": 3}, "style": {"fill": "#5B9BD5"}},
            {"id": "nuclear-pore2", "type": "circle", "attrs": {"cx": 300, "cy": 168, "r": 3}, "style": {"fill": "#5B9BD5"}},
            {"id": "nuclear-pore3", "type": "circle", "attrs": {"cx": 290, "cy": 248, "r": 3}, "style": {"fill": "#5B9BD5"}},
            {"id": "chromatin1", "type": "path", "attrs": {"d": "M 225 185 Q 235 180 245 188 Q 255 195 260 185"}, "style": {"fill": "none", "stroke": "#34495E", "strokeWidth": 1.5}},
            {"id": "chromatin2", "type": "path", "attrs": {"d": "M 240 210 Q 250 205 260 212 Q 270 220 275 210"}, "style": {"fill": "none", "stroke": "#34495E", "strokeWidth": 1.5}},
            {"id": "nucleolus", "type": "circle", "attrs": {"cx": 255, "cy": 200, "r": 18}, "style": {"fill": "#85C1E9", "stroke": "#5B9BD5", "strokeWidth": 1.5}},

            {"id": "mito1", "type": "ellipse", "attrs": {"cx": 385, "cy": 165, "rx": 32, "ry": 17}, "label": "Mitochondria", "selectable": true, "style": {"fill": "#F9C0C0", "stroke": "#E74C3C", "strokeWidth": 2}},
            {"id": "mito1-cristae1", "type": "path", "attrs": {"d": "M 362 165 Q 372 155 382 165"}, "style": {"fill": "none", "stroke": "#C0392B", "strokeWidth": 1}},
            {"id": "mito1-cristae2", "type": "path", "attrs": {"d": "M 378 165 Q 388 155 398 165"}, "style": {"fill": "none", "stroke": "#C0392B", "strokeWidth": 1}},
            {"id": "mito1-cristae3", "type": "path", "attrs": {"d": "M 370 165 Q 380 175 390 165"}, "style": {"fill": "none", "stroke": "#C0392B", "strokeWidth": 1}},

            {"id": "mito2", "type": "ellipse", "attrs": {"cx": 135, "cy": 300, "rx": 28, "ry": 15}, "label": "Mitochondria", "selectable": true, "style": {"fill": "#F9C0C0", "stroke": "#E74C3C", "strokeWidth": 2}},
            {"id": "mito2-cristae", "type": "path", "attrs": {"d": "M 118 300 Q 128 290 138 300 Q 148 310 155 300"}, "style": {"fill": "none", "stroke": "#C0392B", "strokeWidth": 1}},

            {"id": "mito3", "type": "ellipse", "attrs": {"cx": 340, "cy": 310, "rx": 25, "ry": 13}, "label": "Mitochondria", "selectable": true, "style": {"fill": "#F9C0C0", "stroke": "#E74C3C", "strokeWidth": 2}},

            {"id": "golgi", "type": "path", "attrs": {"d": "M 345 230 Q 380 224 400 240 M 343 240 Q 378 234 398 250 M 341 250 Q 376 244 396 260 M 339 260 Q 374 254 394 270"}, "label": "Golgi Apparatus", "selectable": true, "style": {"fill": "none", "stroke": "#F39C12", "strokeWidth": 3}},
            {"id": "golgi-vesicle1", "type": "circle", "attrs": {"cx": 405, "cy": 245, "r": 5}, "style": {"fill": "#FDEBD0", "stroke": "#F39C12", "strokeWidth": 1}},
            {"id": "golgi-vesicle2", "type": "circle", "attrs": {"cx": 400, "cy": 260, "r": 4}, "style": {"fill": "#FDEBD0", "stroke": "#F39C12", "strokeWidth": 1}},

            {"id": "ribosome1", "type": "circle", "attrs": {"cx": 300, "cy": 120, "r": 5}, "label": "Ribosome", "selectable": true, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1.5}},
            {"id": "ribosome2", "type": "circle", "attrs": {"cx": 320, "cy": 340, "r": 5}, "label": "Ribosome", "selectable": true, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1.5}},
            {"id": "ribosome3", "type": "circle", "attrs": {"cx": 190, "cy": 310, "r": 5}, "label": "Ribosome", "selectable": true, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1.5}},

            {"id": "lysosome", "type": "circle", "attrs": {"cx": 180, "cy": 115, "r": 14}, "label": "Lysosome", "selectable": true, "style": {"fill": "#AED6F1", "stroke": "#2980B9", "strokeWidth": 1.5}},
            {"id": "lysosome-dots", "type": "path", "attrs": {"d": "M 175 112 L 177 115 M 181 109 L 183 113 M 185 116 L 183 119"}, "style": {"fill": "none", "stroke": "#2980B9", "strokeWidth": 1}},

            {"id": "centriole1", "type": "rect", "attrs": {"x": 380, "y": 100, "width": 6, "height": 25, "rx": 2}, "label": "Centriole", "selectable": true, "style": {"fill": "#BDC3C7", "stroke": "#7F8C8D", "strokeWidth": 1}},
            {"id": "centriole2", "type": "rect", "attrs": {"x": 390, "y": 106, "width": 25, "height": 6, "rx": 2}, "style": {"fill": "#BDC3C7", "stroke": "#7F8C8D", "strokeWidth": 1}}
        ],
        "correctIds": ["mito1"],
        "viewBox": {"width": 500, "height": 420},
        "diagramTitle": "Animal Cell"
    }',
    1,
    ARRAY['biology', 'cells', 'organelles']
),
-- ============================================================
-- 9) Biology: Animal cell — DNA (same detailed cell)
-- ============================================================
(
    'interactive-diagram',
    'Animal Cell: DNA Storage',
    'Select the organelle that stores the cell''s genetic material (DNA).',
    'This large, centrally located organelle contains chromosomes and controls cell activities.',
    '{
        "elements": [
            {"id": "bg", "type": "rect", "attrs": {"x": 0, "y": 0, "width": 500, "height": 420}, "style": {"fill": "#FAFBFC", "stroke": "none"}},
            {"id": "membrane", "type": "ellipse", "attrs": {"cx": 250, "cy": 210, "rx": 210, "ry": 175}, "label": "Cell Membrane", "style": {"fill": "#EDF3F8", "stroke": "#7BA3C9", "strokeWidth": 4}},
            {"id": "membrane-inner", "type": "ellipse", "attrs": {"cx": 250, "cy": 210, "rx": 206, "ry": 171}, "style": {"fill": "none", "stroke": "#A8CCE3", "strokeWidth": 1}},
            {"id": "rough-er", "type": "path", "attrs": {"d": "M 165 130 Q 145 150 150 175 Q 155 200 140 220 Q 130 235 140 255"}, "label": "Rough ER", "selectable": true, "style": {"fill": "none", "stroke": "#27AE60", "strokeWidth": 4}},
            {"id": "rough-er2", "type": "path", "attrs": {"d": "M 172 135 Q 152 155 157 180 Q 162 205 147 225 Q 137 240 147 260"}, "style": {"fill": "none", "stroke": "#2ECC71", "strokeWidth": 2}},
            {"id": "nucleus-envelope", "type": "circle", "attrs": {"cx": 250, "cy": 205, "r": 65}, "label": "Nucleus", "selectable": true, "style": {"fill": "#D4E6F1", "stroke": "#5B9BD5", "strokeWidth": 3}},
            {"id": "nucleus-inner", "type": "circle", "attrs": {"cx": 250, "cy": 205, "r": 61}, "style": {"fill": "none", "stroke": "#A9CCE3", "strokeWidth": 1}},
            {"id": "nuclear-pore1", "type": "circle", "attrs": {"cx": 205, "cy": 158, "r": 3}, "style": {"fill": "#5B9BD5"}},
            {"id": "nuclear-pore2", "type": "circle", "attrs": {"cx": 300, "cy": 168, "r": 3}, "style": {"fill": "#5B9BD5"}},
            {"id": "chromatin1", "type": "path", "attrs": {"d": "M 225 185 Q 235 180 245 188 Q 255 195 260 185"}, "style": {"fill": "none", "stroke": "#34495E", "strokeWidth": 1.5}},
            {"id": "chromatin2", "type": "path", "attrs": {"d": "M 240 210 Q 250 205 260 212 Q 270 220 275 210"}, "style": {"fill": "none", "stroke": "#34495E", "strokeWidth": 1.5}},
            {"id": "nucleolus", "type": "circle", "attrs": {"cx": 255, "cy": 200, "r": 18}, "style": {"fill": "#85C1E9", "stroke": "#5B9BD5", "strokeWidth": 1.5}},
            {"id": "mito1", "type": "ellipse", "attrs": {"cx": 385, "cy": 165, "rx": 32, "ry": 17}, "label": "Mitochondria", "selectable": true, "style": {"fill": "#F9C0C0", "stroke": "#E74C3C", "strokeWidth": 2}},
            {"id": "mito1-cristae1", "type": "path", "attrs": {"d": "M 362 165 Q 372 155 382 165"}, "style": {"fill": "none", "stroke": "#C0392B", "strokeWidth": 1}},
            {"id": "mito1-cristae2", "type": "path", "attrs": {"d": "M 378 165 Q 388 155 398 165"}, "style": {"fill": "none", "stroke": "#C0392B", "strokeWidth": 1}},
            {"id": "mito2", "type": "ellipse", "attrs": {"cx": 135, "cy": 300, "rx": 28, "ry": 15}, "label": "Mitochondria", "selectable": true, "style": {"fill": "#F9C0C0", "stroke": "#E74C3C", "strokeWidth": 2}},
            {"id": "golgi", "type": "path", "attrs": {"d": "M 345 230 Q 380 224 400 240 M 343 240 Q 378 234 398 250 M 341 250 Q 376 244 396 260 M 339 260 Q 374 254 394 270"}, "label": "Golgi Apparatus", "selectable": true, "style": {"fill": "none", "stroke": "#F39C12", "strokeWidth": 3}},
            {"id": "ribosome1", "type": "circle", "attrs": {"cx": 300, "cy": 120, "r": 5}, "label": "Ribosome", "selectable": true, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1.5}},
            {"id": "lysosome", "type": "circle", "attrs": {"cx": 180, "cy": 115, "r": 14}, "label": "Lysosome", "selectable": true, "style": {"fill": "#AED6F1", "stroke": "#2980B9", "strokeWidth": 1.5}},
            {"id": "centriole1", "type": "rect", "attrs": {"x": 380, "y": 100, "width": 6, "height": 25, "rx": 2}, "label": "Centriole", "selectable": true, "style": {"fill": "#BDC3C7", "stroke": "#7F8C8D", "strokeWidth": 1}},
            {"id": "centriole2", "type": "rect", "attrs": {"x": 390, "y": 106, "width": 25, "height": 6, "rx": 2}, "style": {"fill": "#BDC3C7", "stroke": "#7F8C8D", "strokeWidth": 1}}
        ],
        "correctIds": ["nucleus-envelope"],
        "viewBox": {"width": 500, "height": 420},
        "diagramTitle": "Animal Cell"
    }',
    1,
    ARRAY['biology', 'cells', 'organelles']
),
-- ============================================================
-- 10) Physics: Circuit — current measurement (detailed with labels, ground, voltmeter)
-- ============================================================
(
    'interactive-diagram',
    'Circuit: Current Measurement',
    'Select the component that measures electric current.',
    'This component is represented by a circle with the letter "A" inside — it is connected in series.',
    '{
        "elements": [
            {"id": "bg", "type": "rect", "attrs": {"x": 0, "y": 0, "width": 500, "height": 400}, "style": {"fill": "#FAFBFC", "stroke": "none"}},

            {"id": "wire-tl", "type": "line", "attrs": {"x1": 100, "y1": 80, "x2": 160, "y2": 80}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "wire-tr", "type": "line", "attrs": {"x1": 280, "y1": 80, "x2": 400, "y2": 80}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "wire-right", "type": "line", "attrs": {"x1": 400, "y1": 80, "x2": 400, "y2": 320}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "wire-bl", "type": "line", "attrs": {"x1": 100, "y1": 320, "x2": 190, "y2": 320}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "wire-br", "type": "line", "attrs": {"x1": 310, "y1": 320, "x2": 400, "y2": 320}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "wire-left-top", "type": "line", "attrs": {"x1": 100, "y1": 80, "x2": 100, "y2": 160}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "wire-left-bot", "type": "line", "attrs": {"x1": 100, "y1": 240, "x2": 100, "y2": 320}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},

            {"id": "node-tl", "type": "circle", "attrs": {"cx": 100, "cy": 80, "r": 4}, "style": {"fill": "#2D3436"}},
            {"id": "node-tr", "type": "circle", "attrs": {"cx": 400, "cy": 80, "r": 4}, "style": {"fill": "#2D3436"}},
            {"id": "node-bl", "type": "circle", "attrs": {"cx": 100, "cy": 320, "r": 4}, "style": {"fill": "#2D3436"}},
            {"id": "node-br", "type": "circle", "attrs": {"cx": 400, "cy": 320, "r": 4}, "style": {"fill": "#2D3436"}},

            {"id": "batt-body", "type": "rect", "attrs": {"x": 80, "y": 160, "width": 40, "height": 80, "rx": 5}, "label": "Battery", "selectable": true, "style": {"fill": "#F0F0F0", "stroke": "#555", "strokeWidth": 2}},
            {"id": "batt-line-long", "type": "line", "attrs": {"x1": 86, "y1": 175, "x2": 114, "y2": 175}, "style": {"stroke": "#E74C3C", "strokeWidth": 3}},
            {"id": "batt-line-short", "type": "line", "attrs": {"x1": 92, "y1": 185, "x2": 108, "y2": 185}, "style": {"stroke": "#3498DB", "strokeWidth": 3}},
            {"id": "batt-plus", "type": "text", "attrs": {"x": 68, "y": 178, "content": "+", "fontSize": 14, "fontWeight": "bold", "textAnchor": "end"}, "style": {"fill": "#E74C3C"}},
            {"id": "batt-minus", "type": "text", "attrs": {"x": 68, "y": 192, "content": "\u2013", "fontSize": 14, "fontWeight": "bold", "textAnchor": "end"}, "style": {"fill": "#3498DB"}},
            {"id": "batt-label", "type": "text", "attrs": {"x": 100, "y": 215, "content": "12V", "fontSize": 11, "fontWeight": "bold"}, "style": {"fill": "#777"}},

            {"id": "resistor-body", "type": "rect", "attrs": {"x": 170, "y": 60, "width": 100, "height": 40, "rx": 3}, "label": "Resistor", "selectable": true, "style": {"fill": "#FDEBD0", "stroke": "#E67E22", "strokeWidth": 2}},
            {"id": "resistor-zigzag", "type": "polyline", "attrs": {"points": "170,80 182,62 198,98 214,62 230,98 246,62 258,80 270,80"}, "style": {"stroke": "#E67E22", "strokeWidth": 2}},
            {"id": "resistor-band1", "type": "line", "attrs": {"x1": 188, "y1": 60, "x2": 188, "y2": 100}, "style": {"stroke": "#E74C3C", "strokeWidth": 3}},
            {"id": "resistor-band2", "type": "line", "attrs": {"x1": 200, "y1": 60, "x2": 200, "y2": 100}, "style": {"stroke": "#9B59B6", "strokeWidth": 3}},
            {"id": "resistor-band3", "type": "line", "attrs": {"x1": 240, "y1": 60, "x2": 240, "y2": 100}, "style": {"stroke": "#F1C40F", "strokeWidth": 3}},
            {"id": "res-label", "type": "text", "attrs": {"x": 220, "y": 50, "content": "R = 4\u03a9", "fontSize": 11, "fontWeight": "bold"}, "style": {"fill": "#777"}},

            {"id": "bulb-outer", "type": "circle", "attrs": {"cx": 400, "cy": 200, "r": 30}, "label": "Light Bulb", "selectable": true, "style": {"fill": "#FFFDE7", "stroke": "#F9A825", "strokeWidth": 2.5}},
            {"id": "bulb-filament1", "type": "path", "attrs": {"d": "M 390 190 Q 400 180 410 190"}, "style": {"fill": "none", "stroke": "#FF8F00", "strokeWidth": 1.5}},
            {"id": "bulb-filament2", "type": "path", "attrs": {"d": "M 390 200 Q 400 190 410 200"}, "style": {"fill": "none", "stroke": "#FF8F00", "strokeWidth": 1.5}},
            {"id": "bulb-filament3", "type": "path", "attrs": {"d": "M 390 210 Q 400 200 410 210"}, "style": {"fill": "none", "stroke": "#FF8F00", "strokeWidth": 1.5}},
            {"id": "bulb-glow", "type": "circle", "attrs": {"cx": 400, "cy": 200, "r": 38}, "style": {"fill": "none", "stroke": "#FFF9C4", "strokeWidth": 4, "opacity": 0.4}},

            {"id": "ammeter-outer", "type": "circle", "attrs": {"cx": 250, "cy": 320, "r": 30}, "label": "Ammeter", "selectable": true, "style": {"fill": "#F0F0F0", "stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "ammeter-inner", "type": "circle", "attrs": {"cx": 250, "cy": 320, "r": 25}, "style": {"fill": "#FFFFFF", "stroke": "#BDC3C7", "strokeWidth": 1}},
            {"id": "ammeter-letter", "type": "text", "attrs": {"x": 250, "y": 327, "content": "A", "fontSize": 22, "fontWeight": "bold"}, "style": {"fill": "#E74C3C"}},
            {"id": "ammeter-needle", "type": "line", "attrs": {"x1": 250, "y1": 332, "x2": 265, "y2": 308}, "style": {"stroke": "#E74C3C", "strokeWidth": 1.5}},

            {"id": "switch-pivot", "type": "circle", "attrs": {"cx": 330, "cy": 80, "r": 5}, "style": {"fill": "#2D3436"}},
            {"id": "switch-arm", "type": "line", "attrs": {"x1": 330, "y1": 80, "x2": 370, "y2": 58}, "style": {"stroke": "#2D3436", "strokeWidth": 3}},
            {"id": "switch-contact", "type": "circle", "attrs": {"cx": 370, "cy": 80, "r": 4}, "style": {"fill": "none", "stroke": "#2D3436", "strokeWidth": 2}},
            {"id": "switch-body", "type": "rect", "attrs": {"x": 322, "y": 55, "width": 56, "height": 35, "rx": 4}, "label": "Switch", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#777", "strokeWidth": 1, "opacity": 0.25}},
            {"id": "switch-label", "type": "text", "attrs": {"x": 350, "y": 48, "content": "S", "fontSize": 12, "fontWeight": "bold"}, "style": {"fill": "#777"}},

            {"id": "current-arrow1", "type": "polygon", "attrs": {"points": "145,75 155,80 145,85"}, "style": {"fill": "#00B894"}},
            {"id": "current-arrow2", "type": "polygon", "attrs": {"points": "395,120 400,110 405,120"}, "style": {"fill": "#00B894"}},
            {"id": "current-label", "type": "text", "attrs": {"x": 420, "y": 118, "content": "I", "fontSize": 12, "fontWeight": "bold"}, "style": {"fill": "#00B894"}}
        ],
        "correctIds": ["ammeter-outer"],
        "viewBox": {"width": 500, "height": 400},
        "diagramTitle": "Series Circuit"
    }',
    2,
    ARRAY['physics', 'circuits', 'electricity']
),
-- ============================================================
-- 11) Physics: Circuit — energy source (same detailed circuit)
-- ============================================================
(
    'interactive-diagram',
    'Circuit: Energy Source',
    'Select the energy source in this circuit.',
    'Look for the component with + and - terminals that provides voltage to the circuit.',
    '{
        "elements": [
            {"id": "bg", "type": "rect", "attrs": {"x": 0, "y": 0, "width": 500, "height": 400}, "style": {"fill": "#FAFBFC", "stroke": "none"}},
            {"id": "wire-tl", "type": "line", "attrs": {"x1": 100, "y1": 80, "x2": 160, "y2": 80}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "wire-tr", "type": "line", "attrs": {"x1": 280, "y1": 80, "x2": 400, "y2": 80}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "wire-right", "type": "line", "attrs": {"x1": 400, "y1": 80, "x2": 400, "y2": 320}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "wire-bl", "type": "line", "attrs": {"x1": 100, "y1": 320, "x2": 190, "y2": 320}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "wire-br", "type": "line", "attrs": {"x1": 310, "y1": 320, "x2": 400, "y2": 320}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "wire-left-top", "type": "line", "attrs": {"x1": 100, "y1": 80, "x2": 100, "y2": 160}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "wire-left-bot", "type": "line", "attrs": {"x1": 100, "y1": 240, "x2": 100, "y2": 320}, "style": {"stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "node-tl", "type": "circle", "attrs": {"cx": 100, "cy": 80, "r": 4}, "style": {"fill": "#2D3436"}},
            {"id": "node-tr", "type": "circle", "attrs": {"cx": 400, "cy": 80, "r": 4}, "style": {"fill": "#2D3436"}},
            {"id": "node-bl", "type": "circle", "attrs": {"cx": 100, "cy": 320, "r": 4}, "style": {"fill": "#2D3436"}},
            {"id": "node-br", "type": "circle", "attrs": {"cx": 400, "cy": 320, "r": 4}, "style": {"fill": "#2D3436"}},

            {"id": "batt-body", "type": "rect", "attrs": {"x": 80, "y": 160, "width": 40, "height": 80, "rx": 5}, "label": "Battery", "selectable": true, "style": {"fill": "#F0F0F0", "stroke": "#555", "strokeWidth": 2}},
            {"id": "batt-line-long", "type": "line", "attrs": {"x1": 86, "y1": 175, "x2": 114, "y2": 175}, "style": {"stroke": "#E74C3C", "strokeWidth": 3}},
            {"id": "batt-line-short", "type": "line", "attrs": {"x1": 92, "y1": 185, "x2": 108, "y2": 185}, "style": {"stroke": "#3498DB", "strokeWidth": 3}},
            {"id": "batt-plus", "type": "text", "attrs": {"x": 68, "y": 178, "content": "+", "fontSize": 14, "fontWeight": "bold", "textAnchor": "end"}, "style": {"fill": "#E74C3C"}},
            {"id": "batt-minus", "type": "text", "attrs": {"x": 68, "y": 192, "content": "\u2013", "fontSize": 14, "fontWeight": "bold", "textAnchor": "end"}, "style": {"fill": "#3498DB"}},

            {"id": "resistor-body", "type": "rect", "attrs": {"x": 170, "y": 60, "width": 100, "height": 40, "rx": 3}, "label": "Resistor", "selectable": true, "style": {"fill": "#FDEBD0", "stroke": "#E67E22", "strokeWidth": 2}},
            {"id": "resistor-zigzag", "type": "polyline", "attrs": {"points": "170,80 182,62 198,98 214,62 230,98 246,62 258,80 270,80"}, "style": {"stroke": "#E67E22", "strokeWidth": 2}},

            {"id": "bulb-outer", "type": "circle", "attrs": {"cx": 400, "cy": 200, "r": 30}, "label": "Light Bulb", "selectable": true, "style": {"fill": "#FFFDE7", "stroke": "#F9A825", "strokeWidth": 2.5}},
            {"id": "bulb-filament1", "type": "path", "attrs": {"d": "M 390 190 Q 400 180 410 190"}, "style": {"fill": "none", "stroke": "#FF8F00", "strokeWidth": 1.5}},
            {"id": "bulb-filament2", "type": "path", "attrs": {"d": "M 390 200 Q 400 190 410 200"}, "style": {"fill": "none", "stroke": "#FF8F00", "strokeWidth": 1.5}},
            {"id": "bulb-filament3", "type": "path", "attrs": {"d": "M 390 210 Q 400 200 410 210"}, "style": {"fill": "none", "stroke": "#FF8F00", "strokeWidth": 1.5}},

            {"id": "ammeter-outer", "type": "circle", "attrs": {"cx": 250, "cy": 320, "r": 30}, "label": "Ammeter", "selectable": true, "style": {"fill": "#F0F0F0", "stroke": "#2D3436", "strokeWidth": 2.5}},
            {"id": "ammeter-inner", "type": "circle", "attrs": {"cx": 250, "cy": 320, "r": 25}, "style": {"fill": "#FFFFFF", "stroke": "#BDC3C7", "strokeWidth": 1}},
            {"id": "ammeter-letter", "type": "text", "attrs": {"x": 250, "y": 327, "content": "A", "fontSize": 22, "fontWeight": "bold"}, "style": {"fill": "#E74C3C"}}
        ],
        "correctIds": ["batt-body"],
        "viewBox": {"width": 500, "height": 400},
        "diagramTitle": "Series Circuit"
    }',
    1,
    ARRAY['physics', 'circuits', 'electricity']
),
-- ============================================================
-- 12) Anatomy: Heart — detailed with vessels, valves, flow arrows
-- ============================================================
(
    'interactive-diagram',
    'Heart: Pulmonary Circulation',
    'Which chamber pumps blood to the lungs?',
    'Blood flows from this lower-right chamber (your left when facing the diagram) through the pulmonary artery to reach the lungs.',
    '{
        "elements": [
            {"id": "bg", "type": "rect", "attrs": {"x": 0, "y": 0, "width": 500, "height": 440}, "style": {"fill": "#FAFBFC", "stroke": "none"}},

            {"id": "pericardium", "type": "path", "attrs": {"d": "M 250 55 Q 130 30 95 130 Q 60 230 145 330 Q 215 400 250 420 Q 285 400 355 330 Q 440 230 405 130 Q 370 30 250 55 Z"}, "style": {"fill": "#FFF5F5", "stroke": "#FFCDD2", "strokeWidth": 2}},

            {"id": "heart-outline", "type": "path", "attrs": {"d": "M 250 75 Q 145 48 115 135 Q 85 222 160 310 Q 220 375 250 395 Q 280 375 340 310 Q 415 222 385 135 Q 355 48 250 75 Z"}, "style": {"fill": "#FCE4EC", "stroke": "#C62828", "strokeWidth": 2.5}},

            {"id": "svc", "type": "path", "attrs": {"d": "M 170 75 L 170 40 L 185 40 L 185 80"}, "label": "Superior Vena Cava", "style": {"fill": "#BBDEFB", "stroke": "#1565C0", "strokeWidth": 3}},
            {"id": "svc-label", "type": "text", "attrs": {"x": 110, "y": 35, "content": "SVC", "fontSize": 10, "fontWeight": "bold", "textAnchor": "end"}, "style": {"fill": "#1565C0"}},
            {"id": "ivc", "type": "path", "attrs": {"d": "M 170 340 L 170 410 L 185 410 L 185 335"}, "label": "Inferior Vena Cava", "style": {"fill": "#BBDEFB", "stroke": "#1565C0", "strokeWidth": 3}},
            {"id": "ivc-label", "type": "text", "attrs": {"x": 110, "y": 410, "content": "IVC", "fontSize": 10, "fontWeight": "bold", "textAnchor": "end"}, "style": {"fill": "#1565C0"}},

            {"id": "pulm-art", "type": "path", "attrs": {"d": "M 210 115 Q 200 80 170 65 Q 140 55 120 70"}, "label": "Pulmonary Artery", "style": {"fill": "none", "stroke": "#1565C0", "strokeWidth": 5}},
            {"id": "pulm-art-inner", "type": "path", "attrs": {"d": "M 210 115 Q 200 80 170 65 Q 140 55 120 70"}, "style": {"fill": "none", "stroke": "#64B5F6", "strokeWidth": 2}},
            {"id": "pa-arrow", "type": "polygon", "attrs": {"points": "120,65 125,75 115,73"}, "style": {"fill": "#1565C0"}},
            {"id": "pa-label", "type": "text", "attrs": {"x": 95, "y": 62, "content": "Pulmonary", "fontSize": 10, "fontWeight": "bold", "textAnchor": "end"}, "style": {"fill": "#1565C0"}},
            {"id": "pa-label2", "type": "text", "attrs": {"x": 95, "y": 73, "content": "Artery", "fontSize": 10, "fontWeight": "bold", "textAnchor": "end"}, "style": {"fill": "#1565C0"}},

            {"id": "pulm-vein", "type": "path", "attrs": {"d": "M 370 70 Q 340 55 310 70 Q 295 80 290 115"}, "label": "Pulmonary Veins", "style": {"fill": "none", "stroke": "#C62828", "strokeWidth": 5}},
            {"id": "pulm-vein-inner", "type": "path", "attrs": {"d": "M 370 70 Q 340 55 310 70 Q 295 80 290 115"}, "style": {"fill": "none", "stroke": "#EF9A9A", "strokeWidth": 2}},
            {"id": "pv-arrow", "type": "polygon", "attrs": {"points": "288,110 293,118 283,116"}, "style": {"fill": "#C62828"}},
            {"id": "pv-label", "type": "text", "attrs": {"x": 405, "y": 62, "content": "Pulmonary", "fontSize": 10, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#C62828"}},
            {"id": "pv-label2", "type": "text", "attrs": {"x": 405, "y": 73, "content": "Veins", "fontSize": 10, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#C62828"}},

            {"id": "aorta", "type": "path", "attrs": {"d": "M 290 115 Q 310 75 350 65 Q 390 55 420 80 Q 440 100 430 135"}, "label": "Aorta", "style": {"fill": "none", "stroke": "#C62828", "strokeWidth": 6}},
            {"id": "aorta-inner", "type": "path", "attrs": {"d": "M 290 115 Q 310 75 350 65 Q 390 55 420 80 Q 440 100 430 135"}, "style": {"fill": "none", "stroke": "#EF9A9A", "strokeWidth": 3}},
            {"id": "aorta-arrow", "type": "polygon", "attrs": {"points": "432,130 427,140 437,138"}, "style": {"fill": "#C62828"}},
            {"id": "aorta-label", "type": "text", "attrs": {"x": 405, "y": 148, "content": "Aorta", "fontSize": 10, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#C62828"}},

            {"id": "septum-v", "type": "line", "attrs": {"x1": 250, "y1": 130, "x2": 250, "y2": 360}, "style": {"stroke": "#8D6E63", "strokeWidth": 6}},
            {"id": "septum-h", "type": "line", "attrs": {"x1": 125, "y1": 220, "x2": 375, "y2": 220}, "style": {"stroke": "#8D6E63", "strokeWidth": 3}},
            {"id": "septum-label", "type": "text", "attrs": {"x": 250, "y": 385, "content": "Septum", "fontSize": 10}, "style": {"fill": "#8D6E63"}},

            {"id": "tricuspid-valve", "type": "path", "attrs": {"d": "M 160 215 L 180 225 L 160 235"}, "style": {"fill": "none", "stroke": "#4CAF50", "strokeWidth": 2}},
            {"id": "mitral-valve", "type": "path", "attrs": {"d": "M 340 215 L 320 225 L 340 235"}, "style": {"fill": "none", "stroke": "#4CAF50", "strokeWidth": 2}},

            {"id": "right-atrium", "type": "polygon", "attrs": {"points": "250,130 250,220 125,220 118,180 122,145 140,118 175,95 215,82 250,75"}, "label": "Right Atrium", "selectable": true, "style": {"fill": "#BBDEFB", "stroke": "#1565C0", "strokeWidth": 1.5, "opacity": 0.7}},
            {"id": "right-ventricle", "type": "polygon", "attrs": {"points": "250,220 250,360 222,372 192,348 165,310 145,268 128,232 125,220"}, "label": "Right Ventricle", "selectable": true, "style": {"fill": "#90CAF9", "stroke": "#1565C0", "strokeWidth": 1.5, "opacity": 0.7}},
            {"id": "left-atrium", "type": "polygon", "attrs": {"points": "250,130 250,220 375,220 378,180 375,145 360,118 325,95 285,82 250,75"}, "label": "Left Atrium", "selectable": true, "style": {"fill": "#EF9A9A", "stroke": "#C62828", "strokeWidth": 1.5, "opacity": 0.7}},
            {"id": "left-ventricle", "type": "polygon", "attrs": {"points": "250,220 250,360 278,372 308,348 335,310 355,268 372,232 375,220"}, "label": "Left Ventricle", "selectable": true, "style": {"fill": "#E57373", "stroke": "#C62828", "strokeWidth": 1.5, "opacity": 0.7}},

            {"id": "ra-label", "type": "text", "attrs": {"x": 183, "y": 180, "content": "RA", "fontSize": 16, "fontWeight": "bold"}, "style": {"fill": "#1565C0"}},
            {"id": "rv-label", "type": "text", "attrs": {"x": 183, "y": 290, "content": "RV", "fontSize": 16, "fontWeight": "bold"}, "style": {"fill": "#1565C0"}},
            {"id": "la-label", "type": "text", "attrs": {"x": 310, "y": 180, "content": "LA", "fontSize": 16, "fontWeight": "bold"}, "style": {"fill": "#C62828"}},
            {"id": "lv-label", "type": "text", "attrs": {"x": 310, "y": 290, "content": "LV", "fontSize": 16, "fontWeight": "bold"}, "style": {"fill": "#C62828"}},

            {"id": "flow-ra", "type": "polygon", "attrs": {"points": "180,195 185,205 175,205"}, "style": {"fill": "#1565C0", "opacity": 0.5}},
            {"id": "flow-rv", "type": "polygon", "attrs": {"points": "195,245 200,255 190,255"}, "style": {"fill": "#1565C0", "opacity": 0.5}},
            {"id": "flow-la", "type": "polygon", "attrs": {"points": "320,195 325,205 315,205"}, "style": {"fill": "#C62828", "opacity": 0.5}},
            {"id": "flow-lv", "type": "polygon", "attrs": {"points": "305,245 310,255 300,255"}, "style": {"fill": "#C62828", "opacity": 0.5}},

            {"id": "deox-label", "type": "text", "attrs": {"x": 60, "y": 200, "content": "Deoxygenated", "fontSize": 9, "textAnchor": "end"}, "style": {"fill": "#1565C0"}},
            {"id": "deox-label2", "type": "text", "attrs": {"x": 60, "y": 210, "content": "Blood", "fontSize": 9, "textAnchor": "end"}, "style": {"fill": "#1565C0"}},
            {"id": "ox-label", "type": "text", "attrs": {"x": 440, "y": 200, "content": "Oxygenated", "fontSize": 9, "textAnchor": "start"}, "style": {"fill": "#C62828"}},
            {"id": "ox-label2", "type": "text", "attrs": {"x": 440, "y": 210, "content": "Blood", "fontSize": 9, "textAnchor": "start"}, "style": {"fill": "#C62828"}}
        ],
        "correctIds": ["right-ventricle"],
        "viewBox": {"width": 500, "height": 440},
        "diagramTitle": "Human Heart — Cross Section"
    }',
    3,
    ARRAY['anatomy', 'heart', 'circulatory-system']
);
