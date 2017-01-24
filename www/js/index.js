/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */

/*
function prueba1(){
    var texto = "<h1> Hola Mundo JQuery </h1>";
    texto += "Hola "+$('#nombre').val();
    $('#micaja').html(texto);
}
*/

var tablero = null;
var difficulty = 0;
var chrono = null;
var mina=null;
var temporizador = null;
var minas=0;

$(document).ready(function(){
    /* var tablero = crearTablero(6,8,9);
    tablero2console(tablero);*/
    console.log("App cargada!");
    
});



/**
 * 
 * @param {Int} ancho
 * @param {Int} alto
 * @param {Int} minas
 * @returns {2D Array}
 * 
 * En la matriz del tablero:
 *  -1 = En esa casilla hay una mina
 *  0 = Nada alrededor
 *  1 = hay 1 mina  en las 8 casillas que rodean a la que estoy
 *  2 = hay 2 minas en las 8 casillas que rodean a la que estoy
 *  3 = hay 3 minas en las 8 casillas que rodean a la que estoy
 *  4 = hay 4 minas en las 8 casillas que rodean a la que estoy
 *  5 = hay 5 minas en las 8 casillas que rodean a la que estoy
 *  6 = hay 6 minas en las 8 casillas que rodean a la que estoy
 *  7 = hay 7 minas en las 8 casillas que rodean a la que estoy
 *  8 = hay 8 minas en las 8 casillas que rodean a la que estoy
 */

