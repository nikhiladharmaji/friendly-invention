module.exports = {


  friendlyName: 'View display adjs',


  description: 'Display "Display adjs" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/display-adjs'
    }

  },


  fn: async function () {

    let query = `SELECT adjs.adjID, adjs.name, institutions.name AS institution FROM adjs INNER JOIN institutions ON adjs.instID = institutions.instID`;
    let queryValues = [];
    let adjResult = await sails.sendNativeQuery(query, queryValues);

    return {

      adjs: adjResult['rows'],

    };

  }


};
