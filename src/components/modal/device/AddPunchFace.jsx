import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab'
import { Button, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import { addingPunchWithFace } from '../../../utils/Devices';

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

const AddPunchFace = ({ reloading, open, setOpen, selected }) => {
    const [dni, setDni] = useState('')
    const [url, setUrl] = useState("https://static.vecteezy.com/system/resources/previews/015/008/590/original/scan-face-id-line-icon-facial-recognition-linear-pictogram-biometric-identification-technology-outline-symbol-verification-on-smartphone-symbol-editable-stroke-isolated-illustration-vector.jpg");
    const [image, setImage] = useState(null)
    const [upload, setUpload] = useState(false)

    const [loading, setLoading] = useState(false)

    const closing = () => {
        setOpen(false)
        setDni('')
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
                    <Typography variant='body3'>Add new punch with Face</Typography>
                </DialogTitle>

                <DialogContent>
                    <TextField
                        label="DNI"
                        sx={{mt: 2, mb: 2.5}}
                        onChange={(event) => { setDni(event.target.value) }}
                        fullWidth
                        value={dni}
                    />

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
                </DialogContent>

                <DialogActions>
                    <Button color='inherit' onClick={() => closing()}>Cancel</Button>

                    <LoadingButton
                        loading={loading}
                        onClick={() => {
                            addingPunchWithFace(setLoading, dni, image)
                            .then((response) => {
                                closing();
                                reloading();
                            })
                            .catch((error) => { console.log(error)})
                            .finally(() => { setLoading(false) })
                        }} 
                        autoFocus
                        disabled={dni.length > 0 && upload ? false : true}
                    >
                        Add
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddPunchFace