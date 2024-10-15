import { useContext, useEffect } from "react";
import CollectionsAndSubcategoriesDropList from "./CollectionsAmdSubcategoriesDropList";
import { ClothesEShopContext } from "../../useContext/ClothesEShopContext";
import ProductCard from "../../components/Product/ProductCard";

export default function CurrentSelectedCollection() {
  const productsContext = useContext(ClothesEShopContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full relative">
      <h2 className="text-center text-5xl font-brandTitle text-sky-950 mt-8">
        {productsContext.currentListTitle}
      </h2>
      <div className="w-full flex max-md:items-center max-md:flex-col m-auto">
        <CollectionsAndSubcategoriesDropList />
        {productsContext.currentList.length === 0 ? (
          <div className="p-8 font-base text-lg">
            There are no products in this category.
          </div>
        ) : (
          <ProductCard
            products={productsContext.currentList}
            isBestSellerComponent={false}
          />
        )}
      </div>
      <div className="fixed bottom-6 right-6 flex flex-col-reverse items-end justify-center ">
        <i
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
          className="text-6xl text-blackc bg-[#FECA5A] fa-solid fa-circle-arrow-up rounded-full cursor-pointer hover:opacity-80 peer"
        ></i>
        <p className="text-end font-base text-2xl font-medium opacity-0 peer-hover:opacity-100 transition-all duration-300">
          Scroll to Top
        </p>
      </div>
    </div>
  );
}
