//----------------------------------------------Inicio de Sesion----------------------------------------------
var nombre;//formulario nombre
var apellido;//formulario apellido
var user;//formulario nombre de usuario
var email;//formulario email
var cont;//formulario contrasena
var sexo;//selector de sexo, masculino o femenino

var c=0; //c de contador jeje

function ajustar(){
    if(localStorage.getItem("c") > 0 || localStorage.getItem("c") < 0){
        
    }
    else{
        localStorage.setItem("c", 0);
    }
}

//getter de todas las variables basado en los formularios
function getNombre(e){
    nombre = e.value;
}
function getApellido(e){
    apellido = e.value;
}
function getUser(e){
    user = e.value;
}
function getEmail(e){
    email = e.value;
}
function getCont(e){
    cont = e.value;
}
function getSexo(e){
    sexo = e.value;
}

function registrar(){
    c = contador(); //llama a contador para tener un nuevo valor de c
    var objeto ={//Con los datos del registro se hace el archivo JSON
        "ID" : parseInt(localStorage.getItem("c")),
        "nombre" : nombre,
        "apellido" : apellido,
        "user" : user,
        "email" : email,
        "cont" : cont,
        "sexo" : sexo,
        "rango" : "usuario"//Permite saber si el logeo se hizo desde un tipo de cuenta que acceda al panel de admins
    };
    localStorage.setItem("usuario."+parseInt(localStorage.getItem("c")), JSON.stringify(objeto));//almaceno el json dentro del localStorage como un json
    localStorage.setItem("c",(c+1));//el contador de id's avanza en uno jeje
    alert("Se registrado el usuario");
    borrar();
}

function contador(){
    if(localStorage.getItem("c") !== null){ //si el valor de "c" es diferente de null quere decir que ya hay una base de usuarios registrada
        c = parseInt(localStorage.getItem("c"));
    }
    else{//en caso de no encontrarse ningun valor de "c" se crea dicho valor y se le asigna el valor de la variable c el cual es 0 inicialmente
        localStorage.setItem("c",c);
    }
    
    return c;
}

function borrar(){
    var email = document.getElementById("email");
    var nombre = document.getElementById("nombre2");
    var apellidos = document.getElementById("pass2");
    var user = document.getElementById("user");
    var contr = document.getElementById("app");
    
    email.value = "";
    nombre.value = "";
    apellidos.value = "";
    user.value = "";
    contr.value = "";
}

//----------------------------------------------------Acceso a cuenta-------------------------------------------
var name;//formulario de username izquierdo
var con;//formulario de contrasena izquierdo

//getter de variables
function getName(e){
   name = e.value; 
}
function getCon(e){
   con = e.value; 
}

function acceder(){
    var conejillo;//esta variable recibe archivos json de localStorage
    var confirm = false;//variable que confirma si se pudo acceder a la cuenta o no
    var id =0;//variable que marca en que ID se localizo el acceso correcto
    for(var i = 0; i <= localStorage.getItem("c") -1; i++){//hace repaso por todos los usuarios
        conejillo = JSON.parse(localStorage.getItem("usuario." + i));//conejillo toma el archivo json del elemento con ID i
        if(name === conejillo.user && con === conejillo.cont){//basicamente si el login es correcto
            confirm = true;
            id = i;
        }
    }
    
    if (confirm === true){//en caso de ser correcto lanza un alert de acceso
        alert("Se ha accedido como: " + JSON.parse(localStorage.getItem("usuario." + id)).user);
        
        if (JSON.parse(localStorage.getItem("usuario." + id)).rango === "usuario"){
            window.location.replace("index.html");
        }
        else if(JSON.parse(localStorage.getItem("usuario." + id)).rango === "admin" || JSON.parse(localStorage.getItem("usuario." + id)).rango === "empleado"){
            window.location.replace("backend/menu.html");
        }
        
        localStorage.setItem("loggedID", JSON.parse(localStorage.getItem("usuario." + id)).ID);//guarda este dato para saber con que usuario se ha accedido
        localStorage.setItem("logged", true);//variable que delimita si se ha accedido o nel
    }
    else{//caso contrario, olvidate de la vida
        alert("No se ha encontrado ningun usuario con esos datos, intente de nuevo");
        localStorage.setItem("logged", false);//no, no se ha accedido
    }
    
}

//-------------------------------------------------------------------------Boton login y carrito del Header--------------------------------------------------

