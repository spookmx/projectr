
import 'angular-animate';
import 'angular-meteor';
import 'angular-meteor-auth';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import { Meteor } from 'meteor/meteor';

//Modules
import TabsCtrl from '../controllers/tabs.controller';

import IntroCtrl from '../controllers/intro.controller';

import LauncherCtrl from '../controllers/launcher.controller';

import SearchCtrl from '../controllers/search.controller';

import ProfileCtrl from '../controllers/profile.controller';
import ProfileRegisterCtrl from '../controllers/profile-register.controller';
import ProfileForgotCtrl from '../controllers/profile-forgot.controller';
import ProfilePortfolioCtrl from '../controllers/profile-portfolio.controller';

import ProfileAccountNameCtrl from '../controllers/profile-account-name.controller';
import ProfileAccountNameService from '../services/profile-account-name.service';

import ProfileAccountRoleCtrl from '../controllers/profile-account-role.controller';
import ProfileAccountRoleService from '../services/profile-account-role.service';

import ProfileAccountEmailCtrl from '../controllers/profile-account-email.controller';
import ProfileAccountEmailService from '../services/profile-account-email.service';

import ProfileAccountPasswordCtrl from '../controllers/profile-account-password.controller';
import ProfileAccountPasswordService from '../services/profile-account-password.service';

import AddCompanyCtrl from '../controllers/add-company.controller';
import AddCompanyService from '../services/add-company.service';

import PortfolioCompanyDirective from '../directives/portfolio-company.directive';
import PortfolioCompanyCtrl from '../controllers/portfolio-company.controller';

import AddProductsCtrl from '../controllers/add-products.controller';
import AddProductsService from '../services/add-products.service';

import EditProductCtrl from '../controllers/edit-product.controller';
import EditProductService from '../services/edit-product.service';

import PortfolioProductDirective from '../directives/portfolio-product.directive';
import PortfolioProductCtrl from '../controllers/portfolio-product.controller';

import ProfileTerritoriesCtrl from '../controllers/profile-territories.controller';

import AddStateCtrl from '../controllers/add-state.controller';
import AddStateService from '../services/add-state.service';

import TerritoriesStateDirective from '../directives/territories-state.directive';
import TerritoriesStateCtrl from '../controllers/territories-state.controller';

import AddCitiesCtrl from '../controllers/add-cities.controller';
import AddCitiesService from '../services/add-cities.service';

import TerritoriesCityDirective from '../directives/territories-city.directive';
import TerritoriesCityCtrl from '../controllers/territories-city.controller';

import SearchProductRepsDirective from '../directives/search-product-reps.directive';
import SearchProductRepsCtrl from '../controllers/search-product-reps.controller';

import SearchSelectLocationCtrl from '../controllers/search-select-location.controller';
import SearchSelectLocationService from '../services/search-select-location.service';

import ShowStateAbbrevDirective from '../directives/show-state-abbrev.directive';
import ShowStateAbbrevCtrl from '../controllers/show-state-abbrev.controller';

import ShowProductCompanyDirective from '../directives/show-product-company.directive';
import ShowProductCompanyCtrl from '../controllers/show-product-company.controller';

import ProfileAccountCtrl from '../controllers/profile-account.controller';

import EditCityCtrl from '../controllers/edit-city.controller';
import EditCityService from '../services/edit-city.service';

import AdminPortfolioCtrl from '../controllers/admin-portfolio.controller';

import AdminCompanyCtrl from '../controllers/admin-company.controller';
import AdminCompanyService from '../services/admin-company.service';

import AdminProductCtrl from '../controllers/admin-product.controller';
import AdminProductService from '../services/admin-product.service';

import AdminTerritoriesCtrl from '../controllers/admin-territories.controller';

import AdminStateCtrl from '../controllers/admin-state.controller';
import AdminStateService from '../services/admin-state.service';

import AdminCityCtrl from '../controllers/admin-city.controller';
import AdminCityService from '../services/admin-city.service';

