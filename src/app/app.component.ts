import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public data: any;
  public newData: any;
  public draftData = new FormControl;

  constructor(private appService: AppService) {}

  // upon initializing the application, we use the getData method in appService to get the data from the server
  ngOnInit() {
    this.appService.getData().subscribe(result => this.data = result);
  }

  // this method handles when the user has entered something into the text box and clicked submit, then the new data is added to the variable data in this component and the submit method in appServie is called to post the new data to the server
  submit() {
    if (this.draftData.value) {
      this.appService.submit(this.draftData.value).subscribe((res: any) => {this.data.push({body: this.draftData.value, userId: 1, title: this.draftData.value, id: JSON.parse(res._body).id});}).add(() => {this.draftData.reset()});
    }
  }

  // this method runs when the user clicks an item on the list and it deletes it both from the data object and sends a delete request via appService to the server
  delete(objectToDelete) {
    this.appService.delete(objectToDelete.id).subscribe(
      () => this.data.splice(this.data.indexOf(objectToDelete), 1)
    );
  }

}
