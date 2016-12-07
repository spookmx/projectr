import { Meteor } from 'meteor/meteor';
import { Companies, Products } from '../lib/collections';

Meteor.users.allow({
  update: function (userId, user) {
    return userId === user._id;
  }
});

Meteor.publish('users', function() {
  return Meteor.users.find({_id: this.userId}, {
    fields: {
      givenName: 1,
      familyName: 1,
      roleAttribute: 1,
      companies: 1,
      products: 1
    }
  });
});

Meteor.publish('products', function(searchString) {
  const selector = {};

  // filters.length ? selector.type = { '$in': filters } : null;

  if (typeof searchString === 'string' && searchString.length) {
    selector.$or = [{
      name_brand:{
        $regex: `.*${searchString}.*`,
        $options : 'i'
      }
    },{
      name_generic:{
        $regex: `.*${searchString}.*`,
        $options : 'i'
      }
    }];
  }

  return Products.find(selector);
});

Meteor.publish('companies', function() {
  return Companies.find({});
});
