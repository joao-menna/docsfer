import { RelationBtn as RouteBtn } from "./SidebarPages_btn";

export function SidebarTop() {
  return (
    <div className="flex flex-col gap-0.5 py-4">
      <RouteBtn text="Friends" to="" />
      {/* <RouteBtn text="Files" to="files" /> */}
      {/* <RouteBtn text="Groups" to="groups" /> */}
      {/* <RouteBtn text="All Files" to="allFiles" /> */}
    </div>
  );
}
