import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Products } from '../../../lib/collections';

export default class PortfolioProductCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('products');

    this.helpers({
      productSelected(){
        return Products.findOne({_id:this.productId});
      },
      product(){
        return _.findWhere(Meteor.user().products, {_id:this.productId});
      },
      servicesCount(){
        return _.chain(this.getReactively('product')).map((value)=>{ return value === true ? 1 : 0}).reduce((memo, value)=>{ return memo+value }).value()
      }
    });
  }
  editProduct(){
    this.EditProduct.showModal(this.productId);
  }
}

PortfolioProductCtrl.$name = 'PortfolioProductCtrl';
PortfolioProductCtrl.$inject = ['EditProduct', '$log', '$scope'];
