import { RelationBtn as RouteBtn } from "./SidebarTop_btn";

export function SidebarTop() {
  return (
    <div className="flex flex-col gap-0.5 py-8">
      <RouteBtn text="friends" />
      <RouteBtn text="files" />
      <RouteBtn text="groups" />
      <RouteBtn text="allFiles" />
    </div>
  );
}
