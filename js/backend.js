var path;//pagina
var page;//pagina sin "/"
var c;//Contador
//
function ajustar(){
    if(localStorage.getItem("c") > 0 || localStorage.getItem("c") < 0){
        
    }
    else{
        localStorage.setItem("c", 0);
    }
}
//----------------------------------------------Pestaña flotante de usuarios----------------------------------------
var logeado = JSON.parse(localStorage.getItem("usuario." + localStorage.getItem("loggedID"))).ID;
//carga los elementos de login
function ajustarDatos(){
    var nombre = document.getElementById("pestUs");//obtiene el label de usuario
    var rango = document.getElementById("pestRan");//obtiene el label de rango
    var foto = document.getElementById("PP");//obtiene la foto de perejil
    var fotito = document.getElementById("lowPP");//obtiene la fotito en miniatura jeje
    
    //asigna la foto de perfil segun el sexo del usuario
    if(JSON.parse(localStorage.getItem("usuario." + localStorage.getItem("loggedID"))).sexo === "Masculino"){//Hombre
        foto.src = "../img/admpph.png";
        fotito.src = "../img/admpph.png";
    }
    else{//Mujer
        foto.src = "../img/admppm.png";
        fotito.src = "../img/admppm.png";
    }
    
    nombre.innerHTML = JSON.parse(localStorage.getItem("usuario." + localStorage.getItem("loggedID"))).user;//asigna al label de usuario el nombre del ultimo logeado
    rango.innerHTML = JSON.parse(localStorage.getItem("usuario." + localStorage.getItem("loggedID"))).rango;//lo mismo pero con el rango nomames
}

function cerrarSesion(){
    var a = parseInt(localStorage.getItem("c")) + 1;//crea la variable a y le da un numero que no existe
    localStorage.setItem("loggedID",a);//se lo asigna a loggedID
    localStorage.setItem("logged", false);//cierra sesion
    window.location.replace("../index.html");//te regresa a index
}

//-------------------------------------------------------------Cargar las tablas-----------------------------------
function obtenerDatos(){
    path = window.location.pathname;//asigna la ruta del archivo actual
    page = path.split("/").pop();//quita la ruta y deja solo el nombre del archivo
    
    ajustar();
    //detecta la pagina abierta
    if(page === "productos.html"){
        ajustarPr();//llama a ajustar el contador Pr
        crearFormulariosProductos();//acomoda los formularios
        crearTablaProductos();//crea la tabla de los productos
        filtrarSubcategorias();//Filtra por la categoria default
    }
    else if(page === "categorias.html"){
        ajustarCat();//Llama a ajustar el contador Cat
        crearTablaCategorias();//crea la tabla de categorias
    }
    else if(page === "subc.html"){
        ajustarSubCat();//ajusta el contador subcat
        formAgregarCategorias();//agrega las categorias al dropdown de la hilera de categorias
        crearTablaSubcategorias();//crea la tabla
    }
    else if(page === "usuarios.html"){
        crearTablaUsuarios();//crea la tabla usuarios
    }
    else if(page === "menu.html"){
        actualizarCarrusel();
    }
}

//---------------------------------------------------------Tabla Usuarios---------------------------------------
//Crea todo el desmadre de tabla que hay
function crearTablaUsuarios(){
    retornar();
    var msj = "";
    
    for(var i=0; i <= localStorage.getItem("c") -1; i++){//si un objeto tiene ID = null no lo mostrara
        if(JSON.parse(localStorage.getItem("usuario." + i)).ID !== null){
            //Agrega los datos de nombre, email, usuario y contra
            msj += "<tr id=\"fila" + i + "\">" +
                        "<td><input type=\"text\" class=\"form-control\" id=\"usnamer" + i + "\" placeholder=\"Ingresa el nombre del producto\" value=\"" + JSON.parse(localStorage.getItem("usuario." + i)).nombre + "\" disabled></td>" +
                        "<td><input type=\"text\" class=\"form-control\" id=\"usapr" + i + "\" placeholder=\"Ingresa el nombre del producto\" value=\"" + JSON.parse(localStorage.getItem("usuario." + i)).apellido + "\" disabled></td>" +
                        "<td><input type=\"text\" class=\"form-control\" id=\"usemr" + i + "\" placeholder=\"Ingresa el nombre del producto\" value=\"" + JSON.parse(localStorage.getItem("usuario." + i)).email + "\" disabled></td>" +
                        "<td><input type=\"text\" class=\"form-control\" id=\"ususr" + i + "\" placeholder=\"Ingresa el nombre del producto\" value=\"" + JSON.parse(localStorage.getItem("usuario." + i)).user + "\" disabled></td>" +
                        "<td><input type=\"text\" class=\"form-control\" id=\"usconr" + i + "\" placeholder=\"Ingresa el nombre del producto\" value=\"" + JSON.parse(localStorage.getItem("usuario." + i)).cont + "\" disabled></td>";
                //define el estado del input en si es hombre o mujer
                if(JSON.parse(localStorage.getItem("usuario." + i)).sexo === "Masculino"){
                    msj += "<td><select class=\"form-control\" id=\"ussexr" + i + "\"  disabled>" +
                            "<option>Masculino</option>" +
                            "<option>Femenino</option><select></td>";
                }
                else{
                    msj += "<td><select class=\"form-control\" id=\"ussexr" + i + "\" disabled>" +
                            "<option>Femenino</option>" +
                            "<option>Masculino</option><select></td>";
                }

                //define el estado basandose en su rango
                if(JSON.parse(localStorage.getItem("usuario." + i)).rango === "admin"){
                    msj += "<td><select class=\"form-control\"/ id=\"usranr" + i + "\" disabled>" +
                            "<option value=\"admin\">Administrador</option>" +
                            "<option value=\"empleado\">Empleado</option>" +
                            "<option value=\"usuario\">Cliente</option><select></td>";
                }
                else if(JSON.parse(localStorage.getItem("usuario." + i)).rango === "empleado"){
                    msj += "<td><select class=\"form-control\"/ id=\"usranr" + i + "\" disabled>" +
                            "<option value=\"empleado\">Empleado</option>" +
                            "<option value=\"usuario\">Cliente</option>" +
                            "<option value=\"admin\">Administrador</option><select></td>";
                }
                else{
                    msj += "<td><select class=\"form-control\"/ id=\"usranr" + i + "\" disabled>" +
                            "<option value=\"usuario\">Cliente</option>" +
                            "<option value=\"empleado\">Empleado</option>" +
                            "<option value=\"admin\">Administrador</option><select></td>";
                }

                msj += "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-success\" onclick=\"seleccionar(id)\"><i class=\"fas fa-pencil-alt\"></i></button></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-info\" onclick=\"guardar(id)\"><i class=\"far fa-save\"></i></button></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-danger\" onclick=\"borrar(id)\"><i class=\"fas fa-trash-alt\"></i></button></td>";
        }   
    }
    //Crea la tabla
    document.getElementById("tablaUsuariosBody").innerHTML = msj;
}

