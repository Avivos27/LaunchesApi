import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"]
})
export class SearchInputComponent implements OnInit {
  searchControl = new FormControl();
  @Output()
  searchRequest: EventEmitter<string> = new EventEmitter<string>();
  lastQuery: string = "";

  constructor() {}

  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(text => {
      if (this.lastQuery !== text && text.length >= 3) {
        this.lastQuery = text;
        this.searchRequest.emit(text);
      }
    });
  }
}
