//Include React
var React = require("react");

// Here we include all of the sub-components
var Saved = require("./children/Saved");
var Search = require("./children/Search");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	  // Note how we added in this history state variable
  getInitialState: function() {
    return { term: "", results: [], articles: [], deleted: [] };
  },

	 setTerm: function(term, startyear, endyear) {
	 	helpers.runQuery(term, startyear, endyear).then(function(data) {
	 		if (data !== this.state.results) {
	 			console.log("search", data);
	 			this.setState({ results: data });
	 		}
	 	}.bind(this))
	 },

 // Here we render the function
   render: function() {
     return (
       <div className="container">
         <div className="row">
           <div className="jumbotron">
             <h2 className="text-center">New York Times Article Scrubber</h2>
             <p className="text-center">
               <em>Search for and save articles that interest you</em>
             </p>
           </div>
           <div className="row">
           	<Form setTerm={this.setTerm} />
           </div>
           <div className="row">
           	<Results results = {this.state.results} />
           </div>
           <div className="row">
           	<Articles articles = {this.state.articles} />
           </div>
         </div>
       </div>
     );
   }
});

// Export the component for use in other files
module.exports = Main;