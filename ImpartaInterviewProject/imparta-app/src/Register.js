import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { variables } from "./Variables.js";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      proceedLogin: ""
    };
  }

  registerClick() {
    fetch(variables.API_URL + "user/register", {
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
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }

      emailchange = (e) => {
        this.setState({ email: e.target.value });
      };
    
      passwordchange = (e) => {
            this.setState({ password: e.target.value });
    
          };

  render() {
    const {
      email,
      password
    } = this.state;
    
    return (
      <div>
      <div className="offset-lg-3 col-lg-6">
              <div className="card">
                  <div className="card-header">
                      <h1>Registration</h1>
                  </div>
                  <div className="card-body">
                        <div className="form-group">
                            <label>User Name <span className="errmsg">*</span></label>
                            <input value={email} onChange={this.emailchange} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Password <span className="errmsg">*</span></label>
                            <input type="password" value={password} onChange={this.passwordchange} className="form-control"></input>
                        </div>
                    </div>
                  <div className="card-footer">
                  <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => this.registerClick()}
                  >Register</button>
                      <NavLink to={'/login'} className="btn btn-danger">Close</NavLink>
                  </div>
              </div>
      </div>


  </div>
    );
  }
}