import React, {Component} from 'react';
import {variables} from './Variables.js';

export class Tasks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks:[],
            modalTitle:"",
            modalTaskID: "",
            modalTaskDescription: "",
            modalTaskStatus: "",
            modalTaskType: "",
            modalTaskPriority: ""
        }
    }

    refreshList() {
        fetch(variables.API_URL+'tasks')
        .then(response => response.json())
        .then(data => {
            this.setState({tasks:data});
        })
    }

    componentDidMount() {
        this.refreshList();
    }

    addClick() {
    this.setState({
        modalTitle:"Add Department",
        modalTaskID:0,
        modalTaskDescription:""
    });
    }

    
    editClick(task) {
        this.setState({
            modalTitle:"Edit Department",
            modalTaskID:task.id,
            modalTaskDescription:task.description
        });
        }
    

    editTask = (e) => {
        this.setState({modalTaskDescription:e.target.value});
    }

    render() {
        const {
            tasks,
            modalTitle,
            modalTaskID,
            modalTaskDescription,
            modalTaskStatus,
            modalTaskType,
            modalTaskPriority

        }=this.state;
        return(
            <div>
            <table className="table table-stripped">
                <button type="button" className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-toggle-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Add Task
                </button>
            <thead>
            <tr>

                <th>
                    Task ID
                </th>
                <th>
                    Description
                </th>
                <th>
                    Status
                </th>
                <th>
                    Type
                </th>
                <th>
                    Priority
                </th>
            </tr>

            </thead>
            <tbody>
                {tasks.map(task => 
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.description}</td>
                        <td>{task.status}</td>
                        <td>{task.type}</td>
                        <td>{task.priority}</td>
                        <td>
                        <button type="button" className="btn btn-light mr-1"
                        data-bs-toggle="modal"
                        data-bs-toggle-target="#exampleModal"
                        onClick={()=>this.editClick()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-light mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                            </button>
                        </td>
                    </tr>)}
            </tbody>


            </table>


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
                    <span className="input-group-text">Task Description</span>
                    <input type="text" className="form-control"
                        value={modalTaskDescription}
                        onChange={this.editTask}/>
                    
                    {modalTaskID==0 ?
                    <button type="button" className="btn btn-primary float-start">
                        Create
                    </button> : null
                    }

                    {modalTaskID!=0 ?
                    <button type="button" className="btn btn-primary float-start">
                        Update
                    </button> : null
                    }
                </div>
              </div>
            </div>
          </div>
        </div>

            </div>
        
        )}
}