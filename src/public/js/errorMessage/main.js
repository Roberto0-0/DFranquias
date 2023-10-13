const error_message = document.querySelectorAll(".error_message")

const errorMessage = () => {
    if(error_message) {
        setTimeout(() => {
            for(let i=0;i < error_message.length;i++) {
                error_message[i].style.display = "none"
            }
        }, 5000);
    }
}

errorMessage()