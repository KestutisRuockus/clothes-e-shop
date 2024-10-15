import { useContext, useState } from "react";
import { ClothesEShopContext } from "../useContext/ClothesEShopContext";
import { allItems } from "../data/products";

type AccordionProps = {
  dropList: {
    collection: string;
    subcategories: string[];
  };
};

export default function Accordion({ dropList }: AccordionProps) {
  // console.log(dropList)
  const [accordionOpen, setAccordionOpen] = useState(false);

  const productsContext = useContext(ClothesEShopContext);

  function filterListBySubcategoryType(
    collection: string,
    subcategory: string
  ) {
    productsContext.setCurrentListTitle(
      `${collection} ${subcategory} Collection`
    );

    const filteredList = allItems
      .filter((product) => product.collection === `${collection}'s Clothing`)
      .filter((product) => product.subcategory === subcategory);
    productsContext.setCurrentList(filteredList);
  }

  function getAllProductsBySubcategory(collection: string, subcategory: string) {
    filterListBySubcategoryType(collection, subcategory);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="w-full">
      <div
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="w-full flex justify-between items-center px-1 group border-b-2 border-gray-300 cursor-pointer"
      >
        <div className="w-full font-name text-xl font-semibold text-sky-950 group-hover:text-gray-500 transition-all duration-300">
          {dropList.collection + " Collection"}
        </div>
        <i
          className={`fa-solid fa-angle-${
            accordionOpen ? "up" : "down"
          } group-hover:text-gray-500`}
        ></i>
      </div>
      <div className="w-full flex flex-col gap-2 pt-2 pl-4 overflow-hidden transition-all duration-300 ease-in-out">
        {dropList.subcategories.map((subcategory) => (
          <h1
            key={subcategory}
            onClick={() =>
              getAllProductsBySubcategory(dropList.collection, subcategory)
            }
            className={`font-base w-full bg-rose-100 bg-opacity-0 hover:bg-opacity-100 hover:w-full rounded-lg ${
              accordionOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden cursor-pointer hover:text-rose-700 text-sm font-semibold hover:pl-2 transition-all duration-500`}
          >
            {subcategory}
          </h1>
        ))}
      </div>
    </div>
  );
}
