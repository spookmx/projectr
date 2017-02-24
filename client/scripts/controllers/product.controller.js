import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Products } from '../../../lib/collections';

export default class ProductCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.productId = this.$stateParams.productId;
    this.subscribe('products');
    this.helpers({
      selectedProduct() {
        return Products.findOne({_id: this.productId});
      },
    });
  }

  handleError(err) {
    this.$log.error('Showing product error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add product',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

}

ProductCtrl.$name = 'ProductCtrl';
ProductCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$stateParams', '$state'];
