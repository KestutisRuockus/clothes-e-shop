type TextProps = {
  text: string;
};

export default function Button({ text }: TextProps) {
  return (
    <button className="bg-black text-white bg-opacity-70 py-1 px-4 rounded-full border-2 border-gray-300 hover:bg-white hover:bg-opacity-80 hover:text-black hover:border-black hover:scale-110 transition-all duration-300 cursor-pointer font-base">
      {text}
    </button>
  );
}
