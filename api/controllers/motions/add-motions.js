/*module.exports = {


  friendlyName: 'Add',


  description: 'Add motions.',


  inputs: {
    roundName:{
      type: 'string',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let roundName = inputs.roundName;

    let instInsertQuery = `INSERT INTO institutions (name) values($1)`;
    let instInsertQueryValues = [instName];

    let result = await sails.sendNativeQuery(instInsertQuery, instInsertQueryValues);

    return exits.success({
        status: "success"
    });

  }


};*/
