// Get the modal
var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var images = document.querySelectorAll("#image-gallery img");
var modalImg = document.getElementById("modalImg");
var captionText = document.getElementById("caption");

images.forEach(function (img) {
    img.addEventListener("click", function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
        document.body.classList.add("modal-open");
    });
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
    }
};
