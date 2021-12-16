class nodo{
    constructor(id, usuario, correo){
        this.objeto = new Cliente(id, usuario, correo);
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaDoble{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(id, usuario, correo){
        let nuevo = new nodo(id, usuario, correo);
        if (this.primero == null){
            this.primero=this.ultimo=nuevo;
        }
        else if (this.primero.objeto.id < nuevo.objeto.id && this.primero.siguiente == null){
            nuevo.anterior = this.primero;
            this.primero.siguiente = nuevo;
            this.ultimo = nuevo;
        }else if (this.primero.objeto.id > nuevo.objeto.id){
            this.primero.anterior = nuevo;
            nuevo.siguiente = this.primero;
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            while(aux != null){
                if (aux == this.ultimo && aux.objeto.id < nuevo.objeto.id){
                    nuevo.anterior = aux; 
                    aux.siguiente = nuevo;
                    this.ultimo = nuevo;
                    break;
                }
                else if (aux != this.ultimo && aux.siguiente.objeto.id > nuevo.objeto.id && aux.objeto.id < nuevo.objeto.id){
                    nuevo.siguiente = aux.siguiente;
                    nuevo.anterior = aux;
                    nuevo.siguiente.anterior = nuevo;
                    aux.siguiente = nuevo;
                    break;
                }

                aux = aux.siguiente;
            }
        }
    }

    mostrarLista(){
        let aux = this.primero;
        while (aux != null){
            console.log("   ->"+aux.objeto.id);
            aux = aux.siguiente;
        } 
    }
} 
