
const inputText = document.getElementById('input-text');

const btnSend = document.getElementById('btn-send');
const chat = document.getElementById('content-chat');

let messages_list = []

inputText.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        btnSend.click();
    }
});

btnSend.addEventListener('click', () => {
    const message = inputText.value;
    getChat(message);
    inputText.value = '';
});



function getChat(message) {
    const userMessage = {
        role: 'user',
        message: `<div id="message-user">${message} </div>`
    }
    messages_list.push(userMessage)
    showMessage()
    fetch('http://localhost:3000/api/v1/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            message: message
        })
    })
        .then(response => response.json())
        .then(data => {


            const mess = {
                role: 'ia',
                message: `<div id="message-ia">${data.message} </div>`
            }

            messages_list.push(mess)
            showMessage()
        })
}


function showMessage(){
    chat.innerHTML = ''
    console.log(messages_list)
    messages_list.forEach(element => {
     chat.innerHTML += element.message
    });
    
}
