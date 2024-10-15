import { useContext } from "react";
import Button from "../../utils/Buttons";
import { Link } from "react-router-dom";
import { ClothesEShopContext } from "../../useContext/ClothesEShopContext";
import { addProductToCshoppingCart } from "./ProductUtils";

type ProductProps = {
  isBestSellerComponent?: boolean;
  products: {
    id: string;
    name: string;
    description: string;
    collection: string;
    subcategory: string;
    price: number;
    currency: string;
    sizes: string[];
    brand: string;
    material: string;
    availability: boolean;
    stock_quantity: number;
    images: string[];
    rating: number;
  }[];
};

export default function ProductCard({
  products,
  isBestSellerComponent,
}: ProductProps) {
  const productsContext = useContext(ClothesEShopContext);

  return (
    <div
      className={`w-4/5 flex flex-wrap justify-center${
        isBestSellerComponent ? "" : " md:justify-start"
      }`}
    >
      {products.map((product) => (
        <Link
          to={product.id}
          id={product.id}
          key={product.id}
          className={`${
            isBestSellerComponent
              ? "min-w-[170px] max-h-[230px]"
              : "w-[270px] max-h-[391px]"
          } mx-2 my-8 pt-2 relative group hover:border-black border-2 rounded-lg transition-all duration-500`}
        >
          <div className="w-full mb-20">
            <img
              className={`${
                isBestSellerComponent
                  ? "min-w-[90px] h-[130px]"
                  : "w-[200px] h-[300px]"
              } m-auto`}
              src={product.images[0]}
              alt={product.name}
            />
            <div className="absolute right-2 top-2 border-2 border-yellow-400 rounded-full p-2">
              <span className="w-fit rounded-full mt-4 font-semibold">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="w-full m-auto mt-5 pl-[5%] py-1 absolute left-0 right-0 bottom-0 text-sm flex flex-col gap-1 bg- group-hover:bg-gray-200 group-hover:bg-opacity-80 transition-all duration-500 overflow-hidden cursor-default rounded-lg">
            <div className="px-2">
              <h1 className="font-bold font-brandTitle text-xl">
                {product.name}
              </h1>
              <h1 className="font-name">{`${product.price} ${product.currency}`}</h1>
            </div>
            <div className="w-full px-2 group-hover:h-[5.2rem]  h-0 transition-all duration-500 overflow-hidden">
              <span className="font-base text-sm text-gray-500 line-clamp-2">
                {`Available sizes: ${product.sizes.join(", ")}`}
              </span>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  addProductToCshoppingCart(
                    product,
                    productsContext.productsInShoppingCart,
                    productsContext.setProductsInShoppingCart
                  );
                }}
              >
                <Button text="Add To Cart" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
