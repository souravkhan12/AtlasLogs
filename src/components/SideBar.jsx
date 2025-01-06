import { NavLink, Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./SideBar.module.css";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy;Copyright{new Date().getFullYear()} by worldwise Inc.
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
