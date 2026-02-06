-- Migration: 002_applets
-- Description: Create applets table for storing interactive puzzle content

-- Applet types enum
CREATE TYPE applet_type AS ENUM ('code-blocks', 'slope-graph', 'chess');

-- Applets table - stores puzzle content as JSONB for flexibility
CREATE TABLE IF NOT EXISTS applets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type applet_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    hint TEXT,
    content JSONB NOT NULL,  -- Type-specific content (lines, answerBlocks, startPoint, etc.)
    difficulty INTEGER DEFAULT 1 CHECK (difficulty >= 1 AND difficulty <= 5),
    tags TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_applets_type ON applets(type);
CREATE INDEX IF NOT EXISTS idx_applets_difficulty ON applets(difficulty);
CREATE INDEX IF NOT EXISTS idx_applets_is_active ON applets(is_active);
CREATE INDEX IF NOT EXISTS idx_applets_tags ON applets USING GIN(tags);

-- Trigger for auto-updating updated_at
CREATE TRIGGER update_applets_updated_at
    BEFORE UPDATE ON applets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed data: Code Blocks puzzles
INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
    'code-blocks',
    'Python Image Filter',
    'Make darker pixels black',
    'Pixels with values below 128 are considered dark.',
    '{
        "language": "python",
        "lines": [
            {"lineNumber": 1, "segments": [{"type": "text", "content": "for pixel in image:"}]},
            {"lineNumber": 2, "segments": [{"type": "text", "content": "    if "}, {"type": "slot", "slotId": "s1", "correctAnswerId": "ans-condition"}, {"type": "text", "content": ":"}]},
            {"lineNumber": 3, "segments": [{"type": "text", "content": "        pixel = "}, {"type": "slot", "slotId": "s2", "correctAnswerId": "ans-zero"}]}
        ],
        "answerBlocks": [
            {"id": "ans-zero", "content": "0"},
            {"id": "ans-255", "content": "255"},
            {"id": "ans-condition", "content": "pixel < 128"}
        ]
    }',
    1,
    ARRAY['python', 'loops', 'conditionals']
),
(
    'code-blocks',
    'JavaScript Array Sum',
    'Complete the array sum function',
    'Initialize the total to zero, loop through each number, and accumulate.',
    '{
        "language": "javascript",
        "lines": [
            {"lineNumber": 1, "segments": [{"type": "text", "content": "function sumArray(numbers) {"}]},
            {"lineNumber": 2, "segments": [{"type": "text", "content": "  let total = "}, {"type": "slot", "slotId": "s1", "correctAnswerId": "ans-zero"}, {"type": "text", "content": ";"}]},
            {"lineNumber": 3, "segments": [{"type": "text", "content": "  "}, {"type": "slot", "slotId": "s2", "correctAnswerId": "ans-for-of"}, {"type": "text", "content": " {"}]},
            {"lineNumber": 4, "segments": [{"type": "text", "content": "    total "}, {"type": "slot", "slotId": "s3", "correctAnswerId": "ans-plus-eq"}, {"type": "text", "content": " num;"}]},
            {"lineNumber": 5, "segments": [{"type": "text", "content": "  }"}]},
            {"lineNumber": 6, "segments": [{"type": "text", "content": "  return total;"}]},
            {"lineNumber": 7, "segments": [{"type": "text", "content": "}"}]}
        ],
        "answerBlocks": [
            {"id": "ans-zero", "content": "0"},
            {"id": "ans-for-of", "content": "for (const num of numbers)"},
            {"id": "ans-plus-eq", "content": "+="},
            {"id": "dist-1", "content": "1"},
            {"id": "dist-2", "content": "for (num in numbers)"},
            {"id": "dist-3", "content": "="}
        ]
    }',
    2,
    ARRAY['javascript', 'functions', 'loops']
),
(
    'code-blocks',
    'Python List Reverse',
    'Reverse a list without using built-in reverse',
    'Use two pointers from the start and end, swapping elements.',
    '{
        "language": "python",
        "lines": [
            {"lineNumber": 1, "segments": [{"type": "text", "content": "def reverse(lst):"}]},
            {"lineNumber": 2, "segments": [{"type": "text", "content": "    left, right = 0, "}, {"type": "slot", "slotId": "s1", "correctAnswerId": "ans-len"}]},
            {"lineNumber": 3, "segments": [{"type": "text", "content": "    while "}, {"type": "slot", "slotId": "s2", "correctAnswerId": "ans-cond"}, {"type": "text", "content": ":"}]},
            {"lineNumber": 4, "segments": [{"type": "text", "content": "        lst[left], lst[right] = lst[right], lst[left]"}]},
            {"lineNumber": 5, "segments": [{"type": "text", "content": "        left += 1"}]},
            {"lineNumber": 6, "segments": [{"type": "text", "content": "        right "}, {"type": "slot", "slotId": "s3", "correctAnswerId": "ans-dec"}, {"type": "text", "content": " 1"}]}
        ],
        "answerBlocks": [
            {"id": "ans-len", "content": "len(lst) - 1"},
            {"id": "ans-cond", "content": "left < right"},
            {"id": "ans-dec", "content": "-="},
            {"id": "dist-1", "content": "len(lst)"},
            {"id": "dist-2", "content": "left != right"},
            {"id": "dist-3", "content": "+="}
        ]
    }',
    2,
    ARRAY['python', 'algorithms', 'two-pointers']
);

