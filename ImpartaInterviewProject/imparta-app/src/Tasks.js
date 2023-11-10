import React, { Component } from "react";
import { variables } from "./Variables.js";
import "./Tasks.css";

export class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      statuses: [],
      user: "",
      modalTitle: "",
      taskID: "",
      taskName: "",
      taskDescription: "",
      taskStatus: "",
      taskType: "",
      taskPriority: "",
      userID: "",
      userEmail: "",
      userForename: "",
      userSurname: "",
      userPhotoPath: variables.PHOTOS_URL,
      userPhotoFileName: "",
      tasksWithoutFilter: [],
      tasksIdFilter: "",
      tasksNameFilter: "",
    };
  }

  FilterFn() {
    var tasksIdFilter = this.state.tasksIdFilter;
    var tasksNameFilter = this.state.tasksNameFilter;
    var filteredData = this.state.tasksWithoutFilter.filter(function (el) {
      console.log(el);
      return (
        el.id
          ?.toString()
          .toLowerCase()
          .includes(tasksIdFilter.toString().trim().toLowerCase()) &&
        el.name
          ?.toString()
          .toLowerCase()
          .includes(tasksNameFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ tasks: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.tasksWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ tasks: sortedData });
  }

  refreshList() {
    let tokenID = window.localStorage.getItem("token");

    fetch(variables.API_URL + "tasks?userID=" + tokenID)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ tasks: data.tasks });
        this.setState({ statuses: data.statuses });
        this.setState({ tasks: data.tasks, tasksWithoutFilter: data.tasks });
      });

    fetch(variables.API_URL + "user?id=" + tokenID)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ userID: data.id });
        this.setState({ userEmail: data.email });
        this.setState({ userForename: data.firstname });
        this.setState({ userSurname: data.surname });
        this.setState({ userPhotoFileName: data.photoFileName });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  addClick() {
    this.setState({
      modalTitle: "Add Task",
      taskID: 0,
      taskName: "",
      taskDescription: "",
      taskStatus: "",
      taskType: "",
      taskPriority: "",
    });
  }

  editClick(task) {
    this.setState({
      modalTitle: "Edit Task",
      taskID: task.id,
      taskName: task.name,
      taskDescription: task.description,
      taskStatus: task.status,
      taskType: task.type,
      taskPriority: task.priority,
    });
  }

  editTaskName = (e) => {
    this.setState({ taskName: e.target.value });
  };

  editTaskDescription = (e) => {
    this.setState({ taskDescription: e.target.value });
  };

  editTaskStatus = (e) => {
    this.setState({ taskStatus: e.target.value });
  };

  editTaskType = (e) => {
    this.setState({ taskType: e.target.value });
  };

  editTaskPriority = (e) => {
    this.setState({ taskPriority: e.target.value });
  };

  createClick() {
    if (!this.isInputValid()) {
      return;
    }
    fetch(variables.API_URL + "tasks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.taskName,
        description: this.state.taskDescription,
        status: this.state.taskStatus,
        type: this.state.taskType,
        priority: this.state.taskPriority,
        userID: this.state.userID,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  isInputValid() {
    if (this.state.taskDescription < 5) {
      alert("Description is too short. Please enter atleast 5 characters.");
      return false;
    } else if (this.state.taskStatus < 1) {
      alert("Status is too short. Please enter a selection.");
      return false;
    } else if (this.state.taskType < 1) {
      alert("Type is too short. Please enter a selection.");
      return false;
    }
    return true;
  }

  logoutClick() {
    window.localStorage.setItem("isLoggedIn", false);
    this.props.history.push({
      pathname: "/login",
    });
  }

  updateClick() {
    if (!this.isInputValid()) {
      return;
    }
    fetch(variables.API_URL + "tasks", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.taskID,
        name: this.state.taskName,
        description: this.state.taskDescription,
        status: this.state.taskStatus,
        type: this.state.taskType,
        priority: this.state.taskPriority,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  deleteClick(id) {
    console.log(id);
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "tasks?id=" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.taskName,
          description: this.state.taskDescription,
          status: this.state.taskStatus,
          type: this.state.taskType,
          priority: this.state.taskPriority,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  profileImageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.API_URL + "user/SaveProfilePhoto?id=" + this.state.userID, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ userPhotoFileName: data });
      });
  };

  changeTasksIdFilter = (e) => {
    this.state.tasksIdFilter = e.target.value;
    this.FilterFn();
  };
  changeTasksNameFilter = (e) => {
    this.state.tasksNameFilter = e.target.value;
    this.FilterFn();
  };
  render() {
    const {
      tasks,
      modalTitle,
      taskID,
      taskName,
      taskDescription,
      taskStatus,
      taskType,
      taskPriority,
      statuses,
      userID,
      userEmail,
      userForename,
      userSurname,
      userPhotoPath,
      userPhotoFileName,
    } = this.state;
    return (
      <div>
        <div>
          {window.localStorage.getItem("isLoggedIn") === "true" ? (
            <div>
              <h1>
                Welcome back {userForename} {userSurname}
              </h1>
              <div class="main-table-area">
                <table class="widget-table">
                  <tr>
                    <th class="col1">
                      <div className="p-2 w-50 bd-highlight">
                        <h4>Change your profile photo:</h4>

                        <img
                          width="250px"
                          height="250px"
                          src={userPhotoPath + userPhotoFileName}
                        />
                        <input
                          className="m-2"
                          type="file"
                          onChange={this.profileImageUpload}
                        ></input>
                      </div>
                    </th>
                    <th class="col2"></th>
                    <th class="col3">
                      <h4>Status Counts:</h4>
                      <table className="table table-stripped">
                        <thead>
                          <tr>
                            <th>Status</th>
                            <th>Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {statuses.map((status) => (
                            <tr key={status.status}>
                              <td>
                                {status.status === "In Progress" ? (
                                  <p
                                    style={{ color: "red", fontWeight: "bold" }}
                                  >
                                    {status.status}
                                  </p>
                                ) : null}
                                {status.status === "Completed" ? (
                                  <p
                                    style={{
                                      color: "green",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {status.status}
                                  </p>
                                ) : null}
                                {status.status === "Pending" ? (
                                  <p
                                    style={{
                                      color: "purple",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {status.status}
                                  </p>
                                ) : null}
                              </td>
                              <td>{status.count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </th>
                    <th class="col4">
                      <button type="button" className="btn btn-primary" onClick={() => this.logoutClick()}>
                        Logout
                      </button>
                    </th>
                  </tr>
                </table>
              </div>

              <div class="main-table-area">
                <h4>Tasks:</h4>
                <table className="table table-stripped">
                  <thead>
                    <tr>
                      <th>
                        <div className="d-flex flex-row">
                          <input
                            className="form-control m-2"
                            onChange={this.changeTasksIdFilter}
                            placeholder="Filter"
                          />
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => this.sortResult("id", true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-arrow-down-square-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => this.sortResult("id", false)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-arrow-up-square-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                            </svg>
                          </button>
                        </div>
                        Task ID
                      </th>
                      <th>
                        <div className="d-flex flex-row">
                          <input
                            className="form-control m-2"
                            onChange={this.changeTasksNameFilter}
                            placeholder="Filter"
                          />
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => this.sortResult("name", true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-arrow-down-square-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => this.sortResult("name", false)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-arrow-up-square-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                            </svg>
                          </button>
                        </div>
                        Name
                      </th>
                      <th>Status</th>
                      <th>Type</th>
                      <th>Priority</th>
                      <th></th>
                      <th>
                        <button
                          type="button"
                          className="btn btn-primary"
                          background-color="green"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => this.addClick()}
                        >
                          Create a Task +
                        </button>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td>
                          {task.status === "In Progress" ? (
                            <p style={{ color: "red", fontWeight: "bold" }}>
                              {task.status}
                            </p>
                          ) : null}
                          {task.status === "Completed" ? (
                            <p style={{ color: "green", fontWeight: "bold" }}>
                              {task.status}
                            </p>
                          ) : null}
                          {task.status === "Pending" ? (
                            <p style={{ color: "purple", fontWeight: "bold" }}>
                              {task.status}
                            </p>
                          ) : null}
                        </td>
                        <td>{task.type}</td>
                        <td>{task.priority}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-light mr-1"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => this.editClick(task)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                              />
                            </svg>
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-light mr-1"
                            onClick={() => this.deleteClick(task.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash3-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">{modalTitle}</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        arial-label="Close"
                      ></button>
                    </div>

                    <div className="modal-body">
                      <div className="input-group mb-3">
                        <table>
                          <tr>
                            <th>
                              <table>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Type</th>
                                    <th>Priority</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={taskName}
                                        onChange={this.editTaskName}
                                        required
                                      />
                                    </td>

                                    <td>
                                      <select
                                        value={taskStatus}
                                        onChange={this.editTaskStatus}
                                      >
                                        <option value=""></option>
                                        <option value="In Progress">
                                          In Progress
                                        </option>
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">
                                          Completed
                                        </option>
                                      </select>
                                    </td>
                                    <td>
                                      <select
                                        value={taskType}
                                        onChange={this.editTaskType}
                                      >
                                        <option value=""></option>
                                        <option value="Bug">Bug</option>
                                        <option value="Epic">Epic</option>
                                        <option value="Spike">Spike</option>
                                        <option value="Task">Task</option>
                                      </select>
                                    </td>
                                    <td>
                                      <select
                                        value={taskPriority}
                                        onChange={this.editTaskPriority}
                                      >
                                        <option value=""></option>
                                        <option value="Minor">Minor</option>
                                        <option value="Moderate">
                                          Moderate
                                        </option>
                                        <option value="Major">Major</option>
                                        <option value="Critical">
                                          Critical
                                        </option>
                                      </select>
                                    </td>
                                    <td>
                                      {taskID == 0 ? (
                                        <button
                                          type="button"
                                          className="btn btn-primary float-start"
                                          onClick={() => this.createClick()}
                                        >
                                          Create
                                        </button>
                                      ) : null}
                                    </td>
                                    <td>
                                      {taskID != 0 ? (
                                        <button
                                          type="button"
                                          className="btn btn-primary float-start"
                                          onClick={() => this.updateClick()}
                                        >
                                          Update
                                        </button>
                                      ) : null}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </table>
                            </th>
                          </tr>
                          <tr>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                value={taskDescription}
                                onChange={this.editTaskDescription}
                                required
                              />
                            </th>
                          </tr>
                        </table>
                      </div>
                      {taskName <= 5 && (
                        <p>Name must be at least 5 characters long</p>
                      )}
                      {taskDescription <= 5 && (
                        <p>Description must be at least 5 characters long</p>
                      )}
                      {taskStatus == 0 && <p>Status must be selected</p>}
                      {taskType == 0 && (
                        <p>Type must be at least 5 characters long</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            this.logoutClick()
          )}
        </div>
      </div>
    );
  }
}
