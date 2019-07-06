
module.exports = {


  friendlyName: 'Upload file',


  description: 'Upload a file',



  exits: {


  },


  fn: async function (req, res) {

      var d = require('domain').create() //fixes the server shutting down issue 
      d.on('error', function () {})

      d.run(function safelyUpload () {
      setTimeout(function(){

     
      res.setTimeout(0); // this link told me to do this - https://github.com/sails101/file-uploads/blob/master/api/controllers/FileController.js
      
      req.file('fileName') 
      .upload(function (err, files) {
      if (err)
        return res.serverError(err);


        return res.json({
        message: "success"
      });

      /*return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files,
        content: files[0]
      });*/

    });
    },3000)
      

  });
}



};
