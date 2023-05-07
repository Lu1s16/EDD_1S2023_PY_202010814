class Nodo{
    constructor(mensaje, origen){
        this.mensaje = mensaje;
        this.origen = origen
        this.siguiente = null;
    }
}

class ListaRecibidos{
    constructor(){
        this.primero = null;
        this.contenido = "";
        this.size = 0;
    }

    recibir(mensaje, origen){
        var Nuevo_nodo = new Nodo(mensaje, origen);
        
        if(this.primero == null){
            this.primero = Nuevo_nodo;     
            this.size++;

        } else{
            var actual = this.primero;
            while(actual.siguiente != null){
                actual = actual.siguiente;
            }
            actual.siguiente = Nuevo_nodo;
            this.size++;

        }

        console.log("Se recibio el mensaje")
    }

    Imprimir(){
        var actual = this.primero
        while(actual != null){
            console.log(actual.destino)
            actual = actual.siguiente;

        }

    }

    tarjeta_recibidos(){
        var actual = this.primero
        var tarjetas = "<center><h2>Mensajes recibidos</h2></center>";
        
        while(actual != null){

            tarjetas+=`
                <div id="tarjeta_recibido">
                    <center>
                        <h3>user origen: ${actual.origen}</h3>
                        <p>${actual.mensaje}</p>
                    </center>
	                
                </div>
	            `

            actual = actual.siguiente;
            

        }

        return tarjetas;
    
    }

    

    

    

}

export { ListaRecibidos };