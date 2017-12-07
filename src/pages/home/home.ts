import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  players: any[];

  constructor(public navCtrl: NavController, public storage: Storage, public localNotifications: LocalNotifications) {
    this.players=[]; 

    for(let i=0; i<4; i++){
      this.players.push({
        name: 'Player '+i,
        commanderDamage: [],
        commanderOut: 0,
        life: 40,
        death: false,
        id: i,
      });
    }        

    for(let j=0; j<4; j++)
      for(let i=0; i<4; i++)
        this.players[j].commanderDamage.push({id:i,damage:0});                 
  };

  numberPlayers(item){
    this.players=[];

    for(let i=0; i<item; i++){
      this.players.push({
        name: 'Player '+i,
        commanderDamage: [],
        commanderOut: 0,
        life: 40,
        death: false,
        id: i,
      });
    };

    for(let j=0; j<item; j++)
      for(let i=0; i<item; i++)
        this.players[j].commanderDamage.push({id:i,damage:0});
  };

  lifeMore(item,number){
    item.life += number;

    let Msg = '';
    for(let i=0; i<this.players.length; i++)
      Msg+=' '+this.players[i].name.slice(0,3)+': '+this.players[i].life+' ';
    this.localNotifications.schedule({
      id: 1,
      text: Msg
    });  
  };

  lifeLess(item,number){    
    item.life -= number;

    let Msg = '';
    for(let i=0; i<this.players.length; i++)
      Msg+=' '+this.players[i].name.slice(0,3)+' - '+this.players[i].life+' ';

    this.localNotifications.schedule({
      id: 1,
      text: Msg
    });  
  };

  save(){
    let players = JSON.stringify(this.players);
    this.storage.set('1', players);    
  };

  restaurar(){
    this.storage.get('1')
    .then( res => {      
      this.players = JSON.parse(res);
    });      
  };

  playerSelected(player,players){
    this.navCtrl.push(DetailPage,{
      player: player,
      players: players
    })
  };
}
