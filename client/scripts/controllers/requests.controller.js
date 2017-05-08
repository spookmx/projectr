import { Controller } from 'angular-ecmascript/module-helpers';
import { _ } from 'meteor/underscore';
import { Requests } from '../../../lib/collections';

export default class RequestsCtrl extends Controller {
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

    this.helpers({
      open(){
        return Requests.find({status:'Open'});
      },
      accepted(){
        return Requests.find({status:'Accepted'});
      },
      completed(){
        return Requests.find({status:'Completed'});
      },
      cancelled(){
        return Requests.find({status:'Cancelled'});
      },
    });
  }

}

RequestsCtrl.$name = 'RequestsCtrl';
RequestsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$rootScope'];
