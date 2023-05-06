//exportar arbol nario
import { arbol_nario } from "./Arbol_nario.js";
import { ListaCircular } from "./Lista_circular.js";


class Nodo{
    constructor(nombre, carnet, password){
        this.nombre = nombre;
        this.carnet = carnet;
        this.password = password;
        this.carpetas = new arbol_nario();
        this.bitacora = new ListaCircular();
        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;
    }
}

class AVL{

    constructor(){
        this.raiz = null;
        this.tabla = "";
        this.grafica = "";
        this.contador = 0;
    }

    MAXIMO(carnet1, carnet2){
        if(carnet1>carnet2) return carnet1;
        return carnet2;
    }

    altura(nodo){
        if(nodo == null) return -1;
        return nodo.altura;
    }

    //Insertar
    insertar(nombre, carnet, password){
        this.raiz = this.add(nombre, carnet, password, this.raiz)
    }

    add(nombre, carnet, password, nodo){
        if(nodo == null) return new Nodo(nombre, carnet, password);

        else {
            if(carnet < nodo.carnet){
                nodo.izquierda = this.add(nombre, carnet, password, nodo.izquierda)

                if(this.altura(nodo.derecha)-this.altura(nodo.izquierda) == -2){

                    if(carnet < nodo.izquierda.carnet){
                        nodo = this.rotacionizquierda(nodo);
                    }

                    else {
                        nodo = this.Rotaciondobleizquierda(nodo);
                    }

                }
            } else if(carnet > nodo.carnet){
                nodo.derecha = this.add(nombre, carnet, password, nodo.derecha);
                if(this.altura(nodo.derecha)-this.altura(nodo.izquierda) == 2){

                    if(carnet > nodo.derecha.carnet){
                        nodo = this.rotacionderecha(nodo);

                    } else {
                        nodo = this.Rotaciondoblederecha(nodo);
                    }


                }

            } else {
                nodo.carnet = carnet;
            }
        }

        nodo.altura = this.MAXIMO(this.altura(nodo.izquierda), this.altura(nodo.derecha))+1
        return nodo;

    }

    rotacionizquierda(nodo){
        var aux = nodo.izquierda;
        nodo.izquierda = aux.derecha;
        aux.derecha = nodo;
        //calculo de nueva altura
        nodo.altura = this.MAXIMO(this.altura(nodo.derecha),this.altura(nodo.izquierda))+1;
        aux.altura = this.MAXIMO(this.altura(nodo.izquierda), nodo.altura)+1;
        return aux;
    }

    rotacionderecha(nodo){
        var aux = nodo.derecha;
        nodo.derecha = aux.izquierda;
        aux.izquierda = nodo;
        //calcular de nuevo altura
        nodo.altura = this.MAXIMO(this.altura(nodo.derecha),this.altura(nodo.izquierda))+1;
        aux.altura = this.MAXIMO(this.altura(nodo.derecha),nodo.altura)+1;
        return aux;
    }
    //rotacion dobles derecha
    Rotaciondoblederecha(nodo){
        nodo.derecho = this.rotacionizquierda(nodo.derecho);
        return this.rotacionderecha(nodo);
    }

    //rotaciones dobles
    Rotaciondobleizquierda(nodo){
        nodo.izquierda = this.rotacionderecha(nodo.izquierda);
        return this.rotacionizquierda(nodo);
    }

    //recorridos
    preorden(){
        this.pre_orden(this.raiz);
    }
    pre_orden(nodo){
        if(nodo!=null){
            console.log("valor=" +nodo.carnet);
            console.log("nombre= "+nodo.nombre);
            console.log("---------------------")
            this.pre_orden(nodo.izquierda);
            this.pre_orden(nodo.derecha);
        }
    }

    //postorden
    postorden(){
        this.post_orden(this.raiz);
    }
    post_orden(nodo){
        if(nodo!=null){
            this.post_orden(nodo.izquierda);
            this.post_orden(nodo.derecha);
            console.log("valor=" +nodo.carnet);
            console.log("nombre= "+nodo.nombre);
            console.log("---------------------")
        }
    }

    //inorden
    inorden(){
        this.in_orden(this.raiz);
    }
    in_orden(nodo){
        if(nodo!=null){
            this.in_orden(nodo.izquierda);
            console.log("valor=" +nodo.carnet);
            console.log("nombre= "+nodo.nombre);
            console.log("password= " + nodo.password);
            console.log("---------------------")
            this.in_orden(nodo.derecha);    
        }
    }

    //Tabla in orden
    tabla_in_orden(){
        this.tabla = "<center><h2>Estudiantes in orden</h2></center>\n<table border=\"1\", align=\"center\">\n"+
        "\t <tr> \n"+
        "\t\t <td>Carnet</td>\n"+
        "\t\t <td>Nombre</td>\n"+
        "\t </tr>\n"
        
        this.tablainorden(this.raiz)

        this.tabla+="</table>"

        return this.tabla;

    }

    tablainorden(nodo, tabla){
        if(nodo != null){
            this.tablainorden(nodo.izquierda)

            this.tabla+=`
            <tr>
                <td>${nodo.carnet}</td>
                <td>${nodo.nombre}</td>
            </tr>
            `

            this.tablainorden(nodo.derecha)

        }

    }

