-- Run this in pgAdmin or use a script

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    role VARCHAR CHECK (role IN ('admin', 'dev', 'tester')) NOT NULL
);

CREATE TABLE Projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    owner_id INTEGER REFERENCES Users(id),
    description TEXT
);

CREATE TABLE Issues (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    project_id INTEGER REFERENCES Projects(id),
    assignee_id INTEGER REFERENCES Users(id),
    status VARCHAR CHECK (status IN ('open', 'in progress', 'resolved', 'closed')) NOT NULL,
    description TEXT,
    priority VARCHAR CHECK (priority IN ('high', 'medium', 'low')) NOT NULL
);

CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    issue_id INTEGER REFERENCES Issues(id),
    user_id INTEGER REFERENCES Users(id),
    comment_text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (id, name, email, role)
VALUES (1, 'Admin', 'admin@example.com', 'admin');


ALTER TABLE comments ADD COLUMN author VARCHAR(100);



-- If it's a users table:
INSERT INTO users (id, name, email, password)
VALUES (1, 'Admin', 'admin@example.com', 'securepassword');

ALTER TABLE users ADD COLUMN password VARCHAR(255); 

INSERT INTO users (id, name, email, role, password)
VALUES (2, 'Admin2', 'admin2@example.com', 'admin', 'securepassword');



UPDATE users
SET password = 'securepassword'
WHERE id = 1;



ALTER TABLE comments ADD COLUMN content TEXT;


SELECT column_name
FROM information_schema.columns
WHERE table_name = 'issues';


SELECT id FROM issues;










