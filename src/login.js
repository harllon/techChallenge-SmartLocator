var submitButton = document.getElementById("submit")
var email = document.getElementById("email")
var password = document.getElementById("password")

submitButton.onclick = function(){
    var obj = new Object();
    obj.email = email.value;
    obj.password = password.value;
    var jsonString= JSON.stringify(obj);
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3000/auth/login');
    xhr.send(jsonString);

    xhr.onload = async function() {
        file = JSON.parse(xhr.response)
        if(file.auth) location.href = "http://localhost:3000/user/beer";
        else alert(file.message);
    };
}