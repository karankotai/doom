-- Migration: 031_interactive_diagram_seed
-- Description: Seed interactive diagram applets across geometry, biology, physics, anatomy

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
-- ============================================================
-- 1) Geometry: Corresponding angles
-- ============================================================
(
    'interactive-diagram',
    'Corresponding Angles',
    'Select a pair of corresponding angles formed by the transversal.',
    'Corresponding angles are in the same position at each intersection — one above and one below, on the same side of the transversal.',
    '{
        "elements": [
            {"id": "line-top", "type": "line", "attrs": {"x1": 30, "y1": 140, "x2": 470, "y2": 140}, "style": {"stroke": "#333", "strokeWidth": 2.5}},
            {"id": "line-bot", "type": "line", "attrs": {"x1": 30, "y1": 280, "x2": 470, "y2": 280}, "style": {"stroke": "#333", "strokeWidth": 2.5}},
            {"id": "transversal", "type": "line", "attrs": {"x1": 130, "y1": 30, "x2": 370, "y2": 390}, "style": {"stroke": "#555", "strokeWidth": 2.5}},
            {"id": "label-l1", "type": "text", "attrs": {"x": 475, "y": 135, "content": "l\u2081", "fontSize": 16, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#333"}},
            {"id": "label-l2", "type": "text", "attrs": {"x": 475, "y": 275, "content": "l\u2082", "fontSize": 16, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#333"}},
            {"id": "label-t", "type": "text", "attrs": {"x": 135, "y": 24, "content": "t", "fontSize": 16, "fontWeight": "bold", "textAnchor": "middle"}, "style": {"fill": "#555"}},
            {"id": "label-1", "type": "text", "attrs": {"x": 175, "y": 128, "content": "1", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-2", "type": "text", "attrs": {"x": 220, "y": 128, "content": "2", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-3", "type": "text", "attrs": {"x": 220, "y": 158, "content": "3", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-4", "type": "text", "attrs": {"x": 175, "y": 158, "content": "4", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-5", "type": "text", "attrs": {"x": 265, "y": 268, "content": "5", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-6", "type": "text", "attrs": {"x": 310, "y": 268, "content": "6", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-7", "type": "text", "attrs": {"x": 310, "y": 298, "content": "7", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-8", "type": "text", "attrs": {"x": 265, "y": 298, "content": "8", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "angle-1", "type": "polygon", "attrs": {"points": "200,140 150,140 178,80"}, "label": "Angle 1", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-2", "type": "polygon", "attrs": {"points": "200,140 250,140 222,80"}, "label": "Angle 2", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-3", "type": "polygon", "attrs": {"points": "200,140 250,140 222,200"}, "label": "Angle 3", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-4", "type": "polygon", "attrs": {"points": "200,140 150,140 178,200"}, "label": "Angle 4", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-5", "type": "polygon", "attrs": {"points": "290,280 240,280 268,220"}, "label": "Angle 5", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-6", "type": "polygon", "attrs": {"points": "290,280 340,280 312,220"}, "label": "Angle 6", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-7", "type": "polygon", "attrs": {"points": "290,280 340,280 312,340"}, "label": "Angle 7", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-8", "type": "polygon", "attrs": {"points": "290,280 240,280 268,340"}, "label": "Angle 8", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}}
        ],
        "correctIds": ["angle-1", "angle-5"],
        "viewBox": {"width": 500, "height": 400},
        "diagramTitle": "Parallel Lines & Transversal"
    }',
    1,
    ARRAY['geometry', 'angles', 'parallel-lines']
),
-- ============================================================
-- 2) Geometry: Alternate interior angles
-- ============================================================
(
    'interactive-diagram',
    'Alternate Interior Angles',
    'Select the pair of alternate interior angles.',
    'Alternate interior angles are between the parallel lines, on opposite sides of the transversal. They are equal.',
    '{
        "elements": [
            {"id": "line-top", "type": "line", "attrs": {"x1": 30, "y1": 140, "x2": 470, "y2": 140}, "style": {"stroke": "#333", "strokeWidth": 2.5}},
            {"id": "line-bot", "type": "line", "attrs": {"x1": 30, "y1": 280, "x2": 470, "y2": 280}, "style": {"stroke": "#333", "strokeWidth": 2.5}},
            {"id": "transversal", "type": "line", "attrs": {"x1": 130, "y1": 30, "x2": 370, "y2": 390}, "style": {"stroke": "#555", "strokeWidth": 2.5}},
            {"id": "label-l1", "type": "text", "attrs": {"x": 475, "y": 135, "content": "l\u2081", "fontSize": 16, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#333"}},
            {"id": "label-l2", "type": "text", "attrs": {"x": 475, "y": 275, "content": "l\u2082", "fontSize": 16, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#333"}},
            {"id": "label-3", "type": "text", "attrs": {"x": 220, "y": 158, "content": "3", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-4", "type": "text", "attrs": {"x": 175, "y": 158, "content": "4", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-5", "type": "text", "attrs": {"x": 265, "y": 268, "content": "5", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-6", "type": "text", "attrs": {"x": 310, "y": 268, "content": "6", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "angle-3", "type": "polygon", "attrs": {"points": "200,140 250,140 222,200"}, "label": "Angle 3", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-4", "type": "polygon", "attrs": {"points": "200,140 150,140 178,200"}, "label": "Angle 4", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-5", "type": "polygon", "attrs": {"points": "290,280 240,280 268,220"}, "label": "Angle 5", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-6", "type": "polygon", "attrs": {"points": "290,280 340,280 312,220"}, "label": "Angle 6", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}}
        ],
        "correctIds": ["angle-3", "angle-6"],
        "viewBox": {"width": 500, "height": 400},
        "diagramTitle": "Parallel Lines & Transversal"
    }',
    1,
    ARRAY['geometry', 'angles', 'parallel-lines']
),
-- ============================================================
-- 3) Geometry: Vertical angles
-- ============================================================
(
    'interactive-diagram',
    'Vertical Angles',
    'Select a pair of vertical (vertically opposite) angles at the top intersection.',
    'Vertical angles are formed by two intersecting lines and are directly opposite each other. They are always equal.',
    '{
        "elements": [
            {"id": "line-top", "type": "line", "attrs": {"x1": 30, "y1": 140, "x2": 470, "y2": 140}, "style": {"stroke": "#333", "strokeWidth": 2.5}},
            {"id": "line-bot", "type": "line", "attrs": {"x1": 30, "y1": 280, "x2": 470, "y2": 280}, "style": {"stroke": "#333", "strokeWidth": 2.5}},
            {"id": "transversal", "type": "line", "attrs": {"x1": 130, "y1": 30, "x2": 370, "y2": 390}, "style": {"stroke": "#555", "strokeWidth": 2.5}},
            {"id": "label-1", "type": "text", "attrs": {"x": 175, "y": 128, "content": "1", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-2", "type": "text", "attrs": {"x": 220, "y": 128, "content": "2", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-3", "type": "text", "attrs": {"x": 220, "y": 158, "content": "3", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-4", "type": "text", "attrs": {"x": 175, "y": 158, "content": "4", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "angle-1", "type": "polygon", "attrs": {"points": "200,140 150,140 178,80"}, "label": "Angle 1", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-2", "type": "polygon", "attrs": {"points": "200,140 250,140 222,80"}, "label": "Angle 2", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-3", "type": "polygon", "attrs": {"points": "200,140 250,140 222,200"}, "label": "Angle 3", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-4", "type": "polygon", "attrs": {"points": "200,140 150,140 178,200"}, "label": "Angle 4", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}}
        ],
        "correctIds": ["angle-1", "angle-3"],
        "viewBox": {"width": 500, "height": 400},
        "diagramTitle": "Parallel Lines & Transversal"
    }',
    1,
    ARRAY['geometry', 'angles', 'vertical-angles']
),
-- ============================================================
-- 4) Geometry: Co-interior (same-side interior) angles
-- ============================================================
(
    'interactive-diagram',
    'Co-interior Angles',
    'Select the pair of co-interior (same-side interior) angles.',
    'Co-interior angles are between the parallel lines on the same side of the transversal. They add up to 180 degrees.',
    '{
        "elements": [
            {"id": "line-top", "type": "line", "attrs": {"x1": 30, "y1": 140, "x2": 470, "y2": 140}, "style": {"stroke": "#333", "strokeWidth": 2.5}},
            {"id": "line-bot", "type": "line", "attrs": {"x1": 30, "y1": 280, "x2": 470, "y2": 280}, "style": {"stroke": "#333", "strokeWidth": 2.5}},
            {"id": "transversal", "type": "line", "attrs": {"x1": 130, "y1": 30, "x2": 370, "y2": 390}, "style": {"stroke": "#555", "strokeWidth": 2.5}},
            {"id": "label-l1", "type": "text", "attrs": {"x": 475, "y": 135, "content": "l\u2081", "fontSize": 16, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#333"}},
            {"id": "label-l2", "type": "text", "attrs": {"x": 475, "y": 275, "content": "l\u2082", "fontSize": 16, "fontWeight": "bold", "textAnchor": "start"}, "style": {"fill": "#333"}},
            {"id": "label-4", "type": "text", "attrs": {"x": 175, "y": 158, "content": "4", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-6", "type": "text", "attrs": {"x": 310, "y": 268, "content": "6", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-3", "type": "text", "attrs": {"x": 220, "y": 158, "content": "3", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "label-5", "type": "text", "attrs": {"x": 265, "y": 268, "content": "5", "fontSize": 13, "fontWeight": "bold"}, "style": {"fill": "#666"}},
            {"id": "angle-4", "type": "polygon", "attrs": {"points": "200,140 150,140 178,200"}, "label": "Angle 4", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-6", "type": "polygon", "attrs": {"points": "290,280 340,280 312,220"}, "label": "Angle 6", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-3", "type": "polygon", "attrs": {"points": "200,140 250,140 222,200"}, "label": "Angle 3", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}},
            {"id": "angle-5", "type": "polygon", "attrs": {"points": "290,280 240,280 268,220"}, "label": "Angle 5", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#888", "strokeWidth": 1}}
        ],
        "correctIds": ["angle-4", "angle-6"],
        "viewBox": {"width": 500, "height": 400},
        "diagramTitle": "Parallel Lines & Transversal"
    }',
    2,
    ARRAY['geometry', 'angles', 'parallel-lines']
),
-- ============================================================
-- 5) Biology: Digestive system — mechanical digestion
-- ============================================================
(
    'interactive-diagram',
    'Digestive System: Mechanical Digestion',
    'Where does mechanical digestion begin? Select the correct organ.',
    'Mechanical digestion involves physically breaking down food — think about chewing.',
    '{
        "elements": [
            {"id": "title-label", "type": "text", "attrs": {"x": 250, "y": 22, "content": "Digestive System", "fontSize": 16, "fontWeight": "bold"}, "style": {"fill": "#333"}},
            {"id": "mouth", "type": "ellipse", "attrs": {"cx": 250, "cy": 55, "rx": 30, "ry": 18}, "label": "Mouth", "selectable": true, "style": {"fill": "#F5C6C6", "stroke": "#C44", "strokeWidth": 1.5}},
            {"id": "mouth-lbl", "type": "text", "attrs": {"x": 295, "y": 60, "content": "?", "fontSize": 12, "textAnchor": "start"}, "style": {"fill": "#999"}},
            {"id": "esophagus", "type": "rect", "attrs": {"x": 243, "y": 73, "width": 14, "height": 60}, "label": "Esophagus", "selectable": true, "style": {"fill": "#F5D0C6", "stroke": "#C64", "strokeWidth": 1.5}},
            {"id": "eso-lbl", "type": "text", "attrs": {"x": 275, "y": 105, "content": "?", "fontSize": 12, "textAnchor": "start"}, "style": {"fill": "#999"}},
            {"id": "stomach", "type": "path", "attrs": {"d": "M 225 135 Q 195 150 198 185 Q 200 220 235 225 Q 270 230 275 195 Q 280 160 260 135 Z"}, "label": "Stomach", "selectable": true, "style": {"fill": "#F5D6C6", "stroke": "#C84", "strokeWidth": 1.5}},
            {"id": "stom-lbl", "type": "text", "attrs": {"x": 290, "y": 180, "content": "?", "fontSize": 12, "textAnchor": "start"}, "style": {"fill": "#999"}},
            {"id": "liver", "type": "path", "attrs": {"d": "M 150 130 Q 130 145 135 170 Q 140 190 165 185 Q 190 180 195 155 Q 198 140 180 130 Z"}, "label": "Liver", "selectable": true, "style": {"fill": "#C6A08A", "stroke": "#8B5E3C", "strokeWidth": 1.5}},
            {"id": "liver-lbl", "type": "text", "attrs": {"x": 115, "y": 160, "content": "?", "fontSize": 12, "textAnchor": "end"}, "style": {"fill": "#999"}},
            {"id": "pancreas", "type": "ellipse", "attrs": {"cx": 300, "cy": 230, "rx": 35, "ry": 10}, "label": "Pancreas", "selectable": true, "style": {"fill": "#F0E68C", "stroke": "#BDB76B", "strokeWidth": 1.5}},
            {"id": "panc-lbl", "type": "text", "attrs": {"x": 345, "y": 235, "content": "?", "fontSize": 12, "textAnchor": "start"}, "style": {"fill": "#999"}},
            {"id": "small-intestine", "type": "path", "attrs": {"d": "M 235 240 Q 200 260 210 280 Q 220 300 250 295 Q 280 290 290 270 Q 300 250 270 245 Q 240 255 235 275 Q 230 290 260 285"}, "label": "Small Intestine", "selectable": true, "style": {"fill": "none", "stroke": "#E07050", "strokeWidth": 8}},
            {"id": "si-lbl", "type": "text", "attrs": {"x": 315, "y": 275, "content": "?", "fontSize": 12, "textAnchor": "start"}, "style": {"fill": "#999"}},
            {"id": "large-intestine", "type": "path", "attrs": {"d": "M 170 250 L 170 310 Q 170 345 200 345 L 300 345 Q 330 345 330 310 L 330 250"}, "label": "Large Intestine", "selectable": true, "style": {"fill": "none", "stroke": "#A0522D", "strokeWidth": 10}},
            {"id": "li-lbl", "type": "text", "attrs": {"x": 340, "y": 310, "content": "?", "fontSize": 12, "textAnchor": "start"}, "style": {"fill": "#999"}}
        ],
        "correctIds": ["mouth"],
        "viewBox": {"width": 500, "height": 380},
        "diagramTitle": "Digestive System"
    }',
    1,
    ARRAY['biology', 'digestive-system', 'anatomy']
),
-- ============================================================
-- 6) Biology: Digestive system — nutrient absorption
-- ============================================================
(
    'interactive-diagram',
    'Digestive System: Nutrient Absorption',
    'Where are most nutrients absorbed? Select the correct organ.',
    'This long, coiled organ has villi that vastly increase its surface area for absorption.',
    '{
        "elements": [
            {"id": "title-label", "type": "text", "attrs": {"x": 250, "y": 22, "content": "Digestive System", "fontSize": 16, "fontWeight": "bold"}, "style": {"fill": "#333"}},
            {"id": "mouth", "type": "ellipse", "attrs": {"cx": 250, "cy": 55, "rx": 30, "ry": 18}, "label": "Mouth", "selectable": true, "style": {"fill": "#F5C6C6", "stroke": "#C44", "strokeWidth": 1.5}},
            {"id": "esophagus", "type": "rect", "attrs": {"x": 243, "y": 73, "width": 14, "height": 60}, "label": "Esophagus", "selectable": true, "style": {"fill": "#F5D0C6", "stroke": "#C64", "strokeWidth": 1.5}},
            {"id": "stomach", "type": "path", "attrs": {"d": "M 225 135 Q 195 150 198 185 Q 200 220 235 225 Q 270 230 275 195 Q 280 160 260 135 Z"}, "label": "Stomach", "selectable": true, "style": {"fill": "#F5D6C6", "stroke": "#C84", "strokeWidth": 1.5}},
            {"id": "liver", "type": "path", "attrs": {"d": "M 150 130 Q 130 145 135 170 Q 140 190 165 185 Q 190 180 195 155 Q 198 140 180 130 Z"}, "label": "Liver", "selectable": true, "style": {"fill": "#C6A08A", "stroke": "#8B5E3C", "strokeWidth": 1.5}},
            {"id": "pancreas", "type": "ellipse", "attrs": {"cx": 300, "cy": 230, "rx": 35, "ry": 10}, "label": "Pancreas", "selectable": true, "style": {"fill": "#F0E68C", "stroke": "#BDB76B", "strokeWidth": 1.5}},
            {"id": "small-intestine", "type": "path", "attrs": {"d": "M 235 240 Q 200 260 210 280 Q 220 300 250 295 Q 280 290 290 270 Q 300 250 270 245 Q 240 255 235 275 Q 230 290 260 285"}, "label": "Small Intestine", "selectable": true, "style": {"fill": "none", "stroke": "#E07050", "strokeWidth": 8}},
            {"id": "large-intestine", "type": "path", "attrs": {"d": "M 170 250 L 170 310 Q 170 345 200 345 L 300 345 Q 330 345 330 310 L 330 250"}, "label": "Large Intestine", "selectable": true, "style": {"fill": "none", "stroke": "#A0522D", "strokeWidth": 10}}
        ],
        "correctIds": ["small-intestine"],
        "viewBox": {"width": 500, "height": 380},
        "diagramTitle": "Digestive System"
    }',
    2,
    ARRAY['biology', 'digestive-system', 'anatomy']
),
-- ============================================================
-- 7) Biology: Digestive system — bile production
-- ============================================================
(
    'interactive-diagram',
    'Digestive System: Bile Production',
    'Which organ produces bile? Select it on the diagram.',
    'This large organ on the right side of the body has many functions including detoxification and bile production.',
    '{
        "elements": [
            {"id": "title-label", "type": "text", "attrs": {"x": 250, "y": 22, "content": "Digestive System", "fontSize": 16, "fontWeight": "bold"}, "style": {"fill": "#333"}},
            {"id": "mouth", "type": "ellipse", "attrs": {"cx": 250, "cy": 55, "rx": 30, "ry": 18}, "label": "Mouth", "selectable": true, "style": {"fill": "#F5C6C6", "stroke": "#C44", "strokeWidth": 1.5}},
            {"id": "esophagus", "type": "rect", "attrs": {"x": 243, "y": 73, "width": 14, "height": 60}, "label": "Esophagus", "selectable": true, "style": {"fill": "#F5D0C6", "stroke": "#C64", "strokeWidth": 1.5}},
            {"id": "stomach", "type": "path", "attrs": {"d": "M 225 135 Q 195 150 198 185 Q 200 220 235 225 Q 270 230 275 195 Q 280 160 260 135 Z"}, "label": "Stomach", "selectable": true, "style": {"fill": "#F5D6C6", "stroke": "#C84", "strokeWidth": 1.5}},
            {"id": "liver", "type": "path", "attrs": {"d": "M 150 130 Q 130 145 135 170 Q 140 190 165 185 Q 190 180 195 155 Q 198 140 180 130 Z"}, "label": "Liver", "selectable": true, "style": {"fill": "#C6A08A", "stroke": "#8B5E3C", "strokeWidth": 1.5}},
            {"id": "pancreas", "type": "ellipse", "attrs": {"cx": 300, "cy": 230, "rx": 35, "ry": 10}, "label": "Pancreas", "selectable": true, "style": {"fill": "#F0E68C", "stroke": "#BDB76B", "strokeWidth": 1.5}},
            {"id": "small-intestine", "type": "path", "attrs": {"d": "M 235 240 Q 200 260 210 280 Q 220 300 250 295 Q 280 290 290 270 Q 300 250 270 245 Q 240 255 235 275 Q 230 290 260 285"}, "label": "Small Intestine", "selectable": true, "style": {"fill": "none", "stroke": "#E07050", "strokeWidth": 8}},
            {"id": "large-intestine", "type": "path", "attrs": {"d": "M 170 250 L 170 310 Q 170 345 200 345 L 300 345 Q 330 345 330 310 L 330 250"}, "label": "Large Intestine", "selectable": true, "style": {"fill": "none", "stroke": "#A0522D", "strokeWidth": 10}}
        ],
        "correctIds": ["liver"],
        "viewBox": {"width": 500, "height": 380},
        "diagramTitle": "Digestive System"
    }',
    2,
    ARRAY['biology', 'digestive-system', 'anatomy']
),
-- ============================================================
-- 8) Biology: Animal cell — ATP production
-- ============================================================
(
    'interactive-diagram',
    'Animal Cell: Energy Production',
    'Select the organelle that produces energy (ATP) for the cell.',
    'This bean-shaped organelle is often called the "powerhouse of the cell".',
    '{
        "elements": [
            {"id": "membrane", "type": "ellipse", "attrs": {"cx": 250, "cy": 200, "rx": 200, "ry": 160}, "label": "Cell Membrane", "style": {"fill": "#F0F4F8", "stroke": "#7BA3C9", "strokeWidth": 3}},
            {"id": "nucleus-outer", "type": "circle", "attrs": {"cx": 250, "cy": 195, "r": 55}, "label": "Nucleus", "selectable": true, "style": {"fill": "#D4E6F1", "stroke": "#5B9BD5", "strokeWidth": 2}},
            {"id": "nucleolus", "type": "circle", "attrs": {"cx": 255, "cy": 190, "r": 15}, "style": {"fill": "#A9CCE3", "stroke": "#5B9BD5", "strokeWidth": 1}},
            {"id": "mitochondria", "type": "ellipse", "attrs": {"cx": 380, "cy": 155, "rx": 30, "ry": 16}, "label": "Mitochondria", "selectable": true, "style": {"fill": "#F9C0C0", "stroke": "#E74C3C", "strokeWidth": 2}},
            {"id": "mito-inner", "type": "path", "attrs": {"d": "M 358 155 Q 370 145 380 155 Q 390 165 402 155"}, "style": {"fill": "none", "stroke": "#E74C3C", "strokeWidth": 1}},
            {"id": "mitochondria2", "type": "ellipse", "attrs": {"cx": 140, "cy": 260, "rx": 28, "ry": 14}, "label": "Mitochondria", "selectable": true, "style": {"fill": "#F9C0C0", "stroke": "#E74C3C", "strokeWidth": 2}},
            {"id": "ribosome1", "type": "circle", "attrs": {"cx": 180, "cy": 140, "r": 6}, "label": "Ribosome", "selectable": true, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1.5}},
            {"id": "ribosome2", "type": "circle", "attrs": {"cx": 195, "cy": 160, "r": 6}, "label": "Ribosome", "selectable": true, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1.5}},
            {"id": "ribosome3", "type": "circle", "attrs": {"cx": 310, "cy": 280, "r": 6}, "label": "Ribosome", "selectable": true, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1.5}},
            {"id": "golgi", "type": "path", "attrs": {"d": "M 330 240 Q 360 235 370 250 M 328 248 Q 358 243 368 258 M 326 256 Q 356 251 366 266"}, "label": "Golgi Apparatus", "selectable": true, "style": {"fill": "none", "stroke": "#F39C12", "strokeWidth": 3}},
            {"id": "er", "type": "path", "attrs": {"d": "M 130 170 Q 115 185 120 200 Q 125 215 115 230 Q 105 240 115 250"}, "label": "Endoplasmic Reticulum", "selectable": true, "style": {"fill": "none", "stroke": "#27AE60", "strokeWidth": 3}}
        ],
        "correctIds": ["mitochondria"],
        "viewBox": {"width": 500, "height": 400},
        "diagramTitle": "Animal Cell"
    }',
    1,
    ARRAY['biology', 'cells', 'organelles']
),
-- ============================================================
-- 9) Biology: Animal cell — DNA storage
-- ============================================================
(
    'interactive-diagram',
    'Animal Cell: DNA Storage',
    'Select the organelle that stores the cell''s genetic material (DNA).',
    'This large, centrally located organelle contains chromosomes and controls cell activities.',
    '{
        "elements": [
            {"id": "membrane", "type": "ellipse", "attrs": {"cx": 250, "cy": 200, "rx": 200, "ry": 160}, "label": "Cell Membrane", "style": {"fill": "#F0F4F8", "stroke": "#7BA3C9", "strokeWidth": 3}},
            {"id": "nucleus-outer", "type": "circle", "attrs": {"cx": 250, "cy": 195, "r": 55}, "label": "Nucleus", "selectable": true, "style": {"fill": "#D4E6F1", "stroke": "#5B9BD5", "strokeWidth": 2}},
            {"id": "nucleolus", "type": "circle", "attrs": {"cx": 255, "cy": 190, "r": 15}, "style": {"fill": "#A9CCE3", "stroke": "#5B9BD5", "strokeWidth": 1}},
            {"id": "mitochondria", "type": "ellipse", "attrs": {"cx": 380, "cy": 155, "rx": 30, "ry": 16}, "label": "Mitochondria", "selectable": true, "style": {"fill": "#F9C0C0", "stroke": "#E74C3C", "strokeWidth": 2}},
            {"id": "mito-inner", "type": "path", "attrs": {"d": "M 358 155 Q 370 145 380 155 Q 390 165 402 155"}, "style": {"fill": "none", "stroke": "#E74C3C", "strokeWidth": 1}},
            {"id": "mitochondria2", "type": "ellipse", "attrs": {"cx": 140, "cy": 260, "rx": 28, "ry": 14}, "label": "Mitochondria", "selectable": true, "style": {"fill": "#F9C0C0", "stroke": "#E74C3C", "strokeWidth": 2}},
            {"id": "ribosome1", "type": "circle", "attrs": {"cx": 180, "cy": 140, "r": 6}, "label": "Ribosome", "selectable": true, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1.5}},
            {"id": "ribosome2", "type": "circle", "attrs": {"cx": 195, "cy": 160, "r": 6}, "label": "Ribosome", "selectable": true, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1.5}},
            {"id": "ribosome3", "type": "circle", "attrs": {"cx": 310, "cy": 280, "r": 6}, "label": "Ribosome", "selectable": true, "style": {"fill": "#D5A6E6", "stroke": "#8E44AD", "strokeWidth": 1.5}},
            {"id": "golgi", "type": "path", "attrs": {"d": "M 330 240 Q 360 235 370 250 M 328 248 Q 358 243 368 258 M 326 256 Q 356 251 366 266"}, "label": "Golgi Apparatus", "selectable": true, "style": {"fill": "none", "stroke": "#F39C12", "strokeWidth": 3}},
            {"id": "er", "type": "path", "attrs": {"d": "M 130 170 Q 115 185 120 200 Q 125 215 115 230 Q 105 240 115 250"}, "label": "Endoplasmic Reticulum", "selectable": true, "style": {"fill": "none", "stroke": "#27AE60", "strokeWidth": 3}}
        ],
        "correctIds": ["nucleus-outer"],
        "viewBox": {"width": 500, "height": 400},
        "diagramTitle": "Animal Cell"
    }',
    1,
    ARRAY['biology', 'cells', 'organelles']
),
-- ============================================================
-- 10) Physics: Simple circuit — current measurement
-- ============================================================
(
    'interactive-diagram',
    'Circuit: Current Measurement',
    'Select the component that measures electric current.',
    'This component is represented by a circle with the letter "A" inside — it is connected in series.',
    '{
        "elements": [
            {"id": "wire-top", "type": "line", "attrs": {"x1": 100, "y1": 80, "x2": 400, "y2": 80}, "style": {"stroke": "#333", "strokeWidth": 2}},
            {"id": "wire-right", "type": "line", "attrs": {"x1": 400, "y1": 80, "x2": 400, "y2": 320}, "style": {"stroke": "#333", "strokeWidth": 2}},
            {"id": "wire-bottom", "type": "line", "attrs": {"x1": 100, "y1": 320, "x2": 400, "y2": 320}, "style": {"stroke": "#333", "strokeWidth": 2}},
            {"id": "wire-left", "type": "line", "attrs": {"x1": 100, "y1": 80, "x2": 100, "y2": 320}, "style": {"stroke": "#333", "strokeWidth": 2}},
            {"id": "battery", "type": "rect", "attrs": {"x": 75, "y": 170, "width": 50, "height": 60, "rx": 4}, "label": "Battery", "selectable": true, "style": {"fill": "#E8E8E8", "stroke": "#555", "strokeWidth": 2}},
            {"id": "batt-plus", "type": "text", "attrs": {"x": 100, "y": 167, "content": "+", "fontSize": 16, "fontWeight": "bold"}, "style": {"fill": "#E74C3C"}},
            {"id": "batt-minus", "type": "text", "attrs": {"x": 100, "y": 248, "content": "\u2013", "fontSize": 16, "fontWeight": "bold"}, "style": {"fill": "#3498DB"}},
            {"id": "resistor", "type": "polyline", "attrs": {"points": "170,80 180,60 200,100 220,60 240,100 260,60 270,80"}, "label": "Resistor", "style": {"stroke": "#555", "strokeWidth": 2}},
            {"id": "resistor-body", "type": "rect", "attrs": {"x": 170, "y": 55, "width": 100, "height": 50, "rx": 4}, "label": "Resistor", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#555", "strokeWidth": 1.5, "opacity": 0.4}},
            {"id": "bulb-circle", "type": "circle", "attrs": {"cx": 400, "cy": 200, "r": 28}, "label": "Light Bulb", "selectable": true, "style": {"fill": "#FFF9C4", "stroke": "#F9A825", "strokeWidth": 2}},
            {"id": "bulb-x1", "type": "line", "attrs": {"x1": 384, "y1": 184, "x2": 416, "y2": 216}, "style": {"stroke": "#F9A825", "strokeWidth": 2}},
            {"id": "bulb-x2", "type": "line", "attrs": {"x1": 416, "y1": 184, "x2": 384, "y2": 216}, "style": {"stroke": "#F9A825", "strokeWidth": 2}},
            {"id": "ammeter", "type": "circle", "attrs": {"cx": 250, "cy": 320, "r": 28}, "label": "Ammeter", "selectable": true, "style": {"fill": "#E8E8E8", "stroke": "#555", "strokeWidth": 2}},
            {"id": "ammeter-label", "type": "text", "attrs": {"x": 250, "y": 326, "content": "A", "fontSize": 20, "fontWeight": "bold"}, "style": {"fill": "#333"}},
            {"id": "switch-line", "type": "line", "attrs": {"x1": 330, "y1": 80, "x2": 370, "y2": 60}, "style": {"stroke": "#333", "strokeWidth": 2.5}},
            {"id": "switch-dot", "type": "circle", "attrs": {"cx": 330, "cy": 80, "r": 4}, "style": {"fill": "#333"}},
            {"id": "switch-body", "type": "rect", "attrs": {"x": 320, "y": 55, "width": 60, "height": 35, "rx": 4}, "label": "Switch", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#555", "strokeWidth": 1, "opacity": 0.3}}
        ],
        "correctIds": ["ammeter"],
        "viewBox": {"width": 500, "height": 400},
        "diagramTitle": "Simple Electric Circuit"
    }',
    2,
    ARRAY['physics', 'circuits', 'electricity']
),
-- ============================================================
-- 11) Physics: Simple circuit — energy source
-- ============================================================
(
    'interactive-diagram',
    'Circuit: Energy Source',
    'Select the energy source in this circuit.',
    'Look for the component with + and - terminals that provides voltage to the circuit.',
    '{
        "elements": [
            {"id": "wire-top", "type": "line", "attrs": {"x1": 100, "y1": 80, "x2": 400, "y2": 80}, "style": {"stroke": "#333", "strokeWidth": 2}},
            {"id": "wire-right", "type": "line", "attrs": {"x1": 400, "y1": 80, "x2": 400, "y2": 320}, "style": {"stroke": "#333", "strokeWidth": 2}},
            {"id": "wire-bottom", "type": "line", "attrs": {"x1": 100, "y1": 320, "x2": 400, "y2": 320}, "style": {"stroke": "#333", "strokeWidth": 2}},
            {"id": "wire-left", "type": "line", "attrs": {"x1": 100, "y1": 80, "x2": 100, "y2": 320}, "style": {"stroke": "#333", "strokeWidth": 2}},
            {"id": "battery", "type": "rect", "attrs": {"x": 75, "y": 170, "width": 50, "height": 60, "rx": 4}, "label": "Battery", "selectable": true, "style": {"fill": "#E8E8E8", "stroke": "#555", "strokeWidth": 2}},
            {"id": "batt-plus", "type": "text", "attrs": {"x": 100, "y": 167, "content": "+", "fontSize": 16, "fontWeight": "bold"}, "style": {"fill": "#E74C3C"}},
            {"id": "batt-minus", "type": "text", "attrs": {"x": 100, "y": 248, "content": "\u2013", "fontSize": 16, "fontWeight": "bold"}, "style": {"fill": "#3498DB"}},
            {"id": "resistor-body", "type": "rect", "attrs": {"x": 170, "y": 55, "width": 100, "height": 50, "rx": 4}, "label": "Resistor", "selectable": true, "style": {"fill": "#E0E0E0", "stroke": "#555", "strokeWidth": 1.5}},
            {"id": "resistor-zigzag", "type": "polyline", "attrs": {"points": "170,80 180,60 200,100 220,60 240,100 260,60 270,80"}, "style": {"stroke": "#555", "strokeWidth": 2}},
            {"id": "bulb-circle", "type": "circle", "attrs": {"cx": 400, "cy": 200, "r": 28}, "label": "Light Bulb", "selectable": true, "style": {"fill": "#FFF9C4", "stroke": "#F9A825", "strokeWidth": 2}},
            {"id": "bulb-x1", "type": "line", "attrs": {"x1": 384, "y1": 184, "x2": 416, "y2": 216}, "style": {"stroke": "#F9A825", "strokeWidth": 2}},
            {"id": "bulb-x2", "type": "line", "attrs": {"x1": 416, "y1": 184, "x2": 384, "y2": 216}, "style": {"stroke": "#F9A825", "strokeWidth": 2}},
            {"id": "ammeter", "type": "circle", "attrs": {"cx": 250, "cy": 320, "r": 28}, "label": "Ammeter", "selectable": true, "style": {"fill": "#E8E8E8", "stroke": "#555", "strokeWidth": 2}},
            {"id": "ammeter-label", "type": "text", "attrs": {"x": 250, "y": 326, "content": "A", "fontSize": 20, "fontWeight": "bold"}, "style": {"fill": "#333"}}
        ],
        "correctIds": ["battery"],
        "viewBox": {"width": 500, "height": 400},
        "diagramTitle": "Simple Electric Circuit"
    }',
    1,
    ARRAY['physics', 'circuits', 'electricity']
),
-- ============================================================
-- 12) Anatomy: Heart — pulmonary pump
-- ============================================================
(
    'interactive-diagram',
    'Heart: Pulmonary Circulation',
    'Which chamber pumps blood to the lungs?',
    'Blood flows from this lower-right chamber (your left when facing the diagram) through the pulmonary artery to reach the lungs.',
    '{
        "elements": [
            {"id": "heart-outline", "type": "path", "attrs": {"d": "M 250 80 Q 150 50 120 130 Q 90 210 160 290 Q 220 350 250 370 Q 280 350 340 290 Q 410 210 380 130 Q 350 50 250 80 Z"}, "style": {"fill": "#FCE4EC", "stroke": "#C62828", "strokeWidth": 2.5}},
            {"id": "septum-v", "type": "line", "attrs": {"x1": 250, "y1": 130, "x2": 250, "y2": 340}, "style": {"stroke": "#C62828", "strokeWidth": 2}},
            {"id": "septum-h", "type": "line", "attrs": {"x1": 130, "y1": 210, "x2": 370, "y2": 210}, "style": {"stroke": "#C62828", "strokeWidth": 2}},
            {"id": "right-atrium", "type": "polygon", "attrs": {"points": "250,130 250,210 130,210 120,170 125,140 145,110 180,90 220,82 250,80"}, "label": "Right Atrium", "selectable": true, "style": {"fill": "#BBDEFB", "stroke": "#1565C0", "strokeWidth": 1.5}},
            {"id": "right-ventricle", "type": "polygon", "attrs": {"points": "250,210 250,340 220,355 190,330 165,290 145,250 130,220 130,210"}, "label": "Right Ventricle", "selectable": true, "style": {"fill": "#90CAF9", "stroke": "#1565C0", "strokeWidth": 1.5}},
            {"id": "left-atrium", "type": "polygon", "attrs": {"points": "250,130 250,210 370,210 375,170 370,140 355,115 320,90 280,82 250,80"}, "label": "Left Atrium", "selectable": true, "style": {"fill": "#EF9A9A", "stroke": "#C62828", "strokeWidth": 1.5}},
            {"id": "left-ventricle", "type": "polygon", "attrs": {"points": "250,210 250,340 280,355 310,330 335,290 355,250 370,220 370,210"}, "label": "Left Ventricle", "selectable": true, "style": {"fill": "#E57373", "stroke": "#C62828", "strokeWidth": 1.5}},
            {"id": "pa-label", "type": "text", "attrs": {"x": 165, "y": 65, "content": "Pulmonary", "fontSize": 11, "fontWeight": "bold"}, "style": {"fill": "#1565C0"}},
            {"id": "pa-label2", "type": "text", "attrs": {"x": 165, "y": 78, "content": "Artery", "fontSize": 11, "fontWeight": "bold"}, "style": {"fill": "#1565C0"}},
            {"id": "aorta-label", "type": "text", "attrs": {"x": 335, "y": 65, "content": "Aorta", "fontSize": 11, "fontWeight": "bold"}, "style": {"fill": "#C62828"}},
            {"id": "ra-label", "type": "text", "attrs": {"x": 185, "y": 175, "content": "RA", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#1565C0"}},
            {"id": "rv-label", "type": "text", "attrs": {"x": 190, "y": 270, "content": "RV", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#1565C0"}},
            {"id": "la-label", "type": "text", "attrs": {"x": 310, "y": 175, "content": "LA", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#C62828"}},
            {"id": "lv-label", "type": "text", "attrs": {"x": 310, "y": 270, "content": "LV", "fontSize": 14, "fontWeight": "bold"}, "style": {"fill": "#C62828"}}
        ],
        "correctIds": ["right-ventricle"],
        "viewBox": {"width": 500, "height": 400},
        "diagramTitle": "Human Heart"
    }',
    3,
    ARRAY['anatomy', 'heart', 'circulatory-system']
);
