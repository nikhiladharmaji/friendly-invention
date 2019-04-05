/**
 * speaker_scores.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {

   speakerID: {
      model: 'speakers'
    },
    roundID: {
      model: 'rounds'
    },
    score: {
      type:'number'
    }
    
  },

};

