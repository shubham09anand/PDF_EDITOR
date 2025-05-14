const { GoogleGenerativeAI } = require("@google/generative-ai");

const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

const summaryGenration = async (summaryMetaData) => {
     try {

          if (summaryMetaData.articleTitle === "" || summaryMetaData.articleConentent === "" ) {
               // console.log("empty")
          }
          const dummyText = `Could you please generate a summary of text for my academic project 300words to 500words. here is the text in json format which has one filed about the title of content and second filed is conent.
               {
                    "articleTitle": ${summaryMetaData.articleTitle},
                    "articleConentent": ${summaryMetaData.articleConentent},
               }
               one more request is return only the summary PLEASE and if u can add something more from Your side please add.

               In case if the Upper JSON data is empty then please use this data
               {
                    "articleLink":${summaryMetaData.articleLink},
                    "articleHeading":${summaryMetaData.articleHeading},
                    "articleSnippet":${summaryMetaData.articleSnippet},
               }

               articleLink is containig a link of a article, articleHeading has a heading about the content on web page , articleSnippet has very short summary about that content of that content on that web page.
               `

               // console.log(summaryMetaData.articleSnippet)
               // console.log(summaryMetaData.articleLink)

          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

          const result = await model.generateContent(dummyText);
          const response = result.response;

          const text = response.text();
          // console.log(text)

          return { status: 'ok', generatedText: text };

     } catch (error) {

          console.error('Error Creating Post:', error);

          return { status: 'fail', error: error.message };

     }
};

module.exports = { summaryGenration };