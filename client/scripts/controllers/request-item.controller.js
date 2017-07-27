import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Products } from '../../../lib/collections';

export default class RequestItemCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('products');

    this.helpers({
      product(){
        return Products.findOne({_id:this.request.product});
      }
    });

    this.services = {
      s: 'Sample',
      m: 'Inservice Meal',
      i: 'Stock Inventory',
      c: 'Case Coverage'
    };
  }
}

RequestItemCtrl.$name = 'RequestItemCtrl';
RequestItemCtrl.$inject = ['$log', '$scope'];
