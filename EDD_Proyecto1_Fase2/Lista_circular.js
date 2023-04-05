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
            console.log(actual);
            actual = actual.Siguiente;
            cont++;
        }
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