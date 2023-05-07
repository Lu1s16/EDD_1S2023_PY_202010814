// CLASE NODO DE LA TABLA HASH
class HashNode{
    constructor(carnet, nombre, password){
        this.carnet = carnet;
        this.nombre = nombre;
        this.password = password;
    }
}

// CLASE TABLA HASH
class HashTable{

    constructor(){
        
        this.table = new Array(7);
        
        this.capacidad = 7;
        
        this.espaciosUsados = 0;

       
    }


    // MÉTODO INSERTAR ELEMENTO
    async insert(carnet, nombre, password){
        
        let indice = this.calcularIndice(carnet);

        //encripto constraseña
        //var password_encriptado = await this.getSha256(password);
        const clave = "clave123";

        const mensajeCifrado = CryptoJS.AES.encrypt(password, clave).toString()
       
        
        

        // CREAR NUEVO NODO
        let nodoNuevo = new HashNode(carnet, nombre, mensajeCifrado);
        
        if(indice < this.capacidad){
            
            if(this.table[indice] == null){
                
                this.table[indice] = nodoNuevo;
                
                this.espaciosUsados++;
            }else{
                
                let contador = 1;
               
                indice = this.recalcularIndice(carnet, contador);
                
                while(this.table[indice] != null){
                    
                    contador++;
                    
                    indice = this.recalcularIndice(carnet, contador);
                }
                
                this.table[indice] =  nodoNuevo;
                
                this.espaciosUsados++;
            }

            // MÉTODO QUE AMPLÍA EL ARRAY SI LLEGA AL 75% DE SU CAPACIDAD
            this.checkCapacidad();
        }

    }

    //async getSha256(str){
    //    // PASAR EL OBJETO A STRING
    //    
    //    // OBTENER LOS BYTES DEL STRING 
    //    let bytes = new TextEncoder().encode(str);
    //    // OBTENER BYTES DEL HASH
    //    let hashBytes = await window.crypto.subtle.digest("SHA-256", bytes);
    //    // PASAR EL HASH A STRING 
    //    let hash = Array.prototype.map.call(new Uint8Array(hashBytes), x => ('00' + x.toString(16)).slice(-2)).join('');
    //    // RETORNAR EL HASH
    //    return hash;
    //}

    // METODO PARA APLICAR LA FÓRMULA Y OBTENER EL ÍNDICE
    calcularIndice(carnet){
        // SUMAR CARACTERES ASCII DEL CARNET
        let strCarnet = carnet.toString();
        let sum = 0;
        for(let i = 0; i< strCarnet.length; i++){
            sum += strCarnet.charCodeAt(i);
        }
        // APLICAR EL MÓDULO CON LA CAPACIDAD ACTUAL
        let posicion = sum % this.capacidad;
        return posicion;
    }
    
    // MÉTODO PARA OBTENER ÍNDICES CUANDO EXISTE UNA COLISIÓN
    recalcularIndice(carnet, contador){
        // CALCULA EL ÍNDICE CON LA FÓRMULA Y SE LE AGREGA EL CONTADOR ^ 2
        let indice = this.calcularIndice(carnet) + (contador*contador);
        // SE LE RESTA LA CAPACIDAD SI ESTA ES SUPERADA
        let nuevo =  this.nuevoIndice(indice);
        // SE RETORNA EL VALOR DEL INDICE
        return nuevo;
    }

    // FÓRMULA PARA RESTAR LA CAPACIADAD HASTA QUE SEA MENOR 
    // A LA CAPACIDAD ACTUAL
    nuevoIndice(indice){
        let pos = 0;
        if(indice < this.capacidad){
            pos = indice;
        }else{
            pos = indice - this.capacidad;
            pos = this.nuevoIndice(pos);
        }
        return pos;
    }

