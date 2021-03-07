import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import {withRouter} from "react-router";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from 'axios';
import ImageUploader from "../../ImageUploader/ImageUploader";
import '../Users.css'

const UserForm = (props) => {
    const role = props.location.pathname.replace('/','')
    const title = role === "operators" ? "Operator" : "Super-Operator"
    const API_URL = `/api/${role}/`

    const {user, operation,open,close} = props;
    const [users, setUsers] = useState(null)
    const [image,setImage] = useState('');
    const [imageError,setImageError] = useState(false)
    const { register, handleSubmit, errors, getValues, trigger, control} = useForm();

    useEffect(() => {
        axios.get('/api/admins/users')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error))
    },[])

    const onSubmit = async () => {
        const validity = await trigger();
        if(!image)
            setImageError(true)
        if(validity && !imageError){
            if(operation === "Add"){
                const data = {
                    ...getValues(),
                    role: role === "operators" ? "OPERATOR":"SUPER_OPERATOR",
                    image: image
                }
                axios.post(API_URL,data)
                    .then(response => close())
                    .catch(error => console.log(error))
            }
            else if(operation ==="Update"){
                if(getValues('role') !== user.role) {
                    user.role = getValues('role')
                    axios.put(`${API_URL}${user.username}`, user)
                        .then(response => close())
                        .catch(error => console.log(error))
                }
                else close();
            }
        }
    }

    const unique = (value,field) => {
        let unique = true;
        users.forEach(user => {
            if (field === "username")
                unique = unique && !user.username.includes(value)
            else if(field === "email")
                unique = unique && !user.email.includes(value)
        })
        return unique;
    }

    const onDelete = () => {
        axios.delete(`${API_URL}${user.username}`)
            .then(response => close())
            .catch(error => console.log(error))
    }

    const onUploadImage = (image) => {
        setImage(image);
        setImageError(false)
    }

    return(
        <Dialog open={open} onClose={close}>
            <DialogTitle style={{ color: "#f57c00" , fontWeight:"bold"}}>{`${operation} ${title}`}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(() => onSubmit())}>
                    {operation === "Add" && !user?
                        <>
                            <TextField label={"First Name"}
                                       name={"firstName"}
                                       style={{margin:"1%"}}
                                       fullWidth={true}
                                       variant="outlined"
                                       error={!!errors.firstName}
                                       helperText={errors.firstName ? errors.firstName.message : ''}
                                       inputRef={register({
                                           required: {
                                               value:true,
                                               message:"First Name Required"
                                           },
                                           pattern:{
                                               value:RegExp(/^[a-zA-Z][a-zA-Z\s]*$/),
                                               message:"First Name must start with a letter and should contain only letters and/or spaces"
                                           }
                                       })}/>
                            <TextField label={"Last Name"}
                                       name={"lastName"}
                                       style={{margin:"1%"}}
                                       fullWidth={true}
                                       variant="outlined"
                                       error={!!errors.lastName}
                                       helperText={errors.lastName ? errors.lastName.message : ''}
                                       inputRef={register({
                                           required: {
                                               value:true,
                                               message:"Last Name Required"
                                           },
                                           pattern:{
                                               value:RegExp(/^[a-zA-Z][a-zA-Z\s]*$/),
                                               message:"Last Name must start with a letter and should contain only letters and/or spaces"
                                           }
                                       })}/>
                            <TextField label={"Email"}
                                       name={"email"}
                                       style={{margin:"1%"}}
                                       type={"email"}
                                       fullWidth={true}
                                       variant="outlined"
                                       error={!!errors.email}
                                       helperText={errors.email ? errors.email.message : ''}
                                       inputRef={register({
                                           required:"Email Required",
                                           pattern:{
                                               value:RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
                                               message:"Invalid Email"
                                           },
                                           validate: value => unique(value,"email") || 'Email Already Exists'
                                       })}/>
                            <TextField label="Username:"
                                    name={"username"}
                                    fullWidth
                                    variant="outlined"
                                       style={{margin:"1%"}}
                                    error={!!errors.username}
                                    helperText={errors.username ? errors.username.message : ''}
                                    inputRef={register({
                                        required: "Username Required",
                                        pattern:{
                                            value:RegExp(/^\S*$/),
                                            message:"Username must only contain alphanumeric characters"
                                        },
                                    validate: value => unique(value,'username') || 'Username Already Exists'
                                })}/>
                            <ImageUploader onUpload={onUploadImage} multiple={false}/>
                            {imageError? <div className={'image_error'}>* Must Provide a User Image</div> : null}
                        </>
                        : <>
                            <p><span className={"label"}>First Name:</span> {user.firstName}</p>
                            <p><span className={"label"}>Last Name:</span> {user.lastName}</p>
                            <p><span className={"label"}>Username:</span> {user.username}</p>
                            <p><span className={"label"}>Email:</span> {user.email}</p>
                            <FormControl variant="outlined" fullWidth={true}>
                                <InputLabel>Role</InputLabel>
                                <Controller as={
                                    <Select
                                        label="Role">
                                        <MenuItem value={"ADMIN"}>Admin</MenuItem>
                                        <MenuItem value={"OPERATOR"}>Operator</MenuItem>
                                        <MenuItem value={"SUPER_OPERATOR"}>Super-Operator</MenuItem>
                                    </Select>
                                }
                                            name={"role"}
                                            defaultValue={user.role}
                                            control={control}/>


                            </FormControl>
                          </>
                    }
                </form>
            </DialogContent>
            <DialogActions>
                {operation === "Update" ?
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

export default withRouter(UserForm);