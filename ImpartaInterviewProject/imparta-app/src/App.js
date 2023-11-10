import logo from './logo.svg';
import './App.css';
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
<Switch>
  <Route path='/tasks' component={Tasks}></Route>
  <Route path='/login' component={Login}></Route>
  <Route path='/register' component={Register}></Route>
</Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
