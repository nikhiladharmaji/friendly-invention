module.exports = {

  /*index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="http://localhost:1337/upload-file/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="avatar" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },*/
  
  upload: function  (req, res) {


    setTimeout(function(){ console.log(req.file('fileName'));
    req.file('fileName').
    upload(function (err, files) {
      if (err)
        return res.serverError(err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files,
        content: files[0]
      });

    });},2000);
   
  }

};