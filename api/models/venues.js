/**
 * venues.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
   
    name: {
      type: 'string'
    },

    status: {
      type:'boolean',
      allowNull: true
    },
    
    id: {
      type: 'number',
      columnName: 'venueID',
      required: true,
      autoIncrement: true
    }
   

  },

};

