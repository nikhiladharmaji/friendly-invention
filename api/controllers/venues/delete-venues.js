module.exports = {


  friendlyName: 'Delete',


  description: 'Delete venues.',


  inputs: {
    venueID: {
      type: 'number',
      required: true,
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

   let venueID = inputs.venueID;

   let venueDeleteQuery = `DELETE from venues WHERE venueID=$1`;
   let venueDeleteQueryValues = [venueID];

   let result = await sails.sendNativeQuery(venueDeleteQuery, venueDeleteQueryValues);

   return exits.success({
        status: "success",
    });

  }


};
