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

function showOptionsTamaniomuestral(opcion){
    var opcionescontrol = document.getElementById('opcionesCasoControl');
    var opcionescohorte = document.getElementById('opcionesCasoCohorte');

    if (opcion === 'control'){
        opcionescontrol.style.display = 'block';
        opcionescohorte.style.display = 'none';
    } else if (opcion === 'cohorte'){
        opcionescohorte.style.display = 'block';
        opcionescontrol.style.display = 'none';
    }
}

function showOptionsControlCaso(opcion){
    var ControlCaso = document.getElementById("elementosControlCaso");
    if(opcion == 'Si'){
        ControlCaso.style.display = 'block';
    }else{
        ControlCaso.style.display = 'none';
    }
}

function calcularResultadoDesPro(){
    var poblacion = "";
    var confianza = 0;
    var Sprecision = 0;
    var SproporcionEsperada = 0;
    var precision = 0;
    var proporcionEsperada = 0;
    var q = 0;
    var resultadoDesPro = 0;
    var Npoblacion = 0;

    poblacion = document.querySelector('input[name="poblacion"]:checked').value;
    confianza = parseFloat(document.querySelector('input[name="confianzaPro"]:checked').value);
    Sprecision = parseFloat(document.getElementById("PrecisionPro").value);
    SproporcionEsperada = parseFloat(document.getElementById("proporcionEsperada").value);

    precision = Sprecision /100; 
    proporcionEsperada = SproporcionEsperada /100;


    q = 1 - proporcionEsperada;
    resultadoDesPro;

    if(confianza == '95'){
        confianza = 1.96;
    }else if(confianza == '99'){
        confianza = 2.58;
    }

    if (poblacion=='Si'){
        Npoblacion = parseFloat(document.getElementById('poblacionPro').value)
        resultadoDesPro = (Npoblacion * Math.pow(confianza, 2) * proporcionEsperada * q) / (((Math.pow(precision, 2)) * (Npoblacion - 1)) + ((Math.pow(confianza, 2)) * proporcionEsperada * q));
    }else {
        resultadoDesPro = (Math.pow(confianza, 2) * proporcionEsperada * q) / Math.pow(precision, 2);
    }

    resultadoDesPro = Math.round(resultadoDesPro);

    document.getElementById("resultadoLabelDesPro").innerText = "El resultado es: " + resultadoDesPro;
}

function calcularResultadoDesMe(){
    var poblacion = "";
    var confianza = 0;
    var varianza = 0;
    var precision = 0;
    var resultadoDesMe = 0;
    var Npoblacion = 0;

    poblacion = document.querySelector('input[name="poblacion"]:checked').value;
    confianza = parseFloat(document.querySelector('input[name="confianzaMe"]:checked').value);
    varianza = parseFloat(document.getElementById("varianzaMe").value);
    precision = parseFloat(document.getElementById("PrecisionMe").value);
    resultadoDesMe;

    if(confianza == '95'){
        confianza = 1.96;
    }else if(confianza == '99'){
        confianza = 2.58;
    }

    if(poblacion == 'Si'){
        Npoblacion = parseFloat(document.getElementById('PoblacionMe').value)
        resultadoDesMe = (Npoblacion * Math.pow(confianza, 2) * Math.pow(varianza, 2)) / ((Math.pow(precision, 2)) * (Npoblacion - 1) + (Math.pow(confianza, 2)) * Math.pow(varianza, 2));
    }else if(poblacion == 'No'){
        resultadoDesMe = (Math.pow(confianza, 2) * varianza) / Math.pow(precision, 2);
    }

    document.getElementById("resultadoLabelDesMe").innerText = "El resultado es: " + resultadoDesMe.toFixed(1);

}

function calcularResultadoComPro() {
    var zAlpha = 0;
    var zBeta = 0;
    var Sproporcion1 = 0;
    var Sproporcion2 = 0;
    var proporcion1 = 0;
    var proporcion2 = 0;
    var mediaProporciones = 0;
    var resultadoPro = 0 

    zAlpha = parseFloat(document.getElementById("zAlphaComPro").value);
    zBeta = parseFloat(document.getElementById("zBetaCompro").value);
    Sproporcion1 = parseFloat(document.getElementById("proporcion1").value);
    Sproporcion2 = parseFloat(document.getElementById("proporcion2").value);

    proporcion1 = Sproporcion1/100;
    proporcion2 = Sproporcion2/100;

    mediaProporciones = (proporcion1 + proporcion2)/2

    resultadoPro = Math.pow(((zAlpha * Math.sqrt(2 * mediaProporciones * (1 - mediaProporciones))) + (zBeta * Math.sqrt((proporcion1 * (1 - proporcion1)) + (proporcion2 * (1 - proporcion2))))), 2) / Math.pow(proporcion1 - proporcion2, 2);

    resultadoPro = Math.round(resultadoPro);
 
    document.getElementById("resultadoLabelComPro").innerText = "El resultado es: " + resultadoPro;
}

