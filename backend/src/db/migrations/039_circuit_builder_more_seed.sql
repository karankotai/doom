-- More Circuit Builder puzzles (difficulty 1-4)

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES

-- Puzzle 3: Single switch — the simplest possible circuit
('circuit-builder', 'Your First Circuit', 'Flip the switch to turn on the light!', 'A closed circuit lets current flow from the battery through the bulb and back.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 50, "label": "5V", "value": 5},
    {"id": "j1", "type": "junction", "x": 100, "y": 50},
    {"id": "j2", "type": "junction", "x": 400, "y": 50},
    {"id": "sw1", "type": "switch", "x": 400, "y": 200, "label": "S1"},
    {"id": "bulb1", "type": "bulb", "x": 100, "y": 200, "label": "B1"},
    {"id": "j3", "type": "junction", "x": 400, "y": 340},
    {"id": "j4", "type": "junction", "x": 100, "y": 340}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "j2"},
    {"id": "w2", "from": "j2", "to": "sw1"},
    {"id": "w3", "from": "sw1", "to": "j3"},
    {"id": "w4", "from": "j3", "to": "j4"},
    {"id": "w5", "from": "j4", "to": "bulb1"},
    {"id": "w6", "from": "bulb1", "to": "j1"},
    {"id": "w7", "from": "j1", "to": "bat1"}
  ],
  "correctSwitchStates": {"sw1": true}
}', 1, '{"physics", "circuits", "basics"}'),

-- Puzzle 4: Two bulbs in series — both switches ON to light them all
('circuit-builder', 'Series Double Bulb', 'Turn on all switches to light both bulbs!', 'In a series circuit every component must be connected. If one switch is off, nothing works.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 40, "label": "12V", "value": 12},
    {"id": "j1", "type": "junction", "x": 80, "y": 40},
    {"id": "j2", "type": "junction", "x": 420, "y": 40},
    {"id": "sw1", "type": "switch", "x": 420, "y": 130, "label": "S1"},
    {"id": "bulb1", "type": "bulb", "x": 420, "y": 240, "label": "B1"},
    {"id": "j3", "type": "junction", "x": 420, "y": 350},
    {"id": "j4", "type": "junction", "x": 80, "y": 350},
    {"id": "bulb2", "type": "bulb", "x": 80, "y": 240, "label": "B2"},
    {"id": "sw2", "type": "switch", "x": 80, "y": 130, "label": "S2"}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "j2"},
    {"id": "w2", "from": "j2", "to": "sw1"},
    {"id": "w3", "from": "sw1", "to": "bulb1"},
    {"id": "w4", "from": "bulb1", "to": "j3"},
    {"id": "w5", "from": "j3", "to": "j4"},
    {"id": "w6", "from": "j4", "to": "bulb2"},
    {"id": "w7", "from": "bulb2", "to": "sw2"},
    {"id": "w8", "from": "sw2", "to": "j1"},
    {"id": "w9", "from": "j1", "to": "bat1"}
  ],
  "correctSwitchStates": {"sw1": true, "sw2": true}
}', 1, '{"physics", "circuits", "series"}'),

