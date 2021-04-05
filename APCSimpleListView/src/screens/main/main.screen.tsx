/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import { Dispatch, bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import { SectionList, SectionListData, StyleSheet, View } from 'react-native';
 import { Layout, Text, withStyles, ThemeType } from 'react-native-ui-kitten';
 import { bind as autobind, debounce } from 'lodash-decorators';
 import { NavigationBar } from '@components/navigation-bar/navigation-bar.component';
 
 import { IGlobalState } from '@models/app/global-state.model';
 
 import { IAppScreenProps } from '@interfaces/app-screen-props.interface';
 import { GitHubIssueCard } from '@components/github-issue-card.component';
 import { IAppScreen } from '@interfaces/app-screen.interface';
 import { IIssueJSON } from '@models/app/issue-json.model';
 import { IIssueGroup } from '@models/actions-results.model';
 import { Navigator } from '@navigation/navigator';
 import { ScreenRoute } from '@enums/routes.enum';
 import { IGithubIssueDetailScreenProps } from '@screens/github-issue-detail/github-issue-detail.screen';
 import { IGitHubIssuesRequest } from '@models/http/issue.model';
 import { setGitHubIssuesFilter, loadGitHubIssueItemsAsync } from '@actions/app.actions';

 // Debounce Decorator Function Options
 const debOptions: object = {leading: true, trailing: false};

 interface IMapStateToProps {
   gitHubIssuesFilter: IGitHubIssuesRequest;
   gitHubIssuesItems: IIssueJSON[];
   gitHubIssuesGroups: IIssueGroup[];
   gitHubIssuesTotalCount: number;
   isLoadingGitHubIssuesItems: boolean;
   gitHubIssuesLoadingError: string;
 }

 interface IMapDispatchToProps {
  loadGitHubIssueItemsAsync: typeof loadGitHubIssueItemsAsync;
  setGitHubIssuesFilter: typeof setGitHubIssuesFilter;
 }

 export interface IMainScreenProps extends IAppScreenProps, IMapStateToProps, IMapDispatchToProps {}

 export interface IMainScreenState {}

 class MainScreenComponent extends React.Component<IMainScreenProps, IMainScreenState> implements IAppScreen {

  private readonly testIdPrefix: string = 'main_screen';

   public state: IMainScreenState = {};
   // ---------------------

   componentDidMount(): void {}
   // ---------------------

   @autobind
   private refreshGitHubIssuesItems(): void {
     const newFilters: IGitHubIssuesRequest = this.props.gitHubIssuesFilter || {} as IGitHubIssuesRequest;
     newFilters.page = 1;
     this.props.setGitHubIssuesFilter(newFilters);
     this.props.loadGitHubIssueItemsAsync(false);
   }
   // ---------------------

   @autobind
   @debounce(500, debOptions)
   private fetchMoreGitHubIssuesItems(): void {
     if (!this.props.isLoadingGitHubIssuesItems && (this.props.gitHubIssuesItems || []).length < this.props.gitHubIssuesTotalCount) {
       const newFilters: IGitHubIssuesRequest = this.props.gitHubIssuesFilter || {} as IGitHubIssuesRequest;
       newFilters.page++;
       this.props.setGitHubIssuesFilter(newFilters);
       this.props.loadGitHubIssueItemsAsync();
     }
   }
   // ---------------------

   @autobind
   @debounce(500, debOptions)
   private retryLoadGitHubIssueAfterError(): void {
     this.props.loadGitHubIssueItemsAsync();
   }
   // ---------------------

   @autobind
   private renderGitHubIssuesListFooterComponent(): React.ReactElement {
     return (
       <Text category="p2" appearance="hint" style={styles.mealsListFooter}>
         {'No more Results to show.'}
       </Text>
     );
   }
   // ---------------------

   @autobind
   private extractGithubIssueListItemKey(item: IIssueJSON): string {
     return `${item?.id || 'NA'}_${item?.node_id || 'NA'}`;
   }
   // ---------------------

   @autobind
   @debounce(500, debOptions)
   private goBack(): void {
     Navigator.popScreen(this.props.componentId);
   }
   // ---------------------

   private onGitHubIssueCardPressed(issue: IIssueJSON): () => void {
     return () => {
      if (issue) {
        Navigator.pushScreen(this.props.componentId, ScreenRoute.ISSUE_DETAIL_SCREEN, {
          issueDetail: issue,
        } as IGithubIssueDetailScreenProps);
      }
     };
   }

   @autobind
   private renderGitHubIssuesListSectionHeader(info: { section: SectionListData<IIssueJSON> }): React.ReactElement {
       return (
         <Layout level="2" style={styles.mealsSectionListHeader}>
           <Text category="s1">
             {info.section.date}
           </Text>
         </Layout>
       );
   }
   // ---------------------

   @autobind
   private renderGitHubIssueItem({ item, index }: {item: IIssueJSON | any, index: number}): React.ReactElement {
     return (
       <View style={styles.IssueItemContainer}>
         <GitHubIssueCard
           issue={item}
           onPress={this.onGitHubIssueCardPressed(item)}/>
       </View>
     );
   }
   // ---------------------

   @autobind
   private renderGitHubIssuesList(): React.ReactElement {
    return (
      <View>
        <SectionList
          sections={this.props.gitHubIssuesGroups as Array<SectionListData<IIssueJSON>>}
          renderItem={this.renderGitHubIssueItem as any}
          renderSectionHeader={this.renderGitHubIssuesListSectionHeader}
          stickySectionHeadersEnabled={true}
          keyExtractor={this.extractGithubIssueListItemKey}
          onRefresh={this.refreshGitHubIssuesItems}
          refreshing={(this.props.isLoadingGitHubIssuesItems && this.props.gitHubIssuesFilter.page == 1) ? true : false}
          onEndReached={this.fetchMoreGitHubIssuesItems}
          contentContainerStyle={styles.gitHubIssuesListInnerContainerStyle}
          ListFooterComponent={this.renderGitHubIssuesListFooterComponent}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

   public render(): React.ReactElement {
     return (
       <Layout level="1" style={styles.container}>
         {/* Navigation Bar */}
        <NavigationBar
          title={'Git Repository Issues'}
          renderBackButton={true}
          onBackButtonPress={this.goBack}/>
         {
          this.props.gitHubIssuesItems && this.props.gitHubIssuesGroups.length > 0 ?
          (
            this.renderGitHubIssuesList()
          ) :
          <React.Fragment />
         }
        </Layout>
      );
   }
 }

 // Styles -----------------------------------------------------------------------------------
 const styles: StyleSheet.NamedStyles<any> = StyleSheet.create({
   container: {
     flex: 1
   },
   searchResultsListContainer: {
     flex: 1,
     paddingHorizontal: 16
   },
   mealsSectionListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  mealsListFooter: {
    margin: 16,
    textAlign: 'center'
  },
  IssueItemContainer: {
     marginBottom: 16
   },
   gitHubIssuesListInnerContainerStyle: {
    paddingBottom: 100
   }
 });
 // ------------------------------------------------------------------------------------------


 // Connecting To Redux ----------------------------------------------------------------------
 function mapStateToProps(state: IGlobalState): any {
   return {
     gitHubIssuesFilter: state.app.gitHubIssuesFilter,
     gitHubIssuesItems: state.app.gitHubIssuesItems,
     gitHubIssuesGroups: state.app.gitHubIssuesGroups,
     gitHubIssuesTotalCount: state.app.totalCount,
     isLoadingGitHubIssuesItems: state.app.isLoadingGitHubIssuesItems,
     gitHubIssuesLoadingError: state.app.gitHubIssuesLoadingError
   };
 }
 // -----------

 function mapDispatchToProps(dispatch: Dispatch<any>): any {
   return {
     ...bindActionCreators({
      loadGitHubIssueItemsAsync,
      setGitHubIssuesFilter
     }, dispatch),
   };
 }
 // ----------------------------------

 const MainScreenConnected = connect(mapStateToProps, mapDispatchToProps)(MainScreenComponent);

 export const MainScreen = withStyles(MainScreenConnected, (theme: ThemeType) => ({
   selectedTabHighlighter: {
     backgroundColor: theme['color-primary-500']
   },
   layoutLevel2: {
     backgroundColor: theme['background-basic-color-2'],
   },
   layoutLevel3: {
     backgroundColor: theme['background-basic-color-3'],
   }
 }));