import { Component, OnInit } from '@angular/core';
import { WorkordersService } from '../workorders.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {

  workorder: any = {
    wo: '' + new Date(),
    wo_id: '' + new Date(),
    monthAndYear: this.workordersService.convertDateToMonth(new Date())
  };

  calendar: any;
  calendar2: any;
  keys: any;
  values: any;
  pairsKeyVal: any[] = [];
  day: any;
  wholeDay: any = [];
  rybnik: any = [];
  bielsko: any = [];
  jastrzebie: any = [];

  constructor(private workordersService: WorkordersService, private http: HttpClient) { }

  ngOnInit() {

    let may = "https://spreadsheets.google.com/feeds/list/1d-oQlT9mqSd4exTYT_qiPWR8K5zonCeQCBhyZSXnhbM/o22ngfp/public/full?alt=json";
    let april = "https://spreadsheets.google.com/feeds/list/1d-oQlT9mqSd4exTYT_qiPWR8K5zonCeQCBhyZSXnhbM/oxjiwhu/public/full?alt=json";

    this.calendar = this.http.get(april)

    this.http.get(april).subscribe(doc => {
      console.log(doc);
      this.calendar2 = doc;
      this.keys = Object.keys(this.calendar2.feed.entry[0]);
      this.values = this.calendar2.feed.entry[0];

      this.keys.forEach(key => {
        if (key.slice(0, 3) === 'gsx' && key.slice(0, 5) != 'gsx$k')
          this.pairsKeyVal.push({ key: key, value: this.values[key].$t })
      });

      // console.log(this.keys, this.values)
      //  console.log(Object.keys(this.calendar2.feed.entry[0]));
      //  console.log(this.pairsKeyVal)
    });
  }



  chooseDay() {
    this.wholeDay = [];
    this.jastrzebie = [];
    this.bielsko = [];
    this.rybnik = [];

    console.log(this.day);
    this.calendar2.feed.entry.forEach((element, index) => {
      if (element[this.day].$t != "" && element['gsx$_bfmpn']) {

        if (element['gsx$_bfmpn'].$t.toUpperCase() === 'BIELSKO HAUS') {
          this.wholeDay.push(this.createObject(this.filterValues(element[this.day].$t),index));
          this.bielsko.push(this.createObject(this.filterValues(element[this.day].$t),index));

        } else if (element['gsx$_bfmpn'].$t.toUpperCase() === 'JASTRZĘBIE POGODA') {
          this.wholeDay.push(this.createObject(this.filterValues(element[this.day].$t),index));
          this.jastrzebie.push(this.createObject(this.filterValues(element[this.day].$t),index));

        } else if (element['gsx$_bfmpn'].$t.toUpperCase() === 'RYBNIK RETZLAFF' || element['gsx$_bfmpn'].$t.toUpperCase() === 'RYBNIK GLIWIŃSKI') {
          this.wholeDay.push(this.createObject(this.filterValues(element[this.day].$t),index));
          this.rybnik.push(this.createObject(this.filterValues(element[this.day].$t),index));

        }
      }

    });
  }

  filterValues(value: string) {
    if (value) {
      return value
        .toUpperCase()
        .replace("BIELSKO BIAŁA ", "BIELSKO-BIAŁA ")
        .replace("BIELSKO ", "BIELSKO-BIAŁA ")
        .replace("BIELSKO BIAŁA ", "BIELSKO-BIAŁA ")
        .replace("JASTRZĘBIE ZDRÓJ ", "JASTRZĘBIE-ZDRÓJ ")
        .replace("JASTRZEBIE ZDROJ ", "JASTRZĘBIE-ZDRÓJ ")
        .replace("JASTRZĘBIE ", "JASTRZĘBIE-ZDRÓJ ")
        .replace("JASTRZEBIE ", "JASTRZĘBIE-ZDRÓJ ")
        .replace("WODZISŁAW ŚLĄSKI ", "WODZISŁAW-ŚLĄSKI ")
        .replace("WODZISŁAW ŚL ", "WODZISŁAW-ŚLĄSKI ")
        .replace("WODZISŁAW ŚL. ", "WODZISŁAW-ŚLĄSKI ")
        .replace("WODZISŁAW ", "WODZISŁAW-ŚLĄSKI ")
        .replace(" UL. ", " ")
        .replace(" UL.", " ")
        .replace(" PON2X ", " PON +DEMONTAŻ ")
        .replace("-PON ", " PON ")
        .replace(" PON-", " PON ")
        .replace(" - PON ", " PON ")
        .replace(" - PON", " PON ")
        .replace(" PON,", " PON ")
        .replace(" PON.", " PON ")
        .replace("_UL_", " ")
        .replace("_", " ")
        .replace(",", " ")
        .replace(" 2X", " +DEMONTAŻ")
        .replace("-ETTH ", " ETTH ")
        .replace(" ETTH-", " ETTH ")
        .replace(" - ETTH ", " ETTH ")
        .replace(" - ETTH", " ETTH ")
        .replace(" - ETTH -", " ETTH ")
        .replace("_ETTH", " ETTH ")
        .replace(" ETTH - ", " ETTH ")
        .replace(" ETTH", " ETTH ")
        .replace(" OS ", " OSIEDLE ")
        .replace(" OS. ", " OSIEDLE ");
    }
  }

  createObject(value: string, index: number){

    let tempObject = {
      value: value,
      index: index,
      city: value.slice(0, value.indexOf(" ", 0)),
      type: '',
      description: '',
      street: '',
     }

     if(value.search(" ETTH ") > 0) {
      tempObject.type = "ETTH";
      tempObject.description = value.slice(value.indexOf(" ETTH ", 0)+5,).trim();
      tempObject.street = value.slice(value.indexOf(" ", 0), value.indexOf(" ETTH ", 0)).trim();

    } else if (value.search(" PON") > 0) {
      tempObject.type = "PON";
      tempObject.description = value.slice(value.indexOf(" PON ", 0)+5,).trim();
      tempObject.street = value.slice(value.indexOf(" ", 0), value.indexOf(" PON ", 0)).trim();

    } else {
      tempObject.type = "Brak Typu";
      tempObject.description = value;
    }

    return tempObject;
  }
}

