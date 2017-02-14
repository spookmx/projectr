import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Products } from '../../../lib/collections';

export default class AddProductsCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.searchText = '';

    this.subscribe('products');

    this.helpers({
      products() {
        return Products.find({
          company: this.AddProducts.scope.companyId,
          active: true
        });
      },
      userProducts(){
        return Meteor.user().products;
      }
    });
  }

  filterProducts(criteria, products){
    return function(item){
      let found = false;
      _.each(products, (product)=> {
        product._id == item._id ? found = true : null;
      });
      if(!found && (item.name.match(new RegExp(criteria,'gi')))){
        return item;
      }else{
        return null;
      }
    }
  }

  selectAddProductsModal() {
    let selected = [];
    _.each(this.choice, (product, index)=>{
      product ? selected.push({_id:index, s:false, m:false, i:false, c:false}) : null;
    });
    this.callMethod('addProducts', selected, (err, result) => {
      if (err) return this.handleError(err);
      this.hideAddProductsModal();
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

  hideAddProductsModal() {
    this.AddProducts.hideModal();
  }

}

AddProductsCtrl.$name = 'AddProductsCtrl';
AddProductsCtrl.$inject = ['AddProducts', '$ionicPopup', '$log', '$scope'];
