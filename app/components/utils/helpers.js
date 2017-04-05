// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// New York Times API
var apiKey = config.nyt_key;

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query.
  runQuery: function(query, startyear, endyear) {

    console.log(location);
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey
    + "&q=" + query + "&begin_date=" + startyear + "0101" + "&end_date=" + endyear + "0101";
    
    return axios.get(url).then(function(response) {
    var headlines = [];
    var link = [];
    for (var i = 0; i < 5; i++) {
      headlines.push(response.data.response.docs[i].headline.main);
      link.push(response.data.response.docs[i].web_url);
    }     
   
    var savedArticles = [];
    var articles = [];
    for (var i = 0; i < 5; i++) {
      var obj = {
        'id': i,
        'headlines': response.data.response.docs[i].headline.main,
        'link': response.data.response.docs[i].web_url
      }
      articles.push(obj);
    }     
    return articles; 
    })

  },

  // This function hits our own server to retrieve the record of query results
  getArticles: function() {
    return axios.get("/api/saved");
  },

  // This function posts new searches to our database.
  postArticles: function(location) {
    return axios.post("/api/saved", { title: headlines, url: link, saved: true });
  }
};

// We export the API helper
module.exports = helper;
