import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule , FormControl, FormGroup} from '@angular/forms'; //1.

@Component({
  selector: 'docs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    fetch( 'http://localhost:8111/home').then(response => {
      //Check the response status, if it is not within the range of 200-299, throw an error
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //Parse the response body in JSON format
      return response.json();
    })
      .then(res => {
        //Output response data on the console, mainly used for debugging
        console.log(res)
        //Check if the response status code is 200
        if(res.status == 200){
          //Extract response data, initialize string for concatenating HTML
          let array = res.data,str=''
          //Traverse the data array and generate the corresponding HTML string
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            str +=`<div class="rcr">
						<div class="rcr-top">
							<img src="../../../assets/images/${element.fundraiser_image}" width="100%">
						</div>
						<div class="rcr-bot">
							<div class="rb-top">
								${element.caption}
							</div>
							<div class="second_P">
								<span class="fk-prop">USD</span>
								<span class="fk-prop-price">${element.current_funding}
								</span>
								<span class="second_Marketprice">USD ${element.target_funding}</span>
							</div>
							<div class="buy">
								<a class="second_mallBuy" href="/detail?id=${element.fundraiser_id}">
									<span style="color: white;">detail</span>
								</a>
							</div>
						</div>
					</div>`
          }
          //Set the generated HTML string to page elements
          document.getElementById("rec-right")!.innerHTML = str
        }else{
          //If the response status code is not 200, an error code prompt will pop up
          alert(res.code)
        }
      })
      //Dealing with errors in fetch operations
      .catch(error => console.error('There was a problem with your fetch operation:', error));
  }
}
