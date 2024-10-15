import { Outlet } from "react-router-dom";

export default function CurrentProductsLayout() {
  return (
    <div className="bg-slate-100 w-full">
      <Outlet />
    </div>
  );
}
