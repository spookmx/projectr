import { Controller } from 'angular-ecmascript/module-helpers';
import { _ } from 'meteor/underscore';

export default class ContactsCtrl extends Controller {
  constructor() {
    super(...arguments);

    //Anonymous user auto login
    if(!this.currentUserId){
      if(!localStorage.getItem('anonymousUserId')){
        let anonymousUserId = Random.id();
        localStorage.setItem('anonymousUserId', anonymousUserId);
        Accounts.createUser({password:anonymousUserId, email:anonymousUserId+'@'+anonymousUserId+'.com'}, this.updateInitialInfo());
      }else{
        let anonymousUserId = localStorage.getItem('anonymousUserId');
        Meteor.loginWithPassword(anonymousUserId+"@"+anonymousUserId+'.com', anonymousUserId, (error)=>{ console.log(error);});
      }
    }

    this.subscribe('users', () => []);
    this.helpers({
      user() {
        return Meteor.users.findOne({_id:this.currentUserId});
      }
    });

  }

}

ContactsCtrl.$name = 'ContactsCtrl';
ContactsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$rootScope'];
