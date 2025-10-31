import Sidebar from "@/layout/relationship/sidebar";

const GroupPage = () => {
  return (
    <div className="flex min-h-[calc(100dvh-3rem)] w-full">
      <Sidebar />
      {/* SECTION: Main Content
      --------------------------------------------- */}
      <div className="w-full h-full bg-black"></div>
    </div>
  );
};

export default GroupPage;
