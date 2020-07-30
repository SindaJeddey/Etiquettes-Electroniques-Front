import React, {Component} from "react";
import classes from './Register.module.css';
import cx from "classnames";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import axios from 'axios'
import {connect} from "react-redux";


class Register extends Component{
    state = {
        name: null,
        lastName:null,
        username:null,
        password:null,
        email:null,
        errors:{
            name: [],
            lastName:[],
            username:[],
            password:[],
            email:[],
        }
    }

    onChangeHandler = (event) => {
        const {name, value}= event.target;
        let errors = this.state.errors;
        switch (name) {
            case ('name'):
                if (value === ''){
                    errors.name.push('Name is required');
                    errors.name.push('is-invalid');
                }
                this.setState({errors: errors,name:value})
                break;
            case ('lastName'):
                if (value === ''){
                    errors.lastName.push('Last name is required');
                    errors.lastName.push('is-invalid')
                }
                this.setState({errors: errors,lastName:value})
                break;
            case ('username'):
                if (value === ''){
                    errors.username.push('Username is required');
                    errors.username.push("is-invalid")
                }
                this.setState({errors: errors,username:value})
                break;
            case ('password'):
                if (value === ''){
                    errors.password.push('Password is required');
                    errors.password.push('is-invalid')
                }
                this.setState({errors: errors,password:value})
                break;
            case ('email'):
                if (value === ''){
                    errors.email.push('Email is required');
                    errors.email.push('is-invalid')
                }
                else if(value.indexOf('@') === -1 || value.indexOf('.') === -1 ){
                    errors.email.push('Email is invalid');
                    errors.email.push('is-invalid')
                }
                else
                    errors.email = [];
                this.setState({errors: errors,email:value})
                break;
        }
    }

    onButtonClick = (event) => {
        event.preventDefault();
        let url;
        const user = {
            name: this.state.username,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        console.log(this.props, user)
        if (this.props.title === "Operator")
            url = "https://localhost:8443/api/operators/new"
        else
            url = "https://localhost:8443/api/superops/new"
        axios.post(url,user, {
            headers:{
                'Authorization': 'Bearer '+this.props.token
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    render() {
        return(
            <div className={classes.container}>
                <h2 className={cx("pt-3 mb-5",classes.title)}>New {this.props.title}</h2>
                <form>
                    <div className="row form-group">
                        <label className={cx(classes.label,"col-form-label")}>Name:</label>
                        <input type="text" name={"name"}
                               className={cx("form-control",this.state.errors.name[1] ,classes.input)}
                               placeholder={"Enter Name"}
                               onChange={(event => this.onChangeHandler(event))}/>
                        <div className={cx(classes.error,"invalid-feedback")}>
                            {this.state.errors.name[0]}
                        </div>
                    </div>

                    <div className="row form-group">
                        <label className={cx(classes.label,"col-form-label")}>Last name:</label>
                        <input type="text" name={"lastName"}
                               className={cx("form-control",this.state.errors.lastName[1], classes.input)}
                               placeholder={"Enter Last Name"}
                               onChange={(event => this.onChangeHandler(event))}/>
                        <div className={cx(classes.error,"invalid-feedback")}>
                            {this.state.errors.lastName[0]}
                        </div>
                    </div>

                    <div className="row form-group">
                        <label className={cx(classes.label,"col-form-label")}>Username:</label>
                        <input type="text" name={"username"}
                               className={cx("form-control",this.state.errors.username[1], classes.input)}
                               placeholder={"Enter Username"}
                               onChange={(event => this.onChangeHandler(event))}/>
                        <div className={cx(classes.error,"invalid-feedback")}>
                            {this.state.errors.username[0]}
                        </div>
                    </div>

                    <div className="row form-group">
                        <label className={cx(classes.label,"col-form-label")}>Password:</label>
                        <input type="password" name={"password"}
                               className={cx("form-control", this.state.errors.password[1],classes.input)}
                               placeholder={"Enter Password"}
                               onChange={(event => this.onChangeHandler(event))}/>
                        <div className={cx(classes.error,"invalid-feedback")}>
                            {this.state.errors.password[0]}
                        </div>
                    </div>

                    <div className="row form-group">
                        <label className={cx(classes.label,"col-form-label")}>Email:</label>
                        <input type="text" name={"email"}
                               className={cx("form-control",this.state.errors.email[1], classes.input)}
                               placeholder={"Enter Email"}
                               onChange={(event => this.onChangeHandler(event))}/>
                        <div className={cx(classes.error,"invalid-feedback")}>
                            {this.state.errors.email[0]}
                        </div>
                    </div>

                    <button className={cx(classes.button,"btn")}
                            onClick={event => this.onButtonClick(event)}>
                        <SaveAltIcon/> Add {this.props.title}
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.credentialsReducer.token
})
export default connect(mapStateToProps)(Register);