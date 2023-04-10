class Nodo_Cabecera{
    constructor(archivo){
        //id es el archivo
        this.archivo = archivo;
        this.siguiente = null
        this.anterior = null
        this.acceso = null
    }

    getAcceso(){
        return this.acceso;
    }

    setAcceso(nuevo_acceso){
        this.acceso = nuevo_acceso;
    }

}

class Lista_Cabecera{
    constructor(_tipo){
        this.primero = null
        this.ultimo = null
        this.tipo = _tipo
        this.size = 0

    }

    insertar_cabecera(nuevo){
        this.size++;
        if(this.primero == null){
            this.primero = nuevo
            this.ultimo = nuevo
        }
        else{
            if(nuevo.archivo < this.primero.archivo){
                nuevo.siguiente = this.primero
                this.primero.anterior = nuevo
                this.primero = nuevo
            }
            else if(nuevo.archivo > this.ultimo.archivo){
                this.ultimo.siguiente = nuevo
                nuevo.anterior = this.ultimo
                this.ultimo = nuevo
            }
            else {
                var tmp = this.primero
                while(tmp != null){
                    if(nuevo.archivo < tmp.archivo){
                        nuevo.siguiente = tmp
                        nuevo.anterior = tmp.anterior
                        tmp.anterior.siguiente = nuevo
                        tmp.anterior = nuevo
                        break
                    }
                    else if(nuevo.archivo > tmp.archivo){
                        tmp = tmp.siguiente
                    }
                    else{
                        //no inserta repetidos
                        break
                    }
                }
            }
        }
    }

    isEmpty(){
        if(this.primero == null){
            return true
        } else {
            return false
        }
    }

    mostrarCabecera(){
        var tmp = this.primero
        while(tmp != null){
            console.log("cabecera " + this.tipo + tmp.archivo)
            tmp = tmp.siguiente
        }
    }

    crear_tarjeta_archivo(){
        var contenido = ""
        var tmp = this.primero
        while(tmp != null){

            console.log(tmp.archivo)

            if(tmp.archivo.includes(".txt")){

                contenido += `
                <div id="tarjeta_archivo">
                    <div id="imagen_archivo_txt">
                    </div>

                    <center><p>${tmp.archivo}</p></center>


	                <center>
	                <a href="${tmp.archivo}" download="${tmp.archivo}">
	                    <button type="button">Descargar</button>
	                </a>
                    </center>
                </div>
	            `

            } else if(tmp.archivo.includes(".pdf")){
                contenido += `
                <div id="tarjeta_archivo">
                    <div id="imagen_archivo_pdf">
                    </div>
                    <center><p>${tmp.archivo}</p></center>

	                <center>
	                <a href="${tmp.archivo}" download="${tmp.archivo}">
	                    <button type="button">Descargar</button>
	                </a>
                    </center>
                </div>
	            `
            } else if(tmp.archivo.includes(".png")){
                contenido += `
                <div id="tarjeta_archivo">
                    <div id="imagen_archivo_png">
                    </div>

                    <center><p>${tmp.archivo}</p></center>

                    <center>
	                <a href="${tmp.archivo}" download="${tmp.archivo}">
	                    <button type="button">Descargar</button>
	                </a>
                    </center>
                </div>
	            `
            } else if(tmp.archivo.includes(".jpeg") || tmp.archivo.includes(".jpg")){
                contenido += `
                <div id="tarjeta_archivo">
                    <div id="imagen_archivo_jpeg">
                    </div>

                    <center><p>${tmp.archivo}</p></center>
                    
	                <center>
	                <a href="${tmp.archivo}" download="${tmp.archivo}">
	                    <button type="button">Descargar</button>
	                </a>
                    </center>
                </div>
	            `
            }

            


            tmp = tmp.siguiente

        }

        return contenido
    }


    getCabecera(archivo){
        var tmp = this.primero
        while(tmp != null){
            if(archivo == tmp.archivo){
                //significa que ya existe la cabecera
                return tmp
            }
            tmp = tmp.siguiente
        }
        //no existe
        return null
    }


    //Verificar si ya existe
    isExist(archivo){
        
        var tmp = this.primero
        
        while(tmp != null){
            //console.log("---archivo de lista")
            //console.log(tmp.archivo)
            //console.log("******")
            //console.log(archivo)
            //console.log("entra al while")
            if(archivo == tmp.archivo) {
                return true
            }

            tmp = tmp.siguiente
        }

        return false

    }
}

