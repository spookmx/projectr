import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class EditProductCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.helpers({
      selectedProduct(){
        return _.findWhere(Meteor.user().products, {_id:this.EditProduct.scope.productId});
      }
    });
  }

  updateProductServices() {
    let newProduct = angular.copy(this.selectedProduct)
    this.callMethod('updateProduct', newProduct, (err, result) => {
      if (err) return this.handleError(err);
    });
  }

  removeProduct(){
    this.$ionicPopup.show({
      template: 'Do you want to remove this product from your portfolio?',
      title: 'Remove Product',
      subTitle: '',
      buttons: [
        { text: 'No' },
        {
          text: '<b>Yes</b>',
          type: 'button-positive',
          onTap: (e)=> {
            this.callMethod('removeProduct', this.selectedProduct, (err, result) => {
              if (err) return this.handleError(err);
            });
            this.EditProduct.hideModal();
          }
        }
      ]
    });
  }

  handleError(err) {
    this.$log.error('Adding products error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add products',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  hideEditProductModal() {
    this.EditProduct.hideModal();
  }

}

EditProductCtrl.$name = 'EditProductCtrl';
EditProductCtrl.$inject = ['EditProduct', '$ionicPopup', '$log', '$scope'];
