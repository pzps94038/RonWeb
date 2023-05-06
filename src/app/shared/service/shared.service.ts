import { Injectable } from '@angular/core';
import { BaseMessageResponse, ReturnCode } from '../api/shared/shared.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  ifSuccess<T extends BaseMessageResponse>(res: T) {
    return res.returnCode === ReturnCode.Success;
  }
}
