document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutPage = document.getElementById('checkout-section');
    const reviewList = document.getElementById('review-list');
    const textFileContent = document.getElementById('text-file-content');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            const id = product.getAttribute('data-id');
            const name = product.getAttribute('data-name');
            const price = parseInt(product.getAttribute('data-price'));

            const existingProduct = cart.find(item => item.id === id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    document.getElementById('checkout').addEventListener('click', () => {
        document.getElementById('cart').style.display = 'none';
        checkoutPage.style.display = 'block';
    });

    document.getElementById('payment-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Payment successfully processed!');
        cart.length = 0;
        updateCart();
        document.getElementById('cart').style.display = 'block';
        checkoutPage.style.display = 'none';
    });

    document.getElementById('review-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const reviewText = document.getElementById('review').value;
        const reviewItem = document.createElement('li');
        reviewItem.textContent = reviewText;
        reviewList.appendChild(reviewItem);
        document.getElementById('review').value = '';
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} - ${item.quantity} pcs - ${item.price * item.quantity} TL`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeFromCart(item.id);
            });

            cartItem.appendChild(removeButton);
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: ${totalPrice} TL`;
    }

    function removeFromCart(id) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            } else {
                cart.splice(itemIndex, 1);
            }
            updateCart();
        }
    }

    // Fetch and display the text file content
    fetch('messiLife.txt')
        .then(response => response.text())
        .then(data => {
            textFileContent.textContent = data;
        })
        .catch(error => console.error('Error fetching text file:', error));
});
