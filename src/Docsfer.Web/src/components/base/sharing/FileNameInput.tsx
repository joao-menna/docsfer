import SwitchFileButton from "./SwitchFileButton";

export default function FileNameInput() {
return(
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-3">
        <label htmlFor="fileName"
        className="block text-[20px] font-semibold text-[#243D5A]">
            Nome do arquivo
        </label>
      <input type="text" 
      id="fileName" 
      className="w-full rounded-[16px] border border-[#8B1C5] bg-white px-3 py-2 
      text-sm shadow-sm placeholder-zinc-400 
      focus:outline-none focus:border-blue-500 focus:ring-blue-500 
      dark:bg-white dark:text-zic-900"/>


    {/*Botão do Switch*/}
   <SwitchFileButton/>
      </div>
    </div>
  )  
}






