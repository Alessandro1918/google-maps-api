//Read data from a local .csv file (with header), returns a JSON object
export async function readCsv() {

  //read file
  const response = await fetch("./places.csv")
  const text = await response.text()
  //console.log(text)
  
  //get lines
  const rows = text.split("\n")

  //get keys
  const keys = rows[0].split(",")

  //assemble object
  const items = []
  rows.map((row, i) => {
    if (i > 0) {  //ignore header
      let item = {}
      keys.map((key, j) => {
        item[key] = row.split(",")[j]
      })
      items.push(item)
    }
  })
  // console.log(items)
  return items
}