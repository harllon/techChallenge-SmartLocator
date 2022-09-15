var submitButton = document.getElementById("submit")
var email = document.getElementById("email")
var password = document.getElementById("password")

submitButton.onclick = function(){
    var obj = new Object();
    obj.email = email.value;
    console.log(email.value)
    obj.password = password.value;
    console.log(password.value)
    var jsonString= JSON.stringify(obj);
    let xhr = new XMLHttpRequest();
    //xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.open('post', 'http://localhost:3000/login', true);
    console.log(jsonString)
    xhr.send(jsonString);

    xhr.onload = async function() {
        //files = JSON.parse(xhr.response)
        console.log(xhr.response);
        location.href = "http://localhost:3000/beer";
    };
}