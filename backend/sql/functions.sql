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
  WHERE u.email = email
)
INTO unique_email;
RETURN unique_email;
END $$
DELIMITER ;
