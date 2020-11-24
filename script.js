const apiKey = 'av4Xg5O3DFK4tk1dpy-n9WrSRdOPttGzgigDmN1YGc4';
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imgContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImagesLoaded = 0;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImagesLoaded) {
        ready = true;
        loader.hidden = true;

    }
}

function displayPhotos(photosArray) {
    imagesLoaded = 0;
    totalImagesLoaded = photosArray.length;
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.addEventListener('load', imageLoaded)

        item.appendChild(img);

        imgContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        
        if (result.length) {
            displayPhotos(result); 
        }

    } catch(error) {
        // Handle errors
    }
}


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();