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