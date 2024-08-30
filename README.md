# REACT v18 ПОРТФОЛИО

СТЕК: React v18(CRA), TypeScript, SCSS, React-Router, Firebase, IGDB API(REST).

## ИНТРО

Проект представляет собой SPA с применением публичного IGDB API. Стараюсь реализовать все типовые задачи, встречающиеся на коммерческих проектах, например: слайдер, табы, пагинация, роутинг, модалки и т.д. Минимальная ширина экрана 768px.

Для обхода CORS настроен прокси, как локально, так и на netlify. Настройки netlify прокси в `/netlify.toml`.

## АРХИТЕКТУРА

Пока проект маленький и решил обойтись простым разделением кода на логику и UI. В будущем, с ростом кодовой базы, рассмотрю внедрение FSD или Clean Architecture.

## АВТОРИЗАЦИЯ

Авторизация основана на Firebase. Все настройки и нужные функции хранятся в `/src/firebase`. Данные о пользователе прокидываются на все страницы через контекст `AuthContext`. В профиле пользователя можно обновить имя и аватарку. Страница профиля перенаправляет неавторизованного пользователя на страницу с ошибкой `AuthError.tsx`.

## РОУТИНГ

Роутинг построен на React-router-dom v6. Все настройки в `/src/AppRouter.tsx`. Есть страница 404.

## API.TS

