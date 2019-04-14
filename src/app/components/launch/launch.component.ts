import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { EmbedVideoService } from "ngx-embed-video";

@Component({
  selector: "app-launch",
  templateUrl: "./launch.component.html",
  styleUrls: ["./launch.component.scss"]
})
export class LaunchComponent implements OnInit {
  launchId: string;
  launch: any;
  youtubeIframes: any = [];
  constructor(
    private router: Router,
    private dataService: DataService,
    private embedService: EmbedVideoService
  ) {}

  ngOnInit() {
    this.launchId = this.router.url.split("/")[2];
    this.dataService.getLaunchById(this.launchId).subscribe(
      res => {
        this.launch = res.launches[0];
        console.log("this.launch", this.launch);
      },
      err => {
        console.error("err", err);
      }
    );
  }

  embedYoutube(url) {
    return this.embedService.embed(url);
  }
}
