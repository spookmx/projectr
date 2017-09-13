import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Cities, States } from '../../../lib/collections';

export default class ProfileAccountNameCtrl extends Controller {
  constructor() {
    super(...arguments)

    this.subscribe('users', () => []);
    this.helpers({
      user() {
        return Meteor.users.findOne({_id:Meteor.userId()});
      }
    });

  }

  doneProfileAccountNameModal() {
    Meteor.users.update(this.currentUserId, {
      $set: {
        givenName: this.user.givenName,
        familyName: this.user.familyName,
      }
    }, this.hideProfileAccountNameModal());
  }

  handleError(err) {
    this.$log.error('Adding location error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add location',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  hideProfileAccountNameModal() {
    this.ProfileAccountName.hideModal();
  }

}

ProfileAccountNameCtrl.$name = 'ProfileAccountNameCtrl';
ProfileAccountNameCtrl.$inject = ['ProfileAccountName', '$ionicPopup', '$log', '$scope', '$rootScope'];
