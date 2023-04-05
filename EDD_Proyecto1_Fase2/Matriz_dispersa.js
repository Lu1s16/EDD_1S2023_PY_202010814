class Nodo_Cabecera{
    constructor(id){
        this.id = id;
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
            if(nuevo.id < this.primero.id){
                nuevo.siguiente = this.primero
                this.primero.anterior = nuevo
                this.primero = nuevo
            }
            else if(nuevo.id > this.ultimo.id){
                this.ultimo.siguiente = nuevo
                nuevo.anterior = this.ultimo
                this.ultimo = nuevo
            }
            else {
                var tmp = this.primero
                while(tmp != null){
                    if(nuevo.id < tmp.id){
                        nuevo.siguiente = tmp
                        nuevo.anterior = tmp.anterior
                        tmp.anterior.siguiente = nuevo
                        tmp.anterior = nuevo
                        break
                    }
                    else if(nuevo.id > tmp.id){
                        tmp = tmp.siguiente
                    }
                    else{
                        break
                    }
                }
            }
        }
    }

    mostrarCabecera(){
        var tmp = this.primero
        while(tmp != null){
            console.log("cabecera " + this.tipo + tmp.id)
            tmp = tmp.siguiente
        }
    }

    getCabecera(_id){
        var tmp = this.primero
        while(tmp != null){
            if(_id == tmp.id){
                return tmp
            }
            tmp = tmp.siguiente
        }

        return null
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
            contenido += "\n\tnode[label = \"F"+ pivote.id + "\" fillcolor=\"azure3\" pos=\"-1, -"+ posx +"!\" shape=box]x"+ pivote.id +"; \n";
            pivote = pivote.siguiente;
            posx++;

        }
        pivote = this.filas.primero;
        while(pivote.siguiente != null){
            contenido += " \n\tx"+ pivote.id +"->x"+ pivote.siguiente.id +"; \n";
            contenido += " \n\tx"+ pivote.id +"->x"+ pivote.siguiente.id +"[dir=back];\n "
            pivote = pivote.siguiente;
        }

        contenido += " \n\traiz->x"+ this.filas.primero.id +";\n "


        //Graficar nodos columnas
        var pivotey = this.columnas.primero;
        var posy = 0;

        while(pivotey != null){
            contenido += " \n\tnode[label = \"C"+ pivotey.id +"\" fillcolor=\"azure3\" pos = \""+ posy +",1!\" shape = box]y"+ pivotey.id +"; \n"
            pivotey = pivotey.siguiente;
            posy+=1
        }

        pivotey = this.columnas.primero;
        while(pivotey.siguiente != null){
            contenido += " \n\ty"+ pivotey.id +"->y"+ pivotey.siguiente.id +"; "
            contenido += " \n\ty"+ pivotey.id +"->y"+ pivotey.siguiente.id +"[dir=back];"
            pivotey = pivotey.siguiente
        }

        

        contenido += " \n\traiz->y"+ this.columnas.primero.id +"; "

        pivotey = this.columnas.primero;

        contenido+="{rank = same; raiz "

        if(pivotey.siguiente == null){
            //solo hay uno en la lista de cabeceras columnas
            contenido+="y"+pivotey.id
        } else {

            while(pivotey != null){

                
                contenido+=", y"+ pivotey.id +""            
    
                pivotey = pivotey.siguiente

            }

        }

        

        contenido+="}"




        //ya con las cabeceras graficadas
        //se grafica los nodos internos o celdas

        var rank_same = "{rank=same; "

        pivote = this.filas.primero;
        posx = 0;
        while(pivote != null){
            var pivote_celda = pivote.acceso;
            while(pivote_celda != null){
                //----- buscamos posy
                pivotey = this.columnas.primero;
                var posy_celda = 0;

                while(pivotey != null){
                    if(pivote.id == pivote_celda.coordenadaY){
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

            contenido += " \n\tx"+ pivote.id +"->i"+ pivote.acceso.coordenadaX +"_"+ pivote.acceso.coordenadaY +"; "
            contenido += " \n\tx"+ pivote.id +"->i"+ pivote.acceso.coordenadaX +"_"+ pivote.acceso.coordenadaY +"[dir=back]; "
            rank_same+=" x"+pivote.id+", i"+ pivote.acceso.coordenadaX+"_"+ pivote.acceso.coordenadaY +"}\n";
            contenido+=rank_same
            rank_same = "{rank=same; "
            pivote = pivote.siguiente;
            posx++;


        }

        var pivote = this.columnas.primero;

        while(pivote != null){
            pivote_celda = pivote.acceso;
            //console.log(pivote.id)

            while(pivote_celda != null){

                if(pivote_celda.abajo != null){

                    contenido += " \n\ti"+ pivote_celda.coordenadaX +"_"+ pivote_celda.coordenadaY +"->i"+ pivote_celda.abajo.coordenadaX +"_"+ pivote_celda.abajo.coordenadaY +";"
                    contenido += " \n\ti"+ pivote_celda.coordenadaX +"_"+ pivote_celda.coordenadaY +"->i"+ pivote_celda.abajo.coordenadaX +"_"+ pivote_celda.abajo.coordenadaY +"[dir=back];"


                }

                pivote_celda = pivote_celda.abajo;

            
            }

            contenido += " \n\ty"+ pivote.id +"->i"+ pivote.acceso.coordenadaX +"_"+ pivote.acceso.coordenadaY +"; "
            contenido += " \n\ty"+ pivote.id +"->i"+ pivote.acceso.coordenadaX +"_"+ pivote.acceso.coordenadaY +"[dir=back]; "

            pivote = pivote.siguiente;

        }

        contenido += "\}"


        return contenido;
    
    }   



}

//la exporto para usarla en arbol n-ario
export{Matriz_d}