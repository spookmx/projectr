import { Meteor } from 'meteor/meteor';
import { Companies, Products, States, Cities, Requests } from '../lib/collections';

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
      products: 1,
      states: 1,
      cities: 1
    }
  });
});

Meteor.publish('products', function() {
  return Products.find({});
});

Meteor.publish('companies', function() {
  return Companies.find({});
});

Meteor.publish('states', function() {
  return States.find({});
});

Meteor.publish('cities', function() {
  return Cities.find({});
});

Meteor.publish('requests', function(anonymousUserId) {
  anonymousUserId ? this.requester = anonymousUserId : this.requester = this.userId;
  return Requests.find({
      $or: [
        { requester: this.requester },
        { representative: this.userId },
      ]
    });
});
