//Require React and other Dependencies.
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
//Require your Routes 
var routes = require('./config/routes');

//Render 
ReactDOM.render(

  <Router>{routes}</Router>,
  document.getElementById('app')

);
