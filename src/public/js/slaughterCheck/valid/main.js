const message = document.querySelectorAll(".invalid")

const main = () => {
    for (let index = 0; index < message.length; index++) {
        console.log(message[index].textContent)        
    }
}

main()