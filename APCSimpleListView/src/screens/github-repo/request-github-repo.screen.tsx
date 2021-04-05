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
import { SectionListData, StyleSheet, GestureResponderEvent, View } from 'react-native';
import { Layout, Text, withStyles, ThemeType, Input, Button } from 'react-native-ui-kitten';
import { bind as autobind, debounce, memoize } from 'lodash-decorators';
import { EvaIconGenerator, EvaIconName } from '@components/eva-icon/eva-icon.component';

import { loadGitHubIssueItemsAsync } from '@actions/app.actions';
import { IGlobalState } from '@models/app/global-state.model';
import { IInputValidationResult } from '@models/app/validation-results.model';
import { IIssueJSON } from '@models/app/issue-json.model';

import { ScreenRoute } from '@enums/routes.enum';
import { InputValidity } from '@enums/input-validity.enum';


import { Validators } from '@validators/validators';

import { Navigator } from '@navigation/navigator';

import { testPropsOf } from '@utils/test-props-generator.util';

import { IAppScreenProps } from '@interfaces/app-screen-props.interface';
import { IAppScreen } from '@interfaces/app-screen.interface';


import { IMainScreenProps } from '@screens/main/main.screen';
import { LoadingIndicator, LoadingIndicators } from '@components/loading-indicator/loading-indicator.component';
import { ISagaThrownError } from '@models/app/errors.model';

// Debounce Decorator Function Options
const debOptions: object = {leading: true, trailing: false};

interface IMapDispatchToProps {
loadGitHubIssueItemsAsync: typeof loadGitHubIssueItemsAsync;
}

interface IMapStateToProps {
currentOrganization?: string;
currentRepo?: string;
}

export interface IRequestGitHubRepoScreenState {
organization: string;
repo: string;
organizationValidationResult: IInputValidationResult;
repoValidationResult: IInputValidationResult;
}


export interface IRequestGitHubRepoScreenProps extends IAppScreenProps, IMapStateToProps, IMapDispatchToProps {
isLoadingGitHubIssuesItems: boolean;
}



class RequestGitHubRepoScreenComponent extends React.Component<IRequestGitHubRepoScreenProps, IRequestGitHubRepoScreenState> implements IAppScreen {

  public state: IRequestGitHubRepoScreenState = {
    organization: this.props.currentOrganization || '',
    repo: this.props.currentRepo || '',
    organizationValidationResult: Validators.validateUsername(this.props.currentOrganization || ''),
    repoValidationResult: Validators.validateUsername(this.props.currentOrganization || ''),
  };

  organizationInputRef: any = React.createRef();
  repoInputRef: any = React.createRef();


  private readonly testIdPrefix: string = 'request_github_repo_screen';

  constructor(props: any) {
    super(props);
  }
  // ---------------------

  componentDidMount(): void {}
  // ---------------------


  @autobind
  private extractGithubIssueListItemKey(item: IIssueJSON): string {
    return `${item?.id || 'NA'}_${item?.node_id || 'NA'}`;
  }
  // ---------------------

  @autobind
  private onGitHubUsernameInputChanged(inputValue: string): void {
    const githubUsernameAddress: string = inputValue ? inputValue.trim().replace(/ +/g, '') : '';
    const validityResult: IInputValidationResult = Validators.validateUsername(githubUsernameAddress);
    this.setState({
      organization: githubUsernameAddress,
      organizationValidationResult: validityResult,
    });
  }
  // ---------------------

  @autobind
  private onGitHubRepoInputChanged(inputValue: string): void {
    const githubRepoAddress: string = inputValue ? inputValue.trim().replace(/ +/g, '') : '';
    const validityResult: IInputValidationResult = Validators.validateUsername(githubRepoAddress);
    this.setState({
      repo: githubRepoAddress,
      repoValidationResult: validityResult,
    });
  }
  // ---------------------

  @autobind
  private onGitHubAddressInputIconPress(event: GestureResponderEvent): void {
    if (this.repoInputRef && this.repoInputRef.current) {
      this.repoInputRef.current.focus();
    }
  }
  // ---------------------

  @autobind
  @debounce(500, debOptions)
  private confirmDetails(): void {
    this.props.loadGitHubIssueItemsAsync(true, this.state.organization, this.state.repo).promise.then((response: any) => {
      console.log(response);
      Navigator.pushScreen(this.props.componentId, ScreenRoute.MAIN_SCREEN, {} as IMainScreenProps);
    }).catch((error: ISagaThrownError) => {
    });
  }
  // ---------------------

  @autobind
  @memoize
  private renderBrowseGithubRepoIssues(): React.ReactElement {
    return (
      <View style={styles.browseGithubRepoIssues}>
        <Text category="c2" style={styles.screenDescriptionTitle}>
          {'Lets Explore GitHub Repository issues'}
        </Text>
      </View>
    );
  }
  // ---------------------

