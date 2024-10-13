import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-one',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.less'],
})
export class ActionComponent implements OnInit {
  constructor() {}

  //Responsible for obtaining URL parameters and initiating network requests, and then updating page content based on the request results
   init() {
    //Create URL parameter object to obtain GET parameters
    let params = new URLSearchParams(window.location.search)
    if(parseInt( params.get("id")!) == 0){
      return;
    }
    //Initiate a network request to obtain details page data
    fetch( 'http://localhost:8111/detailSimple/' +params.get("id")).then(response => {
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
          try{
            (document.getElementById(key) as HTMLInputElement).value = res.data[key];
          }catch(e){}
          if(key == "active"){
            let activeRadio = document.getElementsByName("active");
            for(let i = 0; i < activeRadio.length; i++){
              if ((activeRadio[i] as HTMLInputElement).value == res.data[key]){
                (activeRadio[i] as HTMLInputElement).checked = true;
                break;
              }
            }
          }
        }
      }
    }).catch(error => console.error('There was a problem with your fetch operation:', error));
  }

  //return
   goBack() {
    //Redirect to the list page
    window.location.href = '/adminPage'
  }


  //save
   saveData() {
    let params = new URLSearchParams(window.location.search)
    let fundraiser_id = parseInt(params.get("id")!)
    let fundraiser_image = (document.getElementById("fundraiser_image") as HTMLInputElement).value;
    let organizer = (document.getElementById("organizer") as HTMLInputElement).value;
    let caption = (document.getElementById("caption") as HTMLInputElement) .value;
    let target_funding = (document.getElementById("target_funding")as HTMLInputElement).value;
    let city = (document.getElementById("city") as HTMLInputElement).value;
    let category_id =( document.getElementById("category_id") as HTMLInputElement).value;

    //active
    var active = (document.querySelectorAll('input[name="active"]:checked')[0] as HTMLInputElement).value
    if(organizer == "" || caption == "" || target_funding == "" || city == "" || category_id == "" || active.length == 0){
      alert("Please fill in all the information")
      return
    }
    if(fundraiser_id == 0){
      //Initiate a network request to obtain details page data
      fetch( 'http://localhost:8111/fundraiserAdd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          organizer: organizer,
          caption: caption,
          target_funding: target_funding,
          city:city,
          category_id:category_id,
          active:active,
          current_funding:0,
          fundraiser_image:fundraiser_image
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
          alert("add success")
          this.goBack();
        }else{
          alert("add failed , try again")
        }
      })
    }else{
      fetch( 'http://localhost:8111/fundraiserEdit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          organizer: organizer,
          caption: caption,
          target_funding: target_funding,
          city:city,
          category_id:category_id,
          active:active,
          fundraiser_id:fundraiser_id
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
          alert("edit success")
          this.goBack();
        }else{
          alert("edit failed , try again")
        }
      })
    }

  }



  ngOnInit(): void {
    this.init()
    let fimage = document.getElementById('fimage')
    fimage!.addEventListener('change', event => {
      let fileObj = (fimage as any).files[0]
      if (fileObj) {
        let formData = new FormData()
        formData.append('image', fileObj)
        fetch( 'http://localhost:8111/upload', {
          method: 'POST',
          body: formData,
          mode: 'cors',
        }).then(response => {

          //Check the network response status and throw an error if it is not normal
          // if (!response.ok) {
          //   throw new Error('Network response was not ok');
          // }
          //Parse response to JSON format
          return response.json();
        }).then(res => {
          debugger
          (fimage as any).value=''
          if (res.status == 200) {
            (document.getElementById('fundraiser_image') as HTMLInputElement).value = res.data
          }else{
            alert("upload failed , try again")
          }
        })
      }
    })

  }
}
