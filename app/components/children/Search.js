var React = require('react');
var Router = require('react-router');

var SearchForm = require('./Search/SearchForm');
var Results = require('./Search/Results');

var helpers = require('../utils/helpers');

var Search = React.createClass({

  getInitialState: function() {
    return {
      topic: "",
      startYr: "",
      endYr: "",
      results: {}
    }
  },

  componentDidUpdate: function(prevProps, prevState)  {


    if (this.state.topic != "" && (prevState.topic != this.state.topic || prevState.startYr != this.state.startYr || prevState.endYr != this.state.endYr))
    {
      helpers.runSearch(this.state.topic, this.state.startYr, this.state.endYr)

      .then(function(data)  {
        if (data != this.state.results)
        {
          this.setState({
            results: data
          })
        }

      }.bind(this))
    }
  },

  setSearch: function(newTopic, newStartYr, newEndYr){

    this.setState({
      topic: newTopic,
      startYr: newStartYr,
      endYr: newEndYr
    })
  },
  setResults: function(newResults){

    this.setState({
      results: newResults
    })
  },

  render: function(){

    return(

      <div className="main-container">

        <SearchForm setSearch={this.setSearch} />

        <Results setResults={this.setResults} results={this.state.results}/>

      </div>

    )
  }
});

module.exports = Search;