    // MÉTODO PARA REORGANIZAR LOS ELEMENTOS DEL ARRAY
    checkCapacidad(){
        // SE ESTABLECE EL PORCENTAJE DE UTILIZACIÓN
        const utilizacion = this.capacidad * 0.75;
        // SE VERIFICA CON LOS ESPACIOS UTIIZADOS
        if(this.espaciosUsados > utilizacion){
            // SE OBTIENE EL SIGUIENTE NÚMERO PRIMO
            this.capacidad = this.generarNuevaCapacidad();
            // SE REINICIA EL CONTEO DE ESPACIOS
            this.espaciosUsados = 0;
            // ARRAY ANTERIOR
            const temp = this.table;
            // LIMPIAR ARRAY ANTERIOR
            this.table = new Array(this.capacidad);
            // INGRESAR LOS VALORES DEL ARRAY ANTERIOR AL NUEVO ARRAY
            temp.forEach(std => {
                this.insert(std.carnet, std.nombre, std.password);
            });
        }

    }

    // SE OBTIENE EL SIGUIENTE NÚMERO PRIMO
    generarNuevaCapacidad(){
        let num = this.capacidad + 1; // SE LE SUMA UNO SÓLO PARA QUE NO DEVUELVA LA MISMA CAPACIDAD
        while(!this.#esPrimo(num)){
            num++;
        }
        return num;
    }

    // SE VERIFICA QUE EL NÚMERO SEA PRIMO
    #esPrimo(num){
        if (num <= 1) {return false}
        if (num === 2) {return true}
        if (num % 2 === 0) {return false}
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
          if (num % i === 0) {return false};
        }
        return true;
    }

    // BUSCAR EN LA TABLA HASH
    search(carnet){
        // OBTENER EL ÍNDICE 
        let indice = this.calcularIndice(carnet);
        // VERIFICAR QUE EL ÍNDICE ESTÉ DENTRO DE LA CAPACIDAD
        if(indice < this.capacidad){
            try{ // TRY CATCH POR SI ACASO
                // VERIFICAR SI LA POSICIÓN NO ES NULLA Y QUE SI EL CARNET ES EL MISMO
                if(this.table[indice] != null && this.table[indice].carnet === carnet){
                    return this.table[indice];
                }else{
                    // MISMA ITERACIÓN DE LA INSERCIÓN HASTA LLEGAR AL VALOR
                    let contador = 1;
                    indice = this.recalcularIndice(carent, contador);
                    while(this.table[indice] != null){
                        contador ++;
                        indice = this.recalcularIndice(carent, contador);
                        // SE VERIFICA EL CARNET Y SE RETORNA
                        if(this.table[indice].carnet === carnet){
                            return this.table[indice].carnet;
                        }
                    }
                }
            }catch(err){
                console.log("Error ", err);
            }
        }
        return null;
    }


    tabla_hash(){
        var tabla = "<center><h2>Estudiantes tabla hash</h2></center>\n<table border=\"1\", align=\"center\">\n"+
        "\t <tr> \n"+
        "\t\t <td>Carnet</td>\n"+
        "\t\t <td>Nombre</td>\n"+
        "\t\t <td>Password</td>\n"+
        "\t </tr>\n"

         for(let i = 0; i<this.table.length-1; i++){

            //var password_encriptado = await this.getSha256(password);
            

            if(this.table[i] != null){
                //var password_encriptado = await this.getSha256(this.table[i].password);
                tabla+=`
                <tr>
                    <td>${this.table[i].carnet}</td>
                    <td>${this.table[i].nombre}</td>
                    <td>${this.table[i].password}</td>
                </tr>
                `

            }

        }

        tabla+="</table>"

        return tabla;
    }


    recorrer_tabla(){

        for(let i = 0; i<this.table.length-1; i++){

            if(this.table[i] != null){
                console.log("nombre: "+this.table[i].nombre);
                console.log("carnet: "+this.table[i].carnet);
                console.log("Password: "+this.table[i].password);
                
                
                
                console.log("----------------------------------")

            }
            

        }

    }


      




}
export{HashTable}