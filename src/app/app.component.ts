import { Component, OnInit } from "@angular/core";
import { LaunchSpaceService } from "./backend.service";
import { input } from "./launchconfig";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  oldIndex = {
    launch_year: undefined,
    launch_success: undefined,
    land_success: undefined
  };

  filteredData = [];
  filterObj = {};
  InputValues = input;
  constructor(private LaunchSpaceService: LaunchSpaceService) {}
  ngOnInit() {
    this.getApiDate("");
  }
  filterInput(type: string, value: string, index: number) {
    if (this.oldIndex[type] !== undefined)
      this.InputValues[type][this.oldIndex[type]]["isActive"] = false;
    this.InputValues[type][index]["isActive"] = true;
    this.oldIndex[type] = index;
    if (this.filterObj[type] !== value) {
      this.filterObj[type] = value;
      let filterString = "&";
      Object.keys(this.filterObj).forEach(val => {
        if (this.filterObj[val]) {
          filterString += `${val}=${this.filterObj[val]}&`;
        }
      });
      filterString = filterString.substring(0, filterString.lastIndexOf("&"));
      this.getApiDate(filterString);
    }
  }
  getApiDate(fiterString: string) {
    this.LaunchSpaceService.getData(fiterString).subscribe((data: []) => {
      this.filteredData = data;
    });
  }
}
