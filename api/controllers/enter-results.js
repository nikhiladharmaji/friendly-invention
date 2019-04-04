module.exports = {


  friendlyName: 'Enter results',


  description: '',


  inputs: {
    matchupId: {
      type: "number"
    },
    govSpeakerOneId: {
      type: "number"
    },
    govSpeakerOneScore: {
      type: "string"
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    console.log(inputs);  

    // All done.
    return;

  }


};
