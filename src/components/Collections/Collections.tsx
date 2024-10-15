import { collectionsTypes } from "../../data/collectionsTypes";
import { useContext } from "react";
import Button from "../../utils/Buttons";
import { NavLink } from "react-router-dom";
import { ClothesEShopContext } from "../../useContext/ClothesEShopContext";
import { allItems } from "../../data/products";

type LinkProps = {
  pageUrl: string;
  collection: string;
  imgUrl: string;
};

// render possible collections components
function generateCollection(
  collections: { collection: string; pageUrl: string; imgUrl: string }[]
) {
  function createNavLink(obj: LinkProps) {
    const productsContext = useContext(ClothesEShopContext);

    function filterListByCollectionType(collection: string) {
      const filteredList = allItems.filter(
        (product: { collection: string; }) => product.collection === `${collection}'s Clothing`
      );
      productsContext.setCurrentList(filteredList);
    }

    return (
      <NavLink
        onClick={() => {
          productsContext.setCurrentListTitle(`${obj.collection} Collection`);
          filterListByCollectionType(obj.collection);
        }}
        to={obj.pageUrl}
        key={obj.collection}
        className="w-80 max-[580px]:w-72 m-auto my-8 rounded-lg relative cursor-pointer group"
      >
        <div>
          <img
            className="w-full rounded-lg h-[426px]"
            src={obj.imgUrl}
            alt={obj.collection}
          />
        </div>
        <div className="text-white font-semibold text-center w-4/5 absolute m-auto left-0 right-0 bottom-5 rounded-lg py-6 border-4 border-gray-300 bg-black bg-opacity-70 group-hover:py-12 group-hover:bottom-16 group-hover:bg-gray-500 group-hover:bg-opacity-80 group-hover:text-[#FECA5A] transition-all duration-300 cursor-pointer">
          <h1 className="font-name text-4xl cursor-pointer">
            {obj.collection}
          </h1>
          <h1 className="font-name text-4xl cursor-pointer">Collection</h1>
          <Button text="Shop Now" />
        </div>
      </NavLink>
    );
  }

  return (
    <div className="w-fit m-auto flex flex-wrap justify-center gap-4">
      {collections.map((obj) => createNavLink(obj))}
    </div>
  );
}

export default function Collections() {
  return generateCollection(collectionsTypes);
}
