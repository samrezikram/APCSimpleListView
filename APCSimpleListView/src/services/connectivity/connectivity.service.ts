import NetInfo, { NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';
import { BehaviorSubject, Observable } from 'rxjs';

class Connectivity {

  private static instance: Connectivity;

  private isConnectedState: boolean = false;
  private isInternetReachableState: boolean | null | undefined = false;
  private lastConnectionType: NetInfoStateType = NetInfoStateType.none;
  private lastIPAddress: any = undefined;

  private connectionStatusChangedBehaviorSubject: BehaviorSubject<null> = new BehaviorSubject<null>(null);

  private constructor() {
    this.listenToNetInfoState();
  }

  // Singleton Handling ----------------------------------------------------
  static _getInstance(): Connectivity {
    if (!Connectivity.instance) {
      Connectivity.instance = new Connectivity();
    }
    return Connectivity.instance;
  }
  // -----------------------------------------------------------------------

  // Private Methods -------------------------------------------------------
  private listenToNetInfoState() {
    NetInfo.addEventListener((state: NetInfoState) => {
      this.isConnectedState = state.isConnected;
      this.isInternetReachableState = state.isInternetReachable;
      if (this.lastConnectionType != state.type) { // connection changed from Wifi to cellular or none.
        this.lastConnectionType = state.type;
        this.connectionStatusChangedBehaviorSubject.next(null);
      } else { // same connection Type e.g:- wifi but different ssid/dhcp
        if (this.lastIPAddress != ((state.details as any).ipAddress)) {
          this.lastIPAddress = (state.details as any).ipAddress;
          this.connectionStatusChangedBehaviorSubject.next(null);
        }
      }
    });
  }
  // -----------------------------------------------------------------------

  // Public Methods --------------------------------------------------------
  public isConnectionReliable(): boolean | null | undefined {
    // TODO Update the library and check the status of isInternetReachable issue on Github:
    // https://github.com/react-native-community/react-native-netinfo/issues/326
    return this.isConnectedState;
    // return (this.isConnectedState && this.isInternetReachableState) ? true : false;
  }
  // --------------------

  public isConnected(): boolean {
    return this.isConnectedState;
  }
  // --------------------

  public isInternetReachable(): boolean | null | undefined {
    return this.isInternetReachableState;
  }
  // --------------------

  public getConnectionType(): NetInfoStateType {
    return this.lastConnectionType;
  }
  // --------------------

  public getIPAddress(): any {
    return this.lastIPAddress;
  }
  // --------------------

  public onConnectionChanged(): Observable<null> {
    return this.connectionStatusChangedBehaviorSubject.asObservable();
  }
  // -----------------------------------------------------------------------
}

export const ConnectivityService = Connectivity._getInstance();
