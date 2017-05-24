import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import configureStore from './redux/reducer';
import './home.css';

import SubmitDemo from './Submitton/Demo';
import R2Demo from './R2/Demo';
import VComDemo from './VCon/Demo';
import SendIMG from './SendIMG/Demo';

const store = configureStore();

function ListView(props) {
  return (
    <div className="right-content">
      <h1>List</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/submit">Submitton</Link>
        </li>
        <li>
          <Link to="/r2">R2Factory</Link>
        </li>
         <li>
          <Link to="/vcon">VCon</Link>
        </li>
        <li>
          <Link to="/sendimg">SendIMG</Link>
        </li>
      </ul>
    </div>
  )
}

function HelloWorldView(props) {
  return (
    <div>
      <h1>Hello</h1>
      <div>This is a utils for react & redux.</div>
    </div>
  )
}
export default class HomeView extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div id="home-view">
            <ListView/>
            <div className="left-content">
              <Route exact path="/" component={HelloWorldView}/>
              <Route exact path="/submit" component={SubmitDemo}/>
              <Route exact path="/r2" component={R2Demo}/>
              <Route exact path="/vcon" component={VComDemo}/>
              <Route exact path="/sendimg" component={SendIMG}/>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
