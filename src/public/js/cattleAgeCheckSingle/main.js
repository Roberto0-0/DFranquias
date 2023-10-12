const date = document.querySelector(".date")
const birth_date = document.querySelector(".birth-date")

const main = () => {
    const currentDate = dayjs(new Date()).format('YYYY')
    const cattleBirthDate = dayjs(date.textContent).format("YYYY")
    const cattleAge = Number(currentDate) - Number(cattleBirthDate)
    
    const birthDate = dayjs(birth_date.textContent).format("DD/MM/YY")

    date.innerHTML = cattleAge
    birth_date.innerHTML = birthDate
}

main()