class Nodo_Celda{
    constructor(x, y, valor){
        this.valor = valor
        this.coordenadaX = x //columnas
        this.coordenadaY = y //filas
        this.arriba = null
        this.abajo = null
        this.derecha = null //siguiente
        this.izquierda = null //anterior

    }

    setArriba(arriba){
        this.arriba = arriba
    }
    

    getArriba(){
        return this.arriba
    }

    setAbajo(abajo){
        this.abajo = abajo
    }
    


    getAbajo(){
        return this.abajo

    }
    


    setDerecha( derecha){
        this.derecha = derecha
    }


    getDerecha(){
        return this.derecha

    }

    setIzquierda(izquierda){
        this.izquierda = izquierda
    }
    


    getIzquierda(){
        return this.izquierda
        
    }
 
    
}

class Matriz_d{
    constructor(){
        this.capa = 0
        this.filas = new Lista_Cabecera("fila")
        this.columnas = new Lista_Cabecera("columna")
    }

    Insertar(pos_x, pos_y, valor){
        var nueva_celda = new Nodo_Celda(pos_x, pos_y, valor)

        var nodo_X = this.filas.getCabecera(pos_x)
        var nodo_Y = this.columnas.getCabecera(pos_y)

        if(nodo_X == null){
            nodo_X = new Nodo_Cabecera(pos_x)
            this.filas.insertar_cabecera(nodo_X)
        }

        if(nodo_Y == null){
            nodo_Y = new Nodo_Cabecera(pos_y)
            this.columnas.insertar_cabecera(nodo_Y)
        }

        //insertar nueva celda en fila
        if(nodo_X.getAcceso() == null){
            nodo_X.setAcceso(nueva_celda)
            //console.log(nodo_X.getAcceso())
        }
        else{
            if(nueva_celda.coordenadaY < nodo_X.getAcceso().coordenadaY){
                nueva_celda.setDerecha(nodo_X.getAcceso())
                nodo_X.getAcceso().setIzquierda(nueva_celda)
                nodo_X.setAcceso(nueva_celda)
            }
            else{
                var tmp = nodo_X.getAcceso()
                while(tmp != null){
                    

                    
                    if(nueva_celda.coordenadaY < tmp.coordenadaY){
                        
                        nueva_celda.setDerecha(tmp)
                        nueva_celda.setIzquierda(tmp.getIzquierda())
                        tmp.getIzquierda().setDerecha(nueva_celda)
                        tmp.setIzquierda(nueva_celda)
                        break
                    }
                    else if(nueva_celda.coordenadaX == tmp.coordenadaX && nueva_celda.coordenadaY == tmp.coordenadaY){
                        break
                    }
                    else{
                        if(tmp.getDerecha() == null){
                            tmp.setDerecha(nueva_celda)
                            nueva_celda.setIzquierda(tmp)
                            break
                        
                        }
                        else{
                            tmp = tmp.getDerecha()
                        }
                    }

                    
                }
            
            }

            
        }

        
        
        //Insertar en columna
        if(nodo_Y.getAcceso() == null){
            nodo_Y.setAcceso(nueva_celda)

        }
        else{
            if(nueva_celda.coordenadaX < nodo_Y.getAcceso().coordenadaX){
                nueva_celda.setAbajo(nodo_Y.getAcceso())
                nodo_Y.getAcceso().setArriba(nueva_celda)
                nodo_Y.setAcceso(nueva_celda)
            }
            else{
                var tmp2 = nodo_Y.getAcceso()

                while(tmp2 != null){
                    
                    if(nueva_celda.coordenadaX < tmp2.coordenadaX){
                        
                        nueva_celda.setAbajo(tmp2)
                        nueva_celda.setArriba(tmp2.getArriba())
                        tmp2.getArriba().setAbajo(nueva_celda)
                        tmp2.setArriba(nueva_celda)
                        break
                    }
                    else if(nueva_celda.coordenadaX == tmp2.coordenadaX && nueva_celda.coordenadaY == tmp2.coordenadaY){
                        
                        break
                    }
                    else{


                        if(tmp2.getAbajo() == null){
                            tmp2.setAbajo(nueva_celda)
                            nueva_celda.setArriba(tmp2)
                            break
                        }
                        else{
                            tmp2 = tmp2.getAbajo()
                        }
                    }
                }
            }
        }

        //fin insersion



    }
    
