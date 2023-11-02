export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max)
}

export const getRandomNumbers = (max: number, amount: number) => {
  const pickedNumbers = new Set<number>()
  while (pickedNumbers.size < amount) {
    pickedNumbers.add(getRandomNumber(max))
  }
  return Array.from(pickedNumbers)
}
