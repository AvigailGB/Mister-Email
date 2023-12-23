
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    getDefaultFilter
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function getDefaultFilter() {
    return {
        txt: '',
        isRead:false,
        isStarred:false,
        disply: 'to',
        trash:false
    }
}


function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}