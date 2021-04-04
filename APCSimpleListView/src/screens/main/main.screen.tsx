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
 import { bind as autobind } from 'lodash-decorators';
 import { NavigationBar } from '@components/navigation-bar/navigation-bar.component';
 
 import { loadMealsListAsync } from '@actions/app.actions';
 import { IGlobalState } from '@models/app/global-state.model';
 
 import { IAppScreenProps } from '@interfaces/app-screen-props.interface';
 import { MealCard } from '@components/meal-card.component';
 import { IAppScreen } from '@interfaces/app-screen.interface';
 import { IIssueJSON } from '@models/app/issue-json.model';
 import { IIssueGroup } from '@models/actions-results.model';
 import { Navigator } from '@navigation/navigator';
 import { ScreenRoute } from '@enums/routes.enum';
 import { IGithubIssueDetailScreenProps } from '@screens/github-issue-detail/github-issue-detail.screen';

 // Debounce Decorator Function Options
 const debOptions: object = {leading: true, trailing: false};
 
 interface IMapStateToProps {
   mealsList: IIssueJSON[];
   isLoadingMealList: boolean;
   mealsGroup: IIssueGroup[];
 }
 
 interface IMapDispatchToProps {
   loadMealsListAsync: typeof loadMealsListAsync;
 }

 export interface IMainScreenProps extends IAppScreenProps, IMapStateToProps, IMapDispatchToProps {}

 export interface IMainScreenState {
 }


 class MainScreenComponent extends React.Component<IMainScreenProps, IMainScreenState> implements IAppScreen {

   public state: IMainScreenState = {
   };

   componentDidMount(): void {
     this.props.loadMealsListAsync();
   }
   // ---------------------

   @autobind
   private renderMealsListFooterComponent(): React.ReactElement {
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

   private onMealCardPressed(issue: IIssueJSON): () => void {
     return () => {
      if (issue) {
        Navigator.pushScreen(this.props.componentId, ScreenRoute.ISSUE_DETAIL_SCREEN, {
          issueDetail: issue,
        } as IGithubIssueDetailScreenProps);
      }
     };
   }

   @autobind
   private renderMealsListSectionHeader(info: { section: SectionListData<IIssueJSON> }): React.ReactElement {
       return (
         <Layout level="2" style={styles.mealsSectionListHeader}>
           <Text category="s1">
             {info.section.mealType}
           </Text>
         </Layout>
       );
   }
   // ---------------------

   @autobind
   private renderMealItem({ item, index }: {item: IIssueJSON | any, index: number}): React.ReactElement {
     return (
       <View style={styles.mealItemContainer}>
         <MealCard
           issue={item}
           onPress={this.onMealCardPressed(item)}/>
       </View>
     );
   }
   // ---------------------

   @autobind
   private renderMealsList(): React.ReactElement {
    return (
      <View>
        <SectionList
          sections={this.props.mealsGroup as Array<SectionListData<IIssueJSON>>}
          renderItem={this.renderMealItem as any}
          renderSectionHeader={this.renderMealsListSectionHeader}
          stickySectionHeadersEnabled={true}
          keyExtractor={this.extractGithubIssueListItemKey}
          contentContainerStyle={styles.mealsListInnerContainerStyle}
          ListFooterComponent={this.renderMealsListFooterComponent}
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
          title={'Meals'}
          renderBackButton={false}/>
         {
          this.props.mealsGroup && this.props.mealsGroup.length > 0 ?
          (
            this.renderMealsList()
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
  mealItemContainer: {
     marginBottom: 16
   },
   mealsListInnerContainerStyle: {
    paddingBottom: 100
   }
 });
 // ------------------------------------------------------------------------------------------


 // Connecting To Redux ----------------------------------------------------------------------
 function mapStateToProps(state: IGlobalState): any {
   return {
     issuesList: state.app.issuesList,
     isLoadingMealList: state.app.isLoadingIssuesList,
     mealsGroup: state.app.issuesGroup,
   };
 }
 // -----------

 function mapDispatchToProps(dispatch: Dispatch<any>): any {
   return {
     ...bindActionCreators({
       loadMealsListAsync
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