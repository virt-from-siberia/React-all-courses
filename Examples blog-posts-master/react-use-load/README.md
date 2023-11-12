# `useLoad` Custom React Hook :metal:

> Hooks -> client/src/hooks

Let's build custom `React` hook for uploading additional data.

На самом деле хука будет 2:

- `useLoadMore` - для загрузки дополнительных данных при нажатии кнопки "Загрузить еще"
- `useLoadPage` - для постраничной загрузки данных (аля пагинация на основе курсора)

Первый хук попроще, второй посложнее.

Полагаю, лишним будет говорить, что необходимость в использовании подобных хуков возникает в каждом втором проекте.

[Песочница](https://stackblitz.com/edit/github-vsrckr-mmw6ds).

Для запуска проекта в песочнице необходимо выполнить команду `yarn start` в терминале.

Команды для локального запуска проекта:

```bash
# клонируем репозиторий
git clone https://github.com/harryheman/use-load.git
# переходим в директорию с проектом
cd use-load

# устанавливаем общие зависимости
yarn

# устанавливаем зависимости для сервера
cd server && yarn

# устанавливаем зависимости для клиента
cd .. && cd client && yarn

# запускаем сервер для разработки
cd .. && yarn start
```

Скриншот страницы, на которой используется хук `useLoadPage`:

<img src="https://habrastorage.org/webt/yb/vb/mg/ybvbmgu6tjmfvgbepgoiolvkzkq.png" />
<br />
Проект состоит из двух частей:

- сервера для генерации фиктивных данных и обработки запросов;
- клиента для выполнения запросов и отображения полученных от сервера данных.

Сервер написан на чистом `JavaScript`, клиент - на `React` и `TypeScript`.

Структура проекта:

<img src="https://habrastorage.org/webt/v8/3u/u9/v83uu9l9ciqqhbdbogv7-a5aoog.png" />
<br />
Сервер состоит из 2 файлов:

- `index.js` - код для "роутов" и `express-сервера`
- `seed.js` - код для генерации фиктивных данных с помощью [`faker`](https://github.com/marak/Faker.js/)

Фиктивные данные представляют собой массив из `100` товаров (`allItems`). Каждый товар - это примерно такой объект:

```json
{
 "id": "5b45a471-3429-4bde-bf0e-1750e84fd4bd",
 "title": "Generic Plastic Chair",
 "description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
 "price": "940.00",
 "image": "http://placeimg.com/640/480/tech?82281"
}
```

Товары разделены на `10` страниц (`allPages`). Каждая страница - это объект, ключом которого является номер страницы, а значением - массив из `10` товаров:

```javascript
// pages
{
 1: [
   {
     // item
   },
 ],
 // etc.
}
```

После генерации фиктивные данные записываются в файл `server/data/fake.json`.

Сервер обрабатывает запросы к 3 конечным точкам:

- `/all-items`: в ответ возвращаются все товары - `{ items: allItems }`
- `/more-items`: в ответ возвращается часть товаров, начиная с первого и заканчивая номером страницы из строки запроса (`req.query`), умноженной на `10`, а также общее количество страниц - `{ items: allItems.slice(0, page * 10), totalPages: Object.keys(allPages).length }`
- `/items-by-page`: в ответ возвращается `10` товаров, соответствующих номеру страницы из строки запроса, а также общее количество страниц - `{ items: allPages[page], totalPages: Object.keys(allPages).length }`

В целом, это все, что касается сервера.

На клиенте у нас имеется следующее:

- `API` для взаимодействия с сервером (`api/index.ts`), включающее 3 функции, соответствующие 3 конечным точкам на сервере:
 - `fetchAllItems` - функция для получения всех товаров
 - `fetchItemsAndPages` и `fetchItemsByPage` - функции для получения части товаров на основе номера (значения) страницы
- 3 страницы (`pages`), соответствующие 3 `API-функциям`:
 - `AllProducts.tsx` - страница для отображения всех товаров. На этой странице используется функция `fetchAllItems`. Роут для страницы - `/`
 - `MoreProducts.tsx` - страница для отображения части товаров с возможностью загрузки дополнительных товаров при нажатии кнопки "Загрузить еще" в виде "👀". На этой странице используется хук `useLoadMore`, которому в качестве аргумента передается функция `fetchItemsAndPages`. Здесь мы двигаемся только вперед. Роут для страницы - `/more-products`
 - `ProductsByPage.tsx` - страница для постраничного отображения товаров с возможностью переключения страниц при нажатии кнопок "Вперед" в виде "👉" или "Назад" в виде "👈". На этой странице используется хук `useLoadPage`, которому в качестве аргумента передается функция `fetchItemsByPage`. В данном случае мы можем двигаться в обоих направлениях, т.е. как вперед, так и назад. Роут для страницы - `/products-by-page`
- 3 компонента (`components`):
 - `Navbar.tsx` - панель навигации для переключения между страницами приложения
 - `ProductCard.tsx` - карточка товара
 - `ProductList.tsx` - список товаров
- 2 хука (`hooks`):
 - `useLoadMore.ts` - хук для загрузки дополнительных товаров
 - `useLoadPage.ts` - хук для загрузки товаров, соответствующих определенной странице

Перейдем непосредственно к рассмотрению хуков. Начнем с более простого - `useLoadMore`.

Импортируем хуки из `react` и `react-router-dom`, а также типы для функции для получения товаров и объекта товара из `types.ts`:

```javascript
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Item, FetchItems } from 'types'
```

Типы выглядят так:

```javascript
export type Item = {
 id: string
 title: string
 description: string
 price: number
 image: string
}

export type AllItems = {
 items: Item[]
}

export type ItemsAndPages = AllItems & {
 totalPages: number
}

export type FetchItems = (page: number) => Promise<ItemsAndPages>
```

Определяем тип для объекта, возвращаемого хуком:

```javascript
type UseLoadMoreReturn = {
 loading: boolean
 items: Item[]
 loadMore: () => void
 hasMore: boolean
}
```

Как мы видим, хук возвращает:

- индикатор загрузки;
- товары;
- функцию для загрузки дополнительных товаров;
- индикатор наличия товаров.

Определяем хук:

```javascript
// хук принимает единственный параметр - функцию для получения дополнительных данных
export const useLoadMore = (fetchItems: FetchItems): UseLoadMoreReturn => {
 // код хука
}
```

Определяем переменные для товаров, текущего значения страницы, всех (доступных) страниц и индикатора загрузки, а также получаем объект истории браузера:

```javascript
// товары
const [items, setItems] = useState<Item[]>([])
// значение текущей страницы либо извлекается из строки запроса,
// например, `?page=1`, либо устанавливается в значение 1
const page = Number(new URLSearchParams(window.location.search).get('page'))
const currentPage = useRef(page > 0 ? page : 1)
// все страницы
const allPages = useRef(0)
// индикатор загрузки
const [loading, setLoading] = useState(false)

// объект истории
const history = useHistory()
```

Определяем функцию (внутренний метод) для загрузки товаров:

```javascript
// функция принимает единственный параметр - номер страницы
async function loadItems(page: number) {
 setLoading(true)

 try {
   const { items, totalPages } = await fetchItems(page)

   setItems(items)

   // меняем значение переменной только при инициализации и изменении данных из ответа сервера
   if (allPages.current !== totalPages) {
     allPages.current = totalPages
   }
 } catch (e) {
   console.error(e)
 } finally {
   setLoading(false)
 }
}
```

Выполняем однократный побочный эффект для загрузки товаров на основе текущей страницы:

```javascript
useEffect(() => {
 loadItems(currentPage.current)
 // eslint-disable-next-line
}, [])
```

Определяем функцию (публичный интерфейс) для загрузки дополнительных товаров:

```javascript
function loadMore() {
 // код функции выполняется только при условии, что значение текущей страницы
 // меньше доступных страниц
 if (currentPage.current < allPages.current) {
   // в данном случае мы двигаемся только в одном направлении
   // поэтому следующая страница - это всегда текущая страница + 1
   const nextPage = currentPage.current + 1

   // обновляем значение текущей страницы
   currentPage.current = nextPage

   // манипулируем адресом страницы
   history.replace(`?page=${nextPage}`)

   // загружаем товары
   loadItems(nextPage)
 }
}
```

Зачем мы манипулируем адресом страницы? На это существует, как минимум, 2 причины:

- это позволяет пользователю вернуться к тому списку, с которого он ушел, например, переключившись на страницу товара (в проекте не реализовано, но это можно увидеть, если переключиться на другую страницу и нажать "Назад" в браузере). В идеале, на странице также должно быть реализовано восстановление прокрутки (`scroll restoration`), но это тема для отдельной статьи;
- это позволяет поделиться ссылкой на товар, который находится дальше первой страницы. Если, например, перейти по прямой ссылке `more-products?pages=3`, то будет загружено не 10, а 30 первых товаров (здесь опять же не хватает привязки к конкретному товару, например, для выполнения прокрутки к нему - `scrollIntoView`).

Наконец, возвращаем объект:

```javascript
return {
 loading,
 items,
 loadMore,
 // обратите внимание, что здесь мы должны использовать `<`, а не `<=`
 hasMore: currentPage.current < allPages.current
}
```

Пример использования этого хука можно увидеть на странице `MoreProducts.tsx`.

При нажатии кнопки `👀` вызывается функция `loadMore` из хука. Когда индикатор наличия товаров получается значение `false`, эта кнопка не рендерится. Данный индикатор также можно установить в качестве значения атрибута `disabled` кнопки. Даже если разблокировать кнопку через редактирование разметки, загрузки несуществующих товаров не произойдет благодаря проверке `currentPage.current < allPages.current`.

Теперь рассмотрим более продвинутый хук - `useLoadPage`.

В начале мы также импортируем хуки и типы:

```javascript
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Item, FetchItems } from 'types'
```

Определяем тип для возвращаемого хуком объекта:

```javascript
type UseLoadPageReturn = {
 loading: boolean
 items: Item[]
 hasNext: boolean
 hasPrev: boolean
 loadNext: () => void
 loadPrev: () => void
 currentPage: number
 allPages: number
 loadPage: (page: number) => void
}
```

Как мы видим, хук возвращает много всего интересного:

- `loading` - индикатор загрузки
- `items` - товары
- `hasNext` - индикатор наличия следующей страницы товаров
- `hasPrev` - индикатор наличия предыдущей страницы
- `loadNext` - функция для загрузки следующей страницы
- `loadPrev` - функция для загрузки предыдущей страницы
- `currentPage` - текущая страница
- `allPages` - все страницы
- `loadPage` - функция для загрузки определенной страницы

В дополнение к этому я решил реализовать кеширование загруженных ранее страниц товаров. Определяем тип для соответствующего объекта:

```javascript
type PagesCache = {
 [page: string]: Item[]
}
```

Приступаем к реализации хука:

```javascript
// хук принимает единственный параметр - функцию для получения дополнительных данных
export const useLoadPage = (fetchItems: FetchItems): UseLoadPageReturn => {
 // код хука
}
```

Определяем переменные для товаров, кеша, текущей страницы, первой страницы, всех страниц и индикатора загрузки, а также получаем объект истории браузера:

```javascript
// товары
const [items, setItems] = useState<Item[]>([])
// кеш для товаров
const cachedItems = useRef<PagesCache>({})
// значение текущей страницы либо извлекается из строки запроса,
// например, `?page=1`, либо устанавливается в значение 1
const page = Number(new URLSearchParams(window.location.search).get('page'))
const currentPage = useRef(page > 0 ? page : 1)
// первая страница - хак (см. ниже)
const firstPage = useRef(Infinity)
// все страницы
const allPages = useRef(0)
// индикатор загрузки
const [loading, setLoading] = useState(false)

// объект истории
const history = useHistory()
```

Определяем функцию (внутренний метод) для загрузки товаров:

```javascript
// функция принимает единственный параметр - номер страницы
async function loadItems(page: number) {
 // если для переданной страницы в кеше имеются товары
 if (cachedItems.current[page]) {
   // возвращаем их без выполнения запроса к серверу
   return setItems(cachedItems.current[page])
 }

 setLoading(true)

 try {
   const { items, totalPages } = await fetchItems(page)

   setItems(items)

   // записываем загруженные товары в кеш - ключом является номер страницы
   cachedItems.current[page] = items

   // обновляем значения переменных для всех и первой страницы
   if (allPages.current !== totalPages) {
     allPages.current = totalPages
     firstPage.current = 1
   }
 } catch (e) {
   console.error(e)
 } finally {
   setLoading(false)
 }
}
```

Выполняем однократный побочный эффект для загрузки товаров, соответствующих текущей странице:

```javascript
useEffect(() => {
 loadItems(currentPage.current)
 // eslint-disable-next-line
}, [])
```

Определяем функцию (публичный интерфейс) для загрузки товаров по номеру страницы:

```javascript
// функция принимает единственный параметр - номер страницы
function loadPage(page: number) {
 currentPage.current = page

 history.replace(`?page=${page}`)

 loadItems(page)
}
```

Определяем функции (публичный интерфейс) для загрузки следующей и предыдущей страниц товаров:

```javascript
function loadNext() {
 // код функции выполняется только при условии, что значение текущей страницы
 // меньше доступных страниц
 if (currentPage.current < allPages.current) {
   const nextPage = currentPage.current + 1

   loadPage(nextPage)
 }
}

function loadPrev() {
 // код функции выполняется только при условии, что значение текущей страницы
 // больше первой страницы
 if (currentPage.current > firstPage.current) {
   const nextPage = currentPage.current - 1

   loadPage(nextPage)
 }
}
```

Наконец, возвращаем объект:

```javascript
return {
 loading,
 items,
 hasNext: currentPage.current < allPages.current,
 hasPrev: currentPage.current > firstPage.current,
 loadNext,
 loadPrev,
 currentPage: currentPage.current,
 allPages: allPages.current,
 loadPage
}
```

Хак с первой страницей нужен для первоначального рендеринга страницы `ProductsByPage`, когда мы начинаем со второй и далее страницы. Если определить первую страницу явно (т.е. как `1`), то индикатор `hasPrev` получит значение `true` и мы увидим заблокированную кнопку "Назад" над "лоадером". Попробуйте поэкспериментировать. Возможно, вы найдете лучшее решение.

Пример использования данного хука можно увидеть на странице `ProductsByPage`. Вот для чего используется каждое из возвращаемых хуком значений:

- `loading` - если имеет значение `true`, вместо списка товаров рендерится лоадер, кнопки для переключения между страницами блокируются
- `items` - передаются в качестве пропа компоненту `ProductList` для отображения списка товаров
- `hasNext` - если имеет значение `true`, кнопка для загрузки следующей страницы товаров не рендерится
- `hasPrev` - не рендерится кнопка для загрузки предыдущей страницы товаров
- `loadNext` - вызывается при нажатии кнопки `👉`
- `loadPrev` - вызывается при нажатии кнопки `👈`
- `currentPage` - используется при формировании компонента `PageLinks` для определения текущей страницы товаров и ее визуальной индикации
- `allPages` - используется при формировании компонента `PageLinks` для определения общего количества "ссылок"
- `loadPage` - вызывается при клике по ссылке компонента `PageLinks`

На странице `ProductsByPage` также реализовано переключение между страницами товаров при нажатии стрелок на клавиатуре.

The End.