-- Puzzle 5: Three parallel branches — turn on only B1 and B3
('circuit-builder', 'Selective Parallel', 'Light up B1 and B3 but keep B2 off!', 'In a parallel circuit, each branch has its own switch. Turn on only the switches you need.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 30, "label": "9V", "value": 9},
    {"id": "jl_top", "type": "junction", "x": 60, "y": 30},
    {"id": "jr_top", "type": "junction", "x": 440, "y": 30},
    {"id": "jl_bot", "type": "junction", "x": 60, "y": 370},
    {"id": "jr_bot", "type": "junction", "x": 440, "y": 370},
    {"id": "sw1", "type": "switch", "x": 150, "y": 130, "label": "S1"},
    {"id": "bulb1", "type": "bulb", "x": 150, "y": 260, "label": "B1"},
    {"id": "sw2", "type": "switch", "x": 250, "y": 130, "label": "S2"},
    {"id": "bulb2", "type": "bulb", "x": 250, "y": 260, "label": "B2"},
    {"id": "sw3", "type": "switch", "x": 350, "y": 130, "label": "S3"},
    {"id": "bulb3", "type": "bulb", "x": 350, "y": 260, "label": "B3"}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "jr_top"},
    {"id": "w2", "from": "jl_top", "to": "bat1"},
    {"id": "w3", "from": "jr_top", "to": "sw1", "waypoints": [{"x": 440, "y": 130}, {"x": 440, "y": 80}, {"x": 150, "y": 80}]},
    {"id": "w4", "from": "sw1", "to": "bulb1"},
    {"id": "w5", "from": "bulb1", "to": "jl_bot", "waypoints": [{"x": 150, "y": 330}, {"x": 60, "y": 330}]},
    {"id": "w6", "from": "jr_top", "to": "sw2", "waypoints": [{"x": 440, "y": 80}, {"x": 250, "y": 80}]},
    {"id": "w7", "from": "sw2", "to": "bulb2"},
    {"id": "w8", "from": "bulb2", "to": "jl_bot", "waypoints": [{"x": 250, "y": 330}, {"x": 60, "y": 330}]},
    {"id": "w9", "from": "jr_top", "to": "sw3", "waypoints": [{"x": 440, "y": 80}, {"x": 350, "y": 80}]},
    {"id": "w10", "from": "sw3", "to": "bulb3"},
    {"id": "w11", "from": "bulb3", "to": "jl_bot", "waypoints": [{"x": 350, "y": 330}, {"x": 60, "y": 330}]},
    {"id": "w12", "from": "jl_bot", "to": "jl_top"}
  ],
  "correctSwitchStates": {"sw1": true, "sw2": false, "sw3": true}
}', 2, '{"physics", "circuits", "parallel"}'),

-- Puzzle 6: Short circuit awareness — only S2 should be ON
('circuit-builder', 'One Path Only', 'Turn on the switch that powers the bulb without short-circuiting!', 'S1 bypasses the bulb entirely. Only S2 routes current through it.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 40, "label": "6V", "value": 6},
    {"id": "jl", "type": "junction", "x": 80, "y": 40},
    {"id": "jr", "type": "junction", "x": 420, "y": 40},
    {"id": "sw1", "type": "switch", "x": 250, "y": 160, "label": "S1"},
    {"id": "j_mid_l", "type": "junction", "x": 80, "y": 200},
    {"id": "j_mid_r", "type": "junction", "x": 420, "y": 200},
    {"id": "sw2", "type": "switch", "x": 420, "y": 120, "label": "S2"},
    {"id": "bulb1", "type": "bulb", "x": 80, "y": 200, "label": "B1"},
    {"id": "jbl", "type": "junction", "x": 80, "y": 340},
    {"id": "jbr", "type": "junction", "x": 420, "y": 340}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "jr"},
    {"id": "w2", "from": "jl", "to": "bat1"},
    {"id": "w3", "from": "jr", "to": "sw2"},
    {"id": "w4", "from": "sw2", "to": "j_mid_r"},
    {"id": "w5", "from": "j_mid_r", "to": "jbr"},
    {"id": "w6", "from": "jbr", "to": "jbl"},
    {"id": "w7", "from": "jbl", "to": "bulb1"},
    {"id": "w8", "from": "bulb1", "to": "jl"},
    {"id": "w9", "from": "jr", "to": "sw1", "waypoints": [{"x": 420, "y": 160}]},
    {"id": "w10", "from": "sw1", "to": "jbl", "waypoints": [{"x": 80, "y": 160}, {"x": 80, "y": 340}]}
  ],
  "correctSwitchStates": {"sw1": false, "sw2": true}
}', 2, '{"physics", "circuits", "short-circuit"}'),

