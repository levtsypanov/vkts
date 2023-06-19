import moment from "moment";
import bridge from '@vkontakte/vk-bridge';
import { Appearance } from '@vkontakte/vkui';
import { wordPad } from './wordPad';

export const fixTypography = (string: any, wordLength = 3) => {
	if (!string) return;
	let strSplit = string.split(" "); //разбиваем строку на массив
	strSplit = strSplit.map((str: any) => (str.length <= wordLength ? str + "\u00A0" : str + " ")); //если слово 3 символа, вставляем символ пробела
	strSplit = strSplit.join(""); //возвращаем обратно массив в строку

	return strSplit;
};

// pluralize(21, ['пользователь', 'пользователя', 'пользователей'])
export function pluralize(number: number, titles: string) {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

export const FireEvent = (link: any) => {
	const a = document.createElement('a');
	a.href = link;
	a.target = '_blank';
	a.rel = 'noopener noreferrer';

	a.dispatchEvent(new window.MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true
	}));
};

export const schemeChanger = ({ detail: { type, data } }: any) => {
	if (type === 'VKWebAppUpdateConfig') {
		const schemeAttribute = document.createAttribute('scheme');
		schemeAttribute.value = data.scheme ? data.scheme : 'bright_light';
		document.body.attributes.setNamedItem(schemeAttribute);

		switch (data.scheme) {
			case 'bright_light': {
				return bridge.send('VKWebAppSetViewSettings', {
					status_bar_style: 'dark',
				});
			}

			case 'client_light': {
				return bridge.send('VKWebAppSetViewSettings', {
					status_bar_style: 'dark',
				});
			}

			case 'space_gray': {
				return bridge.send('VKWebAppSetViewSettings', {
					status_bar_style: 'light',
				});
			}

			case 'client_dark': {
				return bridge.send('VKWebAppSetViewSettings', {
					status_bar_style: 'light',
				});
			}
			default:
		}
	}
};

export function disableEAndMinusOnKeyDown(e: any) {
	if (["-", "e"].includes(e.key)) e.preventDefault();
}

// Случайное в промежутке
export const randInt = (from: any, to: any) => {
	return Math.floor(Math.random() * (to - from + 1)) + from;
};

// DATE в RUS  DATE
export const rusDate = (date: any) => {
	return moment(date).format('DD.MM.YYYY');
};

export function getLangPlural(key: any, string: any, t: any) {
	return `${key} ${wordPad(key, `${string}.0`, `${string}.1`, `${string}.2`, t)}`
}

export function getCurrencyAmount(e: any) {
	var t = e.split("");
	return +"".concat(t.slice(0, t.length - 2).join(""), ".").concat(t.slice(-2).join(""))
}

/*
	Работа с логами и ошибками в env = development
*/
export function devErrorLog(e: any) {
	if (process.env.NODE_ENV === 'development') {
		console.error(e)
	}
}

export function devLog(any: any) {
	if (process.env.NODE_ENV === 'development') {
		console.log(any)
	}
}

export function throwDevError(error: any) {
	if (process.env.NODE_ENV === 'development') {
		throw error
	}
}

/*
	Проверяет на ретину
*/
export function isRetina() {
	return window.devicePixelRatio > 1
}

/*
	Получает параметры запуска
*/
export function getParams() {
  let params = window
  .location
  .search
  .replace('?','')
  .split('&')
  .reduce(
    function(p: any, e: any){
      var a = e.split('=');
      p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return p;
    },
    {}
  );

  return params;
}

/*
	Получает hash
*/
export function getHash() {
  let itog;
  let params = window
  .location
  .href
  .replace('?','')
  .split('#')

  if (params[1]) {
    itog = params[1]
      .replace('#','')
      .split('&')
      .reduce(
        function(p: any, e: any){
          var a = e.split('=');
          p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
          return p;
        },
        {}
      );
  }

  if (itog) {
    return itog;
  } else {
    return false;
  }
}

/*
	Репост для десктоп версии
*/
export function desktopShare(url: string, image: string, title: string, comment: any = '') {
	let params: any = {
		title: title,
		image: image,
		noparse: "1",
		comment: comment
	};

	let popupName: any = '_blank',
		width = 650,
		height = 610,
		left = Math.max(0, (window.screen.width - width) / 2),
		top = Math.max(0, (window.screen.height - height) / 2),
		surl = 'https://vk.com/share.php?url=' + encodeURIComponent(url),
		popupParams = 'width='+width+',height='+height+',left='+left+',top='+top+',menubar=0,toolbar=0,location=0,status=0',
		popup: any = false;

	try {
		let doc_dom = '', loc_hos = '';
		try {
			doc_dom = document.domain;
			loc_hos = window.location.host;
		} catch (e) {
		}
		if (doc_dom !== loc_hos) {
			let ua = window.navigator.userAgent.toLowerCase();
			if (!/opera/i.test(ua) && /msie/i.test(ua)) {
				_inlineShare(popup, surl, params)
			}
		}
		popup = window.open('', popupName, popupParams);
		let text = '<form accept-charset="UTF-8" action="' + surl + '" method="POST" id="share_form">';
		for (let i in params) {
			text += '<input type="hidden" name="' + i + '" value="' + params[i].toString().replace(/"/g, '&myquot;').replace(/&quot/ig, '&myquot') + '" />';
		}
		text += '</form>';
		text += '<script type="text/javascript">document.getElementById("share_form").submit()</script>';

		text = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' +
			'<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">' +
			'<head><meta http-equiv="content-type" content="text/html; charset=UTF-8" /></head>' +
			'<body>' + text + '</body></html>';
		popup.document.write(text);
		popup.focus();
	} catch (e) { // ie with changed domain.
		_inlineShare(popup, surl, params, popupName, popupParams)
	}
}

export function _inlineShare(popup?: any, surl?: any, params?: any, popupName?: any, popupParams?: any) {
	try {
		if (popup) {
			popup.close();
		}
		surl += '?';
		for (let i in params) {
			surl += encodeURIComponent(i) + '=' + encodeURIComponent(params[i]) + '&';
		}
		popup = window.open(surl, popupName, popupParams);
		popup.focus();
	} catch (e: any) {
		alert("Sharing error: " + e.message)
	}
}

function getQueryVariable(variable: any) {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (window.decodeURIComponent(pair[0]) === variable) {
			return window.decodeURIComponent(pair[1]);
		};
	};
};

