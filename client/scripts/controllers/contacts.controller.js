import { Controller } from 'angular-ecmascript/module-helpers';
import { _ } from 'meteor/underscore';
import { Requests } from '../../../lib/collections';

export default class ContactsCtrl extends Controller {
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
      requests(){
        return Requests.find({status:'Open'});
      }
    });
  }

}

ContactsCtrl.$name = 'ContactsCtrl';
ContactsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$rootScope'];
