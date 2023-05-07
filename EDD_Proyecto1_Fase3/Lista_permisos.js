class Nodo{
    constructor(propietario, destino, ruta, archivo, permiso, descargar){
        this.propietario = propietario;
        this.destino = destino;
        this.ruta = ruta;
        this.archivo = archivo;
        this.permiso = permiso;
        this.descargar = descargar;
        this.siguiente = null;
    }
}

class ListaSimple{
    constructor(){
        this.primero = null;
        this.size = 0;
    }

    InsertarAlFinal(propietario, destino, ruta, archivo, permiso, descargar){
        var Nuevo_nodo = new Nodo(propietario, destino, ruta, archivo, permiso, descargar);
        
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
    }

    Imprimir(){
        var actual = this.primero
        while(actual != null){
            console.log(actual.destino)
            actual = actual.siguiente;

        }

    }

    tabla_permisos(){
        var tabla = "<center><h2>Tabla permisos</h2></center>\n<table border=\"1\", align=\"center\">\n"+
        "\t <tr> \n"+
        "\t\t <td>Propietario</td>\n"+
        "\t\t <td>Destino</td>\n"+
        "\t\t <td>Ruta</td>\n"+
        "\t\t <td>Nombre</td>\n"+
        "\t\t <td>permiso</td>\n"+
        "\t\t <td>descargar</td>\n"+
        "\t </tr>\n"

        var actual = this.primero
        while(actual != null){
            tabla+=`
            <tr>
                <td>${actual.propietario}</td>
                <td>${actual.destino}</td>
                <td>${actual.ruta}</td>
                <td>${actual.archivo}</td>
                <td>${actual.permiso}</td>
                <td><a href="${actual.descargar}" download="${actual.descargar}">
                <button type="button">Descargar</button>
            </a></td>
            </tr>
            `

            actual = actual.siguiente;
        }

        tabla+="</table>";

        return tabla;
    

    }

}

export { ListaSimple };