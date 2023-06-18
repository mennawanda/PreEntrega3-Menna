const shopCursos = document.getElementById("shopCursos");
const verCarrito = document.getElementById("verCarrito");
const muestroCarrito = document.getElementById("muestroCarrito");

let carrito =  JSON.parse(localStorage.getItem("carrito")) || [];

const getCursos = async () => {
    try{
        const response = await fetch("data.json");
        const data = await response.json(); //asigno la respuesta a la variable data
        mostrarCursos(data); //llamo a la función que muestra los cursos con los datos obtenidos
    } catch(error){
        console.error(error);
    } finally{
        console.log("Petición finalizada");
    }
    
};

getCursos();

//recorro y creo las cards para cada curso
function mostrarCursos(data){
    data.forEach((curso) => {
        let content = document.createElement("div");
        content.className = "col-lg-3 col-md-4 col-sm-6 mb-4";
        content.innerHTML = `
            <div class="card">
                <img class="card-img-top" src="${curso.img}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${curso.nombre}</h5>
                    <p class="card-text">$${curso.precio}</p>
                    <a href="#" class="btn btn-primary" id="boton">Agregar al carrito</a>
                </div>
            </div>
        `;
    
        shopCursos.append(content);

        let comprar = content.querySelector(".btn-primary");

        comprar.addEventListener("click", () => {
            //acción a realizar cuando se haga click en el boton
            event.preventDefault();

            const repeat = carrito.some((repeatProduct) => repeatProduct.id === curso.id);

            if(repeat){
                carrito.map((cur) => {
                    if(cur.id === curso.id){
                        cur.cantidad++;
                    }
                })
            }else{
                carrito.push({
                    id: curso.id,
                    img: curso.img,
                    nombre: curso.nombre,
                    precio: curso.precio,
                    cantidad: curso.cantidad,
                });
                cursosLocalS();
            }

        });

    });
}

//set item
function cursosLocalS(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}