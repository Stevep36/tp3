import express from 'express';
import Producto from './src/Producto.js';


const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log("listening on port 8080")
})

let visitas = [0,0]

app.get('/productos', async (req,res)=>{
    let pr = new Producto("./files/productos.txt");
    let productos = await pr.leer();
    visitas[0]++;
    
    res.send({ items: JSON.stringify(productos), cantidad: productos.length})
})

app.get('/productoRandom', async (req,res)=>{
    let pr = new Producto("./files/productos.txt");
    let productos = await pr.leer();
    visitas[1]++;

    res.send(productos[Math.floor(Math.random()*productos.length)])
})