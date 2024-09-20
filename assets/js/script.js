let listaNombresGastos = [];
let listaValoresGastos = [];
let totalGastos = 0;//Variable global para rastrear el total de los gastos

document.addEventListener('DOMContentLoaded', function() {
    // Escuchamos cuando se presiona la tecla en los campos de entrada
    document.getElementById('nombreGasto').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            clickBoton();
        }
    });

    document.getElementById('valorGasto').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            clickBoton();
        }
    });
});

function clickBoton(){
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let valorMaximo = Number(document.getElementById('valorMaximo').value);

    if (nombreGasto === '' || valorGasto === '') {
        alert('Por favor, completa ambos campos: Nombre del Gasto y Valor del Gasto.');
        return; // Detenemos la ejecución si algún campo está vacío
    }

    valorGasto = Number(valorGasto);//convertimos el valor del gasto a número

    // Verificamos si el totalGastos + el nuevo gasto superaría los 500,000
    if ((totalGastos + valorGasto) > valorMaximo) {
        alert(`¡Cuidado!... El total de los gastos no puede exceder ${valorMaximo.toLocaleString()} COP.`);
        return; // Detenemos la ejecución si se excede el límite
    }

    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);

    actualizarListaGastos();
}
function actualizarListaGastos(){   
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';  
    totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos [posicion]);

        htmlLista += `<li>
        <span id = "gasto-${posicion}">${elemento} - COP ${valorGasto.toLocaleString()}</span>
        <button onclick="editarGasto(${posicion});">Editar</button> 
        <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                </li>`;   
        //calculamos el total de gastos
        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}
function limpiar(){
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
}
function eliminarGasto(posicion){
    listaNombresGastos.splice(posicion,1);
    totalGastos -= Number(listaValoresGastos[posicion]);//Restamos el gasto eliminado
    listaValoresGastos.splice(posicion,1);
    actualizarListaGastos();
}
function editarGasto(posicion) {
    let nuevoNombre = prompt('Editar nombre del gasto:', listaNombresGastos[posicion]);
    if (nuevoNombre !== null && nuevoNombre !== '') {
        listaNombresGastos[posicion] = nuevoNombre; // Actualiza el nombre del gasto
    }

    let nuevoValor = prompt('Editar valor del gasto (COP):', listaValoresGastos[posicion]);
    nuevoValor = Number(nuevoValor);
    if (!isNaN(nuevoValor) && nuevoValor > 0) {
        listaValoresGastos[posicion] = nuevoValor; // Actualiza el valor del gasto
    } else {
        alert('Valor inválido. No se modificó el valor del gasto.');
    }

    actualizarListaGastos(); // Actualiza la lista con los nuevos valores
}
