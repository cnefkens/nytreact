// Include React
var React =require("react");
var helpers =require("../utils/helpers.js");
// Creating the Results component
var Saved = React.createClass ({

  getInitialState: function() {

    return (
      {saved: ""}
    )
  },
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");

    helpers.getSaved()
      .then(function(response) {

        if (response.data === undefined) {
             var newSaved=[];
        }
            else
            {
               var newSaved = response.data;
                //console.log("history", response);
                
                }   
            console.log("main saved", response);  
         
        this.setState({        
          saved: newSaved
        });   
        // console.log("Saved clicks", newClicks);
      }.bind(this));
  },

     handleClick: function(event) {
        helpers.deleteArticle(event.target.value).then(function(data) {
              console.log("Deleted from MongoDB");
                       
               helpers.getSaved()
                .then(function(response) {
                    if (response.data === undefined) {
                        var newSaved=[];
                    }
                    else
                    {
                      var newSaved = response.data;
                      //console.log("history", response);
                }   
            console.log("main saved", response);  
              this.setState({        
                saved: newSaved
              }); 

        // console.log("Saved clicks", newClicks);
        }.bind(this))
        }.bind(this))
     },

  render: function() {

    if (this.state.saved == "") {
      return(

        <li className="list-group-item">
          <h3>
              <span><em>No Saved Articles.</em></span>
          </h3>
        </li>
      )
    }
    else {
      var articles = this.state.saved.map(function(article, i){
        return(
            <div key={article._id}>
              <li className="list-group-item" >
                <h3>
                  <span><em>{article.title}</em></span>
                  <span className="btn-group pull-right" >
                    <a href={article.url} target="_blank"><button className="btn btn-default" style={{"margin": "5px"}}>View Article</button></a>
                    <button className="btn btn-primary" onClick={this.handleClick} value={article._id} style={{"margin": "5px"}}>Delete</button>
                  </span>
                </h3>
                <p>Date Published: {article.pubDt}</p>
              </li>
            </div>
        )
      }.bind(this))
    }
    return(
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title"><strong><i className="fa fa-save" aria-hidden="true"></i> Saved Articles</strong></h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {articles}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
   }
  
     });

module.exports=Saved;

