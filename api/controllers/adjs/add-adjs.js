module.exports = {


  friendlyName: 'Add',


  description: 'Add adjs.',


  inputs: {
    adjName: {
      type: 'string',
      required: true
    },

    instID: {
      type:'number',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {

    let adjName = inputs.adjName;
    let instID = inputs.instID;

    
    let adjInsertQuery = `INSERT INTO adjs (name, instID) VALUES ($1, $2)`;
    let adjInsertQueryValues = [adjName, instID];

    let result = await sails.sendNativeQuery(adjInsertQuery, adjInsertQueryValues);
    


    return exits.success({
        status: "success"
    });


  }


};
