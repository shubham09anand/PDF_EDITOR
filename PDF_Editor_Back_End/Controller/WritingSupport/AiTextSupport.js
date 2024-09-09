const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCV0_I26dExFLwWMbju9ZokQyZGOAKa_Ak");

const aiTextSupport = async (req, res) => {
     try {
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const queery = (req.body.queery)

          const result = await model.generateContent(queery);
          const response = result.response;

          const text = response.text();


          res.status(200).json({
               message: 'Success',
               generatedText: text,
               resultRES: result
          });

     } catch (error) {
          console.error('Error Creating Post:', error);
          res.status(500).json({
               message: 'Internal Server Error',
               error: error.message,
          });
     }
};

module.exports = { aiTextSupport };