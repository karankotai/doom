-- Seed highlight-text applets for grammar exercises
INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
  'highlight-text',
  'Parts of Speech: Basic',
  'Identify the nouns, articles, and verbs in this sentence.',
  'Nouns are people, places, or things. Articles are "a", "an", "the". Verbs show action.',
  '{
    "text": "The cat chased a mouse across the garden.",
    "categories": ["noun", "article", "verb"],
    "correctHighlights": [
      { "text": "The", "startIndex": 0, "endIndex": 3, "category": "article" },
      { "text": "cat", "startIndex": 4, "endIndex": 7, "category": "noun" },
      { "text": "chased", "startIndex": 8, "endIndex": 14, "category": "verb" },
      { "text": "a", "startIndex": 15, "endIndex": 16, "category": "article" },
      { "text": "mouse", "startIndex": 17, "endIndex": 22, "category": "noun" },
      { "text": "the", "startIndex": 30, "endIndex": 33, "category": "article" },
      { "text": "garden", "startIndex": 34, "endIndex": 40, "category": "noun" }
    ]
  }'::jsonb,
  1,
  ARRAY['grammar', 'parts-of-speech', 'english']
),
(
  'highlight-text',
  'Parts of Speech: Pronouns',
  'Find all the pronouns and verbs in this sentence.',
  'Pronouns replace nouns (I, you, he, she, it, we, they). Verbs show action or state.',
  '{
    "text": "She gave him the book because he needed it for his class.",
    "categories": ["pronoun", "verb"],
    "correctHighlights": [
      { "text": "She", "startIndex": 0, "endIndex": 3, "category": "pronoun" },
      { "text": "gave", "startIndex": 4, "endIndex": 8, "category": "verb" },
      { "text": "him", "startIndex": 9, "endIndex": 12, "category": "pronoun" },
      { "text": "he", "startIndex": 29, "endIndex": 31, "category": "pronoun" },
      { "text": "needed", "startIndex": 32, "endIndex": 38, "category": "verb" },
      { "text": "it", "startIndex": 39, "endIndex": 41, "category": "pronoun" },
      { "text": "his", "startIndex": 46, "endIndex": 49, "category": "pronoun" }
    ]
  }'::jsonb,
  2,
  ARRAY['grammar', 'pronouns', 'english']
),
(
  'highlight-text',
  'Adjectives and Adverbs',
  'Identify the adjectives and adverbs in this sentence.',
  'Adjectives describe nouns. Adverbs describe verbs, adjectives, or other adverbs (often end in -ly).',
  '{
    "text": "The tall man quickly climbed the steep mountain very carefully.",
    "categories": ["adjective", "adverb"],
    "correctHighlights": [
      { "text": "tall", "startIndex": 4, "endIndex": 8, "category": "adjective" },
      { "text": "quickly", "startIndex": 14, "endIndex": 21, "category": "adverb" },
      { "text": "steep", "startIndex": 33, "endIndex": 38, "category": "adjective" },
      { "text": "very", "startIndex": 48, "endIndex": 52, "category": "adverb" },
      { "text": "carefully", "startIndex": 53, "endIndex": 62, "category": "adverb" }
    ]
  }'::jsonb,
  2,
  ARRAY['grammar', 'adjectives', 'adverbs', 'english']
),
(
  'highlight-text',
  'Subject and Predicate',
  'Identify the complete subject and complete predicate of this sentence.',
  'The subject is who/what the sentence is about. The predicate tells what the subject does or is.',
  '{
    "text": "The young scientist discovered a new species of butterfly.",
    "categories": ["subject", "predicate"],
    "correctHighlights": [
      { "text": "The young scientist", "startIndex": 0, "endIndex": 19, "category": "subject" },
      { "text": "discovered a new species of butterfly", "startIndex": 20, "endIndex": 57, "category": "predicate" }
    ]
  }'::jsonb,
  3,
  ARRAY['grammar', 'sentence-structure', 'english']
);
