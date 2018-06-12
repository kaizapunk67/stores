import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormControl,FormGroup,Validator, FormBuilder, Validators} from '@angular/forms';
import {locators} from '../../shared/details';
import { CatalogService } from '../../shared/catalog.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit  {
  length:number;
  stores:locators;
  cite:string[]=[];
  cityFilteredOptions: Observable<string[]>; 
  name:FormControl = new FormControl();
  filteredOptions: Observable<string[]>;
  locations:any[]=[]
  locLength:number=0;
  constructor(
    public dialogRef: MatDialogRef<StoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private httpclient:HttpClient,private service:CatalogService) { }

    onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){
    this.service.getStores()
    .subscribe((data:locators)=>{
        this.stores=data,
        (console.log(this.stores))
        this.length=this.stores.length,
        console.log("length"+this.length)
        for(let i=0;i<this.length;i++)
        {
          this.cite.push(this.stores[i].city)
        }
        console.log(this.cite)
       }
    )
    this.cityFilteredOptions = this.name.valueChanges
    .pipe(
    startWith(''),
    map(val => this.CityFilter(val))
);
    
  }
  
 
CityFilter(val: string): string[] {
if (this.cite) {
return this.cite.filter(option =>
option.toLowerCase().includes(val.toLowerCase()));
}
}
onNoClick2(option){
  for(let i=0;i<this.length;i++)
        {
          if(this.stores[i].city == option)
          {
            this.locations = this.stores[i].places;
            this.locLength=this.locations.length
          }
        }
        
}
}

