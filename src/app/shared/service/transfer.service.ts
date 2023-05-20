import { Injectable, TransferState, inject, makeStateKey } from '@angular/core';
import { DeviceService } from './device.service';
import { Observable, of, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  transferState = inject(TransferState);
  deviceSrv = inject(DeviceService);

  transfer<T>(key: string, fn: (...args: any[]) => Observable<T>): Observable<T> {
    const stateKey = makeStateKey<T>(key);
    if (this.transferState.hasKey(stateKey)) {
      const state = this.transferState.get<T | undefined>(stateKey, undefined);
      return of(state!);
    } else {
      const res = fn().pipe(
        tap(json => {
          if (this.deviceSrv.isServer) {
            this.transferState.set(stateKey, json);
          }
        }),
        shareReplay(),
      );
      return res;
    }
  }
}
