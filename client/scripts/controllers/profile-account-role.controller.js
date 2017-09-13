import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Cities, States } from '../../../lib/collections';

export default class ProfileAccountRoleCtrl extends Controller {
  constructor() {
    super(...arguments)

    this.subscribe('users', () => []);
    this.helpers({
      user() {
        return Meteor.users.findOne({_id:Meteor.userId()});
      }
    });

  }

  doneProfileAccountRoleModal() {
    Meteor.users.update(this.currentUserId, {
      $set: {
        roleAttribute: this.user.roleAttribute
      }
    }, (error)=>{
      if(error) return this.handleError(error);
      this.hideProfileAccountRoleModal()
    });
  }

  handleError(error) {
    this.$log.error('Modify role error ', error);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to modify role',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  hideProfileAccountRoleModal() {
    this.ProfileAccountRole.hideModal();
  }

}

ProfileAccountRoleCtrl.$name = 'ProfileAccountRoleCtrl';
ProfileAccountRoleCtrl.$inject = ['ProfileAccountRole', '$ionicPopup', '$log', '$scope', '$rootScope'];
