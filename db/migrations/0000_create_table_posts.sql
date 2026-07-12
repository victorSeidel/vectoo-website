CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(200) UNIQUE NOT NULL,

    category VARCHAR(100) NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    author VARCHAR(100) NOT NULL,
    author_social VARCHAR(100),

    title VARCHAR(120) NOT NULL,
    excerpt VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,

    published BOOLEAN NOT NULL DEFAULT FALSE,
    read_time INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX idx_posts_published ON posts(published);