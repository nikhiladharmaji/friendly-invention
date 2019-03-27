module.exports = {


  friendlyName: 'View participants',


  description: 'Display "Participants" page.',


  exits: {
    success: {
      viewTemplatePath: 'pages/participants'
    }

  },


  fn: async function () {
    let speakerQuery = `
      SELECT s.name as name, t.name as teamName
      FROM speakers s
      INNER JOIN teams t on t.teamId = s.teamId 
    `;
    let adjQuery = `
      SELECT name 
      FROM adjs 
    `;
    let QueryValues = []
  

    let speakersResult = await sails.sendNativeQuery(speakerQuery, QueryValues);
    let adjsResult = await sails.sendNativeQuery(adjQuery, QueryValues); 

    return {
        speakers: speakersResult['rows'],
        adjs: adjsResult['rows']
    };

  }


};
