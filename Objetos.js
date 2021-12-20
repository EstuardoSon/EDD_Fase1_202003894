class Mes{
    constructor(){
        this.calendario = new Matriz();
    }
}

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
        this.meses = [new Mes(), new Mes(), new Mes, new Mes(), new Mes(), new Mes(), new Mes, new Mes(), new Mes(), new Mes(), new Mes, new Mes()];
    }
    
    //Funcion que retorna los datos el Objeto
    verDatos(){
        return this.id+" "+this.usuario+" "+this.correo+" "+this.password+" "+this.edad+" ";
    }
}

class Cliente extends Persona{
    constructor(id, usuario, correo){
        super(id, usuario, correo);
    }     

    //Funcion que retorna los datos del objeto
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

    //Funcion que retorna los datos del objeto
    verDatos(){
        return this.id+" "+this.usuario+" "+this.correo+" "+this.direccion+" "+this.telefono;
    }
}