-- Puzzle 7: Series-parallel combo — S1 and S3 ON, S2 OFF
('circuit-builder', 'Mixed Circuit', 'Light up B1 (series path) but keep B2 off (parallel branch)!', 'S1 is the main switch. S3 is on B1''s branch. S2 controls B2''s branch — leave it off.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 30, "label": "9V", "value": 9},
    {"id": "jl_top", "type": "junction", "x": 70, "y": 30},
    {"id": "jr_top", "type": "junction", "x": 430, "y": 30},
    {"id": "sw1", "type": "switch", "x": 430, "y": 110, "label": "S1"},
    {"id": "j_split", "type": "junction", "x": 430, "y": 190},
    {"id": "sw2", "type": "switch", "x": 320, "y": 250, "label": "S2"},
    {"id": "bulb2", "type": "bulb", "x": 320, "y": 340, "label": "B2"},
    {"id": "sw3", "type": "switch", "x": 160, "y": 250, "label": "S3"},
    {"id": "bulb1", "type": "bulb", "x": 160, "y": 340, "label": "B1"},
    {"id": "j_merge", "type": "junction", "x": 70, "y": 380},
    {"id": "j_b2_bot", "type": "junction", "x": 320, "y": 380},
    {"id": "j_b1_bot", "type": "junction", "x": 160, "y": 380}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "jr_top"},
    {"id": "w2", "from": "jl_top", "to": "bat1"},
    {"id": "w3", "from": "jr_top", "to": "sw1"},
    {"id": "w4", "from": "sw1", "to": "j_split"},
    {"id": "w5", "from": "j_split", "to": "sw2", "waypoints": [{"x": 430, "y": 250}]},
    {"id": "w6", "from": "sw2", "to": "bulb2"},
    {"id": "w7", "from": "bulb2", "to": "j_b2_bot"},
    {"id": "w8", "from": "j_split", "to": "sw3", "waypoints": [{"x": 430, "y": 220}, {"x": 160, "y": 220}]},
    {"id": "w9", "from": "sw3", "to": "bulb1"},
    {"id": "w10", "from": "bulb1", "to": "j_b1_bot"},
    {"id": "w11", "from": "j_b1_bot", "to": "j_merge"},
    {"id": "w12", "from": "j_b2_bot", "to": "j_merge", "waypoints": [{"x": 320, "y": 400}, {"x": 70, "y": 400}]},
    {"id": "w13", "from": "j_merge", "to": "jl_top"}
  ],
  "correctSwitchStates": {"sw1": true, "sw2": false, "sw3": true}
}', 3, '{"physics", "circuits", "series-parallel"}'),

-- Puzzle 8: Three switches in series — all must be ON
('circuit-builder', 'Triple Gate', 'All three gates must be open for the light to turn on!', 'Series means everything must be connected — one off switch breaks the whole chain.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 40, "label": "9V", "value": 9},
    {"id": "jl", "type": "junction", "x": 80, "y": 40},
    {"id": "jr", "type": "junction", "x": 420, "y": 40},
    {"id": "sw1", "type": "switch", "x": 420, "y": 120, "label": "Gate 1"},
    {"id": "sw2", "type": "switch", "x": 420, "y": 210, "label": "Gate 2"},
    {"id": "sw3", "type": "switch", "x": 420, "y": 300, "label": "Gate 3"},
    {"id": "jbr", "type": "junction", "x": 420, "y": 370},
    {"id": "jbl", "type": "junction", "x": 80, "y": 370},
    {"id": "bulb1", "type": "bulb", "x": 80, "y": 210, "label": "B1"}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "jr"},
    {"id": "w2", "from": "jr", "to": "sw1"},
    {"id": "w3", "from": "sw1", "to": "sw2"},
    {"id": "w4", "from": "sw2", "to": "sw3"},
    {"id": "w5", "from": "sw3", "to": "jbr"},
    {"id": "w6", "from": "jbr", "to": "jbl"},
    {"id": "w7", "from": "jbl", "to": "bulb1"},
    {"id": "w8", "from": "bulb1", "to": "jl"},
    {"id": "w9", "from": "jl", "to": "bat1"}
  ],
  "correctSwitchStates": {"sw1": true, "sw2": true, "sw3": true}
}', 2, '{"physics", "circuits", "series"}'),

