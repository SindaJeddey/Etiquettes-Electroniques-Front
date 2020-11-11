import React from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './ImageUploader.css';

const ImageUploader = ({onUpload,multiple}) => {

    const pictureToByte = (picture) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(picture);
        fileReader.onload = () => {
            let bytes = new Uint8Array(fileReader.result)
        }
    }

    const onImagesUpload = async (event) => {
            let data  = []
            let pictures = [...event.target.files]
            pictures.map(picture => pictureToByte(picture))
            pictures.forEach(picture => data.push(btoa(picture)))
            if(!multiple)
                onUpload(data[0])
            else
                onUpload(data)
    }

    return(
        <div className={'image_uploader'}>
            <input
                accept="image/*"
                id="contained-button-file"
                multiple={true}
                style={{display:'none'}}
                type="file"
                name={"images"}
                onChange={onImagesUpload}/>
            <label htmlFor="contained-button-file">
                <Button variant="contained"
                        component={"span"}
                        // onClick={onImagesUpload}
                        startIcon={<CloudUploadIcon />}
                        style={{
                            backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                        }}>
                    Upload Image
                </Button>
            </label>
        </div>
    )
}

export default ImageUploader;