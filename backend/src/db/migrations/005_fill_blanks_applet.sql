-- Migration: 005_fill_blanks_applet
-- Description: Add fill-blanks applet type to enum

-- Add fill-blanks to applet_type enum
ALTER TYPE applet_type ADD VALUE 'fill-blanks';
