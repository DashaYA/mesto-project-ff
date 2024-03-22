(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}var n=function(e){"Escape"===e.code&&t(document.querySelector(".popup_is-opened"))};function r(e){e.target.classList.contains("popup")&&t(e.target)}var o={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-8",headers:{authorization:"082b727e-c263-4b3e-be6e-05bc6fbfaf4a","Content-Type":"application/json"}},c=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},a=function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then((function(e){return c(e)}))};function u(e,t,n,r){var a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=a.querySelector(".card__image"),l=a.querySelector(".card__title"),s=a.querySelector(".card__delete-button");u.src=t.link,u.alt="фотография "+t.caption,l.textContent=t.caption;var d=t._id;u.addEventListener("click",(function(){r(t.link,t.caption)})),e!==t.owner._id?s.addEventListener("click",(function(){n(d,a)})):s.remove(),a.querySelector(".card__like-counter").textContent=t.likes.length;var p=a.querySelector(".card__like-button");return p.addEventListener("click",(function(e){p.classList.contains("card__like-button_is-active")?function(e,t){(function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers}).then((function(e){return c(e)}))})(t).then((function(t){e.target.closest(".card__like").querySelector(".card__like-counter").textContent=t.likes.length,e.target.classList.remove("card__like-button_is-active")})).catch((function(e){console.log(e)}))}(e,d):i(e,d)})),t.likes.some((function(t){return t._id===e}))&&p.classList.add("card__like-button_is-active"),a}function i(e,t){a(t).then((function(t){e.target.closest(".card__like").querySelector(".card__like-counter").textContent=t.likes.length,e.target.classList.add("card__like-button_is-active")})).catch((function(e){console.log(e)}))}function l(e,t){(function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers}).then((function(e){return c(e)}))})(e).then((function(){t.remove()})).catch((function(e){console.log(e)}))}var s={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function d(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.inputErrorClass),r.textContent=""}function p(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function f(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){n.setCustomValidity(""),d(e,n,t)}));var n=e.querySelector(t.submitButtonSelector);n.disabled=!0,n.classList.add(t.inactiveButtonClass)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then((function(e){return c(e)})),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then((function(e){return c(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1],a=o._id;j.textContent=o.name,O.textContent=o.about,T.style.backgroundImage="url('".concat(o.avatar,"')"),c.forEach((function(e){S.append(u(a,e,h,i))}))})).catch((function(e){console.error(e)}));var y=document.querySelector(".popup_type_image"),m=y.querySelector(".popup__image"),v=y.querySelector(".popup__caption"),h=function(t,n){m.src=t,m.alt=n,v.textContent=n,e(y)},S=document.querySelector(".places__list"),b=document.querySelector(".popup_type_edit");document.querySelectorAll(".popup__close").forEach((function(e){var n=e.closest(".popup");e.addEventListener("click",(function(){return t(n)})),n.addEventListener("mousedown",r)}));var q=document.querySelector(".popup_type_new-card"),C=document.querySelector('.popup__form[name="new-place"]'),g=C.querySelector(".popup__input_type_card-name"),k=C.querySelector(".popup__input_type_url"),E=document.querySelector(".profile__add-button"),L=b.querySelector(".popup__button");E.addEventListener("click",(function(){e(q)})),q.addEventListener("submit",(function(e){var n,r;e.preventDefault(),L.textContent="Сохранение...",(n=g.value,r=k.value,fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return c(e)}))).then((function(e){var n=u("",e,l,h);S.prepend(n),t(q),f(C,s),C.reset()})).catch((function(e){console.error(e)})).finally((function(){L.textContent="Сохранить"}))}));var x=document.querySelector(".profile__edit-button"),A=document.querySelector(".popup__form"),w=A.querySelector(".popup__input_type_name"),U=A.querySelector(".popup__input_type_description"),j=document.querySelector(".profile__title"),O=document.querySelector(".profile__description"),T=document.querySelector(".profile__image");x.addEventListener("click",(function(){f(b,s),w.value=j.textContent,U.value=O.textContent,e(b)})),A.addEventListener("submit",(function(e){e.preventDefault(),L.textContent="Сохранение...";var n=w.value,r=U.value;(function(e,t){return fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return c(e)}))})(j,O).then((function(){j.textContent=n,O.textContent=r})).catch((function(e){console.error(e)})).finally((function(){L.textContent="Сохранить"})),t(b)}));var B=document.querySelector(".popup__edit_avatar"),P=document.forms["edit-avatar"],D=B.querySelector(".popup__input_type_avatar");T.addEventListener("click",(function(){e(B)})),B.addEventListener("submit",(function(e){var n;e.preventDefault(),L.textContent="Сохранение...",(n=D.value,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:n})}).then((function(e){return c(e)}))).then((function(){T.style.backgroundImage="url('".concat(D.value,"')"),t(B)})).catch((function(e){console.error(e)})).finally((function(){L.textContent="Сохранить",P.reset(),f(P,s)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(t,e)}))}(s)})();