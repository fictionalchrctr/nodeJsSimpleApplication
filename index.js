const express = require('express')
const chalk = require('chalk')
const path = require('path')
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require('./notes.controller')

const port = 3000

const app = express()

app.set('view engine', 'ejs') // позволяет переопределять базовые настройки
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public'))) // чтоб был доступ к папке public
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(), // асинхронный потому что возвращает промис
    created: false,
  }) //передаём на фронтенд
})

app.post('/', async (req, res) => {
  await addNote(req.body.title)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true,
  })
})

app.delete('/:id', async (req, res) => {
  // удаляем задачу
  await removeNote(req.params.id)
  // заново рендерим страницу
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  })
})

app.put('/:id', async (req, res) => {
  await updateNote({ id: req.params.id, title: req.body.title })
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  })
})

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}`))
})

// const yargs = require('yargs')
// const pkg = require('./package.json')
// const { addNote, printNotes, removeNote } = require('./notes.controller')

// yargs.version(pkg.version)

// yargs.command({
//   command: 'add',
//   describe: 'Add new note to list',
//   builder: {
//     title: {
//       type: 'string',
//       describe: 'node title',
//       demandOption: true,
//     },
//   },
//   handler({ title }) {
//     addNote(title)
//   },
// })

// yargs.command({
//   command: 'list',
//   describe: 'Print all notes',
//   async handler() {
//     printNotes()
//   },
// })

// yargs.command({
//   command: 'remove',
//   describe: 'Remove note by id',
//   builder: {
//     id: {
//       type: 'string',
//       describe: 'title id',
//       demandOption: true,
//     },
//   },
//   async handler({ id }) {
//     removeNote(id)
//   },
// })

// yargs.parse()
