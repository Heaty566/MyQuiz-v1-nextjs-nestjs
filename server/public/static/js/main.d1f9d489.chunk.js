(this["webpackJsonpmyquiz-client"]=this["webpackJsonpmyquiz-client"]||[]).push([[1],{13:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a=n(18),r=n.n(a);r.a.defaults.baseURL="https://demomyquizapi.herokuapp.com/api",r.a.defaults.withCredentials=!0;var u={get:r.a.get,post:r.a.post,put:r.a.put,delete:r.a.delete}},20:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return s}));var a=n(4),r=n(26),u=n.n(r),i=n(24),c=Object(a.c)({name:"User",initialState:{isLogin:!1,fullName:"",isTeacher:!1,avatarUrl:""},reducers:{logoutUser:function(e,t){t.type;e.fullName="",e.isLogin=!1,u.a.remove("token")}},extraReducers:function(e){e.addCase(i.a.fulfilled,(function(e,t){var n=t.payload,a=n.fullName,r=n.isTeacher,u=n.avatarUrl;e.fullName=a,e.isTeacher=r,e.isLogin=!0,e.avatarUrl=u})),e.addCase(i.b.fulfilled,(function(e,t){var n=t.payload,a=n.fullName,r=n.isTeacher;e.fullName=a,e.isTeacher=r}))}}),o={logoutUser:c.actions.logoutUser};t.a=c.reducer;var s=function(e){return e.auth}},23:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n(7),r=n(4),u=n(20),i=n(3),c=n(34),o=Object(a.c)({quiz:c.a}),s=Object(a.c)({auth:u.a,api:i.c,entities:o}),l=Object(r.a)({reducer:s})},24:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return l}));var a=n(10),r=n.n(a),u=n(17),i=n(4),c=n(3),o=n(13),s=Object(i.b)("user",function(){var e=Object(u.a)(r.a.mark((function e(t,n){var a,u;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.rejectWithValue,e.prev=1,e.next=4,o.a.get("/user");case 4:return u=e.sent,e.abrupt("return",u.data.data);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",a({}));case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,n){return e.apply(this,arguments)}}()),l=Object(i.b)("updateUser",function(){var e=Object(u.a)(r.a.mark((function e(t,n){var a,u,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.input,u=n.dispatch,i=n.rejectWithValue,u({type:c.a.newApiCall.type}),e.next=5,o.a.put("/user/profile",a).then((function(e){var t=e.data;return u({type:c.a.updateReponse.type,payload:{message:t.message}}),t.data})).catch((function(e){var t=e.response,n=t.data,a=t.statusText;return u({type:c.a.updateError.type,payload:{error:n,meesage:a}}),i({})})).finally((function(){u({type:c.a.apiResponse.type})}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())},28:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"c",(function(){return l})),n.d(t,"b",(function(){return p}));var a=n(10),r=n.n(a),u=n(17),i=n(4),c=n(3),o=n(13),s=Object(i.b)("createNewQuiz",function(){var e=Object(u.a)(r.a.mark((function e(t,n){var a,u,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.input,u=n.dispatch,i=n.rejectWithValue,u({type:c.a.newApiCall.type}),e.next=5,o.a.post("/quiz",a).then((function(e){var t=e.data;return u({type:c.a.updateReponse.type,payload:{message:"Quiz added"}}),t.data})).catch((function(e){var t=e.response.data;return u({type:c.a.updateError.type,payload:{error:t,message:"Please check your form, something goes wrong ( We will add more details about error form in the next version, sorry for inconvenience )"}}),i({})})).finally((function(){u({type:c.a.apiResponse.type})}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),l=Object(i.b)("searchQuiz",function(){var e=Object(u.a)(r.a.mark((function e(t,n){var a,u;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.input,(u=n.dispatch)({type:c.a.newApiCall.type}),e.next=5,o.a.get("/quiz/search/".concat(a)).then((function(e){return e.data})).finally((function(){u({type:c.a.apiResponse.type})}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),p=Object(i.b)("getQuizById",function(){var e=Object(u.a)(r.a.mark((function e(t,n){var a,u,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.quizId,u=t.type,(i=n.dispatch)({type:c.a.newApiCall.type}),e.next=5,o.a.get("/quiz/".concat(a,"/").concat(u)).then((function(e){return e.data})).finally((function(){i({type:c.a.apiResponse.type})}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())},3:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return c}));var a=n(4),r=Object(a.c)({name:"RequestState",initialState:{isLoading:!1,isError:!1,message:"",errors:{},type:"learn"},reducers:{refreshApi:function(e,t){e.isError=!1,e.isLoading=!1,e.message="",e.errors={}},newApiCall:function(e,t){e.isLoading=!0,e.isError=!1,e.message="",e.errors={}},changeType:function(e,t){t.type;var n=t.payload;e.type=n.type},updateReponse:function(e,t){t.type;var n=t.payload;e.message=n.message},updateError:function(e,t){t.type;var n=t.payload,a=n.error,r=n.message;e.isError=!0,e.message=r,e.errors=a},apiResponse:function(e,t){e.isLoading=!1}}}),u=r.actions,i={apiResponse:u.apiResponse,newApiCall:u.newApiCall,updateError:u.updateError,updateReponse:u.updateReponse,refreshApi:u.refreshApi,changeType:u.changeType};t.c=r.reducer;var c=function(e){return e.api}},34:function(e,t,n){"use strict";n.d(t,"b",(function(){return i}));var a=n(4),r=n(28),u=Object(a.c)({name:"Quiz",initialState:{searchQuizzes:[],quiz:{name:"",questions:[{question:"",answers:[],correctAnswer:[]}],userId:"",time:0,user:{avatar:"",fullName:""}}},reducers:{},extraReducers:function(e){e.addCase(r.b.fulfilled,(function(e,t){var n=t.payload;e.quiz=n})),e.addCase(r.c.fulfilled,(function(e,t){var n=t.payload;e.searchQuizzes=n}))}});t.a=u.reducer;var i=function(e){return e.entities.quiz}},35:function(e,t,n){"use strict";var a=n(14),r=n(0),u=n(15),i=n(36);function c(){var e=Object(a.a)(['\n        width: "100%";\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        padding: 8px;\n']);return c=function(){return e},e}var o=u.a.div(c());t.a=function(){return r.createElement(o,null,r.createElement(i.a,{height:"40",width:"40"}))}},36:function(e,t,n){"use strict";var a=n(14),r=n(0),u=n(15);function i(){var e=Object(a.a)(["\n        animation: "," 1s infinite linear;\n"]);return i=function(){return e},e}function c(){var e=Object(a.a)(["\n        0% {\n                transform: rotate(0deg);\n        }\n        100% {\n                transform: rotate(360deg);\n        }\n"]);return c=function(){return e},e}var o=Object(u.b)(c()),s=u.a.svg(i(),o);t.a=function(e){var t=e.height,n=void 0===t?"50":t,a=e.width,u=void 0===a?"50":a;return r.createElement(s,{width:u,height:n,viewBox:"0 0 24 24",fill:"none"},r.createElement("path",{d:"M24 12C24 14.5342 23.1977 17.0033 21.7082 19.0534C20.2187 21.1036 18.1183 22.6296 15.7082 23.4127C13.2981 24.1958 10.7019 24.1958 8.2918 23.4127C5.88167 22.6296 3.78133 21.1036 2.2918 19.0534C0.802259 17.0033 -2.21542e-07 14.5342 0 12C2.21543e-07 9.46585 0.80226 6.99675 2.2918 4.94658C3.78133 2.8964 5.88168 1.37042 8.2918 0.587321C10.7019 -0.195774 13.2981 -0.195774 15.7082 0.587322L14.9666 2.86986C13.0385 2.24338 10.9615 2.24338 9.03344 2.86986C7.10534 3.49633 5.42507 4.71712 4.23344 6.35726C3.04181 7.9974 2.4 9.97268 2.4 12C2.4 14.0273 3.04181 16.0026 4.23344 17.6427C5.42507 19.2829 7.10534 20.5037 9.03344 21.1301C10.9615 21.7566 13.0385 21.7566 14.9666 21.1301C16.8947 20.5037 18.5749 19.2829 19.7666 17.6427C20.9582 16.0026 21.6 14.0273 21.6 12H24Z",fill:"#2196F3"}))}},52:function(e,t,n){e.exports=n(80)},57:function(e,t,n){},80:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(25),i=n.n(u),c=n(2),o=(n(57),n(35)),s=n(14);function l(){var e=Object(s.a)(["\n        min-height: 100vh;\n        width: 100%;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n"]);return l=function(){return e},e}var p=n(15).a.div(l()),f=function(){return a.createElement(p,null,a.createElement("div",{className:"page__loading"}),";")},d=n(27),m=n(20),h=n(19),y=function(e){var t=e.Component,n=Object(d.a)(e,["Component"]),u=Object(h.b)(m.b),i=Object(c.g)();return Object(a.useEffect)((function(){u.isLogin||i.push("/user/login")}),[i,u.isLogin]),r.a.createElement(t,n)},b=function(e){var t=e.Component,n=Object(d.a)(e,["Component"]),u=Object(h.b)(m.b),i=Object(c.g)();return Object(a.useEffect)((function(){u.isLogin&&i.push("/home")}),[i,u.isLogin]),r.a.createElement(t,n)},v=n(3),g=n(23),E=r.a.lazy((function(){return n.e(12).then(n.bind(null,102))})),z=r.a.lazy((function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,108))})),j=r.a.lazy((function(){return n.e(11).then(n.bind(null,109))})),C=r.a.lazy((function(){return n.e(6).then(n.bind(null,106))})),w=r.a.lazy((function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,104))})),O=r.a.lazy((function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,105))})),q=r.a.lazy((function(){return n.e(5).then(n.bind(null,110))})),x=r.a.lazy((function(){return n.e(4).then(n.bind(null,111))})),R=r.a.lazy((function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,107))})),k=function(){var e=Object(c.h)();return Object(a.useEffect)((function(){window.scrollTo(0,0),g.a.dispatch({type:v.a.refreshApi.type})}),[e.pathname]),r.a.createElement("div",{className:"App typography"},r.a.createElement(a.Suspense,{fallback:r.a.createElement(f,null)},r.a.createElement(w,null),r.a.createElement("main",{className:"container"},r.a.createElement(c.d,null,r.a.createElement(c.b,{path:"/home",component:C}),r.a.createElement(b,{path:"/user/login",Component:j}),r.a.createElement(b,{path:"/user/register",Component:j}),r.a.createElement(y,{path:"/user/profile",Component:z}),r.a.createElement(y,{path:"/quiz/new",exact:!0,Component:O}),r.a.createElement(c.b,{path:"/quiz/search/:type/:name/:page",component:R}),r.a.createElement(c.a,{path:"/quiz/search/:type/:name",to:"/quiz/search/learn/:name/1"}),r.a.createElement(c.b,{path:"/quiz/:quizId/learn",component:q}),r.a.createElement(c.b,{path:"/quiz/:quizId/exam",component:x}),r.a.createElement(c.a,{path:"/quiz/:quizId",to:"/quiz/:quizId/exam"}),r.a.createElement(c.a,{from:"/",to:"/home"}))),r.a.createElement(a.Suspense,{fallback:r.a.createElement(o.a,null)},r.a.createElement(E,null))))},A=n(22),L=n(24),N=n(26),T=n.n(N);n(13);T.a.get("token")&&g.a.dispatch(Object(L.a)({})),i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(A.a,null,r.a.createElement(h.a,{store:g.a},r.a.createElement(k,null)))),document.getElementById("root"))}},[[52,2,3]]]);
//# sourceMappingURL=main.d1f9d489.chunk.js.map