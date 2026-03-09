import { Component, effect, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import maplibregl, { Map, Marker, NavigationControl, Popup } from 'maplibre-gl';
import MinimapControl from "maplibregl-minimap";
import { GotGeoService } from '../../../services/GotGeo.service';
import { GotFeature, GotGeometry, GotProperties, GotActor } from '../../../interfaces/got.interface';
import { CommonModule } from '@angular/common';
import { FeatureCollection } from 'geojson';



@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Maps implements OnInit {

  constructor(private geoService: GotGeoService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {

    effect(() => {
      const selected = this.mapStateUpdate.searchLocalition()
      if (!selected.length || !this.map) return
      const bounds = new maplibregl.LngLatBounds()

      selected.forEach(p => bounds.extend([p.longitude, p.latitude]));
      //console.log(latlngs)
      this.map.fitBounds(bounds, {
        padding: 50, // margen alrededor de los markers
        animate: true,
        duration: 1.5,
        maxZoom: 18
      })

    })

  }

  map!: Map;

  private markers: GotFeature[] = []
  public mapStateUpdate = inject(GotGeoService)
  public mapState = inject(GotGeoService);

  ngOnInit(): void {

    this.getMap()
    this.getAllMarkers()
    this.getNereastPoint()
  }

  getMap() {

    let nav = new NavigationControl();

    this.map = new Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/backdrop-v4/style.json?key=bZ943IENWwexU3umotpo', // stylesheet location
      center: [-3.5, 40], // starting position [lng, lat]
      zoom: 3 // starting zoom,

    });

    const miniMap = new Map({
      container: 'minimap',
      style: 'https://api.maptiler.com/maps/backdrop-v4/style.json?key=bZ943IENWwexU3umotpo',
      center: [-74.5, 40],
      zoom: 4,
      attributionControl: false

    });


    this.map.on('load', () => {
      miniMap.setCenter(this.map.getCenter());
      miniMap.setZoom(Math.max(this.map.getZoom() - 5, 0));
    });

    this.map.on('move', () => {
      miniMap.setCenter(this.map.getCenter());
      miniMap.setZoom(Math.max(this.map.getZoom() - 5, 0));
    });

    this.map.addControl(nav, 'top-left');
  }


  getAllMarkers() {

    let p: GotProperties;

    this.geoService.getLocalization().subscribe((data: any) => {

      data.features.forEach((item: GotFeature) => {

        p = item.properties

        let text = `<div class="w-64 z-0 space-y-4 font-sans bg-stone-100 rounded-lg">
    <p class="text-xs uppercase tracking-widest text-stone-400">
      Localización
    </p>


    <h2 class="text-lg font-semibold text-black leading-tight">
      ${item.properties.real_place}
    </h2>


    <div class="overflow-hidden rounded-lg border border-white/10">
      <img
        src="${item.properties.place_image}"
        class="w-full h-36  object-cover"
        alt="${item.properties.real_place}"
      >
    </div>

  </div>
        `

        const popup = new maplibregl.Popup({ offset: 25, maxWidth: "300px" }).setHTML(text

        );

        const el = document.createElement('div');
        el.id = 'marker';


        let setLng = item.geometry.coordinates
        let marker = new Marker({
          color: "#ff0000",
        }).setLngLat(setLng)
          .setPopup(popup)
          .addTo(this.map)

        marker.getElement().addEventListener('click', () => {

          this.mapState.setLocation(item)
          this.mapStateUpdate.setSearchLocation([{ ...p, latitude: item.geometry.coordinates[1], longitude: item.geometry.coordinates[0] }])

        })
      })
    })
  }


  getNereastPoint() {

    this.geoService.getLocalization().subscribe((data: any) => {

      data.features.forEach((item: GotFeature) => {

     
      })


    })

  }

}


















