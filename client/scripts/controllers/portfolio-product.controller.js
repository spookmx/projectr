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
        return Meteor.user().products.filter((product) => product._id == this.productId)[0];
      }
    });
  }
  updateProductServices(){
    this.callMethod('updateProductServices', this.product, (err, result) => {
      if (err) return this.handleError(err);
    });
  }
}

PortfolioProductCtrl.$name = 'PortfolioProductCtrl';
PortfolioProductCtrl.$inject = ['$log', '$scope'];
