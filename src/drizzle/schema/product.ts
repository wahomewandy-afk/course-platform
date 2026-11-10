import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { course } from "./courseTable";
import { courseProductTable } from "./courseProduct";


export const productStatuses = ["public", "private"] as const;
// this is for our product table, we are defining the status of the product as either public or private. 
// This is a common practice in e-commerce applications where products can be either visible to the public or hidden from view. By defining the status as a constant array, we can ensure that only valid values are used when creating or updating products in the database.
export type ProductStatus = (typeof productStatuses)[number];
export const productStatusEnum = pgEnum("product_status", productStatuses);
// An enum (short for enumeration) is a special data type that lets you create a strict list of allowed options for a variable.

export const productTable = pgTable("product", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  image: text().notNull(),
  priceInDollars: integer().notNull(),
  status: productStatusEnum().notNull().default("private"),
  createdAt,
  updatedAt,
});

// basically this table is a product table that has a relationship with the course table. Each product belongs to a course, and each course can have many products. The relationship is defined using the relations function from drizzle-orm/relations. 
// The one function is used to define a one-to-one relationship between the product and course tables, while the many function is used to define a one-to-many relationship between the course and product tables.

export const productRelationships = relations(
    productTable, ({ many }) => ({
        courseProduct: many(courseProductTable),
        
}));
