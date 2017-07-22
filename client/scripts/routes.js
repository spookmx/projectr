import { Config } from 'angular-ecmascript/module-helpers';
import searchTemplateUrl from '../templates/search.html';
import profileTemplateUrl from '../templates/profile.html';
import profileRegisterTemplateUrl from '../templates/profile-register.html';
import profilePortfolioTemplateUrl from '../templates/profile-portfolio.html';
import profileTerritoriesTemplateUrl from '../templates/profile-territories.html';
import profileAccountTemplateUrl from '../templates/profile-account.html';
import adminPortfolioTemplateUrl from '../templates/admin-portfolio.html';
import adminEditCompanyTemplateUrl from '../templates/admin-edit-company.html';
import adminTerritoriesTemplateUrl from '../templates/admin-territories.html';
import adminEditStateTemplateUrl from '../templates/admin-edit-state.html';
import productTemplateUrl from '../templates/product.html';
import requestsTemplateUrl from '../templates/requests.html';
import requestTemplateUrl from '../templates/request.html';
import contactsTemplateUrl from '../templates/contacts.html';
import contactTemplateUrl from '../templates/contact.html';
import tabsTemplateUrl from '../templates/tabs.html';

export default class RoutesConfig extends Config {

  configure() {
    this.$stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: tabsTemplateUrl,
        controller: 'TabsCtrl as tabs'
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
      .state('tab.territories', {
        url: '/territories',
        views: {
          'tab-profile': {
            templateUrl: profileTerritoriesTemplateUrl,
            controller: 'ProfileTerritoriesCtrl as profileTerritories'
          }
        }
      })
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-profile': {
            templateUrl: profileAccountTemplateUrl,
            controller: 'ProfileAccountCtrl as profileAccount'
          }
        }
      })
      .state('tab.admin-portfolio', {
        url: '/admin-portfolio',
        views: {
          'tab-profile': {
            templateUrl: adminPortfolioTemplateUrl,
            controller: 'AdminPortfolioCtrl as adminPortfolio'
          }
        }
      })
      .state('tab.admin-company', {
        url: '/admin-company/:companyId',
        views: {
          'tab-profile': {
            templateUrl: adminEditCompanyTemplateUrl,
            controller: 'AdminCompanyCtrl as adminCompany'
          }
        }
      })
      .state('tab.admin-territories', {
        url: '/admin-territories',
        views: {
          'tab-profile': {
            templateUrl: adminTerritoriesTemplateUrl,
            controller: 'AdminTerritoriesCtrl as adminTerritories'
          }
        }
      })
      .state('tab.admin-state', {
        url: '/admin-state/:stateId',
        views: {
          'tab-profile': {
            templateUrl: adminEditStateTemplateUrl,
            controller: 'AdminStateCtrl as adminState'
          }
        }
      })
      .state('tab.product', {
        url: '/product/:productId',
        views: {
          'tab-search': {
            templateUrl: productTemplateUrl,
            controller: 'ProductCtrl as product'
          }
        }
      })
      .state('tab.requests', {
        url: '/requests',
        views: {
          'tab-requests': {
            templateUrl: requestsTemplateUrl,
            controller: 'RequestsCtrl as requests'
          }
        }
      })
      .state('tab.request', {
        url: '/request/:requestId',
        views: {
          'tab-requests': {
            templateUrl: requestTemplateUrl,
            controller: 'RequestCtrl as request'
          }
        }
      })
      .state('tab.contacts', {
        url: '/contacts',
        views: {
          'tab-contacts': {
            templateUrl: contactsTemplateUrl,
            controller: 'ContactsCtrl as contacts'
          }
        }
      })
      .state('tab.contact', {
        url: '/contact/:contactId',
        views: {
          'tab-contacts': {
            templateUrl: contactTemplateUrl,
            controller: 'ContactCtrl as contact'
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
