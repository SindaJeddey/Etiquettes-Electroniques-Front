import React, {useEffect} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useForm} from "react-hook-form";
import axios from "axios";

const CategoryForm = (props) => {
    const API_URL = 'api/categories/'
    const {code,name,open,close,operation, categories} = props;

    const { register, handleSubmit, errors, getValues, trigger, reset} = useForm({
        defaultValues:{
            categoryName: name
        }
    });

    useEffect(() => {
        reset({categoryName: name})
    },[name])


    const onSubmit = async () => {
        const validity = await trigger();
        if(validity){
            const category = {
                name: getValues('categoryName')
            }
            if(operation==="Update"){
                category.categoryCode = code;
                axios.put(`${API_URL}${code}`,category)
                    .then(response => {
                        close();
                    })
                    .catch(error => console.log(error))

            } else {
                axios.post(`${API_URL}`,category)
                    .then(response => {
                        close();
                    })
                    .catch(error => console.log(error))
            }
        }

    }

    const validate = (value) => {
        if(name)
            return !value.toLowerCase().replace(/\s+/g, '').includes(name.toLowerCase().replace(/\s+/g, '')) || 'Please set a different category name'
        else {
            let unique = true
            categories.forEach(cat => {
                unique = unique && !value.toLowerCase().replace(/\s+/g, '').includes(cat.name.toLowerCase().replace(/\s+/g, ''))
            })
            return unique || "Category name exits."
        }
    }

    return(
        <Dialog open={open} onClose={close}>
            <DialogTitle style={{ color: "#f57c00" , fontWeight:"bold"}}>{operation} Category</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(() => onSubmit())}>
                    <TextField label="Category Name:"
                               name={"categoryName"}
                               fullWidth
                               error={!!errors.categoryName}
                               helperText={errors.categoryName ? errors.categoryName.message : ''}
                               inputRef={register({
                                   required: "Category Name required",
                                   pattern:{
                                       value:RegExp(/^[a-zA-Z0-9 ]*$/),
                                       message:"Category Name must only contain alphanumeric characters and spaces"
                                   },
                                   validate: value => validate(value)
                               })}/>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} style={{ color: "#f57c00" }}>
                    Cancel
                </Button>
                <Button style={{ color: "#f57c00" }} type={"submit"} onClick={onSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CategoryForm;