    //Verifica si ya esta repetido o existe
    verificar_repetido(archivo){
        
        return this.filas.isExist(archivo)

        
    }

    //Verificar existencia de archivos en la matriz
    lista_vacia() {

        return this.filas.isEmpty();

    }

    //verificar existencia de usuarios
    users_vacia() {
        return this.columnas.isEmpty();
    }

    tarjetas_archivos(){

        return this.filas.crear_tarjeta_archivo()

    }

    //recorrer filas cabeceras
    //Sirve para probar que cabeceras tiene la fila
    //no tienen funcionalidad en el proyecto
    recorrer_cabeceras_filas(){

        this.filas.mostrarCabecera()

    }
    //metodo solo de pruebas
    recorrer_cabeceras_columnas(){
        this.columnas.mostrarCabecera()
    }


    Insertar_archivo(archivo){

        //verifica si el archivo existe
        //var nodo_X = this.filas.getCabecera(archivo)


        
        //aun no existe entonces se crea y se agrega
        var nodo_X = new Nodo_Cabecera(archivo)
        this.filas.insertar_cabecera(nodo_X)
        

    }

    recorridoPorFila(fila){
        var inicio = this.filas.getCabecera(fila)

        if(inicio == null){
            console.log("no existe la coordenada")
            return null
        }

        var tmp = inicio.getAcceso()
        while(tmp != null){
            console.log(tmp.valor)
            tmp = tmp.getDerecha()
        }
    }

    recorridoPorColumna(columna){
        var inicio = this.columnas.getCabecera(columna)

        if(inicio == null){
            console.log("no existe la coordenada")
            return null
        }

        var tmp = inicio.getAcceso()
        while(tmp != null){
            console.log(tmp.valor)
            tmp = tmp.getAbajo()
        }
    }












