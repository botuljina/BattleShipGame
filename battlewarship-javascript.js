var HoveracActivation=0;
var boatSize =0;

//battleship-welcome.html fajl pzoiva ovu funkciju
function startSettingBoats()
{
    var re = new RegExp("[A-Za-z0-9_]{3,15}");
    if (re.test(document.getElementById("user1").value)&&re.test(document.getElementById("user2").value)) {      
        localStorage.setItem("user1",document.getElementById("user1").value);
        localStorage.setItem("user2",document.getElementById("user2").value);
        var setup = window.open("battleship-setup.html");
    } else {
        alert("podaci nisu ispravni");
    }
}

function loadPlayerName(num)
{
    switch(num){
        case 1: document.getElementById("playerName").innerHTML = localStorage.getItem("user1"); break;
        case 2: document.getElementById("playerName").innerHTML = localStorage.getItem("user2"); break;
    }
}

function initializeSize(e)
{
  var id = e.id[0];

  boatSize=parseInt(id);

  if(parseInt(document.getElementById(boatSize.toString()).innerHTML)==0) 
  {
    boatSize=0; 
    alert("Ispunili ste maksimalan broj jedinica ove duzine."); 
  }
  
}

//GAME REALIZATION
//--------------------------------------------------------------------------------------------------------------
//Funkcija: Postavlja brodove na tabli levo, i gadjanja na tabli desno
var hitFieldsPLayerOne=0;
var redFieldsPlayerOne=[];
var greyFieldsPlayerOne=[];

var hitFieldsPLayerTwo=0;
var redFieldsPlayerTwo=[];
var greyFieldsPlayerTwo=[];

var succeded_in_hitting=0;
var button_pressed=0;

var game_finished=0;

