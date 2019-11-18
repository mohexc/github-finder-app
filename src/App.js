import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './components/layout/navBar';
import Users from './components/users/users';
import Search from './components/users/search';
import Alert from './components/layout/alert';
import About from './components/pages/about';
import User from './components/users/user'

import axios from 'axios'
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }

  // async componentDidMount() {
  //   this.setState({ loading: true })
  //   const { data } = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   this.setState({ users: data, loading: false })
  // }

  searchUsers = async text => {
    this.setState({ loading: true })
    const { data } = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: data.items, loading: false })
  }

  //Get single github user
  getUser = async (username) => {
    this.setState({ loading: true })
    const { data } = await axios.get(`https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ user: data, loading: false })

  }

  getUserRepos = async username => {
    this.setState({ loading: true })
    const { data } = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ repos: data, loading: false })
  }

  // Clear user from state
  clearUsers = () => this.setState({ users: [], loading: false })


  //Set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } })
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {

    const { users, loading, alert, user, repos } = this.state

    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Alert alert={ alert } />
            <Switch>
              <Route exact path='/' render={ props => (
                <Fragment>
                  <Search
                    searchUsers={ this.searchUsers }
                    clearUsers={ this.clearUsers }
                    showClear={ users.length > 0 ? true : false }
                    setAlert={ this.setAlert }
                  />
                  <Users loading={ loading } users={ users } />
                </Fragment>
              ) } />
              <Route exact path='/about' component={ About } />
              <Route exact path='/user/:login' render={ props => (
                <User { ...props }
                  getUser={ this.getUser }
                  user={ user }
                  loading={ loading }
                  getUserRepos={ this.getUserRepos }
                  repos={ repos }
                />
              ) } />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