[IGDB API](https://api-docs.igdb.com/#getting-started) даёт доступ к базе данных с видеоиграми. Авторизация работает через функцию `fetchAuth`, которая отсылает `userID` и `clientSecret` на сервер, возвращая с сервера объект в котором хранится `access_token`.

### createConfig()

Асинхронная функция, которая получает объект с авторизацией в переменную `auth` и возвращает конфиг с `baseURL` и `headers`. Должна использоваться перед каждым запросом к API с дальнейшей передачей конфига в `fetch`.

### getData()

Промис, который создаёт тело запроса из пришедших аргументов и отправляет на сервер. Опциональная переменная `signal` используется для отмены запроса.
Пример синтаксиса тела запроса: `fields name,cover.image_id,videos.*,screenshots.*,aggregated_rating; limit 6; sort first_release_date desc; where aggregated_rating > 0;`

Пропсы для настройки запроса(тип `TApiOptions`):

- `endpoint: string` Список доступных ендпоинтов: games, characters, companies, screenshots, artworks;
- `fields: string` Запрашиваемые поля, например: `fields name;`, `fields cover.image screenshots.id;`. Можно запросить все доступные поля, например: `fields *;` или `fields country.*`;
- `search: string` Передаётся поисковая строка и превращается в `search "${search}";`;
- `sort: string` Превращается в `sort ${sort.property} ${sort.order};`. Принимает свойство для сортировки и порядок(`asc`, `desc`). По-умолчанию порядок `asc`;
- `filter: string` Превращается в `where ${filter};`. Пример передаваемой строки для фильтрации: `aggregated_rating > 0;`;
- `limit: number` Ограничение на кол-во элементов;
- `offset: number` С какого элемента выдавать данные. Нужно для пагинации.

### getDataCount()

Промис для получения количества элементов по выбранному эндпоинту с нужными настройками фильтрации. Пример синтаксиса тела запроса: `where genre = 2`.

### getCategories()

Получение названий и id категорий.

## HOOKS

### useGetData()

Получает и возвращает данные с сервера. Также возвращает индикатор загрузки и объект с ошибкой `TError`. Используется `AbortController` для сброса неактуальных запросов.

### useSearch()

Получает поисковую строку и делает запрос к серверу через `getData` с debounce в 300мс. Возвращает данные, объект с ошибкой и вспомогательные стейты: `isLoading`, `isSearching`.

### useKey()

Добавляет и удаляет обработчик событий для клавиш.

### useOutsideClick()

Простой хук для отслеживания клика за пределами переданного элемента.

### usePagesAmount()

Подготавливает и возвращает данные для пагинации: кол-во страниц и номер текущей страницы, добытый из хэша. Для подсчёта страниц получаем кол-во элементов из базы данных через `getDataCount` и делим с округлением на кол-во элементов на одной странице(переменная `fetchLimit`, по умолчанию равна 100).

### useModal()

Хук для использования `ModalContext`.

## МОДАЛЬНЫЕ ОКНА(Modal.tsx)

Модальные окна вставляются через портал в `body` и имеют свой контекст `ModalContext`, который пробрасывает внутрь стейт `isOpened` + `setIsOpened`. Чтобы получить стандартное окно, содержимое модалки можно обернуть в `DefaultModalBlock`.

Для закрытия модалки привязана кнопка Escape.

## ПОИСК(SearchBar.tsx)

Данные приходят через хук `useSearch`. Если загрузка завершилась, но ничего не найдено и нет ошибки, то показывается плашка "No games found". В противном случае выводится сообщение об ошибке, пришедшее из fetch-запроса.

Функция `onReset` используется для кнопки сброса, а также вызывается при смене страницы. Очищает объект с данными и сбрасывает состояние поиска(стейт `isSearching`).

При сабмите формы перекидывает на страницу `Search.tsx`, где из хэша достаётся поисковая строка и делается новый запрос с последующим выводом данных на 500 элементов.

Из поиска можно выйти, нажав на Escape. При нажатии Enter происходит переход на страницу поиска с более полными результатами по выбранному запросу.

## ТАБЫ(Tabs.tsx)

Табы свёрстаны со смещением и наслоением друг на друга скрытых элементов для анимации. Анимация работает за счёт добавления/удаления определённых классов, которые через `translate` смещают табы в нужном направлении:

- `.active` активный таб с `translate(0%)`;
- `.pos-left` таб находится левее активного с `translate(-50%, 0%)`;
- `.pos-right` таб находится правее активного с `translate(50%, 0%)`;
- `.move-out_left` при смене табов, вешается на активный таб и он уходит влево с `translate(-150%, -5%)` и `scale(5%)`;
- `.move-out_right` при смене табов, вешается на активный таб и он уходит вправо с `translate(150%, -5%)` и `scale(5%)`;

Если id(порядковый номер) выбранного таба меньше id активного таба, то активный уходит вправо(на него вешается `.move-out_right`). В противном случае - влево.

В проп `tabs` передаётся массив с заголовками табов. Все вставленные внутрь компонента child-элементы превращаются в табы, оборачиваясь в `div` с добавлением нужных классов. Следует следить чтобы табы шли в том же порядке, что и в массиве `tabs`.

В функцию `toggleTab` вставлен `setTimeout` на 200мс, который не даёт скрыть таб до завершения анимации.

## СЛАЙДЕР(ImageSlider.tsx)

Сначала хотел сделать стандартный вариант с длинной портянкой в которой лежат все картинки в линию и скрываются через `overflow`, но решил сверстать по аналогии с табами со смещением и наложением друг на друга скрытых элементов через `translate`. Анимируется с помощью набора классов:

- `current` выбранная картинка с `translateX(0%)`;
- `prev` предыдущие картинки с `translateX(-100vw)`;
- `next` следующие картинки с `translateX(100vw)`;

Слайдер должен запускаться внутри модалки и занимает весь экран. При нажатии на картинку она открывается полноразмерно в новой вкладке браузера. Обработчик клавиш пока не прикручен.

## ПАГИНАЦИЯ(Pagination.tsx)

Получаем кол-во страниц и id текущей страницы из хука `usePagesAmount`, которые дальше передаются в компонент `Pagination.tsx`, а также используются для создания переадресации, если в адресной строке выбрана несуществующая страница.

Внутри `Pagination.tsx` в `useEffect` наполняем массив страниц через цикл `for` для последующего рендера, используя вспомогательную функцию `fillPagesArray`. Важна переменная `pagesLimit`, которая указывает лимит на кол-во выводимых страниц. При наполнении массива имеется три кейса:

1. `currentPage` меньше установленного лимита `pagesLimit`: выводим страницы от первой до `pagesLimit`. Последняя страница в массиве помечается синим цветом;

   > [!NOTE]
   > Если `pagesLimit = 11`, то выводятся первые 11 страниц.

2. `currentPage` больше или равно `pagesAmount - (pagesLimit - 2)`: выводим последний блок страниц от `pagesAmount - (pagesLimit - 1)` до последней страницы. Первая страница в массиве помечается синим цветом;

   > [!NOTE]
   > Если `pagesLimit = 11`, то выводятся последние 11 страниц.

3. Срединный вариант, когда `currentPage` выводится в центре, а по бокам помещаются страницы в количестве `pagesLimit - 1`. Алгоритм подстраивается под чётное и нечётное значение `pagesLimit`. Первая и последняя страницы в массиве помечаются синим цветом;

   > [!NOTE]
   > Если `pagesLimit = 11`, то начиная с 11-ой страницы `currentPage`выводится в центре.

Чтобы логика работы стала понятней см. реализацию.

### fillPagesArray()

Функция наполняет массив `pagesArray` ссылками, завернутыми в элемент `li`. Принимает `pagesArray`, `page`(номер страницы), `currentPage`(номер текущей страницы для пометки, т. к. `NavLink` в этом случае не помогает).

> [!NOTE]
> Можно было бы встроить `usePagesAmount` в компонент с пагинацией, но раздельный вариант мне показался удобней.

## CardsList.tsx

Основной компонент для вывода карточек. На вход принимает объект `apiOptions`, который далее используется в хуке `useGetData` для получения данных. После данные, вместе с индикатором загрузки и объектом ошибки, передаются в `CardsRender`.

## CardsRender.tsx

При помощи пропа `cardType` можно выводить разные типы карточек: game, character, company. Также можно указать размер(проп `cardSize`): default, compact, mini.

Кнопка лайка пока что реализована только визуально, так как API не поддерживает данный функционал.

## UTILITY FUNCTIONS

### handleFetchResults()

Небольшая функция для минимальной обработки результатов fetch-запросов.

### catchFetchError()

Создаёт объект с ошибкой, который содержит в себе поля `status`, `code`, `message`. Далее выводит ошибку в лог и передаёт её в опциональный `callback`. Входная ошибка может быть, как объектом, так и строкой.

### cutLongString()

Обрезает строку до указанного размера и вставляет заглушку в конце, по умолчанию многоточие. Используется там, где не получается сделать обрезку силами CSS.

### formatDate()

Приводит метку времени к человеческому формату, предварительно конвертируя её в Unix. Можно передать опции для форматирования. Если метка пришла пустая, то возвращает строку "n/a".

## getCountryFromISO()

Получение имени страны по её ISO-коду. Используется библиотека "iso-3166-1". Аргументом `length` можно выбрать один из трёх вариантов имени: full, medium и short. Если код недействителен, то возввращает строку "n/a".

## validateForm()

Простая функция, которая проверяет на валидность инпуты внутри формы и возвращает `false`, если хотя бы один невалиден.

## countPaginationOffset()

Считает сдвиг для пагинации по формуле: `(currentPage - 1) * fetchLimit`.
