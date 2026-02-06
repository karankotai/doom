-- Migration: 003_mcq_applet
-- Description: Add MCQ applet type to enum

-- Add mcq to applet_type enum
ALTER TYPE applet_type ADD VALUE 'mcq';
