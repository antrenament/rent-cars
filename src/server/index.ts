// @ts-ignore
import express from 'express';

const app = express()
const port = 9000

const one: number = 1
console.log(one)

app.get('/', (_req, res) => res.send('Hello World!'))

app.listen(port)

console.log(`[app]: https://localhost:${port}`)
