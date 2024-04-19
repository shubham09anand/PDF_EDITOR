const axios = require('axios');
const cheerio = require('cheerio');
const { summaryGenration } = require('./summaryGenration');

const scrapeWebpage = async (req, res) => {
     try {
          console.log("Scrapper");
          const slectedLink = req.body.slectedLink;
          const conetntSnippet = req.body.conetntSnippet;
          const contentTitle = req.body.contentTitle;
          console.log(slectedLink)
          console.log(conetntSnippet)
          console.log(contentTitle)

          const response = await axios.get(slectedLink);
          if (response.status == 200) {

               const $ = cheerio.load(response.data)

               $('div.copyright-text, div.footer__container').remove();

               //getting para
               let para = '';

               $('p:not(.footer__disclaimer-text, .footer__copyright-text)').each(function () {
                    $(this).find('sup, em').remove();
                    $(this).find('sc-.e1853509-0').remove();
                    para += $(this).text() + '&#92;';
               });


               //getting para title
               const paraTitle = $("h1").text();

               //getting article writer
               const paraWriters = $("a[data-qa='author-name'], a[rel='author'], .author, .byline__name").map(function () {
                    return $(this).text();
               }).get().join('|');


               const summarizeArticle = (articleContent, maxLength) => {
                    // Tokenize the article content into sentences
                    const sentences = articleContent.split(/[.!?]/);

                    const sentenceScores = sentences.map(sentence => ({
                         text: sentence,
                         score: sentence.split(/\s+/).length
                    }));

                    sentenceScores.sort((a, b) => b.score - a.score);

                    let summary = '';
                    let wordCount = 0;
                    for (const sentence of sentenceScores) {
                         if ((wordCount + sentence.score) <= maxLength) {
                              summary += sentence.text.trim() + ' ';
                              wordCount += sentence.score;
                         } else {
                              break;
                         }
                    }

                    return summary.trim();
               };

               const summary_1 = summarizeArticle(para, 1200)
               console.log(summary_1)

               const articleData = {
                    artilceOriginalContent:para,
                    articleConentent: summary_1,
                    articleTitle: paraTitle,
                    articleWriter: paraWriters,
                    articleSnippet:conetntSnippet,
                    articleLink:slectedLink,
                    articleHeading:contentTitle,
               }

               const genaratedSummary = await summaryGenration(articleData)

               res.status(200).json({
                    success: true,
                    status: 1,
                    scrapData: articleData,
                    genaratedSummary: genaratedSummary,
                    message: "Scrapping succesful",
               })
          }
          else {
               res.status(404).json({
                    success: false,
                    status: 0,
                    scrapData: [],
                    message: "acrapping failed",
               })
          }
     } catch (error) {
          console.error('An error occurred:', error);
          res.status(500).json({
               success: false,
               status: -1,
               message: "Internal server error",
          })
     }
};

module.exports = { scrapeWebpage }