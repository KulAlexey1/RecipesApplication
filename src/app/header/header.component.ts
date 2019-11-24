import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../core/services/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private _dataStorageService: DataStorageService) {}

  ngOnInit() {}

  onFetchDataClick() {
    this._dataStorageService.fetchRecipes().subscribe(response => {});
  }

  onSaveDataClick() {
    this._dataStorageService.saveRecipes().subscribe(response => {});
  }
}
