npm run d-- Forum Database Schema
-- Comprehensive schema for trading/business forum platform

-- Users table (extends existing user system)
CREATE TABLE IF NOT EXISTS forum_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    location VARCHAR(100),
    website VARCHAR(255),
    level VARCHAR(20) DEFAULT 'C-Tier' CHECK (level IN ('S-Tier', 'A-Tier', 'B-Tier', 'C-Tier')),
    reputation INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Suspended', 'Banned')),
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    show_trading_stats BOOLEAN DEFAULT true,
    show_location BOOLEAN DEFAULT true,
    allow_direct_messages BOOLEAN DEFAULT true,
    profile_visibility VARCHAR(20) DEFAULT 'Public' CHECK (profile_visibility IN ('Public', 'Members Only', 'Private')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    last_active TIMESTAMPTZ DEFAULT now()
);

-- User statistics
CREATE TABLE IF NOT EXISTS user_stats (
    user_id UUID PRIMARY KEY REFERENCES forum_users(id) ON DELETE CASCADE,
    posts_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    likes_received INTEGER DEFAULT 0,
    likes_given INTEGER DEFAULT 0,
    views_received INTEGER DEFAULT 0,
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    squads_count INTEGER DEFAULT 0,
    helpful_votes INTEGER DEFAULT 0,
    best_answers INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Trading statistics (verified performance data)
CREATE TABLE IF NOT EXISTS user_trading_stats (
    user_id UUID PRIMARY KEY REFERENCES forum_users(id) ON DELETE CASCADE,
    win_rate DECIMAL(5,2),
    total_trades INTEGER,
    avg_return DECIMAL(8,4),
    max_drawdown DECIMAL(5,2),
    sharpe_ratio DECIMAL(6,3),
    profit_factor DECIMAL(6,3),
    is_verified BOOLEAN DEFAULT false,
    verification_date TIMESTAMPTZ,
    verified_by UUID REFERENCES forum_users(id),
    specializations TEXT[],
    broker_statements TEXT[], -- URLs to verified statements
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- User badges and achievements
CREATE TABLE IF NOT EXISTS user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES forum_users(id) ON DELETE CASCADE,
    badge_type VARCHAR(50) NOT NULL,
    badge_name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    category VARCHAR(50) CHECK (category IN ('Trading', 'Community', 'Business', 'Education', 'Special')),
    earned_at TIMESTAMPTZ DEFAULT now(),
    awarded_by UUID REFERENCES forum_users(id)
);

-- User roles and permissions
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES forum_users(id) ON DELETE CASCADE,
    role_type VARCHAR(20) NOT NULL CHECK (role_type IN ('Member', 'Moderator', 'Admin', 'Expert', 'Mentor')),
    scope VARCHAR(20) DEFAULT 'Global' CHECK (scope IN ('Global', 'Category', 'Squad')),
    category_id UUID,
    squad_id UUID,
    assigned_at TIMESTAMPTZ DEFAULT now(),
    assigned_by UUID REFERENCES forum_users(id),
    expires_at TIMESTAMPTZ
);

