/*Lista Doble para Clientes*/
/*class Cliente{
    constructor(id, usuario, correo){
        this.id = id
        this.usuario = usuario
        this.correo = correo
    }
}*/

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
        this.dot = "";
    }

    eliminar(id){
        if (this.primero == null){
            console.log("Lista Vacía")
        }
        else if (this.primero.objeto.id == id){
            this.primero.siguiente.anterior = null
            this.primero = this.primero.siguiente
        }else{
            let aux = this.primero;
            while(aux != null){
                if (aux == this.ultimo && aux.objeto.id == id){
                    aux = aux.anterior
                    this.ultimo = this.ultimo.anterior;
                    this.ultimo.siguiente = null;
                    break;
                }
                else if (aux.objeto.id == id){
                    aux.anterior.siguiente = aux.siguiente;
                    aux.siguiente.anterior =  aux.anterior;
                    break;
                }

                aux = aux.siguiente;
            }
        }
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

    graficar(){
        let aux = this.primero;
        while (aux != null){
            this.dot += aux.objeto.id+'[label="'+aux.objeto.id+' '+aux.objeto.usuario+' '+aux.objeto.correo+'"];';
            if (aux.siguiente != null){
                this.dot += aux.objeto.id+"->"+aux.siguiente.objeto.id+";";
                this.dot += aux.siguiente.objeto.id+"->"+aux.objeto.id+";";
            }
            aux = aux.siguiente;
        } 
        return this.dot
    }
} 

/*
let ejemplo = new ListaDoble();
ejemplo.insertar(5,"","");
ejemplo.insertar(7,"","");
ejemplo.insertar(43,"","");
ejemplo.insertar(2,"","");
ejemplo.insertar(4,"","");
ejemplo.insertar(11,"","");
ejemplo.insertar(9,"","");
ejemplo.insertar(12,"","");
ejemplo.insertar(7,"","");
ejemplo.eliminar(43);
ejemplo.eliminar(12);
ejemplo.mostrarLista();*/