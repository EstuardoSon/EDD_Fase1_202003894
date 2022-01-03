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

    //Metodo de ingreso un nodo al arbol
    insertar(id, usuario, correo, password, edad){
        let nuevo = new nodoArbolAVL(id, usuario, correo, password, edad);
        if (this.raiz == null){
            this.raiz = nuevo;
        }
        else{
            this.raiz=this.insertarAux(this.raiz, nuevo);
        }
    }
    
    //Función recursiva para insertar un nodo en el arbol
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

    //Función para calcular la altura en la que se encuentra un nodo
    calcularfactorBalance(padre){
        if(padre == null){
            return -1;
        }else{
            return padre.factorBalance;
        }
    }

    //Función para retornar el mayor de dos numeros
    mayor(valor1, valor2){
        if(valor1 > valor2){
            return valor1;
        }else{
            return valor2;
        }

    }

    //Función para mover el nodo izquierdo hacía arriba
    rotarIzquierda(padre){
        let aux = padre.izquierda;
        padre.izquierda= aux.derecha;
        aux.derecha = padre;
        padre.factorBalance = this.mayor(this.calcularfactorBalance(padre.derecha),this.calcularfactorBalance(padre.izquierda)) + 1;
        aux.factorBalance = this.mayor(this.calcularfactorBalance(aux.derecha),this.calcularfactorBalance(aux.izquierda)) + 1;
        return aux;
    }

    //Función para mover el nodo derecho hacía arriba
    rotarDerecha(padre){
        let aux = padre.derecha;
        padre.derecha= aux.izquierda;
        aux.izquierda = padre;
        padre.factorBalance = this.mayor(this.calcularfactorBalance(padre.izquierda),this.calcularfactorBalance(padre.derecha)) + 1;
        aux.factorBalance = this.mayor(this.calcularfactorBalance(aux.izquierda),this.calcularfactorBalance(aux.derecha)) + 1;
        return aux;
    }

    //Rotación doble izquierda
    rotarIzquierdaaDerecha(padre){
        padre.izquierda = this.rotarDerecha(padre.izquierda);
        let aux = this.rotarIzquierda(padre);
        return aux;
    }

    //Rotación doble Derecha
    rotarDerechaaIzquierda(padre){
        padre.derecha = this.rotarIzquierda(padre.derecha);
        let aux = this.rotarDerecha(padre);
        return aux;
    }
    
    //Función buscar que retorna el nombre de usuario de una persona
    buscar(dato, password){
        if (dato==this.raiz.objeto.id && password == this.raiz.objeto.password){
            localStorage.setItem("actualVendedor", CircularJSON.stringify(this.raiz.objeto));
            return this.raiz.objeto.usuario;
        }else{
            return this.buscarAux(dato, this.raiz, password);
        }
    }

    //Función buscar que retorna el nombre usuario de una persona
    //en caso no sea la raiz
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

    //Metodo para remplazar el objeto de la raiz del
    buscarActualizar(vendedor, id){
        if (id==this.raiz.objeto.id){
            this.raiz.objeto = vendedor
        }else{
            this.buscarActualizarAux(vendedor, this.raiz, id);
        }
    }

    //Metodo auxiliar para actualizar un nodo
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

    //Funcion que retorna el objeto del nodo raiz
    buscarVendedor(dato){
        if (dato==this.raiz.objeto.id){
            return this.raiz.objeto;
        }else{
            return this.buscarVendedorAux(dato, this.raiz);
        }
    }

    //Funcion que retorna el objeto de un nodo
    //diferente de la raiz
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

    //Metodo para eliminar el nodo raiz
    buscarE(dato){
        if (dato==this.raiz.objeto.id){
            let masDerecha = this.masDerecha(this.raiz.izquierda); 
            console.log(masDerecha);
            let masIzquierda = this.masIzquierda(this.raiz.derecha);
            console.log(masIzquierda)
             
            if(masDerecha == null && masIzquierda ==null){
                this.raiz = masDerecha;
                try{
                    this.raiz = this.buscarPrimerError(this.raiz, this.buscarMasLejano(this.raiz));
                }catch(e){
                    console.log(e)
                }
            }
            else if(masIzquierda !=null){
                try{
                    this.raiz.derecha = this.masIzquierdaRomperConexion(this.raiz.derecha,masIzquierda);
                    if(this.raiz.derecha != null){
                        masIzquierda.derecha = this.raiz.derecha;
                    }
                    masIzquierda.izquierda = this.raiz.izquierda;
                    try{
                        this.raiz = this.buscarPrimerError(this.raiz, this.buscarMasLejano(this.raiz));
                    }catch(e){
                        console.log(e)
                    }
                }catch(e){
                    console.log(e);
                }
                masIzquierda.factorBalance = this.mayor(this.calcularfactorBalance(masIzquierda.izquierda), this.calcularfactorBalance(masIzquierda.derecha)) +1;
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
                masDerecha.factorBalance = this.mayor(this.calcularfactorBalance(masDerecha.izquierda), this.calcularfactorBalance(masDerecha.derecha)) +1;
                this.raiz = masDerecha;
                try{
                    this.raiz = this.buscarPrimerError(this.raiz, this.buscarMasLejano(this.raiz));
                }catch(e){
                    console.log(e)
                }
            }
        }else{
            this.raiz = this.buscarEAux(dato, this.raiz);
        }
    }

    //Metodo para eliminar un nodo diferente
    //de la raiz
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
            let masIzquierda = this.masIzquierda(padre.derecha);
            
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
                masIzquierda.factorBalance = this.mayor(this.calcularfactorBalance(masIzquierda.izquierda), this.calcularfactorBalance(masIzquierda.derecha)) +1;
                try{
                    masIzquierda = this.buscarPrimerError(masIzquierda, this.buscarMasLejano(masIzquierda));
                }catch(e){
                    console.log(e)
                }
                return masIzquierda;
            }
            else{
                try{
                   padre.izquierda = this.masDerechaRomperConexion(padre.izquierda,masDerecha);
                   if (padre.izquierda != null){
                    masDerecha.izquierda = padre.izquierda;
                   }
                   masDerecha.derecha = padre.derecha;
                }catch(e){
                    console.log(e);
                }
                masDerecha.factorBalance = this.mayor(this.calcularfactorBalance(masDerecha.izquierda), this.calcularfactorBalance(masDerecha.derecha)) +1;
                try{
                    masDerecha = this.buscarPrimerError(masDerecha, this.buscarMasLejano(masDerecha));
                }catch(e){
                    console.log(e)
                }
                return masDerecha;
            }
        }
        padre.factorBalance = this.mayor(this.calcularfactorBalance(padre.izquierda), this.calcularfactorBalance(padre.derecha)) +1;
        try{
            padre = this.buscarPrimerError(padre, this.buscarMasLejano(padre));
            console.log(padre)
        }catch(e){
            console.log(e)
        }
        return padre;
    }

    //Funcion que retorna el nodo izquierdo
    //mas a la derecha
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

    //Metodo para romper la conexion entre el
    //nodo mas a la derecha y su padre
    masDerechaRomperConexion(padre,nodo){
        if(padre == nodo){
            return padre.izquierda;
        }else{
            padre.derecha = this.masDerechaRomperConexion(padre.derecha,nodo);
            padre.factorBalance = this.mayor(this.calcularfactorBalance(padre.izquierda), this.calcularfactorBalance(padre.derecha)) +1;
            return padre;
        }
    }

    //Funcion que retorna el nodo derecho
    //mas a la izquierda
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

    //Metodo para romper la conexion entre el 
    //nodo mas a la izquierda y su padre
    masIzquierdaRomperConexion(padre,nodo){
        if(padre == nodo){
            return padre.derecha;
            
        }else{
            padre.izquierda = this.masIzquierdaRomperConexion(padre.izquierda,nodo);
            padre.factorBalance = this.mayor(this.calcularfactorBalance(padre.izquierda), this.calcularfactorBalance(padre.derecha)) +1;
            return padre;
        }
    }

    //Funcion que retorna el nodo mas lejano al
    //nodo ingresado
    buscarMasLejano(padre){
        if(padre.izquierda == null && padre.derecha == null){
            return padre;
        }
        else if (padre.izquierda==null){
            return this.buscarMasLejano(padre.derecha);
        }
        else if (padre.derecha==null){
            return this.buscarMasLejano(padre.izquierda);
        }
        else if (padre.izquierda.factorBalance >= padre.derecha.factorBalance){
            return this.buscarMasLejano(padre.izquierda);
        }
        else{
            return this.buscarMasLejano(padre.derecha);
        }
    }

    //Funcion que retorna que realiza el rejuste
    //Entre el nodo desvalanceado y su más lejano
    buscarPrimerError(padre, masLejano){
        if (masLejano.objeto.id > padre.objeto.id){
            if ((this.calcularfactorBalance(padre.derecha) - (this.calcularfactorBalance(padre.izquierda)))==2){
                if(masLejano.objeto.id > padre.derecha.objeto.id){
                    padre = this.rotarDerecha(padre);
                }else{
                    padre = this.rotarDerechaaIzquierda(padre);
                }
            }
        }
        if (masLejano.objeto.id < padre.objeto.id){
            if((this.calcularfactorBalance(padre.derecha) - this.calcularfactorBalance(padre.izquierda))==-2){
                if(masLejano.objeto.id < padre.izquierda.objeto.id){
                    console.log("giro")
                    padre = this.rotarIzquierda(padre);
                    console.log(padre)
                }else{
                    console.log("doble giro")
                    padre = this.rotarIzquierdaaDerecha(padre);
                }
            }
        }
        else{
            if ((this.calcularfactorBalance(padre.derecha) - this.calcularfactorBalance(padre.izquierda))<-2){
                padre = this.buscarPrimerError(padre.izquierda, masLejano);
            }
            else if ((this.calcularfactorBalance(padre.derecha) - this.calcularfactorBalance(padre.izquierda))>2){
                padre = this.buscarPrimerError(padre.derecha, masLejano);
            }
        }
        return padre;
    }

    //Funcion que retorna un String formato DOT
    graficar(padre){
        if (padre != null){
            this.dot += padre.objeto.id+' [label="'+padre.objeto.id+' '+padre.objeto.usuario+' '+padre.objeto.correo+' '+padre.objeto.password+' '+padre.factorBalance+'"];';

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

    encriptacion(padre){
        if (padre != null){
            this.dot += "ID: "+padre.objeto.id+'\n  -Usuario: '+padre.objeto.usuario+' \n    '+sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(padre.objeto.usuario))+'\n  -Correo: '+padre.objeto.correo+' \n  '+sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(padre.objeto.correo))+'\n   -Contraseña: '+padre.objeto.password+' \n   '+sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(padre.objeto.password))+"\n ";

            this.encriptacion(padre.izquierda);
            this.encriptacion(padre.derecha);
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
