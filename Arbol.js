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
        this.dot=""; 
    }

    insertar(id, usuario, correo, direccion, telefono){
        let nuevo = new nodoArbol(id, usuario, correo, direccion, telefono);
        if (this.raiz == null){
            this.raiz = nuevo;
        }
        else{
            console.log(nuevo.objeto.verDatos());
            this.insertarAux(nuevo,this.raiz);
        }
    }

    insertarAux(nuevo, padre){
        if (padre==null){
            padre = nuevo;
            return padre;
        }
        else{
            nuevo.padre = padre
            if(nuevo.objeto.id > padre.objeto.id){
                console.log(nuevo.objeto.verDatos());
                padre.derecha = this.insertarAux(nuevo, padre.derecha);
            }
            else if(nuevo.objeto.id < padre.objeto.id){
                console.log(nuevo.objeto.verDatos());
                padre.izquierda = this.insertarAux(nuevo, padre.izquierda);
            }
            else{
                console.log("El dato ya existe");
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
        if (nodo != null){
            this.dot += nodo.objeto.id+' [label="'+nodo.objeto.id+' '+nodo.objeto.usuario+'"];';
            if (nodo.izquierda != null){ 
                this.dot += nodo.objeto.id+'--'+nodo.izquierda.objeto.id+';';
            }
            if (nodo.derecha != null){
                this.dot += nodo.objeto.id+'--'+nodo.derecha.objeto.id+';';
            } 
            this.graficar(nodo.izquierda);
            this.graficar(nodo.derecha);
        }
        return this.dot;
    }
}

let arbol = new Arbol();
arbol.insertar(2,"Estuardo","asdf@gmail.com","San Miguel Petapa",3413412341);
arbol.insertar(4,"Angel","asdf@gmail.com","San Miguel Petapa",3413412341);
arbol.insertar(1,"Diego","asdf@gmail.com","San Miguel Petapa",3413412341);
arbol.insertar(3,"Laura","asdf@gmail.com","San Miguel Petapa",3413412341);
arbol.insertar(6,"Adriana","asdf@gmail.com","San Miguel Petapa",3413412341);
console.log("{"+arbol.graficar(arbol.raiz)+"}")