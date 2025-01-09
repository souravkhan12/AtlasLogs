import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../components/contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  function handleLogin(e) {
    login(email, password);
    e.preventDefault();
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className={styles.leto} onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </main>
  );
}

// fake
