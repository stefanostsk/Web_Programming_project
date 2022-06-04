window.addEventListener("load", () => {
    const liginm = document.getElementById("signinmodal");
    const loginb = document.getElementById("signinbtn");
    const closeb = document.getElementsByClassName("close-sign")[0];

    if (loginb)
    loginb.onclick = function () {
        liginm.style.display = "block";
    }

    if (closeb)
    closeb.onclick = function () {
        liginm.style.display = "none";
    }
})