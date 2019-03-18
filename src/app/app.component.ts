import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng7-complete-guide';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA8HMrMfXIVYWl_IUhLot6npzzNCusstyQ',
      authDomain: 'udemy-ng-http-7bf8c.firebaseapp.com'
    });
  }
}