function startMove()
{
    if(game_finished) return;
    button_pressed=1;
    var array = [];
    var grey =[];
    var red =[];
    if(document.getElementById("playerName").innerHTML == localStorage.getItem("user1"))
    {//igrac1 je na potezu
        array = [localStorage.getItem("arrayOfFoursPlayerOne"),localStorage.getItem("arrayOfThreesPlayerOne"),localStorage.getItem("arrayOfTwosPlayerOne"),localStorage.getItem("arrayOfOnesrsPlayerOne")];
        grey = greyFieldsPlayerOne;
        red = redFieldsPlayerOne;
    }else
    {
        array = [localStorage.getItem("arrayOfFoursPlayerTwo"),localStorage.getItem("arrayOfThreesPlayerTwo"),localStorage.getItem("arrayOfTwosPlayerTwo"),localStorage.getItem("arrayOfOnesrsPlayerTwo")];
        grey = greyFieldsPlayerTwo;
        red =redFieldsPlayerTwo;
    }     
        for(var j=0;j<array.length;j++)
        {
            var tempArray = array[j];
            var num=[];
            for(var i=0;i<tempArray.length;i++)
            {
                if(tempArray[i]!=',')
                {
                    num+=tempArray[i];  
                }
                if(num.length==2)
                {   
                    document.getElementById(num+"1").setAttribute("class","td");
                    num=[];
                }
            }
        }
        var id=[];      
        for(var i=0;i<grey.length;i++)
        {     
                if(grey[i]!=',')
                {
                    id+=grey[i];  
                }
                if(id.length==3)
                {   
                    document.getElementById(id).setAttribute("class","tdDarkGrey");
                    id=[];
                }        
        }
        id=[];
        for(var i=0;i<red.length;i++)
        {     
                if(red[i]!=',')
                {
                    id+=red[i];  
                }
                if(id.length==3)
                {              
                    document.getElementById(id).setAttribute("class","td");
                    id=[];
                }        
        }
    
}
//Funckija: Dugme inicijalizuje hit, provera da li je pogodio ili ne 
function StartHitting(e)
{
    if(game_finished) return;
    if(button_pressed==0)
    {
        alert("Pritisni dugme zapocni potez, zatim pokusaj ponovo!");
        return;
    }
    var array = [];
    var redFields =[];
    var greyFields=[];
    if(document.getElementById("playerName").innerHTML == localStorage.getItem("user1"))
    {//igrac1 je na potezu, proveravaj u odnosu na polja igraca 2
        array = [localStorage.getItem("arrayOfFoursPlayerTwo"),localStorage.getItem("arrayOfThreesPlayerTwo"),localStorage.getItem("arrayOfTwosPlayerTwo"),localStorage.getItem("arrayOfOnesrsPlayerTwo")];
        redFields=redFieldsPlayerOne;
        greyFields=greyFieldsPlayerOne;
    }else
    {     
        array = [localStorage.getItem("arrayOfFoursPlayerOne"),localStorage.getItem("arrayOfThreesPlayerOne"),localStorage.getItem("arrayOfTwosPlayerOne"),localStorage.getItem("arrayOfOnesrsPlayerOne")];
        redFields=redFieldsPlayerTwo;
        greyFields=greyFieldsPlayerTwo;
    }  
    var hit_field = e.id[0]+e.id[1];
    for(var j=0;j<array.length;j++)
    {
        var tempArray = array[j];
        var num=[];
        for(var i=0;i<tempArray.length;i++)
        {
            if(tempArray[i]!=',')
            {
                num+=tempArray[i];  
            }
            if(num.length==2 && num==hit_field)
            {   
                document.getElementById(e.id).setAttribute("class","td");
                if(document.getElementById("playerName").innerHTML == localStorage.getItem("user1")) 
                                                                                            hitFieldsPLayerOne++;
                else hitFieldsPLayerTwo++;
                succeded_in_hitting=1;

                redFields+=e.id;
                redFields+=",";
                num=[];
            }
            if(num.length==2)
            {
                num=[];
            }
        }
    }
    
    if(succeded_in_hitting==0){
        e.setAttribute("class","tdDarkGrey");
        greyFields+=e.id;
        greyFields+=",";
    }
    if(document.getElementById("playerName").innerHTML == localStorage.getItem("user1"))
    {//igrac1 je na potezu, proveravaj u odnosu na polja igraca 2
        redFieldsPlayerOne=[];
        redFieldsPlayerOne = redFields;
        greyFieldsPlayerOne = [];
        greyFieldsPlayerOne = greyFields;
        
    }else
    {     
        redFieldsPlayerTwo=[];
        redFieldsPlayerTwo = redFields;
        greyFieldsPlayerTwo = [];
        greyFieldsPlayerTwo= greyFields;
    } 
    //alert(greyFields);
    //alert(redFields);
}

//Funkcija: onmouseup se izvrsava
function emptyTables(){

    if(button_pressed==1)
    {
        if(hitFieldsPLayerOne==20 || hitFieldsPLayerTwo==20)
        {
            colorBothTablesToMarkEnd();
        }
    
        if(succeded_in_hitting==0){
            if(document.getElementById("playerName").innerHTML == localStorage.getItem("user1")) loadPlayerName(2);
            else loadPlayerName(1);
            functionForEmptying();
            button_pressed=0;
        }else{
            //prvi pogodak uspeo
            succeded_in_hitting=0;
           
        }
        
    }   
    
}