-- Puzzle 9: OR gate — either S1 or S2 turns on the bulb (turn on just S1)
('circuit-builder', 'Either Path', 'Find ONE switch that lights the bulb — you only need one!', 'The two switches are in parallel. Either one creates a complete path for current.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 30, "label": "6V", "value": 6},
    {"id": "jl_top", "type": "junction", "x": 80, "y": 30},
    {"id": "jr_top", "type": "junction", "x": 420, "y": 30},
    {"id": "sw1", "type": "switch", "x": 250, "y": 120, "label": "S1"},
    {"id": "sw2", "type": "switch", "x": 250, "y": 220, "label": "S2"},
    {"id": "jl_mid", "type": "junction", "x": 80, "y": 170},
    {"id": "jr_mid", "type": "junction", "x": 420, "y": 170},
    {"id": "bulb1", "type": "bulb", "x": 250, "y": 330, "label": "B1"},
    {"id": "jl_bot", "type": "junction", "x": 80, "y": 380},
    {"id": "jr_bot", "type": "junction", "x": 420, "y": 380}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "jr_top"},
    {"id": "w2", "from": "jl_top", "to": "bat1"},
    {"id": "w3", "from": "jr_top", "to": "sw1", "waypoints": [{"x": 420, "y": 120}]},
    {"id": "w4", "from": "sw1", "to": "jl_mid", "waypoints": [{"x": 80, "y": 120}]},
    {"id": "w5", "from": "jr_top", "to": "sw2", "waypoints": [{"x": 420, "y": 220}]},
    {"id": "w6", "from": "sw2", "to": "jl_mid", "waypoints": [{"x": 80, "y": 220}]},
    {"id": "w7", "from": "jl_mid", "to": "jl_bot"},
    {"id": "w8", "from": "jl_bot", "to": "bulb1"},
    {"id": "w9", "from": "bulb1", "to": "jr_bot"},
    {"id": "w10", "from": "jr_bot", "to": "jr_top"}
  ],
  "correctSwitchStates": {"sw1": true, "sw2": false}
}', 2, '{"physics", "circuits", "parallel", "logic-gates"}'),

-- Puzzle 10: AND gate with resistor — both switches must be ON
('circuit-builder', 'AND Gate Circuit', 'Both switches must be closed for the bulb to light up.', 'This is like a logical AND — current needs BOTH paths to be closed.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 30, "label": "9V", "value": 9},
    {"id": "jl", "type": "junction", "x": 80, "y": 30},
    {"id": "jr", "type": "junction", "x": 420, "y": 30},
    {"id": "sw1", "type": "switch", "x": 250, "y": 110, "label": "A"},
    {"id": "j_mid", "type": "junction", "x": 250, "y": 180},
    {"id": "sw2", "type": "switch", "x": 250, "y": 250, "label": "B"},
    {"id": "res1", "type": "resistor", "x": 420, "y": 200, "label": "100R"},
    {"id": "bulb1", "type": "bulb", "x": 80, "y": 200, "label": "B1"},
    {"id": "jbl", "type": "junction", "x": 80, "y": 350},
    {"id": "jbr", "type": "junction", "x": 420, "y": 350},
    {"id": "j_bot_mid", "type": "junction", "x": 250, "y": 350}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "jr"},
    {"id": "w2", "from": "jl", "to": "bat1"},
    {"id": "w3", "from": "jr", "to": "sw1", "waypoints": [{"x": 420, "y": 110}]},
    {"id": "w4", "from": "sw1", "to": "j_mid"},
    {"id": "w5", "from": "j_mid", "to": "sw2"},
    {"id": "w6", "from": "sw2", "to": "j_bot_mid"},
    {"id": "w7", "from": "j_bot_mid", "to": "jbl"},
    {"id": "w8", "from": "jbl", "to": "bulb1"},
    {"id": "w9", "from": "bulb1", "to": "jl"},
    {"id": "w10", "from": "jr", "to": "res1"},
    {"id": "w11", "from": "res1", "to": "jbr"},
    {"id": "w12", "from": "jbr", "to": "j_bot_mid"}
  ],
  "correctSwitchStates": {"sw1": true, "sw2": true}
}', 3, '{"physics", "circuits", "series", "logic-gates"}'),

