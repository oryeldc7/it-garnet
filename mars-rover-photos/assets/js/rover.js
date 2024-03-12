function updateDate() {
    // Update photo date based on selected rover
    const rovers = {
        Curiosity: { start: '2012-08-06', end: '2019-09-28' },
        Opportunity: { start: '2004-01-26', end: '2018-06-11' },
        Spirit: { start: '2004-01-05', end: '2004-03-21' }
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
        document.getElementById('error-message').textContent = 'A Rover is Required.';
        return;
    }
    if (!selectedDate) {
        document.getElementById('error-message').textContent = 'A Date is Required.';
        return;
    }

    // Make AJAX call to fetch photos
    const apiKey = 'Ob1kYwJSt0FD48OjdaWz5upsPpTCCSGiCQvf2rj1';
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover.value}/photos?earth_date=${selectedDate}&api_key=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('error-message').textContent = '';
            if(data.photos.length === 0) {
                document.getElementById('error-message').textContent = 'No photos available for the selected date.';
            } else {
                const first25Photos = data.photos.slice(0, 25);
                displayPhotos(first25Photos);
            }
        })
        .catch(error => console.error('Error fetching photos:', error));
}

function displayPhotos(photos) {
    const photoContainer = document.getElementById('photos');
    const numResults = document.getElementById('numResults');
    photoContainer.innerHTML = '';

    photos.forEach((photo, index) => {
        if (index < 25) {
            const img = document.createElement('img');
            img.src = photo.img_src;
            img.alt = `Photo ${index + 1}`;
            img.title = photo.camera ? photo.camera.full_name : "Camera information not available";
            const a = document.createElement('a');
            a.href = '';
            a.id = `a${index}`;
            a.appendChild(img);
            photoContainer.appendChild(a);
        }
    });

    numResults.textContent = `Number of photos found: ${photos.length}`;
}

function clearMessages() {
    document.getElementById('error-message').textContent = '';
}


document.getElementById('getPhotosBtn').addEventListener('click', fetchPhotos);
document.getElementById('clearBtn').addEventListener('click', clearMessages);