    graficar(nombre){
        var contenido = "digraph G{\n"+
        "node[shape=box, width=0.7, height=0.7, fontname=\"Arial\", fillcolor=\"white\", style=filled]\n"+
        "edge[style = \"bold\"]\n"+
        "node[label = \"capa:" + this.capa + "\" fillcolor=\"darkolivegreen1\" pos =\"-1,1!\"]raiz;\n"

        contenido += "label = \"Matriz Dispersa\" \nfontname=\"Arial Black\" \nfontsize=\"25pt\" \n"

        //Graficar nodos cabecera
        //Graficar nodos fila
        var pivote = this.filas.primero;
        var posx = 0;

        while(pivote != null){

            var id_archivo = pivote.archivo.replace(".", "")

            contenido += "\n\tnode[label = \""+ pivote.archivo + "\" fillcolor=\"azure3\" pos=\"-1, -"+ posx +"!\" shape=box]x"+ id_archivo +"; \n";
            pivote = pivote.siguiente;
            posx++;

        }
        pivote = this.filas.primero;
       
        while(pivote.siguiente != null){
            contenido += " \n\tx"+ pivote.archivo +"->x"+ pivote.siguiente.archivo +"; \n";
            contenido += " \n\tx"+ pivote.archivo +"->x"+ pivote.siguiente.archivo +"[dir=back];\n "
            pivote = pivote.siguiente;
        }

        contenido += " \n\traiz->x"+ this.filas.primero.archivo +";\n "


        //Graficar nodos columnas
        var pivotey = this.columnas.primero;
        var posy = 0;

        while(pivotey != null){
            contenido += " \n\tnode[label = \"C"+ pivotey.archivo +"\" fillcolor=\"azure3\" pos = \""+ posy +",1!\" shape = box]y"+ pivotey.archivo +"; \n"
            pivotey = pivotey.siguiente;
            posy+=1
        }

        pivotey = this.columnas.primero;
        while(pivotey.siguiente != null){
            contenido += " \n\ty"+ pivotey.archivo +"->y"+ pivotey.siguiente.archivo +"; "
            contenido += " \n\ty"+ pivotey.archivo +"->y"+ pivotey.siguiente.archivo +"[dir=back];"
            pivotey = pivotey.siguiente
        }

        

        contenido += " \n\traiz->y"+ this.columnas.primero.archivo +"; "


        
        
        pivotey = this.columnas.primero;

        contenido+="{rank = same; raiz "

        if(pivotey.siguiente == null){
            //solo hay uno en la lista de cabeceras columnas
            contenido+="y"+pivotey.archivo
        } else {

            while(pivotey != null){

                
                contenido+=", y"+ pivotey.archivo +""            
    
                pivotey = pivotey.siguiente

            }

        }

        

        contenido+="}"


        //voy por aqui
        //voy por aqui
        //voy por aqui
        //voy por aqui
        //voy por aqui
        //voy por aqui

        //ya con las cabeceras graficadas
        //se grafica los nodos internos o celdas

        var rank_same = "{rank=same; "

        pivote = this.filas.primero;
        posx = 0;
        while(pivote != null  ){
            console.log("*********")
            console.log(pivote)
            var pivote_celda = pivote.acceso;
            while(pivote_celda != null){
                //----- buscamos posy
                pivotey = this.columnas.primero;
                var posy_celda = 0;

                while(pivotey != null){
                    if(pivote.archivo == pivote_celda.coordenadaY){
                        break
                    }
                    posy_celda++;
                    pivotey = pivotey.siguiente;

                }

                if(pivote_celda.valor == "*"){
                    contenido += " \n\tnode[label=\"*\"  pos=\""+ posy_celda +",-"+ posx +"!\" shape=box]i"+ pivote_celda.coordenadaX +"_"+ pivote_celda.coordenadaY +"; "
                
                } else {
                    contenido += " \n\tnode[label=\""+ pivote_celda.valor +"\" fillcolor=\"white\" pos = \""+ posy_celda +",-"+ posx +"!\" shape=box]i"+ pivote_celda.coordenadaX +"_"+ pivote_celda.coordenadaY +"; "
                    
                }

                pivote_celda = pivote_celda.derecha;
            }

            pivote_celda = pivote.acceso;

            //une los nodos con la flecha
            while(pivote_celda != null){
                if(pivote_celda.derecha != null){
                    contenido += " \n\ti"+ pivote_celda.coordenadaX +"_"+ pivote_celda.coordenadaY +"->i"+ pivote_celda.derecha.coordenadaX +"_"+ pivote_celda.derecha.coordenadaY +"; "
                    contenido += " \n\ti"+ pivote_celda.coordenadaX +"_"+ pivote_celda.coordenadaY +"->i"+ pivote_celda.derecha.coordenadaX +"_"+ pivote_celda.derecha.coordenadaY +"[dir=back]; "
                    rank_same+=" i"+ pivote_celda.coordenadaX+"_"+ pivote_celda.coordenadaY + "," + " i"+ pivote_celda.derecha.coordenadaX+"_"+ pivote_celda.derecha.coordenadaY+ ","
                }

                pivote_celda = pivote_celda.derecha;

            }

            if(pivote.acceso.coordenadaX != null){
                console.log("--------")
                console.log(pivote.acceso.coordenadaX)
                console.log("--------")
            
                contenido += " \n\tx"+ pivote.archivo +"->i"+ pivote.acceso.coordenadaX +"_"+ pivote.acceso.coordenadaY +"; "
                contenido += " \n\tx"+ pivote.archivo +"->i"+ pivote.acceso.coordenadaX +"_"+ pivote.acceso.coordenadaY +"[dir=back]; "
                rank_same+=" x"+pivote.archivo+", i"+ pivote.acceso.coordenadaX+"_"+ pivote.acceso.coordenadaY +"}\n";
                contenido+=rank_same
                rank_same = "{rank=same; "

            }

            
                

            

            pivote = pivote.siguiente;
            posx++;

            


        }

        //voy por aqui

        var pivote = this.columnas.primero;

        while(pivote != null){
            pivote_celda = pivote.acceso;
            //console.log(pivote.archivo)

            while(pivote_celda != null){

                if(pivote_celda.abajo != null){

                    contenido += " \n\ti"+ pivote_celda.coordenadaX +"_"+ pivote_celda.coordenadaY +"->i"+ pivote_celda.abajo.coordenadaX +"_"+ pivote_celda.abajo.coordenadaY +";"
                    contenido += " \n\ti"+ pivote_celda.coordenadaX +"_"+ pivote_celda.coordenadaY +"->i"+ pivote_celda.abajo.coordenadaX +"_"+ pivote_celda.abajo.coordenadaY +"[dir=back];"


                }

                pivote_celda = pivote_celda.abajo;

            
            }

            contenido += " \n\ty"+ pivote.archivo +"->i"+ pivote.acceso.coordenadaX +"_"+ pivote.acceso.coordenadaY +"; "
            contenido += " \n\ty"+ pivote.archivo +"->i"+ pivote.acceso.coordenadaX +"_"+ pivote.acceso.coordenadaY +"[dir=back]; "

            pivote = pivote.siguiente;

        }

        contenido += "\}"


        return contenido;
    
    }   

