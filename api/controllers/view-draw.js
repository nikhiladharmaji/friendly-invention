module.exports = {


  friendlyName: 'View draw',


  description: 'Display "Draw" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/draw'
    }

  },


  fn: async function () {
    let matchupsQuery = `
      SELECT gt.name as govTeamName, ot.name as oppTeamName, a.name as adjName, v.name as venueName 
      FROM matchups m
      INNER JOIN teams as gt ON gt.teamId = m.govTeam
      INNER JOIN teams as ot ON ot.teamId = m.oppTeam
      INNER JOIN adjs a ON a.adjID = m.adjId
      INNER JOIN venues v ON v.venueID = m.venueId
    `;
    let matchupsQueryValues = [];
    let matchupsResult = await sails.sendNativeQuery(matchupsQuery, matchupsQueryValues);

    // Respond with view.
    return {  
      matchups: matchupsResult['rows']
    };

  }


};
