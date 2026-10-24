const genInput = document.getElementById("gen-input");
const genSize =  document.getElementById("gen-size");
const genLevel = document.getElementById("gen-level");

const qrColorInput = document.getElementById("qr-color");
const bgColorInput = document.getElementById("bg-color");

const colors = document.querySelectorAll(".gen-c");

const genBtn = document.querySelector(".gen-btn");
const genMessage = document.querySelector(".gen-message");
const genResult = document.querySelector(".gen-result");
const genQr = document.querySelector(".gen-qr");
const genDownload = document.querySelector(".gen-download");

const confettiBox = document.querySelector(".confetti-box"); 
//for the confetti function, but added here js to put all the definition statements together

colors[0].style.backgroundColor = colors[0].dataset.color;
colors[1].style.backgroundColor = colors[1].dataset.color;
colors[2].style.backgroundColor = colors[2].dataset.color;
colors[3].style.backgroundColor = colors[3].dataset.color;

colors[4].style.backgroundColor = colors[4].dataset.color;
colors[5].style.backgroundColor = colors[5].dataset.color;
colors[6].style.backgroundColor = colors[6].dataset.color;
colors[7].style.backgroundColor = colors[7].dataset.color;



colors[0].addEventListener("click", function () {qrColorInput.value = colors[0].dataset.color;});
 
colors[1].addEventListener("click", function () {qrColorInput.value = colors[1].dataset.color;});
 
colors[2].addEventListener("click", function () {qrColorInput.value = colors[2].dataset.color;});
 
colors[3].addEventListener("click", function () {qrColorInput.value = colors[3].dataset.color;});

colors[4].addEventListener("click", function () {bgColorInput.value = colors[4].dataset.color;});
 
colors[5].addEventListener("click", function () {bgColorInput.value = colors[5].dataset.color;});
 
colors[6].addEventListener("click", function () {bgColorInput.value = colors[6].dataset.color;});
 
colors[7].addEventListener("click", function () {bgColorInput.value = colors[7].dataset.color;});

genBtn.addEventListener("click", function() {

    var tx = genInput.value.trim(); //yay same thing as strip() function in python

    var qrColor = qrColorInput.value;
    var bgColor = bgColorInput.value;

    var  size =  Number(genSize.value);

    var level;

    if (genLevel.value === "low") {
        level = QRCode.CorrectLevel.L;
    } 

    else if (genLevel.value === "medium") {
        level = QRCode.CorrectLevel.M;
    } 

    else {
        level = QRCode.CorrectLevel.H;
    }

    if (tx === "") {

        genMessage.textContent = "type a link/any textt";
        genMessage.classList.remove("good");
        genMessage.classList.add("show");
        genMessage.classList.add("bad");
        genResult.classList.remove("show");
    }

    else if (qrColor === bgColor) {

        genMessage.textContent = "both the colors can't be same";
        genMessage.classList.remove("good");
        genMessage.classList.add("show");
        genMessage.classList.add("bad");
        genResult.classList.remove("show");
    }

    else {

        genQr.innerHTML = "";

        new QRCode(genQr, {

            text: tx,
            width: size,
            height: size,
            colorDark: qrColor,
            colorLight: bgColor,
            correctLevel: level
        });

        genResult.classList.add("show");
        genMessage.textContent = "qr code readyayay: ";
        genMessage.classList.remove("bad");
        genMessage.classList.add("show");
        genMessage.classList.add("good");
        makeConfetti();
    }

});

genInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        var tx = genInput.value.trim();

        var qrColor = qrColorInput.value;
        var bgColor = bgColorInput.value;

        var  size =  Number(genSize.value);

        var level;

        if (genLevel.value === "low") {
            level = QRCode.CorrectLevel.L;
        } 

        else if (genLevel.value === "medium") {
            level = QRCode.CorrectLevel.M;
        } 

        else {
            level = QRCode.CorrectLevel.H;
        }

        if (tx === "") {

            genMessage.textContent = "type a link/any textt";
            genMessage.classList.remove("good");
            genMessage.classList.add("show");
            genMessage.classList.add("bad");
            genResult.classList.remove("show");
        }

        else if (qrColor === bgColor) {

            genMessage.textContent = "both the colors can't be same";
            genMessage.classList.remove("good");
            genMessage.classList.add("show");
            genMessage.classList.add("bad");
            genResult.classList.remove("show");
        }

        else {

            genQr.innerHTML = "";

            new QRCode(genQr, {

                text: tx,
                width: size,
                height: size,
                colorDark: qrColor,
                colorLight: bgColor,
                correctLevel: level
            });

            genResult.classList.add("show");
            genMessage.textContent = "qr code readyayay: ";
            genMessage.classList.remove("bad");
            genMessage.classList.add("show");
            genMessage.classList.add("good");
            makeConfetti();
        }

    }

});


genDownload.addEventListener("click", function() {

    var canvas = genQr.querySelector("canvas");

    if (canvas === null) {

        genMessage.textContent = "please make a QR Code firsttt";
        genMessage.classList.remove("good");
        genMessage.classList.add("show");
        genMessage.classList.add("bad");

    } 

    else {

        var link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "my-qr-code.png";
        link.click();

    }

});


genInput.addEventListener("input", function() {

    genMessage.textContent = "";
    genMessage.classList.remove("show");
    genMessage.classList.remove("good");
    genMessage.classList.remove("bad");
});

//last stuff regarding the QR Code itself

function makeConfetti() {

    var howMany = 50;

    for (var i = 0; i < howMany; i++) {

        var piece = document.createElement("div");
        piece.classList.add("confetti-piece");

        var colorNumber = Math.floor(Math.random() * 5);
        piece.classList.add("confetti-color-" + colorNumber);

        piece.style.left = Math.random() * 100 + "%";

        var pieceSize = 8 + Math.random() * 8;
        piece.style.width = pieceSize + "px";
        piece.style.height = pieceSize + "px";

        piece.style.animationDuration = 2 + Math.random() * 2 + "s";
        piece.style.animationDelay = Math.random() * 0.8 + "s";

        piece.addEventListener("animationend", function() {
            this.remove();
        });

        confettiBox.appendChild(piece);

    }
}