//agrega datos para nuevo usuario
function agregar(){
    //obtiene el valor de todos los formularios
    var nombre = document.getElementById("usn").value;//casilla nombre
    var apellido = document.getElementById("usap").value;//casilla apellido
    var email = document.getElementById("usem").value;//casilla email
    var usuario = document.getElementById("usu").value;//casilla usuario
    var contra = document.getElementById("usc").value;//casilla contrasena
    var sexo = document.getElementById("uss").value;//dropdown sexo
    var rango = document.getElementById("usr").value;//dropdown rango
    //obtiene la siguiente id
    c = retornar();
    
    //crea el json de guardado para el nuevo usuario
    var objeto ={
        "ID" : c,
        "nombre" : nombre,
        "apellido" : apellido,
        "user" : usuario,
        "email" : email,
        "cont" : contra,
        "sexo" : sexo,
        "rango" : rango
    };
    
    localStorage.setItem("usuario."+parseInt(localStorage.getItem("c")), JSON.stringify(objeto));//almaceno el json dentro del localStorage como un json
    localStorage.setItem("c",(c+1));//el contador de id's avanza en uno jeje
    document.getElementById("tablaUsuariosBody").innerHTML = "";
    crearTablaUsuarios();
}

//Toma lugar de la ID del nevo usuario
function retornar(){
    if(localStorage.getItem("c") !== null){ //si el valor de "c" es diferente de null quere decir que ya hay una base de usuarios registrada
        c = parseInt(localStorage.getItem("c"));
    }
    else{//en caso de no encontrarse ningun valor de "c" se crea dicho valor y se le asigna el valor de la variable c el cual es 0 inicialmente
        localStorage.setItem("c",c);
    }
    return c;
}

function seleccionar(e){
    //Obtiene los elementos del usuario seleccionado
    var nombre = document.getElementById("usnamer" + e);//casilla nombre
    var apellido = document.getElementById("usapr" + e);//casilla apellido
    var email = document.getElementById("usemr" + e);//casilla email
    var usuario = document.getElementById("ususr" + e);//casilla usuario
    var contra = document.getElementById("usconr" + e);//casilla contrasena
    var sexo = document.getElementById("ussexr" + e);//dropdown sexo
    var rango = document.getElementById("usranr" + e);//dropdown rango
    //Habilita todas las casillas
    nombre.disabled = false;
    apellido.disabled = false;
    email.disabled = false;
    usuario.disabled = false;
    contra.disabled = false;
    sexo.disabled = false;
    rango.disabled = false;
    //deshabilita los demas botones de editar, solo para evitar complicaciones xd
    var seleccionado;
    for (var i = 0; i <= c; i++){
        seleccionado = document.getElementById(i);
        if(seleccionado.id !== e){
            seleccionado.disabled = true;
        }
    }
}

function guardar(e){
    //obtiene los datos de su fila
    var nombre = document.getElementById("usnamer" + e);//casilla nombre
    var apellido = document.getElementById("usapr" + e);//casilla apellido
    var email = document.getElementById("usemr" + e);//casilla email
    var usuario = document.getElementById("ususr" + e);//casilla usuario
    var contra = document.getElementById("usconr" + e);//casilla contrasena
    var sexo = document.getElementById("ussexr" + e);//dropdown sexo
    var rango = document.getElementById("usranr" + e);//dropdown rango
    //los guarda en un json con la id de su fila
    var objeto ={
        "ID" : e,
        "nombre" : nombre.value,
        "apellido" : apellido.value,
        "user" : usuario.value,
        "email" : email.value,
        "cont" : contra.value,
        "sexo" : sexo.value,
        "rango" : rango.value
    };
    localStorage.setItem("usuario."+e, JSON.stringify(objeto));//Guarda el JSON de los cambios hechos en la fila
    crearTablaUsuarios();
}

function borrar(e){
    //crea un json con ID null y espacios vacios
    var objeto ={
        "ID" : null,
        "nombre" : "",
        "apellido" : "",
        "user" : "",
        "email" : "",
        "cont" : "",
        "sexo" : "",
        "rango" : ""
    };
    localStorage.setItem("usuario."+e, JSON.stringify(objeto));//asigna ese json vacio para ocultar el objeto
    crearTablaUsuarios();
}

