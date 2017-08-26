import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProfileCtrl extends Controller {
  constructor() {

    super(...arguments);

    this.subscribe('users', () => []);

    this.helpers({
      user() {
        return Meteor.users.findOne({_id:Meteor.userId()});
      }
    });
  }
  loading(show){
    show ? this.$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'}): this.$ionicLoading.hide();
  }
  requestInvite(){
    this.loading(true);
    this.message = {
      email: this.inviteEmail,
      body: 'Come and get your fluity',
    };
    this.callMethod('requestInvite', this.message, (err, result) => {
      if (error) return this.handleError(error);
      var alertPopup = this.$ionicPopup.alert({
        title: 'Invite',
        template: 'Thanks, you will receive an invitation soon.'
       });
       this.inviteEmail = '';
      this.loading(false);
    });
  }
  logout(){
    this.loading(true);
    Meteor.logout(this.loading(false));
  }
  login(){
    this.loading(true);
    Meteor.loginWithPassword(this.loginForm.email, this.loginForm.password, (error)=>{
      if (error) return this.handleError(error);
    });
  }
  handleError(error){
    var alertPopup = this.$ionicPopup.alert({
      title: 'Error',
      template: error.reason
     });
    console.error(error);
    this.loading(false)
  }
  forgotPassword(){
    //ToDo
  }
}

ProfileCtrl.$name = 'ProfileCtrl';
ProfileCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
