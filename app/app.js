// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");
var Router=require('react-router').Router;
// Include the Main Component
var routes = require("./config/routes");

// This code here allows us to render our main component (in this case "Main")
ReactDOM.render(routes, document.getElementById("app"));
