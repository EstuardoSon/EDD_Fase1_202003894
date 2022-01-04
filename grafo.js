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

    insertarOrdenado(id, nombre, distancia, adyacentes, longitud, identificador){
        let nuevo = new NodoRuta(id, nombre, distancia, adyacentes, longitud, identificador);
        if (this.primero == null){
            this.primero=this.ultimo=nuevo;
        }
        else if (this.primero.ruta.longitud <= nuevo.ruta.longitud && this.primero.siguiente == null){
            this.primero.siguiente = nuevo;
            this.ultimo = nuevo;
        }else if (this.primero.ruta.longitud >= nuevo.ruta.longitud){
            nuevo.siguiente = this.primero;
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            while(aux != null){
                if (aux == this.ultimo && aux.ruta.longitud <= nuevo.ruta.longitud){
                    aux.siguiente = nuevo;
                    this.ultimo = nuevo;
                    break;
                }
                else if (aux != this.ultimo && aux.siguiente.ruta.longitud >= nuevo.ruta.longitud && aux.ruta.longitud <= nuevo.ruta.longitud){
                    nuevo.siguiente = aux.siguiente;
                    aux.siguiente = nuevo;
                    break;
                }

                aux = aux.siguiente;
            }
        }
    }
}

class Vertice{
    constructor(id, nombre, distancia, adyacentes, longitud, identificador){
        this.id = id;
        this.nombre = nombre;
        this.distancia = distancia;
        this.longitud = longitud;
        this.adyacentes = adyacentes; 
        this.identificador = identificador; 
    }
}

class NodoRuta{
    constructor(id, nombre, distancia, adyacentes, longitud, identificador){
        this.ruta = new Vertice(id, nombre, distancia, adyacentes, longitud, identificador);
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
                console.log("   *"+aux2.ruta.id+" "+aux2.ruta.nombre+" "+aux2.ruta.distancia);

                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
    }

    buscarEnVertices(id){
        let aux = this.listaVertices.primero;

        while(aux!=null){
            if (aux.ruta.id == id){
                return aux.ruta;
            }
            aux = aux.siguiente
        }
        return null;
    }

    generarDot(){
        let aux = this.listaVertices.primero;
        let cadena = "";
        let enlaces = "";

        while(aux!=null){
            let aux2 = aux.ruta.adyacentes.primero;
            cadena += aux.ruta.id+'[ label="'+aux.ruta.id+' '+aux.ruta.nombre+'"];\n';
            while(aux2 != null){
                enlaces += aux.ruta.id+'->'+aux2.ruta.id+'[ label="'+aux2.ruta.distancia+'"];\n';;

                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }

        return cadena+enlaces;
    }

    extraer(lista){
        let aux = lista.primero;
        if(lista.primero == lista.ultimo){
            lista.ultimo = lista.ultimo.siguiente;
        }
        lista.primero = lista.primero.siguiente;
        return aux.ruta;
    }

    costoUniforme(idInicio, idFinal){
        let dot = '{'
	    let listaCosto = new ListaRutas();
        let Visitados = new Array();
        let contador = 0;
        let inicio = this.buscarEnVertices(idInicio);
        listaCosto.insertarOrdenado(inicio.id, inicio.nombre, inicio.distancia, inicio.adyacentes, 0, contador);
        let aux = listaCosto.primero
	    dot+=listaCosto.primero.ruta.identificador+' [label="'+listaCosto.primero.ruta.id+' '+listaCosto.primero.ruta.nombre+'"];\n'
        contador += 1
        while(aux!= null){
            console.log(aux.ruta.identificador)
            let nodoExtraido = this.extraer(listaCosto);
            Visitados.push(nodoExtraido.id);

            if (nodoExtraido.id == idFinal){
                dot+=aux.ruta.identificador+' [color="orange"]\n;';
                dot += '}';
                return dot;
            }

            let adyacente = nodoExtraido.adyacentes.primero;
            console.log(nodoExtraido)
            while(adyacente != null){
                if(Visitados.findIndex((element) => element == adyacente.ruta.id) == -1){
                    if (adyacente.ruta.id == idFinal){
                        dot+=contador+' [label="'+adyacente.ruta.id+' '+adyacente.ruta.nombre+'"];\n'+aux.ruta.identificador+'--'+contador+' [label="'+adyacente.ruta.distancia+'"] ;\n'
                    }else{
                        dot+=contador+' [label="'+adyacente.ruta.id+' '+adyacente.ruta.nombre+'"];\n'+aux.ruta.identificador+'--'+contador+' [label="'+adyacente.ruta.distancia+'"] ;\n'
                    }
                    listaCosto.insertarOrdenado(adyacente.ruta.id, adyacente.ruta.nombre, adyacente.ruta.distancia, this.buscarEnVertices(adyacente.ruta.id).adyacentes, (nodoExtraido.longitud + adyacente.ruta.distancia), contador);
                    contador += 1;
                }
                adyacente  = adyacente.siguiente
            }
            console.log(listaCosto)

            aux = listaCosto.primero
        }
        dot += '}';
        return dot;
    }
}
