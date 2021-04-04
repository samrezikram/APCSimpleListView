import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout, Text, withStyles, ThemeType, StyleType } from 'react-native-ui-kitten';


import _ from 'lodash';
import moment, { Moment } from 'moment';
import { bind as autobind } from 'lodash-decorators';
import { IIssueJSON } from '@models/app/issue-json.model';


interface IMealCardState {
  propsAreValid: boolean;
  isDebit: boolean;
  secondPartyName: string;
  phoneNumber: string;
}

interface IMealCardProps {
  issue: IIssueJSON;
  onPress?: () => void;
  themedStyle?: StyleType;
}

class MealCardComponent extends React.PureComponent<IMealCardProps, IMealCardState> {
  public state: IMealCardState = {} as IMealCardState;

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
            <View style={styles.mealDetailsAndBasePrice}>
              {/* meal details */}
              <Text category="s1" style={{color: '#FF9819', fontSize: 16}}>
                {`${this.props.issue.title}`}
              </Text>

              {/* base Price */}
              <Text category="c1" style={{fontSize: 8}}>
              {`Base Price : ${this.props.issue.title}`}
              </Text>
            </View>

            {/* Meals plan description */}
            <View style={styles.mealsDesc}>
              <Text category="s1" style={{fontSize: 10}}>{this.props.issue.title}</Text>
            </View>

            <View style={styles.deliveryCharges}>
              <Text category="c1" style={{fontSize: 8}}>{`Delivery Charges : ${this.props.issue.title}`}</Text>
            </View>
            {/* Separator Line */}
            <View style={styles.separator}/>

            <View style={styles.totalCharges}>
              <Text category="c2" style={{fontSize: 8}}>{`Total Charges : `}</Text>

              <View style={styles.weatherDesc}>
                <Text style={[{fontSize: 10}]}>{this.props.issue.title}</Text>
                <Text style={{fontSize: 5, alignItems: 'flex-end'}}>{'  AED'}</Text>

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
  mealDetailsAndBasePrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mealsDesc: {
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  deliveryCharges: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  totalCharges: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  weatherDesc: {
    height: 20,
    marginTop: 4,
    backgroundColor: 'skyblue',
    borderRadius: 20,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
});

// Export Component With Style Props From Theme -----------------
export const MealCard = withStyles(MealCardComponent, (theme: ThemeType) => ({
  cardBorderColor: {
    color: theme['background-basic-color-3']
  }
}));
