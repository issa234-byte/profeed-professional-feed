CREATE TABLE `ads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`placement` text NOT NULL,
	`content_html` text,
	`script_code` text,
	`image_url` text,
	`link_url` text,
	`status` text DEFAULT 'active' NOT NULL,
	`priority` integer DEFAULT 0,
	`impressions` integer DEFAULT 0,
	`clicks` integer DEFAULT 0,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `authors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`bio` text,
	`avatar` text,
	`role` text,
	`twitter` text,
	`linkedin` text,
	`website` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `authors_slug_unique` ON `authors` (`slug`);--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`icon` text,
	`color` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE TABLE `job_details` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`post_id` integer,
	`company` text NOT NULL,
	`location` text NOT NULL,
	`job_type` text NOT NULL,
	`salary_range` text,
	`application_link` text,
	`requirements` text,
	`benefits` text,
	`deadline` text,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `job_details_post_id_unique` ON `job_details` (`post_id`);--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`type` text NOT NULL,
	`category_id` integer,
	`author_id` integer,
	`featured_image` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`views` integer DEFAULT 0,
	`read_time` text,
	`regions` text,
	`tags` text,
	`published_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);