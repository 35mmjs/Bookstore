function getStarValue(score) {
  const starValues = []
  const full = parseInt(score / 2, 10)
  for (let i = 0; i < full; i++) {
    starValues.push(2)
  }
  const half = score % 2 === 0 ? 0 : 1
  if (half) {
    starValues.push(1)
  }
  const zero = 5 - full - half
  for (let i = 0; i < zero; i++) {
    starValues.push(0)
  }
  console.log(starValues)
  return starValues
}

export default getStarValue
