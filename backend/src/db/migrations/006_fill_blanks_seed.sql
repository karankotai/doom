-- Migration: 006_fill_blanks_seed
-- Description: Seed fill-blanks applet data

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
    'fill-blanks',
    'Photosynthesis',
    'Complete the sentence about photosynthesis.',
    'Plants use sunlight to convert water and carbon dioxide into glucose and oxygen.',
    '{
        "segments": [
            {"type": "text", "content": "Plants use "},
            {"type": "slot", "slotId": "s1", "correctAnswerId": "ans-sunlight"},
            {"type": "text", "content": " to convert water and "},
            {"type": "slot", "slotId": "s2", "correctAnswerId": "ans-co2"},
            {"type": "text", "content": " into glucose and "},
            {"type": "slot", "slotId": "s3", "correctAnswerId": "ans-oxygen"},
            {"type": "text", "content": "."}
        ],
        "answerBlocks": [
            {"id": "ans-sunlight", "content": "sunlight"},
            {"id": "ans-co2", "content": "carbon dioxide"},
            {"id": "ans-oxygen", "content": "oxygen"},
            {"id": "dist-1", "content": "nitrogen"},
            {"id": "dist-2", "content": "moonlight"}
        ]
    }',
    1,
    ARRAY['science', 'biology', 'photosynthesis']
),
(
    'fill-blanks',
    'Parts of Speech',
    'Identify the parts of speech in this sentence.',
    'A noun is a person, place, or thing. A verb is an action word.',
    '{
        "segments": [
            {"type": "text", "content": "The "},
            {"type": "slot", "slotId": "s1", "correctAnswerId": "ans-adj"},
            {"type": "text", "content": " cat "},
            {"type": "slot", "slotId": "s2", "correctAnswerId": "ans-verb"},
            {"type": "text", "content": " over the "},
            {"type": "slot", "slotId": "s3", "correctAnswerId": "ans-noun"},
            {"type": "text", "content": "."}
        ],
        "answerBlocks": [
            {"id": "ans-adj", "content": "quick (adjective)"},
            {"id": "ans-verb", "content": "jumped (verb)"},
            {"id": "ans-noun", "content": "fence (noun)"},
            {"id": "dist-1", "content": "slowly (adverb)"},
            {"id": "dist-2", "content": "and (conjunction)"}
        ]
    }',
    1,
    ARRAY['english', 'grammar', 'parts-of-speech']
),
(
    'fill-blanks',
    'Water Cycle',
    'Fill in the stages of the water cycle.',
    'Water evaporates, forms clouds, and falls back as precipitation.',
    '{
        "segments": [
            {"type": "text", "content": "Water from oceans and lakes turns into vapor through "},
            {"type": "slot", "slotId": "s1", "correctAnswerId": "ans-evap"},
            {"type": "text", "content": ". The vapor rises and cools to form clouds through "},
            {"type": "slot", "slotId": "s2", "correctAnswerId": "ans-cond"},
            {"type": "text", "content": ". Finally, water falls back to Earth as "},
            {"type": "slot", "slotId": "s3", "correctAnswerId": "ans-precip"},
            {"type": "text", "content": "."}
        ],
        "answerBlocks": [
            {"id": "ans-evap", "content": "evaporation"},
            {"id": "ans-cond", "content": "condensation"},
            {"id": "ans-precip", "content": "precipitation"},
            {"id": "dist-1", "content": "sublimation"},
            {"id": "dist-2", "content": "transpiration"}
        ]
    }',
    2,
    ARRAY['science', 'earth-science', 'water-cycle']
),
(
    'fill-blanks',
    'Historical Events',
    'Complete the facts about World War II.',
    'Think about when the war started and ended.',
    '{
        "segments": [
            {"type": "text", "content": "World War II began in "},
            {"type": "slot", "slotId": "s1", "correctAnswerId": "ans-1939"},
            {"type": "text", "content": " and ended in "},
            {"type": "slot", "slotId": "s2", "correctAnswerId": "ans-1945"},
            {"type": "text", "content": ". The Allied Powers included the United States, Britain, and the "},
            {"type": "slot", "slotId": "s3", "correctAnswerId": "ans-soviet"},
            {"type": "text", "content": "."}
        ],
        "answerBlocks": [
            {"id": "ans-1939", "content": "1939"},
            {"id": "ans-1945", "content": "1945"},
            {"id": "ans-soviet", "content": "Soviet Union"},
            {"id": "dist-1", "content": "1941"},
            {"id": "dist-2", "content": "Germany"}
        ]
    }',
    2,
    ARRAY['history', 'world-war-2']
),
(
    'fill-blanks',
    'Verb Tenses',
    'Choose the correct verb tense for each blank.',
    'Pay attention to time indicators like "yesterday" and "tomorrow".',
    '{
        "segments": [
            {"type": "text", "content": "Yesterday, I "},
            {"type": "slot", "slotId": "s1", "correctAnswerId": "ans-walked"},
            {"type": "text", "content": " to the store. Right now, I "},
            {"type": "slot", "slotId": "s2", "correctAnswerId": "ans-am-walking"},
            {"type": "text", "content": " home. Tomorrow, I "},
            {"type": "slot", "slotId": "s3", "correctAnswerId": "ans-will-walk"},
            {"type": "text", "content": " to school."}
        ],
        "answerBlocks": [
            {"id": "ans-walked", "content": "walked"},
            {"id": "ans-am-walking", "content": "am walking"},
            {"id": "ans-will-walk", "content": "will walk"},
            {"id": "dist-1", "content": "walk"},
            {"id": "dist-2", "content": "walking"}
        ]
    }',
    1,
    ARRAY['english', 'grammar', 'verb-tenses']
);
