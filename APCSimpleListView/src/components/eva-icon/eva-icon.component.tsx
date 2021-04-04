import React from 'react';
import { Image, ImageStyle, StyleProp, ImageProps, ImageSourcePropType } from 'react-native';
import { withStyles, ThemedComponentProps, ThemeType } from 'react-native-ui-kitten';

type IconColor = 'basic' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'info' | 'warning' | 'danger' | 'hint' | 'black' | 'white';

export interface IEvaIconProps extends ThemedComponentProps {
  name: EvaIconName;
  fill?: boolean;
  color?: IconColor;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

const EvaIconComponent = (props: IEvaIconProps): React.ReactElement<ImageProps> => {
  const imageSource: ImageSourcePropType = props.fill ? IconFiles[props.name].fill : IconFiles[props.name].outline;
  const style: StyleProp<ImageStyle> = { width: props.size ? props.size : 32, height: props.size ? props.size : 32 };
  switch (props.color) {
    case 'basic': style.tintColor = props.themedStyle.basic.tintColor; break;
    case 'primary': style.tintColor = props.themedStyle.primary.tintColor; break;
    case 'secondary': style.tintColor = props.themedStyle.secondary.tintColor; break;
    case 'tertiary': style.tintColor = props.themedStyle.tertiary.tintColor; break;
    case 'success': style.tintColor = props.themedStyle.success.tintColor; break;
    case 'info': style.tintColor = props.themedStyle.info.tintColor; break;
    case 'warning': style.tintColor = props.themedStyle.warning.tintColor; break;
    case 'danger': style.tintColor = props.themedStyle.danger.tintColor; break;
    case 'hint': style.tintColor = props.themedStyle.hint.tintColor; break;
    case 'black': style.tintColor = 'black'; break;
    case 'white': style.tintColor = 'white'; break;
    default: style.tintColor = props.themedStyle.basic.tintColor;
  }
  return <Image style={{ ...props.style as object, ...style}} source={imageSource} />;
};

export const EvaIcon = withStyles(EvaIconComponent, (theme: ThemeType) => ({
  basic: { tintColor: theme['text-basic-color'] },
  primary: { tintColor: theme['color-primary-500'] },
  secondary: { tintColor: theme['color-secondary-500'] },
  tertiary: { tintColor: theme['color-tertiary-500'] },
  success: { tintColor: theme['color-success-500'] },
  info: { tintColor: theme['color-info-500'] },
  warning: { tintColor: theme['color-warning-500'] },
  danger: { tintColor: theme['text-danger-color'] },
  hint: { tintColor: theme['text-hint-color'] }
}));

export const EvaIconGenerator = (name: EvaIconName, fill: boolean = true, style: StyleProp<ImageStyle> = {}) => {
  return () => {
    const imageSource: ImageSourcePropType = fill ? IconFiles[name].fill : IconFiles[name].outline;
    return <Image source={imageSource} style={style} />;
  };
};

export enum EvaIconName {
  GITHUB = 'github',
  INFO = 'info',
}

const IconFiles = {
  [EvaIconName.GITHUB]: {
    fill: require('@assets/icons/eva/github.png'),
    outline: require('@assets/icons/eva/github-outline.png')
  },

  [EvaIconName.INFO]: {
    fill: require('@assets/icons/eva/info.png'),
    outline: require('@assets/icons/eva/info-outline.png')
  },
};
