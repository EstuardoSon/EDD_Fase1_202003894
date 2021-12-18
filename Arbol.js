/*Arbol Binario para Proveedores*/

class nodoArbol{
    constructor(id, usuario, correo, direccion, telefono){
        this.objeto = new Proveedor(id, usuario, correo, direccion, telefono);
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

    buscarE(dato){
        if (dato==this.raiz.objeto.id){
            let masDerecha = this.masDerecha(this.raiz.izquierda); 
            console.log(masDerecha);
            let masIzquierda = this.masIzquierda(this.raiz.derecha);
            console.log(masIzquierda)
             
            if(masDerecha == null && masIzquierda ==null){
                this.raiz = masDerecha;
            }
            else if(masIzquierda !=null){
                try{
                    this.raiz.derecha = this.masIzquierdaRomperConexion(this.raiz.derecha,masIzquierda);
                    if(this.raiz.derecha != null){
                        masIzquierda.derecha = this.raiz.derecha;
                    }
                    masIzquierda.izquierda = this.raiz.izquierda;
                }catch(e){
                    console.log(e);
                }
                this.raiz = masIzquierda;
            }
            else{
                try{
                    this.raiz.izquierda = this.masDerechaRomperConexion(this.raiz.izquierda,masDerecha);
                    if(this.raiz.izquierda != null){
                        masDerecha.izquierda = this.raiz.izquierda;
                    }
                   masDerecha.derecha = this.raiz.derecha;
                }catch(e){
                    console.log(e);
                }
                this.raiz = masDerecha;
            }
        }else{
            this.raiz = this.buscarEAux(dato, this.raiz);
        }
    }
 
    buscarEAux(dato, padre){
        if (padre==null){
            console.log("No se encontro ninguna conincidencia");
            return padre;
        }
        else if (dato > padre.objeto.id){
            padre.derecha = this.buscarEAux(dato, padre.derecha);
        }
        else if (dato < padre.objeto.id){
            padre.izquierda = this.buscarEAux(dato, padre.izquierda);
        }
        else if (dato == padre.objeto.id){
            let masDerecha = this.masDerecha(padre.izquierda); 
            console.log(masDerecha);
            let masIzquierda = this.masIzquierda(padre.derecha);
            console.log(masIzquierda)
            
            
            if(masDerecha == null && masIzquierda ==null){
                return masDerecha;
            }
            else if(masIzquierda !=null){
                try{
                    padre.derecha = this.masIzquierdaRomperConexion(padre.derecha,masIzquierda);
                    if (padre.derecha != null){
                        masIzquierda.derecha = padre.derecha;
                    }
                    masIzquierda.izquierda = padre.izquierda;
                }catch(e){
                    console.log(e);
                }
                return masIzquierda;
            }
            else{
                try{
                   padre.izquierda = this.masDerechaRomperConexion(padre.izquierda,masDerecha);
                   masDerecha.derecha = padre.derecha;
                   if (padre.izquierda != null){
                    masDerecha.izquierda = padre.izquierda;
                   }
                }catch(e){
                    console.log(e);
                }
                return masDerecha;
            }
        }
        return padre;
    }

    masDerecha(nodo){
        if(nodo == null){
            return nodo;
        }
        else if(nodo.derecha == null){
            return nodo;
        }
        else{
            return this.masDerecha(nodo.derecha);
        }
    }

    masDerechaRomperConexion(padre,nodo){
        if(padre == nodo){
            return padre.izquierda;
        }else{
            padre.derecha = this.masDerechaRomperConexion(padre.derecha,nodo);
            return padre;
        }
    }

    masIzquierda(nodo){
        if(nodo == null){
            return nodo;
        }
        else if(nodo.izquierda == null){
            return nodo;
        }
        else{
            return this.masIzquierda(nodo.izquierda);
        }
    }

    masIzquierdaRomperConexion(padre,nodo){
        if(padre == nodo){
            return padre.derecha;
            
        }else{
            padre.izquierda = this.masIzquierdaRomperConexion(padre.izquierda,nodo);
            return padre;
        }
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
