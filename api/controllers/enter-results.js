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

    govTeamId: {
      type: 'number',
      required: true
    },

    oppTeamId: {
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
    let govTeamId = inputs.govTeamId;
    let oppTeamId = inputs.oppTeamId;


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

    let oppScoreInsertResult = await sails.sendNativeQuery(oppScoreInsertQuery, oppScoreInsertQueryValues);

    /*
    Find out which team won, and update points for the same
     */

    let oppTeamTotal = oppSpeakerOneScore + oppSpeakerTwoScore + oppSpeakerThreeScore;
    let govTeamTotal = govSpeakerOneScore + govSpeakerTwoScore + govSpeakerThreeScore;

    let winningTeamQuery = '\
      UPDATE teams \
      SET totalPoints = totalPoints + 1 \
      WHERE teamId = $1  \
    ';
    let winningTeamQueryValues = [];
    if(oppTeamTotal > govTeamTotal) {
      winningTeamQueryValues = [oppTeamId];
    } else {
      winningTeamQueryValues = [govTeamId];
    }
    let teamPointUpdateResult = await sails.sendNativeQuery(winningTeamQuery, winningTeamQueryValues);

    /*
    Update cumulative speaker scores for both teams
     */
    let updateGovTeamCumScoreQuery = '\
      UPDATE teams \
      SET totalSpeaks = totalSpeaks + $1 \
      WHERE teamId = $2 \
    ';
    let updateGovTeamCumScoreQueryValues = [govTeamTotal, govTeamId];
    let updateGovTeamCumScoreResult = await sails.sendNativeQuery(updateGovTeamCumScoreQuery, updateGovTeamCumScoreQueryValues);

    let updateOppTeamCumScoreQuery = '\
      UPDATE teams \
      SET totalSpeaks = totalSpeaks + $1 \
      WHERE teamId = $2 \
    ';
    let updateOppTeamCumScoreQueryValues = [oppTeamTotal, oppTeamId];
    let updateOppTeamCumScoreResult = await sails.sendNativeQuery(updateOppTeamCumScoreQuery, updateOppTeamCumScoreQueryValues);


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