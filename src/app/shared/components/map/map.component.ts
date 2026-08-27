import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet'
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Coordinate } from './Coordinates.model';

@Component({
  selector: 'app-map',
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  
  @Input()
  initialCoordinates: Coordinate[] = [];

  @Input()
  readOnlyMOde: boolean = false;

  @Output()
  coordinateSelected = new EventEmitter<Coordinate>();

  ngOnInit(): void {
    this.layers = this.initialCoordinates.map(value => {

      const myMarker = marker([value.latitude, value.longitude], this.markerOptions);

      if(value.text){
        myMarker.bindPopup(value.text, {autoClose: false, autoPan: false})
      }

      return myMarker;
    });
  }

  markerOptions = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png`'
    })
  }

  options = {
    layers: [
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
        {
          maxZoom: 18,
          attribution: '...'
        })
    ],
    zoom: 14,
    center: latLng(51.44605891790867, 0.21814658844897886)
  }

  layers: Marker<any>[] = [];




  handleClick(event: LeafletMouseEvent){

    if(this.readOnlyMOde){
      return;
    }

    const latitude = event.latlng.lat;
    const longitude = event.latlng.lng;

    this.layers = [];
    this.layers.push(marker([latitude, longitude], this.markerOptions));
    this.coordinateSelected.emit({
      latitude,
      longitude
    });
  }

}
