https://github.com/AleksandraVel/web-larek-frontend.git

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/Pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

# Архитектура проекта

## Проект использует паттерн MVP (Model-View-Presenter) для разделения ответственностей между классами:

- Данные (Model):
 Класс AppState отвечает за хранение и управление данными приложения.
- Слой отображения (View):
 Классы Page, Card, CardPreview, Basket, Order, ContactForm и SuccessModal отвечают за отображение интерфейса для взаимодействия с пользователем.
- Presenter:
 Класс EventEmitter связывают Model и View, координируя их взаимодействие. 

# Описание интерфейса

- Просмотр каталога карточек товаров.
- Просмотр выбраной карточки товара.
- Оформление заказа. 

## Карточки товаров:
 
 Данные о товаре:
- Название
- Описание
- Цена
- Изображение

## Формы :
- форма оплаты (Способ оплаты)
- форма контактов (Адрес доставки, email, телефон)
- окно условной покупки (корзина)

# Описание базовых классов, их предназначение и функции

## class Api

Класс для работы с API. Отвечает за выполнение HTTP-запросов.
Предоставляет методы для получения, создания, обновления и удаления данных.

- constructor(baseUrl: string, options: RequestInit = {}): Создает экземпляр класса Api с заданным базовым URL-адресом и дополнительными опциями для запросов.
- baseUrl: Строка, содержащая базовый URL-адрес для API.
- options: Объект RequestInit, содержащий дополнительные опции для запросов, такие как заголовки.

Методы:
- protected handleResponse(response: Response): Promise<object>: Обрабатывает ответ от API и возвращает Promise с данными в формате объекта. В случае ошибки возвращает Promise с ошибкой.
- get(uri: string): Promise<object>: Выполняет GET-запрос к API по указанному URI и возвращает Promise с данными в формате объекта.
- post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>: Выполняет POST, PUT или DELETE-запрос к API по указанному URI с переданными данными и возвращает Promise с данными в формате объекта.

## class EventEmitter (Presenter)

Класс EventEmitter выступает в роли Представителя (Presenter).
Реализует механизм событий, позволяющий классам взаимодействовать друг с другом.
Предоставляет методы для подписки, отписки и вызова обработчиков событий.

Mетоды:
- on: Установить обработчик на событие.
- off: Снять обработчик с события.
- emit: Инициировать событие с данными.
- onAll: Слушать все события.
- offAll: Сбросить все обработчики.
- trigger: Сделать коллбек триггер, генерирующий событие при вызове.

## class AppState (Model)

Класс AppState отвечает за хранение и обработку данных приложения.
Предоставляет методы для взаимодействия с данными.
Генерирует события при изменении данных.

Свойства:
- products: Array<Product> - массив данных о товарах
- basket: Array<BasketItem> - массив товаров в корзине
- orders: Array<OrderData> - массив данных о заказах

Методы:
- addToBasket(product: Product): void - добавляет товар в корзину
- removeFromBasket(product: Product): void - удаляет товар из корзины
- setProducts(products: Product[]): void - заменяет массив товаров.
- emitChanges(event: string, payload?: object): void - сообщает всем что модель поменялась.

События:
'add-to-basket' - генерируется при добавлении товара в корзину.
'remove-from-basket' - генерируется при удалении товара из корзины.
'get-products' - генерируется при установке массива товаров.

## class Component

Класс Component является абстрактным базовым компонентом, от которого наследуются все остальные компоненты в проекте. Он содержит общие методы для работы с DOM и предоставляет инструменты для управления отображением интерфейса.

 ### Конструктор
 typescript
protected constructor(protected readonly container: HTMLElement)
Принимает контейнер (DOM-элемент), в котором будет отображаться компонент.

Методы :

- toggleClass(element: HTMLElement, className: string, force?: boolean): Переключает класс у указанного элемента.
- setText(element: HTMLElement, value: unknown): Устанавливает текстовое содержимое указанного элемента.
- setDisabled(element: HTMLElement, state: boolean): Устанавливает или снимает блокировку для указанного элемента.
- setHidden(element: HTMLElement): Скрывает указанный элемент.
- setVisible(element: HTMLElement): Показывает указанный элемент.
- setImage(element: HTMLImageElement, src: string, alt?: string): Устанавливает изображение с альтернативным текстом для указанного элемента.
- render(data?: Partial<T>): HTMLElement: Возвращает корневой DOM-элемент компонента с возможностью обновления данных.

## class Model

Класс Model является базовой моделью и предазначен для отличия ее от простых объектов данных.  

Методы: 
- constructor: Создает экземпляра с указанными данными и объектом для управления событиями. 
- emitChanges(event: string, payload?: object): Генерирует указанное событие и передает дополнительные данные. 


## class Modal (View)

Класс Modal отвечает за отображение модального окна и управление его содержимым.
Взаимодействует с классами (через презентер) CardPreview, Basket, Order для отображения соответствующего контента.

