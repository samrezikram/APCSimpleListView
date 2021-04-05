import React from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { ReduxStore } from './../store/redux-store';

import { ThemeHOC } from './../hocs/theme-hoc/theme.hoc';
import { ScreenRoute, ModalRoute, OverlayRoute } from '@enums/routes.enum';
import { setDefaultNavigationOptions } from './default-navigation-options';
import { Navigator } from './navigator';
import { AppInitScreen, IAppInitScreenProps } from '@screens/app-init/app-init.screen';
import { RequestGithubScreen, IRequestGitHubRepoScreenProps } from '@screens/github-repo/request-github-repo.screen';

import { MainScreen } from '@screens/main/main.screen';
import { GitHubIssueDetailScreen } from '@screens/github-issue-detail/github-issue-detail.screen';
export class NavigationInitializer {

  private static navigationInitializerCalled: boolean = false;
  // ----------------------------------

  public static init(): void {
    NavigationInitializer.registerComponent(ScreenRoute.APP_INIT_SCREEN, gestureHandlerRootHOC(AppInitScreen));
    NavigationInitializer.registerComponent(ScreenRoute.REQUEST_GITHUB_REPO_SCREEN, gestureHandlerRootHOC(RequestGithubScreen));
    NavigationInitializer.registerComponent(ScreenRoute.MAIN_SCREEN, gestureHandlerRootHOC(MainScreen));
    NavigationInitializer.registerComponent(ScreenRoute.ISSUE_DETAIL_SCREEN, gestureHandlerRootHOC(GitHubIssueDetailScreen));

    NavigationInitializer.registerAppLaunchedListener();

  }

  private static registerComponent(componentName: ScreenRoute | ModalRoute | OverlayRoute , ScreenComponent: React.ComponentClass<any, any> | React.ComponentType | any): void {
    Navigation.registerComponent(componentName, () => (props: any) => (
      <Provider store={ReduxStore.store}>
        <ThemeHOC>
          <ScreenComponent {...props} />
        </ThemeHOC>
      </Provider>
    ), () => ScreenComponent);
  }

  private static registerAppLaunchedListener(): void {
    Navigation.events().registerAppLaunchedListener(() => {
      setDefaultNavigationOptions();
      Navigator.init();
      Navigator.setAppInitAsRoot({
        initiatedFromFreshAppLaunch: true
      } as IAppInitScreenProps);
    });
  }
}
  // ----------------------------------