function crearTablero(fil, col, minas){
    var array = new Array(fil);
    var i, j;
    // Creamos un Array de Arrays.
    for (i=0; i<fil; i++){
        array[i] = new Array(col);
    }
    
    // Inicializamos el tablero a vacío.
    for ( i=0; i<fil; i++) {            
        for ( j=0; j<col; j++) {
            array[i][j]=0;
        }
    }
    
    // Colocamos las minas 
    while (minas>0) {        
        // tiramos dos dados para las dos coordenadas donde irá la mina
        var f = parseInt(Math.random()*fil);
        var c = parseInt(Math.random()*col);
        // comprueba si NO hay una mina en esa posición
        if (array[f][c] !== -1) {
            array[f][c]=-1; // pongo la mina en la posición de los dados
            minas--; // minas = minas -1; es lo mismo
        }       
    }
    
    
    // colocamos los números que cuentan el número de minas cercanas
    for (i=0; i<fil; i++){
        for(j=0; j<col; j++){
            if (array[i][j]!==-1) { //si NO hay mina en esa posición
                // casos especiales
                if (i!==0) { //NO estoy en la primera fila               
                    if (i===(fil-1)) { // Estoy en la última fila
                        if (j===0) { // No miro a la derecha
                            //última fila, primera columna
                            //if (array[i-1][j-1]===-1) array[i][j]++;
                            if (array[i-1][j]===-1) array[i][j]++;
                            if (array[i-1][j+1]===-1) array[i][j]++;
                            if (array[i][j+1]===-1) array[i][j]++;
                            //if (array[i+1][j+1]===-1) array[i][j]++;
                            //if (array[i+1][j]===-1) array[i][j]++;
                            //if (array[i+1][j-1]===-1) array[i][j]++;
                            //if (array[i][j-1]===-1) array[i][j]++;
                        } else {
                            if (j!==(col-1)) { 
                                //última fila, columna intermedia
                                if (array[i-1][j-1]===-1) array[i][j]++;
                                if (array[i-1][j]===-1) array[i][j]++;
                                if (array[i-1][j+1]===-1) array[i][j]++;
                                if (array[i][j+1]===-1) array[i][j]++;
                                //if (array[i+1][j+1]===-1) array[i][j]++;
                                //if (array[i+1][j]===-1) array[i][j]++;
                                //if (array[i+1][j-1]===-1) array[i][j]++;
                                if (array[i][j-1]===-1) array[i][j]++;                             
                            } else { 
                                //última fila, última columna
                                if (array[i-1][j-1]===-1) array[i][j]++;
                                if (array[i-1][j]===-1) array[i][j]++;
                                //if (array[i-1][j+1]===-1) array[i][j]++;
                                //if (array[i][j+1]===-1) array[i][j]++;
                                //if (array[i+1][j+1]===-1) array[i][j]++;
                                //if (array[i+1][j]===-1) array[i][j]++;
                                //if (array[i+1][j-1]===-1) array[i][j]++;
                                if (array[i][j-1]===-1) array[i][j]++;
                            }
                        }
                    } else { // estoy en una fila intermedia
                        // if (i<(fil-1)) {    
                            if (j===0) { // fila media, primera columna
                                // if (array[i-1][j-1]===-1) array[i][j]++;
                                if (array[i-1][j]===-1) array[i][j]++;
                                if (array[i-1][j+1]===-1) array[i][j]++;
                                if (array[i][j+1]===-1) array[i][j]++;
                                if (array[i+1][j+1]===-1) array[i][j]++;
                                if (array[i+1][j]===-1) array[i][j]++;
                                // if (array[i+1][j-1]===-1) array[i][j]++;
                                // if (array[i][j-1]===-1) array[i][j]++;                          
                            } else {
                                if (j!==(col-1)) { 
                                    // fila y columna intermedias
                                    if (array[i-1][j-1]===-1) array[i][j]++;
                                    if (array[i-1][j]===-1) array[i][j]++;
                                    if (array[i-1][j+1]===-1) array[i][j]++;
                                    if (array[i][j+1]===-1) array[i][j]++;
                                    if (array[i+1][j+1]===-1) array[i][j]++;
                                    if (array[i+1][j]===-1) array[i][j]++;
                                    if (array[i+1][j-1]===-1) array[i][j]++;
                                    if (array[i][j-1]===-1) array[i][j]++;
                                } else { 
                                    // fila intermedia, última columna
                                    if (array[i-1][j-1]===-1) array[i][j]++;
                                    if (array[i-1][j]===-1) array[i][j]++;
                                    //if (array[i-1][j+1]===-1) array[i][j]++;
                                    //if (array[i][j+1]===-1) array[i][j]++;
                                    //if (array[i+1][j+1]===-1) array[i][j]++;
                                    if (array[i+1][j]===-1) array[i][j]++;
                                    if (array[i+1][j-1]===-1) array[i][j]++;
                                    if (array[i][j-1]===-1) array[i][j]++;
                                }
                            }
                        } 
                } else {
                    // estoy en la primera fila
                    if (j===0) { // primera fila, primera columna
                        //if (array[i-1][j-1]===-1) array[i][j]++;
                        //if (array[i-1][j]===-1) array[i][j]++;
                        //if (array[i-1][j+1]===-1) array[i][j]++;
                        if (array[i][j+1]===-1) array[i][j]++;
                        if (array[i+1][j+1]===-1) array[i][j]++;
                        if (array[i+1][j]===-1) array[i][j]++;
                        if (array[i+1][j-1]===-1) array[i][j]++;
                        //if (array[i][j-1]===-1) array[i][j]++;                          
                    } else {
                        if (j!==(col-1)) { 
                            // primera fila y columna intermedia
                            //if (array[i-1][j-1]===-1) array[i][j]++;
                            //if (array[i-1][j]===-1) array[i][j]++;
                            //if (array[i-1][j+1]===-1) array[i][j]++;
                            if (array[i][j+1]===-1) array[i][j]++;
                            if (array[i+1][j+1]===-1) array[i][j]++;
                            if (array[i+1][j]===-1) array[i][j]++;
                            if (array[i+1][j-1]===-1) array[i][j]++;
                            if (array[i][j-1]===-1) array[i][j]++;
                        } else { 
                            // primera fila, última columna
                            //if (array[i-1][j-1]===-1) array[i][j]++;
                            //if (array[i-1][j]===-1) array[i][j]++;
                            //if (array[i-1][j+1]===-1) array[i][j]++;
                            //if (array[i][j+1]===-1) array[i][j]++;
                            //if (array[i+1][j+1]===-1) array[i][j]++;
                            if (array[i+1][j]===-1) array[i][j]++;
                            if (array[i+1][j-1]===-1) array[i][j]++;
                            if (array[i][j-1]===-1) array[i][j]++;
                        }
                    }
                }       
            }
        }
    }
    // DEBUG: Comentar la línea de abajo cuando terminemos el programa
    tablero2console(array);
    return array;
}

