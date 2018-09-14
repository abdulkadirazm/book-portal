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

    buttonFunction(cell, row) {      
        return <label>
                  <button type="button" 
                          id={row.id} 
                          onClick={() => {this.clickHandler(row)}} 
                          className="bbtn btn-primary btn-sm">
                            Click Me
                  </button>
               </label>        
    }

    render(){
        const { allUsers } = this.state

        return(
            <div style={{position: 'relative', margin: 'auto'}}>
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
            </div>
        )
    }
}

export default DeleteUser;