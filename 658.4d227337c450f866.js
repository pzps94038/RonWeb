(self.webpackChunkRonWeb=self.webpackChunkRonWeb||[]).push([[658],{6966:(F,L,i)=>{"use strict";i.r(L),i.d(L,{ArticleComponent:()=>Me});var e=i(9416),j=i(4755),B=i(8884),g=i(5855),u=i(9300),k=i(4004),p=i(8505),f=i(4968),V=i(262),H=i(8746),A=i(1415),O=i(9415),I=i(8028),P=i(2993),E=i(5249),N=i(3665),X=i(992),$=i(7579),D=i(2722),Q=i(928),R=i(9779);let m=(()=>{class l{constructor(){this.deviceSrv=(0,e.f3M)(Q.U),this.themeSrv=(0,e.f3M)(R.f),this.elementRef=(0,e.f3M)(e.SBq),this.router=(0,e.f3M)(A.F0),this.darkMode$=(0,g.Dx)(this.themeSrv.darkMode),this._destroy$=new $.x}ngOnInit(){this.router.events.pipe((0,u.h)(n=>n instanceof A.OD),(0,D.R)(this._destroy$)).subscribe(()=>this.elementRef.nativeElement.innerHTML=""),this.router.events.pipe((0,u.h)(n=>n instanceof A.m2),(0,D.R)(this._destroy$)).subscribe(()=>this.generateComment())}ngAfterViewInit(){this.generateComment()}ngOnDestroy(){this._destroy$.next(null),this._destroy$.complete(),this.elementRef.nativeElement.innerHTML=""}generateComment(){if(!this.deviceSrv.isClient)return;const n=this.elementRef.nativeElement;this.darkMode$.pipe((0,D.R)(this._destroy$)).subscribe(x=>{this.elementRef.nativeElement.innerHTML="";const w=document.createElement("script");(new Date).getTime(),w.setAttribute("src","https://giscus.app/client.js"),w.setAttribute("data-repo","pzps94038/RonWeb"),w.setAttribute("data-repo-id","R_kgDOJU7i_Q"),w.setAttribute("data-category","Announcements"),w.setAttribute("data-category-id","DIC_kwDOJU7i_c4CWkJZ"),w.setAttribute("data-strict","1"),w.setAttribute("data-mapping","title"),w.setAttribute("data-reactions-enabled","1"),w.setAttribute("data-emit-metadata","0"),w.setAttribute("data-theme",x?"dark_tritanopia":"light_tritanopia"),w.setAttribute("data-lang","zh-TW"),w.setAttribute("data-loading","lazy"),w.setAttribute("crossorigin","anonymous"),w.setAttribute("async",""),n.appendChild(w)})}}return l.\u0275fac=function(n){return new(n||l)},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-giscus"]],standalone:!0,features:[e.jDz],decls:0,vars:0,template:function(n,x){},dependencies:[j.ez],encapsulation:2,changeDetection:0}),l})();var v=i(7929),J=i(9309),G=i(2958),re=i(4052);const le=function(l){return["/setting","article","edit",l]};function ie(l,C){if(1&l&&(e.TgZ(0,"li",26)(1,"a",27)(2,"div",12),e._UZ(3,"ng-icon",28),e.qZA(),e._uU(4," \u4fee\u6539\u6587\u7ae0 "),e.qZA()()),2&l){const n=e.oxw(3);e.xp6(1),e.Q6J("routerLink",e.VKq(1,le,n.articleId))}}const se=function(l){return["/blog","label",l]};function ce(l,C){if(1&l&&(e.TgZ(0,"a",29),e._UZ(1,"ng-icon",30),e.TgZ(2,"h5"),e._uU(3),e.qZA()()),2&l){const n=C.$implicit;e.Q6J("routerLink",e.VKq(2,se,n.labelId)),e.xp6(3),e.Oqu(n.labelName)}}function ae(l,C){if(1&l&&(e.TgZ(0,"a",32),e.ALo(1,"safe"),e._uU(2),e.qZA()),2&l){const n=C.$implicit;e.Q6J("href",e.xi3(1,2,n,"url"),e.LSH),e.xp6(2),e.Oqu(n)}}function he(l,C){if(1&l&&(e.TgZ(0,"div"),e._uU(1," \u53c3\u8003\u6587\u7ae0: "),e.YNc(2,ae,3,5,"a",31),e.qZA()),2&l){const n=e.oxw(3);e.xp6(2),e.Q6J("ngForOf",n.article().references)}}const ee=function(l){return["/blog","article",l]};function we(l,C){if(1&l&&(e.TgZ(0,"a",36)(1,"div",37)(2,"span",38),e._uU(3,"\u2190"),e.qZA(),e._uU(4," \u4e0a\u4e00\u7bc7\u6587\u7ae0 "),e.qZA(),e.TgZ(5,"div",39),e._uU(6),e.qZA()()),2&l){const n=e.oxw(4);e.Q6J("routerLink",e.VKq(2,ee,null==n.article().prevArticle?null:n.article().prevArticle.articleId)),e.xp6(6),e.hij(" ",n.article().prevArticle.articleTitle," ")}}function ge(l,C){if(1&l&&(e.TgZ(0,"a",36)(1,"div",40),e._uU(2," \u4e0b\u4e00\u7bc7\u6587\u7ae0 "),e.TgZ(3,"span",38),e._uU(4,"\u2192"),e.qZA()(),e.TgZ(5,"div",41),e._uU(6),e.qZA()()),2&l){const n=e.oxw(4);e.Q6J("routerLink",e.VKq(2,ee,n.article().nextArticle.articleId)),e.xp6(6),e.hij(" ",n.article().nextArticle.articleTitle," ")}}function ve(l,C){if(1&l&&(e.ynx(0),e._UZ(1,"div",25),e.TgZ(2,"div",4)(3,"div",33),e.YNc(4,we,7,4,"a",34),e.qZA(),e.TgZ(5,"div",35),e.YNc(6,ge,7,4,"a",34),e.qZA()(),e.BQk()),2&l){const n=e.oxw(3);let x,w;e.xp6(4),e.Q6J("ngIf",null==(x=n.article())?null:x.prevArticle),e.xp6(2),e.Q6J("ngIf",null==(w=n.article())?null:w.nextArticle)}}const de=function(l){return["/blog","category",l]},pe=function(){return[]};function ue(l,C){if(1&l){const n=e.EpF();e.ynx(0),e.TgZ(1,"div")(2,"div",4)(3,"h3",5),e._uU(4),e.qZA(),e.TgZ(5,"div",6)(6,"div",7),e._UZ(7,"ng-icon",8),e.qZA(),e.TgZ(8,"ul",9)(9,"li",10),e.NdJ("click",function(){e.CHM(n);const w=e.oxw(2);return e.KtG(w.toggleFullscreenMode())}),e.TgZ(10,"a",11)(11,"div",12),e._UZ(12,"ng-icon",13),e.qZA(),e._uU(13),e.qZA()(),e.YNc(14,ie,5,3,"li",14),e.qZA()()(),e.TgZ(15,"div")(16,"div",15),e._UZ(17,"ng-icon",16),e.TgZ(18,"h4"),e._uU(19),e.ALo(20,"dayJs"),e.qZA()(),e.TgZ(21,"a",17),e._UZ(22,"ng-icon",18),e.TgZ(23,"h5"),e._uU(24),e.qZA()(),e.TgZ(25,"div",19),e.YNc(26,ce,4,4,"a",20),e.qZA()()(),e._UZ(27,"div",21)(28,"div",22),e.ALo(29,"safe"),e._UZ(30,"div",23)(31,"div",22),e.ALo(32,"safe"),e.YNc(33,he,3,1,"div",24),e.YNc(34,ve,7,2,"ng-container",24),e._UZ(35,"div",25)(36,"app-giscus"),e.BQk()}if(2&l){const n=e.oxw(2);let x,w;e.xp6(4),e.Oqu(n.article().articleTitle),e.xp6(1),e.ekj("dropdown-left",n.isFullscreen()),e.xp6(8),e.hij(" ",n.isFullscreen()?"\u95dc\u9589\u5168\u87a2\u5e55\u6a21\u5f0f":"\u5168\u87a2\u5e55\u6a21\u5f0f"," "),e.xp6(1),e.Q6J("ngIf",n.isLogin()),e.xp6(5),e.Oqu(e.xi3(20,13,n.article().createDate,"YYYY/MM/DD")),e.xp6(2),e.Q6J("routerLink",e.VKq(22,de,n.article().categoryId)),e.xp6(3),e.Oqu(n.article().categoryName),e.xp6(2),e.Q6J("ngForOf",null!==(x=null==(x=n.article())?null:x.labels)&&void 0!==x?x:e.DdM(24,pe)),e.xp6(2),e.Q6J("innerHTML",e.xi3(29,16,n.article().previewContent,"html"),e.oJD),e.xp6(3),e.Q6J("innerHTML",e.xi3(32,19,n.article().content,"html"),e.oJD),e.xp6(2),e.Q6J("ngIf",null==n.article().references?null:n.article().references.length),e.xp6(1),e.Q6J("ngIf",(null==(w=n.article())?null:w.prevArticle)||(null==(w=n.article())?null:w.nextArticle))}}function ke(l,C){if(1&l&&(e.ynx(0),e.YNc(1,ue,37,25,"ng-container",1),e.BQk()),2&l){const n=e.oxw(),x=e.MAs(3);e.xp6(1),e.Q6J("ngIf",!n.isLoading()&&n.article())("ngIfElse",x)}}function ye(l,C){1&l&&(e.TgZ(0,"div",15),e._UZ(1,"div",44),e.qZA())}function xe(l,C){1&l&&e._UZ(0,"div",45)}const fe=function(){return[1,2]},_e=function(){return[1,2,3,4,5,6,7,8,9,10]};function me(l,C){1&l&&(e.TgZ(0,"div"),e.YNc(1,ye,2,0,"div",42),e.qZA(),e._UZ(2,"div",21),e.TgZ(3,"div"),e.YNc(4,xe,1,0,"div",43),e.qZA()),2&l&&(e.xp6(1),e.Q6J("ngForOf",e.DdM(2,fe)),e.xp6(3),e.Q6J("ngForOf",e.DdM(3,_e)))}function Ce(l,C){if(1&l){const n=e.EpF();e.TgZ(0,"app-error",46),e.NdJ("refresh",function(){e.CHM(n);const w=e.oxw();return e.KtG(w.getArticleById(w.articleId(),!1))}),e.qZA()}}let Me=(()=>{class l{constructor(){this.articleSrv=(0,e.f3M)(B.n),this.route=(0,e.f3M)(A.gz),this.apiSrv=(0,e.f3M)(v.s),this.seoSrv=(0,e.f3M)(J.v),this.codeBlockSrv=(0,e.f3M)(G.n),this.el=(0,e.f3M)(e.SBq),this.router=(0,e.f3M)(A.F0),this.userSrv=(0,e.f3M)(re.K),this.isLogin=this.userSrv.isLogin,this.articleId=(0,e.tdS)(void 0),this.article=(0,e.tdS)(void 0),this.isLoading=(0,e.tdS)(!1),this.isError=(0,e.tdS)(!1),this.isFullscreen=(0,e.tdS)(!1),this._destroyRef=(0,e.f3M)(e.ktI)}ngOnInit(){this.route.paramMap.pipe((0,u.h)(n=>!!n.get("id")),(0,k.U)(n=>n.get("id")),(0,k.U)(n=>parseInt(n)),(0,p.b)(n=>this.articleId.set(n)),(0,g.sL)(this._destroyRef)).subscribe(n=>this.getArticleById(n)),(0,f.R)(document,"fullscreenchange").pipe((0,g.sL)(this._destroyRef)).subscribe(()=>this.isFullscreen.set(!!document.fullscreenElement))}getArticleById(n,x=!0){this.articleSrv.getArticleById(n,x).pipe((0,p.b)(()=>this.isLoading.set(!0)),(0,V.K)(w=>{throw this.isError.set(!0),w}),(0,H.x)(()=>this.isLoading.set(!1)),(0,g.sL)(this._destroyRef)).subscribe(w=>{if(this.apiSrv.ifSuccess(w,!1)){const{data:U}=w,{articleTitle:ne,previewContent:Be}=U;this.seoSrv.setSeo({description:Be,title:ne,keywords:ne}),this.article.set(U),this.updateArticleViews(n),this.codeBlockSrv.highlightAllBlock()}else w.returnCode===O.N.NotFound?this.router.navigate(["blog","notFound"]):this.isError.set(!0)})}updateArticleViews(n){this.articleSrv.updateArticleViews(n).pipe((0,g.sL)(this._destroyRef)).subscribe()}toggleFullscreenMode(){var n,x,w,U;document.fullscreenElement?(document.exitFullscreen(),null===(n=this.el.nativeElement)||void 0===n||null===(x=n.style)||void 0===x||x.removeProperty("overflow")):(null===(w=this.el.nativeElement)||void 0===w||w.requestFullscreen(),null!==(U=this.el.nativeElement)&&void 0!==U&&U.style&&(this.el.nativeElement.style.overflow="auto"))}}return l.\u0275fac=function(n){return new(n||l)},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-article"]],standalone:!0,features:[e._Bn([(0,P.kp)({heroCalendarDays:E.mVh,heroHashtag:E.u2C,heroTag:E.PRH,heroFolder:E.Mak,featherMaximize2:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>',featherMaximize:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>',heroPencilSquare:E.yUl,heroEllipsisVertical:E.DYl})]),e.jDz],decls:6,vars:2,consts:[[1,"bg-base-100","border","border-base-content/10","text-base-content","rounded-md","mx-0","md:mx-5","p-5","mb-5"],[4,"ngIf","ngIfElse"],["loading",""],["error",""],[1,"flex","justify-between"],[1,"text-xl","font-semibold"],[1,"dropdown","dropdown-hover","bg-base-100"],["tabindex","0","role","button",1,"m-1"],["name","heroEllipsisVertical","size","24"],["tabindex","0",1,"dropdown-content","menu","z-[1]","w-44","shadow","border","bg-base-100"],[1,"cursor-pointer","w-full","flex",3,"click"],[1,"w-full","flex"],[1,"flex","justify-center","items-center"],["name","featherMaximize"],["class","cursor-pointer w-full flex",4,"ngIf"],[1,"flex","items-center"],["name","heroCalendarDays",1,"mr-1"],[1,"flex","items-center","link","link-secondary",3,"routerLink"],["name","heroFolder",1,"mr-1"],[1,"flex","flex-wrap"],["class","flex items-center link link-secondary mr-1",3,"routerLink",4,"ngFor","ngForOf"],[1,"divider","my-1"],[1,"ck-content","break-words","overflow-x-auto","py-3",3,"innerHTML"],[1,"py-5"],[4,"ngIf"],[1,"divider","my-5"],[1,"cursor-pointer","w-full","flex"],[1,"w-full","flex",3,"routerLink"],["name","heroPencilSquare"],[1,"flex","items-center","link","link-secondary","mr-1",3,"routerLink"],["name","heroHashtag"],["class","link text-[#4C99E6] block overflow-hidden text-ellipsis","target","_blank",3,"href",4,"ngFor","ngForOf"],["target","_blank",1,"link","text-[#4C99E6]","block","overflow-hidden","text-ellipsis",3,"href"],[1,"w-1/2","flex","justify-start"],[3,"routerLink",4,"ngIf"],[1,"w-1/2","flex","justify-end","flex-wrap"],[3,"routerLink"],[1,"w-full","flex","justify-start","items-center","text-left"],[1,"text-xl"],[1,"w-full","py-1","flex","justify-start","items-center","link","link-info","text-left"],[1,"w-full","flex","justify-end","items-center","text-right"],[1,"w-full","py-1","flex","justify-end","items-center","link","link-info","text-right"],["class","flex items-center",4,"ngFor","ngForOf"],["class","h-5 my-3 w-full rounded-lg bg-slate-300/10 relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-300/10 before:bg-gradient-to-r before:from-transparent before:bg-slate-300/10 before:to-transparent overflow-hidden",4,"ngFor","ngForOf"],[1,"h-5","my-2","w-full","rounded-lg","bg-slate-300/10","relative","before:absolute","before:inset-0","before:-translate-x-full","before:animate-[shimmer_2s_infinite]","before:border-t","before:border-slate-300/10","before:bg-gradient-to-r","before:from-transparent","before:bg-slate-300/10","before:to-transparent","overflow-hidden"],[1,"h-5","my-3","w-full","rounded-lg","bg-slate-300/10","relative","before:absolute","before:inset-0","before:-translate-x-full","before:animate-[shimmer_2s_infinite]","before:border-t","before:border-slate-300/10","before:bg-gradient-to-r","before:from-transparent","before:bg-slate-300/10","before:to-transparent","overflow-hidden"],[3,"refresh"]],template:function(n,x){if(1&n&&(e.TgZ(0,"div",0),e.YNc(1,ke,2,2,"ng-container",1),e.YNc(2,me,5,4,"ng-template",null,2,e.W1O),e.YNc(4,Ce,1,0,"ng-template",null,3,e.W1O),e.qZA()),2&n){const w=e.MAs(5);e.xp6(1),e.Q6J("ngIf",!x.isError())("ngIfElse",w)}},dependencies:[j.ez,j.sg,j.O5,I.q,P.Fv,N.g,A.rH,X.y,m]}),l})()},8028:(F,L,i)=>{"use strict";i.d(L,{q:()=>B});var e=i(9416),j=i(5512);let B=(()=>{class g{constructor(){this.errorOptions={path:"assets/lottie/error-404.json"},this.refreshEmitter=new e.vpe}}return g.\u0275fac=function(k){return new(k||g)},g.\u0275cmp=e.Xpm({type:g,selectors:[["app-error"]],outputs:{refreshEmitter:"refresh"},standalone:!0,features:[e.jDz],decls:5,vars:1,consts:[[3,"options"],[1,"flex","justify-center","items-center"],[1,"btn","btn-warning",3,"click"]],template:function(k,p){1&k&&(e.TgZ(0,"div"),e._UZ(1,"ng-lottie",0),e.TgZ(2,"div",1)(3,"button",2),e.NdJ("click",function(){return p.refreshEmitter.emit(!0)}),e._uU(4,"\u91cd\u65b0\u6574\u7406"),e.qZA()()()),2&k&&(e.xp6(1),e.Q6J("options",p.errorOptions))},dependencies:[j.r],changeDetection:0}),g})()},3665:(F,L,i)=>{"use strict";i.d(L,{g:()=>g});var e=i(1764),B=i(9416);let g=(()=>{class u{transform(p,f){return e(p).format(f)}}return u.\u0275fac=function(p){return new(p||u)},u.\u0275pipe=B.Yjl({name:"dayJs",type:u,pure:!0,standalone:!0}),u})()},681:(F,L,i)=>{"use strict";i.d(L,{Z:()=>k});var e=i(9416),j=i(928),B=i(9646),g=i(8505),u=i(4782);let k=(()=>{class p{constructor(){this.transferState=(0,e.f3M)(e.kie),this.deviceSrv=(0,e.f3M)(j.U)}transfer(V,H,A=!0){const O=(0,e.Cb6)(V);if(this.transferState.hasKey(O)&&A){const I=this.transferState.get(O,void 0);return(0,B.of)(I)}return H().pipe((0,g.b)(P=>{this.deviceSrv.isServer&&this.transferState.set(O,P)}),(0,u.d)())}}return p.\u0275fac=function(V){return new(V||p)},p.\u0275prov=e.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),p})()},1764:function(F){F.exports=function(){"use strict";var i=6e4,e=36e5,j="millisecond",B="second",g="minute",u="hour",k="day",p="week",f="month",V="quarter",H="year",A="date",O="Invalid Date",I=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,P=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,E={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(s){var r=["th","st","nd","rd"],t=s%100;return"["+s+(r[(t-20)%10]||r[t]||r[0])+"]"}},N=function(s,r,t){var c=String(s);return!c||c.length>=r?s:""+Array(r+1-c.length).join(t)+s},X={s:N,z:function(s){var r=-s.utcOffset(),t=Math.abs(r),c=Math.floor(t/60),o=t%60;return(r<=0?"+":"-")+N(c,2,"0")+":"+N(o,2,"0")},m:function s(r,t){if(r.date()<t.date())return-s(t,r);var c=12*(t.year()-r.year())+(t.month()-r.month()),o=r.clone().add(c,f),h=t-o<0,a=r.clone().add(c+(h?-1:1),f);return+(-(c+(t-o)/(h?o-a:a-o))||0)},a:function(s){return s<0?Math.ceil(s)||0:Math.floor(s)},p:function(s){return{M:f,y:H,w:p,d:k,D:A,h:u,m:g,s:B,ms:j,Q:V}[s]||String(s||"").toLowerCase().replace(/s$/,"")},u:function(s){return void 0===s}},$="en",D={};D[$]=E;var Q=function(s){return s instanceof J},R=function s(r,t,c){var o;if(!r)return $;if("string"==typeof r){var h=r.toLowerCase();D[h]&&(o=h),t&&(D[h]=t,o=h);var a=r.split("-");if(!o&&a.length>1)return s(a[0])}else{var d=r.name;D[d]=r,o=d}return!c&&o&&($=o),o||!c&&$},m=function(s,r){if(Q(s))return s.clone();var t="object"==typeof r?r:{};return t.date=s,t.args=arguments,new J(t)},v=X;v.l=R,v.i=Q,v.w=function(s,r){return m(s,{locale:r.$L,utc:r.$u,x:r.$x,$offset:r.$offset})};var J=function(){function s(t){this.$L=R(t.locale,null,!0),this.parse(t)}var r=s.prototype;return r.parse=function(t){this.$d=function(c){var o=c.date,h=c.utc;if(null===o)return new Date(NaN);if(v.u(o))return new Date;if(o instanceof Date)return new Date(o);if("string"==typeof o&&!/Z$/i.test(o)){var a=o.match(I);if(a){var d=a[2]-1||0,_=(a[7]||"0").substring(0,3);return h?new Date(Date.UTC(a[1],d,a[3]||1,a[4]||0,a[5]||0,a[6]||0,_)):new Date(a[1],d,a[3]||1,a[4]||0,a[5]||0,a[6]||0,_)}}return new Date(o)}(t),this.$x=t.x||{},this.init()},r.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},r.$utils=function(){return v},r.isValid=function(){return this.$d.toString()!==O},r.isSame=function(t,c){var o=m(t);return this.startOf(c)<=o&&o<=this.endOf(c)},r.isAfter=function(t,c){return m(t)<this.startOf(c)},r.isBefore=function(t,c){return this.endOf(c)<m(t)},r.$g=function(t,c,o){return v.u(t)?this[c]:this.set(o,t)},r.unix=function(){return Math.floor(this.valueOf()/1e3)},r.valueOf=function(){return this.$d.getTime()},r.startOf=function(t,c){var o=this,h=!!v.u(c)||c,a=v.p(t),d=function(Z,b){var z=v.w(o.$u?Date.UTC(o.$y,b,Z):new Date(o.$y,b,Z),o);return h?z:z.endOf(k)},_=function(Z,b){return v.w(o.toDate()[Z].apply(o.toDate("s"),(h?[0,0,0,0]:[23,59,59,999]).slice(b)),o)},y=this.$W,M=this.$M,S=this.$D,T="set"+(this.$u?"UTC":"");switch(a){case H:return h?d(1,0):d(31,11);case f:return h?d(1,M):d(0,M+1);case p:var Y=this.$locale().weekStart||0,W=(y<Y?y+7:y)-Y;return d(h?S-W:S+(6-W),M);case k:case A:return _(T+"Hours",0);case u:return _(T+"Minutes",1);case g:return _(T+"Seconds",2);case B:return _(T+"Milliseconds",3);default:return this.clone()}},r.endOf=function(t){return this.startOf(t,!1)},r.$set=function(t,c){var o,h=v.p(t),a="set"+(this.$u?"UTC":""),d=(o={},o[k]=a+"Date",o[A]=a+"Date",o[f]=a+"Month",o[H]=a+"FullYear",o[u]=a+"Hours",o[g]=a+"Minutes",o[B]=a+"Seconds",o[j]=a+"Milliseconds",o)[h],_=h===k?this.$D+(c-this.$W):c;if(h===f||h===H){var y=this.clone().set(A,1);y.$d[d](_),y.init(),this.$d=y.set(A,Math.min(this.$D,y.daysInMonth())).$d}else d&&this.$d[d](_);return this.init(),this},r.set=function(t,c){return this.clone().$set(t,c)},r.get=function(t){return this[v.p(t)]()},r.add=function(t,c){var o,h=this;t=Number(t);var a=v.p(c),d=function(M){var S=m(h);return v.w(S.date(S.date()+Math.round(M*t)),h)};if(a===f)return this.set(f,this.$M+t);if(a===H)return this.set(H,this.$y+t);if(a===k)return d(1);if(a===p)return d(7);var _=(o={},o[g]=i,o[u]=e,o[B]=1e3,o)[a]||1,y=this.$d.getTime()+t*_;return v.w(y,this)},r.subtract=function(t,c){return this.add(-1*t,c)},r.format=function(t){var c=this,o=this.$locale();if(!this.isValid())return o.invalidDate||O;var h=t||"YYYY-MM-DDTHH:mm:ssZ",a=v.z(this),d=this.$H,_=this.$m,y=this.$M,M=o.weekdays,S=o.months,T=function(b,z,q,K){return b&&(b[z]||b(c,h))||q[z].slice(0,K)},Y=function(b){return v.s(d%12||12,b,"0")},W=o.meridiem||function(b,z,q){var K=b<12?"AM":"PM";return q?K.toLowerCase():K},Z={YY:String(this.$y).slice(-2),YYYY:this.$y,M:y+1,MM:v.s(y+1,2,"0"),MMM:T(o.monthsShort,y,S,3),MMMM:T(S,y),D:this.$D,DD:v.s(this.$D,2,"0"),d:String(this.$W),dd:T(o.weekdaysMin,this.$W,M,2),ddd:T(o.weekdaysShort,this.$W,M,3),dddd:M[this.$W],H:String(d),HH:v.s(d,2,"0"),h:Y(1),hh:Y(2),a:W(d,_,!0),A:W(d,_,!1),m:String(_),mm:v.s(_,2,"0"),s:String(this.$s),ss:v.s(this.$s,2,"0"),SSS:v.s(this.$ms,3,"0"),Z:a};return h.replace(P,function(b,z){return z||Z[b]||a.replace(":","")})},r.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},r.diff=function(t,c,o){var h,a=v.p(c),d=m(t),_=(d.utcOffset()-this.utcOffset())*i,y=this-d,M=v.m(this,d);return M=(h={},h[H]=M/12,h[f]=M,h[V]=M/3,h[p]=(y-_)/6048e5,h[k]=(y-_)/864e5,h[u]=y/e,h[g]=y/i,h[B]=y/1e3,h)[a]||y,o?M:v.a(M)},r.daysInMonth=function(){return this.endOf(f).$D},r.$locale=function(){return D[this.$L]},r.locale=function(t,c){if(!t)return this.$L;var o=this.clone(),h=R(t,c,!0);return h&&(o.$L=h),o},r.clone=function(){return v.w(this.$d,this)},r.toDate=function(){return new Date(this.valueOf())},r.toJSON=function(){return this.isValid()?this.toISOString():null},r.toISOString=function(){return this.$d.toISOString()},r.toString=function(){return this.$d.toUTCString()},s}(),G=J.prototype;return m.prototype=G,[["$ms",j],["$s",B],["$m",g],["$H",u],["$W",k],["$M",f],["$y",H],["$D",A]].forEach(function(s){G[s[1]]=function(r){return this.$g(r,s[0],s[1])}}),m.extend=function(s,r){return s.$i||(s(r,J,m),s.$i=!0),m},m.locale=R,m.isDayjs=Q,m.unix=function(s){return m(1e3*s)},m.en=D[$],m.Ls=D,m.p={},m}()},4782:(F,L,i)=>{"use strict";i.d(L,{d:()=>B});var e=i(4707),j=i(3099);function B(g,u,k){let p,f=!1;return g&&"object"==typeof g?({bufferSize:p=1/0,windowTime:u=1/0,refCount:f=!1,scheduler:k}=g):p=null!=g?g:1/0,(0,j.B)({connector:()=>new e.t(p,u,k),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:f})}}}]);