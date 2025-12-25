function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
        navLinks.style.direction = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "70px";
        navLinks.style.left = "0";
        navLinks.style.width = "45%";
        navLinks.style.background = "#2E7D32";
        navLinks.style.padding = "20px";
    }
}

// Menambahkan class 'active' pada link yang sesuai dengan URL saat ini
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.href === window.location.href) {
        link.style.borderBottom = "2px solid #FFD700";
    }
});

// Ambil elemen modal
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("imgFull");
const captionText = document.getElementById("caption");
const span = document.getElementsByClassName("close")[0];

// Cari semua gambar di dalam gallery-item
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src; // Ambil sumber gambar yang diklik
        captionText.innerHTML = this.alt; // Gunakan teks 'alt' sebagai keterangan
    }
});

// Fungsi untuk menutup modal saat tombol (X) diklik
span.onclick = function() { 
    modal.style.display = "none";
}

// Fungsi untuk menutup modal jika area di luar foto diklik
window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    // Jika yang diklik adalah area modal (latar belakang hitam), bukan fotonya
    if (event.target == modal) {
        closeModal();
    }
}

let currentAlbumImages = [];
let currentSlideIndex = 0;

function openAlbum(index) {
    const albumContainer = document.querySelectorAll('.gallery-item')[index];
    const imagesInAlbum = albumContainer.querySelectorAll('.album-images img');
    
    // Simpan semua link foto ke dalam array
    currentAlbumImages = Array.from(imagesInAlbum).map(img => img.src);
    currentSlideIndex = 0; // Mulai dari foto pertama
    
    updateModalImage();
    document.getElementById("imageModal").style.display = "block";
}

function changeSlide(n) {
    currentSlideIndex += n;
    // Balik ke awal jika sudah di akhir, dan sebaliknya
    if (currentSlideIndex >= currentAlbumImages.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = currentAlbumImages.length - 1;
    
    updateModalImage();
}

function updateModalImage() {
    const modalImg = document.getElementById("imgFull");
    const captionText = document.getElementById("caption");
    
    modalImg.src = currentAlbumImages[currentSlideIndex];
    captionText.innerHTML = `Foto ${currentSlideIndex + 1} dari ${currentAlbumImages.length}`;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}