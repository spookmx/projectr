import { Config } from 'angular-ecmascript/module-helpers';
import searchTemplateUrl from '../templates/search.html';
import profileTemplateUrl from '../templates/profile.html';
import profileRegisterTemplateUrl from '../templates/profile-register.html';
import profilePortfolioTemplateUrl from '../templates/profile-portfolio.html';
import tabsTemplateUrl from '../templates/tabs.html';

export default class RoutesConfig extends Config {

  configure() {
    this.$stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: tabsTemplateUrl
      })
      .state('tab.profile', {
        url: '/profile',
        views: {
          'tab-profile': {
            templateUrl: profileTemplateUrl,
            controller: 'ProfileCtrl as profile'
          }
        }
      })
      .state('tab.register', {
        url: '/register',
        views: {
          'tab-profile': {
            templateUrl: profileRegisterTemplateUrl,
            controller: 'ProfileRegisterCtrl as profileRegister'
          }
        }
      })
      .state('tab.portfolio', {
        url: '/portfolio',
        views: {
          'tab-profile': {
            templateUrl: profilePortfolioTemplateUrl,
            controller: 'ProfilePortfolioCtrl as profilePortfolio'
          }
        }
      })
      .state('tab.search', {
        url: '/search',
        views: {
          'tab-search': {
            templateUrl: searchTemplateUrl,
            controller: 'SearchCtrl as search'
          }
        }
      });
    this.$urlRouterProvider.otherwise('tab/search');
  }
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
