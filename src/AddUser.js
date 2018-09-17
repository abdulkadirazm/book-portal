import React from "react"
//import {Redirect} from "react-router-dom"
import * as UsersAPI from './UsersAPI'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui-scrollable-tabs/Tabs'
import {Link} from "react-router-dom"

class AddUser extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            userName:"",
            eMail:"",
            password:"",
            passwordC:"",
            roleName: 0,
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
        this.setState({[event.target.name]: event.target.value})
    }

    onKeyPress = (e) => {
        if (e.which === 13) {
            this.handleSave(e);
        }
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
            NotificationManager.error('Paswords not match.', 'Please check!', 3000)
        }else if(this.state.roleName === 0) {
            NotificationManager.warning('Please select a role type.', 'Empty place!', 3000);
        }else {
            const user ={
                username: this.state.userName,
                email: this.state.eMail,
                password: this.state.password,
                roleID: this.state.roleName
            }
            UsersAPI.insert(user, user.roleID).then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    NotificationManager.success('User added successfully.', 'Success!', 3000);
                    this.afterSave();
                }else {
                    NotificationManager.error('Service don\'t answer.','Something Wrong!', 3000)
                }
            });
            
        }
    }

    afterSave(){
        this.setState({userName: '', eMail: '', password: '', passwordC: '', roleName: 0})
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
            <MuiThemeProvider>
                    <div>
                        <AppBar 
                            title="Admin Page"
                        />
                        <Tabs onChange={this.changeTab} value={"/"} initialSelectedIndex={0}>
                            <Tab value={0} label="User Add" containerElement={<Link to="/adduser"/>} />
                            <Tab value={1} label="User Search" containerElement={<Link to="/searchuser"/>}/>
                            <Tab value={2} label="User Delete" containerElement={<Link to="/deleteuser"/>} />
                            <Tab value={3} label="User Update" containerElement={<Link to="/updateuser"/>} />                        
                        </Tabs>

                        <label>Username</label>
                            <input type="text" 
                                   placeholder="Enter an Username" 
                                   className="form-control" 
                                   name="userName" 
                                   value={this.state.userName} 
                                   onChange={this.handleChange}
                                   onKeyPress={this.onKeyPress}
                                   />
                            <br/>
                        <label>Email</label>
                            <input type="text" 
                                   placeholder="Enter your email" 
                                   className="form-control" 
                                   name="eMail" 
                                   value={this.state.eMail} 
                                   onChange={this.handleChange}
                                   onKeyPress={this.onKeyPress}
                                   />
                            <br/>
                        <label>Password</label>
                            <input type="password" 
                                   placeholder="Enter your password" 
                                   className="form-control" 
                                   name="password" 
                                   value={this.state.password} 
                                   onChange={this.handleChange}
                                   onKeyPress={this.onKeyPress}
                                   />
                            <br/> 
                        <label>Password Again</label>    
                            <input type="password" 
                                   placeholder="Enter the password again" 
                                   className="form-control" 
                                   name="passwordC" 
                                   value={this.state.passwordC} 
                                   onChange={this.handleChange}
                                   onKeyPress={this.onKeyPress}
                                   />
                             <br/>
                        <label>User Role</label><br/>
                        <select name="roleName" value={this.state.roleName} onChange={this.handleChange} className="custom-select" onKeyPress={this.onKeyPress}>
                            <option value={0} disabled>Select</option>
                            <option value={1}>Admin</option>
                            <option value={2}>User</option>
                        </select><br/> <br/>
                            <button className='btn btn-info' type="button" value="Submit" onClick={this.handleSave}>Submit</button>
                
                        <NotificationContainer/>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default AddUser