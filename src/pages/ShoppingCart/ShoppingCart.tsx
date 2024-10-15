import { useContext, useEffect, useState } from "react";
import ShoppingCartProduct from "./ShoppingCartProduct";
import Button from "../../utils/Buttons";
import { NavLink } from "react-router-dom";
import { ClothesEShopContext } from "../../useContext/ClothesEShopContext";
import { allItems } from '../../data/products';

type ProductsInShoppingCartProps = {
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
};

type CalculateTotalsProps = {
  totalPrice: number;
  totalQuantity: number;
};

type ItemProps = {
  id: string;
  quantity: number;
  selectedSize: string;
};

export default function ShoppingCart() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const productsContext = useContext(ClothesEShopContext);
  const [cartProducts, setCartProducts] = useState<
    ProductsInShoppingCartProps[]
  >([]);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [totalCartProductsQuantity, setTotalCartProductsQuantity] =
    useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // increase totalCartProductsQuantity state by 1.
  // add to totalCartPrice state product price
  const addToTotalCartPrice = (childComponentTotalPrice: number): void => {
    setTotalCartProductsQuantity((prevQuantity) => prevQuantity + 1);
    setTotalCartPrice((prevPrice) => prevPrice + childComponentTotalPrice);
  };
  // decrease totalCartProductsQuantity state by 1.
  // minus from totalCartPrice state product price
  const minusFromTotalCartPrice = (childComponentTotalPrice: number): void => {
    setTotalCartProductsQuantity((prevQuantity) => prevQuantity - 1);
    setTotalCartPrice((prevPrice) => prevPrice - childComponentTotalPrice);
  };

  // get to cartProducts state products by saved products ids in localStorage as shopping-cart
  useEffect(() => {
    const productsInShoppingCart: ProductsInShoppingCartProps[] = [];
    productsContext.productsInShoppingCart.map(
      (item: { id: string; quantity: number; selectedSize: string }) => {
        allItems.find((product: ProductsInShoppingCartProps) => {
          if (product.id === item.id) {
            product = {
              ...product,
              quantity: item.quantity,
              selectedSize: item.selectedSize,
            };
            productsInShoppingCart.push(product);
          }
        });
      }
    );
    setCartProducts(productsInShoppingCart);
  }, [productsContext.productsInShoppingCart]);

  // calculate totalCartPrice and totalCartProductsQuantity whenever cartProducts state changes.
  useEffect(() => {
    const calculateTotals = () => {
      const { totalPrice, totalQuantity }: CalculateTotalsProps =
        cartProducts.reduce(
          (obj, item) => {
            obj.totalPrice += item.price * item.quantity!;
            obj.totalQuantity += item.quantity!;
            return obj;
          },
          { totalPrice: 0, totalQuantity: 0 }
        );
      setTotalCartPrice(totalPrice);
      setTotalCartProductsQuantity(totalQuantity);
    };
    calculateTotals();
  }, [cartProducts]);

  // check if all products have selected size. if at least one does not returns TRUE
  const checkIfAtLeastOneProductDoesNotHaveSize = (): boolean =>
    productsContext.productsInShoppingCart.some(
      (item: ItemProps) => item.selectedSize === "Choose Size"
    );

  return (
    <div className="w-full py-8">
      <div className="md:w-4/5 w-full m-auto">
        <div className="font-brandTitle text-center text-5xl font-bold text-sky-800 mb-4">
          Your Shopping Cart
        </div>
        <div className="flex max-md:flex-col gap-2 w-full">
          <div className="w-2/3 m-auto">
            {cartProducts.length === 0 ? (
              <div className="flex justify-center items-center font-base text-3xl font-semibold">
                There Are No Products In Your Cart
              </div>
            ) : (
              cartProducts.map((product) => (
                <ShoppingCartProduct
                  key={product.id}
                  product={product}
                  addToTotalCartPrice={addToTotalCartPrice}
                  minusFromTotalCartPrice={minusFromTotalCartPrice}
                />
              ))
            )}
          </div>
          <div className="md:w-1/3 w-2/3 m-auto my-2 ">
            <div className="flex flex-col gap-4 sticky top-24 border-2 rounded-lg p-6">
              <div className="flex justify-between text-slate-500 font-semibold">
                <div className="font-base">Total products:</div>
                <div className="font-base max-md:text-sm">
                  {totalCartProductsQuantity}
                </div>
              </div>
              <div className="flex justify-between font-semibold">
                <div className="font-base lg:text-2xl md:text-xl text-xl">
                  Total:
                </div>
                <div className="font-base lg:text-2xl md:text-xl text-lg">
                  {(totalCartPrice * 1).toFixed(2)} EUR
                </div>
              </div>
              <NavLink
                onClick={(e) => {
                  if (checkIfAtLeastOneProductDoesNotHaveSize()) {
                    e.preventDefault();
                    setErrorMessage(
                      "!!! Ensure that a size is selected for every product. !!!"
                    );
                  }
                }}
                className="w-fit rounded-full"
                to={cartProducts.length === 0 ? "" : "checkout"}
              >
                <Button text="Checkout" />
              </NavLink>
              <div>
                {errorMessage ? (
                  <p className="font-base text-red-500 text-xl">
                    {errorMessage}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
