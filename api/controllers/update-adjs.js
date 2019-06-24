module.exports = {


  friendlyName: 'Update adj info',


  description: 'Update adjudicator details',


  inputs: {

    adjID: {
      description: 'Adj ID to update',
      type: 'number',
      required: true
    },

    name: {
      description: 'New Name',
      type: 'string',
      required: true
    },

    instID: {
      description: 'New Institution ID',
      type: 'number',
      required: true
    },


  },


  fn: async function (inputs, exits) {

    
    let adjID = inputs.adjID;
    let name = inputs.name;
    let instID = inputs.instID; 

    // Update the record for the logged-in user.
    let adjUpdateQuery = `UPDATE adjs SET name = $1, instID = $2 where adjID = $3`;
    let adjUpdateQueryValues = [name, instID, adjID];

    let result = await sails.sendNativeQuery(adjUpdateQuery, adjUpdateQueryValues);

     return exits.success({
        status: "success"
    });

  }


};
