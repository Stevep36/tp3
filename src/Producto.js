import fs from 'fs';

export default class Producto {

    constructor(name){
        this.name = name;
    } 

    async leer() {
        try {
            let data = await fs.promises.readFile(this.name,'utf-8');
            let contenido = JSON.parse(data);
            return contenido;
        }
        catch (err) {
            console.log("error al leer el archivo");
        }
    }

    async guardar(producto) {
        try {
            let data = await fs.promises.readFile(this.name,'utf-8');
            let contenido = JSON.parse(data);
            let obj = {
                title:producto.title,
                price:producto.price,
                thumbnail:producto.thumbnail,
                id:contenido.length + 1 
            }
            contenido.push(obj);
            await fs.promises.writeFile(this.name,JSON.stringify(contenido,null,'\t')); 
            console.log("cambios guardados");
            this.leer();
        }
        catch (err) {
            console.log("no se pudo guardar " + err);
        }
    }

    async borrar() {
        try {
            fs.unlink(this.name,error =>{
            if (error) throw new Error(error)
            else console.log ("se borro correctamente el archivo " + this.name)
            })
        }
        catch (err){
            console.log("hubo un error al borrar el archivo "+ err);
        }
    }
}