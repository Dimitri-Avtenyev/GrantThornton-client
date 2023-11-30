import React, {useState, useCallback} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import styles from "./UploadArea.module.css";
import Button from "@mui/material/Button"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "@mui/material/Link";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ArticleIcon from '@mui/icons-material/Article';
import { ListItemText } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Box from "@mui/material/Box";
import WelcomeText from '../WelcomeText/WelcomeText';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';
import HandlerModal from '../Modal/Modal';





const cache = createCache({
    key: "css",
    prepend: true
})


const UploadArea = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [rejected, setRejected] = useState<FileRejection[]>([]);
    const [downloadlink, setDownloadLink] = useState<string>("");
    const [requestSucces, setRequestSucces] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    const onDrop = useCallback((acceptedFiles : File[], rejectedFiles : FileRejection[]) => {
        if(acceptedFiles.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles
            ])
        }

        if(rejectedFiles.length) {
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
        }
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, maxFiles:1, accept: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
    }})

    const removeFile = (name : string) => {
        setFiles(files => files.filter(file => file.name !== name));
    }

    // ----- CODE TO REMOVE REJECTED FILES -----
    // const removeRejected = (name : string) => {
    //     setRejected(files => files.filter(({file}) => file.name !== name));
    // }
    const handleLoading = ()=>{
        setLoading(true);
    }
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(!files.length) return;
        

        const formData = new FormData();
        files.forEach(file => formData.append("file", file));

        // -> send and receive xslx file as response <-
        // hier is ineens een "guideline" voor file als response
         // -> ---------------- receive file as res --------------------- <-
        try {
            //setLoading (true); //loading start
            const ENDPOINT = process.env.NODE_ENV === "production" ? 
            "https://grantthornton-server.azurewebsites.net/uploadfile": 
            `${process.env.REACT_APP_URL_SERVER_LOCAL}/uploadfile`;
            
            const response = await fetch(ENDPOINT, {
                method: "POST",
                body: formData
            });
            if (response.status === 200) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setDownloadLink(url);
                setRequestSucces(true);
            } 
        } catch (err) {
            console.log(err);
            setShowError(true);
        }finally {
            setLoading (false); // na het laden afzetten
        }
        // -> ---------------- receive file as res --------------------- <- 
    }

    const boxDefault = {
        height: 100,
    }

    return (
    <>
        <CacheProvider value={cache}>
        {!requestSucces ?
        <div className={styles.uploadArea}>
            <WelcomeText/>
            <form onSubmit={handleSubmit}>
                <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                isDragActive ?
                <Button className={styles.uploadButton} component="label" variant="contained">Plaats je bestand hier</Button> :
                <Button className={styles.uploadButton} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload bestanden
                </Button>
                }
                </div>
                <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={boxDefault}
                >
                    {showError && <p>test</p>}
                    {loading &&  <LoadingIndicator></LoadingIndicator>}
                    <Button variant="contained" type="submit" className={styles.convertButton} onClick={handleLoading} disabled={!files.length}>Convert</Button>
                </Box>
            </form>
            
            <div className={styles.listContainer}>
                <List className={styles.fileList}>
                    {files.map((file) => (
                        <ListItem className={styles.listItem} key={file.name}>
                            <ArticleIcon className={styles.articleIcon}></ArticleIcon>
                            <ListItemText className={styles.listItemText}>{file.name}</ListItemText>
                            <DeleteIcon className={styles.deleteIcon} onClick={() => removeFile(file.name)}>X</DeleteIcon>
                        </ListItem>
                    ))}
                </List>

             <List> 
                    {rejected.map(({file, errors}) => (
                        <ListItem key={file.name}>
                            <ListItemText>{file.name}</ListItemText>
                            <List>
                                {errors.map(error => (
                                    <ListItemText className={styles.errorMessage} key={error.code}>Bestand moet een Excel bestand zijn!</ListItemText>
                            ))}
                            </List>
                        </ListItem>
                    ))}
            </List> 
            </div> 
        </div>
        :                        
        <div className={styles.downloadArea}>
            <div className={styles.fileCountTextContainer}>
                <p>Download je bestand!</p>
            </div>
            <Button href={downloadlink} component={Link} download={"demoProcessedFile.xlsx"} variant="contained" className={styles.downloadButton}>
                <DownloadIcon></DownloadIcon>
            Download bestand
            </Button>
            <BackToHomeButton></BackToHomeButton>
        </div>
        }
        </CacheProvider>
    </>
        
    )
}

export default UploadArea