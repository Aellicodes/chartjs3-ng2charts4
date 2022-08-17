import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private sub: Subscription;
  public data: ChartDataset[] = [
    {data: [], label: 'User 1', borderRadius: 20},
    {data: [], label: 'User 2', borderRadius: 20}
  ];
  public labels: string[] =
  ['January', 'February', 'March', 'April'];
  public options: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.sub = this.http.get('https://api.user.com/api/v3/user_data')
    .subscribe((users: any) => {
      const user1 = users[0];
      const user2 = users[1];
      this.data[0].data = [user1.monday.savedMoney, user1.tuesday.savedMoney, user1.wednesday.savedMoney];
      this.data[1].data = [user2.monday.savedMoney, user2.tuesday.savedMoney, user2.wednesday.savedMoney];
      this.chart.update();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
