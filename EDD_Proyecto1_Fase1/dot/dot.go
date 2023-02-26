package dot

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

//Escribir archivo .dot

func Escribir_json(Codigo string, Archivo string, path string) {

	//Verificar que el archivo existe
	var _, err = os.Stat(path + "\\" + Archivo)

	if os.IsNotExist(err) {

		//Si no existe lo crea
		var file, err = os.Create(Archivo)
		if err != nil {
			fmt.Println(err.Error())
		}
		defer file.Close()

	} else {

		//Caso contrario lo elimina y crea uno nuevo
		//Si es necesario actualiza el archivo

		err := os.Remove(Archivo)
		if err == nil {
			var file, err = os.Create(Archivo)
			if err != nil {
				fmt.Println(err.Error())
			}
			defer file.Close()
		}

	}

	//Abre el archivo usando permisos de escritura

	var file, _ = os.OpenFile(Archivo, os.O_RDWR, 0644)
	_, err = file.WriteString(Codigo)

	if err != nil {
		fmt.Println(err.Error())
	}

	//Guardar cambios
	err = file.Sync()
	if err != nil {
		fmt.Println(err.Error())
	}

	fmt.Println("Archivo .json creado")

}

func Escriir_archivo(Codigo string, Archivo string, path string) {

	//Verificar que el archivo existe
	var _, err = os.Stat(path + "\\" + Archivo)

	if os.IsNotExist(err) {

		//Si no existe lo crea
		var file, err = os.Create(Archivo)
		if err != nil {
			fmt.Println(err.Error())
		}
		defer file.Close()

	} else {

		//Caso contrario lo elimina y crea uno nuevo
		//Si es necesario actualiza el archivo

		err := os.Remove(Archivo)
		if err == nil {
			var file, err = os.Create(Archivo)
			if err != nil {
				fmt.Println(err.Error())
			}
			defer file.Close()
		}

	}

	//Abre el archivo usando permisos de escritura

	var file, _ = os.OpenFile(Archivo, os.O_RDWR, 0644)
	_, err = file.WriteString(Codigo)

	if err != nil {
		fmt.Println(err.Error())
	}

	//Guardar cambios
	err = file.Sync()
	if err != nil {
		fmt.Println(err.Error())
	}

	fmt.Println("Archivo .dot creado")

}

func GenerarPNG(Archivo string, path string) {

	path2, _ := exec.LookPath("dot")
	cmd, err := exec.Command(path2, "dot", "-Tpng", Archivo).Output()
	if err != nil {
		fmt.Print(err)
	}
	mode := int(0777)
	os.WriteFile(strings.Replace(Archivo, ".dot", ".png", -1), cmd, os.FileMode(mode))

}
