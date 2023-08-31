const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//  Unsplash API
const count = 30;
const apiKey = '19Y8vTttJRnpD6qouyFJCwPlZNTlxI97wK4k8MHBTIs';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        console.log('ready =', ready)
    }
}

//  helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}
// create elements for links and photos
async function displayPhotos() {
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //  create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener, check when each id finished
        img.addEventListener('load', imageLoaded);

        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error
        console.error('Error fetching photos:', error);
    } finally {
        isLoading = false;
        loader.style.display = 'none';
    }
}

// check to see if scrolling near bottom of the page, load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 &&
        !isLoading
    ) {
        getPhotos();
    }
})

// on load
getPhotos();