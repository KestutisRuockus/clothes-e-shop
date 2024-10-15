export default function PaymentsCardsIcons() {
  return (
    <div className="flex justify-center gap-2 items-center relative bg-sky-950 py-2">
      <div className="font-base sm:absolute sm:left-2 text-white text-sm max-[500px]:text-xs">
        © 2024 ClothesEShop.
      </div>
      <div className="flex items-center gap-3 w-fit sm:m-auto text-white">
        <i className="fa-brands fa-cc-mastercard text-xl max-[500px]:text-base"></i>
        <i className="fa-brands fa-cc-visa text- max-[500px]:text-base"></i>
        <i className="fa-brands fa-cc-paypal text- max-[500px]:text-base"></i>
        <i className="fa-brands fa-cc-apple-pay text- max-[500px]:text-base"></i>
        <i className="fa-brands fa-cc-amazon-pay text- max-[500px]:text-base"></i>
        <i className="fa-brands fa-cc-discover text- max-[500px]:text-base"></i>
      </div>
    </div>
  );
}
