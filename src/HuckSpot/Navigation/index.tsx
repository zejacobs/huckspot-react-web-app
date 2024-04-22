import { Link, useLocation, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./index.css";
import { SlHome } from "react-icons/sl";
import { ImProfile } from "react-icons/im";
import { GrSearch, GrLogin, GrLogout, GrUserNew } from "react-icons/gr";
import * as client from "../Users/client";

function Navigation() {
  const links = [
    { label: "Login", icon: <GrLogin /> },
    { label: "Logout", icon: <GrLogout /> },
    { label: "Home", icon: <SlHome /> },
    { label: "Profile", icon: <ImProfile /> },
    { label: "Search", icon: <GrSearch /> },
    { label: "Register", icon: <GrUserNew /> },
  ];
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const handleLogout = () => {
    confirmAlert({
      title: "Logout",
      message: `Are you sure you want to Logout?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await client.logout();
            navigate("/Login");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="nav-bar">
      <ul>
        <li id="nav-bar-logo">
          <Link to={"/Home"}>
            <div className="px-2">HuckSpot</div>
          </Link>
        </li>
        {links.map((link, index) => (
          <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
            {link.label.includes("Logout") ? (
              <span onClick={handleLogout}>
                {link.icon} {link.label}
              </span>
            ) : (
              <Link to={`/${link.label}`}>
                {link.icon} {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navigation;
