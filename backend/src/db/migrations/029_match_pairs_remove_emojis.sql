-- Migration: 029_match_pairs_remove_emojis
-- Description: Remove emoji fields from match-pairs applet content

-- Strip "emoji" keys from leftItems array elements
UPDATE applets
SET content = (
    SELECT jsonb_set(
        content,
        '{leftItems}',
        (
            SELECT jsonb_agg(
                item - 'emoji'
            )
            FROM jsonb_array_elements(content->'leftItems') AS item
        )
    )
)
WHERE type = 'match-pairs'
  AND content->'leftItems' IS NOT NULL;

-- Strip "emoji" keys from rightItems array elements (just in case)
UPDATE applets
SET content = (
    SELECT jsonb_set(
        content,
        '{rightItems}',
        (
            SELECT jsonb_agg(
                item - 'emoji'
            )
            FROM jsonb_array_elements(content->'rightItems') AS item
        )
    )
)
WHERE type = 'match-pairs'
  AND content->'rightItems' IS NOT NULL;
