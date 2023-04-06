//importo la matriz que contiene los archivos
import {Matriz_d} from "./Matriz_dispersa.js";

class nodo{
    constructor(folderName){
        this.folderName = folderName;
        this.files = [];
        this.children = []; //todos los nodos hijos
        //carpetas de la ruta actual
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

    delete_folder(path, carpeta){

        var folder_eliminar = this.getFolder(path)

        var posicion = 0;
        var encontrado = false;

        for(let i = 0; i < folder_eliminar.children.length; i++){

            if(folder_eliminar.children[i].folderName == carpeta){
                posicion = i;
                encontrado = true;
            }
        }

        if(encontrado){
            folder_eliminar.children.splice(posicion, 1);
            alert("se elimino correctamente la carpeta " + carpeta)
            
        } else {
            alert("Error al eliminar")
        }

    }

    show_folders(path){

        var div_carpetas = "<center><h2>Carpetas/archivos</h2></center>"
        div_carpetas += `<h3>Ruta actual: ${path}</h3>`

        var ruta_actual = this.getFolder(path);

        for(let i = 0; i < ruta_actual.children.length; i++){
            console.log(ruta_actual.children[i]);

            div_carpetas += `
            <div id="carpeta_individual">
                <div id="imagen_carpeta">

		        </div>
				
		        <center><p>${ruta_actual.children[i].folderName}</p></center>
            
            </div>
            `
        }

        return div_carpetas

        


    }

    repetido(path){

        if(path == this.root.folderName){
            return true;
        } else {
            var temp = this.root;
            var folders = path.split("/");
            folders = folders.filter( str => str !== "");
            var folder = null;

            while(folders.length > 0){
                let currentFolder = folders.shift();
                folder = temp.children.find(child => child.folderName == currentFolder);
                if(typeof folder == "undefined" || folder == null){
                    return false;
                }

                temp = folder;
            }

            return true;
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