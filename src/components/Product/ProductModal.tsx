import { useContext, useEffect, useState } from "react";
import Button from "../../utils/Buttons";
import { useLoaderData } from "react-router-dom";
import { allItems } from "../../data/products";
import { addProductToCshoppingCart } from "./ProductUtils";
import { ClothesEShopContext } from "../../useContext/ClothesEShopContext";
import NoImage from '../../assets/images/no-image.svg'

type ProductProps = {
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
  quantity?: number;
  selectedSize?: string;
}

export default function ProductModal() {
  const product = useLoaderData() as ProductProps;
  const [currentImage, setCurrentImage] = useState<string>(product.images[0]);
  const [size, setSize] = useState<string>("Choose Size");

  const productsContext = useContext(ClothesEShopContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // render images on side and set currentImage state onMouseEnter
  function getAndRenderImages(images: string[]) {
    console.log(images)
    return (
      <div className="w-1/4 max-[500px]:h-[260px] h-[400px] flex flex-col gap-6 justify-between">
        {images.map((image, index) => (
          <a
            key={index}
            href={image ? image : NoImage}
            target="_blank"
            className="cursor-zoom-in max-[500px]:h-[70px] h-[110px]"
          >
            <img
              onMouseEnter={() => setCurrentImage(image)}
              className="w-full h-full hover:opacity-80"
              src={image}
            />
          </a>
        ))}
      </div>
    );
  }
  return (
    <div className="flex md:flex-row flex-col justify-center items-center max-md:items-center md:gap-2 gap-12 lg:w-4/5 w-full m-auto sm:p-8 p-2 pb-12">
      {/* images */}
      <div className="bg-gray-100 sm:w-2/3 w-4/5 h-auto flex justify-end gap-2 p-2 border-2 rounded-lg">
        {getAndRenderImages(product.images)}
        {/* current big image element */}
        <div className="w-2/3">
          <a href={currentImage} target="_blank" className="cursor-zoom-in">
            <img
              className="w-3/4 m-auto max-[500px]:h-[260px] h-[400px]"
              src={currentImage}
              alt={product.name}
            />
          </a>
        </div>
      </div>
      {/* info */}
      <div className="md:w-2/3 w-full flex justify-center items-center">
        <div className="sm:w-2/3 w-4/5 m-auto flex flex-col gap-4">
          <div className="flex justify-end">
            <div className="text-gray-400 text-end text-sm font-base">{`${product.collection}`}</div>
            <div className="text-gray-400 text-end text-sm font-base">{`, ${product.subcategory}`}</div>
          </div>
          <div>
            <h1 className="text-3xl font-[900] font-name">{product.name}</h1>
          </div>
          <div>
            <h1 className="font-brandTitle text-2xl font-semibold text-sky-950">
              {product.brand}
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-sky-800 font-semibold font-base">{`${product.price} ${product.currency}`}</h1>
            <div className="border-2 border-yellow-400 rounded-full p-2">
              <span className="w-fit rounded-full mt-4 font-semibold">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm font-base">Size:</div>
            <div className="flex max-[400px]:flex-col justify-between">
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="border-2 p-1 text-sm rounded-lg cursor-pointer max-[400px]:w-2/3"
                name="size"
              >
                <option value="choose a size">Choose a Size</option>
                {product.sizes.map((size: string) => (
                  <option className="text-sm font-base" key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <div className="font-base text-gray-400 text-sm min-[401px]:text-end">
                Available quantity: {product.stock_quantity}
              </div>
            </div>
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              addProductToCshoppingCart(
                product,
                productsContext.productsInShoppingCart,
                productsContext.setProductsInShoppingCart,
                size
              );
            }}
            className="w-fit rounded-full"
          >
            <Button text="Add To Cart" />
          </div>
          <div className="font-base border-dashed border-b-4 pb-2">
            {product.description}
          </div>
          <div>
            <div className="text-gray-400 text-sm font-base">Material:</div>
            <div className="font-base">{product.material}</div>
          </div>
        </div>
      </div>
    </div>
  );
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const productDetailsLoader = async ({ params }: any) => {

  const { id } = params;

  const product = allItems.find((item) => item.id === id);

  return product;
};