function colorBothTablesToMarkEnd()
{
    for(var i=1;i<=2;i++)
    {
        for (var a=0; a < 100; a++) 
        {
            var id = a.toString()+i.toString();
            if(id.length==2)
            {
                var new_id = "0"+id;
                document.getElementById(new_id).setAttribute("class","td");
            }else
                 document.getElementById(id).setAttribute("class","td");
        }
    }
    document.getElementById("txtHeader").innerHTML="IGRA JE GOTOVA!"
    if(hitFieldsPLayerOne==10)
    {
        document.getElementById("playerName").innerHTML=localStorage.getItem("user2")+ " JE POBEDNIK!";
    }else
    {
        document.getElementById("playerName").innerHTML=localStorage.getItem("user1") + " JE POBEDNIK!";
    }
}
function functionForEmptying()
{  
        for(var i=1;i<=2;i++)
        {
            for (var a=0; a < 100; a++) 
            {
                var id = a.toString()+i.toString();
                if(id.length==2)
                {
                    var new_id = "0"+id;
                    document.getElementById(new_id).setAttribute("class","tdTransparent");
                }else
                     document.getElementById(id).setAttribute("class","tdTransparent");
            }
        }
        
    
}
function createTables(indexOne,indexTwo)
{
    loadPlayerName(1);
    var tables=["tableOne","tableTwo"];
    for(var i=0;i<2;i++)
    {
        var table =  document.getElementById(tables[i]);
        table.setAttribute("width","400");
        table.setAttribute("height","400");
        for (var a=0; a < 10; a++) 
        {
            var row = table.insertRow(a);    
                for(var b=0; b<10; b++) 
                {
                    var cell = row.insertCell(b);
                    var idFromCell;
                    if(i==0)
                        idFromCell = a.toString()+b.toString()+indexOne.toString();
                    else
                        idFromCell = a.toString()+b.toString()+indexTwo.toString();
                    
                    cell.setAttribute("id",idFromCell);   
                    if(i==1)
                    {
                        cell.setAttribute("onmousedown","StartHitting(this)");
                        cell.setAttribute("onmouseup","emptyTables()");
                    }
                    
                }
        }
    }

    
}
//----------------------------------------------------------------------------------------------------------------------------------------------
//battleship-setup
function createTable()
{
        loadPlayerName(1);

        var table =  document.getElementById("tabela");
        table.setAttribute("width","400");
        table.setAttribute("height","400");
        table.setAttribute("class","center");
        for (var a=0; a < 10; a++) {
            var row = table.insertRow(a);    
                for(var b=0; b<10; b++) {
                    var cell = row.insertCell(b);
                    cell.setAttribute("onmouseover","colorHover(this)");
                    cell.setAttribute("onmousedown","onMouseDown(this)");
                    cell.setAttribute("onmouseup","onMouseUp()");
                    var idFromCell = a.toString()+b.toString();
                    cell.setAttribute("id",idFromCell);
                    cell.setAttribute("class","center");                   
                }
        }
    
  
}

var tempArray =[];
var tempSize =0;
var incrementor = 1;
var decrementor = -1;

var arrayOfFours = [];
var arrayOfThrees = [];
var arrayOfTwos = [];
var arrayOfOnes = [];