//Busca usuarios
function buscarUsuarios(){
    var form = document.getElementById("buscador_usuarios");
    var usuario;
    var msj = "";
    var found = false;
    
    for(var i=0; i <= localStorage.getItem("c") -1; i++){
          usuario = JSON.parse(localStorage.getItem("usuario." + i)).nombre;
          if(JSON.parse(localStorage.getItem("usuario." + i)).ID !== null){//si el usuario existe
            if(usuario === form.value){//si el usuario coincide con la busqueda
                //Agrega los datos de nombre, email, usuario y contra
              msj += "<tr id=\"fila" + i + "\">" +
                          "<td><input type=\"text\" class=\"form-control\" id=\"usnamer" + i + "\" placeholder=\"Ingresa el nombre del producto\" value=\"" + JSON.parse(localStorage.getItem("usuario." + i)).nombre + "\" disabled></td>" +
                          "<td><input type=\"text\" class=\"form-control\" id=\"usapr" + i + "\" placeholder=\"Ingresa el nombre del producto\" value=\"" + JSON.parse(localStorage.getItem("usuario." + i)).apellido + "\" disabled></td>" +
                          "<td><input type=\"text\" class=\"form-control\" id=\"usemr" + i + "\" placeholder=\"Ingresa el nombre del producto\" value=\"" + JSON.parse(localStorage.getItem("usuario." + i)).email + "\" disabled></td>" +
                          "<td><input type=\"text\" class=\"form-control\" id=\"ususr" + i + "\" placeholder=\"Ingresa el nombre del producto\" value=\"" + JSON.parse(localStorage.getItem("usuario." + i)).user + "\" disabled></td>" +
                          "<td><input type=\"text\" class=\"form-control\" id=\"usconr" + i + "\" placeholder=\"Ingresa el nombre del producto\" value=\"" + JSON.parse(localStorage.getItem("usuario." + i)).cont + "\" disabled></td>";
                  //define el estado del input en si es hombre o mujer
                  if(JSON.parse(localStorage.getItem("usuario." + i)).sexo === "Masculino"){
                      msj += "<td><select class=\"form-control\" id=\"ussexr" + i + "\"  disabled>" +
                              "<option>Masculino</option>" +
                              "<option>Femenino</option><select></td>";
                  }
                  else{
                      msj += "<td><select class=\"form-control\" id=\"ussexr" + i + "\" disabled>" +
                              "<option>Femenino</option>" +
                              "<option>Masculino</option><select></td>";
                  }

                  //define el estado basandose en su rango
                  if(JSON.parse(localStorage.getItem("usuario." + i)).rango === "admin"){
                      msj += "<td><select class=\"form-control\"/ id=\"usranr" + i + "\" disabled>" +
                              "<option value=\"admin\">Administrador</option>" +
                              "<option value=\"empleado\">Empleado</option>" +
                              "<option value=\"usuario\">Cliente</option><select></td>";
                  }
                  else if(JSON.parse(localStorage.getItem("usuario." + i)).rango === "empleado"){
                      msj += "<td><select class=\"form-control\"/ id=\"usranr" + i + "\" disabled>" +
                              "<option value=\"empleado\">Empleado</option>" +
                              "<option value=\"usuario\">Cliente</option>" +
                              "<option value=\"admin\">Administrador</option><select></td>";
                  }
                  else{
                      msj += "<td><select class=\"form-control\"/ id=\"usranr" + i + "\" disabled>" +
                              "<option value=\"usuario\">Cliente</option>" +
                              "<option value=\"empleado\">Empleado</option>" +
                              "<option value=\"admin\">Administrador</option><select></td>";
                  }

                  msj += "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-success\" onclick=\"seleccionar(id)\"><i class=\"fas fa-pencil-alt\"></i></button></td>" +
                          "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-info\" onclick=\"guardar(id)\"><i class=\"far fa-save\"></i></button></td>" +
                          "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-danger\" onclick=\"borrar(id)\"><i class=\"fas fa-trash-alt\"></i></button></td>";
                found = true;
            }
        }
    }
    if(found === true){
         //crea la tabla
        form.value = "";
        document.getElementById("tablaUsuariosBody").innerHTML = msj;   
    }
    else{
        alert("No se han encontrado resultados");
        crearTablaUsuarios();
    }
}


//---------------------------------------------------------Tabla Categorias------------------------------------------

var cat = 0;//cuenta las categorias
//funcion que cree para evitar conflictos en el futuro que honestamente no recuerdo como funciona
function ajustarCat(){
    if(localStorage.getItem("cat") > 0 || localStorage.getItem("cat") < 0){
        
    }
    else{
        localStorage.setItem("cat", 0);
    }
    contadorCat();
}

function contadorCat(){
    if(localStorage.getItem("cat") !== null){ //si el valor de "cat" es diferente de null quere decir que ya hay una base de usuarios registrada
        cat = parseInt(localStorage.getItem("cat"));
    }
    else{//en caso de no encontrarse ningun valor de "cat" se crea dicho valor y se le asigna el valor de la variable c el cual es 0 inicialmente
        localStorage.setItem("cat",cat);
    }
}

//crea la tabla
function crearTablaCategorias(){
    var body = document.getElementById("catBody");
    var msj = "";
    
    for(var i = 0; i <= localStorage.getItem("cat") - 1; i++){
        if(JSON.parse(localStorage.getItem("catego." + i)).ID !== null){
            msj += "<tr>" +
                    "<td><input type=\"text\" class=\"form-control\" id=\"catego" + i + "\" placeholder=\"Ingresa el nombre de la categoria\" value=\"" + JSON.parse(localStorage.getItem("catego." + i)).nombre+"\" disabled></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-success\" onclick=\"seleccionarCat(id)\"><i class=\"fas fa-pencil-alt\"></i></button></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-info\" onclick=\"guardarCat(id)\"><i class=\"far fa-save\"></i></button></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-danger\" onclick=\"borrarCat(id)\"><i class=\"fas fa-trash-alt\"></i></button></td>";
                    "</tr>";
                }
    }
    
    body.innerHTML = msj;
}

//permite agregar categorias
function agregarCategorias(){
    contadorCat();
    var nombre = document.getElementById("catnom");//obtiene el form del nombre de la categoria
    
    var objeto = {
        "ID" : cat,
        "nombre" : nombre.value
    };
    //guarda todo el json dentro de la variable catego. nueva ID
    localStorage.setItem("catego." + parseInt(localStorage.getItem("cat")), JSON.stringify(objeto));
    localStorage.setItem("cat", cat+1);
    crearTablaCategorias();
}

//seleccionar categorias
function seleccionarCat(e){
    //obtiene el campo desactivado
    var categoria = document.getElementById("catego" + e);
    //desactiva el campo
    categoria.disabled = false;
}

function guardarCat(e){
    //obtiene el campo ahora activado
    var categoria = document.getElementById("catego" + e);//obtiene el value del input nombre de la categoria
    var anterior = JSON.parse(localStorage.getItem("catego." + e)).nombre;//obtiene el valor del nombre anterior
    //guarda todo en un json
    var objeto = {
        "ID" : e,
        "nombre" : categoria.value
    };
    //Guarda los datos en la fila seleccionada
    localStorage.setItem("catego."+e, JSON.stringify(objeto));
    //llama a la funcion para actualizar nombre en subcategorias y productos
    actualizarSubyProd(anterior,categoria.value);
    //crea la tabla
    crearTablaCategorias();
}

