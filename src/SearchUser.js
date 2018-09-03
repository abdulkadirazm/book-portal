import React from "react"
import * as UsersAPI from './UsersAPI'


class SearchUsers extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allUsers:[],
            searchUsers:[],
            query:'',
            searchId:1,
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.clickHandler2 = this.clickHandler2.bind(this)
        this.changeQuery = this.changeQuery.bind(this)
        this.changeQuery2 = this.changeQuery2.bind(this)
    }
  /*  
    componentDidMount(){
        UsersAPI.getAll().then((users)=>{
            if(!users){
                this.setState({users:[""]})
            }else{
                this.setState({users:users})
            }
        })
    }
*/
    changeHandler(event){
        this.setState({[event.target.name]: event.target.value})
    }


    clickHandler(event){
       this.changeQuery(this.state.query)
    }
    clickHandler2(event){
        this.changeQuery2(this.state.query)
     }

    changeQuery = ((query) => {
        UsersAPI.get(query).then((users) => {
            if(!users || users.hasOwnProperty('error')) {
                this.setState({searchUsers:[""]});
            } else {
                this.setState({searchUsers: users});
            }
        });
    });

    changeQuery2 = ((query) => {
        UsersAPI.getAll().then((users) => {
            if(!users || users.hasOwnProperty('error')) {
                this.setState({allUsers:[""]});
            } else {
                this.setState({allUsers: users});
            }
        });
    });

    render(){
        const { query, allUsers, searchUsers } = this.state

        return(
            <div style={{position: 'relative', margin: 'auto'}}>
                <input
                    name="query"
                    type="text"
                    onChange={this.changeHandler}
                    placeholder="Search user"
                    value={query}/>
                <button onClick={this.clickHandler}>Search</button>
                <div>
                    <table border="1">
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                        {searchUsers.map((user) => (
                            <tr key={user.userID}>
                                <td>{user.userID}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div>

                <button onClick={this.clickHandler2}>get All Users</button>
                <div>
                    <table border="1">
                    <tbody>
                            <tr>
                                <th></th>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                        {allUsers.map((user) => (
                            <tr key={user.userID}>
                                <td>{user.userID}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        )
    }
}

export default SearchUsers;