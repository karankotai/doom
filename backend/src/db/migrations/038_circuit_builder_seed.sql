-- Circuit Builder seed data: two example puzzles

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES

-- Puzzle 1: Simple series circuit (both switches must be ON)
('circuit-builder', 'Simple Series Circuit', 'Toggle both switches to light up the bulb!', 'In a series circuit, ALL switches must be ON for current to flow through the bulb.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 40, "label": "9V", "value": 9},
    {"id": "j1", "type": "junction", "x": 100, "y": 40},
    {"id": "j2", "type": "junction", "x": 400, "y": 40},
    {"id": "sw1", "type": "switch", "x": 400, "y": 140, "label": "S1"},
    {"id": "sw2", "type": "switch", "x": 400, "y": 260, "label": "S2"},
    {"id": "bulb1", "type": "bulb", "x": 100, "y": 200, "label": "B1"},
    {"id": "j3", "type": "junction", "x": 400, "y": 360},
    {"id": "j4", "type": "junction", "x": 100, "y": 360}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "j2", "waypoints": []},
    {"id": "w2", "from": "j2", "to": "sw1", "waypoints": []},
    {"id": "w3", "from": "sw1", "to": "sw2", "waypoints": []},
    {"id": "w4", "from": "sw2", "to": "j3", "waypoints": []},
    {"id": "w5", "from": "j3", "to": "j4", "waypoints": []},
    {"id": "w6", "from": "j4", "to": "bulb1", "waypoints": []},
    {"id": "w7", "from": "bulb1", "to": "j1", "waypoints": []},
    {"id": "w8", "from": "j1", "to": "bat1", "waypoints": []}
  ],
  "correctSwitchStates": {"sw1": true, "sw2": true}
}', 1, '{"physics", "circuits", "series"}'),

-- Puzzle 2: Parallel circuit (only turn on the switch for B2)
('circuit-builder', 'Parallel Circuit Challenge', 'Turn on ONLY the switch that lights up bulb B2 (not B1)', 'Each branch in a parallel circuit is independent. You only need the switch in B2''s branch.', '{
  "nodes": [
    {"id": "bat1", "type": "battery", "x": 250, "y": 40, "label": "12V", "value": 12},
    {"id": "j_tl", "type": "junction", "x": 80, "y": 40},
    {"id": "j_tr", "type": "junction", "x": 420, "y": 40},
    {"id": "j_bl", "type": "junction", "x": 80, "y": 360},
    {"id": "j_br", "type": "junction", "x": 420, "y": 360},
    {"id": "j_mid_l", "type": "junction", "x": 80, "y": 200},
    {"id": "j_mid_r", "type": "junction", "x": 420, "y": 200},
    {"id": "sw1", "type": "switch", "x": 250, "y": 120, "label": "S1"},
    {"id": "bulb1", "type": "bulb", "x": 250, "y": 200, "label": "B1"},
    {"id": "sw2", "type": "switch", "x": 250, "y": 280, "label": "S2"},
    {"id": "bulb2", "type": "bulb", "x": 250, "y": 360, "label": "B2"}
  ],
  "wires": [
    {"id": "w1", "from": "bat1", "to": "j_tr", "waypoints": []},
    {"id": "w2", "from": "j_tl", "to": "bat1", "waypoints": []},
    {"id": "w3", "from": "j_tr", "to": "sw1", "waypoints": [{"x": 420, "y": 120}]},
    {"id": "w4", "from": "sw1", "to": "bulb1", "waypoints": []},
    {"id": "w5", "from": "bulb1", "to": "j_tl", "waypoints": [{"x": 80, "y": 120}]},
    {"id": "w6", "from": "j_tr", "to": "sw2", "waypoints": [{"x": 420, "y": 280}]},
    {"id": "w7", "from": "sw2", "to": "bulb2", "waypoints": []},
    {"id": "w8", "from": "bulb2", "to": "j_tl", "waypoints": [{"x": 80, "y": 280}]}
  ],
  "correctSwitchStates": {"sw1": false, "sw2": true}
}', 2, '{"physics", "circuits", "parallel"}');
