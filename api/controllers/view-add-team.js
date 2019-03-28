module.exports = {


  friendlyName: 'View add team',


  description: 'Display "Add team" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/add-team'
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
