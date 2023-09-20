import { NavLink } from "react-router-dom";

export function Sidebar(props) {
  console.log(props)
  return (
    <>
      <div className="flex flex-col items-start gap-2 p-10 w-56 bg-blue-800">
        {props.items.map((item, index) => {
          return (
            <NavLink
              className="text-blue-300 hover:text-blue-500 text-xl"
              to={item.path}
              key={index}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </>
  );
}