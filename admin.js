//añado eventos
document.querySelector("#btn-agregar").addEventListener("click", function (e) {
    agregar(1);
});

document.querySelector("#btn-agregarTres").addEventListener("click", function (e) {
    agregar(3);
});

document.querySelector("#btn-actualizar").addEventListener("click", mostrarDatos);

document.querySelector("#btn-buscar").addEventListener("click", buscarDatos);




let url = "https://60d3a51e61160900173c9864.mockapi.io/api/productos";      //defino URL

//muestro los datos al iniciar la pagina
mostrarDatos();




async function agregar(numero) {
    let form = document.querySelector("#form");
    //agarrar todos los datos del form
    let formData = new FormData(form);
    //agarro los distintos datos del form con el FormData
    let productoIngresado = formData.get("producto");  //los agarra por los names
    let precioIngresado = formData.get("precio");

    let itemNuevo = {
        "producto": productoIngresado,
        "precio": precioIngresado,
    }

    for (let i = 0; i < numero; i++) {      //lo hace una o tres veces dependiendo del boton clickeados
        try {
            let response = await fetch(url, {
                "method": "POST",       //usa el metodo POST
                "headers": {
                    "Content-type": "application/json"      //avisa al servidor que esta en formato JSON
                },
                "body": JSON.stringify(itemNuevo)       //se convierte en string con stringify
            });

            if (response.status == 201) {   //si el status da '201' actualizo la tabla mostrando los datos
                mostrarDatos();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    //vaciar formulario
    form.reset();
}

async function mostrarDatos() {
    let tabla = document.querySelector("#tbodyAdmin");
    tabla.innerHTML = "";

    try {
        let response = await fetch(url);   //uso GET
        if (!response.ok) {     //si la respuesta no es satisfactoria tira error
            throw ("error");
        }

        let json = await response.json();   //pido el json

        for (const item of json) {      //recorro el arreglo de la API y los muestro en pantalla
            tabla.innerHTML += `<tr>
                                    <td>${item.id}</td>
                                    <td>${item.producto}</td>
                                    <td>${item.precio}</td>
                                    <td><button class="btn-eliminar" data-id="${item.id}">Eliminar</button></td>
                                    <td><button class="btn-editar" data-id="${item.id}">Editar</button></td>
                                </tr>`;

        }

        anadirEventosEliminar();    //añado eventos a los botones
        anadirEventosEditar();
    }
    catch (error) {
        console.log(error);
    }
}

async function buscarDatos() {
    let form = document.querySelector("#form");
    //agarrar todos los datos del form
    let formData = new FormData(form);
    let valor = formData.get("buscar");

    let tabla = document.querySelector("#tbodyAdmin");
    tabla.innerHTML = "";

    try {
        let response = await fetch(url);    //uso método GET
        if (response.ok) {
            alert("Buscado con exito");
        }
        else {
            throw("error");
        }

        let json = await response.json();  //pido el json

        
        for (const item of json) {
            if ((valor == item.id) || (valor == item.producto) || (valor == item.precio)) {
                tabla.innerHTML += `<tr>
                                    <td>${item.id}</td>
                                    <td>${item.producto}</td>
                                    <td>${item.precio}</td>
                                    <td><button class="btn-eliminar" data-id="${item.id}">Eliminar</button></td>
                                    <td><button class="btn-editar" data-id="${item.id}">Editar</button></td>
                                </tr>`;
            }
        }

        anadirEventosEliminar();    //añado eventos a los botones
        anadirEventosEditar();
    }
    catch (error) {
        console.log(error);
    }

}

function anadirEventosEliminar() {
    //evento de eliminar
    let botonesBorrar = document.querySelectorAll(".btn-eliminar");

    for (const boton of botonesBorrar) {
        boton.addEventListener("click", function (e) {
            e.preventDefault();
            let id = e.target.dataset.id;       //uso el target para agarrar el boton y agarro su dataset id (que tomaria la id de cada boton)
            botonEliminar(id);
        });
    }
}

function anadirEventosEditar() {
    //evento de editar
    let botonesEditar = document.querySelectorAll(".btn-editar");
    
    for (const boton of botonesEditar) {
        boton.addEventListener("click", function(e) {
            e.preventDefault();
            let id = e.target.dataset.id;//uso el target para agarrar el boton y agarro su dataset id (que tomaria la id de cada boton)
            botonEditar(id);
        });
    }
}

async function botonEliminar(id) {

    try {
        let response = await fetch(`${url}/${id}`, {
            "method": "DELETE"
        });

        if (response.ok) {     //si la respuesta no es satisfactoria tira error
            alert("Eliminado con exito.");
            mostrarDatos();
        }
        else {
            throw ("error");
        }
    }
    catch (error) {
        console.log(error);
    }

}

async function botonEditar(id) {
    let form = document.querySelector("#form");
    //agarrar todos los datos del form
    let formData = new FormData(form);
    //agarro los distintos datos del form con el FormData
    let productoIngresado = formData.get("producto");  //los agarra por los names
    let precioIngresado = formData.get("precio");

    let itemNuevo = {
        "producto": productoIngresado,
        "precio": precioIngresado,
    }

    try {
        let response = await fetch(`${url}/${id}`, {
            "method": "PUT",    //uso metodo PUT para editar
            "headers": {
                "Content-type": "application/json"      //avisa al servidor que esta en formato JSON
            },
            "body": JSON.stringify(itemNuevo) 
        });

        if (response.ok) {
            alert("Se ha editado con exito.");
            mostrarDatos();
        }
        else {
            throw ("Error");
        }
    }
    catch (error) {
        console.log(error);
    }
}

