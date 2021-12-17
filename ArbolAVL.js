class nodoArbolAVL{
    constructor(id, usuario, correo, password, edad){
        this.objeto = new Vendedor(id, usuario, correo, password, edad);
        this.izquierda = null;
        this.derecha = null;
        this.factorBalance = 0;
    }
}


class ArbolAVL{
    constructor(){
        this.raiz = null;
        this.dot="";
    }

    insertar(id, usuario, correo, password, edad){
        let nuevo = new nodoArbolAVL(id, usuario, correo, password, edad);
        if (this.raiz == null){
            this.raiz = nuevo;
        }
        else{
            this.raiz=this.insertarAux(this.raiz, nuevo);
        }
    }

    insertarAux(padre, nuevo){
        if(padre == null){
            padre = nuevo;
            return padre;
        }
        else{
            if(padre.objeto.id > nuevo.objeto.id){
                padre.izquierda = this.insertarAux(padre.izquierda,nuevo);
                let balance = this.calcularfactorBalance(padre.derecha)-this.calcularfactorBalance(padre.izquierda);
                
                if(balance ==-2){

                    if(nuevo.objeto.id < padre.izquierda.objeto.id){ 
                        padre = this.rotarIzquierda(padre);
                    }else{
                        padre = this.rotarIzquierdaaDerecha(padre);
                    }
                }
            }else if(padre.objeto.id < nuevo.objeto.id){
                padre.derecha = this.insertarAux(padre.derecha,nuevo);

                if(this.calcularfactorBalance(padre.derecha)-this.calcularfactorBalance(padre.izquierda)==2){
                    if(nuevo.objeto.id > padre.derecha.objeto.id){
                        padre=this.rotarDerecha(padre);
                    }else{
                        padre = this.rotarDerechaaIzquierda(padre);
                    }
                }

            }else{
                console.log("El dato ya existe");
            }

            padre.factorBalance = this.mayor(this.calcularfactorBalance(padre.derecha),this.calcularfactorBalance(padre.izquierda))+1
            return padre;
        }
    }

    calcularfactorBalance(padre){
        if(padre == null){
            return -1;
        }else{
            return padre.factorBalance;
        }
    }

    mayor(valor1, valor2){
        if(valor1 > valor2){
            return valor1;
        }else{
            return valor2;
        }

    }

    rotarIzquierda(padre){
        console.log(padre)
        let aux = padre.izquierda;
        console.log("aux")
        console.log(aux)
        padre.izquierda= aux.derecha;
        console.log("padreIzquierda")
        console.log(padre.izquierda)
        aux.derecha = padre;
        console.log("padreDerecha")
        console.log(padre.izquierda)
        padre.factorBalance = this.mayor(this.calcularfactorBalance(padre.derecha),this.calcularfactorBalance(padre.izquierda)) + 1;
        aux.factorBalance = this.mayor(this.calcularfactorBalance(aux.derecha),this.calcularfactorBalance(aux.izquierda)) + 1;
        return aux;
    }

    rotarDerecha(padre){
        let aux = padre.derecha;
        padre.derecha= aux.izquierda;
        aux.izquierda = padre;
        padre.factorBalance = this.mayor(this.calcularfactorBalance(padre.izquierda),this.calcularfactorBalance(padre.derecha)) + 1;
        aux.factorBalance = this.mayor(this.calcularfactorBalance(aux.izquierda),this.calcularfactorBalance(aux.derecha)) + 1;
        return aux;
    }


    rotarIzquierdaaDerecha(padre){
        padre.izquierda = this.rotarDerecha(padre.izquierda);
        let aux = this.rotarIzquierda(padre);
        return aux;
    }


    rotarDerechaaIzquierda(padre){
        padre.derecha = this.rotarIzquierda(padre.derecha);
        let aux = this.rotarDerecha(padre);
        return aux;
    }
    
    
    buscar(dato, password){
        if (dato==this.raiz.objeto.id && password == this.raiz.objeto.password){
            localStorage.setItem("actualVendedor", CircularJSON.stringify(this.raiz.objeto));
            return this.raiz.objeto.usuario;
        }else{
            return this.buscarAux(dato, this.raiz, password);
        }
    }

    buscarAux(dato, padre, password){
        
        console.log(dato)
        if (padre==null){
            return false;
        }
        else if (dato > padre.objeto.id){
            return this.buscarAux(dato, padre.derecha, password);
        }
        else if (dato < padre.objeto.id){
            return this.buscarAux(dato, padre.izquierda, password);
        }
        else if (dato == padre.objeto.id && password == padre.objeto.password){
            localStorage.setItem("actualVendedor", CircularJSON.stringify(padre.objeto));
            return true
        }
    }

    buscarActualizar(vendedor){
        let dato = localStorage.getItem("usuarioActual");
        if (dato==this.raiz.objeto.id){
            this.raiz.objeto = vendedor
        }else{
            this.buscarActualizarAux(vendedor, this.raiz, dato);
        }
    }

    buscarActualizarMasivo(vendedor){
        let dato = vendedor.id;
        if (dato==this.raiz.objeto.id){
            this.raiz.objeto = vendedor
        }else{
            this.buscarActualizarAux(vendedor, this.raiz, dato);
        }
    }

    buscarActualizarAux(vendedor, padre, dato){
        if (padre==null){
            console.log("No se actualizaron los datos");
        }
        else if (dato > padre.objeto.id){
            this.buscarActualizarAux(vendedor, padre.derecha, dato);
        }
        else if (dato < padre.objeto.id){
            this.buscarActualizarAux(vendedor, padre.izquierda, dato);
        }
        else if (dato == padre.objeto.id){
            padre.objeto = vendedor
        }
    }

    buscarVendedor(dato){
        if (dato==this.raiz.objeto.id){
            return this.raiz.objeto;
        }else{
            return this.buscarVendedorAux(dato, this.raiz);
        }
    }

    buscarVendedorAux(dato, padre){
        if (padre==null){
            return null;
        }
        else if (dato > padre.objeto.id){
            return this.buscarVendedorAux(dato, padre.derecha);
        }
        else if (dato < padre.objeto.id){
            return this.buscarVendedorAux(dato, padre.izquierda);
        }
        else if (dato == padre.objeto.id){
            return padre.objeto;
        }
    }

    graficar(padre){
        if (padre != null){
            this.dot += padre.objeto.id+' [label="'+padre.objeto.id+' '+padre.objeto.usuario+' '+padre.objeto.correo+' '+padre.objeto.password+'"];';

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

//let arbol= new ArbolAVL();
//arbol.insertar(2,"Estuardo","asdf@gmail.com","asdfasdf",34);
//arbol.insertar(4,"Angel","asdf@gmail.com","jtuityu",341);
//arbol.insertar(1,"Diego","asdf@gmail.com","hfgh",3);
//arbol.insertar(3,"Laura","asdf@gmail.com","47676",34);
//arbol.insertar(6,"Adriana","asdf@gmail.com","wrtwa",34134);
//arbol.insertar(5,"Adriana","asdf@gmail.com","wrtwa",34134);
