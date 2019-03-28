module.exports = {


  friendlyName: 'View add venue',


  description: 'Display "Add venue" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/add-venue',
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
