import {sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { relations } from 'drizzle-orm';

// Elements 

export const recipe = sqliteTable('recipe', {
    id: integer('id').primaryKey({autoIncrement: true}),
    title: text('title').notNull(),
});

export const tag = sqliteTable('tag', {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
});

// Joins 

export const recipesToTags = sqliteTable('recipesToTags', {
    tagId: integer('tagId')
      .notNull()
      .references(() => tag.id),
    recipeId: integer('recipeId')
      .notNull()
      .references(() => recipe.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.tagId, t.recipeId] }),
  })
);

// Relations 

export const recipeRelations = relations(recipe, ({ many }) => ({
    recipesToTags: many(recipesToTags),
}));

export const tagRelations = relations(tag, ({ many }) => ({
    recipesToTags: many(recipesToTags),
}));

export const recipesToTagsRelations = relations(recipesToTags, ({ one }) => ({
    recipe: one(recipe, { 
        fields: [recipesToTags.recipeId], 
        references: [recipe.id] 
    }),
    tag: one(tag, { 
        fields: [recipesToTags.tagId], 
        references: [tag.id] 
    }),
}));


