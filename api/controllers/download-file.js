module.exports = {

// inputs: {
//     fileID: {
//     	type: 'number',
//     	required: true
//     }

//  },


fn: function() {


		var express = require('express');

        // this.res.setHeader('Content-disposition: 'attachment; filename=sample.csv');
        // this.res.setHeader('Content-type', 'text/csv');
		var filePath = "/Users/nikhiladharmaji/workspace/friendly-invention/.tmp/uploads/sample.csv"; // Or format the path using the `id` rest param
		var fileName = "sample.csv"; // The default name the browser will use

		this.res.download(filePath, fileName);
  
}


};	