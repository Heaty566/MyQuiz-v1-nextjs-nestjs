(this["webpackJsonpmyquiz-client"]=this["webpackJsonpmyquiz-client"]||[]).push([[4],{111:function(e,t,a){"use strict";a.r(t);var n=a(86),r=a(87),c=a(81),i=a(0),o=a.n(i),u=a(93),s=a(22),l=a(19),m=a(20),b=function(e){var t=e.quiz,a=e.currentQuestion,n=void 0===a?0:a,r=e.handleOnChangeQuestion,b=e.correctAnswer,f=e.handleSelectAnswer,d=e.currentSelect,_=void 0===d?[]:d,O=e.isShowScore,j=e.score,v=e.handleOnSubmitExam,E=n+1,h=Object(l.b)(m.b),p=Object(i.useState)(!1),y=Object(c.a)(p,2),N=y[0],q=y[1],g=Object(i.useState)(!1),k=Object(c.a)(g,2),w=k[0],S=k[1],x=Object(i.useState)(0),z=Object(c.a)(x,2),A=z[0],C=z[1];return Object(i.useEffect)((function(){C(t.time)}),[t.time]),Object(i.useEffect)((function(){A<=-1&&(S(!0),v())}),[A,v]),Object(i.useEffect)((function(){var e;return N&&(e=setInterval((function(){C(A-1)}),1e3)),w&&clearInterval(e),function(){clearInterval(e)}}),[N,A,w]),o.a.createElement("div",{className:"take-quiz"},o.a.createElement("div",{className:"take-quiz__header"},o.a.createElement("h2",{className:"take-quiz__title"},t.name),o.a.createElement("div",{className:"take-quiz__header-right"},o.a.createElement("p",{className:"take-quiz__timer"},Object(u.a)(A)),o.a.createElement("button",{className:"btn btn__link",onClick:function(){return r(n-1)}},"Back"),o.a.createElement("button",{className:"btn btn__link",onClick:function(){return r(n+1)}},"Next"))),o.a.createElement("div",{className:"take-quiz__body"},o.a.createElement("div",{className:"take-quiz__question"},o.a.createElement("p",null,"".concat(E," / ").concat(t.questions.length," ---  please choose ").concat(b.length)),o.a.createElement("h3",null,t.questions[n].question)),o.a.createElement("div",{className:"take-quiz__answer"},t.questions[n].answers.map((function(e,t){var a="take-quiz__btn"+(_.includes(t)?" take-quiz__btn--select":"");return o.a.createElement("button",{className:a,key:t,onClick:function(){return f(t)}},e)}))),o.a.createElement("button",{className:"btn btn__link",onClick:function(){S(!0)}},"Submit Exam")),w&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"exam__modal__masking"}),o.a.createElement("div",{className:"exam__modal"},o.a.createElement("div",{className:"exam__wrapper"},o.a.createElement("div",{className:"card card__bg exam__modal__card"},o.a.createElement("h3",{className:"card__title"},"Are you sure"),o.a.createElement("div",{className:"card__body"},o.a.createElement("p",{className:"card__text"},"Time remaining: ",Object(u.a)(A))),o.a.createElement("div",{className:"card__body"},o.a.createElement("button",{className:"btn btn__link",onClick:function(){v()}},"Yes"),o.a.createElement("button",{className:"btn btn__link",onClick:function(){S(!1)}},"No")))))),w&&O&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"exam__modal__masking"}),o.a.createElement("div",{className:"exam__modal"},o.a.createElement("div",{className:"exam__wrapper"},o.a.createElement("div",{className:"card card__bg exam__modal__card"},o.a.createElement("h3",{className:"card__title"},"Thank for ",h.fullName),o.a.createElement("div",{className:"card__body"},o.a.createElement("p",{className:"card__text"},"Your score: ",(100*j).toFixed(2),"%"," ")),o.a.createElement(s.b,{to:"/home",className:"btn btn__link"},"Go Back"))))),!N&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"exam__modal__masking"}),o.a.createElement("div",{className:"exam__modal"},o.a.createElement("div",{className:"exam__wrapper"},o.a.createElement("div",{className:"card card__bg exam__modal__card"},o.a.createElement("h3",{className:"card__title"},t.name),o.a.createElement("div",{className:"card__body"},o.a.createElement("p",{className:"card__text"},t.questions.length," Questions"),o.a.createElement("p",{className:"card__text"},Object(u.a)(t.time))),o.a.createElement("button",{className:"btn btn__link",onClick:function(){q(!0)}},"Start"))))))},f=a(2),d=a(34),_=a(28),O=a(23);a(99),a(92),t.default=function(){var e=Object(f.i)(),t=Object(l.b)(d.b),a=Object(i.useState)(0),u=Object(c.a)(a,2),s=u[0],m=u[1],j=Object(i.useState)([]),v=Object(c.a)(j,2),E=v[0],h=v[1],p=Object(i.useState)([]),y=Object(c.a)(p,2),N=y[0],q=y[1],g=Object(i.useState)(t.quiz),k=Object(c.a)(g,2),w=k[0],S=k[1],x=Object(i.useState)([]),z=Object(c.a)(x,2),A=z[0],C=z[1],I=Object(i.useState)(0),P=Object(c.a)(I,2),Q=P[0],D=P[1],F=Object(i.useState)(!1),M=Object(c.a)(F,2),T=M[0],B=M[1];Object(i.useEffect)((function(){var e=[];w.questions.forEach((function(){e.push([])})),C(e)}),[w.questions]);Object(i.useEffect)((function(){var e=Object(r.a)(Object(r.a)({},t.quiz),{},{questions:Object(n.a)(t.quiz.questions).sort((function(){return Math.random()-.5})).map((function(e,t){var a=e.correctAnswer.map((function(t){return e.answers[t]})),c=Object(n.a)(e.answers).sort((function(){return Math.random()-.5})),i=a.map((function(e){return c.indexOf(e)}));return Object(r.a)(Object(r.a)({},e),{},{answers:c,correctAnswer:i})}))});S(e)}),[t.quiz]),Object(i.useEffect)((function(){O.a.dispatch(Object(_.b)({quizId:e.quizId,type:"learn"}))}),[e]),Object(i.useEffect)((function(){h(w.questions[s].correctAnswer)}),[s,w]);Object(i.useEffect)((function(){q(A[s])}),[s,A]);return o.a.createElement(b,{quiz:w,handleOnSubmitExam:function(){var e=A.map((function(e,t){var a=0,n=0;return e.forEach((function(e){w.questions[t].correctAnswer.includes(e)?a++:n++})),a-n<0?0:(a-n)/w.questions[t].correctAnswer.length})).reduce((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;return e+t}))/w.questions.length;D(e),B(!0)},currentQuestion:s,correctAnswer:E,handleOnChangeQuestion:function(e){e>=0&&e<=t.quiz.questions.length-1&&m(e)},handleSelectAnswer:function(e){var t=Object(n.a)(N);t=N.includes(e)?t.filter((function(t){return t!==e})):[].concat(Object(n.a)(t),[e]);var a=Object(n.a)(A);a[s]=t,C(a),q(t)},currentSelect:N,score:Q,isShowScore:T})}},81:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(82);function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,r=!1,c=void 0;try{for(var i,o=e[Symbol.iterator]();!(n=(i=o.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(u){r=!0,c=u}finally{try{n||null==o.return||o.return()}finally{if(r)throw c}}return a}}(e,t)||Object(n.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},82:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(83);function r(e,t){if(e){if("string"===typeof e)return Object(n.a)(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(n.a)(e,t):void 0}}},83:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}a.d(t,"a",(function(){return n}))},85:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return n}))},86:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(83);var r=a(82);function c(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},87:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(85);function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}},92:function(e,t,a){},93:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=function(e){var t=Math.floor(e/60),a=e%=60,n=t?"".concat(t,"m:"):"";return n+=a?"".concat(a,"s"):"0s"}},99:function(e,t,a){}}]);
//# sourceMappingURL=4.b0203f74.chunk.js.map