function returnBoatQuantity()
{
    var boatSize=4;
    for(var i=1;i<=4;i++){
        document.getElementById(boatSize.toString()).innerHTML=i.toString();
        boatSize--;
    }
}
function checkIfPlacingIsFinished()
{
    var num1 = parseInt(document.getElementById("1").innerHTML);
    var num2 = parseInt(document.getElementById("2").innerHTML);
    var num3 = parseInt(document.getElementById("3").innerHTML);
    var num4 = parseInt(document.getElementById("4").innerHTML);
    var numOfBoats = num1+num2+num3+num4;
    
    
    
    //postavio je prvi igrac
    if(numOfBoats==0 && document.getElementById("playerName").innerHTML==localStorage.getItem("user1")){
        alert("Prvi igrac je postavio brodove, sada je na redu igrac 2");
        localStorage.setItem("arrayOfFoursPlayerOne",arrayOfFours.toString());
        localStorage.setItem("arrayOfThreesPlayerOne",arrayOfThrees.toString());
        localStorage.setItem("arrayOfTwosPlayerOne",arrayOfTwos.toString());
        localStorage.setItem("arrayOfOnesrsPlayerOne",arrayOfOnes.toString());
        arrayOfFours = [];
        arrayOfThrees = [];
        arrayOfTwos = [];
        arrayOfOnes = [];
        for(var i=0;i<10;i++){
            for(var j=0;j<10;j++) document.getElementById(i.toString()+j.toString()).setAttribute("class","center");
        }
        returnBoatQuantity();
        loadPlayerName(2);
    }
    else
    {
        if(numOfBoats==0 && document.getElementById("playerName").innerHTML==localStorage.getItem("user2")){
            alert("Drugi igrac je postavio brodove, igra moze da pocne.");
            localStorage.setItem("arrayOfFoursPlayerTwo",arrayOfFours.toString());
            localStorage.setItem("arrayOfThreesPlayerTwo",arrayOfThrees.toString());
            localStorage.setItem("arrayOfTwosPlayerTwo",arrayOfTwos.toString());
            localStorage.setItem("arrayOfOnesrsPlayerTwo",arrayOfOnes.toString());
            window.open("battleship-game.html");
        }
    }

    

    
}
function onMouseDown(e){   

    if(boatSize>0) 
    {       
        if(e.className=="center")  
        {
            boatSize--;    
        
            e.setAttribute("class","td");

            tempArray.push(e.id);
            //colorNeighbours(e,"tdDarkGrey");
            tempSize++;

            if(HoveracActivation==1) HoveracActivation=0;
            else HoveracActivation=1;
            
            if(boatSize==0)
            {                   
                useTempArrayElements();
                colorAllNeighbours("tdDarkGrey");
                setArgumentsInDefaultState();
                checkIfPlacingIsFinished();
                HoveracActivation=0;                   
            }
        }     
        else
        {
            restartColoredSquares();
            setArgumentsInDefaultState();
            HoveracActivation=0;
            alert("Postavljanje broda nije moguce. Pokusaj ponovo!")
        }    
        
    }
   
}
function onMouseUp()
{
    if(boatSize!=0){
        restartColoredSquares();
        setArgumentsInDefaultState();
        HoveracActivation=0;
        alert("Nisi ispravno postavio brod, procitaj uputsvo, zatim pokusaj ponovo!")
    }
    
}