-- Forum categories
CREATE TABLE IF NOT EXISTS forum_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    parent_id UUID REFERENCES forum_categories(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_restricted BOOLEAN DEFAULT false,
    required_level VARCHAR(20),
    required_badges TEXT[],
    post_count INTEGER DEFAULT 0,
    member_count INTEGER DEFAULT 0,
    last_activity TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Category settings
CREATE TABLE IF NOT EXISTS category_settings (
    category_id UUID PRIMARY KEY REFERENCES forum_categories(id) ON DELETE CASCADE,
    allow_images BOOLEAN DEFAULT true,
    allow_attachments BOOLEAN DEFAULT true,
    require_approval BOOLEAN DEFAULT false,
    auto_moderation BOOLEAN DEFAULT true,
    max_post_length INTEGER DEFAULT 10000,
    max_attachment_size INTEGER DEFAULT 10485760, -- 10MB
    allowed_file_types TEXT[] DEFAULT ARRAY['image/jpeg', 'image/png', 'application/pdf'],
    post_cooldown INTEGER DEFAULT 60, -- seconds
    reputation_required INTEGER DEFAULT 0,
    tags_required BOOLEAN DEFAULT false,
    max_tags INTEGER DEFAULT 10
);

-- Category moderators
CREATE TABLE IF NOT EXISTS category_moderators (
    category_id UUID REFERENCES forum_categories(id) ON DELETE CASCADE,
    user_id UUID REFERENCES forum_users(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ DEFAULT now(),
    assigned_by UUID REFERENCES forum_users(id),
    PRIMARY KEY (category_id, user_id)
);

-- Category rules
CREATE TABLE IF NOT EXISTS category_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES forum_categories(id) ON DELETE CASCADE,
    rule_text TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Forum posts
CREATE TABLE IF NOT EXISTS forum_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES forum_users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES forum_categories(id) ON DELETE CASCADE,
    subcategory_id UUID REFERENCES forum_categories(id),
    post_type VARCHAR(20) DEFAULT 'discussion' CHECK (post_type IN ('discussion', 'trade-idea', 'analysis', 'question', 'resource', 'business', 'event', 'announcement', 'poll', 'tutorial')),
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    bookmarks INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT false,
    is_locked BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES forum_users(id),
    delete_reason TEXT,
    quality_score INTEGER DEFAULT 50,
    engagement_score DECIMAL(5,2) DEFAULT 0,
    last_activity TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    published_at TIMESTAMPTZ DEFAULT now()
);

-- Post edit history
CREATE TABLE IF NOT EXISTS post_edit_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
    edited_by UUID REFERENCES forum_users(id),
    previous_title VARCHAR(200),
    previous_content TEXT,
    edit_reason TEXT,
    changes JSONB,
    edited_at TIMESTAMPTZ DEFAULT now()
);

