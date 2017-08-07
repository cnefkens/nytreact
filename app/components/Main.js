// Include React
var React =require("react");
var Router=require('react-router');
// Here we include all of the sub-components
var Search =require("./children/Search");
var Saved =require("./children/Saved");

// Helper Function
var helpers =require("./utils/helpers.js");
var Link = require("react-router").Link;

// This is the main component.
var Main = React.createClass({


  // Here we describe this component's render method
  render: function() {
    return (
      <div className="container">
         <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                </button><a className="navbar-brand" href="#" >NYT-React</a>
              </div>
              <div className="collapse navbar-collapse navbar-ex1-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#/search">Search</a></li>
                        <li><a href="#/saved">Saved Articles</a></li>
                    </ul>
              </div> 
              </div>
          </nav>

              <div className="jumbotron">
                  <h2 className="text-center" style={ {"fontSize": "40px"}}><strong>New York Times Article Scrubber</strong></h2>
              </div>
   
        <div className="row">
       
           {this.props.children}   

      </div>
      </div>
    );
  }
});

//Main.displayName = 'Main'

// Export the component back for use in other files
module.exports = Main;
