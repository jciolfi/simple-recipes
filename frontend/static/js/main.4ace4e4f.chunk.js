(this["webpackJsonpinterview-v1"]=this["webpackJsonpinterview-v1"]||[]).push([[0],{13:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(19),s=n.n(a),i=(n(25),n(26),n(11)),j=n(2),l=n(3),o=n.n(l),b=n(8),u=n(5),h=(n(13),n(0));function d(){var e,t=Object(c.useState)({}),n=Object(u.a)(t,2),r=n[0],a=n[1],s=Object(c.useState)(1),i=Object(u.a)(s,2),j=i[0],l=i[1],d=Object(c.useState)([]),O=Object(u.a)(d,2),p=O[0],x=O[1];return Object(c.useEffect)((function(){fetch("http://localhost:8080/playerIds").then(function(){var e=Object(b.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:n=e.sent,x(n.ids),l(n.ids[0]);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]),Object(c.useEffect)((function(){function e(){return(e=Object(b.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:8080/player?playerId=".concat(j));case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,a(n);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[j]),r?Object(h.jsxs)("div",{style:{marginLeft:"20px"},children:[Object(h.jsx)("select",{id:"playerSelector",onChange:function(e){l(e.target.value)},children:p.map((function(e){return Object(h.jsx)("option",{value:String(e),children:e},e)}))}),Object(h.jsx)("br",{}),Object(h.jsx)("b",{children:"Name: "}),r.playerName,Object(h.jsx)("br",{}),Object(h.jsx)("b",{children:"Total Points: "}),r.totalScore,Object(h.jsx)("br",{}),Object(h.jsx)("b",{children:"Average Points: "}),r.averageScore,Object(h.jsx)("br",{}),Object(h.jsx)("b",{children:"Total Wins: "}),r.totalWins,Object(h.jsx)("br",{}),Object(h.jsx)("b",{children:"Takes: "}),Object(h.jsxs)("table",{style:{width:"90%",borderCollapse:"collapse"},children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{style:{backgroundColor:"white"},children:[Object(h.jsx)("th",{children:"Game Number"}),Object(h.jsx)("th",{children:"Takes"})]})}),Object(h.jsx)("tbody",{children:null===(e=r.allPlayerTakes)||void 0===e?void 0:e.map((function(e){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:e.gameNumber}),Object(h.jsx)("td",{children:e.takes.join(", ")})]},e.gameNumber)}))})]})]}):null}function O(){var e,t=Object(c.useState)({}),n=Object(u.a)(t,2),r=n[0],a=n[1],s=Object(c.useState)(1),i=Object(u.a)(s,2),j=i[0],l=i[1],d=Object(c.useState)([]),O=Object(u.a)(d,2),p=O[0],x=O[1];Object(c.useEffect)((function(){fetch("http://localhost:8080/gameNumbers").then(function(){var e=Object(b.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:n=e.sent,x(n.ids),l(n.ids[0]);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]),Object(c.useEffect)((function(){function e(){return(e=Object(b.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:8080/game?gameNumber=".concat(j));case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,a(n);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[j]);var f=r.game,m=r.players;return console.log(f,m),r&&f&&m?Object(h.jsxs)("div",{style:{marginLeft:"20px"},children:[Object(h.jsx)("select",{id:"playerSelector",onChange:function(e){l(e.target.value)},children:p.map((function(e){return Object(h.jsx)("option",{value:String(e),children:e},e)}))}),Object(h.jsx)("br",{}),Object(h.jsx)("br",{}),Object(h.jsx)("b",{children:"Game Number: "}),null===f||void 0===f?void 0:f.gameNumber,Object(h.jsx)("br",{}),Object(h.jsx)("br",{}),Object(h.jsx)("b",{children:"Player Stats: "}),Object(h.jsxs)("table",{style:{width:"90%",borderCollapse:"collapse"},children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{style:{backgroundColor:"white"},children:[Object(h.jsx)("th",{children:"Player Name"}),Object(h.jsx)("th",{children:"Takes"})]})}),Object(h.jsx)("tbody",{children:null===(e=f.players)||void 0===e?void 0:e.map((function(e){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:m.find((function(t){return t.id===e})).name}),Object(h.jsx)("td",{children:f.takes[e].join(", ")})]},e)}))})]})]}):null}function p(){var e=Object(c.useState)(""),t=Object(u.a)(e,2),n=t[0],r=t[1];return Object(h.jsxs)("div",{style:{marginLeft:"20px"},children:[Object(h.jsx)("div",{children:"Input Player Name"}),Object(h.jsx)("input",{type:"text",value:n,onKeyDown:function(){var e=Object(b.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Enter"!==t.key){e.next=4;break}return e.next=3,fetch("http://localhost:8080/player",{method:"POST",body:JSON.stringify({name:n}),headers:{"Content-Type":"application/json"}});case 3:r("");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),onChange:function(e){r(e.target.value)}})]})}function x(){var e=Object(c.useState)([]),t=Object(u.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(0),s=Object(u.a)(a,2),i=s[0],j=s[1],l=Object(c.useState)(""),d=Object(u.a)(l,2),O=d[0],p=d[1],x=Object(c.useState)([]),f=Object(u.a)(x,2),m=f[0],y=f[1],v=Object(c.useState)(""),g=Object(u.a)(v,2),k=g[0],w=g[1];return Object(c.useEffect)((function(){fetch("http://localhost:8080/playerIds").then(function(){var e=Object(b.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:n=e.sent,y(n.ids),j(n.ids[0]);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]),Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{style:{color:"red",marginLeft:"50px"},children:k}),Object(h.jsx)("select",{id:"playerSelector",onChange:function(e){j(Number(e.target.value))},style:{marginRight:"20px",marginLeft:"50px"},children:m.map((function(e){return Object(h.jsx)("option",{value:String(e),children:e},e)}))}),Object(h.jsx)("input",{type:"text",value:O,onChange:function(e){p(e.target.value)},style:{marginRight:"20px"}}),Object(h.jsx)("button",{type:"button",onClick:function(){r(n.concat({id:i,takes:O.split(",").map((function(e){return Number(e)}))})),j(m[0]),p("")},style:{marginRight:"20px"},children:"Add Player"}),Object(h.jsx)("button",{type:"button",onClick:function(){r([])},style:{marginRight:"20px"},children:"Clear Players"}),Object(h.jsxs)("table",{style:{width:"80%",borderCollapse:"collapse",marginLeft:"50px",marginTop:"20px"},children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{style:{backgroundColor:"white"},children:[Object(h.jsx)("th",{children:"Player Name"}),Object(h.jsx)("th",{children:"Takes"})]})}),Object(h.jsx)("tbody",{children:null===n||void 0===n?void 0:n.map((function(e,t){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:e.id}),Object(h.jsx)("td",{children:e.takes.join(",")})]},t)}))})]}),Object(h.jsx)("button",{style:{marginLeft:"50px",marginTop:"50px"},type:"button",onClick:Object(b.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={},n.forEach((function(e){t[e.id]=e.takes})),e.next=4,fetch("http://localhost:8080/game",{method:"POST",body:JSON.stringify({players:n.map((function(e){return e.id})),takes:t}),headers:{"Content-Type":"application/json"}}).then(function(){var e=Object(b.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.ok){e.next=7;break}return e.next=3,t.json();case 3:n=e.sent,w(n.error),e.next=8;break;case 7:w("");case 8:r([]);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 4:case"end":return e.stop()}}),e)}))),children:"Create Game"})]})}var f=function(){return Object(h.jsx)(i.a,{children:Object(h.jsxs)("div",{children:[Object(h.jsx)("nav",{children:Object(h.jsxs)("ul",{children:[Object(h.jsx)("li",{children:Object(h.jsx)(i.b,{to:"/game",children:"Game"})}),Object(h.jsx)("li",{children:Object(h.jsx)(i.b,{to:"/player",children:"Player"})}),Object(h.jsx)("li",{children:Object(h.jsx)(i.b,{to:"/create_player",children:"Create Player"})}),Object(h.jsx)("li",{children:Object(h.jsx)(i.b,{to:"/create_game",children:"Create Game"})})]})}),Object(h.jsxs)(j.c,{children:[Object(h.jsx)(j.a,{path:"/game",children:Object(h.jsx)(O,{})}),Object(h.jsx)(j.a,{path:"/player",children:Object(h.jsx)(d,{})}),Object(h.jsx)(j.a,{path:"/create_player",children:Object(h.jsx)(p,{})}),Object(h.jsx)(j.a,{path:"/create_game",children:Object(h.jsx)(x,{})})]})]})})},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,35)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))};s.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(f,{})}),document.getElementById("root")),m()}},[[34,1,2]]]);
//# sourceMappingURL=main.4ace4e4f.chunk.js.map