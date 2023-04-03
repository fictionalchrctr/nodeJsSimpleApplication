const fs = require('fs/promises') // модуль позволяет записывать данные в файл
const path = require('path') // модуль позволяет корректно работать с путями в nodeJS
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')
console.log(notesPath) //F:\Work\frontend-course\Backend Module\1\db.json

async function addNote(title) {
  //   const notes = require('./db.json')

  //   const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
  //   const notes = Buffer.from(buffer).toString('utf-8')

  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString(),
  }
  notes.push(note)
  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.bgGreen('Note was added'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
  const notes = await getNotes()
  console.log(chalk.bgBlue('Here is the list of notes'))
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title))
  })
}

async function removeNote(id) {
  const notes = await getNotes()
  const newNotes = notes.filter((note) => note.id !== id)
  await fs.writeFile(notesPath, JSON.stringify(newNotes))
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
}
