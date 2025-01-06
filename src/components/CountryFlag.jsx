import styles from "./CountryFlag.module.css";

const CountryFlag = ({ countryCode }) => (
  <img
    src={`https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`}
    alt={`Flag of ${countryCode}`}
    className={styles.flag}
  />
);

export default CountryFlag;
