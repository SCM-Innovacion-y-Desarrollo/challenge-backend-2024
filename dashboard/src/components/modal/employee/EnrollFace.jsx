import { LoadingButton } from '@mui/lab'
import { Button, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useState } from 'react'


import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';
import { EnrollingFace } from '../../../utils/Employees';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

  
const EnrollFace = ({realoading, open, setOpen, selected}) => {
    const [url, setUrl] = useState("https://static.vecteezy.com/system/resources/previews/015/008/590/original/scan-face-id-line-icon-facial-recognition-linear-pictogram-biometric-identification-technology-outline-symbol-verification-on-smartphone-symbol-editable-stroke-isolated-illustration-vector.jpg");
    const [image, setImage] = useState(null)
    const [upload, setUpload] = useState(false)

    const [loading, setLoading] = useState(false)

    const closing = () => {
        setOpen(false)
        setUrl("https://static.vecteezy.com/system/resources/previews/015/008/590/original/scan-face-id-line-icon-facial-recognition-linear-pictogram-biometric-identification-technology-outline-symbol-verification-on-smartphone-symbol-editable-stroke-isolated-illustration-vector.jpg");
        setImage(null);
        setUpload(false);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setUrl(reader.result);
        };
    
        if (file) {
            reader.readAsDataURL(file);
            setImage(file);
            setUpload(true);
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={() => closing()}
            >
                <DialogTitle>
                    <Typography variant='body3'>Enroll with Face</Typography>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText sx={{pt: 1}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={url}
                            sx={{ borderRadius: 1.5, mb: 2.5 }}
                        />

                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={ upload ? <DeleteIcon /> : <CloudUploadIcon />}
                            color={ upload ? 'error' : 'primary'}
                            fullWidth
                            disableElevation
                            onClick={(event) => {
                                if(upload){
                                    event.preventDefault();
                                    setUrl("https://static.vecteezy.com/system/resources/previews/015/008/590/original/scan-face-id-line-icon-facial-recognition-linear-pictogram-biometric-identification-technology-outline-symbol-verification-on-smartphone-symbol-editable-stroke-isolated-illustration-vector.jpg");
                                    setImage(null);
                                    setUpload(false);
                                }
                            }}
                        >
                            { upload ?
                                <>
                                    Remove
                                </>
                                :
                                <>
                                    Upload file
                                    <VisuallyHiddenInput type="file" accept='image/png, image/jpeg' onChange={handleImageChange}/>
                                </>
                            }
                            
                        </Button>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                    <LoadingButton 
                        loading={loading}
                        color='primary'
                        onClick={() => {
                            EnrollingFace(setLoading, selected, image)
                            .then((response) => { 
                                closing();
                                realoading();
                            })
                            .catch((error) => {})
                            .finally(() => setLoading())
                        }}
                        autoFocus
                    >
                        Enroll
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EnrollFace