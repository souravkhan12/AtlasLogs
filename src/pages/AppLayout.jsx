import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import User from "../components/User";
import { useAuth } from "../components/contexts/FakeAuthContext";

function AppLayout() {
  const { isAuthenticated } = useAuth();
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      {isAuthenticated && <User />}
    </div>
  );
}

export default AppLayout;
