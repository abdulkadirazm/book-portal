import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
import * as UsersAPI from './UsersAPI'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      userName:'',
      eMail:'',
      password:'',
      passwordC:''
    }
    
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    //kısa yol
    this.setState({[event.target.name]: event.target.value})
  }

  onKeyPress = (e) => {
    if (e.which === 13) {
      this.handleClick(e);
    }
  }

  handleClick(event){
    var self = this;
    if(!this.state.userName){
      NotificationManager.warning('Please enter username.', 'Empty place!', 3000);
    }else if(!this.state.eMail){
      NotificationManager.warning('Please enter your email.', 'Empty place!', 3000);
    }else if(!this.state.password){
      NotificationManager.warning('Please enter your password.', 'Empty place!', 3000);
    }else if(!this.state.passwordC){
      NotificationManager.warning('Please enter your password again.', 'Empty place!', 3000);
    }else if(this.state.password !== this.state.passwordC){
      NotificationManager.error('Paswords not match.', 'Please check!', 3000)
    }else {
      const user ={
          username: this.state.userName,
          email: this.state.eMail,
          password: this.state.password
      }
      UsersAPI.insert(user, 2).then((res) => {
          if (res.status >= 200 && res.status < 300) {
              NotificationManager.success('Click to redirect Login Page!', 'Success!', 5000, () => {
                var loginscreen=[];
                loginscreen.push(<Login parentContext={this}/>);
                var loginmessage = "Not Registered yet.Go to registration";
                self.props.parentContext.setState({loginscreen:loginscreen,
                  loginmessage:loginmessage,
                  buttonLabel:"Register",
                  isLogin:true
                });
              });
          }else {
              NotificationManager.error('Service don\'t answer.','Something Wrong!', 3000)
          }
      });
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             name="userName"
             value={this.state.userName}
             onChange = {this.handleChange}
             onKeyPress={this.onKeyPress}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             floatingLabelText="Email"
             name="eMail"
             value={this.state.eMail}
             onChange = {this.handleChange}
             onKeyPress={this.onKeyPress}
             />
           <br/>
           <TextField
             hintText="Enter your Password"
             type="password"
             floatingLabelText="Password"
             name="password"
             value={this.state.password}
             onChange = {this.handleChange}
             onKeyPress={this.onKeyPress}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password again"
             floatingLabelText="Password Again"
             name="passwordC"
             value={this.state.passwordC}
             onChange = {this.handleChange}
             onKeyPress={this.onKeyPress}
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

export default Register;