//guarda el value de la categoria editada en las subcategorias y productos que lo hayan tenido previamente
function actualizarSubyProd(anterior, nuevo){
    //cambia la subcategoria
    var nombreSubCat;//obtiene la categoria de las subcategorias
    var catProd;//obtiene la categoria de los productos
    var objeto;//sera el json
    //se fija por cada subcategoria aver si coincide el nombre
    for(var i = 0; i <= localStorage.getItem("subcat") - 1; i++){//toma todas las subcategorias
        nombreSubCat = JSON.parse(localStorage.getItem("subcatego." + i)).categoria;//toma la categoria de cada subcategoria
        if(nombreSubCat === anterior){//si coinciden la categoria anterior con la categoria de la subcategoria hace los cambios pertinentes
            objeto = {//crea un nuevo json con los datos iguales pero nueva categoria
                "ID" : i,
                "nombre" : JSON.parse(localStorage.getItem("subcatego." + i)).nombre,
                "categoria" : nuevo
            };
            localStorage.setItem("subcatego."+i, JSON.stringify(objeto));//guarda el dato donde debe de ir
        }
    }
    //Ahora se fija en los productos para ver si coincide con el nombre
    //Me da hueva comentar otra vez lo mismo, hace exactamente lo mismo pero con los productos y su valor categoria
    //Profe si ve esto le debo 50 pesos, no es soborno, es apuesta xD, estoy seguro que yo mismo me voy a olvidar de este comentario entre tanta linea
    for(var j = 0; j <= localStorage.getItem("pr") - 1; j++){
        catProd = JSON.parse(localStorage.getItem("producto." + j));
        if(catProd.categoria === anterior){
            objeto = {
                "ID" : j,
                "nombre" : catProd.nombre,
                "descripcion" : catProd.descripcion,
                "categoria" : nuevo,
                "subcategoria" : catProd.subcategoria,
                "precio" : catProd.precio,
                "descuento" : catProd.descuento
            };
            localStorage.setItem("producto."+j, JSON.stringify(objeto));
        }
    }
}

function borrarCat(e){
    var objeto ={
        "ID" : null,
        "nombre" : ""
    };
    localStorage.setItem("catego."+e, JSON.stringify(objeto));
    crearTablaCategorias();
}

//busca categorias
function buscarCategorias(){
    var form = document.getElementById("buscador_categorias").value;
    var catego;
    var msj = "";
    var found = false;
    
    for(var i = 0; i <= localStorage.getItem("cat") - 1; i++){
        catego = JSON.parse(localStorage.getItem("catego." + i)).nombre;
        if(JSON.parse(localStorage.getItem("catego." + i)).ID !== null){
            if(form === catego){
                msj += "<tr>" +
                    "<td><input type=\"text\" class=\"form-control\" id=\"catego" + i + "\" placeholder=\"Ingresa el nombre de la categoria\" value=\"" + JSON.parse(localStorage.getItem("catego." + i)).nombre+"\" disabled></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-success\" onclick=\"seleccionarCat(id)\"><i class=\"fas fa-pencil-alt\"></i></button></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-info\" onclick=\"guardarCat(id)\"><i class=\"far fa-save\"></i></button></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-danger\" onclick=\"borrarCat(id)\"><i class=\"fas fa-trash-alt\"></i></button></td>";
                    "</tr>";
                found = true;
            }
        }
    }
    
    if(found === true){
         //crea la tabla
        form.value = "";
        document.getElementById("catBody").innerHTML = msj;   
    }
    else{
        alert("No se han encontrado resultados");
        crearTablaCategorias();
    }
}

//---------------------------------------------------------Tabla Subcategorias---------------------------------------
var subcat = 0;//cuenta las subcategorias

function ajustarSubCat(){
    if(localStorage.getItem("subcat") > 0 || localStorage.getItem("subcat") < 0){
        
    }
    else{
        localStorage.setItem("subcat", 0);
    }
    contadorSubCat();
}

function contadorSubCat(){
    if(localStorage.getItem("subcat") !== null){ //si el valor de "subcat" es diferente de null quere decir que ya hay una base de subcategorias registrada
        subcat = parseInt(localStorage.getItem("subcat"));
    }
    else{//en caso de no encontrarse ningun valor de "c" se crea dicho valor y se le asigna el valor de la variable c el cual es 0 inicialmente
        localStorage.setItem("subcat",subcat);
    }
}

//Crea el formulario selector de categorias basado en las categorias existentes nomas
function formAgregarCategorias(){
    var form = document.getElementById("sub_catego");
    var form2 = document.getElementById("buscador_subcategorias");
    var msj = "";
    var msj2 = "<option value\"Todas las categorias\" selected=\"selected\">Todas las subcategorias</option>";
    
    for (var i = 0; i <= localStorage.getItem("cat") - 1; i++){
        if(JSON.parse(localStorage.getItem("catego." + i)).ID !== null){
            msj += "<option value=\"" + JSON.parse(localStorage.getItem("catego." + i)).nombre + "\">" + JSON.parse(localStorage.getItem("catego." + i)).nombre +  "</option>";
        }
    }
    
    msj2 = msj2 + msj;
    form2.innerHTML = msj2;
    form.innerHTML = msj;
}

//crea la tabla
function crearTablaSubcategorias(){
    var tabla = document.getElementById("subcategoBody");//obtiene el body de la tabla
    var msj = "";
    var catNombre;
    var subcatCat;
    var catID;
    
    for (var i = 0; i <= subcat - 1; i++){
        if(JSON.parse(localStorage.getItem("subcatego." + i)).ID !== null){
            subcatCat = JSON.parse(localStorage.getItem("subcatego." + i)).categoria;
            msj += "<tr>" + //Agrega la celda con el form de categorias
                        "<td><input type=\"text\" class=\"form-control\" id=\"nomForSubCat" + i + "\" placeholder=\"Ingresa el nombre de la subcategoria\" value=\"" + JSON.parse(localStorage.getItem("subcatego." + i)).nombre+"\" disabled></td>" +
                        //agrega la celda con el formulario
                        "<td><select class=\"form-control\" id=\"form_catego" + i + "\" disabled>";
                        for (var j = 0; j <= localStorage.getItem("cat") - 1; j++){
                            catNombre = JSON.parse(localStorage.getItem("catego." + j)).nombre;//toma el nombre de la categoria del formulario
                            catID = JSON.parse(localStorage.getItem("catego." + j)).ID;//toma la ID de la categoria
                            if(catID !== null){//verifica que la categoria exista
                                msj += "<option value=\"" + JSON.parse(localStorage.getItem("catego." + j)).nombre + "\""; //>" + JSON.parse(localStorage.getItem("catego." + j)).nombre +  "</option>";
                                //checa en donde poner el active
                                if(catNombre === subcatCat){
                                    msj += "selected=\"selected\"";
                                }
                                msj += ">" + JSON.parse(localStorage.getItem("catego." + j)).nombre +  "</option>";
                            }
                        }
                    msj += "<select><td>" + 
                            "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-success\" onclick=\"seleccionarSubcat(id)\"><i class=\"fas fa-pencil-alt\"></i></button></td>" +
                            "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-info\" onclick=\"guardarSubcat(id)\"><i class=\"far fa-save\"></i></button></td>" +
                            "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-danger\" onclick=\"borrarSubcat(id)\"><i class=\"fas fa-trash-alt\"></i></button></td>";

                    "</tr>";
                }
    }
    tabla.innerHTML = msj; 
}

