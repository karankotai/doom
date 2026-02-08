-- Migration: 026_chart_reading_seed
-- Description: Seed chart reading applets across bar, pie, line, scatter, histogram types

INSERT INTO applets (type, title, question, hint, content, difficulty, tags) VALUES
-- 1) Bar chart: Starbucks cafes by state (matches reference image)
(
    'chart-reading',
    'Starbucks Cafes by State',
    'What state has about 400 cafes?',
    'Look at which bar reaches closest to the 400 line on the y-axis.',
    '{
        "chartType": "bar",
        "chartTitle": "Number of Starbucks cafes in selected states",
        "data": [
            {"id": "vt", "label": "VT", "value": 30},
            {"id": "de", "label": "DE", "value": 40},
            {"id": "ct", "label": "CT", "value": 120},
            {"id": "nj", "label": "NJ", "value": 290},
            {"id": "pa", "label": "PA", "value": 400},
            {"id": "va", "label": "VA", "value": 460},
            {"id": "ny", "label": "NY", "value": 650}
        ],
        "yAxisLabel": "Number of cafes",
        "selectCount": 1,
        "correctIds": ["pa"]
    }',
    1,
    ARRAY['math', 'data-literacy', 'bar-chart']
),
-- 2) Bar chart: select a pair (matches reference)
(
    'chart-reading',
    'Most Cafes Combined',
    'What pair of states have the most cafes combined?',
    'Add up the values of each possible pair and find the largest total.',
    '{
        "chartType": "bar",
        "chartTitle": "Number of Starbucks cafes in selected states",
        "data": [
            {"id": "vt", "label": "VT", "value": 30},
            {"id": "de", "label": "DE", "value": 40},
            {"id": "ct", "label": "CT", "value": 120},
            {"id": "nj", "label": "NJ", "value": 290},
            {"id": "pa", "label": "PA", "value": 400},
            {"id": "va", "label": "VA", "value": 460},
            {"id": "ny", "label": "NY", "value": 650}
        ],
        "yAxisLabel": "Number of cafes",
        "selectCount": 2,
        "correctIds": ["va", "ny"]
    }',
    2,
    ARRAY['math', 'data-literacy', 'bar-chart']
),
-- 3) Bar chart: similarity comparison (matches reference)
(
    'chart-reading',
    'Similar Values',
    'Which state has a number of cafes most similar to PA?',
    'PA has about 400 cafes. Look for the bar closest to that height.',
    '{
        "chartType": "bar",
        "chartTitle": "Number of Starbucks cafes in selected states",
        "data": [
            {"id": "vt", "label": "VT", "value": 30},
            {"id": "de", "label": "DE", "value": 40},
            {"id": "ct", "label": "CT", "value": 120},
            {"id": "nj", "label": "NJ", "value": 290},
            {"id": "pa", "label": "PA", "value": 400},
            {"id": "va", "label": "VA", "value": 460},
            {"id": "ny", "label": "NY", "value": 650}
        ],
        "yAxisLabel": "Number of cafes",
        "selectCount": 1,
        "correctIds": ["va"]
    }',
    2,
    ARRAY['math', 'data-literacy', 'bar-chart', 'comparison']
),
-- 4) Pie chart: budget breakdown
(
    'chart-reading',
    'Monthly Budget',
    'Which category takes up the largest share of the budget?',
    'Look for the biggest slice of the pie.',
    '{
        "chartType": "pie",
        "chartTitle": "Monthly household budget breakdown",
        "data": [
            {"id": "housing", "label": "Housing", "value": 1500},
            {"id": "food", "label": "Food", "value": 600},
            {"id": "transport", "label": "Transport", "value": 400},
            {"id": "utilities", "label": "Utilities", "value": 250},
            {"id": "entertainment", "label": "Fun", "value": 200},
            {"id": "savings", "label": "Savings", "value": 350}
        ],
        "selectCount": 1,
        "correctIds": ["housing"],
        "unit": "$"
    }',
    1,
    ARRAY['math', 'data-literacy', 'pie-chart', 'finance']
),
-- 5) Pie chart: select two smallest
(
    'chart-reading',
    'Budget Cuts',
    'Which two categories make up the smallest combined share?',
    'Find the two thinnest slices.',
    '{
        "chartType": "pie",
        "chartTitle": "Monthly household budget breakdown",
        "data": [
            {"id": "housing", "label": "Housing", "value": 1500},
            {"id": "food", "label": "Food", "value": 600},
            {"id": "transport", "label": "Transport", "value": 400},
            {"id": "utilities", "label": "Utilities", "value": 250},
            {"id": "entertainment", "label": "Fun", "value": 200},
            {"id": "savings", "label": "Savings", "value": 350}
        ],
        "selectCount": 2,
        "correctIds": ["utilities", "entertainment"],
        "unit": "$"
    }',
    2,
    ARRAY['math', 'data-literacy', 'pie-chart', 'finance']
),
-- 6) Line chart: temperature trend
(
    'chart-reading',
    'Temperature Trend',
    'In which month was the temperature highest?',
    'Find the peak — the highest point on the line.',
    '{
        "chartType": "line",
        "chartTitle": "Average monthly temperature in New York City",
        "data": [
            {"id": "jan", "label": "Jan", "value": 33},
            {"id": "feb", "label": "Feb", "value": 35},
            {"id": "mar", "label": "Mar", "value": 45},
            {"id": "apr", "label": "Apr", "value": 55},
            {"id": "may", "label": "May", "value": 65},
            {"id": "jun", "label": "Jun", "value": 75},
            {"id": "jul", "label": "Jul", "value": 82},
            {"id": "aug", "label": "Aug", "value": 80},
            {"id": "sep", "label": "Sep", "value": 72},
            {"id": "oct", "label": "Oct", "value": 60},
            {"id": "nov", "label": "Nov", "value": 48},
            {"id": "dec", "label": "Dec", "value": 37}
        ],
        "yAxisLabel": "Temperature (°F)",
        "xAxisLabel": "Month",
        "selectCount": 1,
        "correctIds": ["jul"],
        "unit": "°F"
    }',
    1,
    ARRAY['science', 'data-literacy', 'line-chart', 'weather']
),
-- 7) Line chart: biggest month-to-month jump
(
    'chart-reading',
    'Biggest Temperature Jump',
    'Between which two consecutive months is the temperature increase the greatest?',
    'Look for the steepest upward slope on the line — the two points where the line climbs most sharply.',
    '{
        "chartType": "line",
        "chartTitle": "Average monthly temperature in New York City",
        "data": [
            {"id": "jan", "label": "Jan", "value": 33},
            {"id": "feb", "label": "Feb", "value": 35},
            {"id": "mar", "label": "Mar", "value": 45},
            {"id": "apr", "label": "Apr", "value": 55},
            {"id": "may", "label": "May", "value": 65},
            {"id": "jun", "label": "Jun", "value": 75},
            {"id": "jul", "label": "Jul", "value": 82},
            {"id": "aug", "label": "Aug", "value": 80},
            {"id": "sep", "label": "Sep", "value": 72},
            {"id": "oct", "label": "Oct", "value": 60},
            {"id": "nov", "label": "Nov", "value": 48},
            {"id": "dec", "label": "Dec", "value": 37}
        ],
        "yAxisLabel": "Temperature (°F)",
        "xAxisLabel": "Month",
        "selectCount": 2,
        "correctIds": ["feb", "mar"],
        "unit": "°F"
    }',
    3,
    ARRAY['math', 'data-literacy', 'line-chart', 'rate-of-change']
),
-- 8) Scatter plot: study hours vs test score
(
    'chart-reading',
    'Study Hours vs Test Score',
    'Which student studied the most hours but scored below 80?',
    'Look for the point furthest to the right that is below the 80 line.',
    '{
        "chartType": "scatter",
        "chartTitle": "Study hours vs test scores for 8 students",
        "data": [
            {"id": "s1", "label": "Amy", "value": 2, "value2": 55},
            {"id": "s2", "label": "Ben", "value": 3, "value2": 62},
            {"id": "s3", "label": "Cara", "value": 4, "value2": 70},
            {"id": "s4", "label": "Dan", "value": 5, "value2": 75},
            {"id": "s5", "label": "Eve", "value": 6, "value2": 85},
            {"id": "s6", "label": "Fay", "value": 7, "value2": 90},
            {"id": "s7", "label": "Gus", "value": 8, "value2": 78},
            {"id": "s8", "label": "Hal", "value": 9, "value2": 95}
        ],
        "xAxisLabel": "Study hours per week",
        "yAxisLabel": "Test score",
        "selectCount": 1,
        "correctIds": ["s7"]
    }',
    2,
    ARRAY['math', 'data-literacy', 'scatter-plot', 'correlation']
),
-- 9) Scatter plot: outlier detection
(
    'chart-reading',
    'Outlier Detection',
    'Which two points appear to be outliers — far from the general trend?',
    'Most points follow a pattern. Look for ones that are much higher or lower than expected.',
    '{
        "chartType": "scatter",
        "chartTitle": "Height vs weight of 8 individuals",
        "data": [
            {"id": "p1", "label": "A", "value": 150, "value2": 50},
            {"id": "p2", "label": "B", "value": 160, "value2": 60},
            {"id": "p3", "label": "C", "value": 165, "value2": 95},
            {"id": "p4", "label": "D", "value": 170, "value2": 70},
            {"id": "p5", "label": "E", "value": 175, "value2": 75},
            {"id": "p6", "label": "F", "value": 180, "value2": 80},
            {"id": "p7", "label": "G", "value": 185, "value2": 45},
            {"id": "p8", "label": "H", "value": 190, "value2": 90}
        ],
        "xAxisLabel": "Height (cm)",
        "yAxisLabel": "Weight (kg)",
        "selectCount": 2,
        "correctIds": ["p3", "p7"]
    }',
    3,
    ARRAY['math', 'data-literacy', 'scatter-plot', 'outliers']
),
-- 10) Histogram: exam score distribution
(
    'chart-reading',
    'Exam Score Distribution',
    'Which score range had the most students?',
    'Find the tallest bar in the histogram.',
    '{
        "chartType": "histogram",
        "chartTitle": "Distribution of exam scores in a class of 30",
        "data": [
            {"id": "r1", "label": "0-20", "value": 1},
            {"id": "r2", "label": "21-40", "value": 3},
            {"id": "r3", "label": "41-60", "value": 6},
            {"id": "r4", "label": "61-80", "value": 12},
            {"id": "r5", "label": "81-100", "value": 8}
        ],
        "xAxisLabel": "Score range",
        "yAxisLabel": "Number of students",
        "selectCount": 1,
        "correctIds": ["r4"]
    }',
    1,
    ARRAY['math', 'data-literacy', 'histogram', 'statistics']
),
-- 11) Bar chart: population comparison
(
    'chart-reading',
    'World Population',
    'Which two countries have the most similar population?',
    'Look for two bars that are closest in height to each other.',
    '{
        "chartType": "bar",
        "chartTitle": "Population of selected countries (millions, 2023)",
        "data": [
            {"id": "au", "label": "Australia", "value": 26},
            {"id": "ca", "label": "Canada", "value": 39},
            {"id": "fr", "label": "France", "value": 68},
            {"id": "uk", "label": "UK", "value": 67},
            {"id": "de", "label": "Germany", "value": 84},
            {"id": "jp", "label": "Japan", "value": 125}
        ],
        "yAxisLabel": "Population (millions)",
        "selectCount": 2,
        "correctIds": ["fr", "uk"],
        "unit": "M"
    }',
    2,
    ARRAY['geography', 'data-literacy', 'bar-chart', 'population']
),
-- 12) Pie chart: energy sources
(
    'chart-reading',
    'Energy Sources',
    'Which energy source provides about a quarter of electricity?',
    'A quarter is 25%. Look for the slice that takes up about one fourth of the pie.',
    '{
        "chartType": "pie",
        "chartTitle": "US electricity generation by source (2023)",
        "data": [
            {"id": "gas", "label": "Natural Gas", "value": 43},
            {"id": "coal", "label": "Coal", "value": 16},
            {"id": "nuclear", "label": "Nuclear", "value": 19},
            {"id": "wind", "label": "Wind", "value": 11},
            {"id": "solar", "label": "Solar", "value": 6},
            {"id": "hydro", "label": "Hydro", "value": 5}
        ],
        "selectCount": 1,
        "correctIds": ["nuclear"],
        "unit": "%"
    }',
    2,
    ARRAY['science', 'data-literacy', 'pie-chart', 'energy']
),
-- 13) Histogram: age distribution
(
    'chart-reading',
    'Age Distribution',
    'Which two age ranges combined have the fewest people?',
    'Add up the frequencies for each pair and find the smallest total.',
    '{
        "chartType": "histogram",
        "chartTitle": "Age distribution of marathon runners",
        "data": [
            {"id": "a1", "label": "18-24", "value": 45},
            {"id": "a2", "label": "25-34", "value": 120},
            {"id": "a3", "label": "35-44", "value": 95},
            {"id": "a4", "label": "45-54", "value": 60},
            {"id": "a5", "label": "55-64", "value": 25},
            {"id": "a6", "label": "65+", "value": 10}
        ],
        "xAxisLabel": "Age range",
        "yAxisLabel": "Number of runners",
        "selectCount": 2,
        "correctIds": ["a5", "a6"]
    }',
    2,
    ARRAY['math', 'data-literacy', 'histogram', 'statistics']
),
-- 14) Line chart: stock price
(
    'chart-reading',
    'Stock Price Trend',
    'In which quarter did the stock price drop the most?',
    'Look for the steepest downward slope — where the line falls most sharply.',
    '{
        "chartType": "line",
        "chartTitle": "Quarterly stock price of TechCorp ($)",
        "data": [
            {"id": "q1-22", "label": "Q1 22", "value": 150},
            {"id": "q2-22", "label": "Q2 22", "value": 165},
            {"id": "q3-22", "label": "Q3 22", "value": 120},
            {"id": "q4-22", "label": "Q4 22", "value": 135},
            {"id": "q1-23", "label": "Q1 23", "value": 180},
            {"id": "q2-23", "label": "Q2 23", "value": 175},
            {"id": "q3-23", "label": "Q3 23", "value": 200},
            {"id": "q4-23", "label": "Q4 23", "value": 210}
        ],
        "yAxisLabel": "Price ($)",
        "xAxisLabel": "Quarter",
        "selectCount": 1,
        "correctIds": ["q3-22"],
        "unit": "$"
    }',
    2,
    ARRAY['finance', 'data-literacy', 'line-chart', 'trends']
);
