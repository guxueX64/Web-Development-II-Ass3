import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class DetailComponent implements OnInit {
  //Initialization function, executed during page loading

  //Responsible for obtaining URL parameters and initiating network requests, and then updating page content based on the request results
  init() {
    //Create URL parameter object to obtain GET parameters
    let params = new URLSearchParams(window.location.search)
    //Initiate a network request to obtain details page data
    fetch( 'http://localhost:8111/detail/' + params.get("id")).then(response => {
      //Check the network response status and throw an error if it is not normal
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //Parse response to JSON format
      return response.json();
    }).then(res => {
      //Check the request status, if it is 200, update the page content
      if (res.status == 200) {
        //Traverse response data and update page element text content
        for (const key in res.data) {
          //Determine whether to display 'Active' or 'Inactive' based on the value of the 'active' field
          if(key=="active"){
            res.data[key] = res.data[key] == 1?'Active':'Inactive'
          }
          try {
            document.getElementById(key)!.innerText = res.data[key]
          } catch (error) {}
          //Special processing of image fields, rendering images by setting inline styles
          if(key == 'fundraiser_image'){
            //Rendering images
            document.getElementById(key)!.innerHTML=`<img src="../../../../assets/images/${res.data[key]}" style="width: 540px;" >`
          }
          if(key == 'donations'){
            //Donation List
            let donations = res.data[key];
            if(donations.length>0){
              var donationsHtml=''
              for(let i=0;i<donations.length;i++){
                donations[i].one = donations[i].date.split(" ")[0]
                donations[i].two = donations[i].date.split(" ")[1]
                donationsHtml+=`<div class="rec-cot">
										<div class="rgl-cont">
											<p>${donations[i].one}</p>
											<span>${donations[i].two}</span>
										</div>
										<div class="rgr-cont">
											<h3>giver : ${donations[i].giver}</h3>
											<p>USD ${donations[i].amount}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;thank you for you love</p>
										</div>
									</div>`

              }
              document.getElementById("total_log")!.innerHTML=donations.length
              document.getElementById("fundraiser_log")!.innerHTML=donationsHtml
            }else{
              document.getElementById("fundraiser_log")!.innerHTML ="<p style='height: 150px;line-height: 150px;'>No more data</p>"
            }

          }
        }
      } else {
        //If the request status is not 200, an error code will be displayed and redirected to the list page
        alert(res.code)
        window.location.href = '/listPage'
      }
    }).catch(error => console.error('There was a problem with your fetch operation:', error));
  }

  //Jump to the donation page
  goDonate(){
    //Create URL parameter object to obtain GET parameters
    let params = new URLSearchParams(window.location.search)
    window.location.href = '/donate?id='+params.get("id")
  }

  //Jump to the donation page
  goTo(to:string){
    window.location.href = to
  }

  ngOnInit(): void {
    //Initial search
    this.init();
  }
}
