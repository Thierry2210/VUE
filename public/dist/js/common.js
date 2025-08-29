BASE = 'http://localhost/VUE';

var browsers = ["Opera", "Edg", "Chrome", "Safari", "Firefox", "MSIE", "Trident"];
var userbrowser, useragent = navigator.userAgent;
for (var i = 0; i < browsers.length; i++) {
  if (useragent.indexOf(browsers[i]) > -1) {
    userbrowser = browsers[i];
    break;
  }
}
;

switch (userbrowser) {
  case 'MSIE':
    userbrowser = 'Internet Explorer';
    break;

  case 'Trident':
    userbrowser = 'Internet Explorer';
    break;

}

if (userbrowser == 'Internet Explorer') {
  // alert("Este Navegador não suporta o Sistema de Requisições, utilize outro navegador");
  window.location.href = BASE + "/explorerErro/";
}


function alertPermissao() {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  toastr.error("Você não tem Permissão neste item do Menu!");

}


function preload(obj) {
  $(obj).block({
    message: '<img src="' + BASE + '/public/images/pre2.gif" height="100" alt=""></a>',
    css: {border: '0', backgroundColor: ''}
  });
}

function unblock(obj) {
  $(obj).unblock();
}

function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
}


function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function strToJsDate(str) {
  $arr = str.split(' ');
  return new Date($arr[0], parseInt($arr[1]) - 1, $arr[2], $arr[3], $arr[4], $arr[5]);
}

function jsDateToStr(date) {
  const ano = date.getFullYear();
  const mes = ("00" + (date.getMonth() + 1)).slice(-2);
  const dia = ("00" + date.getDate()).slice(-2);
  const hora = ("00" + date.getHours()).slice(-2);
  const minuto = ("00" + date.getMinutes()).slice(-2);
  const segundo = ("00" + date.getSeconds()).slice(-2);

  return `${ano} ${mes} ${dia} ${hora} ${minuto} ${segundo}`;
}

var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

function removerPontuacao(string) {
  return string.replace(regex, '');
}

function isValidCPF(cpf) {
  // Validar se é String
  if (typeof cpf !== 'string') return false

  // Tirar formatação
  cpf = cpf.replace(/[^\d]+/g, '')

  // Validar se tem tamanho 11 ou se é uma sequência de digitos repetidos
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false

  // String para Array
  cpf = cpf.split('')

  const validator = cpf
    // Pegar os últimos 2 digitos de validação
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    // Transformar digitos em números
    .map( el => +el )

  const toValidate = pop => cpf
    // Pegar Array de items para validar
    .filter((digit, index, array) => index < array.length - pop && digit)
    // Transformar digitos em números
    .map(el => +el)

  const rest = (count, pop) => (toValidate(pop)
      // Calcular Soma dos digitos e multiplicar por 10
      .reduce((soma, el, i) => soma + el * (count - i), 0) * 10)
    // Pegar o resto por 11
    % 11
    // transformar de 10 para 0
    % 10

  return !(rest(10,2) !== validator[0] || rest(11,1) !== validator[1])
}

function maskTelefone(v) {
  if (v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      r = r.replace(/^(\d*)/, "($1");
    }
    return r;
  }
}

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (Array.isArray(obj[p])) {
      if (obj[p].length > 0) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    } else {
      if (obj.hasOwnProperty(p) && obj[p] !== '' && obj[p] !== null) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }

  return str.join("&");
}

function formatarBytes (bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
