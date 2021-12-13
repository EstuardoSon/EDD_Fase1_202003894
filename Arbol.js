/*Arbol Binario para */

class nodoArbol{
    constructor(id, usuario, correo, direccion, telefono){
        this.objeto = new Proveedor(id, usuario, correo, direccion, telefono);
        this.padre = null;
        this.izquierda = null;
        this.derecha = null;
    }
}

class Arbol{
    constructor(){
        this.raiz = null; 
    }

    insertar(id, usuario, correo, direccion, telefono){
        let nuevo = new nodoArbol(id, usuario, correo, direccion, telefono);
        if (this.raiz == null){
            raiz = nuevo;
        }
        else{
            this.insertarAux(nuevo,this.raiz);
        }
    }

    insertarAux(nuevo, padre){
        if (padre==null){
            return nuevo;
        }
        else{
            nuevo.padre = padre
            if(nuevo.objeto.id > padre.objeto.id){
                padre.derecha = this.insertarAux(objeto,padre.derecha);
            }
            else if(nuevo.objeto.id < padre.objeto.id){
                padre.izquierda = this.insertarAux(objeto,padre.izquierda);
            }
            return padre;
        }
    }

    buscar(dato){
        if (dato==this.raiz.objeto.id){
            return this.raiz.objeto.verDatos();
        }else{
            this.buscarAux(dato, this.raiz);
        }
    }

    buscarAux(dato, nodo){
        if (dato > nodo.objeto.id){
            return this.buscar(dato, nodo.derecha);
        }
        else if (dato < nodo.objeto.id){
            return this.buscar(dato, nodo.derecha);
        }
        else if (dato == nodo.objeto.id){
            return nodo.objeto.verDatos();
        }
        else{
            return "No se encontro ninguna conincidencia";
        }
    }

    graficar(nodo){
        let aux = nodo;
        let dot = '{';

        if (aux != null){
            if (aux.izquierda != null){ 
                dot += aux.objeto.verDatos()+'--'+aux.izquierda.objeto.verDatos()+';';
            }
            if (aux.derecha != null){
                dot += aux.objeto.verDatos()+'--'+aux.derecha.objeto.verDatos()+';';
            } 
            this.graficar(aux.izquierda);
            this.graficar(aux.derecha);
        }

        dot += '}';
    }
}

let arbol = new Arbol();
arbol.insertar(1,"Estuardo","asdf@gmail.com","San Miguel Petapa",3413412341);
arbol.insertar(4,"Angel","asdf@gmail.com","San Miguel Petapa",3413412341);
arbol.insertar(16,"Diego","asdf@gmail.com","San Miguel Petapa",3413412341);
arbol.insertar(3,"Laura","asdf@gmail.com","San Miguel Petapa",3413412341);
arbol.insertar(2,"Adriana","asdf@gmail.com","San Miguel Petapa",3413412341);