import {
  pgTable,
  integer,
  pgEnum,
  uuid,
  text,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { course } from "./courseTable";
import { courseProductTable } from "./courseProduct";
import { userTable } from "./user";
import { productTable } from "./product";

export const purchaseTable = pgTable("purchase", {
  id,
  pricePaidInCents: integer().notNull(),
  productDetails: jsonb()
    .notNull()
    .$type<{ name: string; description: string; priceInCents: number }>(),
  userId: uuid()
    .notNull()
    .references(() => userTable.id, { onDelete: "restrict" }),

  productId: uuid()
    .notNull()
    .references(() => productTable.id, { onDelete: "cascade" }),
  stripeSessionId: text().notNull().unique(),
  reFundedAt: timestamp({ withTimezone: true }),
  createdAt,
  updatedAt,
});

export const purchaseRelationships = relations(purchaseTable, ({ one }) => ({
  user: one(userTable, {
    fields: [purchaseTable.userId],
    references: [userTable.id],
  }),
  product: one(productTable, {
    fields: [purchaseTable.productId],
    references: [productTable.id],
  }),
}));
