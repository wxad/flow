import{r as C,j as n,a as e,B as v,I as N,T as w,S as y,b as F,c as B,i as A,C as E,d as D,e as S,R as _,f as $}from"./vendor.017680b6.js";const k=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))u(i);new MutationObserver(i=>{for(const d of i)if(d.type==="childList")for(const c of d.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function o(i){const d={};return i.integrity&&(d.integrity=i.integrity),i.referrerpolicy&&(d.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?d.credentials="include":i.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function u(i){if(i.ep)return;i.ep=!0;const d=o(i);fetch(i.href,d)}};k();const M=t=>{let r=t.canvas.parentNode.querySelector("#chart-tooltip");if(!r){r=document.createElement("div"),r.id="chart-tooltip",r.style.pointerEvents="none",r.style.position="absolute",r.style.top="0px",r.style.border="2px solid hsla(149, 93%, 39%, 0.3)",r.style.color="hsla(149, 93%, 39%, 1)",r.style.background="var(--gray-50)",r.style.fontWeight="600",r.style.fontSize="13px",r.style.padding="6px",r.style.lineHeight="1",r.style.textAlign="center";const o=document.createElement("span");r.appendChild(o),t.canvas.parentNode.appendChild(r)}return r},R=t=>{const{chart:r,tooltip:o}=t,u=M(r);if(u.style.opacity=o.opacity===0?0:1,o.body){const h=o.title||[];let g;h.forEach(l=>{g=document.createTextNode(l)});const x=u.querySelector("span");for(;x.firstChild;)x.firstChild.remove();x.appendChild(g)}const{offsetLeft:i,offsetTop:d}=r.canvas;o.caretX<r.width/2?(u.style.transform="translate3d(-1px,calc(-50% + 3px),0)",u.style.borderRadius="4px 4px 4px 0"):(u.style.transform="translate3d(calc(-100% + 1px),calc(-50% + 3px),0)",u.style.borderRadius="4px 4px 0 4px"),u.style.top="0",u.style.left=i+o.caretX+"px",u.style.minWidth="20ch",u.style.top=d+"px"},L={type:"scatter",data:{datasets:[{borderColor:"hsla(149, 93%, 39%, 0.5)",tension:0,showLine:!0,lineTension:0,interpolate:!0,pointRadius:0,borderWidth:4,borderJoinStyle:"round",fill:!0}]},options:{animation:!1,responsive:!0,plugins:{legend:{display:!1},crosshair:{line:{color:"hsla(149, 93%, 39%, 0.3)",width:2},zoom:{enabled:!1},sync:{enabled:!1}},tooltip:{enabled:!1,mode:"interpolate",intersect:!1,yAlign:"bottom",external:R,callbacks:{title:function(t){const{x:r,y:o}=t[0].element;return`${Math.round(o)}px at ${Math.round(r)}px`},label:()=>null}}},scales:{x:{min:300,suggestedMax:1400,type:"linear",title:{text:"\u5C4F\u5E55\u5C3A\u5BF8 (px)",display:!0,color:"rgba(0, 0, 0, 0.68)",font:{size:14,weight:"600"}},grid:{drawTicks:!1,lineWidth:2,borderWidth:2,color:"rgba(0, 0, 0, 0.04)"},ticks:{stepSize:1,count:12,precision:0,padding:10,color:"rgba(0, 0, 0, 0.4)",font:{size:14}}},y:{min:0,suggestedMin:16,suggestedMax:48,title:{text:"\u6D41\u52A8\u5927\u5C0F (px)",display:!0,color:"rgba(0, 0, 0, 0.68)",font:{size:14,weight:"600"},padding:8},grid:{drawTicks:!1,lineWidth:2,borderWidth:2,color:"rgba(0, 0, 0, 0.04)"},ticks:{padding:8,font:{size:14},color:"rgba(0, 0, 0, 0.4)",callback:function(t,r){return r===0?"":t}}}}}};const I=[320,375,480,568,768,960,1024,1280,1440,1600];function O(){const[t,r]=C.exports.useState([{id:Math.random().toString(36).substring(3,8),x:500,y:20},{id:Math.random().toString(36).substring(3,8),x:700,y:30}]),o=C.exports.useRef(null),u=I.map(l=>{if(l<=t[0].x)return{x:l,y:t[0].y,pointsIndex:0,rowSpan:0};if(l>=t[t.length-1].x)return{x:l,y:t[t.length-1].y,pointsIndex:t.length-1,rowSpan:0};const a=t.findIndex(b=>b.x>=l),{x:s,y:p}=t[a],{x:f,y:m}=t[a-1];return{x:l,y:Math.round(m+(p-m)*(l-f)/(s-f)),pointsIndex:a-1,rowSpan:0}});t.map(({x:l},a)=>a===0?u.filter(({x:s})=>s<t[a+1].x).length:a===t.length-1?u.filter(({x:s})=>s>=t[a].x).length:u.filter(({x:s})=>s>=t[a].x&&s<t[a+1].x).length).reduce((l,a,s)=>(u[l]&&(u[l].rowSpan=a),l+a),0);const d=t.map(({x:l,y:a})=>`${l}:text-${a}`).join(" "),c=t.map(({x:l})=>l),h=t.map(({y:l})=>l);let g=`font-size_${h.reduce((l,a)=>`${l}-${a}`)}_${c.reduce((l,a)=>`${l}-${a}`)}`.replaceAll(".","_");const x=[];if(t.length===2){const l=(Number(h[1])-Number(h[0]))/(Number(c[1])-Number(c[0])),a=Number(h[0])-l*Number(c[0]);x.push(`.${g} {
  font-size: clamp(${h[0]}px, ${l*100}vw ${a<0?`- ${Math.abs(a)}`:`+ ${a}`}px, ${h[1]}px);
}`)}else t.forEach((l,a)=>{if(a!==t.length-1){const s=(Number(h[a+1])-Number(h[a]))/(Number(c[a+1])-Number(c[a])),p=Number(h[0])-s*Number(c[0]);x.push(`@media only screen and (min-width: ${c[a]}px) and (max-width: ${c[a+1]}px)  {
.${g} {
  font-size: calc(${s*100}vw ${p<0?`- ${Math.abs(p)}`:`+ ${p}`}px);
  }
}`)}});return t.length>2&&(g=`${d} ${g}`),C.exports.useEffect(()=>{const l=document.getElementById("canvas");(()=>{B.modes.interpolate=A,E.register(D,...S),o.current=new E(l.getContext("2d"),L);var s=o.current.ctx.createLinearGradient(0,0,0,o.current.chartArea.height);s.addColorStop(0,"hsla(149, 93%, 39%, 0.15)"),s.addColorStop(1,"hsla(149, 93%, 39%, 0.01)"),o.current.options.backgroundColor=s})()},[]),C.exports.useEffect(()=>{let l=[{x:t[t.length-1].x<100?0:100,y:t[0].y},...t,{x:t[t.length-1].x<1400?1400:t[t.length-1].x+100,y:t[t.length-1].y}];const{current:a}=o;a&&(a.data.datasets[0].data=l,a.update())},[t]),n("div",{children:[e("header",{className:"sticky top-0 z-1230 bg-white shadow-1",children:n("div",{className:"relative flex items-center justify-between mx-auto px-48 max-w-1800 h-92",children:[e("a",{className:"absolute right-48 top-1/2 -translate-y-1/2",href:"https://github.com/wxad/flow",children:e("svg",{width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",children:e("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M16 0C7.16 0 0 7.16 0 16C0 23.08 4.58 29.06 10.94 31.18C11.74 31.32 12.04 30.84 12.04 30.42C12.04 30.04 12.02 28.78 12.02 27.44C8 28.18 6.96 26.46 6.64 25.56C6.46 25.1 5.68 23.68 5 23.3C4.44 23 3.64 22.26 4.98 22.24C6.24 22.22 7.14 23.4 7.44 23.88C8.88 26.3 11.18 25.62 12.1 25.2C12.24 24.16 12.66 23.46 13.12 23.06C9.56 22.66 5.84 21.28 5.84 15.16C5.84 13.42 6.46 11.98 7.48 10.86C7.32 10.46 6.76 8.82 7.64 6.62C7.64 6.62 8.98 6.2 12.04 8.26C13.32 7.9 14.68 7.72 16.04 7.72C17.4 7.72 18.76 7.9 20.04 8.26C23.1 6.18 24.44 6.62 24.44 6.62C25.32 8.82 24.76 10.46 24.6 10.86C25.62 11.98 26.24 13.4 26.24 15.16C26.24 21.3 22.5 22.66 18.94 23.06C19.52 23.56 20.02 24.52 20.02 26.02C20.02 28.16 20 29.88 20 30.42C20 30.84 20.3 31.34 21.1 31.18C24.2763 30.1077 27.0363 28.0664 28.9917 25.3432C30.947 22.6201 31.9991 19.3524 32 16C32 7.16 24.84 0 16 0Z",fill:"rgba(0, 0, 0, 0.38)"})})}),n("div",{children:[n("h1",{style:{fontFamily:"gilroybold"},className:"flex items-center font-bold text-34 text-black tracking-1",children:[n("svg",{className:"mr-8",width:"32",height:"32",viewBox:"0 0 5 5",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[n("g",{style:{mixBlendMode:"luminosity"},children:[e("path",{d:"M2.5 4.8125C3.77716 4.8125 4.8125 3.77716 4.8125 2.5C4.8125 1.22284 3.77716 0.1875 2.5 0.1875C1.22284 0.1875 0.1875 1.22284 0.1875 2.5C0.1875 3.77716 1.22284 4.8125 2.5 4.8125Z",fill:"#000B76"}),e("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0.562499 2.9375C0.555813 2.93081 0.549451 2.9238 0.543437 2.9165C0.4987 2.70424 0.488423 2.48616 0.512999 2.27062C0.637124 1.91306 0.944249 1.5625 1.375 1.5625C1.875 1.5625 2.39581 1.85419 2.9375 2.4375L2.83037 4.47281C2.72118 4.49094 2.61068 4.50003 2.5 4.5C1.62437 4.5 0.880062 3.93725 0.609249 3.15363C0.627062 3.05856 0.611499 2.9865 0.562499 2.9375Z",fill:"url(#paint0_linear_237_12)"}),e("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0.502375 2.40131C0.664438 2.80044 0.976125 3 1.4375 3C2.4375 3 2.75 1.625 3.6875 1.625C3.99813 1.625 4.24188 1.72794 4.41875 1.93381C4.47281 2.11768 4.50018 2.30835 4.5 2.5C4.5 3.60456 3.60456 4.5 2.5 4.5C1.39544 4.5 0.5 3.60456 0.5 2.5C0.5 2.46688 0.500812 2.434 0.502375 2.40131Z",fill:"url(#paint1_linear_237_12)"})]}),n("defs",{children:[n("linearGradient",{id:"paint0_linear_237_12",x1:"1.71874",y1:"1.5625",x2:"1.71874",y2:"4.37378",gradientUnits:"userSpaceOnUse",children:[e("stop",{stopColor:"#1026F6"}),e("stop",{offset:"1",stopColor:"#000B76"})]}),n("linearGradient",{id:"paint1_linear_237_12",x1:"2.5",y1:"1.625",x2:"2.5",y2:"6.37499",gradientUnits:"userSpaceOnUse",children:[e("stop",{stopColor:"#0099FF"}),e("stop",{offset:"1",stopColor:"#0019FF"})]})]})]}),"Flow"]}),e("h2",{style:{fontFamily:"gilroysemibold"},className:"pl-42 font-bold text-12 text-black text-opacity-50 tracking-1",children:"from WeChat Ads Design."})]})]})}),n("div",{className:"mt-48 mb-32 mx-auto px-48 max-w-1800 text-14 font-medium",children:["Flow \u662F\u4E00\u4E2A\u57FA\u4E8E\u539F\u5B50\u7C7B\u7684\u6D41\u52A8\u7EC4\u4EF6\uFF0C\u4F60\u53EA\u9700\u5173\u5FC3\u5404\u65AD\u70B9\u4E0B\u7684\u6837\u5F0F\uFF0CFlow \u4F1A\u5E2E\u52A9\u4F60\u8BA9\u5B83\u4EEC\u5728\u65AD\u70B9\u95F4\u5E73\u6ED1\u5730\u8FC7\u6E21\uFF0C\u4EE5\u5B9E\u73B0",e("a",{href:"https://wxa.wxs.qq.com/wxad-design/yijie/wxad-flow-example.mp4",target:"blank",className:"border-b-1 border-green text-green mx-4",children:"\u8FD9\u6837"}),"\u7684\u6548\u679C\u3002"]}),n("div",{className:"flex mx-auto px-48 max-w-1800 text-13",children:[n("div",{className:"flex-none mr-36 w-340",children:[n("div",{className:"px-40 pt-20 pb-28 bg-gray-50 rounded-6 shadow-1-tp-200",children:[e("div",{children:t.map(({id:l,x:a,y:s},p)=>n("div",{className:"group relative flex items-center py-30",children:[p!==t.length-1&&e("div",{className:"absolute left-4 top-60 w-1 h-60 border-r-1 border-dashed border-r-gray-600"}),e(v,{className:`absolute -right-35 top-30 transition-opacity opacity-0 invisible ${t.length>2?"group-hover:opacity-100 group-hover:visible":""}`,theme:"light",leftIcon:"delete-outlined",onClick:()=>{r(t.filter((f,m)=>m!==p))}}),n("div",{className:"w-64 font-bold",children:["\u65AD\u70B9 ",p+1]}),n("div",{className:"flex-1 flex",children:[n("div",{className:"relative flex-1 mr-16",children:[e("div",{className:"absolute -top-24 left-0 text-gray-700 text-12",children:"\u5C4F\u5E55\u5BBD\u5EA6"}),e(N,{className:"w-full",rightElement:n("div",{className:"w-28 text-13 text-center font-medium",children:["px",e("div",{className:"absolute top-0 -left-1 w-1 h-full bg-gray-400"})]}),value:`${a}`,cleaveOptions:{numeral:!0,delimiter:""},onChange:({target:{value:f}})=>{const m=[...t];m[p].x=Number(f),r(m)},onBlur:()=>{const f=[...t];f.sort((m,b)=>m.x-b.x),r(f)}})]}),n("div",{className:"relative flex-1",children:[e("div",{className:"absolute -top-24 left-0 text-gray-700 text-12",children:"\u5B57\u4F53\u5927\u5C0F"}),e(N,{className:"w-full",value:`${s}`,cleaveOptions:{numeral:!0,delimiter:""},onChange:({target:{value:f}})=>{const m=[...t];m[p].y=Number(f),r(m)},rightElement:n("div",{className:"w-28 text-13 text-center font-medium",children:["px",e("div",{className:"absolute top-0 -left-1 w-1 h-full bg-gray-400"})]})})]})]})]},l))}),e(v,{className:"block w-full",leftIcon:"add",onClick:()=>{r([...t,{id:Math.random().toString(36).substring(3,8),x:t[t.length-1].x+100,y:t[t.length-1].y+10}])},children:"\u6DFB\u52A0\u65AD\u70B9"})]}),e("div",{className:"mt-16 text-gray-800",children:n("ul",{children:[e("li",{className:"mb-8",children:"1. \u6B64\u9875\u9762\u65E2\u662F\u6D41\u52A8\u6570\u503C\u7684\u52A8\u6001\u8BA1\u7B97\u5668\uFF0C\u540C\u65F6\u4E5F\u901A\u8FC7\u56FE\u8868\u548C\u4EE3\u7801\u6765\u6F14\u793A\u8FD9\u4E2A\u7EC4\u4EF6\u7684\u5177\u4F53\u884C\u4E3A\uFF0C\u8BBE\u8BA1\u5E08\u53EF\u4EE5\u901A\u8FC7\u56FE\u8868\u67E5\u770B\u5404\u65AD\u70B9\u7684\u6D41\u52A8\u6570\u503C\uFF0C\u5F00\u53D1\u8005\u53EF\u4EE5\u901A\u8FC7\u4EE3\u7801\u6765\u7406\u89E3\u539F\u7406\uFF1B"}),n("li",{className:"mb-8",children:["2."," ",e("span",{className:"inline-block mr-4 py-2 px-4 font-medium bg-gray-200 rounded-4",children:"<Flow />"}),"\u662F\u4E00\u4E2A\u57FA\u4E8E\u539F\u5B50\u7C7B\u7684 React \u7EC4\u4EF6\uFF0C\u5728\u8FD0\u884C\u65F6\u5904\u7406\u5305\u542B\u65AD\u70B9\u7684\u7C7B\u540D\uFF0C\u7136\u540E\u52A8\u6001\u52A0\u5165\u65B0\u7684\u6837\u5F0F\uFF0C\u5B8C\u6210\u6D41\u52A8\uFF1B"]}),e("li",{children:"* \u6B64\u793A\u4F8B\u4F7F\u7528\u5B57\u4F53\u5927\u5C0F\u6F14\u793A\u6D41\u52A8\u5173\u7CFB\uFF0C\u5B9E\u9645\u4E0A\u4EFB\u4F55 CSS \u5C5E\u6027\u90FD\u53EF\u4EE5\u5C1D\u8BD5\u6D41\u52A8\u7684\u601D\u8DEF\uFF1B"})]})})]}),n("div",{className:"flex-1 min-w-0",children:[n("div",{className:"flex",children:[e("div",{className:"flex-1 min-w-0",children:e("canvas",{id:"canvas",className:"w-full -mt-16 cursor-crosshair",style:{height:"626px"}})}),e("div",{className:"w-210",children:e(w,{size:"medium",columnsResizable:!1,className:"font-medium",getCellProps:({rowSpan:l},a,s,p)=>{if(l&&p===0)return{rowSpan:l,colSpan:1}},columns:[{dataIndex:"points",width:70,title:"\u65AD\u70B9",render:({pointsIndex:l})=>`\u65AD\u70B9 ${l+1}`},{dataIndex:"x",width:70,title:"\u5C4F\u5E55\u5BBD\u5EA6",render:({x:l})=>`${l} px`},{dataIndex:"y",width:70,title:"\u5B57\u4F53\u5927\u5C0F",render:({y:l})=>`${l} px`}],dataSource:u})})]}),n("div",{className:"pt-28 pl-64",children:[n("div",{className:"flex items-center mb-16 text-20 font-bold",children:["\u7EC4\u4EF6\u4F7F\u7528",e("span",{className:"ml-4 inline-block p-6 font-normal text-14 leading-16 text-tp-700 bg-gray-50 rounded-4",children:"JSX"})]}),e("div",{className:"mb-36 px-16 py-12 bg-gray-50 rounded-6 shadow-1-gray-200",children:e(y,{wrapLines:!0,customStyle:{backgroundColor:"transparent"},linenumberstyle:{color:"#bab6b6"},className:"highlight",language:"html",style:F,children:`<Flow
  as="div"
  className="${d}"
>
  ...
</Flow>`})}),n("div",{className:"flex items-center mb-16 text-20 font-bold",children:["\u6E32\u67D3\u7ED3\u679C",e("span",{className:"ml-4 inline-block p-6 font-normal text-14 leading-16 text-tp-700 bg-gray-50 rounded-4",children:"HTML"})]}),e("div",{className:"mb-36 px-16 py-12 bg-gray-50 rounded-6 shadow-1-gray-200",children:e(y,{style:F,wrapLines:!0,customStyle:{backgroundColor:"transparent"},linenumberstyle:{color:"#bab6b6"},className:"highlight",language:"html",children:`<div className="${g}">
  ...
</div>`})}),n("div",{className:"flex items-center mb-16 text-20 font-bold",children:["\u76F8\u5173\u6837\u5F0F",e("span",{className:"ml-4 inline-block p-6 font-normal text-14 leading-16 text-tp-700 bg-gray-50 rounded-4",children:"CSS"})]}),e("div",{className:"mb-12 px-16 py-12 bg-gray-50 rounded-6 shadow-1-gray-200",children:e(y,{style:F,wrapLines:!0,customStyle:{backgroundColor:"transparent"},linenumberstyle:{color:"#bab6b6"},className:"highlight",language:"css",children:x.join(`
`)})}),n("div",{className:"text-gray-800",children:["\u5728\u53EA\u6709\u4E24\u4E2A\u65AD\u70B9\u7684\u60C5\u51B5\u4E0B\uFF0C",e("span",{className:"inline-block mr-4 py-2 px-4 font-medium bg-gray-200 rounded-4",children:"<Flow />"}),"\u4F1A\u76F4\u63A5\u4EE5\u65B0\u7684\u7C7B\u540D\u66FF\u6362\u4E24\u4E2A\u65AD\u70B9\u7C7B\u540D\uFF0C\u56E0\u4F7F\u7528"," ",e("span",{className:"inline-block mr-4 py-2 px-4 font-medium bg-gray-200 rounded-4",children:"clamp"}),"\u5C31\u53EF\u4EE5\u5B8C\u6210\u6D41\u52A8\u7684\u6548\u679C\u3002"]})]})]})]}),n("div",{className:"mt-140 py-56 text-13 text-tp-600 bg-gray-50 shadow-1-t-gray-200",children:[n("svg",{className:"block mx-auto mb-32",width:"36",height:"36",viewBox:"0 0 5 5",fill:"none",children:[e("path",{d:"M2.5 4.8125C3.77716 4.8125 4.8125 3.77716 4.8125 2.5C4.8125 1.22284 3.77716 0.1875 2.5 0.1875C1.22284 0.1875 0.1875 1.22284 0.1875 2.5C0.1875 3.77716 1.22284 4.8125 2.5 4.8125Z",fill:"#07C160"}),e("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0.562499 2.9375C0.555813 2.93081 0.549451 2.9238 0.543437 2.9165C0.4987 2.70424 0.488423 2.48616 0.512999 2.27062C0.637124 1.91306 0.944249 1.5625 1.375 1.5625C1.875 1.5625 2.39581 1.85419 2.9375 2.4375L2.83037 4.47281C2.72118 4.49094 2.61068 4.50003 2.5 4.5C1.62437 4.5 0.880062 3.93725 0.609249 3.15363C0.627062 3.05856 0.611499 2.9865 0.562499 2.9375Z",fill:"url(#paint0_linear_239_9)"}),e("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0.502375 2.40131C0.664437 2.80044 0.976125 3 1.4375 3C2.4375 3 2.75 1.625 3.6875 1.625C3.99812 1.625 4.24188 1.72794 4.41875 1.93381C4.47281 2.11768 4.50018 2.30835 4.5 2.5C4.5 3.60456 3.60456 4.5 2.5 4.5C1.39544 4.5 0.5 3.60456 0.5 2.5C0.5 2.46688 0.500812 2.434 0.502375 2.40131Z",fill:"url(#paint1_linear_239_9)"}),n("defs",{children:[n("linearGradient",{id:"paint0_linear_239_9",x1:"1.71874",y1:"1.5625",x2:"1.71874",y2:"4.37378",gradientUnits:"userSpaceOnUse",children:[e("stop",{stopColor:"#22D377"}),e("stop",{offset:"1",stopColor:"#3CDF8A"})]}),n("linearGradient",{id:"paint1_linear_239_9",x1:"2.5",y1:"1.625",x2:"2.5",y2:"6.37499",gradientUnits:"userSpaceOnUse",children:[e("stop",{stopColor:"#75F3B1"}),e("stop",{offset:"1",stopColor:"#1EC16C"}),e("stop",{offset:"1",stopColor:"#1FCF73"})]})]})]}),n("div",{className:"text-center mx-auto px-48 max-w-1800",children:[n("div",{className:"flex justify-center",children:[e("div",{className:"relative mr-1 w-30 h-30 bg-tp-400 rounded-b-full",children:e("div",{className:"absolute top-0 left-1/2 w-1/2 h-1/2 bg-gray-50 rounded-tl-full rounded-br-full"})}),n("div",{className:"mr-1 relative w-30 h-30",children:[e("div",{className:"absolute top-0 left-0 w-1/2 h-1/2 bg-tp-400 rounded-tr-full rounded-bl-full"}),e("div",{className:"absolute top-0 left-1/2 w-1/2 h-1/2 bg-tp-400 rounded-tl-full rounded-br-full"}),e("div",{className:"absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-tp-400 rounded-tr-full rounded-bl-full"}),e("div",{className:"absolute top-1/2 left-0 w-1/2 h-1/2 bg-tp-400 rounded-tl-full rounded-br-full"})]}),n("div",{className:"w-30 h-30",children:[e("div",{className:"mb-3 h-8 bg-tp-400"}),e("div",{className:"mb-3 h-8 bg-tp-400"}),e("div",{className:"h-8 bg-tp-400"})]})]}),e("div",{className:"mt-8",children:"aragakey@qq.com"})]})]})]})}_.render(e($.StrictMode,{children:e(O,{})}),document.getElementById("root"));
