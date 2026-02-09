-- Migration: 041_applet_explanation
-- Description: Add an 'explanation' column to the applets table.
-- Shown to users AFTER they check their answer to explain the reasoning.

ALTER TABLE applets ADD COLUMN IF NOT EXISTS explanation TEXT;