//En caso de no estar logeado
function unlogged(){
    var seccion = document.getElementById("Usuario");
    var msj = "<a class=\"nav-link active\" href=\"sesion.html\">Iniciar Sesión</a>";
    seccion.innerHTML = msj;
}
//En caso de estar logeado
function logged(){
    var seccion = document.getElementById("Usuario");//obtiene el elemento donde se crea el dropdown
    var loggeado = JSON.parse(localStorage.getItem("usuario." + localStorage.getItem("loggedID"))).nombre;//obtiene el nombre
    seccion.className = "nav-item dropdown dropleft";//cambia la clase para evitar errores
    //crea la magia
    var msj = "<a class=\"nav-link dropdown-toggle active\" href=\"#\" id=\"navbardrop\" data-toggle=\"dropdown\">" +
                loggeado +
             "</a>" +
              "<div class=\"dropdown-menu\">" +
                "<a class=\"dropdown-item\" href=\"carrito.html\">Carrito</a>" +
                "<button type\"button\" class=\"dropdown-item\" onclick=\"cerrarSesion()\">Cerrar Sesión</button>" +
              "</div>";
      //aplica msj a su funcion
    seccion.innerHTML = msj;
}
//cierra la sesion
function cerrarSesion(){
    var a = parseInt(localStorage.getItem("c")) + 1;//crea la variable a y le da un numero que no existe
    localStorage.setItem("loggedID",a);//se lo asigna a loggedID
    localStorage.setItem("logged", false);//cierra sesion
    location.reload();
}
//Define si alguien esta logeado o no
function CheckLogin(){
    var log= localStorage.getItem("logged");
    if(log === "true"){
        logged();
    }
    else{
        unlogged();
    }
}

//-------------------------------------------------------------------------------PRODUCTOS------------------------------------------------------------------------
//Crear los productos en FrontEnd
function crearTarjetasProductos(){
    var pr = parseInt(localStorage.getItem("pr"));//Obtiene el numero total de productos
    var producto;//Obtendra todos los datos de los productos
    var tarjeta = document.getElementById("tarjeta_producto");//Obtiene el lugar donde haremos la magia
    var msj = "";//msj
    
    for(var i = 0; i <= pr-1; i++){//obtiene producto por producto
        producto = JSON.parse(localStorage.getItem("producto." + i));//obtiene producto por producto
        if(producto.ID !== null){//Verifica que los productos exitan
            //Hasta aqui todo jala, es imposible morir aqui, si la riegas sera todo lo que este adentro del if NO LO OLVIDES!!!
            //da valor a msj de todo lo que tiene que haces las veces que lo tiene que hacer y con los datos que debe de tener
            msj += "<!--Formato de Producto -->" +
                    "<div class=\"card tarjeta_contenido\">" +
                        "<div class=\"card-body\" style=\"height:400px;\">" +
                            "<div class=\"text-center font-weight-bold\">" +
                                "<img src=\"" + producto.imagen + "\" class=\"img-fluid\" alt=\"\"/>" +
                                "<p class=\"font-weight-bold\">"+ producto.nombre +"</p>" +
                            "</div>" +
                            "<label>"+producto.descripcion+"</label> <br/>" +
                            "<label>" +
                                "<i class=\"fas fa-star\"></i>" +
                                "<i class=\"fas fa-star\"></i>" +
                                "<i class=\"fas fa-star\"></i>" +
                                "<i class=\"fas fa-star-half-alt\"></i>" +
                                "<i class=\"far fa-star\"></i>" +
                            "</label>" +
                        "</div>" +
                        "<div class=\"card-body\" style=\"height:50px;\">" +
                            "<p class=\"font-weight-bold text-danger\">$" + producto.precio + "Mxn</p>" +
                        "</div>" +
                        "<div class=\"card-footer\"><button type=\"button\" class=\"btn btn-secondary\" onclick=\"enviarProducto(" + producto.ID + ")\">Ver producto completo</button></div>" +
                    "</div>" +
                    "<!--Formato de Producto -->" +
                    "\n \n";
        }
    }
    tarjeta.innerHTML = msj;
}

//-------------------------------------------------------------------------Carrusel---------------------------------------------------------
function actualizarCarrusel(){
    //Obtiene los elementos de imagenes
    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");
    var img3 = document.getElementById("img3");
    var img4 = document.getElementById("img4");
    var img5 = document.getElementById("img5");
    
    var datos = JSON.parse(localStorage.getItem("carrusel"));//Obtiene los datos actuales de como debe de ir el carrusel
    
    img1.src = datos.img1;
    img2.src = datos.img2;
    img3.src = datos.img3;
    img4.src = datos.img4;
    img5.src = datos.img5;
}

//-------------------------------------------------------------------------Secciones del Index----------------------------------------------------------------

