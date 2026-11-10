// in drizzle we cannt define the relationship between the product and course tables in the product table itself.
// Instead, we define the relationship in a separate file called schemaHelpers.ts.
// This is because drizzle uses a different approach to defining relationships between tables.
// In drizzle, we define relationships using the relations function from drizzle-orm/relations.
//  The relations function takes two arguments: the first argument is the table that we want to define
//  the relationship for, and the second argument is a callback function that defines the relationship.
// In this case, we are defining a one-to-many relationship between the course and product tables.
//  Each course can have many products, but each product belongs to only one course.

// we add another file called courseProduct.ts to define the relationship between the course and product tables.
import { uuid, pgTable, primaryKey} from "drizzle-orm/pg-core";
import { course } from "./courseTable";
import { createdAt, updatedAt } from "../schemaHelpers";
import { productTable } from "./product";

import { table } from "console";
import { relations } from "drizzle-orm/relations";

export const courseProductTable = pgTable(
  "course_product",
  {
    courseId: uuid()
      .notNull()
      .references(() => course.id, { onDelete: "restrict" }),
    // the onDelete: "restrict" option is used to prevent the deletion of a course if there are any products associated with it.
    productId: uuid()
      .notNull()
      // the references() function is used to define a foreign key relationship between the course_product table and the product table.
      .references(() => productTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.courseId, table.productId] })],
);
// the primaryKey() function is used to define a composite primary key for the course_product table. 
// this way we cannot have duplicate entries for the same course and product combination in the course_product table.
export const courseProductRelationships = relations(courseProductTable, ({ one }) => ({
  course: one(course, {
    fields: [courseProductTable.courseId],  
    references: [course.id],
  }),
  product: one(productTable, {   
    fields: [courseProductTable.productId],
    references: [productTable.id],
  }),
})); 