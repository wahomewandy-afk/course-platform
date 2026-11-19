import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/formatters";
import { getUserCoupon } from "@/lib/userCountryHeader";
import { Link } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
export function ProductCard({
  id,
  image,
  name,
  priceInDollars,
  description,
}: {
  id: string;
  image: string;
  name: string;
  priceInDollars: number;
  description: string;
}) {
  return (
    <Card className="overflow-hidden flex flex-col w-full max-w-[500px] mx-auto">
      <div className="relative aspect-video w-full">
        <Image src={image} alt={name}
         fill 
         sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
         className="object-cover" />
      </div>
      <CardHeader className="space-y-0">
        <CardDescription>
          <Suspense fallback={formatPrice(priceInDollars)}>
            <Price price={priceInDollars} />
          </Suspense>
        </CardDescription>
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          className="w-full text-md py-6"
          render={<Link href={`/courses/${id}`} />}
        >
          View Course
        </Button>
      </CardFooter>
    </Card>
  );
}

async function Price({ price }: { price: number }) {
  if (price === 0) return formatPrice(price);

  const coupon = await getUserCoupon();
  if (price === 0 || coupon == null) {
    return formatPrice(price);
  }
  return (
    <div className="flex-gap-2 items-baseline">
      <div className="line-through text-xs opacity-50">
        {formatPrice(price)}
      </div>
      {coupon != null && (
        <div>{formatPrice(price * (1 - coupon.discountPercentage))}</div>
      )}
    </div>
  );
}
