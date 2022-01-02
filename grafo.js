class ListaRutas{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(id, nombre, distancia, adyacentes){
        let nuevo = new NodoRuta(id, nombre, distancia, adyacentes);
        if (this.primero == null){
            this.primero = this.ultimo = nuevo
        }
        else{
            this.ultimo.siguiente = nuevo;
            this.ultimo = nuevo;
        }
    }
}

class Vertice{
    constructor(id, nombre, distancia, adyacentes){
        this.id = id;
        this.nombre = nombre;
        this.distacia = distancia;
        this.adyacentes = adyacentes;
        this.visitado = false;
    }
}

class NodoRuta{
    constructor(id, nombre, distancia, adyacentes){
        this.ruta = new Vertice(id, nombre, distancia, adyacentes);
        this.siguiente = null;
    }
}

class Grafo{
    constructor(){
        this.listaVertices = new ListaRutas();
        this.distanciaActual = 0;
    }

    imprimir(){
        let aux = this.listaVertices.primero;

        while(aux!=null){
            let aux2 = aux.ruta.adyacentes.primero;
            console.log(aux.ruta.id+" "+aux.ruta.nombre);
            while(aux2 != null){
                console.log("   *"+aux2.ruta.id+" "+aux2.ruta.nombre+" "+aux2.ruta.distacia);

                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
    }

    generarDot(){
        let aux = this.listaVertices.primero;
        let cadena = "";
        let enlaces = "";

        while(aux!=null){
            let aux2 = aux.ruta.adyacentes.primero;
            cadena += aux.ruta.id+'[ label="'+aux.ruta.id+' '+aux.ruta.nombre+'"];\n';
            while(aux2 != null){
                enlaces += aux.ruta.id+'->'+aux2.ruta.id+'[ label="'+aux2.ruta.distacia+'"];\n';;

                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }

        return cadena+enlaces;
    }
}

/*
let grafo = new Grafo();
let lista = new ListaRutas();
lista.insertar(3,"bodega3",15);
lista.insertar(5,"bodega5",5);

grafo.listaVertices.insertar(1,"bodega1",0, lista)

grafo.imprimir();
*/
