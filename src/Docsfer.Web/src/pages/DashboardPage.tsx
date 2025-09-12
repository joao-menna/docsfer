import { CardTemplate } from "../components/base/dashboard/CardTemplate";
import { generateActivities } from "@/hooks/useMockData";
import { useMemo } from "react";

const DashboardPage = () => {
  const recentActivities = useMemo(() => generateActivities(7), []);

  return (
    <div className="relative z-10 ml-16 ">
      <div className="flex flex-col gap-2 px-6 py-4">
        <h2 className="font-josefin text-xl dark:text-zinc-400">
          Bem-vindo de volta, Jaozin!
        </h2>
        <div className="flex flex-col gap-12">
          {/* ↓ Seção 1: Atividade recente ↓ */}
          <div className="flex flex-col pt-4 w-full gap-2 overflow-x-auto">
            <h3 className="inline-flex w-fit relative font-gabarito dark:text-sky-500 tracking-wider px-3 py-2 rounded-sm dark:bg-sky-500/20">
              Atividade Recente
            </h3>
            <div className="flex  overflow-x-scroll snap-always snap-mandatory">
              {recentActivities.map((activity, index) => (
                <CardTemplate
                  key={index}
                  {...activity}
                  receiver={activity.receiver ?? ""}
                />
              ))}
            </div>
          </div>
          {/* ↓ Seção 2: Arquivos Enviados ↓ */}
          <div className="flex flex-col gap-2">
            <h3 className="inline-flex w-fit font-gabarito dark:text-sky-500 tracking-wider px-3 py-2 rounded-sm dark:bg-sky-500/20">
              Meus Arquivos
            </h3>
            {/* TODO: CREATE A TABLE*/}
            {/* TODO: ADD TITLE ON HOVER TO THE COLUMNS */}
            Tabela legal aqui
          </div>
          {/* ↓ Seção 3: Todos os Arquivos ↓ */}
          <div className="flex flex-col"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