function currentScheme() {
	let query = getQueryVariable("scheme");
	if (query === "amoled") return "amoled";
	if (query === "dark") return Appearance.DARK;
	if (query === "") return Appearance.LIGHT;
	if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) return Appearance.DARK;
		return Appearance.LIGHT;
	};
	return Appearance.LIGHT;
};

function getPlatform() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(window.navigator.userAgent)) {
		return 'phone';
	} else return "computer";
};

function copy(text: string) {
	let dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	dummy.value = text;
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
};

/*
	Получает Android версию
*/
export function getAndroidVersion() {
	let ua = (window.navigator.userAgent).toLowerCase();
	// eslint-disable-next-line
	let match = ua.match(/android\s([0-9\.]*)/);
	if (ua.indexOf('chrome/6') !== -1) {
		return false
	}
	return match ? parseInt(match[1], 10) : false
}

/*
	Получает iOS версию
*/
export function getIosVersion() {
	if (/iP(hone|od|ad)/.test(navigator.platform)) {
		let v: any = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		return parseInt(v[1], 10)
	} else {
		return false
	}
}

/*
	Проверка на поддерживаемые версии iOS и Android

export function isDeviceSupported() {
	return !(getAndroidVersion() && getAndroidVersion() <= 4) || (getIosVersion() && getIosVersion() <= 8)
}
*/

/*
	Сортирует объект по ключу
*/
export function dynamicSort(property: any) {
	let sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a: any, b: any) {
		let result = (a[property] > b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}

/*
	Разбивает массив на чанки
*/
export function chunk(arr: any, chunkSize: any) {
	let R = [];
	for (let i=0; i<arr.length; i+=chunkSize)
			R.push(arr.slice(i,i+chunkSize));
		return R;
}

/*
	Убирает повторы из массива возвращает новый без повторов
*/
export function unique(arr: any) {
  let obj: any = {};

  for (let i = 0; i < arr.length; i++) {
	let str = arr[i];
	obj[str] = true;
  }
  return Object.keys(obj);
}

/*
	Склонение по числительному titles = ['подписчик', 'подписчика', 'подписчиков']
*/
export function declOfNum(number: any, titles: any) {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

/*
	Развернуть приложение во весь экран
*/
export function fullScreen() {
	let elem: any = document.querySelector("html");
	if (!document.fullscreenElement) {
		elem.requestFullscreen().catch((err: any) => {
			devLog(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
		});
	} else {
		document.exitFullscreen();
  	}
}

/*
	Проверяет есть ли ключ в объекте, если есть возвращает его значение.
*/
export function isKeyInObj(obj: any, key: any) {
	//
	if (obj) {
		if (typeof obj[key] !== "undefined") {
			return obj[key]
		} else {
			return false
		}
	} else {
		return false
	}
}

/*
	Устанавливает переменную в LocalStorage
*/
export function setLocalStorage(key: any, val: any) {
	try {
		if (typeof window.localStorage !== 'undefined') {
			localStorage.setItem(key, val);
		} else {
			console.log('localStorage не поддерживается')
		}
	} catch (e) {
		console.log(e)
	}
}

/*
	Получает значение переменной из LocalStorage
*/
export function getLocalStorage(key: any) {
	try {
		if (typeof window.localStorage !== 'undefined') {
			let item  = localStorage.getItem(key)
			return item;
		} else {
			return false;
		}
	} catch (e) {
		console.log(e)
		return false;
	}
}

/*
	Ищет объект в массиве объектов по ид объекта
*/
export function findObjectById(arr: any, _id: any) {
	const obj = arr.find(({id}: any) => {
		return (id === _id) ? true : false
	})
	if (obj) {
		return obj
	} else {
		return false
	}
}

/*
	Ищет индекс объекта в массиве объектов по ид объекта
*/
export function findObjectIndex(arr: any, _id: any) {
	const index = arr.findIndex(({id}: any) => {
		return (id === _id) ? true : false
	})
	if (index !== -1) {
		return index
	} else {
		return false
	}
}

/*
	Получает большое число для request id
*/
export function getNewRequestId() {
	return (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString();
}

/*
	Является ли строка валидным json
*/
export function isJsonString(str: any) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}


export {
	getQueryVariable,
	currentScheme,
	getPlatform,
	copy,
};
