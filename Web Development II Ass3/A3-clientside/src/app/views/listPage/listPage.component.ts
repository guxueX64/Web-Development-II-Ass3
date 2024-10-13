import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-one',
  templateUrl: './listPage.component.html',
  styleUrls: ['./listPage.component.less'],
})
export class ListPageComponent implements OnInit {
  //Initialize variables to store search criteria
  private city = '';
  private category = '';
  private caption='';
  constructor() {}

  //Category Search Function
  searchCategory(nowCategory:any) {
    this.category = nowCategory
    nowCategory = nowCategory == '' ? 0 : nowCategory
    var array = document.getElementsByClassName("category")
    for (let index = 0; index < array.length; index++) {
      array[index].classList.remove("active")
      if (index == nowCategory) {
        array[index].classList.add("active")
      }
    }
    this.search();
  }

  //City Search Function
  searchCity(nowCity:any) {
    this.city = nowCity
    nowCity = nowCity == '' ? 'All' : nowCity
    var array = document.getElementsByClassName("city")
    for (let index = 0; index < array.length; index++) {
      array[index].classList.remove("active")
      if ((array[index] as HTMLInputElement).innerText == nowCity) {
        array[index].classList.add("active")
      }
    }
    this.search();
  }

  //Keyword Search Function
  searchKey() {
    let value = (document.getElementById("search") as HTMLInputElement).value
    if (value) {
      this.caption = value
      this.search();
    }else{
      alert("Please input caption")
      return
    }
  }

  //Clear search criteria
  searchClear() {
    if(document.getElementById("search") as HTMLInputElement){
      (document.getElementById("search") as HTMLInputElement).value = ''
      this.caption = ''
      alert("clear success")
      this.search();
    }
  }


  //Perform search based on current criteria
  search() {
    fetch( 'http://localhost:8111/search?city='+this.city+'&category_id='+this.category+"&caption="+this.caption).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then(res => {
        console.log(res)
        if (res.status == 200) {
          let array = res.data, str = ''
          if(array.length>0){

            for (let index = 0; index < array.length; index++) {
              const element = array[index];
              str += `<div class="rcr">
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
          }else{
            str="<p class='nodata'>no more data...</p>"
          }
          document.getElementById("rec-right")!.innerHTML = str
        } else {
          alert(res.code)
        }
      })
      .catch(error => console.error('There was a problem with your fetch operation:', error));
  }


  ngOnInit(): void {
    //Initial search
    this.search();
  }
}
