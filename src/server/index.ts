import express from 'express';
import bodyParser from 'body-parser';
import { dummyData } from './dummyData';

const app = express()
const port = 9000

app.use(bodyParser.json())

//listing your dummy data
app.get('/dummy', (_req, res) => {
  return res.send(dummyData)
})
// delete listings
app.post('/delete-dummy', (req, res) => {
  const id: string = req.body.id

  for (let i = 0; i < dummyData.length; i++) {
    if (dummyData[i].id === id) {
      return res.send(dummyData.splice(i, 1))
    }
  }

  return res.send('failed to delete dummy');
})

app.listen(port)

console.log(`[app]: https://localhost:${port}`)
