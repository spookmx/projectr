import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProductRepsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this._ = _;
    this.location = this.$rootScope.selectedLocation;
    this.helpers({
    });
    this.query = {product: this.product, location:this.location};
    this.callMethod('productReps', this.query, (err, result) => {
      if (err) return this.handleError(err);
      this.handleResponse(result);
    });
  }

  handleResponse(result){
    this.reps = result;
    this.reps.length > 1 ? this.repSelected = this.reps[0]._id : null; 
  }

  handleError(err) {
    this.$log.error('Product reps error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to find product reps',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

ProductRepsCtrl.$name = 'ProductRepsCtrl';
ProductRepsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$rootScope'];
