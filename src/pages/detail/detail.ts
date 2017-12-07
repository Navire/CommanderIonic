import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})

export class DetailPage {
  player: any;
  players: any;
  mod = { name: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.player = navParams.get('player');
    this.players = navParams.get('players');
  }

  lifeMore(item,id){
    item.commanderDamage[id].damage += 1;
    item.life -= 1;
  }

  lifeLess(item,id){
    item.commanderDamage[id].damage -= 1;
    item.life += 1;
  }

  commanderIn(){
    this.player.commanderOut += 1;
  }

  commanderOut(){
    this.player.commanderOut -= 1;
  }


  logForm() {
    this.player.name = this.mod.name;
  }
}
