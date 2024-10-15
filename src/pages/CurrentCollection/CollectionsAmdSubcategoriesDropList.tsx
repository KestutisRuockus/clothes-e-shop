import { collectionsAndSubcategories } from "../../data/collectionsAndSubcategories";
import Accordion from "../../utils/Accordion";

export default function CollectionsAndSubcategoriesDropList() {
  return (
    <div className="pt-4 px-1 md:w-1/5 md:pl-8 max-md:px-4 flex md:justify-start max-[572px]:flex-col justify-center md:flex-col flex-row gap-4 md:my-8">
      {collectionsAndSubcategories.map((item) => (
        <Accordion key={item.collection} dropList={item} />
      ))}
    </div>
  );
}
