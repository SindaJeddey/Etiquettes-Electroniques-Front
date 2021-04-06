import React, {useEffect, useState} from "react";
import * as queryString from "query-string";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import {withRouter} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Controller, useForm} from "react-hook-form";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import ImageUploader from "../../ImageUploader/ImageUploader";

const ProductForm = (props) => {
    const API_URL = '/api/products';
    const { product, open, close } = props;
    const [images,setImages] = useState([]);
    const [imageError,setImageError] = useState(false)
    const [categories, setCategories] = useState([]);
    const { register, handleSubmit, errors, getValues, trigger, control} = useForm();

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    const onUploadImage = (images) => {
        setImages(images);
        setImageError(false)
    }

    const onSubmit = async () => {
        const validity = await trigger();
        if(!images)
            setImageError(true)
        if (validity && images ){
            if (product){
                const store = JSON.parse(localStorage.getItem('store'));
                const data = {
                    type: 'IN',
                    quantity: getValues('quantity'),
                    product:{
                        product: product,
                        store: {
                            storeCode: store.storeCode
                        }
                    }
                };
                axios.put(`/api/stores/${store.storeCode}/products/add`, data)
                    .then(response => close())
                    .catch(error => console.log(error))
            }
            else{
                const data = {
                    ...getValues(),
                    image1: images[0],
                    image2: images[1],
                    image3: images[2],
                }
                axios.post(API_URL,data)
                    .then(response => close())
                    .catch(error => console.log(error))
            }
        }
    }
    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>{!product ? "New Product" : `Add ${product.name} to Store` }</DialogTitle>
            <DialogContent>
                {product?
                    <>
                        <form onSubmit={handleSubmit(() => onSubmit())}>
                            <TextField label={"Quantity"}
                                       name={"quantity"}
                                       style={{margin:"1%"}}
                                       type={"number"}
                                       fullWidth={true}
                                       variant="outlined"
                                       error={!!errors.quantity}
                                       helperText={errors.quantity ? errors.quantity.message : ''}
                                       inputRef={register({
                                           required: {
                                               value:true,
                                               message:"In Quantity Required"
                                           },
                                           min: 0
                                       })}/>
                        </form>
                    </> :
                    <form onSubmit={handleSubmit(() => onSubmit())}>
                        <TextField label={"Product Name"}
                                   name={"name"}
                                   style={{margin:"1%"}}
                                   fullWidth={true}
                                   variant="outlined"
                                   error={!!errors.name}
                                   helperText={errors.name ? errors.name.message : ''}
                                   inputRef={register({
                                       required: {
                                           value:true,
                                           message:"Product Name Required"
                                       }
                                   })}/>
                        <FormControl variant="outlined" fullWidth={true} style={{margin:"1%"}}>
                            <InputLabel>Category</InputLabel>
                            <Controller as={
                                <Select
                                    label="Category">
                                    {categories.map((category,i) => <MenuItem key={i} value={category.categoryCode}>{category.name}</MenuItem>)}
                                </Select>}
                                        rules={{ required: true}}
                                        name={"category"}
                                        control={control}/>
                        </FormControl>
                        <TextField label={"Quantity Threshold"}
                                   name={"quantityThreshold"}
                                   style={{margin:"1%"}}
                                   type={"number"}
                                   fullWidth={true}
                                   variant="outlined"
                                   error={!!errors.quantityThreshold}
                                   helperText={errors.quantityThreshold ? errors.quantityThreshold.message : ''}
                                   inputRef={register({
                                       required: {
                                           value:true,
                                           message:"Product Quantity Threshold Required"
                                       },
                                       min: 0
                                   })}/>
                        <TextField label={"Long Description"}
                                   name={"longDescription"}
                                   style={{margin:"1%"}}
                                   fullWidth={true}
                                   multiline
                                   rows={4}
                                   variant="outlined"
                                   error={!!errors.longDescription}
                                   helperText={errors.longDescription ? errors.longDescription.message : ''}
                                   inputRef={register({
                                       required: {
                                           value:true,
                                           message:"Product Long Description Required"
                                       }
                                   })}/>
                        <TextField label={"Short Description"}
                                   name={"shortDescription"}
                                   style={{margin:"1%"}}
                                   fullWidth={true}
                                   variant="outlined"
                                   error={!!errors.shortDescription}
                                   helperText={errors.shortDescription ? errors.shortDescription.message : ''}
                                   inputRef={register({
                                       required: {
                                           value:true,
                                           message:"Product Short Description Required"
                                       }
                                   })}/>
                        <FormControl variant="outlined" fullWidth={true} style={{margin:"1%"}}>
                            <InputLabel>Unity</InputLabel>
                            <Controller as={
                                <Select
                                    label="Unity">
                                    <MenuItem value={"m"}>Meter</MenuItem>
                                    <MenuItem value={"l"}>Liter</MenuItem>
                                    <MenuItem value={"kg"}>Kilograms</MenuItem>
                                    <MenuItem value={"p"}>Piece</MenuItem>
                                </Select>
                            }           rules={{ required: true }}
                                        name={"unity"}
                                        control={control}/>
                        </FormControl>
                        <FormControl variant="outlined" fullWidth={true} style={{margin:"1%"}}>
                            <InputLabel>Devise</InputLabel>
                            <Controller as={
                                <Select
                                    label="Devise">
                                    <MenuItem value={"dinar"}>Dinar</MenuItem>
                                    <MenuItem value={"dollar"}>Dollar</MenuItem>
                                    <MenuItem value={"euro"}>Euro</MenuItem>
                                </Select>
                            }           rules={{ required: true }}
                                        name={"devise"}
                                        control={control}/>
                        </FormControl>
                        <ImageUploader onUpload={onUploadImage} multiple={true}/>
                        {imageError? <div className={'image_error'}>* Must Provide Products Images</div> : null}
                    </form>
                    }
            </DialogContent>
            <DialogActions>
                {product ?
                    <Button variant={"contained"}
                            startIcon={<SaveIcon/>}
                            style={{
                                backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                            }}
                            type={"submit"} onClick={onSubmit}>
                        Add To Store
                    </Button>:
                    <Button variant={"contained"}
                            startIcon={<SaveIcon/>}
                            style={{
                                backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                            }}
                            type={"submit"} onClick={onSubmit}>
                        Add New Product
                    </Button>}
                <Button variant={"contained"}
                        startIcon={<CloseIcon/>}
                        style={{
                            backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                        }}
                        type={"submit"}
                        onClick={close}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withRouter(ProductForm);
