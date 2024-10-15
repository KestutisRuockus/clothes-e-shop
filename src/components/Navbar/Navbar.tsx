import { useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { ClothesEShopContext } from "../../useContext/ClothesEShopContext";
import { allItems } from "../../data/products";
import { links } from "../../data/navbarLinks";

type LinkProps = {
  name: string;
  link: string;
};

type SearchResultsProps = {
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
};

export default function Navbar() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false); // state used to set or navbar is open or closed on small screens/pages
  const [navOpacity, setNavOpacity] = useState<string>(""); // set navbar opacity value

  const navigate = useNavigate()

  const productsContext = useContext(ClothesEShopContext);

  // check if user is scrolling then set opacity value for navbar
  window.onscroll = function () {
    if (window.scrollY > 0) {
      setNavOpacity("50");
    } else {
      setNavOpacity("100");
    }
  };

  function filterListByCollectionType(collection: string) {
    if (collection !== "All") {
      const filteredList = allItems.filter(
        (product: SearchResultsProps) => product.collection === `${collection}'s Clothing`
      );
      productsContext.setCurrentList(filteredList);
    } else {
      productsContext.setCurrentList(allItems);
    }
  }

  function createNavLink(link: LinkProps) {
    return (
      <NavLink
        onClick={() => {
          productsContext.setCurrentListTitle(`${link.name} Collection`);
          filterListByCollectionType(link.name);
          setOpen(false);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        to={link.link}
        className="font-brandTitle lg:text-3xl text-2xl font-semibold cursor-pointer border-black md:hover:border-b-8 md:hover:-mb-4 transition-all duration-200 rounded-b-lg max-md:hover:text-[#FECA5A]"
        key={link.name}
      >
        {link.name}
      </NavLink>
    );
  }

  function searchProductInNameOrSubcategoryKeys(): void {
    if(searchInput !== ''){

    productsContext.setCurrentListTitle(`Your Search Results`);
    const filteredList: SearchResultsProps[] = [];
    allItems.forEach((product: SearchResultsProps) => {
      if (
        product.name.toLowerCase().includes(searchInput.toLocaleLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchInput.toLocaleLowerCase())
      ) {
        filteredList.push(product);
      }
    });
    setSearchInput('');
    productsContext.setCurrentList(filteredList);
  }
  }

  return (
    <nav
      className={`flex item-center md:justify-between justify-end px-2 bg-[#FECA5A] sticky top-0 z-50 opacity-${navOpacity} transition-all duration-300 hover:opacity-100`}
    >
      {/* hamburger element of links */}
      <div
        onClick={() => setOpen(!open)}
        className="absolute md:hidden left-4 top-7 z-40"
      >
        {open ? (
          <i className="fa-regular fa-rectangle-xmark text-white hover:text-rose-700 cursor-pointer text-3xl transition-all duration-200"></i>
        ) : (
          <i className="fa-solid fa-bars text-black hover:text-rose-700 cursor-pointer text-3xl transition-all duration-200"></i>
        )}
      </div>
      {/* ul element of links */}
      <ul
        className={`sm:w-2/3 w-full flex md:flex-row flex-col justify-center items-center lg:gap-12 gap-8 max-md:absolute max-md:z-30 z-0  ${
          open ? "left-0" : "max-md:-left-full z-10"
        } top-0 max-md:py-24 max-md:bg-black max-md:text-white md:pb-0 pb-4 rounded-br-3xl transition-all duration-200 relative`}
      >
        {links.map((link: LinkProps) => createNavLink(link))}
      </ul>
      {/* logo element */}
      <div className="flex justify-end md:w-1/2 sm:w-2/3 w-2/3">
        <div className="w-1/2 p-2">
          <img
            className="w-24 h-16 rounded-3xl cursor-pointer"
            src={logo}
            alt=""
          />
        </div>
        {/* search element */}
        <div className="flex justify-center items-center search-input w-2/3">
          <input
          onKeyDown={(e) => {
            if(e.key === 'Enter' && searchInput !== '') {
              searchProductInNameOrSubcategoryKeys();
              navigate('collection');
              setSearchInput('');
            }
          }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="font-base w-full h-10 sm:px-4 px-2 focus:outline-none focus:bg-rose-100 rounded-s-lg transition-colors duration-200"
            type="text"
            placeholder="Search"
          />
          <NavLink to="collection">
            <i
              onClick={searchProductInNameOrSubcategoryKeys}
              className="fa-solid fa-magnifying-glass p-3 rounded-e-lg text-white bg-black cursor-pointer hover:bg-rose-700 transition-colors duration-200"
            ></i>
          </NavLink>
        </div>
      </div>
      {/* shopping cart icon */}
      <NavLink
        to="shoppingcart"
        className="flex justify-end items-center h-fit m-auto mx-4 relative group"
      >
        <i className="fa-solid fa-cart-shopping text-3xl group-hover:opacity-70 cursor-pointer"></i>
        <div
          className={`flex justify-center items-center w-5 h-5 p-[2px] bg-rose-700 rounded-full absolute right-[-10px] bottom-[-8px] ${
            productsContext.productsInShoppingCart.length === 0
              ? "hidden"
              : "visible cursor-default"
          }`}
        >
          <div className="text-white text-xs">
            {productsContext.productsInShoppingCart.length}
          </div>
        </div>
      </NavLink>
    </nav>
  );
}
