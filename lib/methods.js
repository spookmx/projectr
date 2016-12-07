import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Companies, Products } from '../lib/collections';

Meteor.methods({
  addCompany(companyId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to add company to portfolio.');
    }
    return Meteor.users.update(this.userId, {
      $addToSet: {
        companies: companyId
      }
    });
  }
});