//Permite agregar subcategorias
function agregarSubcategorias(){
    //obtiene las casillas de nombre y categoria
    var nombre = document.getElementById("nomSubCat");
    var categoria = document.getElementById("sub_catego");
    //crea el json con los datos de la tabla
    var objeto = {
        "ID" : subcat,
        "nombre" : nombre.value,
        "categoria" : categoria.value
    };
    //Guarda los datos del json dentro de localStorage
    localStorage.setItem("subcatego." + parseInt(localStorage.getItem("subcat")), JSON.stringify(objeto));
    subcat += 1;
    localStorage.setItem("subcat", subcat);
    crearTablaSubcategorias();
}

function seleccionarSubcat(e){
    //obtiene el campo desactivado
    var subcategoria = document.getElementById("nomForSubCat" + e);
    var formulario = document.getElementById("form_catego" + e);
    //desactiva el campo
    subcategoria.disabled = false;
    formulario.disabled = false;
}

function guardarSubcat(e){
    var anterior = JSON.parse(localStorage.getItem("subcatego." + e)).nombre;//obtiene el valor del nombre anterior
    //obtiene el campo ahora activado
    var subcategoria = document.getElementById("nomForSubCat" + e);
    var formulario = document.getElementById("form_catego" + e);
    //guarda todo en un json
    var objeto = {
        "ID" : e,
        "nombre" : subcategoria.value,
        "categoria" : formulario.value
    };
    //Guarda los datos en la fila seleccionada
    localStorage.setItem("subcatego."+e, JSON.stringify(objeto));
    actualizarProdSubCat(anterior , subcategoria.value);
    crearTablaSubcategorias();
}

//actualiza el nombre de la subcategoria en los productos
function actualizarProdSubCat(anterior, nuevo){
    var catProd;//obtiene la subcategoria de los productos
    var objeto;//sera el json
    //se fija por cada producto aver si coincide el nombre
    for(var i = 0; i <= localStorage.getItem("pr") - 1; i++){//toma todas los productos
        catProd = JSON.parse(localStorage.getItem("producto." + i));//toma la subcategoria de cada producto
        if(catProd.subcategoria === anterior){//si coinciden la categoria anterior con la categoria de la subcategoria hace los cambios pertinentes
            objeto = {//crea un nuevo json con los datos iguales pero nueva categoria
                "ID" : i,
                "nombre" : catProd.nombre,
                "descripcion" : catProd.descripcion,
                "categoria" : catProd.categoria,
                "subcategoria" : nuevo,
                "precio" : catProd.precio,
                "descuento" : catProd.descuento
            };
            localStorage.setItem("producto."+i, JSON.stringify(objeto));
        }
    }
}

function borrarSubcat(e){
    var objeto ={
        "ID" : null,
        "nombre" : "",
        "categoria" : ""
    };
    localStorage.setItem("subcatego."+e, JSON.stringify(objeto));
    crearTablaSubcategorias();
}

function buscarSubcategorias(){
    var form = document.getElementById("buscador_subcategorias").value;
    var catego;
    var msj = "";
    var found = false;
    var catNombre;
    var subcatCat;
    var catID;
    
    for(var i = 0; i <= localStorage.getItem("subcat") - 1; i++){
        catego = JSON.parse(localStorage.getItem("subcatego." + i)).categoria;
        if(JSON.parse(localStorage.getItem("subcatego." + i)).ID !== null){
            if(form === catego){
                subcatCat = JSON.parse(localStorage.getItem("subcatego." + i)).categoria;
                msj += "<tr>" + //Agrega la celda con el form de categorias
                            "<td><input type=\"text\" class=\"form-control\" id=\"nomForSubCat" + i + "\" placeholder=\"Ingresa el nombre de la subcategoria\" value=\"" + JSON.parse(localStorage.getItem("subcatego." + i)).nombre+"\" disabled></td>" +
                            //agrega la celda con el formulario
                            "<td><select class=\"form-control\" id=\"form_catego" + i + "\" disabled>";
                            for (var j = 0; j <= localStorage.getItem("cat") - 1; j++){
                                catNombre = JSON.parse(localStorage.getItem("catego." + j)).nombre;//toma el nombre de la categoria del formulario
                                catID = JSON.parse(localStorage.getItem("catego." + j)).ID;//toma la ID de la categoria
                                if(catID !== null){//verifica que la categoria exista
                                    msj += "<option value=\"" + JSON.parse(localStorage.getItem("catego." + j)).nombre + "\""; //>" + JSON.parse(localStorage.getItem("catego." + j)).nombre +  "</option>";
                                    //checa en donde poner el active
                                    if(catNombre === subcatCat){
                                        msj += "selected=\"selected\"";
                                    }
                                    msj += ">" + JSON.parse(localStorage.getItem("catego." + j)).nombre +  "</option>";
                                }
                            }
                        msj += "<select><td>" + 
                                "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-success\" onclick=\"seleccionarSubcat(id)\"><i class=\"fas fa-pencil-alt\"></i></button></td>" +
                                "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-info\" onclick=\"guardarSubcat(id)\"><i class=\"far fa-save\"></i></button></td>" +
                                "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-danger\" onclick=\"borrarSubcat(id)\"><i class=\"fas fa-trash-alt\"></i></button></td>";

                        "</tr>";
                found = true;
            }
        }
    }
    
    if(found === true){
         //crea la tabla
        form.value = "";
        document.getElementById("subcategoBody").innerHTML = msj;   
    }
    else{
        crearTablaSubcategorias();
    }
}

