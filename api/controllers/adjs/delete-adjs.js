module.exports = {


  friendlyName: 'Delete',


  description: 'Delete adjs.',


  inputs: {
    adjID:{
      type: 'number',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

   let adjID = inputs.adjID;

   let adjDeleteQuery = `DELETE from adjs WHERE adjID=$1`;
   let adjDeleteQueryValues = [adjID];

   let result = await sails.sendNativeQuery(adjDeleteQuery, adjDeleteQueryValues);

   return exits.success({
        status: "success",
    });

  }


};
