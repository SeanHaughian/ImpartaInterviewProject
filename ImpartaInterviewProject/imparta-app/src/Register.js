import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { variables } from "./Variables.js";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      surname: "",
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
        firstname: this.state.firstname,
        surname: this.state.surname,
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

  firstnamechange = (e) => {
    this.setState({ firstname: e.target.value });
  };

  surnamechange = (e) => {
        this.setState({ surname: e.target.value });

      };

      emailchange = (e) => {
        this.setState({ email: e.target.value });
      };
    
      passwordchange = (e) => {
            this.setState({ password: e.target.value });
    
          };


  render() {
    const {
      firstname,
      surname,
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
                            <label>Firstname<span className="errmsg">*</span></label>
                            <input value={firstname} onChange={this.firstnamechange} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Surname<span className="errmsg">*</span></label>
                            <input value={surname} onChange={this.surnamechange} className="form-control"></input>
                        </div>
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