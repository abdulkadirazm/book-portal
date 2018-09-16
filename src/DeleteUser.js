import React from "react"
import * as UsersAPI from './UsersAPI'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui-scrollable-tabs/Tabs'
import {Link} from "react-router-dom"
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class DeleteUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allUsers:[],
        }
        this.clickHandler = this.clickHandler.bind(this)
    }

    componentDidMount(){
        UsersAPI.getAll().then((users)=>{
            if(!users){
                this.setState({allUsers:[""]})
            }else{
                this.setState({allUsers:users})
            }
        })
    }

    clickHandler = (index, e) => {
        var id = e.target.id;
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                UsersAPI.deleteUser(id).then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    const users = Object.assign([], this.state.allUsers);
                    users.splice(index, 1);
                    this.setState({allUsers:users});
                    NotificationManager.success('User deleted successfully.', 'Success!', 3000);
                }else {
                    NotificationManager.error('Service don\'t answer.','Something Wrong!', 3000)
                }
            });
              }
            },
            {
              label: 'No'
            }
          ]
        })
       
    }

    render(){
        const { allUsers } = this.state

        return(
            <div style={{position: 'relative', margin: 'auto'}}>
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
                        
                        <div>
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
                                            <td><button className="btn btn-info" id={user.userID} onClick={this.clickHandler.bind(this, index)} >Delete</button></td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <NotificationContainer/>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default DeleteUser;