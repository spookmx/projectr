import { Meteor } from 'meteor/meteor';
import { Companies, Products } from '../lib/collections';

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

Meteor.publish('companies', function(searchString, filters) {
  const selector = {};

  filters.length ? selector.type = { '$in': filters } : null;

  if (typeof searchString === 'string' && searchString.length) {
    selector.name = {
      $regex: `.*${searchString}.*`,
      $options : 'i'
    };
  }

  return Companies.find(selector, options);
});