function tablero2console(array) {
    var texto="";
    for (var i=0; i<array.length; i++){
        for(var j=0; j<array[i].length; j++){
            texto += "\t"+array[i][j];
        }
        texto += "\n";
    }
    console.log(texto);
}

function pintarTablero(fil, col, caja){
     // DEBUG: Comentar la línea de abajo cuando terminemos el programa
    console.log("Pintando tablero en caja: "+caja);
    var miCaja =  $(caja);
    var table = $('<table />');
    var tbody = $('<tbody />');
    var tr = null;
    // $("td").remove();
    $("table").empty();
    for (var i=0;i<fil;i++) {
        tr = $('<tr />');
        for (var j=0;j<col;j++){
            tr.append('<td id="celda_'+i+'_'+j+'" class="empty-cell" onclick="disparo('+i+','+j+')">'+tablero[i][j]+"</td>");
        }
        tbody.append(tr);
    }
    table.append(tbody);
    miCaja.html(" ");
    miCaja.append(table);
    $("td").each(
        function(){
            $(this).on("taphold",        
              function (event){
                if ($(event.target).hasClass( "flag-cell" )) {
                    $(event.target).removeAttr("class");
                    $(event.target).addClass( "empty-cell" );
                    minas++;
                }else if($(event.target).hasClass( "empty-cell" )) {
                    $(event.target).removeAttr("class");
                    $(event.target).addClass( "flag-cell" );
                    minas--;
                }
                mina.html(minas);
              });
        });
}

function disparo(fil, col) {   
    console.log('Disparo en: '+('#celda_'+fil+'_'+col));
    // console.log('Disparo en: '+$('#celda_'+fil+'_'+col));
    /* if ($(('#celda_'+fil+'_'+col)).hasClass( "flag-cell" )){
        minas++;
        mina.html(minas);
        $(('#celda_'+fil+'_'+col)).removeAttr( "class" );
    }
    else*/ if ($(('#celda_'+fil+'_'+col)).hasClass( "empty-cell" )) {
        //$(('#celda_'+fil+'_'+col)).removeClass( "empty-cell" );
    
        switch (tablero[fil][col]) {
            case -1:
                $(('#celda_'+fil+'_'+col)).addClass("bomb-cell");
                descubre_tablero();
                var smiley = null;
                if (difficulty === 1) {
                    smiley = $('#easy-smiley');
                } else if (difficulty === 2) {
                    smiley = $('#medium-smiley');
                } else {
                    smiley = $('#hard-smiley');
                }
                smiley.attr("src", "img/smiley-dead.png");
                break;
            case 0:
                $(('#celda_'+fil+'_'+col)).addClass("nothing-cell");
                break;
            case 1:
                $(('#celda_'+fil+'_'+col)).addClass("one-cell");
                break;
            case 2:
                $(('#celda_'+fil+'_'+col)).addClass("two-cell");
                break;
            case 3:
                $(('#celda_'+fil+'_'+col)).addClass("three-cell");
                break;    
            case 4:
                $(('#celda_'+fil+'_'+col)).addClass("four-cell");
                break;  
            case 5:
                $(('#celda_'+fil+'_'+col)).addClass("five-cell");
                break;  
            case 6:
                $(('#celda_'+fil+'_'+col)).addClass("six-cell");
                break;  
            case 7:
                $(('#celda_'+fil+'_'+col)).addClass("seven-cell");
                break;  
            case 8:
                $(('#celda_'+fil+'_'+col)).addClass("eight-cell");
                break;
            case 9:
                $(('#celda_'+fil+'_'+col)).addClass("nine-cell");
                break;  
            default:
                $(('#celda_'+fil+'_'+col)).addClass("empty-cell");
                break;
        }
    }
    
}

