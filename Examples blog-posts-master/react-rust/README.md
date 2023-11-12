# `React + Rust` :metal:

Let's use `Wasm` module, compiled from `Rust`, in `React`.

На днях прочитал [интересную статью](https://www.joshfinnie.com/blog/using-webassembly-created-in-rust-for-fast-react-components/), в которой демонстрируется возможность использования [`WebAssembly-модулей`](https://developer.mozilla.org/ru/docs/WebAssembly) (далее - `Wasm`), скомпилированных из [`Rust`](https://www.rust-lang.org), в [`React-приложении`](https://ru.reactjs.org/).

Так вот, статья интересная, но автор толком ничего не объясняет, видимо, исходя из предположения, что читатели, как и он, владеют обоими языками программирования (`JavaScript` и `Rust`).

Поскольку я не отношусь к этой категории (пока не знаю `Rust`), но люблю как следует разбираться в интересующих меня вещах, представляю вашему вниманию собственную версию.

[Исходный код проекта](https://github.com/harryheman/react-rust).

Если вам это интересно, прошу под кат.
<cut />

Если вы впервые слышите о `Wasm`, [вот статья, в которой освещаются некоторые связанные с ним общие вопросы](https://habr.com/ru/company/timeweb/blog/589793/).

Предполагается, что вы знакомы с `React.js`, имеете общее представление о [`Node.js`](https://nodejs.org/en/) и хотя бы раз настраивали какой-нибудь сборщик модулей типа [`Webpack`](https://webpack.js.org/) (я буду использовать [`Snowpack`](https://www.snowpack.dev/)).

Разумеется, на вашей машине должен быть установлен [`Node.js`](https://nodejs.org/en/) и [`Rust`](https://www.rust-lang.org/tools/install).

На `Mac` это делается так:

```bash
# устанавливаем Node.js
brew install node@16 # lts версия
# устанавливаем Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Подготовка проекта

Создаем шаблон `React-проекта` с помощью `Snowpack`:

```bash
# react-rust - название проекта
# --template @snowpack/app-template-react - название используемого шаблона
# --use-yarn - использовать yarn вместо npm для установки зависимостей, опционально
yarn create snowpack-app react-rust --template @snowpack/app-template-react --use-yarn
# или
npx create-snowpack-app ...
```

Переходим в созданную директорию и инициализируем `Rust-проект`:

```bash
# переходим в директорию
cd react-rust
# инициализируем проект
cargo init --lib
```

[`Cargo`](https://doc.rust-lang.org/cargo/index.html) - это пакетный менеджер (package manager) `Rust` (аналог `npm`, входит в состав `Rust`). Он устанавливает зависимости, компилирует пакеты, создает распространяемые пакеты и загружает их в [`crates.io`](https://crates.io/) (реестр пакетов `Rust`, аналог `npmjs.com`).

Команда [`cargo init`](https://doc.rust-lang.org/cargo/commands/cargo-init.html) создает новый пакет в существующей директории. Флаг `--lib` создает пакет с целевой библиотекой (`src/lib.rs`, файлы с кодом на `Rust`, как правило, имеют расширение `rs`). [Целевая библиотека](https://doc.rust-lang.org/cargo/reference/cargo-targets.html#library) - это "библиотека", которая может быть использована другими библиотеками и исполняемыми файлами (executables). Один пакет может иметь только одну библиотеку.

`cargo` не умеет компилировать `Rust` в `Wasm`. Для этого нам потребуется пакет [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen) (данный пакет входит в состав [`wasm-pack`](https://github.com/rustwasm/wasm-pack)).

Он, в частности, позволяет импортировать "вещи" из `JavaScript` в `Rust` и экспортировать "вещи" из `Rust` в `JavaScript` (цитата из документации).

Также нам необходимо сообщить компилятору, что типом пакета является [`cdylib`](https://github.com/rust-lang/rfcs/blob/master/text/1510-cdylib.md). Указание [`cdylib`](https://doc.rust-lang.org/reference/linkage.html) приводит к генерации динамической системной библиотеки (dynamic system library). Этот тип используется "при компиляции динамической библиотеки, загружаемой из другого языка программирования".

Редактируем [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) (аналог `package.json`, создается при инициализации `Rust-проекта`):

```bash
[package]
name = "react-rust"
version = "1.0.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

Выполняем сборку `Rust-приложения`:

```bash
cargo build # данная команда компилирует пакеты и все их зависимости
```

Это приводит к генерации директории `target`. В ней пока нет ничего интересного, но скоро мы это исправим.

Для того, чтобы сборка содержала `Wasm-файл`, необходимо явно определить цель сборки:

```bash
rustup target add wasm32-unknown-unknown
```

[`rustup`](https://rust-lang.github.io/rustup/) - это установщик набора инструментов (toolchain installer) `Rust`. [`target add`](https://rust-lang.github.io/rustup/cross-compilation.html) позволяет определить цель компиляции.

Что означает `wasm32-unknown-unknown`? Первый `unknown` означает систему, в которой выполняется компиляция, второй - систему, для которой выполняется компиляция. `wasm32` означает, что [адресное пространство](https://ru.wikipedia.org/wiki/%D0%90%D0%B4%D1%80%D0%B5%D1%81%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D1%81%D1%82%D1%80%D0%B0%D0%BD%D1%81%D1%82%D0%B2%D0%BE_(%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0)) имеет размер 32 бита ([источник](https://github.com/rustwasm/wasm-bindgen/issues/979)).

Редактируем `src/lib.rs` (возьмем пример из документации `wasm-bindgen`):

```rust
// импорт пакета
// https://doc.rust-lang.org/beta/reference/names/preludes.html
// https://stackoverflow.com/questions/36384840/what-is-the-prelude
use wasm_bindgen::prelude::*;

// импорт функции `window.alert` из "Веба"
#[wasm_bindgen]
extern "C" {
 fn alert(s: &str);
}

// экспорт функции `greet` в JavaScript
#[wasm_bindgen]
pub fn greet(name: &str) {
 alert(&format!("Hello, {}!", name));
}
```

Выполняем сборку `Rust-приложения`, указывая нужную цель:

```bash
cargo build --target wasm32-unknown-unknown
```

Это приводит к генерации интересующего нас файла `target/wasm32-unknown-unknown/debug/react_rust.wasm`. `debug` означает, что мы выполнили сборку для разработки. Для создания продакш-сборки используется команда `cargo build --release` (выполнение этой команды приводит к генерации директории `target/wasm32-unknown-unknown/release`).

Устанавливаем плагин [`@emily-curry/snowpack-plugin-wasm-pack`](https://www.npmjs.com/package/@emily-curry/snowpack-plugin-wasm-pack). Данный плагин генерирует обертку для `Wasm`, состоящую из набора `JS` и `TS-файлов`, в частности, `index.js`, экспортирующего функцию `greet`, которую мы будем использовать в `React-приложении`.

Редактируем `snowpack.config.mjs`:

```javascript
export default {
 mount: {
   public: { url: '/', static: true },
   src: { url: '/dist' },
   // это позволяет импортировать файлы из директории pkg,
   // находящейся за пределами директории src
   pkg: { url: '/pkg' }
 },
 plugins: [
   '@snowpack/plugin-react-refresh',
   '@snowpack/plugin-dotenv',
   // плагин для создания обертки
   [
     '@emily-curry/snowpack-plugin-wasm-pack',
     {
       // директория проекта, содержащая файл Cargo.toml
       projectPath: '.'
     }
   ]
 ],
 // ...
```

Для работы плагина требуется [`cargo-watch`](https://github.com/watchexec/cargo-watch) и [`wasm-pack`](https://github.com/rustwasm/wasm-pack). `wasm-pack` устанавливается как зависимость `wasm-bindgen`.

`cargo-watch` выполняет соответствующие команды `cargo` при изменении файлов проекта (аналог `nodemon`). Устанавливаем его:

```bash
cargo install cargo-watch
```

Теперь займемся `React-приложением`.

Редактируем `src/App.jsx`:

```javascript
import React, { useState } from 'react'
// импортируем функцию инициализации и
// нашу функцию `greet`
import init, { greet } from '../pkg'

function App() {
 // состояние для имени
 const [name, setName] = useState('')

 // функция изменения имени
 const changeName = ({ target: { value } }) => setName(value)
 // функция приветствия
 const sayHello = async (e) => {
   e.preventDefault()
   const trimmed = name.trim()
   if (!trimmed) return
   // выполняем инициализацию
   await init()
   // вызываем нашу функцию
   greet(name)
 }

 return (
   <div className='app'>
     <h1>React Rust</h1>
     <form onSubmit={sayHello}>
       <fieldset>
         <label htmlFor='name'>Enter your name</label>
         <input
           type='text'
           id='name'
           value={name}
           onChange={changeName}
           autoFocus
         />
       </fieldset>
       <button>Say hello</button>
     </form>
   </div>
 )
}

export default App
```

Запускаем проект в режиме разработки:

```bash
yarn start
# or
npm start
```

<img src="https://habrastorage.org/webt/pw/sb/uj/pwsbujkcxpjjajek7zmffcdk9di.png" />
<br />

_Обратите внимание_: здесь может возникнуть ошибка `404 Not Found`, связанная с тем, что сервер для разработки запускается до генерации директории `pkg`, в которую помещаются файлы, скомпилированные с помощью плагина `@emily-curry/snowpack-plugin-wasm-pack` (из этой директории импортируется функция `greet`). В этом случае просто перезапустите сервер и все будет ок 😃

<img src="https://habrastorage.org/webt/me/cf/mu/mecfmuq2feikjuo6njsxc5jec0a.png" />
<br />

Вводим имя и нажимаем кнопку `Say hello`:

<img src="https://habrastorage.org/webt/fe/_u/tj/fe_utjssdcg2e_ies7l5cyh2olo.png" />
<br />

Функция `greet`, написанная на `Rust` и скомпилированная в `Wasm`, работает в `JS`. Круто!

Выполняем сборку для продакшна:

```bash
yarn build
# or
npm run build
```

<img src="https://habrastorage.org/webt/bk/uv/wd/bkuvwdgi8motdkowg6vcsezjyew.png" />
<br />

Это приводит к генерации директории `build` со всеми файлами проекта (настройка сборки для продакшна выполняется с помощью раздела `buildOptions` файла `snowpack.config.js`).

Поскольку типом скрипта, подключаемого в `index.html`, является `module`, запустить проект с помощью расширения `VSCode` типа [`Live Server`](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) не получится - сработает блокировка [`CORS`](https://developer.mozilla.org/ru/docs/Web/HTTP/CORS).

Что делать? Писать сервер? Есть вариант получше.

Устанавливаем [`serve`](https://www.npmjs.com/package/serve) глобально:

```bash
yarn global add serve
# or
npm i -g serve
```

Запускаем проект:

```bash
# флаг -s или --single означает, что отсутствующие пути
# будут перенаправляться к index.html
serve -s build
# or without install
npx serve -s build
```

<img src="https://habrastorage.org/webt/d6/1y/au/d61yauesfhsbjeknwe2ams_p7ia.png" />
<br />

Получаем адрес сайта, переходим по нему, видим наше приложение.

Вводим имя, нажимаем `Say hello`, получаем приветствие. Да, мы сделали это!

Пожалуй, это все, чем я хотел поделиться с вами в этой статье.

Надеюсь, вам было интересно и вы не зря потратили время.

The End.