//---------------------------------------------------------Tabla Productos--------------------------------------------
var pr = 0;//cuenta las categorias
//funcion que cree para evitar conflictos en el futuro que honestamente no recuerdo como funciona
function ajustarPr(){
    if(localStorage.getItem("pr") > 0 || localStorage.getItem("pr") < 0){
        
    }
    else{
        localStorage.setItem("pr", 0);
    }
    contadorPr();
}

function contadorPr(){
    if(localStorage.getItem("pr") !== null){ //si el valor de "pr" es diferente de null quere decir que ya hay una base de usuarios registrada
        pr = parseInt(localStorage.getItem("pr"));
    }
    else{//en caso de no encontrarse ningun valor de "pr" se crea dicho valor y se le asigna el valor de la variable c el cual es 0 inicialmente
        localStorage.setItem("pr",pr);
    }
}

//Agrega a los formularios de categorias
function crearFormulariosProductos(){
    var catego = document.getElementById("prod_cat");
    var msjcat = "";
    
    for (var i = 0; i <= localStorage.getItem("cat") - 1; i++){
        if(JSON.parse(localStorage.getItem("catego." + i)).ID !== null){
            msjcat += "<option value=\"" + JSON.parse(localStorage.getItem("catego." + i)).nombre + "\">" + JSON.parse(localStorage.getItem("catego." + i)).nombre +  "</option>";
        }
    }
    
    catego.innerHTML = msjcat;
    
}

function crearTablaProductos(){
    var tabla = document.getElementById("prod_body");
    var msj = "";
    var catNombre;
    var productoCat;
    var productoSubCat;
    var catID;
    var subCatNombre;
    var subCatID;
    var url = "";
    var productoIMG;
    
    for (var i = 0; i <= localStorage.getItem("pr") - 1; i++){
        if(JSON.parse(localStorage.getItem("producto." + i)).ID !== null){
            productoCat = JSON.parse(localStorage.getItem("producto." + i)).categoria;
            productoSubCat = JSON.parse(localStorage.getItem("producto." + i)).subcategoria;
            productoIMG = JSON.parse(localStorage.getItem("producto." + i)).imagen;
            //Valor de la imagen
            msj += "<tr>" +
                    "<td><select class=\"form-control\" id=\"primg" + i + "\" disabled>" +
                                "<optgroup label=\"Zapatos\">";
                                    for (var x=1; x <= 5; x++){
                                        url = "img/zapato/" + x + ".png";
                                        msj += "<option value=\"" + url +"\"";
                                        if(url === productoIMG){
                                            msj += "selected=\"selected\"";
                                        }
                                        msj+= ">Zapato " + x + "</option>";
                                    }
                                msj += "<optgroup label=\"Botas\">";
                                    for (x=1; x <= 5; x++){
                                        url = "img/bota/" + x + ".png";
                                        msj += "<option value=\"" + url + "\"";
                                        if(url === productoIMG){
                                            msj += "selected=\"selected\"";
                                        }
                                        msj+= ">Bota " + x + "</option>";
                                    }
                                msj+="<optgroup label=\"Pantunflas\">";
                                    for (x=1; x <= 5; x++){
                                        url = "img/pantunfla/" + x + ".png";
                                        msj += "<option value=\"" + url +"\"";
                                        if(url === productoIMG){
                                            msj += "selected=\"selected\"";
                                        }
                                        msj+= ">Pantunfla " + x + "</option>";
                                    }
                              msj+="</select>";
            //Programacion habitual
            msj += 
                        "<td><input type=\"text\" class=\"form-control\" id=\"prnm" + i + "\" placeholder=\"Ingresa el nombre del producto\" value=\"" + JSON.parse(localStorage.getItem("producto." + i)).nombre+"\" disabled></td>" +
                        "<td><textarea type=\"textarea\" class=\"form-control\" id=\"prds" + i + "\" placeholder=\"Ingresa la descripcion del producto\" disabled>" + JSON.parse(localStorage.getItem("producto." + i)).descripcion + "</textarea></td>" +
                        "<td><select class=\"form-control\" id=\"prct" + i + "\" disabled>"; 
                                for (var j = 0; j <= localStorage.getItem("cat") - 1; j++){
                                    catNombre = JSON.parse(localStorage.getItem("catego." + j)).nombre;//toma el nombre de la categoria del formulario
                                    catID = JSON.parse(localStorage.getItem("catego." + j)).ID;//toma la ID de la categoria
                                    if(catID !== null){//verifica que la categoria exista
                                        msj += "<option value=\"" + JSON.parse(localStorage.getItem("catego." + j)).nombre + "\""; //>" + JSON.parse(localStorage.getItem("catego." + j)).nombre +  "</option>";
                                        //checa en donde poner el active
                                        if(catNombre === productoCat){
                                            msj += "selected=\"selected\"";
                                        }
                                        msj += ">" + JSON.parse(localStorage.getItem("catego." + j)).nombre +  "</option>";
                                    }
                                }
                        msj += "</select></td>" +
                        "<td><select class=\"form-control\" id=\"prsct" + i + "\" disabled>";
                                for (var k = 0; k <= localStorage.getItem("subcat") - 1; k++){
                                    subCatNombre = JSON.parse(localStorage.getItem("subcatego." + k)).nombre;//toma el nombre de la subcategoria del formulario
                                    subCatID = JSON.parse(localStorage.getItem("subcatego." + k)).ID;//toma el nombre de la subcategoria del formulario
                                    if (subCatID !== null){//verifica que la categoria exista
                                        msj += "<option value=\"" + JSON.parse(localStorage.getItem("subcatego." + k)).nombre + "\"";//>" + JSON.parse(localStorage.getItem("subcatego." + k)).nombre +  "</option>";
                                        //chrca onde poner el active
                                        if(subCatNombre === productoSubCat){
                                            msj += "selected=\"selected\"";
                                        }
                                        msj+= ">" + JSON.parse(localStorage.getItem("subcatego." + k)).nombre +  "</option>";
                                    }
                                }
                        msj += "</select></td>" +
                        "<td><input type=\"number\" class=\"form-control\" placeholder=\"$00.00\" id=\"prpc" + i + "\" value=\"" + JSON.parse(localStorage.getItem("producto." + i)).precio+"\" disabled></td>" +
                        "<td><input type=\"number\" class=\form-control\" placeholder=\"Inserte descuento\" id=\"prdc" + i + "\" value=\"" + JSON.parse(localStorage.getItem("producto." + i)).descuento+"\" disabled></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-success\" onclick=\"seleccionarProductos(id)\"><i class=\"fas fa-pencil-alt\"></i></button></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-info\" onclick=\"guardarProductos(id)\"><i class=\"far fa-save\"></i></button></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-danger\" onclick=\"borrarProductos(id)\"><i class=\"fas fa-trash-alt\"></i></button></td>" +
                    "</tr>";
        }
    }
    tabla.innerHTML = msj;
}