-- Seed data: Slope Graph puzzles
INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
    'slope-graph',
    'Move Right and Up',
    'Move the point 5 steps right and 4 steps up.',
    'Start at the origin and count grid squares: 5 to the right, then 4 up.',
    '{
        "startPoint": {"x": 0, "y": 0},
        "targetPoint": {"x": 5, "y": 4},
        "gridSize": 7
    }',
    1,
    ARRAY['math', 'coordinates']
),
(
    'slope-graph',
    'Slope 2/3',
    'Move the point to show a slope of 2/3 (rise 2, run 3).',
    'From the origin, go 3 right and 2 up. Slope = rise/run = 2/3.',
    '{
        "startPoint": {"x": 0, "y": 0},
        "targetPoint": {"x": 3, "y": 2},
        "gridSize": 7
    }',
    2,
    ARRAY['math', 'slope']
),
(
    'slope-graph',
    'Slope of 1',
    'Move the point to show a slope of 1 (rise = run).',
    'A slope of 1 means for every step right, you go one step up. Try (4, 4).',
    '{
        "startPoint": {"x": 0, "y": 0},
        "targetPoint": {"x": 4, "y": 4},
        "gridSize": 7
    }',
    1,
    ARRAY['math', 'slope']
),
(
    'slope-graph',
    'Find the Endpoint',
    'Start at (1, 2) and move 3 right and 2 up. Where do you end?',
    'Add the run to x: 1+3=4. Add the rise to y: 2+2=4. The answer is (4, 4).',
    '{
        "startPoint": {"x": 1, "y": 2},
        "targetPoint": {"x": 4, "y": 4},
        "gridSize": 7
    }',
    2,
    ARRAY['math', 'coordinates']
),
(
    'slope-graph',
    'Steep Slope',
    'Move the point to show a slope of 3 (rise 3, run 1).',
    'A steep slope means the line goes up fast. Go 1 right and 3 up from the origin.',
    '{
        "startPoint": {"x": 0, "y": 0},
        "targetPoint": {"x": 1, "y": 3},
        "gridSize": 7
    }',
    2,
    ARRAY['math', 'slope']
);

-- Seed data: Chess puzzles
INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
    'chess',
    'Back Rank Mate',
    'White to move - Find the checkmate!',
    'The rook can deliver checkmate on the back rank.',
    '{
        "initialPosition": "bKg8,bPf7,bPg7,bPh7,wRa1,wKg1",
        "correctMove": {"from": {"row": 7, "col": 0}, "to": {"row": 0, "col": 0}}
    }',
    1,
    ARRAY['chess', 'checkmate', 'tactics']
),
(
    'chess',
    'Queen Checkmate',
    'White to move - Deliver checkmate!',
    'The queen can attack the king with no escape.',
    '{
        "initialPosition": "bKh8,bPg7,bPh7,wQf6,wKg1",
        "correctMove": {"from": {"row": 2, "col": 5}, "to": {"row": 0, "col": 7}}
    }',
    2,
    ARRAY['chess', 'checkmate', 'queen']
),
(
    'chess',
    'Knight Fork',
    'White to move - Win material with a fork!',
    'The knight can attack two pieces at once.',
    '{
        "initialPosition": "bKe8,bQd8,bRa8,wNc3,wKe1",
        "correctMove": {"from": {"row": 5, "col": 2}, "to": {"row": 3, "col": 3}}
    }',
    2,
    ARRAY['chess', 'tactics', 'fork']
);

-- Rollback commands (commented out, for reference)
-- DROP TABLE IF EXISTS applets;
-- DROP TYPE IF EXISTS applet_type;
