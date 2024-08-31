const User = require("../../Models/UserSignupModel");

const signUp = async (req, res) => {
     try {
          console.log("register");
          // console.log(req.body);

          const existingUser = await User.findOne({ userName: req.body.userName });

          if (!existingUser) {

               const userData = req.body;

               const newUser = await User.create(userData);

               if (newUser) {
                    res.status(200).json({
                         status: 200,
                         success: true,
                         message: 'User registered successfully',
                         user: newUser._id,
                    });
               }
               
          } else {
               res.status(200).json({
                    status: 200,
                    success: false,
                    message: 'User Already Exists',
               });
          }

     } catch (error) {
          console.error('Error registering user:', error);
          res.status(500).json({
               success: false,
               message: 'Internal Server Error',
               error: error.message,
          });
     }
};

module.exports = { signUp };