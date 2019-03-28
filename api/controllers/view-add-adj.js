module.exports = {


  friendlyName: 'View add adj',


  description: 'Display "Add adj" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/add-adj'
    }

  },


  fn: async function () {

    let query = `SELECT * from institutions`;
    let queryValues = [];
    let result = await sails.sendNativeQuery(query, queryValues);

    // Respond with view.
    return {
      institutions: result['rows']
    };

  }


};
