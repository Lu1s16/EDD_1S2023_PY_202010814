class Nodo{
    constructor(accion, fecha, hora){
        this.accion = accion;
        this.fecha = fecha;
        this.hora = hora;
        this.Siguiente = null;
    }

}

class ListaCircular{
    constructor(){
        this.Primero = null;
        this.Ultimo = null;
        this.size = 0;
    }

    InsertarAlFinal(accion, fecha, hora){
        var Nuevo_nodo = new Nodo(accion, fecha, hora);

        if(this.Primero == null){
            this.Primero = Nuevo_nodo;
            this.Ultimo = Nuevo_nodo;
            this.Primero.Siguiente = this.Ultimo;
            this.size++;
        } else{
            var actual = this.Primero
            var cont = 1
            while(cont < this.size){
                actual = actual.Siguiente;

                cont++;
            }

            actual.Siguiente = Nuevo_nodo;
            Nuevo_nodo.Siguiente = this.Primero;
            this.Ultimo = Nuevo_nodo;

            this.size++;
        }


    }

    Imprimir(){
        var actual = this.Primero;
        var cont = 0;

        while(cont < this.size){
            console.log(actual.accion);
            console.log(actual.fecha);
            console.log(actual.hora);
            console.log("---------")
            actual = actual.Siguiente;
            cont++;
        }
    }

    graficar(){

        var grafica = ""
        var nodos = ""
        var uniones = ""

        
        var actual = this.Primero;
        var cont = 0;
        var id = 1;

        //Creo nodos
        while(cont < this.size){

            nodos += "nodo_"+id+"[label=\" "+ actual.accion + "\n Fecha: " + actual.fecha + "\n Hora: "+ actual.hora + " \" shape=box];\n "


            actual = actual.Siguiente;
            cont++;
            id++

            
        }

        //Creo uniones
        
        var primero = 1
        cont = 0
        id = 1

        while(cont < this.size){


            cont++
            

            if(cont == this.size){

                uniones+="nodo_"+id+"->nodo_"+primero+";\n"

            } else {
                var id_next = id+1;
                uniones+="nodo_"+id+"->nodo_"+id_next+":\n"

            }
            id++


        }

        //uno todo en un solo string
        grafica+=nodos+"{rank=same;\n"+uniones+"}\n";

        var graphviz = "<h2>Reporte bitacora</h2><img id=\"image_lista_circular\"\n"+
        "   src=\'https://quickchart.io/graphviz?graph=digraph{"+ grafica +"}\'"+
        " />"

        return graphviz







    }

    Imprimir_desde_un_nodo(_nodo){
        var actual = this.Primero;
        var cont = 1;

        while(cont <= this.size){

            if(_nodo == actual.accion){
                console.log("entro")
                break;
            }
            
            actual = actual.Siguiente;
            cont++;

        }

        var cont2 = 0;

        while(cont2 < this.size){
            console.log(actual.accion);
            actual = actual.Siguiente;
            cont2++;
        }

    }
}


export{ListaCircular}