    graficar_2(carpeta){
        var contenido = "digraph G{\n"+
        "node[shape=box, width=0.7, height=0.7, fontname=\"Arial\", fillcolor=\"white\", style=filled]\n"+
        "edge[style = \"bold\"]\n"+
        "node[label = \"" + carpeta + "\" fillcolor=\"darkolivegreen1\" pos =\"-1,1!\"]raiz;\n"
    
        var pivote = this.filas.primero;
        var posx = 0;
        

        //crear nodos de filas
        while(pivote != null){

            var conexion = pivote.archivo.replace(".", "")
            
            contenido += "\n\tnode[label = \""+ pivote.archivo + "\" fillcolor=\"azure3\" pos=\"-1, -"+ posx +"!\" shape=box]x_"+ conexion +"; \n";
            pivote = pivote.siguiente;
            
            posx++;
        }

        pivote = this.filas.primero;
        
        var primer_archivo = 1;
       
        while(pivote.siguiente != null){
            

            var conexion = pivote.archivo.replace(".", "")
            var conexion2 = pivote.siguiente.archivo.replace(".", "")

            contenido += " \n\tx_"+ conexion +"->x_"+ conexion2 +"; \n";
            contenido += " \n\tx_"+ conexion +"->x_"+ conexion2 +"[dir=back];\n "
            pivote = pivote.siguiente;
            
        }


        var primero = this.filas.primero.archivo.replace(".", "")

        contenido += " \n\traiz->x_"+ primero+";\n "

        var pivotey = this.columnas.primero;
        var posy = 0;
        
        while(pivotey != null){
            contenido += " \n\tnode[label = \" "+ pivotey.archivo +"\" fillcolor=\"azure3\" pos = \""+ posy +",1!\" shape = box]y_"+ pivotey.archivo +"; \n"
            pivotey = pivotey.siguiente;
            
            posy+=1;
        }

        pivotey = this.columnas.primero;

        while(pivotey.siguiente != null){
            
            contenido += " \n\ty_"+ pivotey.archivo +"->y_"+ pivotey.siguiente.archivo +"; "
            contenido += " \n\ty_"+ pivotey.archivo +"->y_"+ pivotey.siguiente.archivo +"[dir=back];"
            pivotey = pivotey.siguiente
           
        }

        var primero = this.columnas.primero.archivo

        contenido += " \n\traiz->y_"+ primero +"; "

        pivotey = this.columnas.primero;
        contenido+="{rank = same; raiz "

        

        
        if(pivotey.siguiente == null){
            //solo hay uno en la lista de cabeceras columnas
            contenido+="y_"+pivotey.archivo
        } else {

            while(pivotey != null){

                
                contenido+=", y_"+ pivotey.archivo +""            
    
                pivotey = pivotey.siguiente
                

            }

        }
        contenido+="}"

        var rank_same = "{rank=same; "
        pivote = this.filas.primero;
        posx = 0;
        

        
        
        while(pivote != null){
            console.log("-----")
            
            

            if(pivote.acceso != null){
                //console.log("tiene conexiones")
                //console.log(pivote)
                

                var pivote_celda = pivote.acceso;
                while(pivote_celda != null){
                    //Buscamos la posicion y
                    pivotey = this.columnas.primero;
                    var posy_celda = 0;

                    while(pivotey != null){
                        if(pivote.archivo == pivote_celda.coordenadaY){
                            break
                        }
                        posy_celda++;
                        
                        pivotey = pivotey.siguiente
                    }

                    var conexxion = pivote_celda.coordenadaX.replace(".", "")

                    contenido += " \n\tnode[label=\""+ pivote_celda.valor +"\" fillcolor=\"white\" pos = \""+ posy_celda +",-"+ posx +"!\" shape=box]i"+ conexxion +"_"+ pivote_celda.coordenadaY +"; "
                    
                    
                    pivote_celda = pivote_celda.derecha
                }

                pivote_celda = pivote.acceso;

                //unir los nodos con la felcha
                while(pivote_celda != null){
                    if(pivote_celda.derecha != null){
                        var conexion = pivote_celda.coordenadaX.replace(".", "")
                        contenido += " \n\ti"+ conexion +"_"+ pivote_celda.coordenadaY +"->i"+ conexion +"_"+ pivote_celda.derecha.coordenadaY +"; "
                        contenido += " \n\ti"+ conexion +"_"+ pivote_celda.coordenadaY +"->i"+ conexion +"_"+ pivote_celda.derecha.coordenadaY +"[dir=back]; "
                        rank_same+=" i"+ conexion+"_"+ pivote_celda.coordenadaY + "," + " i"+ conexion+"_"+ pivote_celda.derecha.coordenadaY+ ","
                    }
    
                    pivote_celda = pivote_celda.derecha;

                }

                var conexion = pivote.acceso.coordenadaX.replace(".", "")

                contenido += " \n\tx_"+ conexion +"->i"+ conexion +"_"+ pivote.acceso.coordenadaY +"; "
                contenido += " \n\tx_"+ conexion +"->i"+ conexion +"_"+ pivote.acceso.coordenadaY +"[dir=back]; "
                rank_same+=" x_"+conexion+", i"+ conexion +"_"+ pivote.acceso.coordenadaY +"}\n";
                contenido+=rank_same
                rank_same = "{rank=same; "


                
                posx++;
                

            } else {
                //console.log("no tiene conexiones")
                //console.log(pivote)
            }

            pivote = pivote.siguiente;
            

        
        }

        var pivote = this.columnas.primero;

        while(pivote != null){
            pivote_celda = pivote.acceso;

            while(pivote_celda != null){

                if(pivote_celda.abajo != null){

                    var conexion = pivote_celda.coordenadaX.replace(".", "")
                    var conexion2 = pivote_celda.abajo.coordenadaX.replace(".", "")

                    contenido += " \n\ti"+ conexion +"_"+ pivote_celda.coordenadaY +"->i"+ conexion2 +"_"+ pivote_celda.abajo.coordenadaY +";"
                    contenido += " \n\ti"+ conexion +"_"+ pivote_celda.coordenadaY +"->i"+ conexion2 +"_"+ pivote_celda.abajo.coordenadaY +"[dir=back];"


                }

                var conexion = pivote.acceso.coordenadaX.replace(".", "")

                contenido += " \n\ty_"+ pivote.archivo +"->i"+ conexion +"_"+ pivote.acceso.coordenadaY +"; "
                contenido += " \n\ty_"+ pivote.archivo +"->i"+ conexion +"_"+ pivote.acceso.coordenadaY +"[dir=back]; "

                pivote_celda = pivote_celda.abajo;

            }

            pivote = pivote.siguiente;
        }


        return contenido+"}"
    }






