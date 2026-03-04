import { Component, OnInit } from '@angular/core';
import { Map, NavigationControl } from 'maplibre-gl';
import MinimapControl from "maplibregl-minimap";


@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Maps implements OnInit {

  ngOnInit(): void {

    this.getMap()

  }

   getMap() {

    let nav = new NavigationControl();

    var map = new Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/hybrid-v4/style.json?key=bZ943IENWwexU3umotpo', // stylesheet location
      center: [-3.5, 40], // starting position [lng, lat]
      zoom: 3 // starting zoom,

    });

     const miniMap = new Map({
      container: 'minimap',
      style: 'https://api.maptiler.com/maps/hybrid-v4/style.json?key=bZ943IENWwexU3umotpo',
      center: [-74.5, 40],
      zoom: 4,
      attributionControl: false

    });


      map.on('load', () => {
      miniMap.setCenter(map.getCenter());
      miniMap.setZoom(Math.max(map.getZoom() - 5, 0));
    });

    map.on('move', () => {
      miniMap.setCenter(map.getCenter());
      miniMap.setZoom(Math.max(map.getZoom() - 5, 0));
    });

     map.addControl(nav, 'top-left');
  }











}
