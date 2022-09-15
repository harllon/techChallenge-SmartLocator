/*let xhr = new XMLHttpRequest();
xhr.open('get', 'https://api.punkapi.com/v2/beers');
xhr.send();

xhr.onload = async function() {
    //files = JSON.parse(xhr.response)
    console.log(xhr.response);
};*/

let vector = ['id', 'name', 'abv', 'ibu', 'ebc', 'brewed']
var table;
var firstTime = true;

var option = document.getElementById("options");
//option.style.display = "none";
var value = document.getElementById("value");
var submitButton = document.getElementById("submit");
var randomButton = document.getElementById("random");

submitButton.onclick = function(){
    var chosedOption = option.value
    var valueTyped = value.value
    console.log(chosedOption)
    console.log(valueTyped)
    var url = "https://api.punkapi.com/v2/beers?" + chosedOption + "=" + valueTyped;
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onload = async function() {
        files = JSON.parse(xhr.response)
        console.log(files);
        generateTable(files)
    };
    randomButton.style.display = "none";
    if(!firstTime) table.remove()
    
}

randomButton.onclick = function(){
    var url = "https://api.punkapi.com/v2/beers/random"
    let xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onload = async function() {
        files = JSON.parse(xhr.response)
        console.log(files);
        generateTable(files)
    };
    if(!firstTime) table.remove()
}

function generateTable(files) {
    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
  
    // creating all cells
    for (let i = 0; i < files.length + 1; i++) {
      // creates a table row
      const row = document.createElement("tr");
  
      for (let j = 0; j < 6; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        const cell = document.createElement("td");
        if(i == 0) var cellText = document.createTextNode(vector[j]);
        else{
                switch(j){
                    case 0:
                        var cellText = document.createTextNode(files[i-1].id);
                        break;
                    case 1:
                        var cellText = document.createTextNode(files[i-1].name);
                        break;
                    case 2:
                        var cellText = document.createTextNode(files[i-1].abv);
                        break;
                    case 3:
                        var cellText = document.createTextNode(files[i-1].ibu);
                        break;
                    case 4:
                        var cellText = document.createTextNode(files[i-1].ebc);
                        break;
                    case 5:
                        var cellText = document.createTextNode(files[i-1].first_brewed);
                        break;
            }
            
        } 
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
      firstTime = false;
      table = tbl;
    }
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
  }

//return 1 beer by id

//return a random beer

//
