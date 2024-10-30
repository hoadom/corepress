-- Get all users
-- name: GetAllUsers :many
SELECT * FROM users;

-- Create a new user
-- name: CreateUser :one
INSERT INTO users (user_login, user_pass, user_nicename, user_email, user_url, user_registered, user_activation_key, user_status, display_name)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;

-- Delete a user by UUID
-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;
