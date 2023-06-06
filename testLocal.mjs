import testData from "./testData.mjs"
import helloPubSub  from "./index.js"

let buff = Buffer.from(JSON.stringify(testData),'utf8');
let base64data = buff.toString('base64');
const message = {
  data: base64data
}
helloPubSub(message,'');