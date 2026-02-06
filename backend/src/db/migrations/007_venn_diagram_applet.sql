-- Migration: 007_venn_diagram_applet
-- Description: Add venn-diagram applet type to enum

-- Add venn-diagram to applet_type enum
ALTER TYPE applet_type ADD VALUE 'venn-diagram';
