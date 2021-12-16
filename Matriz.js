//Matriz para el Calendario de Actividades

class nodoCabecera{
    constructor(valor){
        this.valor = valor;
        this.longitud = 0;
        this.derecha = null;
        this.abajo = null;
    }
}

class listaCabecera{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    mostrarColumna(){
        let aux = this.primero;
        while (aux != null){
            console.log(aux.valor);
            aux = aux.derecha;
        }
    }
}

class nodoActividad{
    constructor(desc, dia, hora){
        this.desc = desc;
        this.dia = dia;
        this.hora = hora;
        this.derecha = null;
        this.abajo = null;
    }
}

class Matriz{
    constructor(){
        this.dia = new listaCabecera();
        this.hora = new listaCabecera();
        this.dot = "";
    }

    ingresarEnColumna(dia, hora, desc, columna){
        let nuevo = new nodoActividad(desc, dia, hora);
        let aux = columna.abajo;
        if (aux == null){
            columna.abajo=nuevo;
        }
        else if (aux.hora < nuevo.hora && aux.abajo == null){
            aux.abajo = nuevo;
        }else if (aux.hora > nuevo.hora){
            nuevo.abajo = aux;
            columna.abajo = nuevo;
        }else{
            while(aux != null){
                if (aux.abajo == null && aux.hora < nuevo.hora){
                    aux.abajo = nuevo;
                    break;
                }
                else if (aux.abajo!=null && aux.abajo.hora > nuevo.hora && aux.hora < nuevo.hora){
                    nuevo.abajo = aux.abajo;
                    aux.abajo = nuevo;
                    break;
                }

                aux = aux.abajo;
            }
        }
    }

    ingresarEnFila(dia, hora, desc, fila){
        let nuevo = new nodoActividad(desc, dia, hora);
        let aux = fila.derecha;
        if (aux == null){
            fila.derecha=nuevo;
        }
        else if (aux.dia < nuevo.dia && aux.derecha == null){
            aux.derecha = nuevo;
        }else if (aux.dia > nuevo.dia){
            nuevo.derecha = aux;
            fila.derecha = nuevo;
        }else{
            while(aux != null){
                if (aux.derecha == null && aux.dia < nuevo.dia){
                    aux.derecha = nuevo;
                    break;
                }
                else if (aux.derecha!=null && aux.derecha.dia > nuevo.dia && aux.dia < nuevo.dia){
                    nuevo.derecha = aux.derecha;
                    aux.derecha = nuevo;
                    break;
                }

                aux = aux.derecha;
            }
        }
    }

    ingresarColumna(valor){
        let nuevo = new nodoCabecera(valor);
        if (this.dia.primero == null){
            this.dia.primero=this.dia.ultimo=nuevo;
        }
        else if (this.dia.primero.valor < nuevo.valor && this.dia.primero.derecha == null){
            this.dia.primero.derecha = nuevo;
            this.dia.ultimo = nuevo;
        }else if (this.dia.primero.valor > nuevo.valor){
            nuevo.derecha = this.dia.primero;
            this.dia.primero = nuevo;
        }else{
            let aux = this.dia.primero;
            while(aux != null){
                if (aux == this.dia.ultimo && aux.valor < nuevo.valor){
                    aux.derecha = nuevo;
                    this.dia.ultimo = nuevo;
                    break;
                }
                else if (aux != this.dia.ultimo && aux.derecha.valor > nuevo.valor && aux.valor < nuevo.valor){
                    nuevo.derecha = aux.derecha;
                    aux.derecha = nuevo;
                    break;
                }

                aux = aux.derecha;
            }
        }
        return nuevo;
    }

    ingresarFila(valor){
        let nuevo = new nodoCabecera(valor);
        if (this.hora.primero == null){
            this.hora.primero=this.hora.ultimo=nuevo;
        }
        else if (this.hora.primero.valor < nuevo.valor && this.hora.primero.abajo == null){
            this.hora.primero.abajo = nuevo;
            this.hora.ultimo = nuevo;
        }else if (this.hora.primero.valor > nuevo.valor){
            nuevo.abajo = this.hora.primero;
            this.hora.primero = nuevo;
        }else{
            let aux = this.hora.primero;
            while(aux != null){
                if (aux == this.hora.ultimo && aux.valor < nuevo.valor){
                    aux.abajo = nuevo;
                    this.hora.ultimo = nuevo;
                    break;
                }
                else if (aux != this.hora.ultimo && aux.abajo.valor > nuevo.valor && aux.valor < nuevo.valor){
                    nuevo.abajo = aux.abajo;
                    aux.abajo = nuevo;
                    break;
                }

                aux = aux.abajo;
            }
        }
        return nuevo;
    }

    buscarColumna(valor){
        let aux = this.dia.primero;
        try {
            while (aux != null){
                if (aux.valor == valor){
                    return aux;
                }
    
                aux = aux.derecha;
            }
            return aux;
        } catch (error) {
            return aux;
        }
    }

