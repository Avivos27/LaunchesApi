import { Component, OnInit, HostListener } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { Launch } from "src/app/models/launch.model";
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation
} from "angular-animations";

const DEFAULT_START_DATE = "1900-01-01";
const DEFAULT_END_DATE = "2019-01-01";
const RESULTS_LIMIT = 40;

@Component({
  selector: "app-launches",
  templateUrl: "./launches.component.html",
  styleUrls: ["./launches.component.scss"],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()]
})
export class LaunchesComponent implements OnInit {
  launches: Launch[] = null;
  savedLaunches: Launch[] = null;
  launchesShown: Launch[] = null;
  searchLaunches: Launch[] = null;
  defaultOffset: number = 0;
  searchOffset: number = 0;
  waitingOnRequest = false;
  imageReady: any = {};
  showSaved: boolean = false;
  resultState: number = 1; // 1 = default, 2 = search
  lastSearch: string = null;
  shouldQueryMore: boolean = true;

  @HostListener("window:scroll", [])
  onScroll(): void {
    let safety = 50;
    if (
      window.innerHeight + window.scrollY + safety >=
      document.body.offsetHeight
    ) {
      this.getNextLaunches();
    }
  }

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getAllLaunches({ limit: RESULTS_LIMIT });
  }

  onInputRequest(text: string) {
    this.searchLaunches = [];
    this.searchOffset = 0;
    this.onSearchRequest(text, {
      limit: RESULTS_LIMIT
    });
  }

  onSearchRequest(text: string, options) {
    this.lastSearch = text;
    this.waitingOnRequest = true;
    this.dataService.getLaunchesByName(text, options).subscribe(
      res => {
        let new_launches = res.launches.map(launch => new Launch(launch));
        if (this.searchLaunches)
          this.searchLaunches = this.searchLaunches.concat(new_launches);
        else this.searchLaunches = new_launches;
        this.launchesShown = this.searchLaunches;
        this.searchOffset += res.count;
        if (this.searchOffset >= res.total) this.shouldQueryMore = false;
        this.defaultOffset = 0;
        this.waitingOnRequest = false;
        this.resultState = 2;
      },
      err => {
        this.waitingOnRequest = false;
        this.searchLaunches = this.launchesShown = [];
        this.searchOffset = 0;
      }
    );
  }

  getAllLaunches(options) {
    this.waitingOnRequest = true;
    this.dataService
      .getLaunchesByDates(DEFAULT_START_DATE, DEFAULT_END_DATE, options)
      .subscribe(
        res => {
          let new_launches = res.launches.map(launch => new Launch(launch));
          if (this.launches) this.launches = this.launches.concat(new_launches);
          else this.launches = new_launches;
          this.launchesShown = this.launches;
          this.defaultOffset += res.count;
          if (this.defaultOffset >= res.total) this.shouldQueryMore = false;
          this.searchOffset = 0;
          this.waitingOnRequest = false;
          this.resultState = 1;
        },
        err => {
          this.waitingOnRequest = false;
          this.launches = this.launchesShown = [];
          this.defaultOffset = 0;
        }
      );
  }

  getNextLaunches() {
    if (this.waitingOnRequest || !this.shouldQueryMore || this.showSaved)
      return;
    else {
      this.waitingOnRequest = true;
      if (this.resultState === 1)
        this.getAllLaunches({
          limit: RESULTS_LIMIT,
          offset: this.defaultOffset
        });
      else if (this.resultState === 2)
        this.onSearchRequest(this.lastSearch, {
          limit: RESULTS_LIMIT,
          offset: this.searchOffset
        });
    }
  }

  toggleSavedLaunchesView() {
    this.showSaved = !this.showSaved;
    if (this.showSaved) {
      let saved = JSON.parse(localStorage.getItem("saved-launches"));
      let savedKeys = Object.keys(saved);

      this.savedLaunches = savedKeys.map(key => saved[key]);
      this.launchesShown = this.savedLaunches;
    } else
      this.launchesShown =
        this.resultState === 1 ? this.launches : this.searchLaunches;
  }

  toggleSaveLaunch(launch: Launch) {
    if (this.getFromStorage(launch)) this.removeFromStorage(launch);
    else this.saveInStorage(launch);
  }

  saveInStorage(launch: Launch) {
    let saved = JSON.parse(localStorage.getItem("saved-launches"));
    if (!saved) saved = {};
    saved[launch.id] = launch;
    localStorage.setItem("saved-launches", JSON.stringify(saved));
  }

  getFromStorage(launch: Launch) {
    let saved = JSON.parse(localStorage.getItem("saved-launches"));
    if (saved) return saved[launch.id];
  }

  removeFromStorage(launch: Launch) {
    let saved = JSON.parse(localStorage.getItem("saved-launches"));
    delete saved[launch.id];
    localStorage.setItem("saved-launches", JSON.stringify(saved));
  }
}
