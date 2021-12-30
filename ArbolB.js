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

    
    graficar(){
        let cadena="digraph arbolB{\n";
        cadena+="rankr=TB;\n";
        cadena+="node[shape = box,fillcolor=\"azure2\" color=\"black\" style=\"filled\"];\n";
        //metodos para graficar el arbol
        cadena+= this.graficar_nodos(this.raiz);
        cadena+=  this.graficar_enlaces(this.raiz);
        cadena+="}\n"

        return cadena;
    }

    graficar_nodos(raiz_actual){
        let cadena="";

        if(raiz_actual.lista.primero.izquierda == null){ //si es un hhoja solo grafica el nodo
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.lista.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.producto.id+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.lista.primero.producto.id+";\n";
            return cadena;
        }else{
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.lista.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.producto.id+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.lista.primero.producto.id+";\n";

            //recorrer los hicos de cada clave
            aux = raiz_actual.lista.primero;
            while(aux != null){
                cadena+= this.graficar_nodos(aux.izquierda);
                aux = aux.siguiente;
            }
            cadena+= this.graficar_nodos(raiz_actual.lista.ultimo.derecha);
            return cadena;
        }   
    }

    graficar_enlaces(raiz_actual){
        let cadena="";
        if(raiz_actual.lista.primero.izquierda == null){
            return ""+raiz_actual.lista.primero.producto.id+";\n";
        }else{
            //cadena += ""+raiz_actual.lista.primero.producto.id+";\n";

            let aux = raiz_actual.lista.primero;
            let contador =0;
            let raiz_actual_txt = raiz_actual.lista.primero.producto.id;
            while(aux != null){
                cadena+= "\n"+raiz_actual_txt+":p"+contador+"->"+this.graficar_enlaces(aux.izquierda);
                contador++;
                aux = aux.siguiente;
            }
            cadena+="\n"+raiz_actual_txt+":p"+contador+"->"+this.graficar_enlaces(raiz_actual.lista.ultimo.derecha);
            return cadena;
        }
    }
}

let arbol = new arbolB();
arbol.insertar(5);
arbol.insertar(1);
arbol.insertar(7);
arbol.insertar(3);
arbol.insertar(13);
arbol.insertar(8);
arbol.insertar(35);
arbol.insertar(14);
arbol.insertar(10);
arbol.insertar(9);
arbol.insertar(12);
arbol.insertar(17);
arbol.insertar(22);
arbol.insertar(25);

arbol.insertar(100);
arbol.insertar(150);
arbol.insertar(220);
arbol.insertar(325);




console.log(arbol.graficar());