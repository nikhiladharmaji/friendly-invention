module.exports = {


  friendlyName: 'View enter results',


  description: 'Display "Enter results" page.',

  inputs: {
    matchupId: {
      type: 'string'
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/enter-results'
    }

  },


  fn: async function (inputs) {
    let matchupId = parseInt(inputs.matchupId);
    let matchupQuery = `
      SELECT gt.name as govTeamName, gt.teamId as govTeamId, ot.name as oppTeamName, ot.teamId as oppTeamId,
      a.name as adjName, a.adjID, v.name as venueName 
      FROM matchups m
      INNER JOIN teams as gt ON gt.teamId = m.govTeam
      INNER JOIN teams as ot ON ot.teamId = m.oppTeam
      INNER JOIN adjs a ON a.adjID = m.adjId
      INNER JOIN venues v ON v.venueID = m.venueId
      WHERE m.matchupId = $1
    `;
    let matchupQueryValues = [matchupId];
    let matchupResult = await sails.sendNativeQuery(matchupQuery, matchupQueryValues);
    let match = matchupResult['rows'][0];

    let govTeamId = match['govTeamId'];
    let oppTeamId = match['oppTeamId'];
    /*
    Think of a better way to do this in one query
     */
    let speakersGovQuery = `SELECT speakerID, name FROM speakers where teamId = $1`;
    let speakersGovQueryValues = [govTeamId];
    let speakersGovResult = await sails.sendNativeQuery(speakersGovQuery, speakersGovQueryValues); 
    let speakersOppQuery = `SELECT speakerID, name FROM speakers where teamId = $1`;
    let speakersOppQueryValues = [oppTeamId];
    let speakersOppResult = await sails.sendNativeQuery(speakersOppQuery, speakersOppQueryValues); 
    match['govSpeakers'] = speakersGovResult['rows'];
    match['oppSpeakers'] = speakersOppResult['rows'];

    // Respond with view.
    return {
      match: match
    };

  }


};
