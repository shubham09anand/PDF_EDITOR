const fetch = require("node-fetch");

const ImageAiController = async (req, res) => {
     console.log("AI Image");
     console.log(req.body);
     try {
          const prompt = req.body.userInput;
          console.log(prompt)
          const path =
               "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

          const headers = {
               Accept: "application/json",
               Authorization: "sk-KWXCi73f8nuoPN3ajGi8Lsr9AyzQj5rXPGeg5rli42vurLPk",
               "Content-Type": "application/json",
          };

          const body = {
               steps: 40,
               width: 1024,
               height: 1024,
               seed: 0,
               cfg_scale: 5,
               samples: 1,
               text_prompts: [
                    {
                         text: prompt,
                         weight: 1,
                    },
                    {
                         text: "blurry, bad",
                         weight: -1,
                    },
               ],
          };

          const response = await fetch(path, {
               headers,
               method: "POST",
               body: JSON.stringify(body),
          });

          if (!response.ok) {
               throw new Error(`Non-200 response: ${await response.text()}`);
          }

          const responseJSON = await response.json();

          const imageUrls = responseJSON.artifacts.map((image, index) => {
               return `data:image/png;base64,${image.base64}`;
          });

          // console.log(imageUrls)

          res.status(200).json({
               message: 'Image URLs generated successfully',
               imageUrls: imageUrls,
          });
     } catch (error) {
          console.error("Error:", error);

          res.status(500).json({
               message: 'Internal Server Error',
               error: error.message,
          });
     }
};

module.exports = { ImageAiController };