    //tabla post orden
    tabla_post_orden(){
        this.tabla = "<center><h2>Estudiantes post orden</h2></center>\n<table border=\"1\", align=\"center\">\n"+
        "\t <tr> \n"+
        "\t\t <td>Carnet</td>\n"+
        "\t\t <td>Nombre</td>\n"+
        "\t </tr>\n"
        
        this.tablapostorden(this.raiz)

        this.tabla+="</table>"

        return this.tabla;

    }

    tablapostorden(nodo){

        if(nodo != null){
            this.tablapostorden(nodo.izquierda);
            this.tablapostorden(nodo.derecha);

            //crear tabla
            this.tabla+=`
                <tr>
                    <td>${nodo.carnet}</td>
                    <td>${nodo.nombre}</td>
                </tr>
                `

        }

        

    }

    //tabla preorden
    tabla_pre_orden(){
        this.tabla = "<center><h2>Estudiantes pre orden</h2></center>\n<table border=\"1\", align=\"center\">\n"+
        "\t <tr> \n"+
        "\t\t <td>Carnet</td>\n"+
        "\t\t <td>Nombre</td>\n"+
        "\t </tr>\n"
        
        this.tablapreorden(this.raiz)

        this.tabla+="</table>"

        return this.tabla;

    }

    tablapreorden(nodo){

        if(nodo != null){
            //creo tabla
            this.tabla+=`
                <tr>
                    <td>${nodo.carnet}</td>
                    <td>${nodo.nombre}</td>
                </tr>
                `

            

            this.tablapreorden(nodo.izquierda);
            this.tablapreorden(nodo.derecha);

        }

    }

    verificar_existe(carnet){

        return this.verificarexiste(this.raiz, carnet)

    }

    verificarexiste(nodo, carnet){

        if(!nodo){
            return false
        }

        if(nodo.carnet == parseInt(carnet)){
            return true;
        }

        if(carnet < nodo.carnet){
            return this.verificarexiste(nodo.izquierda, carnet)
        } else {
            return this.verificarexiste(nodo.derecha, carnet)
        }



    }

    


    //Buscar
    buscarcarnet(carnet, pass){
        
        
        return this.buscar_usuario(this.raiz, carnet, pass);
        
    }
 

    buscar_usuario(nodo, carnet, password){

        if(!nodo){
            return false;
        }

        if(nodo.carnet == parseInt(carnet) && nodo.password == password){
            return true;
        }

        if(carnet < nodo.carnet){
            return this.buscar_usuario(nodo.izquierda, carnet, password);
        } else {
            return this.buscar_usuario(nodo.derecha, carnet, password)
        }

    }






    retornar_estudiante(carnet, pass){

        return this.retornarestudiante(this.raiz, carnet, pass);

    }

    retornarestudiante(nodo, carnet, password){

        if(!nodo){
            return null;
        }

        if(nodo.carnet == parseInt(carnet) && nodo.password == password){
            return nodo;

        } 

        if(carnet < nodo.carnet){
            return this.retornarestudiante(nodo.izquierda, carnet, password);
        } else {
            return this.retornarestudiante(nodo.derecha, carnet, password)
        }

    }




    //grafica del arbol

    graficar_arbol(){
        //<img id="image"
    // src="https://quickchart.io/graphviz?graph=digraph{ a -> b }"
    // />
        
        this.grafica = "";
        this.graficararbol(this.raiz);

        
       
        
        var graphviz = "<img id=\"image\"\n"+
        "   src=\'https://quickchart.io/graphviz?format=png&width=1000&height=1500&graph=digraph{"+ this.grafica +"}\'"+
        " />"


        //console.log(this.grafica)

        console.log(graphviz)
        return graphviz;

    }

    graficararbol(nodo){

        if(!nodo){
            return
        }
        

        if(nodo.izquierda != null){
            var actual = nodo.nombre.replace(" ", "_")
            var siguiente = nodo.izquierda.nombre.replace(" ", "_")

            var actual_nodo = actual + `[label=\"Nombre: ${nodo.nombre}\n Carnet: ${nodo.carnet}\"];\n `
            var siguiente_nodo = siguiente + `[label=\"Nombre: ${nodo.izquierda.nombre}\n Carnet: ${nodo.izquierda.carnet}\"]; \n`

            this.grafica+=actual_nodo+siguiente_nodo
            this.grafica+=actual+ "->" + siguiente + ";"
        }

        if(nodo.derecha != null){
            var actual = nodo.nombre.replace(" ", "_")
            var siguiente = nodo.derecha.nombre.replace(" ", "_")

            var actual_nodo = actual + `[label=\"Nombre: ${nodo.nombre}\n Carnet: ${nodo.carnet}\"]; \n`
            var siguiente_nodo = siguiente + `[label=\"Nombre: ${nodo.derecha.nombre}\n Carnet: ${nodo.derecha.carnet}\"]; \n`

            
            this.grafica+= actual + "->" + siguiente + ";"
            this.grafica+=actual_nodo+siguiente_nodo
        }

        else{
            var extra = nodo
        }

        this.graficararbol(nodo.izquierda)
        this.graficararbol(nodo.derecha);




    }

    

    

}

export{AVL}