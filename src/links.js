import React, {Component} from "react"
import {Link} from "react-router-dom"

class Links extends Component{
    render(){
        return(
            <div>
                <Link to="/adduser">User Add</Link><br/>
                <Link to="/searchuser">User Search</Link><br/>
                <Link to="/deleteuser">User Delete</Link><br/>
                <Link to="/updateuser">User Update</Link><br/>
            </div>
        )
    }
}

export default Links;