import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Login} from './Login';
import {Register} from './Register';
import {Tasks} from './Tasks';
import {BrowserRouter, Route, Switch, NavLink, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h3 className="d-flex justify-content-center m-3">
        Task Manager - Imparta
      </h3>
<nav className="navbar nav-expand-sm bg-light navbar-dark">
<ul className="navbar-nav">
  <li className="nav-item- m-1">
    <NavLink className="btn btn-light btn-outline-primary" to='/home'>
      Home
    </NavLink>
  </li>
  <li className="nav-item- m-1">
    <NavLink className="btn btn-light btn-outline-primary" to='/tasks'>
      Tasks
    </NavLink>
  </li>
</ul>

</nav>

<Switch>
  <Route path='/home' component={Home}></Route>
  <Route path='/tasks' component={Tasks}></Route>
  <Route path='/login' component={Login}></Route>
  <Route path='/register' component={Register}></Route>
</Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
