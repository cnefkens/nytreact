// Include React
var React = require('react');
var router = require('react-router');
// var browserHistory= router.browserHistory;
// Creating the Form component
var helpers =require("../../utils/helpers.js");

var SearchForm = React.createClass({

 getInitialState: function() {

    return (this.state = {topic: this.props.topic, startYr: this.props.startYr, endYr: this.props.endYr});
    
 },
  // // This function will respond to the user input
  handleChange: function(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  // // When a user submits...
  handleSubmit: function() {
    this.props.setSearch(this.state.topic, this.state.startYr, this.state.endYr)
          return false
  },
  // Here we render the function
 render: function() {
    return (
     <div className="container">
       <div className="panel panel-primary">
				<div className="panel-heading">
					<h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
				</div>
				<div className="panel-body"> 
        
					  <form onSubmit={this.handleSubmit}> 

				  	 
					   <div className="form-group">
					     <label for="search">Topic:</label>
					    <input 
                     value={this.state.topic} 
                     type="text" 
                     className="form-control" 
                     id="topic"
                      onChange={this.handleChange}
                      required/>
					  </div> 

				  	 
					  <div className="form-group">
					    <label for="startYr">Start Year:</label>
					    <input    
                        value={this.state.startYr}
                        type="text" 
                        className="form-control" 
                        id="startYr"
                        onChange={this.handleChange}
                        />
					  </div>

            <div className="form-group">
					    <label for="endYr">End Year:</label>
					    <input    
                        value={this.state.endDt}
                        type="text" 
                        className="form-control" 
                        id="endYr"
                        onChange={this.handleChange}
                        />
					  </div>

					  <button type="submit" className="btn btn-default" id="runSearch" style={{"margin": "5px"}}><i className="fa fa-search" ></i> Search</button>
  					   <a href="#/search"><button type="button" className="btn btn-default" id="clearAll" style={{"margin": "5px"}}><i className="fa fa-trash"></i> Clear Search </button></a>

					 </form> 
				 </div>
	
        </div>  
        </div>
    );
  }
});

module.exports=SearchForm;


