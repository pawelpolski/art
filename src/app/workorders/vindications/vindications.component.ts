import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { WorkordersService } from '../workorders.service';
import { ToastrService } from 'ngx-toastr';
import { DataTransferService } from '../../data-transfer.service';

@Component({
  selector: 'vindications',
  templateUrl: './vindications.component.html',
  styleUrls: ['./vindications.component.scss']
})
export class VindicationsComponent implements OnInit {

  arrayBuffer: any;
  file: File;
  type: boolean = false;
  disableToggle: boolean = false;
  excelrow: any = [];
  excelrow2: any = [];
  loggedUserIn: any;
  neededData: any;
  month: string = '';
  vindications: any = [];

  namesFromFirebase = [
    { before: 'KRZEMIŃSKI', after: 'Krzemiński Kamil' },
    { before: 'IZA', after: 'KRZEMIŃSKI KAMIL' },
    { before: 'FRAJ', after: 'Fraj Stefan' },
    { before: 'IZ8', after: 'FRAJ STEFAN' },
    { before: 'GLIWIŃSKI', after: 'Gliwiński Marcin' },
    { before: 'GAWENDA', after: 'Gawenda Grzegorz' },
    { before: 'IZR', after: 'Gawenda Grzegorz' },
    { before: 'KOZŁOWSKI', after: 'Kozłowski Dariusz' },
    { before: 'IZN', after: 'Kozłowski Dariusz' },
    { before: 'SMALCERZ', after: 'Smalcerz Krzysztof' },
    { before: 'IZW', after: 'SMALCERZ KRZYSZTOF' },
    { before: 'SOWIŃSKI', after: 'Sowiński Jakub' },
    { before: 'POGODA', after: 'Pogoda Maciej' },
    { before: 'MALIK', after: 'Malik Krzysztof' },
    { before: 'IZD', after: 'Malik Krzysztof' },
    { before: 'KOZAKIEWICZ', after: 'KOZAKIEWICZ DARIUSZ' },
    { before: 'IZL', after: 'Kozakiewicz Dariusz' },
    { before: 'HAUS', after: 'Haus Sebastian' },
    { before: 'ADAMOWICZ', after: 'Adamowicz Marcin' },
    { before: 'IZO', after: 'Adamowicz Marcin' },
    { before: 'STANISZ', after: 'STANISZ PIOTR' },
    { before: 'WYPIÓR', after: 'WYPIÓR MARCIN' },
    { before: 'IZK', after: 'WYPIÓR MARCIN' },
    { before: 'SZOSTKOWSKI', after: 'WYPIÓR MARCIN' },
    { before: 'RETZLAFF', after: 'RETZLAFF OLAF' },
    { before: 'MICUŁA', after: 'MICUŁA MATEUSZ' },
    { before: 'IZ1', after: 'MICUŁA MATEUSZ' },
    { before: 'CUPER', after: 'CUPER MATEUSZ' },
    { before: 'IZZ', after: 'CUPER MATEUSZ' },
    { before: 'GAWĘDA', after: 'GAWĘDA PRZEMYSŁAW' },
    { before: 'HAUS/MALIK', after: 'HAUS SEBASTIAN,MALIK KRZYSZTOF' },
    { before: 'GLIWIŃSKI/POGODA', after: 'GLIWIŃSKI MARCIN,POGODA MACIEJ' },
    { before: 'MALIK/WYPIÓR', after: 'MALIK KRZYSZTOF,WYPIÓR MARCIN' },
    { before: 'HAUS/WYPIÓR', after: 'MALIK KRZYSZTOF,WYPIÓR MARCIN' },
    { before: 'TARUTIN', after: 'TARUTIN DANIEL' },
    { before: 'IZC', after: 'TARUTIN DANIEL' },
  ];

  constructor(
    private workordersService: WorkordersService,
    private toastrService: ToastrService,
    private dataService: DataTransferService, ) { }

  ngOnInit() {
    this.dataService.loggedUserCurrent.subscribe(doc => {
      this.loggedUserIn = doc;
    });
    this.dataService.neededDataCurrent.subscribe(msg => {
      this.neededData = msg;
    });
    this.month = this.workordersService.convertDateToMonth(new Date());


  }


  Upload() {
    this.disableToggle = true;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.excelrow = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.convertVindicationsTable();

      console.log(this.excelrow, this.excelrow2)
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  incomingfile(event) {
    this.file = event.target.files[0];
    this.Upload();
  }

  convertVindicationsTable() {
    this.excelrow.forEach(row => {
      if (row['Account Number'] 
      && 
      (
        row['City'].toUpperCase() === 'BRZESZCZE' ||
        row['City'].toUpperCase() === 'CZERWIONKA LESZCZYNY' ||
        row['City'].toUpperCase() === 'JASTRZĘBIE ZDRÓJ' ||
        row['City'].toUpperCase() === 'KĘTY' ||
        row['City'].toUpperCase() === 'KNURÓW' ||
        row['City'].toUpperCase() === 'ŁAZISKA GÓRNE' ||
        row['City'].toUpperCase() === 'MIKOŁÓW' ||
        row['City'].toUpperCase() === 'ZABRZE' ||
        row['City'].toUpperCase() === 'ŻORY K. RYBNIKA' ||
        row['City'].toUpperCase() === 'WODZISŁAW ŚLĄSKI' ||
        row['City'].toUpperCase() === 'PSZCZYNA' ||
        row['City'].toUpperCase() === 'RADLIN' ||
        row['City'].toUpperCase() === 'RYDUŁTOWY' ||
        row['City'].toUpperCase() === 'PSZÓW'
        
        ))
      
      {

        this.excelrow2.push(
          {
            id: '',
            wo: 'Windykacja '+this.workordersService.convertDateToMonth(new Date()),
            client: row['Account Number']+'',
            calendar: row['Dispatch Area'],
            city: row['City'],
            street: row['Street Name'],
            home: row['Street Number'],
            locale: row['Unit Number'],
            type: 'Windykacja',
            vin_type: row['usługa wymagana'],
            location: this.convertExcelNamesToFullName(row['kod technika']),
            locations: [this.convertExcelNamesToFullName(row['kod technika'])],
            tech_code: row['kod technika'],
            codes: [],
            vindicationDate: new Date(),
            monthAndYear: this.workordersService.convertDateToMonth(new Date()),
            connectionDate: new Date(),
            date: new Date(),
            desc: '',
            done: false,
            status: 'Przydzielone do technika'

          });
      }
    }
    )
  }


  convertExcelNamesToFullName(techName: string) {
    const found = this.namesFromFirebase.find(item => item.before === techName);
    return found ? found.after.toUpperCase() : techName;
  }

  addAll(){
    this.excelrow2.forEach(item => {
      this.workordersService.addVindications(item)
      .then(res => {
        console.log("Saved: ", item.client)
        this.toastrService.success(item.client, 'Zapisano windykacje',  {
          timeOut: 3000
        });
      })
      .catch(res => {
        console.log("Error: ", item.client)
      });;
    })
  }

  showThisMonth(done) {
    this.workordersService.getVindications("WINDYKACJA", done).subscribe(doc => {
      this.vindications = doc;
      console.log(this.vindications);
    });
  }
  
}
