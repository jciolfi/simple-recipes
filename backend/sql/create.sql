DROP DATABASE simplerecipes;
CREATE DATABASE simplerecipes;
USE simplerecipes;

CREATE TABLE users (
	user_id INT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(16) NOT NULL,
    UNIQUE(email),
    UNIQUE(username)
);

CREATE TABLE recipes (
	recipe_id INT PRIMARY KEY,
    author_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    prep_time INT NOT NULL, -- in minutes
    servings INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(user_id)
);

CREATE TABLE recipe_ingredients (
	recipe_ingredient_id INT PRIMARY KEY,
	recipe_id INT NOT NULL,
    ingredient_name VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    UNIQUE (recipe_id, ingredient_name),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tags (
	tag_id INT PRIMARY KEY,
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
	tool_id INT PRIMARY KEY,
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

CREATE TABLE recipe_steps (
    recipe_ingredient_id INT NOT NULL,
    step INT NOT NULL,
    instructions TEXT NOT NULL,
    PRIMARY KEY (recipe_ingredient_id, step),
    FOREIGN KEY (recipe_ingredient_id) REFERENCES recipe_ingredients(recipe_ingredient_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);