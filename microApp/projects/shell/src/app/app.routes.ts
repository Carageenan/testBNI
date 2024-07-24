import { Routes } from "@angular/router";
import { MainFeatureComponent } from "./main-feature/main-feature.component";
import { loadRemoteModule } from "@angular-architects/native-federation";

export const routes: Routes = [
  {
    path: "",
    component: MainFeatureComponent,
  },
  {
    path: "chart",
    loadComponent: () => loadRemoteModule("chart", "./Component").then((m) => m.AppComponent),
  },
];
