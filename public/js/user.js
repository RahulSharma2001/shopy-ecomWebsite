var password = document.getElementById("password");
var repeatPassword = document.getElementById("repeatPassword");
var wrongmsgAlert = document.getElementById('worng-password');
var number = document.getElementById("number");

function checkPassword() {
    if (password.value == repeatPassword.value) {
        wrongmsgAlert.style.display = "none";

    } else {
        wrongmsgAlert.style.display = "block";
    }
}
function checkNumber() {

    let val = number.value;
    var arr = val.match(/^\d{10,10}$/);
    if (arr == null) {
        alert("Invalid number")

    }

}


