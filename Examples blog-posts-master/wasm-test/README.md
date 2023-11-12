# Заметка о `WebAssembly` :metal:

В 2019 году `WebAssembly` (далее - `WA` или `wasm`) стал четвертым "языком" веба. Первые три - это, разумеется, `HTML`, `CSS` и `JavaScript`. Сегодня `wasm` [поддерживается 94% браузеров](https://caniuse.com/wasm). Он, как утверждается, обеспечивает скорость выполнения кода, близкую к нативной (естественной, т.е. максимально возможной для браузера), позволяя портировать в веб десктопные приложения и видеоигры.

__Что не так с `JS`?__

`JS` - это интерпретируемый язык программирования с динамической типизацией. Динамическая типизация означает, что тип переменной проверяется (определяется) во время выполнения кода. И что с того? - спросите вы. Вот как определяется переменная в `C++`:

```c++
int n = 42
```

Такое определение сообщает компилятору тип переменной `n` и ее локацию в памяти. И все это в одной строке. А в случае с определением аналогичной переменной в `JS` (`const n = 42`), движку сначала приходится определять, что переменная является числом, затем, что число является целым и т.д. при каждом выполнении программы. На определение и (часто) приведение (преобразование) типов каждой инструкции уходит какое-то время.
<cut />
Процесс выполнения кода в `JS` выглядит примерно так:

```
Разбор (парсинг) -> Компиляция и оптимизация -> Повторная (дополнительная) оптимизация или деоптимизация -> Выполнение -> Сборка мусора
```

А в `WA` так:

```
Расшифровка (декодирование) -> Компиляция и оптимизация -> Выполнение
```

Это делает `WA` более производительным, чем `JS`. В защиту `JS` можно сказать, что он разрабатывался для придания "легкой" интерактивности веб-страницам, а не для создания высокопроизводительных приложений, выполняющих сложные вычисления.
<cut />

__Что такое `WA`?__

Формальное определение гласит, что `WA` - это открытый формат байт-кода, позволяющий переносить код, написанный на таких языках как `C`, `C++`, `C#`, `Rust` и `Go` в низкоуровневые ассемблерные инструкции, выполняемые браузером. По сути, это виртуальный микропроцессор, преобразующий высокоуровневый язык в машинный код.

На изображении ниже представлен процесс преобразования функции для сложения чисел (`add`), написанной на `C++`, в бинарный (двоичный) формат:

<img src="https://habrastorage.org/webt/bb/l7/yk/bbl7ykh_lifidsiohiynw_kpljy.png" />
<br />
_Обратите внимание_: `WA` - это не язык программирования. Это технология (инструмент), позволяющая конвертировать код на указанных выше языках в понятный для браузеров машинный код.

__Как `WA` работает?__

`WA` - это веб-ассемблер. Но что такое ассемблер?

Если очень простыми словами, то

- Каждый процессор имеет определенную архитектуру, например, `x86` или `ARM`. Процессор понимает только машинный код.
- Писать машинный код, сами понимаете, сложно и утомительно. Для облегчения этого процесса существуют языки ассемблера.
- Ассемблер конвертирует инструкции на языке ассемблера в машинный код, понятный для процессора.

На изображении ниже представлен процесс выполнения программы на `C` на компьютере:

<img src="https://habrastorage.org/webt/mk/8n/n0/mk8nn0ozewd3emfjphgfluyrp3o.png" />
<br />

__Пример использования `WA`__

Что нужно сделать, чтобы использовать `WA` в браузере (или на сервере в `Node.js`)? И действительно ли `WA-код` является более производительным, чем `JS-код`? Давайте это выясним.

Предположим, что у нас имеется такая функция на `C++`:

```c++
int fib(int n) {
 if (n < 2) return n;
 return fib(n - 1) + fib(n - 2);
}
```

`int ... int` означает, что функция принимает целое число и возвращает целое число. Как видите, наша функция вычисляет сумму чисел из [последовательности Фибоначчи](https://ru.wikipedia.org/wiki/%D0%A7%D0%B8%D1%81%D0%BB%D0%B0_%D0%A4%D0%B8%D0%B1%D0%BE%D0%BD%D0%B0%D1%87%D1%87%D0%B8) (далее - фибонача :)).

Сначала эту функцию необходимо конвертировать в `wasm-модуль`. Для этого существуют разные способы и инструменты. В нашем случае для этого вполне подойдет [`WasmExplorer`](https://mbebenita.github.io/WasmExplorer/).

<img src="https://habrastorage.org/webt/hd/wt/vm/hdwtvmiap6y2ud9s2xepn-gn78a.png" />
<br />
Вставляем код в первую колонку, нажимаем `Compile` для компиляции кода в [`Wat`](https://developer.mozilla.org/ru/docs/WebAssembly/Understanding_the_text_format)(текстовое представление двоичного формата `wasm`) и `Download` для преобразования `.wat` в `.wasm` и скачивания файла (`test.wasm`). Переименуем этот файл в `fib.wasm`.

Подготовим проект. Нам потребуется сервер. Зачем? Об этом чуть позже.

```bash
# создаем директорию и переходим в нее
mkdir wasm-test
cd wasm-test

# инициализируем Node.js-проект
yarn init -yp

# устанавливаем зависимости для продакшна
yarn add express cors
# и для разработки
yarn add -D nodemon
```

Структура проекта:

```
- public
 - fib.wasm
 - index.html
 - script.js
- server.mjs
- ...
```

_Обратите внимание_ на расширение файла `server`.

Добавляем в `package.json` команду для запуска сервера для разработки:

```json
"scripts": {
 "dev": "nodemon server.mjs"
}
```

Код сервера (`server.mjs`):

```javascript
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(cors())

app.use(express.static('public'))

app.get('*', (req, res) => {
 res.sendFile(resolve(`${__dirname}/${decodeURIComponent(req.url)}`))
})

app.listen(5000, () => {
 console.log('🚀')
})
```

Сервер, запущенный по адресу `http://localhost:5000`, возвращает файлы из директории `public` по запросам клиента, без [`CORS`](https://developer.mozilla.org/ru/docs/Web/HTTP/CORS).

Зачем нам сервер? Потому что для загрузки (импорта) `wasm-модулей` в `JS-код` используется либо `XHR`, либо `fetch`, которые заблокируют получение файла из источника `file://` (это связано с безопасностью). Немного забегая вперед, скажу, что для импорта `wasm-модулей` существует [специальное `API`](https://developer.mozilla.org/ru/docs/WebAssembly/Loading_and_running), предоставляющее несколько методов. Эти методы условно можно разделить на старые и новые. Мы рассмотрим и те, и другие. Суть в том, что при импорте модуля с помощью старых методов можно обойтись расширением для `VSCode` типа [`Live Server`](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). Однако новые методы требуют наличия в ответе заголовка `Content-Type: application/wasm` (судя по всему, `express` добавляет такой заголовок автоматически на основе названия файла или его содержимого, а расширение нет).

Еще один момент: мы рассмотрим только импорт `wasm-модуля` в `JS` и использование экспортируемой из экземпляра модуля фибоначи. Однако у нас также имеется возможность передавать функции и переменные [в `wasm-модуль` из `JS`](https://developer.mozilla.org/ru/docs/WebAssembly/Using_the_JavaScript_API).

Глянем на разметку (`index.html`):

```html
<h1>Wasm Test</h1>
<p class="log-c"></p>
<p class="log-js"></p>
<p class="log-comparison"></p>
<script src="script.js" type="module"></script>
```

У нас имеется 3 параграфа для вывода результатов функций, а также результатов их сравнения. Мы также подключаем основной скрипт клиента в виде модуля.

Перейдем непосредственно к клиентскому скрипту (`script.js`):

```javascript
const logC = document.querySelector('.log-c')
const logJS = document.querySelector('.log-js')
const logComparison = document.querySelector('.log-comparison')

let fibC
```

Получаем ссылки на `DOM-элементы` и создаем глобальную (в пределах модуля) переменную для `С++-фибоначи`.

```javascript
async function loadWasmOld(url) {
 const response = await fetch(url)
 const buffer = await response.arrayBuffer()
 const module = await WebAssembly.compile(buffer)
 return new WebAssembly.Instance(module)
}
```

Это старый (условно) способ загрузки `wasm-модулей`:

- получаем ответ (файл) от сервера
- конвертируем ответ в массив двоичных данных
- компилируем массив с помощью `WebAssembly API`
- и возвращаем экземпляр модуля

```javascript
async function initFibC() {
 const instance = await loadWasmOld('http://localhost:5000/fib.wasm')
 fibC = instance.exports._Z3fibi
}
```

Функция инициализации переменной `fibC`:

- получаем экземпляр `wasm-модуля`
- присваиваем экспортируемую функцию переменной

Откуда мы знаем название экспортируемой функции `_Z3fibi`? Отсюда:

<img src="https://habrastorage.org/webt/mg/lz/3h/mglz3h5a_zgxj8iwrf5zcxvnuos.png" />
<br />
```javascript
function fibJS(n) {
 if (n < 2) return n
 return fibJS(n - 1) + fibJS(n - 2)
}
```

`JS-фибонача`. К слову, на `TypeScript` это будет выглядеть так:

```ts
function fibJS(n: number): number {
 if (n < 2) return n
 return fibJS(n - 1) + fibJS(n - 2)
}
```

Здесь мы явно указываем, что функция принимает и возвращает числа. Но, во-первых, в этом нет необходимости, поскольку `TS` в состоянии сам это определить (предположение типов), во-вторых, это не решает проблем `JS`, о которых говорилось выше. `TS` - это некий компромисс между статическими и динамическими (с точки зрения типов) языками.

Выполним код фибонач:

```javascript
async function run() {
 // инициализируем переменную `fibC`
 await initFibC()

 // выполняем `fibC`
 const resultC = fibC(24)
 logC.innerHTML = `Результат выполнения функции "fibC" - <b>${resultC}</b>`

 // выполняем `fibJS`
 const resultJS = fibJS(24)
 logJS.innerHTML = `Результат выполнения функции "fibJS" - <b>${resultJS}</b>`
}
run()
```

Запускам сервер с помощью команды `yarn dev` и переходим по адресу `http://localhost:5000`.

<img src="https://habrastorage.org/webt/qy/jw/ig/qyjwigii1brpreyr9w9zvnay_lw.png" />
<br />
Отлично, код работает. Но как определить, какой код выполняется быстрее? Легко.

```javascript
function howLong(fn, ...args) {
 const start = performance.now()
 fn(...args)
 const timeTaken = ~~(performance.now() - start)
 return timeTaken
}
```

Данная функция возвращает время выполнения функции, переданной в качестве аргумента, в мс (округленных в меньшую сторону: `~~` - это сокращение для `Math.floor`).

Перед применением этой функции, перепишем код для загрузки `wasm-модуля`. Новый способ выглядит следующим образом:

```javascript
async function loadWasmNew(url, exportedFn) {
 const { module, instance } = await WebAssembly.instantiateStreaming(
   fetch(url)
 )
 return instance.exports[exportedFn]
}
```

Функция `loadWasmNew` принимает адрес `wasm-модуля` и название экспортируемой функции. Метод `instantiateStreaming` принимает промис, возвращаемый вызовом `fetch`, и возвращает объект, содержащий модуль и экземпляр `WA`. Модуль можно, например, [кешировать](https://developer.mozilla.org/en-US/docs/WebAssembly/Caching_modules) и в дальнейшем использовать для создания других экземпляров:

```javascript
const otherInstance = await WebAssembly.instantiate(module)
```

```javascript
async function run() {
 const fibC = await loadWasmNew('http://localhost:5000/fib.wasm', '_Z3fibi')

 const fibCTime = howLong(fibC, 42)
 logC.innerHTML = `На выполнение C++-кода потребовалось <b>${fibCTime}</b> мс`

 const fibJSTime = howLong(fibJS, 42)
 logJS.innerHTML = `На выполнение JS-кода потребовалось <b>${fibJSTime}</b> мс`
}
run()
```

<img src="https://habrastorage.org/webt/ra/xw/ew/raxwewu9rmidixtbnwp0trwpl14.png" />
<br />
Мы видим, что `C++-фибонача` почти в 2 раза (sic) производительнее `JS-фибоначи`. Получим точные цифры.

```javascript
async function run() {
 const fibC = await loadWasmNew('http://localhost:5000/fib.wasm', '_Z3fibi')

 const fibCTime = howLong(fibC, 42)
 logC.innerHTML = `На выполнение C++-кода потребовалось <b>${fibCTime}</b> мс`

 const fibJSTime = howLong(fibJS, 42)
 logJS.innerHTML = `На выполнение JS-кода потребовалось <b>${fibJSTime}</b> мс`

 const differenceInMs = fibJSTime - fibCTime
 const performancePercent = ~~(100 - (fibCTime / fibJSTime) * 100)
 logComparison.innerHTML = `Код на С++ выполнился быстрее кода на JS на <i>${differenceInMs}</i> мс,<br /> что дает прирост в производительности в размере <b>${performancePercent}%</b>`
}
run()
```

<img src="https://habrastorage.org/webt/tk/b4/yr/tkb4yrvw_xcvmls6or1cq9_ioxo.png" />
<br />
Полагаю, гипотеза о более высокой производительности `WA` по сравнению с `JS` подтверждена. Означает ли это, что веб-разработчикам нужно срочно изучать один из языков, компилируемых в `WA`, с целью написания `wasm-модулей` и их использования в скриптах? Не думаю. По крайней мере, сейчас ;)

Во-первых, экосистема `JS` содержит огромное количество готовых решений на все случаи жизни. Каждый день появляется что-то новое, в том числе, более производительное. Пройдет немало времени, прежде чем сформируется более-менее серьезная инфраструктура `wasm-модулей` для веба. Тот, кто организует реестр таких модулей наподобие `npm` (или внутри него), будет большим молодцом :). Учитесь у [`Boris Yankov`](https://github.com/borisyankov/) - субреестр можно, например, назвать `@wasm`.

Думаете, почему [`Deno`](https://deno.land/) не "взлетает"? Потому что есть "готовый" `Node.js`. Или [`GraphQL`](https://graphql.org/)? Потому что точечную выборку и обновление данных можно делать и через `REST`. Про `RPC` ([`gRPC`](https://grpc.io/)) ничего не буду говорить, поскольку не знаком с ним от слова "совсем", но `var`ы и колбеки в `Quick Start` для `Node.js` - это несерьезно. Небольшое лирическое отступление. _Обратите внимание_: это просто мысли вслух, а не приглашение к дискуссии.

Но кто знает, что будет завтра? Ситуация может резко измениться, когда появится возможность импортировать `wasm-модули` напрямую подобно `JS-модулям` - `import { _Z3fibi as fibC } from './fib.wasm'`. Или когда `WA` сможет манипулировать `DOM`.

Во-вторых, работающий медленно `JS-код` почти всегда можно сделать лучше. На примере той же фибоначи:

```javascript
function fibJS(n) {
 let a = 1
 let b = 1
 for (let i = 3; i <= n; i++) {
   let c = a + b
   a = b
   b = c
 }
 return b
}
```

Кода стало больше, но:

<img src="https://habrastorage.org/webt/ay/9s/bi/ay9sbiupkqkpo3b9vupznlk4wfa.png" />
<br />
Результат вычисляется моментально.

Основные источники:

- [WebAssembly](https://developer.mozilla.org/ru/docs/WebAssembly)
- [Loading WebAssembly modules efficiently](https://developers.google.com/web/updates/2018/04/loading-wasm)
- [WebAssembly | An Introduction](https://medium.com/walmartglobaltech/webassembly-an-introduction-4a6b5b6b0e2b)
- [Introduction to WebAssembly (WASM)](https://medium.com/dscvitpune/introduction-to-webassembly-wasm-54d505d6d569)

Парочка инструментов:

- [webm-wasm](https://github.com/GoogleChromeLabs/webm-wasm) - инструмент для создания видео в формате `WebM` с помощью `JS` через `WA`
- [wasm-pdf](https://github.com/jussiniinikoski/wasm-pdf) - инструмент (пример) генерации `PDF-файлов` в браузере с помощью `JS` и `WA`