  @autobind
  private renderUserOrOrganizationField(): React.ReactElement {
    return(
      <React.Fragment>
        <Input
          ref={this.organizationInputRef}
          value={this.state.organization}
          icon={EvaIconGenerator(EvaIconName.GITHUB, true)}
          onIconPress={this.onGitHubAddressInputIconPress}
          caption={this.state.organizationValidationResult.message}
          captionIcon={EvaIconGenerator(EvaIconName.INFO, false)}
          onChangeText={this.onGitHubUsernameInputChanged}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          label={'Your github username or organization'}
          placeholder="USERNAME"
          disabled={this.props.isLoadingGitHubIssuesItems}
          status={this.state.organizationValidationResult.validity === InputValidity.VALID ? 'success' :
                  this.state.organizationValidationResult.validity === InputValidity.INVALID ? 'danger' :
                  undefined}
          {...testPropsOf(this.testIdPrefix, 'github_user_address_input')} />
        <Layout level="2" style={styles.separator} />
      </React.Fragment>
    );
  }
  // ---------------------

  @autobind
  private renderRepositoryField(): React.ReactElement {
    return(
      <React.Fragment>
        <Input
          ref={this.repoInputRef}
          value={this.state.repo}
          style={{marginTop: 50}}
          captionIcon={EvaIconGenerator(EvaIconName.INFO, false)}
          caption={ (this.state.repoValidationResult.validity == InputValidity.VALID) ? this.state.repoValidationResult.message : '' }
          onChangeText={this.onGitHubRepoInputChanged}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          label={'Your Repository address'}
          placeholder="Repository"
          disabled={this.props.isLoadingGitHubIssuesItems}
          status={this.state.repoValidationResult.validity === InputValidity.VALID ? 'success' :
                  this.state.repoValidationResult.validity === InputValidity.INVALID ? 'danger' :
                  undefined}
          {...testPropsOf(this.testIdPrefix, 'github_repo_address_input')} />
        <Layout level="2" style={styles.separator} />
      </React.Fragment>
    );
  }
  // ---------------------

  @autobind
  private renderGetIssuesButton(): React.ReactElement {
    return(
      <Button
        style={styles.getIssuesButton}
        status="primary"
        disabled={(this.state.organizationValidationResult.validity != InputValidity.VALID) || (this.state.repoValidationResult.validity != InputValidity.VALID) || (Validators.isGitURL('git://github.com/' + this.state.organization + '/' + this.state.repo + '.git').validity != InputValidity.VALID) || this.props.isLoadingGitHubIssuesItems}
        onPress={this.confirmDetails}
        {...testPropsOf(this.testIdPrefix, 'get_repository_issues')}>
        {'View Issue'}
      </Button>
    );
  }
  // ---------------------

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

  public render(): React.ReactElement {
    return (
        <Layout level="2" style={styles.container}>
          {
          this.renderBrowseGithubRepoIssues()
          }
          {
            this.renderUserOrOrganizationField()
          }
          {
            this.renderRepositoryField()
          }
          {
            this.renderGetIssuesButton()
          }
          {/* Loading Indicator */}
          <View style={styles.loadingIndicatorContainer}>
          {
            this.props.isLoadingGitHubIssuesItems ? (
              <LoadingIndicator indicator={LoadingIndicators.COLORFUL_PROGRESS_BAR} width={150} autoPlay={true} loop={true}/>
            ) :  <React.Fragment />
          }
        </View>
      </Layout>
    );
  }
}

// Styles -----------------------------------------------------------------------------------
const styles: StyleSheet.NamedStyles<any> = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 64
  },
  browseGithubRepoIssues: {
  width: '100%',
  alignItems: 'center',
  marginBottom: 44,
  justifyContent: 'center'
  },
  screenDescriptionTitle: {
  textAlign: 'center',
  paddingHorizontal: 24,
  marginBottom: 16
  },
  getIssuesButton: {
  // alignSelf: 'center',
  marginVertical: 16
  },
  loadingIndicatorContainer: {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 50
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
    gitHubIssuesItems: state.app.gitHubIssuesItems,
    isLoadingGitHubIssuesItems: state.app.isLoadingGitHubIssuesItems,
    gitHubIssuesGroups: state.app.gitHubIssuesGroups,
  };
}
// -----------

function mapDispatchToProps(dispatch: Dispatch<any>): any {
  return {
    ...bindActionCreators({
      loadGitHubIssueItemsAsync
    }, dispatch),
  };
}
// ----------------------------------

const RequestGitHubRepoScreenConnected = connect(mapStateToProps, mapDispatchToProps)(RequestGitHubRepoScreenComponent);

export const RequestGithubScreen = withStyles(RequestGitHubRepoScreenConnected, (theme: ThemeType) => ({
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