//Los mas vendidos
function crearMasVendidos(){
    var prod;
    var azar;
    var max = localStorage.getItem("pr") - 1;
    var carr1 = document.getElementById("MsBsq1");
    var carr2 = document.getElementById("MsBsq2");
    var msj = "";
    var msj2 = "";
    
    
    for(var i=0; i <= 7; i++){//Cuenta hasta 4 jeje
        azar = Math.round(Math.random() * (max - 0) + 0);
        prod = JSON.parse(localStorage.getItem("producto." + azar));
        if(prod.ID !== null){
            //Crea los elementos del carrusel parte 1
            if(i <= 3){
                msj +=  "<div class=\"card bg-light text-dark border-0\">" +
                            "<div class=\"card-body text-center tarjeta_contenido\">" +
                                "<img src=\"" + prod.imagen + "\" alt=\"\"/ onclick=\"enviarProducto(" + prod.ID + ")\">" +
                            "</div>" +
                        "</div>";
            }
            //crea los elementos del carrusel parte 2
            else{
                msj2 +=  "<div class=\"card bg-light text-dark border-0\">" +
                            "<div class=\"card-body text-center tarjeta_contenido\">" +
                                "<img src=\"" + prod.imagen + "\" alt=\"\"/ onclick=\"enviarProducto(" + prod.ID + ")\">" +
                            "</div>" +
                        "</div>";
            }
        }
        else{
            i = i-1;
        }
    }
    //crea las dos partes de los carruseles
    carr1.innerHTML = msj;
    carr2.innerHTML = msj2;
}

//crear mas buscados
function crearMasBuscados(){
    var prod;
    var azar;
    var max = localStorage.getItem("pr") - 1;
    var carr1 = document.getElementById("MsVv1");
    var carr2 = document.getElementById("MsVv2");
    var msj ="";
    var msj2 = "";
    
    for(var i=0; i <= 7; i++){//Cuenta hasta 4 jeje
        azar = Math.round(Math.random() * (max - 0) + 0);
        prod = JSON.parse(localStorage.getItem("producto." + azar));
        if(prod.ID !== null){
            //Crea los elementos del carrusel parte 1
            if(i <= 3){
                msj +=  "<div class=\"card bg-light text-dark border-0\">" +
                            "<div class=\"card-body text-center tarjeta_contenido\">" +
                                "<img src=\"" + prod.imagen + "\" alt=\"\"/ onclick=\"enviarProducto(" + prod.ID + ")\">" +
                            "</div>" +
                        "</div>";
            }
            //crea los elementos del carrusel parte 2
            else{
                msj2 +=  "<div class=\"card bg-light text-dark border-0\">" +
                            "<div class=\"card-body text-center tarjeta_contenido\">" +
                                "<img src=\"" + prod.imagen + "\" alt=\"\"/ onclick=\"enviarProducto(" + prod.ID + ")\">" +
                            "</div>" +
                        "</div>";
            }
        }
        else{
            i = i-1;
        }
    }
    
    //crea las dos partes de los carruseles
    carr1.innerHTML = msj;
    carr2.innerHTML = msj2;
}

//Crea las ofertas
function crearOfertas(){
    var producto;
    var descuento;
    var tarjetas = document.getElementById("ofr");
    var msj="";
    var c = 0;
    
    for(var i = 0; i <= localStorage.getItem("pr") - 1; i++){
        producto = JSON.parse(localStorage.getItem("producto." + i));
        if(producto.ID !== null){
            descuento = parseInt(producto.descuento);
            if(descuento > 0 && c < 5){
                msj += "<div class=\"card bg-light text-dark border-0\">" +
                            "<div class=\"card-body text-center tarjeta_contenido\">" +
                                "<div class=\"caja\">" +
                                    "<img src=\"" + producto.imagen + "\" alt=\"\"/ onclick=\"enviarProducto(" + producto.ID + ")\">" +
                                    "<div class=\"oferta\">" + producto.descuento +"%</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>";
                c +=1;
            }
        }
    }
    if(msj === ""){
        msj+="<div class=\"card separador text-light\"><h3 class=\"text-center\">No hay ofertas por ahora</h3></div>";
    }
    tarjetas.innerHTML = msj;
}

//-------------------------------------------------------------------------CATEGORIAS--------------------------------------'

