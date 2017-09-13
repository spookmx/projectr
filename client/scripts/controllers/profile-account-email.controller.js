import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Cities, States } from '../../../lib/collections';

export default class ProfileAccountEmailCtrl extends Controller {
  constructor() {
    super(...arguments)

    this.subscribe('users', () => []);
    this.helpers({
      user() {
        return Meteor.users.findOne({_id:Meteor.userId()});
      }
    });
    this.loading(true);

    this.$scope.$watch('profileAccountEmail.user', () => {
      if(this.user.emails[0].address){
        this.loading(false);
        this.currentEmail = this.user.emails[0].address;
      }
    });

  }

  doneProfileAccountEmailModal() {
    if(this.user.emails[0].address != this.currentEmail){
      this.loading(true);
      this.callMethod('changeEmail', { newEmail: this.user.emails[0].address, oldEmail: this.currentEmail }, (err, result) => {
        if (err) return this.handleError(err);
        this.sendVerificationEmail();
      });
    }else{
      this.ProfileAccountEmail.hideModal();
    }

  }

  sendVerificationEmail(){
    this.callMethod('sendVerificationEmail', this.userId, (err, result) => {
      if (err) return this.handleError(err);
      this.loading(false);
      var alertPopup = this.$ionicPopup.alert({
        title: 'Register',
        template: 'An email with instructions to verify your new email address will be sent out shortly.'
       });
      this.ProfileAccountEmail.hideModal();
    });
  }

  loading(show){
    show ? this.$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'}): this.$ionicLoading.hide();
  }

  handleError(error) {
    this.$log.error('Change email error ', error);
    this.loading(false);
    this.ProfileAccountEmail.hideModal();
    this.$ionicPopup.alert({
      title: error.reason || 'Failed to change email',
      template: 'Please try with a different email address',
      okType: 'button-positive button-clear'
    });
  }

  hideProfileAccountEmailModal() {
    this.ProfileAccountEmail.hideModal();
  }

}

ProfileAccountEmailCtrl.$name = 'ProfileAccountEmailCtrl';
ProfileAccountEmailCtrl.$inject = ['ProfileAccountEmail', '$ionicPopup', '$log', '$scope', '$rootScope', '$ionicLoading'];
