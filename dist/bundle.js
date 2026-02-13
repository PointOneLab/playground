/*!
 * GSAP 3.11.5
 * https://greensock.com
 * 
 * @license Copyright 2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(e){"use strict";function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function r(t){return"string"==typeof t}function s(t){return"function"==typeof t}function t(t){return"number"==typeof t}function u(t){return void 0===t}function v(t){return"object"==typeof t}function w(t){return!1!==t}function x(){return"undefined"!=typeof window}function y(t){return s(t)||r(t)}function P(t){return(i=yt(t,ot))&&Pe}function Q(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")}function R(t,e){return!e&&console.warn(t)}function S(t,e){return t&&(ot[t]=e)&&i&&(i[t]=e)||ot}function T(){return 0}function ea(t){var e,r,i=t[0];if(v(i)||s(i)||(t=[t]),!(e=(i._gsap||{}).harness)){for(r=gt.length;r--&&!gt[r].targetTest(i););e=gt[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new qt(t[r],e)))||t.splice(r,1);return t}function fa(t){return t._gsap||ea(Mt(t))[0]._gsap}function ga(t,e,r){return(r=t[e])&&s(r)?t[e]():u(r)&&t.getAttribute&&t.getAttribute(e)||r}function ha(t,e){return(t=t.split(",")).forEach(e)||t}function ia(t){return Math.round(1e5*t)/1e5||0}function ja(t){return Math.round(1e7*t)/1e7||0}function ka(t,e){var r=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),"+"===r?t+i:"-"===r?t-i:"*"===r?t*i:t/i}function la(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r}function ma(){var t,e,r=ct.length,i=ct.slice(0);for(dt={},t=ct.length=0;t<r;t++)(e=i[t])&&e._lazy&&(e.render(e._lazy[0],e._lazy[1],!0)._lazy=0)}function na(t,e,r,i){ct.length&&!B&&ma(),t.render(e,r,i||B&&e<0&&(t._initted||t._startAt)),ct.length&&!B&&ma()}function oa(t){var e=parseFloat(t);return(e||0===e)&&(t+"").match(at).length<2?e:r(t)?t.trim():t}function pa(t){return t}function qa(t,e){for(var r in e)r in t||(t[r]=e[r]);return t}function ta(t,e){for(var r in e)"__proto__"!==r&&"constructor"!==r&&"prototype"!==r&&(t[r]=v(e[r])?ta(t[r]||(t[r]={}),e[r]):e[r]);return t}function ua(t,e){var r,i={};for(r in t)r in e||(i[r]=t[r]);return i}function va(t){var e=t.parent||L,r=t.keyframes?function _setKeyframeDefaults(i){return function(t,e){for(var r in e)r in t||"duration"===r&&i||"ease"===r||(t[r]=e[r])}}(Z(t.keyframes)):qa;if(w(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t}function xa(t,e,r,i,n){void 0===r&&(r="_first"),void 0===i&&(i="_last");var a,s=t[i];if(n)for(a=e[n];s&&s[n]>a;)s=s._prev;return s?(e._next=s._next,s._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=s,e.parent=e._dp=t,e}function ya(t,e,r,i){void 0===r&&(r="_first"),void 0===i&&(i="_last");var n=e._prev,a=e._next;n?n._next=a:t[r]===e&&(t[r]=a),a?a._prev=n:t[i]===e&&(t[i]=n),e._next=e._prev=e.parent=null}function za(t,e){!t.parent||e&&!t.parent.autoRemoveChildren||t.parent.remove(t),t._act=0}function Aa(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var r=t;r;)r._dirty=1,r=r.parent;return t}function Ca(t,e,r,i){return t._startAt&&(B?t._startAt.revert(ht):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))}function Ea(t){return t._repeat?Tt(t._tTime,t=t.duration()+t._rDelay)*t:0}function Ga(t,e){return(t-e._start)*e._ts+(0<=e._ts?0:e._dirty?e.totalDuration():e._tDur)}function Ha(t){return t._end=ja(t._start+(t._tDur/Math.abs(t._ts||t._rts||X)||0))}function Ia(t,e){var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=ja(r._time-(0<t._ts?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Ha(t),r._dirty||Aa(r,t)),t}function Ja(t,e){var r;if((e._time||e._initted&&!e._dur)&&(r=Ga(t.rawTime(),e),(!e._dur||Ot(0,e.totalDuration(),r)-e._tTime>X)&&e.render(r,!0)),Aa(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)0<=r.rawTime()&&r.totalTime(r._tTime),r=r._dp;t._zTime=-X}}function Ka(e,r,i,n){return r.parent&&za(r),r._start=ja((t(i)?i:i||e!==L?xt(e,i,r):e._time)+r._delay),r._end=ja(r._start+(r.totalDuration()/Math.abs(r.timeScale())||0)),xa(e,r,"_first","_last",e._sort?"_start":0),bt(r)||(e._recent=r),n||Ja(e,r),e._ts<0&&Ia(e,e._tTime),e}function La(t,e){return(ot.ScrollTrigger||Q("scrollTrigger",e))&&ot.ScrollTrigger.create(e,t)}function Ma(t,e,r,i,n){return Kt(t,e,n),t._initted?!r&&t._pt&&!B&&(t._dur&&!1!==t.vars.lazy||!t._dur&&t.vars.lazy)&&f!==Rt.frame?(ct.push(t),t._lazy=[n,i],1):void 0:1}function Ra(t,e,r,i){var n=t._repeat,a=ja(e)||0,s=t._tTime/t._tDur;return s&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=n?n<0?1e10:ja(a*(n+1)+t._rDelay*n):a,0<s&&!i&&Ia(t,t._tTime=t._tDur*s),t.parent&&Ha(t),r||Aa(t.parent,t),t}function Sa(t){return t instanceof Xt?Aa(t):Ra(t,t._dur)}function Va(e,r,i){var n,a,s=t(r[1]),o=(s?2:1)+(e<2?0:1),u=r[o];if(s&&(u.duration=r[1]),u.parent=i,e){for(n=u,a=i;a&&!("immediateRender"in n);)n=a.vars.defaults||{},a=w(a.vars.inherit)&&a.parent;u.immediateRender=w(n.immediateRender),e<2?u.runBackwards=1:u.startAt=r[o-1]}return new Jt(r[0],u,r[1+o])}function Wa(t,e){return t||0===t?e(t):e}function Ya(t,e){return r(t)&&(e=st.exec(t))?e[1]:""}function _a(t,e){return t&&v(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&v(t[0]))&&!t.nodeType&&t!==h}function cb(r){return r=Mt(r)[0]||R("Invalid scope")||{},function(t){var e=r.current||r.nativeElement||r;return Mt(t,e.querySelectorAll?e:e===r?R("Invalid scope")||a.createElement("div"):r)}}function db(t){return t.sort(function(){return.5-Math.random()})}function eb(t){if(s(t))return t;var p=v(t)?t:{each:t},_=jt(p.ease),m=p.from||0,g=parseFloat(p.base)||0,y={},e=0<m&&m<1,T=isNaN(m)||e,b=p.axis,w=m,x=m;return r(m)?w=x={center:.5,edges:.5,end:1}[m]||0:!e&&T&&(w=m[0],x=m[1]),function(t,e,r){var i,n,a,s,o,u,h,l,f,c=(r||p).length,d=y[c];if(!d){if(!(f="auto"===p.grid?0:(p.grid||[1,U])[1])){for(h=-U;h<(h=r[f++].getBoundingClientRect().left)&&f<c;);f--}for(d=y[c]=[],i=T?Math.min(f,c)*w-.5:m%f,n=f===U?0:T?c*x/f-.5:m/f|0,l=U,u=h=0;u<c;u++)a=u%f-i,s=n-(u/f|0),d[u]=o=b?Math.abs("y"===b?s:a):G(a*a+s*s),h<o&&(h=o),o<l&&(l=o);"random"===m&&db(d),d.max=h-l,d.min=l,d.v=c=(parseFloat(p.amount)||parseFloat(p.each)*(c<f?c-1:b?"y"===b?c/f:f:Math.max(f,c/f))||0)*("edges"===m?-1:1),d.b=c<0?g-c:g,d.u=Ya(p.amount||p.each)||0,_=_&&c<0?Yt(_):_}return c=(d[t]-d.min)/d.max||0,ja(d.b+(_?_(c):c)*d.v)+d.u}}function fb(i){var n=Math.pow(10,((i+"").split(".")[1]||"").length);return function(e){var r=ja(Math.round(parseFloat(e)/i)*i*n);return(r-r%1)/n+(t(e)?0:Ya(e))}}function gb(h,e){var l,f,r=Z(h);return!r&&v(h)&&(l=r=h.radius||U,h.values?(h=Mt(h.values),(f=!t(h[0]))&&(l*=l)):h=fb(h.increment)),Wa(e,r?s(h)?function(t){return f=h(t),Math.abs(f-t)<=l?f:t}:function(e){for(var r,i,n=parseFloat(f?e.x:e),a=parseFloat(f?e.y:0),s=U,o=0,u=h.length;u--;)(r=f?(r=h[u].x-n)*r+(i=h[u].y-a)*i:Math.abs(h[u]-n))<s&&(s=r,o=u);return o=!l||s<=l?h[o]:e,f||o===e||t(e)?o:o+Ya(e)}:fb(h))}function hb(t,e,r,i){return Wa(Z(t)?!e:!0===r?!!(r=0):!i,function(){return Z(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t-r/2+Math.random()*(e-t+.99*r))/r)*r*i)/i})}function lb(e,r,t){return Wa(t,function(t){return e[~~r(t)]})}function ob(t){for(var e,r,i,n,a=0,s="";~(e=t.indexOf("random(",a));)i=t.indexOf(")",e),n="["===t.charAt(e+7),r=t.substr(e+7,i-e-7).match(n?at:tt),s+=t.substr(a,e-a)+hb(n?r:+r[0],n?0:+r[1],+r[2]||1e-5),a=i+1;return s+t.substr(a,t.length-a)}function rb(t,e,r){var i,n,a,s=t.labels,o=U;for(i in s)(n=s[i]-e)<0==!!r&&n&&o>(n=Math.abs(n))&&(a=i,o=n);return a}function tb(t){return za(t),t.scrollTrigger&&t.scrollTrigger.kill(!!B),t.progress()<1&&St(t,"onInterrupt"),t}function wb(t){if(x()){var e=(t=!t.name&&t.default||t).name,r=s(t),i=e&&!r&&t.init?function(){this._props=[]}:t,n={init:T,render:fe,add:Qt,kill:_e,modifier:pe,rawVars:0},a={targetTest:0,get:0,getSetter:re,aliases:{},register:0};if(Ft(),t!==i){if(pt[e])return;qa(i,qa(ua(t,n),a)),yt(i.prototype,yt(n,ua(t,a))),pt[i.prop=e]=i,t.targetTest&&(gt.push(i),ft[e]=1),e=("css"===e?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}S(e,i),t.register&&t.register(Pe,i,ge)}else Ct.push(t)}function zb(t,e,r){return(6*(t+=t<0?1:1<t?-1:0)<1?e+(r-e)*t*6:t<.5?r:3*t<2?e+(r-e)*(2/3-t)*6:e)*Pt+.5|0}function Ab(e,r,i){var n,a,s,o,u,h,l,f,c,d,p=e?t(e)?[e>>16,e>>8&Pt,e&Pt]:0:Dt.black;if(!p){if(","===e.substr(-1)&&(e=e.substr(0,e.length-1)),Dt[e])p=Dt[e];else if("#"===e.charAt(0)){if(e.length<6&&(e="#"+(n=e.charAt(1))+n+(a=e.charAt(2))+a+(s=e.charAt(3))+s+(5===e.length?e.charAt(4)+e.charAt(4):"")),9===e.length)return[(p=parseInt(e.substr(1,6),16))>>16,p>>8&Pt,p&Pt,parseInt(e.substr(7),16)/255];p=[(e=parseInt(e.substr(1),16))>>16,e>>8&Pt,e&Pt]}else if("hsl"===e.substr(0,3))if(p=d=e.match(tt),r){if(~e.indexOf("="))return p=e.match(et),i&&p.length<4&&(p[3]=1),p}else o=+p[0]%360/360,u=p[1]/100,n=2*(h=p[2]/100)-(a=h<=.5?h*(u+1):h+u-h*u),3<p.length&&(p[3]*=1),p[0]=zb(o+1/3,n,a),p[1]=zb(o,n,a),p[2]=zb(o-1/3,n,a);else p=e.match(tt)||Dt.transparent;p=p.map(Number)}return r&&!d&&(n=p[0]/Pt,a=p[1]/Pt,s=p[2]/Pt,h=((l=Math.max(n,a,s))+(f=Math.min(n,a,s)))/2,l===f?o=u=0:(c=l-f,u=.5<h?c/(2-l-f):c/(l+f),o=l===n?(a-s)/c+(a<s?6:0):l===a?(s-n)/c+2:(n-a)/c+4,o*=60),p[0]=~~(o+.5),p[1]=~~(100*u+.5),p[2]=~~(100*h+.5)),i&&p.length<4&&(p[3]=1),p}function Bb(t){var r=[],i=[],n=-1;return t.split(Et).forEach(function(t){var e=t.match(rt)||[];r.push.apply(r,e),i.push(n+=e.length+1)}),r.c=i,r}function Cb(t,e,r){var i,n,a,s,o="",u=(t+o).match(Et),h=e?"hsla(":"rgba(",l=0;if(!u)return t;if(u=u.map(function(t){return(t=Ab(t,e,1))&&h+(e?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),r&&(a=Bb(t),(i=r.c).join(o)!==a.c.join(o)))for(s=(n=t.replace(Et,"1").split(rt)).length-1;l<s;l++)o+=n[l]+(~i.indexOf(l)?u.shift()||h+"0,0,0,0)":(a.length?a:u.length?u:r).shift());if(!n)for(s=(n=t.split(Et)).length-1;l<s;l++)o+=n[l]+u[l];return o+n[s]}function Fb(t){var e,r=t.join(" ");if(Et.lastIndex=0,Et.test(r))return e=zt.test(r),t[1]=Cb(t[1],e),t[0]=Cb(t[0],e,Bb(t[1])),!0}function Ob(t){var e=(t+"").split("("),r=It[e[0]];return r&&1<e.length&&r.config?r.config.apply(null,~t.indexOf("{")?[function _parseObjectInString(t){for(var e,r,i,n={},a=t.substr(1,t.length-3).split(":"),s=a[0],o=1,u=a.length;o<u;o++)r=a[o],e=o!==u-1?r.lastIndexOf(","):r.length,i=r.substr(0,e),n[s]=isNaN(i)?i.replace(Lt,"").trim():+i,s=r.substr(e+1).trim();return n}(e[1])]:function _valueInParentheses(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)}(t).split(",").map(oa)):It._CE&&Bt.test(t)?It._CE("",t):r}function Qb(t,e){for(var r,i=t._first;i;)i instanceof Xt?Qb(i,e):!i.vars.yoyoEase||i._yoyo&&i._repeat||i._yoyo===e||(i.timeline?Qb(i.timeline,e):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=e)),i=i._next}function Sb(t,e,r,i){void 0===r&&(r=function easeOut(t){return 1-e(1-t)}),void 0===i&&(i=function easeInOut(t){return t<.5?e(2*t)/2:1-e(2*(1-t))/2});var n,a={easeIn:e,easeOut:r,easeInOut:i};return ha(t,function(t){for(var e in It[t]=ot[t]=a,It[n=t.toLowerCase()]=r,a)It[n+("easeIn"===e?".in":"easeOut"===e?".out":".inOut")]=It[t+"."+e]=a[e]}),a}function Tb(e){return function(t){return t<.5?(1-e(1-2*t))/2:.5+e(2*(t-.5))/2}}function Ub(r,t,e){function Im(t){return 1===t?1:i*Math.pow(2,-10*t)*H((t-a)*n)+1}var i=1<=t?t:1,n=(e||(r?.3:.45))/(t<1?t:1),a=n/N*(Math.asin(1/i)||0),s="out"===r?Im:"in"===r?function(t){return 1-Im(1-t)}:Tb(Im);return n=N/n,s.config=function(t,e){return Ub(r,t,e)},s}function Vb(e,r){function Qm(t){return t?--t*t*((r+1)*t+r)+1:0}void 0===r&&(r=1.70158);var t="out"===e?Qm:"in"===e?function(t){return 1-Qm(1-t)}:Tb(Qm);return t.config=function(t){return Vb(e,t)},t}var I,B,l,L,h,n,a,i,o,f,c,d,p,_,m,g,b,O,k,M,A,C,D,E,z,F,Y,j,V={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},q={duration:.5,overwrite:!1,delay:0},U=1e8,X=1/U,N=2*Math.PI,W=N/4,K=0,G=Math.sqrt,$=Math.cos,H=Math.sin,J="function"==typeof ArrayBuffer&&ArrayBuffer.isView||function(){},Z=Array.isArray,tt=/(?:-?\.?\d|\.)+/gi,et=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,rt=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,it=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,nt=/[+-]=-?[.\d]+/,at=/[^,'"\[\]\s]+/gi,st=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ot={},ut={suppressEvents:!0,isStart:!0,kill:!1},ht={suppressEvents:!0,kill:!1},lt={suppressEvents:!0},ft={},ct=[],dt={},pt={},_t={},mt=30,gt=[],vt="",yt=function _merge(t,e){for(var r in e)t[r]=e[r];return t},Tt=function _animationCycle(t,e){var r=Math.floor(t/=e);return t&&r===t?r-1:r},bt=function _isFromOrFromStart(t){var e=t.data;return"isFromStart"===e||"isStart"===e},wt={_start:0,endTime:T,totalDuration:T},xt=function _parsePosition(t,e,i){var n,a,s,o=t.labels,u=t._recent||wt,h=t.duration()>=U?u.endTime(!1):t._dur;return r(e)&&(isNaN(e)||e in o)?(a=e.charAt(0),s="%"===e.substr(-1),n=e.indexOf("="),"<"===a||">"===a?(0<=n&&(e=e.replace(/=/,"")),("<"===a?u._start:u.endTime(0<=u._repeat))+(parseFloat(e.substr(1))||0)*(s?(n<0?u:i).totalDuration()/100:1)):n<0?(e in o||(o[e]=h),o[e]):(a=parseFloat(e.charAt(n-1)+e.substr(n+1)),s&&i&&(a=a/100*(Z(i)?i[0]:i).totalDuration()),1<n?_parsePosition(t,e.substr(0,n-1),i)+a:h+a)):null==e?h:+e},Ot=function _clamp(t,e,r){return r<t?t:e<r?e:r},kt=[].slice,Mt=function toArray(t,e,i){return l&&!e&&l.selector?l.selector(t):!r(t)||i||!n&&Ft()?Z(t)?function _flatten(t,e,i){return void 0===i&&(i=[]),t.forEach(function(t){return r(t)&&!e||_a(t,1)?i.push.apply(i,Mt(t)):i.push(t)})||i}(t,i):_a(t)?kt.call(t,0):t?[t]:[]:kt.call((e||a).querySelectorAll(t),0)},At=function mapRange(e,t,r,i,n){var a=t-e,s=i-r;return Wa(n,function(t){return r+((t-e)/a*s||0)})},St=function _callback(t,e,r){var i,n,a,s=t.vars,o=s[e],u=l,h=t._ctx;if(o)return i=s[e+"Params"],n=s.callbackScope||t,r&&ct.length&&ma(),h&&(l=h),a=i?o.apply(n,i):o.call(n),l=u,a},Ct=[],Pt=255,Dt={aqua:[0,Pt,Pt],lime:[0,Pt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Pt],navy:[0,0,128],white:[Pt,Pt,Pt],olive:[128,128,0],yellow:[Pt,Pt,0],orange:[Pt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Pt,0,0],pink:[Pt,192,203],cyan:[0,Pt,Pt],transparent:[Pt,Pt,Pt,0]},Et=function(){var t,e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";for(t in Dt)e+="|"+t+"\\b";return new RegExp(e+")","gi")}(),zt=/hsl[a]?\(/,Rt=(k=Date.now,M=500,A=33,C=k(),D=C,z=E=1e3/240,g={time:0,frame:0,tick:function tick(){xl(!0)},deltaRatio:function deltaRatio(t){return b/(1e3/(t||60))},wake:function wake(){o&&(!n&&x()&&(h=n=window,a=h.document||{},ot.gsap=Pe,(h.gsapVersions||(h.gsapVersions=[])).push(Pe.version),P(i||h.GreenSockGlobals||!h.gsap&&h||{}),m=h.requestAnimationFrame,Ct.forEach(wb)),p&&g.sleep(),_=m||function(t){return setTimeout(t,z-1e3*g.time+1|0)},d=1,xl(2))},sleep:function sleep(){(m?h.cancelAnimationFrame:clearTimeout)(p),d=0,_=T},lagSmoothing:function lagSmoothing(t,e){M=t||1/0,A=Math.min(e||33,M)},fps:function fps(t){E=1e3/(t||240),z=1e3*g.time+E},add:function add(n,t,e){var a=t?function(t,e,r,i){n(t,e,r,i),g.remove(a)}:n;return g.remove(n),F[e?"unshift":"push"](a),Ft(),a},remove:function remove(t,e){~(e=F.indexOf(t))&&F.splice(e,1)&&e<=O&&O--},_listeners:F=[]}),Ft=function _wake(){return!d&&Rt.wake()},It={},Bt=/^[\d.\-M][\d.\-,\s]/,Lt=/["']/g,Yt=function _invertEase(e){return function(t){return 1-e(1-t)}},jt=function _parseEase(t,e){return t&&(s(t)?t:It[t]||Ob(t))||e};function xl(t){var e,r,i,n,a=k()-D,s=!0===t;if(M<a&&(C+=a-A),(0<(e=(i=(D+=a)-C)-z)||s)&&(n=++g.frame,b=i-1e3*g.time,g.time=i/=1e3,z+=e+(E<=e?4:E-e),r=1),s||(p=_(xl)),r)for(O=0;O<F.length;O++)F[O](i,b,n,t)}function fn(t){return t<j?Y*t*t:t<.7272727272727273?Y*Math.pow(t-1.5/2.75,2)+.75:t<.9090909090909092?Y*(t-=2.25/2.75)*t+.9375:Y*Math.pow(t-2.625/2.75,2)+.984375}ha("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var r=e<5?e+1:e;Sb(t+",Power"+(r-1),e?function(t){return Math.pow(t,r)}:function(t){return t},function(t){return 1-Math.pow(1-t,r)},function(t){return t<.5?Math.pow(2*t,r)/2:1-Math.pow(2*(1-t),r)/2})}),It.Linear.easeNone=It.none=It.Linear.easeIn,Sb("Elastic",Ub("in"),Ub("out"),Ub()),Y=7.5625,j=1/2.75,Sb("Bounce",function(t){return 1-fn(1-t)},fn),Sb("Expo",function(t){return t?Math.pow(2,10*(t-1)):0}),Sb("Circ",function(t){return-(G(1-t*t)-1)}),Sb("Sine",function(t){return 1===t?1:1-$(t*W)}),Sb("Back",Vb("in"),Vb("out"),Vb()),It.SteppedEase=It.steps=ot.SteppedEase={config:function config(t,e){void 0===t&&(t=1);var r=1/t,i=t+(e?0:1),n=e?1:0;return function(t){return((i*Ot(0,.99999999,t)|0)+n)*r}}},q.ease=It["quad.out"],ha("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return vt+=t+","+t+"Params,"});var Vt,qt=function GSCache(t,e){this.id=K++,(t._gsap=this).target=t,this.harness=e,this.get=e?e.get:ga,this.set=e?e.getSetter:re},Ut=((Vt=Animation.prototype).delay=function delay(t){return t||0===t?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},Vt.duration=function duration(t){return arguments.length?this.totalDuration(0<this._repeat?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},Vt.totalDuration=function totalDuration(t){return arguments.length?(this._dirty=0,Ra(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},Vt.totalTime=function totalTime(t,e){if(Ft(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Ia(this,t),!r._dp||r.parent||Ja(r,this);r&&r.parent;)r.parent._time!==r._start+(0<=r._ts?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(0<this._ts&&t<this._tDur||this._ts<0&&0<t||!this._tDur&&!t)&&Ka(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!e||this._initted&&Math.abs(this._zTime)===X||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),na(this,t,e)),this},Vt.time=function time(t,e){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+Ea(this))%(this._dur+this._rDelay)||(t?this._dur:0),e):this._time},Vt.totalProgress=function totalProgress(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.ratio},Vt.progress=function progress(t,e){return arguments.length?this.totalTime(this.duration()*(!this._yoyo||1&this.iteration()?t:1-t)+Ea(this),e):this.duration()?Math.min(1,this._time/this._dur):this.ratio},Vt.iteration=function iteration(t,e){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*r,e):this._repeat?Tt(this._tTime,r)+1:1},Vt.timeScale=function timeScale(t){if(!arguments.length)return this._rts===-X?0:this._rts;if(this._rts===t)return this;var e=this.parent&&this._ts?Ga(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-X?0:this._rts,this.totalTime(Ot(-Math.abs(this._delay),this._tDur,e),!0),Ha(this),function _recacheAncestors(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t}(this)},Vt.paused=function paused(t){return arguments.length?(this._ps!==t&&((this._ps=t)?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ft(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,1===this.progress()&&Math.abs(this._zTime)!==X&&(this._tTime-=X)))),this):this._ps},Vt.startTime=function startTime(t){if(arguments.length){this._start=t;var e=this.parent||this._dp;return!e||!e._sort&&this.parent||Ka(e,this,t-this._delay),this}return this._start},Vt.endTime=function endTime(t){return this._start+(w(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},Vt.rawTime=function rawTime(t){var e=this.parent||this._dp;return e?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ga(e.rawTime(t),this):this._tTime:this._tTime},Vt.revert=function revert(t){void 0===t&&(t=lt);var e=B;return B=t,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),"nested"!==this.data&&!1!==t.kill&&this.kill(),B=e,this},Vt.globalTime=function globalTime(t){for(var e=this,r=arguments.length?t:e.rawTime();e;)r=e._start+r/(e._ts||1),e=e._dp;return!this.parent&&this._sat?this._sat.vars.immediateRender?-1:this._sat.globalTime(t):r},Vt.repeat=function repeat(t){return arguments.length?(this._repeat=t===1/0?-2:t,Sa(this)):-2===this._repeat?1/0:this._repeat},Vt.repeatDelay=function repeatDelay(t){if(arguments.length){var e=this._time;return this._rDelay=t,Sa(this),e?this.time(e):this}return this._rDelay},Vt.yoyo=function yoyo(t){return arguments.length?(this._yoyo=t,this):this._yoyo},Vt.seek=function seek(t,e){return this.totalTime(xt(this,t),w(e))},Vt.restart=function restart(t,e){return this.play().totalTime(t?-this._delay:0,w(e))},Vt.play=function play(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},Vt.reverse=function reverse(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},Vt.pause=function pause(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},Vt.resume=function resume(){return this.paused(!1)},Vt.reversed=function reversed(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-X:0)),this):this._rts<0},Vt.invalidate=function invalidate(){return this._initted=this._act=0,this._zTime=-X,this},Vt.isActive=function isActive(){var t,e=this.parent||this._dp,r=this._start;return!(e&&!(this._ts&&this._initted&&e.isActive()&&(t=e.rawTime(!0))>=r&&t<this.endTime(!0)-X))},Vt.eventCallback=function eventCallback(t,e,r){var i=this.vars;return 1<arguments.length?(e?(i[t]=e,r&&(i[t+"Params"]=r),"onUpdate"===t&&(this._onUpdate=e)):delete i[t],this):i[t]},Vt.then=function then(t){var i=this;return new Promise(function(e){function Ao(){var t=i.then;i.then=null,s(r)&&(r=r(i))&&(r.then||r===i)&&(i.then=t),e(r),i.then=t}var r=s(t)?t:pa;i._initted&&1===i.totalProgress()&&0<=i._ts||!i._tTime&&i._ts<0?Ao():i._prom=Ao})},Vt.kill=function kill(){tb(this)},Animation);function Animation(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ra(this,+t.duration,1,1),this.data=t.data,l&&(this._ctx=l).data.push(this),d||Rt.wake()}qa(Ut.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-X,_prom:0,_ps:!1,_rts:1});var Xt=function(i){function Timeline(t,e){var r;return void 0===t&&(t={}),(r=i.call(this,t)||this).labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=w(t.sortChildren),L&&Ka(t.parent||L,_assertThisInitialized(r),e),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&La(_assertThisInitialized(r),t.scrollTrigger),r}_inheritsLoose(Timeline,i);var e=Timeline.prototype;return e.to=function to(t,e,r){return Va(0,arguments,this),this},e.from=function from(t,e,r){return Va(1,arguments,this),this},e.fromTo=function fromTo(t,e,r,i){return Va(2,arguments,this),this},e.set=function set(t,e,r){return e.duration=0,e.parent=this,va(e).repeatDelay||(e.repeat=0),e.immediateRender=!!e.immediateRender,new Jt(t,e,xt(this,r),1),this},e.call=function call(t,e,r){return Ka(this,Jt.delayedCall(0,t,e),r)},e.staggerTo=function staggerTo(t,e,r,i,n,a,s){return r.duration=e,r.stagger=r.stagger||i,r.onComplete=a,r.onCompleteParams=s,r.parent=this,new Jt(t,r,xt(this,n)),this},e.staggerFrom=function staggerFrom(t,e,r,i,n,a,s){return r.runBackwards=1,va(r).immediateRender=w(r.immediateRender),this.staggerTo(t,e,r,i,n,a,s)},e.staggerFromTo=function staggerFromTo(t,e,r,i,n,a,s,o){return i.startAt=r,va(i).immediateRender=w(i.immediateRender),this.staggerTo(t,e,i,n,a,s,o)},e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,c,d,p,_=this._time,m=this._dirty?this.totalDuration():this._tDur,g=this._dur,v=t<=0?0:ja(t),y=this._zTime<0!=t<0&&(this._initted||!g);if(this!==L&&m<v&&0<=t&&(v=m),v!==this._tTime||r||y){if(_!==this._time&&g&&(v+=this._time-_,t+=this._time-_),i=v,f=this._start,u=!(l=this._ts),y&&(g||(_=this._zTime),!t&&e||(this._zTime=t)),this._repeat){if(d=this._yoyo,o=g+this._rDelay,this._repeat<-1&&t<0)return this.totalTime(100*o+t,e,r);if(i=ja(v%o),v===m?(s=this._repeat,i=g):((s=~~(v/o))&&s===v/o&&(i=g,s--),g<i&&(i=g)),c=Tt(this._tTime,o),!_&&this._tTime&&c!==s&&this._tTime-c*o-this._dur<=0&&(c=s),d&&1&s&&(i=g-i,p=1),s!==c&&!this._lock){var T=d&&1&c,b=T===(d&&1&s);if(s<c&&(T=!T),_=T?0:g,this._lock=1,this.render(_||(p?0:ja(s*o)),e,!g)._lock=0,this._tTime=v,!e&&this.parent&&St(this,"onRepeat"),this.vars.repeatRefresh&&!p&&(this.invalidate()._lock=1),_&&_!==this._time||u!=!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(g=this._dur,m=this._tDur,b&&(this._lock=2,_=T?g:-1e-4,this.render(_,!0),this.vars.repeatRefresh&&!p&&this.invalidate()),this._lock=0,!this._ts&&!u)return this;Qb(this,p)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(h=function _findNextPauseTween(t,e,r){var i;if(e<r)for(i=t._first;i&&i._start<=r;){if("isPause"===i.data&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if("isPause"===i.data&&i._start<e)return i;i=i._prev}}(this,ja(_),ja(i)))&&(v-=i-(i=h._start)),this._tTime=v,this._time=i,this._act=!l,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=t,_=0),!_&&i&&!e&&!s&&(St(this,"onStart"),this._tTime!==v))return this;if(_<=i&&0<=t)for(n=this._first;n;){if(a=n._next,(n._act||i>=n._start)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(i-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(i-n._start)*n._ts,e,r),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=-X);break}}n=a}else{n=this._last;for(var w=t<0?t:i;n;){if(a=n._prev,(n._act||w<=n._end)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(w-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(w-n._start)*n._ts,e,r||B&&(n._initted||n._startAt)),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=w?-X:X);break}}n=a}}if(h&&!e&&(this.pause(),h.render(_<=i?0:-X)._zTime=_<=i?1:-1,this._ts))return this._start=f,Ha(this),this.render(t,e,r);this._onUpdate&&!e&&St(this,"onUpdate",!0),(v===m&&this._tTime>=this.totalDuration()||!v&&_)&&(f!==this._start&&Math.abs(l)===Math.abs(this._ts)||this._lock||(!t&&g||!(v===m&&0<this._ts||!v&&this._ts<0)||za(this,1),e||t<0&&!_||!v&&!_&&m||(St(this,v===m&&0<=t?"onComplete":"onReverseComplete",!0),!this._prom||v<m&&0<this.timeScale()||this._prom())))}return this},e.add=function add(e,i){var n=this;if(t(i)||(i=xt(this,i,e)),!(e instanceof Ut)){if(Z(e))return e.forEach(function(t){return n.add(t,i)}),this;if(r(e))return this.addLabel(e,i);if(!s(e))return this;e=Jt.delayedCall(0,e)}return this!==e?Ka(this,e,i):this},e.getChildren=function getChildren(t,e,r,i){void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),void 0===i&&(i=-U);for(var n=[],a=this._first;a;)a._start>=i&&(a instanceof Jt?e&&n.push(a):(r&&n.push(a),t&&n.push.apply(n,a.getChildren(!0,e,r)))),a=a._next;return n},e.getById=function getById(t){for(var e=this.getChildren(1,1,1),r=e.length;r--;)if(e[r].vars.id===t)return e[r]},e.remove=function remove(t){return r(t)?this.removeLabel(t):s(t)?this.killTweensOf(t):(ya(this,t),t===this._recent&&(this._recent=this._last),Aa(this))},e.totalTime=function totalTime(t,e){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=ja(Rt.time-(0<this._ts?t/this._ts:(this.totalDuration()-t)/-this._ts))),i.prototype.totalTime.call(this,t,e),this._forcing=0,this):this._tTime},e.addLabel=function addLabel(t,e){return this.labels[t]=xt(this,e),this},e.removeLabel=function removeLabel(t){return delete this.labels[t],this},e.addPause=function addPause(t,e,r){var i=Jt.delayedCall(0,e||T,r);return i.data="isPause",this._hasPause=1,Ka(this,i,xt(this,t))},e.removePause=function removePause(t){var e=this._first;for(t=xt(this,t);e;)e._start===t&&"isPause"===e.data&&za(e),e=e._next},e.killTweensOf=function killTweensOf(t,e,r){for(var i=this.getTweensOf(t,r),n=i.length;n--;)Nt!==i[n]&&i[n].kill(t,e);return this},e.getTweensOf=function getTweensOf(e,r){for(var i,n=[],a=Mt(e),s=this._first,o=t(r);s;)s instanceof Jt?la(s._targets,a)&&(o?(!Nt||s._initted&&s._ts)&&s.globalTime(0)<=r&&s.globalTime(s.totalDuration())>r:!r||s.isActive())&&n.push(s):(i=s.getTweensOf(a,r)).length&&n.push.apply(n,i),s=s._next;return n},e.tweenTo=function tweenTo(t,e){e=e||{};var r,i=this,n=xt(i,t),a=e.startAt,s=e.onStart,o=e.onStartParams,u=e.immediateRender,h=Jt.to(i,qa({ease:e.ease||"none",lazy:!1,immediateRender:!1,time:n,overwrite:"auto",duration:e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale())||X,onStart:function onStart(){if(i.pause(),!r){var t=e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale());h._dur!==t&&Ra(h,t,0,1).render(h._time,!0,!0),r=1}s&&s.apply(h,o||[])}},e));return u?h.render(0):h},e.tweenFromTo=function tweenFromTo(t,e,r){return this.tweenTo(e,qa({startAt:{time:xt(this,t)}},r))},e.recent=function recent(){return this._recent},e.nextLabel=function nextLabel(t){return void 0===t&&(t=this._time),rb(this,xt(this,t))},e.previousLabel=function previousLabel(t){return void 0===t&&(t=this._time),rb(this,xt(this,t),1)},e.currentLabel=function currentLabel(t){return arguments.length?this.seek(t,!0):this.previousLabel(this._time+X)},e.shiftChildren=function shiftChildren(t,e,r){void 0===r&&(r=0);for(var i,n=this._first,a=this.labels;n;)n._start>=r&&(n._start+=t,n._end+=t),n=n._next;if(e)for(i in a)a[i]>=r&&(a[i]+=t);return Aa(this)},e.invalidate=function invalidate(t){var e=this._first;for(this._lock=0;e;)e.invalidate(t),e=e._next;return i.prototype.invalidate.call(this,t)},e.clear=function clear(t){void 0===t&&(t=!0);for(var e,r=this._first;r;)e=r._next,this.remove(r),r=e;return this._dp&&(this._time=this._tTime=this._pTime=0),t&&(this.labels={}),Aa(this)},e.totalDuration=function totalDuration(t){var e,r,i,n=0,a=this,s=a._last,o=U;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-t:t));if(a._dirty){for(i=a.parent;s;)e=s._prev,s._dirty&&s.totalDuration(),o<(r=s._start)&&a._sort&&s._ts&&!a._lock?(a._lock=1,Ka(a,s,r-s._delay,1)._lock=0):o=r,r<0&&s._ts&&(n-=r,(!i&&!a._dp||i&&i.smoothChildTiming)&&(a._start+=r/a._ts,a._time-=r,a._tTime-=r),a.shiftChildren(-r,!1,-Infinity),o=0),s._end>n&&s._ts&&(n=s._end),s=e;Ra(a,a===L&&a._time>n?a._time:n,1,1),a._dirty=0}return a._tDur},Timeline.updateRoot=function updateRoot(t){if(L._ts&&(na(L,Ga(t,L)),f=Rt.frame),Rt.frame>=mt){mt+=V.autoSleep||120;var e=L._first;if((!e||!e._ts)&&V.autoSleep&&Rt._listeners.length<2){for(;e&&!e._ts;)e=e._next;e||Rt.sleep()}}},Timeline}(Ut);qa(Xt.prototype,{_lock:0,_hasPause:0,_forcing:0});function ac(t,e,i,n,a,o){var u,h,l,f;if(pt[t]&&!1!==(u=new pt[t]).init(a,u.rawVars?e[t]:function _processVars(t,e,i,n,a){if(s(t)&&(t=Gt(t,a,e,i,n)),!v(t)||t.style&&t.nodeType||Z(t)||J(t))return r(t)?Gt(t,a,e,i,n):t;var o,u={};for(o in t)u[o]=Gt(t[o],a,e,i,n);return u}(e[t],n,a,o,i),i,n,o)&&(i._pt=h=new ge(i._pt,a,t,0,1,u.render,u,0,u.priority),i!==c))for(l=i._ptLookup[i._targets.indexOf(a)],f=u._props.length;f--;)l[u._props[f]]=h;return u}function gc(t,r,e,i){var n,a,s=r.ease||i||"power1.inOut";if(Z(r))a=e[t]||(e[t]=[]),r.forEach(function(t,e){return a.push({t:e/(r.length-1)*100,v:t,e:s})});else for(n in r)a=e[n]||(e[n]=[]),"ease"===n||a.push({t:parseFloat(t),v:r[n],e:s})}var Nt,Wt,Qt=function _addPropTween(t,e,i,n,a,o,u,h,l,f){s(n)&&(n=n(a||0,t,o));var c,d=t[e],p="get"!==i?i:s(d)?l?t[e.indexOf("set")||!s(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():d,_=s(d)?l?ee:te:Zt;if(r(n)&&(~n.indexOf("random(")&&(n=ob(n)),"="===n.charAt(1)&&(!(c=ka(p,n)+(Ya(p)||0))&&0!==c||(n=c))),!f||p!==n||Wt)return isNaN(p*n)||""===n?(d||e in t||Q(e,n),function _addComplexStringPropTween(t,e,r,i,n,a,s){var o,u,h,l,f,c,d,p,_=new ge(this._pt,t,e,0,1,le,null,n),m=0,g=0;for(_.b=r,_.e=i,r+="",(d=~(i+="").indexOf("random("))&&(i=ob(i)),a&&(a(p=[r,i],t,e),r=p[0],i=p[1]),u=r.match(it)||[];o=it.exec(i);)l=o[0],f=i.substring(m,o.index),h?h=(h+1)%5:"rgba("===f.substr(-5)&&(h=1),l!==u[g++]&&(c=parseFloat(u[g-1])||0,_._pt={_next:_._pt,p:f||1===g?f:",",s:c,c:"="===l.charAt(1)?ka(c,l)-c:parseFloat(l)-c,m:h&&h<4?Math.round:0},m=it.lastIndex);return _.c=m<i.length?i.substring(m,i.length):"",_.fp=s,(nt.test(i)||d)&&(_.e=0),this._pt=_}.call(this,t,e,p,n,_,h||V.stringFilter,l)):(c=new ge(this._pt,t,e,+p||0,n-(p||0),"boolean"==typeof d?oe:se,0,_),l&&(c.fp=l),u&&c.modifier(u,this,t),this._pt=c)},Kt=function _initTween(t,e,r){var i,n,a,s,o,u,h,l,f,c,d,p,_,m=t.vars,g=m.ease,v=m.startAt,y=m.immediateRender,T=m.lazy,b=m.onUpdate,x=m.onUpdateParams,O=m.callbackScope,k=m.runBackwards,M=m.yoyoEase,A=m.keyframes,S=m.autoRevert,C=t._dur,P=t._startAt,D=t._targets,E=t.parent,z=E&&"nested"===E.data?E.vars.targets:D,R="auto"===t._overwrite&&!I,F=t.timeline;if(!F||A&&g||(g="none"),t._ease=jt(g,q.ease),t._yEase=M?Yt(jt(!0===M?g:M,q.ease)):0,M&&t._yoyo&&!t._repeat&&(M=t._yEase,t._yEase=t._ease,t._ease=M),t._from=!F&&!!m.runBackwards,!F||A&&!m.stagger){if(p=(l=D[0]?fa(D[0]).harness:0)&&m[l.prop],i=ua(m,ft),P&&(P._zTime<0&&P.progress(1),e<0&&k&&y&&!S?P.render(-1,!0):P.revert(k&&C?ht:ut),P._lazy=0),v){if(za(t._startAt=Jt.set(D,qa({data:"isStart",overwrite:!1,parent:E,immediateRender:!0,lazy:!P&&w(T),startAt:null,delay:0,onUpdate:b,onUpdateParams:x,callbackScope:O,stagger:0},v))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(B||!y&&!S)&&t._startAt.revert(ht),y&&C&&e<=0&&r<=0)return void(e&&(t._zTime=e))}else if(k&&C&&!P)if(e&&(y=!1),a=qa({overwrite:!1,data:"isFromStart",lazy:y&&!P&&w(T),immediateRender:y,stagger:0,parent:E},i),p&&(a[l.prop]=p),za(t._startAt=Jt.set(D,a)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(B?t._startAt.revert(ht):t._startAt.render(-1,!0)),t._zTime=e,y){if(!e)return}else _initTween(t._startAt,X,X);for(t._pt=t._ptCache=0,T=C&&w(T)||T&&!C,n=0;n<D.length;n++){if(h=(o=D[n])._gsap||ea(D)[n]._gsap,t._ptLookup[n]=c={},dt[h.id]&&ct.length&&ma(),d=z===D?n:z.indexOf(o),l&&!1!==(f=new l).init(o,p||i,t,d,z)&&(t._pt=s=new ge(t._pt,o,f.name,0,1,f.render,f,0,f.priority),f._props.forEach(function(t){c[t]=s}),f.priority&&(u=1)),!l||p)for(a in i)pt[a]&&(f=ac(a,i,t,d,o,z))?f.priority&&(u=1):c[a]=s=Qt.call(t,o,a,"get",i[a],d,z,0,m.stringFilter);t._op&&t._op[n]&&t.kill(o,t._op[n]),R&&t._pt&&(Nt=t,L.killTweensOf(o,c,t.globalTime(e)),_=!t.parent,Nt=0),t._pt&&T&&(dt[h.id]=1)}u&&me(t),t._onInit&&t._onInit(t)}t._onUpdate=b,t._initted=(!t._op||t._pt)&&!_,A&&e<=0&&F.render(U,!0,!0)},Gt=function _parseFuncOrString(t,e,i,n,a){return s(t)?t.call(e,i,n,a):r(t)&&~t.indexOf("random(")?ob(t):t},$t=vt+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Ht={};ha($t+",id,stagger,delay,duration,paused,scrollTrigger",function(t){return Ht[t]=1});var Jt=function(z){function Tween(e,r,i,n){var a;"number"==typeof r&&(i.duration=r,r=i,i=null);var s,o,u,h,l,f,c,d,p=(a=z.call(this,n?r:va(r))||this).vars,_=p.duration,m=p.delay,g=p.immediateRender,T=p.stagger,b=p.overwrite,x=p.keyframes,O=p.defaults,k=p.scrollTrigger,M=p.yoyoEase,A=r.parent||L,S=(Z(e)||J(e)?t(e[0]):"length"in r)?[e]:Mt(e);if(a._targets=S.length?ea(S):R("GSAP target "+e+" not found. https://greensock.com",!V.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=b,x||T||y(_)||y(m)){if(r=a.vars,(s=a.timeline=new Xt({data:"nested",defaults:O||{},targets:A&&"nested"===A.data?A.vars.targets:S})).kill(),s.parent=s._dp=_assertThisInitialized(a),s._start=0,T||y(_)||y(m)){if(h=S.length,c=T&&eb(T),v(T))for(l in T)~$t.indexOf(l)&&((d=d||{})[l]=T[l]);for(o=0;o<h;o++)(u=ua(r,Ht)).stagger=0,M&&(u.yoyoEase=M),d&&yt(u,d),f=S[o],u.duration=+Gt(_,_assertThisInitialized(a),o,f,S),u.delay=(+Gt(m,_assertThisInitialized(a),o,f,S)||0)-a._delay,!T&&1===h&&u.delay&&(a._delay=m=u.delay,a._start+=m,u.delay=0),s.to(f,u,c?c(o,f,S):0),s._ease=It.none;s.duration()?_=m=0:a.timeline=0}else if(x){va(qa(s.vars.defaults,{ease:"none"})),s._ease=jt(x.ease||r.ease||"none");var C,P,D,E=0;if(Z(x))x.forEach(function(t){return s.to(S,t,">")}),s.duration();else{for(l in u={},x)"ease"===l||"easeEach"===l||gc(l,x[l],u,x.easeEach);for(l in u)for(C=u[l].sort(function(t,e){return t.t-e.t}),o=E=0;o<C.length;o++)(D={ease:(P=C[o]).e,duration:(P.t-(o?C[o-1].t:0))/100*_})[l]=P.v,s.to(S,D,E),E+=D.duration;s.duration()<_&&s.to({},{duration:_-s.duration()})}}_||a.duration(_=s.duration())}else a.timeline=0;return!0!==b||I||(Nt=_assertThisInitialized(a),L.killTweensOf(S),Nt=0),Ka(A,_assertThisInitialized(a),i),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(g||!_&&!x&&a._start===ja(A._time)&&w(g)&&function _hasNoPausedAncestors(t){return!t||t._ts&&_hasNoPausedAncestors(t.parent)}(_assertThisInitialized(a))&&"nested"!==A.data)&&(a._tTime=-X,a.render(Math.max(0,-m)||0)),k&&La(_assertThisInitialized(a),k),a}_inheritsLoose(Tween,z);var e=Tween.prototype;return e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,c=this._time,d=this._tDur,p=this._dur,_=t<0,m=d-X<t&&!_?d:t<X?0:t;if(p){if(m!==this._tTime||!t||r||!this._initted&&this._tTime||this._startAt&&this._zTime<0!=_){if(i=m,l=this.timeline,this._repeat){if(s=p+this._rDelay,this._repeat<-1&&_)return this.totalTime(100*s+t,e,r);if(i=ja(m%s),m===d?(a=this._repeat,i=p):((a=~~(m/s))&&a===m/s&&(i=p,a--),p<i&&(i=p)),(u=this._yoyo&&1&a)&&(f=this._yEase,i=p-i),o=Tt(this._tTime,s),i===c&&!r&&this._initted)return this._tTime=m,this;a!==o&&(l&&this._yEase&&Qb(l,u),!this.vars.repeatRefresh||u||this._lock||(this._lock=r=1,this.render(ja(s*a),!0).invalidate()._lock=0))}if(!this._initted){if(Ma(this,_?t:i,r,e,m))return this._tTime=0,this;if(c!==this._time)return this;if(p!==this._dur)return this.render(t,e,r)}if(this._tTime=m,this._time=i,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=h=(f||this._ease)(i/p),this._from&&(this.ratio=h=1-h),i&&!c&&!e&&!a&&(St(this,"onStart"),this._tTime!==m))return this;for(n=this._pt;n;)n.r(h,n.d),n=n._next;l&&l.render(t<0?t:!i&&u?-X:l._dur*l._ease(i/this._dur),e,r)||this._startAt&&(this._zTime=t),this._onUpdate&&!e&&(_&&Ca(this,t,0,r),St(this,"onUpdate")),this._repeat&&a!==o&&this.vars.onRepeat&&!e&&this.parent&&St(this,"onRepeat"),m!==this._tDur&&m||this._tTime!==m||(_&&!this._onUpdate&&Ca(this,t,0,!0),!t&&p||!(m===this._tDur&&0<this._ts||!m&&this._ts<0)||za(this,1),e||_&&!c||!(m||c||u)||(St(this,m===d?"onComplete":"onReverseComplete",!0),!this._prom||m<d&&0<this.timeScale()||this._prom()))}}else!function _renderZeroDurationTween(t,e,r,i){var n,a,s,o=t.ratio,u=e<0||!e&&(!t._start&&function _parentPlayheadIsBeforeStart(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||_parentPlayheadIsBeforeStart(e))}(t)&&(t._initted||!bt(t))||(t._ts<0||t._dp._ts<0)&&!bt(t))?0:1,h=t._rDelay,l=0;if(h&&t._repeat&&(l=Ot(0,t._tDur,e),a=Tt(l,h),t._yoyo&&1&a&&(u=1-u),a!==Tt(t._tTime,h)&&(o=1-u,t.vars.repeatRefresh&&t._initted&&t.invalidate())),u!==o||B||i||t._zTime===X||!e&&t._zTime){if(!t._initted&&Ma(t,e,i,r,l))return;for(s=t._zTime,t._zTime=e||(r?X:0),r=r||e&&!s,t.ratio=u,t._from&&(u=1-u),t._time=0,t._tTime=l,n=t._pt;n;)n.r(u,n.d),n=n._next;e<0&&Ca(t,e,0,!0),t._onUpdate&&!r&&St(t,"onUpdate"),l&&t._repeat&&!r&&t.parent&&St(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===u&&(u&&za(t,1),r||B||(St(t,u?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)}(this,t,e,r);return this},e.targets=function targets(){return this._targets},e.invalidate=function invalidate(t){return t&&this.vars.runBackwards||(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),z.prototype.invalidate.call(this,t)},e.resetTo=function resetTo(t,e,r,i){d||Rt.wake(),this._ts||this.play();var n,a=Math.min(this._dur,(this._dp._time-this._start)*this._ts);return this._initted||Kt(this,a),n=this._ease(a/this._dur),function _updatePropTweens(t,e,r,i,n,a,s){var o,u,h,l,f=(t._pt&&t._ptCache||(t._ptCache={}))[e];if(!f)for(f=t._ptCache[e]=[],h=t._ptLookup,l=t._targets.length;l--;){if((o=h[l][e])&&o.d&&o.d._pt)for(o=o.d._pt;o&&o.p!==e&&o.fp!==e;)o=o._next;if(!o)return Wt=1,t.vars[e]="+=0",Kt(t,s),Wt=0,1;f.push(o)}for(l=f.length;l--;)(o=(u=f[l])._pt||u).s=!i&&0!==i||n?o.s+(i||0)+a*o.c:i,o.c=r-o.s,u.e&&(u.e=ia(r)+Ya(u.e)),u.b&&(u.b=o.s+Ya(u.b))}(this,t,e,r,i,n,a)?this.resetTo(t,e,r,i):(Ia(this,0),this.parent||xa(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function kill(t,e){if(void 0===e&&(e="all"),!(t||e&&"all"!==e))return this._lazy=this._pt=0,this.parent?tb(this):this;if(this.timeline){var i=this.timeline.totalDuration();return this.timeline.killTweensOf(t,e,Nt&&!0!==Nt.vars.overwrite)._first||tb(this),this.parent&&i!==this.timeline.totalDuration()&&Ra(this,this._dur*this.timeline._tDur/i,0,1),this}var n,a,s,o,u,h,l,f=this._targets,c=t?Mt(t):f,d=this._ptLookup,p=this._pt;if((!e||"all"===e)&&function _arraysMatch(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0}(f,c))return"all"===e&&(this._pt=0),tb(this);for(n=this._op=this._op||[],"all"!==e&&(r(e)&&(u={},ha(e,function(t){return u[t]=1}),e=u),e=function _addAliasesToVars(t,e){var r,i,n,a,s=t[0]?fa(t[0]).harness:0,o=s&&s.aliases;if(!o)return e;for(i in r=yt({},e),o)if(i in r)for(n=(a=o[i].split(",")).length;n--;)r[a[n]]=r[i];return r}(f,e)),l=f.length;l--;)if(~c.indexOf(f[l]))for(u in a=d[l],"all"===e?(n[l]=e,o=a,s={}):(s=n[l]=n[l]||{},o=e),o)(h=a&&a[u])&&("kill"in h.d&&!0!==h.d.kill(u)||ya(this,h,"_pt"),delete a[u]),"all"!==s&&(s[u]=1);return this._initted&&!this._pt&&p&&tb(this),this},Tween.to=function to(t,e,r){return new Tween(t,e,r)},Tween.from=function from(t,e){return Va(1,arguments)},Tween.delayedCall=function delayedCall(t,e,r,i){return new Tween(e,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:e,onReverseComplete:e,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},Tween.fromTo=function fromTo(t,e,r){return Va(2,arguments)},Tween.set=function set(t,e){return e.duration=0,e.repeatDelay||(e.repeat=0),new Tween(t,e)},Tween.killTweensOf=function killTweensOf(t,e,r){return L.killTweensOf(t,e,r)},Tween}(Ut);qa(Jt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),ha("staggerTo,staggerFrom,staggerFromTo",function(r){Jt[r]=function(){var t=new Xt,e=kt.call(arguments,0);return e.splice("staggerFromTo"===r?5:4,0,0),t[r].apply(t,e)}});function oc(t,e,r){return t.setAttribute(e,r)}function wc(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)}var Zt=function _setterPlain(t,e,r){return t[e]=r},te=function _setterFunc(t,e,r){return t[e](r)},ee=function _setterFuncWithParam(t,e,r,i){return t[e](i.fp,r)},re=function _getSetter(t,e){return s(t[e])?te:u(t[e])&&t.setAttribute?oc:Zt},se=function _renderPlain(t,e){return e.set(e.t,e.p,Math.round(1e6*(e.s+e.c*t))/1e6,e)},oe=function _renderBoolean(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},le=function _renderComplexString(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(1===t&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round(1e4*(r.s+r.c*t))/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},fe=function _renderPropTweens(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},pe=function _addPluginModifier(t,e,r,i){for(var n,a=this._pt;a;)n=a._next,a.p===i&&a.modifier(t,e,r),a=n},_e=function _killPropTweensOf(t){for(var e,r,i=this._pt;i;)r=i._next,i.p===t&&!i.op||i.op===t?ya(this,i,"_pt"):i.dep||(e=1),i=r;return!e},me=function _sortPropTweensByPriority(t){for(var e,r,i,n,a=t._pt;a;){for(e=a._next,r=i;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:n)?a._prev._next=a:i=a,(a._next=r)?r._prev=a:n=a,a=e}t._pt=i},ge=(PropTween.prototype.modifier=function modifier(t,e,r){this.mSet=this.mSet||this.set,this.set=wc,this.m=t,this.mt=r,this.tween=e},PropTween);function PropTween(t,e,r,i,n,a,s,o,u){this.t=e,this.s=i,this.c=n,this.p=r,this.r=a||se,this.d=s||this,this.set=o||Zt,this.pr=u||0,(this._next=t)&&(t._prev=this)}ha(vt+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(t){return ft[t]=1}),ot.TweenMax=ot.TweenLite=Jt,ot.TimelineLite=ot.TimelineMax=Xt,L=new Xt({sortChildren:!1,defaults:q,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),V.stringFilter=Fb;function Dc(t){return(be[t]||xe).map(function(t){return t()})}function Ec(){var t=Date.now(),o=[];2<t-Oe&&(Dc("matchMediaInit"),Te.forEach(function(t){var e,r,i,n,a=t.queries,s=t.conditions;for(r in a)(e=h.matchMedia(a[r]).matches)&&(i=1),e!==s[r]&&(s[r]=e,n=1);n&&(t.revert(),i&&o.push(t))}),Dc("matchMediaRevert"),o.forEach(function(t){return t.onMatch(t)}),Oe=t,Dc("matchMedia"))}var ye,Te=[],be={},xe=[],Oe=0,Me=((ye=Context.prototype).add=function add(t,i,n){function Dw(){var t,e=l,r=a.selector;return e&&e!==a&&e.data.push(a),n&&(a.selector=cb(n)),l=a,t=i.apply(a,arguments),s(t)&&a._r.push(t),l=e,a.selector=r,a.isReverted=!1,t}s(t)&&(n=i,i=t,t=s);var a=this;return a.last=Dw,t===s?Dw(a):t?a[t]=Dw:Dw},ye.ignore=function ignore(t){var e=l;l=null,t(this),l=e},ye.getTweens=function getTweens(){var e=[];return this.data.forEach(function(t){return t instanceof Context?e.push.apply(e,t.getTweens()):t instanceof Jt&&!(t.parent&&"nested"===t.parent.data)&&e.push(t)}),e},ye.clear=function clear(){this._r.length=this.data.length=0},ye.kill=function kill(e,t){var r=this;if(e){var i=this.getTweens();this.data.forEach(function(t){"isFlip"===t.data&&(t.revert(),t.getChildren(!0,!0,!1).forEach(function(t){return i.splice(i.indexOf(t),1)}))}),i.map(function(t){return{g:t.globalTime(0),t:t}}).sort(function(t,e){return e.g-t.g||-1}).forEach(function(t){return t.t.revert(e)}),this.data.forEach(function(t){return!(t instanceof Ut)&&t.revert&&t.revert(e)}),this._r.forEach(function(t){return t(e,r)}),this.isReverted=!0}else this.data.forEach(function(t){return t.kill&&t.kill()});if(this.clear(),t){var n=Te.indexOf(this);~n&&Te.splice(n,1)}},ye.revert=function revert(t){this.kill(t||{})},Context);function Context(t,e){this.selector=e&&cb(e),this.data=[],this._r=[],this.isReverted=!1,t&&this.add(t)}var Ae,Se=((Ae=MatchMedia.prototype).add=function add(t,e,r){v(t)||(t={matches:t});var i,n,a,s=new Me(0,r||this.scope),o=s.conditions={};for(n in this.contexts.push(s),e=s.add("onMatch",e),s.queries=t)"all"===n?a=1:(i=h.matchMedia(t[n]))&&(Te.indexOf(s)<0&&Te.push(s),(o[n]=i.matches)&&(a=1),i.addListener?i.addListener(Ec):i.addEventListener("change",Ec));return a&&e(s),this},Ae.revert=function revert(t){this.kill(t||{})},Ae.kill=function kill(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},MatchMedia);function MatchMedia(t){this.contexts=[],this.scope=t}var Ce={registerPlugin:function registerPlugin(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(t){return wb(t)})},timeline:function timeline(t){return new Xt(t)},getTweensOf:function getTweensOf(t,e){return L.getTweensOf(t,e)},getProperty:function getProperty(i,t,e,n){r(i)&&(i=Mt(i)[0]);var a=fa(i||{}).get,s=e?pa:oa;return"native"===e&&(e=""),i?t?s((pt[t]&&pt[t].get||a)(i,t,e,n)):function(t,e,r){return s((pt[t]&&pt[t].get||a)(i,t,e,r))}:i},quickSetter:function quickSetter(r,e,i){if(1<(r=Mt(r)).length){var n=r.map(function(t){return Pe.quickSetter(t,e,i)}),a=n.length;return function(t){for(var e=a;e--;)n[e](t)}}r=r[0]||{};var s=pt[e],o=fa(r),u=o.harness&&(o.harness.aliases||{})[e]||e,h=s?function(t){var e=new s;c._pt=0,e.init(r,i?t+i:t,c,0,[r]),e.render(1,e),c._pt&&fe(1,c)}:o.set(r,u);return s?h:function(t){return h(r,u,i?t+i:t,o,1)}},quickTo:function quickTo(t,i,e){function Vx(t,e,r){return n.resetTo(i,t,e,r)}var r,n=Pe.to(t,yt(((r={})[i]="+=0.1",r.paused=!0,r),e||{}));return Vx.tween=n,Vx},isTweening:function isTweening(t){return 0<L.getTweensOf(t,!0).length},defaults:function defaults(t){return t&&t.ease&&(t.ease=jt(t.ease,q.ease)),ta(q,t||{})},config:function config(t){return ta(V,t||{})},registerEffect:function registerEffect(t){var i=t.name,n=t.effect,e=t.plugins,a=t.defaults,r=t.extendTimeline;(e||"").split(",").forEach(function(t){return t&&!pt[t]&&!ot[t]&&R(i+" effect requires "+t+" plugin.")}),_t[i]=function(t,e,r){return n(Mt(t),qa(e||{},a),r)},r&&(Xt.prototype[i]=function(t,e,r){return this.add(_t[i](t,v(e)?e:(r=e)&&{},this),r)})},registerEase:function registerEase(t,e){It[t]=jt(e)},parseEase:function parseEase(t,e){return arguments.length?jt(t,e):It},getById:function getById(t){return L.getById(t)},exportRoot:function exportRoot(t,e){void 0===t&&(t={});var r,i,n=new Xt(t);for(n.smoothChildTiming=w(t.smoothChildTiming),L.remove(n),n._dp=0,n._time=n._tTime=L._time,r=L._first;r;)i=r._next,!e&&!r._dur&&r instanceof Jt&&r.vars.onComplete===r._targets[0]||Ka(n,r,r._start-r._delay),r=i;return Ka(L,n,0),n},context:function context(t,e){return t?new Me(t,e):l},matchMedia:function matchMedia(t){return new Se(t)},matchMediaRefresh:function matchMediaRefresh(){return Te.forEach(function(t){var e,r,i=t.conditions;for(r in i)i[r]&&(i[r]=!1,e=1);e&&t.revert()})||Ec()},addEventListener:function addEventListener(t,e){var r=be[t]||(be[t]=[]);~r.indexOf(e)||r.push(e)},removeEventListener:function removeEventListener(t,e){var r=be[t],i=r&&r.indexOf(e);0<=i&&r.splice(i,1)},utils:{wrap:function wrap(e,t,r){var i=t-e;return Z(e)?lb(e,wrap(0,e.length),t):Wa(r,function(t){return(i+(t-e)%i)%i+e})},wrapYoyo:function wrapYoyo(e,t,r){var i=t-e,n=2*i;return Z(e)?lb(e,wrapYoyo(0,e.length-1),t):Wa(r,function(t){return e+(i<(t=(n+(t-e)%n)%n||0)?n-t:t)})},distribute:eb,random:hb,snap:gb,normalize:function normalize(t,e,r){return At(t,e,0,1,r)},getUnit:Ya,clamp:function clamp(e,r,t){return Wa(t,function(t){return Ot(e,r,t)})},splitColor:Ab,toArray:Mt,selector:cb,mapRange:At,pipe:function pipe(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}},unitize:function unitize(e,r){return function(t){return e(parseFloat(t))+(r||Ya(t))}},interpolate:function interpolate(e,i,t,n){var a=isNaN(e+i)?0:function(t){return(1-t)*e+t*i};if(!a){var s,o,u,h,l,f=r(e),c={};if(!0===t&&(n=1)&&(t=null),f)e={p:e},i={p:i};else if(Z(e)&&!Z(i)){for(u=[],h=e.length,l=h-2,o=1;o<h;o++)u.push(interpolate(e[o-1],e[o]));h--,a=function func(t){t*=h;var e=Math.min(l,~~t);return u[e](t-e)},t=i}else n||(e=yt(Z(e)?[]:{},e));if(!u){for(s in i)Qt.call(c,e,s,"get",i[s]);a=function func(t){return fe(t,c)||(f?e.p:e)}}}return Wa(t,a)},shuffle:db},install:P,effects:_t,ticker:Rt,updateRoot:Xt.updateRoot,plugins:pt,globalTimeline:L,core:{PropTween:ge,globals:S,Tween:Jt,Timeline:Xt,Animation:Ut,getCache:fa,_removeLinkedListItem:ya,reverting:function reverting(){return B},context:function context(t){return t&&l&&(l.data.push(t),t._ctx=l),l},suppressOverwrites:function suppressOverwrites(t){return I=t}}};ha("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return Ce[t]=Jt[t]}),Rt.add(Xt.updateRoot),c=Ce.to({},{duration:0});function Ic(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r}function Kc(t,a){return{name:t,rawVars:1,init:function init(t,n,e){e._onInit=function(t){var e,i;if(r(n)&&(e={},ha(n,function(t){return e[t]=1}),n=e),a){for(i in e={},n)e[i]=a(n[i]);n=e}!function _addModifiers(t,e){var r,i,n,a=t._targets;for(r in e)for(i=a.length;i--;)(n=(n=t._ptLookup[i][r])&&n.d)&&(n._pt&&(n=Ic(n,r)),n&&n.modifier&&n.modifier(e[r],t,a[i],r))}(t,n)}}}}var Pe=Ce.registerPlugin({name:"attr",init:function init(t,e,r,i,n){var a,s,o;for(a in this.tween=r,e)o=t.getAttribute(a)||"",(s=this.add(t,"setAttribute",(o||0)+"",e[a],i,n,0,0,a)).op=a,s.b=o,this._props.push(a)},render:function render(t,e){for(var r=e._pt;r;)B?r.set(r.t,r.p,r.b,r):r.r(t,r.d),r=r._next}},{name:"endArray",init:function init(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r],0,0,0,0,0,1)}},Kc("roundProps",fb),Kc("modifiers"),Kc("snap",gb))||Ce;Jt.version=Xt.version=Pe.version="3.11.5",o=1,x()&&Ft();function ud(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function vd(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function wd(t,e){return e.set(e.t,e.p,t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function xd(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)}function yd(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)}function zd(t,e){return e.set(e.t,e.p,1!==t?e.b:e.e,e)}function Ad(t,e,r){return t.style[e]=r}function Bd(t,e,r){return t.style.setProperty(e,r)}function Cd(t,e,r){return t._gsap[e]=r}function Dd(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r}function Ed(t,e,r,i,n){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(n,a)}function Fd(t,e,r,i,n){var a=t._gsap;a[e]=r,a.renderTransform(n,a)}function Id(t,e){var r=this,i=this.target,n=i.style;if(t in nr){if(this.tfm=this.tfm||{},"transform"===t)return fr.transform.split(",").forEach(function(t){return Id.call(r,t,e)});if(~(t=fr[t]||t).indexOf(",")?t.split(",").forEach(function(t){return r.tfm[t]=vr(i,t)}):this.tfm[t]=i._gsap.x?i._gsap[t]:vr(i,t),0<=this.props.indexOf(cr))return;i._gsap.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(dr,e,"")),t=cr}(n||e)&&this.props.push(t,e,n[t])}function Jd(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))}function Kd(){var t,e,r=this.props,i=this.target,n=i.style,a=i._gsap;for(t=0;t<r.length;t+=3)r[t+1]?i[r[t]]=r[t+2]:r[t+2]?n[r[t]]=r[t+2]:n.removeProperty("--"===r[t].substr(0,2)?r[t]:r[t].replace(ur,"-$1").toLowerCase());if(this.tfm){for(e in this.tfm)a[e]=this.tfm[e];a.svg&&(a.renderTransform(),i.setAttribute("data-svg-origin",this.svgo||"")),(t=Be())&&t.isStart||n[cr]||(Jd(n),a.uncache=1)}}function Ld(t,e){var r={target:t,props:[],revert:Kd,save:Id};return t._gsap||Pe.core.getCache(t),e&&e.split(",").forEach(function(t){return r.save(t)}),r}function Nd(t,e){var r=Ee.createElementNS?Ee.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Ee.createElement(t);return r.style?r:Ee.createElement(t)}function Od(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(ur,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&Od(t,_r(e)||e,1)||""}function Rd(){(function _windowExists(){return"undefined"!=typeof window})()&&window.document&&(De=window,Ee=De.document,ze=Ee.documentElement,Fe=Nd("div")||{style:{}},Nd("div"),cr=_r(cr),dr=cr+"Origin",Fe.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Le=!!_r("perspective"),Be=Pe.core.reverting,Re=1)}function Sd(t){var e,r=Nd("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=this.parentNode,n=this.nextSibling,a=this.style.cssText;if(ze.appendChild(r),r.appendChild(this),this.style.display="block",t)try{e=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=Sd}catch(t){}else this._gsapBBox&&(e=this._gsapBBox());return i&&(n?i.insertBefore(this,n):i.appendChild(this)),ze.removeChild(r),this.style.cssText=a,e}function Td(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])}function Ud(e){var r;try{r=e.getBBox()}catch(t){r=Sd.call(e,!0)}return r&&(r.width||r.height)||e.getBBox===Sd||(r=Sd.call(e,!0)),!r||r.width||r.x||r.y?r:{x:+Td(e,["x","cx","x1"])||0,y:+Td(e,["y","cy","y1"])||0,width:0,height:0}}function Vd(t){return!(!t.getCTM||t.parentNode&&!t.ownerSVGElement||!Ud(t))}function Wd(t,e){if(e){var r=t.style;e in nr&&e!==dr&&(e=cr),r.removeProperty?("ms"!==e.substr(0,2)&&"webkit"!==e.substr(0,6)||(e="-"+e),r.removeProperty(e.replace(ur,"-$1").toLowerCase())):r.removeAttribute(e)}}function Xd(t,e,r,i,n,a){var s=new ge(t._pt,e,r,0,1,a?zd:yd);return(t._pt=s).b=i,s.e=n,t._props.push(r),s}function $d(t,e,r,i){var n,a,s,o,u=parseFloat(r)||0,h=(r+"").trim().substr((u+"").length)||"px",l=Fe.style,f=hr.test(e),c="svg"===t.tagName.toLowerCase(),d=(c?"client":"offset")+(f?"Width":"Height"),p="px"===i,_="%"===i;return i===h||!u||mr[i]||mr[h]?u:("px"===h||p||(u=$d(t,e,r,"px")),o=t.getCTM&&Vd(t),!_&&"%"!==h||!nr[e]&&!~e.indexOf("adius")?(l[f?"width":"height"]=100+(p?h:i),a=~e.indexOf("adius")||"em"===i&&t.appendChild&&!c?t:t.parentNode,o&&(a=(t.ownerSVGElement||{}).parentNode),a&&a!==Ee&&a.appendChild||(a=Ee.body),(s=a._gsap)&&_&&s.width&&f&&s.time===Rt.time&&!s.uncache?ia(u/s.width*100):(!_&&"%"!==h||gr[Od(a,"display")]||(l.position=Od(t,"position")),a===t&&(l.position="static"),a.appendChild(Fe),n=Fe[d],a.removeChild(Fe),l.position="absolute",f&&_&&((s=fa(a)).time=Rt.time,s.width=a[d]),ia(p?n*u/100:n&&u?100/n*u:0))):(n=o?t.getBBox()[f?"width":"height"]:t[d],ia(_?u/n*100:u/100*n)))}function ae(t,e,r,i){if(!r||"none"===r){var n=_r(e,t,1),a=n&&Od(t,n,1);a&&a!==r?(e=n,r=a):"borderColor"===e&&(r=Od(t,"borderTopColor"))}var s,o,u,h,l,f,c,d,p,_,m,g=new ge(this._pt,t.style,e,0,1,le),v=0,y=0;if(g.b=r,g.e=i,r+="","auto"===(i+="")&&(t.style[e]=i,i=Od(t,e)||i,t.style[e]=r),Fb(s=[r,i]),i=s[1],u=(r=s[0]).match(rt)||[],(i.match(rt)||[]).length){for(;o=rt.exec(i);)c=o[0],p=i.substring(v,o.index),l?l=(l+1)%5:"rgba("!==p.substr(-5)&&"hsla("!==p.substr(-5)||(l=1),c!==(f=u[y++]||"")&&(h=parseFloat(f)||0,m=f.substr((h+"").length),"="===c.charAt(1)&&(c=ka(h,c)+m),d=parseFloat(c),_=c.substr((d+"").length),v=rt.lastIndex-_.length,_||(_=_||V.units[e]||m,v===i.length&&(i+=_,g.e+=_)),m!==_&&(h=$d(t,e,f,_)||0),g._pt={_next:g._pt,p:p||1===y?p:",",s:h,c:d-h,m:l&&l<4||"zIndex"===e?Math.round:0});g.c=v<i.length?i.substring(v,i.length):""}else g.r="display"===e&&"none"===i?zd:yd;return nt.test(i)&&(g.e=0),this._pt=g}function ce(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return"top"!==r&&"bottom"!==r&&"left"!==i&&"right"!==i||(t=r,r=i,i=t),e[0]=yr[r]||r,e[1]=yr[i]||i,e.join(" ")}function de(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r,i,n,a=e.t,s=a.style,o=e.u,u=a._gsap;if("all"===o||!0===o)s.cssText="",i=1;else for(n=(o=o.split(",")).length;-1<--n;)r=o[n],nr[r]&&(i=1,r="transformOrigin"===r?dr:cr),Wd(a,r);i&&(Wd(a,cr),u&&(u.svg&&a.removeAttribute("transform"),xr(a,1),u.uncache=1,Jd(s)))}}function he(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t}function ie(t){var e=Od(t,cr);return he(e)?br:e.substr(7).match(et).map(ia)}function je(t,e){var r,i,n,a,s=t._gsap||fa(t),o=t.style,u=ie(t);return s.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(u=[(n=t.transform.baseVal.consolidate().matrix).a,n.b,n.c,n.d,n.e,n.f]).join(",")?br:u:(u!==br||t.offsetParent||t===ze||s.svg||(n=o.display,o.display="block",(r=t.parentNode)&&t.offsetParent||(a=1,i=t.nextElementSibling,ze.appendChild(t)),u=ie(t),n?o.display=n:Wd(t,"display"),a&&(i?r.insertBefore(t,i):r?r.appendChild(t):ze.removeChild(t))),e&&6<u.length?[u[0],u[1],u[4],u[5],u[12],u[13]]:u)}function ke(t,e,r,i,n,a){var s,o,u,h=t._gsap,l=n||je(t,!0),f=h.xOrigin||0,c=h.yOrigin||0,d=h.xOffset||0,p=h.yOffset||0,_=l[0],m=l[1],g=l[2],v=l[3],y=l[4],T=l[5],b=e.split(" "),w=parseFloat(b[0])||0,x=parseFloat(b[1])||0;r?l!==br&&(o=_*v-m*g)&&(u=w*(-m/o)+x*(_/o)-(_*T-m*y)/o,w=w*(v/o)+x*(-g/o)+(g*T-v*y)/o,x=u):(w=(s=Ud(t)).x+(~b[0].indexOf("%")?w/100*s.width:w),x=s.y+(~(b[1]||b[0]).indexOf("%")?x/100*s.height:x)),i||!1!==i&&h.smooth?(y=w-f,T=x-c,h.xOffset=d+(y*_+T*g)-y,h.yOffset=p+(y*m+T*v)-T):h.xOffset=h.yOffset=0,h.xOrigin=w,h.yOrigin=x,h.smooth=!!i,h.origin=e,h.originIsAbsolute=!!r,t.style[dr]="0px 0px",a&&(Xd(a,h,"xOrigin",f,w),Xd(a,h,"yOrigin",c,x),Xd(a,h,"xOffset",d,h.xOffset),Xd(a,h,"yOffset",p,h.yOffset)),t.setAttribute("data-svg-origin",w+" "+x)}function ne(t,e,r){var i=Ya(e);return ia(parseFloat(e)+parseFloat($d(t,"x",r+"px",i)))+i}function ue(t,e,i,n,a){var s,o,u=360,h=r(a),l=parseFloat(a)*(h&&~a.indexOf("rad")?ar:1)-n,f=n+l+"deg";return h&&("short"===(s=a.split("_")[1])&&(l%=u)!==l%180&&(l+=l<0?u:-u),"cw"===s&&l<0?l=(l+36e9)%u-~~(l/u)*u:"ccw"===s&&0<l&&(l=(l-36e9)%u-~~(l/u)*u)),t._pt=o=new ge(t._pt,e,i,n,l,vd),o.e=f,o.u="deg",t._props.push(i),o}function ve(t,e){for(var r in e)t[r]=e[r];return t}function we(t,e,r){var i,n,a,s,o,u,h,l=ve({},r._gsap),f=r.style;for(n in l.svg?(a=r.getAttribute("transform"),r.setAttribute("transform",""),f[cr]=e,i=xr(r,1),Wd(r,cr),r.setAttribute("transform",a)):(a=getComputedStyle(r)[cr],f[cr]=e,i=xr(r,1),f[cr]=a),nr)(a=l[n])!==(s=i[n])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(n)<0&&(o=Ya(a)!==(h=Ya(s))?$d(r,n,a,h):parseFloat(a),u=parseFloat(s),t._pt=new ge(t._pt,i,n,o,u-o,ud),t._pt.u=h||0,t._props.push(n));ve(i,l)}var De,Ee,ze,Re,Fe,Ie,Be,Le,Ye=It.Power0,Ve=It.Power1,qe=It.Power2,Ue=It.Power3,Xe=It.Power4,Ne=It.Linear,We=It.Quad,Qe=It.Cubic,Ke=It.Quart,Ge=It.Quint,$e=It.Strong,He=It.Elastic,Je=It.Back,Ze=It.SteppedEase,tr=It.Bounce,er=It.Sine,rr=It.Expo,ir=It.Circ,nr={},ar=180/Math.PI,sr=Math.PI/180,or=Math.atan2,ur=/([A-Z])/g,hr=/(left|right|width|margin|padding|x)/i,lr=/[\s,\(]\S/,fr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},cr="transform",dr=cr+"Origin",pr="O,Moz,ms,Ms,Webkit".split(","),_r=function _checkPropPrefix(t,e,r){var i=(e||Fe).style,n=5;if(t in i&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);n--&&!(pr[n]+t in i););return n<0?null:(3===n?"ms":0<=n?pr[n]:"")+t},mr={deg:1,rad:1,turn:1},gr={grid:1,flex:1},vr=function _get(t,e,r,i){var n;return Re||Rd(),e in fr&&"transform"!==e&&~(e=fr[e]).indexOf(",")&&(e=e.split(",")[0]),nr[e]&&"transform"!==e?(n=xr(t,i),n="transformOrigin"!==e?n[e]:n.svg?n.origin:Or(Od(t,dr))+" "+n.zOrigin+"px"):(n=t.style[e])&&"auto"!==n&&!i&&!~(n+"").indexOf("calc(")||(n=Tr[e]&&Tr[e](t,e,r)||Od(t,e)||ga(t,e)||("opacity"===e?1:0)),r&&!~(n+"").trim().indexOf(" ")?$d(t,e,n,r)+r:n},yr={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Tr={clearProps:function clearProps(t,e,r,i,n){if("isFromStart"!==n.data){var a=t._pt=new ge(t._pt,e,r,0,0,de);return a.u=i,a.pr=-10,a.tween=n,t._props.push(r),1}}},br=[1,0,0,1,0,0],wr={},xr=function _parseTransform(t,e){var r=t._gsap||new qt(t);if("x"in r&&!e&&!r.uncache)return r;var i,n,a,s,o,u,h,l,f,c,d,p,_,m,g,v,y,T,b,w,x,O,k,M,A,S,C,P,D,E,z,R,F=t.style,I=r.scaleX<0,B="deg",L=getComputedStyle(t),Y=Od(t,dr)||"0";return i=n=a=u=h=l=f=c=d=0,s=o=1,r.svg=!(!t.getCTM||!Vd(t)),L.translate&&("none"===L.translate&&"none"===L.scale&&"none"===L.rotate||(F[cr]=("none"!==L.translate?"translate3d("+(L.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+("none"!==L.rotate?"rotate("+L.rotate+") ":"")+("none"!==L.scale?"scale("+L.scale.split(" ").join(",")+") ":"")+("none"!==L[cr]?L[cr]:"")),F.scale=F.rotate=F.translate="none"),m=je(t,r.svg),r.svg&&(M=r.uncache?(A=t.getBBox(),Y=r.xOrigin-A.x+"px "+(r.yOrigin-A.y)+"px",""):!e&&t.getAttribute("data-svg-origin"),ke(t,M||Y,!!M||r.originIsAbsolute,!1!==r.smooth,m)),p=r.xOrigin||0,_=r.yOrigin||0,m!==br&&(T=m[0],b=m[1],w=m[2],x=m[3],i=O=m[4],n=k=m[5],6===m.length?(s=Math.sqrt(T*T+b*b),o=Math.sqrt(x*x+w*w),u=T||b?or(b,T)*ar:0,(f=w||x?or(w,x)*ar+u:0)&&(o*=Math.abs(Math.cos(f*sr))),r.svg&&(i-=p-(p*T+_*w),n-=_-(p*b+_*x))):(R=m[6],E=m[7],C=m[8],P=m[9],D=m[10],z=m[11],i=m[12],n=m[13],a=m[14],h=(g=or(R,D))*ar,g&&(M=O*(v=Math.cos(-g))+C*(y=Math.sin(-g)),A=k*v+P*y,S=R*v+D*y,C=O*-y+C*v,P=k*-y+P*v,D=R*-y+D*v,z=E*-y+z*v,O=M,k=A,R=S),l=(g=or(-w,D))*ar,g&&(v=Math.cos(-g),z=x*(y=Math.sin(-g))+z*v,T=M=T*v-C*y,b=A=b*v-P*y,w=S=w*v-D*y),u=(g=or(b,T))*ar,g&&(M=T*(v=Math.cos(g))+b*(y=Math.sin(g)),A=O*v+k*y,b=b*v-T*y,k=k*v-O*y,T=M,O=A),h&&359.9<Math.abs(h)+Math.abs(u)&&(h=u=0,l=180-l),s=ia(Math.sqrt(T*T+b*b+w*w)),o=ia(Math.sqrt(k*k+R*R)),g=or(O,k),f=2e-4<Math.abs(g)?g*ar:0,d=z?1/(z<0?-z:z):0),r.svg&&(M=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!he(Od(t,cr)),M&&t.setAttribute("transform",M))),90<Math.abs(f)&&Math.abs(f)<270&&(I?(s*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(o*=-1,f+=f<=0?180:-180)),e=e||r.uncache,r.x=i-((r.xPercent=i&&(!e&&r.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-i)?-50:0)))?t.offsetWidth*r.xPercent/100:0)+"px",r.y=n-((r.yPercent=n&&(!e&&r.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-n)?-50:0)))?t.offsetHeight*r.yPercent/100:0)+"px",r.z=a+"px",r.scaleX=ia(s),r.scaleY=ia(o),r.rotation=ia(u)+B,r.rotationX=ia(h)+B,r.rotationY=ia(l)+B,r.skewX=f+B,r.skewY=c+B,r.transformPerspective=d+"px",(r.zOrigin=parseFloat(Y.split(" ")[2])||0)&&(F[dr]=Or(Y)),r.xOffset=r.yOffset=0,r.force3D=V.force3D,r.renderTransform=r.svg?Pr:Le?Cr:kr,r.uncache=0,r},Or=function _firstTwoOnly(t){return(t=t.split(" "))[0]+" "+t[1]},kr=function _renderNon3DTransforms(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Cr(t,e)},Mr="0deg",Ar="0px",Sr=") ",Cr=function _renderCSSTransforms(t,e){var r=e||this,i=r.xPercent,n=r.yPercent,a=r.x,s=r.y,o=r.z,u=r.rotation,h=r.rotationY,l=r.rotationX,f=r.skewX,c=r.skewY,d=r.scaleX,p=r.scaleY,_=r.transformPerspective,m=r.force3D,g=r.target,v=r.zOrigin,y="",T="auto"===m&&t&&1!==t||!0===m;if(v&&(l!==Mr||h!==Mr)){var b,w=parseFloat(h)*sr,x=Math.sin(w),O=Math.cos(w);w=parseFloat(l)*sr,b=Math.cos(w),a=ne(g,a,x*b*-v),s=ne(g,s,-Math.sin(w)*-v),o=ne(g,o,O*b*-v+v)}_!==Ar&&(y+="perspective("+_+Sr),(i||n)&&(y+="translate("+i+"%, "+n+"%) "),!T&&a===Ar&&s===Ar&&o===Ar||(y+=o!==Ar||T?"translate3d("+a+", "+s+", "+o+") ":"translate("+a+", "+s+Sr),u!==Mr&&(y+="rotate("+u+Sr),h!==Mr&&(y+="rotateY("+h+Sr),l!==Mr&&(y+="rotateX("+l+Sr),f===Mr&&c===Mr||(y+="skew("+f+", "+c+Sr),1===d&&1===p||(y+="scale("+d+", "+p+Sr),g.style[cr]=y||"translate(0, 0)"},Pr=function _renderSVGTransforms(t,e){var r,i,n,a,s,o=e||this,u=o.xPercent,h=o.yPercent,l=o.x,f=o.y,c=o.rotation,d=o.skewX,p=o.skewY,_=o.scaleX,m=o.scaleY,g=o.target,v=o.xOrigin,y=o.yOrigin,T=o.xOffset,b=o.yOffset,w=o.forceCSS,x=parseFloat(l),O=parseFloat(f);c=parseFloat(c),d=parseFloat(d),(p=parseFloat(p))&&(d+=p=parseFloat(p),c+=p),c||d?(c*=sr,d*=sr,r=Math.cos(c)*_,i=Math.sin(c)*_,n=Math.sin(c-d)*-m,a=Math.cos(c-d)*m,d&&(p*=sr,s=Math.tan(d-p),n*=s=Math.sqrt(1+s*s),a*=s,p&&(s=Math.tan(p),r*=s=Math.sqrt(1+s*s),i*=s)),r=ia(r),i=ia(i),n=ia(n),a=ia(a)):(r=_,a=m,i=n=0),(x&&!~(l+"").indexOf("px")||O&&!~(f+"").indexOf("px"))&&(x=$d(g,"x",l,"px"),O=$d(g,"y",f,"px")),(v||y||T||b)&&(x=ia(x+v-(v*r+y*n)+T),O=ia(O+y-(v*i+y*a)+b)),(u||h)&&(s=g.getBBox(),x=ia(x+u/100*s.width),O=ia(O+h/100*s.height)),s="matrix("+r+","+i+","+n+","+a+","+x+","+O+")",g.setAttribute("transform",s),w&&(g.style[cr]=s)};ha("padding,margin,Width,Radius",function(e,r){var t="Right",i="Bottom",n="Left",o=(r<3?["Top",t,i,n]:["Top"+n,"Top"+t,i+t,i+n]).map(function(t){return r<2?e+t:"border"+t+e});Tr[1<r?"border"+e:e]=function(e,t,r,i,n){var a,s;if(arguments.length<4)return a=o.map(function(t){return vr(e,t,r)}),5===(s=a.join(" ")).split(a[0]).length?a[0]:s;a=(i+"").split(" "),s={},o.forEach(function(t,e){return s[t]=a[e]=a[e]||a[(e-1)/2|0]}),e.init(t,s,n)}});var Dr,Er,zr,Rr={name:"css",register:Rd,targetTest:function targetTest(t){return t.style&&t.nodeType},init:function init(t,e,i,n,a){var s,o,u,h,l,f,c,d,p,_,m,g,v,y,T,b,w=this._props,x=t.style,O=i.vars.startAt;for(c in Re||Rd(),this.styles=this.styles||Ld(t),b=this.styles.props,this.tween=i,e)if("autoRound"!==c&&(o=e[c],!pt[c]||!ac(c,e,i,n,t,a)))if(l=typeof o,f=Tr[c],"function"===l&&(l=typeof(o=o.call(i,n,t,a))),"string"===l&&~o.indexOf("random(")&&(o=ob(o)),f)f(this,t,c,o,i)&&(T=1);else if("--"===c.substr(0,2))s=(getComputedStyle(t).getPropertyValue(c)+"").trim(),o+="",Et.lastIndex=0,Et.test(s)||(d=Ya(s),p=Ya(o)),p?d!==p&&(s=$d(t,c,s,p)+p):d&&(o+=d),this.add(x,"setProperty",s,o,n,a,0,0,c),w.push(c),b.push(c,0,x[c]);else if("undefined"!==l){if(O&&c in O?(s="function"==typeof O[c]?O[c].call(i,n,t,a):O[c],r(s)&&~s.indexOf("random(")&&(s=ob(s)),Ya(s+"")||(s+=V.units[c]||Ya(vr(t,c))||""),"="===(s+"").charAt(1)&&(s=vr(t,c))):s=vr(t,c),h=parseFloat(s),(_="string"===l&&"="===o.charAt(1)&&o.substr(0,2))&&(o=o.substr(2)),u=parseFloat(o),c in fr&&("autoAlpha"===c&&(1===h&&"hidden"===vr(t,"visibility")&&u&&(h=0),b.push("visibility",0,x.visibility),Xd(this,x,"visibility",h?"inherit":"hidden",u?"inherit":"hidden",!u)),"scale"!==c&&"transform"!==c&&~(c=fr[c]).indexOf(",")&&(c=c.split(",")[0])),m=c in nr)if(this.styles.save(c),g||((v=t._gsap).renderTransform&&!e.parseTransform||xr(t,e.parseTransform),y=!1!==e.smoothOrigin&&v.smooth,(g=this._pt=new ge(this._pt,x,cr,0,1,v.renderTransform,v,0,-1)).dep=1),"scale"===c)this._pt=new ge(this._pt,v,"scaleY",v.scaleY,(_?ka(v.scaleY,_+u):u)-v.scaleY||0,ud),this._pt.u=0,w.push("scaleY",c),c+="X";else{if("transformOrigin"===c){b.push(dr,0,x[dr]),o=ce(o),v.svg?ke(t,o,0,y,0,this):((p=parseFloat(o.split(" ")[2])||0)!==v.zOrigin&&Xd(this,v,"zOrigin",v.zOrigin,p),Xd(this,x,c,Or(s),Or(o)));continue}if("svgOrigin"===c){ke(t,o,1,y,0,this);continue}if(c in wr){ue(this,v,c,h,_?ka(h,_+o):o);continue}if("smoothOrigin"===c){Xd(this,v,"smooth",v.smooth,o);continue}if("force3D"===c){v[c]=o;continue}if("transform"===c){we(this,o,t);continue}}else c in x||(c=_r(c)||c);if(m||(u||0===u)&&(h||0===h)&&!lr.test(o)&&c in x)u=u||0,(d=(s+"").substr((h+"").length))!==(p=Ya(o)||(c in V.units?V.units[c]:d))&&(h=$d(t,c,s,p)),this._pt=new ge(this._pt,m?v:x,c,h,(_?ka(h,_+u):u)-h,m||"px"!==p&&"zIndex"!==c||!1===e.autoRound?ud:xd),this._pt.u=p||0,d!==p&&"%"!==p&&(this._pt.b=s,this._pt.r=wd);else if(c in x)ae.call(this,t,c,s,_?_+o:o);else if(c in t)this.add(t,c,s||t[c],_?_+o:o,n,a);else if("parseTransform"!==c){Q(c,o);continue}m||(c in x?b.push(c,0,x[c]):b.push(c,1,s||t[c])),w.push(c)}T&&me(this)},render:function render(t,e){if(e.tween._time||!Be())for(var r=e._pt;r;)r.r(t,r.d),r=r._next;else e.styles.revert()},get:vr,aliases:fr,getSetter:function getSetter(t,e,r){var i=fr[e];return i&&i.indexOf(",")<0&&(e=i),e in nr&&e!==dr&&(t._gsap.x||vr(t,"x"))?r&&Ie===r?"scale"===e?Dd:Cd:(Ie=r||{})&&("scale"===e?Ed:Fd):t.style&&!u(t.style[e])?Ad:~e.indexOf("-")?Bd:re(t,e)},core:{_removeProperty:Wd,_getMatrix:je}};Pe.utils.checkPrefix=_r,Pe.core.getStyleSaver=Ld,zr=ha((Dr="x,y,z,scale,scaleX,scaleY,xPercent,yPercent")+","+(Er="rotation,rotationX,rotationY,skewX,skewY")+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){nr[t]=1}),ha(Er,function(t){V.units[t]="deg",wr[t]=1}),fr[zr[13]]=Dr+","+Er,ha("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var e=t.split(":");fr[e[1]]=zr[e[0]]}),ha("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){V.units[t]="px"}),Pe.registerPlugin(Rr);var Fr=Pe.registerPlugin(Rr)||Pe,Ir=Fr.core.Tween;e.Back=Je,e.Bounce=tr,e.CSSPlugin=Rr,e.Circ=ir,e.Cubic=Qe,e.Elastic=He,e.Expo=rr,e.Linear=Ne,e.Power0=Ye,e.Power1=Ve,e.Power2=qe,e.Power3=Ue,e.Power4=Xe,e.Quad=We,e.Quart=Ke,e.Quint=Ge,e.Sine=er,e.SteppedEase=Ze,e.Strong=$e,e.TimelineLite=Xt,e.TimelineMax=Xt,e.TweenLite=Jt,e.TweenMax=Ir,e.default=Fr,e.gsap=Fr;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});

/*!
 * Draggable 3.11.5
 * https://greensock.com
 * 
 * @license Copyright 2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).window=e.window||{})}(this,function(e){"use strict";function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function w(e,t){if(e.parentNode&&(h||T(e))){var n=L(e),o=n?n.getAttribute("xmlns")||"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",r=n?t?"rect":"g":"div",i=2!==t?0:100,a=3===t?100:0,l="position:absolute;display:block;pointer-events:none;margin:0;padding:0;",s=h.createElementNS?h.createElementNS(o.replace(/^https/,"http"),r):h.createElement(r);return t&&(n?(g=g||w(e),s.setAttribute("width",.01),s.setAttribute("height",.01),s.setAttribute("transform","translate("+i+","+a+")"),g.appendChild(s)):(f||((f=w(e)).style.cssText=l),s.style.cssText=l+"width:0.1px;height:0.1px;top:"+a+"px;left:"+i+"px",f.appendChild(s))),s}throw"Need document and parent."}function A(e,t,n,o,r,i,a){return e.a=t,e.b=n,e.c=o,e.d=r,e.e=i,e.f=a,e}var h,u,r,i,f,g,x,m,y,t,v="transform",b=v+"Origin",T=function _setDoc(e){var t=e.ownerDocument||e;!(v in e.style)&&"msTransform"in e.style&&(b=(v="msTransform")+"Origin");for(;t.parentNode&&(t=t.parentNode););if(u=window,x=new ge,t){r=(h=t).documentElement,i=t.body,(m=h.createElementNS("http://www.w3.org/2000/svg","g")).style.transform="none";var n=t.createElement("div"),o=t.createElement("div");i.appendChild(n),n.appendChild(o),n.style.position="static",n.style[v]="translate3d(0,0,1px)",y=o.offsetParent!==n,i.removeChild(n)}return t},D=function _forceNonZeroScale(e){for(var t,n;e&&e!==i;)(n=e._gsap)&&n.uncache&&n.get(e,"x"),n&&!n.scaleX&&!n.scaleY&&n.renderTransform&&(n.scaleX=n.scaleY=1e-4,n.renderTransform(1,n),t?t.push(n):t=[n]),e=e.parentNode;return t},M=[],E=[],S=function _getDocScrollTop(){return u.pageYOffset||h.scrollTop||r.scrollTop||i.scrollTop||0},P=function _getDocScrollLeft(){return u.pageXOffset||h.scrollLeft||r.scrollLeft||i.scrollLeft||0},L=function _svgOwner(e){return e.ownerSVGElement||("svg"===(e.tagName+"").toLowerCase()?e:null)},C=function _isFixed(e){return"fixed"===u.getComputedStyle(e).position||((e=e.parentNode)&&1===e.nodeType?_isFixed(e):void 0)},N=function _placeSiblings(e,t){var n,o,r,i,a,l,s=L(e),c=e===s,d=s?M:E,p=e.parentNode;if(e===u)return e;if(d.length||d.push(w(e,1),w(e,2),w(e,3)),n=s?g:f,s)c?(i=-(r=function _getCTM(e){var t,n=e.getCTM();return n||(t=e.style[v],e.style[v]="none",e.appendChild(m),n=m.getCTM(),e.removeChild(m),t?e.style[v]=t:e.style.removeProperty(v.replace(/([A-Z])/g,"-$1").toLowerCase())),n||x.clone()}(e)).e/r.a,a=-r.f/r.d,o=x):e.getBBox?(r=e.getBBox(),i=(o=(o=e.transform?e.transform.baseVal:{}).numberOfItems?1<o.numberOfItems?function _consolidate(e){for(var t=new ge,n=0;n<e.numberOfItems;n++)t.multiply(e.getItem(n).matrix);return t}(o):o.getItem(0).matrix:x).a*r.x+o.c*r.y,a=o.b*r.x+o.d*r.y):(o=new ge,i=a=0),t&&"g"===e.tagName.toLowerCase()&&(i=a=0),(c?s:p).appendChild(n),n.setAttribute("transform","matrix("+o.a+","+o.b+","+o.c+","+o.d+","+(o.e+i)+","+(o.f+a)+")");else{if(i=a=0,y)for(o=e.offsetParent,r=e;(r=r&&r.parentNode)&&r!==o&&r.parentNode;)4<(u.getComputedStyle(r)[v]+"").length&&(i=r.offsetLeft,a=r.offsetTop,r=0);if("absolute"!==(l=u.getComputedStyle(e)).position&&"fixed"!==l.position)for(o=e.offsetParent;p&&p!==o;)i+=p.scrollLeft||0,a+=p.scrollTop||0,p=p.parentNode;(r=n.style).top=e.offsetTop-a+"px",r.left=e.offsetLeft-i+"px",r[v]=l[v],r[b]=l[b],r.position="fixed"===l.position?"fixed":"absolute",e.parentNode.appendChild(n)}return n},ge=((t=Matrix2D.prototype).inverse=function inverse(){var e=this.a,t=this.b,n=this.c,o=this.d,r=this.e,i=this.f,a=e*o-t*n||1e-10;return A(this,o/a,-t/a,-n/a,e/a,(n*i-o*r)/a,-(e*i-t*r)/a)},t.multiply=function multiply(e){var t=this.a,n=this.b,o=this.c,r=this.d,i=this.e,a=this.f,l=e.a,s=e.c,c=e.b,d=e.d,p=e.e,u=e.f;return A(this,l*t+c*o,l*n+c*r,s*t+d*o,s*n+d*r,i+p*t+u*o,a+p*n+u*r)},t.clone=function clone(){return new Matrix2D(this.a,this.b,this.c,this.d,this.e,this.f)},t.equals=function equals(e){var t=this.a,n=this.b,o=this.c,r=this.d,i=this.e,a=this.f;return t===e.a&&n===e.b&&o===e.c&&r===e.d&&i===e.e&&a===e.f},t.apply=function apply(e,t){void 0===t&&(t={});var n=e.x,o=e.y,r=this.a,i=this.b,a=this.c,l=this.d,s=this.e,c=this.f;return t.x=n*r+o*a+s||0,t.y=n*i+o*l+c||0,t},Matrix2D);function Matrix2D(e,t,n,o,r,i){void 0===e&&(e=1),void 0===t&&(t=0),void 0===n&&(n=0),void 0===o&&(o=1),void 0===r&&(r=0),void 0===i&&(i=0),A(this,e,t,n,o,r,i)}function getGlobalMatrix(e,t,n,o){if(!e||!e.parentNode||(h||T(e)).documentElement===e)return new ge;var r=D(e),i=L(e)?M:E,a=N(e,n),l=i[0].getBoundingClientRect(),s=i[1].getBoundingClientRect(),c=i[2].getBoundingClientRect(),d=a.parentNode,p=!o&&C(e),u=new ge((s.left-l.left)/100,(s.top-l.top)/100,(c.left-l.left)/100,(c.top-l.top)/100,l.left+(p?0:P()),l.top+(p?0:S()));if(d.removeChild(a),r)for(l=r.length;l--;)(s=r[l]).scaleX=s.scaleY=0,s.renderTransform(1,s);return t?u.inverse():u}function X(){return"undefined"!=typeof window}function Y(){return xe||X()&&(xe=window.gsap)&&xe.registerPlugin&&xe}function Z(e){return"function"==typeof e}function $(e){return"object"==typeof e}function _(e){return void 0===e}function aa(){return!1}function da(e){return Math.round(1e4*e)/1e4}function fa(e,t){var n=ye.createElementNS?ye.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):ye.createElement(e);return n.style?n:ye.createElement(e)}function ra(e,t){var n,o={};for(n in e)o[n]=t?e[n]*t:e[n];return o}function ta(e,t){for(var n,o=e.length;o--;)t?e[o].style.touchAction=t:e[o].style.removeProperty("touch-action"),(n=e[o].children)&&n.length&&ta(n,t)}function ua(){return Be.forEach(function(e){return e()})}function wa(){return!Be.length&&xe.ticker.remove(ua)}function xa(e){for(var t=Be.length;t--;)Be[t]===e&&Be.splice(t,1);xe.to(wa,{overwrite:!0,delay:15,duration:0,onComplete:wa,data:"_draggable"})}function za(e,t,n,o){if(e.addEventListener){var r=Me[t];o=o||(d?{passive:!1}:null),e.addEventListener(r||t,n,o),r&&t!==r&&e.addEventListener(t,n,o)}}function Aa(e,t,n,o){if(e.removeEventListener){var r=Me[t];e.removeEventListener(r||t,n,o),r&&t!==r&&e.removeEventListener(t,n,o)}}function Ba(e){e.preventDefault&&e.preventDefault(),e.preventManipulation&&e.preventManipulation()}function Da(e){Ee=e.touches&&Ce<e.touches.length,Aa(e.target,"touchend",Da)}function Ea(e){Ee=e.touches&&Ce<e.touches.length,za(e.target,"touchend",Da)}function Fa(e){return me.pageYOffset||e.scrollTop||e.documentElement.scrollTop||e.body.scrollTop||0}function Ga(e){return me.pageXOffset||e.scrollLeft||e.documentElement.scrollLeft||e.body.scrollLeft||0}function Ha(e,t){za(e,"scroll",t),We(e.parentNode)||Ha(e.parentNode,t)}function Ia(e,t){Aa(e,"scroll",t),We(e.parentNode)||Ia(e.parentNode,t)}function Ka(e,t){var n="x"===t?"Width":"Height",o="scroll"+n,r="client"+n;return Math.max(0,We(e)?Math.max(ve[o],l[o])-(me["inner"+n]||ve[r]||l[r]):e[o]-e[r])}function La(e,t){var n=Ka(e,"x"),o=Ka(e,"y");We(e)?e=Qe:La(e.parentNode,t),e._gsMaxScrollX=n,e._gsMaxScrollY=o,t||(e._gsScrollX=e.scrollLeft||0,e._gsScrollY=e.scrollTop||0)}function Ma(e,t,n){var o=e.style;o&&(_(o[t])&&(t=c(t,e)||t),null==n?o.removeProperty&&o.removeProperty(t.replace(/([A-Z])/g,"-$1").toLowerCase()):o[t]=n)}function Na(e){return me.getComputedStyle(e instanceof Element?e:e.host||(e.parentNode||{}).host||e)}function Pa(e){if(e===me)return p.left=p.top=0,p.width=p.right=ve.clientWidth||e.innerWidth||l.clientWidth||0,p.height=p.bottom=(e.innerHeight||0)-20<ve.clientHeight?ve.clientHeight:e.innerHeight||l.clientHeight||0,p;var t=e.ownerDocument||ye,n=_(e.pageX)?e.nodeType||_(e.left)||_(e.top)?Te(e)[0].getBoundingClientRect():e:{left:e.pageX-Ga(t),top:e.pageY-Fa(t),right:e.pageX-Ga(t)+1,bottom:e.pageY-Fa(t)+1};return _(n.right)&&!_(n.width)?(n.right=n.left+n.width,n.bottom=n.top+n.height):_(n.width)&&(n={width:n.right-n.left,height:n.bottom-n.top,right:n.right,left:n.left,bottom:n.bottom,top:n.top}),n}function Qa(e,t,n){var o,r=e.vars,i=r[n],a=e._listeners[t];return Z(i)&&(o=i.apply(r.callbackScope||e,r[n+"Params"]||[e.pointerEvent])),a&&!1===e.dispatchEvent(t)&&(o=!1),o}function Ra(e,t){var n,o,r,i=Te(e)[0];return i.nodeType||i===me?B(i,t):_(e.left)?{left:o=e.min||e.minX||e.minRotation||0,top:n=e.min||e.minY||0,width:(e.max||e.maxX||e.maxRotation||0)-o,height:(e.max||e.maxY||0)-n}:(r={x:0,y:0},{left:e.left-r.x,top:e.top-r.y,width:e.width,height:e.height})}function Ua(r,i,e,t,a,n){var o,l,s,c={};if(i)if(1!==a&&i instanceof Array){if(c.end=o=[],s=i.length,$(i[0]))for(l=0;l<s;l++)o[l]=ra(i[l],a);else for(l=0;l<s;l++)o[l]=i[l]*a;e+=1.1,t-=1.1}else Z(i)?c.end=function(e){var t,n,o=i.call(r,e);if(1!==a)if($(o)){for(n in t={},o)t[n]=o[n]*a;o=t}else o*=a;return o}:c.end=i;return!e&&0!==e||(c.max=e),!t&&0!==t||(c.min=t),n&&(c.velocity=0),c}function Va(e){var t;return!(!e||!e.getAttribute||e===l)&&(!("true"!==(t=e.getAttribute("data-clickable"))&&("false"===t||!e.onclick&&!o.test(e.nodeName+"")&&"true"!==e.getAttribute("contentEditable")))||Va(e.parentNode))}function Wa(e,t){for(var n,o=e.length;o--;)(n=e[o]).ondragstart=n.onselectstart=t?null:aa,xe.set(n,{lazy:!0,userSelect:t?"text":"none"})}function $a(i,r){i=xe.utils.toArray(i)[0],r=r||{};var a,l,s,e,c,d,p=document.createElement("div"),u=p.style,t=i.firstChild,h=0,f=0,g=i.scrollTop,x=i.scrollLeft,m=i.scrollWidth,y=i.scrollHeight,v=0,w=0,b=0;k&&!1!==r.force3D?(c="translate3d(",d="px,0px)"):R&&(c="translate(",d="px)"),this.scrollTop=function(e,t){if(!arguments.length)return-this.top();this.top(-e,t)},this.scrollLeft=function(e,t){if(!arguments.length)return-this.left();this.left(-e,t)},this.left=function(e,t){if(!arguments.length)return-(i.scrollLeft+f);var n=i.scrollLeft-x,o=f;if((2<n||n<-2)&&!t)return x=i.scrollLeft,xe.killTweensOf(this,{left:1,scrollLeft:1}),this.left(-x),void(r.onKill&&r.onKill());(e=-e)<0?(f=e-.5|0,e=0):w<e?(f=e-w|0,e=w):f=0,(f||o)&&(this._skip||(u[R]=c+-f+"px,"+-h+d),0<=f+v&&(u.paddingRight=f+v+"px")),i.scrollLeft=0|e,x=i.scrollLeft},this.top=function(e,t){if(!arguments.length)return-(i.scrollTop+h);var n=i.scrollTop-g,o=h;if((2<n||n<-2)&&!t)return g=i.scrollTop,xe.killTweensOf(this,{top:1,scrollTop:1}),this.top(-g),void(r.onKill&&r.onKill());(e=-e)<0?(h=e-.5|0,e=0):b<e?(h=e-b|0,e=b):h=0,(h||o)&&(this._skip||(u[R]=c+-f+"px,"+-h+d)),i.scrollTop=0|e,g=i.scrollTop},this.maxScrollTop=function(){return b},this.maxScrollLeft=function(){return w},this.disable=function(){for(t=p.firstChild;t;)e=t.nextSibling,i.appendChild(t),t=e;i===p.parentNode&&i.removeChild(p)},this.enable=function(){if((t=i.firstChild)!==p){for(;t;)e=t.nextSibling,p.appendChild(t),t=e;i.appendChild(p),this.calibrate()}},this.calibrate=function(e){var t,n,o,r=i.clientWidth===a;g=i.scrollTop,x=i.scrollLeft,r&&i.clientHeight===l&&p.offsetHeight===s&&m===i.scrollWidth&&y===i.scrollHeight&&!e||((h||f)&&(n=this.left(),o=this.top(),this.left(-i.scrollLeft),this.top(-i.scrollTop)),t=Na(i),r&&!e||(u.display="block",u.width="auto",u.paddingRight="0px",(v=Math.max(0,i.scrollWidth-i.clientWidth))&&(v+=parseFloat(t.paddingLeft)+(O?parseFloat(t.paddingRight):0))),u.display="inline-block",u.position="relative",u.overflow="visible",u.verticalAlign="top",u.boxSizing="content-box",u.width="100%",u.paddingRight=v+"px",O&&(u.paddingBottom=t.paddingBottom),a=i.clientWidth,l=i.clientHeight,m=i.scrollWidth,y=i.scrollHeight,w=i.scrollWidth-a,b=i.scrollHeight-l,s=p.offsetHeight,u.display="block",(n||o)&&(this.left(n),this.top(o)))},this.content=p,this.element=i,this._skip=!1,this.enable()}function _a(e){if(X()&&document.body){var t=window&&window.navigator;me=window,ye=document,ve=ye.documentElement,l=ye.body,s=fa("div"),Pe=!!window.PointerEvent,(we=fa("div")).style.cssText="visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab",Xe="grab"===we.style.cursor?"grab":"move",_e=t&&-1!==t.userAgent.toLowerCase().indexOf("android"),De="ontouchstart"in ve&&"orientation"in me||t&&(0<t.MaxTouchPoints||0<t.msMaxTouchPoints),o=fa("div"),r=fa("div"),i=r.style,a=l,i.display="inline-block",i.position="relative",o.style.cssText="width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden",o.appendChild(r),a.appendChild(o),n=r.offsetHeight+18>o.scrollHeight,a.removeChild(o),O=n,Me=function(e){for(var t=e.split(","),n=(("onpointerdown"in s?"pointerdown,pointermove,pointerup,pointercancel":"onmspointerdown"in s?"MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel":e).split(",")),o={},r=4;-1<--r;)o[t[r]]=n[r],o[n[r]]=t[r];try{ve.addEventListener("test",null,Object.defineProperty({},"passive",{get:function get(){d=1}}))}catch(e){}return o}("touchstart,touchmove,touchend,touchcancel"),za(ye,"touchcancel",aa),za(me,"touchmove",aa),l&&l.addEventListener("touchstart",aa),za(ye,"contextmenu",function(){for(var e in ze)ze[e].isPressed&&ze[e].endDrag()}),xe=be=Y()}var n,o,r,i,a;xe?(Se=xe.plugins.inertia,Le=xe.core.context||function(){},c=xe.utils.checkPrefix,R=c(R),Ne=c(Ne),Te=xe.utils.toArray,Ye=xe.core.getStyleSaver,k=!!c("perspective")):e&&console.warn("Please gsap.registerPlugin(Draggable)")}var xe,me,ye,ve,l,s,we,be,c,Te,d,De,Me,Ee,_e,Se,Xe,Pe,Le,Ye,k,O,n,Ce=0,R="transform",Ne="transformOrigin",ke=Array.isArray,Ae=180/Math.PI,Oe=1e20,a=new ge,Re=Date.now||function(){return(new Date).getTime()},Be=[],ze={},Fe=0,o=/^(?:a|input|textarea|button|select)$/i,Ie=0,He={},Qe={},We=function _isRoot(e){return!(e&&e!==ve&&9!==e.nodeType&&e!==ye.body&&e!==me&&e.nodeType&&e.parentNode)},p={},Ge={},B=function _getElementBounds(e,t){t=Te(t)[0];var n,o,r,i,a,l,s,c,d,p,u,h,f,g=e.getBBox&&e.ownerSVGElement,x=e.ownerDocument||ye;if(e===me)r=Fa(x),o=(n=Ga(x))+(x.documentElement.clientWidth||e.innerWidth||x.body.clientWidth||0),i=r+((e.innerHeight||0)-20<x.documentElement.clientHeight?x.documentElement.clientHeight:e.innerHeight||x.body.clientHeight||0);else{if(t===me||_(t))return e.getBoundingClientRect();n=r=0,g?(u=(p=e.getBBox()).width,h=p.height):(e.viewBox&&(p=e.viewBox.baseVal)&&(n=p.x||0,r=p.y||0,u=p.width,h=p.height),u||(p="border-box"===(f=Na(e)).boxSizing,u=(parseFloat(f.width)||e.clientWidth||0)+(p?0:parseFloat(f.borderLeftWidth)+parseFloat(f.borderRightWidth)),h=(parseFloat(f.height)||e.clientHeight||0)+(p?0:parseFloat(f.borderTopWidth)+parseFloat(f.borderBottomWidth)))),o=u,i=h}return e===t?{left:n,top:r,width:o-n,height:i-r}:(l=(a=getGlobalMatrix(t,!0).multiply(getGlobalMatrix(e))).apply({x:n,y:r}),s=a.apply({x:o,y:r}),c=a.apply({x:o,y:i}),d=a.apply({x:n,y:i}),{left:n=Math.min(l.x,s.x,c.x,d.x),top:r=Math.min(l.y,s.y,c.y,d.y),width:Math.max(l.x,s.x,c.x,d.x)-n,height:Math.max(l.y,s.y,c.y,d.y)-r})},z=((n=EventDispatcher.prototype).addEventListener=function addEventListener(e,t){var n=this._listeners[e]||(this._listeners[e]=[]);~n.indexOf(t)||n.push(t)},n.removeEventListener=function removeEventListener(e,t){var n=this._listeners[e],o=n&&n.indexOf(t);0<=o&&n.splice(o,1)},n.dispatchEvent=function dispatchEvent(t){var n,o=this;return(this._listeners[t]||[]).forEach(function(e){return!1===e.call(o,{type:t,target:o.target})&&(n=!1)}),n},EventDispatcher);function EventDispatcher(e){this._listeners={},this.target=e||this}var Ke,F=(function _inheritsLoose(e,t){e.prototype=Object.create(t.prototype),(e.prototype.constructor=e).__proto__=t}(Draggable,Ke=z),Draggable.register=function register(e){xe=e,_a()},Draggable.create=function create(e,t){return be||_a(!0),Te(e).map(function(e){return new Draggable(e,t)})},Draggable.get=function get(e){return ze[(Te(e)[0]||{})._gsDragID]},Draggable.timeSinceDrag=function timeSinceDrag(){return(Re()-Ie)/1e3},Draggable.hitTest=function hitTest(e,t,n){if(e===t)return!1;var o,r,i,a=Pa(e),l=Pa(t),s=a.top,c=a.left,d=a.right,p=a.bottom,u=a.width,h=a.height,f=l.left>d||l.right<c||l.top>p||l.bottom<s;return f||!n?!f:(i=-1!==(n+"").indexOf("%"),n=parseFloat(n)||0,(o={left:Math.max(c,l.left),top:Math.max(s,l.top)}).width=Math.min(d,l.right)-o.left,o.height=Math.min(p,l.bottom)-o.top,!(o.width<0||o.height<0)&&(i?u*h*(n*=.01)<=(r=o.width*o.height)||r>=l.width*l.height*n:o.width>n&&o.height>n))},Draggable);function Draggable(h,p){var e;e=Ke.call(this)||this,be||_a(1),h=Te(h)[0],e.styles=Ye&&Ye(h,"transform,left,top"),Se=Se||xe.plugins.inertia,e.vars=p=ra(p||{}),e.target=h,e.x=e.y=e.rotation=0,e.dragResistance=parseFloat(p.dragResistance)||0,e.edgeResistance=isNaN(p.edgeResistance)?1:parseFloat(p.edgeResistance)||0,e.lockAxis=p.lockAxis,e.autoScroll=p.autoScroll||0,e.lockedAxis=null,e.allowEventDefault=!!p.allowEventDefault,xe.getProperty(h,"x");function Qg(e,t){return parseFloat(se.get(h,e,t))}function xh(e){return Ba(e),e.stopImmediatePropagation&&e.stopImmediatePropagation(),!1}function yh(e){if(q.autoScroll&&q.isDragging&&(te||Y)){var t,n,o,r,i,a,l,s,c=h,d=15*q.autoScroll;for(te=!1,Qe.scrollTop=null!=me.pageYOffset?me.pageYOffset:null!=de.documentElement.scrollTop?de.documentElement.scrollTop:de.body.scrollTop,Qe.scrollLeft=null!=me.pageXOffset?me.pageXOffset:null!=de.documentElement.scrollLeft?de.documentElement.scrollLeft:de.body.scrollLeft,r=q.pointerX-Qe.scrollLeft,i=q.pointerY-Qe.scrollTop;c&&!n;)t=(n=We(c.parentNode))?Qe:c.parentNode,o=n?{bottom:Math.max(ve.clientHeight,me.innerHeight||0),right:Math.max(ve.clientWidth,me.innerWidth||0),left:0,top:0}:t.getBoundingClientRect(),a=l=0,U&&((s=t._gsMaxScrollY-t.scrollTop)<0?l=s:i>o.bottom-re&&s?(te=!0,l=Math.min(s,d*(1-Math.max(0,o.bottom-i)/re)|0)):i<o.top+ne&&t.scrollTop&&(te=!0,l=-Math.min(t.scrollTop,d*(1-Math.max(0,i-o.top)/ne)|0)),l&&(t.scrollTop+=l)),V&&((s=t._gsMaxScrollX-t.scrollLeft)<0?a=s:r>o.right-oe&&s?(te=!0,a=Math.min(s,d*(1-Math.max(0,o.right-r)/oe)|0)):r<o.left+ie&&t.scrollLeft&&(te=!0,a=-Math.min(t.scrollLeft,d*(1-Math.max(0,r-o.left)/ie)|0)),a&&(t.scrollLeft+=a)),n&&(a||l)&&(me.scrollTo(t.scrollLeft,t.scrollTop),he(q.pointerX+a,q.pointerY+l)),c=t}if(Y){var p=q.x,u=q.y;W?(q.deltaX=p-parseFloat(se.rotation),q.rotation=p,se.rotation=p+"deg",se.renderTransform(1,se)):f?(U&&(q.deltaY=u-f.top(),f.top(u)),V&&(q.deltaX=p-f.left(),f.left(p))):Q?(U&&(q.deltaY=u-parseFloat(se.y),se.y=u+"px"),V&&(q.deltaX=p-parseFloat(se.x),se.x=p+"px"),se.renderTransform(1,se)):(U&&(q.deltaY=u-parseFloat(h.style.top||0),h.style.top=u+"px"),V&&(q.deltaX=p-parseFloat(h.style.left||0),h.style.left=p+"px")),!g||e||z||(!(z=!0)===Qa(q,"drag","onDrag")&&(V&&(q.x-=q.deltaX),U&&(q.y-=q.deltaY),yh(!0)),z=!1)}Y=!1}function zh(e,t){var n,o,r=q.x,i=q.y;h._gsap||(se=xe.core.getCache(h)),se.uncache&&xe.getProperty(h,"x"),Q?(q.x=parseFloat(se.x),q.y=parseFloat(se.y)):W?q.x=q.rotation=parseFloat(se.rotation):f?(q.y=f.top(),q.x=f.left()):(q.y=parseFloat(h.style.top||(o=Na(h))&&o.top)||0,q.x=parseFloat(h.style.left||(o||{}).left)||0),(C||N||k)&&!t&&(q.isDragging||q.isThrowing)&&(k&&(He.x=q.x,He.y=q.y,(n=k(He)).x!==q.x&&(q.x=n.x,Y=!0),n.y!==q.y&&(q.y=n.y,Y=!0)),C&&(n=C(q.x))!==q.x&&(q.x=n,W&&(q.rotation=n),Y=!0),N&&((n=N(q.y))!==q.y&&(q.y=n),Y=!0)),Y&&yh(!0),e||(q.deltaX=q.x-r,q.deltaY=q.y-i,Qa(q,"throwupdate","onThrowUpdate"))}function Ah(a,l,s,n){return null==l&&(l=-Oe),null==s&&(s=Oe),Z(a)?function(e){var t=q.isPressed?1-q.edgeResistance:1;return a.call(q,(s<e?s+(e-s)*t:e<l?l+(e-l)*t:e)*n)*n}:ke(a)?function(e){for(var t,n,o=a.length,r=0,i=Oe;-1<--o;)(n=(t=a[o])-e)<0&&(n=-n),n<i&&l<=t&&t<=s&&(r=o,i=n);return a[r]}:isNaN(a)?function(e){return e}:function(){return a*n}}function Ch(){var e,t,n,o;M=!1,f?(f.calibrate(),q.minX=S=-f.maxScrollLeft(),q.minY=P=-f.maxScrollTop(),q.maxX=E=q.maxY=X=0,M=!0):p.bounds&&(e=Ra(p.bounds,h.parentNode),W?(q.minX=S=e.left,q.maxX=E=e.left+e.width,q.minY=P=q.maxY=X=0):_(p.bounds.maxX)&&_(p.bounds.maxY)?(t=Ra(h,h.parentNode),q.minX=S=Math.round(Qg(G,"px")+e.left-t.left),q.minY=P=Math.round(Qg(K,"px")+e.top-t.top),q.maxX=E=Math.round(S+(e.width-t.width)),q.maxY=X=Math.round(P+(e.height-t.height))):(e=p.bounds,q.minX=S=e.minX,q.minY=P=e.minY,q.maxX=E=e.maxX,q.maxY=X=e.maxY),E<S&&(q.minX=E,q.maxX=E=S,S=q.minX),X<P&&(q.minY=X,q.maxY=X=P,P=q.minY),W&&(q.minRotation=S,q.maxRotation=E),M=!0),p.liveSnap&&(n=!0===p.liveSnap?p.snap||{}:p.liveSnap,o=ke(n)||Z(n),W?(C=Ah(o?n:n.rotation,S,E,1),N=null):n.points?k=function buildPointSnapFunc(s,l,c,d,p,u,h){return u=u&&u<Oe?u*u:Oe,Z(s)?function(e){var t,n,o,r=q.isPressed?1-q.edgeResistance:1,i=e.x,a=e.y;return e.x=i=c<i?c+(i-c)*r:i<l?l+(i-l)*r:i,e.y=a=p<a?p+(a-p)*r:a<d?d+(a-d)*r:a,(t=s.call(q,e))!==e&&(e.x=t.x,e.y=t.y),1!==h&&(e.x*=h,e.y*=h),u<Oe&&(n=e.x-i,o=e.y-a,u<n*n+o*o&&(e.x=i,e.y=a)),e}:ke(s)?function(e){for(var t,n,o,r,i=s.length,a=0,l=Oe;-1<--i;)(r=(t=(o=s[i]).x-e.x)*t+(n=o.y-e.y)*n)<l&&(a=i,l=r);return l<=u?s[a]:e}:function(e){return e}}(o?n:n.points,S,E,P,X,n.radius,f?-1:1):(V&&(C=Ah(o?n:n.x||n.left||n.scrollLeft,S,E,f?-1:1)),U&&(N=Ah(o?n:n.y||n.top||n.scrollTop,P,X,f?-1:1))))}function Dh(){q.isThrowing=!1,Qa(q,"throwcomplete","onThrowComplete")}function Eh(){q.isThrowing=!1}function Fh(e,t){var n,o,r,i;e&&Se?(!0===e&&(n=p.snap||p.liveSnap||{},o=ke(n)||Z(n),e={resistance:(p.throwResistance||p.resistance||1e3)/(W?10:1)},W?e.rotation=Ua(q,o?n:n.rotation,E,S,1,t):(V&&(e[G]=Ua(q,o?n:n.points||n.x||n.left,E,S,f?-1:1,t||"x"===q.lockedAxis)),U&&(e[K]=Ua(q,o?n:n.points||n.y||n.top,X,P,f?-1:1,t||"y"===q.lockedAxis)),(n.points||ke(n)&&$(n[0]))&&(e.linkedProps=G+","+K,e.radius=n.radius))),q.isThrowing=!0,i=isNaN(p.overshootTolerance)?1===p.edgeResistance?0:1-q.edgeResistance+.2:p.overshootTolerance,e.duration||(e.duration={max:Math.max(p.minDuration||0,"maxDuration"in p?p.maxDuration:2),min:isNaN(p.minDuration)?0===i||$(e)&&1e3<e.resistance?0:.5:p.minDuration,overshoot:i}),q.tween=r=xe.to(f||h,{inertia:e,data:"_draggable",onComplete:Dh,onInterrupt:Eh,onUpdate:p.fastMode?Qa:zh,onUpdateParams:p.fastMode?[q,"onthrowupdate","onThrowUpdate"]:n&&n.radius?[!1,!0]:[]}),p.fastMode||(f&&(f._skip=!0),r.render(1e9,!0,!0),zh(!0,!0),q.endX=q.x,q.endY=q.y,W&&(q.endRotation=q.x),r.play(0),zh(!0,!0),f&&(f._skip=!1))):M&&q.applyBounds()}function Gh(e){var t,n=A;A=getGlobalMatrix(h.parentNode,!0),e&&q.isPressed&&!A.equals(n||new ge)&&(t=n.inverse().apply({x:w,y:b}),A.apply(t,t),w=t.x,b=t.y),A.equals(a)&&(A=null)}function Hh(){var e,t,n,o=1-q.edgeResistance,r=ce?Ga(de):0,i=ce?Fa(de):0;Q&&(se.x=Qg(G,"px")+"px",se.y=Qg(K,"px")+"px",se.renderTransform()),Gh(!1),Ge.x=q.pointerX-r,Ge.y=q.pointerY-i,A&&A.apply(Ge,Ge),w=Ge.x,b=Ge.y,Y&&(he(q.pointerX,q.pointerY),yh(!0)),d=getGlobalMatrix(h),f?(Ch(),D=f.top(),T=f.left()):(pe()?(zh(!0,!0),Ch()):q.applyBounds(),W?(e=h.ownerSVGElement?[se.xOrigin-h.getBBox().x,se.yOrigin-h.getBBox().y]:(Na(h)[Ne]||"0 0").split(" "),L=q.rotationOrigin=getGlobalMatrix(h).apply({x:parseFloat(e[0])||0,y:parseFloat(e[1])||0}),zh(!0,!0),t=q.pointerX-L.x-r,n=L.y-q.pointerY+i,T=q.x,D=q.y=Math.atan2(n,t)*Ae):(D=Qg(K,"px"),T=Qg(G,"px"))),M&&o&&(E<T?T=E+(T-E)/o:T<S&&(T=S-(S-T)/o),W||(X<D?D=X+(D-X)/o:D<P&&(D=P-(P-D)/o))),q.startX=T=da(T),q.startY=D=da(D)}function Jh(){!we.parentNode||pe()||q.isDragging||we.parentNode.removeChild(we)}function Kh(e,t){var n;if(!u||q.isPressed||!e||!("mousedown"!==e.type&&"pointerdown"!==e.type||t)&&Re()-le<30&&Me[q.pointerEvent.type])I&&e&&u&&Ba(e);else{if(O=pe(),H=!1,q.pointerEvent=e,Me[e.type]?(v=~e.type.indexOf("touch")?e.currentTarget||e.target:de,za(v,"touchend",fe),za(v,"touchmove",ue),za(v,"touchcancel",fe),za(de,"touchstart",Ea)):(v=null,za(de,"mousemove",ue)),B=null,Pe&&v||(za(de,"mouseup",fe),e&&e.target&&za(e.target,"mouseup",fe)),y=ae.call(q,e.target)&&!1===p.dragClickables&&!t)return za(e.target,"change",fe),Qa(q,"pressInit","onPressInit"),Qa(q,"press","onPress"),Wa(J,!0),void(I=!1);if(R=!(!v||V==U||!1===q.vars.allowNativeTouchScrolling||q.vars.allowContextMenu&&e&&(e.ctrlKey||2<e.which))&&(V?"y":"x"),(I=!R&&!q.allowEventDefault)&&(Ba(e),za(me,"touchforcechange",Ba)),e.changedTouches?(e=x=e.changedTouches[0],m=e.identifier):e.pointerId?m=e.pointerId:x=m=null,Ce++,function _addToRenderQueue(e){Be.push(e),1===Be.length&&xe.ticker.add(ua)}(yh),b=q.pointerY=e.pageY,w=q.pointerX=e.pageX,Qa(q,"pressInit","onPressInit"),(R||q.autoScroll)&&La(h.parentNode),!h.parentNode||!q.autoScroll||f||W||!h.parentNode._gsMaxScrollX||we.parentNode||h.getBBox||(we.style.width=h.parentNode.scrollWidth+"px",h.parentNode.appendChild(we)),Hh(),q.tween&&q.tween.kill(),q.isThrowing=!1,xe.killTweensOf(f||h,o,!0),f&&xe.killTweensOf(h,{scrollTo:1},!0),q.tween=q.lockedAxis=null,!p.zIndexBoost&&(W||f||!1===p.zIndexBoost)||(h.style.zIndex=Draggable.zIndex++),q.isPressed=!0,g=!(!p.onDrag&&!q._listeners.drag),s=!(!p.onMove&&!q._listeners.move),!1!==p.cursor||p.activeCursor)for(n=J.length;-1<--n;)xe.set(J[n],{cursor:p.activeCursor||p.cursor||("grab"===Xe?"grabbing":Xe)});Qa(q,"press","onPress")}}function Oh(e){if(e&&q.isDragging&&!f){var t=e.target||h.parentNode,n=t.scrollLeft-t._gsScrollX,o=t.scrollTop-t._gsScrollY;(n||o)&&(A?(w-=n*A.a+o*A.c,b-=o*A.d+n*A.b):(w-=n,b-=o),t._gsScrollX+=n,t._gsScrollY+=o,he(q.pointerX,q.pointerY))}}function Ph(e){var t=Re(),n=t-le<100,o=t-ee<50,r=n&&F===le,i=q.pointerEvent&&q.pointerEvent.defaultPrevented,a=n&&c===le,l=e.isTrusted||null==e.isTrusted&&n&&r;if((r||o&&!1!==q.vars.suppressClickOnDrag)&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),n&&(!q.pointerEvent||!q.pointerEvent.defaultPrevented)&&(!r||l&&!a))return l&&r&&(c=le),void(F=le);(q.isPressed||o||n)&&(l&&e.detail&&n&&!i||Ba(e)),n||o||H||(e&&e.target&&(q.pointerEvent=e),Qa(q,"click","onClick"))}function Qh(e){return A?{x:e.x*A.a+e.y*A.c+A.e,y:e.x*A.b+e.y*A.d+A.f}:{x:e.x,y:e.y}}var u,f,w,b,T,D,M,g,s,E,S,X,P,x,m,L,Y,t,C,N,k,y,v,A,O,R,B,z,F,c,I,d,H,n=(p.type||"x,y").toLowerCase(),Q=~n.indexOf("x")||~n.indexOf("y"),W=-1!==n.indexOf("rotation"),G=W?"rotation":Q?"x":"left",K=Q?"y":"top",V=!(!~n.indexOf("x")&&!~n.indexOf("left")&&"scroll"!==n),U=!(!~n.indexOf("y")&&!~n.indexOf("top")&&"scroll"!==n),j=p.minimumMovement||2,q=_assertThisInitialized(e),J=Te(p.trigger||p.handle||h),o={},ee=0,te=!1,ne=p.autoScrollMarginTop||40,oe=p.autoScrollMarginRight||40,re=p.autoScrollMarginBottom||40,ie=p.autoScrollMarginLeft||40,ae=p.clickableTest||Va,le=0,se=h._gsap||xe.core.getCache(h),ce=function _isFixed(e){return"fixed"===Na(e).position||((e=e.parentNode)&&1===e.nodeType?_isFixed(e):void 0)}(h),de=h.ownerDocument||ye,pe=function isTweening(){return q.tween&&q.tween.isActive()},ue=function onMove(e){var t,n,o,r,i,a,l=e;if(u&&!Ee&&q.isPressed&&e){if(t=(q.pointerEvent=e).changedTouches){if((e=t[0])!==x&&e.identifier!==m){for(r=t.length;-1<--r&&(e=t[r]).identifier!==m&&e.target!==h;);if(r<0)return}}else if(e.pointerId&&m&&e.pointerId!==m)return;v&&R&&!B&&(Ge.x=e.pageX-(ce?Ga(de):0),Ge.y=e.pageY-(ce?Fa(de):0),A&&A.apply(Ge,Ge),n=Ge.x,o=Ge.y,((i=Math.abs(n-w))!==(a=Math.abs(o-b))&&(j<i||j<a)||_e&&R===B)&&(B=a<i&&V?"x":"y",R&&B!==R&&za(me,"touchforcechange",Ba),!1!==q.vars.lockAxisOnTouchScroll&&V&&U&&(q.lockedAxis="x"===B?"y":"x",Z(q.vars.onLockAxis)&&q.vars.onLockAxis.call(q,l)),_e&&R===B))?fe(l):(I=q.allowEventDefault||R&&(!B||R===B)||!1===l.cancelable?I&&!1:(Ba(l),!0),q.autoScroll&&(te=!0),he(e.pageX,e.pageY,s))}else I&&e&&u&&Ba(e)},he=function setPointerPosition(e,t,n){var o,r,i,a,l,s,c=1-q.dragResistance,d=1-q.edgeResistance,p=q.pointerX,u=q.pointerY,h=D,f=q.x,g=q.y,x=q.endX,m=q.endY,y=q.endRotation,v=Y;q.pointerX=e,q.pointerY=t,ce&&(e-=Ga(de),t-=Fa(de)),W?(a=Math.atan2(L.y-t,e-L.x)*Ae,180<(l=q.y-a)?(D-=360,q.y=a):l<-180&&(D+=360,q.y=a),i=q.x!==T||Math.abs(D-a)>j?(q.y=a,T+(D-a)*c):T):(A&&(s=e*A.a+t*A.c+A.e,t=e*A.b+t*A.d+A.f,e=s),(r=t-b)<j&&-j<r&&(r=0),(o=e-w)<j&&-j<o&&(o=0),(q.lockAxis||q.lockedAxis)&&(o||r)&&((s=q.lockedAxis)||(q.lockedAxis=s=V&&Math.abs(o)>Math.abs(r)?"y":U?"x":null,s&&Z(q.vars.onLockAxis)&&q.vars.onLockAxis.call(q,q.pointerEvent)),"y"===s?r=0:"x"===s&&(o=0)),i=da(T+o*c),a=da(D+r*c)),(C||N||k)&&(q.x!==i||q.y!==a&&!W)&&(k&&(He.x=i,He.y=a,s=k(He),i=da(s.x),a=da(s.y)),C&&(i=da(C(i))),N&&(a=da(N(a)))),M&&(E<i?i=E+Math.round((i-E)*d):i<S&&(i=S+Math.round((i-S)*d)),W||(X<a?a=Math.round(X+(a-X)*d):a<P&&(a=Math.round(P+(a-P)*d)))),q.x===i&&(q.y===a||W)||(W?(q.endRotation=q.x=q.endX=i,Y=!0):(U&&(q.y=q.endY=a,Y=!0),V&&(q.x=q.endX=i,Y=!0)),n&&!1===Qa(q,"move","onMove")?(q.pointerX=p,q.pointerY=u,D=h,q.x=f,q.y=g,q.endX=x,q.endY=m,q.endRotation=y,Y=v):!q.isDragging&&q.isPressed&&(q.isDragging=H=!0,Qa(q,"dragstart","onDragStart")))},fe=function onRelease(e,t){if(u&&q.isPressed&&(!e||null==m||t||!(e.pointerId&&e.pointerId!==m&&e.target!==h||e.changedTouches&&!function _hasTouchID(e,t){for(var n=e.length;n--;)if(e[n].identifier===t)return!0}(e.changedTouches,m)))){q.isPressed=!1;var n,o,r,i,a,l=e,s=q.isDragging,c=q.vars.allowContextMenu&&e&&(e.ctrlKey||2<e.which),d=xe.delayedCall(.001,Jh);if(v?(Aa(v,"touchend",onRelease),Aa(v,"touchmove",ue),Aa(v,"touchcancel",onRelease),Aa(de,"touchstart",Ea)):Aa(de,"mousemove",ue),Aa(me,"touchforcechange",Ba),Pe&&v||(Aa(de,"mouseup",onRelease),e&&e.target&&Aa(e.target,"mouseup",onRelease)),Y=!1,s&&(ee=Ie=Re(),q.isDragging=!1),xa(yh),y&&!c)return e&&(Aa(e.target,"change",onRelease),q.pointerEvent=l),Wa(J,!1),Qa(q,"release","onRelease"),Qa(q,"click","onClick"),void(y=!1);for(o=J.length;-1<--o;)Ma(J[o],"cursor",p.cursor||(!1!==p.cursor?Xe:null));if(Ce--,e){if((n=e.changedTouches)&&(e=n[0])!==x&&e.identifier!==m){for(o=n.length;-1<--o&&(e=n[o]).identifier!==m&&e.target!==h;);if(o<0&&!t)return}q.pointerEvent=l,q.pointerX=e.pageX,q.pointerY=e.pageY}return c&&l?(Ba(l),I=!0,Qa(q,"release","onRelease")):l&&!s?(I=!1,O&&(p.snap||p.bounds)&&Fh(p.inertia||p.throwProps),Qa(q,"release","onRelease"),_e&&"touchmove"===l.type||-1!==l.type.indexOf("cancel")||(Qa(q,"click","onClick"),Re()-le<300&&Qa(q,"doubleclick","onDoubleClick"),i=l.target||h,le=Re(),a=function syntheticClick(){le===F||!q.enabled()||q.isPressed||l.defaultPrevented||(i.click?i.click():de.createEvent&&((r=de.createEvent("MouseEvents")).initMouseEvent("click",!0,!0,me,1,q.pointerEvent.screenX,q.pointerEvent.screenY,q.pointerX,q.pointerY,!1,!1,!1,!1,0,null),i.dispatchEvent(r)))},_e||l.defaultPrevented||xe.delayedCall(.05,a))):(Fh(p.inertia||p.throwProps),q.allowEventDefault||!l||!1===p.dragClickables&&ae.call(q,l.target)||!s||R&&(!B||R!==B)||!1===l.cancelable?I=!1:(I=!0,Ba(l)),Qa(q,"release","onRelease")),pe()&&d.duration(q.tween.duration()),s&&Qa(q,"dragend","onDragEnd"),!0}I&&e&&u&&Ba(e)};return(t=Draggable.get(h))&&t.kill(),e.startDrag=function(e,t){var n,o,r,i;Kh(e||q.pointerEvent,!0),t&&!q.hitTest(e||q.pointerEvent)&&(n=Pa(e||q.pointerEvent),o=Pa(h),r=Qh({x:n.left+n.width/2,y:n.top+n.height/2}),i=Qh({x:o.left+o.width/2,y:o.top+o.height/2}),w-=r.x-i.x,b-=r.y-i.y),q.isDragging||(q.isDragging=H=!0,Qa(q,"dragstart","onDragStart"))},e.drag=ue,e.endDrag=function(e){return fe(e||q.pointerEvent,!0)},e.timeSinceDrag=function(){return q.isDragging?0:(Re()-ee)/1e3},e.timeSinceClick=function(){return(Re()-le)/1e3},e.hitTest=function(e,t){return Draggable.hitTest(q.target,e,t)},e.getDirection=function(e,t){var n,o,r,i,a,l,s="velocity"===e&&Se?e:$(e)&&!W?"element":"start";return"element"===s&&(a=Pa(q.target),l=Pa(e)),n="start"===s?q.x-T:"velocity"===s?Se.getVelocity(h,G):a.left+a.width/2-(l.left+l.width/2),W?n<0?"counter-clockwise":"clockwise":(t=t||2,o="start"===s?q.y-D:"velocity"===s?Se.getVelocity(h,K):a.top+a.height/2-(l.top+l.height/2),i=(r=Math.abs(n/o))<1/t?"":n<0?"left":"right",r<t&&(""!==i&&(i+="-"),i+=o<0?"up":"down"),i)},e.applyBounds=function(e,t){var n,o,r,i,a,l;if(e&&p.bounds!==e)return p.bounds=e,q.update(!0,t);if(zh(!0),Ch(),M&&!pe()){if(n=q.x,o=q.y,E<n?n=E:n<S&&(n=S),X<o?o=X:o<P&&(o=P),(q.x!==n||q.y!==o)&&(r=!0,q.x=q.endX=n,W?q.endRotation=n:q.y=q.endY=o,yh(Y=!0),q.autoScroll&&!q.isDragging))for(La(h.parentNode),i=h,Qe.scrollTop=null!=me.pageYOffset?me.pageYOffset:null!=de.documentElement.scrollTop?de.documentElement.scrollTop:de.body.scrollTop,Qe.scrollLeft=null!=me.pageXOffset?me.pageXOffset:null!=de.documentElement.scrollLeft?de.documentElement.scrollLeft:de.body.scrollLeft;i&&!l;)a=(l=We(i.parentNode))?Qe:i.parentNode,U&&a.scrollTop>a._gsMaxScrollY&&(a.scrollTop=a._gsMaxScrollY),V&&a.scrollLeft>a._gsMaxScrollX&&(a.scrollLeft=a._gsMaxScrollX),i=a;q.isThrowing&&(r||q.endX>E||q.endX<S||q.endY>X||q.endY<P)&&Fh(p.inertia||p.throwProps,r)}return q},e.update=function(e,t,n){if(t&&q.isPressed){var o=getGlobalMatrix(h),r=d.apply({x:q.x-T,y:q.y-D}),i=getGlobalMatrix(h.parentNode,!0);i.apply({x:o.e-r.x,y:o.f-r.y},r),q.x-=r.x-i.e,q.y-=r.y-i.f,yh(!0),Hh()}var a=q.x,l=q.y;return Gh(!t),e?q.applyBounds():(Y&&n&&yh(!0),zh(!0)),t&&(he(q.pointerX,q.pointerY),Y&&yh(!0)),q.isPressed&&!t&&(V&&.01<Math.abs(a-q.x)||U&&.01<Math.abs(l-q.y)&&!W)&&Hh(),q.autoScroll&&(La(h.parentNode,q.isDragging),te=q.isDragging,yh(!0),Ia(h,Oh),Ha(h,Oh)),q},e.enable=function(e){var t,n,o,r={lazy:!0};if(!1!==p.cursor&&(r.cursor=p.cursor||Xe),xe.utils.checkPrefix("touchCallout")&&(r.touchCallout="none"),"soft"!==e){for(ta(J,V==U?"none":p.allowNativeTouchScrolling&&h.scrollHeight===h.clientHeight==(h.scrollWidth===h.clientHeight)||p.allowEventDefault?"manipulation":V?"pan-y":"pan-x"),n=J.length;-1<--n;)o=J[n],Pe||za(o,"mousedown",Kh),za(o,"touchstart",Kh),za(o,"click",Ph,!0),xe.set(o,r),o.getBBox&&o.ownerSVGElement&&V!=U&&xe.set(o.ownerSVGElement,{touchAction:p.allowNativeTouchScrolling||p.allowEventDefault?"manipulation":V?"pan-y":"pan-x"}),p.allowContextMenu||za(o,"contextmenu",xh);Wa(J,!1)}return Ha(h,Oh),u=!0,Se&&"soft"!==e&&Se.track(f||h,Q?"x,y":W?"rotation":"top,left"),h._gsDragID=t="d"+Fe++,ze[t]=q,f&&(f.enable(),f.element._gsDragID=t),(p.bounds||W)&&Hh(),p.bounds&&q.applyBounds(),q},e.disable=function(e){for(var t,n=q.isDragging,o=J.length;-1<--o;)Ma(J[o],"cursor",null);if("soft"!==e){for(ta(J,null),o=J.length;-1<--o;)t=J[o],Ma(t,"touchCallout",null),Aa(t,"mousedown",Kh),Aa(t,"touchstart",Kh),Aa(t,"click",Ph,!0),Aa(t,"contextmenu",xh);Wa(J,!0),v&&(Aa(v,"touchcancel",fe),Aa(v,"touchend",fe),Aa(v,"touchmove",ue)),Aa(de,"mouseup",fe),Aa(de,"mousemove",ue)}return Ia(h,Oh),u=!1,Se&&"soft"!==e&&Se.untrack(f||h,Q?"x,y":W?"rotation":"top,left"),f&&f.disable(),xa(yh),q.isDragging=q.isPressed=y=!1,n&&Qa(q,"dragend","onDragEnd"),q},e.enabled=function(e,t){return arguments.length?e?q.enable(t):q.disable(t):u},e.kill=function(){return q.isThrowing=!1,q.tween&&q.tween.kill(),q.disable(),xe.set(J,{clearProps:"userSelect"}),delete ze[h._gsDragID],q},e.revert=function(){this.kill(),this.styles&&this.styles.revert()},~n.indexOf("scroll")&&(f=e.scrollProxy=new $a(h,function _extend(e,t){for(var n in t)n in e||(e[n]=t[n]);return e}({onKill:function onKill(){q.isPressed&&fe(null)}},p)),h.style.overflowY=U&&!De?"auto":"hidden",h.style.overflowX=V&&!De?"auto":"hidden",h=f.content),W?o.rotation=1:(V&&(o[G]=1),U&&(o[K]=1)),se.force3D=!("force3D"in p)||p.force3D,Le(_assertThisInitialized(e)),e.enable(),e}!function _setDefaults(e,t){for(var n in t)n in e||(e[n]=t[n])}(F.prototype,{pointerX:0,pointerY:0,startX:0,startY:0,deltaX:0,deltaY:0,isDragging:!1,isPressed:!1}),F.zIndex=1e3,F.version="3.11.5",Y()&&xe.registerPlugin(F),e.Draggable=F,e.default=F;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});

/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/roughjs@4.5.2/bundled/rough.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var rough=function(){"use strict";function t(t,e,s){if(t&&t.length){const[n,a]=e,o=Math.PI/180*s,h=Math.cos(o),r=Math.sin(o);t.forEach((t=>{const[e,s]=t;t[0]=(e-n)*h-(s-a)*r+n,t[1]=(e-n)*r+(s-a)*h+a}))}}function e(t){const e=t[0],s=t[1];return Math.sqrt(Math.pow(e[0]-s[0],2)+Math.pow(e[1]-s[1],2))}function s(e,s){const n=s.hachureAngle+90;let a=s.hachureGap;a<0&&(a=4*s.strokeWidth),a=Math.max(a,.1);const o=[0,0];if(n)for(const s of e)t(s,o,n);const h=function(t,e){const s=[];for(const e of t){const t=[...e];t[0].join(",")!==t[t.length-1].join(",")&&t.push([t[0][0],t[0][1]]),t.length>2&&s.push(t)}const n=[];e=Math.max(e,.1);const a=[];for(const t of s)for(let e=0;e<t.length-1;e++){const s=t[e],n=t[e+1];if(s[1]!==n[1]){const t=Math.min(s[1],n[1]);a.push({ymin:t,ymax:Math.max(s[1],n[1]),x:t===s[1]?s[0]:n[0],islope:(n[0]-s[0])/(n[1]-s[1])})}}if(a.sort(((t,e)=>t.ymin<e.ymin?-1:t.ymin>e.ymin?1:t.x<e.x?-1:t.x>e.x?1:t.ymax===e.ymax?0:(t.ymax-e.ymax)/Math.abs(t.ymax-e.ymax))),!a.length)return n;let o=[],h=a[0].ymin;for(;o.length||a.length;){if(a.length){let t=-1;for(let e=0;e<a.length&&!(a[e].ymin>h);e++)t=e;a.splice(0,t+1).forEach((t=>{o.push({s:h,edge:t})}))}if(o=o.filter((t=>!(t.edge.ymax<=h))),o.sort(((t,e)=>t.edge.x===e.edge.x?0:(t.edge.x-e.edge.x)/Math.abs(t.edge.x-e.edge.x))),o.length>1)for(let t=0;t<o.length;t+=2){const e=t+1;if(e>=o.length)break;const s=o[t].edge,a=o[e].edge;n.push([[Math.round(s.x),h],[Math.round(a.x),h]])}h+=e,o.forEach((t=>{t.edge.x=t.edge.x+e*t.edge.islope}))}return n}(e,a);if(n){for(const s of e)t(s,o,-n);!function(e,s,n){const a=[];e.forEach((t=>a.push(...t))),t(a,s,n)}(h,o,-n)}return h}class n{constructor(t){this.helper=t}fillPolygons(t,e){return this._fillPolygons(t,e)}_fillPolygons(t,e){const n=s(t,e);return{type:"fillSketch",ops:this.renderLines(n,e)}}renderLines(t,e){const s=[];for(const n of t)s.push(...this.helper.doubleLineOps(n[0][0],n[0][1],n[1][0],n[1][1],e));return s}}class a extends n{fillPolygons(t,n){let a=n.hachureGap;a<0&&(a=4*n.strokeWidth),a=Math.max(a,.1);const o=s(t,Object.assign({},n,{hachureGap:a})),h=Math.PI/180*n.hachureAngle,r=[],i=.5*a*Math.cos(h),c=.5*a*Math.sin(h);for(const[t,s]of o)e([t,s])&&r.push([[t[0]-i,t[1]+c],[...s]],[[t[0]+i,t[1]-c],[...s]]);return{type:"fillSketch",ops:this.renderLines(r,n)}}}class o extends n{fillPolygons(t,e){const s=this._fillPolygons(t,e),n=Object.assign({},e,{hachureAngle:e.hachureAngle+90}),a=this._fillPolygons(t,n);return s.ops=s.ops.concat(a.ops),s}}class h{constructor(t){this.helper=t}fillPolygons(t,e){const n=s(t,e=Object.assign({},e,{hachureAngle:0}));return this.dotsOnLines(n,e)}dotsOnLines(t,s){const n=[];let a=s.hachureGap;a<0&&(a=4*s.strokeWidth),a=Math.max(a,.1);let o=s.fillWeight;o<0&&(o=s.strokeWidth/2);const h=a/4;for(const r of t){const t=e(r),i=t/a,c=Math.ceil(i)-1,l=t-c*a,u=(r[0][0]+r[1][0])/2-a/4,p=Math.min(r[0][1],r[1][1]);for(let t=0;t<c;t++){const e=p+l+t*a,r=u-h+2*Math.random()*h,i=e-h+2*Math.random()*h,c=this.helper.ellipse(r,i,o,o,s);n.push(...c.ops)}}return{type:"fillSketch",ops:n}}}class r{constructor(t){this.helper=t}fillPolygons(t,e){const n=s(t,e);return{type:"fillSketch",ops:this.dashedLine(n,e)}}dashedLine(t,s){const n=s.dashOffset<0?s.hachureGap<0?4*s.strokeWidth:s.hachureGap:s.dashOffset,a=s.dashGap<0?s.hachureGap<0?4*s.strokeWidth:s.hachureGap:s.dashGap,o=[];return t.forEach((t=>{const h=e(t),r=Math.floor(h/(n+a)),i=(h+a-r*(n+a))/2;let c=t[0],l=t[1];c[0]>l[0]&&(c=t[1],l=t[0]);const u=Math.atan((l[1]-c[1])/(l[0]-c[0]));for(let t=0;t<r;t++){const e=t*(n+a),h=e+n,r=[c[0]+e*Math.cos(u)+i*Math.cos(u),c[1]+e*Math.sin(u)+i*Math.sin(u)],l=[c[0]+h*Math.cos(u)+i*Math.cos(u),c[1]+h*Math.sin(u)+i*Math.sin(u)];o.push(...this.helper.doubleLineOps(r[0],r[1],l[0],l[1],s))}})),o}}class i{constructor(t){this.helper=t}fillPolygons(t,e){const n=e.hachureGap<0?4*e.strokeWidth:e.hachureGap,a=e.zigzagOffset<0?n:e.zigzagOffset,o=s(t,e=Object.assign({},e,{hachureGap:n+a}));return{type:"fillSketch",ops:this.zigzagLines(o,a,e)}}zigzagLines(t,s,n){const a=[];return t.forEach((t=>{const o=e(t),h=Math.round(o/(2*s));let r=t[0],i=t[1];r[0]>i[0]&&(r=t[1],i=t[0]);const c=Math.atan((i[1]-r[1])/(i[0]-r[0]));for(let t=0;t<h;t++){const e=2*t*s,o=2*(t+1)*s,h=Math.sqrt(2*Math.pow(s,2)),i=[r[0]+e*Math.cos(c),r[1]+e*Math.sin(c)],l=[r[0]+o*Math.cos(c),r[1]+o*Math.sin(c)],u=[i[0]+h*Math.cos(c+Math.PI/4),i[1]+h*Math.sin(c+Math.PI/4)];a.push(...this.helper.doubleLineOps(i[0],i[1],u[0],u[1],n),...this.helper.doubleLineOps(u[0],u[1],l[0],l[1],n))}})),a}}const c={};class l{constructor(t){this.seed=t}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}const u={A:7,a:7,C:6,c:6,H:1,h:1,L:2,l:2,M:2,m:2,Q:4,q:4,S:4,s:4,T:2,t:2,V:1,v:1,Z:0,z:0};function p(t,e){return t.type===e}function f(t){const e=[],s=function(t){const e=new Array;for(;""!==t;)if(t.match(/^([ \t\r\n,]+)/))t=t.substr(RegExp.$1.length);else if(t.match(/^([aAcChHlLmMqQsStTvVzZ])/))e[e.length]={type:0,text:RegExp.$1},t=t.substr(RegExp.$1.length);else{if(!t.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/))return[];e[e.length]={type:1,text:`${parseFloat(RegExp.$1)}`},t=t.substr(RegExp.$1.length)}return e[e.length]={type:2,text:""},e}(t);let n="BOD",a=0,o=s[a];for(;!p(o,2);){let h=0;const r=[];if("BOD"===n){if("M"!==o.text&&"m"!==o.text)return f("M0,0"+t);a++,h=u[o.text],n=o.text}else p(o,1)?h=u[n]:(a++,h=u[o.text],n=o.text);if(!(a+h<s.length))throw new Error("Path data ended short");for(let t=a;t<a+h;t++){const e=s[t];if(!p(e,1))throw new Error("Param not a number: "+n+","+e.text);r[r.length]=+e.text}if("number"!=typeof u[n])throw new Error("Bad segment: "+n);{const t={key:n,data:r};e.push(t),a+=h,o=s[a],"M"===n&&(n="L"),"m"===n&&(n="l")}}return e}function d(t){let e=0,s=0,n=0,a=0;const o=[];for(const{key:h,data:r}of t)switch(h){case"M":o.push({key:"M",data:[...r]}),[e,s]=r,[n,a]=r;break;case"m":e+=r[0],s+=r[1],o.push({key:"M",data:[e,s]}),n=e,a=s;break;case"L":o.push({key:"L",data:[...r]}),[e,s]=r;break;case"l":e+=r[0],s+=r[1],o.push({key:"L",data:[e,s]});break;case"C":o.push({key:"C",data:[...r]}),e=r[4],s=r[5];break;case"c":{const t=r.map(((t,n)=>n%2?t+s:t+e));o.push({key:"C",data:t}),e=t[4],s=t[5];break}case"Q":o.push({key:"Q",data:[...r]}),e=r[2],s=r[3];break;case"q":{const t=r.map(((t,n)=>n%2?t+s:t+e));o.push({key:"Q",data:t}),e=t[2],s=t[3];break}case"A":o.push({key:"A",data:[...r]}),e=r[5],s=r[6];break;case"a":e+=r[5],s+=r[6],o.push({key:"A",data:[r[0],r[1],r[2],r[3],r[4],e,s]});break;case"H":o.push({key:"H",data:[...r]}),e=r[0];break;case"h":e+=r[0],o.push({key:"H",data:[e]});break;case"V":o.push({key:"V",data:[...r]}),s=r[0];break;case"v":s+=r[0],o.push({key:"V",data:[s]});break;case"S":o.push({key:"S",data:[...r]}),e=r[2],s=r[3];break;case"s":{const t=r.map(((t,n)=>n%2?t+s:t+e));o.push({key:"S",data:t}),e=t[2],s=t[3];break}case"T":o.push({key:"T",data:[...r]}),e=r[0],s=r[1];break;case"t":e+=r[0],s+=r[1],o.push({key:"T",data:[e,s]});break;case"Z":case"z":o.push({key:"Z",data:[]}),e=n,s=a}return o}function g(t){const e=[];let s="",n=0,a=0,o=0,h=0,r=0,i=0;for(const{key:c,data:l}of t){switch(c){case"M":e.push({key:"M",data:[...l]}),[n,a]=l,[o,h]=l;break;case"C":e.push({key:"C",data:[...l]}),n=l[4],a=l[5],r=l[2],i=l[3];break;case"L":e.push({key:"L",data:[...l]}),[n,a]=l;break;case"H":n=l[0],e.push({key:"L",data:[n,a]});break;case"V":a=l[0],e.push({key:"L",data:[n,a]});break;case"S":{let t=0,o=0;"C"===s||"S"===s?(t=n+(n-r),o=a+(a-i)):(t=n,o=a),e.push({key:"C",data:[t,o,...l]}),r=l[0],i=l[1],n=l[2],a=l[3];break}case"T":{const[t,o]=l;let h=0,c=0;"Q"===s||"T"===s?(h=n+(n-r),c=a+(a-i)):(h=n,c=a);const u=n+2*(h-n)/3,p=a+2*(c-a)/3,f=t+2*(h-t)/3,d=o+2*(c-o)/3;e.push({key:"C",data:[u,p,f,d,t,o]}),r=h,i=c,n=t,a=o;break}case"Q":{const[t,s,o,h]=l,c=n+2*(t-n)/3,u=a+2*(s-a)/3,p=o+2*(t-o)/3,f=h+2*(s-h)/3;e.push({key:"C",data:[c,u,p,f,o,h]}),r=t,i=s,n=o,a=h;break}case"A":{const t=Math.abs(l[0]),s=Math.abs(l[1]),o=l[2],h=l[3],r=l[4],i=l[5],c=l[6];if(0===t||0===s)e.push({key:"C",data:[n,a,i,c,i,c]}),n=i,a=c;else if(n!==i||a!==c){k(n,a,i,c,t,s,o,h,r).forEach((function(t){e.push({key:"C",data:t})})),n=i,a=c}break}case"Z":e.push({key:"Z",data:[]}),n=o,a=h}s=c}return e}function M(t,e,s){return[t*Math.cos(s)-e*Math.sin(s),t*Math.sin(s)+e*Math.cos(s)]}function k(t,e,s,n,a,o,h,r,i,c){const l=(u=h,Math.PI*u/180);var u;let p=[],f=0,d=0,g=0,b=0;if(c)[f,d,g,b]=c;else{[t,e]=M(t,e,-l),[s,n]=M(s,n,-l);const h=(t-s)/2,c=(e-n)/2;let u=h*h/(a*a)+c*c/(o*o);u>1&&(u=Math.sqrt(u),a*=u,o*=u);const p=a*a,k=o*o,y=p*k-p*c*c-k*h*h,m=p*c*c+k*h*h,w=(r===i?-1:1)*Math.sqrt(Math.abs(y/m));g=w*a*c/o+(t+s)/2,b=w*-o*h/a+(e+n)/2,f=Math.asin(parseFloat(((e-b)/o).toFixed(9))),d=Math.asin(parseFloat(((n-b)/o).toFixed(9))),t<g&&(f=Math.PI-f),s<g&&(d=Math.PI-d),f<0&&(f=2*Math.PI+f),d<0&&(d=2*Math.PI+d),i&&f>d&&(f-=2*Math.PI),!i&&d>f&&(d-=2*Math.PI)}let y=d-f;if(Math.abs(y)>120*Math.PI/180){const t=d,e=s,r=n;d=i&&d>f?f+120*Math.PI/180*1:f+120*Math.PI/180*-1,p=k(s=g+a*Math.cos(d),n=b+o*Math.sin(d),e,r,a,o,h,0,i,[d,t,g,b])}y=d-f;const m=Math.cos(f),w=Math.sin(f),x=Math.cos(d),P=Math.sin(d),v=Math.tan(y/4),O=4/3*a*v,S=4/3*o*v,L=[t,e],T=[t+O*w,e-S*m],D=[s+O*P,n-S*x],A=[s,n];if(T[0]=2*L[0]-T[0],T[1]=2*L[1]-T[1],c)return[T,D,A].concat(p);{p=[T,D,A].concat(p);const t=[];for(let e=0;e<p.length;e+=3){const s=M(p[e][0],p[e][1],l),n=M(p[e+1][0],p[e+1][1],l),a=M(p[e+2][0],p[e+2][1],l);t.push([s[0],s[1],n[0],n[1],a[0],a[1]])}return t}}const b={randOffset:function(t,e){return A(t,e)},randOffsetWithRange:function(t,e,s){return D(t,e,s)},ellipse:function(t,e,s,n,a){const o=P(s,n,a);return v(t,e,a,o).opset},doubleLineOps:function(t,e,s,n,a){return I(t,e,s,n,a,!0)}};function y(t,e,s,n,a){return{type:"path",ops:I(t,e,s,n,a)}}function m(t,e,s){const n=(t||[]).length;if(n>2){const a=[];for(let e=0;e<n-1;e++)a.push(...I(t[e][0],t[e][1],t[e+1][0],t[e+1][1],s));return e&&a.push(...I(t[n-1][0],t[n-1][1],t[0][0],t[0][1],s)),{type:"path",ops:a}}return 2===n?y(t[0][0],t[0][1],t[1][0],t[1][1],s):{type:"path",ops:[]}}function w(t,e,s,n,a){return function(t,e){return m(t,!0,e)}([[t,e],[t+s,e],[t+s,e+n],[t,e+n]],a)}function x(t,e){let s=_(t,1*(1+.2*e.roughness),e);if(!e.disableMultiStroke){const n=_(t,1.5*(1+.22*e.roughness),function(t){const e=Object.assign({},t);e.randomizer=void 0,t.seed&&(e.seed=t.seed+1);return e}(e));s=s.concat(n)}return{type:"path",ops:s}}function P(t,e,s){const n=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(t/2,2)+Math.pow(e/2,2))/2)),a=Math.ceil(Math.max(s.curveStepCount,s.curveStepCount/Math.sqrt(200)*n)),o=2*Math.PI/a;let h=Math.abs(t/2),r=Math.abs(e/2);const i=1-s.curveFitting;return h+=A(h*i,s),r+=A(r*i,s),{increment:o,rx:h,ry:r}}function v(t,e,s,n){const[a,o]=z(n.increment,t,e,n.rx,n.ry,1,n.increment*D(.1,D(.4,1,s),s),s);let h=W(a,null,s);if(!s.disableMultiStroke&&0!==s.roughness){const[a]=z(n.increment,t,e,n.rx,n.ry,1.5,0,s),o=W(a,null,s);h=h.concat(o)}return{estimatedPoints:o,opset:{type:"path",ops:h}}}function O(t,e,s,n,a,o,h,r,i){const c=t,l=e;let u=Math.abs(s/2),p=Math.abs(n/2);u+=A(.01*u,i),p+=A(.01*p,i);let f=a,d=o;for(;f<0;)f+=2*Math.PI,d+=2*Math.PI;d-f>2*Math.PI&&(f=0,d=2*Math.PI);const g=2*Math.PI/i.curveStepCount,M=Math.min(g/2,(d-f)/2),k=E(M,c,l,u,p,f,d,1,i);if(!i.disableMultiStroke){const t=E(M,c,l,u,p,f,d,1.5,i);k.push(...t)}return h&&(r?k.push(...I(c,l,c+u*Math.cos(f),l+p*Math.sin(f),i),...I(c,l,c+u*Math.cos(d),l+p*Math.sin(d),i)):k.push({op:"lineTo",data:[c,l]},{op:"lineTo",data:[c+u*Math.cos(f),l+p*Math.sin(f)]})),{type:"path",ops:k}}function S(t,e){const s=[];for(const n of t)if(n.length){const t=e.maxRandomnessOffset||0,a=n.length;if(a>2){s.push({op:"move",data:[n[0][0]+A(t,e),n[0][1]+A(t,e)]});for(let o=1;o<a;o++)s.push({op:"lineTo",data:[n[o][0]+A(t,e),n[o][1]+A(t,e)]})}}return{type:"fillPath",ops:s}}function L(t,e){return function(t,e){let s=t.fillStyle||"hachure";if(!c[s])switch(s){case"zigzag":c[s]||(c[s]=new a(e));break;case"cross-hatch":c[s]||(c[s]=new o(e));break;case"dots":c[s]||(c[s]=new h(e));break;case"dashed":c[s]||(c[s]=new r(e));break;case"zigzag-line":c[s]||(c[s]=new i(e));break;case"hachure":default:s="hachure",c[s]||(c[s]=new n(e))}return c[s]}(e,b).fillPolygons(t,e)}function T(t){return t.randomizer||(t.randomizer=new l(t.seed||0)),t.randomizer.next()}function D(t,e,s,n=1){return s.roughness*n*(T(s)*(e-t)+t)}function A(t,e,s=1){return D(-t,t,e,s)}function I(t,e,s,n,a,o=!1){const h=o?a.disableMultiStrokeFill:a.disableMultiStroke,r=C(t,e,s,n,a,!0,!1);if(h)return r;const i=C(t,e,s,n,a,!0,!0);return r.concat(i)}function C(t,e,s,n,a,o,h){const r=Math.pow(t-s,2)+Math.pow(e-n,2),i=Math.sqrt(r);let c=1;c=i<200?1:i>500?.4:-.0016668*i+1.233334;let l=a.maxRandomnessOffset||0;l*l*100>r&&(l=i/10);const u=l/2,p=.2+.2*T(a);let f=a.bowing*a.maxRandomnessOffset*(n-e)/200,d=a.bowing*a.maxRandomnessOffset*(t-s)/200;f=A(f,a,c),d=A(d,a,c);const g=[],M=()=>A(u,a,c),k=()=>A(l,a,c),b=a.preserveVertices;return o&&(h?g.push({op:"move",data:[t+(b?0:M()),e+(b?0:M())]}):g.push({op:"move",data:[t+(b?0:A(l,a,c)),e+(b?0:A(l,a,c))]})),h?g.push({op:"bcurveTo",data:[f+t+(s-t)*p+M(),d+e+(n-e)*p+M(),f+t+2*(s-t)*p+M(),d+e+2*(n-e)*p+M(),s+(b?0:M()),n+(b?0:M())]}):g.push({op:"bcurveTo",data:[f+t+(s-t)*p+k(),d+e+(n-e)*p+k(),f+t+2*(s-t)*p+k(),d+e+2*(n-e)*p+k(),s+(b?0:k()),n+(b?0:k())]}),g}function _(t,e,s){const n=[];n.push([t[0][0]+A(e,s),t[0][1]+A(e,s)]),n.push([t[0][0]+A(e,s),t[0][1]+A(e,s)]);for(let a=1;a<t.length;a++)n.push([t[a][0]+A(e,s),t[a][1]+A(e,s)]),a===t.length-1&&n.push([t[a][0]+A(e,s),t[a][1]+A(e,s)]);return W(n,null,s)}function W(t,e,s){const n=t.length,a=[];if(n>3){const o=[],h=1-s.curveTightness;a.push({op:"move",data:[t[1][0],t[1][1]]});for(let e=1;e+2<n;e++){const s=t[e];o[0]=[s[0],s[1]],o[1]=[s[0]+(h*t[e+1][0]-h*t[e-1][0])/6,s[1]+(h*t[e+1][1]-h*t[e-1][1])/6],o[2]=[t[e+1][0]+(h*t[e][0]-h*t[e+2][0])/6,t[e+1][1]+(h*t[e][1]-h*t[e+2][1])/6],o[3]=[t[e+1][0],t[e+1][1]],a.push({op:"bcurveTo",data:[o[1][0],o[1][1],o[2][0],o[2][1],o[3][0],o[3][1]]})}if(e&&2===e.length){const t=s.maxRandomnessOffset;a.push({op:"lineTo",data:[e[0]+A(t,s),e[1]+A(t,s)]})}}else 3===n?(a.push({op:"move",data:[t[1][0],t[1][1]]}),a.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===n&&a.push(...I(t[0][0],t[0][1],t[1][0],t[1][1],s));return a}function z(t,e,s,n,a,o,h,r){const i=[],c=[];if(0===r.roughness){t/=4,c.push([e+n*Math.cos(-t),s+a*Math.sin(-t)]);for(let o=0;o<=2*Math.PI;o+=t){const t=[e+n*Math.cos(o),s+a*Math.sin(o)];i.push(t),c.push(t)}c.push([e+n*Math.cos(0),s+a*Math.sin(0)]),c.push([e+n*Math.cos(t),s+a*Math.sin(t)])}else{const l=A(.5,r)-Math.PI/2;c.push([A(o,r)+e+.9*n*Math.cos(l-t),A(o,r)+s+.9*a*Math.sin(l-t)]);const u=2*Math.PI+l-.01;for(let h=l;h<u;h+=t){const t=[A(o,r)+e+n*Math.cos(h),A(o,r)+s+a*Math.sin(h)];i.push(t),c.push(t)}c.push([A(o,r)+e+n*Math.cos(l+2*Math.PI+.5*h),A(o,r)+s+a*Math.sin(l+2*Math.PI+.5*h)]),c.push([A(o,r)+e+.98*n*Math.cos(l+h),A(o,r)+s+.98*a*Math.sin(l+h)]),c.push([A(o,r)+e+.9*n*Math.cos(l+.5*h),A(o,r)+s+.9*a*Math.sin(l+.5*h)])}return[c,i]}function E(t,e,s,n,a,o,h,r,i){const c=o+A(.1,i),l=[];l.push([A(r,i)+e+.9*n*Math.cos(c-t),A(r,i)+s+.9*a*Math.sin(c-t)]);for(let o=c;o<=h;o+=t)l.push([A(r,i)+e+n*Math.cos(o),A(r,i)+s+a*Math.sin(o)]);return l.push([e+n*Math.cos(h),s+a*Math.sin(h)]),l.push([e+n*Math.cos(h),s+a*Math.sin(h)]),W(l,null,i)}function $(t,e,s,n,a,o,h,r){const i=[],c=[r.maxRandomnessOffset||1,(r.maxRandomnessOffset||1)+.3];let l=[0,0];const u=r.disableMultiStroke?1:2,p=r.preserveVertices;for(let f=0;f<u;f++)0===f?i.push({op:"move",data:[h[0],h[1]]}):i.push({op:"move",data:[h[0]+(p?0:A(c[0],r)),h[1]+(p?0:A(c[0],r))]}),l=p?[a,o]:[a+A(c[f],r),o+A(c[f],r)],i.push({op:"bcurveTo",data:[t+A(c[f],r),e+A(c[f],r),s+A(c[f],r),n+A(c[f],r),l[0],l[1]]});return i}function G(t){return[...t]}function R(t,e){return Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2)}function q(t,e,s){const n=R(e,s);if(0===n)return R(t,e);let a=((t[0]-e[0])*(s[0]-e[0])+(t[1]-e[1])*(s[1]-e[1]))/n;return a=Math.max(0,Math.min(1,a)),R(t,j(e,s,a))}function j(t,e,s){return[t[0]+(e[0]-t[0])*s,t[1]+(e[1]-t[1])*s]}function F(t,e,s,n){const a=n||[];if(function(t,e){const s=t[e+0],n=t[e+1],a=t[e+2],o=t[e+3];let h=3*n[0]-2*s[0]-o[0];h*=h;let r=3*n[1]-2*s[1]-o[1];r*=r;let i=3*a[0]-2*o[0]-s[0];i*=i;let c=3*a[1]-2*o[1]-s[1];return c*=c,h<i&&(h=i),r<c&&(r=c),h+r}(t,e)<s){const s=t[e+0];if(a.length){(o=a[a.length-1],h=s,Math.sqrt(R(o,h)))>1&&a.push(s)}else a.push(s);a.push(t[e+3])}else{const n=.5,o=t[e+0],h=t[e+1],r=t[e+2],i=t[e+3],c=j(o,h,n),l=j(h,r,n),u=j(r,i,n),p=j(c,l,n),f=j(l,u,n),d=j(p,f,n);F([o,c,p,d],0,s,a),F([d,f,u,i],0,s,a)}var o,h;return a}function V(t,e){return Z(t,0,t.length,e)}function Z(t,e,s,n,a){const o=a||[],h=t[e],r=t[s-1];let i=0,c=1;for(let n=e+1;n<s-1;++n){const e=q(t[n],h,r);e>i&&(i=e,c=n)}return Math.sqrt(i)>n?(Z(t,e,c+1,n,o),Z(t,c,s,n,o)):(o.length||o.push(h),o.push(r)),o}function Q(t,e=.15,s){const n=[],a=(t.length-1)/3;for(let s=0;s<a;s++){F(t,3*s,e,n)}return s&&s>0?Z(n,0,n.length,s):n}const H="none";class N{constructor(t){this.defaultOptions={maxRandomnessOffset:2,roughness:1,bowing:1,stroke:"#000",strokeWidth:1,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1,seed:0,disableMultiStroke:!1,disableMultiStrokeFill:!1,preserveVertices:!1},this.config=t||{},this.config.options&&(this.defaultOptions=this._o(this.config.options))}static newSeed(){return Math.floor(Math.random()*2**31)}_o(t){return t?Object.assign({},this.defaultOptions,t):this.defaultOptions}_d(t,e,s){return{shape:t,sets:e||[],options:s||this.defaultOptions}}line(t,e,s,n,a){const o=this._o(a);return this._d("line",[y(t,e,s,n,o)],o)}rectangle(t,e,s,n,a){const o=this._o(a),h=[],r=w(t,e,s,n,o);if(o.fill){const a=[[t,e],[t+s,e],[t+s,e+n],[t,e+n]];"solid"===o.fillStyle?h.push(S([a],o)):h.push(L([a],o))}return o.stroke!==H&&h.push(r),this._d("rectangle",h,o)}ellipse(t,e,s,n,a){const o=this._o(a),h=[],r=P(s,n,o),i=v(t,e,o,r);if(o.fill)if("solid"===o.fillStyle){const s=v(t,e,o,r).opset;s.type="fillPath",h.push(s)}else h.push(L([i.estimatedPoints],o));return o.stroke!==H&&h.push(i.opset),this._d("ellipse",h,o)}circle(t,e,s,n){const a=this.ellipse(t,e,s,s,n);return a.shape="circle",a}linearPath(t,e){const s=this._o(e);return this._d("linearPath",[m(t,!1,s)],s)}arc(t,e,s,n,a,o,h=!1,r){const i=this._o(r),c=[],l=O(t,e,s,n,a,o,h,!0,i);if(h&&i.fill)if("solid"===i.fillStyle){const h=Object.assign({},i);h.disableMultiStroke=!0;const r=O(t,e,s,n,a,o,!0,!1,h);r.type="fillPath",c.push(r)}else c.push(function(t,e,s,n,a,o,h){const r=t,i=e;let c=Math.abs(s/2),l=Math.abs(n/2);c+=A(.01*c,h),l+=A(.01*l,h);let u=a,p=o;for(;u<0;)u+=2*Math.PI,p+=2*Math.PI;p-u>2*Math.PI&&(u=0,p=2*Math.PI);const f=(p-u)/h.curveStepCount,d=[];for(let t=u;t<=p;t+=f)d.push([r+c*Math.cos(t),i+l*Math.sin(t)]);return d.push([r+c*Math.cos(p),i+l*Math.sin(p)]),d.push([r,i]),L([d],h)}(t,e,s,n,a,o,i));return i.stroke!==H&&c.push(l),this._d("arc",c,i)}curve(t,e){const s=this._o(e),n=[],a=x(t,s);if(s.fill&&s.fill!==H&&t.length>=3){const e=Q(function(t,e=0){const s=t.length;if(s<3)throw new Error("A curve must have at least three points.");const n=[];if(3===s)n.push(G(t[0]),G(t[1]),G(t[2]),G(t[2]));else{const s=[];s.push(t[0],t[0]);for(let e=1;e<t.length;e++)s.push(t[e]),e===t.length-1&&s.push(t[e]);const a=[],o=1-e;n.push(G(s[0]));for(let t=1;t+2<s.length;t++){const e=s[t];a[0]=[e[0],e[1]],a[1]=[e[0]+(o*s[t+1][0]-o*s[t-1][0])/6,e[1]+(o*s[t+1][1]-o*s[t-1][1])/6],a[2]=[s[t+1][0]+(o*s[t][0]-o*s[t+2][0])/6,s[t+1][1]+(o*s[t][1]-o*s[t+2][1])/6],a[3]=[s[t+1][0],s[t+1][1]],n.push(a[1],a[2],a[3])}}return n}(t),10,(1+s.roughness)/2);"solid"===s.fillStyle?n.push(S([e],s)):n.push(L([e],s))}return s.stroke!==H&&n.push(a),this._d("curve",n,s)}polygon(t,e){const s=this._o(e),n=[],a=m(t,!0,s);return s.fill&&("solid"===s.fillStyle?n.push(S([t],s)):n.push(L([t],s))),s.stroke!==H&&n.push(a),this._d("polygon",n,s)}path(t,e){const s=this._o(e),n=[];if(!t)return this._d("path",n,s);t=(t||"").replace(/\n/g," ").replace(/(-\s)/g,"-").replace("/(ss)/g"," ");const a=s.fill&&"transparent"!==s.fill&&s.fill!==H,o=s.stroke!==H,h=!!(s.simplification&&s.simplification<1),r=function(t,e,s){const n=g(d(f(t))),a=[];let o=[],h=[0,0],r=[];const i=()=>{r.length>=4&&o.push(...Q(r,e)),r=[]},c=()=>{i(),o.length&&(a.push(o),o=[])};for(const{key:t,data:e}of n)switch(t){case"M":c(),h=[e[0],e[1]],o.push(h);break;case"L":i(),o.push([e[0],e[1]]);break;case"C":if(!r.length){const t=o.length?o[o.length-1]:h;r.push([t[0],t[1]])}r.push([e[0],e[1]]),r.push([e[2],e[3]]),r.push([e[4],e[5]]);break;case"Z":i(),o.push([h[0],h[1]])}if(c(),!s)return a;const l=[];for(const t of a){const e=V(t,s);e.length&&l.push(e)}return l}(t,1,h?4-4*s.simplification:(1+s.roughness)/2);return a&&("solid"===s.fillStyle?n.push(S(r,s)):n.push(L(r,s))),o&&(h?r.forEach((t=>{n.push(m(t,!1,s))})):n.push(function(t,e){const s=g(d(f(t))),n=[];let a=[0,0],o=[0,0];for(const{key:t,data:h}of s)switch(t){case"M":{const t=1*(e.maxRandomnessOffset||0),s=e.preserveVertices;n.push({op:"move",data:h.map((n=>n+(s?0:A(t,e))))}),o=[h[0],h[1]],a=[h[0],h[1]];break}case"L":n.push(...I(o[0],o[1],h[0],h[1],e)),o=[h[0],h[1]];break;case"C":{const[t,s,a,r,i,c]=h;n.push(...$(t,s,a,r,i,c,o,e)),o=[i,c];break}case"Z":n.push(...I(o[0],o[1],a[0],a[1],e)),o=[a[0],a[1]]}return{type:"path",ops:n}}(t,s))),this._d("path",n,s)}opsToPath(t,e){let s="";for(const n of t.ops){const t="number"==typeof e&&e>=0?n.data.map((t=>+t.toFixed(e))):n.data;switch(n.op){case"move":s+=`M${t[0]} ${t[1]} `;break;case"bcurveTo":s+=`C${t[0]} ${t[1]}, ${t[2]} ${t[3]}, ${t[4]} ${t[5]} `;break;case"lineTo":s+=`L${t[0]} ${t[1]} `}}return s.trim()}toPaths(t){const e=t.sets||[],s=t.options||this.defaultOptions,n=[];for(const t of e){let e=null;switch(t.type){case"path":e={d:this.opsToPath(t),stroke:s.stroke,strokeWidth:s.strokeWidth,fill:H};break;case"fillPath":e={d:this.opsToPath(t),stroke:H,strokeWidth:0,fill:s.fill||H};break;case"fillSketch":e=this.fillSketch(t,s)}e&&n.push(e)}return n}fillSketch(t,e){let s=e.fillWeight;return s<0&&(s=e.strokeWidth/2),{d:this.opsToPath(t),stroke:e.fill||H,strokeWidth:s,fill:H}}}class B{constructor(t,e){this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.gen=new N(e)}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),n=this.ctx,a=t.options.fixedDecimalPlaceDigits;for(const o of e)switch(o.type){case"path":n.save(),n.strokeStyle="none"===s.stroke?"transparent":s.stroke,n.lineWidth=s.strokeWidth,s.strokeLineDash&&n.setLineDash(s.strokeLineDash),s.strokeLineDashOffset&&(n.lineDashOffset=s.strokeLineDashOffset),this._drawToContext(n,o,a),n.restore();break;case"fillPath":{n.save(),n.fillStyle=s.fill||"";const e="curve"===t.shape||"polygon"===t.shape||"path"===t.shape?"evenodd":"nonzero";this._drawToContext(n,o,a,e),n.restore();break}case"fillSketch":this.fillSketch(n,o,s)}}fillSketch(t,e,s){let n=s.fillWeight;n<0&&(n=s.strokeWidth/2),t.save(),s.fillLineDash&&t.setLineDash(s.fillLineDash),s.fillLineDashOffset&&(t.lineDashOffset=s.fillLineDashOffset),t.strokeStyle=s.fill||"",t.lineWidth=n,this._drawToContext(t,e,s.fixedDecimalPlaceDigits),t.restore()}_drawToContext(t,e,s,n="nonzero"){t.beginPath();for(const n of e.ops){const e="number"==typeof s&&s>=0?n.data.map((t=>+t.toFixed(s))):n.data;switch(n.op){case"move":t.moveTo(e[0],e[1]);break;case"bcurveTo":t.bezierCurveTo(e[0],e[1],e[2],e[3],e[4],e[5]);break;case"lineTo":t.lineTo(e[0],e[1])}}"fillPath"===e.type?t.fill(n):t.stroke()}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}line(t,e,s,n,a){const o=this.gen.line(t,e,s,n,a);return this.draw(o),o}rectangle(t,e,s,n,a){const o=this.gen.rectangle(t,e,s,n,a);return this.draw(o),o}ellipse(t,e,s,n,a){const o=this.gen.ellipse(t,e,s,n,a);return this.draw(o),o}circle(t,e,s,n){const a=this.gen.circle(t,e,s,n);return this.draw(a),a}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s),s}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s),s}arc(t,e,s,n,a,o,h=!1,r){const i=this.gen.arc(t,e,s,n,a,o,h,r);return this.draw(i),i}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s),s}path(t,e){const s=this.gen.path(t,e);return this.draw(s),s}}const J="http://www.w3.org/2000/svg";class K{constructor(t,e){this.svg=t,this.gen=new N(e)}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),n=this.svg.ownerDocument||window.document,a=n.createElementNS(J,"g"),o=t.options.fixedDecimalPlaceDigits;for(const h of e){let e=null;switch(h.type){case"path":e=n.createElementNS(J,"path"),e.setAttribute("d",this.opsToPath(h,o)),e.setAttribute("stroke",s.stroke),e.setAttribute("stroke-width",s.strokeWidth+""),e.setAttribute("fill","none"),s.strokeLineDash&&e.setAttribute("stroke-dasharray",s.strokeLineDash.join(" ").trim()),s.strokeLineDashOffset&&e.setAttribute("stroke-dashoffset",`${s.strokeLineDashOffset}`);break;case"fillPath":e=n.createElementNS(J,"path"),e.setAttribute("d",this.opsToPath(h,o)),e.setAttribute("stroke","none"),e.setAttribute("stroke-width","0"),e.setAttribute("fill",s.fill||""),"curve"!==t.shape&&"polygon"!==t.shape||e.setAttribute("fill-rule","evenodd");break;case"fillSketch":e=this.fillSketch(n,h,s)}e&&a.appendChild(e)}return a}fillSketch(t,e,s){let n=s.fillWeight;n<0&&(n=s.strokeWidth/2);const a=t.createElementNS(J,"path");return a.setAttribute("d",this.opsToPath(e,s.fixedDecimalPlaceDigits)),a.setAttribute("stroke",s.fill||""),a.setAttribute("stroke-width",n+""),a.setAttribute("fill","none"),s.fillLineDash&&a.setAttribute("stroke-dasharray",s.fillLineDash.join(" ").trim()),s.fillLineDashOffset&&a.setAttribute("stroke-dashoffset",`${s.fillLineDashOffset}`),a}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}opsToPath(t,e){return this.gen.opsToPath(t,e)}line(t,e,s,n,a){const o=this.gen.line(t,e,s,n,a);return this.draw(o)}rectangle(t,e,s,n,a){const o=this.gen.rectangle(t,e,s,n,a);return this.draw(o)}ellipse(t,e,s,n,a){const o=this.gen.ellipse(t,e,s,n,a);return this.draw(o)}circle(t,e,s,n){const a=this.gen.circle(t,e,s,n);return this.draw(a)}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s)}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s)}arc(t,e,s,n,a,o,h=!1,r){const i=this.gen.arc(t,e,s,n,a,o,h,r);return this.draw(i)}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s)}path(t,e){const s=this.gen.path(t,e);return this.draw(s)}}return{canvas:(t,e)=>new B(t,e),svg:(t,e)=>new K(t,e),generator:t=>new N(t),newSeed:()=>N.newSeed()}}();
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(l){var n=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,t=0,e={},j={manual:l.Prism&&l.Prism.manual,disableWorkerMessageHandler:l.Prism&&l.Prism.disableWorkerMessageHandler,util:{encode:function e(t){return t instanceof C?new C(t.type,e(t.content),t.alias):Array.isArray(t)?t.map(e):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function n(e,a){var r,t;switch(a=a||{},j.util.type(e)){case"Object":if(t=j.util.objId(e),a[t])return a[t];for(var s in r={},a[t]=r,e)e.hasOwnProperty(s)&&(r[s]=n(e[s],a));return r;case"Array":return(t=j.util.objId(e),a[t])?a[t]:(r=[],a[t]=r,e.forEach(function(e,t){r[t]=n(e,a)}),r);default:return e}},getLanguage:function(e){for(;e;){var t=n.exec(e.className);if(t)return t[1].toLowerCase();e=e.parentElement}return"none"},setLanguage:function(e,t){e.className=e.className.replace(RegExp(n,"gi"),""),e.classList.add("language-"+t)},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(e){var t=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack)||[])[1];if(t){var n,a=document.getElementsByTagName("script");for(n in a)if(a[n].src==t)return a[n]}return null}},isActive:function(e,t,n){for(var a="no-"+t;e;){var r=e.classList;if(r.contains(t))return!0;if(r.contains(a))return!1;e=e.parentElement}return!!n}},languages:{plain:e,plaintext:e,text:e,txt:e,extend:function(e,t){var n,a=j.util.clone(j.languages[e]);for(n in t)a[n]=t[n];return a},insertBefore:function(n,e,t,a){var r,s=(a=a||j.languages)[n],i={};for(r in s)if(s.hasOwnProperty(r)){if(r==e)for(var o in t)t.hasOwnProperty(o)&&(i[o]=t[o]);t.hasOwnProperty(r)||(i[r]=s[r])}var l=a[n];return a[n]=i,j.languages.DFS(j.languages,function(e,t){t===l&&e!=n&&(this[e]=i)}),i},DFS:function e(t,n,a,r){r=r||{};var s,i,o,l=j.util.objId;for(s in t)t.hasOwnProperty(s)&&(n.call(t,s,t[s],a||s),i=t[s],"Object"!==(o=j.util.type(i))||r[l(i)]?"Array"!==o||r[l(i)]||(r[l(i)]=!0,e(i,n,s,r)):(r[l(i)]=!0,e(i,n,null,r)))}},plugins:{},highlightAll:function(e,t){j.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var a={callback:n,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};j.hooks.run("before-highlightall",a),a.elements=Array.prototype.slice.apply(a.container.querySelectorAll(a.selector)),j.hooks.run("before-all-elements-highlight",a);for(var r,s=0;r=a.elements[s++];)j.highlightElement(r,!0===t,a.callback)},highlightElement:function(e,t,n){var a=j.util.getLanguage(e),r=j.languages[a],s=(j.util.setLanguage(e,a),e.parentElement);s&&"pre"===s.nodeName.toLowerCase()&&j.util.setLanguage(s,a);var i={element:e,language:a,grammar:r,code:e.textContent};function o(e){i.highlightedCode=e,j.hooks.run("before-insert",i),i.element.innerHTML=i.highlightedCode,j.hooks.run("after-highlight",i),j.hooks.run("complete",i),n&&n.call(i.element)}if(j.hooks.run("before-sanity-check",i),(s=i.element.parentElement)&&"pre"===s.nodeName.toLowerCase()&&!s.hasAttribute("tabindex")&&s.setAttribute("tabindex","0"),!i.code)return j.hooks.run("complete",i),void(n&&n.call(i.element));j.hooks.run("before-highlight",i),i.grammar?t&&l.Worker?((a=new Worker(j.filename)).onmessage=function(e){o(e.data)},a.postMessage(JSON.stringify({language:i.language,code:i.code,immediateClose:!0}))):o(j.highlight(i.code,i.grammar,i.language)):o(j.util.encode(i.code))},highlight:function(e,t,n){e={code:e,grammar:t,language:n};if(j.hooks.run("before-tokenize",e),e.grammar)return e.tokens=j.tokenize(e.code,e.grammar),j.hooks.run("after-tokenize",e),C.stringify(j.util.encode(e.tokens),e.language);throw new Error('The language "'+e.language+'" has no grammar.')},tokenize:function(e,t){var n=t.rest;if(n){for(var a in n)t[a]=n[a];delete t.rest}for(var r=new u,s=(z(r,r.head,e),!function e(t,n,a,r,s,i){for(var o in a)if(a.hasOwnProperty(o)&&a[o]){var l=a[o];l=Array.isArray(l)?l:[l];for(var u=0;u<l.length;++u){if(i&&i.cause==o+","+u)return;for(var g,c=l[u],d=c.inside,p=!!c.lookbehind,m=!!c.greedy,h=c.alias,f=(m&&!c.pattern.global&&(g=c.pattern.toString().match(/[imsuy]*$/)[0],c.pattern=RegExp(c.pattern.source,g+"g")),c.pattern||c),b=r.next,y=s;b!==n.tail&&!(i&&y>=i.reach);y+=b.value.length,b=b.next){var v=b.value;if(n.length>t.length)return;if(!(v instanceof C)){var F,x=1;if(m){if(!(F=L(f,y,t,p))||F.index>=t.length)break;var k=F.index,w=F.index+F[0].length,A=y;for(A+=b.value.length;A<=k;)b=b.next,A+=b.value.length;if(A-=b.value.length,y=A,b.value instanceof C)continue;for(var P=b;P!==n.tail&&(A<w||"string"==typeof P.value);P=P.next)x++,A+=P.value.length;x--,v=t.slice(y,A),F.index-=y}else if(!(F=L(f,0,v,p)))continue;var k=F.index,$=F[0],S=v.slice(0,k),E=v.slice(k+$.length),v=y+v.length,_=(i&&v>i.reach&&(i.reach=v),b.prev),S=(S&&(_=z(n,_,S),y+=S.length),O(n,_,x),new C(o,d?j.tokenize($,d):$,h,$));b=z(n,_,S),E&&z(n,b,E),1<x&&($={cause:o+","+u,reach:v},e(t,n,a,b.prev,y,$),i&&$.reach>i.reach&&(i.reach=$.reach))}}}}}(e,r,t,r.head,0),r),i=[],o=s.head.next;o!==s.tail;)i.push(o.value),o=o.next;return i},hooks:{all:{},add:function(e,t){var n=j.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=j.hooks.all[e];if(n&&n.length)for(var a,r=0;a=n[r++];)a(t)}},Token:C};function C(e,t,n,a){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length}function L(e,t,n,a){e.lastIndex=t;t=e.exec(n);return t&&a&&t[1]&&(e=t[1].length,t.index+=e,t[0]=t[0].slice(e)),t}function u(){var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};e.next=t,this.head=e,this.tail=t,this.length=0}function z(e,t,n){var a=t.next,n={value:n,prev:t,next:a};return t.next=n,a.prev=n,e.length++,n}function O(e,t,n){for(var a=t.next,r=0;r<n&&a!==e.tail;r++)a=a.next;(t.next=a).prev=t,e.length-=r}if(l.Prism=j,C.stringify=function t(e,n){if("string"==typeof e)return e;var a;if(Array.isArray(e))return a="",e.forEach(function(e){a+=t(e,n)}),a;var r,s={type:e.type,content:t(e.content,n),tag:"span",classes:["token",e.type],attributes:{},language:n},e=e.alias,i=(e&&(Array.isArray(e)?Array.prototype.push.apply(s.classes,e):s.classes.push(e)),j.hooks.run("wrap",s),"");for(r in s.attributes)i+=" "+r+'="'+(s.attributes[r]||"").replace(/"/g,"&quot;")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'"'+i+">"+s.content+"</"+s.tag+">"},!l.document)return l.addEventListener&&(j.disableWorkerMessageHandler||l.addEventListener("message",function(e){var e=JSON.parse(e.data),t=e.language,n=e.code,e=e.immediateClose;l.postMessage(j.highlight(n,j.languages[t],t)),e&&l.close()},!1)),j;var a,e=j.util.currentScript();function r(){j.manual||j.highlightAll()}return e&&(j.filename=e.src,e.hasAttribute("data-manual")&&(j.manual=!0)),j.manual||("loading"===(a=document.readyState)||"interactive"===a&&e&&e.defer?document.addEventListener("DOMContentLoaded",r):window.requestAnimationFrame?window.requestAnimationFrame(r):window.setTimeout(r,16)),j}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism),Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup,Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,t){var n={},n=(n["language-"+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[t]},n.cdata=/^<!\[CDATA\[|\]\]>$/i,{"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:n}}),t=(n["language-"+t]={pattern:/[\s\S]+/,inside:Prism.languages[t]},{});t[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:n},Prism.languages.insertBefore("markup","cdata",t)}}),Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(e,t){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+e+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[t,"language-"+t],inside:Prism.languages[t]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.ssml=Prism.languages.xml,Prism.languages.atom=Prism.languages.xml,Prism.languages.rss=Prism.languages.xml,function(e){var t=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/,t=(e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+t.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+t.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+t.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+t.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:t,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css,e.languages.markup);t&&(t.tag.addInlined("style","css"),t.tag.addAttribute("style","css"))}(Prism),Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),Prism.languages.js=Prism.languages.javascript,function(){var l,u,g,c,e;void 0!==Prism&&"undefined"!=typeof document&&(Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),l={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},c="pre[data-src]:not(["+(u="data-src-status")+'="loaded"]):not(['+u+'="'+(g="loading")+'"])',Prism.hooks.add("before-highlightall",function(e){e.selector+=", "+c}),Prism.hooks.add("before-sanity-check",function(e){var r,t,n,a,s,i,o=e.element;o.matches(c)&&(e.code="",o.setAttribute(u,g),(r=o.appendChild(document.createElement("CODE"))).textContent="Loading…",t=o.getAttribute("data-src"),"none"===(e=e.language)&&(n=(/\.(\w+)$/.exec(t)||[,"none"])[1],e=l[n]||n),Prism.util.setLanguage(r,e),Prism.util.setLanguage(o,e),(n=Prism.plugins.autoloader)&&n.loadLanguages(e),n=t,a=function(e){o.setAttribute(u,"loaded");var t,n,a=function(e){var t,n;if(e=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(e||""))return t=Number(e[1]),n=e[2],e=e[3],n?e?[t,Number(e)]:[t,void 0]:[t,t]}(o.getAttribute("data-range"));a&&(t=e.split(/\r\n?|\n/g),n=a[0],a=null==a[1]?t.length:a[1],n<0&&(n+=t.length),n=Math.max(0,Math.min(n-1,t.length)),a<0&&(a+=t.length),a=Math.max(0,Math.min(a,t.length)),e=t.slice(n,a).join("\n"),o.hasAttribute("data-start")||o.setAttribute("data-start",String(n+1))),r.textContent=e,Prism.highlightElement(r)},s=function(e){o.setAttribute(u,"failed"),r.textContent=e},(i=new XMLHttpRequest).open("GET",n,!0),i.onreadystatechange=function(){4==i.readyState&&(i.status<400&&i.responseText?a(i.responseText):400<=i.status?s("✖ Error "+i.status+" while fetching file: "+i.statusText):s("✖ Error: File does not exist or is empty"))},i.send(null))}),e=!(Prism.plugins.fileHighlight={highlight:function(e){for(var t,n=(e||document).querySelectorAll(c),a=0;t=n[a++];)Prism.highlightElement(t)}}),Prism.fileHighlight=function(){e||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),e=!0),Prism.plugins.fileHighlight.highlight.apply(this,arguments)})}();/*!
 * 
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.9
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 * 
 */