function calcularResultadoComMe() {
    var zAlpha = 0;
    var zBeta = 0;
    var Varianza = 0;
    var Diferencia = 0;
    var resultadoPa = 0;

    zAlpha = parseFloat(document.getElementById("zAlphaComMe").value);
    zBeta = parseFloat(document.getElementById("zBetaComMe").value);
    Varianza = parseFloat(document.getElementById("Varianza").value);
    Diferencia = parseFloat(document.getElementById("Diferencia").value);

    resultadoPa = (2 * Math.pow((zAlpha + zBeta), 2) * Math.pow(Varianza, 2)) / Math.pow(Diferencia, 2);
 
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
    var zAlpha = 0;
    var zBeta = 0;
    var pulso = 0;
    var perdida = 0;
    var resultadoCorre = 0
    var SNperdida = 0;
    var Nperdida = 0;
    var estiperdi = 0;

    zAlpha = parseFloat(document.getElementById("zAlphaCorre").value);
    zBeta = parseFloat(document.getElementById("zBetaCorre").value);
    pulso = parseFloat(document.getElementById("PulsoCorre").value);
    perdida = document.querySelector('input[name="perdidas"]:checked').value;
    estiperdi = 0;

    resultadoCorre = Math.pow((zAlpha + zBeta)/((1/2)*Math.log((1+pulso)/(1-pulso))), 2) + 3;

    resultadoCorre = Math.round(resultadoCorre);

    if (perdida == 'Si'){
        var SNperdida = parseFloat(document.getElementById("PerdidaEsti").value);
        var Nperdida = SNperdida/100;
        estiperdi = resultadoCorre / (1-Nperdida);
        estiperdi = Math.ceil(estiperdi);
        document.getElementById("resultadoLabelCorre").innerText = "El resultado es: " + resultadoCorre;
        document.getElementById("resultadoLabelCorrePerdi").innerText = "El resultado ajustado a perdidas es: " + estiperdi;
        resultadoLabelCorrePerdi.style.display = 'block';
    }else {
        document.getElementById("resultadoLabelCorre").innerText = "El resultado es: " + resultadoCorre;
        resultadoLabelCorrePerdi.style.display = 'none';
    }
}

function calcularResultadoControl(){
    var Sfrecuencia = 0;
    var odds = 0;
    var confianza = "";
    var potencia = 0;
    var opcioncontrolcaso = "";
    var frecuencia = 0;
    var p1 = 0;
    var p = 0;
    var Nconca = 0;
    var resultado = 0;

    Sfrecuencia = parseFloat(document.getElementById("FrecuControl").value);
    odds = parseFloat(document.getElementById("OdRatio").value);
    confianza = parseFloat(document.querySelector('input[name="confianzaControl"]:checked').value);
    potencia = parseFloat(document.getElementById("Poten").value);
    opcioncontrolcaso = document.querySelector('input[name="controlcaso"]:checked').value;

    frecuencia = Sfrecuencia/100;

    if(confianza == '95'){
        confianza = 1.96;
    }else if(confianza == '99'){
        confianza = 2.58;
    }

    p1 = (odds * frecuencia)/((1-frecuencia) + odds * frecuencia);
    p1 = parseFloat(p1.toFixed(2));
    p = (p1 + frecuencia)/ 2;

    if(opcioncontrolcaso == "Si"){
        Nconca = parseFloat(document.getElementById("ConCa").value);
        resultado = Math.pow((confianza * Math.sqrt((Nconca+1) * p * (1-p))) + (potencia * Math.sqrt((Nconca*p1*(1-p1))+(frecuencia*(1-frecuencia)))), 2)/( Nconca*Math.pow((frecuencia-p1),2));
    }else {
        var resultado = Math.pow((confianza * Math.sqrt(2 * p * (1-p))) + (potencia * Math.sqrt((p1*(1-p1))+(frecuencia*(1-frecuencia)))), 2)/Math.pow((p1-frecuencia),2);
    }

    resultado = Math.ceil(resultado)

    document.getElementById("resultadoLabelCasoControl").innerText = "El resultado es: " + resultado;
}

function calcularResultadoCohorte(){
    var Sp1 = 0;
    var Sp2 = 0;
    var confianza = 0;
    var PreRe = 0;
    var p1 = 0;
    var p2 = 0;
    var resultadoCohorte = 0;

    Sp1 = parseFloat(document.getElementById("p1").value);
    Sp2 = parseFloat(document.getElementById("p2").value);
    confianza = parseFloat(document.querySelector('input[name="confianzaCohorte"]:checked').value);
    PreRe = parseFloat(document.getElementById("PR").value);
    p1 = Sp1/100;
    p2 = Sp2/100;

    if(confianza == '95'){
        confianza = 1.96;
    }else if(confianza == '99'){
        confianza = 2.58;
    }

    resultadoCohorte = Math.pow(confianza,2) * ( ((1-p1)/p1 + (1-p2)/p2) / (Math.pow(Math.log(1 - PreRe), 2)) )

    resultadoCohorte = Math.ceil(resultadoCohorte)

    document.getElementById("resultadoLabelCohorte").innerText = "El resultado es: " + resultadoCohorte;
}