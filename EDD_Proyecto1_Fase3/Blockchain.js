class Nodo{
    constructor(index, timestamp, transmiter, receiver, message, previousHash, hash){
        this.index = index;
        this.timestamp = timestamp;
        this.transmiter = transmiter;
        this.receiver = receiver;
        this.message = message;
        this.previousHash = previousHash;
        this.hash = hash;
        
        this.Siguiente = null;
        this.Anterior = null;
    }
}


class Blockchain{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    async InsertarAlFinal(timestamp, transmitter, receiver, message){
        
        //cirfro mensaje
        const clave = "clave123";
        const mensajeCifrado = CryptoJS.AES.encrypt(message, clave).toString();

        //Creo nodo
        var Nuevo_nodo = new Nodo(this.size, timestamp, transmitter, receiver, mensajeCifrado, "", "");


        

        //calculo hash
        // SHA-256(index+timestamp+transmitter+receiver+message)
        var valor = this.size+timestamp+transmitter+receiver+mensajeCifrado;

        if(this.primero == null){

            Nuevo_nodo.previousHash = "0000";
            Nuevo_nodo.hash = await this.getSha256(valor); 

            this.primero = Nuevo_nodo;
            this.ultimo = Nuevo_nodo;
            this.size++;
        }else{

            Nuevo_nodo.previousHash = this.ultimo.hash;

            Nuevo_nodo.hash = await this.getSha256(valor);


            var actual = this.primero
            while(actual.Siguiente != null){
                actual = actual.Siguiente;
            }

            actual.Siguiente = Nuevo_nodo;
            Nuevo_nodo.Anterior = actual;
            this.ultimo = Nuevo_nodo;
            this.size++;
           
        }
    }


    async getSha256(str){
        // PASAR EL OBJETO A STRING
        
        // OBTENER LOS BYTES DEL STRING 
        let bytes = new TextEncoder().encode(str);
        // OBTENER BYTES DEL HASH
        let hashBytes = await window.crypto.subtle.digest("SHA-256", bytes);
        // PASAR EL HASH A STRING 
        let hash = Array.prototype.map.call(new Uint8Array(hashBytes), x => ('00' + x.toString(16)).slice(-2)).join('');
        // RETORNAR EL HASH
        return hash;
    }




    Imprimir_de_primero_ultimo(){
        if(this.primero !== null){
            var actual = this.primero;
            console.log("================Blockchain================")
            console.log("prueba: "+actual);
            while(actual != null){
                console.log("Index: "+actual.index)
                console.log("Timestamp: " +actual.timestamp);
                console.log("Transmiter: "+ actual.transmiter);
                console.log("Receiver: "+ actual.receiver);
                console.log("Mesage: "+ actual.message);
                console.log("PreviousHash: " + actual.previousHash);
                console.log("Hash: " + actual.hash);
                console.log("----------------------------");
                actual = actual.Siguiente;
            }

        }
        

    }

    graficar(){
        var grafica = "";
        var nodos = "";
        var uniones = "";

        var actual = this.primero;
        var id = 1;

        while(actual != null){
            nodos += `nodo_${id}[label=" TimeStamp:${actual.timestamp} \\nEmisor: ${actual.transmiter} \\nReceptor: ${actual.receiver} \\nPreviousHash: ${actual.previousHash} "shape=box];\n`
        
            id++;
            actual = actual.Siguiente;
        }


        //uniones
        var primero = 1
        var cont = 0;
        var id = 1

        while(cont < this.size-1){

            cont++

            
            var id_next = id+1;
            uniones+=`nodo_${id}->nodo_${id_next};\n`
            
            id++

        }

        grafica+=nodos+uniones;

        var graphviz = "<h2>Reporte blockchain</h2><img id=\"image_lista_circular\"\n"+
        "   src=\'https://quickchart.io/graphviz?graph=digraph{"+ grafica +"}\'"+
        " />"

        return graphviz;

    }

    graficar_individual(index){

        var grafica = "";
        var nodos = "";
        

        var actual = this.primero;

        if(index <= this.size){

            while(actual != null){

                if(index == actual.index){
                    nodos += `nodo_${actual.index}[label=" index: ${actual.index} \\nTimeStamp: ${actual.timestamp} \\nEmisor: ${actual.transmiter} \\nReceptor: ${actual.receiver} \\nMensaje: ${actual.message} \\nPreviousHash: ${actual.previousHash} \\nHash: ${actual.hash} "shape=box];\n`
            
    
                }
                
                actual = actual.Siguiente;
            }

        }

        var graphviz = "<h2>Reporte bloques</h2><img id=\"image_lista_circular\"\n"+
        "   src=\'https://quickchart.io/graphviz?graph=digraph{"+ nodos +"}\'"+
        " />"

        return graphviz;

        



    }

    
}

export {Blockchain};
