import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Maps } from "./components/map/map";
import { Sidenav } from "./components/sidenav/sidenav";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Maps, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit{
  protected readonly title = signal('gotMap');

  ngOnInit():void{
     initFlowbite();
}
}
