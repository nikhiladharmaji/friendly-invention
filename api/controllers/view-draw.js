module.exports = {


  friendlyName: 'View draw',


  description: 'Display "Draw" page.',

  inputs: {
    roundId: {
      type: 'string'
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/draw'
    }

  },


  fn: async function (inputs) {
    let roundId = parseInt(inputs.roundId) || 1;
    let matchupsQuery = `
      SELECT gt.name as govTeamName, ot.name as oppTeamName, a.name as adjName, v.name as venueName 
      FROM matchups m
      INNER JOIN teams as gt ON gt.teamId = m.govTeam
      INNER JOIN teams as ot ON ot.teamId = m.oppTeam
      INNER JOIN adjs a ON a.adjID = m.adjId
      INNER JOIN venues v ON v.venueID = m.venueId
      WHERE m.roundId = $1
    `;
    let matchupsQueryValues = [roundId];
    let matchupsResult = await sails.sendNativeQuery(matchupsQuery, matchupsQueryValues);

    // Respond with view.
    return {
      roundId: roundId,
      matchups: matchupsResult['rows']
    };

  }


};
