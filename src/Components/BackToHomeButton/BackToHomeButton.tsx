import { useState } from "react"
import HomeIcon from '@mui/icons-material/Home';
// npm package geinstalleerd materialui 
// button om terug te keren naar home pagine
import { Button, Link } from "@mui/material";
import styles from "./BackToHomeButton.module.css";
const BackToHomeButton =()=>{
    return(
        <Button className={styles.backToHomeButton}><Link href="/">
            <HomeIcon className={styles.icon}></HomeIcon><div className={styles.text}>Home</div></Link></Button>
    )
}
export  default BackToHomeButton