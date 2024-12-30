// farmer.js

// Function to load listings from Local Storage and display them
function loadListings() {
    const listingsContainer = document.getElementById('listings');
    listingsContainer.innerHTML = ''; // Clear existing listings

    // Retrieve listings from Local Storage
    let listings = JSON.parse(localStorage.getItem('farmerListings')) || [];

    // Iterate and display each listing
    listings.forEach((listing, index) => {
        const listingDiv = document.createElement('div');
        listingDiv.classList.add('listing-item');

        // If image is available
        if (listing.image) {
            const img = document.createElement('img');
            img.src = listing.image;
            img.alt = listing.productName;
            listingDiv.appendChild(img);
        }

        const title = document.createElement('h3');
        title.textContent = listing.productName;
        listingDiv.appendChild(title);

        const location = document.createElement('p');
        location.textContent = `Location: ${listing.location}`;
        listingDiv.appendChild(location);

        // Add delete button for each listing
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Listing';
        deleteBtn.style.marginTop = '10px';
        deleteBtn.style.padding = '8px 12px';
        deleteBtn.style.backgroundColor = '#f44336';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '6px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.onclick = () => deleteListing(index);
        listingDiv.appendChild(deleteBtn);

        listingsContainer.appendChild(listingDiv);
    });
}

// Function to delete a listing
function deleteListing(index) {
    let listings = JSON.parse(localStorage.getItem('farmerListings')) || [];
    listings.splice(index, 1); // Remove the listing at the specified index
    localStorage.setItem('farmerListings', JSON.stringify(listings));
    loadListings(); // Refresh the listings display
}

// Function to show the add listing form
function showAddListingForm() {
    const formContainer = document.getElementById('addListingForm');
    formContainer.style.display = 'flex';
}

// Function to hide the add listing form
function hideAddListingForm() {
    const formContainer = document.getElementById('addListingForm');
    formContainer.style.display = 'none';
    // Reset form fields
    document.getElementById('listingForm').reset();
}

// Function to handle form submission
function addListing(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const productName = document.getElementById('productName').value.trim();
    const location = document.getElementById('productLocation').value.trim();
    const productImage = document.getElementById('productImage').files[0];

    if (!productName || !location || !productImage) {
        alert('Please fill in all fields and select an image.');
        return;
    }

    // Read the image file as a data URL
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageURL = e.target.result;

        // Create a new listing object
        const newListing = {
            productName: productName,
            location: location,
            image: imageURL
        };

        // Retrieve existing listings from Local Storage
        let listings = JSON.parse(localStorage.getItem('farmerListings')) || [];

        // Add the new listing
        listings.push(newListing);

        // Save back to Local Storage
        localStorage.setItem('farmerListings', JSON.stringify(listings));

        // Refresh the listings display
        loadListings();

        // Hide the form
        hideAddListingForm();
    }

    reader.readAsDataURL(productImage);
}

// Attach event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadListings();

    // Show add listing form when button is clicked
    const addListingBtn = document.querySelector('.add-listing-btn');
    addListingBtn.addEventListener('click', showAddListingForm);

    // Handle form submission
    const listingForm = document.getElementById('listingForm');
    listingForm.addEventListener('submit', addListing);

    // Handle cancel button
    const cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.addEventListener('click', hideAddListingForm);
});
