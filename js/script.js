"use strict";

var btnVoegToe, btnSelecteer, btnWijzig, btnVerwijder, btnVerwijderAlles;
var divResponse;
var lblGeselecteerd;
var slcSteden;
var txtIndex, txtNieuw;

window.addEventListener('load', Initieer);

function Initieer() {
  KoppelElementen();
  KoppelEvents();
  VulStandaardwaarden();
};

const KoppelElementen = () => {
  btnVoegToe = document.getElementById("btnVoegToe");
  btnSelecteer = document.getElementById("btnSelecteer");
  btnWijzig = document.getElementById("btnWijzig");
  btnVerwijder = document.getElementById("btnVerwijder");
  btnVerwijderAlles = document.getElementById("btnVerwijderAlles");
  divResponse = document.getElementById("divResponse");
  lblGeselecteerd = document.getElementById("lblGeselecteerd");
  slcSteden = document.getElementById("slcSteden");
  txtIndex = document.getElementById("txtIndex");
  txtNieuw = document.getElementById("txtNieuw");
}

const KoppelEvents = () => {

  slcSteden.addEventListener('change', () => {
    let index = slcSteden.selectedIndex;
    ToonGeselecteerdeStad(index);
  });

  btnSelecteer.addEventListener('click', () => {
    let index = parseInt(txtIndex.value) - 1;
    slcSteden.selectedIndex = index;
    ToonGeselecteerdeStad(index);
  });

  btnVoegToe.addEventListener('click', () => {
    let stad = txtNieuw.value;
    let newIndex = slcSteden.options.length;
    console.log(stad);
    slcSteden.options[newIndex] = new Option(stad, newIndex);
  });

  btnWijzig.addEventListener('click', () => {
    let stad = txtNieuw.value;
    let index = slcSteden.selectedIndex;
    if(index >= 0)
    {
      slcSteden.options[index].text = stad ;
      ToonGeselecteerdeStad(index);
    } 
      
  });

  btnVerwijder.addEventListener('click', () => {
    let index = slcSteden.selectedIndex;
    slcSteden.options[index] = null;
  })
  btnVerwijderAlles.addEventListener('click', () => {
    slcSteden.options.length = 0;
    lblGeselecteerd.innerText = "";
    divResponse.innerText = "";
  })

}

const ToonGeselecteerdeStad = (index) => {
  if (index >= 0 && index < slcSteden.options.length) {
    let geselecteerdeStad = slcSteden.options[index].text;
    let geselecteerdeValue = slcSteden.options[index].value;
    let selectieInfo = `Geselecteerd: ${index + 1} / ${slcSteden.options.length}`
    lblGeselecteerd.innerText = geselecteerdeStad + '\n' + geselecteerdeValue;
    divResponse.innerText = selectieInfo;
  }
}

const VulStandaardwaarden = () => {
  let steden = ["Brugge", "Gent", "Leuven"];
  VulSlcSteden(steden);
  txtIndex.value = "1";
  txtNieuw.value = "Kortrijk";
}

const VulSlcSteden = (stedenLijst) => {
  for (let index = 0; index < stedenLijst.length; index++) {
    const stad = stedenLijst[index];
    let option = new Option(stad, `Stad${index}`);
    slcSteden.options[index] = option;
    if (index == 0) {
      slcSteden.options[index].selected = "selected";
      ToonGeselecteerdeStad(index);
    }
  }

}