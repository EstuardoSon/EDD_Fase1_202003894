class listaProductos{
    constructor(){
        this.primero = null;
        this.total = 0;
        this.ultimo = null;
    }

    insertarProducto(id, nombre, precio, cantidad){
        let nuevo = new productoVendido(id, nombre, precio, cantidad);
        if (this.primero == null){
            this.primero = this.ultimo = nuevo;
            this.total += precio * cantidad;
        }
        else{
            this.ultimo.siguiente = nuevo;
            this.ultimo = nuevo;
            this.total += precio * cantidad;
        }
    }
}

class Venta{
    constructor(id, vendedor, cliente, listaProductos){
        this.id = id;
        this.vendedor = vendedor;
        this.cliente = cliente;
        this.total = listaProductos.total;
        this.listaProductos = listaProductos;
    }
}

class productoVendido{
    constructor(id, nombre, precio, cantidad){
        this.id = id;
        this.nombre = nombre; 
        this.precio = precio;
        this.cantidad = cantidad;
        this.siguiente = null;
    }
}

class TablaHash{
    constructor(){
        this.arreglo = new Array(7)
        this.tamañoActual = 7;
        this.ocupacion = 0;
        this.factorOcupacion = 0;
    }

    ingresar(id, vendedor, cliente, listaProductos){
        let nuevo = new Venta(id, vendedor, cliente, listaProductos)

        let hash = id % this.tamañoActual;

        if (this.arreglo[hash] == null){
            this.arreglo[hash] = nuevo; 
            this.ocupacion += 1;
            this.factorOcupacion = this.ocupacion / this.tamañoActual;
            if(this.factorOcupacion > 0.5){
                this.rehashing();          
            }
        }
        else{
            this.colision(nuevo, hash, 1, this.arreglo);
            this.ocupacion += 1;
        }
        this.factorOcupacion = this.ocupacion / this.tamañoActual;
    }

    colision(nuevo, hashAnt, contador, arreglo){
        let nuevoHash = (hashAnt + (contador*contador))% this.tamañoActual;
        if(arreglo[nuevoHash] == null){
            arreglo[nuevoHash] = nuevo;
            this.factorOcupacion = this.ocupacion / this.tamañoActual;

            if(this.factorOcupacion >= 0.5){
                this.rehashing();          
            }
        }
        else{
            this.colision(nuevo, hashAnt, contador+1, arreglo);
        }
    }

    rehashing(){
        let primoN = this.tamañoActual + 1
        while(!this.primo(primoN, primoN-1)){
            primoN +=1;
        }
        this.tamañoActual = primoN

        let cambioAHash = new Array(this.tamañoActual);
        for(let i = 0; i<this.arreglo.length; i++){
            if (this.arreglo[i] != null){
                let hash=this.arreglo[i].id % this.tamañoActual;

                if(cambioAHash[hash] == null){
                    cambioAHash[hash] = this.arreglo[i]
                }
                else{
                    this.colision(this.arreglo[i], hash, 1, cambioAHash);
                }
            }
        }
        this.arreglo = cambioAHash;
    }
    
    primo(numero, contador){
        if ((numero%contador) == 0 && contador!=1){
            return false;
        }
        else if((numero%contador) != 0){
            return this.primo(numero, contador-1);
        }
        else{
            return true;
        }
    }

    imprimir(){
        let cadena = "";
        let enlaces = "";
        let i = 0;
        for(i; i<this.tamañoActual; i++){
            if(this.arreglo[i] != null){
                cadena += 'node[fillcolor="orange" label="'+this.arreglo[i].id+' '+this.arreglo[i].vendedor+' '+this.arreglo[i].cliente+' '+this.arreglo[i].total+'"]Hash'+i+';\n';

                let aux = this.arreglo[i].listaProductos.primero;
                let contador = 0;
                enlaces += 'Hash'+i+'->P'+i+'_'+contador+';\n';
                
                while(aux!=null){
                    cadena += 'node[label="'+aux.id+' '+aux.nombre+' '+aux.cantidad+'"]P'+i+'_'+contador+';\n';
                    enlaces += 'P'+i+"_"+contador+'->P'+i+"_"+(contador+1)+';\n';
                    contador += 1;
                    aux = aux.siguiente;
                }
                cadena += 'node[label="Fin"]P'+i+'_'+contador+';\n';
            }
            else{
                cadena += 'node[fillcolor="orange" label="Vacio"]Hash'+i+';\n';
            }
            let siguiente = i+1;
            enlaces += 'Hash'+i+'->Hash'+siguiente+';\n';
        }
        cadena += 'node[fillcolor="azure2" label="Tabla Hash tamaño: '+i+'"]Hash'+i+';\n';
        return cadena+enlaces;
    }

    imprimirVentasVendedor(nombre){
        let cadena = "";
        let i = 0;
        for(i; i<this.tamañoActual; i++){
            if(this.arreglo[i] != null && this.arreglo[i].vendedor == nombre){
                cadena += 'Informacion de la Venta:\n   ID: '+this.arreglo[i].id+'  Cliente: '+this.arreglo[i].cliente+'  Total: '+this.arreglo[i].total+'\nProductos: \n';
                
                let aux = this.arreglo[i].listaProductos.primero;
                while(aux!=null){
                    cadena += '     * ID: '+aux.id+' Nombre: '+aux.nombre+' Cant: '+aux.precio+' Cant: '+aux.cantidad+'\n';
                    aux = aux.siguiente;
                }
            }
        }
        return cadena;
    }
}