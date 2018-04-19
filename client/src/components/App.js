import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import * as actions from '../actions'

const Landing = () => <h2>Landing</h2>
const Dashboard = () => <h2>Dashboard</h2>
const Survey = () => <h2>Survey</h2>

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={Landing} />
            <Route exact path='/surveys' component={Dashboard} />
            <Route path='/surveys/new' component={Survey} />
          </div>  
        </BrowserRouter>  
      </div>
    );
  }
}

export default connect(null, actions)(App);