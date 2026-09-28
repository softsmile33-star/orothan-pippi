CREATE TABLE `lecture_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`lecture` text NOT NULL,
	`organization` text NOT NULL,
	`rating` integer NOT NULL,
	`review` text NOT NULL,
	`publish_consent` integer NOT NULL,
	`privacy_consent_at` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL,
	`ip_hash` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_lecture_reviews_created` ON `lecture_reviews` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_lecture_reviews_rate` ON `lecture_reviews` (`ip_hash`,`created_at`);