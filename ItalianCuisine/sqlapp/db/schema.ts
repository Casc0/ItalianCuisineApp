import {sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { relations } from 'drizzle-orm';

// Elements 

export const recipes = sqliteTable('recipes', {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
});

export const tags = sqliteTable('tags', {
    id: text('name').notNull().primaryKey()
});

// Joins 

export const recipesToTags = sqliteTable('recipesToTags', {
    tagId: text('tagId')
      .notNull()
      .references(() => tags.id),
    recipesId: integer('recipesId')
      .notNull()
      .references(() => recipes.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.tagId, t.recipesId] }),
  })
);

// Relations 

export const recipesRelations = relations(recipes, ({ many }) => ({
    recipesToTags: many(recipesToTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
    recipesToTags: many(recipesToTags),
}));

export const recipesToTagsRelations = relations(recipesToTags, ({ one }) => ({
    recipes: one(recipes, { 
        fields: [recipesToTags.recipesId], 
        references: [recipes.id] 
    }),
    tags: one(tags, { 
        fields: [recipesToTags.tagId], 
        references: [tags.id] 
    }),
}));


//
export type Recipe = typeof recipes.$inferSelect;
export type Tag = typeof tags.$inferSelect;

