import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


SSR.compileTemplate('resetPassword', Assets.getText('resetPassword.html'));
SSR.compileTemplate('verifyEmail', Assets.getText('verifyEmail.html'));

Accounts.emailTemplates.siteName = 'Fluity';
Accounts.emailTemplates.from = 'Fluity Support <support@getfluity.com>';

Accounts.emailTemplates.verifyEmail = {
   subject() {
      return 'Verify your Fluity email';
   },
   html(user, url) {
      return SSR.render('verifyEmail', {givenName:user.givenName, url:url});
   }
};

Accounts.emailTemplates.resetPassword = {
   subject() {
      return 'Reset password for Fluity';
   },
   html(user, url) {
      return SSR.render('resetPassword', {givenName:user.givenName, url:url});
   }
};
