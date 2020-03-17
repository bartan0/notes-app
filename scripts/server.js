const express = require('express')
const { readFile } = require('fs')
const { join, resolve } = require('path')

const { static } = express

const PORT = 8080
const ROOT_PATH = resolve(__dirname, '..', 'build')


const app = express()
	.use('/static', express.static(join(ROOT_PATH, 'static')))
	.use((req, res) => res.sendFile(join(ROOT_PATH, 'index.html')))
	.listen(PORT, () => {
		console.info(`File server is listening @${PORT}`)
	})
