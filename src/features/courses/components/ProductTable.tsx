"use client";

import {
  TableHeader,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatPlural, formatPrice } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EyeIcon, LockIcon, TrashIcon } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { deleteCourse } from "../action/courses";
import { ProductStatus } from "@/src/drizzle/schema";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { deleteProduct } from "../../products/actions/products";

export function ProductTable({
  products,
}: {
  products: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    priceInDollars: number;
    status: ProductStatus;
    coursesCount: number;
    customersCount: number;
  }[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            {formatPlural(products.length, {
              singular: "product",
              plural: "products",
            })}
          </TableHead>
          <TableHead>Customers</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex items-center gap-4">
                <Image
                  className="object-cover rounded size-12"
                  src={product.imageUrl}
                  alt={product.name}
                  width={192}
                  height={192}
                />
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-muted-foreground">
                    {formatPlural(product.coursesCount, {
                      singular: "course",
                      plural: "courses",
                    })}{" "}
                    • {formatPrice(product.priceInDollars)}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{product.customersCount}</TableCell>
            <TableCell>
              <Badge className="inline-flex items-center gap-2">
                {getStatusIcon(product.status)} {product.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  nativeButton={false}
                  render={<Link href={`/admin/products/${product.id}/edit`} />}
                >
                  Edit
                </Button>
                <ActionButton
                  variant="destructiveOutline"
                  requireAreYouSure
                  action={deleteProduct.bind(null, product.id)}
                >
                  <TrashIcon />
                  <span className="sr-only">Delete</span>
                </ActionButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function getStatusIcon(status: ProductStatus) {
  const Icon = {
    public: EyeIcon,
    private: LockIcon,
  }[status];

  return <Icon className="size-4" />;
}
