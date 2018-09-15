import React from "react"
import * as UsersAPI from './UsersAPI'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui-scrollable-tabs/Tabs'
import {Link} from "react-router-dom"

class UsersBody extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userID: this.props.userID,
            userName: this.props.username,
            eMail: this.props.email,
            passwordOld: this.props.password,
            passwordOldI: '',
            password: '',
            passwordC: '',
            submit: false,
            index: this.props.index
        }

        this.handleSave = this.handleSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleChange(event){
        //kısa yol
        this.setState({[event.target.name]: event.target.value})
    }

    componentDidMount(){
        this.setState({
            userID: this.props.userID,
            userName: this.props.username,
            eMail: this.props.email,
            passwordOld: this.props.password
        })
    }

    handleSave(){

        if (!this.state.userName) {
            NotificationManager.warning('Please enter username.', 'Empty place!', 3000);
          } else if (!this.state.eMail) {
            NotificationManager.warning('Please enter your email.', 'Empty place!', 3000);
          } else if (!this.state.passwordOldI) {
            NotificationManager.warning('Please enter your last password.', 'Empty place!', 3000);
          } else if (!this.state.password) {
            NotificationManager.warning('Please enter your new password.', 'Empty place!', 3000);
          } else if (!this.state.passwordC) {
            NotificationManager.warning('Please enter your password again.', 'Empty place!', 3000);
          } else if (this.state.password !== this.state.passwordC) {
            NotificationManager.error('Paswords not match.', 'Please check!', 5000)
          } else if (this.state.passwordOldI !== this.state.passwordOld) {
            NotificationManager.error('Old paswords is incorrect.', 'Please check!', 5000)
          } else {
            const user ={
                username: this.state.userName,
                email: this.state.eMail,
                password: this.state.password
            }
            UsersAPI.update(this.state.userID,user).then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    this.props.onSubmit(user, this.state.index);
                }else {
                    NotificationManager.error('Service don\'t answer.','Something Wrong!', 5000)
                }
            });
            
        }
    }  

    handleClose(){
        this.props.onClose();
    }

    render(){
        return(
            <div style={{ position: 'relative', margin: 'auto' }}>
            <label>Username</label>
                <input type="text" placeholder="Enter an Username" className="form-control" name="userName" value={this.state.userName} onChange={this.handleChange} /><br />
            <label>Email</label>                
                <input type="text" placeholder="Enter your email" className="form-control" name="eMail" value={this.state.eMail} onChange={this.handleChange} /><br />
            <label>Last Password</label>                
                <input type="password" placeholder="Enter your last password" className="form-control" name="passwordOldI" value={this.state.passwordOldI} onChange={this.handleChange} /><br />
            <label>New Password</label>
                <input type="password" placeholder="Enter your new password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} /><br />
            <label>New Password again</label>                
                <input type="password" placeholder="Enter the new password again" className="form-control" name="passwordC" value={this.state.passwordC} onChange={this.handleChange} /><br />

                <button className='btn btn-info' type="button" value="Submit" onClick={this.handleSave}>Submit</button>
                <button className="btn btn-warning" onClick={this.handleClose} >Close</button>
                <NotificationContainer />
            </div>
        )
    }
}

class UpdateUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allUsers: [],
            selectedUser: [],
            userID: 0,
            userName: '',
            eMail: '',
            passwordOld: '',
            showBody: false,
            selectedIndex: 0
        }
        this.clickHandler = this.clickHandler.bind(this)
    }

    

    componentDidMount(){
        UsersAPI.getAll().then((users)=>{
            if(!users){
                this.setState({allUsers:['']})
            }else{
                this.setState({allUsers:users})
            }
        })
    }

    clickHandler(index, e){
        if (this.state.selectedIndex !== index) {
            let user = this.state.allUsers[index];
            this.setState({
                userID: user.userID,
                userName: user.username,
                eMail: user.email,
                passwordOld: user.password,
                selectedIndex: index
            })
            this.setState({showBody: true})    
        } else {
            this.setState({showBody: false, selectedIndex: null})
        }
    }

    handleSubmit = (user, index) => {
        const users = Object.assign([], this.state.allUsers);
        users.splice(index, 1, user);
        this.setState({allUsers:users, showBody: false, selectedIndex: null});
        
        NotificationManager.success('User updated successfully.', 'Success!', 3000)
    }

    handleClose = () => {
        this.setState({showBody: false, selectedIndex: null})
    }

    render(){
        const { allUsers, userID, userName, eMail, passwordOld } = this.state

        return(
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar 
                            title="Admin Page"
                        />
                        <Tabs onChange={this.changeTab} value={"/"}>
                            <Tab value={0} label="User Add" containerElement={<Link to="/adduser"/>} />
                            <Tab value={1} label="User Search" containerElement={<Link to="/searchuser"/>}/>
                            <Tab value={2} label="User Delete" containerElement={<Link to="/deleteuser"/>} />
                            <Tab value={3} label="User Update" containerElement={<Link to="/updateuser"/>} />                        
                        </Tabs>
                        
                        <table class="table table-striped table-hover table-bordered">
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th>Username</th>
                                   <th>Email</th>
                                </tr>
                            {allUsers.map((user, index) => {
                                return(
                                    <tr key={user.userID}>
                                        <td>
                                            <button className="btn btn-info" onClick={this.clickHandler.bind(this,index)} >Edit</button>
                                        </td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <br/>
                        { this.state.showBody ? <UsersBody key={userID} username={userName} email={eMail} password={passwordOld} userID={userID} 
                        index={this.state.selectedIndex} onSubmit={this.handleSubmit} onClose={this.handleClose}/> : null }
                        <NotificationContainer />

                    </div>
                </MuiThemeProvider>
                
            </div>
        )
    }
}

export default UpdateUser