function agregarProductos(){
    //obtiene las casillas de nombre y categoria
    var nombre = document.getElementById("prod_name");//Obtiene el input nombre
    var descripcion = document.getElementById("prod_des");//obtiene el input descripcion
    var categoria = document.getElementById("prod_cat");//optiene el dropdown categoria
    var subcategoria = document.getElementById("prod_subcat");//obtiene el dropdown subcategoria
    var precio = document.getElementById("prod_pr");//obtiene el input number del presio
    var descuento = document.getElementById("prod_dsc");//obtiene cuanto se le descuenta al presio
    var imagen = document.getElementById("prod_img");
    //crea el json con los datos de la tabla
    var objeto = {
        "ID" : pr,
        "nombre" : nombre.value,
        "descripcion" : descripcion.value,
        "categoria" : categoria.value,
        "subcategoria" : subcategoria.value,
        "precio" : precio.value,
        "descuento" : descuento.value,
        "imagen" : imagen.value
    };
    //Guarda los datos del json dentro de localStorage
    localStorage.setItem("producto." + parseInt(localStorage.getItem("pr")), JSON.stringify(objeto));
    pr += 1;
    localStorage.setItem("pr", pr);
    crearTablaProductos();
}

//selecciona la hilera de los productos
function seleccionarProductos(e){
    //obtiene el campo desactivado
    var nombre = document.getElementById("prnm" + e);
    var descripcion = document.getElementById("prds" + e);
    var categoria = document.getElementById("prct" + e);
    var subcategoria = document.getElementById("prsct" + e);
    var precio = document.getElementById("prpc" + e);
    var descuento = document.getElementById("prdc" + e);
    var imagen = document.getElementById("primg" + e);
    //desactiva el campo
    nombre.disabled = false;
    descripcion.disabled = false;
    categoria.disabled = false;
    subcategoria.disabled = false;
    precio.disabled = false;
    descuento.disabled = false;
    imagen.disabled = false;
    //desactiva los demas
    var seleccionado;
    for (var i = 0; i <= pr - 1; i++){
        seleccionado = document.getElementById(i);
        if(seleccionado.id !== e){
            seleccionado.disabled = true;
        }
    }
}

//guarda los cambios en los productos
function guardarProductos(e){
    //obtiene el campo desactivado
    var nombre = document.getElementById("prnm" + e);
    var descripcion = document.getElementById("prds" + e);
    var categoria = document.getElementById("prct" + e);
    var subcategoria = document.getElementById("prsct" + e);
    var precio = document.getElementById("prpc" + e);
    var descuento = document.getElementById("prdc" + e);
    var imagen = document.getElementById("primg" + e);
    //crea el JSON del nuevo guardado
    var objeto = {
        "ID" : e,
        "nombre" : nombre.value,
        "descripcion" : descripcion.value,
        "categoria" : categoria.value,
        "subcategoria" : subcategoria.value,
        "precio" : precio.value,
        "descuento" : descuento.value,
        "imagen" : imagen.value
    };
    //guarda el JSON dentro del producto
    localStorage.setItem("producto."+e, JSON.stringify(objeto));
    crearTablaProductos();//vuelve a crear la tabla
}

//borra productos
function borrarProductos(e){
    var objeto = {
        "ID" : null,
        "nombre" : "",
        "descripcion" : "",
        "categoria" : "",
        "subcategoria" : "",
        "precio" : "",
        "descuento" : "",
        "imagen" : ""
    };
    localStorage.setItem("producto."+e, JSON.stringify(objeto));
    crearTablaProductos();//vuelve a crear la tabla
}

//Filtrado de categorias y subcategorias
function filtrarSubcategorias(){
    var formSubCat = document.getElementById("prod_subcat");//obtiene el formulario a mostrar
    var submsj = "";//crea los campos del formulario
    var categoria = document.getElementById("prod_cat").value;//obtiene la categoria
    var subcatCat; //JSON.parse(localStorage.getItem("subcatego." + i)).categoria;
    
    for (var i = 0; i <= localStorage.getItem("subcat") - 1; i++){
        subcatCat = JSON.parse(localStorage.getItem("subcatego." + i)).categoria;
        if(subcatCat === categoria){
            submsj += "<option value=\"" + JSON.parse(localStorage.getItem("subcatego." + i)).nombre + "\">" + JSON.parse(localStorage.getItem("subcatego." + i)).nombre +  "</option>";
        }
    }
    formSubCat.innerHTML = submsj;
}

