//Require React 
var React = require('react');
var Router = require('react-router');
//Require your Helpers 
var helpers = require('../../utils/helpers');
//Create a Class
var Results = React.createClass({

  getInitialState: function(){
    return {
      title: "",
      url: "",
      pubdate: "",
    }
  },

  handleClick: function(item, event){

    helpers.postSaved(item.headline.main, item.pub_date, item.web_url)
      .then(function(data){
      }.bind(this))

  },

  render: function(){

    if (!this.props.results.hasOwnProperty('docs')){

      return(

        <li className="list-group-item">

          <h3>
              <span>Once you Search this is where your articles will be displayed!</span>
          </h3>

          </li>

      )

    }

    else {

      var articles = this.props.results.docs.map(function(article, index){

        return(

            <div key={index}>

              <li className="list-group-item" >

              <h3>
                  <span>{article.headline.main}</span>
                <span className="btn-group pull-right" >
                  <a href={article.web_url} target="_blank"><button className="btn btn-primary ">View Article</button></a>

                  <button className="btn btn-success" onClick={this.handleClick.bind(this, article)}>Save</button>
                </span>
              </h3>
              <p>Date Published: {article.pub_date}</p>

              </li>

            </div>
        )

      }.bind(this))

    }

    return(
      <div className ="main-container">


        <div className="row">
          <div className="col-lg-12">

            <div className="panel panel-default">
              <div className="panel-heading">
                <h1 className="panel-title"><strong><i className=""></i>  Results</strong></h1>
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

module.exports = Results;