Методы:
- constructor(modalContainer: HTMLElement): Создает экземпляр класса с заданным контейнером модального окна.
- open(content: HTMLElement): void: Открывает модальное окно и отображает переданный контент.
- close(): void: Закрывает модальное окно.
- setContent(content: HTMLElement): void: Устанавливает новый контент в модальное окно.


## class CardPreview (View)

Класс CardPreview отвечает за отображение подробной информации о товаре в модальном окне.
Получает данные о товаре от класса AppState.

Методы :
- constructor(product: Product): Создает экземпляр класса CardPreview с данными о товаре.
- render(): HTMLElement: Возвращает HTML-элемент, представляющий карточку товара с подробной информацией.
- handleAddToBasket(): void: Обрабатывает событие добавления товара в корзину и инициирует соответствующее событие.
- handleClose(): void: Обрабатывает событие закрытия модального окна и скрывает карточку товара.

## class Page (View)

Класс Page представляет собой главную страницу приложения - галерею товаров. Он не показывается в модальном окне.
Взаимодействует с классом Card (через презентер) для отображения карточек товаров.

Методы:
- constructor(PageContainer: HTMLElement): Создает экземпляр класса с заданным контейнером для галереи.
- renderCards(cards: Card[]): void: Отображает карточки товаров в галерее.
- handleCardClick(card: Card): void: Обрабатывает клик по карточке товара и инициирует событие для отображения модального окна с информацией о товаре.

## class Card (View)

Класс Card представляет собой карточку товара в галерее.
Отвечает за отображение информации о товаре.
Генерирует события при взаимодействии пользователя с карточкой (клик, добавление в корзину).

Методы:
- constructor(data: CardData): Создает экземпляр класса с данными о товаре.
- render(): HTMLElement: Возвращает HTML-элемент, представляющий карточку товара.
- handleClick(): void: Обрабатывает клик по карточке товара и инициирует событие для отображения модального окна с информацией о товаре.

## class Basket (View)

Класс Basket отвечает за отображение корзины в модальном окне.
Он отображает список товаров в корзине и позволяет удалять товары из корзины.
Взаимодействует с классом AppState для управления товарами в корзине.

Методы:
- constructor(basketContainer: HTMLElement): Создает экземпляр класса с заданным контейнером для корзины.
- addItem(item: BasketItem): void: Добавляет товар в корзину.
- removeItem(item: BasketItem): void: Удаляет товар из корзины.
- renderItems(): void: Отображает список товаров в корзине.
- getTotalPrice(): number: Возвращает общую стоимость товаров в корзине.

## class Form (View)

Класс Form является компонентом, отвечающим за отображение и управление формой на странице. Он содержит методы для валидации и отправки данных формы, а также обработчики событий для взаимодействия с другими компонентами.

Свойства:
- container: HTMLFormElement - DOM-элемент формы
- events: IEvents - объект для работы с событиями формы
Методы:
- constructor(container: HTMLFormElement, events: IEvents): Создает экземпляр класса Form с заданным DOM-элементом формы и объектом для работы с событиями.
- onInputChange(field: keyof T, value: string): Обрабатывает изменение значения поля формы и инициирует соответствующее событие.
- render(state: Partial<T> & IFormState): HTMLElement: Отображает форму на странице и возвращает ее DOM-элемент.
- set valid(value: boolean): Устанавливает состояние валидности формы.
- set errors(value: string): Устанавливает текст ошибки для формы.

## class Order (Form)

Класс Order за отображение форм оформления заказа в модальном окне.
Он отображает формы для ввода информации о доставке и оплате.
Взаимодействует с классом AppState для сохранения данных заказа.

Методы :
- constructor(orderContainer: HTMLElement): Создает экземпляр класса с заданным контейнером для формы заказа.
- renderPaymentForm(): void: Отображает форму выбора способа оплаты.
- renderDeliveryForm(): void: Отображает форму ввода адреса доставки.
- handleSubmit(data: OrderData): void: Обрабатывает отправку формы заказа и инициирует событие для завершения оформления заказа.

## class ContactForm (Form)

Класс ContactForm отображает форму для ввода контактных данных пользователя (email и телефон).
Взаимодействует с классом AppState для сохранения данных пользователя.
(содержит валидацию форм)

Методы:

- constructor(contactContainer: HTMLElement): Создает экземпляр класса с заданным контейнером для формы контактов.
- render(): void: Отображает форму для ввода контактных данных пользователя.
- handleSubmit(data: ContactData): void: Обрабатывает отправку формы контактов и инициирует событие для сохранения данных пользователя.


## class SuccessModal (View)

Класс SuccessModal отвечает за отображение окна с сообщением об успешном оформлении заказа.

Методы:
- constructor(successContainer: HTMLElement): Создает экземпляр класса с заданным контейнером для окна успешного оформления заказа.