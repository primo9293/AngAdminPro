import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  // Subir de forma nativa
  async actualizarFoto(archivo: File,
     tipo: 'usuarios'|'medicos'|'hospitales',
     id: string){
    try {
      
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();

      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers:{
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      // console.log('respFetch',resp);

      const data = await resp.json();

      // console.log(data);

      if (data.ok) {
        return data.nombreArchivo;
      } else{
        console.log(data.msg);
        return false;
        // return data.msg
      }
      // return 'Imagen Subida'
      
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
