import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout, Text, withStyles, ThemeType, StyleType } from 'react-native-ui-kitten';

import { bind as autobind } from 'lodash-decorators';
import { IIssueJSON } from '@models/app/issue-json.model';

import _ from 'lodash';

interface IGitHubIssueCardState {
  propsAreValid: boolean;
}

interface IMealCardProps {
  issue: IIssueJSON;
  onPress?: () => void;
  themedStyle?: StyleType;
}

class GitHubIssueCardComponent extends React.PureComponent<IMealCardProps, IGitHubIssueCardState> {
  public state: IGitHubIssueCardState = {} as IGitHubIssueCardState;

  constructor(props: IMealCardProps) {
    super(props);
  }

  componentDidMount(): void {}
  // ---------------------

  @autobind
  private onCardPressed(): void {
    if (this.props.onPress && typeof this.props.onPress == 'function') {
      this.props.onPress();
    }
  }
  // ---------------------

  render(): React.ReactElement {
    // if (this.props.wallet) {
      return (
        <TouchableOpacity
          activeOpacity={this.props.onPress ? 0.6 : 1}
          onPress={this.onCardPressed}>
          <Layout level="1" style={styles.container}>

            {/* Meals plan details and description */}
            <View style={styles.issueTitle}>
              {/* Issue  Title */}
              <Text category="s1" style={{color: '#FF9819', fontSize: 16}}>
                {`${this.props.issue.title}`}
              </Text>
            </View>

            {/* Assignee */}
            <View>
              <Text category="s1" style={{fontSize: 10}}>{`~ ${this.props.issue.labels[0]?.description ? this.props.issue.assignee.login : 'Anonymous'}`}</Text>
            </View>

            {/* Separator Line */}
            <View style={styles.separator}/>

            <View style={styles.state}>
              <Text category="c2" style={{fontSize: 8}}>{`State : `}</Text>

              <View style={styles.stateDesc}>
                <Text style={[{fontSize: 10}]}>{this.props.issue.state}</Text>
              </View>

            </View>

          </Layout>
        </TouchableOpacity>
      );
  }

}

// Styles ------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden'
  },
  issueTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  state: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  stateDesc: {
    height: 20,
    marginTop: 4,
    backgroundColor: 'skyblue',
    borderRadius: 20,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
});

// Export Component With Style Props From Theme -----------------
export const GitHubIssueCard = withStyles(GitHubIssueCardComponent, (theme: ThemeType) => ({
  cardBorderColor: {
    color: theme['background-basic-color-3']
  }
}));
