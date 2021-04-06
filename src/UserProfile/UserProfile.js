import {useEffect, useState} from "react";
import React from "react";
import TextField from "@material-ui/core/TextField";
import './UserProfile.css'
import Button from "@material-ui/core/Button";
import UpdateIcon from '@material-ui/icons/Update';
import {connect} from "react-redux";
import axios from 'axios';
import {withRouter} from "react-router";
import {useForm, Controller} from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const UserProfile =(props) => {

    const { register, handleSubmit, errors, getValues, control,setValue, trigger, watch } = useForm();
    const [newPassword,setNewPassword] = useState(false);
    const [image, setImage] = useState(null);

    const {authority, username } = props;

    useEffect(() => {
        axios.get(`api/${authority}/${username}`)
            .then(response => {
                setValue("firstName",response.data.firstName)
                setValue("lastName",response.data.lastName)
                setValue("email",response.data.email)
                setValue("birthday",new Date(response.data.birthday))
                setImage(response.data.image);
            })
            .catch(error => console.log(error))
    },[username,authority])

    const onSubmitFormHandler = async () => {
        const validity = await trigger();
        if(validity)
            axios.put(`api/${authority}/${username}`, getValues())
                .then(response => props.history.push('/'))
                .catch(error => console.log(error))
    }

    if (!image)
        setImage("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");
        return(
            <div className={"full_profile_container"}>
                <div className={"user_profile_image"}>
                    <img width={350} height={350} className={"user_image"} src={`data:image/png;base64,${image}`}/>
                </div>
                <div className={'user_profile_container'}>
                    <div className={'user_profile_title'}>{username}</div>
                    <form className={'user_profile_form'} onSubmit={handleSubmit((data) => onSubmitFormHandler())}>
                                <div className={'user_profile_input'}>
                                    <TextField label={"First Name"}
                                               name={"firstName"}
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
                                </div>
                                <div className={'user_profile_input'}>
                                    <TextField label={"Last Name"}
                                               name={"lastName"}
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

                                </div>
                                <div className={'user_profile_input'}>
                                    <TextField label={"Email"}
                                               name={"email"}
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
                                                   }
                                               })}/>
                                </div>
                                <div className={'user_profile_birthday'}>
                                    <Controller
                                        control={control}
                                        name="birthday"
                                        render={(props) => (
                                            <ReactDatePicker
                                                placeholderText="Select Birth Date (dd/MM/yyyy)"
                                                onChange={(e) => props.onChange(e)}
                                                selected={props.value}
                                                dateFormat="dd/MM/yyyy"
                                                maxDate={Date.now()}
                                            />
                                        )}
                                    />
                                </div>
                        {!newPassword? <span className={'user_profile_npw'} onClick={() => setNewPassword(true)}>
                                Set New Password ?
                        </span> :
                            <>
                                <span className={'user_profile_npw'} onClick={() => setNewPassword(false)}>
                                    Keep Old Password ?
                                </span>
                                <div className={'user_profile_input'}>
                                    <TextField label={"New Password"}
                                               name={"password"}
                                               type={"password"}
                                               fullWidth={true}
                                               variant="outlined"
                                               error={!!errors.password}
                                               helperText={errors.password ? errors.password.message : ''}
                                               inputRef={register({
                                                   required: {
                                                       value:true,
                                                       message:"Password Required"
                                                   }
                                               })}/>
                                </div>
                                <div className={'user_profile_input'}>
                                    <TextField label={"Confirm New Password"}
                                    name={"confirmPassword"}
                                    type={"password"}
                                    fullWidth={true}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                                    variant="outlined"
                                               inputRef={register({
                                                   required: {
                                                       value:true,
                                                       message:"Please Confirm Password"
                                                   },
                                                   validate: value => watch('password')===value || "Passwords don't match"
                                               })}/>
                                </div>
                            </>}
                        <div className={'user_profile_button_container'}>
                            <Button
                                style={{
                                backgroundColor: "#f57c00", color:"#F1FAEE", borderRadius:"4px"
                            }}
                                variant={"contained"}
                                startIcon={<UpdateIcon/>}
                                type={"submit"}
                                size={"large"}
                                onClick={onSubmitFormHandler}>Update</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
}

const mapStateToProps = (state) => ({
    username: state.credentialsReducer.username,
    authority: state.credentialsReducer.authority.toLowerCase()+"s"
})

export default withRouter(connect(mapStateToProps)(UserProfile));