-- Puzzle 11: Christmas lights — 4 switches all ON in series
('circuit-builder', 'Christmas Lights', 'Turn on all four switches to light the whole string!', 'Christmas lights are in series — if one goes out they all go out!', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 30, "label": "12V", "value": 12},
    {"id": "jl", "type": "junction", "x": 60, "y": 30},
    {"id": "jr", "type": "junction", "x": 440, "y": 30},
    {"id": "sw1", "type": "switch", "x": 440, "y": 100, "label": "S1"},
    {"id": "bulb1", "type": "bulb", "x": 440, "y": 190, "label": "B1"},
    {"id": "sw2", "type": "switch", "x": 440, "y": 280, "label": "S2"},
    {"id": "jbr", "type": "junction", "x": 440, "y": 370},
    {"id": "jbl", "type": "junction", "x": 60, "y": 370},
    {"id": "sw3", "type": "switch", "x": 60, "y": 280, "label": "S3"},
    {"id": "bulb2", "type": "bulb", "x": 60, "y": 190, "label": "B2"},
    {"id": "sw4", "type": "switch", "x": 60, "y": 100, "label": "S4"}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "jr"},
    {"id": "w2", "from": "jr", "to": "sw1"},
    {"id": "w3", "from": "sw1", "to": "bulb1"},
    {"id": "w4", "from": "bulb1", "to": "sw2"},
    {"id": "w5", "from": "sw2", "to": "jbr"},
    {"id": "w6", "from": "jbr", "to": "jbl"},
    {"id": "w7", "from": "jbl", "to": "sw3"},
    {"id": "w8", "from": "sw3", "to": "bulb2"},
    {"id": "w9", "from": "bulb2", "to": "sw4"},
    {"id": "w10", "from": "sw4", "to": "jl"},
    {"id": "w11", "from": "jl", "to": "bat1"}
  ],
  "correctSwitchStates": {"sw1": true, "sw2": true, "sw3": true, "sw4": true}
}', 3, '{"physics", "circuits", "series"}'),

-- Puzzle 12: Master switch — S1 controls everything, but only B2 should light
('circuit-builder', 'Master Switch', 'Turn on the master switch AND only the branch for B2!', 'S1 is the master switch for the whole circuit. S2 and S3 each control one bulb.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 30, "label": "9V", "value": 9},
    {"id": "jl", "type": "junction", "x": 70, "y": 30},
    {"id": "jr", "type": "junction", "x": 430, "y": 30},
    {"id": "sw1", "type": "switch", "x": 430, "y": 100, "label": "Master"},
    {"id": "j_split", "type": "junction", "x": 430, "y": 170},
    {"id": "sw2", "type": "switch", "x": 300, "y": 230, "label": "S2"},
    {"id": "bulb1", "type": "bulb", "x": 300, "y": 320, "label": "B1"},
    {"id": "sw3", "type": "switch", "x": 160, "y": 230, "label": "S3"},
    {"id": "bulb2", "type": "bulb", "x": 160, "y": 320, "label": "B2"},
    {"id": "j_b1", "type": "junction", "x": 300, "y": 390},
    {"id": "j_b2", "type": "junction", "x": 160, "y": 390},
    {"id": "j_merge", "type": "junction", "x": 70, "y": 390}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "jr"},
    {"id": "w2", "from": "jl", "to": "bat1"},
    {"id": "w3", "from": "jr", "to": "sw1"},
    {"id": "w4", "from": "sw1", "to": "j_split"},
    {"id": "w5", "from": "j_split", "to": "sw2", "waypoints": [{"x": 430, "y": 200}, {"x": 300, "y": 200}]},
    {"id": "w6", "from": "sw2", "to": "bulb1"},
    {"id": "w7", "from": "bulb1", "to": "j_b1"},
    {"id": "w8", "from": "j_split", "to": "sw3", "waypoints": [{"x": 430, "y": 200}, {"x": 160, "y": 200}]},
    {"id": "w9", "from": "sw3", "to": "bulb2"},
    {"id": "w10", "from": "bulb2", "to": "j_b2"},
    {"id": "w11", "from": "j_b1", "to": "j_merge"},
    {"id": "w12", "from": "j_b2", "to": "j_merge"},
    {"id": "w13", "from": "j_merge", "to": "jl"}
  ],
  "correctSwitchStates": {"sw1": true, "sw2": false, "sw3": true}
}', 3, '{"physics", "circuits", "series-parallel"}'),

