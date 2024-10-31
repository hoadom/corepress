CREATE TABLE IF NOT EXISTS "roles" (
	"roleId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"roleName" varchar(50) NOT NULL,
	"roleDescription" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_meta" (
	"metaId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"metaKey" varchar(255),
	"metaValue" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_roles" (
	"userId" uuid NOT NULL,
	"roleId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "userLogin" varchar(60) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "userPass" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "userNicename" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "userEmail" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "userUrl" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "userRegistered" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "userActivationKey" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "userStatus" smallint DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "displayName" varchar(250);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updatedAt" timestamp DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_meta" ADD CONSTRAINT "user_meta_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_roles_roleId_fk" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("roleId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id" ON "user_roles" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "role_id" ON "user_roles" USING btree ("roleId");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "user_login";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "user_pass";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "user_nicename";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "user_email";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "user_url";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "user_registered";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "user_activation_key";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "user_status";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "display_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "updated_at";