    graficar_solo_archivos(carpeta){
        var contenido = "digraph G{\n"+
        "node[shape=box, width=0.7, height=0.7, fontname=\"Arial\", fillcolor=\"white\", style=filled]\n"+
        "edge[style = \"bold\"]\n"+
        "node[label = \"" + carpeta + "\" fillcolor=\"darkolivegreen1\" pos =\"-1,1!\"]raiz;\n"
    
        var pivote = this.filas.primero;
        var posx = 0;
        var pos_archivo = 1;

        //crear nodos de filas
        while(pivote != null){
            var id_archivo = pivote.archivo.replace(".", "")
            contenido += "\n\tnode[label = \""+ pivote.archivo + "\" fillcolor=\"azure3\" pos=\"-1, -"+ posx +"!\" shape=box]x_"+ pos_archivo +"; \n";
            pivote = pivote.siguiente;
            pos_archivo++;
            posx++;
        }

        pivote = this.filas.primero;
        var pos_archivo = 1;
        var primer_archivo = 1;
       
        while(pivote.siguiente != null){
            var siguiente_archivo = pos_archivo+1

            contenido += " \n\tx_"+ pos_archivo +"->x_"+ siguiente_archivo +"; \n";
            contenido += " \n\tx_"+ pos_archivo +"->x_"+ siguiente_archivo +"[dir=back];\n "
            pivote = pivote.siguiente;
            pos_archivo++
        }

        contenido += " \n\traiz->x_"+ primer_archivo+";\n "


        return contenido+"}"
    }



}

//la exporto para usarla en arbol n-ario
export{Matriz_d}