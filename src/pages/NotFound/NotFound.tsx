import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen">
      <h2>Page not found!</h2>
      <button className="bg-slate-600 border-2 p-2">
        Go to the <NavLink to="/clotheseshop">Go to e shop page</NavLink>.
      </button>
    </div>
  );
}
