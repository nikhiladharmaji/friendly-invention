var fs = require('fs');
var csv = require("csvtojson");

module.exports = async function uploadFile (req, res) {
  //var readFile = require('./read-file.js')
  req.file('fileName').upload(async function (err, files) {
    if (err) return res.serverError(err);


    var resJson = res.json({
      message: files.length + ' file(s) uploaded successfully!',
      files: files,
      content: files[0]
    });

    var fileDescriptor = files[0].fd;
    console.log(fileDescriptor);
    const participants = await csv().fromFile(fileDescriptor)

    participants.forEach(async function(participant) {
    var len = Object.keys(participant).length;
    if(len == 2) {
      let adjName = participant.Name;
      let inst = participant.Institution;

      let instIDQuery = `SELECT instID FROM institutions WHERE name = $1`;
      let instIDQueryValues = [inst];
      let instResult = await sails.sendNativeQuery(instIDQuery, instIDQueryValues);
      let instID = instResult["rows"][0]["instID"];

      let adjInsertQuery = `INSERT INTO adjs (name,instID) VALUES($1, $2)`;
      let adjInsertQueryValues = [adjName, instID];
      let result = await sails.sendNativeQuery(adjInsertQuery, adjInsertQueryValues);
    }
    else if(len == 1) {

      let instName = participant["Name"];
      let instInsertQuery = `INSERT INTO institutions (name) VALUES($1)`;
      let instInsertQueryValues = [instName];
      let result = await sails.sendNativeQuery(instInsertQuery, instInsertQueryValues);
    }

    else if(len == 4) {

      let teamName = participant["Team Name"];
      let speakerOneName = participant["Speaker One Name"];
      let speakerTwoName = participant["Speaker Two Name"];
      let instName = participant["Institution"];

      let instIDQuery = `SELECT instID FROM institutions WHERE name = $1`;
      let instIDQueryValues = [instName];
      let instResult = await sails.sendNativeQuery(instIDQuery, instIDQueryValues);
      let instID = instResult["rows"][0]["instID"];

      let teamInsertQuery = `INSERT INTO teams (name, instID) VALUES($1,$2)`;
      let teamInsertQueryValues = [teamName, instID];
      let teamInsertResult = await sails.sendNativeQuery(teamInsertQuery, teamInsertQueryValues);

      let teamIDQuery = `SELECT teamId from teams where name = $1`;
      let teamIDQueryValues = [teamName];
      let teamIDResult = await sails.sendNativeQuery(teamIDQuery, teamIDQueryValues);
      let teamID = teamIDResult["rows"][0]["teamId"];

      let speakerOneInsertQuery = `INSERT INTO speakers (name, teamId) VALUES($1,$2)`;
      let speakerOneInsertQueryValues = [speakerOneName,teamID];
      let speakerOneInsertResult = await sails.sendNativeQuery(speakerOneInsertQuery, speakerOneInsertQueryValues);

      let speakerTwoInsertQuery = `INSERT INTO speakers (name, teamId) VALUES($1,$2)`;
      let speakerTwoInsertQueryValues = [speakerTwoName,teamID];
      let speakerTwoInsertResult = await sails.sendNativeQuery(speakerTwoInsertQuery, speakerTwoInsertQueryValues);

    }

    });


  });
}