-- Migration: 004_mcq_seed
-- Description: Seed MCQ applet data

-- Seed data: MCQ puzzles
INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
    'mcq',
    'Python Data Types',
    'Which of the following is NOT a valid Python data type?',
    'Think about the built-in types in Python.',
    '{
        "options": [
            {"id": "a", "text": "int"},
            {"id": "b", "text": "str"},
            {"id": "c", "text": "char"},
            {"id": "d", "text": "float"}
        ],
        "correctOptionId": "c"
    }',
    1,
    ARRAY['python', 'basics', 'data-types']
),
(
    'mcq',
    'JavaScript Arrays',
    'What does array.push() return?',
    'It modifies the array and returns something about the new state.',
    '{
        "options": [
            {"id": "a", "text": "The added element"},
            {"id": "b", "text": "The new length of the array"},
            {"id": "c", "text": "The modified array"},
            {"id": "d", "text": "undefined"}
        ],
        "correctOptionId": "b"
    }',
    2,
    ARRAY['javascript', 'arrays']
),
(
    'mcq',
    'Big O Notation',
    'What is the time complexity of binary search?',
    'Binary search halves the search space with each step.',
    '{
        "options": [
            {"id": "a", "text": "O(n)"},
            {"id": "b", "text": "O(n²)"},
            {"id": "c", "text": "O(log n)"},
            {"id": "d", "text": "O(1)"}
        ],
        "correctOptionId": "c"
    }',
    2,
    ARRAY['algorithms', 'complexity']
),
(
    'mcq',
    'HTML Semantics',
    'Which HTML element is best for the main navigation of a website?',
    'Think about semantic HTML5 elements.',
    '{
        "options": [
            {"id": "a", "text": "<div class=\"nav\">"},
            {"id": "b", "text": "<navigation>"},
            {"id": "c", "text": "<nav>"},
            {"id": "d", "text": "<menu>"}
        ],
        "correctOptionId": "c"
    }',
    1,
    ARRAY['html', 'semantics']
),
(
    'mcq',
    'CSS Box Model',
    'In the CSS box model, which property adds space OUTSIDE the border?',
    'Think about the layers: content, padding, border, and...',
    '{
        "options": [
            {"id": "a", "text": "padding"},
            {"id": "b", "text": "margin"},
            {"id": "c", "text": "border-spacing"},
            {"id": "d", "text": "outline"}
        ],
        "correctOptionId": "b"
    }',
    1,
    ARRAY['css', 'box-model']
);
