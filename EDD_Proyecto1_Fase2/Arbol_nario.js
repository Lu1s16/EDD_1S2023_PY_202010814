//importo la matriz que contiene los archivos
import {Matriz_d} from "./Matriz_dispersa.js";

class nodo{
    constructor(folderName){
        this.folderName = folderName;
        this.files = [];
        this.children = []; //todos los nodos hijos
        this.archivos = new Matriz_d(); //matriz dispersa para los archivos
        this.id = null; //para la grafica
    }
}


class arbol_nario{
    constructor(){
        this.root = new nodo("/");
        this.root.id = 0;
        this.size = 1; //para generar los id

    }

    insertar(folderName, fatherPath){
        var nuevo_nodo = new nodo(folderName);
        var father_nodo = this.getFolder(fatherPath);

        if(father_nodo){
            this.size++;
            nuevo_nodo.id = this.size;
            father_nodo.children.push(nuevo_nodo);
        } else {
            console.log("Ruta no existe");
        }

    }


    getFolder(path){
        //Padre sea una "/"
        //console.log(path);

        if(path == this.root.folderName){
            return this.root;
        } else {
            var temp = this.root;
            var folders = path.split("/");
            folders = folders.filter( str => str !== "");
            var folder = null;
            while(folders.length > 0){
                let currentFolder = folders.shift();
                folder = temp.children.find(child => child.folderName == currentFolder);
                if(typeof folder == "undefined" || folder == null){
                    return null;
                }

                temp = folder;
            }
            return temp;
        }

    }

    graficar(){
        let nodes = "";
        let connections = "";
        let node = this.root;
        let queue = [];

        queue.push(node);

        while(queue.length !== 0){
            let len = queue.length;
            for(let i = 0; i < len; i++){
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}"];\n`;
                node.children.forEach( item => {
                    connections += `S_${node.id} -> S_${item.id};\n`
                    queue.push(item);
                });
            }
        }

        return 'node[shape="record"];\n' + nodes +'\n'+ connections;
    }

}

export{arbol_nario}