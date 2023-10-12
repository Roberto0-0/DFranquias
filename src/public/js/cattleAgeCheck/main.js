const date = document.querySelectorAll(".date")

const main = () => {
    for (let index = 0; index < date.length; index++) {
        const currentDate = dayjs(new Date()).format('YYYY')
        const cattleBirthDate = dayjs(date[index].textContent).format("YYYY")
        const cattleAge = Number(currentDate) - Number(cattleBirthDate)      
        
        date[index].innerHTML = cattleAge
    }
}

main()