export default function BrandAdvertisement() {
  return (
    <div className="bg-black w-full py-5">
      <div className="w-4/5 flex md:flex-row flex-col lg:gap-0 md:gap-6 gap-20 justify-center items-center m-auto text-white">
        <div className="md:w-1/2 w-2/3 flex justify-center">
          <img
            className="w-[320px]"
            src="https://cdn.aboutstatic.com/file/images/c070a43ae266483c2898260fb69a59ab.jpg?quality=75&height=1067&width=800"
            alt=""
          />
        </div>
        <div className="md:w-1/2 w-2/3 h-full flex md:items-start items-center lg:pb-0 pb-8 flex-col gap-6">
          <div className="flex justify-center md:w-1/3 w-1/2">
            <img
              className="w-full rounded-3xl"
              src="https://cdn.aboutstatic.com/file/1628e2b358b2f34377b876fb6fe4a2ba?quality=75&transparent=1&trim=1&height=550&width=550"
              alt="buffalo brand"
            />
          </div>
          <div className="font-base">
            Use all your positivity, optimism, creativity and motivation. We
            believe in that kind of passion.
          </div>
          <div>
            <button className="py-2 px-6 bg-white text-black rounded-lg font-semibold font-base hover:bg-gray-400 transition-colors duration-200">
              See Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
