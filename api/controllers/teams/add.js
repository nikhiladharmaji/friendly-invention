module.exports = {


  friendlyName: 'Add',


  description: 'Add teams.',


  inputs: {
    name: {
      type: 'string',
      required: true
    }
  },

  exits: {

  },


  fn: async function (inputs, exits) {
    let name = inputs.name;
    
    let query = `INSERT INTO teams (name) VALUES ($1)`;
    let queryValues = [name]

    let result = await sails.sendNativeQuery(query, queryValues);
    return exits.success({
        status: "success"
    });
  }


};
