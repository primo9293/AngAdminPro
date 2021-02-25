import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ){}

   /*  imprimirUsuario() {
        console.log('nombre',this.nombre);
    } */

    get imagenUrl(){
        // base_url/upload/medicos/no-image
        // console.log('this.img',this.img);
        // console.log('base_url',base_url);
        if (this.img.includes('http')) {
            return this.img;
        }
        if (this.img) {
            return `${base_url}/upload/usuarios/${this.img}`
        } else {
            return `${base_url}/upload/usuarios/no-image`;
        }
    }
}