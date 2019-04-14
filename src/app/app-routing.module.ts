import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LaunchesComponent } from "./components/launches/launches.component";
import { LaunchComponent } from "./components/launch/launch.component";

const routes: Routes = [
  { path: "", redirectTo: "launches", pathMatch: "full" },
  { path: "launches", component: LaunchesComponent, pathMatch: "full" },
  { path: "launches/:id", component: LaunchComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
