module.exports = {


  friendlyName: 'Generate matchups',


  description: '',


  inputs: {
    roundNo: {
      type: "number"
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    let roundNo = inputs.roundNo || 1;
    if(roundNo === 1) {
      let teamsQuery = `SELECT teamId from teams`;
      let teamsQueryValues = [];
      let teamsResult = await sails.sendNativeQuery(teamsQuery, teamsQueryValues);

      let adjsQuery = `SELECT adjID from adjs`;
      let adjsQueryValues = [];
      let adjsResult = await sails.sendNativeQuery(adjsQuery, adjsQueryValues);

      let venuesQuery = `SELECT venueID from venues`;
      let venuesQueryValues = [];
      let venuesResult = await sails.sendNativeQuery(venuesQuery, venuesQueryValues);

      /*
      Shuffling all results to ensure complete randomness
       */
      let teams = _.shuffle(teamsResult.rows);
      let adjs = _.shuffle(adjsResult.rows);
      let venues =  _.shuffle(venuesResult.rows);

      let matches = _.chunk(teams, 2);

      for (let [index, match] of matches.entries()) {
        let govTeam = match[0]['teamId'];
        let oppTeam = match[1]['teamId'];
        let adj = adjs[index]['adjID'];
        let venue = venues[index]['venueID'];

        let matchAddQuery = `INSERT INTO matchups (govTeam, oppTeam, adjId, venueId, roundId) VALUES($1, $2, $3, $4, $5)`
        let matchAddQueryValues = [govTeam, oppTeam, adj, venue, roundNo];
        let matchResult = await sails.sendNativeQuery(matchAddQuery, matchAddQueryValues);
      }
    } else {

      var n = 0;
      var start = 0;
      var i = 0;
      var j = 0;
      var k = 0;

      let adjScoresQuery = "\
        SELECT adjID, SUM(score) AS totalScore \
        FROM adj_scores\
        GROUP BY adjID \
        ORDER BY totalScore DESC\
      ";
      let adjScoresQueryValues = [];
      let adjSortedQueryResult = await sails.sendNativeQuery(adjScoresQuery, adjScoresQueryValues);


      let sortedQuery=`SELECT teamId FROM teams ORDER BY totalPoints DESC, totalSpeaks DESC`;
      let sortedQueryValues=[];
      let sortedQueryResult = await sails.sendNativeQuery(sortedQuery, sortedQueryValues);

      let countQuery=`SELECT COUNT(totalPoints) AS count FROM teams GROUP BY totalPoints`;
      let countQueryValues=[];
      let countQueryResult = await sails.sendNativeQuery(countQuery, countQueryValues);


      let venueSortedQuery = `SELECT venueID FROM venues ORDER BY venueID DESC`;
      let venueSortedQueryValues = [];
      let venueSortedQueryResult = await sails.sendNativeQuery(venueSortedQuery, venueSortedQueryValues);

      for(i= 0; i< roundNo; i++) {
        start = start + j + Math.ceil(n/2);
        n = countQueryResult['rows'][i]['count'];
        for(j=start;j<start+Math.ceil(n/2);j++) {
          let teamsInMatch = [sortedQueryResult['rows'][j]['teamId'], sortedQueryResult['rows'][j+Math.ceil(n/2)]['teamId']];
          let shuffledTeams = _.shuffle(teamsInMatch);

          let matchupInsertQuery = `INSERT INTO matchups (govTeam, oppTeam, adjId, venueId, roundId) VALUES($1, $2, $3, $4, $5)`;
          let matchupInsertQueryValues = [
            shuffledTeams[0],
            shuffledTeams[1],
            adjSortedQueryResult['rows'][k]['adjID'],
            venueSortedQueryResult['rows'][k]['venueID'],
            roundNo
          ];
          let matchupInsertQueryResult = await sails.sendNativeQuery(matchupInsertQuery, matchupInsertQueryValues);
          k++;
        }
      }
    }

    let updateCurrentRoundResult = TournamentConfig.updateCurrentRound(roundNo + 1);
    return;

  }


};