function buscarProductos(){
    var form = document.getElementById("buscador_productos");//obtiene el string del buscador
    var largo = form.value.length;//obtiene el largo del string
    var prodNombre;//nombre del producto
    var prodNomPal;//obtiene la palabra clave
    var found = false;
    var tabla = document.getElementById("prod_body");
    //cadena.substr(0,largo)
    var msj = "";
    var catNombre;
    var productoCat;
    var productoSubCat;
    var catID;
    var subCatNombre;
    var subCatID;
    
    for (var i = 0; i <= localStorage.getItem("pr") - 1; i++){
         if(JSON.parse(localStorage.getItem("producto." + i)).ID !== null){//verifica que el producto exista
            prodNombre = JSON.parse(localStorage.getItem("producto." + i)).nombre;//obtiene el name del producto
            productoCat = JSON.parse(localStorage.getItem("producto." + i)).categoria;//obtiene la categoria del producto
            productoSubCat = JSON.parse(localStorage.getItem("producto." + i)).subcategoria;//obtiene subcategoria del producto
            prodNomPal = prodNombre.substr(0,largo);//Nombre acortado
            if(largo !== 0 && prodNomPal === form.value){//verifica que el nombre coincida con la busqueda
                msj += "<tr>" +
                        "<td><input type=\"text\" class=\"form-control\" id=\"prnm" + i + "\" placeholder=\"Ingresa el nombre del producto\" value=\"" + JSON.parse(localStorage.getItem("producto." + i)).nombre+"\" disabled></td>" +
                        "<td><textarea type=\"textarea\" class=\"form-control\" id=\"prds" + i + "\" placeholder=\"Ingresa la descripcion del producto\" disabled>" + JSON.parse(localStorage.getItem("producto." + i)).descripcion + "</textarea></td>" +
                        "<td><select class=\"form-control\" id=\"prct" + i + "\" disabled>"; 
                                for (var j = 0; j <= localStorage.getItem("cat") - 1; j++){
                                    catNombre = JSON.parse(localStorage.getItem("catego." + j)).nombre;//toma el nombre de la categoria del formulario
                                    catID = JSON.parse(localStorage.getItem("catego." + j)).ID;//toma la ID de la categoria
                                    if(catID !== null){//verifica que la categoria exista
                                        msj += "<option value=\"" + JSON.parse(localStorage.getItem("catego." + j)).nombre + "\""; //>" + JSON.parse(localStorage.getItem("catego." + j)).nombre +  "</option>";
                                        //checa en donde poner el active
                                        if(catNombre === productoCat){
                                            msj += "selected=\"selected\"";
                                        }
                                        msj += ">" + JSON.parse(localStorage.getItem("catego." + j)).nombre +  "</option>";
                                    }
                                }
                        msj += "</select></td>" +
                        "<td><select class=\"form-control\" id=\"prsct" + i + "\" disabled>";
                                for (var k = 0; k <= localStorage.getItem("subcat") - 1; k++){
                                    subCatNombre = JSON.parse(localStorage.getItem("subcatego." + k)).nombre;//toma el nombre de la subcategoria del formulario
                                    subCatID = JSON.parse(localStorage.getItem("subcatego." + k)).ID;//toma el nombre de la subcategoria del formulario
                                    if (subCatID !== null){//verifica que la categoria exista
                                        msj += "<option value=\"" + JSON.parse(localStorage.getItem("subcatego." + k)).nombre + "\"";//>" + JSON.parse(localStorage.getItem("subcatego." + k)).nombre +  "</option>";
                                        //chrca onde poner el active
                                        if(subCatNombre === productoSubCat){
                                            msj += "selected=\"selected\"";
                                        }
                                        msj+= ">" + JSON.parse(localStorage.getItem("subcatego." + k)).nombre +  "</option>";
                                    }
                                }
                        msj += "</select></td>" +
                        "<td><input type=\"number\" class=\"form-control\" placeholder=\"$00.00\" id=\"prpc" + i + "\" value=\"" + JSON.parse(localStorage.getItem("producto." + i)).precio+"\" disabled></td>" +
                        "<td><input type=\"number\" class=\form-control\" placeholder=\"Inserte descuento\" id=\"prdc" + i + "\" value=\"" + JSON.parse(localStorage.getItem("producto." + i)).descuento+"\" disabled></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-success\" onclick=\"seleccionarProductos(id)\"><i class=\"fas fa-pencil-alt\"></i></button></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-info\" onclick=\"guardarProductos(id)\"><i class=\"far fa-save\"></i></button></td>" +
                        "<td><button type=\"button\" id=\"" + i + "\" class=\"btn btn-danger\" onclick=\"borrarProductos(id)\"><i class=\"fas fa-trash-alt\"></i></button></td>" +
                    "</tr>";
                found = true;
            }
         }
    }
    if(found === true){
         //crea la tabla
        form.value = "";
        tabla.innerHTML = msj;
    }
    else{
        crearTablaProductos();
    }
    
}

//---------------------------------------------------------Panel de carrusel-----------------------------------------

function guardarCarrusel(){
    //Obtiene todos los valores de los 5 inputs
    var imagen1 = document.getElementById("sel1").value;
    var imagen2 = document.getElementById("sel2").value;
    var imagen3 = document.getElementById("sel3").value;
    var imagen4 = document.getElementById("sel4").value;
    var imagen5 = document.getElementById("sel5").value;
    //los almacena en un JSON los datos para el carrusel de frontend
    var objeto = {
      "img1" : imagen1.substr(3,imagen1.length),
      "img2" : imagen2.substr(3,imagen2.length),
      "img3" : imagen3.substr(3,imagen3.length),
      "img4" : imagen4.substr(3,imagen4.length),
      "img5" : imagen5.substr(3,imagen5.length)
    };
    //Almacena un JSON aparte para el carrusel mostrado
    var objeto2 = {
      "img1" : imagen1,
      "img2" : imagen2,
      "img3" : imagen3,
      "img4" : imagen4,
      "img5" : imagen5
    };
    //Guarda el JSON para frontend
    localStorage.setItem("carrusel", JSON.stringify(objeto));
    //Guarda JSON para este carrusel
    localStorage.setItem("carruselBE", JSON.stringify(objeto2));
    //actualiza el carrusel
    actualizarCarrusel();
}

//Actualiza el carrusel dentro del panel de admins
function actualizarCarrusel(){
    //Obtiene los elementos de imagenes
    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");
    var img3 = document.getElementById("img3");
    var img4 = document.getElementById("img4");
    var img5 = document.getElementById("img5");
    
    var datos = JSON.parse(localStorage.getItem("carruselBE"));//Obtiene los datos actuales de como debe de ir el carrusel
    
    img1.src = datos.img1;
    img2.src = datos.img2;
    img3.src = datos.img3;
    img4.src = datos.img4;
    img5.src = datos.img5;
}

//--------------------------------------------------------Panel tapadera de ventas xD--------------------------------------------



//---------------------------------------------------------Cargar funciones de onload--------------------------------
function lanzar(){
    ajustarDatos();//carga elementos del login
    obtenerDatos();//obtiene nombre de la pagina
}


window.onload = lanzar;