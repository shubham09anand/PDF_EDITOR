const axios = require('axios');

const getImages = async (req, res) => {
     try {

          // console.log("image Api")
          const API_KEY = "AIzaSyDhXIKNv8WUsk9EJwJKA9MZ6TLFQmIb2WY";
          const SEARCH_ENGINE_ID = "402cb9ae467ab4a4e";
          const search_query = req.body.queery;
          // console.log(search_query)

          const url = "https://www.googleapis.com/customsearch/v1";

          const params = {
               'q': search_query,
               'key': API_KEY,
               'cx': SEARCH_ENGINE_ID,
               count: 100,
               'searchType': 'image',
               rowLimit:100,
          };

          axios.get(url, { params })
               .then(response => {
                    const result = response.data;
                    res.status(200).json({
                         success: true,
                         status: 1,
                         apiResult: result,
                         message: "made api request",
                    })
               }).catch(error => {
                    console.error('An error occurred:', error);
                    res.status(400).json({
                         success: false,
                         status: 0,
                         apiResult: [],
                         message: "falied api request",
                    })
               });

     } catch (error) {
          res.status(500).json({
               success: false,
               status: -1,
               message: "Internal Server Error",
          })
     }
}

module.exports = { getImages }
