import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const poems = pgTable("poems", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPoemSchema = createInsertSchema(poems).pick({
  content: true,
});

export const updatePoemSchema = z.object({
  content: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPoem = z.infer<typeof insertPoemSchema>;
export type UpdatePoem = z.infer<typeof updatePoemSchema>;
export type Poem = typeof poems.$inferSelect;
