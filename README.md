
# getPath - Уникальный CSS-селектор для HTML элемента

Функция `getPath()` генерирует уникальный CSS-селектор для HTML элемента, который может быть использован с `document.querySelector()` для нахождения того же самого элемента. Если используется NodeList (несколько элементов), возвращается массив селекторов для каждого элемента.

## Описание проекта

Функция позволяет находить уникальный селектор элемента, включающий в себя:
- Тег элемента (например, `div`, `span`, и т.д.).
- ID элемента, если он есть.
- Классы элемента, если они присутствуют.
- Псевдоклассы для братских элементов, такие как `:nth-child`, `:first-child` и `:last-child`, если элемент не уникален.

### Пример использования:

```javascript
const element = document.querySelector('.my-element');
const selector = getPath(element);

console.log(selector); // Выводит уникальный селектор, например "body div.my-element"
```

### Пример работы с NodeList:

```javascript
const elements = document.querySelectorAll('.result');
const selectors = getPath(elements);

console.log(selectors); // Выводит массив селекторов для каждого элемента
```

## Установка

1. Клонируйте репозиторий или скачайте архив проекта.
   ```bash
   git clone https://github.com/Prime-GS/OTUS-hw-3.git
   ```

2. Установите зависимости (если используются тесты с Jest).
   ```bash
   npm install
   ```

## Структура проекта

```
.
├── src
│   ├── index.html       # HTML код с которого читаютсься элементы
│   └── script.js        # Основной код функции getPath
├── test
│   └── script.test.js   # Юнит-тесты для функции getPath
├── package.json         # Конфигурационный файл для NPM
└── README.md            # Описание проекта
```

## Тестирование

Проект использует Jest для юнит-тестирования. Чтобы запустить тесты, выполните команду:

```bash
npm test
```

## API

### `getPath(element)`

- **element** (HTMLElement | NodeList) — HTML элемент или NodeList, для которого нужно найти селектор.

**Возвращаемое значение**: 

- Строка с уникальным селектором для одного элемента.
- Массив селекторов, если передан NodeList.
- Возвращает undefined, если передан не HTML элемент.

## Примеры

HTML:

```html
<div class="test">
  <ul class="container">
    <li id="not"></li>
    <li id="element" class="test2">
      <span class="result"></span>
      <span id="not4"></span>
    </li>
    <li id="not2"></li>
    <li id="element" class="test2">
      <span id="not4"></span>
      <span class="result"></span>
    </li>
    <li id="not3"></li>
  </ul>
</div>
```

JavaScript:

```javascript
// Получить уникальный селектор для одного элемента
const singleElement = document.querySelector('.result');
console.log(getPath(singleElement)); 
// Пример вывода: "body div.test ul.container li:nth-child(2) span.result"

// Получить селекторы для всех элементов с классом .result
const allElements = document.querySelectorAll('.result');
console.log(getPath(allElements)); 
// Пример вывода: ["body div.test ul.container li:nth-child(2) span.result", "body div.test ul.container li:nth-child(4) span.result"]
```
