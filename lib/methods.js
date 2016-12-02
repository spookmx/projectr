import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Companies, Products } from '../lib/collections';

Meteor.methods({
  myMethod(parameter) {
    parameter2 = parameter * 2;
    return parameter2;
  }
});