function crearCategorias(){
    var msj = "";//msj de toda la vida
    var seccion = document.getElementById("categorizador");//obtiene onde se van hacer las categorias
    var categoria;
    var producto;
    var c;
    var subcategoria;
    
    for (var i = 0; i<= localStorage.getItem("cat") - 1; i++){
        categoria = JSON.parse(localStorage.getItem("catego." + i));
        if(categoria.ID !== null){
            msj += "<br/>" +
                "<hr/>" +
                "<h3>" + categoria.nombre +"</h3>" +
                "<div class=\"dropdown dropright \">" +
                    "<button type=\"button\" class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">Subcategorías</button>" +
                    "<div class=\"dropdown-menu\">";
                    for(var k=0; k <= parseInt(localStorage.getItem("subcat")) - 1; k++){
                        subcategoria = JSON.parse(localStorage.getItem("subcatego." + k));
                        if(subcategoria.categoria === categoria.nombre){
                            msj +=  "<a class=\"dropdown-item\" href=\"#\">" + subcategoria.nombre + "</a>";
                        }
                    }
                    msj += "</div></div>" +
                "<br/>" +
                "<div class=\"card-deck\" id=\"MsBsq1\">";
                    //Hasta aqui solo crea las categorias
                    //ahora a crear las tarjetas de productos
                    c = 0;
                    for(var j = 0; j <= localStorage.getItem("pr") -1; j++ ){
                        producto = JSON.parse(localStorage.getItem("producto." + j));
                        if(producto.categoria === categoria.nombre && c<4){
                        msj +=    "<div class=\"card tarjeta_contenido text-light\">" +
                                    "<div class=\"card-body text-center\">" +
                                    "<p class\"font-weight-bold\">"+  producto.nombre +"</p>" +
                                    "<img src=\"" + producto.imagen +"\" alt=\"\"/ onclick=\"enviarProducto(" + producto.ID + ")\">" +
                                  "</div></div>";
                          c += 1;
                        }
                    }
            msj+= "</div>" +
                    "<br/><a href=\"#\">Ver todo</a>";
        }
    }
    seccion.innerHTML = msj;
}

//---------------------------------------------------------------------------Contacto--------------------------------------------------------------------

function actualizarMapa(){
    var mapa = document.getElementById("mapa");
    var selector = document.getElementById("mapa_sel");
    
    mapa.src = selector.value;
}

//-------------------------------------------------------------------------APARTADO DE PRODUCTOS-----------------------------------------------------------------

function enviarProducto(e){
    localStorage.setItem("vewProducto", e);
    window.location.replace("producto.html");
}

//Carga los datos del producto
function cargarProducto(){
    var producto = JSON.parse(localStorage.getItem("producto." + localStorage.getItem("vewProducto")));
    var descuentazo;
    var precio = parseInt(producto.precio);
    var descuento = parseInt(producto.descuento);
    
    document.getElementById("productIMG").src = producto.imagen;
    document.getElementById("productNom").innerHTML = producto.nombre;
    document.getElementById("productDesc").innerHTML = producto.descripcion;
    document.getElementById("productID").innerHTML = producto.ID;
    
    if(descuento > 0){
        descuentazo = precio - (precio * (descuento/100));
        document.getElementById("productPrec").innerHTML = "";
        document.getElementById("basado1").innerHTML = "";
        document.getElementById("productDes").innerHTML = descuentazo;
    }
    else{
        document.getElementById("productPrec").innerHTML = producto.precio;
        document.getElementById("productDes").innerHTML = "";
        document.getElementById("basado2").innerHTML = "";
        document.getElementById("basado3").innerHTML = "";
    }
    
}

//--------------------------------------------------------------------------Botones de tapadera xD-------------------------------------------------------------
function agregarCarrito(){
    var producto = JSON.parse(localStorage.getItem("producto." + localStorage.getItem("vewProducto")));
    alert("se ha agregado " + producto.nombre + " al carrito");
}

function pagar(){
    alert("se ha realizado la compra correctamente");
    window.location.replace("index.html");
}

//-------------------------------------------------------------------------Funcion ONLOAD----------------------------------

var path;//pagina
var page;//pagina sin "/"

function arrancar(){
    path = window.location.pathname;//asigna la ruta del archivo actual
    page = path.split("/").pop();//quita la ruta y deja solo el nombre del archivo
    
    ajustar();
    
    if(page !== "sesion.html"){
        CheckLogin();
    }
    
    if(page === "index.html"){
        actualizarCarrusel();
        crearMasVendidos();
        crearMasBuscados();
        crearOfertas();
    }
    else if(page === "productos.html"){
        crearTarjetasProductos();
    }
    else if(page === "categorias.html"){
        crearCategorias();
    }
    
    //verifica que no este en la pestaña de producto
    if(page !== "producto.html"){
        var e = parseInt(localStorage.getItem("pr")) + 1;
        localStorage.setItem("vewProducto", e);
    }
    else{
        cargarProducto();
    }
    
    generarUsuario0();
}

//crea el usuario 0 en caso de no existir y lo guarda como admin
function generarUsuario0(){
    
    var contador = parseInt(localStorage.getItem("c"));
    
    if(contador === 0){
        var objeto ={//Con los datos del registro se hace el archivo JSON
            "ID" : 0,
            "nombre" : "Admin",
            "apellido" : "Admin",
            "user" : "admin",
            "email" : "admin@admin",
            "cont" : "admin",
            "sexo" : "masculino",
            "rango" : "admin"//Permite saber si el logeo se hizo desde un tipo de cuenta que acceda al panel de admins
        };
        
        localStorage.setItem("usuario.0", JSON.stringify(objeto));
        c = 1;
        localStorage.setItem("c",1);
        console.log("creado usuario 0");
    }
}

window.onload = arrancar;