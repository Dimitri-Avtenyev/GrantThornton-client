import styles from "./Header.module.css";
import logo from "./assets/logo.jpeg";
const Header = () =>{
    return (
        <header>
            <img className={styles.logo} src={logo} alt="logo" />
        </header>
    )
}
export default Header;