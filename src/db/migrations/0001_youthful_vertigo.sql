CREATE TABLE `announcements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`school` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`subject` text NOT NULL,
	`grade` integer NOT NULL,
	`school` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `exam_timetable` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`subject` text NOT NULL,
	`grade` integer NOT NULL,
	`school` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`venue` text,
	`created_by` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `homework` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`subject` text NOT NULL,
	`grade` integer NOT NULL,
	`school` text NOT NULL,
	`due_date` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `study_materials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`subject` text NOT NULL,
	`grade` integer NOT NULL,
	`school` text NOT NULL,
	`file_url` text,
	`file_type` text,
	`created_by` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `tests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`subject` text NOT NULL,
	`grade` integer NOT NULL,
	`school` text NOT NULL,
	`date` text NOT NULL,
	`duration` text,
	`created_by` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `weekly_timetable` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`grade` integer NOT NULL,
	`school` text NOT NULL,
	`day_of_week` text NOT NULL,
	`subject` text NOT NULL,
	`time` text NOT NULL,
	`teacher` text,
	`created_at` integer
);
--> statement-breakpoint
ALTER TABLE `schools` ADD `payment_plan` text DEFAULT 'monthly';--> statement-breakpoint
ALTER TABLE `subscriptions` ADD `plan_type` text DEFAULT 'monthly';