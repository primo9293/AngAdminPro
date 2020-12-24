import { Component, OnInit } from '@angular/core';
import { SidebatService } from '../../services/sidebat.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor( private sideBarService: SidebatService) { 
    this.menuItems = sideBarService.menu;
    // console.log(this.menuItems);
  }

  ngOnInit(): void {
  }

}
