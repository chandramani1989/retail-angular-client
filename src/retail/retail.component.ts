import { Component, OnInit, ViewChild } from '@angular/core';

import { Pagination } from './Pagination';
import { Item } from './Item';
import { formatDate } from '@angular/common';
import { RetailService } from 'src/services/retail.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.css']
}) 
export class RetailComponent implements OnInit {

  public pageForUser: Pagination;
  public item: Item[] = [];
  modalHeader: string;
  modalpasssword: string;

  
  loader: boolean = false;
  error: string;
  showError: boolean;
  showSuccess:boolean;
  success:string;
  constructor(public dataService: RetailService, private route: ActivatedRoute,
    private router: Router) { }
  getDataService: RetailService;
  

  ngOnInit() {
    this.initPagination();
   
    this.getAllItem();
     
  }
  initPagination() {
    this.pageForUser = new Pagination();
    this.pageForUser.first = 1;
    this.pageForUser.cur = 1;
    this.pageForUser.last = 5;
    this.pageForUser.range = 5;
    this.pageForUser.callbackfunc = "pageForUserFn";
  }
  pageForUserFn(index: number, val: string) {
    switch (val) {
      case 'p': this.pageForUser.getPrev();
        this.getAllItem();
        break;
      case 'n': this.pageForUser.getNext();
        this.getAllItem();
        break;
      case 'm': this.pageForUser.getCurrent(index);
        this.getAllItem();
        break;
    }
  }

  userdetails(event) {

    let dom: any = document.querySelectorAll('a.nav-item');
    console.log(dom);
    
    for (let d = 0; d < dom.length; d++) {
      console.log(d);

      dom[d].className = "nav-item nav-link";
    }
    event.target.class = "nav-item nav-link active";
    this.getAllItem();

  }
  saveUser:Item=new Item();
  editDetail(item: Item) {
    this.modalHeader = "Edit " + item.name;
    console.log(item);
    this.saveUser=item;
    this.opr="e";
    
  }
  adduserDetail() {
    this.modalHeader = "Add new Item ";
   // console.log(item);
    this.saveUser=new Item();
    this.opr="a";
    
  }
  opr:string="a";
  deleteDetail(item:Item){
    this.modalHeader = "Delete " + item.name;
    console.log(item);
    this.saveUser=item;
    this.opr="d";
   
  }
  saveDetail(){
     
    var datatosend = {
      "id":this.saveUser.id,
      "name":  this.saveUser.name,
      "price":  this.saveUser.price,
      "quantity": this.saveUser.quantity,
      

    };
    let url="item";

    switch(this.opr){
      case "a":
          this.dataService.getPostData(datatosend, "items").subscribe((resp) => {
            //loader=false
            this.handleError("save successfully.");
            location.reload(true);
          },
          error => {
            if(error=="OK"){
              this.handleError("password changed successfully.");
            }else{
              this.handleError(error);
            }
          
            console.log(error);
            
          
          });
           
      break;
      case "e":
        
    this.dataService.getPutData(datatosend, "items/"+datatosend.id).subscribe((resp) => {
      //loader=false
      this.handleError("save successfully.");
      location.reload(true);
    },
    error => {
      if(error=="OK"){
        this.handleError("password changed successfully.");
      }else{
        this.handleError(error);
      }
    
      console.log(error);
      
    
    });
     
        break;
        case "d":
        
    this.dataService.getDeleteData(datatosend, "items/"+datatosend.id).subscribe((resp) => {
      //loader=false
      this.handleError("save successfully.");
      location.reload(true);
    },
    error => {
      if(error=="OK"){
        this.handleError("Save successfully.");
      }else{
        this.handleError(error);
      }
    
      console.log(error);
      
    
    });
       
        break;
    }

  }
 

  getAllItem() {
    //this.pageForUser.cur-1
    //after data


    var datatosend = { "pageNo": 1 };


    this.error = "";
    this.loader = true;
    // this.dataService.getData(datatosend, "logins").subscribe(data => {
    // },
    // error => {
    //   this.handleError(error);
    // });
    this.dataService.getGetdData(datatosend, "items?pageNo=" + (this.pageForUser.cur - 1)).subscribe(data => {
      // this.router.navigate([this.returnUrl]);
      console.log(data);
      this.pageForUser.first = 1;
     // this.pageForUser.cur = data["page"];
      this.pageForUser.last = data["totalPages"];
      this.item = data["itemsList"];
      console.log(this.item);
      this.pageForUser.range=data["pageSize"];

      this.loader = false;

    },
      error => {
        this.handleError(error);
        
      });
  }

  handle(success: any) {
    this.loader = false;
    this.showSuccess = true;
    this.success = success;

    window.scroll(0, 0);
    setTimeout(() => {
      this.showSuccess = false;

    }, 10000)


  }

  handleError(error: any) {
    this.loader = false;
    this.showError = false;
    console.log(error);
    this.showError = true;
    this.error = error;

    window.scroll(0, 0);
    setTimeout(() => {
      this.showError = false;

    }, 10000)


  }
}
