import React from "react"
import * as UsersAPI from './UsersAPI'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

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
    }

    handleChange(event){
        //kısa yol
        this.setState({[event.target.className]: event.target.value})
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
                    NotificationManager.success('User updated successfully.', 'Success!', 5000);
                    this.afterSave();
                }else {
                    NotificationManager.error('Service don\'t answer.','Something Wrong!', 5000)
                }
            });
            this.props.onSubmit(user, this.state.index);
        }
    }  

    render(){
        return(
            <div style={{ position: 'relative', margin: 'auto' }}>
                <input type="text" placeholder="Enter an Username" className="userName" value={this.state.userName} onChange={this.handleChange} /><br />
                <input type="text" placeholder="Enter your email" className="eMail" value={this.state.eMail} onChange={this.handleChange} /><br />
                <input type="password" placeholder="Enter your last password" className="passwordOldI" value={this.state.passwordOldI} onChange={this.handleChange} /><br />
                <input type="password" placeholder="Enter your new password" className="password" value={this.state.password} onChange={this.handleChange} /><br />
                <input type="password" placeholder="Enter the new password again" className="passwordC" value={this.state.passwordC} onChange={this.handleChange} /><br />

                <button className='btn btn-info' type="button" value="Submit" onClick={this.handleSave}>Submit</button>

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
        let user = this.state.allUsers[index];
        this.setState({
            userID: user.userID,
            userName: user.username,
            eMail: user.email,
            passwordOld: user.password,selectedIndex: index
        })

        this.setState({showBody: true})

    }

    handleSubmit = (user, index) => {
        const users = Object.assign([], this.state.allUsers);
        users.splice(index, 1, user);
        this.setState({allUsers:users, showBody: false});
        
        NotificationManager.success('User updated successfully.', 'Success!', 3000)
      }

    render(){
        const { allUsers, userID, userName, eMail, passwordOld } = this.state

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
                                <td><button onClick={this.clickHandler.bind(this,index)} >Edit</button></td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                          )
                      })}
                    </tbody>
                </table>
                <br/>
                { this.state.showBody ? <UsersBody key={userID} username={userName} email={eMail} password={passwordOld} userID={userID} 
                index={this.state.selectedIndex} onSubmit={this.handleSubmit}/> : null }

                <NotificationContainer />
            </div>
        )
    }
}

export default UpdateUser