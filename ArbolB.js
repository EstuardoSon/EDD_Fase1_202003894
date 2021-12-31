class Producto{
    constructor(id, nombre, precio, cantidad){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
    }
}

class Pagina{
    constructor(){
        this.lista = new lista()
    }
}

class lista{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.longitud = 0;
    }

    insertarEnPagina(id, nombre, precio, cantidad){
        let nuevo = new nodoB(id, nombre, precio, cantidad);
        if (this.primero == null){
            this.primero=this.ultimo=nuevo;
            this.longitud += 1
        }
        else if (this.primero.producto.id < nuevo.producto.id && this.primero.siguiente == null){
            nuevo.anterior = this.primero;
            this.primero.siguiente = nuevo;
            this.ultimo = nuevo;
            this.longitud += 1
        }else if (this.primero.producto.id > nuevo.producto.id){
            this.primero.anterior = nuevo;
            nuevo.siguiente = this.primero;
            this.primero = nuevo;
            this.longitud += 1
        }else{
            let aux = this.primero;
            while(aux != null){
                if (aux == this.ultimo && aux.producto.id < nuevo.producto.id){
                    nuevo.anterior = aux; 
                    aux.siguiente = nuevo;
                    this.ultimo = nuevo;
                    this.longitud += 1
                    break;
                }
                else if (aux != this.ultimo && aux.siguiente.producto.id > nuevo.producto.id && aux.producto.id < nuevo.producto.id){
                    nuevo.siguiente = aux.siguiente;
                    nuevo.anterior = aux;
                    nuevo.siguiente.anterior = nuevo;
                    aux.siguiente = nuevo;
                    this.longitud += 1
                    break;
                }

                aux = aux.siguiente;
            }
        }
        return nuevo;
    }
}

class nodoB{
    constructor(id, nombre, precio, cantidad){
        this.producto = new Producto(id, nombre, precio, cantidad)
        this.siguiente = null
        this.anterior = null
        this.derecha = null
        this.izquierda = null
    }
}

class arbolB{
    constructor(){
        this.raiz = null
        this.dot = ""
    }

    insertar(id, nombre, precio, cantidad){
        if (this.raiz == null){
            this.raiz = new Pagina();
            this.raiz.lista.insertarEnPagina(id, nombre, precio, cantidad);
        }
        else if (this.raiz.lista.primero.izquierda == null && this.raiz.lista.primero.derecha == null){
            this.raiz.lista.insertarEnPagina(id, nombre, precio, cantidad);

            if (this.raiz.lista.longitud == 5){
                this.raiz = this.dividirPagina(this.raiz.lista.primero)
            }
        }
        else{
            let cambio = this.buscarPagina(this.raiz, id, nombre, precio, cantidad)

            if (cambio != null){
                this.raiz = cambio
            }
        }
    }

    buscarPagina(nodo, id, nombre, precio, cantidad){

        let aux = nodo.lista.primero;
        while(aux!=null){    
            if (aux.producto.id > id && aux.izquierda != null && (aux.anterior == null || aux.anterior.producto.id < id)){
                let nodoExtraido = this.buscarPagina(aux.izquierda, id, nombre, precio, cantidad) 
                
                if (nodoExtraido != null){
                    let mover = nodo.lista.insertarEnPagina(nodoExtraido.lista.primero.producto.id, nodoExtraido.lista.primero.producto.nombre, nodoExtraido.lista.primero.producto.precio, nodoExtraido.lista.primero.producto.cantidad)
                    mover.izquierda = nodoExtraido.lista.primero.izquierda
                    mover.derecha = nodoExtraido.lista.primero.derecha

                    try{mover.anterior.derecha = mover.izquierda}catch(e){}
                    try{mover.siguiente.izquierda = mover.derecha}catch(e){}

                    if (nodo.lista.longitud == 5){
                        let nodoExtraido = this.dividirPagina(nodo.lista.primero);
                        return nodoExtraido;
                    }
                }
                
                break;
            }
            else if(aux.producto.id < id && aux.derecha != null && (aux.siguiente == null || aux.siguiente.producto.id > id)){
                let nodoExtraido = this.buscarPagina(aux.derecha, id, nombre, precio, cantidad)           
                
                if (nodoExtraido != null){
                    let mover = nodo.lista.insertarEnPagina(nodoExtraido.lista.primero.producto.id, nodoExtraido.lista.primero.producto.nombre, nodoExtraido.lista.primero.producto.precio, nodoExtraido.lista.primero.producto.cantidad)
                    mover.izquierda = nodoExtraido.lista.primero.izquierda
                    mover.derecha = nodoExtraido.lista.primero.derecha

                    try{mover.anterior.derecha = mover.izquierda}catch(e){}
                    try{mover.siguiente.izquierda = mover.derecha}catch(e){}
                    

                    if (nodo.lista.longitud == 5){
                        let nodoExtraido = this.dividirPagina(nodo.lista.primero);
                        return nodoExtraido;
                    }
                }
                break;
            }
            else if(aux.derecha == null && aux.izquierda == null){
                nodo.lista.insertarEnPagina(id, nombre, precio, cantidad);

                if (nodo.lista.longitud == 5){
                    let nodoExtraido = this.dividirPagina(nodo.lista.primero);
                    return nodoExtraido;
                }
                break;
            }
            aux = aux.siguiente
        }
    }

