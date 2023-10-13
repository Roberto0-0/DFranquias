const notification = document.querySelector('.notification')

const notificationMessage = () => {
    if(notification) {
        setTimeout(() => {
            notification.style.display = "none"
        }, 3000)
    }
}

notificationMessage()