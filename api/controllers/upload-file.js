module.exports = async function uploadFile (req, res) {
  req.file('fileName').upload(function (err, files) {
    if (err) return res.serverError(err);

    return res.json({
      message: files.length + ' file(s) uploaded successfully!',
      files: files,
      content: files[0]
    });
  });
}