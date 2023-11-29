import styles from "./Footer.module.css";
import logoR from "./assets/logo-removedbackground.png";
import linkdin from "./assets/linkedin.svg";
import facebook from "./assets/facebook.png";
import instagram from "./assets/instagram.png";
import youtube from "./assets/youtube.svg";
const Footer = () =>{
    return (
        <footer className={styles.footer}>
            <p>© <img className={styles.logoR} src={logoR} alt="logo" /></p>
            <section className={styles.containerFooter}>
                <h3>Helpdesk</h3>
                <div className={styles.line}></div>
                <p>02 555 55 55</p>
                <p>grant.T@gmail.com</p>
            </section>
            <section className={styles.containerFooter}>
                <h3>Follow us</h3>
                <div className={styles.line2}></div>
                <section className={styles.socials}>
                    <a href="https://www.linkedin.com/company/grant-thornton-belgium/"><img src={linkdin} alt="linkedin"></img></a>
                    <a href="https://www.facebook.com/GrantThorntonBelgium/"><img src={facebook} alt="facebook"></img></a>
                    <a href="https://www.instagram.com/grantthorntonbelgium/"><img src={instagram} alt="instagram"></img></a>
                    <a href="https://www.youtube.com/@grantthorntonbelgium5790"><img src={youtube} alt="youtube"></img></a>
                </section>
            </section>
        </footer>
    )
}
export default Footer;