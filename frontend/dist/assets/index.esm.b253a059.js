function a(e){const t=parseFloat(e);return typeof t!="number"||Number.isNaN(t)?0:t}function o(e,t){let n=a(e);const r=10**(t!=null?t:10);return n=Math.round(n*r)/r,t?n.toFixed(t):n.toString()}function c(e){if(!Number.isFinite(e))return 0;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n+=1;return n}function l(e,t,n){return(e-t)*100/(n-t)}function s(e,t,n){return(n-t)*e+t}function f(e,t,n){const r=Math.round((e-t)/n)*n+t,u=c(n);return o(r,u)}function i(e,t,n){return e==null?e:(n<t&&console.warn("clamp: max cannot be less than min"),Math.min(Math.max(e,t),n))}export{c as a,i as c,s as p,f as r,o as t,l as v};
