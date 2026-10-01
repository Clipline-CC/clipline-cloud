var zn=Object.defineProperty;var Fn=(e,t)=>()=>(e&&(t=e(e=0)),t);var On=(e,t)=>{for(var a in t)zn(e,a,{get:t[a],enumerable:!0})};var Ua={};On(Ua,{ApiError:()=>xe,api:()=>x,getCsrfToken:()=>zt,setCsrfToken:()=>Te});function Te(e){dt=e}function zt(){return dt}function Yn(e){try{let t=globalThis.location?.href||"http://clipline.invalid/";return new URL(e,t).origin===new URL(t).origin}catch{return!1}}async function Xn(e,t){let a=await e.text();if(!t.includes("application/json"))return a;if(!a.trim())return null;try{return JSON.parse(a)}catch(n){if(e.ok)throw n;return null}}async function x(e,t={}){let a=(t.method||"GET").toUpperCase(),n=new Headers(t.headers||{});n.set("Accept","application/json");let r=t.body;r&&typeof r!="string"&&(n.set("Content-Type","application/json"),r=JSON.stringify(r)),Yn(e)?!["GET","HEAD","OPTIONS"].includes(a)&&dt&&n.set("X-CSRF-Token",dt):n.delete("X-CSRF-Token");let i=await fetch(e,{...t,body:r,credentials:"same-origin",headers:n,method:a}),c=i.headers.get("content-type")||"",d=await Xn(i,c);if(!i.ok){i.status===401&&window.dispatchEvent(new CustomEvent("clipline:unauthorized"));let u=typeof d=="object"&&d?.error?d.error:i.statusText;throw new xe(u||"Request failed",i.status)}return d}var dt,xe,fe=Fn(()=>{dt=null;xe=class extends Error{constructor(t,a){super(t),this.status=a}}});var it,F,ra,Vn,Le,ea,sa,oa,Pt,tt,qe,ia,Et,Mt,Rt,Hn,rt={},st=[],qn=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,lt=Array.isArray;function Se(e,t){for(var a in t)e[a]=t[a];return e}function Ut(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function Dt(e,t,a){var n,r,s,i={};for(s in t)s=="key"?n=t[s]:s=="ref"?r=t[s]:i[s]=t[s];if(arguments.length>2&&(i.children=arguments.length>3?it.call(arguments,2):a),typeof e=="function"&&e.defaultProps!=null)for(s in e.defaultProps)i[s]===void 0&&(i[s]=e.defaultProps[s]);return at(e,i,n,r,null)}function at(e,t,a,n,r){var s={type:e,props:t,key:a,ref:n,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++ra,__i:-1,__u:0};return r==null&&F.vnode!=null&&F.vnode(s),s}function ct(e){return e.children}function nt(e,t){this.props=e,this.context=t}function ze(e,t){if(t==null)return e.__?ze(e.__,e.__i+1):null;for(var a;t<e.__k.length;t++)if((a=e.__k[t])!=null&&a.__e!=null)return a.__e;return typeof e.type=="function"?ze(e):null}function Gn(e){if(e.__P&&e.__d){var t=e.__v,a=t.__e,n=[],r=[],s=Se({},t);s.__v=t.__v+1,F.vnode&&F.vnode(s),Lt(e.__P,s,t,e.__n,e.__P.namespaceURI,32&t.__u?[a]:null,n,a??ze(t),!!(32&t.__u),r),s.__v=t.__v,s.__.__k[s.__i]=s,pa(n,s,r),t.__e=t.__=null,s.__e!=a&&la(s)}}function la(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(t){if(t!=null&&t.__e!=null)return e.__e=e.__c.base=t.__e}),la(e)}function ta(e){(!e.__d&&(e.__d=!0)&&Le.push(e)&&!ot.__r++||ea!=F.debounceRendering)&&((ea=F.debounceRendering)||sa)(ot)}function ot(){try{for(var e,t=1;Le.length;)Le.length>t&&Le.sort(oa),e=Le.shift(),t=Le.length,Gn(e)}finally{Le.length=ot.__r=0}}function ca(e,t,a,n,r,s,i,c,d,u,p){var f,l,m,_,v,w,T,S=n&&n.__k||st,A=t.length;for(d=jn(a,t,S,d,A),f=0;f<A;f++)(m=a.__k[f])!=null&&(l=m.__i!=-1&&S[m.__i]||rt,m.__i=f,w=Lt(e,m,l,r,s,i,c,d,u,p),_=m.__e,m.ref&&l.ref!=m.ref&&(l.ref&&At(l.ref,null,m),p.push(m.ref,m.__c||_,m)),v==null&&_!=null&&(v=_),(T=!!(4&m.__u))||l.__k===m.__k?(d=ua(m,d,e,T),T&&l.__e&&(l.__e=null)):typeof m.type=="function"&&w!==void 0?d=w:_&&(d=_.nextSibling),m.__u&=-7);return a.__e=v,d}function jn(e,t,a,n,r){var s,i,c,d,u,p=a.length,f=p,l=0;for(e.__k=new Array(r),s=0;s<r;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i=="string"||typeof i=="number"||typeof i=="bigint"||i.constructor==String?i=e.__k[s]=at(null,i,null,null,null):lt(i)?i=e.__k[s]=at(ct,{children:i},null,null,null):i.constructor===void 0&&i.__b>0?i=e.__k[s]=at(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):e.__k[s]=i,d=s+l,i.__=e,i.__b=e.__b+1,c=null,(u=i.__i=Kn(i,a,d,f))!=-1&&(f--,(c=a[u])&&(c.__u|=2)),c==null||c.__v==null?(u==-1&&(r>p?l--:r<p&&l++),typeof i.type!="function"&&(i.__u|=4)):u!=d&&(u==d-1?l--:u==d+1?l++:(u>d?l--:l++,i.__u|=4))):e.__k[s]=null;if(f)for(s=0;s<p;s++)(c=a[s])!=null&&(2&c.__u)==0&&(c.__e==n&&(n=ze(c)),fa(c,c));return n}function ua(e,t,a,n){var r,s;if(typeof e.type=="function"){for(r=e.__k,s=0;r&&s<r.length;s++)r[s]&&(r[s].__=e,t=ua(r[s],t,a,n));return t}e.__e!=t&&(n&&(t&&e.type&&!t.parentNode&&(t=ze(e)),a.insertBefore(e.__e,t||null)),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Kn(e,t,a,n){var r,s,i,c=e.key,d=e.type,u=t[a],p=u!=null&&(2&u.__u)==0;if(u===null&&c==null||p&&c==u.key&&d==u.type)return a;if(n>(p?1:0)){for(r=a-1,s=a+1;r>=0||s<t.length;)if((u=t[i=r>=0?r--:s++])!=null&&(2&u.__u)==0&&c==u.key&&d==u.type)return i}return-1}function aa(e,t,a){t[0]=="-"?e.setProperty(t,a??""):e[t]=a==null?"":typeof a!="number"||qn.test(t)?a:a+"px"}function et(e,t,a,n,r){var s,i;e:if(t=="style")if(typeof a=="string")e.style.cssText=a;else{if(typeof n=="string"&&(e.style.cssText=n=""),n)for(t in n)a&&t in a||aa(e.style,t,"");if(a)for(t in a)n&&a[t]==n[t]||aa(e.style,t,a[t])}else if(t[0]=="o"&&t[1]=="n")s=t!=(t=t.replace(ia,"$1")),i=t.toLowerCase(),t=i in e||t=="onFocusOut"||t=="onFocusIn"?i.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+s]=a,a?n?a[qe]=n[qe]:(a[qe]=Et,e.addEventListener(t,s?Rt:Mt,s)):e.removeEventListener(t,s?Rt:Mt,s);else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=a??"";break e}catch{}typeof a=="function"||(a==null||a===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&a==1?"":a))}}function na(e){return function(t){if(this.l){var a=this.l[t.type+e];if(t[tt]==null)t[tt]=Et++;else if(t[tt]<a[qe])return;return a(F.event?F.event(t):t)}}}function Lt(e,t,a,n,r,s,i,c,d,u){var p,f,l,m,_,v,w,T,S,A,G,U,D,W,ie,Q,L=t.type;if(t.constructor!==void 0)return null;128&a.__u&&(d=!!(32&a.__u),s=[c=t.__e=a.__e]),(p=F.__b)&&p(t);e:if(typeof L=="function"){f=i.length;try{if(S=t.props,A=L.prototype&&L.prototype.render,G=(p=L.contextType)&&n[p.__c],U=p?G?G.props.value:p.__:n,a.__c?T=(l=t.__c=a.__c).__=l.__E:(A?t.__c=l=new L(S,U):(t.__c=l=new nt(S,U),l.constructor=L,l.render=Zn),G&&G.sub(l),l.state||(l.state={}),l.__n=n,m=l.__d=!0,l.__h=[],l._sb=[]),A&&l.__s==null&&(l.__s=l.state),A&&L.getDerivedStateFromProps!=null&&(l.__s==l.state&&(l.__s=Se({},l.__s)),Se(l.__s,L.getDerivedStateFromProps(S,l.__s))),_=l.props,v=l.state,l.__v=t,m)A&&L.getDerivedStateFromProps==null&&l.componentWillMount!=null&&l.componentWillMount(),A&&l.componentDidMount!=null&&l.__h.push(l.componentDidMount);else{if(A&&L.getDerivedStateFromProps==null&&S!==_&&l.componentWillReceiveProps!=null&&l.componentWillReceiveProps(S,U),t.__v==a.__v||!l.__e&&l.shouldComponentUpdate!=null&&l.shouldComponentUpdate(S,l.__s,U)===!1){t.__v!=a.__v&&(l.props=S,l.state=l.__s,l.__d=!1),t.__e=a.__e,t.__k=a.__k,t.__k.some(function(Y){Y&&(Y.__=t)}),st.push.apply(l.__h,l._sb),l._sb=[],l.__h.length&&i.push(l);break e}l.componentWillUpdate!=null&&l.componentWillUpdate(S,l.__s,U),A&&l.componentDidUpdate!=null&&l.__h.push(function(){l.componentDidUpdate(_,v,w)})}if(l.context=U,l.props=S,l.__P=e,l.__e=!1,D=F.__r,W=0,A)l.state=l.__s,l.__d=!1,D&&D(t),p=l.render(l.props,l.state,l.context),st.push.apply(l.__h,l._sb),l._sb=[];else do l.__d=!1,D&&D(t),p=l.render(l.props,l.state,l.context),l.state=l.__s;while(l.__d&&++W<25);l.state=l.__s,l.getChildContext!=null&&(n=Se(Se({},n),l.getChildContext())),A&&!m&&l.getSnapshotBeforeUpdate!=null&&(w=l.getSnapshotBeforeUpdate(_,v)),ie=p!=null&&p.type===ct&&p.key==null?ma(p.props.children):p,c=ca(e,lt(ie)?ie:[ie],t,a,n,r,s,i,c,d,u),l.base=t.__e,t.__u&=-161,l.__h.length&&i.push(l),T&&(l.__E=l.__=null)}catch(Y){if(i.length=f,t.__v=null,d||s!=null){if(Y.then){for(t.__u|=d?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;s!=null&&(s[s.indexOf(c)]=null),t.__e=c}else if(s!=null)for(Q=s.length;Q--;)Ut(s[Q])}else t.__e=a.__e;t.__k==null&&(t.__k=a.__k||[]),Y.then||da(t),F.__e(Y,t,a)}}else s==null&&t.__v==a.__v?(t.__k=a.__k,t.__e=a.__e):c=t.__e=Wn(a.__e,t,a,n,r,s,i,d,u);return(p=F.diffed)&&p(t),128&t.__u?void 0:c}function da(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(da))}function pa(e,t,a){for(var n=0;n<a.length;n++)At(a[n],a[++n],a[++n]);F.__c&&F.__c(t,e),e.some(function(r){try{e=r.__h,r.__h=[],e.some(function(s){s.call(r)})}catch(s){F.__e(s,r.__v)}})}function ma(e){return typeof e!="object"||e==null||e.__b>0?e:lt(e)?e.map(ma):e.constructor!==void 0?null:Se({},e)}function Wn(e,t,a,n,r,s,i,c,d){var u,p,f,l,m,_,v,w=a.props||rt,T=t.props,S=t.type;if(S=="svg"?r="http://www.w3.org/2000/svg":S=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s!=null){for(u=0;u<s.length;u++)if((m=s[u])&&"setAttribute"in m==!!S&&(S?m.localName==S:m.nodeType==3)){e=m,s[u]=null;break}}if(e==null){if(S==null)return document.createTextNode(T);e=document.createElementNS(r,S,T.is&&T),c&&(F.__m&&F.__m(t,s),c=!1),s=null}if(S==null)w===T||c&&e.data==T||(e.data=T);else{if(s=S=="textarea"&&T.defaultValue!=null?null:s&&it.call(e.childNodes),!c&&s!=null)for(w={},u=0;u<e.attributes.length;u++)w[(m=e.attributes[u]).name]=m.value;for(u in w)m=w[u],u=="dangerouslySetInnerHTML"?f=m:u=="children"||u in T||u=="value"&&"defaultValue"in T||u=="checked"&&"defaultChecked"in T||et(e,u,null,m,r);for(u in T)m=T[u],u=="children"?l=m:u=="dangerouslySetInnerHTML"?p=m:u=="value"?_=m:u=="checked"?v=m:c&&typeof m!="function"||w[u]===m||et(e,u,m,w[u],r);if(p)c||f&&(p.__html==f.__html||p.__html==e.innerHTML)||(e.innerHTML=p.__html),t.__k=[];else if(f&&(e.innerHTML=""),ca(t.type=="template"?e.content:e,lt(l)?l:[l],t,a,n,S=="foreignObject"?"http://www.w3.org/1999/xhtml":r,s,i,s?s[0]:a.__k&&ze(a,0),c,d),s!=null)for(u=s.length;u--;)Ut(s[u]);c&&S!="textarea"||(u="value",S=="progress"&&_==null?e.removeAttribute("value"):_!=null&&(_!==e[u]||S=="progress"&&!_||S=="option"&&_!=w[u])&&et(e,u,_,w[u],r),u="checked",v!=null&&v!=e[u]&&et(e,u,v,w[u],r))}return e}function At(e,t,a){try{if(typeof e=="function"){var n=typeof e.__u=="function";n&&e.__u(),n&&t==null||(e.__u=e(t))}else e.current=t}catch(r){F.__e(r,a)}}function fa(e,t,a){var n,r;if(F.unmount&&F.unmount(e),(n=e.ref)&&(n.current&&n.current!=e.__e||At(n,null,t)),(n=e.__c)!=null){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(s){F.__e(s,t)}n.base=n.__P=n.__n=null}if(n=e.__k)for(r=0;r<n.length;r++)n[r]&&fa(n[r],t,a||typeof e.type!="function");a||Ut(e.__e),e.__c=e.__=e.__e=void 0}function Zn(e,t,a){return this.constructor(e,a)}function _a(e,t,a){var n,r,s,i;t==document&&(t=document.documentElement),F.__&&F.__(e,t),r=(n=typeof a=="function")?null:a&&a.__k||t.__k,s=[],i=[],Lt(t,e=(!n&&a||t).__k=Dt(ct,null,[e]),r||rt,rt,t.namespaceURI,!n&&a?[a]:r?null:t.firstChild?it.call(t.childNodes):null,s,!n&&a?a:r?r.__e:t.firstChild,n,i),pa(s,e,i),e.props.children=null}it=st.slice,F={__e:function(e,t,a,n){for(var r,s,i;t=t.__;)if((r=t.__c)&&!r.__)try{if((s=r.constructor)&&s.getDerivedStateFromError!=null&&(r.setState(s.getDerivedStateFromError(e)),i=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(e,n||{}),i=r.__d),i)return r.__E=r}catch(c){e=c}throw e}},ra=0,Vn=function(e){return e!=null&&e.constructor===void 0},nt.prototype.setState=function(e,t){var a;a=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=Se({},this.state),typeof e=="function"&&(e=e(Se({},a),this.props)),e&&Se(a,e),e!=null&&this.__v&&(t&&this._sb.push(t),ta(this))},nt.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),ta(this))},nt.prototype.render=ct,Le=[],sa=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,oa=function(e,t){return e.__v.__b-t.__v.__b},ot.__r=0,Pt=Math.random().toString(8),tt="__d"+Pt,qe="__a"+Pt,ia=/(PointerCapture)$|Capture$/i,Et=0,Mt=na(!1),Rt=na(!0),Hn=0;var Ge,Z,It,ha,je=0,Sa=[],ee=F,ba=ee.__b,ga=ee.__r,$a=ee.diffed,va=ee.__c,ya=ee.unmount,wa=ee.__;function Bt(e,t){ee.__h&&ee.__h(Z,e,je||t),je=0;var a=Z.__H||(Z.__H={__:[],__h:[]});return e>=a.__.length&&a.__.push({}),a.__[e]}function b(e){return je=1,Jn(Pa,e)}function Jn(e,t,a){var n=Bt(Ge++,2);if(n.t=e,!n.__c&&(n.__=[a?a(t):Pa(void 0,t),function(c){var d=n.__N?n.__N[0]:n.__[0],u=n.t(d,c);d!==u&&(n.__N=[u,n.__[1]],n.__c.setState({}))}],n.__c=Z,!Z.__f)){var r=function(c,d,u){if(!n.__c.__H)return!0;var p=!1,f=n.__c.props!==c;if(n.__c.__H.__.some(function(m){if(m.__N){p=!0;var _=m.__[0];m.__=m.__N,m.__N=void 0,_!==m.__[0]&&(f=!0)}}),s){var l=s.call(this,c,d,u);return p?l||f:l}return!p||f};Z.__f=!0;var s=Z.shouldComponentUpdate,i=Z.componentWillUpdate;Z.componentWillUpdate=function(c,d,u){if(this.__e){var p=s;s=void 0,r(c,d,u),s=p}i&&i.call(this,c,d,u)},Z.shouldComponentUpdate=r}return n.__N||n.__}function M(e,t){var a=Bt(Ge++,3);!ee.__s&&Ta(a.__H,t)&&(a.__=e,a.u=t,Z.__H.__h.push(a))}function N(e){return je=5,ut(function(){return{current:e}},[])}function ut(e,t){var a=Bt(Ge++,7);return Ta(a.__H,t)&&(a.__=e(),a.__H=t,a.__h=e),a.__}function Ie(e,t){return je=8,ut(function(){return e},t)}function ka(){for(var e;e=Sa.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(Nt),t.__h.some(xa),t.__h=[]}catch(a){t.__h=[],ee.__e(a,e.__v)}}}ee.__b=function(e){Z=null,ba&&ba(e)},ee.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),wa&&wa(e,t)},ee.__r=function(e){ga&&ga(e),Ge=0;var t=(Z=e.__c).__H;t&&(It===Z?(t.__h=[],Z.__h=[],t.__.some(function(a){a.__N&&(a.__=a.__N),a.u=a.__N=void 0})):(t.__h.length&&ka(),Ge=0)),It=Z},ee.diffed=function(e){$a&&$a(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Sa.push(t)!==1&&ha===ee.requestAnimationFrame||((ha=ee.requestAnimationFrame)||Qn)(ka)),t.__H.__.some(function(a){a.u&&(a.__H=a.u,a.u=void 0)})),It=Z=null},ee.__c=function(e,t){t.some(function(a){try{a.__h.some(Nt),a.__h=a.__h.filter(function(n){return!n.__||xa(n)})}catch(n){t.some(function(r){r.__h&&(r.__h=[])}),t=[],ee.__e(n,a.__v)}}),va&&va(e,t)},ee.unmount=function(e){ya&&ya(e);var t,a=e.__c;a&&a.__H&&(a.__H.__.some(function(n){try{Nt(n)}catch(r){t=r}}),a.__H=void 0,t&&ee.__e(t,a.__v))};var Ca=typeof requestAnimationFrame=="function";function Qn(e){var t,a=function(){clearTimeout(n),Ca&&cancelAnimationFrame(t),setTimeout(e)},n=setTimeout(a,35);Ca&&(t=requestAnimationFrame(a))}function Nt(e){var t=Z,a=e.__c;typeof a=="function"&&(e.__c=void 0,a()),Z=t}function xa(e){var t=Z;e.__c=e.__(),Z=t}function Ta(e,t){return!e||e.length!==t.length||t.some(function(a,n){return a!==e[n]})}function Pa(e,t){return typeof t=="function"?t(e):t}var Ra=function(e,t,a,n){var r;t[0]=0;for(var s=1;s<t.length;s++){var i=t[s++],c=t[s]?(t[0]|=i?1:2,a[t[s++]]):t[++s];i===3?n[0]=c:i===4?n[1]=Object.assign(n[1]||{},c):i===5?(n[1]=n[1]||{})[t[++s]]=c:i===6?n[1][t[++s]]+=c+"":i?(r=e.apply(c,Ra(e,c,a,["",null])),n.push(r),c[0]?t[0]|=2:(t[s-2]=0,t[s]=r)):n.push(c)}return n},Ma=new Map;function Ea(e){var t=Ma.get(this);return t||(t=new Map,Ma.set(this,t)),(t=Ra(this,t.get(e)||(t.set(e,t=(function(a){for(var n,r,s=1,i="",c="",d=[0],u=function(l){s===1&&(l||(i=i.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?d.push(0,l,i):s===3&&(l||i)?(d.push(3,l,i),s=2):s===2&&i==="..."&&l?d.push(4,l,0):s===2&&i&&!l?d.push(5,0,!0,i):s>=5&&((i||!l&&s===5)&&(d.push(s,0,i,r),s=6),l&&(d.push(s,l,0,r),s=6)),i=""},p=0;p<a.length;p++){p&&(s===1&&u(),u(p));for(var f=0;f<a[p].length;f++)n=a[p][f],s===1?n==="<"?(u(),d=[d],s=3):i+=n:s===4?i==="--"&&n===">"?(s=1,i=""):i=n+i[0]:c?n===c?c="":i+=n:n==='"'||n==="'"?c=n:n===">"?(u(),s=1):s&&(n==="="?(s=5,r=i,i=""):n==="/"&&(s<5||a[p][f+1]===">")?(u(),s===3&&(d=d[0]),s=d,(d=d[0]).push(2,0,s),s=0):n===" "||n==="	"||n===`
`||n==="\r"?(u(),s=2):i+=n),s===3&&i==="!--"&&(s=4,d=d[0])}return u(),d})(e)),t),arguments,[])).length>1?t:t[0]}var o=Ea.bind(Dt);fe();function Da(e){let t=e,a=new Set;return{get:()=>t,set(n){t=n,a.forEach(r=>r(t))},update(n){this.set(n(t))},subscribe(n){return a.add(n),()=>a.delete(n)}}}function te(e){let[t,a]=b(e.get());return M(()=>e.subscribe(a),[e]),t}var B=Da({user:null,csrfToken:null,ready:!1}),pt=Da([]),er=0;function y(e,{actionLabel:t,onAction:a,timeoutMs:n=5e3}={}){let r=++er;return pt.update(s=>[...s,{id:r,message:e,actionLabel:t,onAction:a}]),n&&setTimeout(()=>mt(r),n),r}function mt(e){pt.update(t=>t.filter(a=>a.id!==e))}function Ke(e){try{return decodeURIComponent(e)}catch{return e}}function La(e){let t=Number(e.get("page")||1);return{sort:e.get("sort")||"uploaded_at_desc",game:e.get("game")||"",q:e.get("q")||"",page:Number.isFinite(t)?Math.max(1,t):1,...e.get("cursor")?{cursor:e.get("cursor")}:{}}}var tr=["login","resetPassword","public","publicLibrary","publicGame","publicUser","about","games"];function ft(e){return tr.includes(e)}function Aa(e,t){return!t&&!ft(e)}var ar={publicLibrary:"feed",publicGame:"feed",games:"games",library:"library",clip:"library",admin:"admin",profile:"profile"};function Ft(e){return ar[e?.name]||""}function Ia(e){return e?.name==="publicLibrary"&&e.surface==="search"?"search":Ft(e)}function We(e,t){let a=new URLSearchParams(t||""),n=e;return n.startsWith("/c/")?{name:"public",shareId:Ke(n.slice(3))}:n==="/"||n==="/public"||n==="/search"?{name:"publicLibrary",query:La(a),surface:n==="/search"?"search":"feed"}:n.startsWith("/game/")?{name:"publicGame",game:Ke(n.slice(6)),query:La(a)}:n==="/about"?{name:"about"}:n==="/games"?{name:"games"}:n.startsWith("/u/")?{name:"publicUser",username:Ke(n.slice(3))}:n==="/library"?{name:"library"}:n.startsWith("/clip/")?{name:"clip",clipId:Ke(n.slice(6))}:n==="/admin/game-categories"?{name:"admin",tab:"categories"}:n.startsWith("/admin/game-categories/")?{name:"admin",tab:"categories",categoryId:Ke(n.slice(23))}:n==="/admin"?{name:"admin",tab:a.get("tab")||"overview"}:n==="/account"?{name:"account"}:n==="/profile"?{name:"profile"}:n==="/login"?{name:"login"}:n==="/reset-password"?{name:"resetPassword",token:a.get("token")||"",invite:a.get("invite")==="1"}:{name:"publicLibrary"}}var Ot=new Set;function J(e){window.history.pushState({},"",e),Na()}function Na(){let{pathname:e,search:t}=window.location,a=We(e,t);Ot.forEach(n=>n(a))}typeof window<"u"&&window.addEventListener("popstate",Na);function Ba(){let[e,t]=b(()=>We(window.location.pathname,window.location.search));return M(()=>(Ot.add(t),()=>Ot.delete(t)),[]),e}function za(e){let t=e.target.closest("a[href^='/']");!t||t.target||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||(e.preventDefault(),J(t.getAttribute("href")))}var Fa={alert:'<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',arrowLeft:'<path d="m15 18-6-6 6-6"/><path d="M9 12h12"/>',clipboard:'<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',copy:'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',external:'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',fastForward:'<path d="m13 19 9-7-9-7v14Z"/><path d="m2 19 9-7-9-7v14Z"/>',film:'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/><path d="M3 8h4"/><path d="M3 16h4"/><path d="M17 8h4"/><path d="M17 16h4"/>',fullscreen:'<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',home:'<path d="m3 10 9-7 9 7"/><path d="M5 8.5V20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5"/><path d="M9 22V12h6v10"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',library:'<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',logOut:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',message:'<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',notepad:'<path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M6 4h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z"/><path d="M8 14h8"/><path d="M8 18h5"/>',pause:'<path d="M8 5v14"/><path d="M16 5v14"/>',play:'<path d="m8 5 11 7-11 7V5Z"/>',plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',check:'<path d="M20 6 9 17l-5-5"/>',refresh:'<path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/><path d="M3 12A9 9 0 0 1 18.5 5.7L21 8"/><path d="M21 3v5h-5"/>',rewind:'<path d="m11 19-9-7 9-7v14Z"/><path d="m22 19-9-7 9-7v14Z"/>',save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',server:'<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01"/><path d="M6 18h.01"/>',skipBack:'<path d="M19 20 9 12l10-8v16Z"/><path d="M5 19V5"/>',skipForward:'<path d="m5 4 10 8-10 8V4Z"/><path d="M19 5v14"/>',shield:'<path d="M20 13c0 5-3.5 7.5-7.7 8.8a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V5l8-3 8 3v8Z"/>',sliders:'<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M2 14h4"/><path d="M10 8h4"/><path d="M18 16h4"/>',theater:'<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M6 9h12"/><path d="M6 15h12"/>',trash:'<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="m19 6-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',volume2:'<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a9 9 0 0 1 0 14"/>',volumeX:'<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'};function C(e,{size:t=18}={}){return o`<svg viewBox="0 0 24 24" width=${t} height=${t} fill="none"
    stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true" dangerouslySetInnerHTML=${{__html:Fa[e]||""}} />`}function Vt(e){if(!e||typeof e!="string")return"";if(e.startsWith("/"))return e;try{let t=new URL(e,window.location.origin);if(t.origin===window.location.origin)return`${t.pathname}${t.search}`}catch{return""}return""}function nr(e){let t=Vt(e?.avatar_url);if(!t)return"";let a=e.updated_at||"";if(!a)return t;let n=t.includes("?")?"&":"?";return`${t}${n}v=${encodeURIComponent(a)}`}function rr(e){return(e||"C").trim().slice(0,1).toUpperCase()||"C"}function Ae({user:e,size:t=40,className:a=""}){let n=nr(e),r=`width:${t}px;height:${t}px;font-size:${Math.round(t*.4)}px`;if(n)return o`<img class=${`user-avatar ${a}`} style=${r} src=${n} alt="" />`;let s=e?.display_name||e?.username;return o`<div class=${`user-avatar user-avatar-fallback ${a}`} style=${r} aria-hidden="true">
    ${rr(s)}
  </div>`}function sr(e){return e?.query?.q||""}function or(e,t){let a=new URLSearchParams,n=String(t||"").trim(),r=e?.name==="publicGame"?e.game:e?.query?.game||"";n&&a.set("q",n),r&&a.set("game",r);let s=a.toString();return s?`/search?${s}`:"/search"}function Oa({active:e,route:t}){let{user:a}=te(B),[n,r]=b(!1),s=N(null),i=sr(t),[c,d]=b(i);M(()=>{d(i)},[i]);let u=a?.role==="admin"||a?.role==="owner";M(()=>{if(!n)return;let l=_=>{s.current?.contains(_.target)||r(!1)},m=_=>{_.key==="Escape"&&r(!1)};return document.addEventListener("pointerdown",l),document.addEventListener("keydown",m),()=>{document.removeEventListener("pointerdown",l),document.removeEventListener("keydown",m)}},[n]);let p=[["feed","/","Feed"],["library","/library","Library",!!a],["games","/games","Games"],["admin","/admin","Admin",u]].filter(([,,,l])=>l!==!1),f=l=>{l.preventDefault();let m=new FormData(l.target).get("q")?.toString()||"";J(or(t,m))};return o`<header class="topbar">
    <a class="wordmark" href="/" aria-label="Clipline home">
      <img src="/clipline-icon.svg" alt="" width="24" height="24" />
      <span class="wordmark-text">CLIP<span class="wordmark-accent">LINE</span></span>
    </a>
    <nav class="topnav" aria-label="Primary">
      ${p.map(([l,m,_])=>o`
        <a class=${l===e?"topnav-on":""} href=${m}>${_}</a>`)}
    </nav>
    <form class="topsearch" role="search" onSubmit=${f}>
      <input class="input" name="q" value=${c} onInput=${l=>d(l.target.value)}
        placeholder="Search clips, games, players…" aria-label="Search" />
    </form>
    ${a?o`<div class="avatar-wrap" ref=${s}>
          <button class="avatar-btn" aria-haspopup="menu" aria-expanded=${n}
            onClick=${()=>r(!n)}>
            <${Ae} user=${a} size=${28} />
          </button>
          ${n&&o`<div class="menu" role="menu" onClick=${()=>r(!1)}>
            <a role="menuitem" href="/profile">Profile</a>
            <a role="menuitem" href="/account">Account</a>
            ${u&&o`<a role="menuitem" href="/admin">Admin</a>`}
            <button role="menuitem" class="menu-danger" onClick=${ir}>Sign out</button>
          </div>`}
        </div>`:o`<a class="btn" href="/login">${C("lock",{size:14})} Sign in</a>`}
  </header>`}async function ir(){let{api:e,setCsrfToken:t}=await Promise.resolve().then(()=>(fe(),Ua));try{await e("/api/v1/auth/logout",{method:"POST"})}catch{}t(null),B.set({user:null,csrfToken:null,ready:!0}),J("/login")}var lr=[["feed","/","home","Feed",!0],["games","/games","globe","Games",!0],["library","/library","library","Library","auth"],["search","/search","search","Search",!0],["profile","/profile","user","Profile","auth"]];function cr(e){return lr.filter(([,,,,t])=>t!=="auth"||!!e)}function Va({active:e}){let{user:t}=te(B),a=cr(t);return o`<nav class="tabbar" aria-label="Primary">
    ${a.map(([n,r,s,i])=>o`
      <a class=${n===e?"tab-on":""} href=${r}>${C(s)}<span>${i}</span></a>`)}
  </nav>`}function Ha(){let e=te(pt);return o`<div class="toasts" role="status" aria-live="polite">
    ${e.map(t=>o`<div class="toast" key=${t.id}>
      <span>${t.message}</span>
      ${t.actionLabel&&o`<button class="toast-action"
        onClick=${()=>{t.onAction?.(),mt(t.id)}}>${t.actionLabel}</button>`}
      <button class="toast-x" aria-label="Dismiss" onClick=${()=>mt(t.id)}>✕</button>
    </div>`)}
  </div>`}fe();function Ne(e,t,a=null){let n=e!=null,[r,s]=b(()=>({key:e,data:a,error:null,loading:n}));M(()=>{if(!n){s({key:e,data:a,error:null,loading:!1});return}let c=new AbortController;return s({key:e,data:a,error:null,loading:!0}),Promise.resolve().then(()=>t(c.signal)).then(d=>{s(u=>u.key===e?{key:e,data:d,error:null,loading:!1}:u)}).catch(d=>{d?.name!=="AbortError"&&s(u=>u.key===e?{key:e,data:a,error:d,loading:!1}:u)}),()=>c.abort()},[e,t]);let i=Ie(c=>{s(d=>{if(d.key!==e)return d;let u=typeof c=="function"?c(d.data):c;return{...d,data:u}})},[e]);return r.key!==e?{data:a,error:null,loading:n,setData:i}:{data:r.data,error:r.error,loading:r.loading,setData:i}}function _e(e,t=0,a=null){let n=Ie(r=>x(e,{signal:r}),[e]);return Ne(`${e}\0${t}`,n,a)}function re(e){if(!e)return"Unknown";let t=new Date(e);return Number.isNaN(t.getTime())?"Unknown":new Intl.DateTimeFormat(void 0,{dateStyle:"medium",timeStyle:"short"}).format(t)}function Pe(e){if(e==null)return"Unknown";let t=Math.max(0,Math.round(Number(e)/1e3)),a=Math.floor(t/60),n=t%60;return`${a}:${String(n).padStart(2,"0")}`}function _t(e){if(!e)return"Unknown";let t=new Date(e);if(Number.isNaN(t.getTime()))return"Unknown";let a=Math.min(0,t.getTime()-Date.now()),n=[["year",365*24*60*60*1e3],["month",720*60*60*1e3],["week",10080*60*1e3],["day",1440*60*1e3],["hour",3600*1e3],["minute",60*1e3],["second",1e3]],[r,s]=n.find(([,c])=>Math.abs(a)>=c)||n[n.length-1],i=Math.round(a/s);return new Intl.RelativeTimeFormat(void 0,{numeric:"always"}).format(i,r)}function q(e){if(e==null)return"Unknown";let t=Number(e);if(!Number.isFinite(t))return"Unknown";let a=["B","KiB","MiB","GiB","TiB"],n=t,r=0;for(;n>=1024&&r<a.length-1;)n/=1024,r+=1;return`${n.toFixed(r===0?0:1)} ${a[r]}`}function Be(e){let t=Number(e||0),a=Number.isFinite(t)&&t>0?Math.floor(t):0;return`${new Intl.NumberFormat(void 0,{notation:a>=1e4?"compact":"standard"}).format(a)} view${a===1?"":"s"}`}function Me(e){return`/api/v1/public/clips/${encodeURIComponent(e.share_id)}/thumbnail`}function Ht(e){return`/api/v1/clips/${encodeURIComponent(e.id)}/thumbnail`}function ht(e){return`/api/v1/clips/${encodeURIComponent(e.id)}/media`}function qa(e){return`/api/v1/clips/${encodeURIComponent(e.id)}/poster`}function bt(e){return`/api/v1/public/clips/${encodeURIComponent(e.share_id)}/poster`}function Fe(e){return`/api/v1/public/clips/${encodeURIComponent(e.share_id)}/media`}function Ze(e,t,a){if(e)try{return`${t}${new URL(e).pathname}`}catch{}return a?`${t}/c/${encodeURIComponent(a)}`:null}var gt=null;function Ga(e){gt?.(),gt=e}function ja(e){gt===e&&(gt=null)}var ur=()=>window.matchMedia("(pointer: fine)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!navigator.connection?.saveData;function Ka({src:e,poster:t,alt:a=""}){let[n,r]=b(!1),[s,i]=b(0),c=N(null),d=N(null),u=N(!0),p=N(),f=()=>{u.current&&(clearTimeout(c.current),r(!1),i(0))};p.current=f;let l=()=>{!e||!ur()||(c.current=setTimeout(()=>{u.current&&(Ga(p.current),r(!0))},300))},m=_=>{let v=_.target;v.duration&&i(v.currentTime/v.duration)};return M(()=>()=>{u.current=!1,clearTimeout(c.current),ja(p.current)},[]),o`<span class="hover-preview" onPointerEnter=${l} onPointerLeave=${f}>
    ${n?o`<video ref=${d} src=${e} poster=${t} muted loop autoplay
          playsinline preload="none" onTimeUpdate=${m} />`:o`<img src=${t} alt=${a} loading="lazy" />`}
    ${n&&o`<span class="preview-scrub"><span style=${`width:${s*100}%`} /></span>`}
  </span>`}function qt(e){return e.owner?.display_name||e.owner?.username||e.owner_username||e.author_name||e.author_username||null}function Oe({clip:e,href:t,selectable:a=!1,selected:n=!1,onToggleSelect:r,showVisibility:s=!1,showAuthor:i=!1}){let c=qt(e),d=[e.game_name&&o`<em>${e.game_display_name||e.game_name}</em>`,i&&c,e.view_count!=null&&Be(e.view_count),e.uploaded_at&&_t(e.uploaded_at)].filter(Boolean);return o`<article class=${`clip-card ${n?"is-selected":""} ${a?"is-selectable":""}`}>
    <a class="card-thumb" href=${t} tabindex="-1" aria-hidden="true">
      <${Ka} src=${e.media_url} poster=${e.thumbnail_url} />
      ${e.duration_ms!=null&&o`<span class="dur-pill">${Pe(e.duration_ms)}</span>`}
      ${s&&o`<span class=${`badge badge-${e.visibility} card-vis`}>${e.visibility}</span>`}
    </a>
    ${a&&o`<label class="card-check">
      <input type="checkbox" checked=${n} aria-label=${`Select ${e.title}`}
        onChange=${()=>r?.(e.id)} />
    </label>`}
    <h3 class="card-title"><a href=${t}>${e.title}</a></h3>
    <p class="card-meta">${d.map((u,p)=>o`${p>0&&" \xB7 "}${u}`)}</p>
  </article>`}function se({name:e="film",title:t,body:a,action:n}){return o`<div class="empty">
    <div class="empty-icon">${C(e,{size:28})}</div>
    <h3>${t}</h3>
    ${a&&o`<p>${a}</p>`}
    ${n}
  </div>`}var dr=[["uploaded_at_desc","Uploaded newest"],["uploaded_at_asc","Uploaded oldest"],["recorded_at_desc","Recorded newest"],["recorded_at_asc","Recorded oldest"],["created_at_desc","Created newest"],["created_at_asc","Created oldest"],["duration_desc","Duration longest"],["duration_asc","Duration shortest"],["title_asc","Title A-Z"],["title_desc","Title Z-A"]],pr=6,mr=60,fr=/^[0-9A-HJKMNP-TV-Z]{26}$/i;function _r(e){return fr.test(String(e||"").trim())}function hr(e){let t=new URLSearchParams;return t.set("page_size",String(mr)),e.sort!=="uploaded_at_desc"&&t.set("sort",e.sort),e.game&&t.set(_r(e.game)?"game_category_id":"game",e.game),e.q&&t.set("q",e.q),Number(e.page)>1&&t.set("page",String(e.page)),e.cursor&&t.set("cursor",e.cursor),t}function Wa(e){return e?.game_display_name||e?.game_name||"No game"}function br(e,t,a=pr){let n=[...e||[]].sort((f,l)=>(l.clip_count||0)-(f.clip_count||0)),r=n.slice(0,a),s=String(t||"").trim(),i=s&&r.some(f=>f.category_id===s),c=s&&!i?n.find(f=>f.category_id===s)||{category_id:s,clip_count:0}:null,d=c?[c,...r]:r,u=new Set(d.map(f=>f.category_id)),p=n.filter(f=>!u.has(f.category_id)).length;return{chips:d,extraGameCount:p}}function jt({route:e}){let t={sort:"uploaded_at_desc",page:1,q:"",...e.query,game:e.name==="publicGame"?e.game:e.query?.game||""},a=JSON.stringify([t.sort,t.game,t.q]),n=N({key:a,pages:new Map});n.current.key!==a&&(n.current={key:a,pages:new Map});let r=Math.max(1,Number(t.page||1));t.cursor||(t.cursor=n.current.pages.get(r));let s=`/api/v1/public/clips?${hr(t)}`,{data:i,error:c}=_e(s),{data:d}=_e("/api/v1/public/games",0,{games:[]}),u=d?.games||[];i?.next_cursor&&n.current.pages.set(r+1,i.next_cursor);let p=w=>J(vr({...t,page:1,cursor:null,...w,...w.page?{cursor:n.current.pages.get(w.page)||null}:{}}));if(c)return o`<main class="page">
      <${se} name="alert" title="Couldn't load the feed" body=${c.message} />
    </main>`;let f=i?.clips,l=!!(t.game||t.q)||Number(t.page)>1,m=!l,{chips:_,extraGameCount:v}=br(u,t.game);return o`<main class="page">
    ${f==null?o`<${$r} />`:f.length===0?o`<${se} name="film"
          title=${l?"No clips match this filter":"No public clips yet"}
          body=${l?"Try a different game, search, or clear your filters.":"Clips shared as public from a library will show up here."}
          action=${l&&o`<a class="btn" href="/">Clear filters</a>`} />`:o`
        ${m?gr(f):""}
        <div class="feed-toolbar">
          <h2>Latest uploads</h2>
          <select class="input" value=${t.sort} onChange=${w=>p({sort:w.target.value})}>
            ${dr.map(([w,T])=>o`<option value=${w}>${T}</option>`)}
          </select>
          <div class="chips">
            <button class=${`chip ${t.game?"":"chip-on"}`} onClick=${()=>p({game:""})}>All</button>
            ${_.map(w=>o`<button
              class=${`chip ${t.game===w.category_id?"chip-on":""}`}
              onClick=${()=>p({game:w.category_id})}>${w.display_name}</button>`)}
            ${v>0&&o`<a class="chip" href="/games">+${v}</a>`}
          </div>
        </div>
        <div class="card-grid">
          ${(m?f.slice(4):f).map(w=>o`<${Oe} clip=${{...w,thumbnail_url:Me(w),media_url:Fe(w)}}
              href=${Gt(w)} showAuthor />`)}
        </div>
        ${yr(i,t,p)}
      `}
  </main>`}function gr(e){let[t,...a]=e,n=a.slice(0,3);return o`<p class="kicker">Now playing on this server</p>
    <section class="hero">
      <a class="hero-main" href=${Gt(t)}>
        <img src=${bt(t)} alt="" loading="lazy" />
        <span class="hero-caption">▶ ${t.title} — ${Wa(t)} · ${Pe(t.duration_ms)}</span>
      </a>
      <div class="hero-side">
        ${n.map(r=>o`<a class="hero-row" href=${Gt(r)}>
            <span class="hero-thumb">
              <img src=${Me(r)} alt="" loading="lazy" />
              <span class="dur-pill">${Pe(r.duration_ms)}</span>
            </span>
            <span class="hero-copy"><b>${r.title}</b>
              <small>${qt(r)} · ${Wa(r)} · ${Be(r.view_count)}</small></span>
          </a>`)}
      </div>
    </section>`}function $r({count:e=8}){return o`<div class="card-grid">
    ${Array.from({length:e},(t,a)=>o`<div class="clip-card" key=${a}>
      <div class="skeleton-thumb"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line is-short"></div>
    </div>`)}
  </div>`}function Gt(e){return`/c/${encodeURIComponent(e.share_id)}`}function vr({sort:e="uploaded_at_desc",game:t="",q:a="",page:n=1,cursor:r=null}={}){let s=new URLSearchParams,i=e||"uploaded_at_desc",c=String(t||"").trim(),d=String(a||"").trim();r&&Number(n)>1&&s.set("cursor",r);let u=Math.max(1,Number(n||1));if(i!=="uploaded_at_desc"&&s.set("sort",i),u>1&&s.set("page",String(u)),d)return s.set("q",d),c&&s.set("game",c),`/search?${s.toString()}`;if(c){let f=s.toString();return`/game/${encodeURIComponent(c)}${f?`?${f}`:""}`}let p=s.toString();return p?`/search?${p}`:"/"}function yr(e,t,a){let n=Math.max(1,Number(t.page||1)),r=!!e?.has_more;return n<=1&&!r?"":o`<nav class="pager" aria-label="Public clip pages">
    <button class="btn" type="button" disabled=${n<=1}
      onClick=${()=>a({page:n-1})}>Previous</button>
    <span class="muted">Page ${n}</span>
    <button class="btn" type="button" disabled=${!r}
      onClick=${()=>a({page:n+1})}>Next</button>
  </nav>`}function Za(){let{data:e,error:t}=_e("/api/v1/public/games"),a=e?.games??null;return t?o`<main class="page">
      <${se} name="alert" title="Couldn't load games" body=${t.message} />
    </main>`:o`<main class="page">
    <p class="kicker">Browse by game</p>
    ${a==null?o`<div class="game-grid">
          ${Array.from({length:6},(n,r)=>o`<div class="game-tile is-loading" key=${r}>
            <div class="skeleton-thumb"></div>
          </div>`)}
        </div>`:a.length===0?o`<${se} name="film" title="No games yet"
          body="Once clips are shared as public, their games will show up here." />`:o`<div class="game-grid">
          ${a.map(n=>o`<a class="game-tile" href=${`/game/${encodeURIComponent(n.category_id)}`}>
            ${n.thumbnail_url?o`<img src=${n.thumbnail_url} alt="" loading="lazy" />`:o`<div class="game-tile-fallback">${(n.display_name||"?")[0].toUpperCase()}</div>`}
            <div class="game-tile-body">
              <b>${n.display_name}</b>
              <small>${n.clip_count} clip${n.clip_count===1?"":"s"}</small>
            </div>
          </a>`)}
        </div>`}
  </main>`}fe();function Ja({trigger:e,content:t,onClose:a,label:n,panelClass:r=""}){let[s,i]=b(!1),c=N(null),d=N(null),u=N(null),p=()=>{i(!1),a?.()},f=()=>{if(s){p();return}u.current=document.activeElement,i(!0)};return M(()=>{if(!s)return;let l=v=>{c.current?.contains(v.target)||p()},m=v=>{v.key==="Escape"&&p()};return document.addEventListener("pointerdown",l),document.addEventListener("keydown",m),d.current?.querySelector("input, select, textarea, button, a[href], [tabindex]")?.focus(),()=>{document.removeEventListener("pointerdown",l),document.removeEventListener("keydown",m),u.current?.focus?.()}},[s]),o`<div class="popover-wrap" ref=${c}>
    ${e({open:s,toggle:f})}
    ${s&&o`<div class=${`popover ${r}`} ref=${d} role="dialog" aria-label=${n||"Filters"}>
      ${t}
    </div>`}
  </div>`}function Qa({count:e,busy:t=!1,onPublic:a,onPrivate:n,onCopyLinks:r,onDelete:s,onClear:i}){return e?o`<div class="bulkbar" role="toolbar" aria-label="Bulk actions" aria-busy=${t?"true":"false"}>
    <b>${e} selected</b>
    <button class="btn" disabled=${t} onClick=${a}>Make public</button>
    <button class="btn" disabled=${t} onClick=${n}>Make private</button>
    <button class="btn" disabled=${t} onClick=${r}>Copy links</button>
    <button class="btn btn-danger" disabled=${t} onClick=${s}>Delete</button>
    <button class="btn bulk-x" disabled=${t} aria-label="Clear selection" onClick=${i}>✕</button>
  </div>`:null}function he({open:e,title:t,body:a,confirmLabel:n="Confirm",onConfirm:r,onCancel:s,danger:i=!1,confirmDisabled:c=!1}){let d=N(null),u=N(null);return M(()=>{let p=d.current;p&&(e&&!p.open?(p.showModal(),u.current?.focus()):!e&&p.open&&p.close())},[e]),o`<dialog ref=${d} class="confirm-dialog" aria-labelledby="confirm-dialog-title"
    onCancel=${p=>{p.preventDefault(),s?.()}}
    onClose=${()=>e&&s?.()}>
    ${e&&o`<div class="confirm-dialog-body">
      <h2 id="confirm-dialog-title">${t}</h2>
      ${a&&o`<p>${a}</p>`}
      <div class="confirm-dialog-actions">
        <button type="button" class="btn" onClick=${s}>Cancel</button>
        <button type="button" ref=${u} class=${`btn ${i?"btn-danger":"btn-primary"}`}
          disabled=${c} onClick=${r}>${n}</button>
      </div>
    </div>`}
  </dialog>`}var Xa="clipline.libraryView",wr=[["uploaded_at_desc","Uploaded newest"],["uploaded_at_asc","Uploaded oldest"],["recorded_at_desc","Recorded newest"],["recorded_at_asc","Recorded oldest"],["updated_at_desc","Updated newest"],["updated_at_asc","Updated oldest"],["created_at_desc","Created newest"],["created_at_asc","Created oldest"],["duration_desc","Duration longest"],["duration_asc","Duration shortest"],["size_desc","Size largest"],["size_asc","Size smallest"],["title_asc","Title A-Z"],["title_desc","Title Z-A"]],$t={title:["title_asc","title_desc"],size:["size_asc","size_desc"],duration:["duration_asc","duration_desc"],uploaded:["uploaded_at_asc","uploaded_at_desc"]},kr=["visibility","status","source_type","from","to","min_duration_seconds","max_duration_seconds","min_size_mib","max_size_mib"],wt={sort:"uploaded_at_desc",page:1,game:"",source_type:"",visibility:"",status:"",q:"",from:"",to:"",min_duration_seconds:"",max_duration_seconds:"",min_size_mib:"",max_size_mib:""};function vt(e){if(e===""||e==null)return null;let t=Number(e);return Number.isFinite(t)?t:null}function Cr(e){let t=new URLSearchParams;t.set("sort",e.sort||wt.sort),t.set("page_size","100"),t.set("page",String(Math.max(1,Number(e.page||1)))),e.game&&t.set("game_category_id",e.game);for(let i of["source_type","visibility","status","q"])e[i]&&t.set(i,e[i]);e.from&&t.set("from",`${e.from}T00:00:00Z`),e.to&&t.set("to",`${e.to}T23:59:59Z`);let a=vt(e.min_duration_seconds);a!=null&&t.set("min_duration_ms",String(Math.round(a*1e3)));let n=vt(e.max_duration_seconds);n!=null&&t.set("max_duration_ms",String(Math.round(n*1e3)));let r=vt(e.min_size_mib);r!=null&&t.set("min_size_bytes",String(Math.round(r*1024*1024)));let s=vt(e.max_size_mib);return s!=null&&t.set("max_size_bytes",String(Math.round(s*1024*1024))),t}function Sr(e){return kr.reduce((t,a)=>t+(e[a]?1:0),0)}function xr(e,t=6){let a=new Map;for(let n of e){let r=n.game_category_id||n.game_name;if(!r)continue;let s=a.get(r)||{count:0,label:n.game_display_name||r,iconUrl:n.game_icon_url||null};s.count+=1,!s.iconUrl&&n.game_icon_url&&(s.iconUrl=n.game_icon_url),a.set(r,s)}return Array.from(a,([n,r])=>({game:n,count:r.count,label:r.label,...r.iconUrl?{icon_url:r.iconUrl}:{}})).sort((n,r)=>r.count-n.count||n.label.localeCompare(r.label)).slice(0,t)}function Ya(e,t,{verb:a,allFailedMessage:n}){let r=e.filter(i=>!t.some(c=>c.id===i));if(!t.length)return{succeeded:r,message:null};let s=t.length===e.length?t[0]?.message||n:`Couldn't ${a} ${t.length} of ${e.length} clips.`;return{succeeded:r,message:s}}function Tr(e,t){return(e||[]).map(a=>Ze(a.public_url,t,a.public_share_id)).filter(Boolean)}function Pr(){try{return localStorage.getItem(Xa)==="rows"?"rows":"grid"}catch{return"grid"}}function en(){let[e,t]=b(Pr),[a,n]=b(wt),[r,s]=b(wt.q),[i,c]=b(new Set),[d,u]=b(!1),[p,f]=b(!1),[l,m]=b(0),_=Cr(a),v=Math.max(1,Number(a.page||1)),w=new URLSearchParams(_);w.delete("page");let T=`${w}:${l}`,S=N({key:T,pages:new Map});S.current.key!==T&&(S.current={key:T,pages:new Map});let A=S.current.pages.get(v);A&&_.set("cursor",A);let G=`/api/v1/clips/page?${_}`,{data:U,error:D,setData:W}=_e(G,l);U?.next_cursor&&S.current.pages.set(v+1,U.next_cursor);let ie=new URLSearchParams(w);ie.delete("sort"),ie.delete("page_size");let Q=`/api/v1/clips/totals?${ie}`,L=N(new Map),Y=Ie(async $=>{let P=L.current.get(Q);if(P&&P.tick===l&&Date.now()-P.at<3e4)return P.data;let I=await x(Q,{signal:$});return $.aborted||(L.current.size>=20&&L.current.clear(),L.current.set(Q,{at:Date.now(),tick:l,data:I})),I},[Q,l]),{data:be,error:ve}=Ne(`${Q}:${l}:${v}`,Y),oe=U&&{...U,total:be?.total,total_size_bytes:be?.total_size_bytes},ye=N(!1),pe=N(null);M(()=>()=>clearTimeout(pe.current),[]),M(()=>c(new Set),[G,l]);let ae=$=>{t($);try{localStorage.setItem(Xa,$)}catch{}},ce=()=>m($=>$+1),me=$=>{ye.current=$,u($)},we=$=>{let P=$.target.value;s(P),clearTimeout(pe.current),pe.current=setTimeout(()=>{n(I=>({...I,q:P,page:1}))},300)},j=$=>P=>{let I=P.target.value;n(z=>({...z,[$]:I,page:1}))},Re=()=>{n($=>({...$,page:1,visibility:"",status:"",source_type:"",from:"",to:"",min_duration_seconds:"",max_duration_seconds:"",min_size_mib:"",max_size_mib:""}))},ue=$=>n(P=>({...P,game:P.game===$?"":$,page:1})),Ce=$=>n(P=>({...P,sort:$,page:1})),Ee=$=>n(P=>({...P,page:Math.max(1,$)})),Ue=$=>{c(P=>{let I=new Set(P);return I.has($)?I.delete($):I.add($),I})};function ge($,P){W(I=>I&&{...I,clips:I.clips.map(z=>z.id===$?{...z,...P}:z)})}function k($,P){let I=new Set($);W(z=>z&&{...z,clips:z.clips.map(X=>I.has(X.id)?{...X,...P}:X)})}async function g($){if(ye.current)return;let P=Array.from(i);if(!P.length)return;let I=oe?.clips||[],z=new Map(P.map(K=>[K,I.find(H=>H.id===K)]));me(!0),k(P,{visibility:$});let X=[],$e=new Map;try{try{let ke=await x("/api/v1/clips/bulk-visibility",{method:"POST",body:{ids:P,visibility:$}});for(let ne of ke.clips){let Xt={visibility:ne.visibility,public_url:ne.public_url,public_share_id:ne.public_share_id};ge(ne.id,Xt),$e.set(ne.id,Xt)}}catch(ke){X.push(...P.map(ne=>({id:ne,message:ke.message})))}let{succeeded:K,message:H}=Ya(P,X,{verb:"update",allFailedMessage:"Couldn't update visibility."});if(H){for(let{id:ke}of X){let ne=z.get(ke);ne&&ge(ke,{visibility:ne.visibility,public_url:ne.public_url,public_share_id:ne.public_share_id})}y(H)}K.length&&(ce(),c(new Set),y(`Made ${K.length} clip${K.length===1?"":"s"} ${$}`,{actionLabel:"Undo",onAction:()=>E(K,z,$e)}))}finally{me(!1)}}async function E($,P,I){if(ye.current){y("Wait for visibility changes to finish.");return}me(!0);try{for(let K of $){let H=P.get(K);H&&ge(K,{visibility:H.visibility,public_url:H.public_url,public_share_id:H.public_share_id})}let z=[],X=new Map;for(let K of $){let H=P.get(K)?.visibility;H&&(X.has(H)||X.set(H,[]),X.get(H).push(K))}await Promise.all(Array.from(X,async([K,H])=>{try{let ke=await x("/api/v1/clips/bulk-visibility",{method:"POST",body:{ids:H,visibility:K}});for(let ne of ke.clips)ge(ne.id,{visibility:ne.visibility,public_url:ne.public_url,public_share_id:ne.public_share_id})}catch(ke){z.push(...H.map(ne=>({id:ne,message:ke.message})))}})),z.length<$.length&&ce();let{message:$e}=Ya($,z,{verb:"undo",allFailedMessage:"Couldn't undo visibility change."});if($e){for(let{id:K}of z){let H=I.get(K);H&&ge(K,H)}y($e)}}finally{me(!1)}}async function O(){if(ye.current){y("Wait for visibility changes to finish.");return}let $=Array.from(i),P=oe?.clips||[],I=$.map($e=>P.find(K=>K.id===$e)).filter(Boolean),z=Tr(I,window.location.origin),X=I.length-z.length;if(!z.length){y("No links to copy \u2014 selected clips are private.");return}try{await navigator.clipboard.writeText(z.join(`
`)),y(`Copied ${z.length} link${z.length===1?"":"s"}`+(X?` (${X} skipped, private)`:""))}catch{y("Couldn't copy links to clipboard.")}}async function de(){let $=Array.from(i);f(!1);try{let P=await x("/api/v1/clips/bulk-delete",{method:"POST",body:{ids:$}});c(new Set),ce(),y(`Deleted ${P.affected} clip${P.affected===1?"":"s"}.`)}catch(P){y(P.message)}}if(D)return o`<main class="page">
      <${se} name="alert" title="Couldn't load your library" body=${D.message} />
    </main>`;let h=oe?.clips,R=Sr(a),V=!!(a.q||a.game)||R>0,Ve=xr(h||[]),He=Number(oe?.total||0),Qe=Number(oe?.total_size_bytes||0),De=Number(oe?.page||a.page||1),Ye=De>1||!!oe?.has_more,Xe=o`<div class="popover-fields">
    <label class="field"><span>Visibility</span>
      <select class="input" value=${a.visibility} onChange=${j("visibility")}>
        <option value="">Any</option>
        <option value="private">Private</option>
        <option value="public">Public</option>
        <option value="unlisted">Unlisted</option>
      </select>
    </label>
    <label class="field"><span>Status</span>
      <select class="input" value=${a.status} onChange=${j("status")}>
        <option value="">Any</option>
        <option value="created">Created</option>
        <option value="uploading">Uploading</option>
        <option value="processing">Processing</option>
        <option value="ready">Ready</option>
        <option value="failed">Failed</option>
      </select>
    </label>
    <label class="field"><span>Source</span>
      <input class="input" type="text" value=${a.source_type} onInput=${j("source_type")} placeholder="Source type" />
    </label>
    <label class="field"><span>From</span>
      <input class="input" type="date" value=${a.from} onInput=${j("from")} />
    </label>
    <label class="field"><span>To</span>
      <input class="input" type="date" value=${a.to} onInput=${j("to")} />
    </label>
    <label class="field"><span>Min duration (s)</span>
      <input class="input" type="number" min="0" value=${a.min_duration_seconds} onInput=${j("min_duration_seconds")} />
    </label>
    <label class="field"><span>Max duration (s)</span>
      <input class="input" type="number" min="0" value=${a.max_duration_seconds} onInput=${j("max_duration_seconds")} />
    </label>
    <label class="field"><span>Min size (MiB)</span>
      <input class="input" type="number" min="0" step="0.1" value=${a.min_size_mib} onInput=${j("min_size_mib")} />
    </label>
    <label class="field"><span>Max size (MiB)</span>
      <input class="input" type="number" min="0" step="0.1" value=${a.max_size_mib} onInput=${j("max_size_mib")} />
    </label>
    <div class="popover-actions">
      <button type="button" class="btn" onClick=${Re}>Clear filters</button>
    </div>
  </div>`;return o`<main class="page">
    <div class="lib-header">
      <div>
        <h1>Library</h1>
        <p>${be?`${He} clip${He===1?"":"s"} \xB7 ${q(Qe)} used`:ve?"Totals unavailable":"Loading totals\u2026"}</p>
      </div>
      <div class="seg" role="group" aria-label="View">
        <button type="button" class=${`seg-item ${e==="grid"?"seg-on":""}`}
          aria-pressed=${e==="grid"} onClick=${()=>ae("grid")}>Grid</button>
        <button type="button" class=${`seg-item ${e==="rows"?"seg-on":""}`}
          aria-pressed=${e==="rows"} onClick=${()=>ae("rows")}>Rows</button>
      </div>
    </div>

    <div class="lib-toolbar">
      <input class="input" type="search" aria-label="Search clips" placeholder="Search title or game"
        value=${r} onInput=${we} />
      <select class="input" aria-label="Sort" value=${a.sort} onChange=${$=>Ce($.target.value)}>
        ${wr.map(([$,P])=>o`<option value=${$}>${P}</option>`)}
      </select>
      <${Ja}
        label="Filters"
        panelClass="popover-filters"
        trigger=${({open:$,toggle:P})=>o`<button type="button" class="btn" aria-haspopup="dialog"
          aria-expanded=${$} onClick=${P}>
          ${C("sliders",{size:14})} Filters
          ${R>0&&o`<span class="filter-badge">${R}</span>`}
        </button>`}
        content=${Xe} />
    </div>

    ${Ve.length>0&&o`<div class="lib-chips">
      <button type="button" class=${`chip ${a.game?"":"chip-on"}`} aria-pressed=${!a.game}
        onClick=${()=>ue("")}>All</button>
      ${Ve.map($=>o`<button type="button" class=${`chip game-filter-chip ${$.icon_url?"has-icon":""} ${a.game===$.game?"chip-on":""}`}
        aria-label=${`Filter by ${$.label}`} title=${$.label}
        aria-pressed=${a.game===$.game} onClick=${()=>ue($.game)}>
        ${$.icon_url?o`<img src=${$.icon_url} alt="" loading="lazy" />`:$.label}
      </button>`)}
    </div>`}

    ${h==null?o`<${Rr} />`:h.length===0?V?o`<${se} name="film" title="No clips match this view"
            body="Try a different search, game, or clear your filters."
            action=${o`<button type="button" class="btn" onClick=${()=>{n(wt),s("")}}>Clear filters</button>`} />`:o`<${se} name="upload" title="Connect the Clipline desktop app to start uploading"
            body="New clips uploaded from the desktop app will show up here."
            action=${o`<a class="btn" href="/about">Learn more</a>`} />`:e==="grid"?o`<div class=${`card-grid ${i.size>0?"selecting":""}`}>
          ${h.map($=>o`<${Oe} key=${$.id}
            clip=${{...$,thumbnail_url:Ht($),media_url:ht($)}}
            href=${`/clip/${encodeURIComponent($.id)}`}
            selectable selected=${i.has($.id)} onToggleSelect=${Ue} showVisibility />`)}
        </div>`:o`<${Mr} clips=${h} query=${a} onSort=${Ce}
          selected=${i} onToggleSelect=${Ue} />`}

    ${Ye&&o`<nav class="pager" aria-label="Library pages">
      <button type="button" class="btn" disabled=${De<=1}
        onClick=${()=>Ee(De-1)}>Previous</button>
      <span>Page ${De}</span>
      <button type="button" class="btn" disabled=${!oe?.has_more}
        onClick=${()=>Ee(De+1)}>Next</button>
    </nav>`}

    <${Qa} count=${i.size} busy=${d}
      onPublic=${()=>g("public")}
      onPrivate=${()=>g("private")}
      onCopyLinks=${O}
      onDelete=${()=>f(!0)}
      onClear=${()=>c(new Set)} />

    <${he} open=${p}
      title=${`Delete ${i.size} clip${i.size===1?"":"s"}?`}
      body="Public links stop working immediately."
      confirmLabel="Delete" danger
      onConfirm=${de}
      onCancel=${()=>f(!1)} />
  </main>`}function yt(e,[t,a]){let n=e.sort===t?"ascending":e.sort===a?"descending":"none",r=e.sort===a?t:a;return{ariaSort:n,next:r}}function Mr({clips:e,query:t,onSort:a,selected:n,onToggleSelect:r}){let s=yt(t,$t.title),i=yt(t,$t.size),c=yt(t,$t.duration),d=yt(t,$t.uploaded);return o`<table class="lib-table">
    <thead>
      <tr>
        <th class="row-select-cell"></th>
        <th></th>
        <th aria-sort=${s.ariaSort}><button type="button" class="sort-btn" onClick=${()=>a(s.next)}>Title</button></th>
        <th>Game</th>
        <th>Visibility</th>
        <th aria-sort=${i.ariaSort}><button type="button" class="sort-btn" onClick=${()=>a(i.next)}>Size</button></th>
        <th aria-sort=${c.ariaSort}><button type="button" class="sort-btn" onClick=${()=>a(c.next)}>Duration</button></th>
        <th aria-sort=${d.ariaSort}><button type="button" class="sort-btn" onClick=${()=>a(d.next)}>Uploaded</button></th>
      </tr>
    </thead>
    <tbody>
      ${e.map(u=>o`<tr key=${u.id} class=${n?.has(u.id)?"is-selected":""}>
        <td class="row-select-cell">
          <input class="row-select" type="checkbox" checked=${n?.has(u.id)}
            aria-label=${`Select ${u.title}`} onChange=${()=>r?.(u.id)} />
        </td>
        <td><img class="row-thumb" src=${Ht(u)} alt="" width="64" height="36" loading="lazy" /></td>
        <td><a href=${`/clip/${encodeURIComponent(u.id)}`}>${u.title}</a></td>
        <td>${u.game_display_name||u.game_name||"\u2014"}</td>
        <td><span class=${`badge badge-${u.visibility}`}>${u.visibility}</span></td>
        <td>${q(u.file_size_bytes)}</td>
        <td>${Pe(u.duration_ms)}</td>
        <td>${re(u.uploaded_at)}</td>
      </tr>`)}
    </tbody>
  </table>`}function Rr({count:e=8}){return o`<div class="card-grid">
    ${Array.from({length:e},(t,a)=>o`<div class="clip-card" key=${a}>
      <div class="skeleton-thumb"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line is-short"></div>
    </div>`)}
  </div>`}fe();function an(e){let t=Number(e);return Number.isFinite(t)&&t>0?t/1e3:0}function nn(e,t){let a=Number.isFinite(e)?e:0,n=t>0?t:Number.MAX_SAFE_INTEGER;return Math.max(0,Math.min(n,a))}function kt(e,t){return t>0?Math.max(0,Math.min(100,e/t*100)):0}function Kt(e){if(!Number.isFinite(e))return"0:00";let t=Math.max(0,Math.round(e)),a=Math.floor(t/60),n=t-a*60;return`${a}:${String(n).padStart(2,"0")}`}function tn(e){if(!Number.isFinite(e))return"0:00.0";let t=Math.max(0,Math.round(e*10)),a=Math.floor(t/600),n=t-a*600,r=Math.floor(n/10);return`${a}:${String(r).padStart(2,"0")}.${n%10}`}function rn(e,t){return`${tn(e)} / ${t>0?tn(t):"0:00.0"}`}function sn(e,t){return(e||[]).map((a,n)=>{let r=Number(a.timestamp_ms);if(!Number.isFinite(r))return null;let s=r/1e3;return s<0||t>0&&s>t?null:{index:n,time:s,label:String(a.label||a.kind||"Marker")}}).filter(Boolean).sort((a,n)=>a.time-n.time)}function on(e,t){if(!e.length)return null;for(let a of e)if(a.time>t+.05)return a;return e[0]}function ln(e,t){if(!e.length)return null;for(let a=e.length-1;a>=0;a-=1)if(e[a].time<t-.05)return e[a];return e[e.length-1]}var un="clipline.playerVolume",dn="clipline.clipTheaterMode",Er=2e3,Ur=[.25,.5,.75,1,1.25,1.5,2];function Dr(e,t){switch(e){case"Space":case"KeyK":return{kind:"toggle-play"};case"ArrowLeft":return{kind:"seek-by",seconds:t?-1:-5};case"ArrowRight":return{kind:"seek-by",seconds:t?1:5};case"KeyJ":return{kind:"seek-by",seconds:-10};case"KeyL":return{kind:"seek-by",seconds:10};case"Comma":return{kind:"seek-by",seconds:-.1};case"Period":return{kind:"seek-by",seconds:.1};case"KeyM":return{kind:"toggle-mute"};case"Home":return{kind:"seek-to",seconds:0};case"End":return{kind:"seek-to-end"};case"KeyF":case"KeyT":return{kind:"theater"};case"Escape":return{kind:"exit-theater"};default:return null}}function Lr(e){return e instanceof Element?!!e.closest("input, textarea, select, button, a, [contenteditable='true'], [contenteditable='']"):!1}function Ar(){try{let e=window.localStorage.getItem(un);if(e==null)return 1;let t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):1}catch{return 1}}async function Ir(e,{isCancelled:t,onMuted:a,onError:n}={}){let r=t||(()=>!1);if(!r()){try{await e.play();return}catch{if(r()||!e.paused)return}e.muted=!0,a?.();try{await e.play()}catch(s){r()||n?.(s)}}}function cn(e){try{window.localStorage.setItem(un,String(Math.max(0,Math.min(1,e))))}catch{}}function Nr(){try{return window.localStorage.getItem(dn)==="true"}catch{return!1}}function Br(e){try{window.localStorage.setItem(dn,String(e))}catch{}}function pn({src:e,poster:t,durationMs:a,markers:n}){let r=N(null),s=N(null),i=N(null),c=N(!1),d=N(!1),u=an(a),[p,f]=b(!1),[l,m]=b(0),[_,v]=b(u),[w,T]=b(0),[S,A]=b(Ar),[G,U]=b(!1),[D,W]=b(1),[ie,Q]=b(!1),[L,Y]=b(Nr),[be,ve]=b(!0),[oe,ye]=b(null),[pe,ae]=b(""),ce=sn(n,_);function me(){ve(!0),window.clearTimeout(i.current),i.current=window.setTimeout(()=>{let h=r.current;h&&!h.paused&&!h.ended&&ve(!1)},Er)}M(()=>{p||(window.clearTimeout(i.current),ve(!0))},[p]),M(()=>{let h=r.current;if(!h)return;let R=()=>Number.isFinite(h.duration)&&h.duration>0?h.duration:u,V=()=>v(R()),Ve=()=>v(R()),He=()=>{c.current||m(h.currentTime||0)},Qe=()=>{let I=R();if(!(I>0)||!h.buffered?.length){T(0);return}let z=h.currentTime||0,X=0;for(let $e=0;$e<h.buffered.length;$e+=1){let K=h.buffered.start($e),H=h.buffered.end($e);if(z>=K&&z<=H){X=H;break}X=Math.max(X,H)}T(kt(X,I))},De=()=>{f(!0),ae(""),me()},Ye=()=>f(!1),Xe=()=>f(!1),$=()=>{A(h.volume),U(h.muted||h.volume===0)},P=()=>ae("Playback unavailable");return h.addEventListener("loadedmetadata",V),h.addEventListener("durationchange",Ve),h.addEventListener("timeupdate",He),h.addEventListener("progress",Qe),h.addEventListener("play",De),h.addEventListener("pause",Ye),h.addEventListener("ended",Xe),h.addEventListener("volumechange",$),h.addEventListener("error",P),()=>{h.removeEventListener("loadedmetadata",V),h.removeEventListener("durationchange",Ve),h.removeEventListener("timeupdate",He),h.removeEventListener("progress",Qe),h.removeEventListener("play",De),h.removeEventListener("pause",Ye),h.removeEventListener("ended",Xe),h.removeEventListener("volumechange",$),h.removeEventListener("error",P)}},[e,u]),M(()=>{r.current&&(r.current.volume=S)},[S]),M(()=>{r.current&&(r.current.muted=G)},[G]),M(()=>{r.current&&(r.current.playbackRate=D)},[D]),M(()=>{let h=r.current;if(!h)return;let R=!1;return Ir(h,{isCancelled:()=>R,onMuted:()=>U(!0),onError:V=>ae(V?.message||"Playback unavailable")}),()=>{R=!0}},[e]),M(()=>{let h=document.documentElement;return h.classList.toggle("clipline-theater",L),()=>h.classList.remove("clipline-theater")},[L]);function we(h){Y(h),Br(h)}function j(h){let R=r.current;if(!R)return;let V=_>0?nn(h,_):Math.max(0,h);R.currentTime=V,m(V)}function Re(h){j((r.current?.currentTime||0)+h)}async function ue(){let h=r.current;if(h)if(h.paused||h.ended)try{await h.play()}catch(R){ae(R?.message||"Playback failed")}else h.pause()}function Ce(){let h=r.current;h&&(h.muted||h.volume===0?(h.muted=!1,h.volume===0&&(h.volume=1,A(1),cn(1)),U(!1)):(h.muted=!0,U(!0)))}function Ee(h){let R=Number(h.target.value);A(R),U(R===0),cn(R);let V=r.current;V&&(V.volume=R,V.muted=R===0)}async function Ue(){try{document.fullscreenElement?await document.exitFullscreen():await s.current?.requestFullscreen?.()}catch(h){ae(h?.message||"Fullscreen unavailable")}}function ge(h){let R=r.current?.currentTime||0,V=h>0?on(ce,R):ln(ce,R);V&&j(V.time)}function k(){c.current=!0,d.current=p,p&&r.current?.pause()}function g(h){let R=Number(h.target.value);m(R),j(R)}function E(){c.current&&(c.current=!1,d.current&&(d.current=!1,r.current?.play().catch(()=>{})))}function O(h){let R=h.currentTarget.getBoundingClientRect();if(!(R.width>0))return;let V=Math.max(0,Math.min(1,(h.clientX-R.left)/R.width));ye({pct:V*100,time:V*(_||0)})}function de(){ye(null)}return M(()=>{function h(R){if(R.defaultPrevented||Lr(R.target))return;let V=Dr(R.code,R.shiftKey);if(V&&!(V.kind==="exit-theater"&&!L))switch(R.preventDefault(),me(),V.kind){case"toggle-play":ue();break;case"seek-by":Re(V.seconds);break;case"seek-to":j(V.seconds);break;case"seek-to-end":j(_);break;case"toggle-mute":Ce();break;case"theater":we(!L);break;case"exit-theater":we(!1);break}}return document.addEventListener("keydown",h),()=>document.removeEventListener("keydown",h)},[_,L,p]),o`<div class=${`player ${be?"":"chrome-hidden"}`} ref=${s}
      onPointerMove=${me} onPointerEnter=${me}
      onPointerLeave=${()=>{let h=r.current;h&&!h.paused&&ve(!1)}}
      onFocusIn=${()=>ve(!0)}>
    <video ref=${r} class="player-video" src=${e} poster=${t||void 0}
      preload="metadata" playsinline onClick=${ue}></video>
    ${pe&&o`<div class="player-note">${pe}</div>`}
    <div class="player-overlay">
      <div class="player-timeline" onPointerMove=${O} onPointerLeave=${de}>
        <div class="player-buffered" style=${`width:${w}%`}></div>
        <div class="player-progress" style=${`width:${kt(l,_)}%`}></div>
        ${ce.map(h=>o`<span class="player-marker-tick" key=${h.index}
            style=${`left:${kt(h.time,_)}%`} title=${`${h.label} @ ${Kt(h.time)}`}></span>`)}
        <input class="player-scrubber" type="range" min="0" max=${_>0?_:0} step="0.01"
          value=${l} disabled=${!(_>0)} aria-label="Seek"
          onPointerDown=${k} onInput=${g} onChange=${E}
          onPointerUp=${E} onPointerCancel=${E} onLostPointerCapture=${E} />
        ${oe&&o`<div class="player-hover-time" style=${`left:${oe.pct}%`}>${Kt(oe.time)}</div>`}
      </div>
      <div class="player-controls">
        ${ce.length>0&&o`<div class="player-cluster">
          <button type="button" class="player-btn" title="Previous marker" aria-label="Previous marker"
            onClick=${()=>ge(-1)}>${C("skipBack",{size:14})}</button>
          <button type="button" class="player-btn" title="Next marker" aria-label="Next marker"
            onClick=${()=>ge(1)}>${C("skipForward",{size:14})}</button>
        </div>`}
        <button type="button" class="player-btn player-play" aria-label=${p?"Pause":"Play"} onClick=${ue}>
          ${C(p?"pause":"play",{size:16})}
        </button>
        <span class="player-time">${rn(l,_)}</span>
        <div class="player-spacer"></div>
        <div class="player-speed-wrap">
          <button type="button" class="player-btn player-speed" aria-haspopup="menu" aria-expanded=${ie}
            onClick=${()=>Q(h=>!h)}>${D}×</button>
          ${ie&&o`<div class="player-speed-menu" role="menu">
            ${Ur.map(h=>o`<button type="button" role="menuitem" key=${h}
                class=${`player-speed-item ${h===D?"is-active":""}`}
                onClick=${()=>{W(h),Q(!1)}}>${h}×</button>`)}
          </div>`}
        </div>
        <button type="button" class="player-btn" aria-label=${G?"Unmute":"Mute"} onClick=${Ce}>
          ${C(G?"volumeX":"volume2",{size:14})}
        </button>
        <input class="player-volume" type="range" min="0" max="1" step="0.01" value=${G?0:S}
          aria-label="Volume" onInput=${Ee} />
        <button type="button" class="player-btn" aria-label=${L?"Exit theater mode":"Theater mode"}
          aria-pressed=${L} onClick=${()=>we(!L)}>${C("theater",{size:14})}</button>
        <button type="button" class="player-btn" aria-label="Fullscreen" onClick=${Ue}>
          ${C("fullscreen",{size:14})}
        </button>
      </div>
    </div>
  </div>`}fe();function zr(e){let t=new Map(e.map(s=>[s.id,s])),a=new Map,n=[],r=0;return e.forEach(s=>{let i=s.parent_comment_id||"";i&&t.has(i)?(a.has(i)||a.set(i,[]),a.get(i).push(s),r+=1):i||(n.push(s),r+=1)}),{roots:n,repliesByParent:a,count:r}}async function Fr({apiClient:e=x,shareId:t,body:a,parentCommentId:n,onReload:r=()=>{},onError:s=y}){let i=a.trim();if(!i)return!1;try{return await e(`/api/v1/public/clips/${encodeURIComponent(t)}/comments`,{method:"POST",body:n?{body:i,parent_comment_id:n}:{body:i}}),r(),!0}catch(c){return s(c.message),!1}}function Or(e){return(e||"?").trim().slice(0,1).toUpperCase()||"?"}function Vr(e){let t=Vt(e.author_avatar_url);return t?o`<img class="comment-avatar" src=${t} alt="" />`:o`<div class="comment-avatar">${Or(e.author_name)}</div>`}function mn({shareId:e}){let{user:t}=te(B),[a,n]=b(0),[r,s]=b(""),[i,c]=b(null),[d,u]=b(""),[p,f]=b(null),l=`/api/v1/public/clips/${encodeURIComponent(e)}/comments`,{data:m,error:_}=_e(l,a),v=_?[]:m?.comments??null;function w(){n(D=>D+1)}async function T(D,W){return Fr({shareId:e,body:D,parentCommentId:W,onReload:w,onError:y})}async function S(D){D.preventDefault(),await T(r)&&s("")}async function A(D,W){D.preventDefault(),await T(d,W)&&(u(""),c(null))}async function G(){let D=p;f(null);try{await x(`/api/v1/public/clips/${encodeURIComponent(e)}/comments/${encodeURIComponent(D)}`,{method:"DELETE"}),w()}catch(W){y(W.message)}}let U=zr(v||[]);return o`<section class="comments">
    <div class="comments-header"><h2>Comments</h2><span class="muted">${U.count}</span></div>
    ${t?o`<form class="comment-form" onSubmit=${S}>
          <textarea rows="3" maxlength="2000" placeholder="Add a comment" value=${r}
            onInput=${D=>s(D.target.value)}></textarea>
          <div class="comment-form-actions">
            <button type="submit" class="btn btn-primary">${C("message",{size:14})} Post comment</button>
          </div>
        </form>`:o`<p class="comment-signin"><a href="/login">Sign in</a> to comment.</p>`}
    ${v==null?"":U.count===0?o`<p class="comment-signin">No comments yet.</p>`:o`<div class="comment-list">
          ${U.roots.map(D=>fn(D,{depth:0,repliesByParent:U.repliesByParent,user:t,replyOpenId:i,setReplyOpenId:c,replyDraft:d,setReplyDraft:u,submitReply:A,onDelete:f}))}
        </div>`}
    <${he} open=${p!=null} title="Delete this comment?"
      body="This removes the comment from the public clip page." confirmLabel="Delete" danger
      onConfirm=${G} onCancel=${()=>f(null)} />
  </section>`}function fn(e,t){let{depth:a,repliesByParent:n,user:r,replyOpenId:s,setReplyOpenId:i,replyDraft:c,setReplyDraft:d,submitReply:u,onDelete:p}=t,f=n.get(e.id)||[];return o`<article class="comment" key=${e.id}>
    ${Vr(e)}
    <div class="comment-body">
      <div class="comment-head">
        ${e.author_username?o`<a href=${`/u/${encodeURIComponent(e.author_username)}`}>${e.author_name}</a>`:o`<strong>${e.author_name}</strong>`}
        ${e.is_uploader&&o`<span class="comment-badge">Uploader</span>`}
        <span>${_t(e.created_at)}</span>
        <div class="comment-actions">
          ${r&&a===0&&o`<button type="button" class="comment-action"
            onClick=${()=>i(s===e.id?null:e.id)}>
            ${C("message",{size:12})} Reply</button>`}
          ${e.viewer_can_delete&&o`<button type="button" class="comment-delete" aria-label="Delete comment"
            title="Delete comment" onClick=${()=>p(e.id)}>${C("trash",{size:12})}</button>`}
        </div>
      </div>
      <p class="comment-text">${e.body}</p>
      ${r&&a===0&&s===e.id&&o`<form class="comment-reply-form"
        onSubmit=${l=>u(l,e.id)}>
        <textarea rows="2" maxlength="2000" placeholder="Write a reply" value=${c}
          onInput=${l=>d(l.target.value)}></textarea>
        <div class="comment-form-actions">
          <button type="submit" class="btn btn-primary">${C("message",{size:14})} Post reply</button>
        </div>
      </form>`}
      ${f.length>0&&o`<div class="comment-replies">
        ${f.map(l=>fn(l,{...t,depth:a+1}))}
      </div>`}
    </div>
  </article>`}var Hr=["private","public","unlisted"];function qr(e,t){return e==="clip"?!0:!!t?.viewer_can_edit}function Gr(e,t,a){return e==="public"?t.shareId:a?.public_share_id||null}function jr(e,t,a){return e==="clip"?t.clipId:a?.viewer_clip_id||null}function Kr(e){let t=e?.height!=null?e.height:"",a=Math.round(e?.fps||0)||"";return`${t}p${a}`}function Wr(e,t=8){let a=new URLSearchParams;return e&&a.set("share_id",e),a.set("limit",String(t)),`/api/v1/public/recommendations?${a}`}function Zr(e,t,a=8){return(e||[]).filter(n=>n.share_id!==t).slice(0,a)}function Jr(e,t,a){let n=e==="clip"?a||{}:{display_name:t?.author_name||null,username:t?.author_username||null,avatar_url:t?.author_avatar_url||null},r=n.username||null;return{label:n.display_name||r||"Unknown creator",username:r,href:r?`/u/${encodeURIComponent(r)}`:null,avatarUser:n}}function Qr({author:e}){let t=o`
    <${Ae} user=${e.avatarUser} size=${36} />
    <span class="watch-author-name">${e.label}</span>
  `,a=e.href?o`<a class="watch-author-link" href=${e.href}>${t}</a>`:o`<span class="watch-author-link watch-author-static">${t}</span>`;return o`<div class="watch-author-row">${a}</div>`}function Wt({route:e}){let{user:t,ready:a}=te(B),[n,r]=b(null),[s,i]=b(null),[c,d]=b([]),[u,p]=b(!1),[f,l]=b(""),[m,_]=b(!1),[v,w]=b(""),[T,S]=b(!1),[A,G]=b(!1),[U,D]=b(!1),W=e.name==="clip"?`clip:${e.clipId}`:`public:${e.shareId}`,ie=Gr(e.name,e,n),Q=e.name==="public"||!!n;if(M(()=>{let k=new AbortController;r(null),i(null),p(!1),_(!1),D(!1),S(!1);let g=e.name==="clip"?`/api/v1/clips/${encodeURIComponent(e.clipId)}`:`/api/v1/public/clips/${encodeURIComponent(e.shareId)}`;return x(g,{signal:k.signal}).then(E=>{r(E),e.name==="public"&&x(`/api/v1/public/clips/${encodeURIComponent(e.shareId)}/view`,{method:"POST",body:{},signal:k.signal}).then(O=>r(de=>de&&{...de,view_count:O.view_count})).catch(()=>{})}).catch(E=>{E?.name!=="AbortError"&&i(E)}),()=>k.abort()},[W]),M(()=>{if(!Q){d([]);return}let k=new AbortController;return d([]),x(Wr(ie,8),{signal:k.signal}).then(g=>d(g.clips||[])).catch(()=>{}),()=>k.abort()},[W,ie,Q]),s)return o`<main class="page"><${se} name="alert" title="Couldn't load this clip" body=${s.message} /></main>`;if(!n)return o`<main class="page watch"><div><div class="skeleton-thumb"></div></div><aside class="upnext"></aside></main>`;let L=a&&!!t&&qr(e.name,n),Y=ie,be=jr(e.name,e,n),ve=e.name==="clip"?ht({id:n.id}):Fe({share_id:e.shareId}),oe=e.name==="clip"?qa({id:n.id}):bt({share_id:e.shareId}),ye=Jr(e.name,n,t),pe=n.public_url??n.share_url??null,ae=Ze(pe,window.location.origin,Y),ce=e.name==="clip";function me(){l(n.title),p(!0)}async function we(k){k?.preventDefault?.();let g=f.trim();if(!g||g===n.title){p(!1);return}try{await x(`/api/v1/clips/${encodeURIComponent(be)}`,{method:"PATCH",body:{title:g}}),r(E=>({...E,title:g})),p(!1),y("Title saved.")}catch(E){y(E.message)}}function j(){w(n.description||""),_(!0)}async function Re(){let k=v.trim();try{await x(`/api/v1/clips/${encodeURIComponent(be)}`,{method:"PATCH",body:{description:k||null}}),r(g=>({...g,description:k||null})),_(!1),y("Description saved.")}catch(g){y(g.message)}}async function ue(k,{force:g=!1}={}){let E=n.visibility;if(!(E===k&&!g)){r(O=>({...O,visibility:k}));try{let O=await x(`/api/v1/clips/${encodeURIComponent(be)}/visibility`,{method:"POST",body:{visibility:k}});r(de=>({...de,visibility:O.visibility,public_url:O.public_url,public_share_id:O.public_share_id})),y(`Visibility set to ${k}.`,{actionLabel:"Undo",onAction:()=>ue(E,{force:!0})})}catch(O){r(de=>({...de,visibility:E})),y(O.message)}}}async function Ce(){if(ae)try{await navigator.clipboard.writeText(ae),y("Link copied.")}catch{y("Couldn't copy the link.")}}async function Ee(){G(!1);try{await x(`/api/v1/clips/${encodeURIComponent(be)}`,{method:"DELETE"}),y("Clip deleted."),J("/library")}catch(k){y(k.message)}}let Ue=[n.game_name&&o`<a class="chip chip-on" href=${`/game/${encodeURIComponent(n.game_category_id||n.game_name)}`}>${n.game_display_name||n.game_name}</a>`,Be(n.view_count),`Recorded ${re(n.recorded_at)}`].filter(Boolean),ge=Zr(c,Y,8);return o`<main class="page watch">
    <div>
      <${pn} src=${ve} poster=${oe} durationMs=${n.duration_ms} markers=${n.markers} />
      <div class=${`watch-heading ${n.game_video_art_url?"has-game-art":""}`}>
        ${n.game_video_art_url&&o`<img class="watch-game-art" src=${n.game_video_art_url} alt="" />`}
        <div class="watch-heading-content">
        <div class="watch-titlerow">
          ${u?o`<input class="input watch-title-input" value=${f} autofocus
                onInput=${k=>l(k.target.value)} onBlur=${we}
                onKeyDown=${k=>{k.key==="Enter"&&we(k),k.key==="Escape"&&p(!1)}} />`:o`<h1>${n.title}
                ${L&&o`<button type="button" class="edit-pencil" aria-label="Edit title" onClick=${me}
                  >${C("edit",{size:14})}</button>`}</h1>`}
        </div>
        <${Qr} author=${ye} />
        <p class="watch-meta">${Ue.map((k,g)=>o`${g>0?" \xB7 ":""}${k}`)}</p>
        </div>
      </div>

      ${L&&o`<div class="watch-actions">
        <div class="seg" role="radiogroup" aria-label="Visibility">
          ${Hr.map(k=>o`<button type="button" role="radio" key=${k} aria-checked=${n.visibility===k}
              class=${`seg-item ${n.visibility===k?"seg-on":""}`} onClick=${()=>ue(k)}
              >${k[0].toUpperCase()+k.slice(1)}</button>`)}
        </div>
        <button type="button" class="btn btn-primary" disabled=${!ae} onClick=${Ce}>
          ${C("copy",{size:14})} Copy share link</button>
        <div class="watch-more">
          <button type="button" class="btn" aria-haspopup="menu" aria-expanded=${T}
            onClick=${()=>S(k=>!k)}>⋯</button>
          ${T&&o`<div class="menu" role="menu">
            <button type="button" class="menu-danger" role="menuitem"
              onClick=${()=>{S(!1),G(!0)}}>${C("trash",{size:14})} Delete clip</button>
          </div>`}
        </div>
      </div>`}

      <div class="watch-desc">
        ${m?o`<textarea class="input" rows="5" value=${v} autofocus
              onInput=${k=>w(k.target.value)} onBlur=${Re}
              onKeyDown=${k=>{k.key==="Enter"&&(k.ctrlKey||k.metaKey)&&Re(),k.key==="Escape"&&_(!1)}}></textarea>`:n.description?o`<p>${n.description}
              ${L&&o`<button type="button" class="edit-pencil" aria-label="Edit description" onClick=${j}
                >${C("edit",{size:12})}</button>`}</p>`:L?o`<button type="button" class="watch-desc-add" onClick=${j}>+ Add a description</button>`:""}
      </div>

      ${ce&&o`<button type="button" class="details-strip" aria-expanded=${U}
        onClick=${()=>D(k=>!k)}>
        <span><b>${Pe(n.duration_ms)}</b> length</span>
        <span><b>${q(n.file_size_bytes)}</b></span>
        <span><b>${Kr(n)}</b></span>
        <span><b>${n.video_codec}/${n.audio_codec}</b> ${n.container}</span>
        <span class="details-chev">${U?"\u25B4 less":"\u25BE more"}</span>
      </button>`}
      ${ce&&U&&o`<dl class="details-full">
        <div><dt>Recorded</dt><dd>${re(n.recorded_at)}</dd></div>
        <div><dt>Uploaded</dt><dd>${re(n.uploaded_at)}</dd></div>
        <div><dt>Dimensions</dt><dd>${n.width&&n.height?`${n.width} x ${n.height}`:"Unknown"}</dd></div>
        <div><dt>FPS</dt><dd>${n.fps??"Unknown"}</dd></div>
        <div><dt>Container</dt><dd>${n.container||"Unknown"}</dd></div>
        <div><dt>Video codec</dt><dd>${n.video_codec||"Unknown"}</dd></div>
        <div><dt>Audio codec</dt><dd>${n.audio_codec||"Unknown"}</dd></div>
        <div><dt>Source</dt><dd>${n.source_type||"Unknown"}</dd></div>
        <div><dt>Checksum</dt><dd>${n.checksum_sha256||"Unknown"}</dd></div>
      </dl>`}

      ${Y&&o`<${mn} shareId=${Y} />`}
    </div>
    <aside class="upnext">
      <h4 class="kicker">Up next</h4>
      ${ge.map(k=>o`<a class="upnext-row" key=${k.share_id} href=${`/c/${encodeURIComponent(k.share_id)}`}>
          <img src=${Me(k)} alt="" loading="lazy" />
          <span><b>${k.title}</b><small>${k.author_name} · ${k.game_display_name||k.game_name||"No game"} · ${Be(k.view_count)}</small></span>
        </a>`)}
    </aside>

    <${he} open=${A} title="Delete this clip?" body="Public links stop working immediately."
      confirmLabel="Delete" danger onConfirm=${Ee} onCancel=${()=>G(!1)} />
  </main>`}fe();var Zt=[{top:"4%",left:"4%",width:"34%",rotate:-7},{top:"0%",left:"44%",width:"30%",rotate:5},{top:"34%",left:"68%",width:"28%",rotate:-4},{top:"50%",left:"8%",width:"30%",rotate:6},{top:"62%",left:"42%",width:"26%",rotate:-5},{top:"26%",left:"-4%",width:"22%",rotate:9}];function Yr(e){return Array.isArray(e)?e.slice(0,Zt.length).map((t,a)=>({clip:t,...Zt[a]})):[]}function Xr(e){let t=e?.clips;if(!Array.isArray(t)||t.length===0)return null;let a=t.length,n=e.has_more?"+":"";return`${a}${n} clip${a===1?"":"s"} on this instance`}function es({top:e,left:t,width:a,rotate:n}){return`top:${e};left:${t};width:${a};transform:rotate(${n}deg);`}function _n(e){let t=String(e||"").trim();return t||null}function ts(){let{data:e}=_e(`/api/v1/public/clips?page_size=${Zt.length}`),t=Yr(e?.clips),a=Xr(e);return o`<aside class="login-montage" aria-hidden="true">
    ${t.length>0&&o`<div class="login-montage-tiles">
      ${t.map((n,r)=>o`<img key=${r} class="login-montage-tile" style=${es(n)}
        src=${Me(n.clip)} alt="" loading="lazy" />`)}
    </div>`}
    <div class="login-montage-copy">
      <h2>Your clips. Your server.</h2>
      ${a&&o`<p>${a}</p>`}
    </div>
  </aside>`}function Ct({titleId:e,children:t}){return o`<div class="login-page">
    <${ts} />
    <section class="login-panel" aria-labelledby=${e}>
      <div class="login-brand" aria-hidden="true">
        <img src="/clipline-icon.svg" alt="" width="32" height="32" />
        <span class="login-brand-word">CLIP<span class="wordmark-accent">LINE</span></span>
        <span class="login-brand-descriptor">CLOUD</span>
      </div>
      ${t}
    </section>
  </div>`}function hn(){let{user:e}=te(B),[t,a]=b(""),[n,r]=b(""),[s,i]=b(""),[c,d]=b(!1);if(M(()=>{e&&J("/library")},[e]),e)return null;async function u(p){if(p.preventDefault(),!c){d(!0),i("");try{let f=await x("/api/v1/auth/login",{method:"POST",body:{username:t,password:n}});Te(f.csrf_token),B.set({user:f.user,csrfToken:f.csrf_token,ready:!0}),J("/library")}catch(f){i(f instanceof xe?f.message:"Sign in failed"),d(!1)}}}return o`<${Ct} titleId="login-title">
    <h1 id="login-title">Sign in</h1>
    ${s&&o`<p class="form-error" role="alert">${s}</p>`}
    <form class="login-form" onSubmit=${u}>
      <label class="login-field">
        <span>Username</span>
        <input class="input" name="username" autocomplete="username" required
          value=${t} onInput=${p=>a(p.target.value)} />
      </label>
      <label class="login-field">
        <span>Password</span>
        <input class="input" name="password" type="password" autocomplete="current-password" required
          value=${n} onInput=${p=>r(p.target.value)} />
      </label>
      <button class="btn btn-primary" type="submit" disabled=${c}>${c?"Signing in\u2026":"Sign in"}</button>
    </form>
    <p class="login-hint">Accounts are created by this server's admin.</p>
  </${Ct}>`}function bn({route:e}){let t=!!e.invite,a=e.token?"form":"missing-token",[n,r]=b(""),[s,i]=b(!1),c=t;async function d(f){if(f.preventDefault(),s)return;i(!0),r("");let l=new FormData(f.currentTarget),m={reset_token:e.token,new_password:String(l.get("new_password")||"")};c&&(m.username=String(l.get("username")||""),m.display_name=_n(l.get("display_name")),m.email=_n(l.get("email")));try{await x("/api/v1/auth/reset-password",{method:"POST",body:m}),y(c?"Account created. Sign in with your new password.":"Password set. Sign in with your new password."),J("/login")}catch(_){r(_ instanceof xe?_.message:"Request failed"),i(!1)}}return o`<${Ct} titleId="reset-title">
    <h1 id="reset-title">${c?"Create account":"Set password"}</h1>
    <p class="login-copy">${c?"Choose your Clipline Cloud account details.":"Choose a new password for your Clipline Cloud account."}</p>
    ${a==="missing-token"?o`<p class="form-error" role="alert">This reset link is missing a token.</p>`:o`
        ${n&&o`<p class="form-error" role="alert">${n}</p>`}
        <form class="login-form" onSubmit=${d}>
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
  </${Ct}>`}fe();function Je({label:e,value:t,sub:a,meter:n,tone:r}){let s=r?` stat-${r}`:"";return o`<div class="stat-card">
    <p class="stat-label">${e}</p>
    <p class=${`stat-value${s}`}>${t}</p>
    ${a!=null&&o`<p class="stat-sub">${a}</p>`}
    ${n!=null&&o`<div class="stat-meter${s}">
      <span style=${`width:${Math.max(0,Math.min(1,n))*100}%`}></span>
    </div>`}
  </div>`}function as(e){let t=Number(e?.global_storage_warning_threshold_bytes||0);if(!t)return null;let a=Number(e?.total_storage_bytes||0);return Math.max(0,Math.min(1,a/t))}function ns(e){if(!e?.global_storage_warning_threshold_bytes)return"Disabled";let t=q(e.global_storage_warning_threshold_bytes);return e.global_storage_warning?`At or above ${t}`:`Below ${t}`}function rs({deadJobs:e=[],failedUploads:t=[]}={}){let a=e.length+t.length;return{failedCount:a,healthy:a===0}}function le(e,t){return o`<div><dt>${e}</dt><dd>${t??"Unknown"}</dd></div>`}function gn({overview:e,deadJobs:t,failedUploads:a}){let n=as(e),{failedCount:r,healthy:s}=rs({deadJobs:t,failedUploads:a}),i=e.global_storage_warning_threshold_bytes;return o`<div>
    <div class="stat-grid">
      <${Je} label="Clips" value=${String(e.total_clips)} />
      <${Je} label="Storage" value=${q(e.total_storage_bytes)}
        sub=${i?`${q(i)} warning threshold`:null}
        meter=${n} tone=${e.global_storage_warning?"danger":void 0} />
      <${Je} label="Users" value=${String(e.total_users)} />
      <${Je} label="Jobs" value=${s?"All healthy":String(r)}
        tone=${s?"success":"danger"} />
    </div>
    <div class="panel">
      <h2>Server summary</h2>
      <dl class="ad-kv">
        ${le("Server version",e.server_version)}
        ${le("API version",e.api_version)}
        ${le("Public URL",e.public_url)}
        ${e.additional_public_urls?.length?le("Additional public URLs",e.additional_public_urls.join(", ")):null}
        ${le("Database",e.database_backend)}
        ${le("Storage",`${e.storage_backend} \u2014 ${e.storage_summary}`)}
        ${le("Stored clips",`${e.total_clips} clips \u2014 ${q(e.total_storage_bytes)}`)}
        ${le("Users",`${e.total_users} total`)}
        ${le("Max upload",q(e.max_upload_size_bytes))}
        ${le("Part size",q(e.upload_part_size_bytes))}
        ${le("Single PUT max",q(e.single_put_max_bytes))}
        ${le("Active uploads/user",e.max_active_upload_sessions_per_user)}
        ${le("User quota",e.user_storage_quota_bytes?q(e.user_storage_quota_bytes):"Disabled")}
        ${le("Storage warning",ns(e))}
        ${le("Upload TTL",`${e.upload_session_ttl_seconds}s`)}
        ${le("Direct S3 uploads",e.direct_s3_uploads?"Enabled":"Disabled")}
        ${le("Public media",`${e.public_media_mode}, ${e.public_read_url_ttl_seconds}s TTL`)}
      </dl>
    </div>
  </div>`}fe();function St(e){let t=String(e||"").trim();return t||null}function ss(e,t){return!(e.is_disabled||t?.id===e.id||e.role==="owner"||e.role==="admin"&&t?.role!=="owner")}function os(e,t){return!(!e.is_disabled||t?.id===e.id||e.role==="owner"||e.role==="admin"&&t?.role!=="owner")}function is(e,t){return t?.role==="owner"&&e.role!=="owner"&&t?.id!==e.id}function ls(e,t){return!(t?.id===e.id||e.role==="owner"||e.role==="admin"&&t?.role!=="owner")}function Jt(e){return e?[["user","User"],["admin","Admin"]]:[["user","User"]]}function cs({isOwner:e,onCreated:t}){let[a,n]=b(!1);async function r(s){if(s.preventDefault(),a)return;n(!0);let i=s.currentTarget,c=new FormData(i);try{await x("/api/v1/users",{method:"POST",body:{username:String(c.get("username")||""),display_name:St(c.get("display_name")),email:St(c.get("email")),password:St(c.get("password")),role:String(c.get("role")||"user")}}),y("User created."),i.reset(),t()}catch(d){y(d.message)}finally{n(!1)}}return o`<form class="panel section" onSubmit=${r}>
    <h2>Create user</h2>
    <label class="field"><span>Username</span><input class="input" name="username" required /></label>
    <label class="field"><span>Display name</span><input class="input" name="display_name" placeholder="Optional" /></label>
    <label class="field"><span>Email</span><input class="input" name="email" type="email" placeholder="Optional" /></label>
    <label class="field"><span>Password</span><input class="input" name="password" type="password" required /></label>
    <label class="field"><span>Role</span>
      <select class="input" name="role">
        ${Jt(e).map(([s,i])=>o`<option value=${s}>${i}</option>`)}
      </select>
    </label>
    <button class="btn btn-primary" type="submit" disabled=${a}>${C("plus",{size:14})} Create user</button>
  </form>`}function us({isOwner:e,smtpEnabled:t,onCreated:a}){let[n,r]=b(!1);async function s(i){if(i.preventDefault(),n)return;r(!0);let c=new FormData(i.currentTarget),d=i.submitter?.value==="email"?"email":"link";try{let u=await x("/api/v1/invites",{method:"POST",body:{role:String(c.get("role")||"user"),email:St(c.get("email")),send_email:d==="email"}});y(d==="email"?"Invite sent.":"Invite link created."),a({...u,kind:"invite"})}catch(u){y(u.message)}finally{r(!1)}}return o`<form class="panel section" onSubmit=${s}>
    <h2>Invite link</h2>
    <label class="field"><span>Role</span>
      <select class="input" name="role">
        ${Jt(e).map(([i,c])=>o`<option value=${i}>${c}</option>`)}
      </select>
    </label>
    <label class="field"><span>Email</span>
      <input class="input" name="email" type="email" placeholder=${t?"Optional":"SMTP disabled"} disabled=${!t} />
    </label>
    <div class="actions">
      <button class="btn" type="submit" name="intent" value="link" disabled=${n}>${C("copy",{size:14})} Generate link</button>
      ${t&&o`<button class="btn btn-primary" type="submit" name="intent" value="email" disabled=${n}>${C("message",{size:14})} Send email</button>`}
    </div>
  </form>`}function ds({resetLink:e}){if(!e)return null;let t=e.kind==="invite"?"Invite":"Reset",a=e.username?` for ${e.username}`:"",n=async()=>{try{await navigator.clipboard.writeText(e.reset_url),y("Copied to clipboard.")}catch{y("Copy failed. Select and copy the URL manually.")}};return o`<div class="notice admin-reset-link">
    <div>
      <strong>${t} link created${a}</strong>
      <span>Expires ${re(e.expires_at)}</span>
      <code>${e.reset_url}</code>
    </div>
    <button class="btn" type="button" onClick=${n}>${C("copy",{size:14})} Copy</button>
  </div>`}function ps(e){return e.is_disabled?o`<span class="badge badge-warn">Disabled</span>`:o`<span class="badge badge-public">Active</span>`}function ms(e){return e?e.user_storage_quota_bytes!=null&&e.user_storage_quota_bytes>0?e.user_storage_quota_bytes:e.user_storage_quota_env_fallback_bytes??null:null}function fs(e,t){if(e.storage_quota_bytes!=null&&e.storage_quota_bytes>0)return q(e.storage_quota_bytes);let a=ms(t);return a!=null&&a>0?`Default (${q(a)})`:"No limit"}function _s({user:e,currentUser:t,settings:a,onQuota:n,onReset:r,onDisable:s,onEnable:i,onRole:c,onPurge:d}){let u=fs(e,a),p=!ss(e,t),f=!os(e,t),l=!ls(e,t),m=is(e,t),[_,v]=b(e.role);return M(()=>{v(e.role)},[e.role]),o`<tr>
    <td>
      <strong>${e.username}</strong>
      <div class="muted">${e.display_name||e.id}</div>
      ${e.email&&o`<div class="muted">${e.email}</div>`}
    </td>
    <td>
      ${m?o`<select class="input input-compact" value=${_}
            onChange=${w=>{let T=w.target.value;T!==e.role&&(v(e.role),c(e,T))}}>
            ${Jt(!0).map(([w,T])=>o`<option value=${w} selected=${_===w}>${T}</option>`)}
          </select>`:e.role}
    </td>
    <td>${ps(e)}</td>
    <td>
      <strong>${q(e.storage_bytes||0)}</strong>
      <div class="muted">quota ${u}</div>
    </td>
    <td>${re(e.last_login_at)}</td>
    <td>
      <div class="actions">
        <button class="btn" type="button" onClick=${()=>n(e)}>${C("sliders",{size:14})} Quota</button>
        <button class="btn" type="button" onClick=${()=>r(e)}>${C("clipboard",{size:14})} Reset link</button>
        ${e.is_disabled?o`<button class="btn" type="button" disabled=${f} onClick=${()=>i(e)}>${C("check",{size:14})} Enable</button>`:o`<button class="btn btn-danger" type="button" disabled=${p} onClick=${()=>s(e)}>${C("x",{size:14})} Disable</button>`}
        <button class="btn btn-danger" type="button" disabled=${l} onClick=${()=>d(e)}>${C("trash",{size:14})} Delete</button>
      </div>
    </td>
  </tr>`}function $n({users:e,settings:t,currentUser:a,resetLink:n,setResetLink:r,reload:s}){let[i,c]=b(null),d=a?.role==="owner",u=!!t?.smtp_enabled,p=()=>c(null);async function f(){let{type:m,user:_,value:v}=i;p();try{if(m==="quota"){let w=v.trim()?Qt(v):null;await x(`/api/v1/users/${encodeURIComponent(_.id)}`,{method:"PATCH",body:{storage_quota_bytes:w}}),y("Storage quota updated.")}else if(m==="disable")await x(`/api/v1/users/${encodeURIComponent(_.id)}`,{method:"DELETE",body:{reauth_password:v}}),y("User disabled.");else if(m==="enable")await x(`/api/v1/users/${encodeURIComponent(_.id)}`,{method:"PATCH",body:{is_disabled:!1,reauth_password:v}}),y("User enabled.");else if(m==="role")await x(`/api/v1/users/${encodeURIComponent(_.id)}`,{method:"PATCH",body:{role:v.role,reauth_password:v.password}}),y(`Role updated to ${v.role}.`);else if(m==="purge")await x(`/api/v1/users/${encodeURIComponent(_.id)}/purge`,{method:"POST",body:{reauth_password:v}}),y("User deleted.");else if(m==="reset"){let w=await x(`/api/v1/users/${encodeURIComponent(_.id)}/reset-password`,{method:"POST",body:{reauth_password:v}});r({...w,kind:"reset"}),y("Reset link created.")}s()}catch(w){y(w.message),s()}}let l={quota:{title:"Set storage quota",description:"Enter a per-user storage limit in GiB. Leave it blank to remove the per-user limit.",confirmLabel:"Save quota",danger:!1,field:o`<label class="field"><span>Quota GiB</span>
        <input class="input" type="number" min="0" step="0.1" placeholder="No per-user limit"
          value=${i?.value||""} onInput=${m=>c(_=>({..._,value:m.target.value}))} /></label>`},disable:{title:"Disable user?",description:"This immediately revokes the user's sessions and device tokens.",confirmLabel:"Disable",danger:!0,field:o`<label class="field"><span>Your password</span>
        <input class="input" type="password" required value=${i?.value||""}
          onInput=${m=>c(_=>({..._,value:m.target.value}))} /></label>`},enable:{title:"Enable user?",description:"This restores sign-in access for the selected account.",confirmLabel:"Enable",danger:!1,field:o`<label class="field"><span>Your password</span>
        <input class="input" type="password" required value=${i?.value||""}
          onInput=${m=>c(_=>({..._,value:m.target.value}))} /></label>`},role:{title:"Change user role?",description:`Set ${i?.user?.username||"this user"} to ${i?.value?.role||"the selected role"}.`,confirmLabel:"Save role",danger:!1,field:o`<label class="field"><span>Your password</span>
        <input class="input" type="password" required value=${i?.value?.password||""}
          onInput=${m=>c(_=>({..._,value:{..._.value,password:m.target.value}}))} /></label>`},purge:{title:"Delete user permanently?",description:"This removes the account, clips, comments, and auth records. This cannot be undone.",confirmLabel:"Delete user",danger:!0,field:o`<label class="field"><span>Your password</span>
        <input class="input" type="password" required value=${i?.value||""}
          onInput=${m=>c(_=>({..._,value:m.target.value}))} /></label>`},reset:{title:"Create reset link?",description:"This creates a temporary password reset link for the selected user.",confirmLabel:"Create link",danger:!1,field:o`<label class="field"><span>Your password</span>
        <input class="input" type="password" required value=${i?.value||""}
          onInput=${m=>c(_=>({..._,value:m.target.value}))} /></label>`}}[i?.type];return o`<div class="admin-users-layout">
    <div class="admin-users-forms">
      <${cs} isOwner=${d} onCreated=${()=>{r(null),s()}} />
      <${us} isOwner=${d} smtpEnabled=${u}
        onCreated=${m=>{r(m),s()}} />
    </div>
    <div class="panel admin-users-table">
      <div class="section-header">
        <h2>Users</h2>
        <span class="muted">${e.length} total</span>
      </div>
      <${ds} resetLink=${n} />
      <div class="table-wrap">
        <table class="lib-table">
          <thead><tr><th>Username</th><th>Role</th><th>Status</th><th>Storage</th><th>Last login</th><th></th></tr></thead>
          <tbody>
            ${e.map(m=>o`<${_s} key=${m.id} user=${m} currentUser=${a} settings=${t}
              onQuota=${_=>c({type:"quota",user:_,value:""})}
              onReset=${_=>c({type:"reset",user:_,value:""})}
              onDisable=${_=>c({type:"disable",user:_,value:""})}
              onEnable=${_=>c({type:"enable",user:_,value:""})}
              onRole=${(_,v)=>c({type:"role",user:_,value:{role:v,password:""}})}
              onPurge=${_=>c({type:"purge",user:_,value:""})} />`)}
          </tbody>
        </table>
      </div>
    </div>
    <${he} open=${!!i}
      title=${l?.title}
      body=${l&&o`${l.description} ${l.field}`}
      confirmLabel=${l?.confirmLabel} danger=${l?.danger}
      confirmDisabled=${i?.type==="quota"?!1:i?.type==="role"?!i?.value?.password?.trim():!i?.value?.trim()}
      onConfirm=${f} onCancel=${p} />
  </div>`}function Qt(e){let t=Number(String(e||"").trim());if(!Number.isFinite(t)||t<0)throw new Error("Storage quota must be a non-negative number");return Math.round(t*1024*1024*1024)}fe();function xt(e){let t=String(e||"").trim();return t||null}function vn(e){return e==null||e<=0?"":String(Math.round(e/1024**3*100)/100)}function yn({settings:e,isOwner:t,reload:a}){let[n,r]=b(!1),[s,i]=b(!1);async function c(d){if(d.preventDefault(),!n){r(!0);try{let u=new FormData(d.currentTarget),p={allow_vod_uploads:u.get("allow_vod_uploads")==="on",vod_threshold_minutes:Number(u.get("vod_threshold_minutes")||30)};if(s){let f=String(u.get("user_storage_quota_gib")||"").trim();p.user_storage_quota_bytes=f?Qt(f):null}if(t){p.about_text=String(u.get("about_text")||""),p.smtp_enabled=u.get("smtp_enabled")==="on",p.smtp_host=xt(u.get("smtp_host")),p.smtp_port=Number(u.get("smtp_port")||587),p.smtp_tls_mode=String(u.get("smtp_tls_mode")||"starttls"),p.smtp_username=xt(u.get("smtp_username")),p.smtp_from_email=xt(u.get("smtp_from_email")),p.smtp_from_name=xt(u.get("smtp_from_name"));let f=String(u.get("smtp_password")||"").trim();f&&(p.smtp_password=f),u.get("smtp_password_clear")==="on"&&(p.smtp_password_clear=!0)}await x("/api/v1/admin/settings",{method:"PATCH",body:p}),y("Settings saved."),i(!1),a()}catch(u){y(u.message)}finally{r(!1)}}}return o`<form class="admin-settings-page" onSubmit=${c}>
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
            placeholder=${e.user_storage_quota_env_fallback_bytes?`Env default: ${vn(e.user_storage_quota_env_fallback_bytes)} GiB`:"No default quota"}
            value=${vn(e.user_storage_quota_bytes)}
            onInput=${()=>i(!0)} /></label>
        ${e.user_storage_quota_bytes==null&&e.user_storage_quota_env_fallback_bytes?o`<p class="muted">Effective default: ${q(e.user_storage_quota_env_fallback_bytes)} from CLIPLINE_USER_STORAGE_QUOTA_BYTES.</p>`:null}
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
            ${[["starttls","STARTTLS"],["tls","TLS"],["none","None"]].map(([d,u])=>o`<option value=${d} selected=${(e.smtp_tls_mode||"starttls")===d}>${u}</option>`)}
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
  </form>`}fe();function hs(e){return`${(e/100).toFixed(e%100===0?0:1)}%`}function bs(e){switch(e){case"delete_and_retry":return"delete the failed upload and retry from a new session";case"retry":return"retry the current upload request";default:return""}}function gs({upload:e}){let t=Math.max(0,Math.min(1e4,Number(e.progress_basis_points||0))),a=bs(e.recovery_action);return o`<div class="job-item">
    <div class="job-title-line">
      <strong class="mono">${e.id}</strong>
      <span class="badge badge-warn">${hs(t)}</span>
    </div>
    <div class="progress-meter" aria-label="Upload progress"><span style=${`width:${t/100}%`}></span></div>
    <span class="muted">clip ${e.clip_id} — ${q(e.received_size_bytes)} of ${q(e.expected_size_bytes)} — updated ${re(e.updated_at)}</span>
    ${e.failure_reason&&o`<span class="form-error">${e.failure_reason}</span>`}
    ${a&&o`<span class="muted">Recovery: ${a}</span>`}
  </div>`}function wn({job:e}){return o`<div class="job-item">
    <strong>${e.kind} <span class="mono">${e.id}</span></strong>
    <span class="muted">${e.status} — attempts ${e.attempts}/${e.max_attempts} — updated ${re(e.updated_at)} — target ${e.target_type||""}:${e.target_id||""}</span>
    ${e.last_error&&o`<span class="form-error">${e.last_error}</span>`}
  </div>`}function Yt({title:e,items:t,renderItem:a,emptyLabel:n,action:r}){return o`<div class="panel">
    <div class="section-header">
      <h2>${e}</h2>
      <span class="muted">${t.length}</span>
      ${r}
    </div>
    ${t.length?o`<div class="job-list">${t.map(a)}</div>`:o`<p class="muted">${n}</p>`}
  </div>`}function kn({failedUploads:e,deadJobs:t,recentErrors:a,reload:n}){let[r,s]=b(!1),[i,c]=b(!1),d=async()=>{if(!i){c(!0);try{let p=await x("/api/v1/admin/jobs/recent-errors",{method:"DELETE"}),f=[];p.terminal_jobs_deleted>0&&f.push(`${p.terminal_jobs_deleted} terminal job${p.terminal_jobs_deleted===1?"":"s"} removed`),p.errors_cleared>0&&f.push(`${p.errors_cleared} error${p.errors_cleared===1?"":"s"} cleared`),y(f.length?`${f.join(", ")}.`:"No job errors to clear."),n()}catch(p){y(p instanceof xe?p.message:"Couldn't clear job errors.")}finally{c(!1),s(!1)}}},u=p=>p.length?o`<button class="btn btn-danger" type="button" disabled=${i}
          onClick=${()=>s(!0)}>${C("trash",{size:14})} Clear errors</button>`:null;return o`<div class="section">
    <${Yt} title="Failed uploads" items=${e} emptyLabel="No failed uploads."
      renderItem=${p=>o`<${gs} key=${p.id} upload=${p} />`} />
    <${Yt} title="Dead jobs" items=${t} emptyLabel="No dead jobs."
      action=${u(t)}
      renderItem=${p=>o`<${wn} key=${p.id} job=${p} />`} />
    <${Yt} title="Recent job errors" items=${a} emptyLabel="No recent job errors."
      action=${u(a)}
      renderItem=${p=>o`<${wn} key=${p.id} job=${p} />`} />
    <${he} open=${r} title="Clear job errors?"
      body="Dead jobs are removed and error messages are cleared from the diagnostics lists. Clips and jobs that are still retrying are not affected; new failures will reappear."
      confirmLabel="Clear errors" danger confirmDisabled=${i} onCancel=${()=>s(!1)} onConfirm=${d} />
  </div>`}fe();var Cn={grid:{kind:"grid",label:"Category Grid",description:"Portrait artwork used for this category on the Games page."},video:{kind:"hero",label:"Video Art",description:"Wide artwork shown subtly behind video titles and metadata."},icon:{kind:"icon",label:"Icon",description:"Compact artwork used in Library filters and category management."}};function Sn(e,t,a){return`/api/v1/admin/game-categories/steamgriddb/games/${encodeURIComponent(e)}/artwork/${encodeURIComponent(t)}/${encodeURIComponent(a)}/preview`}function $s({displayName:e,steamGameId:t,selectedArtworks:a}){return{display_name:e,steamgriddb_game_id:t||null,grid_artwork_id:a?.grid?.id||null,video_artwork_id:a?.video?.id||null,icon_artwork_id:a?.icon?.id||null}}function vs(e,t){return t?e?.steamgriddb_game_id?"Matched":"Not matched":"Not configured"}function ys(e,t,a=""){let n=a.trim().toLocaleLowerCase();return(e||[]).filter(r=>r.id===t?!1:n?[r.display_name,...(r.reported_names||[]).map(s=>s.reported_name)].some(s=>String(s||"").toLocaleLowerCase().includes(n)):!0)}function xn(e){return`/admin/game-categories/${encodeURIComponent(e)}`}function Tn({data:e,reload:t,categoryId:a}){let n=e?.categories||[];if(a){let r=n.find(s=>s.id===a);return r?o`<${ks} key=${r.id} data=${e} reload=${t}
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
          <td><span class=${`category-status ${r.steamgriddb_game_id?"is-matched":""}`}>${vs(r,e?.steamgriddb_configured)}</span></td>
          <td><a class="btn" href=${xn(r.id)}>${C("edit",{size:14})} Edit</a></td>
        </tr>`)}</tbody>
      </table></div>`}
  </section>`}function ws({slot:e,config:t,steamGameId:a,selected:n,active:r,results:s,busy:i,error:c,onToggle:d,onClear:u,onSelect:p}){return o`<section class=${`category-artwork-slot artwork-slot-${e}`}>
    <div class="category-artwork-slot-heading">
      <div><strong>${t.label}</strong><small>${t.description}</small></div>
      <div class="actions">
        ${n&&o`<button class="btn btn-small" type="button" onClick=${u}>Clear</button>`}
        ${!r&&o`<button class="btn btn-small" type="button" aria-expanded="false" onClick=${d}>
          ${n?"Change artwork":"Choose artwork"}
        </button>`}
      </div>
    </div>
    ${n&&o`<img class="category-selected-artwork" src=${n.preview_url||Sn(a,t.kind,n.id)} alt="" />`}
    ${r&&o`<div class="category-artwork-browser">
      ${i?o`<small class="muted">Loading artwork…</small>`:""}
      ${c&&o`<small class="field-error">${c}</small>`}
      ${!i&&!c&&s.length===0&&o`<small class="muted">No artwork found for this slot.</small>`}
      ${s.length>0&&o`<small class="muted">Scroll to browse. Click an image to select it.</small>`}
      <div class="category-artwork-grid">
        ${s.map(f=>o`<button type="button"
          class=${`category-artwork-option ${n?.id===f.id?"is-selected":""}`}
          aria-label=${`Select ${t.label} artwork ${f.id}`}
          onClick=${()=>p(f)}>
          <img src=${f.preview_url||Sn(a,f.kind,f.id)} alt="" loading="lazy" />
        </button>`)}
      </div>
    </div>`}
  </section>`}function ks({data:e,reload:t,editing:a,categories:n}){let[r,s]=b(a.display_name),[i,c]=b(a.display_name),[d,u]=b(a.steamgriddb_game_id||null),[p,f]=b(!1),[l,m]=b([]),[_,v]=b(!1),[w,T]=b(""),[S,A]=b(null),[G,U]=b([]),[D,W]=b(!1),[ie,Q]=b(""),[L,Y]=b({grid:a.grid_artwork_id?{id:a.grid_artwork_id,kind:"grid",preview_url:a.grid_artwork_url}:null,video:a.video_artwork_id?{id:a.video_artwork_id,kind:"hero",preview_url:a.video_artwork_url}:null,icon:a.icon_artwork_id?{id:a.icon_artwork_id,kind:"icon",preview_url:a.icon_artwork_url}:null}),[be,ve]=b(""),[oe,ye]=b(""),[pe,ae]=b(!1),[ce,me]=b(null),[we,j]=b(!1),Re=ut(()=>ys(n,a.id,be),[n,a.id,be]),ue=n.find(g=>g.id===oe)||null;M(()=>{if(!e?.steamgriddb_configured||!p||i.trim().length<2){m([]),v(!1),T("");return}let g=!1,E=i.trim();v(!0),T("");let O=setTimeout(async()=>{try{let de=await x(`/api/v1/admin/game-categories/steamgriddb/search?q=${encodeURIComponent(E)}`);g||m(de||[])}catch(de){g||(m([]),T(de.message))}finally{g||v(!1)}},300);return()=>{g=!0,clearTimeout(O)}},[e?.steamgriddb_configured,p,i]),M(()=>{if(!d||!e?.steamgriddb_configured||!S){U([]),Q("");return}let g=Cn[S].kind,E=!1;return W(!0),Q(""),x(`/api/v1/admin/game-categories/steamgriddb/games/${encodeURIComponent(d)}/artwork?kind=${encodeURIComponent(g)}`).then(O=>{E||U(O||[])}).catch(O=>{E||(U([]),Q(O.message))}).finally(()=>{E||W(!1)}),()=>{E=!0}},[e?.steamgriddb_configured,d,S]);function Ce(g){u(g.id),c(g.name),s(g.name),f(!1),m([]),A(null),U([]),Y({grid:null,video:null,icon:null})}function Ee(){u(null),Y({grid:null,video:null,icon:null}),A(null),U([]),f(!0)}async function Ue(g){if(g.preventDefault(),!(!a||pe)){ae(!0);try{await x(`/api/v1/admin/game-categories/${encodeURIComponent(a.id)}`,{method:"PATCH",body:$s({displayName:r,steamGameId:d,selectedArtworks:L})}),y("Game category updated."),await t()}catch(E){y(E.message)}finally{ae(!1)}}}async function ge(){let g=ce;if(me(null),!(!g||pe)){ae(!0);try{await x(`/api/v1/admin/game-categories/${encodeURIComponent(g.category.id)}/reported-names/${encodeURIComponent(g.name.id)}/separate`,{method:"POST"}),y(`${g.name.reported_name} separated into its own category.`),await t()}catch(E){y(E.message),(E.status===404||E.status===409)&&await t()}finally{ae(!1)}}}async function k(){if(j(!1),!(!a||!ue||pe)){ae(!0);try{await x(`/api/v1/admin/game-categories/${encodeURIComponent(a.id)}/merge`,{method:"POST",body:{destination_category_id:ue.id}}),y(`${a.display_name} merged into ${ue.display_name}.`),await t(),J(xn(ue.id))}catch(g){y(g.message),(g.status===404||g.status===409)&&await t()}finally{ae(!1)}}}return o`<div class="admin-categories-page">
    <form class="admin-card admin-category-editor" onSubmit=${Ue}>
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
            onInput=${g=>s(g.target.value)} />
        </label>
      </section>

      <section class="category-settings-section">
        <h3>Game metadata</h3>
        ${e?.steamgriddb_configured?o`<label class="field steamgriddb-search"><span>Find on SteamGridDB</span>
          <input class="input" value=${i} placeholder="Enter the official game title"
            onFocus=${()=>f(!0)}
            onInput=${g=>{c(g.target.value),f(!0)}} />
          ${_&&o`<small class="muted">Searching…</small>`}
          ${w&&o`<small class="field-error">${w}</small>`}
          ${p&&!_&&!w&&i.trim().length>=2&&l.length===0&&o`<small class="muted">No results. Try the full official game title.</small>`}
          ${p&&l.length>0&&o`<div class="steamgriddb-results">
            ${l.map(g=>o`<button type="button" onClick=${()=>Ce(g)}>
              <strong>${g.name}</strong><small>#${g.id}${g.verified?" \xB7 verified":""}</small>
            </button>`)}
          </div>`}
          ${d&&o`<span class="steamgriddb-selected">SteamGridDB #${d}
            <button class="btn btn-small" type="button" onClick=${Ee}>Clear match</button>
          </span>`}
        </label>`:o`<p class="muted"><strong>SteamGridDB is not configured.</strong> Set the API key file to enable matching and artwork.</p>`}
        ${d&&o`<div class="category-artwork-slots">
          ${Object.entries(Cn).map(([g,E])=>o`<${ws}
            key=${g}
            slot=${g}
            config=${E}
            steamGameId=${d}
            selected=${L[g]}
            active=${S===g}
            results=${S===g?G:[]}
            busy=${S===g&&D}
            error=${S===g?ie:""}
            onToggle=${()=>{W(S!==g),U([]),Q(""),A(O=>O===g?null:g)}}
            onClear=${()=>Y(O=>({...O,[g]:null}))}
            onSelect=${O=>{Y(de=>({...de,[g]:O})),A(null),U([]),W(!1)}} />`)}
        </div>`}
      </section>

      <section class="category-settings-section">
        <h3>Reported names</h3>
        <div class="category-reported-name-list">
          ${(a.reported_names||[]).map(g=>o`<div class="category-reported-name">
            <span><code>${g.reported_name}</code><small>${g.clip_count} clip${g.clip_count===1?"":"s"}</small></span>
            ${a.reported_names.length>1&&o`<button class="btn" type="button" disabled=${pe}
              onClick=${()=>me({category:a,name:g})}>Separate</button>`}
          </div>`)}
        </div>
      </section>

      <section class="category-settings-section">
        <h3>Merge with another category</h3>
        <p class="muted">All reported names move to the destination. Its display name, SteamGridDB match, and artwork win.</p>
        <label class="field"><span>Search categories</span>
          <input class="input" value=${be} onInput=${g=>ve(g.target.value)} />
        </label>
        <label class="field"><span>Destination</span>
          <select class="input" value=${oe} onChange=${g=>ye(g.target.value)}>
            <option value="">Select a category</option>
            ${Re.map(g=>o`<option value=${g.id}>${g.display_name} · ${(g.reported_names||[]).map(E=>E.reported_name).join(", ")}</option>`)}
          </select>
        </label>
        <button class="btn btn-danger" type="button" disabled=${pe||!oe}
          onClick=${()=>j(!0)}>Merge category</button>
      </section>

      <div class="admin-form-actions">
        <button class="btn btn-primary" type="submit" disabled=${pe}>${C("save",{size:14})} Save changes</button>
      </div>
    </form>

    <${he} open=${!!ce} title="Separate this reported name?"
      body=${ce?`${ce.name.reported_name} will become a new category with no SteamGridDB match or artwork.`:""}
      confirmLabel="Separate" onCancel=${()=>me(null)} onConfirm=${ge} />
    <${he} open=${we} title="Merge these categories?"
      body=${a&&ue?`${a.display_name} will disappear. ${(a.reported_names||[]).map(g=>g.reported_name).join(", ")} will move to ${ue.display_name}, whose appearance and metadata will win.`:""}
      confirmLabel="Merge category" danger onCancel=${()=>j(!1)} onConfirm=${k} />
  </div>`}var Pn=[["overview","server","Overview"],["users","users","Users"],["categories","film","Game categories"],["settings","sliders","Settings"],["jobs","alert","Jobs"]];function Cs(e){return e?.role==="admin"||e?.role==="owner"}var Ss={overview:["overview","failedUploads","deadJobs"],users:["users","settings"],settings:["settings"],categories:["categories"],jobs:["failedUploads","deadJobs","recentErrors"]},xs={overview:"/api/v1/admin/overview",settings:"/api/v1/admin/settings",users:"/api/v1/users",categories:"/api/v1/admin/game-categories",failedUploads:"/api/v1/admin/uploads/failed?limit=50",deadJobs:"/api/v1/admin/jobs/dead?limit=50",recentErrors:"/api/v1/admin/jobs/recent-errors?limit=50"};async function Ts(e,t){let a=await Promise.all(Ss[e].map(async n=>[n,await x(xs[n],{signal:t})]));return Object.fromEntries(a)}function Mn({route:e}){let{user:t}=te(B),a=Cs(t),n=!!(t&&!a),r=Pn.some(([v])=>v===e.tab)?e.tab:"overview",[s,i]=b(null),[c,d]=b(0),[u,p]=b({}),f=Ie(async v=>{if(u[r])return u[r];let w=await Ts(r,v);return v.aborted||p(T=>({...T,[r]:w})),w},[r,c]),{data:l,error:m}=Ne(a?`admin:${r}:${c}`:null,f,u[r]||null),_=()=>{p({}),d(v=>v+1)};return M(()=>{n&&(y("Admin access required."),J("/library"))},[n]),a?o`<main class="page">
    <h1>Admin</h1>
    <p class="page-subtitle">Accounts, instance summary, and processing diagnostics.</p>
    <nav class="ad-tabs" aria-label="Admin views">
      ${Pn.map(([v,w,T])=>o`<a key=${v} class=${`ad-tab ${v===r?"ad-tab-on":""}`}
        href=${v==="categories"?"/admin/game-categories":`/admin?tab=${v}`}
        aria-current=${v===r?"page":void 0}>${C(w,{size:14})} ${T}</a>`)}
    </nav>
    ${m?o`<${se} name="alert" title="Couldn't load admin data" body=${m.message} />`:l?r==="users"?o`<${$n} users=${l.users} settings=${l.settings} currentUser=${t}
          resetLink=${s} setResetLink=${i} reload=${_} />`:r==="settings"?o`<${yn} settings=${l.settings} isOwner=${t?.role==="owner"} reload=${_} />`:r==="categories"?o`<${Tn} data=${l.categories} reload=${_} categoryId=${e.categoryId} />`:r==="jobs"?o`<${kn} failedUploads=${l.failedUploads} deadJobs=${l.deadJobs} recentErrors=${l.recentErrors} reload=${_} />`:o`<${gn} overview=${l.overview} deadJobs=${l.deadJobs} failedUploads=${l.failedUploads} />`:o`<p class="empty-state">Loading admin data…</p>`}
  </main>`:null}fe();function Rn(e){let t=String(e||"").trim();return t||null}async function Ps(e){let t=new Headers;t.set("Accept","application/json"),t.set("Content-Type",e.type||"application/octet-stream");let a=zt();a&&t.set("X-CSRF-Token",a);let n=await fetch("/api/v1/me/avatar",{method:"PUT",credentials:"same-origin",headers:t,body:e}),r=await n.json().catch(()=>({}));if(!n.ok)throw new Error(r.error||n.statusText||"Avatar upload failed");return r}function En(e){B.set({...B.get(),user:e})}function Ms({user:e}){let[t,a]=b(!1);async function n(r){if(r.preventDefault(),t)return;a(!0);let s=new FormData(r.currentTarget);try{let i=await x("/api/v1/me/profile",{method:"PATCH",body:{display_name:Rn(s.get("display_name")),bio:Rn(s.get("bio"))}});En(i),y("Profile saved.")}catch(i){y(i.message)}finally{a(!1)}}return o`<form class="profile-form" onSubmit=${n}>
    <label class="field"><span>Display name</span>
      <input class="input" name="display_name" maxlength="120" value=${e.display_name||""} placeholder=${e.username} /></label>
    <label class="field"><span>Bio</span>
      <textarea class="input" name="bio" rows="5" maxlength="2000" placeholder="Tell people what you upload.">${e.bio||""}</textarea></label>
    <div class="clip-inline-actions">
      <button class="btn btn-primary" type="submit" disabled=${t}>${C("save",{size:14})} Save profile</button>
    </div>
  </form>`}function Rs({user:e}){let[t,a]=b(!1);async function n(r){if(r.preventDefault(),t)return;let s=r.currentTarget.elements.avatar?.files?.[0];if(!s){y("Choose an avatar image first.");return}a(!0);try{let i=await Ps(s);En(i),y("Avatar uploaded.")}catch(i){y(i.message)}finally{a(!1)}}return o`<form class="profile-form" onSubmit=${n}>
    <label class="field"><span>Avatar</span>
      <input name="avatar" type="file" accept="image/png,image/jpeg,image/webp,image/gif" />
      <small>PNG, JPEG, WebP, or GIF. Max 2 MiB.</small></label>
    <div class="clip-inline-actions">
      <button class="btn" type="submit" disabled=${t}>${C("upload",{size:14})} Upload avatar</button>
    </div>
  </form>`}function Un(){let{user:e}=te(B);return e?o`<main class="page">
    <h1>Profile</h1>
    <p class="page-subtitle">Public identity and avatar.</p>
    <div class="profile-settings-header">
      <${Ae} user=${e} size=${72} />
      <div>
        <h2>${e.display_name||e.username}</h2>
        <p>@${e.username} · ${e.role}</p>
      </div>
    </div>
    <${Ms} user=${e} />
    <${Rs} user=${e} />
    <div class="profile-public-link">
      <a class="btn" href=${`/u/${encodeURIComponent(e.username)}`}>${C("external",{size:14})} View public profile</a>
    </div>
  </main>`:null}fe();async function Es(e){let t={signal:e},[a,n]=await Promise.all([x("/api/v1/auth/sessions",t),x("/api/v1/auth/device-tokens",t)]);return{sessions:a,deviceTokens:n}}function Us({item:e,onRevoke:t}){return o`<div class="management-item">
    <div>
      <strong>${e.user_agent||"Unknown browser"}</strong>
      <div class="meta-line">
        <span>${e.ip_address||"Unknown IP"}</span>
        <span>Last used ${re(e.last_used_at||e.created_at)}</span>
        <span>Expires ${re(e.expires_at)}</span>
      </div>
    </div>
    <div class="actions">
      ${e.current&&o`<span class="badge badge-public">Current</span>`}
      <button class="btn btn-danger" type="button" onClick=${()=>t(e)}>${C("x",{size:14})} Revoke</button>
    </div>
  </div>`}function Ds({item:e,onRevoke:t}){let a=!!e.revoked_at;return o`<div class="management-item">
    <div>
      <strong>${e.name}</strong>
      <div class="meta-line">
        <span>Created ${re(e.created_at)}</span>
        <span>Last used ${re(e.last_used_at)}</span>
        ${e.expires_at&&o`<span>Expires ${re(e.expires_at)}</span>`}
        ${a&&o`<span>Revoked ${re(e.revoked_at)}</span>`}
      </div>
    </div>
    <div class="actions">
      <span class=${`badge ${a?"badge-private":"badge-public"}`}>${a?"Revoked":"Active"}</span>
      <button class="btn btn-danger" type="button" disabled=${a} onClick=${()=>t(e)}>${C("x",{size:14})} Revoke</button>
    </div>
  </div>`}function Dn(){let[e,t]=b(0),{data:a,error:n}=Ne(e,Es),[r,s]=b(null),i=()=>t(d=>d+1);async function c(){let d=r;s(null);try{if(d.kind==="session"){if(await x(`/api/v1/auth/sessions/${encodeURIComponent(d.item.id)}`,{method:"DELETE",body:{}}),d.item.current){Te(null),B.set({user:null,csrfToken:null,ready:!0}),y("Current session revoked."),J("/login");return}y("Session revoked.")}else await x(`/api/v1/auth/device-tokens/${encodeURIComponent(d.item.id)}`,{method:"DELETE",body:{}}),y("Device token revoked.");i()}catch(u){y(u.message)}}return n?o`<main class="page"><${se} name="alert" title="Couldn't load account data" body=${n.message} /></main>`:o`<main class="page">
    <h1>Account</h1>
    <p class="page-subtitle">Sessions and device tokens.</p>
    ${a?o`<div class="account-grid">
          <div class="panel">
            <div class="section-header"><h2>Browser sessions</h2><span class="muted">${a.sessions.length} active</span></div>
            ${a.sessions.length?o`<div class="management-list">${a.sessions.map(d=>o`<${Us} key=${d.id} item=${d}
                  onRevoke=${u=>s({kind:"session",item:u})} />`)}</div>`:o`<p class="muted">No active sessions.</p>`}
          </div>
          <div class="panel">
            <div class="section-header"><h2>Device tokens</h2><span class="muted">${a.deviceTokens.length} total</span></div>
            ${a.deviceTokens.length?o`<div class="management-list">${a.deviceTokens.map(d=>o`<${Ds} key=${d.id} item=${d}
                  onRevoke=${u=>s({kind:"device",item:u})} />`)}</div>`:o`<p class="muted">No device tokens.</p>`}
          </div>
        </div>`:o`<p class="empty-state">Loading account data…</p>`}
    <${he} open=${!!r}
      title=${r?.kind==="session"?"Revoke browser session?":"Revoke device token?"}
      body=${r?.kind==="session"?r.item.current?"This signs you out of the current browser session.":"This signs out that browser session immediately.":"The desktop client using this token will need to reconnect."}
      confirmLabel="Revoke" danger
      onConfirm=${c} onCancel=${()=>s(null)} />
  </main>`}function Ln({route:e}){let{user:t}=te(B),a=`/api/v1/public/users/${encodeURIComponent(e.username)}`,{data:n,error:r}=_e(a);if(r)return o`<main class="page"><${se} name="alert" title="Profile unavailable" body=${r.message} /></main>`;if(!n)return o`<main class="page"><p class="empty-state">Loading profile…</p></main>`;let s=t&&t.username.toLowerCase()===n.username.toLowerCase(),i=n.clips||[];return o`<main class="page">
    <header class="public-user-header">
      <${Ae} user=${n} size=${72} />
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
    ${i.length===0?o`<${se} name="film" title="No public clips yet" />`:o`<div class="card-grid">
          ${i.map(c=>o`<${Oe} key=${c.share_id}
            clip=${{...c,thumbnail_url:Me(c),media_url:Fe(c)}}
            href=${`/c/${encodeURIComponent(c.share_id)}`} showAuthor=${!1} />`)}
        </div>`}
  </main>`}var An="Clipline is a self-hosted clip library for saved gameplay moments.";function Tt(e,t){return o`<div><dt>${e}</dt><dd>${t}</dd></div>`}function In(){let{data:e}=_e("/api/v1/about",0,{about_text:An}),t=e?.about_text||An;return o`<main class="page">
    <h1>About</h1>
    <p class="page-subtitle">Clipline Cloud</p>
    <div class="panel about-panel">
      <h2>Clipline Cloud</h2>
      <p class="about-text">${t}</p>
      <dl class="ad-kv">
        ${Tt("Home","Public clips that are ready for discovery.")}
        ${Tt("Unlisted","Shareable by link, but not listed on Home.")}
        ${Tt("Private","Visible only to the clip owner.")}
        ${Tt("Media","Public and unlisted clips are not DRM-protected.")}
      </dl>
    </div>
  </main>`}var Ls={publicLibrary:jt,publicGame:jt,games:Za,library:en,clip:Wt,public:Wt,login:hn,resetPassword:bn,admin:Mn,profile:Un,account:Dn,publicUser:Ln,about:In},Nn=We(window.location.pathname,window.location.search).name;function As(){let e=Ba();Nn=e.name;let{ready:t,user:a}=te(B),n=t&&Aa(e.name,a);if(M(()=>{n&&J("/login")},[n]),!t&&!ft(e.name)||n)return o`<div class="boot">Loading…</div>`;let r=Ls[e.name],s=e.name==="login"||e.name==="resetPassword";return o`<div class="ui" onClick=${za}>
    ${!s&&o`<${Oa} active=${Ft(e)} route=${e} />`}
    <${r} route=${e} />
    ${!s&&o`<${Va} active=${Ia(e)} />`}
    <${Ha} />
  </div>`}window.addEventListener("clipline:unauthorized",()=>{Te(null),B.set({user:null,csrfToken:null,ready:!0}),ft(Nn)||J("/login")});var Bn=document.querySelector("#app");Bn.textContent="";_a(o`<${As} />`,Bn);(async()=>{try{let e=await x("/api/v1/auth/me");Te(e.csrf_token),B.set({user:e.user,csrfToken:e.csrf_token,ready:!0})}catch{Te(null),B.set({user:null,csrfToken:null,ready:!0})}})();
