import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

const StoreForm = (props) => {
    const API_URL = '/api/stores/';
    const {store, operation,open,close} = props;

    const { register, handleSubmit, errors, getValues, trigger, reset} = useForm({
        defaultValues:{
            name:store ? store.name : '',
            zipCode:store ? store.zipCode :'',
            location: store ? store.location: ''
        }
    });

    useEffect(() => {
        reset({name:store ? store.name : '',
            zipCode:store ? store.zipCode :'',
            location: store ? store.location: ''})
    },[store])

    const onSubmit = async () => {
        const validity = await trigger();
        if (validity) {
            const data = {
                name: getValues('name'),
                zipCode: getValues('zipCode'),
                location: getValues('location')
            }
            if (operation === "Update") {
                data.storeCode = store.storeCode;
                axios.put(`${API_URL}${store.storeCode}`, data)
                    .then(response => {
                        close();
                    })
                    .catch(error => console.log(error))

            } else {
                console.log(data)
                axios.post(`${API_URL}`, data)
                    .then(response => {
                        close();
                    })
                    .catch(error => console.log(error))
            }
        }
    }

    const onDelete = () => {
        axios.delete(`${API_URL}${store.storeCode}`)
            .then(response => close())
            .catch(error => console.log(error))
    }

    return(
        <Dialog open={open} onClose={close}>
            <DialogTitle style={{ color: "#f57c00" , fontWeight:"bold"}}>{operation} Category</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(() => onSubmit())}>
                    <TextField label="Store Name:"
                               name={"name"}
                               fullWidth
                               error={!!errors.name}
                               helperText={errors.name ? errors.name.message : ''}
                               inputRef={register({
                                   required: "Store Name Required",
                                   pattern:{
                                       value:RegExp(/^[a-zA-Z0-9 ]*$/),
                                       message:"Store Name must only contain alphanumeric characters and spaces"
                                   },
                               })}/>
                    <TextField label="Location:"
                               name={"location"}
                               fullWidth
                               error={!!errors.location}
                               helperText={errors.location ? errors.location.message : ''}
                               inputRef={register({
                                   required: "Store Location Required",
                                   pattern:{
                                       value:RegExp(/^[a-zA-Z0-9 ]*$/),
                                       message:"Store Name must only contain alphanumeric characters and spaces"
                                   },
                               })}/>
                    <TextField label="Zip Code:"
                               name={"zipCode"}
                               fullWidth
                               error={!!errors.zipCode}
                               helperText={errors.zipCode ? errors.zipCode.message : ''}
                               inputRef={register({
                                   required: "Store Zip Code Required",
                                   pattern:{
                                       value:RegExp(/^[0-9]*$/),
                                       message:"Invalid Zip Code"
                                   },
                               })}/>
                </form>
            </DialogContent>
            <DialogActions>
                {operation === "Update" && store.storeCode !== JSON.parse(localStorage.getItem('store')).storeCode ?
                    <Button variant={"contained"}
                                                  startIcon={<SaveIcon/>}
                                                  style={{
                                                      backgroundColor: "#d62828", color: "#F1FAEE", borderRadius: "4px"
                                                  }}
                                                  type={"submit"}
                                                  onClick={onDelete}>
                    Delete
                </Button> : null}
                <Button variant={"contained"}
                        startIcon={<CloseIcon/>}
                        style={{
                            backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                        }}
                        type={"submit"}
                        onClick={close}>
                    Cancel
                </Button>
                <Button variant={"contained"}
                        startIcon={<SaveIcon/>}
                        style={{
                            backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                        }}
                        type={"submit"}
                        onClick={onSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default StoreForm;