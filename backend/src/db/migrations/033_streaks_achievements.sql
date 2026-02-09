-- Add streak + daily goal columns to user_profiles
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_activity_date DATE,
  ADD COLUMN IF NOT EXISTS daily_xp INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS daily_goal INTEGER DEFAULT 50;

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  label VARCHAR(100) NOT NULL,
  emoji VARCHAR(10) NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, type)
);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);