    buscarFila(valor){
        let aux = this.hora.primero;
        try {
            while (aux != null){
                if (aux.valor == valor){
                    return aux;
                }
    
                aux = aux.abajo;
            }
            return aux;
        } catch (error) {
            return aux;
        }
    }

    ingresar(dia, hora, desc){
        let comprobarC = this.buscarColumna(dia);
        let comprobarF = this.buscarFila(hora);
        if (comprobarC != null){
            this.ingresarEnColumna(dia, hora, desc, comprobarC);
        }else{
            this.ingresarEnColumna(dia, hora, desc, this.ingresarColumna(dia));
        }
        if (comprobarF != null){
            this.ingresarEnFila(dia, hora, desc, comprobarF);
        }else{
            this.ingresarEnFila(dia, hora, desc, this.ingresarFila(hora));
        }
    }

    mostrarDatos(){
        let aux = this.hora.primero;
        while(aux != null){
            let tmp = aux.derecha;
            while (tmp != null){
                console.log(tmp.dia+" "+tmp.hora+" "+tmp.desc+" ");
                tmp = tmp.derecha;
            }
            aux = aux.abajo;
        }
    }

    graficar(){
        let aux = this.dia.primero;
        let fila=0;
        let columna =1;
        if(aux!=null){
            this.dot += 'calendario->d'+aux.valor+';';
        }
        while(aux != null){
            this.dot += 'd'+aux.valor+' [label="Dia: '+aux.valor+' " pos="'+fila+','+columna+'!"];'
            let tmp = aux.abajo;
            if (aux.derecha != null){
                this.dot += 'd'+aux.valor+'->d'+aux.derecha.valor+';';
                this.dot += 'd'+aux.derecha.valor+'->d'+aux.valor+';';
            }
            if (tmp!=null){
                this.dot += 'd'+aux.valor+'->d'+tmp.dia+'h'+tmp.hora+';';
                this.dot += 'd'+tmp.dia+'h'+tmp.hora+'->d'+aux.valor+';';
                while (tmp != null){
                    fila+=1;
                    this.dot += 'd'+tmp.dia+'h'+tmp.hora+' [label="'+tmp.desc+'"  pos="'+fila+','+columna+'!"];'
                    if (tmp.abajo!=null){
                        this.dot += 'd'+tmp.dia+'h'+tmp.hora+'->d'+tmp.abajo.dia+'h'+tmp.abajo.hora+';';
                        this.dot += 'd'+tmp.abajo.dia+'h'+tmp.abajo.hora+'->d'+tmp.dia+'h'+tmp.hora+';';
                    }
                    tmp = tmp.abajo
                }
            }
                columna += 1;
                aux = aux.derecha;
        }

        fila=1;
        let aux1 = this.hora.primero;
        if(aux1!=null){
            this.dot += 'calendario->h'+aux1.valor+';';
        }
        while(aux1 != null){
            this.dot += 'h'+aux1.valor+' [label="hora: '+aux1.valor+'" pos="'+fila+','+0+'!"];'
            let tmp = aux1.derecha;
            if (aux1.abajo != null){
                this.dot += 'h'+aux1.valor+'->h'+aux1.abajo.valor+';';
                this.dot += 'h'+aux1.abajo.valor+'->h'+aux1.valor+';';
            }
            if (tmp!=null){
                this.dot += 'h'+aux1.valor+'->d'+tmp.dia+'h'+tmp.hora+';';
                this.dot += 'd'+tmp.dia+'h'+tmp.hora+'->h'+aux1.valor+';';
                while (tmp != null){
                    if (tmp.derecha!=null){
                        this.dot += 'd'+tmp.dia+'h'+tmp.hora+'->d'+tmp.derecha.dia+'h'+tmp.derecha.hora+';';
                        this.dot += 'd'+tmp.derecha.dia+'h'+tmp.derecha.hora+'->d'+tmp.dia+'h'+tmp.hora+';';
                    }
                    tmp = tmp.derecha
                }
            }
            fila += 1;
                aux1 = aux1.abajo;
        }
        this.dot += ' { rank = same;d1; d2;}';

        return this.dot;
    }
}

let ejemplo = new Matriz();
ejemplo.ingresar(1,2,"hola");
ejemplo.ingresar(1,1,"hola");
localStorage.setItem("matriz",CircularJSON.stringify(ejemplo));
let matriz = new Matriz();
let matrizJson = CircularJSON.parse(localStorage.getItem("matriz"));
Object.assign(matriz, matrizJson)

matriz.ingresar(2,1,"hola");
matriz.ingresar(2,2,"hola");
//matriz.ingresar(1,1,"hola");
//matriz.ingresar(2,3,"hoa");
matriz.ingresar(2,8,"hoa");
//matriz.ingresar(1,4,"hola");
matriz.ingresar(1,7,"hola");
//matriz.mostrarDatos();
//localStorage.setItem("matriz",CircularJSON.stringify(matriz));
