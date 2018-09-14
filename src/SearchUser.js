import React from "react"
import * as UsersAPI from './UsersAPI'
import BootstrapTable from 'react-bootstrap-table-next';

class SearchUsers extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allUsers:[],
            searchUsers:[],
            query:'',
            searchId:1,
            columns: [{
                dataField: 'userID',
                text: 'ID'
              },
              {
                dataField: 'username',
                text: 'Username'
              }, {
                dataField: 'email',
                text: 'Email'
              }],
              listType1: false,
              listType2: false,
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
       this.setState({listType1: true, listType2: false})
    }
    clickHandler2(event){
        this.changeQuery2(this.state.query)
        this.setState({listType1: false, listType2: true})
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
                <button className="btn btn-info" onClick={this.clickHandler}>Search</button> <button className="btn btn-info" onClick={this.clickHandler2}>get All Users</button>
                {
                    this.state.listType1 
                    ?
                        <BootstrapTable 
                            striped
                            hover
                            keyField='userID' 
                            data={ searchUsers } 
                            columns={ this.state.columns } /> 
                    :
                        null
                }
                {
                    this.state.listType2
                    ?
                    <BootstrapTable 
                            striped
                            hover
                            keyField='userID' 
                            data={ allUsers } 
                            columns={ this.state.columns } />
                    :
                        null
                }
            </div>
        )
    }
}

export default SearchUsers;