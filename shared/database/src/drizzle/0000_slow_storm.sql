CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_login" varchar(60) NOT NULL,
	"user_pass" varchar(255) NOT NULL,
	"user_nicename" varchar(50),
	"user_email" varchar(100) NOT NULL,
	"user_url" varchar(100),
	"user_registered" timestamp NOT NULL,
	"user_activation_key" varchar(255),
	"user_status" smallint DEFAULT 0,
	"display_name" varchar(250),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