-- Puzzle 13: All off — no switches should be on
('circuit-builder', 'Lights Out!', 'Make sure NO bulbs are lit — turn everything off!', 'If all switches are off, no current can flow anywhere.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 40, "label": "6V", "value": 6},
    {"id": "jl", "type": "junction", "x": 80, "y": 40},
    {"id": "jr", "type": "junction", "x": 420, "y": 40},
    {"id": "sw1", "type": "switch", "x": 180, "y": 150, "label": "S1"},
    {"id": "bulb1", "type": "bulb", "x": 180, "y": 260, "label": "B1"},
    {"id": "sw2", "type": "switch", "x": 320, "y": 150, "label": "S2"},
    {"id": "bulb2", "type": "bulb", "x": 320, "y": 260, "label": "B2"},
    {"id": "jbl", "type": "junction", "x": 80, "y": 340},
    {"id": "jbr", "type": "junction", "x": 420, "y": 340}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "jr"},
    {"id": "w2", "from": "jl", "to": "bat1"},
    {"id": "w3", "from": "jr", "to": "sw1", "waypoints": [{"x": 420, "y": 100}, {"x": 180, "y": 100}]},
    {"id": "w4", "from": "sw1", "to": "bulb1"},
    {"id": "w5", "from": "bulb1", "to": "jbl", "waypoints": [{"x": 180, "y": 340}]},
    {"id": "w6", "from": "jr", "to": "sw2", "waypoints": [{"x": 420, "y": 100}, {"x": 320, "y": 100}]},
    {"id": "w7", "from": "sw2", "to": "bulb2"},
    {"id": "w8", "from": "bulb2", "to": "jbr", "waypoints": [{"x": 320, "y": 340}]},
    {"id": "w9", "from": "jbl", "to": "jl"},
    {"id": "w10", "from": "jbr", "to": "jbl"}
  ],
  "correctSwitchStates": {"sw1": false, "sw2": false}
}', 1, '{"physics", "circuits", "parallel"}'),

-- Puzzle 14: Complex — 4 switches, only specific combo lights the target bulb
('circuit-builder', 'The Maze Circuit', 'Light ONLY bulb B2 — find the right combination of switches!', 'Trace the path from battery to B2 and back. Only turn on switches that are on that path. Keep B1 dark.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 25, "label": "12V", "value": 12},
    {"id": "jl", "type": "junction", "x": 60, "y": 25},
    {"id": "jr", "type": "junction", "x": 440, "y": 25},
    {"id": "sw1", "type": "switch", "x": 440, "y": 95, "label": "S1"},
    {"id": "j1", "type": "junction", "x": 440, "y": 165},
    {"id": "sw2", "type": "switch", "x": 340, "y": 220, "label": "S2"},
    {"id": "bulb1", "type": "bulb", "x": 340, "y": 310, "label": "B1"},
    {"id": "sw3", "type": "switch", "x": 160, "y": 220, "label": "S3"},
    {"id": "bulb2", "type": "bulb", "x": 160, "y": 310, "label": "B2"},
    {"id": "sw4", "type": "switch", "x": 60, "y": 200, "label": "S4"},
    {"id": "jb1", "type": "junction", "x": 340, "y": 390},
    {"id": "jb2", "type": "junction", "x": 160, "y": 390},
    {"id": "jbl", "type": "junction", "x": 60, "y": 390}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "jr"},
    {"id": "w2", "from": "jl", "to": "bat1"},
    {"id": "w3", "from": "jr", "to": "sw1"},
    {"id": "w4", "from": "sw1", "to": "j1"},
    {"id": "w5", "from": "j1", "to": "sw2", "waypoints": [{"x": 440, "y": 190}, {"x": 340, "y": 190}]},
    {"id": "w6", "from": "sw2", "to": "bulb1"},
    {"id": "w7", "from": "bulb1", "to": "jb1"},
    {"id": "w8", "from": "j1", "to": "sw3", "waypoints": [{"x": 440, "y": 190}, {"x": 160, "y": 190}]},
    {"id": "w9", "from": "sw3", "to": "bulb2"},
    {"id": "w10", "from": "bulb2", "to": "jb2"},
    {"id": "w11", "from": "jb1", "to": "jbl"},
    {"id": "w12", "from": "jb2", "to": "jbl"},
    {"id": "w13", "from": "jbl", "to": "sw4"},
    {"id": "w14", "from": "sw4", "to": "jl"}
  ],
  "correctSwitchStates": {"sw1": true, "sw2": false, "sw3": true, "sw4": true}
}', 4, '{"physics", "circuits", "series-parallel", "advanced"}');
