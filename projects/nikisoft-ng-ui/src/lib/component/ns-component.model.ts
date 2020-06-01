import { NsSubscriptionModel } from 'nikisoft-utils';

export enum ComponentModelState {
  DONE = 'DONE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export abstract class NsComponentModel extends NsSubscriptionModel {
  private _state: ComponentModelState = ComponentModelState.DONE;

  private get state(): ComponentModelState {
    return this._state;
  }

  get isDone(): boolean {
    return this.state === ComponentModelState.DONE;
  }

  get isLoading(): boolean {
    return this.state === ComponentModelState.LOADING;
  }

  get isError(): boolean {
    return this.state === ComponentModelState.ERROR;
  }

  startLoading() {
    this._state = ComponentModelState.LOADING;
  }

  loadingFinished() {
    this._state = ComponentModelState.DONE;
  }

  loadingFailed() {
    this._state = ComponentModelState.ERROR;
  }
}
