export const diff = (firstJsonObject: any, secondJsonObject: any) => {
  let firstJsonObjectString, secondJsonObjectString
  firstJsonObjectString = JSON.stringify(firstJsonObject)
  secondJsonObjectString = JSON.stringify(secondJsonObject)

  return firstJsonObjectString !== secondJsonObjectString
}
