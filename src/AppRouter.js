import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import Links from "./links"
import AddUser from "./AddUser"
import SearchUser from "./SearchUser"
import DeleteUser from "./DeleteUser"
import UpdateUser from "./UpdateUser"

const AppRouter = () => {
    return(
        <Switch>
            <Route exact path="/" render={() => <Redirect replace to="links" />} />
            <Route path="/links" component={Links} />
            <Route path="/adduser" component={AddUser} />
            <Route path="/searchuser" component={SearchUser} />
            <Route path="/deleteuser" component={DeleteUser} />
            <Route path="/updateuser" component={UpdateUser} />
        </Switch>
    )
}

export default AppRouter;