-- Trading-specific post data
CREATE TABLE IF NOT EXISTS post_trading_data (
    post_id UUID PRIMARY KEY REFERENCES forum_posts(id) ON DELETE CASCADE,
    asset VARCHAR(20) NOT NULL,
    direction VARCHAR(10) CHECK (direction IN ('long', 'short', 'neutral')),
    entry_price DECIMAL(12,6),
    target_price DECIMAL(12,6),
    stop_loss DECIMAL(12,6),
    current_price DECIMAL(12,6),
    timeframe VARCHAR(10),
    confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
    risk_reward DECIMAL(6,2),
    position_size DECIMAL(15,6),
    strategy VARCHAR(100),
    setup VARCHAR(100),
    confluence TEXT[],
    market_conditions TEXT,
    session_timing VARCHAR(20),
    economic_events TEXT[],
    status VARCHAR(20) DEFAULT 'idea' CHECK (status IN ('idea', 'active', 'closed', 'stopped')),
    entry_time TIMESTAMPTZ,
    exit_time TIMESTAMPTZ,
    actual_return DECIMAL(8,4),
    max_drawdown DECIMAL(8,4),
    max_profit DECIMAL(8,4),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Technical levels for trading posts
CREATE TABLE IF NOT EXISTS post_technical_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
    level_type VARCHAR(20) CHECK (level_type IN ('support', 'resistance', 'pivot', 'fibonacci')),
    price DECIMAL(12,6) NOT NULL,
    strength VARCHAR(20) CHECK (strength IN ('weak', 'moderate', 'strong')),
    timeframe VARCHAR(10),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Business-specific post data
CREATE TABLE IF NOT EXISTS post_business_data (
    post_id UUID PRIMARY KEY REFERENCES forum_posts(id) ON DELETE CASCADE,
    business_type VARCHAR(20) CHECK (business_type IN ('opportunity', 'partnership', 'resource', 'service', 'job')),
    industry VARCHAR(100),
    location VARCHAR(100),
    budget VARCHAR(100),
    timeline VARCHAR(100),
    requirements TEXT[],
    benefits TEXT[],
    contact_method VARCHAR(20) CHECK (contact_method IN ('email', 'dm', 'external', 'form')),
    company_name VARCHAR(200),
    company_size VARCHAR(50),
    experience_level VARCHAR(50),
    is_remote BOOLEAN DEFAULT false,
    equity BOOLEAN DEFAULT false,
    salary VARCHAR(100),
    application_deadline TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Event-specific post data
CREATE TABLE IF NOT EXISTS post_event_data (
    post_id UUID PRIMARY KEY REFERENCES forum_posts(id) ON DELETE CASCADE,
    event_type VARCHAR(20) CHECK (event_type IN ('webinar', 'meetup', 'conference', 'workshop', 'ama')),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    timezone VARCHAR(50),
    location VARCHAR(200),
    is_virtual BOOLEAN DEFAULT false,
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    registration_required BOOLEAN DEFAULT false,
    registration_url TEXT,
    cost DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    prerequisites TEXT[],
    materials TEXT[],
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Event agenda items
CREATE TABLE IF NOT EXISTS event_agenda_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    duration INTEGER, -- minutes
    speaker VARCHAR(200),
    item_type VARCHAR(20) CHECK (item_type IN ('presentation', 'discussion', 'qa', 'break', 'networking')),
    sort_order INTEGER DEFAULT 0
);

-- Event speakers
CREATE TABLE IF NOT EXISTS event_speakers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    title VARCHAR(200),
    company VARCHAR(200),
    bio TEXT,
    avatar_url TEXT,
    social_links JSONB DEFAULT '{}'::jsonb
);

-- Post attachments
CREATE TABLE IF NOT EXISTS post_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size INTEGER NOT NULL,
    file_url TEXT NOT NULL,
    thumbnail_url TEXT,
    description TEXT,
    is_public BOOLEAN DEFAULT true,
    uploaded_by UUID REFERENCES forum_users(id),
    uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- Post replies
CREATE TABLE IF NOT EXISTS post_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES post_replies(id),
    content TEXT NOT NULL,
    author_id UUID REFERENCES forum_users(id) ON DELETE CASCADE,
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES forum_users(id),
    delete_reason TEXT,
    is_best_answer BOOLEAN DEFAULT false,
    is_moderator_reply BOOLEAN DEFAULT false,
    depth INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reply edit history
CREATE TABLE IF NOT EXISTS reply_edit_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reply_id UUID REFERENCES post_replies(id) ON DELETE CASCADE,
    edited_by UUID REFERENCES forum_users(id),
    previous_content TEXT,
    edit_reason TEXT,
    edited_at TIMESTAMPTZ DEFAULT now()
);

-- Reply attachments
CREATE TABLE IF NOT EXISTS reply_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reply_id UUID REFERENCES post_replies(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size INTEGER NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES forum_users(id),
    uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- User interactions (likes, bookmarks, follows)
CREATE TABLE IF NOT EXISTS user_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES forum_users(id) ON DELETE CASCADE,
    target_type VARCHAR(20) CHECK (target_type IN ('post', 'reply', 'user')),
    target_id UUID NOT NULL,
    interaction_type VARCHAR(20) CHECK (interaction_type IN ('like', 'dislike', 'bookmark', 'follow', 'share')),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, target_type, target_id, interaction_type)
);

-- Content reports and moderation
CREATE TABLE IF NOT EXISTS content_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES forum_users(id) ON DELETE CASCADE,
    content_type VARCHAR(20) CHECK (content_type IN ('post', 'reply', 'user')),
    content_id UUID NOT NULL,
    report_type VARCHAR(50) CHECK (report_type IN ('spam', 'inappropriate', 'harassment', 'misinformation', 'copyright', 'financial_advice', 'other')),
    reason TEXT NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
    reviewed_by UUID REFERENCES forum_users(id),
    reviewed_at TIMESTAMPTZ,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Moderation actions
