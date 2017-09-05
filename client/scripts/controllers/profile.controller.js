import { Email } from 'meteor/email';
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
      subject: 'You are invited to get Fluity!',
      html: 'Make it easy for healthcare professionals to find your services, sign up at <a href="www.getfluity.com/register">www.getfluity.com/signup</a>'
    };
    this.callMethod('sendEmail', this.message, (error, result) => {
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
    Meteor.logout(()=>{
      this.loading(false);

      //START Login with anonymousUserId =====>
      if(!localStorage.getItem('anonymousUserId')){
        let anonymousUserId = Random.id();
        localStorage.setItem('anonymousUserId', anonymousUserId);
        Accounts.createUser({password:anonymousUserId, email:anonymousUserId+'@'+anonymousUserId+'.com'}, this.updateInitialInfo());
      }else{
        let anonymousUserId = localStorage.getItem('anonymousUserId');
        Meteor.loginWithPassword(anonymousUserId+"@"+anonymousUserId+'.com', anonymousUserId, (error)=>{
           error ? console.log(error) : null;
           console.log(this);
         });
      }
      // END Login with anonymousUserId =====>
    });
  }
  login(){
    this.loading(true);
    Meteor.loginWithPassword(this.loginForm.email, this.loginForm.password, (error)=>{
      if (error) return this.handleError(error);
      this.loading(false);
    });
  }
  sendVerificationEmail(){
    this.callMethod('sendVerificationEmail', this.userId, (err, result) => {
      if (err) return this.handleError(err);
      var alertPopup = this.$ionicPopup.alert({
        title: 'Email Verification',
        template: 'An email with instructions to verify your email address will be sent out shortly.'
       });
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
}

ProfileCtrl.$name = 'ProfileCtrl';
ProfileCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
