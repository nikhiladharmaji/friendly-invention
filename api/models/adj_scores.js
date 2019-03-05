/**
 * adj_scores.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
    adjID: {
      model: 'adjs'
    },
    roundID: {
      model: 'rounds'
    },  
    score: {
      type: 'number'
    }
    
   

  },

};