CREATE TABLE IF NOT EXISTS moderation_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(20) CHECK (content_type IN ('post', 'reply', 'user')),
    content_id UUID NOT NULL,
    action_type VARCHAR(20) CHECK (action_type IN ('warning', 'edit', 'delete', 'lock', 'pin', 'feature', 'ban', 'suspend')),
    duration INTEGER, -- in hours for temporary actions
    reason TEXT NOT NULL,
    executed_by UUID REFERENCES forum_users(id),
    executed_at TIMESTAMPTZ DEFAULT now(),
    is_appealable BOOLEAN DEFAULT true,
    appeal_deadline TIMESTAMPTZ,
    appeal_status VARCHAR(20) CHECK (appeal_status IN ('none', 'pending', 'approved', 'denied'))
);

-- Reputation transactions
CREATE TABLE IF NOT EXISTS reputation_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES forum_users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    reason VARCHAR(100) NOT NULL,
    source_type VARCHAR(20) CHECK (source_type IN ('post', 'reply', 'like', 'badge', 'moderation', 'manual')),
    source_id UUID,
    created_by UUID REFERENCES forum_users(id),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Forum notifications
CREATE TABLE IF NOT EXISTS forum_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES forum_users(id) ON DELETE CASCADE,
    notification_type VARCHAR(50) CHECK (notification_type IN ('post_reply', 'post_like', 'mention', 'follow', 'badge_earned', 'moderation_action', 'system_announcement', 'squad_invitation', 'event_reminder', 'trading_alert')),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}'::jsonb,
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    action_text VARCHAR(50),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Search index for full-text search
CREATE TABLE IF NOT EXISTS forum_search_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(20) CHECK (content_type IN ('post', 'reply')),
    content_id UUID NOT NULL,
    title TEXT,
    content TEXT,
    tags TEXT[],
    author_name TEXT,
    category_name TEXT,
    search_vector tsvector,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Analytics tables
