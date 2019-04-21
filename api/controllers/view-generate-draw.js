module.exports = {


  friendlyName: 'View generate draw',


  description: 'Display "Generate draw" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/generate-draw'
    }

  },


  fn: async function () {
    let currentRound = await TournamentConfig.getCurrentRound();

    // Respond with view.
    return {
      currentRound: currentRound
    };

  }


};
