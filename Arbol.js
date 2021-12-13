/*Arbol Binario para */

class nodoArbol{
    constructor(objeto){
        this.objeto = new Proveedor(id, usuario, correo, direccion, telefono);
        this.padre = null;
        this.izquierda = null;
        this.derecha = null;
    }
}

class arbol{
    constructor(){
        this.raiz = null; 
    }

    insertar(datos){
        let nuevo = new nodoArbol(datos);
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
}