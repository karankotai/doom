-- Migration: 008_venn_diagram_seed
-- Description: Seed venn-diagram applet data

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
    'venn-diagram',
    'Set Intersection',
    'Color the region that represents A ∩ B (A intersection B)',
    'The intersection contains elements that are in BOTH sets.',
    '{
        "labels": ["A", "B"],
        "correctRegions": ["a-and-b"]
    }',
    1,
    ARRAY['math', 'sets', 'venn-diagram']
),
(
    'venn-diagram',
    'Set Union',
    'Color all regions that represent A ∪ B (A union B)',
    'The union contains elements that are in A OR B (or both).',
    '{
        "labels": ["A", "B"],
        "correctRegions": ["a-only", "b-only", "a-and-b"]
    }',
    1,
    ARRAY['math', 'sets', 'venn-diagram']
),
(
    'venn-diagram',
    'Only in A',
    'Color the region that contains elements ONLY in set A (not in B)',
    'This is A minus the intersection with B.',
    '{
        "labels": ["A", "B"],
        "correctRegions": ["a-only"]
    }',
    1,
    ARRAY['math', 'sets', 'venn-diagram']
),
(
    'venn-diagram',
    'Complement of A',
    'Color all regions that represent A'' (complement of A / not in A)',
    'The complement includes everything NOT in A.',
    '{
        "labels": ["A", "B"],
        "correctRegions": ["b-only", "neither"]
    }',
    2,
    ARRAY['math', 'sets', 'complement']
),
(
    'venn-diagram',
    'Symmetric Difference',
    'Color the regions that represent A △ B (in A or B, but not both)',
    'Symmetric difference excludes the intersection.',
    '{
        "labels": ["A", "B"],
        "correctRegions": ["a-only", "b-only"]
    }',
    2,
    ARRAY['math', 'sets', 'venn-diagram']
),
(
    'venn-diagram',
    'Neither A nor B',
    'Color the region that contains elements in neither A nor B',
    'This is the area outside both circles.',
    '{
        "labels": ["A", "B"],
        "correctRegions": ["neither"]
    }',
    1,
    ARRAY['math', 'sets', 'venn-diagram']
);
