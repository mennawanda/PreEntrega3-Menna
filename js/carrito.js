const funCarrito = () =>{
    
    muestroCarrito.innerHTML = "";

    muestroCarrito.style.display = "flex";

    const carritoHeader = document.createElement("div");
    carritoHeader.className = "headerClass";
    carritoHeader.innerHTML = `
         <h1 class="headerTitle">Carrito de compras</h1>
    `;
    muestroCarrito.append(carritoHeader);

    const carritoButton = document.createElement("h1");
    carritoButton.innerText = "x";
    carritoButton.className = "headerButton";

    carritoButton.addEventListener("click", () => {
        muestroCarrito.style.display = "none";
    })

    carritoHeader.append(carritoButton);

    //busco qué es lo que hay en el carrito. lo recorro y muestro el contenido

    carrito.forEach((curso) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${curso.img}">
            <h3>${curso.nombre}</h3>
            <p>$${curso.precio}</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${curso.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${curso.cantidad * curso.precio}</p>
        `;

        muestroCarrito.append(carritoContent);

        //si el usuario quiere restar una unidad del curso
        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if(curso.cantidad !== 1)
                curso.cantidad--; //le resto 1
            funCarrito(); //regenero el carrito
        });

        //si el usuario quiere sumar una unidad del curso
        let sumar = carritoContent.querySelector(".sumar");

        sumar.addEventListener("click", () => {
            curso.cantidad++; //le sumo 1
            funCarrito(); //regenero el carrito
        });

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className = "eliminar";

        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarCurso);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCarrito = document.createElement("div");
    totalCarrito.className = "totalCarrito";
    totalCarrito.innerHTML = `Total a pagar: $${total}`;
    muestroCarrito.append(totalCarrito);
}

verCarrito.addEventListener("click", funCarrito);

//vuelvo a pintar el carrito pero sin el id donde hice click en eliminar
const eliminarCurso = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId != foundId;
    });

    funCarrito();
    cursosLocalS();
}