CREATE TABLE `schools` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`location` text NOT NULL,
	`students` integer DEFAULT 0,
	`teachers` integer DEFAULT 0,
	`status` text DEFAULT 'Trial',
	`type` text DEFAULT 'Primary',
	`admin_username` text NOT NULL,
	`admin_password` text NOT NULL,
	`year` integer DEFAULT 2026,
	`expiry_date` text,
	`is_active` integer DEFAULT true,
	`is_blocked` integer DEFAULT false,
	`payment_status` text DEFAULT 'trial',
	`contact` text,
	`address` text,
	`school_logo` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`grade` integer NOT NULL,
	`school` text NOT NULL,
	`status` text DEFAULT 'Active',
	`username` text NOT NULL,
	`password` text NOT NULL,
	`school_year` integer DEFAULT 2026,
	`subjects` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`school` text NOT NULL,
	`school_type` text NOT NULL,
	`price` text NOT NULL,
	`start_date` text NOT NULL,
	`status` text DEFAULT 'Active',
	`renewal` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `teachers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`school` text NOT NULL,
	`subject` text NOT NULL,
	`status` text DEFAULT 'Active',
	`username` text NOT NULL,
	`password` text NOT NULL,
	`school_year` integer DEFAULT 2026,
	`created_at` integer
);
