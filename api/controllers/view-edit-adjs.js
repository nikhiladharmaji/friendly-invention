module.exports = {


  friendlyName: 'View edit adjs',


  description: 'Display "Edit adjs" page.',

   inputs: {
      adjID: {
      type: 'number'
    }
  },


  exits: {

    success: {
      viewTemplatePath: 'pages/edit-adjs'
    }

  },


  fn: async function (inputs) {

    let adjID = inputs.adjID;

    let query = `SELECT * from institutions`;
    let queryValues = [];
    let instResult = await sails.sendNativeQuery(query, queryValues);

    let adjQuery = `SELECT * from adjs where adjID = $1`
    let adjQueryValues = [adjID];
    let adjResult = await sails.sendNativeQuery(adjQuery, adjQueryValues);

    // Respond with view.
    return {
      institutions: instResult['rows'],
      adj: adjResult['rows']
    };

  }


};
//should this take adjID as input?
//fetch adj with adjID and fill their name in the value field of ejs file
//gets adjID from liost of judges when you click 'edit' button