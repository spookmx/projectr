import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Products } from '../../../lib/collections';

export default class RequestCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.userId = Meteor.userId();
    this.requestId = this.$stateParams.requestId;
    this.subscribe('products');
    this.request = {};
    this.helpers({
      product(){
        return Products.findOne({_id:this.getReactively('this.request.product')});
      }
    });
    this.callMethod('getRequest', this.requestId, (err, result) => {
      if (err) return this.handleError(err);
      this.handleGetRequest(result);
    });
    this.services = {
      s: 'Sample',
      m: 'Inservice Meal',
      i: 'Stock Inventory',
      c: 'Case Coverage'
    };
  }

  handleGetRequest(result){
    this.request = result;
    this.callMethod('getRepresentative', this.request.representative, (err, result) => {
      if (err) return this.handleError(err);
      this.handleGetRepresentative(result);
    });
  }

  handleGetRepresentative(result){
    this.representative = result;
  }

  cancel(){
    this.cancelPopup = this.$ionicPopup.show({
      template: '<p>No worries, we will let you rep know.</p><textarea ng-model="additionalInfo" placeholder="Add the reason for cancelling the request(optional)." rows="5"></textarea>',
      title: 'Need to cancel your request?',
      scope: this.$scope,
      buttons: [
        { text: 'I changed my mind',
          onTap: function(e) {
            return { proceed:false }
          }
        },
        {
          text: '<b>Cancel Request</b>',
          type: 'button-assertive',
          onTap: function(e) {
            if (!this.scope.additionalInfo) {
              e.preventDefault();
            } else {
              return { proceed:true, additionalInfo:this.scope.additionalInfo }
            }
          }
        }
      ]
    });
    this.cancelPopup.then((result)=>{
      if(result.proceed){
        this.callMethod('cancelRequest', this.request, (err, result) => {
          if (err) return this.handleError(err);
          this.handleCancelRequest(result);
        });
      }else{
        //console.log('User changed his mind');
      }
    });
  }

  handleCancelRequest(result){
    this.$timeout(()=>{this.$state.go('tab.requests')} , 0);
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

RequestCtrl.$name = 'RequestCtrl';
RequestCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$stateParams', '$state', '$timeout'];
