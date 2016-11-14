//Require React
var React = require('react');
var Router = require('react-router');

//Bring in Contents in Search Folder 
var Query = require('./Search/Query');
var Results = require('./Search/Results');

//Bring in your Helpers
var helpers = require('../utils/helpers');

//Create a var Search to use below
var Search = React.createClass({

  getInitialState: function() {
    return {
      queryTerm: "",
      startYear: "",
      endYear: "",
      results: {}
    }
  },

  componentDidUpdate: function(prevProps, prevState)  {

    if (this.state.queryTerm != "" && (prevState.queryTerm != this.state.queryTerm || prevState.startYear != this.state.startYear || prevState.endYear != this.state.endYear))
    {
      helpers.runQuery(this.state.queryTerm, this.state.startYear, this.state.endYear)

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

  setQuery: function(newQuery, newStart, newEnd){

    this.setState({
      queryTerm: newQuery,
      startYear: newStart,
      endYear: newEnd
    })
  },

  render: function(){

    return(

      <div className="main-container">

        <Query updateSearch={this.setQuery} />

        <Results results={this.state.results}/>
        
      </div>

    )
  }
});

module.exports = Search;
