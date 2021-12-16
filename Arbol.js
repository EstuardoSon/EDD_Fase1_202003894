/*Arbol Binario para Proveedores*/

class nodoArbol{
    constructor(id, usuario, correo, direccion, telefono){
        this.objeto = CircularJSON.stringify(new Proveedor(id, usuario, correo, direccion, telefono));
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
            console.log("Se registro el Proveedor"); 
        }
        else{
           this.raiz = this.insertarAux(nuevo,this.raiz);
        }
    }

    insertarAux(nuevo, padre){
        if (padre==null){
            padre = nuevo;
            console.log("Se registro el Proveedor"); 
            return padre;
        }
        else{
            nuevo.padre = padre 
            if(nuevo.objeto.id > padre.objeto.id){
                padre.derecha = this.insertarAux(nuevo, padre.derecha);
            }
            else if(nuevo.objeto.id < padre.objeto.id){
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
            return this.raiz.objeto.usuario;
        }else{
            return this.buscarAux(dato, this.raiz);
        }
    }

    buscarAux(dato, padre){
        if (padre==null){
            return "No se encontro ninguna conincidencia";
        }
        else if (dato > padre.objeto.id){
            return this.buscarAux(dato, padre.derecha);
        }
        else if (dato < padre.objeto.id){
            return this.buscarAux(dato, padre.izquierda);
        }
        else if (dato == padre.objeto.id){
            console.log("hola")
            return padre.objeto.usuario
        }
    }

    graficar(padre){
        if (padre != null){
            this.dot += padre.objeto.id+' [label="'+padre.objeto.id+' '+padre.objeto.usuario+' '+padre.objeto.correo+'"];';
            if (padre.izquierda != null){ 
                this.dot += padre.objeto.id+'->'+padre.izquierda.objeto.id+';';
            }
            if (padre.derecha != null){
                this.dot += padre.objeto.id+'->'+padre.derecha.objeto.id+';';
            } 
            this.graficar(padre.izquierda);
            this.graficar(padre.derecha);
        }
        return this.dot;
    }
}
//localStorage.clear();

/*
localStorage.setItem("arbol",JSON.stringify(new Arbol()));
let arbol= new Arbol();
let arbolJson = JSON.parse(localStorage.getItem("arbol"));
Object.assign(arbol,arbolJson)


arbol.insertar(2,"Estuardo","asdf@gmail.com","San Miguel Petapa",3413412341);
arbol.insertar(4,"Angel","asdf@gmail.com","San Miguel Petapa",3413412341);
arbol.insertar(1,"Diego","asdf@gmail.com","San Miguel Petapa",3413412341);
arbol.insertar(3,"Laura","asdf@gmail.com","San Miguel Petapa",3413412341);
arbol.insertar(6,"Adriana","asdf@gmail.com","San Miguel Petapa",3413412341);
console.log("{"+arbol.graficar(arbol.raiz)+"}")
*/
