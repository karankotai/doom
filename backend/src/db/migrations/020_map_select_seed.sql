-- Migration: 020_map_select_seed
-- Description: Seed map select applet data with geography, history, and population questions

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
(
    'map-select',
    'Equatorial Countries',
    'Select all countries that the Equator passes through.',
    'The Equator passes through 3 continents — South America, Africa, and Asia.',
    '{
        "regions": [
            {"id": "BR", "label": "Brazil"},
            {"id": "CO", "label": "Colombia"},
            {"id": "EC", "label": "Ecuador"},
            {"id": "PE", "label": "Peru"},
            {"id": "KE", "label": "Kenya"},
            {"id": "UG", "label": "Uganda"},
            {"id": "CD", "label": "DR Congo"},
            {"id": "GA", "label": "Gabon"},
            {"id": "ID", "label": "Indonesia"},
            {"id": "AR", "label": "Argentina"},
            {"id": "EG", "label": "Egypt"},
            {"id": "IN", "label": "India"},
            {"id": "AU", "label": "Australia"},
            {"id": "MX", "label": "Mexico"}
        ],
        "correctRegionIds": ["BR", "CO", "EC", "KE", "UG", "CD", "GA", "ID"]
    }',
    2,
    ARRAY['geography', 'equator', 'world']
),
(
    'map-select',
    'Roman Empire at its Peak',
    'Select all modern-day countries that were fully or partially part of the Roman Empire at its greatest extent (117 AD).',
    'The Roman Empire stretched from Britain to Mesopotamia, and surrounded the entire Mediterranean Sea.',
    '{
        "regions": [
            {"id": "UK", "label": "United Kingdom"},
            {"id": "FR", "label": "France"},
            {"id": "ES", "label": "Spain"},
            {"id": "PT", "label": "Portugal"},
            {"id": "IT", "label": "Italy"},
            {"id": "GR", "label": "Greece"},
            {"id": "TR", "label": "Turkey"},
            {"id": "EG", "label": "Egypt"},
            {"id": "DZ", "label": "Algeria"},
            {"id": "MA", "label": "Morocco"},
            {"id": "RO", "label": "Romania"},
            {"id": "IQ", "label": "Iraq"},
            {"id": "DE", "label": "Germany"},
            {"id": "RU", "label": "Russia"},
            {"id": "CN", "label": "China"},
            {"id": "IN", "label": "India"},
            {"id": "NG", "label": "Nigeria"},
            {"id": "SA", "label": "Saudi Arabia"}
        ],
        "correctRegionIds": ["UK", "FR", "ES", "PT", "IT", "GR", "TR", "EG", "DZ", "MA", "RO", "IQ"]
    }',
    3,
    ARRAY['history', 'roman-empire', 'ancient']
),
(
    'map-select',
    'Countries in South America',
    'Select all countries that are in South America.',
    'South America has 12 independent countries.',
    '{
        "regions": [
            {"id": "BR", "label": "Brazil"},
            {"id": "AR", "label": "Argentina"},
            {"id": "CO", "label": "Colombia"},
            {"id": "PE", "label": "Peru"},
            {"id": "VE", "label": "Venezuela"},
            {"id": "CL", "label": "Chile"},
            {"id": "EC", "label": "Ecuador"},
            {"id": "BO", "label": "Bolivia"},
            {"id": "MX", "label": "Mexico"},
            {"id": "CU", "label": "Cuba"},
            {"id": "GT", "label": "Guatemala"},
            {"id": "HN", "label": "Honduras"},
            {"id": "US", "label": "United States"},
            {"id": "ES", "label": "Spain"},
            {"id": "PT", "label": "Portugal"}
        ],
        "correctRegionIds": ["BR", "AR", "CO", "PE", "VE", "CL", "EC", "BO"]
    }',
    1,
    ARRAY['geography', 'south-america', 'continents']
),
(
    'map-select',
    'Largest Countries by Population',
    'Select the 5 most populous countries in the world (as of 2024).',
    'Think about which countries in Asia and elsewhere have over 200 million people.',
    '{
        "regions": [
            {"id": "CN", "label": "China"},
            {"id": "IN", "label": "India"},
            {"id": "US", "label": "United States"},
            {"id": "ID", "label": "Indonesia"},
            {"id": "PK", "label": "Pakistan"},
            {"id": "BR", "label": "Brazil"},
            {"id": "NG", "label": "Nigeria"},
            {"id": "RU", "label": "Russia"},
            {"id": "JP", "label": "Japan"},
            {"id": "MX", "label": "Mexico"},
            {"id": "DE", "label": "Germany"},
            {"id": "AU", "label": "Australia"}
        ],
        "correctRegionIds": ["IN", "CN", "US", "ID", "PK"]
    }',
    2,
    ARRAY['geography', 'population', 'world']
),
(
    'map-select',
    'Countries in the European Union',
    'Select all of these countries that are current members of the European Union.',
    'The EU currently has 27 member states. The UK left in 2020.',
    '{
        "regions": [
            {"id": "FR", "label": "France"},
            {"id": "DE", "label": "Germany"},
            {"id": "IT", "label": "Italy"},
            {"id": "ES", "label": "Spain"},
            {"id": "PL", "label": "Poland"},
            {"id": "RO", "label": "Romania"},
            {"id": "SE", "label": "Sweden"},
            {"id": "GR", "label": "Greece"},
            {"id": "PT", "label": "Portugal"},
            {"id": "FI", "label": "Finland"},
            {"id": "UK", "label": "United Kingdom"},
            {"id": "NO", "label": "Norway"},
            {"id": "TR", "label": "Turkey"},
            {"id": "RU", "label": "Russia"},
            {"id": "UA", "label": "Ukraine"}
        ],
        "correctRegionIds": ["FR", "DE", "IT", "ES", "PL", "RO", "SE", "GR", "PT", "FI"]
    }',
    2,
    ARRAY['geography', 'european-union', 'europe']
),
(
    'map-select',
    'Countries the Nile River Flows Through',
    'Select the countries that the Nile River flows through.',
    'The Nile is the longest river in Africa, flowing from the Great Lakes region northward to the Mediterranean.',
    '{
        "regions": [
            {"id": "EG", "label": "Egypt"},
            {"id": "SD", "label": "Sudan"},
            {"id": "UG", "label": "Uganda"},
            {"id": "ET", "label": "Ethiopia"},
            {"id": "KE", "label": "Kenya"},
            {"id": "TZ", "label": "Tanzania"},
            {"id": "CD", "label": "DR Congo"},
            {"id": "NG", "label": "Nigeria"},
            {"id": "ZA", "label": "South Africa"},
            {"id": "MA", "label": "Morocco"},
            {"id": "DZ", "label": "Algeria"},
            {"id": "GH", "label": "Ghana"}
        ],
        "correctRegionIds": ["EG", "SD", "UG", "ET", "TZ", "CD"]
    }',
    3,
    ARRAY['geography', 'rivers', 'africa']
),
(
    'map-select',
    'Mongol Empire Territory',
    'Select the modern-day countries whose territory was substantially part of the Mongol Empire at its peak (1279 AD).',
    'The Mongol Empire was the largest contiguous land empire in history, stretching from Korea to Eastern Europe.',
    '{
        "regions": [
            {"id": "MN", "label": "Mongolia"},
            {"id": "CN", "label": "China"},
            {"id": "RU", "label": "Russia"},
            {"id": "IR", "label": "Iran"},
            {"id": "IQ", "label": "Iraq"},
            {"id": "KR", "label": "South Korea"},
            {"id": "UA", "label": "Ukraine"},
            {"id": "PK", "label": "Pakistan"},
            {"id": "JP", "label": "Japan"},
            {"id": "IN", "label": "India"},
            {"id": "BR", "label": "Brazil"},
            {"id": "AU", "label": "Australia"},
            {"id": "US", "label": "United States"},
            {"id": "FR", "label": "France"}
        ],
        "correctRegionIds": ["MN", "CN", "RU", "IR", "IQ", "KR", "UA", "PK"]
    }',
    4,
    ARRAY['history', 'mongol-empire', 'medieval']
);