function restartColoredSquares(){
    for(var i=0;i<tempSize;i++)
    {
        document.getElementById(tempArray[i]).setAttribute("class","center");
        colorNeighboursBackToTransparent(document.getElementById(tempArray[i]),"tdTransparent");
    }
}
function colorAllNeighbours(colorClass){
    for(var i=0;i<tempSize;i++)
    {
        colorNeighbours(document.getElementById(tempArray[i]),colorClass);
    }
}
function colorNeighboursBackToTransparent(e,nameOfClass)
{
    var d = parseInt(e.id[0]);
    var j = parseInt(e.id[1]);  
    if((d-1)>=0 && j>=0)
        if(document.getElementById((d-1).toString()+j.toString()).className!="td" && document.getElementById((d-1).toString()+j.toString()).className!="tdDarkGrey") document.getElementById((d-1).toString()+j.toString()).setAttribute("class",nameOfClass);
    if((d+1)<=9 && j>=0)
        if(document.getElementById((d+1).toString()+j.toString()).className!="td" && document.getElementById((d+1).toString()+j.toString()).className!="tdDarkGrey") document.getElementById((d+1).toString()+j.toString()).setAttribute("class",nameOfClass);
    if((j-1)>=0 && d>=0)
        if(document.getElementById(d.toString()+(j-1).toString()).className!="td" && document.getElementById(d.toString()+(j-1).toString()).className!="tdDarkGrey") document.getElementById(d.toString()+(j-1).toString()).setAttribute("class",nameOfClass);
    if((j+1)<=9 && d>=0)
        if(document.getElementById(d.toString()+(j+1).toString()).className!="td" && document.getElementById(d.toString()+(j+1).toString()).className!="tdDarkGrey") document.getElementById(d.toString()+(j+1).toString()).setAttribute("class",nameOfClass);
}
function colorNeighbours(e,nameOfClass)
{
    
    var d = parseInt(e.id[0]);
    var j = parseInt(e.id[1]);  
    if((d-1)>=0 && j>=0)
        if(document.getElementById((d-1).toString()+j.toString()).className!="td") document.getElementById((d-1).toString()+j.toString()).setAttribute("class",nameOfClass);
    if((d+1)<=9 && j>=0)
        if(document.getElementById((d+1).toString()+j.toString()).className!="td") document.getElementById((d+1).toString()+j.toString()).setAttribute("class",nameOfClass);
    if((j-1)>=0 && d>=0)
        if(document.getElementById(d.toString()+(j-1).toString()).className!="td") document.getElementById(d.toString()+(j-1).toString()).setAttribute("class",nameOfClass);
    if((j+1)<=9 && d>=0)
        if(document.getElementById(d.toString()+(j+1).toString()).className!="td" ) document.getElementById(d.toString()+(j+1).toString()).setAttribute("class",nameOfClass);
    
}
function pushingToArrayAllowed(e)
{
    var elForTempArray= e.id;
    if(parseInt( tempArray[0][1])==parseInt(elForTempArray[1])+decrementor && parseInt(tempArray[0][0])==parseInt(elForTempArray[0]) && e.className!="tdDarkGrey" && e.className!="td")
    {//krecem na desno
        tempArray.push(e.id);    
        tempSize++;
        decrementor--;
        return 1;
    }
    if(parseInt( tempArray[0][1])==parseInt(elForTempArray[1])+incrementor && parseInt( tempArray[0][0])==parseInt( elForTempArray[0])&& e.className!="tdDarkGrey" && e.className!="td")
    {//krecem na levo
        tempArray.push(e.id);        
        tempSize++;
        incrementor++;
        return 1;
    }

    if(parseInt( tempArray[0][0])==parseInt(elForTempArray[0])+decrementor && parseInt( tempArray[0][1])==parseInt( elForTempArray[1]) && e.className!="tdDarkGrey" && e.className!="td")
    {//krecem na dole
        tempArray.push(e.id);     
        tempSize++;
        decrementor--;
        return 1;
    }
    if(parseInt( tempArray[0][0])==parseInt(elForTempArray[0])+incrementor && parseInt( tempArray[0][1])==parseInt( elForTempArray[1])&& e.className!="tdDarkGrey" && e.className!="td")
    {//krecem na gore
        tempArray.push(e.id);       
        tempSize++;
        incrementor++;
        return 1;
    }
    //ukoliko nije ispostovano ni jedno od ovih pravila, postavi sve paremtre u pocetak
    restartColoredSquares();
    setArgumentsInDefaultState();
    HoveracActivation=0;
    alert("Nisi ispravno postavio brod, procitaj uputsvo, zatim pokusaj ponovo!");
    return 0;
}
function addToArray(e,array){
    for(var i=0;i<e;i++)
    {
        array.push(tempArray[i]);
    }
}

function useTempArrayElements()
{
    switch(tempSize){
        case 4: addToArray(4,arrayOfFours); break;
        case 3: addToArray(3,arrayOfThrees); break;
        case 2: addToArray(2,arrayOfTwos); break;
        case 1: addToArray(1,arrayOfOnes); break;        
    }
    //umanjujem ukupan broj brodova
    var value = parseInt(document.getElementById(tempSize.toString()).innerHTML);  
    value--;
    document.getElementById(tempSize.toString()).innerHTML = value.toString();
}
function setArgumentsInDefaultState()
{
 boatSize =0;
 tempArray = [];
 tempSize =0;
 incrementor=1;
 decrementor=-1;
}
function colorHover(e)
{
    if(boatSize>0)
    {
        var myboolean = pushingToArrayAllowed(e);
        if(HoveracActivation==1 && myboolean==1)
        {            
                boatSize--;     
                e.setAttribute("class","td"); 

                if(boatSize==0)
                {                   
                    useTempArrayElements();
                    colorAllNeighbours("tdDarkGrey");
                    setArgumentsInDefaultState();
                    checkIfPlacingIsFinished();
                    HoveracActivation=0;                   
                }
                
        }     
    }
}

