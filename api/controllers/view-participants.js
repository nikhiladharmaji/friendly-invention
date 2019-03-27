module.exports = {


  friendlyName: 'View participants',


  description: 'Display "Participants" page.',


  exits: {
    success: {
      viewTemplatePath: 'pages/participants'
    }

  },


  fn: async function () {
    let query = `
      SELECT s.name as name, t.name as teamName
      FROM speakers s
      INNER JOIN teams t on t.teamId = s.teamId 
    `;
    let queryValues = []

    let speakersResult = await sails.sendNativeQuery(query, queryValues);

    return {
        speakers: speakersResult['rows']
    };

  }


};
