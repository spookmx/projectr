import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Cities, States } from '../../../lib/collections';

export default class ProfileAccountPasswordCtrl extends Controller {
  constructor() {
    super(...arguments)

    this.subscribe('users', () => []);
    this.helpers({
      user() {
        return Meteor.users.findOne({_id:Meteor.userId()});
      }
    });
    this.loading(true);

    this.$scope.$watch('profileAccountPassword.user', () => {
      if(this.user.emails[0].address){
        this.loading(false);
        this.currentEmail = this.user.emails[0].address;
      }
    });

    this.passwordToggleLabel = 'Show';
    this.passwordToggleShow = false;
    this.passwordToggleLabel1 = 'Show';
    this.passwordToggleShow1 = false;

  }

  passwordToggle(first){
    if(first){
      if(this.passwordToggleShow1){
        this.passwordToggleShow1 = false;
        this.passwordToggleLabel1 = 'Show';
      } else{
        this.passwordToggleShow1 = true;
        this.passwordToggleLabel1 = 'Hide';
      }
    }else{
      if(this.passwordToggleShow){
        this.passwordToggleShow = false;
        this.passwordToggleLabel = 'Show';
      } else{
        this.passwordToggleShow = true;
        this.passwordToggleLabel = 'Hide';
      }
    }

  }

  doneProfileAccountPasswordModal() {
    if(this.currentPassword != this.newPassword){
      this.loading(true);
      Accounts.changePassword(this.currentPassword, this.newPassword, (err, result) => {
        if (err) return this.handleError(err);
        this.loading(false);
        var alertPopup = this.$ionicPopup.alert({
          title: 'Password',
          template: 'Your password has been updated.'
         });
        this.ProfileAccountPassword.hideModal();
      });
    }else{
      this.ProfileAccountPassword.hideModal();
    }
  }

  loading(show){
    show ? this.$ionicLoading.show({template: "<ion-spinner icon='lines' class='spinner-light'></ion-spinner>"}): this.$ionicLoading.hide();
  }

  handleError(error) {
    this.loading(false);
    this.$ionicPopup.alert({
      title: error.reason || 'Failed to change email',
      template: 'Please verify your current password',
      okType: 'button-positive button-clear'
    });
  }

  hideProfileAccountPasswordModal() {
    this.ProfileAccountPassword.hideModal();
  }

}

ProfileAccountPasswordCtrl.$name = 'ProfileAccountPasswordCtrl';
ProfileAccountPasswordCtrl.$inject = ['ProfileAccountPassword', '$ionicPopup', '$log', '$scope', '$rootScope', '$ionicLoading'];
