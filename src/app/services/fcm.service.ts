import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotifyService } from '../core/notify.service';

// Import firebase to fix temporary bug in AngularFire
import * as app from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  token;

  constructor(
    private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions,
    private notify: NotifyService
  ) {
    this.getPermission();
    // Bind methods to fix temporary bug in AngularFire
    try {
      const _messaging = app.messaging();
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    } catch {
      e => console.log(e)
    }
  }

makeToast(message){
  this.notify.update(message, 'info');
  console.log(message);
}

getPermission(): Observable<any>  {
  return this.afMessaging.requestToken.pipe(
    tap(token => {
      this.token = token;
      console.log(this.token);
    })
  )
}

showMessages(): Observable<any> {
  return this.afMessaging.messages.pipe(
    tap(msg => {
      const body: any = (msg as any).notification.body;
      this.makeToast(body);
    })
  );
}

sub(topic) {
  console.log(topic);
  this.fun
    .httpsCallable('subscribeToTopic')({ topic, token: this.token })
    .pipe(tap(_ => this.makeToast(`Zapisano, będziesz teraz otrzymywać wiadomości push!`)))
    .subscribe();
}

unsub(topic) {
  this.fun
    .httpsCallable('unsubscribeFromTopic')({ topic, token: this.token })
    .pipe(tap(_ => this.makeToast(`unsubscribed from ${topic}`)))
    .subscribe();
}

}