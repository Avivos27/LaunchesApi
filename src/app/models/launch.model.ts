const SUCCESS_STATUS_NUM = 3;
const PLACEHOLDER_PATH = "/src/assets/images/placeholder_320.png";

export class Launch {
  id: number;
  name: string;
  start: string;
  end: string;
  success: boolean;
  rocketImage: string;
  rocketImageSizes: number[];
  thumbnailRocketImage: string;

  constructor(json = null) {
    if (json != null) {
      this.id = json.id;
      this.name = json.name;
      this.start = json.windowstart;
      this.end = json.windowend;
      this.success = json.status === SUCCESS_STATUS_NUM ? true : false;
      this.setRocketImage(json.rocket);
    }
  }

  setRocketImage(rocket) {
    if (!rocket) {
      this.rocketImage = PLACEHOLDER_PATH;
      this.rocketImageSizes = null;
    } else {
      this.rocketImage = rocket.imageURL ? rocket.imageURL : null;
      this.rocketImageSizes = rocket.imageSizes ? rocket.imageSizes : null;
      if (this.rocketImage && this.rocketImageSizes) {
        let split = this.rocketImage.split("/");
        let last = split[split.length - 1];
        split = last.split("_");
        last = split[split.length - 1];
        split = last.split(".");
        let curr = split[0];

        this.thumbnailRocketImage = this.rocketImage.replace(
          curr,
          "" + this.rocketImageSizes[0]
        );
      }
    }
  }
}
