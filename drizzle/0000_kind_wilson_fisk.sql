CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`program` text NOT NULL,
	`name` text NOT NULL,
	`contact` text NOT NULL,
	`organization` text NOT NULL,
	`message` text NOT NULL,
	`consent_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`ip_hash` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_inquiries_created` ON `inquiries` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_inquiries_rate` ON `inquiries` (`ip_hash`,`created_at`);