import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export interface ILoadingIndicatorState {}
export interface ILoadingIndicatorProps extends IAnimatedLottieViewProps {
  indicator: LoadingIndicators;
  width: number;
}

export class LoadingIndicator extends React.PureComponent<ILoadingIndicatorProps, ILoadingIndicatorState> {

  public state: ILoadingIndicatorState = {};

  constructor(props: ILoadingIndicatorProps) {
    super(props);
  }

  public render(): React.ReactElement {
    let width: number = 0;
    let height: number = 0;
    switch (this.props.indicator) {

      case LoadingIndicators.COLORFUL_PROGRESS_BAR:
        width = this.props.width;
        height = (this.props.width * 9) / 100; // To maintain the animation aspect ratio
        return (
          <View style={{...styles.container, width, height}}>
            <LottieView style={styles.colorfulProgressLoadingIndicator} source={require('@assets/animations/loading_colorful_bar.json')} {...this.props} />
          </View>
        );

      default:
        return <View />;
    }
  }
  // ----------------------------------------------------------------------------------------
}

// Styles -----------------------------------------------------------------------------------
const styles: StyleSheet.NamedStyles<any> = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  bouncyBallsLoadingIndicator: {
    width: '100%'
  },
  colorfulProgressLoadingIndicator: {
    width: '130%'
  },
  redCircleSpinningLoadingIndicator: {
    width: '100%'
  },
  lines3DLoadingIndicator: {
    width: '100%'
  },
  materialLoadingIndicator: {
    width: '100%'
  }
});
// ------------------------------------------------------------------------------------------

export enum LoadingIndicators {
  COLORFUL_PROGRESS_BAR = 'colorful_progress_bar',
}

// Lottie Interfaces ------------------------------------------------------------------------
interface IAnimatedLottieViewProps {
  progress?: number | Animated.Value;
  speed?: number;
  duration?: number;
  loop?: boolean;
  // style?: StyleProp<ViewStyle>;
  imageAssetsFolder?: string;
  hardwareAccelerationAndroid?: boolean;
  resizeMode?: 'cover' | 'contain' | 'center';
  cacheStrategy?: 'strong' | 'weak' | 'none';
  autoPlay?: boolean;
  autoSize?: boolean;
  enableMergePathsAndroidForKitKatAndAbove?: boolean;
  onAnimationFinish ?: (isCancelled: boolean) => void;
}
// -------------------------------------------------------------------------------------------