function partida(dific, caja){
    // DEBUG: Comentar la línea de abajo cuando terminemos el programa
    console.log("Creando tablero para dificultad: "+dific+" cargando en caja: "+caja);
    difficulty = dific;
    switch (dific) {
        case 1:
            minas=5;
            tablero = crearTablero(5,5,5);
            pintarTablero(5,4,caja);
            $('#easy-smiley').attr("src", "img/smiley.png");
            mina = $('#easy-mines');
            chrono = $('#easy-chrono'); 
            inicializar();
            arrancar();
            break;
        case 2:
            minas=10;
            tablero = crearTablero(7,7,10);
            pintarTablero(6,5,caja);
            $('#medium-smiley').attr("src", "img/smiley.png");
            mina = $('#medium-mines');
            chrono = $('#medium-chrono'); 
            inicializar();
            arrancar();
            break;
        case 3:
            minas=15;
            tablero = crearTablero(9,9,20);
            pintarTablero(7,6,caja);
            $('#hard-smiley').attr("src", "img/smiley.png");
            mina = $('#hard-mines');
            chrono = $('#hard-chrono');
            inicializar();
            arrancar();
            break;
        default:
            tablero=null;
    }   
    mina.html(minas);
}

function descubre_tablero(){
    var filas= tablero.length;
    var cols = (tablero[0]).length;
    console.log("Decubriendo tablero de fil="+filas+" col="+cols);
    for (var i=0; i<filas;i++){
        for (var j=0; j<cols; j++) {
            // if (! $('#celda_'+i+'_'+j).hasClass("bomb-cell") ) {
                switch (tablero[i][j]) {
                    case -1:
                        if (($('#celda_'+i+'_'+j).hasClass("bomb-cell"))) {
                            // $('#celda_'+i+'_'+j).addClass("bomb-cell");
                            parar();
                        } else {
                            $('#celda_'+i+'_'+j).addClass("mine-cell");
                        }
                        break;
                    case 0:
                        $('#celda_'+i+'_'+j).addClass("nothing-cell");
                        break;
                    case 1:
                        $('#celda_'+i+'_'+j).addClass("one-cell");
                        break;
                    case 2:
                        $('#celda_'+i+'_'+j).addClass("two-cell");
                        break;
                    case 3:
                        $('#celda_'+i+'_'+j).addClass("three-cell");
                        break;    
                    case 4:
                        $('#celda_'+i+'_'+j).addClass("four-cell");
                        break;  
                    case 5:
                        $('#celda_'+i+'_'+j).addClass("five-cell");
                        break;  
                    case 6:
                        $('#celda_'+i+'_'+j).addClass("six-cell");
                        break;  
                    case 7:
                        $('#celda_'+i+'_'+j).addClass("seven-cell");
                        break;  
                    case 8:
                        $('#celda_'+i+'_'+j).addClass("eight-cell");
                        break;
                    case 9:
                        $('#celda_'+i+'_'+j).addClass("nine-cell");
                        break;  
                    default:
                        $('#celda_'+i+'_'+j).addClass("empty-cell");
                        break;
                    }
        } 
    }
}

/** Código para el temporizador 
*/


function incr() {
    chrono.html( +(chrono.html())+ 1);
}

function arrancar() {
    if (temporizador) {
        clearInterval(temporizador);
    }
    temporizador = setInterval(function () {
        incr();
        // mostrar();
    }, 1000);
}

function parar() {
    clearInterval(temporizador);
    //temporizador.stop();
    temporizador = null;
}

function inicializar() {
    chrono.html( '0' );
}