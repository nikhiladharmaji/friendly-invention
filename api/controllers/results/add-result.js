/*module.exports = {


  friendlyName: 'Add result',


  description: 'Results Submit',


  inputs: {
    matchupID: {
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

  },


  exits: {

  },


  fn: async function (inputs,exits) {

   let matchupID = parseInt(inputs.matchupID);

   let govTeamQuery = `SELECT govTeam from matchups WHERE matchupId = $1`;
   let govTeamQueryValues = [matchupID];
   let govTeamResult = await sails.sendNativeQuery(govTeamQuery, govTeamQueryValues);
   let govTeamID = govTeamResult["rows"][0]["teamID"];

   let oppTeamQuery = `SELECT oppTeam from matchups WHERE matchupId = $1`;
   let oppTeamQueryValues = [matchupID];
   let oppTeamResult = await sails.sendNativeQuery(oppTeamQuery, oppTeamQueryValues);
   let oppTeamID = oppTeamResult["rows"][0]["teamID"];

   let roundQuery = `SELECT roundID from matchups where matchupID = $1`;
   let roundQueryValues = [matchupID];
   let roundResult = await sails.sendNativeQuery(roundQuery, roundQueryValues);
   let roundID = roundResult["rows"][0]["roundID"];

   let govSpeakerQuery = `SELECT speakerID from speakers WHERE teamID = $1`;
   let govSpeakerQueryValues = [govTeamID];
   let govSpeakerResult = await sails.sendNativeQuery(govSpeakerQuery, govSpeakerQueryValues);
   let govSpeakerOneID = govSpeakerResult["rows"][0]["speakerID"];
   let govSpeakerTwoID = govSpeakerResult["rows"][1]["speakerID"];
   let govSpeakerThreeID = govSpeakerResult["rows"][2]["speakerID"];

   let govScoreInsertQuery = `INSERT INTO speaker_scores (speakerID, score, roundID) VALUES($1,$2,$3),($4,$5,$6),($7,$8,$9)`;
   let govScoreInsertQueryValues = [govSpeakerOneID, govSpeakerOneScore, roundID, govSpeakerTwoID, govSpeakerTwoScore, roundID, govSpeakerThreeID, govSpeakerThreeScore, roundID]
   let govScoreInsertResult = await sails.sendNativeQuery(govScoreInsertQuery, govScoreInsertQueryValues);

   let oppSpeakerQuery = `SELECT speakerID from speakers WHERE teamID = $1`;
   let oppSpeakerQueryValues = [oppTeamID];
   let oppSpeakerResult = await sails.sendNativeQuery(oppSpeakerQuery, oppSpeakerQueryValues);
   let oppSpeakerOneID = oppSpeakerResult["rows"][0]["speakerID"];
   let oppSpeakerTwoID = oppSpeakerResult["rows"][1]["speakerID"];
   let oppSpeakerThreeID = oppSpeakerResult["rows"][2]["speakerID"];

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


};*/
