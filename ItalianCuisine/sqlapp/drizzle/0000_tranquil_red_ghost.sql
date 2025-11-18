CREATE TABLE `recipes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `recipesToTags` (
	`tagId` text NOT NULL,
	`recipesId` integer NOT NULL,
	PRIMARY KEY(`tagId`, `recipesId`),
	FOREIGN KEY (`tagId`) REFERENCES `tags`(`name`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recipesId`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`name` text PRIMARY KEY NOT NULL
);
