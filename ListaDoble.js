class nodo{
    constructor(objeto){
        this.objeto = objeto;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaDoble{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertarFinal(objeto){
        let nuevo = new nodo(objeto);

        if (this.primero == null){
            this.primero = this.ultimo = nuevo;
        }else{
            nuevo.anterior = this.ultimo;
            this.ultimo.siguiente = nuevo
            this.ultimo = nuevo
        }
    }

    mostrarLista(){
        let aux = this.primero;
        while (aux != null){
            console.log("   ->"+aux.objeto.verDatos());
            aux = aux.siguiente;
        } 
    }
} 