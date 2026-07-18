CREATE TABLE `page_visits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`page_path` text NOT NULL,
	`visit_date` text NOT NULL,
	`visitor_country` text,
	`total_visits` integer DEFAULT 1 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
