import React from "react";
import {withRouter} from "react-router";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import DialogActions from "@material-ui/core/DialogActions";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";

const Transaction = (props) => {
    const { register, handleSubmit, errors, getValues, trigger, control} = useForm();
    const {open, close, inStoreProduct} = props
    const store = JSON.parse(localStorage.getItem('store'));

    const onSubmit = async () => {
        const validity = await trigger();
        if (validity) {
            const data = {
                ...getValues(),
                product: {
                    inStoreProductCode: inStoreProduct.inStoreProductCode,
                    store
                },
            };
            axios.put(`/api/transactions/add`, data)
                .then(response => close())
                .catch(error => console.log(error))
        }
    }


    return(
            <Dialog open={open} onClose={close} fullWidth={true}>
                <DialogTitle style={{ color: "#f57c00" , fontWeight:"bold"}}>Add Transaction</DialogTitle>
                <DialogContent>
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
                                           message:"Transaction Quantity Required"
                                       },
                                       min: 0
                                   })}/>
                        <FormControl variant="outlined" fullWidth={true} style={{margin:"1%"}}>
                            <InputLabel>Type</InputLabel>
                            <Controller as={
                                <Select
                                    label="Type">
                                    <MenuItem value={"IN"}>In</MenuItem>
                                    <MenuItem value={"OUT"}>Out</MenuItem>
                                </Select>
                            }           rules={{ required: true }}
                                        name={"type"}
                                        control={control}/>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"}
                            startIcon={<SaveIcon/>}
                            style={{
                                backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                            }}
                            type={"submit"}
                            onClick={onSubmit}>
                        Add Transaction
                    </Button>
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

export default withRouter(Transaction);
