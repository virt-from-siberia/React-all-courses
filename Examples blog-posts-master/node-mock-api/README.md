# `Node.js` Mock API :metal:

Let's build simple, but complete API testing server.

Основной функционал нашего приложения будет следующим:

- админка с возможностью добавления данных (далее - проекты) путем их набора (ввода) или копирования/вставки, либо путем загрузки файла;
- сохранение проектов на сервере;
- безопасная запись, чтение и удаление файлов на любом уровне вложенности;
- получение названий существующих проектов и их отображение в админке;
- возможность редактирования и удаления проектов;
- унифицированная обработка `GET`, `POST`, `PUT` и `DELETE` запросов к любому существующему проекту, включая `GET-запросы`, содержащие параметры и строки запроса;
- обработка специальных параметров строки запроса `sort`, `order`, `limit` и `offset`;
- и многое другое.

Наша админка будет выглядеть так:

<img src="https://habrastorage.org/webt/z_/bm/ge/z_bmgez08qrefh2udyodneqniqi.png" />

Для быстрой стилизации приложения будет использоваться [`Bootstrap`](https://getbootstrap.com/).

При разработке приложения мы будет придерживаться 2 важных условий:

- формат данных - `JSON`;
- основная форма данных - массив.

_Обратите внимание_: статья рассчитана, преимущественно, на начинающих разработчиков, хотя, смею надеяться, что и опытные найдут в ней что-нибудь интересное для себя.

## Подготовка проекта

Создаем директорию для проекта, переходим в нее, инициализируем проект и устанавливаем зависимости:

```bash
mkdir mock-api
cd !$

yarn init -y
# or
npm init -y

yarn add express multer nodemon open-cli very-simple-fetch
# or
npm i ...
```

Зависимости:

- [`express`](https://expressjs.com/ru/) - `Node.js-фреймворк` для разработки сервера
- [`multer`](https://github.com/expressjs/multer/blob/master/doc/README-ru.md) - обертка над [`busboy`](https://www.npmjs.com/package/busboy), утилита для обработки данных в формате `multipart/form-data`, часто используемая для сохранения файлов
- [`nodemon`](https://www.npmjs.com/package/nodemon) - утилита для запуска сервера для разработки
- [`open-cli`](https://www.npmjs.com/package/open-cli) - утилита для автоматического открытия вкладки браузера по указанному адресу
- [`very-simple-fetch`](https://www.npmjs.com/package/very-simple-fetch) - обертка над [`Fetch API`](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API), упрощающая работу с названным интерфейсом

Открываем `package.json`, определяем в нем основной файл сервера (`index.js`) как модуль и команду для запуска сервера для разработки:

```json
{
 "type": "module",
 "scripts": {
   "dev": "open-cli http://localhost:5000 && nodemon index.js"
 }
}
```

Команда `dev` указывает открыть вкладку браузера по адресу `http://localhost:5000` (адрес, на котором будет запущен сервер) и выполнить код в файле `index.js` (запустить сервер для разработки).

Структура нашего проекта будет следующей:

- `projects` - директория для проектов
- `public` - директория со статическими файлами для админки
- `routes` - директория для роутов
- `index.js` - основной файл сервера
- `utils.js` - вспомогательные функции

Пожалуй, проект готов к разработке. Не будем откладывать на завтра то, что можно <del>отложить на послезавтра</del> сделать сейчас.

## Сервер, маршрутизатор для проектов и утилиты

В файле `index.js` мы делаем следующее:

- импортируем `express`, полный путь к текущей (рабочей) директории и роуты для проектов;
- создаем экземпляр `Express-приложения`;
- добавляем посредников (промежуточных обработчиков): для обслуживания статических файлов, для разбора (парсинга) данных в `JSON`, для декодирования `URL`;
- добавляем роут для получения файлов из директории `node_modules`;
- добавляем роуты для проектов;
- добавляем обработчик ошибок;
- определяем порт и запускаем сервер.

```javascript
import express from 'express'
import { __dirname } from './utils.js'
import projectRoutes from './routes/project.routes.js'

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/node_modules/*', (req, res) => {
 res.sendFile(`${__dirname}/${req.url}`)
})

app.use('/project', projectRoutes)

// обратите внимание: обработчик ошибок должен быть последним в цепочке посредников
app.use((err, req, res, next) => {
 console.error(err.message || err)
 res.sendStatus(err.status || 500)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
 console.log(`🚀 -> ${PORT}`)
})
```

Подумаем о том, какие роуты нам нужны для работы с проектами. Как насчет следующих запросов:

- `GET` - получение названий всех существующих проектов
- `GET` - получение проекта по названию
- `POST` - создание проекта
- `POST` - загрузка проекта
- `DELETE` - удаление проекта

Мы также могли бы определить отдельный роут для обновления проекта через `PUT-запрос`, но в этом нет особого смысла - проще перезаписать существующий проект новым.

В файле `routes/project.routes.js` мы делаем следующее:

- импортируем роутер из `express` и вспомогательные функции из `utils.js`;
- экспортируем новый экземпляр роутера;
- определяем обработчики для каждого из указанных выше запроса.

```javascript
import { Router } from 'express'
// мы подробно рассмотрим каждую из этих утилит далее
import {
 getFileNames,
 createFile,
 readFile,
 removeFile,
 uploadFile
} from '../utils.js'

export default Router()
```

Далее цепочкой (один за другим) идут обработчики.

Получение проекта по названию:

```javascript
 .get('/', async (req, res, next) => {
   // извлекаем название проекта из строки запроса - `?project_name=todos`
   const { project_name } = req.query

   // если `URL` не содержит строки запроса, значит,
   // это запрос на получение названий всех проектов
   // передаем управление следующему обработчику
   if (!project_name) return next()

   try {
     // получаем проект
     const project = await readFile(project_name)

     // и возвращаем его
     res.status(200).json(project)
   } catch (e) {
     // передаем ошибку обработчику ошибок
     next(e)
   }
 })
```

Получение названий всех проектов:

```javascript
 .get('/', async (req, res, next) => {
   try {
     // получаем названия проектов
     const projects = (await getFileNames()) || []

     // и возвращаем их
     res.status(200).json(projects)
   } catch (e) {
     next(e)
   }
 })
```

Создание проекта:

```javascript
 .post('/create', async (req, res, next) => {
   // извлекаем название проекта и данные для него из тела запроса
   const { project_name, project_data } = req.body

   try {
     // создаем проект
     await createFile(project_data, project_name)

     // сообщаем об успешном создании проекта
     res.status(201).json({ message: `Project "${project_name}" created` })
   } catch (e) {
     next(e)
   }
 })
```

Загрузка проекта:

```javascript
 .post(
   '/upload',
   // `multer`; обратите внимание на передаваемый ему аргумент -
   // название поля, содержащего данные, в теле запроса должно соответствовать этому значению
   uploadFile.single('project_data_upload'),
   (req, res, next) => {
     // сообщаем об успешной загрузке проекта
     res.status(201).json({
       message: `Project "${req.body.project_name}" uploaded`
     })
   }
 )
```

Удаление проекта:

```javascript
 .delete('/', async (req, res, next) => {
   // извлекаем название проекта из строки запроса
   const { project_name } = req.query

   try {
     // удаляем проект
     await removeFile(project_name)

     // сообщаем об успехе
     res.status(201).json({ message: `Project "${project_name}" removed` })
   } catch (e) {
     next(e)
   }
 })
```

Ошибка, возникшая в процессе выполнения любой операции, будет передана в обработчик, определенный в `index.js` - централизованная обработка ошибок. Нечто похожее мы реализуем и на клиенте.

Вспомогательные функции, определенные в файле `utils.js` - пожалуй, самая интересная и полезная часть туториала. Я постарался сделать так, чтобы эти функции были максимально универсальными с той целью, чтобы вы могли использовать их в своих проектах без существенных изменений.

Начнем с импорта модулей, определения полного (абсолютного) пути к текущей директории и директории для проектов (корневой директории), а также с создания 2 небольших утилит:

- для определения того, что файла или директории не существует по сообщению об ошибке;
- для уменьшения пути на 1 "единицу".

```javascript
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
import multer from 'multer'

// полный путь к текущей директории
export const __dirname = dirname(fileURLToPath(import.meta.url))
// путь к директории с проектами
const ROOT_PATH = `${__dirname}/projects`

// утилита для определения несуществующего файла
const notExist = (e) => e.code === 'ENOENT'
// утилита для уменьшения пути на единицу
// например, путь `path/to/file` после вызова этой функции
// будет иметь значение `path/to`
const truncPath = (p) => p.split('/').slice(0, -1).join('/')
```

Утилита для создания файла:

```javascript
// функция принимает 3 параметра: данные, путь и расширение (по умолчанию `json`)
export async function createFile(fileData, filePath, fileExt = 'json') {
 // формируем полный путь к файлу
 const fileName = `${ROOT_PATH}/${filePath}.${fileExt}`

 try {
   // пробуем создать файл
   // при отсутствии директории для файла, например, когда полным путем
   // файла является `.../data/todos.json`, выбрасывается исключение
   if (fileExt === 'json') {
     await fs.writeFile(fileName, JSON.stringify(fileData, null, 2))
   } else {
     await fs.writeFile(fileName, fileData)
   }
 } catch (err) {
   // если ошибка связана с отсутствующей директорией
   if (notExist(err)) {
     // создаем ее рекурсивно (несколько уровней вложенности)
     await fs.mkdir(truncPath(`${ROOT_PATH}/${filePath}`), {
       recursive: true
     })
     // и снова вызываем `createFile` с теми же параметрами - рекурсия
     return createFile(fileData, filePath, fileExt)
   }
   // если ошибка не связана с отсутствующей директорией
   // это позволяет подняться из утилиты в роут и передать ошибку в централизованный обработчик
   throw err
 }
}
```

Утилита для чтения файла:

```javascript
// функция принимает путь и расширение
export async function readFile(filePath, fileExt = 'json') {
 // полный путь
 const fileName = `${ROOT_PATH}/${filePath}.${fileExt}`

 // переменная для обработчика файла
 let fileHandler = null
 try {
   // `fs.open()` возвращает обработчик файла при наличии файла
   // или выбрасывает исключение при отсутствии файла
   // это является рекомендуемым способом определения наличия файла
   fileHandler = await fs.open(fileName)

   // читаем содержимое файла
   const fileContent = await fileHandler.readFile('utf-8')

   // и возвращаем его
   return fileExt === 'json' ? JSON.parse(fileContent) : fileContent
 } catch (err) {
   // если файл отсутствует
   // вы поймете почему мы используем именно такую сигнатуру ошибки,
   // когда мы перейдем к роутам для `API`
   if (notExist(err)) {
     throw { status: 404, message: 'Not found' }
   }
   // если возникла другая ошибка
   throw err
 } finally {
   // закрываем обработчик файла
   fileHandler?.close()
 }
}
```

Утилита для удаления файла:

```javascript
// функция принимает путь и расширение
export async function removeFile(filePath, fileExt = 'json') {
 // полный путь
 const fileName = `${ROOT_PATH}/${filePath}.${fileExt}`

 try {
   // пробуем удалить файл
   await fs.unlink(fileName)

   // нам также необходимо удалить директорию, если таковая имеется
   // мы передаем утилите путь, сокращенный на единицу, т.е. без учета пути файла
   await removeDir(truncPath(`${ROOT_PATH}/${filePath}`))
 } catch (err) {
   // если файл отсутствует
   if (notExist(err)) {
     throw { status: 404, message: 'Not found' }
   }
   // если возникла другая ошибка
   throw err
 }
}
```

Утилита для удаления директории:

```javascript
// утилита принимает путь к удаляемой директории и путь к корневой директории,
// который по умолчанию имеет значение директории с проектами
async function removeDir(dirPath, rootPath = ROOT_PATH) {
 // останавливаемся, если достигли корневой директории
 if (dirPath === rootPath) return

 // определяем является ли директория пустой
 // длина ее содержимого должна равняться 0
 const isEmpty = (await fs.readdir(dirPath)).length < 1

 // если директория является пустой
 if (isEmpty) {
   // удаляем ее
   await fs.rmdir(dirPath)

   // и... рекурсия
   // на каждой итерации мы сокращаем путь на единицу,
   // пока не поднимемся до корневой директории
   removeDir(truncPath(dirPath, rootPath))
 }
}
```

Еще одна рекурсивная функции (обещаю, что последняя) для получения названий всех существующих проектов:

```javascript
// функция принимает путь к корневой директории
export async function getFileNames(path = ROOT_PATH) {
 // переменная для названий проектов
 let fileNames = []

 try {
   // читаем содержимое директории
   const files = await fs.readdir(path)

   // если в директории находится только один файл
   // возвращаем массив с названиями проектов
   if (files.length < 1) return fileNames

   // иначе перебираем файлы
   for (let file of files) {
     // формируем путь каждого файла
     file = `${path}/${file}`

     // определяем, является ли файл директорией
     const isDir = (await fs.stat(file)).isDirectory()

     // если является
     if (isDir) {
       // прибегаем к рекурсии
       fileNames = fileNames.concat(await getFileNames(file))
     } else {
       // если не является, добавляем его путь в массив
       fileNames.push(file)
     }
   }

   return fileNames
 } catch (err) {
   if (notExist(err)) {
     throw { status: 404, message: 'Not found' }
   }
   throw err
 }
}
```

Последняя функция, которая нужна нам для работы с проектами - это функция для загрузки файлов. Данная функция не является такой универсальной, как предыдущие. Она предназначена для обработки данных в формате `multipart/form-data`, содержащими вполне определенные поля:

```javascript
// создаем посредника для загрузки файлов
export const uploadFile = multer({
 storage: multer.diskStorage({
   // пункт назначения - директория для файлов
   destination: (req, file, cb) => {
     // важно: последняя часть названия проекта должна совпадать с названием файла
     // например, если проект называется `data/todos`, то файл должен называться `todos.json`
     // мы также удаляем расширение файла из пути к директории
     const dirPath = `${ROOT_PATH}/${req.body.project_name.replace(
       file.originalname.replace('.json', ''),
       ''
     )}`
     // здесь мы исходим из предположения, что директория для файла отсутствует
     // с существующей директорией ничего не случится
     fs.mkdir(dirPath, { recursive: true }).then(() => {
       cb(null, dirPath)
     })
   },
   // название файла
   filename: (_, file, cb) => {
     cb(null, file.originalname)
   }
 })
})
```

Все, что нам осталось сделать для работы с проектами - это разработать клиентскую часть админки.

## Клиент

Разметка (`public/index.html`):

```html
<head>
 <!-- заголовок документа -->
 <title>Mock API</title>
 <!-- иконка -->
 <link rel="icon" href="icon.png" />
 <!-- Гугл-шрифт -->
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
 <link
   href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
   rel="stylesheet"
 />
 <!-- bootstrap -->
 <link
   rel="stylesheet"
   href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
   integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
   crossorigin="anonymous"
 />
 <!-- bootstrap-icons -->
 <link
   rel="stylesheet"
   href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
 />
 <!-- стили -->
 <link rel="stylesheet" href="style.css" />
</head>
<body>
 <div class="container">
   <header>
     <h1 class="text-center my-3">Mock API</h1>
   </header>

   <main>
     <div>
       <h3 class="my-3">My projects</h3>
       <!-- список существующих проектов -->
       <ul class="list-group" id="project_list"></ul>
     </div>

     <div>
       <h3 class="my-3">New project</h3>
       <!-- форма для создания нового проекта -->
       <form id="project_create">
         <div class="mb-2">
           <label for="project_name" class="form-label">Project name</label>
           <!-- поле для ввода названия проекта -->
           <input
             type="text"
             class="form-control mt-2"
             name="project_name"
             id="project_name"
             aria-describedby="project_name"
             placeholder="Project name"
           />
         </div>

         <details class="mt-4">
           <summary>Enter or paste project data</summary>
           <!-- поле для ввода/вставки данных для проекта -->
           <textarea
             class="form-control mt-2"
             name="project_data"
             id="project_data_paste"
             rows="10"
           ></textarea>
         </details>
         <div class="mt-4">
           <label for="project_data_upload" class="form-label"
             >Upload project data</label
           >
           <!-- поле для загрузки файла с данными для проекта -->
           <!-- принимает только JSON-файлы в единственном числе -->
           <input
             class="form-control mt-2"
             type="file"
             accept=".json"
             name="project_data_upload"
             id="project_data_upload"
             aria-describedby="project_data_upload"
           />
         </div>
         <!-- кнопка для создания проекта -->
         <button class="btn btn-success my-4">Create project</button>
       </form>
     </div>
   </main>
 </div>

 <!-- скрипт-модуль -->
 <script src="script.js" type="module"></script>
</body>
```

_Обратите внимание_ на `id` элементов. Поскольку элементы с атрибутом `id` становятся свойствами глобального объекта `window`, доступ к таким элементам можно получать напрямую, т.е. без предварительного получения ссылки на элемент с помощью таких методов, как `querySelector()`.

На стилях я останавливаться не буду: все, что мы там делаем - это определяем шрифт для всех элементов и ограничиваем максимальную ширину `.container`.

Переходим к `public/script.js`.

Импортируем `very-simple-fetch`, фиктивные данные, утилиту для определения того, является ли переданный аргумент `JSON`, и определяем базовый `URL` сервера:

```javascript
import simpleFetch from '/node_modules/very-simple-fetch/index.js'
import todos from './data/todos.js'
import { isJson } from './utils.js'

simpleFetch.baseUrl = 'http://localhost:5000/project'
```

Фиктивные данные (`public/data/todos.js`):

```javascript
export default [
 {
   id: '1',
   text: 'Eat',
   done: true,
   edit: false
 },
 {
   id: '2',
   text: 'Code',
   done: true,
   edit: false
 },
 {
   id: '3',
   text: 'Sleep',
   done: false,
   edit: false
 },
 {
   id: '4',
   text: 'Repeat',
   done: false,
   edit: false
 }
]
```

Утилита (`public/utils.js`):

```javascript
export const isJson = (item) => {
 try {
   item = JSON.parse(item)
 } catch (e) {
   return false
 }

 if (typeof item === 'object' && item !== null) {
   return true
 }

 return false
}
```

Определяем функцию для получения названий проектов:

```javascript
async function fetchProjects() {
 // получаем данные и ошибку
 // `customCache: false` отключает кеширование результатов
 const { data, error } = await simpleFetch.get({ customCache: false })

 // если при выполнении запроса возникла ошибка
 if (error) {
   return console.error(error)
 }

 // очищаем список проектов
 project_list.innerHTML = ''

 // если проектов нет
 if (data.length < 1) {
   // /*html*/ - расширение `es6-string-html` для VSCode
   // включает подсветку и дополнение в шаблонных литералах
   return (project_list.innerHTML = /*html*/ `
     <li
       class="list-group-item d-flex align-items-center"
     >
       You have no projects. Why don't create one?
     </li>
   `)
 }

 // форматируем список, оставляя только названия проектов
 const projects = data.map((p) =>
   p.replace(/.+projects\//, '').replace('.json', '')
 )

 // создаем элемент для каждого названия проекта
 // обратите внимание на атрибуты `data-*`
 for (const p of projects) {
   project_list.innerHTML += /*html*/ `
     <li
       class="list-group-item d-flex align-items-center"
       data-name="${p}"
     >
       <span class="flex-grow-1">
         ${p}
       </span>
       <button
         class="btn btn-outline-success"
         data-action="edit"
       >
         <i class="bi bi-pencil"></i>
       </button>
       <button
         class="btn btn-outline-danger"
         data-action="remove"
       >
         <i class="bi bi-trash"></i>
       </button>
     </li>
   `
 }
}
```

Функция для инициализации проекта с помощью фиктивных данных:

```javascript
function initProject(name, data) {
 project_name.value = name
 project_data_paste.value = isJson(data) ? data : JSON.stringify(data, null, 2)
}
```

Функция для инициализации обработчиков. Она включает в себя регистрацию обработчиков нажатия кнопок для редактирования и удаления проектов, а также обработчика отправки формы - создания или загрузки проекта:

```javascript
function initHandlers() {
 // ...
}
```

Обработчик нажатия кнопок:

```javascript
// обработка нажатия кнопок делегируется списку проектов - элементу `ul`
project_list.onclick = ({ target }) => {
 // получаем ссылку на кнопку
 const button = target.matches('button') ? target : target.closest('button')

 // получаем тип операции
 const { action } = button.dataset

 // получаем название проекта
 const { name } = target.closest('li').dataset

 if (button && action && name) {
   switch (action) {
     case 'edit':
       // функция для редактирования проекта
       return editProject(name)
     case 'remove':
       // функция для удаления проекта
       return removeProject(name)
     default:
       return
   }
 }
}
```

Обработчик отправки формы:

```javascript
project_create.onsubmit = async (e) => {
 e.preventDefault()

 // проект должен иметь название
 if (!project_name.value.trim()) return

 // переменные для данных проекта и ответа от сервера
 let data, response

 // добавленный с помощью `<input type="file" />` файл
 // имеет приоритет перед значением `<textarea>`
 if (project_data_upload.value) {
   // `multipart/form-data`
   // названия полей совпадают со значениями
   // атрибутов `name` элементов `input` и `textarea`
   data = new FormData(project_create)

   // удаляем лишнее поле
   data.delete('project_data_paste')

   // отправляем запрос и получаем ответ
   response = await simpleFetch.post('/upload', data, {
     // `multer` требует, чтобы заголовки запроса были пустыми
     headers: {}
   })
 } else {
   // получаем данные для проекта
   data = project_data_paste.value.trim()
   // получаем название проекта
   const name = project_name.value.trim()

   // если данные или название отсутствуют
   if (!data || !name) return

   // формируем тело запроса
   const body = {
     project_name: name,
     project_data: isJson(data) ? JSON.parse(data) : data
   }

   // отправляем запрос и получаем ответ
   response = await simpleFetch.post('/create', body)
 }

 // очищаем поля
 project_name.value = ''
 project_data_paste.value = ''
 project_data_upload.value = ''

 // вызываем обработчик ответа
 // важно: для корректного обновления списка проектов
 // необходимо ждать завершения обработки ответа
 await handleResponse(response)
}
```

Функция для редактирования проекта:

```javascript
async function editProject(name) {
 // название проекта передается на сервер в виде строки запроса
 const { data, error } = await simpleFetch.get(`?project_name=${name}`)

 if (error) {
   return console.error(error)
 }

 // инициализируем проект с помощью полученных от сервера данных
 initProject(name, data)
}
```

Функция для удаления проекта:

```javascript
async function removeProject(name) {
 // название проекта передается на сервер в виде строки запроса
 const response = await simpleFetch.remove(`?project_name=${name}`)

 // вызываем обработчик ответа
 await handleResponse(response)
}
```

Функция для обработки ответа от сервера:

```javascript
async function handleResponse(response) {
 // извлекаем данные и ошибку из ответа
 const { data, error } = response

 // если при выполнении ответа возникла ошибка
 if (error) {
   return console.error(error)
 }

 // выводим в консоль сообщение об успешно выполненной операции
 console.log(data.message)

 // обновляем список проектов
 await fetchProjects()
}
```

Наконец, вызываем наши функции:

```javascript
// получаем список существующих проектов
fetchProjects()
// инициализируем новый проект
// initProject(название проекта, данные для проекта)
initProject('todos', todos)
// инициализируем обработчики событий
initHandlers()
```

Проверим работоспособность нашего сервиса для работы с проектами.

Выполняем команду:

```bash
yarn dev
# or
npm run dev
```

Запускается сервер для разработки, открывается новая вкладка браузера по адресу `http://localhost:5000`:

<img src="https://habrastorage.org/webt/k9/ih/qy/k9ihqyadr2xptnecjgzn14trfqs.png" />
<br />
У нас имеется название и данные для проекта. Нажимаем `Create project`. В директории `projects` появляется файл `todos.json`, список проектов обновляется:

<img src="https://habrastorage.org/webt/ea/ov/ay/eaovay2rmwayppvx0pos6fth1fg.png" />
<br />
Попробуем загрузить файл. Вводим название нового проекта, например, `data/todos`, загружаем через инпут `JSON-файл` из директории `public/data`, нажимаем `Create project`. В директории `projects` появляется директория `data` с файлом нового проекта, список проектов обновляется:

<img src="https://habrastorage.org/webt/sr/6c/ux/sr6cuxrfq_nfq8e7ue9smqjnsdc.png" />
<br />
Нажатие кнопок для редактирования и удаления проекта также приводит к ожидаемым результатам.

Отлично, сервис для работы с проектами функционирует в штатном режиме. Но пока он не умеет отвечать на запросы со стороны. Давайте это исправим.

## Роуты для `API`

Создаем файл `api.routes.js` в директории `routes`.

Импортируем роутер из `express`, утилиты из `utils.js` и экспортируем экземпляр роутера:

```javascript
import { Router } from 'express'
import { createFile, readFile, queryMap, areEqual } from '../utils.js'

export default Router()
```

Начнем с самого простого - `POST-запроса` на добавление данных в существующий проект:

```javascript
.post('*', async (req, res, next) => {
 try {
   // получаем проект
   const project = await readFile(req.url)

   // создаем новый проект путем обновления существующего
   const newProject = project.concat(req.body)

   // сохраняем новый проект
   await createFile(newProject, req.url)

   // возвращаем новый проект
   res.status(201).json(newProject)
 } catch (e) {
   next(e)
 }
})
```

`DELETE-запрос` на удаление данных из проекта:

```javascript
// `slug` - это любой уникальный идентификатор проекта
// он может называться как угодно, но, обычно, именуется как `slug` или `param`
// как правило, таким идентификатором является `id` проекта
// в нашем случае это также может быть текст задачи
.delete('*/:slug', async (req, res, next) => {
 // параметры запроса имеют вид `{ '0': '/todos', slug: '1' }`
 // извлекаем путь и идентификатор
 const [url, slug] = Object.values(req.params)

 try {
   // получаем проект
   const project = await readFile(url)

   // создаем новый проект путем фильтрации существующего
   const newProject = project.filter(
     (p) => !Object.values(p).find((v) => v === slug)
   )

   // если существующий и новый проекты равны, значит,
   // данных для удаления не обнаружено
   // небольшой хак
   if (areEqual(project, newProject)) {
     throw { status: 404, message: 'Not found' }
   }

   // создаем новый проект
   await createFile(newProject, url)

   // и возвращаем его
   res.status(201).json(newProject)
 } catch (e) {
   next(e)
 }
})
```

Вот как выглядит утилита для сравнения объектов (`utils.js`):

```javascript
export function areEqual(a, b) {
 if (a === b) return true

 if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()

 if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
   return a === b

 if (a.prototype !== b.prototype) return false

 const keys = Object.keys(a)

 if (keys.length !== Object.keys(b).length) return false

 return keys.every((k) => areEqual(a[k], b[k]))
}
```

`PUT-запрос` на обновление данных существующего проекта выглядит похоже:

```javascript
.put('*/:slug', async (req, res, next) => {
 const [url, slug] = Object.values(req.params)

 try {
   const project = await readFile(url)

   // создаем новый проект путем обновления существующего
   const newProject = project.map((p) => {
     if (Object.values(p).find((v) => v === slug)) {
       return { ...p, ...req.body }
     } else return p
   })

   // если объекты равны...
   if (areEqual(project, newProject)) {
     throw { status: 404, message: 'Not found' }
   }

   await createFile(newProject, url)

   res.status(201).json(newProject)
 } catch (e) {
   next(e)
 }
})
```

Что касается `GET-запроса` на получение проекта, то с ним все не так просто. Мы должны иметь возможность получать как проект целиком, так и отдельные данные из него. При этом в случае с отдельными данными у нас должна быть возможность получать их как с помощью уникального идентификатора (параметра) - в этом случае должен возвращаться объект, так и с помощью строки запроса - в этом случае должен возвращаться массив.

`GET-запрос` на получение всего проекта:

```javascript
.get('*', async (req, res, next) => {
 // если запрос включает `?`, значит, он содержит строку запроса
 // передаем управление следующему роуту
 if (req.url.includes('?')) {
   return next()
 }

 try {
   // пробуем получить проект
   const project = await readFile(req.url)

   // и возвращаем его
   res.status(200).json(project)
 } catch (e) {
   // `throw { status: 404, message: 'Not found' }`
   // если проект не обнаружен, возможно, мы имеем дело с запросом
   // на получение уникальных данных по параметру
   if (e.status === 404) {
     // передаем управление следующему роуту
     return next()
   }

   // другая ошибка
   next(e)
 }
})
```

`GET-запрос` на получение данных по параметру или строке запроса:

```javascript
.get('*/:slug', async (req, res, next) => {
 let project = null

 try {
   // если запрос содержит строку запроса
   if (req.url.includes('?')) {
     // получаем проект, удаляя строку запроса
     project = await readFile(req.url.replace(/\?.+/, ''))

     // `req.query` - это объект вида `{ id: '1' }`, если строка запроса была `?id=1`
     // нам необходимо исключить параметры, которые должны обрабатываться особым образом
     // об утилите `queryMap` мы поговорим чуть позже
     const notQueryKeyValues = Object.entries(req.query).filter(
       ([k]) => !queryMap[k] && k !== 'order'
     )

     // если имеются "обычные" параметры
     if (notQueryKeyValues.length > 0) {
       // фильтруем данные на их основе
       project = project.filter((p) =>
         notQueryKeyValues.some(([k, v]) => {
           if (p[k]) {
             // унифицируем определение идентичности
             return p[k].toString() === v.toString()
           }
         })
       )
     }

     // если строка запроса содержит параметры `sort` и/или `order`
     // выполняем сортировку данных
     if (req.query['sort'] || req.query['order']) {
       project = queryMap.sort(
         project,
         req.query['sort'],
         req.query['order']
       )
     }

     // если строка запроса содержит параметр `offset`
     // выполняет сдвиг - пропускаем указанное количество элементов
     if (req.query['offset']) {
       project = queryMap.offset(project, req.query['offset'])
     }

     // если строка запроса содержит параметр `limit`
     // возвращаем только указанное количество элементов
     if (req.query['limit']) {
       project = queryMap.limit(project, req.query['limit'])
     }
   } else {
     // если запрос не содержит строки запроса
     // значит, это запрос на получение уникального объекта
     // получаем проект
     const _project = await readFile(req.params[0])

     // пытаемся найти данные по идентификатору
     for (const item of _project) {
       for (const key in item) {
         if (item[key] === req.params.slug) {
           project = item
         }
       }
     }
   }

   // если данных не обнаружено
   if (!project || project.length < 1) return res.sendStatus(404)

   // возвращаем данные
   res.status(200).json(project)
 } catch (e) {
   next(e)
 }
})
```

Утилита для обработки специальных параметров строки запроса выглядит следующим образом (`utils.js`):

```javascript
// создаем экземпляры `Intl.Collator` для локализованного сравнения строк и чисел
const strCollator = new Intl.Collator()
const numCollator = new Intl.Collator([], { numeric: true })

export const queryMap = {
 // сдвиг или пропуск указанного количества элементов
 offset: (items, count) => items.slice(count),
 // ограничение количества возвращаемых элементов
 limit: (items, count) => items.slice(0, count),
 // сортировка элементов
 // по умолчанию элементы сортируются по `id` и по возрастанию
 sort(items, field = 'id', order = 'asc') {
   // определяем, являются ли значения поля для сортировки строками
   const isString = typeof items[0][field] === 'string' && Number.isNaN(items[0][field])
   // выбираем правильный экземпляр `Intl.Collator`
   const collator = isString ? strCollator : numCollator
   // выполняем сортировку
   return items.sort((a, b) => order.toLowerCase() === 'asc'
       ? collator.compare(a[field], b[field])
       : collator.compare(b[field], a[field])
   )
 }
}
```

Итак, у нас имеется сервис для работы с проектами и `API` для работы с запросами. В работоспособности сервиса мы уже убедились. Осталось проверить, что запросы к `API` также обрабатываются корректно.

## `REST Client`

Тремя наиболее популярными решениями для быстрого тестирования `API` является следующее:

- [`curl`](https://curl.se/) - интерфейс командной строки
- [`postman`](https://www.postman.com/) или [`insomnia`](https://insomnia.rest/download) - специализированные сервисы
- [`REST Client`](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) - расширение для `VSCode`

Я покажу, как использовать `REST Client`, однако запросы, которые мы сформируем, можно будет легко использовать и в других инструментах.

После установки `REST Client` в корневой директории проекта необходимо создать файл с расширением `.http`, например, `test.http` следующего содержания:

```bash
###
### todos
###
GET http://localhost:5000/api/todos

###
GET http://localhost:5000/api/todos/2

###
GET http://localhost:5000/api/todos/5

###
GET http://localhost:5000/api/todos?text=Sleep

###
GET http://localhost:5000/api/todos?text=Test

###
GET http://localhost:5000/api/todos?done=true

###
POST http://localhost:5000/api/todos
content-type: application/json

{
 "id": "5",
 "text": "Test",
 "done": false,
 "edit": false
}

###
POST http://localhost:5000/api/todos
content-type: application/json

[
 {
   "id": "6",
   "text": "Test2",
   "done": false,
   "edit": false
 },
 {
   "id": "7",
   "text": "Test3",
   "done": true,
   "edit": false
 }
]

###
PUT http://localhost:5000/api/todos/2
content-type: application/json

{
 "text": "Test",
 "done": false
}

###
DELETE http://localhost:5000/api/todos/5

###
### query
###
GET http://localhost:5000/api/todos?limit=2

###
GET http://localhost:5000/api/todos?offset=2&limit=1

###
GET http://localhost:5000/api/todos?offset=3&limit=2

###
GET http://localhost:5000/api/todos?sort=id&order=desc

###
GET http://localhost:5000/api/todos?sort=title&order=desc

###
GET http://localhost:5000/api/todos?sort=text

###
GET http://localhost:5000/api/todos?sort=text&order=desc&offset=1&limit=2

###
### data/todos
###
GET http://localhost:5000/api/data/todos

###
GET http://localhost:5000/api/data/todos/2

###
GET http://localhost:5000/api/data/todos/5

###
GET http://localhost:5000/api/data/todos?text=Sleep

###
GET http://localhost:5000/api/data/todos?text=Test

###
GET http://localhost:5000/api/data/todos?done=false

###
POST http://localhost:5000/api/data/todos
content-type: application/json

{
 "id": "5",
 "text": "Test",
 "done": false,
 "edit": false
}

###
POST http://localhost:5000/api/data/todos
content-type: application/json

[
 {
   "id": "6",
   "text": "Test2",
   "done": true,
   "edit": false
 },
 {
   "id": "7",
   "text": "Test3",
   "done": false,
   "edit": false
 }
]

###
PUT http://localhost:5000/api/data/todos/3
content-type: application/json

{
 "text": "Test",
 "done": true
}

###
DELETE http://localhost:5000/api/data/todos/7
```

Здесь:

- `###` - разделитель запросов, который можно использовать для добавления комментариев
- `GET`, `POST` и т.д. - метод запроса
- `content-type: application/json` - заголовок запроса
- `[ ... ]` или `{ ... }` - тело запроса
- заголовки и тело запроса должны разделяться пустой строкой

Над каждым запросом в `VSCode` имеется кнопка для выполнения запроса.

<img src="https://habrastorage.org/webt/xf/xm/f4/xfxmf4ssyzdygi4hqpg1web-kxc.png" />
<br />
Для тестирования `API` необходимо создать два проекта: `todos` и `data/todos`.

Выполним парочку запросов.

`GET-запрос` на получение проекта `todos`:

<img src="https://habrastorage.org/webt/xz/9j/-q/xz9j-q3dqazj9tyjbrttn9hljjq.png" />
<br />
`GET-запрос` на получение задачи с текстом `Sleep` из проекта `todos` с помощью строки запроса (такой запрос также можно выполнить с помощью параметра - `GET http://localhost:5000/api/todos/Sleep`):

<img src="https://habrastorage.org/webt/hc/qx/me/hcqxmebxxk8qsrrraa6ivx-95-0.png" />
<br />
`POST-запрос` на добавление новой задачи в проект `todos`:

<img src="https://habrastorage.org/webt/mg/ma/lj/mgmaljygogo8xdfqfcjkftg2ybi.png" />
<br />
`GET-запрос` на получение второй и третьей задач из проекта `todos`, отсортированных по полю `text` по убыванию:

<img src="https://habrastorage.org/webt/_g/92/la/_g92laa3vqc0shq0j7yufcgv1dc.png" />
<br />
И т.д.

_Обратите внимание_, что операции для работы с одним проектом не влияют на другие проекты.

Выполните несколько запросов самостоятельно, изучите ответы и мысленно свяжите их с роутами, реализованными в `api.routes.js`.

The End.
