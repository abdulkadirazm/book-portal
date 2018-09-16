import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React from "react"
import * as UsersAPI from './UsersAPI'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import AppRouter from './AppRouter'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
constructor(props){
  super(props);
  this.state={
  userName:'',
  password:'',
  getUser: []
  }

  this.handleChange = this.handleChange.bind(this)
 }

 handleChange(event){
  //kısa yol
  this.setState({[event.target.name]: event.target.value})
}

 handleClick(event){
  const user = {
    username: this.state.userName,
    password: this.state.password
  }

  if(!this.state.userName){
    NotificationManager.warning('Please enter username.', 'Empty place!', 3000);
}else if(!this.state.password){
    NotificationManager.warning('Please enter your password.', 'Empty place!', 3000);
}else{

  UsersAPI.get(user.username).then((response) => {
      if(!response || response.hasOwnProperty('error')) {
        this.setState({getUser:[""]});
        NotificationManager.error('Username password do not match', 'Please check!', 3000)
    } else {
        this.setState({getUser: response});
    }
    for (let index = 0; index < this.state.getUser.length; index++) {
      const element = this.state.getUser[index];
      if(element.username === user.username && element.password === user.password){
        NotificationManager.success('Loged in successfully.', 'Success!', 5000, () => {
          ReactDOM.render(
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>,
            document.getElementById('root')
        );        
        registerServiceWorker()
        
      });
      }else{
        NotificationManager.error('Username password do not match', 'Please check!', 3000)
      }  
    }
    
    
});}
}

render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             name="userName"
             value={this.state.userName}
             onChange = {this.handleChange}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               name="password"
               value={this.state.password}
               onChange = {this.handleChange}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
         <NotificationContainer/>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;