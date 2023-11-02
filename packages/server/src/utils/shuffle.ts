export const shuffleArray = <T>(array: Array<T>): Array<T> => {
  const shuffledArray = [...array]
  // Fisher-Yates シャッフルアルゴリズムを使用してシャッフルする
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}
