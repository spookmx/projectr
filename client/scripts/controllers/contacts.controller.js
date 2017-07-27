import { Controller } from 'angular-ecmascript/module-helpers';
import { _ } from 'meteor/underscore';

export default class ContactsCtrl extends Controller {
  constructor() {
    super(...arguments);
    Meteor.userId() ? this.userId = Meteor.userId() : this.userId = localStorage.getItem('anonymousUserId');

    this.subscribe('users', () => []);
    this.helpers({
      user() {
        return Meteor.users.findOne({_id:this.userId});
      }
    });

  }

}

ContactsCtrl.$name = 'ContactsCtrl';
ContactsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$rootScope'];
