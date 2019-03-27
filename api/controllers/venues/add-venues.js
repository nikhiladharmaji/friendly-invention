module.exports = {


  friendlyName: 'Add Venues',


  description: 'Add venues.',


  inputs: {
    venueName: {
      type: 'string',
      required: true,
    }


  },


  exits: {

  },


  fn: async function (inputs,exits) {

    let venueName = inputs.venueName;

    let venueInsertQuery = `INSERT INTO venues (name) values($1)`;
    let venueInsertQueryValues = [venueName];

    let result = await sails.sendNativeQuery(venueInsertQuery, venueInsertQueryValues);

    return exits.success({
        status: "success"
    });


  }


};
