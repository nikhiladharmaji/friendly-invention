module.exports = {

 add: function(req, res){
        var adj = {name: 'Nishanth',adjID : 7, instID: 1};
        adjs.create(adj).exec(function(err, result){
            if (err) {
                sails.log.debug('Some error occured ' + err);
                return res.json(500, { error: 'Some error occured' });
            }
            sails.log.debug('Success', JSON.stringify(result));
            return res.json(200, { success: 'Success' });
        });
    }
};
