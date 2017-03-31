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
      this.handleProductReps(result);
    });
    this.options = {
      s: 'Sample',
      m: 'Inservice Meal',
      i: 'Stock Inventory',
      c: 'Case Coverage'
    }
  }

  requestService(){
    this.requestPopup = this.$ionicPopup.show({
      template: '<p>Your representative will recieve a service request, please provide the information required to contact you.</p><textarea ng-model="additionalInfo" placeholder="Name, hospital, service, hours, etc..." rows="5"></textarea>',
      title: 'Request '+this.options[this.serviceSelected],
      scope: this.$scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Request</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!this.scope.additionalInfo) {
              e.preventDefault();
            } else {
              return this.scope.additionalInfo;
            }
          }
        }
      ]
    });
    this.requestPopup.then((additionalInfo)=>{
      let request = {
        requester: this.$rootScope.currentUserId,
        rep: this.repSelected,
        product: this.product._id,
        location: this.location.cityId,
        service: this.serviceSelected,
        additionalInfo: additionalInfo
      };
      this.callMethod('addRequest', request, (err, result) => {
        if (err) return this.handleError(err);
        this.handleAddRequest(result);
      });
    });
  }

  handleAddRequest(result){
    this.$timeout(()=>{this.$state.go('tab.requests')} , 0);
  }

  handleProductReps(result){
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
ProductRepsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$rootScope', '$state', '$timeout'];
