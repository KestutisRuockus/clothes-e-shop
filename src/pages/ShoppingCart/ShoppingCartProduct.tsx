import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClothesEShopContext } from "../../useContext/ClothesEShopContext";

type ShoppingCartProductProps = {
  product: Product;
  addToTotalCartPrice: (price: number) => void;
  minusFromTotalCartPrice: (price: number) => void;
};

type Product = {
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



export default function ShoppingCartProduct({
  product,
  addToTotalCartPrice,
  minusFromTotalCartPrice,
}: ShoppingCartProductProps) {
  const [quantity, setQuantity] = useState<number>(product.quantity ?? 0);
  const [PrevQuantity, setPrevQuantity] = useState<number>(quantity);
  const [totalPrice] = useState<number>(product.price);
  const [mounted, setMounted] = useState<boolean>(false);
  const [size, setSize] = useState<string>(product.selectedSize ?? '');

  console.log(addToTotalCartPrice)

  const productsContext = useContext(ClothesEShopContext);

  // delete item from shopping cart and save changes to local storage
  const deleteItemFromLocalStorage = (id: string): void => {
    const newArr = productsContext.productsInShoppingCart.filter(
      (item: { id: string; }) => item.id !== id
    );
    localStorage.setItem("shopping-cart", JSON.stringify(newArr));
    productsContext.setProductsInShoppingCart(newArr);
  };

  // update item quantity in shopping cart and save changes to local storage
  const updateQuantityInLocalStorage = (id: string, number: number): void => {
    if (quantity !== 1 || number > 0) {
      const newArr = productsContext.productsInShoppingCart.map((item: { id: string; quantity: number; }) => {
        if (item.id === id) {
          item.quantity = quantity + number;
        }
        return item;
      });

      localStorage.setItem("shopping-cart", JSON.stringify(newArr));
    }
  };

  // update item size in shopping cart and save changes to local storage
  const updateProductSizeInLocalStorage = (id: string): void => {
    const newArr = productsContext.productsInShoppingCart.map(
      (item: { id: string; quantity: number; selectedSize: string }) => {
        if (item.id === id) {
          item.selectedSize = size;
        }
        return item;
      }
    );

    localStorage.setItem("shopping-cart", JSON.stringify(newArr));
  };

  // set previous Quantity
  useEffect(() => {
    setPrevQuantity(quantity);
  }, [quantity]);

  // plus price or minus price to/from total price
  useEffect(() => {
    if (mounted) {
      if (PrevQuantity <= quantity) {
        addToTotalCartPrice(product.price);
      } else {
        minusFromTotalCartPrice(product.price);
      }
    } else {
      setMounted(true);
    }
  }, [quantity]);

  useEffect(() => {
    updateProductSizeInLocalStorage(product.id);
  }, [size]);

  // decrease quantity by 1
  function decreaseQuantity(): void {
    if (quantity !== 1) setQuantity((prevQuantity) => prevQuantity - 1);
    updateQuantityInLocalStorage(product.id, -1);
  }
  // increase quantity by 1
  function increaseQuantity(): void {
    setQuantity((prevQuantity) => prevQuantity + 1);
    updateQuantityInLocalStorage(product.id, 1);
  }

  // handle select element
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSize(event.target.value);
  };

  return (
    <div className="flex max-[500px]:flex-col max-[500px]:items-center gap-4 w-full border-2 border-[#FECA5A] rounded-lg p-4 my-2 relative">
      <Link
        to={product.id}
        className="flex max-md:flex-col md:gap-12 justify-center items-center max-[500px]:w-1/2 w-full max-md:text-sm font-semibold hover:opacity-70 transition-all duration-300"
      >
        <div className="w-28 h-32 flex justify-center items-center cursor-pointer hover:opacity-80 transition-all duration-300">
          <img
            className="w-full h-full m-auto"
            src={product.images[0]}
            alt={product.name}
          />
        </div>
        <div className="md:w-1/2 w-full flex flex-col gap-1 justify-center items-center cursor-pointer hover:opacity-70 transition-all duration-300 text-center">
          <div className="font-brandTitle text-2xl text-sky-950 max-md:text-sm">
            {product.brand}
          </div>
          <div className="font-name max-md:text-base text-xl text-black">{`'${product.name}' `}</div>
          <div
            onClick={(e) => e.preventDefault()}
            className="font-base text-sm max-md:text-xs text-slate-500"
          >
            Size:{" "}
            <select
              value={size}
              onChange={handleChange}
              className="hover:opacity-100"
            >
              <option value="Choose Size">Choose Size</option>
              {product.sizes.map((size: string) => (
                <option className="text-sm font-base" key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Link>
      <div className="flex flex-col max-[500px]:w-full w-1/3 justify-center items-center">
        <div className="w-full flex flex-col gap-1 justify-center items-center font-semibold ">
          <div className="font-base max-md:text-sm">Total:</div>
          <div className="font-base max-md:text-sm">
            {(totalPrice * quantity).toFixed(2)} {product.currency}
          </div>
          <div
            className={`font-base text-sm text-gray-400 ${
              quantity > 1 ? "opacity-100" : "opacity-0"
            } transition-all duration-500 cursor-default`}
          >{`${quantity} x ${product.price} `}</div>
        </div>
        <div className="w-1/3 flex justify-center items-center text-gray-400 text-sm max-md:text-xs">
          <div className="px-2 border-2 border-r-0 rounded-l-full cursor-pointer bg-black text-[#FECA5A] hover:opacity-70 transition-all duration-300">
            <i
              onClick={(e) => {
                e.preventDefault();
                decreaseQuantity();
              }}
              className="fa-solid fa-minus"
            ></i>
          </div>
          <div className="font-base px-4 border-y-2 text-black font-semibold cursor-default text-sm max-md:text-xs">
            {quantity}
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              increaseQuantity();
            }}
            className="px-2 border-2 border-l-0 rounded-r-full cursor-pointer bg-black text-[#FECA5A] hover:opacity-70 transition-colors duration-300"
          >
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
      <div className="absolute right-4 top-4">
        <i
          onClick={() => deleteItemFromLocalStorage(product.id)}
          className="fa-solid fa-trash-can cursor-pointer text-2xl text-rose-700 hover:opacity-70 transition-colors duration-300"
        ></i>
      </div>
    </div>
  );
}
