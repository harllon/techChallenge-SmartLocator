let abvgt = document.getElementById("abv_gt");
let abvlt = document.getElementById("abv_lt");
let ibugt = document.getElementById("ibu_gt");
let ibult = document.getElementById("ibu_lt");
let ebcgt = document.getElementById("ebc_gt");
let ebclt = document.getElementById("ebc_lt");
let beername = document.getElementById("beer_name");
let brewedBefore = document.getElementById("brewed_before");
let brewedAfter = document.getElementById("brewed_after");
let hops = document.getElementById("hops");
let malt = document.getElementById("malt");
let food = document.getElementById("food");
let ids = document.getElementById("ids");
let abvgtVal = document.getElementById("abvgt_value");
let abvltVal = document.getElementById("abvlt_value");
let ibugtVal = document.getElementById("ibugt_value");
let ibultVal = document.getElementById("ibult_value");
let ebcgtVal = document.getElementById("ebcgt_value");
let ebcltVal = document.getElementById("ebclt_value");
let beernameVal = document.getElementById("beer_value");
let brewedBeforeVal = document.getElementById("brewedB_value");
let brewedAfterVal = document.getElementById("brewedA_value");
let hopsVal = document.getElementById("hops_value");
let maltVal = document.getElementById("malt_value");
let foodVal = document.getElementById("food_value");
let idsVal = document.getElementById("ids_value");

let tag = ['id', 'name', 'abv', 'ibu', 'ebc', 'brewed', 'srm', 'image_url', 'ph', 'attenuation_level', 'contributed_by']

var vector = [
    [abvgt, abvgtVal], 
    [abvlt, abvltVal], 
    [ibugt, ibugtVal],
    [ibult, ibultVal],
    [ebcgt, ebcgtVal],
    [ebclt, ebcltVal],
    [beername, beernameVal],
    [brewedBefore, brewedBeforeVal],
    [brewedAfter, brewedAfterVal],
    [hops, hopsVal],
    [malt, maltVal],
    [food, foodVal],
    [ids, idsVal]
]

var tableRegion = [];
var firstTime = true;

var submitButton = document.getElementById("submit");
var randomButton = document.getElementById("random");

submitButton.onclick = function(){
    var url = "https://api.punkapi.com/v2/beers";
    var count = 0;
    for(var i = 0; i< vector.length; i++){
        if(vector[i][0].checked){ 
            if(count > 0) url = url + "&"
            if(count == 0) url = url + "?"
            url = url + vector[i][0].name + "=" + vector[i][1].value.replace(/ /g,"_");;
            count++;
        }
    }
    if(count != 0) url = url + "&page="
    else url = url + "?page="
    requestBeer(url, 1)
}

function requestBeer(url, page){
    let xhr = new XMLHttpRequest();
    var file;
    xhr.open('get', url+`${page}`);
    xhr.send();
    xhr.onload = async function() {
        file = JSON.parse(xhr.response)
        if(file.length != 0){
            generateTable(file)
            page++;
            requestBeer(url, page);
        }else firstTime = false
    };
}

randomButton.onclick = function(){
    var url = "https://api.punkapi.com/v2/beers/random"
    let xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onload = async function() {
        var file = JSON.parse(xhr.response)
        console.log(file);
        generateTable(file)
        firstTime = false;
    };
}


function generateTable(file) {
    if(!firstTime){
        for(var i = 0; i < tableRegion.length; i++){
            tableRegion[i].remove()
        }
    }
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");
    var cellText;
  
    for (var i = 0; i < file.length + 1; i++) {
      var row = document.createElement("tr");
  
      for (var j = 0; j < tag.length; j++) {
        var cell = document.createElement("td");
        if(i == 0) cellText = document.createTextNode(tag[j]);
        else{
                switch(j){
                    case 0:
                        cellText = document.createTextNode(file[i-1].id);
                        break;
                    case 1:
                        cellText = document.createTextNode(file[i-1].name);
                        break;
                    case 2:
                        cellText = document.createTextNode(file[i-1].abv);
                        break;
                    case 3:
                        cellText = document.createTextNode(file[i-1].ibu);
                        break;
                    case 4:
                        cellText = document.createTextNode(file[i-1].ebc);
                        break;
                    case 5:
                        cellText = document.createTextNode(file[i-1].first_brewed);
                        break;
                    case 6:
                        cellText = document.createTextNode(file[i-1].srm);
                        break;
                    case 7:
                        cellText = document.createTextNode(file[i-1].image_url);
                        break;
                    case 8:
                        cellText = document.createTextNode(file[i-1].ph);
                        break;
                    case 9:
                        cellText = document.createTextNode(file[i-1].attenuation_level);
                        break;
                    case 10:
                        cellText = document.createTextNode(file[i-1].contributed_by);
                        break;
            }
        } 
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      tableBody.appendChild(row);
      tableRegion.push(table);
    }
  
    table.appendChild(tableBody);
    document.body.appendChild(table);
    table.setAttribute("border", "2");
    firstTime = true;
}

