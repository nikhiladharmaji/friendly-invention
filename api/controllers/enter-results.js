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

  },


  exits: {

  },


  fn: async function (inputs,exits) {

   let matchupID = parseInt(inputs.matchupId);

   let govTeamQuery = `SELECT govTeam from matchups WHERE matchupId = $1`;
   let govTeamQueryValues = [matchupID];
   let govTeamResult = await sails.sendNativeQuery(govTeamQuery, govTeamQueryValues);
   let govTeamID = govTeamResult["rows"][0]["teamId"];

   let oppTeamQuery = `SELECT oppTeam from matchups WHERE matchupId = $1`;
   let oppTeamQueryValues = [matchupID];
   let oppTeamResult = await sails.sendNativeQuery(oppTeamQuery, oppTeamQueryValues);
   let oppTeamID = oppTeamResult["rows"][0]["teamId"];

   let roundQuery = `SELECT roundID from matchups where matchupId = $1`;
   let roundQueryValues = [matchupID];
   let roundResult = await sails.sendNativeQuery(roundQuery, roundQueryValues);
   let roundID = roundResult["rows"][0]["roundID"];

   let govSpeakerOneID = inputs.govSpeakerThreeID;
   let govSpeakerTwoID = inputs.govSpeakerTwoID;
   let govSpeakerThreeID = inputs.govSpeakerThreeID;

   let govScoreInsertQuery = `INSERT INTO speaker_scores (speakerID, score, roundID) VALUES($1,$2,$3),($4,$5,$6),($7,$8,$9)`;
   let govScoreInsertQueryValues = [govSpeakerOneID, govSpeakerOneScore, roundID, govSpeakerTwoID, govSpeakerTwoScore, roundID, govSpeakerThreeID, govSpeakerThreeScore, roundID]
   let govScoreInsertResult = await sails.sendNativeQuery(govScoreInsertQuery, govScoreInsertQueryValues);

   let oppSpeakerOneID = inputs.oppSpeakerOneID;
   let oppSpeakerTwoID = inputs.oppSpeakerTwoID;
   let oppSpeakerThreeID = inputs.oppSpeakerThreeID;

   let oppScoreInsertQuery = `INSERT INTO speaker_scores (speakerID, score, roundID) VALUES($1,$2,$3),($4,$5,$6),($7,$8,$9)`;
   let oppScoreInsertQueryValues = [oppSpeakerOneID, oppSpeakerOneScore, roundID, oppSpeakerTwoID, oppSpeakerTwoScore, roundID, oppSpeakerThreeID, oppSpeakerThreeScore, roundID]
   let oppScoreInsertResult = await sails.sendNativeQuery(oppScoreInsertQuery, oppScoreInsertQueryValues);

   let adjQuery = `SELECT adjId from matchups WHERE matchupId = $1`;
   let adjQueryValues = [matchupID];
   let adjResult = await sails.sendNativeQuery(adjQuery,adjQueryValues);
   let adjID = adjResult["rows"][0]["adjID"];

   let govAdjScoreQuery = `INSERT INTO adj_scores (adjID, score, roundID) VALUES ($1,$2,$3)`;
   let govAdjScoreQueryValues = [adjID,govAdjScore,roundID];
   let govAdjScoreResult = await sails.sendNativeQuery(govAdjScoreQuery, govAdjScoreQueryValues);

   let oppAdjScoreQuery = `INSERT INTO adj_scores (adjID, score, roundID) VALUES ($1,$2,$3)`;
   let oppAdjScoreQueryValues = [adjID,oppAdjScore,roundID];
   let oppAdjScoreResult = await sails.sendNativeQuery(oppAdjScoreQuery, oppAdjScoreQueryValues);

   return exits.success({
        status: "success"
    });


  }


};
