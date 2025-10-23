export const SpecialButton = () => {
  return (
    <div className="h-1/3 w-full flex justify-center items-center bg-btn-200 ">
      <button
        className="relative group cursor-pointer w-full h-[50px] leading-[50px] text-center text-black transition-all duration-300
           before:content-[''] before:absolute before:inset-0 before:z-10 before:opacity-0 before:transition-all before:duration-300
           before:border-y before:border-black/50 before:[transform:scale(0.1,1)]
           hover:before:opacity-100 hover:before:[transform:scale(1,1)]
           after:content-[''] after:absolute after:inset-0 after:z-10 after:transition-all after:duration-300 after:bg-black/10
           hover:after:opacity-0 hover:after:[transform:scale(0.1,1)]"
      >
        <span className="relative z-20 transition-all duration-300 group-hover:tracking-[2px] font-gabarito">
          Entrar com email
        </span>
      </button>
    </div>
  );
};
