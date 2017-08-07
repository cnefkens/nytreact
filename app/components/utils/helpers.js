// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";


const helpers = {

  runSearch: (topic, startYr, endYr) => {
     
    const APIKey = "09c1e19c51814dd0b5d514710e039c1f";
    const url='https://api.nytimes.com/svc/search/v2/articlesearch.json'
    const searchTopic = topic.trim();
    const startDt = startYr.trim() + "0101";
    const endDt = endYr.trim() + "1231";

    return axios.get(url, {
      params: {
          'api-key': APIKey,
          'q': searchTopic,
          'begin_date': startDt,
          'end_date': endDt
      }
  }).then(function(response) {

      console.log("run search" + response.data.response);
      return response.data.response;
    });

  },

  getSaved: () => {
    return axios.get("/api/saved");
  },
  // Also returns a promise object we can .then() off inside our Parent component
  // This method takes in an argument for what to post to the database
  saveArticle: (title, pubDt, url) => {
    return axios.post("/api/saved", {title, pubDt, url});
  },

  deleteArticle:(_id)  => {
    return axios.delete("/api/saved", {
         params:{'_id':_id}
        }).then(function(results)
        {
           return results;
      })
    }

};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
