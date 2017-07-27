import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
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
      template: '<p>Your representative will receive a service request, please provide the information required to contact you.</p><textarea ng-model="additionalInfo" placeholder="Name, hospital, service, hours, etc..." rows="5"></textarea>',
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
      if(!this.$rootScope.currentUserId){
        if(!localStorage.getItem('anonymousUserId')){
          let anonymousUserId = Random.id();
          localStorage.setItem('anonymousUserId', anonymousUserId);
          Accounts.createUser({password:anonymousUserId, email:anonymousUserId+'@'+anonymousUserId+'.com'}, this.updateInitialInfo());
        }else{
          let anonymousUserId = localStorage.getItem('anonymousUserId');
          Meteor.loginWithPassword(anonymousUserId+"@"+anonymousUserId+'.com', anonymousUserId, (error)=>{ console.log(error);});
        }
      }
      this.$scope.$watch('productReps.currentUserId', () => {
        if(this.currentUserId){
          let request = {
            requester: this.currentUserId,
            representative: this.repSelected,
            product: this.product._id,
            location: this.location.cityId,
            service: this.serviceSelected,
            comments: [{user:'requester', comment: additionalInfo, date: new Date()}]
          };
          this.callMethod('addRequest', request, (err, result) => {
            if (err) return this.handleError(err);
            this.handleAddRequest(result);
          });
        }
      });
    });
  }

  updateInitialInfo(){
    this.$scope.$watch('productReps.currentUserId', () => {
      if(this.currentUserId){
        Meteor.users.update(this.currentUserId, {
          $set: {
            givenName: 'Anonymous',
            familyName: 'User',
            roleAttribute: 'pro',
            anonymous: true
          }
        });
      }
    });
  }

  handleAddRequest(result){
    this.$state.go('tab.requests');
    this.$scope.$apply();
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
ProductRepsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$location', '$rootScope', '$state', '$timeout'];
