"use strict";(self.webpackChunkRonWeb=self.webpackChunkRonWeb||[]).push([[353],{4973:(O,p,r)=>{r.r(p),r.d(p,{SearchComponent:()=>L});var t=r(9416),l=r(4755),d=r(1415),i=r(5855),g=r(9841),h=r(9300),_=r(262),E=r(8746),f=r(8028),v=r(7915),C=r(9908),m=r(4217),M=r(4544),y=r(7929),P=r(8884),D=r(2958);const T=function(a,c){return{categoryId:a,categoryName:c}};function I(a,c){if(1&a){const e=t.EpF();t.TgZ(0,"app-article-card",6),t.NdJ("category",function(n){t.CHM(e);const s=t.oxw(3);return t.KtG(s.navigateCategory(n))})("label",function(n){t.CHM(e);const s=t.oxw(3);return t.KtG(s.navigateLabel(n))})("showMore",function(){const s=t.CHM(e).$implicit,u=t.oxw(3);return t.KtG(u.showMore(s.articleId))}),t.qZA()}if(2&a){const e=c.$implicit,o=t.oxw(3);t.Q6J("title",e.articleTitle)("date",e.createDate)("category",t.WLB(7,T,e.categoryId,e.categoryName))("labels",e.labels)("previewContent",e.previewContent)("highlightKeyword",!0)("keyword",o.keyword())}}function x(a,c){if(1&a&&(t.ynx(0),t.TgZ(1,"div",4)(2,"h3"),t._uU(3),t.qZA()(),t.YNc(4,I,1,10,"app-article-card",5),t.BQk()),2&a){const e=t.oxw(2);t.xp6(3),t.hij("\u4ee5\u4e0b\u662f",e.keyword(),"\u7684\u641c\u5c0b\u7d50\u679c\uff1a"),t.xp6(1),t.Q6J("ngForOf",e.articles())}}function K(a,c){if(1&a&&(t.ynx(0),t.YNc(1,x,5,2,"ng-container",0),t.BQk()),2&a){const e=t.oxw(),o=t.MAs(2);t.xp6(1),t.Q6J("ngIf",!e.isLoading())("ngIfElse",o)}}function S(a,c){1&a&&t._UZ(0,"app-loading-keyword")(1,"app-loading-card")(2,"app-loading-card")(3,"app-loading-card")}function A(a,c){if(1&a){const e=t.EpF();t.TgZ(0,"div",7)(1,"app-error",8),t.NdJ("refresh",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.searchKeyword(n.keyword(),n.page()))}),t.qZA()()}}let L=(()=>{class a{constructor(){this.route=(0,t.f3M)(d.gz),this.router=(0,t.f3M)(d.F0),this.articleSrv=(0,t.f3M)(P.n),this.apiSrv=(0,t.f3M)(y.s),this.codeBlockSrv=(0,t.f3M)(D.n),this.keyword=(0,t.tdS)(""),this.total=(0,t.tdS)(0),this.articles=(0,t.tdS)([]),this.isLoading=(0,t.tdS)(!1),this.isError=(0,t.tdS)(!1),this.page=(0,t.tdS)(1),this._destroyRef=(0,t.f3M)(t.ktI)}ngOnInit(){(0,g.a)([this.route.paramMap,this.route.queryParamMap]).pipe((0,h.h)(([e])=>!!e.get("keyword")||(this.router.navigate(["blog"]),!1)),(0,i.sL)(this._destroyRef)).subscribe(([e,o])=>{const n=e.get("keyword");this.keyword.set(n.trim());const s=o.get("page"),u=s?parseInt(s):1;this.page.set(isNaN(u)?1:u),this.searchKeyword(this.keyword(),this.page())})}searchKeyword(e,o){this.isError.set(!1),this.isLoading.set(!0),this.articleSrv.getArticle(o,e).pipe((0,_.K)(n=>{throw this.isError.set(!0),n}),(0,E.x)(()=>this.isLoading.set(!1)),(0,i.sL)(this._destroyRef)).subscribe(n=>{if(this.apiSrv.ifSuccess(n,!1)){const{data:{total:s,articles:u}}=n;this.total.set(s),this.articles.set(u),this.codeBlockSrv.highlightAllBlock()}else this.isError.set(!0)})}showMore(e){this.router.navigateByUrl(`/blog/article/${e}`)}navigateCategory({categoryId:e}){this.router.navigateByUrl(`/blog/category/${e}`)}navigateLabel({labelId:e}){this.router.navigateByUrl(`/blog/label/${e}`)}paginationChange(e){this.router.navigate(["blog","search",this.keyword()],{queryParams:{page:e}})}}return a.\u0275fac=function(e){return new(e||a)},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-search"]],standalone:!0,features:[t.jDz],decls:6,vars:4,consts:[[4,"ngIf","ngIfElse"],["loading",""],["error",""],[3,"total","currentPage","change"],[1,"p-5","bg-base-100","border","border-base-content/10","text-base-content","rounded-md","mx-0","md:mx-5","mb-5"],[3,"title","date","category","labels","previewContent","highlightKeyword","keyword","label","showMore",4,"ngFor","ngForOf"],[3,"title","date","category","labels","previewContent","highlightKeyword","keyword","label","showMore"],[1,"bg-neutral","text-neutral-content","rounded-md","mx-0","md:mx-5","p-5","mb-5"],[3,"refresh"]],template:function(e,o){if(1&e&&(t.YNc(0,K,2,2,"ng-container",0),t.YNc(1,S,4,0,"ng-template",null,1,t.W1O),t.YNc(3,A,2,0,"ng-template",null,2,t.W1O),t.TgZ(5,"app-pagination",3),t.NdJ("change",function(s){return o.paginationChange(s)}),t.qZA()),2&e){const n=t.MAs(4);t.Q6J("ngIf",!o.isError())("ngIfElse",n),t.xp6(5),t.Q6J("total",o.total())("currentPage",o.page())}},dependencies:[l.ez,l.sg,l.O5,v.Q,C.y,f.q,m.o,M.g]}),a})()},681:(O,p,r)=>{r.d(p,{Z:()=>h});var t=r(9416),l=r(928),d=r(9646),i=r(8505),g=r(4782);let h=(()=>{class _{constructor(){this.transferState=(0,t.f3M)(t.kie),this.deviceSrv=(0,t.f3M)(l.U)}transfer(f,v,C=!0){const m=(0,t.Cb6)(f);if(this.transferState.hasKey(m)&&C){const M=this.transferState.get(m,void 0);return(0,d.of)(M)}return v().pipe((0,i.b)(y=>{this.deviceSrv.isServer&&this.transferState.set(m,y)}),(0,g.d)())}}return _.\u0275fac=function(f){return new(f||_)},_.\u0275prov=t.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"}),_})()},4782:(O,p,r)=>{r.d(p,{d:()=>d});var t=r(4707),l=r(3099);function d(i,g,h){let _,E=!1;return i&&"object"==typeof i?({bufferSize:_=1/0,windowTime:g=1/0,refCount:E=!1,scheduler:h}=i):_=null!=i?i:1/0,(0,l.B)({connector:()=>new t.t(_,g,h),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:E})}}}]);