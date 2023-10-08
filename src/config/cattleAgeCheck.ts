import dayjs from "dayjs"

export const CattleAgeCheck = (date: Date) => {
    const currentDate = dayjs(new Date()).format('YYYY')
    const cattleBirthDate = dayjs(date).format("YYYY")
    const cattleAge = Number(currentDate) - Number(cattleBirthDate)

    return cattleAge
}