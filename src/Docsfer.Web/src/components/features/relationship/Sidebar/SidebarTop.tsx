import { RelationBtn as RouteBtn } from "./SidebarTop_btn";

export function SidebarTop() {
  return (
    <div className="flex flex-col gap-0.5 py-8">
      <RouteBtn text="friends" to="" />
      <RouteBtn text="files" to="files" />
      <RouteBtn text="groups" to="groups" />
      <RouteBtn text="allFiles" to="allFiles" />
    </div>
  );
}