(function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Typed=e():t.Typed=e()})(this,function(){return function(t){function e(n){if(s[n])return s[n].exports;var i=s[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var s={};return e.m=t,e.c=s,e.p="",e(0)}([function(t,e,s){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var s=0;s<e.length;s++){var n=e[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,s,n){return s&&t(e.prototype,s),n&&t(e,n),e}}(),r=s(1),o=s(3),a=function(){function t(e,s){n(this,t),r.initializer.load(this,s,e),this.begin()}return i(t,[{key:"toggle",value:function(){this.pause.status?this.start():this.stop()}},{key:"stop",value:function(){this.typingComplete||this.pause.status||(this.toggleBlinking(!0),this.pause.status=!0,this.options.onStop(this.arrayPos,this))}},{key:"start",value:function(){this.typingComplete||this.pause.status&&(this.pause.status=!1,this.pause.typewrite?this.typewrite(this.pause.curString,this.pause.curStrPos):this.backspace(this.pause.curString,this.pause.curStrPos),this.options.onStart(this.arrayPos,this))}},{key:"destroy",value:function(){this.reset(!1),this.options.onDestroy(this)}},{key:"reset",value:function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];clearInterval(this.timeout),this.replaceText(""),this.cursor&&this.cursor.parentNode&&(this.cursor.parentNode.removeChild(this.cursor),this.cursor=null),this.strPos=0,this.arrayPos=0,this.curLoop=0,t&&(this.insertCursor(),this.options.onReset(this),this.begin())}},{key:"begin",value:function(){var t=this;this.typingComplete=!1,this.shuffleStringsIfNeeded(this),this.insertCursor(),this.bindInputFocusEvents&&this.bindFocusEvents(),this.timeout=setTimeout(function(){t.currentElContent&&0!==t.currentElContent.length?t.backspace(t.currentElContent,t.currentElContent.length):t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos)},this.startDelay)}},{key:"typewrite",value:function(t,e){var s=this;this.fadeOut&&this.el.classList.contains(this.fadeOutClass)&&(this.el.classList.remove(this.fadeOutClass),this.cursor&&this.cursor.classList.remove(this.fadeOutClass));var n=this.humanizer(this.typeSpeed),i=1;return this.pause.status===!0?void this.setPauseStatus(t,e,!0):void(this.timeout=setTimeout(function(){e=o.htmlParser.typeHtmlChars(t,e,s);var n=0,r=t.substr(e);if("^"===r.charAt(0)&&/^\^\d+/.test(r)){var a=1;r=/\d+/.exec(r)[0],a+=r.length,n=parseInt(r),s.temporaryPause=!0,s.options.onTypingPaused(s.arrayPos,s),t=t.substring(0,e)+t.substring(e+a),s.toggleBlinking(!0)}if("`"===r.charAt(0)){for(;"`"!==t.substr(e+i).charAt(0)&&(i++,!(e+i>t.length)););var u=t.substring(0,e),l=t.substring(u.length+1,e+i),c=t.substring(e+i+1);t=u+l+c,i--}s.timeout=setTimeout(function(){s.toggleBlinking(!1),e===t.length?s.doneTyping(t,e):s.keepTyping(t,e,i),s.temporaryPause&&(s.temporaryPause=!1,s.options.onTypingResumed(s.arrayPos,s))},n)},n))}},{key:"keepTyping",value:function(t,e,s){0===e&&(this.toggleBlinking(!1),this.options.preStringTyped(this.arrayPos,this)),e+=s;var n=t.substr(0,e);this.replaceText(n),this.typewrite(t,e)}},{key:"doneTyping",value:function(t,e){var s=this;this.options.onStringTyped(this.arrayPos,this),this.toggleBlinking(!0),this.arrayPos===this.strings.length-1&&(this.complete(),this.loop===!1||this.curLoop===this.loopCount)||(this.timeout=setTimeout(function(){s.backspace(t,e)},this.backDelay))}},{key:"backspace",value:function(t,e){var s=this;if(this.pause.status===!0)return void this.setPauseStatus(t,e,!0);if(this.fadeOut)return this.initFadeOut();this.toggleBlinking(!1);var n=this.humanizer(this.backSpeed);this.timeout=setTimeout(function(){e=o.htmlParser.backSpaceHtmlChars(t,e,s);var n=t.substr(0,e);if(s.replaceText(n),s.smartBackspace){var i=s.strings[s.arrayPos+1];i&&n===i.substr(0,e)?s.stopNum=e:s.stopNum=0}e>s.stopNum?(e--,s.backspace(t,e)):e<=s.stopNum&&(s.arrayPos++,s.arrayPos===s.strings.length?(s.arrayPos=0,s.options.onLastStringBackspaced(),s.shuffleStringsIfNeeded(),s.begin()):s.typewrite(s.strings[s.sequence[s.arrayPos]],e))},n)}},{key:"complete",value:function(){this.options.onComplete(this),this.loop?this.curLoop++:this.typingComplete=!0}},{key:"setPauseStatus",value:function(t,e,s){this.pause.typewrite=s,this.pause.curString=t,this.pause.curStrPos=e}},{key:"toggleBlinking",value:function(t){this.cursor&&(this.pause.status||this.cursorBlinking!==t&&(this.cursorBlinking=t,t?this.cursor.classList.add("typed-cursor--blink"):this.cursor.classList.remove("typed-cursor--blink")))}},{key:"humanizer",value:function(t){return Math.round(Math.random()*t/2)+t}},{key:"shuffleStringsIfNeeded",value:function(){this.shuffle&&(this.sequence=this.sequence.sort(function(){return Math.random()-.5}))}},{key:"initFadeOut",value:function(){var t=this;return this.el.className+=" "+this.fadeOutClass,this.cursor&&(this.cursor.className+=" "+this.fadeOutClass),setTimeout(function(){t.arrayPos++,t.replaceText(""),t.strings.length>t.arrayPos?t.typewrite(t.strings[t.sequence[t.arrayPos]],0):(t.typewrite(t.strings[0],0),t.arrayPos=0)},this.fadeOutDelay)}},{key:"replaceText",value:function(t){this.attr?this.el.setAttribute(this.attr,t):this.isInput?this.el.value=t:"html"===this.contentType?this.el.innerHTML=t:this.el.textContent=t}},{key:"bindFocusEvents",value:function(){var t=this;this.isInput&&(this.el.addEventListener("focus",function(e){t.stop()}),this.el.addEventListener("blur",function(e){t.el.value&&0!==t.el.value.length||t.start()}))}},{key:"insertCursor",value:function(){this.showCursor&&(this.cursor||(this.cursor=document.createElement("span"),this.cursor.className="typed-cursor",this.cursor.innerHTML=this.cursorChar,this.el.parentNode&&this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)))}}]),t}();e["default"]=a,t.exports=e["default"]},function(t,e,s){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},o=function(){function t(t,e){for(var s=0;s<e.length;s++){var n=e[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,s,n){return s&&t(e.prototype,s),n&&t(e,n),e}}(),a=s(2),u=n(a),l=function(){function t(){i(this,t)}return o(t,[{key:"load",value:function(t,e,s){if("string"==typeof s?t.el=document.querySelector(s):t.el=s,t.options=r({},u["default"],e),t.isInput="input"===t.el.tagName.toLowerCase(),t.attr=t.options.attr,t.bindInputFocusEvents=t.options.bindInputFocusEvents,t.showCursor=!t.isInput&&t.options.showCursor,t.cursorChar=t.options.cursorChar,t.cursorBlinking=!0,t.elContent=t.attr?t.el.getAttribute(t.attr):t.el.textContent,t.contentType=t.options.contentType,t.typeSpeed=t.options.typeSpeed,t.startDelay=t.options.startDelay,t.backSpeed=t.options.backSpeed,t.smartBackspace=t.options.smartBackspace,t.backDelay=t.options.backDelay,t.fadeOut=t.options.fadeOut,t.fadeOutClass=t.options.fadeOutClass,t.fadeOutDelay=t.options.fadeOutDelay,t.isPaused=!1,t.strings=t.options.strings.map(function(t){return t.trim()}),"string"==typeof t.options.stringsElement?t.stringsElement=document.querySelector(t.options.stringsElement):t.stringsElement=t.options.stringsElement,t.stringsElement){t.strings=[],t.stringsElement.style.display="none";var n=Array.prototype.slice.apply(t.stringsElement.children),i=n.length;if(i)for(var o=0;o<i;o+=1){var a=n[o];t.strings.push(a.innerHTML.trim())}}t.strPos=0,t.arrayPos=0,t.stopNum=0,t.loop=t.options.loop,t.loopCount=t.options.loopCount,t.curLoop=0,t.shuffle=t.options.shuffle,t.sequence=[],t.pause={status:!1,typewrite:!0,curString:"",curStrPos:0},t.typingComplete=!1;for(var o in t.strings)t.sequence[o]=o;t.currentElContent=this.getCurrentElContent(t),t.autoInsertCss=t.options.autoInsertCss,this.appendAnimationCss(t)}},{key:"getCurrentElContent",value:function(t){var e="";return e=t.attr?t.el.getAttribute(t.attr):t.isInput?t.el.value:"html"===t.contentType?t.el.innerHTML:t.el.textContent}},{key:"appendAnimationCss",value:function(t){var e="data-typed-js-css";if(t.autoInsertCss&&(t.showCursor||t.fadeOut)&&!document.querySelector("["+e+"]")){var s=document.createElement("style");s.type="text/css",s.setAttribute(e,!0);var n="";t.showCursor&&(n+="\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "),t.fadeOut&&(n+="\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      "),0!==s.length&&(s.innerHTML=n,document.body.appendChild(s))}}}]),t}();e["default"]=l;var c=new l;e.initializer=c},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1/0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onComplete:function(t){},preStringTyped:function(t,e){},onStringTyped:function(t,e){},onLastStringBackspaced:function(t){},onTypingPaused:function(t,e){},onTypingResumed:function(t,e){},onReset:function(t){},onStop:function(t,e){},onStart:function(t,e){},onDestroy:function(t){}};e["default"]=s,t.exports=e["default"]},function(t,e){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var s=0;s<e.length;s++){var n=e[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,s,n){return s&&t(e.prototype,s),n&&t(e,n),e}}(),i=function(){function t(){s(this,t)}return n(t,[{key:"typeHtmlChars",value:function(t,e,s){if("html"!==s.contentType)return e;var n=t.substr(e).charAt(0);if("<"===n||"&"===n){var i="";for(i="<"===n?">":";";t.substr(e+1).charAt(0)!==i&&(e++,!(e+1>t.length)););e++}return e}},{key:"backSpaceHtmlChars",value:function(t,e,s){if("html"!==s.contentType)return e;var n=t.substr(e).charAt(0);if(">"===n||";"===n){var i="";for(i=">"===n?"<":"&";t.substr(e-1).charAt(0)!==i&&(e--,!(e<0)););e--}return e}}]),t}();e["default"]=i;var r=new i;e.htmlParser=r}])});
//# sourceMappingURL=typed.min.js.map
document.addEventListener("DOMContentLoaded", function () {
    // Get the page context: collection and ID from the <body> tag
    const contextCollection = document.body.getAttribute('pow-database-collection');
    const contextId = document.body.getAttribute('pow-database-id');
  
    if (!contextCollection || !contextId) {
      console.error("Page context attributes (pow-database-collection or pow-database-id) are missing or invalid.");
      return;
    }
  
    // Select all elements with the attribute pow-database-field
    const dataElements = document.querySelectorAll('[pow-database-field]');
  
    dataElements.forEach((element) => {
      try {
        // Get the raw content from the RichTextBlock or plain text
        const rawContent = element.innerText.trim();
  
        // Check if the content follows the structured format (contains ":" and ";")
        if (rawContent.includes(':') && rawContent.includes(';')) {
          // Process structured format
          const cleanedContent = rawContent.replace(/^"|"$/g, '').trim(); // Remove leading/trailing quotes
          const entries = cleanedContent.split(';').map(entry => entry.trim()).filter(entry => entry); // Split and clean entries
          const dataMap = {};
  
          entries.forEach(entry => {
            const [key, value] = entry.split(':').map(part => part.trim());
            if (key && value) {
              dataMap[key.replace(/"/g, '')] = value.replace(/"/g, ''); // Remove quotes around keys and values
            }
          });
  
          // Resolve the specific value based on the context
          const resolvedKey = `${contextCollection}/${contextId}`;
          const resolvedValue = dataMap[resolvedKey] || dataMap["default"] || "No data available.";
  
          // Render the resolved content
          element.setAttribute('data-raw-content', rawContent);
          console.log(`[DOMContentLoaded] Stored raw content for element:`, rawContent);
console.log(`[DOMContentLoaded] data-raw-content attribute:`, element.getAttribute('data-raw-content'));
          element.innerText = resolvedValue;
        } else {
          // Use the entire content as the default if no structured format is detected
          element.innerText = rawContent;
        }
      } catch (error) {
        console.error("Error processing content for element with pow-database-field:", error);
        element.innerText = "Error loading data.";
      }
    });
  });document.addEventListener("DOMContentLoaded", function () {
    // Map checkboxes to their respective collection IDs
    const controls = [
      { checkboxId: "images-checkbox", collectionId: "images-collection" },
      { checkboxId: "videos-checkbox", collectionId: "videos-collection" },
      { checkboxId: "posts-checkbox", collectionId: "posts-collection" },
      { checkboxId: "widgets-checkbox", collectionId: "widgets-collection" },
      { checkboxId: "notes-checkbox", collectionId: "notes-collection" },
    ];
  
    controls.forEach(({ checkboxId, collectionId }) => {
      const checkbox = document.getElementById(checkboxId);
      const collection = document.getElementById(collectionId);
  
      // Initialize visibility based on checkbox state
      if (!checkbox.checked) {
        collection.classList.add("pow-none");
      }
  
      // Add event listener to toggle visibility
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          collection.classList.remove("pow-none");
        } else {
          collection.classList.add("pow-none");
        }
      });
    });
  });document.addEventListener("DOMContentLoaded", function () {
    // Select all pow-item elements
    const powItems = document.querySelectorAll(".pow-item");

    powItems.forEach((item) => {
      const hoverShow = item.querySelector(".pow-itemhovershow"); // Hover div

      if (hoverShow) {
        // Function to calculate and set the width of pow-itemhovershow
        const updateWidth = () => {
          let maxWidth = 0;

          // Iterate over all children of pow-item except pow-itemhovershow
          Array.from(item.children).forEach((child) => {
            if (!child.classList.contains("pow-itemhovershow")) {
              const childWidth = child.offsetWidth; // Get child element's width
              if (childWidth > maxWidth) maxWidth = childWidth; // Update maxWidth
            }
          });

          // Apply the maximum width to pow-itemhovershow
          hoverShow.style.width = `${maxWidth}px`;
        };

        // Initial width calculation
        updateWidth();

        // Observe size changes in the children of pow-item
        const resizeObserver = new ResizeObserver(() => updateWidth());
        Array.from(item.children).forEach((child) => {
          if (!child.classList.contains("pow-itemhovershow")) {
            resizeObserver.observe(child); // Watch for size changes in children
          }
        });
      }
    });
  });document.addEventListener("DOMContentLoaded", function () {
    // Find all <audio> elements on the page
    document.querySelectorAll("audio").forEach(audio => {
        // Create a wrapper div with class 'audio-player'
        const wrapper = document.createElement("div");
        wrapper.className = "audio-player";
        
        // Insert the wrapper before the audio element in the DOM
        audio.parentNode.insertBefore(wrapper, audio);
        
        // Move the audio element inside the wrapper
        wrapper.appendChild(audio);
    });
});document.addEventListener("DOMContentLoaded", () => {
    const widgets = document.querySelectorAll(".pow-widget");

    widgets.forEach(widget => {
        // Get the widget code from data attributes
        const htmlCode = widget.getAttribute("pow-widget-code-html");
        const cssCode = widget.getAttribute("pow-widget-code-css");
        const jsCode = widget.getAttribute("pow-widget-code-javascript");

        // Inject HTML
        const htmlWrapper = document.createElement("div");
        htmlWrapper.innerHTML = htmlCode;
        widget.appendChild(htmlWrapper);

        // Inject CSS
        if (cssCode) {
            const styleTag = document.createElement("style");
            styleTag.textContent = cssCode;
            document.head.appendChild(styleTag);
        }

        // Inject JavaScript
        if (jsCode) {
            const scriptTag = document.createElement("script");
            scriptTag.textContent = jsCode;
            document.body.appendChild(scriptTag);
        }
    });
});document.addEventListener("DOMContentLoaded", function() {
  
    document.querySelectorAll("div.pow-rtb.w-richtext, div.pow-rtb.pow-rtbinline.w-richtext").forEach(function(paragraph) {
      paragraph.innerHTML = paragraph.innerHTML.replace(/&nbsp;/g, ' ');
  });


  // Select all <details> elements on the page
  const detailsElements = document.querySelectorAll("details");

  detailsElements.forEach((details) => {
      // Extract content from <summary> and other child elements
      const summaryText = details.querySelector("summary").textContent;
      const contentElements = Array.from(details.childNodes).filter(node => node !== details.querySelector("summary"));

      // Create the new structure
      const powFolder = document.createElement("div");
      powFolder.classList.add("pow-folder");

      // Create the <a> tag with the .pow-folderheader class
      const folderHeader = document.createElement("a");
      folderHeader.href = "#";
      folderHeader.classList.add("pow-folderheader", "w-inline-block");

      // Create the <div> with .pow-text class for the summary content
      const powText = document.createElement("div");
      powText.classList.add("pow-foldertitle");
      powText.textContent = summaryText;

      // Append powText inside folderHeader, then folderHeader inside powFolder
      folderHeader.appendChild(powText);
      powFolder.appendChild(folderHeader);

      // Create the content div with .pow-foldercontent class and append the remaining nodes
      const folderContent = document.createElement("div");
      folderContent.classList.add("pow-foldercontent");

      contentElements.forEach((element) => {
          folderContent.appendChild(element);
      });

      // Append folderContent inside powFolder
      powFolder.appendChild(folderContent);

      // Replace original <details> element with the new structure
      details.parentNode.replaceChild(powFolder, details);
  });

  // Reinitialize Webflow interactions
  if (typeof Webflow !== 'undefined' && Webflow.require) {
      Webflow.require('ix2').init();
  }
});// Select all <div> elements that directly wrap a <code> element
document.querySelectorAll('div > code').forEach((codeElement) => {
    const parentDiv = codeElement.parentElement;

    // Apply styles to the wrapping <div> (parent of <code>)
    Object.assign(parentDiv.style, {
        padding: '0vh',
        backgroundColor: 'transparent',
        border: `var(--grid-width, 1px) solid var(--black-3, #000)`, // Border with size and color variables
        width: '100%',
        overflowX: 'auto',  // Makes it horizontally scrollable
        marginBottom: '2.5vh' // Adds 2.5vh bottom margin


    });
  
      // Convert <br> tags to newlines for proper code formatting
    let formattedCode = codeElement.innerHTML.replace(/<br\s*\/?>/gi, '\n').replace(/&nbsp;/g, ' ');

    // Wrap in <pre><code> and replace the original element
    const preElement = document.createElement('pre');
    const newCodeElement = document.createElement('code');
    newCodeElement.className = 'language-javascript'; // Change to 'language-markup' or any default

    // Set the inner text of the new <code> element
    newCodeElement.textContent = formattedCode;
    preElement.appendChild(newCodeElement);
    
    // Replace the original code element with the newly formatted <pre><code>
    codeElement.parentNode.replaceChild(preElement, codeElement);
  
    Prism.highlightElement(codeElement);
  
      // Apply styles to the <code> element itself
    Object.assign(codeElement.style, {
        fontSize: '1.75vh',
        lineHeight: '2.5vh',
        backgroundColor: 'transparent'  // Ensures text background is transparent
    });
  });// Guide and info visibility functions
