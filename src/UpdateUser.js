import React from "react"

class UpdateUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allUsers: []
        }
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

    render(){
        const { allUsers } = this.state

        return(
            <div>
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
                                <td><button id={user.userID} onClick={this.clickHandler.bind(this, index)} >Edit</button></td>
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

export default UpdateUser