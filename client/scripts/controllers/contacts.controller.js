import { Controller } from 'angular-ecmascript/module-helpers';
import { _ } from 'meteor/underscore';

export default class ContactsCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('users', () => []);
    this.helpers({
      user() {
        return Meteor.users.findOne({_id:this.getReactively('currentUserId')});
      }
    });

  }

}

ContactsCtrl.$name = 'ContactsCtrl';
ContactsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$rootScope'];
