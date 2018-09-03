import React from "react"
import * as UsersAPI from './UsersAPI'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class UsersBody extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userName: this.props.username,
            eMail: this.props.email,
            passwordOld: this.props.password,
            password: '',
            passwordC: ''
        }

        this.handleSave = this.handleSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

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
            UsersAPI.insert(user).then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    NotificationManager.success('User updated successfully.', 'Success!', 5000);
                    this.afterSave();
                }else {
                    NotificationManager.error('Service don\'t answer.','Something Wrong!', 5000)
                }
            });
            
        }
    }  

    render(){
        return(
            <div style={{position: 'relative', margin: 'auto'}}>
                <input type="text" placeholder="Enter an Username" className="userName" value={this.state.userName} onChange={this.handleChange}             /><br/>
                <input type="text" placeholder="Enter your email" className="eMail" value={this.state.eMail} onChange={this.handleChange}                    /><br/>
                <input type="password" placeholder="Enter your password" className="passwordOld" value={this.state.passwordOld} onChange={this.handleChange} /><br/> 
                <input type="password" placeholder="Enter your password" className="password" value={this.state.password} onChange={this.handleChange}       /><br/> 
                <input type="password" placeholder="Enter the password again" className="passwordC" value={this.state.passwordC} onChange={this.handleChange}/><br/>
                
                <button className='btn btn-info' type="button" value="Submit" onClick={this.handleSave}>Submit</button>
                
                <NotificationContainer/>
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
            userName: '',
            eMail: '',
            passwordOld: '',
            showBody: false,
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

    clickHandler(event){
        UsersAPI.getById(event.target.id).then((user) => {
            if(!user){
                this.setState({selectedUser: ''})
            }else {
                this.setState({selectedUser: user, userName: user.username,
                eMail: user.email, passwordOld: user.password})
            }
        })

        this.setState({showBody: true})

    }

    render(){
        const { allUsers, userName, eMail, passwordOld } = this.state

        return(
            <div>
                <table border="1">
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                      {allUsers.map((user, index) => {
                          return(
                            <tr key={user.userID}>
                                <td><button id={user.userID} onClick={this.clickHandler} >Edit</button></td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                          )
                      })}
                    </tbody>
                </table>
                <br/>
                { this.state.showBody ? <UsersBody username={userName} email={eMail} password={passwordOld}/> : null }
            </div>
        )
    }
}

export default UpdateUser