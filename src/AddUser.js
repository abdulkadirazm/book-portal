import React from "react"
//import {Redirect} from "react-router-dom"
import * as UsersAPI from './UsersAPI'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
 
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
            NotificationManager.warning('Please enter username.', 'Empty place!', 3000);
        }else if(!this.state.eMail){
            NotificationManager.warning('Please enter your email.', 'Empty place!', 3000);
        }else if(!this.state.password){
            NotificationManager.warning('Please enter your password.', 'Empty place!', 3000);
        }else if(!this.state.passwordC){
            NotificationManager.warning('Please enter your password again.', 'Empty place!', 3000);
        }else if(this.state.password !== this.state.passwordC){
            NotificationManager.error('Paswords not match.', 'Please check!', 5000)
        }else {
            const user ={
                username: this.state.userName,
                email: this.state.eMail,
                password: this.state.password
            }
            UsersAPI.insert(user);
            NotificationManager.success('User added successfully.', 'Success!', 5000);
            this.afterSave();
        }
    }

    afterSave(){
        this.setState({userName: '', eMail: '', password: '', passwordC: ''})
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
            <div style={{position: 'relative', margin: 'auto'}}>
                <input type="text" placeholder="Enter an Username" className="userName" value={this.state.userName} onChange={this.handleChange}             /><br/>
                <input type="text" placeholder="Enter your email" className="eMail" value={this.state.eMail} onChange={this.handleChange}                 /><br/>
                <input type="password" placeholder="Enter your password" className="password" value={this.state.password} onChange={this.handleChange}       /><br/> 
                <input type="password" placeholder="Enter the password again" className="passwordC" value={this.state.passwordC} onChange={this.handleChange} /><br/>
                
                <button className='btn btn-info' type="button" value="Submit" onClick={this.handleSave}>Submit</button>
                
                <NotificationContainer/>
            </div>
        )
    }
}

export default AddUser