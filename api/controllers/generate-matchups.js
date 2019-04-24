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


      let venueSortedQuery = `SELECT venueID FROM venues ORDER BY venueID DESC`;
      let venueSortedQueryValues = [];
      let venueSortedQueryResult = await sails.sendNativeQuery(venueSortedQuery, venueSortedQueryValues);

      let sortedTeamsQuery=`SELECT teamId, totalPoints, totalSpeaks FROM teams ORDER BY totalPoints DESC, totalSpeaks DESC`;
      let sortedTeamsQueryValues=[];
      let sortedTeamsQueryResult = await sails.sendNativeQuery(sortedTeamsQuery, sortedTeamsQueryValues);

      var groupedTeamsByPoints = _.groupBy(sortedTeamsQueryResult['rows'], 'totalPoints');

      var brackets = Object.keys(groupedTeamsByPoints)
                      .map(function(e){ return parseInt(e) })
                      .sort()
                      .reverse()
                      .map(function(e){ return e.toString() });

      var numMatchups = sortedTeamsQueryResult['rows'].length/2;
      var matchupsGenerated = 0;

      for (let [index,bracket] of brackets.entries()) {
        if(!groupedTeamsByPoints[bracket].length) return false;
        console.log(matchupsGenerated, numMatchups, groupedTeamsByPoints, index);
        /*
        In case there are odd number of teams in a bracket, pull a team from the next bracket
         */
        if(groupedTeamsByPoints[bracket].length % 2 === 1) {
          let nextBracket = brackets[index + 1];
          groupedTeamsByPoints[bracket].push(groupedTeamsByPoints[nextBracket][0]);
          groupedTeamsByPoints[nextBracket].splice(0, 1);
        }

        let teamsToMatch = groupedTeamsByPoints[bracket];
        let totalMatchupsInCurrentBracket = teamsToMatch.length/2;

        for(i = 0; i < totalMatchupsInCurrentBracket; i++) {
          let teamsInMatch = [teamsToMatch[i]['teamId'], teamsToMatch[i+totalMatchupsInCurrentBracket]['teamId']];
          let shuffledTeams = _.shuffle(teamsInMatch);
          let matchupInsertQuery = `INSERT INTO matchups (govTeam, oppTeam, adjId, venueId, roundId) VALUES($1, $2, $3, $4, $5)`;
          let matchupInsertQueryValues = [
            shuffledTeams[0],
            shuffledTeams[1],
            adjSortedQueryResult['rows'][matchupsGenerated]['adjID'],
            venueSortedQueryResult['rows'][matchupsGenerated]['venueID'],
            roundNo
          ];
          matchupsGenerated++;
          let matchupInsertQueryResult = await sails.sendNativeQuery(matchupInsertQuery, matchupInsertQueryValues);
        }

        if(matchupsGenerated === numMatchups) break;
      }

      // let sortedQuery=`SELECT teamId FROM teams ORDER BY totalPoints DESC, totalSpeaks DESC`;
      // let sortedQueryValues=[];
      // let sortedQueryResult = await sails.sendNativeQuery(sortedQuery, sortedQueryValues);

      // let countQuery=`SELECT COUNT(totalPoints) AS count FROM teams GROUP BY totalPoints`;
      // let countQueryValues=[];
      // let countQueryResult = await sails.sendNativeQuery(countQuery, countQueryValues);
      // for(i= 0; i< roundNo; i++) {
      //   start = start + j + Math.ceil(n/2);
      //   n = countQueryResult['rows'][i]['count'];
      //   for(j=start;j<start+Math.ceil(n/2);j++) {
      //     console.log(i, j, n, start);
      //     console.log([sortedQueryResult['rows'][j]['teamId'], sortedQueryResult['rows'][j+Math.ceil(n/2)]['teamId']])
      //     let teamsInMatch = [sortedQueryResult['rows'][j]['teamId'], sortedQueryResult['rows'][j+Math.ceil(n/2)]['teamId']];
      //     let shuffledTeams = _.shuffle(teamsInMatch);

      //     let matchupInsertQuery = `INSERT INTO matchups (govTeam, oppTeam, adjId, venueId, roundId) VALUES($1, $2, $3, $4, $5)`;
      //     let matchupInsertQueryValues = [
      //       shuffledTeams[0],
      //       shuffledTeams[1],
      //       adjSortedQueryResult['rows'][k]['adjID'],
      //       venueSortedQueryResult['rows'][k]['venueID'],
      //       roundNo
      //     ];
      //     let matchupInsertQueryResult = await sails.sendNativeQuery(matchupInsertQuery, matchupInsertQueryValues);
      //     k++;
      //   }
      // }
    }

    let updateCurrentRoundResult = TournamentConfig.updateCurrentRound(roundNo + 1);
    return;

  }


};
