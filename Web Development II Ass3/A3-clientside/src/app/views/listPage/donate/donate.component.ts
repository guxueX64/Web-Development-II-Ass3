import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.less'],
})
export class DonateComponent implements OnInit {
  //Initialization function, executed during page loading
  //Responsible for obtaining URL parameters and initiating network requests, and then updating page content based on the request results
   init() {
    //Create URL parameter object to obtain GET parameters
    let params = new URLSearchParams(window.location.search)
    //Initiate a network request to obtain details page data
    fetch( 'http://localhost:8111/detailSimple/' + params.get("id")).then(response => {
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
          if (key == "active") {
            res.data[key] = res.data[key] == 1 ? 'Active' : 'Inactive'
          }
          try {
            document.getElementById(key)!.innerText = res.data[key]
          } catch (error) { }
          //Special processing of image fields, rendering images by setting inline styles
          if (key == 'fundraiser_image') {
            //Rendering images
            document.getElementById(key)!.innerHTML = `<img src="../../../../assets/images/${res.data[key]}" style="width: 540px;" >`
          }

        }
      } else {
        //If the request status is not 200, an error code will be displayed and redirected to the list page
        alert(res.code)
        window.location.href = '/listPage'
      }
    }).catch(error => console.error('There was a problem with your fetch operation:', error));
  }

  //返回
   goBack() {
    //Create URL parameter object to obtain GET parameters
    let params = new URLSearchParams(window.location.search)
    //Redirect to the list page
    window.location.href = '/detail?id=' + params.get("id")
  }


  //保存
   saveData() {
    let amount = (document.getElementById("amount")as HTMLInputElement).value
    try {
      if (parseFloat(amount) < 5) {
        alert("the minimum of donation is 5 AUD")
        return
      }
    } catch (error) {
      alert("the minimum of donation is 5 AUD")
      return
    }
    let giver = (document.getElementById("giver")as HTMLInputElement).value
    if (giver == "") {
      alert("Please input your name")
      return
    }

    let params = new URLSearchParams(window.location.search)
    let fundraiser_id = params.get("id")
    //Initiate a network request to obtain details page data
    fetch( 'http://localhost:8111/donation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fundraiser_id: fundraiser_id,
        giver: giver,
        amount: parseInt(amount),
        date:this.getCurrentDate()
      })
    }).then(response => {
      //Check the network response status and throw an error if it is not normal
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //Parse response to JSON format
      return response.json();
    }).then(res => {
      console.log(res)
      if (res.status == 200) {
        alert("Thank you for your donation")
        this.goBack();
      }else{
        alert("donation failed , try again")
      }
    })
  }

  //当前时间格式化
  getCurrentDate() {
    let date = new Date()
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  }

  ngOnInit(): void {
    //Initial search
    this.init();
  }
}
