function openCalculator(evt, calculatorName) {
    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(calculatorName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function showOptions(opcion) {
    var opcionesProporcion = document.getElementById('opcionesProporcion');
    var opcionesMedia = document.getElementById('opcionesMedia');
    var elementosPoblacion = document.getElementById('elementosPoblacion');
    var elementosProporcion = document.getElementById('elementosProporcion');
    var elementosMedia = document.getElementById('elementosMedia');

    if (opcion === 'proporcion') {
        opcionesProporcion.style.display = 'block';
        opcionesMedia.style.display = 'none';
        elementosPoblacion.style.display = document.querySelector('input[name="poblacion"]:checked').value === 'Si' ? 'block' : 'none';
        elementosProporcion.style.display = 'block';
        elementosMedia.style.display = 'none';
    } else if (opcion === 'media') {
        opcionesMedia.style.display = 'block';
        opcionesProporcion.style.display = 'none';
        elementosPoblacion.style.display = document.querySelector('input[name="poblacion"]:checked').value === 'Si' ? 'block' : 'none';
        elementosMedia.style.display = 'block';
        elementosProporcion.style.display = 'none';
    }
}

function showOptionsPoblacion(opcion, tipo) {
    var elementosPoblacion = document.getElementById('elementosPoblacion');
    var elementosPoblacionMedia = document.getElementById('elementosPoblacionMedia');

    if (tipo == 'proporcion') {
        if (opcion == 'Si') {
            elementosPoblacion.style.display = 'block';
        } else {
            elementosPoblacion.style.display = 'none';
        }
    } else if (tipo == 'media') {
        if (opcion == 'Si') {
            elementosPoblacionMedia.style.display = 'block';
        } else {
            elementosPoblacionMedia.style.display = 'none';
        }
    }
}

function showOptionsComparativo(opcion) {
    var opcionesProporcion = document.getElementById('opcionesProporcionComparativo');
    var opcionesMedia = document.getElementById('opcionesMediaComparativo');

    if (opcion === 'proporcion') {
        opcionesProporcion.style.display = 'block';
        opcionesMedia.style.display = 'none';
    } else if (opcion === 'media') {
        opcionesMedia.style.display = 'block';
        opcionesProporcion.style.display = 'none';
    }
}

function calcularResultadoDesPro(){
    var poblacion = document.querySelector('input[name="poblacion"]:checked').value;
    var confianza = parseFloat(document.querySelector('input[name="confianzaPro"]:checked').value);
    var Sprecision = parseFloat(document.getElementById("PrecisionPro").value);
    var SproporcionEsperada = parseFloat(document.getElementById("proporcionEsperada").value);

    var precision = Sprecision /100; 
    var proporcionEsperada = SproporcionEsperada /100;


    var q = 1 - proporcionEsperada;
    var resultadoDesPro;

    if(confianza == '95'){
        confianza = 1.96;
    }else if(confianza == '99'){
        confianza = 2.58;
    }

    if (poblacion=='Si'){
        var Npoblacion = parseFloat(document.getElementById('poblacionPro').value)
        resultadoDesPro = (Npoblacion * Math.pow(confianza, 2) * proporcionEsperada * q) / (((Math.pow(precision, 2)) * (Npoblacion - 1)) + ((Math.pow(confianza, 2)) * proporcionEsperada * q));
    }else {
        resultadoDesPro = (Math.pow(confianza, 2) * proporcionEsperada * q) / Math.pow(precision, 2);
    }

    resultadoDesPro = Math.round(resultadoDesPro);

    document.getElementById("resultadoLabelDesPro").innerText = "El resultado es: " + resultadoDesPro;
}

function calcularResultadoDesMe(){
    var poblacion = document.querySelector('input[name="poblacion"]:checked').value;
    var confianza = parseFloat(document.querySelector('input[name="confianzaMe"]:checked').value);
    var varianza = parseFloat(document.getElementById("varianzaMe").value);
    var precision = parseFloat(document.getElementById("PrecisionMe").value);
    var resultadoDesMe;

    if(confianza == '95'){
        confianza = 1.96;
    }else if(confianza == '99'){
        confianza = 2.58;
    }

    if(poblacion == 'Si'){
        var Npoblacion = parseFloat(document.getElementById('PoblacionMe').value)
        resultadoDesMe = (Npoblacion * Math.pow(confianza, 2) * Math.pow(varianza, 2)) / ((Math.pow(precision, 2)) * (Npoblacion - 1) + (Math.pow(confianza, 2)) * Math.pow(varianza, 2));
    }else if(poblacion == 'No'){
        resultadoDesMe = (Math.pow(confianza, 2) * varianza) / Math.pow(precision, 2);
    }

    document.getElementById("resultadoLabelDesMe").innerText = "El resultado es: " + resultadoDesMe.toFixed(1);

}

function calcularResultadoComPro() {
    var zAlpha = parseFloat(document.getElementById("zAlphaComPro").value);
    var zBeta = parseFloat(document.getElementById("zBetaCompro").value);
    var Sproporcion1 = parseFloat(document.getElementById("proporcion1").value);
    var Sproporcion2 = parseFloat(document.getElementById("proporcion2").value);

    var proporcion1 = Sproporcion1/100;
    var proporcion2 = Sproporcion2/100;

    mediaProporciones = (proporcion1 + proporcion2)/2

    var resultadoPro = Math.pow(((zAlpha * Math.sqrt(2 * mediaProporciones * (1 - mediaProporciones))) + (zBeta * Math.sqrt((proporcion1 * (1 - proporcion1)) + (proporcion2 * (1 - proporcion2))))), 2) / Math.pow(proporcion1 - proporcion2, 2);

    resultadoPro = Math.round(resultadoPro);
 
    document.getElementById("resultadoLabelComPro").innerText = "El resultado es: " + resultadoPro;
}

function calcularResultadoComMe() {
    var zAlpha = parseFloat(document.getElementById("zAlphaComMe").value);
    var zBeta = parseFloat(document.getElementById("zBetaComMe").value);
    var Varianza = parseFloat(document.getElementById("Varianza").value);
    var Diferencia = parseFloat(document.getElementById("Diferencia").value);

    var resultadoPa = (2 * Math.pow((zAlpha + zBeta), 2) * Math.pow(Varianza, 2)) / Math.pow(Diferencia, 2);
 
    document.getElementById("resultadoLabelComMe").innerText = "El resultado es: " + resultadoPa.toFixed(3);
}

function showOptionsPerdidas(opcion){
    var perdida = document.getElementById("elementosPerdida");
    if(opcion == 'Si'){
        perdida.style.display = 'block';
    }else{
        perdida.style.display = 'none';
    }

}

function calcularResultadoCorre(){
    var zAlpha = parseFloat(document.getElementById("zAlphaCorre").value);
    var zBeta = parseFloat(document.getElementById("zBetaCorre").value);
    var pulso = parseFloat(document.getElementById("PulsoCorre").value);
    var perdida = document.querySelector('input[name="perdidas"]:checked').value;
    var estiperdi = 0;

    var resultadoCorre = Math.pow((zAlpha + zBeta)/((1/2)*Math.log((1+pulso)/(1-pulso))), 2) + 3;

    resultadoCorre = Math.round(resultadoCorre);

    if (perdida == 'Si'){
        var SNperdida = parseFloat(document.getElementById("PerdidaEsti").value);
        var Nperdida = SNperdida/100;
        estiperdi = resultadoCorre / (1-Nperdida);
        estiperdi = Math.ceil(estiperdi);
        document.getElementById("resultadoLabelCorre").innerText = "El resultado es: " + resultadoCorre;
        document.getElementById("resultadoLabelCorrePerdi").innerText = "El resultado ajustado a perdidas es: " + estiperdi;
    }else {
        document.getElementById("resultadoLabelCorre").innerText = "El resultado es: " + resultadoCorre;
    }
}