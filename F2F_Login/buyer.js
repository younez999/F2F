// buyer.js

// Function to place an order
function placeOrder(productName) {
    // Create an order object
    const order = {
        productName: productName,
        orderDate: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
        status: 'Processing'
    };

    // Retrieve existing orders from Local Storage
    let orders = JSON.parse(localStorage.getItem('buyerOrders')) || [];

    // Add the new order
    orders.push(order);

    // Save back to Local Storage
    localStorage.setItem('buyerOrders', JSON.stringify(orders));

    // Display confirmation modal
    showConfirmation(order);
}


// Function to show confirmation modal
function showConfirmation(order) {
    // Get modal elements
    const modal = document.getElementById("orderModal");
    const orderMessage = document.getElementById("orderMessage");
    const modalClose = document.getElementById("modalClose");

    // Set the confirmation message
    orderMessage.textContent = `Your order for "${order.productName}" has been placed successfully!`;

    // Display the modal
    modal.style.display = "block";

    // Close the modal when 'x' is clicked
    modalClose.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when user clicks outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Attach event listeners to all "Place Order" buttons
document.addEventListener('DOMContentLoaded', () => {
    const placeOrderButtons = document.querySelectorAll('.place-order-btn');
    placeOrderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.parentElement.querySelector('h3').textContent;
            placeOrder(productName);
        });
    });
});
