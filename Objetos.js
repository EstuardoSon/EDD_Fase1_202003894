class Persona{
    constructor(id, usuario, correo){
        this.id = id;
        this.usuario = usuario;
        this.correo = correo;
    }

    verDatos(){};
}

class Vendedor extends Persona{
    constructor(id, usuario, correo, password, edad){
        super(id, usuario, correo);
        this.password = password;
        this.edad = edad;
        this.listaClientes = new ListaDoble();
        this.meses = new Array(12);
    }
    
    verDatos(){
        return this.id+" "+this.usuario+" "+this.correo+" "+this.password+" "+this.edad+" ";
    }

    añadirCliente(id, usuario, correo){
        this.listaClientes.insertarFinal(new Cliente(id, usuario, correo));
        this.listaClientes.mostrarLista();
    }
}

class Cliente extends Persona{
    constructor(id, usuario, correo){
        super(id, usuario, correo);
    }     

    verDatos(){
        return this.id+" "+this.usuario+" "+this.correo;
    }
}

class Proveedor extends Persona{
    constructor(id, usuario, correo, direccion, telefono){
        super(id, usuario, correo);
        this.direccion = direccion;
        this.telefono = telefono
    }

    verDatos(){
        return this.id+" "+this.usuario+" "+this.correo+" "+this.direccion+" "+this.telefono;
    }
}

/*
class Mes{
    constructor(){
        this.calendario = new Matriz();
    }
}*/
