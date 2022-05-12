-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS relationships;
-- DROP TABLE IF EXISTS messages;
-- DROP TABLE IF EXISTS posts;
-- DROP TABLE IF EXISTS likes;
-- DROP TABLE IF EXISTS dislikes;
-- DROP TABLE IF EXISTS comments;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DROP TYPE IF EXISTS relation_type;
CREATE TYPE relation_type AS ENUM ('pending', 'accepted', 'blocked');

-- DROP TYPE IF EXISTS user_type;
CREATE TYPE user_type AS ENUM ('owner', 'admin', 'member');

-- DROP TYPE IF EXISTS gender_type;
CREATE TYPE gender_type AS ENUM ('male', 'female', '...');

-- DROP TYPE IF EXISTS user_status;
CREATE TYPE user_status AS ENUM ('online', 'offline', 'banned');

CREATE TABLE IF NOT EXISTS users (
    id uuid DEFAULT uuid_generate_v4(),
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    username VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    ppassword VARCHAR NOT NULL,
    confirmed BOOLEAN DEFAULT 'false',
    age INT DEFAULT NULL,
    avatar VARCHAR DEFAULT NULL,
    profile_comleted BOOLEAN DEFAULT 'false',
    gender gender_type DEFAULT NULL,
    user_role user_type DEFAULT 'member',
    user_s user_status DEFAULT 'online',
    PRIMARY KEY (id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS relationships (
    from_id uuid,
    to_id uuid,
    PRIMARY KEY (
        from_id,
        to_id
    ),
    CONSTRAINT fk_from_id
        FOREIGN KEY (from_id)
            REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_to_id
        FOREIGN KEY (to_id)
            REFERENCES users(id) ON DELETE CASCADE,
    relation_status relation_type DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
    from_id uuid,
    to_id uuid,
    PRIMARY KEY (
        from_id,
        to_id
    ),
    CONSTRAINT fk_message_from_id
        FOREIGN KEY (from_id)
            REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_message_to_id
        FOREIGN KEY (to_id)
            REFERENCES users(id) ON DELETE CASCADE,
    body VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
    id uuid default uuid_generate_v4(),
    owner_id uuid,
    PRIMARY KEY(id),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR DEFAULT NULL,
    picture VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS likes (
    post_id uuid,
    liker_id uuid,
    PRIMARY KEY (
        post_id,
        liker_id
    ),
    CONSTRAINT fk_post_id
        FOREIGN KEY (post_id)
            REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_liker_id
        FOREIGN KEY (liker_id)
            REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dislikes (
    post_id uuid,
    disliker_id uuid,
    PRIMARY KEY (
        post_id,
        disliker_id
    ),
    CONSTRAINT fk_post_id
        FOREIGN KEY (post_id)
            REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_disliker_id
        FOREIGN KEY (disliker_id)
            REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comments (
    post_id uuid,
    uuser_id uuid,
    PRIMARY KEY(
        post_id,
        uuser_id
    ),
    CONSTRAINT fk_post_id
        FOREIGN KEY (post_id)
            REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_uuser_id
        FOREIGN KEY (uuser_id)
            REFERENCES users(id) ON DELETE CASCADE,
    comment VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);