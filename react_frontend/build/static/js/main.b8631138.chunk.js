(this.webpackJsonpspeakupwebfrontend=this.webpackJsonpspeakupwebfrontend||[]).push([[0],{23:function(e,t,n){},24:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),s=n(14),a=n.n(s),o=(n(23),n(18)),l=(n(24),n(15)),p=n.n(l),i=n(16),j=n(1),d=n(6);function u(){var e=Object(j.d)().search,t=e.slice(-(e.length-1)),n=r.a.useState(!1),c=Object(o.a)(n,2),s=c[0],a=c[1];if(s)return Object(d.jsx)("h1",{children:"Unable to load snippet"});try{var l="https://letsusespeakup.com/backend/open/snippets?val="+new URLSearchParams(t).get("val");return Object(d.jsx)(p.a,{src:l,autoPlay:!0,controls:!0,onError:function(e){console.log("Error: ",e),a(!0)}})}catch(i){return console.log("ERROR: ",i),a(!0),Object(d.jsx)("h1",{children:"Unable to load snippet"})}}var b=function(){return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)("header",{className:"App-header",children:Object(d.jsx)(i.a,{children:Object(d.jsx)(u,{})})})})};a.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(b,{})}),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.b8631138.chunk.js.map