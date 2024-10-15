import { FormEvent, useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Form, NavLink, useNavigate } from "react-router-dom";
import Button from "../../utils/Buttons";
import { ClothesEShopContext } from "../../useContext/ClothesEShopContext";

export default function Checkout() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number | undefined>(undefined);
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [itIsTimeToNavigateToHomepage, setIsTimeToNavigateToHomepage] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const productsContext = useContext(ClothesEShopContext);

  // set timer after submiting proceed form
  useEffect(() => {
    const timer = setTimeout(() => {
      if (time > 1) {
        setTime((prevTime) => prevTime - 1);
      } else {
        setIsOrderSubmitted(false);
        setIsTimeToNavigateToHomepage(true);
        getBackToMenuNow();
        return () => clearTimeout(timer);
      }
    }, 1000);
  }, [time]);

  // handle form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const orderDetails = { fullName, email, phoneNumber, shippingAddress };
    setTime(9);
    setIsOrderSubmitted(true);
    localStorage.removeItem("shopping-cart");
    productsContext.setProductsInShoppingCart([]);
    console.log(orderDetails);
  };

  // route to main page immediately
  const getBackToMenuNow = (): void => {
    if (itIsTimeToNavigateToHomepage) return navigate("/");
  };

  return (
    <div className="w-full h-full py-12">
      <h3 className="text-center text-sky-950 font-brandTitle font-bold text-5xl mb-6">
        Order Details
      </h3>

      <div className="flex md:flex-row flex-col max-md:gap-8 justify-center items-center lg:w-3/5 min-[400px]:w-4/5 w-full m-auto rounded-lg p-4 bg-[#FECA5A] bg-opacity-70 relative">
        {/* submitted order element */}
        {isOrderSubmitted && (
          <div className="bg-white w-1/2 h-fit flex flex-col gap-3 justify-center items-center sm:p-8 p-2 rounded-lg border-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="font-base text-lg">
              Your order has been successfully submitted.
            </h2>
            <p className="font-base text-xs text-gray-400">
              You will be redirected to the main page after {time} seconds.
            </p>
            <NavLink
              className="rounded-full md:text-md text-xs"
              to="/"
            >
              <Button text="To the Main page" />
            </NavLink>
          </div>
        )}

        {/* img & error message */}
        <div className="flex justify-center items-center sm:w-2/5 w-full">
          <div className="w-4/5 m-auto rounded-3xl">
            <img className="w-2/3 m-auto rounded-3xl" src={logo} />
            <div className="text-center font-name text-2xl font-semibold mt-8">
              Please fill out the form.
            </div>
          </div>
        </div>
        {/* Form */}
        <div className="bg-black bg-opacity-80 flex flex-col py-8 items-center gap-4 w-[500px] max-sm:w-[350px] max-[500px]:w-[300px] rounded-lg">
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-4/5 m-auto"
            method="post"
            // action="/shoppingcart/checkout"
          >
            <label className="w-full">
              <p className="font-base font-semibold text-[#FECA5A]">
                Full Name
              </p>
              <input
                className="w-full font-base px-2 py-[0.25rem] focus:outline-none focus:bg-rose-100 transition-colors duration-200 rounded-lg"
                type="text"
                name="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
            <label className="w-full">
              <p className="font-base font-semibold text-[#FECA5A]">Email</p>
              <input
                className="w-full font-base px-2 py-[0.25rem] focus:outline-none focus:bg-rose-100 transition-colors duration-200 rounded-lg"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="w-full">
              <p className="font-base font-semibold text-[#FECA5A]">
                Phone Number
              </p>
              <input
                className="w-full font-base px-2 py-[0.25rem] focus:outline-none focus:bg-rose-100 transition-colors duration-200 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                name="phoneNumber"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
              />
            </label>
            <label className="w-full">
              <p className="font-base font-semibold text-[#FECA5A]">
                Shipping Address
              </p>
              <input
                className="w-full font-base px-2 py-[0.25rem] focus:outline-none focus:bg-rose-100 transition-colors duration-200 rounded-lg"
                type="text"
                name="shippingAddress"
                required
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </label>
            <Button text="Proceed" />
          </Form>
        </div>
      </div>
    </div>
  );
}
