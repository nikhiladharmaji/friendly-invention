module.exports = {


  friendlyName: 'Add result',


  description: 'Results Submit',


  inputs: {
    matchupId: {
      type: 'number',
      required: true
    },
    govSpeakerOneScore: {
      type: 'number',
      required: true
    },
    govSpeakerTwoScore: {
      type: 'number',
      required: true
    },

    govSpeakerThreeScore: {
      type: 'number',
      required: true
    },

    oppSpeakerOneScore: {
      type: 'number',
      required: true
    },

    oppSpeakerTwoScore: {
      type: 'number',
      required: true
    },

    oppSpeakerThreeScore: {
      type: 'number',
      required: true
    },

    govAdjScore: {
      type: 'number',
      required: true
    },

     oppAdjScore: {
      type: 'number',
      required: true
    },

    govSpeakerOneId: {
      type: 'number',
      required: true
    },
    
    govSpeakerTwoId: {
      type: 'number',
      required: true
    },

    govSpeakerThreeId: {
      type: 'number',
      required: true
    },

    oppSpeakerOneId: {
      type: 'number',
      required: true
    },

    oppSpeakerTwoId: {
      type: 'number',
      required: true
    },

    oppSpeakerThreeId: {
      type: 'number',
      required: true
    },

    adjID: {
      type: 'number',
      required: true
    },

    roundID: {
      type: 'number',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let matchupID = parseInt(inputs.matchupId);
    let govSpeakerOneID = inputs.govSpeakerOneId;
    let govSpeakerTwoID = inputs.govSpeakerTwoId;
    let govSpeakerThreeID = inputs.govSpeakerThreeId;
    let oppSpeakerOneID = inputs.oppSpeakerOneId;
    let oppSpeakerTwoID = inputs.oppSpeakerTwoId;
    let oppSpeakerThreeID = inputs.oppSpeakerThreeId;
    let govSpeakerOneScore = inputs.govSpeakerOneScore;
    let govSpeakerTwoScore = inputs.govSpeakerTwoScore;
    let govSpeakerThreeScore = inputs.govSpeakerThreeScore;
    let oppSpeakerOneScore = inputs.oppSpeakerOneScore;
    let oppSpeakerTwoScore = inputs.oppSpeakerTwoScore;
    let oppSpeakerThreeScore = inputs.oppSpeakerThreeScore;
    let govAdjScore = inputs.govAdjScore;
    let oppAdjScore = inputs.oppAdjScore;
    let adjID = inputs.adjID;
    let roundID = inputs.roundID;


    let govScoreInsertQuery = `
      INSERT INTO speaker_scores (speakerID, score, roundID)
      VALUES 
      ($1, $2, $3), 
      ($4, $5, $6),
      ($7, $8, $9)
    `;
    let govScoreInsertQueryValues = [
      govSpeakerOneID, govSpeakerOneScore, roundID,
      govSpeakerTwoID, govSpeakerTwoScore, roundID,
      govSpeakerThreeID, govSpeakerThreeScore, roundID
    ]
    console.log(govScoreInsertQueryValues);
      
    let govScoreInsertResult = await sails.sendNativeQuery(govScoreInsertQuery, govScoreInsertQueryValues);

    let oppScoreInsertQuery = `
      INSERT INTO speaker_scores (speakerID, score, roundID)
      VALUES
      ($1, $2, $3),
      ($4, $5, $6),
      ($7, $8, $9)
    `;
    let oppScoreInsertQueryValues = [
      oppSpeakerOneID, oppSpeakerOneScore, roundID,
      oppSpeakerTwoID, oppSpeakerTwoScore, roundID,
      oppSpeakerThreeID, oppSpeakerThreeScore, roundID
    ]
    console.log(oppScoreInsertQueryValues);

    let oppScoreInsertResult = await sails.sendNativeQuery(oppScoreInsertQuery, oppScoreInsertQueryValues);


    let govAdjScoreQuery = `INSERT INTO adj_scores (adjID, score, roundID) VALUES ($1, $2, $3)`;
    let govAdjScoreQueryValues = [adjID, govAdjScore ,roundID];
    let govAdjScoreResult = await sails.sendNativeQuery(govAdjScoreQuery, govAdjScoreQueryValues);

    let oppAdjScoreQuery = `INSERT INTO adj_scores (adjID, score, roundID) VALUES ($1, $2, $3)`;
    let oppAdjScoreQueryValues = [adjID, oppAdjScore, roundID];
    let oppAdjScoreResult = await sails.sendNativeQuery(oppAdjScoreQuery, oppAdjScoreQueryValues);

    return exits.success({
        status: "success"
    });
  }


};