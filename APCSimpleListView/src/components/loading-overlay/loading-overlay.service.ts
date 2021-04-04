import { Keyboard } from 'react-native';
import { Navigator } from '@navigation/navigator';

import { OverlayRoute } from '@enums/routes.enum';

import { ILoadingOverlayProps } from '@overlays/loading-overlay/loading.overlay';

class LoadingOverlayService {

  private static instance: LoadingOverlayService;
  private queueCount: number = 0;
  private componentIdPromise: Promise<string> | undefined;
  private animationDuration: number = 150;

  public _currentOverlayFadeOutFunction: () => void = () => {};

  private constructor() {}

  // Singleton Handling ----------------------------------------------------
  static _getInstance(): LoadingOverlayService {
    if (!LoadingOverlayService.instance) {
      LoadingOverlayService.instance = new LoadingOverlayService();
    }
    return LoadingOverlayService.instance;
  }
  // -----------------------------------------------------------------------

  // Public Methods --------------------------------------------------------
  public show(): void {
    this.queueCount++;
    if (this.queueCount == 1) {
      this.componentIdPromise = new Promise<string>((resolve, reject) => {
        Keyboard.dismiss();
        Navigator.showOverlay(OverlayRoute.LOADING_OVERLAY, {
          animationDuration: this.animationDuration
        } as ILoadingOverlayProps).then((componentId: string) => {
          resolve(componentId);
        }).catch(() => {
          reject(null);
        });
      });
    }
  }
  // --------------------

  public hide(): void {
    if (this.queueCount > 0) {
      this.queueCount--;
    }
    if (this.queueCount === 0 && this.componentIdPromise) {
      this.componentIdPromise.then((componentId: string) => {
        this.fadeOutOverlay().then(() => {
          Navigator.dismissOverlay(componentId);
          this._currentOverlayFadeOutFunction = () => {};
          this.componentIdPromise = undefined;
        });
      }).catch(() => {});
    }
  }
  // --------------------

  private fadeOutOverlay(): Promise<null> {
    return new Promise<null>((resolve, reject) => {
      if (this._currentOverlayFadeOutFunction) {
        this._currentOverlayFadeOutFunction();
        setTimeout(() => {
          resolve(null);
        }, (this.animationDuration + 50));
      } else {
        resolve(null);
      }
    });
  }
  // -----------------------------------------------------------------------
}

export const LoadingService = LoadingOverlayService._getInstance();
