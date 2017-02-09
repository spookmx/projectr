import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Products } from '../../../lib/collections';

export default class AdminProductCtrl extends Controller {
  constructor() {
    super(...arguments);
    if(this.AdminProduct.scope.productId){
      //Existing Product
      this.productId = this.AdminProduct.scope.productId;
      this.subscribe('products');
      this.helpers({
        product() {
          return Products.findOne({_id: this.productId});
        },
      });
      this.title = "Update "+this.product.name;
    }else{
      //New Product
      this.product = {
        active:true,
        type:'drug',
        company: this.AdminProduct.scope.companyId
      };
      this.title = "Add New Product";
    }
  }

  saveAdminProductModal() {
    if(this.productId){
      this.callMethod('adminUpdateProduct', this.product, (err, result) => {
        if (err) return this.handleError(err);
        this.hideAdminProductModal();
      });
    }else{
      this.callMethod('adminAddProduct', this.product, (err, result) => {
        if (err) return this.handleError(err);
        this.hideAdminProductModal();
      });
    }
  }

  handleError(err) {
    this.$log.error('Adding product error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add product',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  hideAdminProductModal() {
    this.AdminProduct.hideModal();
  }

}

AdminProductCtrl.$name = 'AdminProductCtrl';
AdminProductCtrl.$inject = ['AdminProduct', '$ionicPopup', '$log', '$scope'];
