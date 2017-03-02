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
    this.options = {
      s: 'Sample',
      m: 'Inservice Meal',
      i: 'Stock Inventory',
      c: 'Case Coverage'
    }
  }

  requestService(){
    let requestPopup = this.$ionicPopup.show({
      template: '<p>Your representative will recieve a service request, please provide your name and relevant information to process it.</p><input type="text" ng-model="productReps.additionalInfo">',
      title: 'Request '+this.options[this.serviceSelected],
      scope: this.$scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Request</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!this.additionalInfo) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return this.additionalInfo;
            }
          }
        }
      ]
    });
    requestPopup.then(function(res) {
      console.log('Tapped!', res);
    });
    let request = {
      requester: this.$rootScope.currentUserId,
      rep: this.repSelected,
      product: this.product._id,
      location: this.location.cityId,
      service: this.serviceSelected,
    };
    console.log(this.serviceSelected);
    // this.callMethod('requestService', request, (err, result) => {
    //   if (err) return this.handleError(err);
    //   this.handleResponse(result);
    // });
  }

  handleResponse(result){
    this.reps = result;
    this.reps.length >= 1 ? this.repSelected = this.reps[0]._id : null;
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