    insertarLocalStorage(id, nombre, precio, cantidad){
        if (this.raiz == null){
            this.raiz = new Pagina();
            let listaA = new lista();
            Object.assign(listaA,this.raiz.lista)
            listaA.insertarEnPagina(id, nombre, precio, cantidad);
            this.raiz.lista = listaA;
        }
        else if (this.raiz.lista.primero.izquierda == null && this.raiz.lista.primero.derecha == null){
            let raizAux = new Pagina();
            Object.assign(raizAux,this.raiz)
            let listaA = new lista();
            Object.assign(listaA,raizAux.lista)
            listaA.insertarEnPagina(id, nombre, precio, cantidad);
            raizAux.lista = listaA;

            if (this.raiz.lista.longitud == 5){
                raizAux = this.dividirPagina(raizAux.lista.primero)
            }

            this.raiz = raizAux;
        }
        else{
            let raizAux = new Pagina();
            Object.assign(raizAux,this.raiz)
            let cambio = this.buscarPaginaLocalStorage(raizAux, id, nombre, precio, cantidad)

            if (cambio != null){
                raizAux = cambio
            }
            this.raiz = raizAux
        }
    }
    
    buscarPaginaLocalStorage(nodo, id, nombre, precio, cantidad){
        let listaA = new lista();
        Object.assign(listaA,nodo.lista)
        let aux = listaA.primero;
        while(aux!=null){    
            if (aux.producto.id > id && aux.izquierda != null && (aux.anterior == null || aux.anterior.producto.id < id)){
                let nodoExtraido = this.buscarPaginaLocalStorage(aux.izquierda, id, nombre, precio, cantidad) 
                
                if (nodoExtraido != null){
                    let mover = listaA.insertarEnPagina(nodoExtraido.lista.primero.producto.id, nodoExtraido.lista.primero.producto.nombre, nodoExtraido.lista.primero.producto.precio, nodoExtraido.lista.primero.producto.cantidad)
                    mover.izquierda = nodoExtraido.lista.primero.izquierda
                    mover.derecha = nodoExtraido.lista.primero.derecha

                    try{mover.anterior.derecha = mover.izquierda}catch(e){}
                    try{mover.siguiente.izquierda = mover.derecha}catch(e){}

                    if (listaA.longitud == 5){
                        let nodoExtraido = this.dividirPagina(listaA.primero);
                        nodo.lista = listaA;
                        return nodoExtraido;
                    }
                }
                nodo.lista = listaA;
                break;
            }
            else if(aux.producto.id < id && aux.derecha != null && (aux.siguiente == null || aux.siguiente.producto.id > id)){
                let nodoExtraido = this.buscarPaginaLocalStorage(aux.derecha, id, nombre, precio, cantidad)           
                
                if (nodoExtraido != null){
                    let mover = listaA.insertarEnPagina(nodoExtraido.lista.primero.producto.id, nodoExtraido.lista.primero.producto.nombre, nodoExtraido.lista.primero.producto.precio, nodoExtraido.lista.primero.producto.cantidad)
                    mover.izquierda = nodoExtraido.lista.primero.izquierda
                    mover.derecha = nodoExtraido.lista.primero.derecha

                    try{mover.anterior.derecha = mover.izquierda}catch(e){}
                    try{mover.siguiente.izquierda = mover.derecha}catch(e){}
                    

                    if (listaA.longitud == 5){
                        let nodoExtraido = this.dividirPagina(listaA.primero);
                        nodo.lista = listaA;
                        return nodoExtraido;
                    }
                }
                nodo.lista = listaA;
                break;
            }
            else if(aux.derecha == null && aux.izquierda == null){
                listaA.insertarEnPagina(id, nombre, precio, cantidad);

                if (listaA.longitud == 5){
                    let nodoExtraido = this.dividirPagina(listaA.primero);
                    nodo.lista = listaA;
                    return nodoExtraido;
                }
                nodo.lista = listaA;
                break;
            }
            aux = aux.siguiente
        }
    }

