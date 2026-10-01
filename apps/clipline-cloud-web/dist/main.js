var Ln=Object.defineProperty;var Nn=(e,t)=>()=>(e&&(t=e(e=0)),t);var Bn=(e,t)=>{for(var a in t)Ln(e,a,{get:t[a],enumerable:!0})};var Pa={};Bn(Pa,{ApiError:()=>ve,api:()=>k,getCsrfToken:()=>Mt,setCsrfToken:()=>be});function be(e){et=e}function Mt(){return et}function Zn(e){try{let t=globalThis.location?.href||"http://clipline.invalid/";return new URL(e,t).origin===new URL(t).origin}catch{return!1}}async function Jn(e,t){let a=await e.text();if(!t.includes("application/json"))return a;if(!a.trim())return null;try{return JSON.parse(a)}catch(n){if(e.ok)throw n;return null}}async function k(e,t={}){let a=(t.method||"GET").toUpperCase(),n=new Headers(t.headers||{});n.set("Accept","application/json");let r=t.body;r&&typeof r!="string"&&(n.set("Content-Type","application/json"),r=JSON.stringify(r)),Zn(e)?!["GET","HEAD","OPTIONS"].includes(a)&&et&&n.set("X-CSRF-Token",et):n.delete("X-CSRF-Token");let i=await fetch(e,{...t,body:r,credentials:"same-origin",headers:n,method:a}),c=i.headers.get("content-type")||"",m=await Jn(i,c);if(!i.ok){i.status===401&&window.dispatchEvent(new CustomEvent("clipline:unauthorized"));let l=typeof m=="object"&&m?.error?m.error:i.statusText;throw new ve(l||"Request failed",i.status)}return m}var et,ve,oe=Nn(()=>{et=null;ve=class extends Error{constructor(t,a){super(t),this.status=a}}});var Je,B,ea,zn,Se,Jt,ta,aa,bt,He,Ue,na,vt,gt,$t,Fn,je={},We=[],On=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Qe=Array.isArray;function $e(e,t){for(var a in t)e[a]=t[a];return e}function yt(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function wt(e,t,a){var n,r,s,i={};for(s in t)s=="key"?n=t[s]:s=="ref"?r=t[s]:i[s]=t[s];if(arguments.length>2&&(i.children=arguments.length>3?Je.call(arguments,2):a),typeof e=="function"&&e.defaultProps!=null)for(s in e.defaultProps)i[s]===void 0&&(i[s]=e.defaultProps[s]);return Ge(e,i,n,r,null)}function Ge(e,t,a,n,r){var s={type:e,props:t,key:a,ref:n,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++ea,__i:-1,__u:0};return r==null&&B.vnode!=null&&B.vnode(s),s}function Ye(e){return e.children}function Ke(e,t){this.props=e,this.context=t}function Me(e,t){if(t==null)return e.__?Me(e.__,e.__i+1):null;for(var a;t<e.__k.length;t++)if((a=e.__k[t])!=null&&a.__e!=null)return a.__e;return typeof e.type=="function"?Me(e):null}function qn(e){if(e.__P&&e.__d){var t=e.__v,a=t.__e,n=[],r=[],s=$e({},t);s.__v=t.__v+1,B.vnode&&B.vnode(s),kt(e.__P,s,t,e.__n,e.__P.namespaceURI,32&t.__u?[a]:null,n,a??Me(t),!!(32&t.__u),r),s.__v=t.__v,s.__.__k[s.__i]=s,la(n,s,r),t.__e=t.__=null,s.__e!=a&&ra(s)}}function ra(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(t){if(t!=null&&t.__e!=null)return e.__e=e.__c.base=t.__e}),ra(e)}function Qt(e){(!e.__d&&(e.__d=!0)&&Se.push(e)&&!Ze.__r++||Jt!=B.debounceRendering)&&((Jt=B.debounceRendering)||ta)(Ze)}function Ze(){try{for(var e,t=1;Se.length;)Se.length>t&&Se.sort(aa),e=Se.shift(),t=Se.length,qn(e)}finally{Se.length=Ze.__r=0}}function sa(e,t,a,n,r,s,i,c,m,l,d){var b,u,p,h,y,T,R,x=n&&n.__k||We,U=t.length;for(m=Vn(a,t,x,m,U),b=0;b<U;b++)(p=a.__k[b])!=null&&(u=p.__i!=-1&&x[p.__i]||je,p.__i=b,T=kt(e,p,u,r,s,i,c,m,l,d),h=p.__e,p.ref&&u.ref!=p.ref&&(u.ref&&Ct(u.ref,null,p),d.push(p.ref,p.__c||h,p)),y==null&&h!=null&&(y=h),(R=!!(4&p.__u))||u.__k===p.__k?(m=oa(p,m,e,R),R&&u.__e&&(u.__e=null)):typeof p.type=="function"&&T!==void 0?m=T:h&&(m=h.nextSibling),p.__u&=-7);return a.__e=y,m}function Vn(e,t,a,n,r){var s,i,c,m,l,d=a.length,b=d,u=0;for(e.__k=new Array(r),s=0;s<r;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i=="string"||typeof i=="number"||typeof i=="bigint"||i.constructor==String?i=e.__k[s]=Ge(null,i,null,null,null):Qe(i)?i=e.__k[s]=Ge(Ye,{children:i},null,null,null):i.constructor===void 0&&i.__b>0?i=e.__k[s]=Ge(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):e.__k[s]=i,m=s+u,i.__=e,i.__b=e.__b+1,c=null,(l=i.__i=Hn(i,a,m,b))!=-1&&(b--,(c=a[l])&&(c.__u|=2)),c==null||c.__v==null?(l==-1&&(r>d?u--:r<d&&u++),typeof i.type!="function"&&(i.__u|=4)):l!=m&&(l==m-1?u--:l==m+1?u++:(l>m?u--:u++,i.__u|=4))):e.__k[s]=null;if(b)for(s=0;s<d;s++)(c=a[s])!=null&&(2&c.__u)==0&&(c.__e==n&&(n=Me(c)),ua(c,c));return n}function oa(e,t,a,n){var r,s;if(typeof e.type=="function"){for(r=e.__k,s=0;r&&s<r.length;s++)r[s]&&(r[s].__=e,t=oa(r[s],t,a,n));return t}e.__e!=t&&(n&&(t&&e.type&&!t.parentNode&&(t=Me(e)),a.insertBefore(e.__e,t||null)),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Hn(e,t,a,n){var r,s,i,c=e.key,m=e.type,l=t[a],d=l!=null&&(2&l.__u)==0;if(l===null&&c==null||d&&c==l.key&&m==l.type)return a;if(n>(d?1:0)){for(r=a-1,s=a+1;r>=0||s<t.length;)if((l=t[i=r>=0?r--:s++])!=null&&(2&l.__u)==0&&c==l.key&&m==l.type)return i}return-1}function Yt(e,t,a){t[0]=="-"?e.setProperty(t,a??""):e[t]=a==null?"":typeof a!="number"||On.test(t)?a:a+"px"}function Ve(e,t,a,n,r){var s,i;e:if(t=="style")if(typeof a=="string")e.style.cssText=a;else{if(typeof n=="string"&&(e.style.cssText=n=""),n)for(t in n)a&&t in a||Yt(e.style,t,"");if(a)for(t in a)n&&a[t]==n[t]||Yt(e.style,t,a[t])}else if(t[0]=="o"&&t[1]=="n")s=t!=(t=t.replace(na,"$1")),i=t.toLowerCase(),t=i in e||t=="onFocusOut"||t=="onFocusIn"?i.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+s]=a,a?n?a[Ue]=n[Ue]:(a[Ue]=vt,e.addEventListener(t,s?$t:gt,s)):e.removeEventListener(t,s?$t:gt,s);else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=a??"";break e}catch{}typeof a=="function"||(a==null||a===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&a==1?"":a))}}function Xt(e){return function(t){if(this.l){var a=this.l[t.type+e];if(t[He]==null)t[He]=vt++;else if(t[He]<a[Ue])return;return a(B.event?B.event(t):t)}}}function kt(e,t,a,n,r,s,i,c,m,l){var d,b,u,p,h,y,T,R,x,U,q,A,D,K,V,Y,L=t.type;if(t.constructor!==void 0)return null;128&a.__u&&(m=!!(32&a.__u),s=[c=t.__e=a.__e]),(d=B.__b)&&d(t);e:if(typeof L=="function"){b=i.length;try{if(x=t.props,U=L.prototype&&L.prototype.render,q=(d=L.contextType)&&n[d.__c],A=d?q?q.props.value:d.__:n,a.__c?R=(u=t.__c=a.__c).__=u.__E:(U?t.__c=u=new L(x,A):(t.__c=u=new Ke(x,A),u.constructor=L,u.render=Kn),q&&q.sub(u),u.state||(u.state={}),u.__n=n,p=u.__d=!0,u.__h=[],u._sb=[]),U&&u.__s==null&&(u.__s=u.state),U&&L.getDerivedStateFromProps!=null&&(u.__s==u.state&&(u.__s=$e({},u.__s)),$e(u.__s,L.getDerivedStateFromProps(x,u.__s))),h=u.props,y=u.state,u.__v=t,p)U&&L.getDerivedStateFromProps==null&&u.componentWillMount!=null&&u.componentWillMount(),U&&u.componentDidMount!=null&&u.__h.push(u.componentDidMount);else{if(U&&L.getDerivedStateFromProps==null&&x!==h&&u.componentWillReceiveProps!=null&&u.componentWillReceiveProps(x,A),t.__v==a.__v||!u.__e&&u.shouldComponentUpdate!=null&&u.shouldComponentUpdate(x,u.__s,A)===!1){t.__v!=a.__v&&(u.props=x,u.state=u.__s,u.__d=!1),t.__e=a.__e,t.__k=a.__k,t.__k.some(function(j){j&&(j.__=t)}),We.push.apply(u.__h,u._sb),u._sb=[],u.__h.length&&i.push(u);break e}u.componentWillUpdate!=null&&u.componentWillUpdate(x,u.__s,A),U&&u.componentDidUpdate!=null&&u.__h.push(function(){u.componentDidUpdate(h,y,T)})}if(u.context=A,u.props=x,u.__P=e,u.__e=!1,D=B.__r,K=0,U)u.state=u.__s,u.__d=!1,D&&D(t),d=u.render(u.props,u.state,u.context),We.push.apply(u.__h,u._sb),u._sb=[];else do u.__d=!1,D&&D(t),d=u.render(u.props,u.state,u.context),u.state=u.__s;while(u.__d&&++K<25);u.state=u.__s,u.getChildContext!=null&&(n=$e($e({},n),u.getChildContext())),U&&!p&&u.getSnapshotBeforeUpdate!=null&&(T=u.getSnapshotBeforeUpdate(h,y)),V=d!=null&&d.type===Ye&&d.key==null?ca(d.props.children):d,c=sa(e,Qe(V)?V:[V],t,a,n,r,s,i,c,m,l),u.base=t.__e,t.__u&=-161,u.__h.length&&i.push(u),R&&(u.__E=u.__=null)}catch(j){if(i.length=b,t.__v=null,m||s!=null){if(j.then){for(t.__u|=m?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;s!=null&&(s[s.indexOf(c)]=null),t.__e=c}else if(s!=null)for(Y=s.length;Y--;)yt(s[Y])}else t.__e=a.__e;t.__k==null&&(t.__k=a.__k||[]),j.then||ia(t),B.__e(j,t,a)}}else s==null&&t.__v==a.__v?(t.__k=a.__k,t.__e=a.__e):c=t.__e=Gn(a.__e,t,a,n,r,s,i,m,l);return(d=B.diffed)&&d(t),128&t.__u?void 0:c}function ia(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(ia))}function la(e,t,a){for(var n=0;n<a.length;n++)Ct(a[n],a[++n],a[++n]);B.__c&&B.__c(t,e),e.some(function(r){try{e=r.__h,r.__h=[],e.some(function(s){s.call(r)})}catch(s){B.__e(s,r.__v)}})}function ca(e){return typeof e!="object"||e==null||e.__b>0?e:Qe(e)?e.map(ca):e.constructor!==void 0?null:$e({},e)}function Gn(e,t,a,n,r,s,i,c,m){var l,d,b,u,p,h,y,T=a.props||je,R=t.props,x=t.type;if(x=="svg"?r="http://www.w3.org/2000/svg":x=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s!=null){for(l=0;l<s.length;l++)if((p=s[l])&&"setAttribute"in p==!!x&&(x?p.localName==x:p.nodeType==3)){e=p,s[l]=null;break}}if(e==null){if(x==null)return document.createTextNode(R);e=document.createElementNS(r,x,R.is&&R),c&&(B.__m&&B.__m(t,s),c=!1),s=null}if(x==null)T===R||c&&e.data==R||(e.data=R);else{if(s=x=="textarea"&&R.defaultValue!=null?null:s&&Je.call(e.childNodes),!c&&s!=null)for(T={},l=0;l<e.attributes.length;l++)T[(p=e.attributes[l]).name]=p.value;for(l in T)p=T[l],l=="dangerouslySetInnerHTML"?b=p:l=="children"||l in R||l=="value"&&"defaultValue"in R||l=="checked"&&"defaultChecked"in R||Ve(e,l,null,p,r);for(l in R)p=R[l],l=="children"?u=p:l=="dangerouslySetInnerHTML"?d=p:l=="value"?h=p:l=="checked"?y=p:c&&typeof p!="function"||T[l]===p||Ve(e,l,p,T[l],r);if(d)c||b&&(d.__html==b.__html||d.__html==e.innerHTML)||(e.innerHTML=d.__html),t.__k=[];else if(b&&(e.innerHTML=""),sa(t.type=="template"?e.content:e,Qe(u)?u:[u],t,a,n,x=="foreignObject"?"http://www.w3.org/1999/xhtml":r,s,i,s?s[0]:a.__k&&Me(a,0),c,m),s!=null)for(l=s.length;l--;)yt(s[l]);c&&x!="textarea"||(l="value",x=="progress"&&h==null?e.removeAttribute("value"):h!=null&&(h!==e[l]||x=="progress"&&!h||x=="option"&&h!=T[l])&&Ve(e,l,h,T[l],r),l="checked",y!=null&&y!=e[l]&&Ve(e,l,y,T[l],r))}return e}function Ct(e,t,a){try{if(typeof e=="function"){var n=typeof e.__u=="function";n&&e.__u(),n&&t==null||(e.__u=e(t))}else e.current=t}catch(r){B.__e(r,a)}}function ua(e,t,a){var n,r;if(B.unmount&&B.unmount(e),(n=e.ref)&&(n.current&&n.current!=e.__e||Ct(n,null,t)),(n=e.__c)!=null){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(s){B.__e(s,t)}n.base=n.__P=n.__n=null}if(n=e.__k)for(r=0;r<n.length;r++)n[r]&&ua(n[r],t,a||typeof e.type!="function");a||yt(e.__e),e.__c=e.__=e.__e=void 0}function Kn(e,t,a){return this.constructor(e,a)}function da(e,t,a){var n,r,s,i;t==document&&(t=document.documentElement),B.__&&B.__(e,t),r=(n=typeof a=="function")?null:a&&a.__k||t.__k,s=[],i=[],kt(t,e=(!n&&a||t).__k=wt(Ye,null,[e]),r||je,je,t.namespaceURI,!n&&a?[a]:r?null:t.firstChild?Je.call(t.childNodes):null,s,!n&&a?a:r?r.__e:t.firstChild,n,i),la(s,e,i),e.props.children=null}Je=We.slice,B={__e:function(e,t,a,n){for(var r,s,i;t=t.__;)if((r=t.__c)&&!r.__)try{if((s=r.constructor)&&s.getDerivedStateFromError!=null&&(r.setState(s.getDerivedStateFromError(e)),i=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(e,n||{}),i=r.__d),i)return r.__E=r}catch(c){e=c}throw e}},ea=0,zn=function(e){return e!=null&&e.constructor===void 0},Ke.prototype.setState=function(e,t){var a;a=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=$e({},this.state),typeof e=="function"&&(e=e($e({},a),this.props)),e&&$e(a,e),e!=null&&this.__v&&(t&&this._sb.push(t),Qt(this))},Ke.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Qt(this))},Ke.prototype.render=Ye,Se=[],ta=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,aa=function(e,t){return e.__v.__b-t.__v.__b},Ze.__r=0,bt=Math.random().toString(8),He="__d"+bt,Ue="__a"+bt,na=/(PointerCapture)$|Capture$/i,vt=0,gt=Xt(!1),$t=Xt(!0),Fn=0;var Ie,W,St,pa,Ae=0,ya=[],Z=B,ma=Z.__b,fa=Z.__r,_a=Z.diffed,ha=Z.__c,ba=Z.unmount,ga=Z.__;function Tt(e,t){Z.__h&&Z.__h(W,e,Ae||t),Ae=0;var a=W.__H||(W.__H={__:[],__h:[]});return e>=a.__.length&&a.__.push({}),a.__[e]}function g(e){return Ae=1,jn(Ca,e)}function jn(e,t,a){var n=Tt(Ie++,2);if(n.t=e,!n.__c&&(n.__=[a?a(t):Ca(void 0,t),function(c){var m=n.__N?n.__N[0]:n.__[0],l=n.t(m,c);m!==l&&(n.__N=[l,n.__[1]],n.__c.setState({}))}],n.__c=W,!W.__f)){var r=function(c,m,l){if(!n.__c.__H)return!0;var d=!1,b=n.__c.props!==c;if(n.__c.__H.__.some(function(p){if(p.__N){d=!0;var h=p.__[0];p.__=p.__N,p.__N=void 0,h!==p.__[0]&&(b=!0)}}),s){var u=s.call(this,c,m,l);return d?u||b:u}return!d||b};W.__f=!0;var s=W.shouldComponentUpdate,i=W.componentWillUpdate;W.componentWillUpdate=function(c,m,l){if(this.__e){var d=s;s=void 0,r(c,m,l),s=d}i&&i.call(this,c,m,l)},W.shouldComponentUpdate=r}return n.__N||n.__}function M(e,t){var a=Tt(Ie++,3);!Z.__s&&ka(a.__H,t)&&(a.__=e,a.u=t,W.__H.__h.push(a))}function z(e){return Ae=5,Xe(function(){return{current:e}},[])}function Xe(e,t){var a=Tt(Ie++,7);return ka(a.__H,t)&&(a.__=e(),a.__H=t,a.__h=e),a.__}function Pt(e,t){return Ae=8,Xe(function(){return e},t)}function $a(){for(var e;e=ya.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(xt),t.__h.some(wa),t.__h=[]}catch(a){t.__h=[],Z.__e(a,e.__v)}}}Z.__b=function(e){W=null,ma&&ma(e)},Z.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),ga&&ga(e,t)},Z.__r=function(e){fa&&fa(e),Ie=0;var t=(W=e.__c).__H;t&&(St===W?(t.__h=[],W.__h=[],t.__.some(function(a){a.__N&&(a.__=a.__N),a.u=a.__N=void 0})):(t.__h.length&&$a(),Ie=0)),St=W},Z.diffed=function(e){_a&&_a(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(ya.push(t)!==1&&pa===Z.requestAnimationFrame||((pa=Z.requestAnimationFrame)||Wn)($a)),t.__H.__.some(function(a){a.u&&(a.__H=a.u,a.u=void 0)})),St=W=null},Z.__c=function(e,t){t.some(function(a){try{a.__h.some(xt),a.__h=a.__h.filter(function(n){return!n.__||wa(n)})}catch(n){t.some(function(r){r.__h&&(r.__h=[])}),t=[],Z.__e(n,a.__v)}}),ha&&ha(e,t)},Z.unmount=function(e){ba&&ba(e);var t,a=e.__c;a&&a.__H&&(a.__H.__.some(function(n){try{xt(n)}catch(r){t=r}}),a.__H=void 0,t&&Z.__e(t,a.__v))};var va=typeof requestAnimationFrame=="function";function Wn(e){var t,a=function(){clearTimeout(n),va&&cancelAnimationFrame(t),setTimeout(e)},n=setTimeout(a,35);va&&(t=requestAnimationFrame(a))}function xt(e){var t=W,a=e.__c;typeof a=="function"&&(e.__c=void 0,a()),W=t}function wa(e){var t=W;e.__c=e.__(),W=t}function ka(e,t){return!e||e.length!==t.length||t.some(function(a,n){return a!==e[n]})}function Ca(e,t){return typeof t=="function"?t(e):t}var xa=function(e,t,a,n){var r;t[0]=0;for(var s=1;s<t.length;s++){var i=t[s++],c=t[s]?(t[0]|=i?1:2,a[t[s++]]):t[++s];i===3?n[0]=c:i===4?n[1]=Object.assign(n[1]||{},c):i===5?(n[1]=n[1]||{})[t[++s]]=c:i===6?n[1][t[++s]]+=c+"":i?(r=e.apply(c,xa(e,c,a,["",null])),n.push(r),c[0]?t[0]|=2:(t[s-2]=0,t[s]=r)):n.push(c)}return n},Sa=new Map;function Ta(e){var t=Sa.get(this);return t||(t=new Map,Sa.set(this,t)),(t=xa(this,t.get(e)||(t.set(e,t=(function(a){for(var n,r,s=1,i="",c="",m=[0],l=function(u){s===1&&(u||(i=i.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?m.push(0,u,i):s===3&&(u||i)?(m.push(3,u,i),s=2):s===2&&i==="..."&&u?m.push(4,u,0):s===2&&i&&!u?m.push(5,0,!0,i):s>=5&&((i||!u&&s===5)&&(m.push(s,0,i,r),s=6),u&&(m.push(s,u,0,r),s=6)),i=""},d=0;d<a.length;d++){d&&(s===1&&l(),l(d));for(var b=0;b<a[d].length;b++)n=a[d][b],s===1?n==="<"?(l(),m=[m],s=3):i+=n:s===4?i==="--"&&n===">"?(s=1,i=""):i=n+i[0]:c?n===c?c="":i+=n:n==='"'||n==="'"?c=n:n===">"?(l(),s=1):s&&(n==="="?(s=5,r=i,i=""):n==="/"&&(s<5||a[d][b+1]===">")?(l(),s===3&&(m=m[0]),s=m,(m=m[0]).push(2,0,s),s=0):n===" "||n==="	"||n===`
`||n==="\r"?(l(),s=2):i+=n),s===3&&i==="!--"&&(s=4,m=m[0])}return l(),m})(e)),t),arguments,[])).length>1?t:t[0]}var o=Ta.bind(wt);oe();function Ma(e){let t=e,a=new Set;return{get:()=>t,set(n){t=n,a.forEach(r=>r(t))},update(n){this.set(n(t))},subscribe(n){return a.add(n),()=>a.delete(n)}}}function G(e){let[t,a]=g(e.get());return M(()=>e.subscribe(a),[e]),t}var N=Ma({user:null,csrfToken:null,ready:!1}),tt=Ma([]),Qn=0;function v(e,{actionLabel:t,onAction:a,timeoutMs:n=5e3}={}){let r=++Qn;return tt.update(s=>[...s,{id:r,message:e,actionLabel:t,onAction:a}]),n&&setTimeout(()=>at(r),n),r}function at(e){tt.update(t=>t.filter(a=>a.id!==e))}function Le(e){try{return decodeURIComponent(e)}catch{return e}}function Ra(e){let t=Number(e.get("page")||1);return{sort:e.get("sort")||"uploaded_at_desc",game:e.get("game")||"",q:e.get("q")||"",page:Number.isSafeInteger(t)?Math.max(1,t):1}}var Yn=["login","resetPassword","public","publicLibrary","publicGame","publicUser","about","games"];function Rt(e){return Yn.includes(e)}function Ea(e,t){return!t&&!Rt(e)}var Xn={publicLibrary:"feed",publicGame:"feed",games:"games",library:"library",clip:"library",admin:"admin",profile:"profile"};function Et(e){return Xn[e?.name]||""}function Da(e){return e?.name==="publicLibrary"&&e.surface==="search"?"search":Et(e)}function Ne(e,t){let a=new URLSearchParams(t||""),n=e;return n.startsWith("/c/")?{name:"public",shareId:Le(n.slice(3))}:n==="/"||n==="/public"||n==="/search"?{name:"publicLibrary",query:Ra(a),surface:n==="/search"?"search":"feed"}:n.startsWith("/game/")?{name:"publicGame",game:Le(n.slice(6)),query:Ra(a)}:n==="/about"?{name:"about"}:n==="/games"?{name:"games"}:n.startsWith("/u/")?{name:"publicUser",username:Le(n.slice(3))}:n==="/library"?{name:"library"}:n.startsWith("/clip/")?{name:"clip",clipId:Le(n.slice(6))}:n==="/admin/game-categories"?{name:"admin",tab:"categories"}:n.startsWith("/admin/game-categories/")?{name:"admin",tab:"categories",categoryId:Le(n.slice(23))}:n==="/admin"?{name:"admin",tab:a.get("tab")||"overview"}:n==="/account"?{name:"account"}:n==="/profile"?{name:"profile"}:n==="/login"?{name:"login",returnTo:a.get("return_to")}:n==="/reset-password"?{name:"resetPassword",token:a.get("token")||"",invite:a.get("invite")==="1"}:{name:"publicLibrary"}}var Dt=new Set;function F(e){window.history.pushState({},"",e),Ua()}function Ua(){let{pathname:e,search:t}=window.location,a=Ne(e,t);Dt.forEach(n=>n(a))}typeof window<"u"&&window.addEventListener("popstate",Ua);function Ia(){let[e,t]=g(()=>Ne(window.location.pathname,window.location.search));return M(()=>(Dt.add(t),()=>Dt.delete(t)),[]),e}function Aa(e){let t=e.target.closest("a[href^='/']");!t||t.target||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||(e.preventDefault(),F(t.getAttribute("href")))}var La={alert:'<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',arrowLeft:'<path d="m15 18-6-6 6-6"/><path d="M9 12h12"/>',clipboard:'<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',copy:'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',external:'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',fastForward:'<path d="m13 19 9-7-9-7v14Z"/><path d="m2 19 9-7-9-7v14Z"/>',film:'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/><path d="M3 8h4"/><path d="M3 16h4"/><path d="M17 8h4"/><path d="M17 16h4"/>',fullscreen:'<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',home:'<path d="m3 10 9-7 9 7"/><path d="M5 8.5V20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5"/><path d="M9 22V12h6v10"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',library:'<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',logOut:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',message:'<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',notepad:'<path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M6 4h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z"/><path d="M8 14h8"/><path d="M8 18h5"/>',pause:'<path d="M8 5v14"/><path d="M16 5v14"/>',play:'<path d="m8 5 11 7-11 7V5Z"/>',plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',check:'<path d="M20 6 9 17l-5-5"/>',refresh:'<path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/><path d="M3 12A9 9 0 0 1 18.5 5.7L21 8"/><path d="M21 3v5h-5"/>',rewind:'<path d="m11 19-9-7 9-7v14Z"/><path d="m22 19-9-7 9-7v14Z"/>',save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',server:'<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01"/><path d="M6 18h.01"/>',skipBack:'<path d="M19 20 9 12l10-8v16Z"/><path d="M5 19V5"/>',skipForward:'<path d="m5 4 10 8-10 8V4Z"/><path d="M19 5v14"/>',shield:'<path d="M20 13c0 5-3.5 7.5-7.7 8.8a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V5l8-3 8 3v8Z"/>',sliders:'<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M2 14h4"/><path d="M10 8h4"/><path d="M18 16h4"/>',theater:'<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M6 9h12"/><path d="M6 15h12"/>',trash:'<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="m19 6-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',volume2:'<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a9 9 0 0 1 0 14"/>',volumeX:'<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'};function C(e,{size:t=18}={}){return o`<svg viewBox="0 0 24 24" width=${t} height=${t} fill="none"
    stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true" dangerouslySetInnerHTML=${{__html:La[e]||""}} />`}function Ut(e){if(!e||typeof e!="string")return"";if(e.startsWith("/"))return e;try{let t=new URL(e,window.location.origin);if(t.origin===window.location.origin)return`${t.pathname}${t.search}`}catch{return""}return""}function er(e){let t=Ut(e?.avatar_url);if(!t)return"";let a=e.updated_at||"";if(!a)return t;let n=t.includes("?")?"&":"?";return`${t}${n}v=${encodeURIComponent(a)}`}function tr(e){return(e||"C").trim().slice(0,1).toUpperCase()||"C"}function xe({user:e,size:t=40,className:a=""}){let n=er(e),r=`width:${t}px;height:${t}px;font-size:${Math.round(t*.4)}px`;if(n)return o`<img class=${`user-avatar ${a}`} style=${r} src=${n} alt="" />`;let s=e?.display_name||e?.username;return o`<div class=${`user-avatar user-avatar-fallback ${a}`} style=${r} aria-hidden="true">
    ${tr(s)}
  </div>`}function ar(e){return e?.query?.q||""}function nr(e,t){let a=new URLSearchParams,n=String(t||"").trim(),r=e?.name==="publicGame"?e.game:e?.query?.game||"";n&&a.set("q",n),r&&a.set("game",r);let s=a.toString();return s?`/search?${s}`:"/search"}function Na({active:e,route:t}){let{user:a}=G(N),[n,r]=g(!1),s=z(null),i=ar(t),[c,m]=g(i);M(()=>{m(i)},[i]);let l=a?.role==="admin"||a?.role==="owner";M(()=>{if(!n)return;let u=h=>{s.current?.contains(h.target)||r(!1)},p=h=>{h.key==="Escape"&&r(!1)};return document.addEventListener("pointerdown",u),document.addEventListener("keydown",p),()=>{document.removeEventListener("pointerdown",u),document.removeEventListener("keydown",p)}},[n]);let d=[["feed","/","Feed"],["library","/library","Library",!!a],["games","/games","Games"],["admin","/admin","Admin",l]].filter(([,,,u])=>u!==!1),b=u=>{u.preventDefault();let p=new FormData(u.target).get("q")?.toString()||"";F(nr(t,p))};return o`<header class="topbar">
    <a class="wordmark" href="/" aria-label="Clipline home">
      <img src="/clipline-icon.svg" alt="" width="24" height="24" />
      <span class="wordmark-text">CLIP<span class="wordmark-accent">LINE</span></span>
    </a>
    <nav class="topnav" aria-label="Primary">
      ${d.map(([u,p,h])=>o`
        <a class=${u===e?"topnav-on":""} href=${p}>${h}</a>`)}
    </nav>
    <form class="topsearch" role="search" onSubmit=${b}>
      <input class="input" name="q" value=${c} onInput=${u=>m(u.target.value)}
        placeholder="Search clips, games, players…" aria-label="Search" />
    </form>
    ${a?o`<div class="avatar-wrap" ref=${s}>
          <button class="avatar-btn" aria-haspopup="menu" aria-expanded=${n}
            onClick=${()=>r(!n)}>
            <${xe} user=${a} size=${28} />
          </button>
          ${n&&o`<div class="menu" role="menu" onClick=${()=>r(!1)}>
            <a role="menuitem" href="/profile">Profile</a>
            <a role="menuitem" href="/account">Account</a>
            ${l&&o`<a role="menuitem" href="/admin">Admin</a>`}
            <button role="menuitem" class="menu-danger" onClick=${rr}>Sign out</button>
          </div>`}
        </div>`:o`<a class="btn" href="/login">${C("lock",{size:14})} Sign in</a>`}
  </header>`}async function rr(){let{api:e,setCsrfToken:t}=await Promise.resolve().then(()=>(oe(),Pa));try{await e("/api/v1/auth/logout",{method:"POST"})}catch{}t(null),N.set({user:null,csrfToken:null,ready:!0}),F("/login")}var sr=[["feed","/","home","Feed",!0],["games","/games","globe","Games",!0],["library","/library","library","Library","auth"],["search","/search","search","Search",!0],["profile","/profile","user","Profile","auth"]];function or(e){return sr.filter(([,,,,t])=>t!=="auth"||!!e)}function Ba({active:e}){let{user:t}=G(N),a=or(t);return o`<nav class="tabbar" aria-label="Primary">
    ${a.map(([n,r,s,i])=>o`
      <a class=${n===e?"tab-on":""} href=${r}>${C(s)}<span>${i}</span></a>`)}
  </nav>`}function za(){let e=G(tt);return o`<div class="toasts" role="status" aria-live="polite">
    ${e.map(t=>o`<div class="toast" key=${t.id}>
      <span>${t.message}</span>
      ${t.actionLabel&&o`<button class="toast-action"
        onClick=${()=>{t.onAction?.(),at(t.id)}}>${t.actionLabel}</button>`}
      <button class="toast-x" aria-label="Dismiss" onClick=${()=>at(t.id)}>✕</button>
    </div>`)}
  </div>`}oe();function Be(e,t,a=null){let n=e!=null,[r,s]=g(()=>({key:e,data:a,error:null,loading:n}));M(()=>{if(!n){s({key:e,data:a,error:null,loading:!1});return}let c=new AbortController;return s({key:e,data:a,error:null,loading:!0}),Promise.resolve().then(()=>t(c.signal)).then(m=>{s(l=>l.key===e?{key:e,data:m,error:null,loading:!1}:l)}).catch(m=>{m?.name!=="AbortError"&&s(l=>l.key===e?{key:e,data:a,error:m,loading:!1}:l)}),()=>c.abort()},[e,t]);let i=Pt(c=>{s(m=>{if(m.key!==e)return m;let l=typeof c=="function"?c(m.data):c;return{...m,data:l}})},[e]);return r.key!==e?{data:a,error:null,loading:n,setData:i}:{data:r.data,error:r.error,loading:r.loading,setData:i}}function ie(e,t=0,a=null){let n=Pt(r=>k(e,{signal:r}),[e]);return Be(`${e}\0${t}`,n,a)}function J(e){if(!e)return"Unknown";let t=new Date(e);return Number.isNaN(t.getTime())?"Unknown":new Intl.DateTimeFormat(void 0,{dateStyle:"medium",timeStyle:"short"}).format(t)}function ye(e){if(e==null)return"Unknown";let t=Math.max(0,Math.round(Number(e)/1e3)),a=Math.floor(t/60),n=t%60;return`${a}:${String(n).padStart(2,"0")}`}function nt(e){if(!e)return"Unknown";let t=new Date(e);if(Number.isNaN(t.getTime()))return"Unknown";let a=Math.min(0,t.getTime()-Date.now());if(Math.abs(a)<1e3)return"just now";let n=[["year",365*24*60*60*1e3],["month",720*60*60*1e3],["week",10080*60*1e3],["day",1440*60*1e3],["hour",3600*1e3],["minute",60*1e3],["second",1e3]],[r,s]=n.find(([,c])=>Math.abs(a)>=c)||n[n.length-1],i=-Math.floor(Math.abs(a)/s);return new Intl.RelativeTimeFormat(void 0,{numeric:"always"}).format(i,r)}function O(e){if(e==null)return"Unknown";let t=Number(e);if(!Number.isFinite(t))return"Unknown";let a=["B","KiB","MiB","GiB","TiB"],n=t,r=0;for(;n>=1024&&r<a.length-1;)n/=1024,r+=1;return`${n.toFixed(r===0?0:1)} ${a[r]}`}function Pe(e){let t=Number(e||0),a=Number.isFinite(t)&&t>0?Math.floor(t):0;return`${new Intl.NumberFormat(void 0,{notation:a>=1e4?"compact":"standard"}).format(a)} view${a===1?"":"s"}`}function we(e){return`/api/v1/public/clips/${encodeURIComponent(e.share_id)}/thumbnail`}function It(e){return`/api/v1/clips/${encodeURIComponent(e.id)}/thumbnail`}function rt(e){return`/api/v1/clips/${encodeURIComponent(e.id)}/media`}function Fa(e){return`/api/v1/clips/${encodeURIComponent(e.id)}/poster`}function st(e){return`/api/v1/public/clips/${encodeURIComponent(e.share_id)}/poster`}function Re(e){return`/api/v1/public/clips/${encodeURIComponent(e.share_id)}/media`}function ze(e,t,a){if(e)try{return`${t}${new URL(e).pathname}`}catch{}return a?`${t}/c/${encodeURIComponent(a)}`:null}var ot=null;function Oa(e){ot?.(),ot=e}function qa(e){ot===e&&(ot=null)}var ir=()=>window.matchMedia("(pointer: fine)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!navigator.connection?.saveData;function Va({src:e,poster:t,alt:a=""}){let[n,r]=g(!1),[s,i]=g(0),c=z(null),m=z(null),l=z(!0),d=z(),b=()=>{l.current&&(clearTimeout(c.current),r(!1),i(0))};d.current=b;let u=()=>{!e||!ir()||(c.current=setTimeout(()=>{l.current&&(Oa(d.current),r(!0))},300))},p=h=>{let y=h.target;y.duration&&i(y.currentTime/y.duration)};return M(()=>()=>{l.current=!1,clearTimeout(c.current),qa(d.current)},[]),o`<span class="hover-preview" onPointerEnter=${u} onPointerLeave=${b}>
    ${n?o`<video ref=${m} src=${e} poster=${t} muted loop autoplay
          playsinline preload="none" onTimeUpdate=${p} />`:o`<img src=${t} alt=${a} loading="lazy" />`}
    ${n&&o`<span class="preview-scrub"><span style=${`width:${s*100}%`} /></span>`}
  </span>`}function At(e){return e.owner?.display_name||e.owner?.username||e.owner_username||e.author_name||e.author_username||null}function Ee({clip:e,href:t,selectable:a=!1,selected:n=!1,onToggleSelect:r,showVisibility:s=!1,showAuthor:i=!1}){let c=At(e),m=[e.game_name&&o`<em>${e.game_display_name||e.game_name}</em>`,i&&c,e.view_count!=null&&Pe(e.view_count),e.uploaded_at&&nt(e.uploaded_at)].filter(Boolean);return o`<article class=${`clip-card ${n?"is-selected":""} ${a?"is-selectable":""}`}>
    <a class="card-thumb" href=${t} tabindex="-1" aria-hidden="true">
      <${Va} src=${e.media_url} poster=${e.thumbnail_url} />
      ${e.duration_ms!=null&&o`<span class="dur-pill">${ye(e.duration_ms)}</span>`}
      ${s&&o`<span class=${`badge badge-${e.visibility} card-vis`}>${e.visibility}</span>`}
    </a>
    ${a&&o`<label class="card-check">
      <input type="checkbox" checked=${n} aria-label=${`Select ${e.title}`}
        onChange=${()=>r?.(e.id)} />
    </label>`}
    <h3 class="card-title"><a href=${t}>${e.title}</a></h3>
    <p class="card-meta">${m.map((l,d)=>o`${d>0&&" \xB7 "}${l}`)}</p>
  </article>`}function Q({name:e="film",title:t,body:a,action:n}){return o`<div class="empty">
    <div class="empty-icon">${C(e,{size:28})}</div>
    <h3>${t}</h3>
    ${a&&o`<p>${a}</p>`}
    ${n}
  </div>`}var lr=[["uploaded_at_desc","Uploaded newest"],["uploaded_at_asc","Uploaded oldest"],["recorded_at_desc","Recorded newest"],["recorded_at_asc","Recorded oldest"],["created_at_desc","Created newest"],["created_at_asc","Created oldest"],["duration_desc","Duration longest"],["duration_asc","Duration shortest"],["title_asc","Title A-Z"],["title_desc","Title Z-A"]],cr=6,ur=60,dr=/^[0-9A-HJKMNP-TV-Z]{26}$/i;function pr(e){return dr.test(String(e||"").trim())}function mr(e){let t=new URLSearchParams;return t.set("page_size",String(ur)),e.sort!=="uploaded_at_desc"&&t.set("sort",e.sort),e.game&&t.set(pr(e.game)?"game_category_id":"game",e.game),e.q&&t.set("q",e.q),Number(e.page)>1&&t.set("page",String(e.page)),t}function Ha(e){return e?.game_display_name||e?.game_name||"No game"}function fr(e,t,a=cr){let n=[...e||[]].sort((b,u)=>(u.clip_count||0)-(b.clip_count||0)),r=n.slice(0,a),s=String(t||"").trim(),i=s&&r.some(b=>b.category_id===s),c=s&&!i?n.find(b=>b.category_id===s)||{category_id:s,clip_count:0}:null,m=c?[c,...r]:r,l=new Set(m.map(b=>b.category_id)),d=n.filter(b=>!l.has(b.category_id)).length;return{chips:m,extraGameCount:d}}function Nt({route:e}){let t={sort:"uploaded_at_desc",page:1,q:"",...e.query,game:e.name==="publicGame"?e.game:e.query?.game||""},a=`/api/v1/public/clips?${mr(t)}`,{data:n,error:r}=ie(a),{data:s}=ie("/api/v1/public/games",0,{games:[]}),i=s?.games||[],c=p=>F(br({...t,page:1,...p}));if(r)return o`<main class="page">
      <${Q} name="alert" title="Couldn't load the feed" body=${r.message} />
    </main>`;let m=n?.clips,l=!!(t.game||t.q)||Number(t.page)>1,d=!l,{chips:b,extraGameCount:u}=fr(i,t.game);return o`<main class="page">
    ${m==null?o`<${hr} />`:m.length===0?o`<${Q} name="film"
          title=${l?"No clips match this filter":"No public clips yet"}
          body=${l?"Try a different game, search, or clear your filters.":"Clips shared as public from a library will show up here."}
          action=${l&&o`<a class="btn" href="/">Clear filters</a>`} />`:o`
        ${d?_r(m):""}
        <div class="feed-toolbar">
          <h2>Latest uploads</h2>
          <select class="input" value=${t.sort} onChange=${p=>c({sort:p.target.value})}>
            ${lr.map(([p,h])=>o`<option value=${p}>${h}</option>`)}
          </select>
          <div class="chips">
            <button class=${`chip ${t.game?"":"chip-on"}`} onClick=${()=>c({game:""})}>All</button>
            ${b.map(p=>o`<button
              class=${`chip ${t.game===p.category_id?"chip-on":""}`}
              onClick=${()=>c({game:p.category_id})}>${p.display_name}</button>`)}
            ${u>0&&o`<a class="chip" href="/games">+${u}</a>`}
          </div>
        </div>
        <div class="card-grid">
          ${(d?m.slice(4):m).map(p=>o`<${Ee} clip=${{...p,thumbnail_url:we(p),media_url:Re(p)}}
              href=${Lt(p)} showAuthor />`)}
        </div>
        ${gr(n,t,c)}
      `}
  </main>`}function _r(e){let[t,...a]=e,n=a.slice(0,3);return o`<p class="kicker">Now playing on this server</p>
    <section class="hero">
      <a class="hero-main" href=${Lt(t)}>
        <img src=${st(t)} alt="" loading="lazy" />
        <span class="hero-caption">▶ ${t.title} — ${Ha(t)} · ${ye(t.duration_ms)}</span>
      </a>
      <div class="hero-side">
        ${n.map(r=>o`<a class="hero-row" href=${Lt(r)}>
            <span class="hero-thumb">
              <img src=${we(r)} alt="" loading="lazy" />
              <span class="dur-pill">${ye(r.duration_ms)}</span>
            </span>
            <span class="hero-copy"><b>${r.title}</b>
              <small>${At(r)} · ${Ha(r)} · ${Pe(r.view_count)}</small></span>
          </a>`)}
      </div>
    </section>`}function hr({count:e=8}){return o`<div class="card-grid">
    ${Array.from({length:e},(t,a)=>o`<div class="clip-card" key=${a}>
      <div class="skeleton-thumb"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line is-short"></div>
    </div>`)}
  </div>`}function Lt(e){return`/c/${encodeURIComponent(e.share_id)}`}function br({sort:e="uploaded_at_desc",game:t="",q:a="",page:n=1}={}){let r=new URLSearchParams,s=e||"uploaded_at_desc",i=String(t||"").trim(),c=String(a||"").trim(),m=Math.max(1,Math.floor(Number(n||1))||1);if(s!=="uploaded_at_desc"&&r.set("sort",s),m>1&&r.set("page",String(m)),c)return r.set("q",c),i&&r.set("game",i),`/search?${r.toString()}`;if(i){let d=r.toString();return`/game/${encodeURIComponent(i)}${d?`?${d}`:""}`}let l=r.toString();return l?`/search?${l}`:"/"}function gr(e,t,a){let n=Math.max(1,Math.floor(Number(t.page||1))||1),r=!!e?.has_more;return n<=1&&!r?"":o`<nav class="pager" aria-label="Public clip pages">
    <button class="btn" type="button" disabled=${n<=1}
      onClick=${()=>a({page:n-1})}>Previous</button>
    <span class="muted">Page ${n}</span>
    <button class="btn" type="button" disabled=${!r}
      onClick=${()=>a({page:n+1})}>Next</button>
  </nav>`}function Ga(){let{data:e,error:t}=ie("/api/v1/public/games"),a=e?.games??null;return t?o`<main class="page">
      <${Q} name="alert" title="Couldn't load games" body=${t.message} />
    </main>`:o`<main class="page">
    <p class="kicker">Browse by game</p>
    ${a==null?o`<div class="game-grid">
          ${Array.from({length:6},(n,r)=>o`<div class="game-tile is-loading" key=${r}>
            <div class="skeleton-thumb"></div>
          </div>`)}
        </div>`:a.length===0?o`<${Q} name="film" title="No games yet"
          body="Once clips are shared as public, their games will show up here." />`:o`<div class="game-grid">
          ${a.map(n=>o`<a class="game-tile" href=${`/game/${encodeURIComponent(n.category_id)}`}>
            ${n.thumbnail_url?o`<img src=${n.thumbnail_url} alt="" loading="lazy" />`:o`<div class="game-tile-fallback">${(n.display_name||"?")[0].toUpperCase()}</div>`}
            <div class="game-tile-body">
              <b>${n.display_name}</b>
              <small>${n.clip_count} clip${n.clip_count===1?"":"s"}</small>
            </div>
          </a>`)}
        </div>`}
  </main>`}oe();function Ka({trigger:e,content:t,onClose:a,label:n,panelClass:r=""}){let[s,i]=g(!1),c=z(null),m=z(null),l=z(null),d=()=>{i(!1),a?.()},b=()=>{if(s){d();return}l.current=document.activeElement,i(!0)};return M(()=>{if(!s)return;let u=y=>{c.current?.contains(y.target)||d()},p=y=>{y.key==="Escape"&&d()};return document.addEventListener("pointerdown",u),document.addEventListener("keydown",p),m.current?.querySelector("input, select, textarea, button, a[href], [tabindex]")?.focus(),()=>{document.removeEventListener("pointerdown",u),document.removeEventListener("keydown",p),l.current?.focus?.()}},[s]),o`<div class="popover-wrap" ref=${c}>
    ${e({open:s,toggle:b})}
    ${s&&o`<div class=${`popover ${r}`} ref=${m} role="dialog" aria-label=${n||"Filters"}>
      ${t}
    </div>`}
  </div>`}function ja({count:e,busy:t=!1,onPublic:a,onPrivate:n,onCopyLinks:r,onDelete:s,onClear:i}){return e?o`<div class="bulkbar" role="toolbar" aria-label="Bulk actions" aria-busy=${t?"true":"false"}>
    <b>${e} selected</b>
    <button class="btn" disabled=${t} onClick=${a}>Make public</button>
    <button class="btn" disabled=${t} onClick=${n}>Make private</button>
    <button class="btn" disabled=${t} onClick=${r}>Copy links</button>
    <button class="btn btn-danger" disabled=${t} onClick=${s}>Delete</button>
    <button class="btn bulk-x" disabled=${t} aria-label="Clear selection" onClick=${i}>✕</button>
  </div>`:null}function le({open:e,title:t,body:a,confirmLabel:n="Confirm",onConfirm:r,onCancel:s,danger:i=!1,confirmDisabled:c=!1}){let m=z(null),l=z(null);return M(()=>{let d=m.current;d&&(e&&!d.open?(d.showModal(),l.current?.focus()):!e&&d.open&&d.close())},[e]),o`<dialog ref=${m} class="confirm-dialog" aria-labelledby="confirm-dialog-title"
    onCancel=${d=>{d.preventDefault(),s?.()}}
    onClose=${()=>e&&s?.()}>
    ${e&&o`<div class="confirm-dialog-body">
      <h2 id="confirm-dialog-title">${t}</h2>
      ${a&&o`<p>${a}</p>`}
      <div class="confirm-dialog-actions">
        <button type="button" class="btn" onClick=${s}>Cancel</button>
        <button type="button" ref=${l} class=${`btn ${i?"btn-danger":"btn-primary"}`}
          disabled=${c} onClick=${r}>${n}</button>
      </div>
    </div>`}
  </dialog>`}var Ja="clipline.libraryView",$r=[["uploaded_at_desc","Uploaded newest"],["uploaded_at_asc","Uploaded oldest"],["recorded_at_desc","Recorded newest"],["recorded_at_asc","Recorded oldest"],["updated_at_desc","Updated newest"],["updated_at_asc","Updated oldest"],["created_at_desc","Created newest"],["created_at_asc","Created oldest"],["duration_desc","Duration longest"],["duration_asc","Duration shortest"],["size_desc","Size largest"],["size_asc","Size smallest"],["title_asc","Title A-Z"],["title_desc","Title Z-A"]],it={title:["title_asc","title_desc"],size:["size_asc","size_desc"],duration:["duration_asc","duration_desc"],uploaded:["uploaded_at_asc","uploaded_at_desc"]},vr=["visibility","status","source_type","from","to","min_duration_seconds","max_duration_seconds","min_size_mib","max_size_mib"],ut={sort:"uploaded_at_desc",page:1,game:"",source_type:"",visibility:"",status:"",q:"",from:"",to:"",min_duration_seconds:"",max_duration_seconds:"",min_size_mib:"",max_size_mib:""};function lt(e){if(e===""||e==null)return null;let t=Number(e);return Number.isFinite(t)?t:null}function yr(e){let t=new URLSearchParams;t.set("sort",e.sort||ut.sort),t.set("page_size","100"),t.set("page",String(Math.max(1,Number(e.page||1)))),e.game&&t.set("game_category_id",e.game);for(let i of["source_type","visibility","status","q"])e[i]&&t.set(i,e[i]);e.from&&t.set("from",new Date(`${e.from}T00:00:00`).toISOString()),e.to&&t.set("to",new Date(`${e.to}T23:59:59.999`).toISOString());let a=lt(e.min_duration_seconds);a!=null&&t.set("min_duration_ms",String(Math.round(a*1e3)));let n=lt(e.max_duration_seconds);n!=null&&t.set("max_duration_ms",String(Math.round(n*1e3)));let r=lt(e.min_size_mib);r!=null&&t.set("min_size_bytes",String(Math.round(r*1024*1024)));let s=lt(e.max_size_mib);return s!=null&&t.set("max_size_bytes",String(Math.round(s*1024*1024))),t}function wr(e){return vr.reduce((t,a)=>t+(e[a]?1:0),0)}function kr(e,t=6){let a=new Map;for(let n of e){let r=n.game_category_id||n.game_name;if(!r)continue;let s=a.get(r)||{count:0,label:n.game_display_name||r,iconUrl:n.game_icon_url||null};s.count+=1,!s.iconUrl&&n.game_icon_url&&(s.iconUrl=n.game_icon_url),a.set(r,s)}return Array.from(a,([n,r])=>({game:n,count:r.count,label:r.label,...r.iconUrl?{icon_url:r.iconUrl}:{}})).sort((n,r)=>r.count-n.count||n.label.localeCompare(r.label)).slice(0,t)}function Wa(e,t,{verb:a,allFailedMessage:n}){let r=e.filter(i=>!t.some(c=>c.id===i));if(!t.length)return{succeeded:r,message:null};let s=t.length===e.length?t[0]?.message||n:`Couldn't ${a} ${t.length} of ${e.length} clips.`;return{succeeded:r,message:s}}function Cr(e,t){return(e||[]).map(a=>ze(a.public_url,t,a.public_share_id)).filter(Boolean)}async function Za(e,t,a){let n=0;async function r(){let s=n++;if(!(s>=e.length))return await a(e[s]),r()}await Promise.all(Array.from({length:Math.min(t,e.length)},r))}function Sr(){try{return localStorage.getItem(Ja)==="rows"?"rows":"grid"}catch{return"grid"}}function Qa(){let[e,t]=g(Sr),[a,n]=g(ut),[r,s]=g(ut.q),[i,c]=g(new Set),[m,l]=g(!1),[d,b]=g(!1),[u,p]=g(0),h=`/api/v1/clips?${yr(a)}`,{data:y,error:T,setData:R}=ie(h,u),x=z(!1),U=z(null);M(()=>()=>clearTimeout(U.current),[]),M(()=>c(new Set),[h,u]);let q=f=>{t(f);try{localStorage.setItem(Ja,f)}catch{}},A=()=>p(f=>f+1),D=f=>{x.current=f,l(f)},K=f=>{let $=f.target.value;s($),clearTimeout(U.current),U.current=setTimeout(()=>{n(E=>({...E,q:$,page:1}))},300)},V=f=>$=>{let E=$.target.value;n(I=>({...I,[f]:E,page:1}))},Y=()=>{n(f=>({...f,page:1,visibility:"",status:"",source_type:"",from:"",to:"",min_duration_seconds:"",max_duration_seconds:"",min_size_mib:"",max_size_mib:""}))},L=f=>n($=>({...$,game:$.game===f?"":f,page:1})),j=f=>n($=>({...$,sort:f,page:1})),_e=f=>n($=>({...$,page:Math.max(1,f)})),me=f=>{c($=>{let E=new Set($);return E.has(f)?E.delete(f):E.add(f),E})};function re(f,$){R(E=>E&&{...E,clips:E.clips.map(I=>I.id===f?{...I,...$}:I)})}function ke(f,$){let E=new Set(f);R(I=>I&&{...I,clips:I.clips.map(_=>E.has(_.id)?{..._,...$}:_)})}async function te(f){if(x.current)return;let $=Array.from(i);if(!$.length)return;let E=y?.clips||[],I=new Map($.map(P=>[P,E.find(de=>de.id===P)]));D(!0),ke($,{visibility:f});let _=[],S=new Map;try{await Za($,4,async he=>{try{let pe=await k(`/api/v1/clips/${encodeURIComponent(he)}/visibility`,{method:"POST",body:{visibility:f}}),De={visibility:pe.visibility,public_url:pe.public_url,public_share_id:pe.public_share_id};re(he,De),S.set(he,De)}catch(pe){_.push({id:he,message:pe.message})}});let{succeeded:P,message:de}=Wa($,_,{verb:"update",allFailedMessage:"Couldn't update visibility."});if(de){for(let{id:he}of _){let pe=I.get(he);pe&&re(he,{visibility:pe.visibility,public_url:pe.public_url,public_share_id:pe.public_share_id})}v(de)}P.length&&(c(new Set),v(`Made ${P.length} clip${P.length===1?"":"s"} ${f}`,{actionLabel:"Undo",onAction:()=>X(P,I,S)}))}finally{D(!1)}}async function X(f,$,E){if(x.current){v("Wait for visibility changes to finish.");return}D(!0);try{for(let S of f){let P=$.get(S);P&&re(S,{visibility:P.visibility,public_url:P.public_url,public_share_id:P.public_share_id})}let I=[];await Za(f,4,async S=>{let P=$.get(S);if(P)try{let de=await k(`/api/v1/clips/${encodeURIComponent(S)}/visibility`,{method:"POST",body:{visibility:P.visibility}});re(S,{visibility:de.visibility,public_url:de.public_url,public_share_id:de.public_share_id})}catch(de){I.push({id:S,message:de.message})}});let{message:_}=Wa(f,I,{verb:"undo",allFailedMessage:"Couldn't undo visibility change."});if(_){for(let{id:S}of I){let P=E.get(S);P&&re(S,P)}v(_)}}finally{D(!1)}}async function ce(){if(x.current){v("Wait for visibility changes to finish.");return}let f=Array.from(i),$=y?.clips||[],E=f.map(S=>$.find(P=>P.id===S)).filter(Boolean),I=Cr(E,window.location.origin),_=E.length-I.length;if(!I.length){v("No links to copy \u2014 selected clips are private.");return}try{await navigator.clipboard.writeText(I.join(`
`)),v(`Copied ${I.length} link${I.length===1?"":"s"}`+(_?` (${_} skipped, private)`:""))}catch{v("Couldn't copy links to clipboard.")}}async function ue(){let f=Array.from(i);b(!1);try{let $=await k("/api/v1/clips/bulk-delete",{method:"POST",body:{ids:f}});c(new Set),A(),v(`Deleted ${$.affected} clip${$.affected===1?"":"s"}.`)}catch($){v($.message)}}if(T)return o`<main class="page">
      <${Q} name="alert" title="Couldn't load your library" body=${T.message} />
    </main>`;let ae=y?.clips,ne=wr(a),Ce=!!(a.q||a.game)||ne>0,se=kr(ae||[]),ge=Number(y?.total??(ae||[]).length),Te=Number(y?.total_size_bytes??(ae||[]).reduce((f,$)=>f+($.file_size_bytes||0),0)),fe=Number(y?.page||a.page||1),w=fe>1||!!y?.has_more,H=o`<div class="popover-fields">
    <label class="field"><span>Visibility</span>
      <select class="input" value=${a.visibility} onChange=${V("visibility")}>
        <option value="">Any</option>
        <option value="private">Private</option>
        <option value="public">Public</option>
        <option value="unlisted">Unlisted</option>
      </select>
    </label>
    <label class="field"><span>Status</span>
      <select class="input" value=${a.status} onChange=${V("status")}>
        <option value="">Any</option>
        <option value="created">Created</option>
        <option value="uploading">Uploading</option>
        <option value="processing">Processing</option>
        <option value="ready">Ready</option>
        <option value="failed">Failed</option>
      </select>
    </label>
    <label class="field"><span>Source</span>
      <input class="input" type="text" value=${a.source_type} onInput=${V("source_type")} placeholder="Source type" />
    </label>
    <label class="field"><span>From</span>
      <input class="input" type="date" value=${a.from} onInput=${V("from")} />
    </label>
    <label class="field"><span>To</span>
      <input class="input" type="date" value=${a.to} onInput=${V("to")} />
    </label>
    <label class="field"><span>Min duration (s)</span>
      <input class="input" type="number" min="0" value=${a.min_duration_seconds} onInput=${V("min_duration_seconds")} />
    </label>
    <label class="field"><span>Max duration (s)</span>
      <input class="input" type="number" min="0" value=${a.max_duration_seconds} onInput=${V("max_duration_seconds")} />
    </label>
    <label class="field"><span>Min size (MiB)</span>
      <input class="input" type="number" min="0" step="0.1" value=${a.min_size_mib} onInput=${V("min_size_mib")} />
    </label>
    <label class="field"><span>Max size (MiB)</span>
      <input class="input" type="number" min="0" step="0.1" value=${a.max_size_mib} onInput=${V("max_size_mib")} />
    </label>
    <div class="popover-actions">
      <button type="button" class="btn" onClick=${Y}>Clear filters</button>
    </div>
  </div>`;return o`<main class="page">
    <div class="lib-header">
      <div>
        <h1>Library</h1>
        <p>${ge} clip${ge===1?"":"s"} · ${O(Te)} used</p>
      </div>
      <div class="seg" role="group" aria-label="View">
        <button type="button" class=${`seg-item ${e==="grid"?"seg-on":""}`}
          aria-pressed=${e==="grid"} onClick=${()=>q("grid")}>Grid</button>
        <button type="button" class=${`seg-item ${e==="rows"?"seg-on":""}`}
          aria-pressed=${e==="rows"} onClick=${()=>q("rows")}>Rows</button>
      </div>
    </div>

    <div class="lib-toolbar">
      <input class="input" type="search" aria-label="Search clips" placeholder="Search title or game"
        value=${r} onInput=${K} />
      <select class="input" aria-label="Sort" value=${a.sort} onChange=${f=>j(f.target.value)}>
        ${$r.map(([f,$])=>o`<option value=${f}>${$}</option>`)}
      </select>
      <${Ka}
        label="Filters"
        panelClass="popover-filters"
        trigger=${({open:f,toggle:$})=>o`<button type="button" class="btn" aria-haspopup="dialog"
          aria-expanded=${f} onClick=${$}>
          ${C("sliders",{size:14})} Filters
          ${ne>0&&o`<span class="filter-badge">${ne}</span>`}
        </button>`}
        content=${H} />
    </div>

    ${se.length>0&&o`<div class="lib-chips">
      <button type="button" class=${`chip ${a.game?"":"chip-on"}`} aria-pressed=${!a.game}
        onClick=${()=>L("")}>All</button>
      ${se.map(f=>o`<button type="button" class=${`chip game-filter-chip ${f.icon_url?"has-icon":""} ${a.game===f.game?"chip-on":""}`}
        aria-label=${`Filter by ${f.label}`} title=${f.label}
        aria-pressed=${a.game===f.game} onClick=${()=>L(f.game)}>
        ${f.icon_url?o`<img src=${f.icon_url} alt="" loading="lazy" />`:f.label}
      </button>`)}
    </div>`}

    ${ae==null?o`<${Tr} />`:ae.length===0?Ce?o`<${Q} name="film" title="No clips match this view"
            body="Try a different search, game, or clear your filters."
            action=${o`<button type="button" class="btn" onClick=${()=>{n(ut),s("")}}>Clear filters</button>`} />`:o`<${Q} name="upload" title="Connect the Clipline desktop app to start uploading"
            body="New clips uploaded from the desktop app will show up here."
            action=${o`<a class="btn" href="/about">Learn more</a>`} />`:e==="grid"?o`<div class=${`card-grid ${i.size>0?"selecting":""}`}>
          ${ae.map(f=>o`<${Ee} key=${f.id}
            clip=${{...f,thumbnail_url:It(f),media_url:rt(f)}}
            href=${`/clip/${encodeURIComponent(f.id)}`}
            selectable selected=${i.has(f.id)} onToggleSelect=${me} showVisibility />`)}
        </div>`:o`<${xr} clips=${ae} query=${a} onSort=${j}
          selected=${i} onToggleSelect=${me} />`}

    ${w&&o`<nav class="pager" aria-label="Library pages">
      <button type="button" class="btn" disabled=${fe<=1}
        onClick=${()=>_e(fe-1)}>Previous</button>
      <span>Page ${fe}</span>
      <button type="button" class="btn" disabled=${!y?.has_more}
        onClick=${()=>_e(fe+1)}>Next</button>
    </nav>`}

    <${ja} count=${i.size} busy=${m}
      onPublic=${()=>te("public")}
      onPrivate=${()=>te("private")}
      onCopyLinks=${ce}
      onDelete=${()=>b(!0)}
      onClear=${()=>c(new Set)} />

    <${le} open=${d}
      title=${`Delete ${i.size} clip${i.size===1?"":"s"}?`}
      body="Public links stop working immediately."
      confirmLabel="Delete" danger
      onConfirm=${ue}
      onCancel=${()=>b(!1)} />
  </main>`}function ct(e,[t,a]){let n=e.sort===t?"ascending":e.sort===a?"descending":"none",r=e.sort===a?t:a;return{ariaSort:n,next:r}}function xr({clips:e,query:t,onSort:a,selected:n,onToggleSelect:r}){let s=ct(t,it.title),i=ct(t,it.size),c=ct(t,it.duration),m=ct(t,it.uploaded);return o`<table class="lib-table">
    <thead>
      <tr>
        <th class="row-select-cell"></th>
        <th></th>
        <th aria-sort=${s.ariaSort}><button type="button" class="sort-btn" onClick=${()=>a(s.next)}>Title</button></th>
        <th>Game</th>
        <th>Visibility</th>
        <th aria-sort=${i.ariaSort}><button type="button" class="sort-btn" onClick=${()=>a(i.next)}>Size</button></th>
        <th aria-sort=${c.ariaSort}><button type="button" class="sort-btn" onClick=${()=>a(c.next)}>Duration</button></th>
        <th aria-sort=${m.ariaSort}><button type="button" class="sort-btn" onClick=${()=>a(m.next)}>Uploaded</button></th>
      </tr>
    </thead>
    <tbody>
      ${e.map(l=>o`<tr key=${l.id} class=${n?.has(l.id)?"is-selected":""}>
        <td class="row-select-cell">
          <input class="row-select" type="checkbox" checked=${n?.has(l.id)}
            aria-label=${`Select ${l.title}`} onChange=${()=>r?.(l.id)} />
        </td>
        <td><img class="row-thumb" src=${It(l)} alt="" width="64" height="36" loading="lazy" /></td>
        <td><a href=${`/clip/${encodeURIComponent(l.id)}`}>${l.title}</a></td>
        <td>${l.game_display_name||l.game_name||"\u2014"}</td>
        <td><span class=${`badge badge-${l.visibility}`}>${l.visibility}</span></td>
        <td>${O(l.file_size_bytes)}</td>
        <td>${ye(l.duration_ms)}</td>
        <td>${J(l.uploaded_at)}</td>
      </tr>`)}
    </tbody>
  </table>`}function Tr({count:e=8}){return o`<div class="card-grid">
    ${Array.from({length:e},(t,a)=>o`<div class="clip-card" key=${a}>
      <div class="skeleton-thumb"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line is-short"></div>
    </div>`)}
  </div>`}oe();function Xa(e){let t=Number(e);return Number.isFinite(t)&&t>0?t/1e3:0}function en(e,t){let a=Number.isFinite(e)?e:0,n=t>0?t:Number.MAX_SAFE_INTEGER;return Math.max(0,Math.min(n,a))}function dt(e,t){return t>0?Math.max(0,Math.min(100,e/t*100)):0}function Bt(e){if(!Number.isFinite(e))return"0:00";let t=Math.max(0,Math.round(e)),a=Math.floor(t/60),n=t-a*60;return`${a}:${String(n).padStart(2,"0")}`}function Ya(e){if(!Number.isFinite(e))return"0:00.0";let t=Math.max(0,Math.round(e*10)),a=Math.floor(t/600),n=t-a*600,r=Math.floor(n/10);return`${a}:${String(r).padStart(2,"0")}.${n%10}`}function tn(e,t){return`${Ya(e)} / ${t>0?Ya(t):"0:00.0"}`}function an(e,t){return(e||[]).map((a,n)=>{let r=Number(a.timestamp_ms);if(!Number.isFinite(r))return null;let s=r/1e3;return s<0||t>0&&s>t?null:{index:n,time:s,label:String(a.label||a.kind||"Marker")}}).filter(Boolean).sort((a,n)=>a.time-n.time)}function nn(e,t){if(!e.length)return null;for(let a of e)if(a.time>t+.05)return a;return e[0]}function rn(e,t){if(!e.length)return null;for(let a=e.length-1;a>=0;a-=1)if(e[a].time<t-.05)return e[a];return e[e.length-1]}var on="clipline.playerVolume",ln="clipline.clipTheaterMode",Pr=2e3,Mr=[.25,.5,.75,1,1.25,1.5,2];function Rr(e,t){switch(e){case"Space":case"KeyK":return{kind:"toggle-play"};case"ArrowLeft":return{kind:"seek-by",seconds:t?-1:-5};case"ArrowRight":return{kind:"seek-by",seconds:t?1:5};case"KeyJ":return{kind:"seek-by",seconds:-10};case"KeyL":return{kind:"seek-by",seconds:10};case"Comma":return{kind:"seek-by",seconds:-.1};case"Period":return{kind:"seek-by",seconds:.1};case"KeyM":return{kind:"toggle-mute"};case"Home":return{kind:"seek-to",seconds:0};case"End":return{kind:"seek-to-end"};case"KeyF":case"KeyT":return{kind:"theater"};case"Escape":return{kind:"exit-theater"};default:return null}}function Er(e){return e instanceof Element?!!e.closest("input, textarea, select, button, a, [contenteditable='true'], [contenteditable='']"):!1}function Dr(){try{let e=window.localStorage.getItem(on);if(e==null)return 1;let t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):1}catch{return 1}}async function Ur(e,{isCancelled:t,onMuted:a,onError:n}={}){let r=t||(()=>!1);if(!r()){try{await e.play();return}catch{if(r()||!e.paused)return}e.muted=!0,a?.();try{await e.play()}catch(s){r()||n?.(s)}}}function sn(e){try{window.localStorage.setItem(on,String(Math.max(0,Math.min(1,e))))}catch{}}function Ir(){try{return window.localStorage.getItem(ln)==="true"}catch{return!1}}function Ar(e){try{window.localStorage.setItem(ln,String(e))}catch{}}function cn({src:e,poster:t,durationMs:a,markers:n}){let r=z(null),s=z(null),i=z(null),c=z(!1),m=z(!1),l=Xa(a),[d,b]=g(!1),[u,p]=g(0),[h,y]=g(l),[T,R]=g(0),[x,U]=g(Dr),[q,A]=g(!1),[D,K]=g(1),[V,Y]=g(!1),[L,j]=g(Ir),[_e,me]=g(!0),[re,ke]=g(null),[te,X]=g(""),ce=an(n,h);function ue(){me(!0),window.clearTimeout(i.current),i.current=window.setTimeout(()=>{let _=r.current;_&&!_.paused&&!_.ended&&me(!1)},Pr)}M(()=>{d||(window.clearTimeout(i.current),me(!0))},[d]),M(()=>{let _=r.current;if(!_)return;let S=()=>Number.isFinite(_.duration)&&_.duration>0?_.duration:l,P=()=>y(S()),de=()=>y(S()),he=()=>{c.current||p(_.currentTime||0)},pe=()=>{let Wt=S();if(!(Wt>0)||!_.buffered?.length){R(0);return}let Zt=_.currentTime||0,Oe=0;for(let qe=0;qe<_.buffered.length;qe+=1){let An=_.buffered.start(qe),ht=_.buffered.end(qe);if(Zt>=An&&Zt<=ht){Oe=ht;break}Oe=Math.max(Oe,ht)}R(dt(Oe,Wt))},De=()=>{b(!0),X(""),ue()},Ht=()=>b(!1),Gt=()=>b(!1),Kt=()=>{U(_.volume),A(_.muted||_.volume===0)},jt=()=>X("Playback unavailable");return _.addEventListener("loadedmetadata",P),_.addEventListener("durationchange",de),_.addEventListener("timeupdate",he),_.addEventListener("progress",pe),_.addEventListener("play",De),_.addEventListener("pause",Ht),_.addEventListener("ended",Gt),_.addEventListener("volumechange",Kt),_.addEventListener("error",jt),()=>{_.removeEventListener("loadedmetadata",P),_.removeEventListener("durationchange",de),_.removeEventListener("timeupdate",he),_.removeEventListener("progress",pe),_.removeEventListener("play",De),_.removeEventListener("pause",Ht),_.removeEventListener("ended",Gt),_.removeEventListener("volumechange",Kt),_.removeEventListener("error",jt)}},[e,l]),M(()=>{r.current&&(r.current.volume=x)},[x]),M(()=>{r.current&&(r.current.muted=q)},[q]),M(()=>{r.current&&(r.current.playbackRate=D)},[D]),M(()=>{let _=r.current;if(!_)return;let S=!1;return Ur(_,{isCancelled:()=>S,onMuted:()=>A(!0),onError:P=>X(P?.message||"Playback unavailable")}),()=>{S=!0}},[e]),M(()=>{let _=document.documentElement;return _.classList.toggle("clipline-theater",L),()=>_.classList.remove("clipline-theater")},[L]);function ae(_){j(_),Ar(_)}function ne(_){let S=r.current;if(!S)return;let P=h>0?en(_,h):Math.max(0,_);S.currentTime=P,p(P)}function Ce(_){ne((r.current?.currentTime||0)+_)}async function se(){let _=r.current;if(_)if(_.paused||_.ended)try{await _.play()}catch(S){X(S?.message||"Playback failed")}else _.pause()}function ge(){let _=r.current;_&&(_.muted||_.volume===0?(_.muted=!1,_.volume===0&&(_.volume=1,U(1),sn(1)),A(!1)):(_.muted=!0,A(!0)))}function Te(_){let S=Number(_.target.value);U(S),A(S===0),sn(S);let P=r.current;P&&(P.volume=S,P.muted=S===0)}async function fe(){try{document.fullscreenElement?await document.exitFullscreen():await s.current?.requestFullscreen?.()}catch(_){X(_?.message||"Fullscreen unavailable")}}function w(_){let S=r.current?.currentTime||0,P=_>0?nn(ce,S):rn(ce,S);P&&ne(P.time)}function H(){c.current=!0,m.current=d,d&&r.current?.pause()}function f(_){let S=Number(_.target.value);p(S),ne(S)}function $(){c.current&&(c.current=!1,m.current&&(m.current=!1,r.current?.play().catch(()=>{})))}function E(_){let S=_.currentTarget.getBoundingClientRect();if(!(S.width>0))return;let P=Math.max(0,Math.min(1,(_.clientX-S.left)/S.width));ke({pct:P*100,time:P*(h||0)})}function I(){ke(null)}return M(()=>{function _(S){if(S.defaultPrevented||S.ctrlKey||S.metaKey||S.altKey||Er(S.target))return;let P=Rr(S.code,S.shiftKey);if(P&&!(P.kind==="exit-theater"&&!L))switch(S.preventDefault(),ue(),P.kind){case"toggle-play":se();break;case"seek-by":Ce(P.seconds);break;case"seek-to":ne(P.seconds);break;case"seek-to-end":ne(h);break;case"toggle-mute":ge();break;case"theater":ae(!L);break;case"exit-theater":ae(!1);break}}return document.addEventListener("keydown",_),()=>document.removeEventListener("keydown",_)},[h,L,d]),o`<div class=${`player ${_e?"":"chrome-hidden"}`} ref=${s}
      onPointerMove=${ue} onPointerEnter=${ue}
      onPointerLeave=${()=>{let _=r.current;_&&!_.paused&&me(!1)}}
      onFocusIn=${()=>me(!0)}>
    <video ref=${r} class="player-video" src=${e} poster=${t||void 0}
      preload="metadata" playsinline onClick=${se}></video>
    ${te&&o`<div class="player-note">${te}</div>`}
    <div class="player-overlay">
      <div class="player-timeline" onPointerMove=${E} onPointerLeave=${I}>
        <div class="player-buffered" style=${`width:${T}%`}></div>
        <div class="player-progress" style=${`width:${dt(u,h)}%`}></div>
        ${ce.map(_=>o`<span class="player-marker-tick" key=${_.index}
            style=${`left:${dt(_.time,h)}%`} title=${`${_.label} @ ${Bt(_.time)}`}></span>`)}
        <input class="player-scrubber" type="range" min="0" max=${h>0?h:0} step="0.01"
          value=${u} disabled=${!(h>0)} aria-label="Seek"
          onPointerDown=${H} onInput=${f} onChange=${$}
          onPointerUp=${$} onPointerCancel=${$} onLostPointerCapture=${$} />
        ${re&&o`<div class="player-hover-time" style=${`left:${re.pct}%`}>${Bt(re.time)}</div>`}
      </div>
      <div class="player-controls">
        ${ce.length>0&&o`<div class="player-cluster">
          <button type="button" class="player-btn" title="Previous marker" aria-label="Previous marker"
            onClick=${()=>w(-1)}>${C("skipBack",{size:14})}</button>
          <button type="button" class="player-btn" title="Next marker" aria-label="Next marker"
            onClick=${()=>w(1)}>${C("skipForward",{size:14})}</button>
        </div>`}
        <button type="button" class="player-btn player-play" aria-label=${d?"Pause":"Play"} onClick=${se}>
          ${C(d?"pause":"play",{size:16})}
        </button>
        <span class="player-time">${tn(u,h)}</span>
        <div class="player-spacer"></div>
        <div class="player-speed-wrap">
          <button type="button" class="player-btn player-speed" aria-haspopup="menu" aria-expanded=${V}
            onClick=${()=>Y(_=>!_)}>${D}×</button>
          ${V&&o`<div class="player-speed-menu" role="menu">
            ${Mr.map(_=>o`<button type="button" role="menuitem" key=${_}
                class=${`player-speed-item ${_===D?"is-active":""}`}
                onClick=${()=>{K(_),Y(!1)}}>${_}×</button>`)}
          </div>`}
        </div>
        <button type="button" class="player-btn" aria-label=${q?"Unmute":"Mute"} onClick=${ge}>
          ${C(q?"volumeX":"volume2",{size:14})}
        </button>
        <input class="player-volume" type="range" min="0" max="1" step="0.01" value=${q?0:x}
          aria-label="Volume" onInput=${Te} />
        <button type="button" class="player-btn" aria-label=${L?"Exit theater mode":"Theater mode"}
          aria-pressed=${L} onClick=${()=>ae(!L)}>${C("theater",{size:14})}</button>
        <button type="button" class="player-btn" aria-label="Fullscreen" onClick=${fe}>
          ${C("fullscreen",{size:14})}
        </button>
      </div>
    </div>
  </div>`}oe();function Lr(e){let t=new Map(e.map(s=>[s.id,s])),a=new Map,n=[],r=0;return e.forEach(s=>{let i=s.parent_comment_id||"";i&&t.has(i)?(a.has(i)||a.set(i,[]),a.get(i).push(s),r+=1):i||(n.push(s),r+=1)}),{roots:n,repliesByParent:a,count:r}}async function Nr({apiClient:e=k,shareId:t,body:a,parentCommentId:n,onReload:r=()=>{},onError:s=v}){let i=a.trim();if(!i)return!1;try{return await e(`/api/v1/public/clips/${encodeURIComponent(t)}/comments`,{method:"POST",body:n?{body:i,parent_comment_id:n}:{body:i}}),r(),!0}catch(c){return s(c.message),!1}}function Br(e){return(e||"?").trim().slice(0,1).toUpperCase()||"?"}function zr(e){let t=Ut(e.author_avatar_url);return t?o`<img class="comment-avatar" src=${t} alt="" />`:o`<div class="comment-avatar">${Br(e.author_name)}</div>`}function un({shareId:e}){let{user:t}=G(N),[a,n]=g(0),[r,s]=g(""),[i,c]=g(null),[m,l]=g(""),[d,b]=g(null),u=`/api/v1/public/clips/${encodeURIComponent(e)}/comments`,{data:p,error:h}=ie(u,a),y=h?[]:p?.comments??null;function T(){n(D=>D+1)}async function R(D,K){return Nr({shareId:e,body:D,parentCommentId:K,onReload:T,onError:v})}async function x(D){D.preventDefault(),await R(r)&&s("")}async function U(D,K){D.preventDefault(),await R(m,K)&&(l(""),c(null))}async function q(){let D=d;b(null);try{await k(`/api/v1/public/clips/${encodeURIComponent(e)}/comments/${encodeURIComponent(D)}`,{method:"DELETE"}),T()}catch(K){v(K.message)}}let A=Lr(y||[]);return o`<section class="comments">
    <div class="comments-header"><h2>Comments</h2><span class="muted">${A.count}</span></div>
    ${t?o`<form class="comment-form" onSubmit=${x}>
          <textarea rows="3" maxlength="2000" placeholder="Add a comment" value=${r}
            onInput=${D=>s(D.target.value)}></textarea>
          <div class="comment-form-actions">
            <button type="submit" class="btn btn-primary">${C("message",{size:14})} Post comment</button>
          </div>
        </form>`:o`<p class="comment-signin"><a href="/login">Sign in</a> to comment.</p>`}
    ${y==null?"":A.count===0?o`<p class="comment-signin">No comments yet.</p>`:o`<div class="comment-list">
          ${A.roots.map(D=>dn(D,{depth:0,repliesByParent:A.repliesByParent,user:t,replyOpenId:i,setReplyOpenId:c,replyDraft:m,setReplyDraft:l,submitReply:U,onDelete:b}))}
        </div>`}
    <${le} open=${d!=null} title="Delete this comment?"
      body="This removes the comment from the public clip page." confirmLabel="Delete" danger
      onConfirm=${q} onCancel=${()=>b(null)} />
  </section>`}function dn(e,t){let{depth:a,repliesByParent:n,user:r,replyOpenId:s,setReplyOpenId:i,replyDraft:c,setReplyDraft:m,submitReply:l,onDelete:d}=t,b=n.get(e.id)||[];return o`<article class="comment" key=${e.id}>
    ${zr(e)}
    <div class="comment-body">
      <div class="comment-head">
        ${e.author_username?o`<a href=${`/u/${encodeURIComponent(e.author_username)}`}>${e.author_name}</a>`:o`<strong>${e.author_name}</strong>`}
        ${e.is_uploader&&o`<span class="comment-badge">Uploader</span>`}
        <span>${nt(e.created_at)}</span>
        <div class="comment-actions">
          ${r&&a===0&&o`<button type="button" class="comment-action"
            onClick=${()=>i(s===e.id?null:e.id)}>
            ${C("message",{size:12})} Reply</button>`}
          ${e.viewer_can_delete&&o`<button type="button" class="comment-delete" aria-label="Delete comment"
            title="Delete comment" onClick=${()=>d(e.id)}>${C("trash",{size:12})}</button>`}
        </div>
      </div>
      <p class="comment-text">${e.body}</p>
      ${r&&a===0&&s===e.id&&o`<form class="comment-reply-form"
        onSubmit=${u=>l(u,e.id)}>
        <textarea rows="2" maxlength="2000" placeholder="Write a reply" value=${c}
          onInput=${u=>m(u.target.value)}></textarea>
        <div class="comment-form-actions">
          <button type="submit" class="btn btn-primary">${C("message",{size:14})} Post reply</button>
        </div>
      </form>`}
      ${b.length>0&&o`<div class="comment-replies">
        ${b.map(u=>dn(u,{...t,depth:a+1}))}
      </div>`}
    </div>
  </article>`}var Fr=["private","public","unlisted"];function Or(e,t){return e==="clip"?!0:!!t?.viewer_can_edit}function qr(e,t,a){return e==="public"?t.shareId:a?.public_share_id||null}function Vr(e,t,a){return e==="clip"?t.clipId:a?.viewer_clip_id||null}function Hr(e){let t=e?.height!=null?e.height:"",a=Math.round(e?.fps||0)||"";return`${t}p${a}`}function Gr(e,t=8){let a=new URLSearchParams;return e&&a.set("share_id",e),a.set("limit",String(t)),`/api/v1/public/recommendations?${a}`}function Kr(e,t,a=8){return(e||[]).filter(n=>n.share_id!==t).slice(0,a)}function jr(e,t,a){let n=e==="clip"?a||{}:{display_name:t?.author_name||null,username:t?.author_username||null,avatar_url:t?.author_avatar_url||null},r=n.username||null;return{label:n.display_name||r||"Unknown creator",username:r,href:r?`/u/${encodeURIComponent(r)}`:null,avatarUser:n}}function Wr({author:e}){let t=o`
    <${xe} user=${e.avatarUser} size=${36} />
    <span class="watch-author-name">${e.label}</span>
  `,a=e.href?o`<a class="watch-author-link" href=${e.href}>${t}</a>`:o`<span class="watch-author-link watch-author-static">${t}</span>`;return o`<div class="watch-author-row">${a}</div>`}function zt({route:e}){let{user:t}=G(N),[a,n]=g(null),[r,s]=g(null),[i,c]=g([]),[m,l]=g(!1),[d,b]=g(""),[u,p]=g(!1),[h,y]=g(""),[T,R]=g(!1),[x,U]=g(!1),[q,A]=g(!1),D=e.name==="clip"?`clip:${e.clipId}`:`public:${e.shareId}`,K=qr(e.name,e,a),V=e.name==="public"||!!a;if(M(()=>{let w=new AbortController;n(null),s(null),l(!1),p(!1),A(!1),R(!1);let H=e.name==="clip"?`/api/v1/clips/${encodeURIComponent(e.clipId)}`:`/api/v1/public/clips/${encodeURIComponent(e.shareId)}`;return k(H,{signal:w.signal}).then(f=>{n(f),e.name==="public"&&k(`/api/v1/public/clips/${encodeURIComponent(e.shareId)}/view`,{method:"POST",body:{},signal:w.signal}).then($=>n(E=>E&&{...E,view_count:$.view_count})).catch(()=>{})}).catch(f=>{f?.name!=="AbortError"&&s(f)}),()=>w.abort()},[D]),M(()=>{if(!V){c([]);return}let w=new AbortController;return c([]),k(Gr(K,8),{signal:w.signal}).then(H=>c(H.clips||[])).catch(()=>{}),()=>w.abort()},[D,K,V]),r)return o`<main class="page"><${Q} name="alert" title="Couldn't load this clip" body=${r.message} /></main>`;if(!a)return o`<main class="page watch"><div><div class="skeleton-thumb"></div></div><aside class="upnext"></aside></main>`;let Y=Or(e.name,a),L=K,j=Vr(e.name,e,a),_e=e.name==="clip"?rt({id:a.id}):Re({share_id:e.shareId}),me=e.name==="clip"?Fa({id:a.id}):st({share_id:e.shareId}),re=jr(e.name,a,t),ke=a.public_url??a.share_url??null,te=ze(ke,window.location.origin,L),X=e.name==="clip";function ce(){b(a.title),l(!0)}async function ue(w){w?.preventDefault?.();let H=d.trim();if(!H||H===a.title){l(!1);return}try{await k(`/api/v1/clips/${encodeURIComponent(j)}`,{method:"PATCH",body:{title:H}}),n(f=>({...f,title:H})),l(!1),v("Title saved.")}catch(f){v(f.message)}}function ae(){y(a.description||""),p(!0)}async function ne(){let w=h.trim();try{await k(`/api/v1/clips/${encodeURIComponent(j)}`,{method:"PATCH",body:{description:w||null}}),n(H=>({...H,description:w||null})),p(!1),v("Description saved.")}catch(H){v(H.message)}}async function Ce(w,{force:H=!1}={}){let f=a.visibility;if(!(f===w&&!H)){n($=>({...$,visibility:w}));try{let $=await k(`/api/v1/clips/${encodeURIComponent(j)}/visibility`,{method:"POST",body:{visibility:w}});n(E=>({...E,visibility:$.visibility,public_url:$.public_url,public_share_id:$.public_share_id})),v(`Visibility set to ${w}.`,{actionLabel:"Undo",onAction:()=>Ce(f,{force:!0})})}catch($){n(E=>({...E,visibility:f})),v($.message)}}}async function se(){if(te)try{await navigator.clipboard.writeText(te),v("Link copied.")}catch{v("Couldn't copy the link.")}}async function ge(){U(!1);try{await k(`/api/v1/clips/${encodeURIComponent(j)}`,{method:"DELETE"}),v("Clip deleted."),F("/library")}catch(w){v(w.message)}}let Te=[a.game_name&&o`<a class="chip chip-on" href=${`/game/${encodeURIComponent(a.game_category_id||a.game_name)}`}>${a.game_display_name||a.game_name}</a>`,Pe(a.view_count),`Recorded ${J(a.recorded_at)}`].filter(Boolean),fe=Kr(i,L,8);return o`<main class="page watch">
    <div>
      <${cn} src=${_e} poster=${me} durationMs=${a.duration_ms} markers=${a.markers} />
      <div class=${`watch-heading ${a.game_video_art_url?"has-game-art":""}`}>
        ${a.game_video_art_url&&o`<img class="watch-game-art" src=${a.game_video_art_url} alt="" />`}
        <div class="watch-heading-content">
        <div class="watch-titlerow">
          ${m?o`<input class="input watch-title-input" value=${d} autofocus
                onInput=${w=>b(w.target.value)} onBlur=${ue}
                onKeyDown=${w=>{w.key==="Enter"&&ue(w),w.key==="Escape"&&l(!1)}} />`:o`<h1>${a.title}
                ${Y&&o`<button type="button" class="edit-pencil" aria-label="Edit title" onClick=${ce}
                  >${C("edit",{size:14})}</button>`}</h1>`}
        </div>
        <${Wr} author=${re} />
        <p class="watch-meta">${Te.map((w,H)=>o`${H>0?" \xB7 ":""}${w}`)}</p>
        </div>
      </div>

      ${Y&&o`<div class="watch-actions">
        <div class="seg" role="radiogroup" aria-label="Visibility">
          ${Fr.map(w=>o`<button type="button" role="radio" key=${w} aria-checked=${a.visibility===w}
              class=${`seg-item ${a.visibility===w?"seg-on":""}`} onClick=${()=>Ce(w)}
              >${w[0].toUpperCase()+w.slice(1)}</button>`)}
        </div>
        <button type="button" class="btn btn-primary" disabled=${!te} onClick=${se}>
          ${C("copy",{size:14})} Copy share link</button>
        <div class="watch-more">
          <button type="button" class="btn" aria-haspopup="menu" aria-expanded=${T}
            onClick=${()=>R(w=>!w)}>⋯</button>
          ${T&&o`<div class="menu" role="menu">
            <button type="button" class="menu-danger" role="menuitem"
              onClick=${()=>{R(!1),U(!0)}}>${C("trash",{size:14})} Delete clip</button>
          </div>`}
        </div>
      </div>`}

      <div class="watch-desc">
        ${u?o`<textarea class="input" rows="5" value=${h} autofocus
              onInput=${w=>y(w.target.value)} onBlur=${ne}
              onKeyDown=${w=>{w.key==="Enter"&&(w.ctrlKey||w.metaKey)&&ne(),w.key==="Escape"&&p(!1)}}></textarea>`:a.description?o`<p>${a.description}
              ${Y&&o`<button type="button" class="edit-pencil" aria-label="Edit description" onClick=${ae}
                >${C("edit",{size:12})}</button>`}</p>`:Y?o`<button type="button" class="watch-desc-add" onClick=${ae}>+ Add a description</button>`:""}
      </div>

      ${X&&o`<button type="button" class="details-strip" aria-expanded=${q}
        onClick=${()=>A(w=>!w)}>
        <span><b>${ye(a.duration_ms)}</b> length</span>
        <span><b>${O(a.file_size_bytes)}</b></span>
        <span><b>${Hr(a)}</b></span>
        <span><b>${a.video_codec}/${a.audio_codec}</b> ${a.container}</span>
        <span class="details-chev">${q?"\u25B4 less":"\u25BE more"}</span>
      </button>`}
      ${X&&q&&o`<dl class="details-full">
        <div><dt>Recorded</dt><dd>${J(a.recorded_at)}</dd></div>
        <div><dt>Uploaded</dt><dd>${J(a.uploaded_at)}</dd></div>
        <div><dt>Dimensions</dt><dd>${a.width&&a.height?`${a.width} x ${a.height}`:"Unknown"}</dd></div>
        <div><dt>FPS</dt><dd>${a.fps??"Unknown"}</dd></div>
        <div><dt>Container</dt><dd>${a.container||"Unknown"}</dd></div>
        <div><dt>Video codec</dt><dd>${a.video_codec||"Unknown"}</dd></div>
        <div><dt>Audio codec</dt><dd>${a.audio_codec||"Unknown"}</dd></div>
        <div><dt>Source</dt><dd>${a.source_type||"Unknown"}</dd></div>
        <div><dt>Checksum</dt><dd>${a.checksum_sha256||"Unknown"}</dd></div>
      </dl>`}

      ${L&&o`<${un} shareId=${L} />`}
    </div>
    <aside class="upnext">
      <h4 class="kicker">Up next</h4>
      ${fe.map(w=>o`<a class="upnext-row" key=${w.share_id} href=${`/c/${encodeURIComponent(w.share_id)}`}>
          <img src=${we(w)} alt="" loading="lazy" />
          <span><b>${w.title}</b><small>${w.author_name} · ${w.game_display_name||w.game_name||"No game"} · ${Pe(w.view_count)}</small></span>
        </a>`)}
    </aside>

    <${le} open=${x} title="Delete this clip?" body="Public links stop working immediately."
      confirmLabel="Delete" danger onConfirm=${ge} onCancel=${()=>U(!1)} />
  </main>`}oe();var Ft=[{top:"4%",left:"4%",width:"34%",rotate:-7},{top:"0%",left:"44%",width:"30%",rotate:5},{top:"34%",left:"68%",width:"28%",rotate:-4},{top:"50%",left:"8%",width:"30%",rotate:6},{top:"62%",left:"42%",width:"26%",rotate:-5},{top:"26%",left:"-4%",width:"22%",rotate:9}];function Zr(e){return Array.isArray(e)?e.slice(0,Ft.length).map((t,a)=>({clip:t,...Ft[a]})):[]}function Jr(e){let t=e?.clips;if(!Array.isArray(t)||t.length===0)return null;let a=t.length,n=e.has_more?"+":"";return`${a}${n} clip${a===1?"":"s"} on this instance`}function Qr({top:e,left:t,width:a,rotate:n}){return`top:${e};left:${t};width:${a};transform:rotate(${n}deg);`}function pn(e){let t=String(e||"").trim();return t||null}function Yr(){let{data:e}=ie(`/api/v1/public/clips?page_size=${Ft.length}`),t=Zr(e?.clips),a=Jr(e);return o`<aside class="login-montage" aria-hidden="true">
    ${t.length>0&&o`<div class="login-montage-tiles">
      ${t.map((n,r)=>o`<img key=${r} class="login-montage-tile" style=${Qr(n)}
        src=${we(n.clip)} alt="" loading="lazy" />`)}
    </div>`}
    <div class="login-montage-copy">
      <h2>Your clips. Your server.</h2>
      ${a&&o`<p>${a}</p>`}
    </div>
  </aside>`}function pt({titleId:e,children:t}){return o`<div class="login-page">
    <${Yr} />
    <section class="login-panel" aria-labelledby=${e}>
      <div class="login-brand" aria-hidden="true">
        <img src="/clipline-icon.svg" alt="" width="32" height="32" />
        <span class="login-brand-word">CLIP<span class="wordmark-accent">LINE</span></span>
        <span class="login-brand-descriptor">CLOUD</span>
      </div>
      ${t}
    </section>
  </div>`}function Xr(e){if(typeof e!="string"||!e.startsWith("/")||e.startsWith("//")||e.includes("\\"))return"/library";let t=new URL(e,"https://clipline.invalid");return t.origin!=="https://clipline.invalid"||t.pathname==="/login"?"/library":t.pathname+t.search+t.hash}function mn({route:e={}}){let t=Xr(e.returnTo),{user:a}=G(N),[n,r]=g(""),[s,i]=g(""),[c,m]=g(""),[l,d]=g(!1);if(M(()=>{a&&F(a.password_change_required?"/account":t)},[a]),a)return null;async function b(u){if(u.preventDefault(),!l){d(!0),m("");try{let p=await k("/api/v1/auth/login",{method:"POST",body:{username:n,password:s}});be(p.csrf_token),N.set({user:p.user,csrfToken:p.csrf_token,ready:!0}),F(p.user.password_change_required?"/account":t)}catch(p){m(p instanceof ve?p.message:"Sign in failed"),d(!1)}}}return o`<${pt} titleId="login-title">
    <h1 id="login-title">Sign in</h1>
    ${c&&o`<p class="form-error" role="alert">${c}</p>`}
    <form class="login-form" onSubmit=${b}>
      <label class="login-field">
        <span>Username</span>
        <input class="input" name="username" autocomplete="username" required
          value=${n} onInput=${u=>r(u.target.value)} />
      </label>
      <label class="login-field">
        <span>Password</span>
        <input class="input" name="password" type="password" autocomplete="current-password" required
          value=${s} onInput=${u=>i(u.target.value)} />
      </label>
      <button class="btn btn-primary" type="submit" disabled=${l}>${l?"Signing in\u2026":"Sign in"}</button>
    </form>
    <p class="login-hint">Accounts are created by this server's admin.</p>
  </${pt}>`}function fn({route:e}){let t=!!e.invite,a=e.token?"form":"missing-token",[n,r]=g(""),[s,i]=g(!1),c=t;async function m(b){if(b.preventDefault(),s)return;i(!0),r("");let u=new FormData(b.currentTarget),p={reset_token:e.token,new_password:String(u.get("new_password")||"")};c&&(p.username=String(u.get("username")||""),p.display_name=pn(u.get("display_name")),p.email=pn(u.get("email")));try{await k("/api/v1/auth/reset-password",{method:"POST",body:p}),v(c?"Account created. Sign in with your new password.":"Password set. Sign in with your new password."),F("/login")}catch(h){r(h instanceof ve?h.message:"Request failed"),i(!1)}}return o`<${pt} titleId="reset-title">
    <h1 id="reset-title">${c?"Create account":"Set password"}</h1>
    <p class="login-copy">${c?"Choose your Clipline Cloud account details.":"Choose a new password for your Clipline Cloud account."}</p>
    ${a==="missing-token"?o`<p class="form-error" role="alert">This reset link is missing a token.</p>`:o`
        ${n&&o`<p class="form-error" role="alert">${n}</p>`}
        <form class="login-form" onSubmit=${m}>
          ${c&&o`
            <label class="login-field">
              <span>Username</span>
              <input class="input" name="username" autocomplete="username" required />
            </label>
            <label class="login-field">
              <span>Display name</span>
              <input class="input" name="display_name" autocomplete="name" />
            </label>
            <label class="login-field">
              <span>Email</span>
              <input class="input" name="email" type="email" autocomplete="email" />
            </label>
          `}
          <label class="login-field">
            <span>New password</span>
            <input class="input" name="new_password" type="password" autocomplete="new-password" minlength="8" required />
          </label>
          <button class="btn btn-primary" type="submit" disabled=${s}>
            ${s?c?"Creating account\u2026":"Setting password\u2026":c?"Create account":"Set password"}
          </button>
        </form>
      `}
    ${!c&&o`<a class="btn" href="/login">Sign in</a>`}
  </${pt}>`}oe();function Fe({label:e,value:t,sub:a,meter:n,tone:r}){let s=r?` stat-${r}`:"";return o`<div class="stat-card">
    <p class="stat-label">${e}</p>
    <p class=${`stat-value${s}`}>${t}</p>
    ${a!=null&&o`<p class="stat-sub">${a}</p>`}
    ${n!=null&&o`<div class="stat-meter${s}">
      <span style=${`width:${Math.max(0,Math.min(1,n))*100}%`}></span>
    </div>`}
  </div>`}function es(e){let t=Number(e?.global_storage_warning_threshold_bytes||0);if(!t)return null;let a=Number(e?.total_storage_bytes||0);return Math.max(0,Math.min(1,a/t))}function ts(e){if(!e?.global_storage_warning_threshold_bytes)return"Disabled";let t=O(e.global_storage_warning_threshold_bytes);return e.global_storage_warning?`At or above ${t}`:`Below ${t}`}function as({deadJobs:e=[],failedUploads:t=[]}={}){let a=e.length+t.length;return{failedCount:a,healthy:a===0}}function ee(e,t){return o`<div><dt>${e}</dt><dd>${t??"Unknown"}</dd></div>`}function _n({overview:e,deadJobs:t,failedUploads:a}){let n=es(e),{failedCount:r,healthy:s}=as({deadJobs:t,failedUploads:a}),i=e.global_storage_warning_threshold_bytes;return o`<div>
    <div class="stat-grid">
      <${Fe} label="Clips" value=${String(e.total_clips)} />
      <${Fe} label="Storage" value=${O(e.total_storage_bytes)}
        sub=${i?`${O(i)} warning threshold`:null}
        meter=${n} tone=${e.global_storage_warning?"danger":void 0} />
      <${Fe} label="Users" value=${String(e.total_users)} />
      <${Fe} label="Jobs" value=${s?"All healthy":String(r)}
        tone=${s?"success":"danger"} />
    </div>
    <div class="panel">
      <h2>Server summary</h2>
      <dl class="ad-kv">
        ${ee("Server version",e.server_version)}
        ${ee("API version",e.api_version)}
        ${ee("Public URL",e.public_url)}
        ${e.additional_public_urls?.length?ee("Additional public URLs",e.additional_public_urls.join(", ")):null}
        ${ee("Database",e.database_backend)}
        ${ee("Storage",`${e.storage_backend} \u2014 ${e.storage_summary}`)}
        ${ee("Stored clips",`${e.total_clips} clips \u2014 ${O(e.total_storage_bytes)}`)}
        ${ee("Users",`${e.total_users} total`)}
        ${ee("Max upload",O(e.max_upload_size_bytes))}
        ${ee("Part size",O(e.upload_part_size_bytes))}
        ${ee("Single PUT max",O(e.single_put_max_bytes))}
        ${ee("Active uploads/user",e.max_active_upload_sessions_per_user)}
        ${ee("User quota",e.user_storage_quota_bytes?O(e.user_storage_quota_bytes):"Disabled")}
        ${ee("Storage warning",ts(e))}
        ${ee("Upload TTL",`${e.upload_session_ttl_seconds}s`)}
        ${ee("Direct S3 uploads",e.direct_s3_uploads?"Enabled":"Disabled")}
        ${ee("Public media",`${e.public_media_mode}, ${e.public_read_url_ttl_seconds}s TTL`)}
      </dl>
    </div>
  </div>`}oe();function mt(e){let t=String(e||"").trim();return t||null}function ns(e,t){return!(e.is_disabled||t?.id===e.id||e.role==="owner"||e.role==="admin"&&t?.role!=="owner")}function rs(e,t){return!(!e.is_disabled||t?.id===e.id||e.role==="owner"||e.role==="admin"&&t?.role!=="owner")}function ss(e,t){return t?.role==="owner"&&e.role!=="owner"&&t?.id!==e.id}function os(e,t){return!(t?.id===e.id||e.role==="owner"||e.role==="admin"&&t?.role!=="owner")}function is(e,t){return t?.role==="owner"||!["admin","owner"].includes(e.role)}function Ot(e){return e?[["user","User"],["admin","Admin"]]:[["user","User"]]}function ls({isOwner:e,onCreated:t}){let[a,n]=g(!1);async function r(s){if(s.preventDefault(),a)return;n(!0);let i=s.currentTarget,c=new FormData(i);try{await k("/api/v1/users",{method:"POST",body:{username:String(c.get("username")||""),display_name:mt(c.get("display_name")),email:mt(c.get("email")),password:mt(c.get("password")),reauth_password:String(c.get("reauth_password")||""),role:String(c.get("role")||"user")}}),v("User created."),i.reset(),t()}catch(m){v(m.message)}finally{n(!1)}}return o`<form class="panel section" onSubmit=${r}>
    <h2>Create user</h2>
    <label class="field"><span>Username</span><input class="input" name="username" required /></label>
    <label class="field"><span>Display name</span><input class="input" name="display_name" placeholder="Optional" /></label>
    <label class="field"><span>Email</span><input class="input" name="email" type="email" placeholder="Optional" /></label>
    <label class="field"><span>Password</span><input class="input" name="password" type="password" required /></label>
    <label class="field"><span>Role</span>
      <select class="input" name="role">
        ${Ot(e).map(([s,i])=>o`<option value=${s}>${i}</option>`)}
      </select>
    </label>
    <label class="field"><span>Your password</span><input class="input" name="reauth_password" type="password" autocomplete="current-password" required /></label>
    <button class="btn btn-primary" type="submit" disabled=${a}>${C("plus",{size:14})} Create user</button>
  </form>`}function cs({isOwner:e,smtpEnabled:t,onCreated:a}){let[n,r]=g(!1);async function s(i){if(i.preventDefault(),n)return;r(!0);let c=new FormData(i.currentTarget),m=i.submitter?.value==="email"?"email":"link";try{let l=await k("/api/v1/invites",{method:"POST",body:{role:String(c.get("role")||"user"),email:mt(c.get("email")),send_email:m==="email",reauth_password:String(c.get("reauth_password")||"")}});v(m==="email"?"Invite sent.":"Invite link created."),a({...l,kind:"invite"})}catch(l){v(l.message)}finally{r(!1)}}return o`<form class="panel section" onSubmit=${s}>
    <h2>Invite link</h2>
    <label class="field"><span>Role</span>
      <select class="input" name="role">
        ${Ot(e).map(([i,c])=>o`<option value=${i}>${c}</option>`)}
      </select>
    </label>
    <label class="field"><span>Email</span>
      <input class="input" name="email" type="email" placeholder=${t?"Optional":"SMTP disabled"} disabled=${!t} />
    </label>
    <label class="field"><span>Your password</span><input class="input" name="reauth_password" type="password" autocomplete="current-password" required /></label>
    <div class="actions">
      <button class="btn" type="submit" name="intent" value="link" disabled=${n}>${C("copy",{size:14})} Generate link</button>
      ${t&&o`<button class="btn btn-primary" type="submit" name="intent" value="email" disabled=${n}>${C("message",{size:14})} Send email</button>`}
    </div>
  </form>`}function us({resetLink:e}){if(!e)return null;let t=e.kind==="invite"?"Invite":"Reset",a=e.username?` for ${e.username}`:"",n=async()=>{try{await navigator.clipboard.writeText(e.reset_url),v("Copied to clipboard.")}catch{v("Copy failed. Select and copy the URL manually.")}};return o`<div class="notice admin-reset-link">
    <div>
      <strong>${t} link created${a}</strong>
      <span>Expires ${J(e.expires_at)}</span>
      <code>${e.reset_url}</code>
    </div>
    <button class="btn" type="button" onClick=${n}>${C("copy",{size:14})} Copy</button>
  </div>`}function ds(e){return e.is_disabled?o`<span class="badge badge-warn">Disabled</span>`:o`<span class="badge badge-public">Active</span>`}function ps(e){return e?e.user_storage_quota_bytes!=null&&e.user_storage_quota_bytes>0?e.user_storage_quota_bytes:e.user_storage_quota_env_fallback_bytes??null:null}function ms(e,t){if(e.storage_quota_bytes!=null&&e.storage_quota_bytes>0)return O(e.storage_quota_bytes);let a=ps(t);return a!=null&&a>0?`Default (${O(a)})`:"No limit"}function fs({user:e,currentUser:t,settings:a,onQuota:n,onReset:r,onDisable:s,onEnable:i,onRole:c,onPurge:m}){let l=ms(e,a),d=!ns(e,t),b=!rs(e,t),u=!os(e,t),p=ss(e,t),[h,y]=g(e.role);return M(()=>{y(e.role)},[e.role]),o`<tr>
    <td>
      <strong>${e.username}</strong>
      <div class="muted">${e.display_name||e.id}</div>
      ${e.email&&o`<div class="muted">${e.email}</div>`}
    </td>
    <td>
      ${p?o`<select class="input input-compact" value=${h}
            onChange=${T=>{let R=T.target.value;R!==e.role&&(y(e.role),c(e,R))}}>
            ${Ot(!0).map(([T,R])=>o`<option value=${T} selected=${h===T}>${R}</option>`)}
          </select>`:e.role}
    </td>
    <td>${ds(e)}</td>
    <td>
      <strong>${O(e.storage_bytes||0)}</strong>
      <div class="muted">quota ${l}</div>
    </td>
    <td>${J(e.last_login_at)}</td>
    <td>
      <div class="actions">
        <button class="btn" type="button" onClick=${()=>n(e)}>${C("sliders",{size:14})} Quota</button>
        <button class="btn" type="button" disabled=${!is(e,t)} onClick=${()=>r(e)}>${C("clipboard",{size:14})} Reset link</button>
        ${e.is_disabled?o`<button class="btn" type="button" disabled=${b} onClick=${()=>i(e)}>${C("check",{size:14})} Enable</button>`:o`<button class="btn btn-danger" type="button" disabled=${d} onClick=${()=>s(e)}>${C("x",{size:14})} Disable</button>`}
        <button class="btn btn-danger" type="button" disabled=${u} onClick=${()=>m(e)}>${C("trash",{size:14})} Delete</button>
      </div>
    </td>
  </tr>`}function hn({users:e,settings:t,currentUser:a,resetLink:n,setResetLink:r,reload:s}){let[i,c]=g(null),m=a?.role==="owner",l=!!t?.smtp_enabled,d=()=>c(null);async function b(){let{type:p,user:h,value:y}=i;d();try{if(p==="quota"){let T=y.trim()?qt(y):null;await k(`/api/v1/users/${encodeURIComponent(h.id)}`,{method:"PATCH",body:{storage_quota_bytes:T}}),v("Storage quota updated.")}else if(p==="disable")await k(`/api/v1/users/${encodeURIComponent(h.id)}`,{method:"DELETE",body:{reauth_password:y}}),v("User disabled.");else if(p==="enable")await k(`/api/v1/users/${encodeURIComponent(h.id)}`,{method:"PATCH",body:{is_disabled:!1,reauth_password:y}}),v("User enabled.");else if(p==="role")await k(`/api/v1/users/${encodeURIComponent(h.id)}`,{method:"PATCH",body:{role:y.role,reauth_password:y.password}}),v(`Role updated to ${y.role}.`);else if(p==="purge")await k(`/api/v1/users/${encodeURIComponent(h.id)}/purge`,{method:"POST",body:{reauth_password:y}}),v("User deleted.");else if(p==="reset"){let T=await k(`/api/v1/users/${encodeURIComponent(h.id)}/reset-password`,{method:"POST",body:{reauth_password:y}});r({...T,username:h.username,kind:"reset"}),v("Reset link created.")}s()}catch(T){v(T.message),s()}}let u={quota:{title:"Set storage quota",description:"Enter a per-user storage limit in GiB. Leave it blank to remove the per-user limit.",confirmLabel:"Save quota",danger:!1,field:o`<label class="field"><span>Quota GiB</span>
        <input class="input" type="number" min="0" step="0.1" placeholder="No per-user limit"
          value=${i?.value||""} onInput=${p=>c(h=>({...h,value:p.target.value}))} /></label>`},disable:{title:"Disable user?",description:"This immediately revokes the user's sessions and device tokens.",confirmLabel:"Disable",danger:!0,field:o`<label class="field"><span>Your password</span>
        <input class="input" type="password" required value=${i?.value||""}
          onInput=${p=>c(h=>({...h,value:p.target.value}))} /></label>`},enable:{title:"Enable user?",description:"This restores sign-in access for the selected account.",confirmLabel:"Enable",danger:!1,field:o`<label class="field"><span>Your password</span>
        <input class="input" type="password" required value=${i?.value||""}
          onInput=${p=>c(h=>({...h,value:p.target.value}))} /></label>`},role:{title:"Change user role?",description:`Set ${i?.user?.username||"this user"} to ${i?.value?.role||"the selected role"}.`,confirmLabel:"Save role",danger:!1,field:o`<label class="field"><span>Your password</span>
        <input class="input" type="password" required value=${i?.value?.password||""}
          onInput=${p=>c(h=>({...h,value:{...h.value,password:p.target.value}}))} /></label>`},purge:{title:"Delete user permanently?",description:"This removes the account, clips, comments, and auth records. This cannot be undone.",confirmLabel:"Delete user",danger:!0,field:o`<label class="field"><span>Your password</span>
        <input class="input" type="password" required value=${i?.value||""}
          onInput=${p=>c(h=>({...h,value:p.target.value}))} /></label>`},reset:{title:"Create reset link?",description:"This creates a temporary password reset link for the selected user.",confirmLabel:"Create link",danger:!1,field:o`<label class="field"><span>Your password</span>
        <input class="input" type="password" required value=${i?.value||""}
          onInput=${p=>c(h=>({...h,value:p.target.value}))} /></label>`}}[i?.type];return o`<div class="admin-users-layout">
    <div class="admin-users-forms">
      <${ls} isOwner=${m} onCreated=${()=>{r(null),s()}} />
      <${cs} isOwner=${m} smtpEnabled=${l}
        onCreated=${p=>{r(p),s()}} />
    </div>
    <div class="panel admin-users-table">
      <div class="section-header">
        <h2>Users</h2>
        <span class="muted">${e.length} total</span>
      </div>
      <${us} resetLink=${n} />
      <div class="table-wrap">
        <table class="lib-table">
          <thead><tr><th>Username</th><th>Role</th><th>Status</th><th>Storage</th><th>Last login</th><th></th></tr></thead>
          <tbody>
            ${e.map(p=>o`<${fs} key=${p.id} user=${p} currentUser=${a} settings=${t}
              onQuota=${h=>c({type:"quota",user:h,value:""})}
              onReset=${h=>c({type:"reset",user:h,value:""})}
              onDisable=${h=>c({type:"disable",user:h,value:""})}
              onEnable=${h=>c({type:"enable",user:h,value:""})}
              onRole=${(h,y)=>c({type:"role",user:h,value:{role:y,password:""}})}
              onPurge=${h=>c({type:"purge",user:h,value:""})} />`)}
          </tbody>
        </table>
      </div>
    </div>
    <${le} open=${!!i}
      title=${u?.title}
      body=${u&&o`${u.description} ${u.field}`}
      confirmLabel=${u?.confirmLabel} danger=${u?.danger}
      confirmDisabled=${i?.type==="quota"?!1:i?.type==="role"?!i?.value?.password?.trim():!i?.value?.trim()}
      onConfirm=${b} onCancel=${d} />
  </div>`}function qt(e){let t=Number(String(e||"").trim());if(!Number.isFinite(t)||t<0)throw new Error("Storage quota must be a non-negative number");return Math.round(t*1024*1024*1024)}oe();function ft(e){let t=String(e||"").trim();return t||null}function bn(e){return e==null||e<=0?"":String(Math.round(e/1024**3*100)/100)}function gn({settings:e,isOwner:t,reload:a}){let[n,r]=g(!1),[s,i]=g(!1);async function c(m){if(m.preventDefault(),!n){r(!0);try{let l=new FormData(m.currentTarget),d={allow_vod_uploads:l.get("allow_vod_uploads")==="on",vod_threshold_minutes:Number(l.get("vod_threshold_minutes")||30)};if(s){let b=String(l.get("user_storage_quota_gib")||"").trim();d.user_storage_quota_bytes=b?qt(b):null}if(t){d.about_text=String(l.get("about_text")||""),d.smtp_enabled=l.get("smtp_enabled")==="on",d.smtp_host=ft(l.get("smtp_host")),d.smtp_port=Number(l.get("smtp_port")||587),d.smtp_tls_mode=String(l.get("smtp_tls_mode")||"starttls"),d.smtp_username=ft(l.get("smtp_username")),d.smtp_from_email=ft(l.get("smtp_from_email")),d.smtp_from_name=ft(l.get("smtp_from_name"));let b=String(l.get("smtp_password")||"").trim();b&&(d.smtp_password=b),l.get("smtp_password_clear")==="on"&&(d.smtp_password_clear=!0)}await k("/api/v1/admin/settings",{method:"PATCH",body:d}),v("Settings saved."),i(!1),a()}catch(l){v(l.message)}finally{r(!1)}}}return o`<form class="admin-settings-page" onSubmit=${c}>
    <section class="settings-section">
      <div class="settings-copy">
        <h2>Upload policy</h2>
        <p>Control whether long recordings can be uploaded and where Clipline classifies a clip as a full VOD.</p>
      </div>
      <div class="settings-controls">
        <label class="check-field">
          <input name="allow_vod_uploads" type="checkbox" checked=${e.allow_vod_uploads} />
          <span>Allow full-length VOD uploads</span>
        </label>
        <label class="field"><span>VOD threshold minutes</span>
          <input class="input" name="vod_threshold_minutes" type="number" min="0" value=${e.vod_threshold_minutes??30} /></label>
      </div>
    </section>

    <section class="settings-section">
      <div class="settings-copy">
        <h2>Default storage quota</h2>
        <p>Per-user storage limit for accounts without an individual quota. Leave blank and save to use the environment default when set. Enter 0 to disable quotas. Leave unchanged to keep the current stored value.</p>
      </div>
      <div class="settings-controls">
        <label class="field"><span>Default quota GiB</span>
          <input class="input" name="user_storage_quota_gib" type="number" min="0" step="0.1"
            placeholder=${e.user_storage_quota_env_fallback_bytes?`Env default: ${bn(e.user_storage_quota_env_fallback_bytes)} GiB`:"No default quota"}
            value=${bn(e.user_storage_quota_bytes)}
            onInput=${()=>i(!0)} /></label>
        ${e.user_storage_quota_bytes==null&&e.user_storage_quota_env_fallback_bytes?o`<p class="muted">Effective default: ${O(e.user_storage_quota_env_fallback_bytes)} from CLIPLINE_USER_STORAGE_QUOTA_BYTES.</p>`:null}
      </div>
    </section>

    <section class="settings-section">
      <div class="settings-copy">
        <h2>About page</h2>
        <p>${t?"Edit the public About page shown to all visitors.":"Only the owner can edit the public About page."}</p>
      </div>
      <div class="settings-controls">
        <label class="field"><span>About text</span>
          <textarea class="input" name="about_text" rows="5" maxlength="5000" disabled=${!t}>${e.about_text||""}</textarea>
        </label>
      </div>
    </section>

    <section class="settings-section">
      <div class="settings-copy">
        <h2>Email invites</h2>
        <p>${t?"Configure SMTP so new users can receive password setup links by email.":"Only the owner can edit SMTP invite settings."}</p>
      </div>
      <div class="settings-controls">
        <label class="check-field">
          <input name="smtp_enabled" type="checkbox" checked=${e.smtp_enabled} disabled=${!t} />
          <span>Enable SMTP invites</span>
        </label>
        <label class="field"><span>SMTP host</span>
          <input class="input" name="smtp_host" value=${e.smtp_host||""} placeholder="smtp.example.com" disabled=${!t} /></label>
        <label class="field"><span>SMTP port</span>
          <input class="input" name="smtp_port" type="number" min="1" value=${e.smtp_port??587} disabled=${!t} /></label>
        <label class="field"><span>TLS mode</span>
          <select class="input" name="smtp_tls_mode" disabled=${!t}>
            ${[["starttls","STARTTLS"],["tls","TLS"],["none","None"]].map(([m,l])=>o`<option value=${m} selected=${(e.smtp_tls_mode||"starttls")===m}>${l}</option>`)}
          </select></label>
        <label class="field"><span>SMTP username</span>
          <input class="input" name="smtp_username" value=${e.smtp_username||""} placeholder="Optional" disabled=${!t} /></label>
        <label class="field"><span>SMTP password</span>
          <input class="input" name="smtp_password" type="password"
            placeholder=${e.smtp_password_configured?"Configured; leave blank to keep":"Optional"} disabled=${!t} /></label>
        ${e.smtp_password_configured&&o`<label class="check-field">
          <input name="smtp_password_clear" type="checkbox" disabled=${!t} />
          <span>Clear stored SMTP password</span>
        </label>`}
        <label class="field"><span>From email</span>
          <input class="input" name="smtp_from_email" type="email" value=${e.smtp_from_email||""} placeholder="clips@example.com" disabled=${!t} /></label>
        <label class="field"><span>From name</span>
          <input class="input" name="smtp_from_name" value=${e.smtp_from_name||""} placeholder="Clipline Cloud" disabled=${!t} /></label>
      </div>
    </section>

    <div class="settings-action-row">
      <button class="btn btn-primary" type="submit" disabled=${n}>${C("save",{size:14})} Save settings</button>
    </div>
  </form>`}oe();function _s(e){return`${(e/100).toFixed(e%100===0?0:1)}%`}function hs(e){switch(e){case"delete_and_retry":return"delete the failed upload and retry from a new session";case"retry":return"retry the current upload request";default:return""}}function bs({upload:e}){let t=Math.max(0,Math.min(1e4,Number(e.progress_basis_points||0))),a=hs(e.recovery_action);return o`<div class="job-item">
    <div class="job-title-line">
      <strong class="mono">${e.id}</strong>
      <span class="badge badge-warn">${_s(t)}</span>
    </div>
    <div class="progress-meter" aria-label="Upload progress"><span style=${`width:${t/100}%`}></span></div>
    <span class="muted">clip ${e.clip_id} — ${O(e.received_size_bytes)} of ${O(e.expected_size_bytes)} — updated ${J(e.updated_at)}</span>
    ${e.failure_reason&&o`<span class="form-error">${e.failure_reason}</span>`}
    ${a&&o`<span class="muted">Recovery: ${a}</span>`}
  </div>`}function $n({job:e}){return o`<div class="job-item">
    <strong>${e.kind} <span class="mono">${e.id}</span></strong>
    <span class="muted">${e.status} — attempts ${e.attempts}/${e.max_attempts} — updated ${J(e.updated_at)} — target ${e.target_type||""}:${e.target_id||""}</span>
    ${e.last_error&&o`<span class="form-error">${e.last_error}</span>`}
  </div>`}function Vt({title:e,items:t,renderItem:a,emptyLabel:n,action:r}){return o`<div class="panel">
    <div class="section-header">
      <h2>${e}</h2>
      <span class="muted">${t.length}</span>
      ${r}
    </div>
    ${t.length?o`<div class="job-list">${t.map(a)}</div>`:o`<p class="muted">${n}</p>`}
  </div>`}function vn({failedUploads:e,deadJobs:t,recentErrors:a,reload:n}){let[r,s]=g(!1),[i,c]=g(!1),m=async()=>{if(!i){c(!0);try{let d=await k("/api/v1/admin/jobs/recent-errors",{method:"DELETE"}),b=[];d.terminal_jobs_deleted>0&&b.push(`${d.terminal_jobs_deleted} terminal job${d.terminal_jobs_deleted===1?"":"s"} removed`),d.errors_cleared>0&&b.push(`${d.errors_cleared} error${d.errors_cleared===1?"":"s"} cleared`),v(b.length?`${b.join(", ")}.`:"No job errors to clear."),n()}catch(d){v(d instanceof ve?d.message:"Couldn't clear job errors.")}finally{c(!1),s(!1)}}},l=d=>d.length?o`<button class="btn btn-danger" type="button" disabled=${i}
          onClick=${()=>s(!0)}>${C("trash",{size:14})} Clear errors</button>`:null;return o`<div class="section">
    <${Vt} title="Failed uploads" items=${e} emptyLabel="No failed uploads."
      renderItem=${d=>o`<${bs} key=${d.id} upload=${d} />`} />
    <${Vt} title="Dead jobs" items=${t} emptyLabel="No dead jobs."
      action=${l(t)}
      renderItem=${d=>o`<${$n} key=${d.id} job=${d} />`} />
    <${Vt} title="Recent job errors" items=${a} emptyLabel="No recent job errors."
      action=${l(a)}
      renderItem=${d=>o`<${$n} key=${d.id} job=${d} />`} />
    <${le} open=${r} title="Clear job errors?"
      body="Dead jobs are removed and error messages are cleared from the diagnostics lists. Clips and jobs that are still retrying are not affected; new failures will reappear."
      confirmLabel="Clear errors" danger confirmDisabled=${i} onCancel=${()=>s(!1)} onConfirm=${m} />
  </div>`}oe();var yn={grid:{kind:"grid",label:"Category Grid",description:"Portrait artwork used for this category on the Games page."},video:{kind:"hero",label:"Video Art",description:"Wide artwork shown subtly behind video titles and metadata."},icon:{kind:"icon",label:"Icon",description:"Compact artwork used in Library filters and category management."}};function wn(e,t,a){return`/api/v1/admin/game-categories/steamgriddb/games/${encodeURIComponent(e)}/artwork/${encodeURIComponent(t)}/${encodeURIComponent(a)}/preview`}function gs({displayName:e,steamGameId:t,selectedArtworks:a}){return{display_name:e,steamgriddb_game_id:t||null,grid_artwork_id:a?.grid?.id||null,video_artwork_id:a?.video?.id||null,icon_artwork_id:a?.icon?.id||null}}function $s(e,t){return t?e?.steamgriddb_game_id?"Matched":"Not matched":"Not configured"}function vs(e,t,a=""){let n=a.trim().toLocaleLowerCase();return(e||[]).filter(r=>r.id===t?!1:n?[r.display_name,...(r.reported_names||[]).map(s=>s.reported_name)].some(s=>String(s||"").toLocaleLowerCase().includes(n)):!0)}function kn(e){return`/admin/game-categories/${encodeURIComponent(e)}`}function Cn({data:e,reload:t,categoryId:a}){let n=e?.categories||[];if(a){let r=n.find(s=>s.id===a);return r?o`<${ws} key=${r.id} data=${e} reload=${t}
      editing=${r} categories=${n} />`:o`<section class="admin-card">
        <div class="admin-section-heading">
          <div><p class="kicker">Game categories</p><h2>Category not found</h2></div>
          <a class="btn" href="/admin/game-categories">Back to categories</a>
        </div>
        <p class="muted">This category may have been merged or removed.</p>
      </section>`}return o`<section class="admin-card">
    <div class="admin-section-heading"><div><p class="kicker">Library taxonomy</p><h2>Game categories</h2></div></div>
    ${n.length===0?o`<p class="muted">Categories appear automatically when clips report a game name.</p>`:o`<div class="table-wrap"><table class="lib-table admin-category-table">
        <thead><tr><th>Icon</th><th>Category</th><th>Reported names</th><th>Clips</th><th>SteamGridDB</th><th></th></tr></thead>
        <tbody>${n.map(r=>o`<tr key=${r.id}>
          <td>${r.icon_artwork_url?o`<img class="category-icon-thumb" src=${r.icon_artwork_url} alt="" loading="lazy" />`:o`<span class="category-artwork-empty">—</span>`}</td>
          <td><strong>${r.display_name}</strong></td>
          <td><div class="category-name-chips">${(r.reported_names||[]).map(s=>o`<code>${s.reported_name}</code>`)}</div></td>
          <td>${r.clip_count}</td>
          <td><span class=${`category-status ${r.steamgriddb_game_id?"is-matched":""}`}>${$s(r,e?.steamgriddb_configured)}</span></td>
          <td><a class="btn" href=${kn(r.id)}>${C("edit",{size:14})} Edit</a></td>
        </tr>`)}</tbody>
      </table></div>`}
  </section>`}function ys({slot:e,config:t,steamGameId:a,selected:n,active:r,results:s,busy:i,error:c,onToggle:m,onClear:l,onSelect:d}){return o`<section class=${`category-artwork-slot artwork-slot-${e}`}>
    <div class="category-artwork-slot-heading">
      <div><strong>${t.label}</strong><small>${t.description}</small></div>
      <div class="actions">
        ${n&&o`<button class="btn btn-small" type="button" onClick=${l}>Clear</button>`}
        ${!r&&o`<button class="btn btn-small" type="button" aria-expanded="false" onClick=${m}>
          ${n?"Change artwork":"Choose artwork"}
        </button>`}
      </div>
    </div>
    ${n&&o`<img class="category-selected-artwork" src=${n.preview_url||wn(a,t.kind,n.id)} alt="" />`}
    ${r&&o`<div class="category-artwork-browser">
      ${i?o`<small class="muted">Loading artwork…</small>`:""}
      ${c&&o`<small class="field-error">${c}</small>`}
      ${!i&&!c&&s.length===0&&o`<small class="muted">No artwork found for this slot.</small>`}
      ${s.length>0&&o`<small class="muted">Scroll to browse. Click an image to select it.</small>`}
      <div class="category-artwork-grid">
        ${s.map(b=>o`<button type="button"
          class=${`category-artwork-option ${n?.id===b.id?"is-selected":""}`}
          aria-label=${`Select ${t.label} artwork ${b.id}`}
          onClick=${()=>d(b)}>
          <img src=${b.preview_url||wn(a,b.kind,b.id)} alt="" loading="lazy" />
        </button>`)}
      </div>
    </div>`}
  </section>`}function ws({data:e,reload:t,editing:a,categories:n}){let[r,s]=g(a.display_name),[i,c]=g(a.display_name),[m,l]=g(a.steamgriddb_game_id||null),[d,b]=g(!1),[u,p]=g([]),[h,y]=g(!1),[T,R]=g(""),[x,U]=g(null),[q,A]=g([]),[D,K]=g(!1),[V,Y]=g(""),[L,j]=g({grid:a.grid_artwork_id?{id:a.grid_artwork_id,kind:"grid",preview_url:a.grid_artwork_url}:null,video:a.video_artwork_id?{id:a.video_artwork_id,kind:"hero",preview_url:a.video_artwork_url}:null,icon:a.icon_artwork_id?{id:a.icon_artwork_id,kind:"icon",preview_url:a.icon_artwork_url}:null}),[_e,me]=g(""),[re,ke]=g(""),[te,X]=g(!1),[ce,ue]=g(null),[ae,ne]=g(!1),Ce=Xe(()=>vs(n,a.id,_e),[n,a.id,_e]),se=n.find(f=>f.id===re)||null;M(()=>{if(!e?.steamgriddb_configured||!d||i.trim().length<2){p([]),y(!1),R("");return}let f=!1,$=new AbortController,E=i.trim();y(!0),R("");let I=setTimeout(async()=>{try{let _=await k(`/api/v1/admin/game-categories/steamgriddb/search?q=${encodeURIComponent(E)}`,{signal:$.signal});f||p(_||[])}catch(_){f||(p([]),R(_.message))}finally{f||y(!1)}},300);return()=>{f=!0,$.abort(),clearTimeout(I)}},[e?.steamgriddb_configured,d,i]),M(()=>{if(!m||!e?.steamgriddb_configured||!x){A([]),Y("");return}let f=yn[x].kind,$=!1,E=new AbortController;return K(!0),Y(""),k(`/api/v1/admin/game-categories/steamgriddb/games/${encodeURIComponent(m)}/artwork?kind=${encodeURIComponent(f)}`,{signal:E.signal}).then(I=>{$||A(I||[])}).catch(I=>{$||(A([]),Y(I.message))}).finally(()=>{$||K(!1)}),()=>{$=!0,E.abort()}},[e?.steamgriddb_configured,m,x]);function ge(f){l(f.id),c(f.name),s(f.name),b(!1),p([]),U(null),A([]),j({grid:null,video:null,icon:null})}function Te(){l(null),j({grid:null,video:null,icon:null}),U(null),A([]),b(!0)}async function fe(f){if(f.preventDefault(),!(!a||te)){X(!0);try{await k(`/api/v1/admin/game-categories/${encodeURIComponent(a.id)}`,{method:"PATCH",body:gs({displayName:r,steamGameId:m,selectedArtworks:L})}),v("Game category updated."),await t()}catch($){v($.message)}finally{X(!1)}}}async function w(){let f=ce;if(ue(null),!(!f||te)){X(!0);try{await k(`/api/v1/admin/game-categories/${encodeURIComponent(f.category.id)}/reported-names/${encodeURIComponent(f.name.id)}/separate`,{method:"POST"}),v(`${f.name.reported_name} separated into its own category.`),await t()}catch($){v($.message),($.status===404||$.status===409)&&await t()}finally{X(!1)}}}async function H(){if(ne(!1),!(!a||!se||te)){X(!0);try{await k(`/api/v1/admin/game-categories/${encodeURIComponent(a.id)}/merge`,{method:"POST",body:{destination_category_id:se.id}}),v(`${a.display_name} merged into ${se.display_name}.`),await t(),F(kn(se.id))}catch(f){v(f.message),(f.status===404||f.status===409)&&await t()}finally{X(!1)}}}return o`<div class="admin-categories-page">
    <form class="admin-card admin-category-editor" onSubmit=${fe}>
      <div class="admin-section-heading category-editor-heading">
        <a class="category-back-arrow" href="/admin/game-categories" aria-label="Back to game categories">
          ${C("arrowLeft",{size:20})}
        </a>
        <div><p class="kicker">Category settings</p><h2>${a.display_name}</h2></div>
      </div>

      <section class="category-settings-section">
        <h3>Appearance</h3>
        <label class="field"><span>Display name</span>
          <input class="input" maxlength="200" required value=${r}
            onInput=${f=>s(f.target.value)} />
        </label>
      </section>

      <section class="category-settings-section">
        <h3>Game metadata</h3>
        ${e?.steamgriddb_configured?o`<label class="field steamgriddb-search"><span>Find on SteamGridDB</span>
          <input class="input" value=${i} placeholder="Enter the official game title"
            onFocus=${()=>b(!0)}
            onInput=${f=>{c(f.target.value),b(!0)}} />
          ${h&&o`<small class="muted">Searching…</small>`}
          ${T&&o`<small class="field-error">${T}</small>`}
          ${d&&!h&&!T&&i.trim().length>=2&&u.length===0&&o`<small class="muted">No results. Try the full official game title.</small>`}
          ${d&&u.length>0&&o`<div class="steamgriddb-results">
            ${u.map(f=>o`<button type="button" onClick=${()=>ge(f)}>
              <strong>${f.name}</strong><small>#${f.id}${f.verified?" \xB7 verified":""}</small>
            </button>`)}
          </div>`}
          ${m&&o`<span class="steamgriddb-selected">SteamGridDB #${m}
            <button class="btn btn-small" type="button" onClick=${Te}>Clear match</button>
          </span>`}
        </label>`:o`<p class="muted"><strong>SteamGridDB is not configured.</strong> Set the API key file to enable matching and artwork.</p>`}
        ${m&&o`<div class="category-artwork-slots">
          ${Object.entries(yn).map(([f,$])=>o`<${ys}
            key=${f}
            slot=${f}
            config=${$}
            steamGameId=${m}
            selected=${L[f]}
            active=${x===f}
            results=${x===f?q:[]}
            busy=${x===f&&D}
            error=${x===f?V:""}
            onToggle=${()=>{K(x!==f),A([]),Y(""),U(E=>E===f?null:f)}}
            onClear=${()=>j(E=>({...E,[f]:null}))}
            onSelect=${E=>{j(I=>({...I,[f]:E})),U(null),A([]),K(!1)}} />`)}
        </div>`}
      </section>

      <section class="category-settings-section">
        <h3>Reported names</h3>
        <div class="category-reported-name-list">
          ${(a.reported_names||[]).map(f=>o`<div class="category-reported-name">
            <span><code>${f.reported_name}</code><small>${f.clip_count} clip${f.clip_count===1?"":"s"}</small></span>
            ${a.reported_names.length>1&&o`<button class="btn" type="button" disabled=${te}
              onClick=${()=>ue({category:a,name:f})}>Separate</button>`}
          </div>`)}
        </div>
      </section>

      <section class="category-settings-section">
        <h3>Merge with another category</h3>
        <p class="muted">All reported names move to the destination. Its display name, SteamGridDB match, and artwork win.</p>
        <label class="field"><span>Search categories</span>
          <input class="input" value=${_e} onInput=${f=>me(f.target.value)} />
        </label>
        <label class="field"><span>Destination</span>
          <select class="input" value=${re} onChange=${f=>ke(f.target.value)}>
            <option value="">Select a category</option>
            ${Ce.map(f=>o`<option value=${f.id}>${f.display_name} · ${(f.reported_names||[]).map($=>$.reported_name).join(", ")}</option>`)}
          </select>
        </label>
        <button class="btn btn-danger" type="button" disabled=${te||!re}
          onClick=${()=>ne(!0)}>Merge category</button>
      </section>

      <div class="admin-form-actions">
        <button class="btn btn-primary" type="submit" disabled=${te}>${C("save",{size:14})} Save changes</button>
      </div>
    </form>

    <${le} open=${!!ce} title="Separate this reported name?"
      body=${ce?`${ce.name.reported_name} will become a new category with no SteamGridDB match or artwork.`:""}
      confirmLabel="Separate" onCancel=${()=>ue(null)} onConfirm=${w} />
    <${le} open=${ae} title="Merge these categories?"
      body=${a&&se?`${a.display_name} will disappear. ${(a.reported_names||[]).map(f=>f.reported_name).join(", ")} will move to ${se.display_name}, whose appearance and metadata will win.`:""}
      confirmLabel="Merge category" danger onCancel=${()=>ne(!1)} onConfirm=${H} />
  </div>`}var Sn=[["overview","server","Overview"],["users","users","Users"],["categories","film","Game categories"],["settings","sliders","Settings"],["jobs","alert","Jobs"]];function ks(e){return e?.role==="admin"||e?.role==="owner"}async function Cs(e){let t={signal:e},[a,n,r,s,i,c,m]=await Promise.all([k("/api/v1/admin/overview",t),k("/api/v1/admin/settings",t),k("/api/v1/users",t),k("/api/v1/admin/game-categories",t),k("/api/v1/admin/uploads/failed?limit=50",t),k("/api/v1/admin/jobs/dead?limit=50",t),k("/api/v1/admin/jobs/recent-errors?limit=50",t)]);return{overview:a,settings:n,users:r,categories:s,failedUploads:i,deadJobs:c,recentErrors:m}}function xn({route:e}){let{user:t}=G(N),a=ks(t),n=!!(t&&!a),r=Sn.some(([u])=>u===e.tab)?e.tab:"overview",[s,i]=g(null),[c,m]=g(0),{data:l,error:d}=Be(a?`admin:${c}`:null,Cs),b=()=>m(u=>u+1);return M(()=>{n&&(v("Admin access required."),F("/library"))},[n]),a?o`<main class="page">
    <h1>Admin</h1>
    <p class="page-subtitle">Accounts, instance summary, and processing diagnostics.</p>
    <nav class="ad-tabs" aria-label="Admin views">
      ${Sn.map(([u,p,h])=>o`<a key=${u} class=${`ad-tab ${u===r?"ad-tab-on":""}`}
        href=${u==="categories"?"/admin/game-categories":`/admin?tab=${u}`}
        aria-current=${u===r?"page":void 0}>${C(p,{size:14})} ${h}</a>`)}
    </nav>
    ${d?o`<${Q} name="alert" title="Couldn't load admin data" body=${d.message} />`:l?r==="users"?o`<${hn} users=${l.users} settings=${l.settings} currentUser=${t}
          resetLink=${s} setResetLink=${i} reload=${b} />`:r==="settings"?o`<${gn} settings=${l.settings} isOwner=${t?.role==="owner"} reload=${b} />`:r==="categories"?o`<${Cn} data=${l.categories} reload=${b} categoryId=${e.categoryId} />`:r==="jobs"?o`<${vn} failedUploads=${l.failedUploads} deadJobs=${l.deadJobs} recentErrors=${l.recentErrors} reload=${b} />`:o`<${_n} overview=${l.overview} deadJobs=${l.deadJobs} failedUploads=${l.failedUploads} />`:o`<p class="empty-state">Loading admin data…</p>`}
  </main>`:null}oe();function Tn(e){let t=String(e||"").trim();return t||null}async function Ss(e){let t=new Headers;t.set("Accept","application/json"),t.set("Content-Type",e.type||"application/octet-stream");let a=Mt();a&&t.set("X-CSRF-Token",a);let n=await fetch("/api/v1/me/avatar",{method:"PUT",credentials:"same-origin",headers:t,body:e}),r=await n.json().catch(()=>({}));if(!n.ok)throw new Error(r.error||n.statusText||"Avatar upload failed");return r}function Pn(e){N.set({...N.get(),user:e})}function xs({user:e}){let[t,a]=g(!1);async function n(r){if(r.preventDefault(),t)return;a(!0);let s=new FormData(r.currentTarget);try{let i=await k("/api/v1/me/profile",{method:"PATCH",body:{display_name:Tn(s.get("display_name")),bio:Tn(s.get("bio"))}});Pn(i),v("Profile saved.")}catch(i){v(i.message)}finally{a(!1)}}return o`<form class="profile-form" onSubmit=${n}>
    <label class="field"><span>Display name</span>
      <input class="input" name="display_name" maxlength="120" value=${e.display_name||""} placeholder=${e.username} /></label>
    <label class="field"><span>Bio</span>
      <textarea class="input" name="bio" rows="5" maxlength="2000" placeholder="Tell people what you upload.">${e.bio||""}</textarea></label>
    <div class="clip-inline-actions">
      <button class="btn btn-primary" type="submit" disabled=${t}>${C("save",{size:14})} Save profile</button>
    </div>
  </form>`}function Ts({user:e}){let[t,a]=g(!1);async function n(r){if(r.preventDefault(),t)return;let s=r.currentTarget.elements.avatar?.files?.[0];if(!s){v("Choose an avatar image first.");return}a(!0);try{let i=await Ss(s);Pn(i),v("Avatar uploaded.")}catch(i){v(i.message)}finally{a(!1)}}return o`<form class="profile-form" onSubmit=${n}>
    <label class="field"><span>Avatar</span>
      <input name="avatar" type="file" accept="image/png,image/jpeg,image/webp,image/gif" />
      <small>PNG, JPEG, WebP, or GIF. Max 2 MiB.</small></label>
    <div class="clip-inline-actions">
      <button class="btn" type="submit" disabled=${t}>${C("upload",{size:14})} Upload avatar</button>
    </div>
  </form>`}function Mn(){let{user:e}=G(N);return e?o`<main class="page">
    <h1>Profile</h1>
    <p class="page-subtitle">Public identity and avatar.</p>
    <div class="profile-settings-header">
      <${xe} user=${e} size=${72} />
      <div>
        <h2>${e.display_name||e.username}</h2>
        <p>@${e.username} · ${e.role}</p>
      </div>
    </div>
    <${xs} user=${e} />
    <${Ts} user=${e} />
    <div class="profile-public-link">
      <a class="btn" href=${`/u/${encodeURIComponent(e.username)}`}>${C("external",{size:14})} View public profile</a>
    </div>
  </main>`:null}oe();async function Ps(e){let t={signal:e},[a,n]=await Promise.all([k("/api/v1/auth/sessions",t),k("/api/v1/auth/device-tokens",t)]);return{sessions:a,deviceTokens:n}}function Ms({item:e,onRevoke:t}){return o`<div class="management-item">
    <div>
      <strong>${e.user_agent||"Unknown browser"}</strong>
      <div class="meta-line">
        <span>${e.ip_address||"Unknown IP"}</span>
        <span>Last used ${J(e.last_used_at||e.created_at)}</span>
        <span>Expires ${J(e.expires_at)}</span>
      </div>
    </div>
    <div class="actions">
      ${e.current&&o`<span class="badge badge-public">Current</span>`}
      <button class="btn btn-danger" type="button" onClick=${()=>t(e)}>${C("x",{size:14})} Revoke</button>
    </div>
  </div>`}function Rs({item:e,onRevoke:t}){let a=!!e.revoked_at;return o`<div class="management-item">
    <div>
      <strong>${e.name}</strong>
      <div class="meta-line">
        <span>Created ${J(e.created_at)}</span>
        <span>Last used ${J(e.last_used_at)}</span>
        ${e.expires_at&&o`<span>Expires ${J(e.expires_at)}</span>`}
        ${a&&o`<span>Revoked ${J(e.revoked_at)}</span>`}
      </div>
    </div>
    <div class="actions">
      <span class=${`badge ${a?"badge-private":"badge-public"}`}>${a?"Revoked":"Active"}</span>
      <button class="btn btn-danger" type="button" disabled=${a} onClick=${()=>t(e)}>${C("x",{size:14})} Revoke</button>
    </div>
  </div>`}function Rn(){let{user:e}=G(N),[t,a]=g(!1);async function n(p){if(p.preventDefault(),t)return;a(!0);let h=new FormData(p.currentTarget);try{let y=await k("/api/v1/me/change-password",{method:"POST",body:{current_password:String(h.get("current_password")),new_password:String(h.get("new_password"))}});be(y.csrf_token);let T=await k("/api/v1/auth/me");N.set({user:T.user,csrfToken:y.csrf_token,ready:!0}),v("Password changed."),F("/library")}catch(y){v(y.message)}finally{a(!1)}}let r=o`<form class="profile-form" onSubmit=${n}>
    <h2>Change password</h2>
    <label class="field"><span>Current password</span><input class="input" name="current_password" type="password" autocomplete="current-password" required /></label>
    <label class="field"><span>New password</span><input class="input" name="new_password" type="password" autocomplete="new-password" minlength="8" required /></label>
    <button class="btn btn-primary" type="submit" disabled=${t}>Change password</button>
  </form>`,[s,i]=g(0),{data:c,error:m}=Be(e?.password_change_required?null:s,Ps),[l,d]=g(null),b=()=>i(p=>p+1);async function u(){let p=l;d(null);try{if(p.kind==="session"){if(await k(`/api/v1/auth/sessions/${encodeURIComponent(p.item.id)}`,{method:"DELETE",body:{}}),p.item.current){be(null),N.set({user:null,csrfToken:null,ready:!0}),v("Current session revoked."),F("/login");return}v("Session revoked.")}else await k(`/api/v1/auth/device-tokens/${encodeURIComponent(p.item.id)}`,{method:"DELETE",body:{}}),v("Device token revoked.");b()}catch(h){v(h.message)}}return e?.password_change_required?o`<main class="page"><h1>Set your password</h1><p>Choose a new password to finish setting up your account.</p>${r}</main>`:m?o`<main class="page"><${Q} name="alert" title="Couldn't load account data" body=${m.message} /></main>`:o`<main class="page">
    <h1>Account</h1>
    ${e?.password_change_required&&o`<p class="notice">Set a new password to finish setting up your account.</p>`}
    <p class="page-subtitle">Sessions and device tokens.</p>
    ${r}
    ${c?o`<div class="account-grid">
          <div class="panel">
            <div class="section-header"><h2>Browser sessions</h2><span class="muted">${c.sessions.length} active</span></div>
            ${c.sessions.length?o`<div class="management-list">${c.sessions.map(p=>o`<${Ms} key=${p.id} item=${p}
                  onRevoke=${h=>d({kind:"session",item:h})} />`)}</div>`:o`<p class="muted">No active sessions.</p>`}
          </div>
          <div class="panel">
            <div class="section-header"><h2>Device tokens</h2><span class="muted">${c.deviceTokens.length} total</span></div>
            ${c.deviceTokens.length?o`<div class="management-list">${c.deviceTokens.map(p=>o`<${Rs} key=${p.id} item=${p}
                  onRevoke=${h=>d({kind:"device",item:h})} />`)}</div>`:o`<p class="muted">No device tokens.</p>`}
          </div>
        </div>`:o`<p class="empty-state">Loading account data…</p>`}
    <${le} open=${!!l}
      title=${l?.kind==="session"?"Revoke browser session?":"Revoke device token?"}
      body=${l?.kind==="session"?l.item.current?"This signs you out of the current browser session.":"This signs out that browser session immediately.":"The desktop client using this token will need to reconnect."}
      confirmLabel="Revoke" danger
      onConfirm=${u} onCancel=${()=>d(null)} />
  </main>`}function En({route:e}){let{user:t}=G(N),a=`/api/v1/public/users/${encodeURIComponent(e.username)}`,{data:n,error:r}=ie(a);if(r)return o`<main class="page"><${Q} name="alert" title="Profile unavailable" body=${r.message} /></main>`;if(!n)return o`<main class="page"><p class="empty-state">Loading profile…</p></main>`;let s=t&&t.username.toLowerCase()===n.username.toLowerCase(),i=n.clips||[];return o`<main class="page">
    <header class="public-user-header">
      <${xe} user=${n} size=${72} />
      <div class="public-user-header-body">
        <div class="public-user-title-row">
          <div>
            <h1>${n.display_name||n.username}</h1>
            <p>@${n.username}</p>
          </div>
          ${s&&o`<a class="btn" href="/profile">${C("edit",{size:14})} Edit profile</a>`}
        </div>
        ${n.bio&&o`<p class="public-user-bio">${n.bio}</p>`}
        <p class="meta-line">${n.clip_count} public clip${n.clip_count===1?"":"s"}</p>
      </div>
    </header>
    ${i.length===0?o`<${Q} name="film" title="No public clips yet" />`:o`<div class="card-grid">
          ${i.map(c=>o`<${Ee} key=${c.share_id}
            clip=${{...c,thumbnail_url:we(c),media_url:Re(c)}}
            href=${`/c/${encodeURIComponent(c.share_id)}`} showAuthor=${!1} />`)}
        </div>`}
  </main>`}var Dn="Clipline is a self-hosted clip library for saved gameplay moments.";function _t(e,t){return o`<div><dt>${e}</dt><dd>${t}</dd></div>`}function Un(){let{data:e}=ie("/api/v1/about",0,{about_text:Dn}),t=e?.about_text||Dn;return o`<main class="page">
    <h1>About</h1>
    <p class="page-subtitle">Clipline Cloud</p>
    <div class="panel about-panel">
      <h2>Clipline Cloud</h2>
      <p class="about-text">${t}</p>
      <dl class="ad-kv">
        ${_t("Home","Public clips that are ready for discovery.")}
        ${_t("Unlisted","Shareable by link, but not listed on Home.")}
        ${_t("Private","Visible only to the clip owner.")}
        ${_t("Media","Public and unlisted clips are not DRM-protected.")}
      </dl>
    </div>
  </main>`}var Es={publicLibrary:Nt,publicGame:Nt,games:Ga,library:Qa,clip:zt,public:zt,login:mn,resetPassword:fn,admin:xn,profile:Mn,account:Rn,publicUser:En,about:Un},In=Ne(window.location.pathname,window.location.search).name;function Ds(){let e=Ia();In=e.name;let{ready:t,user:a}=G(N),n=t&&Ea(e.name,a);M(()=>{n&&F(`/login?return_to=${encodeURIComponent(window.location.pathname+window.location.search)}`)},[n]);let r=t&&a?.password_change_required&&e.name!=="account";if(M(()=>{r&&F("/account")},[r]),!t||n||r)return o`<div class="boot">Loading…</div>`;let s=Es[e.name],i=e.name==="login"||e.name==="resetPassword";return o`<div class="ui" onClick=${Aa}>
    ${!i&&o`<${Na} active=${Et(e)} route=${e} />`}
    <${s} route=${e} />
    ${!i&&o`<${Ba} active=${Da(e)} />`}
    <${za} />
  </div>`}window.addEventListener("clipline:unauthorized",()=>{be(null),N.set({user:null,csrfToken:null,ready:!0}),Rt(In)||F(`/login?return_to=${encodeURIComponent(window.location.pathname+window.location.search)}`)});(async()=>{try{let t=await k("/api/v1/auth/me");be(t.csrf_token),N.set({user:t.user,csrfToken:t.csrf_token,ready:!0})}catch{be(null),N.set({user:null,csrfToken:null,ready:!0})}let e=document.querySelector("#app");e.textContent="",da(o`<${Ds} />`,e)})();
