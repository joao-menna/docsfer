export const NewCardTemplate = () => {
  return (
    <div className="flex flex-col gap-8 w-96 px-1.5 pt-1.5 pb-3 rounded-2xl border border-zinc-500">
      {/*Top content */}
      <div className=" w-full flex flex-col gap-1">
        {/*Top */}
        <div className=" flex flex-col w-full">
          {/*container */}
          <div className=" flex bg-sky-500/20 gap-3.5 h-fit px-3.5 py-2 rounded-[10px]">
            <img
              src="/images/logo_docspider.png"
              alt="logo"
              className="object-cover size-10 rounded-full"
            />
            {/*TextTop */}
            <div className=" flex flex-col gap-2 w-full">
              <div className=" flex justify-between w-full">
                <span className=" max-w-44 w-full truncate text-amber-50 font-raleway font-semibold text-[20px] text-nowrap">
                  The Ghost Farm The Ghost Farm The Ghost Farm
                </span>
                <span className=" justify-start truncate inline-flex px-2 py-1 gap-2 rounded-[4px] bg-white/20 text-sky-500 ">
                  Administrativo
                </span>
              </div>
              {/*email*/}
              <div className="flex flex-col">
                <span className=" flex flex-col w-full font-gabarito text-[16px] text-zinc-500">
                  ricardo@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
        {/*activity */}
        <div className=" flex gap-1 px-5 font-gabarito text-zinc-300">
          <span>Enviou</span>
          <span className=" text-sky-500 ">arquivo.pdf</span>
          <span>para</span>
          <span className="underline">Financeiro</span>
        </div>
      </div>
      {/*baixo */}
      <div className="flex flex-col">
        <div className="flex w-full justify-between px-5 font-gabarito text-[1rem]">
          <span className=" text-zinc-500">Realizado</span>
          <span className=" text-zinc-200">01/01/2001 00:00:00</span>
        </div>
        <div className="flex w-full justify-between px-5 font-gabarito text-[1rem]">
          <span className=" text-zinc-500">Tamanho</span>
          <span className=" text-zinc-200">15mb</span>
        </div>
      </div>
    </div>
  );
};
