import styles from "./WelcomeText.module.css"

const WelcomeText = () => {
    return (
        <div className={styles.welcomeContainer}>
            <h1>Welkom</h1>
            <hr className={styles.line} />
            <p>Sleep uw bestand naar onderstaand veld of <br /> klik op het veld om je bestand te uploaden</p>
        </div>
    )
}

export default WelcomeText;