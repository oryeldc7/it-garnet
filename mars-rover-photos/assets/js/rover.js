function updateDate() {
    // Update photo date based on selected rover
    const rovers = {
        Curiosity: { start: '2012-08-06', end: '2019-09-28' },
        Opportunity: { start: '2004-01-25', end: '2019-02-13' },
        Spirit: { start: '2004-01-04', end: '2010-03-22' }
    };
    const selectedRover = document.querySelector('input[name="rover"]:checked');
    if (selectedRover) {
        const roverName = selectedRover.value;
        const startDate = rovers[roverName].start;
        document.getElementById('date').value = startDate;
    }
}

function fetchPhotos() {
    const selectedRover = document.querySelector('input[name="rover"]:checked');
    const selectedDate = document.getElementById('date').value;

    if (!selectedRover) {
        document.getElementById('error-message').textContent = 'Please select a rover.';
        return;
    }
    if (!selectedDate) {
        document.getElementById('error-message').textContent = 'Please select a date.';
        return;
    }

    // Make AJAX call to fetch photos
    const apiKey = 'kcnV2ULZ9cf9dgPJcH2KYIhseDYg3jSVLc9I6eg2';
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover.value}/photos?earth_date=${selectedDate}&api_key=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('error-message').textContent = '';
            displayPhotos(data.photos);
        })
        .catch(error => console.error('Error fetching photos:', error));
}

function displayPhotos(photos) {
    const photoContainer = document.getElementById('photos');
    photoContainer.innerHTML = '';

    photos.slice(0, 25).forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo.img_src;
        img.alt = `Photo ${index + 1}`;
        img.title = photo.camera.full_name;
        photoContainer.appendChild(img);
    });

    const photoCount = document.createElement('p');
    photoCount.textContent = `Number of photos found: ${photos.length}`;
    photoContainer.appendChild(photoCount);
}

function clearMessages() {
    document.getElementById('error-message').textContent = '';
}

document.getElementById('getPhotosBtn').addEventListener('click', fetchPhotos);
document.getElementById('clearBtn').addEventListener('click', clearMessages);
