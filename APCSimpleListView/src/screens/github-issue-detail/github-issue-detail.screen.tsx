import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, withStyles, ThemeType, Button } from 'react-native-ui-kitten';
import { bind as autobind, debounce } from 'lodash-decorators';
import { NavigationBar } from '@components/navigation-bar/navigation-bar.component';

import { IGlobalState } from '@models/app/global-state.model';

import { IAppScreenProps } from '@interfaces/app-screen-props.interface';
import { IAppScreen } from '@interfaces/app-screen.interface';
import { IIssueJSON } from '@models/app/issue-json.model';
import { IIssueGroup } from '@models/actions-results.model';
import { Navigator } from '@navigation/navigator';

import moment from 'moment';

 // Debounce Decorator Function Options
const debOptions: object = {leading: true, trailing: false};

interface IMapStateToProps {
  mealsList: IIssueJSON[];
  isLoadingMealList: boolean;
  mealsGroup: IIssueGroup[];
}

interface IMapDispatchToProps {
}

export interface IGithubIssueDetailScreenProps extends IAppScreenProps, IMapStateToProps, IMapDispatchToProps {
  issueDetail: IIssueJSON;
}

export interface IGithubIssueDetailScreenState {
}

class GithubIssueDetailScreenComponent extends React.Component<IGithubIssueDetailScreenProps, IGithubIssueDetailScreenState> implements IAppScreen {

  public state: IGithubIssueDetailScreenState = {
  };

  @autobind
  private renderRow(): React.ReactElement {
    return (
        <View style={{paddingVertical: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{color: '#FF9819', fontSize: 15, fontWeight: '400'}}>Issue Created At</Text>
              <Text style={{fontSize: 12, paddingVertical: 0}}>{`${moment.utc(this.props.issueDetail.created_at).local().format('YYYY-MM-DD')}`}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{color: '#FF9819', fontSize: 15, fontWeight: '400'}}>Issue Update At</Text>
              <Text style={{fontSize: 12, paddingVertical: 0}}>{`${moment.utc(this.props.issueDetail.updated_at).local().format('YYYY-MM-DD')}`}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center'}} >
              <Text style={{color: '#FF9819', fontSize: 15, fontWeight: '400'}}>Issue Closed At </Text>
              <Text style={{fontSize: 12, paddingVertical: 0}}>{`${moment.utc(this.props.issueDetail.closed_at).local().format('YYYY-MM-DD')}`}</Text>
            </View>
        </View>
    );
}

  componentDidMount(): void {
  }
  // ---------------------

  @autobind
  @debounce(500, debOptions)
  private goBack(): void {
    Navigator.popScreen(this.props.componentId);
  }
  // ---------------------

  public render(): React.ReactElement {
    return (
      <Layout level="1" style={styles.container}>
        {/* Navigation Bar */}
        <NavigationBar
         title={'Issue Detail'}
         renderBackButton={true}
         onBackButtonPress={this.goBack}/>

        <View>
          <Text style={{color: '#FF9819', fontSize: 15, fontWeight: '500'}}>{`${this.props.issueDetail.title}`}</Text>
        </View>
        {/* Separator Line */}
        <View style={styles.separator}/>
        {/* Issue Data */}
        {
          this.renderRow()
        }
        {/* Separator Line */}
        <View style={[styles.separator]}/>
       </Layout>
     );
  }
}

 // Styles -----------------------------------------------------------------------------------
const styles: StyleSheet.NamedStyles<any> = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
    paddingTop: 16,
    paddingRight: 4,
    paddingLeft: 4,
    paddingBottom: 16,
    flexDirection: 'column'
  },
  searchResultsListContainer: {
    flex: 1,
    paddingHorizontal: 16
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  orderButton: {
    marginTop: 50,
    alignSelf: 'center'
  }
});

 // Connecting To Redux ----------------------------------------------------------------------
function mapStateToProps(state: IGlobalState): any {
  return {
  };
}
// -----------

function mapDispatchToProps(dispatch: Dispatch<any>): any {
  return {
    ...bindActionCreators({
    }, dispatch),
  };
}
// ----------------------------------

const GithubIssueDetailScreenConnected = connect(mapStateToProps, mapDispatchToProps)(GithubIssueDetailScreenComponent);

export const GitHubIssueDetailScreen = withStyles(GithubIssueDetailScreenConnected, (theme: ThemeType) => ({
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