CREATE TABLE IF NOT EXISTS forum_analytics_daily (
    date DATE PRIMARY KEY,
    total_posts INTEGER DEFAULT 0,
    total_replies INTEGER DEFAULT 0,
    total_views INTEGER DEFAULT 0,
    total_likes INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0,
    quality_score DECIMAL(5,2) DEFAULT 0,
    moderation_actions INTEGER DEFAULT 0,
    report_rate DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS category_analytics_daily (
    date DATE,
    category_id UUID REFERENCES forum_categories(id) ON DELETE CASCADE,
    posts INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0,
    quality_score DECIMAL(5,2) DEFAULT 0,
    growth_rate DECIMAL(5,2) DEFAULT 0,
    PRIMARY KEY (date, category_id)
);

-- Trending topics
CREATE TABLE IF NOT EXISTS trending_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tag VARCHAR(50) NOT NULL,
    mentions INTEGER DEFAULT 0,
    growth_rate DECIMAL(5,2) DEFAULT 0,
    sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_forum_posts_category ON forum_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_author ON forum_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_created_at ON forum_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_posts_last_activity ON forum_posts(last_activity DESC);
CREATE INDEX IF NOT EXISTS idx_forum_posts_tags ON forum_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_forum_posts_featured ON forum_posts(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_forum_posts_pinned ON forum_posts(is_pinned) WHERE is_pinned = true;

CREATE INDEX IF NOT EXISTS idx_post_replies_post ON post_replies(post_id);
CREATE INDEX IF NOT EXISTS idx_post_replies_author ON post_replies(author_id);
CREATE INDEX IF NOT EXISTS idx_post_replies_parent ON post_replies(parent_id);
CREATE INDEX IF NOT EXISTS idx_post_replies_created_at ON post_replies(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_interactions_user ON user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_target ON user_interactions(target_type, target_id);

CREATE INDEX IF NOT EXISTS idx_forum_search_vector ON forum_search_index USING GIN(search_vector);

-- Full-text search trigger
CREATE OR REPLACE FUNCTION update_forum_search_index()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        INSERT INTO forum_search_index (content_type, content_id, title, content, tags, author_name, category_name, search_vector)
        VALUES (
            'post',
            NEW.id,
            NEW.title,
            NEW.content,
            NEW.tags,
            (SELECT display_name FROM forum_users WHERE id = NEW.author_id),
            (SELECT name FROM forum_categories WHERE id = NEW.category_id),
            to_tsvector('english', NEW.title || ' ' || NEW.content || ' ' || array_to_string(NEW.tags, ' '))
        )
        ON CONFLICT (content_id) WHERE content_type = 'post'
        DO UPDATE SET
            title = EXCLUDED.title,
            content = EXCLUDED.content,
            tags = EXCLUDED.tags,
            search_vector = EXCLUDED.search_vector,
            updated_at = now();
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        DELETE FROM forum_search_index WHERE content_type = 'post' AND content_id = OLD.id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_forum_search_index
    AFTER INSERT OR UPDATE OR DELETE ON forum_posts
    FOR EACH ROW EXECUTE FUNCTION update_forum_search_index();

-- Update category post counts
CREATE OR REPLACE FUNCTION update_category_post_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE forum_categories 
        SET post_count = post_count + 1, last_activity = now()
        WHERE id = NEW.category_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE forum_categories 
        SET post_count = post_count - 1
        WHERE id = OLD.category_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_category_post_count
    AFTER INSERT OR DELETE ON forum_posts
    FOR EACH ROW EXECUTE FUNCTION update_category_post_count();

-- Update user statistics
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Update post count
        IF TG_TABLE_NAME = 'forum_posts' THEN
            INSERT INTO user_stats (user_id, posts_count)
            VALUES (NEW.author_id, 1)
            ON CONFLICT (user_id)
            DO UPDATE SET posts_count = user_stats.posts_count + 1, updated_at = now();
        -- Update reply count
        ELSIF TG_TABLE_NAME = 'post_replies' THEN
            INSERT INTO user_stats (user_id, replies_count)
            VALUES (NEW.author_id, 1)
            ON CONFLICT (user_id)
            DO UPDATE SET replies_count = user_stats.replies_count + 1, updated_at = now();
            
            -- Update post reply count
            UPDATE forum_posts 
            SET replies_count = replies_count + 1, last_activity = now()
            WHERE id = NEW.post_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Update counts on deletion
        IF TG_TABLE_NAME = 'forum_posts' THEN
            UPDATE user_stats 
            SET posts_count = posts_count - 1, updated_at = now()
            WHERE user_id = OLD.author_id;
        ELSIF TG_TABLE_NAME = 'post_replies' THEN
            UPDATE user_stats 
            SET replies_count = replies_count - 1, updated_at = now()
            WHERE user_id = OLD.author_id;
            
            UPDATE forum_posts 
            SET replies_count = replies_count - 1
            WHERE id = OLD.post_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_stats_posts
    AFTER INSERT OR DELETE ON forum_posts
    FOR EACH ROW EXECUTE FUNCTION update_user_stats();

CREATE TRIGGER trigger_update_user_stats_replies
    AFTER INSERT OR DELETE ON post_replies
    FOR EACH ROW EXECUTE FUNCTION update_user_stats();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE forum_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_trading_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_notifications ENABLE ROW LEVEL SECURITY;

-- Public read access for forum content
CREATE POLICY "Public read access for forum categories"
    ON forum_categories FOR SELECT
    TO authenticated, anon
    USING (is_active = true);

CREATE POLICY "Public read access for forum posts"
    ON forum_posts FOR SELECT
    TO authenticated, anon
    USING (is_deleted = false AND published_at <= now());

CREATE POLICY "Public read access for post replies"
    ON post_replies FOR SELECT
    TO authenticated, anon
    USING (is_deleted = false);

-- User can read their own data
CREATE POLICY "Users can read own data"
    ON forum_users FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
    ON forum_users FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

-- Users can create posts and replies
CREATE POLICY "Authenticated users can create posts"
    ON forum_posts FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = (SELECT user_id FROM forum_users WHERE id = author_id));

CREATE POLICY "Authenticated users can create replies"
    ON post_replies FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = (SELECT user_id FROM forum_users WHERE id = author_id));

-- Users can edit their own content
CREATE POLICY "Users can edit own posts"
    ON forum_posts FOR UPDATE
    TO authenticated
    USING (auth.uid() = (SELECT user_id FROM forum_users WHERE id = author_id));

CREATE POLICY "Users can edit own replies"
    ON post_replies FOR UPDATE
    TO authenticated
    USING (auth.uid() = (SELECT user_id FROM forum_users WHERE id = author_id));

-- Moderators and admins have additional permissions
CREATE POLICY "Moderators can moderate content"
    ON forum_posts FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN forum_users fu ON ur.user_id = fu.id
            WHERE fu.user_id = auth.uid()
            AND ur.role_type IN ('Moderator', 'Admin')
            AND (ur.scope = 'Global' OR ur.category_id = forum_posts.category_id)
        )
    );

