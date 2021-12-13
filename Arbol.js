class Vendedor{
    constructor(id){
        this.id = id
    }
    
    verDatos(){
        return this.id;
    }
}

/*Arbol Binario para */

class nodoArbol{
    constructor(objeto){
        this.objeto = new Vendedor(objeto);
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

        }
    }
}