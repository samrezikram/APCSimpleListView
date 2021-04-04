import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { TopNavigation, TopNavigationProps, Layout, withStyles, ThemeType } from 'react-native-ui-kitten';
import Feather from 'react-native-vector-icons/Feather';


interface INavigationBarProps extends TopNavigationProps {
  renderBackButton?: boolean;
  onBackButtonPress?: () => any;
  backButtonIcon?: 'back' | 'close';
  testID?: string;
  accessibilityLabel?: string;
}

const NavigationBarComponent = (props: INavigationBarProps): React.ReactElement => {

  // Checking If There Should Be a Back Button As Left Control ------
  let leftControlElement: React.ReactElement | undefined;
  if (props && props.renderBackButton && props.onBackButtonPress) {
    const iconColor: string = (props.themedStyle && props.themedStyle.backButton) ? props.themedStyle.backButton.color : '#000000';
    // Create Back Button, left Control Element -----
    leftControlElement = (
      <View>
        <TouchableOpacity
          onPress={props.onBackButtonPress}>
          <Feather name={'arrow-left'} size={32} color={iconColor} />
        </TouchableOpacity>
      </View>
    );
  }

  // Create Default Props -----
  const defaultProps: INavigationBarProps = {
    alignment: 'center',
    leftControl: leftControlElement
  };

  // Background Style -----
  const Background: any = props.appearance == 'control' ? View : Layout;

  // Return Element -----
  return (
    <Background level="1">
      <SafeAreaView>
        <TopNavigation titleStyle={{ fontSize: 19 }} {...{ ...defaultProps, ...props }} />
      </SafeAreaView>
    </Background>
  );
};

// Export Component With Style Props From Theme ----
export const NavigationBar = withStyles(NavigationBarComponent, (theme: ThemeType) => ({
  backButton: {
    color: theme['text-basic-color'],
  }
}));
