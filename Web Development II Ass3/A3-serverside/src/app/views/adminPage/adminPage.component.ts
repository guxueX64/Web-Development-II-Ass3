import {Component, OnInit} from '@angular/core';
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'docs-one',
  templateUrl: './adminPage.component.html',
  imports: [NgIf, NgFor],
  styleUrls: ['./adminPage.component.less'],
  standalone: true
})
export class AdminPageComponent implements OnInit {
  public arrayData :any = []

  constructor() {}

  //Responsible for obtaining URL parameters and initiating network requests, and then updating page content based on the request results
  init() {
    fetch( 'http://localhost:8111/search').then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then(res => {
        console.log(res)
        if (res.status == 200) {
          this.arrayData = res.data
          // let array = res.data,str=''
          // if(array.length>0){
          //   for (let i = 0; i < array.length; i++) {
          //     str +=	`<ul class="sale-content">
					// 			<li class='caption-line'>${array[i].caption}</li>
					// 			<li class='caption-line'>${array[i].target_funding}/${array[i].current_funding}</li>
					// 			<li class='caption-line'>${array[i].organizer}</li>
					// 			<li class='caption-line'>${array[i].city}</li>
					// 			<li class='caption-line'><span class='editspan' onclick='goAction(${array[i].fundraiser_id})'>Edit</span> <span class='deletespan'  onclick='goDelete(${array[i].fundraiser_id})'>Delete</span></li>
					// 			</ul>`
          //   }
          // }else{
          //   str="<p class='nodata'>no more data...</p>"
          // }
          // (document.getElementById("every")as HTMLInputElement).innerHTML = str
        } else {
          alert(res.code)
        }
      })
      .catch(error => console.error('There was a problem with your fetch operation:', error));
  }

  goAction(id:any){
    window.location.href = "/action?id=" + id
  }

  goDelete(id:any){
    //Verify the pop-up box before deleting
    if(confirm("Are you sure you want to delete this item?")){
      //Check if the fundraiser has donations, if it has, prompt the user to delete it
      fetch( 'http://localhost:8111/detailSimple/' +id).then(response => {
        //Check the network response status and throw an error if it is not normal
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        //Parse response to JSON format
        return response.json();
      }).then(res => {
        //Check the request status, if it is 200, update the page content
        if (res.status == 200) {
          if(parseInt(res.data['current_funding'])>0){
            alert("Only fundraisers that do not have donations yet can be deleted")
            return
          }
          this.deleteData(id)
        }
      }).catch(error => console.error('There was a problem with your fetch operation:', error));
    }
  }

  deleteData(id: any){
    fetch( 'http://localhost:8111/fundraiser/'+id, {
      method: 'DELETE'
    }).then(response => {
      //Check the network response status and throw an error if it is not normal
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //Parse response to JSON format
      return response.json();
    }).then(res => {
      if (res.status == 200) {
        alert("delete success")
        window.location.reload()
      }else{
        alert("delete failed , try again")
      }
    })
  }

  ngOnInit(): void {
    this.init()
  }
}
