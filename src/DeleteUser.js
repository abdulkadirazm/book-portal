import React from "react"
import * as UsersAPI from './UsersAPI'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

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
                const users = Object.assign([], this.state.allUsers);
                users.splice(index, 1);
                this.setState({allUsers:users});
                UsersAPI.deleteUser(id);
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
                <div>
                <table border="1">
                        <tr>
                            <th></th>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                      {allUsers.map((user, index) => {
                          return(
                            <tr>
                                <td><button id={user.userID} onClick={this.clickHandler.bind(this, index)} >X</button></td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                          )
                      })}
                    </table>
                </div>
            </div>
        )
    }
}

export default DeleteUser;