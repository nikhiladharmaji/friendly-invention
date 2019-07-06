module.exports = {


  friendlyName: 'View upload file',


  description: 'Display "Upload file" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/upload-file'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
