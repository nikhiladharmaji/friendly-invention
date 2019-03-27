module.exports = {


  friendlyName: 'Add',


  description: 'Add teams.',


  inputs: {
    teamName: {
      type: 'string',
      required: true
    },
    speakerOneName: {
      type: 'string',
      required: true
    },
    speakerTwoName: {
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


  fn: async function (inputs, exits) {
    let teamName = inputs.teamName;
    let speakerOneName = inputs.speakerOneName;
    let speakerTwoName = inputs.speakerTwoName;
    let instID = inputs.instID;

    
    let teamInsertQuery = `INSERT INTO teams (name, instID) VALUES ($1, $2)`;
    let teamInsertQueryValues = [teamName, instID];

    let result = await sails.sendNativeQuery(teamInsertQuery, teamInsertQueryValues);
    
    let selectTeamQuery = `SELECT teamId FROM teams where name= $1`;
    let selectTeamQueryValues= [teamName];

    let result2 = await sails.sendNativeQuery(selectTeamQuery, selectTeamQueryValues);

    console.log(result2);

    let teamID = result2["rows"][0]["teamId"];


    let speakerInsertQuery = `INSERT INTO speakers (name, teamId) VALUES($1, $2),($3, $4)`;
    let speakerInsertQueryValues = [speakerOneName, teamID, speakerTwoName, teamID];

    let result3 = await sails.sendNativeQuery(speakerInsertQuery, speakerInsertQueryValues);


    return exits.success({
        status: "success"
    });


  }


};
