App.info({
  id: 'com.getfluity.mobile',
  name: 'Fluity',
  description: 'Get Fluity to interact with healthcare professionals and pharma representatives.',
  author: 'Jose Romero',
  email: 'help@getfluity.com',
  website: 'https://getfluity.com'
});

App.accessRule('https://www.getfluity.com');
App.accessRule('https://fluity.meteorapp.com');

App.setPreference('BackgroundColor', '0xFF6DC2BD');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');

App.icons({
  'iphone_2x': 'icons/ios/Icon-120x120.png',
  'iphone_3x': 'icons/ios/Icon-180x180.png',
  'ipad': 'icons/ios/Icon-76x76.png',
  'ipad_2x': 'icons/ios/Icon-152x152.png',
  'ipad_pro': 'icons/ios/Icon-167x167.png',
  'ios_settings': 'icons/ios/Icon-29x29.png',
  'ios_settings_2x': 'icons/ios/Icon-58x58.png',
  'ios_settings_3x': 'icons/ios/Icon-87x87.png',
  'ios_spotlight': 'icons/ios/Icon-40x40.png',
  'ios_spotlight_2x': 'icons/ios/Icon-80x80.png',
  'android_mdpi': 'icons/android/Icon-48x48.png',
  'android_hdpi': 'icons/android/Icon-72x72.png',
  'android_xhdpi': 'icons/android/Icon-96x96.png',
  'android_xxhdpi': 'icons/android/Icon-144x144.png',
  'android_xxxhdpi': 'icons/android/Icon-192x192.png'
});

App.launchScreens({
  'iphone_2x': 'splash/Splash-640x960.png',
  'iphone5': 'splash/Splash-640x1136.png',
  'iphone6': 'splash/Splash-750x1334.png',
  'iphone6p_portrait': 'splash/Splash-1242x2208.png',
  'ipad_portrait': 'splash/Splash-768x1024.png',
  'ipad_portrait_2x': 'splash/Splash-1536x2048.png',
  'android_mdpi_portrait': 'splash/Splash-162x286-mdpi.png',
  'android_hdpi_portrait': 'splash/Splash-242x428-hdpi.png',
  'android_xhdpi_portrait': 'splash/Splash-322x570-xhdpi.png',
  'android_xxhdpi_portrait': 'splash/Splash-482x854-xxhdpi.png',
  'android_xxxhdpi_portrait': 'splash/Splash-642x1138-xxxhdpi.png',
});
