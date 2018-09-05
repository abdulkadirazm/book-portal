import React from "react"
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class UsersBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: this.props.username,
      eMail: this.props.email,
      passwordOld: this.props.password,
      passwordOldI: '',
      password: '',
      passwordC: '',
      submit: false
    }

    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    //kısa yol
    this.setState({ [event.target.className]: event.target.value })
  }

  handleSave() {

    if (!this.state.userName) {
      NotificationManager.warning('Please enter username.', 'Empty place!', 3000);
    } else if (!this.state.eMail) {
      NotificationManager.warning('Please enter your email.', 'Empty place!', 3000);
    } else if (!this.state.passwordOldI) {
      NotificationManager.warning('Please enter your last password.', 'Empty place!', 3000);
    } else if (!this.state.password) {
      NotificationManager.warning('Please enter your new password.', 'Empty place!', 3000);
    } else if (!this.state.passwordC) {
      NotificationManager.warning('Please enter your password again.', 'Empty place!', 3000);
    } else if (this.state.password !== this.state.passwordC) {
      NotificationManager.error('Paswords not match.', 'Please check!', 5000)
    } else if (this.state.passwordOldI !== this.state.passwordOld) {
      NotificationManager.error('Old paswords is incorrect.', 'Please check!', 5000)
    } else {
      const user = {
        username: this.state.userName,
        email: this.state.eMail,
        password: this.state.password
      }

      this.props.onSubmit(user);
      
      /*UsersAPI.insert(user).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          NotificationManager.success('User updated successfully.', 'Success!', 5000);
          this.afterSave();
        } else {
          NotificationManager.error('Service don\'t answer.', 'Something Wrong!', 5000)
        }
      });
*/
    }
  }

  render() {
    return (
      <div style={{ position: 'relative', margin: 'auto' }}>
        <input type="text" placeholder="Enter an Username" className="userName" value={this.state.userName} onChange={this.handleChange} /><br />
        <input type="text" placeholder="Enter your email" className="eMail" value={this.state.eMail} onChange={this.handleChange} /><br />
        <input type="password" placeholder="Enter your last password" className="passwordOldI" value={this.state.passwordOldI} onChange={this.handleChange} /><br />
        <input type="password" placeholder="Enter your new password" className="password" value={this.state.password} onChange={this.handleChange} /><br />
        <input type="password" placeholder="Enter the new password again" className="passwordC" value={this.state.passwordC} onChange={this.handleChange} /><br />

        <button className='btn btn-info' type="button" value="Submit" onClick={this.handleSave}>Submit</button>

        <NotificationContainer />
      </div>
    )
  }
}

class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allUsers: [],
      selectedUser: [],
      userName: '',
      eMail: '',
      passwordOld: '',
      showBody: false,
    }
    this.clickHandler = this.clickHandler.bind(this)
  }



  componentDidMount() {
        this.setState({ allUsers: [
          {
            "username": "abdulkadirazm",
            "email": "abka@abka.com",
            "password" : "123"
          },
          {
            "username": "themysr",
            "email": "myasarazm@gmail.com",
            "password": "321"
          }
        ]
    })
  }

  clickHandler(index, e) {
    let user = this.state.allUsers[index];
        this.setState({
          userName: user.username,
          eMail: user.email, passwordOld: user.password
        })
    

    this.setState({ showBody: true })

  }

  handleSubmit = (user) => {
    var arr = this.state.allUsers;
    arr.push(user);
    this.setState({allUsers: arr, showBody: false})
    
    NotificationManager.success('User updated successfully.', 'Success!', 3000)
  }

  render() {
    const { allUsers, userName, eMail, passwordOld } = this.state

    return (
      <div>
        <table border="1">
          <tbody>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Email</th>
            </tr>
            {allUsers.map((user, index) => {
              return (
                <tr key={user.userID}>
                  <td><button onClick={this.clickHandler.bind(this, index)} >Edit</button></td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <br />
        {this.state.showBody ? <UsersBody username={userName} email={eMail} password={passwordOld} onSubmit={this.handleSubmit} /> : null}
        <NotificationContainer />
      </div>
    )
  }
}

export default UpdateUser
