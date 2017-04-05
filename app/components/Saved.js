var React = require("react");
var helpers = require("../utils/helpers");

var Saved = React.createClass({
	render: function() {
		return (
			<div className="panel panel-default">
			  <div className="panel-heading">
		    	{this.props.headlines.map(function(i) {

		    		return (
		    			<h3 className="panel-title" key={i}>{headline[i]}</h3>
		    		);
		    	})}
			  </div>
			  <div className="panel-body">
			    {this.props.date}
			  </div>
			</div>
		)
	}
})
