import React, {Component} from 'react';
import {variables} from './Variables.js';

export class Tasks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks:[],
            statuses:[],
            modalTitle:"",
            taskID: "",
            taskDescription: "",
            taskStatus: "",
            taskType: "",
            taskPriority: ""
        }
    }

    refreshList() {
        fetch(variables.API_URL+'tasks')
        .then(response => response.json())
        .then(data => {
            this.setState({tasks:data.tasks});
            this.setState({statuses:data.statuses});
        })
    }

    componentDidMount() {
        this.refreshList();
    }

    addClick() {
    this.setState({
        modalTitle:"Add Task",
        taskID:0,
        taskDescription:null,
        taskStatus:"",
        taskType:"",
        taskPriority:""
    });
    }

    
    editClick(task) {
        this.setState({
            modalTitle:"Edit Task",
            taskID:task.id,
            taskDescription:task.description,
            taskStatus: task.status,
            taskType: task.type,
            taskPriority: task.priority
        });
        }

    editTaskDescription = (e) => {
        this.setState({taskDescription:e.target.value});
    }
    
    editTaskStatus = (e) => {
        this.setState({taskStatus:e.target.value});
    }

    editTaskType = (e) => {
        this.setState({taskType:e.target.value});
    }

    editTaskPriority = (e) => {
        this.setState({taskPriority:e.target.value});
    }

    createClick(){
        if (!this.isInputValid())
        {
            return;
        }
        fetch(variables.API_URL+'tasks',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                description:this.state.taskDescription,
                status:this.state.taskStatus,
                type:this.state.taskType,
                priority:this.state.taskPriority
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    isInputValid() {
        if (this.state.taskDescription < 5) {
            alert("Description is too short. Please enter atleast 5 characters.");
            return false;
          }
          else if (this.state.taskStatus < 1) {
            alert("Status is too short. Please enter a selection.");
            return false;
          }
          else if (this.state.taskType < 1) {
            alert("Type is too short. Please enter a selection.");
            return false;
          }
        return true;
    }

    updateClick(){
        if (!this.isInputValid())
        {
            return;
        }
        fetch(variables.API_URL+'tasks',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:this.state.taskID,
                description:this.state.taskDescription,
                status:this.state.taskStatus,
                type:this.state.taskType,
                priority:this.state.taskPriority
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        console.log(id);
        if(window.confirm('Are you sure?'))
        {
            fetch(variables.API_URL+'tasks?id='+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    description:this.state.taskDescription,
                    status:this.state.taskStatus,
                    type:this.state.taskType,
                    priority:this.state.taskPriority
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }
    }


    render() {
        const {
            tasks,
            modalTitle,
            taskID,
            taskDescription,
            taskStatus,
            taskType,
            taskPriority,
            statuses

        }=this.state;
        return(
            <div>
            <table className="table table-stripped">
            <thead>
            <tr>
                <th>
                    Status
                </th>
                <th>
                    Count
                </th>
            </tr>
            </thead>
            <tbody>
                {statuses.map(status => 
                    <tr key={status.status}>
                        <td>
                        {status.status==='In Progress' ? <p style={{color: 'red', fontWeight: 'bold'}}>{status.status}</p> : null}
                            {status.status==='Completed' ? <p style={{color: 'green', fontWeight: 'bold'}}>{status.status}</p> : null}
                            {status.status==='Pending' ? <p style={{color: 'purple', fontWeight: 'bold'}}>{status.status}</p> : null}
                        </td>
                        <td>{status.count}</td>
                    </tr>)}
            </tbody>


            </table>
            <table className="table table-stripped">
                <button type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
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
                        <td>
                            {task.status==='In Progress' ? <p style={{color: 'red', fontWeight: 'bold'}}>{task.status}</p> : null}
                            {task.status==='Completed' ? <p style={{color: 'green', fontWeight: 'bold'}}>{task.status}</p> : null}
                            {task.status==='Pending' ? <p style={{color: 'purple', fontWeight: 'bold'}}>{task.status}</p> : null}
                        </td>
                        <td>{task.type}</td>
                        <td>{task.priority}</td>
                        <td>
                        <button type="button" className="btn btn-light mr-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={()=>this.editClick(task)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-light mr-1"
                            onClick={()=>this.deleteClick(task.id)}>                                                    
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
                    <input type="text" className="form-control"
                        placeholder="Description"
                        value={taskDescription}
                        onChange={this.editTaskDescription}
                        required/>
                    <select value={taskStatus} onChange={this.editTaskStatus}>
                        <option value=""></option>
                        <option value="In Progress">In Progress</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <select value={taskType} onChange={this.editTaskType}>
                        <option value=""></option>
                        <option value="Bug">Bug</option>
                        <option value="Epic">Epic</option>
                        <option value="Spike">Spike</option>
                        <option value="Task">Task</option>
                    </select>
                    <select value={taskPriority} onChange={this.editTaskPriority}>
                        <option value=""></option>
                        <option value="Minor">Minor</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Major">Major</option>
                        <option value="Critical">Critical</option>
                    </select>
                    {taskID==0 ?
                    <button type="button" className="btn btn-primary float-start"
                    onClick={() => this.createClick()}>
                        Create
                    </button> : null
                    }

                    {taskID!=0 ?
                    <button type="button" className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}>
                        Update
                    </button> : null
                    }
                </div>
                {taskDescription <= 5 && <p>Description must be at least 5 characters long</p>}
                {taskStatus == 0 && <p>Status must be selected</p>}
                {taskType == 0 && <p>Type must be at least 5 characters long</p>}
              </div>
            </div>
          </div>
        </div>

            </div>
        
        )}
}