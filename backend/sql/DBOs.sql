-- get_recipe: return recipe detials in one row with the given recipeID
DELIMITER $$
DROP PROCEDURE IF EXISTS get_recipe;
CREATE PROCEDURE get_recipe(recipeID INT)
BEGIN

SELECT
  recipe_id,
  username,
  title,
  prep_time,
  servings,
  instructions,
  GROUP_CONCAT(DISTINCT T.ingredient_amts SEPARATOR '@@') AS ingredients,
  tags,
  tools
FROM 
(
  SELECT
    r.recipe_id,
    u.username,
    r.title,
    r.prep_time,
    r.servings,
    r.instructions,
    CONCAT(ri.ingredient_name, '##', ri.amount) AS ingredient_amts,
    GROUP_CONCAT(DISTINCT tg.tag_name SEPARATOR '##') AS tags, 
    GROUP_CONCAT(DISTINCT tl.tool_name SEPARATOR '##') AS tools
  FROM
	  recipes r
  JOIN 
	  users u ON r.author_id = u.user_id
  JOIN
	  recipe_ingredients ri ON r.recipe_id = ri.recipe_id
  JOIN
	  recipe_tags rtg ON r.recipe_id = rtg.recipe_id
  JOIN 
	  tags tg ON rtg.tag_id = tg.tag_id
  JOIN 
	  recipe_tools rtl ON r.recipe_id = rtl.recipe_id
  JOIN 
	  tools tl ON rtl.tool_id = tl.tool_id
  GROUP BY 
    r.recipe_id, ri.ingredient_name
  HAVING 
    r.recipe_id = recipeID
) as T
GROUP BY recipe_id, tags, tools;

END $$
DELIMITER ;


-- get_user: return user details for the given userID
DELIMITER $$
DROP PROCEDURE IF EXISTS get_user;
CREATE PROCEDURE get_user(userID INT)
BEGIN

SELECT
  u.user_id,
  u.email,
  u.username
FROM
  users u
WHERE
  u.user_id = userID;

END $$
DELIMITER ;

-- is_unique_username: returns true if provided username doesn't exist in users
DROP FUNCTION IF EXISTS is_unique_username;
DELIMITER $$
CREATE FUNCTION is_unique_username
(
  username VARCHAR(255)
)
RETURNS BOOL
DETERMINISTIC READS SQL DATA
BEGIN
DECLARE unique_username BOOL;

SELECT NOT EXISTS
(
  SELECT 
    *
  FROM 
    users u
  WHERE
    u.username = username
)
INTO unique_username;

RETURN unique_username;
END $$
DELIMITER ;

-- is_unique_email: returns true if provided email doesn't exist in users
DROP FUNCTION IF EXISTS is_unique_email;
DELIMITER $$
CREATE FUNCTION is_unique_email
(
  email VARCHAR(255)
)
RETURNS BOOL
DETERMINISTIC READS SQL DATA
BEGIN
DECLARE unique_email BOOL;

SELECT NOT EXISTS
(
  SELECT 
    *
  FROM
    users u
  WHERE 
    u.email = email
)
INTO unique_email;

RETURN unique_email;
END $$
DELIMITER ;

-- account_exists: returns userID if email/pass exists in users table, nothing otherwise
DROP FUNCTION IF EXISTS account_exists;
DELIMITER $$
CREATE FUNCTION account_exists
(
  email VARCHAR(255),
  pass VARCHAR(255)
)
RETURNS INT
DETERMINISTIC READS SQL DATA
BEGIN
DECLARE userID INT;

SELECT
  u.user_id
FROM
  users u
WHERE
  u.email = LOWER(email) AND u.pass = pass
INTO userID;

RETURN userID;
END $$
DELIMITER ;


-- increment number of recipes a user has created
DROP TRIGGER IF EXISTS recipes_after_insert;
DELIMITER $$
CREATE TRIGGER recipes_after_insert
	AFTER INSERT ON recipes
    FOR EACH ROW
BEGIN
    UPDATE
		users u
	SET
		u.num_recipes = u.num_recipes + 1
	WHERE
		u.user_id = NEW.author_id;
END $$
DELIMITER ;

-- decrement number of recipes a user has created
DROP TRIGGER IF EXISTS recipes_after_delete;
DELIMITER $$
CREATE TRIGGER recipes_after_delete
	AFTER DELETE ON recipes
    FOR EACH ROW
BEGIN
    UPDATE
		users u
	SET
		u.num_recipes = u.num_recipes - 1
	WHERE
		u.user_id = OLD.author_id;
END $$
DELIMITER ;

-- delete accounts that are > 5 years old with 0 created recipes
DROP EVENT IF EXISTS remove_old_accounts;
DELIMITER $$
CREATE EVENT remove_old_accounts
ON SCHEDULE AT NOW() + INTERVAL 1 MONTH
DO BEGIN
	DELETE FROM users
    WHERE last_updated < NOW() - INTERVAL 5 YEAR;
END $$
DELIMITER ;