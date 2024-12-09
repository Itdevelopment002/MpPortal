!function(t,e){var i=i||{};"function"==typeof i&&i.amd?i([],e):"object"==typeof exports&&"object"==typeof module?module.exports=e():"object"==typeof exports?exports.DragSort=e():t.DragSort=e()}(this,(function(){var t,e=0,i={},s={},r=(t=window.MutationObserver||window.WebKitMutationObserver,function(e,i){e&&1===e.nodeType&&(t?new t((function(t,e){i(t)})).observe(e,{childList:!0,subtree:!1}):window.addEventListener&&e.addEventListener("DOMNodeInserted",i,!1))});function a(t,e){if(!t)return this;e=e||{},this.parentElm=t,this.uid=e.uid,this.settings={selector:"*",callbacks:{}},Object.assign(this.settings,e),this.setup(),r(this.parentElm,this.setup.bind(this)),this.bindEvents()}return a.prototype={namespace:"dragsort",setup(){[...this.parentElm.childNodes].forEach((t=>{if(1!=t.nodeType)return t.parentNode.removeChild(t);t.matches(this.settings.selector)&&(t.draggable=!0)})),this.gap=this.getItemsGap(this.parentElm.firstElementChild)},throttle(t,e){var i=!1,s=this;return function(r){i||(t.call(s,r),i=!0,setTimeout((()=>i=!1),e))}},getDraggableElm(t){if(!t.closest)return null;var e=t.closest('[draggable="true"]');return this.uid==i.uid?e:null},dragstart(t,e){i=this;var s,r=this.getDraggableElm(e);r?(this.saveInitialStyles(),this.source=this.getInitialState(),this.target=this.getInitialState(),s=r.getBoundingClientRect(),this.source.elm=r,this.source.idx=this.getNodeIndex(r),this.source.size.width=s.width,this.source.size.height=s.height,t.dataTransfer.effectAllowed="move",this.settings.callbacks.dragStart&&this.settings.callbacks.dragStart(this.source.elm,t),setTimeout(this.afterDragStart.bind(this))):i={}},afterDragStart(){var t="vertical"==this.settings.mode?"height":"width";this.parentElm.classList.add(`${this.namespace}--dragStart`),this.source.elm.style[t]=this.source.size[t]+"px",this.source.elm.classList.add(`${this.namespace}--dragElem`)},dragover(t){t.preventDefault(),t.stopPropagation();var e=t.target;if((e=this.getDraggableElm(e))&&this.target){var i=this.target.elm,s=this.target.hoverDirection;t.dataTransfer.dropEffect="move",this.target.hoverDirection=this.getTargetDirection(t),i==e&&s==this.target.hoverDirection||this.directionAwareDragEnter(t,e)}},dragenter(t,e){(e=this.getDraggableElm(e))&&this.target&&this.isValidElm(e)&&this.source.elm!=e&&this.source.elm&&(this.target.bounding=e.getBoundingClientRect())},directionAwareDragEnter(t,e){var i;t.preventDefault(),t.stopPropagation(),t.dataTransfer.dropEffect="none",this.isValidElm(e)&&this.source.elm!=e&&this.source.elm&&(t.dataTransfer.dropEffect="move",this.cleanupLastTarget(),this.target.elm=e,this.target.idx=this.getNodeIndex(e),e.classList.add("over"),i=Math.abs(this.target.idx-this.source.idx),this.source.elm.classList.toggle(`${this.namespace}--hide`,i>0),"vertical"==this.settings.mode?this.target.elm.style[this.target.hoverDirection?"marginBottom":"marginTop"]=this.source.size.height+this.gap+"px":this.target.elm.style[this.target.hoverDirection?"marginRight":"marginLeft"]=this.source.size.width+this.gap+"px")},dragend(t){if(clearTimeout(this.dragoverTimeout),this.dragoverTimeout=null,this.parentElm.classList.remove(`${this.namespace}--dragStart`),!this.isValidElm(this.target.elm))return this.cleanup();var e=this.target.hoverDirection?this.target.elm.nextElementSibling:this.target.elm;return this.source.elm!=this.target.elm&&this.target.elm&&(this.target.elm.classList.add(`${this.namespace}--noAnim`),this.cleanup(),this.parentElm.insertBefore(this.source.elm,e)),this.source.elm&&this.source.elm.classList.remove(`${this.namespace}--dragElem`,`${this.namespace}--hide`),this.settings.callbacks.dragEnd&&this.settings.callbacks.dragEnd(this.source.elm),this},isTargetLastChild(){return this.parentElm.lastElementChild==this.target.elm},getTargetDirection(t){if(this.target.bounding)return"vertical"==this.settings.mode?t.pageY>this.target.bounding.top+this.target.bounding.height/2?1:0:t.pageX>this.target.bounding.left+this.target.bounding.width/2?1:0},getNodeIndex(t){for(var e=0;t=t.previousSibling;)3==t.nodeType&&/^\s*$/.test(t.data)||e++;return e},isValidElm(t){return t&&t.nodeType&&t.parentNode==this.parentElm},saveInitialStyles(){[...this.parentElm.children].forEach((t=>{t.setAttribute("dragsort-initial-style",t.getAttribute("style"))}))},cleanup(){i={},[...this.parentElm.children].forEach((t=>{t.style=t.getAttribute("dragsort-initial-style"),t.removeAttribute("dragsort-initial-style"),setTimeout((()=>{t.classList.remove(`${this.namespace}--over`,`${this.namespace}--noAnim`,`${this.namespace}--dragElem`)}),50)}))},cleanupLastTarget(){const{elm:t}=this.target;t&&(t.classList.remove(`${this.namespace}--hide`,`${this.namespace}--over`),t.style=t.getAttribute("dragsort-initial-style"))},getInitialState:()=>({elm:null,size:{}}),getItemsGap(t){var e=getComputedStyle(t),i=getComputedStyle(t.parentNode),s="vertical"==this.settings.mode,r=parseInt(i.gap)||0;return parseInt(e["margin"+(s?"Top":"Left")])+parseInt(e["margin"+(s?"Bottom":"Right")])+r},bindEvents(t){for(var e in this.listeners=this.listeners||{dragstart:t=>this.dragstart(t,t.target),dragenter:t=>this.dragenter(t,t.target),dragend:t=>this.dragend(t,t.target),dragover:this.throttle(this.dragover,350)},this.listeners)this.parentElm[t?"removeEventListener":"addEventListener"](e,this.listeners[e])},destroy(){this.cleanup(),this.bindEvents(!0),delete s[this.uid]}},function(t,i){return s[++e]=t.DragSort?s[t.DragSort]:new a(t,{...i,uid:e}),t.DragSort=e,s[e]}}));