-- Sample data insertion
INSERT INTO forum_categories (id, name, description, icon, color, sort_order) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Trading Strategies & Systems', 'Share and discuss trading strategies, system development, and methodology', 'Target', 'text-primary', 1),
    ('550e8400-e29b-41d4-a716-446655440002', 'Market Analysis & Research', 'Daily market analysis, economic research, and trading opportunities', 'BarChart3', 'text-secondary', 2),
    ('550e8400-e29b-41d4-a716-446655440003', 'Business Development & Entrepreneurship', 'Building trading businesses, scaling operations, and entrepreneurship', 'Building2', 'text-primary', 3),
    ('550e8400-e29b-41d4-a716-446655440004', 'Portfolio Showcase & Performance', 'Share trading results, portfolio analysis, and performance reviews', 'TrendingUp', 'text-secondary', 4),
    ('550e8400-e29b-41d4-a716-446655440005', 'Education & Resources', 'Learning materials, courses, books, and educational discussions', 'BookOpen', 'text-primary', 5),
    ('550e8400-e29b-41d4-a716-446655440006', 'Technology & Tools', 'Trading platforms, tools, software, and technology discussions', 'Zap', 'text-secondary', 6),
    ('550e8400-e29b-41d4-a716-446655440007', 'Trading Psychology & Mindset', 'Mental aspects of trading, discipline, and psychological development', 'Brain', 'text-primary', 7),
    ('550e8400-e29b-41d4-a716-446655440008', 'Networking & Events', 'Professional networking, events, meetups, and community building', 'Users', 'text-secondary', 8);

-- Insert subcategories
INSERT INTO forum_categories (id, name, description, parent_id, sort_order) VALUES
    -- Trading Strategies subcategories
    ('550e8400-e29b-41d4-a716-446655440101', 'Price Action Trading', 'Pure price action strategies and setups', '550e8400-e29b-41d4-a716-446655440001', 1),
    ('550e8400-e29b-41d4-a716-446655440102', 'Technical Analysis', 'Indicators, patterns, and technical methods', '550e8400-e29b-41d4-a716-446655440001', 2),
    ('550e8400-e29b-41d4-a716-446655440103', 'Algorithmic Trading', 'Automated systems and quantitative strategies', '550e8400-e29b-41d4-a716-446655440001', 3),
    
    -- Market Analysis subcategories
    ('550e8400-e29b-41d4-a716-446655440201', 'Daily Market Analysis', 'Daily market outlook and trading opportunities', '550e8400-e29b-41d4-a716-446655440002', 1),
    ('550e8400-e29b-41d4-a716-446655440202', 'Economic Calendar & News', 'Economic events and their market impact', '550e8400-e29b-41d4-a716-446655440002', 2),
    ('550e8400-e29b-41d4-a716-446655440203', 'Sector & Industry Analysis', 'Sector rotation and industry-specific insights', '550e8400-e29b-41d4-a716-446655440002', 3);