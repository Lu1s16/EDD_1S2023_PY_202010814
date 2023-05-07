class Nodo{
    constructor(archivo){
        this.archivo = archivo;
        this.siguiente = null;
    }
}

class ListaCompartidos{
    constructor(){
        this.primero = null;
        this.contenido = "";
        this.size = 0;
    }

    InsertarAlFinal(archivo){
        var Nuevo_nodo = new Nodo(archivo);
        
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

        console.log("Se inserto un archivo compartido")
    }

    Imprimir(){
        var actual = this.primero
        while(actual != null){
            console.log(actual.destino)
            actual = actual.siguiente;

        }

    }

    tarjeta_archivos(){

        var actual = this.primero
        var tarjetas = "<center><h2>Compartidos conmigo</h2></center>";
        while(actual != null){

            

            if(actual.archivo.includes(".pdf")){
                tarjetas+=`
                <div id="tarjeta_compartido">
                    <center><p>${actual.archivo}</p></center>

                    <iframe src="${actual.archivo}" id="${actual.archivo}" ><p>Mensaje prueba</iframe>

	                
                </div>
	            `
            } else if (actual.archivo.includes(".png") || actual.archivo.includes(".jpg") || actual.archivo.includes("jpeg")){
                tarjetas+=`
                <div id="tarjeta_compartido">
                    <center><p>${actual.archivo}</p></center>

                    <img src="${actual.archivo}"/>
	                
                </div>
	            `

            } else if (actual.archivo.includes(".txt")){

                console.log(actual.archivo);

                tarjetas+=`
                <div id="tarjeta_compartido">
                    <center><p>${actual.archivo}</p></center>
                    <textarea rows="10" cols="40"></textarea>
                    
                </div>
                `;

               

                
                
                

                

                

            }

            

            actual = actual.siguiente
        }

        return tarjetas;


    }

    

}

export { ListaCompartidos };