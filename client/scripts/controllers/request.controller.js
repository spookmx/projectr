import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Products, Requests } from '../../../lib/collections';

export default class RequestCtrl extends Controller {
  constructor() {
    super(...arguments);
    Meteor.userId() ? this.userId = Meteor.userId() : this.userId = localStorage.getItem('anonymousUserId');
    this.subscribe('requests', ()=>{
      if(Meteor.userId()){
        return [null];
      }else{
        return [this.userId];
      }
    });

    this.requestId = this.$stateParams.requestId;
    this.subscribe('products');

    this.helpers({
      product(){
        return Products.findOne({_id:this.getReactively('this.request.product')});
      },
      request(){
        return Requests.findOne({_id:this.requestId});
      },
      role(){
        if(this.getReactively('this.request.representative') == this.userId ){
          return 'representative';
        }else{
          return 'requester';
        }
      }
    });

    this.repWatcher = this.$scope.$watchCollection('request', () => {
      if(this.request && this.request.representative){
        this.callMethod('getUserById', this.request.representative, (err, result) => {
          if (err) return this.handleError(err);
          this.handleGetRepresentative(result);
        });
        this.callMethod('getUserById', this.request.requester, (err, result) => {
          if (err) return this.handleError(err);
          this.handleGetRequester(result);
        });
        this.repWatcher();
      }
    });

    this.services = {
      s: 'Sample',
      m: 'Inservice Meal',
      i: 'Stock Inventory',
      c: 'Case Coverage'
    };
  }

  handleGetRepresentative(result){
    this.representative = result;
  }

  handleGetRequester(result){
    if(!result){
      this.requester = {givenName:'Anonymous', familyName:'User'}
    }else{
      this.requester = result;
    }
  }

  cancel(){
    this.cancelPopup = this.$ionicPopup.show({
      template: '<p>No worries, we will let you rep know.</p><textarea ng-model="additionalInfo" placeholder="Add the reason for cancelling the request (optional)." rows="5"></textarea>',
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
        this.callMethod('commentRequest', {comment: result.additionalInfo, requestId:this.requestId}, (err, result) => {
          if (err) return this.handleError(err);
        });
        this.callMethod('updateRequestStatus', {requestId: this.requestId, status:'Cancelled'}, (err, result) => {
          if (err) return this.handleError(err);
          this.handleCancelRequest(result);
        });
      }else{
        //console.log('User changed his mind');
      }
    });
  }

  accept(){
    this.acceptPopup = this.$ionicPopup.show({
      template: '<p>Please review the information provided and add comments if needed.</p><textarea ng-model="additionalInfo" placeholder="Additional comments (optional)." rows="5"></textarea>',
      title: 'Accept request',
      scope: this.$scope,
      buttons: [
        { text: 'Cancel',
          onTap: function(e) {
            return { proceed:false }
          }
        },
        {
          text: '<b>Accept Request</b>',
          type: 'button-positive',
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
    this.acceptPopup.then((result)=>{
      if(result.proceed){
        this.callMethod('commentRequest', {comment: {user:'representative', comment:result.additionalInfo, date: new Date()}, requestId:this.requestId}, (err, result) => {
          if (err) return this.handleError(err);
        });
        this.callMethod('updateRequestStatus', {requestId: this.requestId, status:'Accepted'}, (err, result) => {
          if (err) return this.handleError(err);
          this.handleAcceptRequest(result);
        });
      }else{
        //console.log('User changed his mind');
      }
    });
  }

  completed(){
    this.completePopup = this.$ionicPopup.show({
      template: '<p>Marking the request as completed will enable the requester to evaluate your service.</p>',
      title: 'Mark as completed',
      scope: this.$scope,
      buttons: [
        { text: 'Cancel',
          onTap: function(e) {
            return { proceed:false }
          }
        },
        {
          text: '<b>Confirm</b>',
          type: 'button-positive',
          onTap: function(e) {
            return { proceed:true }
          }
        }
      ]
    });
    this.completePopup.then((result)=>{
      if(result.proceed){
        this.callMethod('updateRequestStatus', {requestId: this.requestId, status:'Completed'}, (err, result) => {
          if (err) return this.handleError(err);
          this.handleCompletedRequest(result);
        });
      }else{
        //console.log('User changed his mind');
      }
    });
  }

  comment(){
    let comment = {comment: this.commentInput, date: new Date()};
    this.request.requester == this.userId ? comment.user = 'requester' : comment.user = 'representative';
    this.callMethod('commentRequest', {comment: comment, requestId:this.requestId}, (err, result) => {
      if (err) return this.handleError(err);
      this.handlecommentRequest(result);
    });
  }

  handlecommentRequest(result){
    this.commentInput = '';
  }

  handleCancelRequest(result){
    this.$timeout(()=>{this.$state.go('tab.requests')} , 0);
  }

  handleCompletedRequest(result){
    this.$timeout(()=>{this.$state.go('tab.requests')} , 0);
  }

  handleAcceptRequest(result){

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
