import { Platform } from 'react-native';
import { Navigation, Options } from 'react-native-navigation';


import _ from 'lodash';

const platformIsAndroid: boolean = Platform.OS == 'android';

let defaultNavigationOptions: Options = {
  statusBar: {
    drawBehind: false,
    visible: true,
    style: platformIsAndroid ? 'dark' : undefined,
    backgroundColor: 'white',
  },
  topBar: {
    visible: false,
    drawBehind: true
  },
  layout: {
    backgroundColor: '#FFFFFF',
    componentBackgroundColor: 'transparent',
    orientation: ['portrait'],
    direction: 'ltr'
  },
  modal: {
    swipeToDismiss: false
  }
};
// -------------------------

export function getDefaultNavigationOptions(): Options {
  return defaultNavigationOptions;
}
// -------------------------

export function setDefaultNavigationOptions(): void {
  Navigation.setDefaultOptions(defaultNavigationOptions);
}
// -------------------------
// -----------------------------------------------------------------------------------------------------
