import React, { Component } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import { variables } from "./Variables.js";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskID: "",
      email: "",
      password: "",
    };
  }

  loginClick() {
    fetch(variables.API_URL + "user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
            if (result==-1)
            {
                alert("Invalid login attempt");
            }
            else
            {
              window.localStorage.setItem("token", result.id);
              window.localStorage.setItem("isLoggedIn", true)
              this.props.history.push({
                  pathname: '/tasks',
                });
            }
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  emailupdate = (e) => {
    this.setState({ email: e.target.value });
  };

  passwordupdate = (e) => {
        this.setState({ password: e.target.value });
      };

  render() {
    const {
      email,
      password,
      loginSuccessful
    } = this.state;
    
    return (
        <div className="row">
        <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <div className="card">
                    <div className="card-header">
                        <h2>Login</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>User Name <span className="errmsg">*</span></label>
                            <input value={email} onChange={this.emailupdate} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Password <span className="errmsg">*</span></label>
                            <input type="password" value={password} onChange={this.passwordupdate} className="form-control"></input>
                        </div>
                    </div>
                    <div className="card-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => this.loginClick()}
                  >Login</button>                        
                  <NavLink to={'/register'} className="btn btn-danger">New User</NavLink>
                    </div>
                </div>
        </div>
    </div>
    );
  }
}