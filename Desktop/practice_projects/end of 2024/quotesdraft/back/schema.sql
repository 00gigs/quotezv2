CREATE TABLE users(
    email VARCHAR(255) PRIMARY KEY,
    name_user VARCHAR(100) UNIQUE,
    hashedpass VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE quotes(
    id VARCHAR(255) PRIMARY KEY UNIQUE,
    quote VARCHAR(255),
    author VARCHAR(200),
    authorSlug VARCHAR(200),
    characters INT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE user_quotes(
    id SERIAL PRIMARY KEY,
    user_quote VARCHAR(255),
    username VARCHAR(255),
    FOREIGN KEY (username) REFERENCES users(email),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE votes (
    _id SERIAL PRIMARY KEY ,
    quote_id VARCHAR(255) NOT NULL ,
    userEmail VARCHAR(100) NOT NULL,
    upVote INT DEFAULT 0,
    downVote INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE,
    FOREIGN KEY (userEmail) REFERENCES users(email) ON DELETE CASCADE
);



CREATE TABLE user_favorites (
    quote_ VARCHAR(255) PRIMARY KEY NOT NULL,
    user_Email VARCHAR(100),
    FOREIGN KEY (user_Email) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (quote_) REFERENCES quotes(id) ON DELETE CASCADE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_users_updated_at_trigger
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_users_updated_at();


CREATE OR REPLACE FUNCTION update_userquotes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_userquotes_updated_at_trigger
BEFORE UPDATE ON userquotes
FOR EACH ROW
EXECUTE FUNCTION update_userquotes_updated_at();

