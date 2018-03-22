import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CoinmarketapiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CoinmarketapiProvider {

  nemRate: number;
  dimRate: number;
  task: number;

  constructor(public http: Http) {
    this.task = setInterval(this.refreshData.bind(this), 10000);
    this.nemRate = 1;
    this.dimRate = 1;
    this.refreshData();
  }

  refreshData(){
    this.http.get('https://api.coinmarketcap.com/v1/ticker/dimcoin/').map(res => res.json()).subscribe(data => {
      this.dimRate = data[0].price_usd;
    });
    this.http.get('https://api.coinmarketcap.com/v1/ticker/nem/').map(res=> res.json()).subscribe(data=>{
      this.nemRate = data[0].price_usd;
    })
  }

  getExRate(): any {
    return {
      nem2dim: this.nemRate/this.dimRate,
      dimRate: this.dimRate,
      nemRate: this.nemRate
    }
  }
}
