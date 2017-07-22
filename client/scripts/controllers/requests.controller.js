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

    this.subscribe('requests', ()=>{
      if(this.currentUserId){
        return [null];
      }else{
        return [this.getReactively('userId')];
      }
    });

    this.helpers({
      open(){
        return Requests.find({status:'Open'});
      },
      accepted(){
        return Requests.find({status:'Accepted'});
      },
      completed(){
        return Requests.find({status:'Completed'});
      },
      cancelled(){
        return Requests.find({status:'Cancelled'});
      },
      userId(){
        if(this.currentUserId){
          return this.currentUserId;
        }else{
          return localStorage.getItem('anonymousUserId');
        }
      }
    });
  }

}

RequestsCtrl.$name = 'RequestsCtrl';
RequestsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$rootScope', '$ionicHistory'];