function setInfoGroupVisibility(isVisible) {
    localStorage.setItem('infoGroupVisible', isVisible ? 'on' : 'off');
    applyInfoGroupVisibility();
  }
  
  function applyInfoGroupVisibility() {
    const visibility = localStorage.getItem('infoGroupVisible') || 'off';
    document.documentElement.classList.toggle('info-visible', visibility === 'on');
    document.documentElement.classList.toggle('info-hidden', visibility === 'off');
  }
  
  function setGuideSize(size) {
    localStorage.setItem('guideSize', size);
    applyGuideSize();
  }
  
  function applyGuideSize() {
    const guideSize = localStorage.getItem('guideSize') || 'small';
    document.documentElement.classList.remove('guide-small', 'guide-large', 'guide-off');
    document.documentElement.classList.add(`guide-${guideSize}`);
  }
    
  // Function to toggle dark mode
  function setDarkMode(isDark) {
    localStorage.setItem('darkMode', isDark ? 'on' : 'off');
    applyCurrentMode();
  }
  
  // Function to apply current mode and reapply styles
  function applyCurrentMode() {
    const darkMode = localStorage.getItem('darkMode') || 'off';
    if (darkMode === 'on') {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }
  
  
  // Event listeners for user interactions
  //document.querySelector('.pow-info-on').addEventListener('click', () => setInfoGroupVisibility(true));
  //document.querySelector('.pow-info-off').addEventListener('click', () => setInfoGroupVisibility(false));
  
  document.querySelector('.pow-guide-small').addEventListener('click', () => setGuideSize('small'));
  document.querySelector('.pow-guide-large').addEventListener('click', () => setGuideSize('large'));
  document.querySelector('.pow-guide-off').addEventListener('click', () => setGuideSize('off'));
  
  document.querySelector('.pow-dark-on').addEventListener('click', () => setDarkMode(true));
  document.querySelector('.pow-dark-off').addEventListener('click', () => setDarkMode(false));
  
  // Apply stored settings on page load
  window.addEventListener('DOMContentLoaded', () => {
    applyInfoGroupVisibility();
    applyGuideSize();
    applyCurrentMode();
  });// Function to apply the dark mode CSS variables
function setDarkModeVariables() {
    document.documentElement.style.setProperty('--black-1', 'rgba(247, 247, 247, 1)');
    document.documentElement.style.setProperty('--black-2', 'rgba(247, 247, 247, 0.5)');
    document.documentElement.style.setProperty('--black-3', 'rgba(247, 247, 247, 0.07)');
    document.documentElement.style.setProperty('--white-1', 'rgba(8, 8, 8, 1)');
    document.documentElement.style.setProperty('--white-2', 'rgba(8, 8, 8, 0.5)');
    document.documentElement.style.setProperty('--white-3', 'rgba(8, 8, 8, 0.07)');
    document.documentElement.style.setProperty('--transparent', 'transparent');
    
    // Store these variable values in localStorage
    localStorage.setItem('theme-black-1', 'rgba(247, 247, 247, 1)');
    localStorage.setItem('theme-black-2', 'rgba(247, 247, 247, 0.5)');
    localStorage.setItem('theme-black-3', 'rgba(247, 247, 247, 0.07)');
    localStorage.setItem('theme-white-1', 'rgba(8, 8, 8, 1)');
    localStorage.setItem('theme-white-2', 'rgba(8, 8, 8, 0.5)');
    localStorage.setItem('theme-white-3', 'rgba(8, 8, 8, 0.07)');
    localStorage.setItem('theme-transparent', 'transparent');
  }
  
  // Function to apply the light mode CSS variables
  function setLightModeVariables() {
    document.documentElement.style.setProperty('--black-1', 'rgba(8, 8, 8, 1)');
    document.documentElement.style.setProperty('--black-2', 'rgba(8, 8, 8, 0.5)');
    document.documentElement.style.setProperty('--black-3', 'rgba(8, 8, 8, 0.07)');
    document.documentElement.style.setProperty('--white-1', 'rgba(247, 247, 247, 1)');
    document.documentElement.style.setProperty('--white-2', 'rgba(247, 247, 247, 0.5)');
    document.documentElement.style.setProperty('--white-3', 'rgba(247, 247, 247, 0.07)');
    document.documentElement.style.setProperty('--transparent', 'transparent');
    
    // Store these variable values in localStorage
    localStorage.setItem('theme-black-1', 'rgba(8, 8, 8, 1)');
    localStorage.setItem('theme-black-2', 'rgba(8, 8, 8, 0.5)');
    localStorage.setItem('theme-black-3', 'rgba(8, 8, 8, 0.07)');
    localStorage.setItem('theme-white-1', 'rgba(247, 247, 247, 1)');
    localStorage.setItem('theme-white-2', 'rgba(247, 247, 247, 0.5)');
    localStorage.setItem('theme-white-3', 'rgba(247, 247, 247, 0.07)');
    localStorage.setItem('theme-transparent', 'transparent');
  }
  
  // Function to retrieve and reapply stored CSS variables
  function applyStoredVariables() {
    document.documentElement.style.setProperty('--black-1', localStorage.getItem('theme-black-1'));
    document.documentElement.style.setProperty('--black-2', localStorage.getItem('theme-black-2'));
    document.documentElement.style.setProperty('--black-3', localStorage.getItem('theme-black-3'));
    document.documentElement.style.setProperty('--white-1', localStorage.getItem('theme-white-1'));
    document.documentElement.style.setProperty('--white-2', localStorage.getItem('theme-white-2'));
    document.documentElement.style.setProperty('--white-3', localStorage.getItem('theme-white-3'));
    document.documentElement.style.setProperty('--transparent', localStorage.getItem('theme-transparent'));
  }
  
  // Function to apply the current mode (dark or light)
  function applyCurrentMode() {
    const darkMode = localStorage.getItem('darkMode') || 'off';
    if (darkMode === 'on') {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
      applyStoredVariables(); // Reapply the stored dark mode variables
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
      applyStoredVariables(); // Reapply the stored light mode variables
    }
  }
  
  // Apply the mode and CSS variables as soon as the page loads
  document.addEventListener("DOMContentLoaded", function() {
    applyCurrentMode(); // Apply dark or light mode on page load
  });
  
  // Reapply the mode on window resize (or other re-render events)
  window.addEventListener('resize', function() {
    applyCurrentMode(); // Ensure dark or light mode persists after resizing
  });
  
  // Reapply the mode when adding new sticky notes
  const addButton = document.querySelector('.pow-additem'); // Ensure the button is selected
  addButton.addEventListener("click", function() {
    // Code to add the sticky note...
  }); //Only backspace what doesn't match the previous string
 var typed = new Typed(".pow-bornfor", {
    strings:["Born for Stories", "Born for Love", "Born for Logos", "Born for Films", "Born for Grahpics", "Born for Innovation", "Born for Fun"],
typeSpeed: 100,//typing speed
backSpeed: 50, //erasing speed
loop: true, // start back after ending typing
smartBackspace: true, //this is on by default
cursorChar: '™', // add custom cursor
});document.addEventListener("DOMContentLoaded", function() {
    const board = document.querySelector(".pow-board");
    const addButton = document.querySelector(".pow-additem");
    const cursorPositionElement = document.querySelector('.pow-cursorposition');
    const messButton = document.querySelector('.pow-mess');
    const stackButton = document.querySelector('.pow-stack');
    const darkOnButton = document.querySelector('.pow-dark-on');
    const darkOffButton = document.querySelector('.pow-dark-off');
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "drawingSVG";
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute('viewBox', '0 0 100 100');  // Example: set the viewBox to 100x100 units
    svg.style.position = "absolute";
    svg.style.top = 0;
    svg.style.left = 0;
    board.appendChild(svg);
  
    let boardDraggable;
    let isMoveMode = true;  // Start in moving mode by default
  
    let isDrawing = false;
    let currentPath = null;
  
    // Predefined location mapping
    const predefinedLocations = {
      "section1": "25.00,25.00",
      "section2": "25.00,75.00",
      "section3": "75.00,25.00",
      "section4": "75.00,75.00",
      "center": "50.00,50.00"
    };
  
    // Get coordinates relative to the board for mouse events
    function getBoardCoordinates(event) {
      const boardRect = board.getBoundingClientRect();
      const x = ((event.clientX - boardRect.left) / boardRect.width) * 100;
      const y = ((event.clientY - boardRect.top) / boardRect.height) * 100;
      return { x, y };
    }
  
    // Mouse events
    document.addEventListener('mousemove', (e) => {
      const { x, y } = getBoardCoordinates(e);
      if (cursorPositionElement) {
        cursorPositionElement.innerText = `${x.toFixed(2)},${y.toFixed(2)}`;
      }
    });
  
    // Touch events to show cursor position
    document.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];  // Get the first touch point
      const { x, y } = getBoardCoordinates(touch);
      if (cursorPositionElement) {
        cursorPositionElement.innerText = `${x.toFixed(2)},${y.toFixed(2)}`;
      }
    });
  
  // Get coordinates relative to the SVG's viewBox for mouse events
  function getViewBoxCoordinates(event) {
      const svgRect = svg.getBoundingClientRect();
      const scaleX = 100 / svgRect.width;  // Assume viewBox width is 100 units
      const scaleY = 100 / svgRect.height;  // Assume viewBox height is 100 units
      const x = (event.clientX - svgRect.left) * scaleX;
      const y = (event.clientY - svgRect.top) * scaleY;
      return { x, y };
  }
  
  // Get coordinates relative to the SVG's viewBox for touch events
  function getTouchCoordinates(event) {
      const touch = event.touches[0];  // Get the first touch point
      const svgRect = svg.getBoundingClientRect();
      const scaleX = 100 / svgRect.width;  // Assume viewBox width is 100 units
      const scaleY = 100 / svgRect.height;  // Assume viewBox height is 100 units
      const x = (touch.clientX - svgRect.left) * scaleX;
      const y = (touch.clientY - svgRect.top) * scaleY;
      return { x, y };
  }
  
  // Mouse events
  svg.addEventListener('mousedown', (e) => {
      if (isMoveMode) return;
  
      boardDraggable.disable();  // Disable board dragging while drawing
  
      isDrawing = true;
      const { x, y } = getViewBoxCoordinates(e);
  
      // Create a new SVG path
      currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      currentPath.setAttribute('d', `M ${x} ${y}`);
      currentPath.setAttribute('stroke', getCurrentPenColor());
      currentPath.setAttribute('stroke-width', '0.05');
      currentPath.setAttribute('fill', 'none');
      currentPath.setAttribute('stroke-linecap', 'round');
      currentPath.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(currentPath);
  });
  
  svg.addEventListener('mousemove', (e) => {
      if (!isDrawing || isMoveMode) return;
  
      const { x, y } = getViewBoxCoordinates(e);
      const d = currentPath.getAttribute('d');
      currentPath.setAttribute('d', `${d} L ${x} ${y}`);
  });
  
  svg.addEventListener('mouseup', () => {
      if (!isDrawing) return;
  
      boardDraggable.enable();  // Re-enable board dragging after drawing
      isDrawing = false;
      currentPath = null;  // Reset after drawing is finished
  });
  
  // Touch events
  svg.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (isMoveMode) return;
  
      boardDraggable.disable();  // Disable board dragging while drawing
  
      const { x, y } = getTouchCoordinates(e);
  
      // Create a new SVG path
      currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      currentPath.setAttribute('d', `M ${x} ${y}`);
      currentPath.setAttribute('stroke', getCurrentPenColor());
      currentPath.setAttribute('stroke-width', '0.05');
      currentPath.setAttribute('fill', 'none');
      currentPath.setAttribute('stroke-linecap', 'round');
      currentPath.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(currentPath);
  });
  
  svg.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!currentPath || isMoveMode) return;
  
      const { x, y } = getTouchCoordinates(e);
      const d = currentPath.getAttribute('d');
      currentPath.setAttribute('d', `${d} L ${x} ${y}`);
  });
  
  svg.addEventListener('touchend', () => {
      if (!currentPath) return;
      currentPath = null;
      boardDraggable.enable();  // Re-enable board dragging after touch ends
  });
  
    gsap.registerPlugin(Draggable);
  
    // Create draggable board
    boardDraggable = Draggable.create(board, {
      type: "top,left", // Changed to "top,left"
      edgeResistance: 0.65,
      bounds: document.querySelector(".pow-boardcontainer"),
      allowEventDefault: true,
      dragClickables: false,
      inertia: true,
          onPress: function (e) {
        // **Prevent board dragging if gesture starts on a pow-item**
        if (e.target.closest(".pow-item")) {
          this.endDrag(); // **Immediately stop dragging**
        }
      },
    })[0];
  
    // Disable scrolling
    document.body.style.overflow = 'hidden';
  
    // Function to get current pen color from CSS variable
    function getCurrentPenColor() {
      const root = document.documentElement;
      return getComputedStyle(root).getPropertyValue('--pen').trim();
    }
  
    // Toggle between draw and drag modes
    document.querySelector(".pow-draw").addEventListener("click", () => {
      isMoveMode = false;
      board.style.cursor = "crosshair";
          svg.style.cursor = "crosshair";
  
    });
    document.querySelector(".pow-drag").addEventListener("click", () => {
      isMoveMode = true;
      board.style.cursor = "grab";
          svg.style.cursor = "grab";
  
  
    });
  
    // Function to calculate and store the left and top position of each item as a percentage of the board
    function storeItemPositionAsPercentage(item) {
      const boardRect = board.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
  
      const leftPercent = (((itemRect.left - boardRect.left) + itemRect.width / 2) / boardRect.width) * 100;
      const topPercent = (((itemRect.top - boardRect.top) + itemRect.height / 2) / boardRect.height) * 100;
  
      item.dataset.leftPercent = leftPercent;
      item.dataset.topPercent = topPercent;
      
          // Update coordinates display only for existing items (with pow-item-coordinates)
      const coordsDisplay = item.querySelector('.pow-item-coordinates');
      if (coordsDisplay) {
          coordsDisplay.textContent = `${leftPercent.toFixed(2)},${topPercent.toFixed(2)}`;
      }
      
      console.log(`Stored position for item: left ${leftPercent}%, top ${topPercent}%`);
    }
  
    
    
    function storeItemOrder(item, order) {
      item.dataset.order = order;
      item.style.zIndex = order;
      
      // Update order display if it exists
      const orderDisplay = item.querySelector('.pow-item-order');
      if (orderDisplay) {
          orderDisplay.textContent = order;
      }
    }
    
    
    // Function to reposition items based on percentage values during browser resizing
    function repositionItemsOnResize() {
      const boardRect = board.getBoundingClientRect();
  
      document.querySelectorAll('.pow-item').forEach(item => {
        const leftPercent = parseFloat(item.dataset.leftPercent);
        const topPercent = parseFloat(item.dataset.topPercent);
  
        const newLeftPx = (leftPercent / 100) * boardRect.width - (item.offsetWidth / 2);
        const newTopPx = (topPercent / 100) * boardRect.height - (item.offsetHeight / 2);
  
        item.style.left = `${newLeftPx}px`;
        item.style.top = `${newTopPx}px`;
        console.log(`Calculated new center position: left ${newLeftPx}px, top ${newTopPx}px`);
  
        const draggableInstance = Draggable.get(item);
        if (draggableInstance) {
          draggableInstance.update(true); // Update Draggable's internal state
        }
  
        console.log(`New pixel position: left ${newLeftPx}px, top ${newTopPx}px`);
      });
    }
  
    // Handle resizing the viewport
    window.addEventListener("resize", function() {
      console.log("Resizing browser window...");
      repositionItemsOnResize();
    });
  
    // Position items based on their defined coordinates or predefined names
  function positionExistingItems() {
      document.querySelectorAll('.pow-item').forEach(item => {
          const positionText = item.querySelector('.pow-itemposition')?.innerText.trim();
          if (!positionText) return;
  
          let [x, y] = [0, 0];
          if (predefinedLocations[positionText]) {
              [x, y] = predefinedLocations[positionText].split(',').map(Number);
          } else if (positionText.startsWith('~(') && positionText.endsWith(')')) {
              const value = positionText.slice(2, -1).trim();
              if (predefinedLocations[value]) {
                  [x, y] = predefinedLocations[value].split(',').map(Number);
              } else {
                  [x, y] = value.split(',').map(Number);
              }
              x += (Math.random() - 0.5) * 10;
              y += (Math.random() - 0.5) * 10;
          } else if (positionText === 'random') {
              x = 10 + Math.random() * 80;
      y = 10 + Math.random() * 80;
          } else {
              [x, y] = positionText.split(',').map(Number);
          }
  
          // Store positions immediately
          item.dataset.leftPercent = x;
          item.dataset.topPercent = y;
  
          // Do initial positioning immediately for visibility
          const boardRect = board.getBoundingClientRect();
          const initialLeftPx = (x / 100) * boardRect.width - (item.offsetWidth / 2);
          const initialTopPx = (y / 100) * boardRect.height - (item.offsetHeight / 2);
          item.style.left = `${initialLeftPx}px`;
          item.style.top = `${initialTopPx}px`;
          
          // Then handle precise positioning with media loading
          const imageElement = item.querySelector('.pow-visual');
          const videoElement = item.querySelector('.pow-video-embed');
  
          if (imageElement) {
              const adjustImagePosition = () => {
                  requestAnimationFrame(() => {
                      const updatedBoardRect = board.getBoundingClientRect();
                      const finalLeftPx = (x / 100) * updatedBoardRect.width - (imageElement.offsetWidth / 2);
                      const finalTopPx = (y / 100) * updatedBoardRect.height - (imageElement.offsetHeight / 2);
                      item.style.left = `${finalLeftPx}px`;
                      item.style.top = `${finalTopPx}px`;
                  });
              };
  
              if (imageElement.complete) {
                  adjustImagePosition();
              } else {
                  imageElement.addEventListener('load', adjustImagePosition);
              }
          } else if (videoElement) {
              const adjustVideoPosition = () => {
                  requestAnimationFrame(() => {
                      const updatedBoardRect = board.getBoundingClientRect();
                      const finalLeftPx = (x / 100) * updatedBoardRect.width - (videoElement.offsetWidth / 2);
                      const finalTopPx = (y / 100) * updatedBoardRect.height - (videoElement.offsetHeight / 2);
                      item.style.left = `${finalLeftPx}px`;
                      item.style.top = `${finalTopPx}px`;
                  });
              };
  
              if (videoElement.readyState >= 1) {
                  adjustVideoPosition();
              } else {
                  videoElement.addEventListener('loadedmetadata', adjustVideoPosition);
              }
          }
      });
  }
  
  function positionItemWithLoadedDimensions(item, x, y, mediaElement = null) {
      const boardRect = board.getBoundingClientRect();
      let elementForDimensions;
      
      if (mediaElement) {
          // For media elements (images or videos), use their direct dimensions
          elementForDimensions = mediaElement;
      } else {
          // For other items, use the item's dimensions
          elementForDimensions = item;
      }
  
      // Get precise measurements
      const rect = elementForDimensions.getBoundingClientRect();
      
      // Calculate center position with precise decimal values
      const newLeftPx = Math.round(((x / 100) * boardRect.width) - (rect.width / 2));
      const newTopPx = Math.round(((y / 100) * boardRect.height) - (rect.height / 2));
  
      // Apply position
      item.style.left = `${newLeftPx}px`;
      item.style.top = `${newTopPx}px`;
  
      // Update coordinate display
      const coordsDisplay = item.querySelector('.pow-item-coordinates');
      if (coordsDisplay) {
          coordsDisplay.textContent = `${x.toFixed(2)},${y.toFixed(2)}`;
      }
  
      // Debug logging
      console.log('Positioning details:', {
          type: mediaElement ? (mediaElement.tagName === 'VIDEO' ? 'video' : 'image') : 'other',
          dimensions: {
              width: rect.width,
              height: rect.height
          },
          position: {
              x,
              y,
              leftPx: newLeftPx,
              topPx: newTopPx
          }
      });
  }
    
    // Store the percentage positions for all existing items on load
    document.querySelectorAll('.pow-item').forEach(item => {
      storeItemPositionAsPercentage(item);
    });
  
    // Position all existing items initially
    positionExistingItems();
  
  // Add event listeners for existing items
  document.querySelectorAll('.pow-item').forEach(item => {
    const handler = item.querySelector('.pow-item-handler'); // Select the handler
  
    // Get order from CMS
    const orderElement = item.querySelector('.pow-item-order');
    if (orderElement) {
      const rawContent = orderElement.innerText.trim();
      
      // Check if content follows the JSON-like format
      if (rawContent.includes(':') && rawContent.includes(';')) {
        // Get the page context
        const contextCollection = document.body.getAttribute('pow-database-collection');
        const contextId = document.body.getAttribute('pow-database-id');
        
        // Process JSON-like format
        const cleanedContent = rawContent.replace(/^"|"$/g, '').trim();
        const entries = cleanedContent.split(';').map(entry => entry.trim()).filter(entry => entry);
        const dataMap = {};
        
        entries.forEach(entry => {
            const [key, value] = entry.split(':').map(part => part.trim());
            if (key && value) {
                dataMap[key.replace(/"/g, '')] = parseInt(value.replace(/"/g, ''));
            }
        });
        
        // Resolve the specific value based on the context
        const resolvedKey = `${contextCollection}/${contextId}`;
        const orderValue = dataMap[resolvedKey] || dataMap["default"] || 1;
        
        storeItemOrder(item, orderValue);
      } else {
        // Handle simple numeric value
        const orderValue = parseInt(rawContent);
        if (!isNaN(orderValue)) {
          storeItemOrder(item, orderValue);
        } else {
          storeItemOrder(item, 1);
        }
      }
    } else {
      storeItemOrder(item, 1);
    }
    
    const hideButton = item.querySelector(".pow-item-hide");
    if (hideButton) {
      hideButton.addEventListener('click', (e) => {
        e.stopPropagation();
        hideItem(item);
      });
    }
  
  // Make existing items draggable and store the Draggable instance
  let itemDraggable = Draggable.create(item, {
    type: "top,left",
    bounds: board,
  inertia: true,
    trigger: handler,
    zIndexBoost: false,
  ignore: ".pow-item input",
  allowEventDefault: true,
    dragClickables: true,
    onDragStart: function() {
      boardDraggable.disable();
      // When dragged, move to top of current items
      const highestZIndex = Math.max(
        ...Array.from(document.querySelectorAll('.pow-item'))
          .map(i => parseInt(i.style.zIndex) || 0)
      );
      storeItemOrder(item, highestZIndex + 1);
    },
    onDrag: function() {
          storeItemPositionAsPercentage(this.target);
      },
    onDragEnd: function() {
      boardDraggable.enable();
      storeItemPositionAsPercentage(item);
    }
  })[0]; // Get the Draggable instance from the array
  item._draggable = itemDraggable; // Store the Draggable instance in the item
  
      // For existing items
item.addEventListener('click', (e) => {
  // Skip if clicking directly on the hide button
  if (e.target.classList.contains('pow-item-hide')) {
    return;
  }
  
  // Bring item to front when clicked
  const highestZIndex = Math.max(
    ...Array.from(document.querySelectorAll('.pow-item'))
      .map(i => parseInt(i.style.zIndex) || 0)
  );
  storeItemOrder(item, highestZIndex + 1);
  
  
});
  
    });
  
    // Add new item functionality
    addButton.addEventListener("click", function() {
      
      const now = new Date();
      const formattedTime =
          "@" + ("0" + now.getHours()).slice(-2) + ":" +
          ("0" + now.getMinutes()).slice(-2) + ":" +
          ("0" + now.getSeconds()).slice(-2) + " ";
  
  
      const newItem = document.createElement("div");
      newItem.classList.add("pow-item");
      newItem.style.width = "25vh";
      newItem.style.height = "25vh";
      newItem.style.display = "flex";
      newItem.style.flexDirection = "column-reverse";
      newItem.style.alignItems = "left";
      newItem.style.justifyContent = "top";
      newItem.style.position = "absolute";
      
      const itemContent = document.createElement("div");
      itemContent.classList.add("pow-item-content");
  
      // Create editable content inside the sticky note
      const stickyContent = document.createElement("div");
      stickyContent.classList.add("pow-sticky");
      stickyContent.setAttribute("contenteditable", "true");
          stickyContent.style.width = "25vh";
      stickyContent.style.height = "25vh";
      
      // Set the initial content to the formatted time
      stickyContent.innerText = formattedTime;
      
      itemContent.appendChild(stickyContent);
          
      newItem.appendChild(itemContent);
      
       const handlerDiv = document.createElement("div");
      handlerDiv.classList.add("pow-item-handler");
  
          newItem.appendChild(handlerDiv);
  
  
      const hideButton = document.createElement("div");
      hideButton.classList.add("pow-item-hide");
      
      // Append the hide button to the new item
      handlerDiv.appendChild(hideButton);
  
      board.appendChild(newItem); // Append the new item to the board
  
      // Store the position for the new item
      storeItemPositionAsPercentage(newItem);
  
      // Reinitialize Webflow interactions after the new item is added
      //window.Webflow && window.Webflow.require('ix2').init();
      
      applyCurrentMode(); // Ensure dark or light mode persists after adding the note
  
      
      // Force a reflow after the new item is appended to the DOM
      newItem.offsetHeight; // This forces the reflow
  
      // **Force focus on the sticky content initially**
      stickyContent.focus();
  
      // **Re-enable editing when the sticky content is clicked again after losing focus**
      stickyContent.addEventListener("click", function() {
        stickyContent.focus();  // Force focus back on contenteditable div
      });
  
      // Hide the item only when the hide button is clicked
      hideButton.addEventListener('click', (e) => {
        e.stopPropagation();
        hideItem(newItem);
      });
  
      // Make the new item draggable
      Draggable.create(newItem, {
        type: "top,left", // Changed to "top,left"
        bounds: board,
        inertia: true,
        zIndexBoost: false,
        trigger: handlerDiv,
        ignore: ".pow-item input",
        allowEventDefault: true,
        dragPropagation: true,      
         onDragStart: function() {
          boardDraggable.disable();
        },
        onDragEnd: function() {
          boardDraggable.enable();
          storeItemPositionAsPercentage(newItem);
        }
      });
      // Set new items to highest z-index
      // Calculate the highest z-index currently on the board
const highestZIndex = Math.max(
  ...Array.from(document.querySelectorAll('.pow-item'))
    .map(item => parseInt(item.style.zIndex || getComputedStyle(item).zIndex) || 0)
);

// Store and apply the new z-index
storeItemOrder(newItem, highestZIndex + 1);
      // Add click handler to bring the new item to front when clicked
newItem.addEventListener('click', (e) => {
  // Skip if clicking directly on the hide button
  if (e.target.classList.contains('pow-item-hide')) {
    return;
  }
  
  // Bring item to front when clicked
  const highestZIndex = Math.max(
    ...Array.from(document.querySelectorAll('.pow-item'))
      .map(i => parseInt(i.style.zIndex) || 0)
  );
  storeItemOrder(newItem, highestZIndex + 1);
});
    });
  
  
    function hideItem(item) {
        // Pause any video inside the item
      const video = item.querySelector('video');
      if (video) {
          video.pause(); // Pause the video
      }  
    
      item.style.display = "none";
      showHideButton(item, false);
    }
  
  
  
    // Mess button functionality: reposition all items to a random location
    messButton.addEventListener("click", () => {
      document.querySelectorAll('.pow-item').forEach(item => {
          const x = 10 + Math.random() * 80;
          const y = 10 + Math.random() * 80;
    
        item.dataset.leftPercent = x;
        item.dataset.topPercent = y;
    
        const boardRect = board.getBoundingClientRect();
        const newLeftPx = (x / 100) * boardRect.width - (item.offsetWidth / 2);
        const newTopPx = (y / 100) * boardRect.height - (item.offsetHeight / 2);
    
        item.style.left = `${newLeftPx}px`;
        item.style.top = `${newTopPx}px`;
        
                // Update coordinates display
          const coordsDisplay = item.querySelector('.pow-item-coordinates');
          if (coordsDisplay) {
              coordsDisplay.textContent = `${x.toFixed(2)},${y.toFixed(2)}`;
          }
    
        console.log(`Repositioned item to random location: left ${x}%, top ${y}%`);
      });
    });
  
    // Stack button functionality: position all items to the center of the board
    stackButton.addEventListener("click", () => {
      document.querySelectorAll('.pow-item').forEach(item => {
        const x = 50;
        const y = 50;
    
        item.dataset.leftPercent = x;
        item.dataset.topPercent = y;
    
        const boardRect = board.getBoundingClientRect();
        const newLeftPx = (x / 100) * boardRect.width - (item.offsetWidth / 2);
        const newTopPx = (y / 100) * boardRect.height - (item.offsetHeight / 2);
    
        item.style.left = `${newLeftPx}px`;
        item.style.top = `${newTopPx}px`;
        
                // Update coordinates display
          const coordsDisplay = item.querySelector('.pow-item-coordinates');
          if (coordsDisplay) {
              coordsDisplay.textContent = `${x.toFixed(2)},${y.toFixed(2)}`;
          }
    
        console.log(`Positioned item to center: left ${x}%, top ${y}%`);
      });
    });
  });document.addEventListener("DOMContentLoaded", function() {
    // Select all the CMS items on the page
    const cmsItems = document.querySelectorAll('.w-dyn-item');

    cmsItems.forEach(item => {
        // Check if both .pow-visualheight and .pow-visual elements exist in the item
        const heightElement = item.querySelector('.pow-visualheight');
        const image = item.querySelector('.pow-visual');

        if (heightElement && image) {
            // Get the height value from the .pow-visualheight element
            const heightValue = heightElement.textContent.trim();
            
            // Set the height of the image and adjust width based on its aspect ratio
            if (heightValue) {
                const height = parseFloat(heightValue, 10);
                image.style.height = height + 'vh';
                image.style.width = 'auto'; // Adjust width automatically
            }
        }
    });
});// Dev Mode Manager
const DevModeManager = {
    parsePositionOrderFormat(value) {
        if (!value || !value.includes(':')) {
            return {};
        }
        const result = {};
        const entries = value.split(';').map(entry => entry.trim()).filter(entry => entry);
        entries.forEach(entry => {
            const separatorIndex = entry.indexOf(':');
            if (separatorIndex === -1) return; // Skip invalid entries
            const key = entry.slice(0, separatorIndex).trim().replace(/"/g, '');
            const val = entry.slice(separatorIndex + 1).trim().replace(/"/g, '');
            if (key && val) {
                result[key] = val;
            }
        });
        return result;
    },

    stringifyPositionOrderFormat(obj) {
        console.log(`[stringifyPositionOrderFormat] Input object:`, obj);
        return Object.entries(obj)
            .map(([key, value]) => `"${key}": "${value}"`)
            .join('; ');
    },

    init() {
        const hash = window.location.hash;
        if (!hash.startsWith('#dev_')) return;
        
        const devKey = hash.replace('#dev_', '');
        this.enableDevMode(devKey);
    },

    enableDevMode(key) {
        document.body.classList.add('dev-mode');
        document.documentElement.style.setProperty('--dev-mode-bg', 'rgba(255, 250, 240, 0.95)');
        
        this.addDevControls();
        window.positionChanges = new Map();
        this.initDraggableTracking(key);
    },

    addDevControls() {
        const controls = document.createElement('div');
        controls.className = 'dev-controls';
        controls.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: #FEF3C7;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        
        controls.innerHTML = `
            <div style="color: #92400E; margin-bottom: 8px;">Dev Mode Active</div>
            <button id="saveChanges" style="
                background: #D97706;
                color: white;
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            ">Save Changes</button>
            <div id="changeCount" style="font-size: 12px; margin-top: 4px;"></div>
        `;
        
        document.body.appendChild(controls);
        document.getElementById('saveChanges').addEventListener('click', () => this.saveChanges());
    },

    initDraggableTracking(devKey) {
        document.querySelectorAll('.pow-item').forEach(item => {
            const draggable = item._draggable;
            if (!draggable) return;

            const collectionType = this.getItemCollectionType(item);
            
            draggable.addEventListener('dragend', () => {
                const itemId = item.getAttribute('data-item-id');
                const contextCollection = document.body.getAttribute('pow-database-collection');
                const contextId = document.body.getAttribute('pow-database-id');
                const pageIdentifier = `${contextCollection}/${contextId}`;
            
                // Get current position and order values
                const positionElement = item.querySelector('.pow-itemposition');
                const orderElement = item.querySelector('.pow-item-order');
            
                // Step 1: Check data-raw-content
                console.log(`[dragend] Checking positionElement:`, positionElement);
                console.log(`[dragend] Checking data-raw-content attribute:`, positionElement?.getAttribute('data-raw-content'));
            
                // Step 2: Parse existing data-raw-content or reinitialize if missing
                let rawContent = positionElement?.getAttribute('data-raw-content') || '';
                if (!rawContent) {
                    console.warn(`[dragend] data-raw-content is missing. Reinitializing with default.`);
                    rawContent = `"default": "50,50"`;
                    positionElement.setAttribute('data-raw-content', rawContent);
                }
            
                const existingPosition = this.parsePositionOrderFormat(rawContent);
                console.log(`[dragend] Parsed object from data-raw-content:`, existingPosition);
            
                // Step 3: Get new position values (from drag event)
                const newPosition = `${item.dataset.leftPercent},${item.dataset.topPercent}`;
                console.log(`[dragend] New position for ${pageIdentifier}:`, newPosition);
            
                // Step 4: Merge new data into the parsed object
                existingPosition[pageIdentifier] = newPosition; // Add or update the key-value pair
                console.log(`[dragend] Merged object (after adding new position):`, existingPosition);
            
                // Step 5: Serialize the merged object
                const serializedPosition = this.stringifyPositionOrderFormat(existingPosition);
                console.log(`[dragend] Serialized data-raw-content:`, serializedPosition);
            
                // Step 6: Update the DOM element with the serialized data
                positionElement.setAttribute('data-raw-content', serializedPosition);
                console.log(`[dragend] Updated data-raw-content attribute:`, positionElement.getAttribute('data-raw-content'));
            
                // Step 7: Parse and update order (if applicable)
                let rawOrderContent = orderElement?.getAttribute('data-raw-content') || '';
                if (!rawOrderContent) {
                console.warn(`[dragend] data-raw-content for order is missing. Reinitializing with default.`);
                rawOrderContent = `"default": "1"`;
                orderElement.setAttribute('data-raw-content', rawOrderContent);
                }
                const existingOrder = this.parsePositionOrderFormat(rawOrderContent);
                const newOrder = item.style.zIndex || '1';
                existingOrder[pageIdentifier] = newOrder;
                const serializedOrder = this.stringifyPositionOrderFormat(existingOrder);
                console.log(`[dragend] Serialized data-raw-content for order:`, serializedOrder);
                orderElement.setAttribute('data-raw-content', serializedOrder);
            
                // Store changes in the global map
                window.positionChanges.set(itemId, {
                    itemId,
                    position: serializedPosition,
                    order: serializedOrder,
                    collectionType
                });
            
                // Update change count
                this.updateChangeCount();
            });
        });
    },

    getItemCollectionType(item) {
        if (item.closest('#images-collection')) return 'images';
        if (item.closest('#videos-collection')) return 'videos';
        if (item.closest('#widgets-collection')) return 'widgets';
        if (item.closest('#notes-collection')) return 'notes';
        if (item.closest('#posts-collection')) return 'posts';
        return null;
    },

    updateChangeCount() {
        const count = window.positionChanges.size;
        const countEl = document.getElementById('changeCount');
        if (countEl) {
            countEl.textContent = `${count} item${count !== 1 ? 's' : ''} modified`;
        }
    },

    async saveChanges() {
        const changes = Array.from(window.positionChanges.values());
        console.log(`[saveChanges] Changes being sent to API:`, changes);
        if (changes.length === 0) return;

        const saveButton = document.getElementById('saveChanges');
        saveButton.disabled = true;
        saveButton.textContent = 'Saving...';

        try {
            const devKey = window.location.hash.replace('#dev_', '');
            
            const response = await fetch('https://webflow-position-manager.vercel.app/api/update-positions', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${devKey}`
                },
                body: JSON.stringify({ changes })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response error:', {
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries()),
                    body: errorText
                });
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Success response:', data);
            window.positionChanges.clear();
            this.updateChangeCount();
            saveButton.textContent = 'Changes Saved!';
            setTimeout(() => {
                saveButton.textContent = 'Save Changes';
                saveButton.disabled = false;
            }, 2000);
        } catch (error) {
            console.error('Error saving changes:', error);
            if (error instanceof TypeError) {
                console.error('Network or CORS error details:', error);
            }
            saveButton.textContent = 'Error Saving';
            setTimeout(() => {
                saveButton.textContent = 'Save Changes';
                saveButton.disabled = false;
            }, 2000);
        }
    }
};

// Initialize Dev Mode Manager
document.addEventListener('DOMContentLoaded', () => DevModeManager.init());