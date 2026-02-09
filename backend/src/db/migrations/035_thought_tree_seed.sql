INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES

-- 1: The Water Cycle
('thought-tree', 'The Water Cycle', 'Navigate the thought tree to discover how rain forms', 'Think about what you know about evaporation and clouds', '{
  "nodes": [
    {
      "id": "n1",
      "question": "What is the primary source of atmospheric water?",
      "leftChoice": { "id": "n1a", "text": "Oceans & lakes" },
      "rightChoice": { "id": "n1b", "text": "Underground springs" },
      "correctChoiceId": "n1a"
    },
    {
      "id": "n2",
      "question": "What makes water rise into the atmosphere?",
      "leftChoice": { "id": "n2a", "text": "Wind lifting water" },
      "rightChoice": { "id": "n2b", "text": "Solar evaporation" },
      "correctChoiceId": "n2b"
    },
    {
      "id": "n3",
      "question": "What happens to water vapor as it rises?",
      "leftChoice": { "id": "n3a", "text": "Cools & condenses" },
      "rightChoice": { "id": "n3b", "text": "Heats up & expands" },
      "correctChoiceId": "n3a"
    },
    {
      "id": "n4",
      "question": "What do droplets need to form clouds?",
      "leftChoice": { "id": "n4a", "text": "Cold air from space" },
      "rightChoice": { "id": "n4b", "text": "Dust & pollen particles" },
      "correctChoiceId": "n4b"
    },
    {
      "id": "n5",
      "question": "When do cloud droplets become rain?",
      "leftChoice": { "id": "n5a", "text": "When too heavy to float" },
      "rightChoice": { "id": "n5b", "text": "When lightning strikes" },
      "correctChoiceId": "n5a"
    }
  ],
  "finalAnswer": "Rain forms through the water cycle: water evaporates from oceans, rises and condenses around tiny particles to form clouds, then falls when droplets grow heavy enough."
}', 2, '{"science", "earth-science", "water-cycle"}'),

-- 2: How Computers Execute Programs
('thought-tree', 'How Programs Run', 'Trace the correct path from source code to execution', 'Follow the journey of code through the computer hardware', '{
  "nodes": [
    {
      "id": "n1",
      "question": "What is source code first converted into?",
      "leftChoice": { "id": "n1a", "text": "Electrical signals" },
      "rightChoice": { "id": "n1b", "text": "Machine instructions" },
      "correctChoiceId": "n1b"
    },
    {
      "id": "n2",
      "question": "Where are instructions loaded for execution?",
      "leftChoice": { "id": "n2a", "text": "RAM (memory)" },
      "rightChoice": { "id": "n2b", "text": "Hard drive" },
      "correctChoiceId": "n2a"
    },
    {
      "id": "n3",
      "question": "What component executes each instruction?",
      "leftChoice": { "id": "n3a", "text": "The graphics card" },
      "rightChoice": { "id": "n3b", "text": "The CPU (processor)" },
      "correctChoiceId": "n3b"
    },
    {
      "id": "n4",
      "question": "How does the CPU know which instruction is next?",
      "leftChoice": { "id": "n4a", "text": "Program counter register" },
      "rightChoice": { "id": "n4b", "text": "Random selection" },
      "correctChoiceId": "n4a"
    },
    {
      "id": "n5",
      "question": "Where does the CPU store data it is actively using?",
      "leftChoice": { "id": "n5a", "text": "Back on the hard drive" },
      "rightChoice": { "id": "n5b", "text": "Registers & cache" },
      "correctChoiceId": "n5b"
    }
  ],
  "finalAnswer": "Programs run by being compiled into machine code, loaded into RAM, then executed by the CPU which follows the program counter and uses registers/cache for fast data access."
}', 3, '{"computer-science", "hardware", "programming"}');
