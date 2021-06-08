var gTrans = {
    'header-title': {
        en: 'Book Shop',
        he: 'חנות ספרים',
        ru: 'книжный магазин'
    },
    'btn-add-new-book': {
        en: 'Add New Book',
        he: 'הוסף ספר חדש',
        ru: 'добавить книгу'
    },
    'new-book-name-placeholder': {
        en: 'Book Name',
        he: 'שם הספר',
        ru: 'название'
    },
    'new-book-price-placeholder': {
        en: 'Book Price',
        he: 'מחיר',
        ru: 'цена'
    },
    'btn-new-book-update': {
        en: 'Update',
        he: 'עדכן',
        ru: 'перезагрузить'
    },
    'btn-new-book-close': {
        en: 'Close',
        he: 'סגור',
        ru: 'закрыть'
    },
    'table-id': {
        en: 'Id',
        he: 'ת.ז',
        ru: 'номер'
    },
    'table-book-name': {
        en: 'Name',
        he: 'שם',
        ru: 'название'
    },
    'table-book-price': {
        en: 'Price',
        he: 'מחיר',
        ru: 'цена'
    },
    'table-btns-action': {
        en: 'Action',
        he: 'פעולה',
        ru: 'начать'
    },
    'btn-table-read': {
        en: 'Read',
        he: 'קרא',
        ru: 'читать'
    },
    'btn-table-update': {
        en: 'Update',
        he: 'עדכן מחיר',
        ru: 'ваш заказ'
    },
    'btn-table-price-update':{
        en:'Update',
        he: 'עדכן מחיר',
        ru: 'ваш заказ'
    },
    'btn-table-delete': {
        en: 'Delete',
        he: 'מחק',
        ru: 'очистить корзину'
    },
    'modal-book-name': {
        en: 'Name',
        he: 'שם',
        ru: 'название'
    },
    'modal-book-price': {
        en: 'Price',
        he: 'מחיר',
        ru: 'цена'
    },
    'modal-book-rate': {
        en: 'Rate',
        he: 'דירוג',
        ru: 'рейтинг'
    },
    'btn-modal-rate-update': {
        en: 'Update',
        he: 'עדכן',
        ru: 'перезагрузить'
    },
    'modal-book-desc': {
        en: 'Desc',
        he: 'תיאור',
        ru: 'описание'
    },
    'btn-modal-close':{
        en:'Close',
        he:'סגור',
        ru: 'закрыть'
    },
    'btn-page-prev':{
        en:'Prev page',
        he:'עמוד הקודם',
        ru: 'назад'
    },
    'btn-page-next':{
        en:'Next page',
        he:'עמוד הבא',
        ru: 'вперед'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'
    var txt = keyTrans[gCurrLang];
    if (!txt) return keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var txt = getTrans(el.dataset.trans)
        if (el.name === 'new-book-name' || el.name === 'new-book-price') el.placeholder = txt;
        el.innerText = txt
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}