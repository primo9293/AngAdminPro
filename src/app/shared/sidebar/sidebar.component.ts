import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebatService } from '../../services/sidebat.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  // public imgUrl = '';
  public usuario: Usuario;

  public menuItems: any[];

  constructor( private sideBarService: SidebatService,
               private usuarioService: UsuarioService) { 
    this.menuItems = sideBarService.menu;
    // console.log(this.menuItems);
    // this.imgUrl = usuarioService.usuario.imagenUrl;
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
