import { allItems } from "../../data/products";
import ProductCard from "../Product/ProductCard";

export default function BestSeller() {

  const BestSellersList = [
    allItems[0],
    allItems[39],
    allItems[69],
    allItems[101],
    allItems[139],
  ];
  return (
    <div className="w-4/5 my-16 rounded-lg m-auto border-4">
      <div>
        <h1 className="font-brandTitle text-center mt-4 text-6xl font-semibold text-sky-800 px-2">
          Top Sellers from the Past Month
        </h1>
      </div>
      <div className="w-full m-auto flex gap-2 justify-center">
        <ProductCard products={BestSellersList} isBestSellerComponent={true} />
      </div>
    </div>
  );
}