    dividirPagina(nodo){
        let aux = nodo.siguiente;
        let temp = aux.siguiente;
        aux.siguiente.anterior = null;
        aux.siguiente=null;
        temp.izquierda = new Pagina();
        temp.izquierda.lista.primero = nodo;
        temp.izquierda.lista.primero.siguiente = temp.izquierda.lista.ultimo = nodo.siguiente; 
        temp.izquierda.lista.longitud=2;
        temp.derecha = new Pagina();
        temp.derecha.lista.primero = temp.siguiente;
        temp.derecha.lista.primero.siguiente = temp.derecha.lista.ultimo = temp.siguiente.siguiente;
        temp.derecha.lista.longitud=2;
        temp.siguiente.anterior = null;
        temp.siguiente = null;
        let raiz = new Pagina();
        raiz.lista.primero = raiz.lista.ultimo = temp;
        raiz.lista.longitud = 1
        return raiz;
    }

    generarDOTviz(nodo){
        let cadena = "";
        if(nodo!=null){
            let aux = nodo.lista.primero;
            let identificador = aux.producto.id
            cadena+= identificador+'[label="|';
            let cadenaIzq = "";
            let cadenaDer = "";
            while(aux!=null){
                cadena += aux.producto.id +' '+aux.producto.nombre+' '+aux.producto.precio+'| ';

                if(aux.izquierda != null){
                    cadenaIzq += identificador+"->"+aux.izquierda.lista.primero.producto.id+";";
                    cadenaIzq += this.generarDOTviz(aux.izquierda);
                }

                if(aux.derecha != null){
                    cadenaDer += identificador+"->"+aux.derecha.lista.primero.producto.id+";";
                    cadenaDer += this.generarDOTviz(aux.derecha);
                }
                aux = aux.siguiente;
            }
            cadena += '"];';
            cadena += cadenaIzq + cadenaDer;
        }
        return cadena;
    }
    
    graficar(){
        let dot="{\n";
        dot+="rankr=TB;\n";
        dot+="node[shape = box,fillcolor=\"azure2\" color=\"black\" style=\"filled\"];\n";
        //metodos para graficar el arbol
        if(this.raiz!=null){
            dot+= this.graficarNodos(this.raiz);
            dot+=  this.graficarEnlaces(this.raiz);
        }
        dot+="}\n"

        return dot;
    }

    graficarNodos(nodo){
        let dot="";

        if(nodo.lista.primero.izquierda == null){
            dot+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = nodo.lista.primero;
            while(aux!=null){
                contador++;
                dot+="|{"+aux.producto.id+" "+aux.producto.nombre+" "+aux.producto.precio+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            dot+="\"]"+nodo.lista.primero.producto.id+";\n";
            return dot;
        }else{
            dot+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = nodo.lista.primero;
            while(aux!=null){
                contador++;
                dot+="|{"+aux.producto.id+" "+aux.producto.nombre+" "+aux.producto.precio+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            dot+="\"]"+nodo.lista.primero.producto.id+";\n";

            aux = nodo.lista.primero;
            while(aux != null){
                dot+= this.graficarNodos(aux.izquierda);
                aux = aux.siguiente;
            }
            dot+= this.graficarNodos(nodo.lista.ultimo.derecha);
            return dot;
        }   
    }

    graficarEnlaces(nodo){
        let dot="";
        if(nodo.lista.primero.izquierda == null){
            return ""+nodo.lista.primero.producto.id+";\n";
        }else{

            let aux = nodo.lista.primero;
            let contador =0;
            let nodoIdentificador = nodo.lista.primero.producto.id;
            while(aux != null){
                dot+= "\n"+nodoIdentificador+":p"+contador+"->"+this.graficarEnlaces(aux.izquierda);
                contador++;
                aux = aux.siguiente;
            }
            dot+="\n"+nodoIdentificador+":p"+contador+"->"+this.graficarEnlaces(nodo.lista.ultimo.derecha);
            return dot;
        }
    }
}

/*
let arbol = new arbolB();
arbol.insertar(45,"coca",12.4,34);
arbol.insertar(35,"coca",12.4,34);
arbol.insertar(2,"coca",12.4,34);
arbol.insertar(15,"coca",12.4,34);
arbol.insertar(1,"coca",12.4,34);
arbol.insertar(56,"coca",12.4,34);
arbol.insertar(20,"coca",12.4,34);
arbol.insertar(10,"coca",12.4,34);
console.log(arbol.graficar());*/