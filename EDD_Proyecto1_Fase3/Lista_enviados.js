class Nodo{
    constructor(mensaje, destino){
        this.mensaje = mensaje;
        this.destino = destino
        this.siguiente = null;
    }
}

class ListaEnviados{
    constructor(){
        this.primero = null;
        this.contenido = "";
        this.size = 0;
    }

    enviar(mensaje, destino){
        var Nuevo_nodo = new Nodo(mensaje, destino);
        
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

        console.log("Se envio el mensaje")
    }

    Imprimir(){
        var actual = this.primero
        while(actual != null){
            console.log(actual.destino)
            actual = actual.siguiente;

        }

    }

    tarjeta_enviados(){
        var actual = this.primero
        var tarjetas = "<center><h2>Mensajes enviados</h2></center>";
        
        while(actual != null){

            tarjetas+=`
                <div id="tarjeta_enviado">
                    <center>
                        <h3>user destino: ${actual.destino}</h3>
                        <p>${actual.mensaje}</p>
                    </center>
	                
                </div>
	            `

            actual = actual.siguiente;
            

        }

        return tarjetas;
    
    }

   

    

}

export { ListaEnviados };