import ProductCtrl from '../controllers/product.controller';

import ProductRepsDirective from '../directives/product-reps.directive';
import ProductRepsCtrl from '../controllers/product-reps.controller';

import RequestsCtrl from '../controllers/requests.controller';

import RequestItemDirective from '../directives/request-item.directive';
import RequestItemCtrl from '../controllers/request-item.controller';

import RequestCtrl from '../controllers/request.controller';

import ContactsCtrl from '../controllers/contacts.controller';

import ContactsContactDirective from '../directives/contacts-contact.directive';
import ContactsContactCtrl from '../controllers/contacts-contact.controller';

import ContactCtrl from '../controllers/contact.controller';

import RepsProductsDirective from '../directives/reps-products.directive';
import RepsProductsCtrl from '../controllers/reps-products.controller';

import RoutesConfig from '../routes';

const App = 'Projectr';

Angular.module(App, [
  'angular-meteor',
  'angular-meteor.auth',
  'ionic'
]);

new Loader(App)
  .load(TabsCtrl)
  .load(IntroCtrl)
  .load(LauncherCtrl)
  .load(SearchCtrl)

  .load(ProfileCtrl)
  .load(ProfileRegisterCtrl)
  .load(ProfileForgotCtrl)
  .load(ProfilePortfolioCtrl)
  .load(ProfileAccountNameService)
  .load(ProfileAccountNameCtrl)
  .load(ProfileAccountRoleService)
  .load(ProfileAccountRoleCtrl)
  .load(ProfileAccountEmailService)
  .load(ProfileAccountEmailCtrl)
  .load(ProfileAccountPasswordService)
  .load(ProfileAccountPasswordCtrl)

  .load(AddCompanyCtrl)
  .load(AddCompanyService)
  .load(PortfolioCompanyDirective)
  .load(PortfolioCompanyCtrl)
  .load(AddProductsCtrl)
  .load(AddProductsService)
  .load(EditProductCtrl)
  .load(EditProductService)
  .load(PortfolioProductDirective)
  .load(PortfolioProductCtrl)
  .load(ProfileTerritoriesCtrl)
  .load(AddStateCtrl)
  .load(AddStateService)
  .load(TerritoriesStateDirective)
  .load(TerritoriesStateCtrl)
  .load(AddCitiesCtrl)
  .load(AddCitiesService)
  .load(TerritoriesCityDirective)
  .load(TerritoriesCityCtrl)
  .load(SearchProductRepsDirective)
  .load(SearchProductRepsCtrl)
  .load(SearchSelectLocationService)
  .load(SearchSelectLocationCtrl)
  .load(ShowStateAbbrevDirective)
  .load(ShowStateAbbrevCtrl)
  .load(ShowProductCompanyDirective)
  .load(ShowProductCompanyCtrl)
  .load(ProfileAccountCtrl)
  .load(EditCityCtrl)
  .load(EditCityService)
  .load(AdminPortfolioCtrl)
  .load(AdminCompanyCtrl)
  .load(AdminCompanyService)
  .load(AdminProductCtrl)
  .load(AdminProductService)
  .load(AdminTerritoriesCtrl)
  .load(AdminStateCtrl)
  .load(AdminStateService)
  .load(AdminCityCtrl)
  .load(AdminCityService)
  .load(ProductCtrl)
  .load(ProductRepsDirective)
  .load(ProductRepsCtrl)
  .load(RequestsCtrl)
  .load(RequestItemDirective)
  .load(RequestItemCtrl)
  .load(RequestCtrl)
  .load(ContactsCtrl)
  .load(ContactsContactDirective)
  .load(ContactsContactCtrl)
  .load(ContactCtrl)
  .load(RepsProductsDirective)
  .load(RepsProductsCtrl)
  .load(RoutesConfig);

if (Meteor.isCordova) {
  Angular.element(document).on('deviceready', onReady);
}else {
  Angular.element(document).ready(onReady);
}
function onReady() {
  Angular.bootstrap(document, [App]);
}
