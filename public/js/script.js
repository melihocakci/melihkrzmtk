const form = document.querySelector('form');
const quoteInput = document.querySelector('#input-1');
const quoteeInput = document.querySelector('#input-2');
const quoteMessage = document.querySelector('#quote');
const quoteeMessage = document.querySelector('#quotee');
const message = document.querySelector('#message');

fetch('/quotes').then((response) => {
    response.json().then((data) => {
        quoteMessage.textContent = data.content;
        quoteeMessage.textContent = data.quotee;
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (quoteInput.value.length == 0 || quoteeInput.value.length == 0) {
        message.textContent = 'Please fill all fields';
        return;
    }

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: quoteInput.value,
            quotee: quoteeInput.value,
        }),
    };

    fetch('/quotes', options).then((response) => {
        if (response.status == 201) {
            message.textContent = 'Quote added successfully!';
        } else {
            message.textContent = 'There was an error. Please try again later.';
        }
    });
});
