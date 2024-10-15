import { useContext } from "react";
import { allItems } from "../data/products";
import { ClothesEShopContext } from "../useContext/ClothesEShopContext";


export function filterListByCollectionType(collection: string) {

  const productsContext = useContext(ClothesEShopContext);

  if (collection !== "All") {
    const filteredList = allItems.filter(
      (product) => product.collection === `${collection}'s Clothing`
    );
    productsContext.setCurrentList(filteredList);
  } else {
    productsContext.setCurrentList(allItems);
  }
}
