(function(t){function e(e){for(var o,s,a=e[0],u=e[1],c=e[2],d=0,f=[];d<a.length;d++)s=a[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&f.push(r[s][0]),r[s]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(t[o]=u[o]);l&&l(e);while(f.length)f.shift()();return n.push.apply(n,c||[]),i()}function i(){for(var t,e=0;e<n.length;e++){for(var i=n[e],o=!0,a=1;a<i.length;a++){var u=i[a];0!==r[u]&&(o=!1)}o&&(n.splice(e--,1),t=s(s.s=i[0]))}return t}var o={},r={app:0},n=[];function s(e){if(o[e])return o[e].exports;var i=o[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=o,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(i,o,function(e){return t[e]}.bind(null,o));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var l=u;n.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";i("85ec")},4933:function(t,e,i){"use strict";i("69f3c")},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var o=i("2b0e"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("div",{staticClass:"logoBox"},[t._m(0),i("p",{staticClass:"connect"},[t._v("connected : "+t._s(t.connected))])]),i("div",{staticClass:"form"},[i("form",{on:{submit:function(t){t.preventDefault()}}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.url,expression:"url"}],attrs:{type:"text",id:"url",placeholder:"URL vidéo"},domProps:{value:t.url},on:{input:function(e){e.target.composing||(t.url=e.target.value)}}}),i("input",{attrs:{id:"button",type:"submit",value:"Load"},on:{click:function(e){return t.loadURL(t.url)}}})])]),i("div",{staticClass:"player"},[i("h1",[t._v(t._s(t.title))]),i("div",{staticClass:"playerBox"},[i("youtube",{ref:"youtube",attrs:{resize:!0,fitParent:!0},on:{playing:t.playing,paused:t.pause,error:t.error,ready:t.ready}})],1),i("div",{staticClass:"barBox"},[i("p",[t._v("Fast forward :")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.forward,expression:"forward"}],attrs:{type:"range",id:"bar",min:"0",max:t.videoTime},domProps:{value:t.forward},on:{change:t.seek,__r:function(e){t.forward=e.target.value}}}),i("p",[t._v(t._s(t.forwardTime))])]),i("div",{staticClass:"history"},[i("h2",[t._v("History")]),i("div",{staticClass:"historyScroll"},t._l(t.historyTab,(function(e,o){return i("History",{key:o,attrs:{id:e.id,titre:e.titre,img:e.img,index:o},on:{loadHistory:t.loadHistory}})})),1),i("button",{on:{click:t.loadMore}},[t._v("Load more")])])])])},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"logo"},[i("p",[t._v("SYNCTUBE")])])}],s=(i("a9e3"),i("e0ec")),a=i.n(s),u=i("bc3a"),c=i.n(u),l=i("8e27"),d=i.n(l),f=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"box"},[i("div",{style:{background:t.getImg(t.img)},attrs:{id:"left"}}),i("div",{staticClass:"right"},[i("h3",[t._v(t._s(t.titre))]),i("button",{staticClass:"load",on:{click:t.loadHistory}},[t._v("Load")])])])},p=[],h={props:["id","titre","img","index"],methods:{loadHistory:function(){this.$emit("loadHistory",{id:this.id,titre:this.titre})},getImg:function(t){var e="url("+t+")";return e}}},m=h,y=(i("4933"),i("2877")),v=Object(y["a"])(m,f,p,!1,null,"0b2716d4",null),b=v.exports,g={name:"App",components:{History:b},data:function(){return{time:0,url:"",thumbnail:"",forward:0,videoTime:0,connected:0,historyTab:[],title:"",slave:!1,socket:d()()}},computed:{player:function(){return this.$refs.youtube.player},forwardTime:function(){var t=Math.floor(this.forward/60),e=this.forward%60,i=t+" min "+e+" sec";return i}},methods:{getTime:function(){var t=this;this.$refs.youtube.player.getCurrentTime().then((function(e){t.time=e}))},playing:function(){var t=this;this.$refs.youtube.player.getDuration().then((function(e){t.videoTime=e})),this.slave||this.socket.emit("PLAYING",{}),this.slave=!1},pause:function(){this.getTime(),this.socket.emit("PAUSE",{})},loadURL:function(t){var e=this;this.socket.emit("LOAD",{id:t}),c.a.get("https://www.googleapis.com/youtube/v3/videos?id="+Object(s["getIdFromUrl"])(t)+"&key=AIzaSyBlLC4WxoLFqESw9Xwf0zr8OY3-EYA5Dvk&part=snippet,contentDetails,statistics,status").then((function(i){e.title=i.data.items[0].snippet.title,e.socket.emit("HISTORY",{id:t,titre:i.data.items[0].snippet.title,img:i.data.items[0].snippet.thumbnails.default.url})})),c.a.get("info").then((function(t){e.historyTab=t.data})),this.$refs.youtube.player.cueVideoById(Object(s["getIdFromUrl"])(t))},seek:function(){this.socket.emit("SEEK",{time:this.forward}),this.$refs.youtube.player.seekTo(this.forward)},loadMore:function(){var t=this;c.a.get("moreinfo").then((function(e){t.historyTab=e.data}))},loadHistory:function(t){this.title=t.titre,this.$refs.youtube.player.cueVideoById(Object(s["getIdFromUrl"])(t.id)),this.socket.emit("LOAD",{id:t.id})}},mounted:function(){var t=this;c.a.get("info").then((function(e){t.historyTab=e.data})),this.socket.on("LOAD_URL",(function(e){c.a.get("https://www.googleapis.com/youtube/v3/videos?id="+Object(s["getIdFromUrl"])(e.id)+"&key=AIzaSyBlLC4WxoLFqESw9Xwf0zr8OY3-EYA5Dvk&part=snippet,contentDetails,statistics,status").then((function(e){t.title=e.data.items[0].snippet.title})),t.$refs.youtube.player.cueVideoById(Object(s["getIdFromUrl"])(e.id))})),this.socket.on("PLAY",(function(){t.slave=!0,t.$refs.youtube.player.playVideo()})),this.socket.on("PAUSE",(function(){t.$refs.youtube.player.pauseVideo()})),this.socket.on("SEEK",(function(e){t.slave=!0,t.$refs.youtube.player.seekTo(Number(e.time))})),this.socket.on("connexion",(function(e){t.connected=e.number})),this.socket.on("disconnected",(function(e){t.connected=e.number}))}},w=g,_=(i("034f"),Object(y["a"])(w,r,n,!1,null,null,null)),k=_.exports;o["a"].config.productionTip=!1,o["a"].use(a.a),new o["a"]({render:function(t){return t(k)}}).$mount("#app")},"69f3c":function(t,e,i){},"85ec":function(t,e,i){}});
//# sourceMappingURL=app.5b411b66.js.map