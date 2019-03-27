module.exports = {


  friendlyName: 'Delete',


  description: 'Delete institutions.',


  inputs: {
    instID: {
      type: 'number',
      required: true,
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

   let instID = inputs.instID;

   let instDeleteQuery = `DELETE from institutions WHERE instID=$1`;
   let instDeleteQueryValues = [instID];

   let result = await sails.sendNativeQuery(instDeleteQuery, instDeleteQueryValues);

   return exits.success({
        status: "success",
    });
  }


};
