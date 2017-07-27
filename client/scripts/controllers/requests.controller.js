import { Controller } from 'angular-ecmascript/module-helpers';
import { _ } from 'meteor/underscore';
import { Requests } from '../../../lib/collections';

export default class RequestsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.$ionicHistory.clearHistory();

    this.$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
    });

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

    this.subscribe('requests');

    this.helpers({
      open(){
        return Requests.find({status:'Open'}, {sort: {lastUpdatedAt:-1}});
      },
      accepted(){
        return Requests.find({status:'Accepted'}, {sort: {lastUpdatedAt:-1}});
      },
      completed(){
        return Requests.find({status:'Completed'}, {sort: {lastUpdatedAt:-1}});
      },
      cancelled(){
        return Requests.find({status:'Cancelled'}, {sort: {lastUpdatedAt:-1}});
      }
    });
  }

}

RequestsCtrl.$name = 'RequestsCtrl';
RequestsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$rootScope', '$ionicHistory'];
