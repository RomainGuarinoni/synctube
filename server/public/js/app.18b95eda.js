(function(e){function t(t){for(var o,a,u=t[0],s=t[1],l=t[2],p=0,f=[];p<u.length;p++)a=u[p],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&f.push(n[a][0]),n[a]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);c&&c(t);while(f.length)f.shift()();return i.push.apply(i,l||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],o=!0,u=1;u<r.length;u++){var s=r[u];0!==n[s]&&(o=!1)}o&&(i.splice(t--,1),e=a(a.s=r[0]))}return e}var o={},n={app:0},i=[];function a(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=o,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(r,o,function(t){return e[t]}.bind(null,o));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var c=s;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var o=r("2b0e"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[e._m(0),r("div",{staticClass:"form"},[r("form",{on:{submit:function(e){e.preventDefault()}}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.url,expression:"url"}],attrs:{type:"text",id:"url",placeholder:"URL vidéo"},domProps:{value:e.url},on:{input:function(t){t.target.composing||(e.url=t.target.value)}}}),r("input",{attrs:{id:"button",type:"submit",value:"Load"},on:{click:function(t){return e.loadURL(e.url)}}})])]),r("div",{staticClass:"player"},[r("h1",[e._v(e._s(e.title))]),r("youtube",{ref:"youtube",attrs:{width:"900px",height:"450px"},on:{playing:e.playing,paused:e.pause}}),r("div",{staticClass:"barBox"},[r("p",[e._v("Fast forward :")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.forward,expression:"forward"}],attrs:{type:"range",id:"bar",min:"0",max:e.videoTime},domProps:{value:e.forward},on:{change:e.seek,__r:function(t){e.forward=t.target.value}}}),r("p",[e._v(e._s(e.forwardTime))])])],1)])},i=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"logo"},[r("p",[e._v("SYNCTUBE")])])}],a=(r("a9e3"),r("e0ec")),u=r.n(a),s=r("bc3a"),l=r.n(s),c=r("8e27"),p=r.n(c),f={name:"App",data:function(){return{time:0,url:"",thumbnail:"",forward:0,videoTime:0,title:"",slave:!1,socket:p()()}},computed:{player:function(){return this.$refs.youtube.player},forwardTime:function(){var e=Math.floor(this.forward/60),t=this.forward%60,r=e+" min "+t+" sec";return r}},methods:{getTime:function(){var e=this;this.$refs.youtube.player.getCurrentTime().then((function(t){e.time=t}))},playing:function(){var e=this;this.$refs.youtube.player.getDuration().then((function(t){e.videoTime=t})),this.slave||this.socket.emit("PLAYING",{}),this.slave=!1},pause:function(){this.getTime(),console.log("time pause : "+this.time),this.socket.emit("PAUSE",{})},loadURL:function(e){var t=this;this.socket.emit("LOAD",{id:e}),l.a.get("https://www.googleapis.com/youtube/v3/videos?id="+Object(a["getIdFromUrl"])(e)+"&key=AIzaSyBlLC4WxoLFqESw9Xwf0zr8OY3-EYA5Dvk&part=snippet,contentDetails,statistics,status").then((function(e){t.title=e.data.items[0].snippet.title})),this.$refs.youtube.player.cueVideoById(Object(a["getIdFromUrl"])(e))},seek:function(){this.socket.emit("SEEK",{time:this.forward}),this.$refs.youtube.player.seekTo(this.forward)}},mounted:function(){var e=this;this.socket.on("LOAD_URL",(function(t){e.$refs.youtube.player.cueVideoById(Object(a["getIdFromUrl"])(t.id))})),this.socket.on("PLAY",(function(){console.log("need to play"),e.slave=!0,e.$refs.youtube.player.playVideo()})),this.socket.on("PAUSE",(function(){e.$refs.youtube.player.pauseVideo()})),this.socket.on("SEEK",(function(t){console.log("seek to"+t.time),e.slave=!0,e.$refs.youtube.player.seekTo(Number(t.time))}))}},d=f,m=(r("034f"),r("2877")),v=Object(m["a"])(d,n,i,!1,null,null,null),h=v.exports;o["a"].config.productionTip=!1,o["a"].use(u.a),new o["a"]({render:function(e){return e(h)}}).$mount("#app")},"85ec":function(e,t,r){}});
//# sourceMappingURL=app.18b95eda.js.map