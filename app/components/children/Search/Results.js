// Include React
var React =require("react");
var helpers =require("../../utils/helpers.js");

// Creating the Results component
var Results = React.createClass({
 
   getInitialState: function() {
    return(
        this.state = {results: this.props.results});
    },

    handleClick: function(article, event){

    helpers.saveArticle(article.headline.main, article.pub_date, article.web_url)
      .then(function(data){
        //this.setResults(this.props.results.filter(function(data) {
          //data.headline.main!==article.headline.main}))
        }.bind(this))

  },

  render: function(){

    if (!this.props.results.hasOwnProperty('docs')){

      return(

        <li className="list-group-item">

          <h3>
              <span><em>No Search Results.</em></span>
          </h3>

          </li>

      )

    }

    else {

      var articles = this.props.results.docs.map(function(article, i){

        return(

            <div key={i}>

              <li className="list-group-item" >

              <h3>
                  <span><em>{article.headline.main}</em></span>
                <span className="btn-group pull-right" >
                  <a href={article.web_url} target="_blank"><button className="btn btn-default">View Article</button></a>

                  <button className="btn btn-primary" onClick={this.handleClick.bind(this, article)}>Save</button>
                </span>
              </h3>
              <p>Published Date: {article.pub_date}</p>

              </li>

            </div>
        )

      }.bind(this))

    }

    return(
      <div className ="main-container">


        <div className="row">
          <div className="col-lg-12">

            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title"><strong><i className="fa fa-list-alt"></i>  Results</strong></h1>
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
    
  //   handleSubmit: function(event) {
  //      console.log(event);
  //       helpers.saveArticle({title: event.title, pubDt: event.pubDt, url: event}).then(()=> {
  //             console.log("Posted to MongoDB");
  //                      var newResults=this.state.results
  //                      newResults=newResults.filter(data, data.topic!==this.props.topic);
  //                      this.setState({        
  //                           results: newResults
  //                       }); 
  //       })
  //    }, 


                    
  //   render: function() {
  //     return (
  //       <div className="panel panel-default">
  //         <div className="panel-heading">
  //           <h3 className="panel-title text-center">Results</h3>
  //         </div>
          
  //         <div className="panel-body">
  //           {this.props.results.map(function(articles, i) {
				
	// 				  <form onSubmit={this.handleSubmit}>

	// 				    <div className="form-group">
	// 				      <label for="title">Title:</label>
	// 				      <input 
  //                    value={articles.title} 
  //                    type="text" 
  //                    className="form-control" 
  //                    id={"title"+i}
  //                    key={i}
  //                    disabled
  //                     />
	// 				    </div>

	// 				    <div className="form-group">
	// 				      <label for={"pubDt"+i}>Pub Date:</label>
	// 				        <input    
  //                       value={articles.pub_date}
  //                       type="text" 
  //                       className="form-control" 
  //                       id={"date"+i}
  //                       key={i}
  //                       disabled
  //                       hidden
  //                       />
	// 				    </div>

  //             <div className="form-group">
	// 				      <label for="url">URL:</label>
	// 				      <input    
  //                       value={articles.url}
  //                       type="text" 
  //                       className="form-control" 
  //                       id={"url"+i}
  //                      key={i}
  //                      disabled
  //                      hidden
  //                       />
	// 				    </div>

	// 				    <button type="submit" className="btn btn-default" id="saveArticle"><i className="fa fa-save"></i> Save</button>
  // 					  {/* <button type="button" className="btn btn-default" id="clearAll"><i className="fa fa-trash"></i> Clear Results</button> */}

	// 				  </form>
  //           })};
  //       </div>
  //     </div>
  //   );
  // }

// });
module.exports=Results;
// Export the component back for use in other files

