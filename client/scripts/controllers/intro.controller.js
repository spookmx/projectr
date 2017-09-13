import { Controller } from 'angular-ecmascript/module-helpers';
import { Cities, States } from '../../../lib/collections';
import { Random } from 'meteor/random';

export default class IntroCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.$ionicNavBarDelegate.showBackButton(false);

    let storage = window.localStorage;
    let selectedLocation = JSON.parse(storage.getItem('location'));
    selectedLocation ? this.$rootScope.selectedLocation = selectedLocation : null;


    if(!this.$rootScope.currentUserId){
      if(!localStorage.getItem('anonymousUserId')){
        let anonymousUserId = Random.id();
        localStorage.setItem('anonymousUserId', anonymousUserId);
        Accounts.createUser({password:anonymousUserId, email:anonymousUserId+'@'+anonymousUserId+'.com'}, this.updateInitialInfo());
      }else{
        let anonymousUserId = localStorage.getItem('anonymousUserId');
        Meteor.loginWithPassword(anonymousUserId+"@"+anonymousUserId+'.com', anonymousUserId, (error)=>{ console.log(error);});
      }
    }

    if(this.$rootScope.selectedLocation){
      this.stateSelectedId = this.$rootScope.selectedLocation.stateId;
      if(this.$rootScope.selectedLocation.cityId){
        this.citySelectedId = this.$rootScope.selectedLocation.cityId;
      }else{
        this.citySelectedId = 'all';
      }
    }




    this.searchText = '';
    this.subscribe('cities');
    this.subscribe('states');

    this.helpers({
      states(){
        return States.find({},{
          sort: { name: 1 }
        });
      },
      cities(){
        return Cities.find({state:this.getReactively('stateSelectedId')},{
          sort: { name: 1 }
        });
      },
      stateSelected() {
        return States.findOne({_id:this.getReactively('stateSelectedId')});
      },
      citySelected() {
        return Cities.findOne({_id:this.getReactively('citySelectedId')});
      }
    });

  }

  updateInitialInfo(){
    this.$scope.$watch('intro.currentUserId', () => {
      if(this.currentUserId){
        Meteor.users.update(this.currentUserId, {
          $set: {
            givenName: 'Anonymous',
            familyName: 'User',
            roleAttribute: 'pro',
            anonymous: true
          }
        });
      }
    });
  }

  getStarted(){
    if(this.citySelectedId == "all"){
      this.selectedLocation = {label:this.stateSelected.name, cityName:null, stateId:this.stateSelected._id, cityId:null, stateName:this.stateSelected.name, stateAbbrev:this.stateSelected.abbreviation};
    }else{
      this.selectedLocation = {label:this.citySelected.name+', '+this.stateSelected.abbreviation, cityName:this.citySelected.name, stateId:this.citySelected.state, cityId:this.citySelected._id, stateName:this.stateSelected.name, stateAbbrev:this.stateSelected.abbreviation};
    }
    let storage = window.localStorage;
    storage.setItem('location', JSON.stringify(this.selectedLocation));
    this.$rootScope.selectedLocation = this.selectedLocation;
    this.$timeout(()=>{
      this.$ionicNavBarDelegate.showBackButton(true);
      this.$state.go('tab.search');
    } , 500);
  }

  selectionView(){
    this.$ionicSlideBoxDelegate.next();
  }
}

IntroCtrl.$name = 'IntroCtrl';
IntroCtrl.$inject = ['$log', '$scope', '$rootScope', '$state', '$ionicSlideBoxDelegate', '$timeout', '$ionicNavBarDelegate'];
