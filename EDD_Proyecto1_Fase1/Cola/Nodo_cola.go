package Cola

import (
	"proyecto/Objects"
)

type Nodo_cola struct {
	Alumno    Objects.Alumno
	Siguiente *Nodo_cola
}
