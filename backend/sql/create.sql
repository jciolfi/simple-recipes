DROP DATABASE simplerecipes;
CREATE DATABASE simplerecipes;
USE simplerecipes;

CREATE TABLE users (
	user_id INT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    username VARCHAR(16) NOT NULL,
    num_recipes INT NOT NULL DEFAULT 0,
    last_updated DATETIME NOT NULL DEFAULT NOW(),
    UNIQUE(email),
    UNIQUE(username)
);

CREATE TABLE recipes (
	recipe_id INT PRIMARY KEY,
    author_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    prep_time INT NOT NULL, -- in minutes
    servings INT NOT NULL,
    instructions TEXT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(user_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE recipe_ingredients (
	recipe_id INT NOT NULL,
    ingredient_name VARCHAR(255) NOT NULL,
    amount VARCHAR(255) NOT NULL,
    PRIMARY KEY (recipe_id, ingredient_name),
    UNIQUE (recipe_id, ingredient_name),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tags (
	tag_id INT PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(32) NOT NULL
);

CREATE TABLE recipe_tags (
	recipe_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (recipe_id, tag_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	  FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tools (
	tool_id INT PRIMARY KEY AUTO_INCREMENT,
    tool_name VARCHAR(64) NOT NULL
);

CREATE TABLE recipe_tools (
	recipe_id INT NOT NULL,
    tool_id INT NOT NULL,
    PRIMARY KEY (recipe_id, tool_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (tool_id) REFERENCES tools(tool_id)
		ON UPDATE RESTRICT ON DELETE RESTRICT
);


