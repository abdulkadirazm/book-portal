import React from "react"
import {Redirect} from "react-router-dom"
import * as UsersAPI from './UsersAPI'

class AddUser extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            userName:"",
            eMail:"",
            password:"",
            passwordC:"",
            query:[0]
        }

        this.handleSave = this.handleSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
        //this.clickHandler = this.clickHandler.bind(this)
        //this.changeQuery = this.changeQuery.bind(this)
    }   

    /*
    clickHandler(event){
        this.changeQuery(event.target.query)
    }
    */

    handleChange(event){
        //kısa yol
        this.setState({[event.target.className]: event.target.value})
    }

    handleSave(){

        if(!this.state.userName){
            alert("Please Enter an Username!")
        }else if(!this.state.eMail){
            alert("Please enter your email!")
        }else if(!this.state.password){
            alert("Please enter your password!")
        }else if(!this.state.passwordC){
            alert("Please enter your password again!")
        }else if(this.state.password !== this.state.passwordC){
            alert("Paswords not match. Please check!")
        }else {
            const user ={
                username: this.state.userName,
                email: this.state.eMail,
                password: this.state.password
            }
            UsersAPI.insert(user);
            <Redirect to='/adduser'/>
        }
    }

    /*
    changeQuery = ((query) => {
        UsersAPI.insert(query).then((users) => {
            if(!users || users.hasOwnProperty('error')) {
                this.setState({searchUsers:[""]});
            } else {
                this.setState({searchUsers: users});
            }
        });
    });
    */

    render(){
        return (
            <div>
                <input type="text" placeholder="Enter an Username" className="userName" value={this.state.name} onChange={this.handleChange}             /><br/>
                <input type="text" placeholder="Enter your email" className="eMail" value={this.state.name} onChange={this.handleChange}                 /><br/>
                <input type="password" placeholder="Enter your password" className="password" value={this.state.name} onChange={this.handleChange}       /><br/> 
                <input type="password" placeholder="Enter the password again" className="passwordC" value={this.state.name} onChange={this.handleChange} /><br/>
                
                <input type="button" value="Submit" onClick={this.handleSave}/>
            </div>
        )
    }
}

export default AddUser