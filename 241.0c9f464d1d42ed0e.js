"use strict";(self.webpackChunkRonWeb=self.webpackChunkRonWeb||[]).push([[241],{8241:(W,l,r)=>{r.r(l),r.d(l,{CodeDetailComponent:()=>K});var e=r(9416),c=r(4755),d=r(5855),p=r(1415),E=r(9841),C=r(8746),u=r(9300),g=r(3900),h=r(9096),m=r(2993),f=r(5249),T=r(8028),D=r(7915),x=r(3665),A=r(7929),Z=r(6737);const M=function(n,s){return["/setting","code-type",n,"edit",s]};function v(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"tr")(1,"th",10)(2,"a",11),e._UZ(3,"ng-icon",12),e.qZA(),e.TgZ(4,"button",13),e.NdJ("click",function(){const a=e.CHM(t).$implicit,_=e.oxw(3);return e.KtG(_.deleteCode(a.id))}),e._UZ(5,"ng-icon",14),e.qZA()(),e.TgZ(6,"td"),e._uU(7),e.qZA(),e.TgZ(8,"td"),e._uU(9),e.qZA(),e.TgZ(10,"td"),e._uU(11),e.ALo(12,"dayJs"),e.qZA()()}if(2&n){const t=s.$implicit,o=e.oxw(3);e.xp6(2),e.Q6J("routerLink",e.WLB(7,M,o.codeTypeId(),t.id)),e.xp6(5),e.Oqu(t.codeId),e.xp6(2),e.Oqu(t.codeName),e.xp6(2),e.Oqu(e.xi3(12,4,t.createDate,"YYYY/MM/DD"))}}const y=function(n){return["/setting","code-type",n,"create"]},O=function(n){return{codeTypeName:n}};function I(n,s){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"div",3)(2,"div")(3,"p"),e._uU(4),e.qZA(),e.TgZ(5,"p"),e._uU(6),e.qZA()(),e.TgZ(7,"button",4),e._uU(8," \u65b0\u589e\u4ee3\u78bc "),e.qZA()(),e.TgZ(9,"div",5)(10,"table",6)(11,"thead")(12,"tr"),e._UZ(13,"th"),e.TgZ(14,"th",7),e._uU(15,"\u4ee3\u78bcID"),e.qZA(),e.TgZ(16,"th",7),e._uU(17,"\u4ee3\u78bc\u540d\u7a31"),e.qZA(),e.TgZ(18,"th",7),e._uU(19,"\u5efa\u7acb\u65e5\u671f"),e.qZA()()(),e.TgZ(20,"tbody"),e.YNc(21,v,13,10,"tr",8),e.qZA()()(),e.TgZ(22,"app-pagination",9),e.NdJ("change",function(i){e.CHM(t);const a=e.oxw(2);return e.KtG(a.paginationChange(i))}),e.qZA(),e.BQk()}if(2&n){const t=e.oxw(2);e.xp6(4),e.hij("\u4ee3\u78bc\u985e\u578bID: ",t.codeTypeId(),""),e.xp6(2),e.hij("\u4ee3\u78bc\u985e\u578b\u540d\u7a31: ",t.codeTypeName(),""),e.xp6(1),e.Q6J("routerLink",e.VKq(7,y,t.codeTypeId()))("state",e.VKq(9,O,t.codeTypeName())),e.xp6(14),e.Q6J("ngForOf",t.codes()),e.xp6(1),e.Q6J("total",t.total())("currentPage",t.page())}}function P(n,s){if(1&n&&(e.ynx(0),e.YNc(1,I,23,11,"ng-container",0),e.BQk()),2&n){const t=e.oxw(),o=e.MAs(2);e.xp6(1),e.Q6J("ngIf",!t.isLoading())("ngIfElse",o)}}function U(n,s){1&n&&(e.TgZ(0,"tr")(1,"td"),e._UZ(2,"div",15),e.qZA(),e.TgZ(3,"td"),e._UZ(4,"div",15),e.qZA(),e.TgZ(5,"td"),e._UZ(6,"div",15),e.qZA(),e.TgZ(7,"td"),e._UZ(8,"div",15),e.qZA()())}const b=function(){return[1,2,3,4,5]};function B(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",5)(1,"table",6)(2,"tbody")(3,"tr"),e._UZ(4,"td"),e.TgZ(5,"th",7),e._uU(6,"\u4ee3\u78bcID"),e.qZA(),e.TgZ(7,"th",7),e._uU(8,"\u4ee3\u78bc\u540d\u7a31"),e.qZA(),e.TgZ(9,"th",7),e._uU(10,"\u5efa\u7acb\u65e5\u671f"),e.qZA()(),e.YNc(11,U,9,0,"tr",8),e.qZA()()(),e.TgZ(12,"app-pagination",9),e.NdJ("change",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.paginationChange(i))}),e.qZA()}if(2&n){const t=e.oxw();e.xp6(11),e.Q6J("ngForOf",e.DdM(3,b)),e.xp6(1),e.Q6J("total",t.total())("currentPage",t.page())}}function L(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",16)(1,"app-error",17),e.NdJ("refresh",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.refreshCode())}),e.qZA()()}}let K=(()=>{class n{constructor(){this.adminCodeSrv=(0,e.f3M)(Z.c),this.apiSrv=(0,e.f3M)(A.s),this.swalSrv=(0,e.f3M)(h.J),this.route=(0,e.f3M)(p.gz),this.router=(0,e.f3M)(p.F0),this.total=(0,e.tdS)(0),this.codes=(0,e.tdS)([]),this.codeTypeId=(0,e.tdS)(null),this.codeTypeName=(0,e.tdS)(null),this.isLoading=(0,e.tdS)(!1),this.isError=(0,e.tdS)(!1),this.page=(0,e.tdS)(1),this._destroyRef=(0,e.f3M)(e.ktI)}ngOnInit(){(0,E.a)([this.route.paramMap,this.route.queryParamMap]).pipe((0,d.sL)(this._destroyRef)).subscribe(([t,o])=>{const i=t.get("code-type-id");this.codeTypeId.set(i);const a=o.get("page"),_=a?parseInt(a):1;this.page.set(isNaN(_)?1:_),this.getAdminCode(i,this.page())})}getAdminCode(t,o){this.isError.set(!1),this.isLoading.set(!0),this.adminCodeSrv.getAdminCode(t,o).pipe((0,C.x)(()=>this.isLoading.set(!1)),(0,d.sL)(this._destroyRef)).subscribe({next:i=>{if(this.apiSrv.ifSuccess(i,!1)){const{data:{total:a,codes:_,codeTypeId:R,codeTypeName:S}}=i;this.total.set(a),this.codes.set(_),this.codeTypeId.set(R),this.codeTypeName.set(S)}else this.isError.set(!0)},error:()=>{this.isError.set(!0)}})}paginationChange(t){this.router.navigate([`/setting/code-type/${this.codeTypeId()}/detail`],{queryParams:{page:t}})}deleteCode(t){this.swalSrv.confirm({title:"\u78ba\u5b9a\u8981\u522a\u9664\u4ee3\u78bc\u55ce?",text:"\u9019\u500b\u64cd\u4f5c\u5c07\u6c38\u4e45\u522a\u9664\u8a72\u4ee3\u78bc\u3002\u8acb\u78ba\u8a8d\u60a8\u7684\u6c7a\u5b9a\uff0c\u56e0\u70ba\u9019\u4e9b\u5167\u5bb9\u5c07\u7121\u6cd5\u6062\u5fa9\u3002"}).pipe((0,u.h)(({isConfirmed:o})=>o),(0,g.w)(()=>this.adminCodeSrv.deleteAdminCode(t)),(0,u.h)(o=>this.apiSrv.ifSuccess(o)),(0,g.w)(o=>this.swalSrv.alert({icon:h.u.Success,text:o.returnMessage})),(0,d.sL)(this._destroyRef)).subscribe(()=>{this.page.set(1),this.getAdminCode(this.codeTypeId(),this.page())})}refreshCode(){this.page.set(1),this.getAdminCode(this.codeTypeId(),this.page())}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-code-detail"]],standalone:!0,features:[e._Bn([(0,m.kp)({heroPencilSquare:f.yUl,heroTrash:f.ciC})]),e.jDz],decls:5,vars:2,consts:[[4,"ngIf","ngIfElse"],["loading",""],["error",""],[1,"mb-5","flex","justify-between","items-center"],[1,"btn","btn-primary",3,"routerLink","state"],[1,"overflow-x-auto","w-full"],[1,"table","table-zebra","w-full"],[1,"text-lg"],[4,"ngFor","ngForOf"],[3,"total","currentPage","change"],[1,"flex"],[1,"btn","btn-primary","m-1","flex","justify-center","items-center",3,"routerLink"],["name","heroPencilSquare"],["type","button",1,"btn","btn-error","m-1","flex","justify-center","items-center",3,"click"],["name","heroTrash"],[1,"h-5","my-3","w-full","rounded-lg","bg-slate-300/10","relative","before:absolute","before:inset-0","before:-translate-x-full","before:animate-[shimmer_2s_infinite]","before:border-t","before:border-slate-300/10","before:bg-gradient-to-r","before:from-transparent","before:bg-slate-300/10","before:to-transparent","overflow-hidden"],[1,"bg-base-100","border","border-base-content/10","text-base-content","rounded-md","mx-0","md:mx-5","p-5","mb-5"],[3,"refresh"]],template:function(t,o){if(1&t&&(e.YNc(0,P,2,2,"ng-container",0),e.YNc(1,B,13,4,"ng-template",null,1,e.W1O),e.YNc(3,L,2,0,"ng-template",null,2,e.W1O)),2&t){const i=e.MAs(4);e.Q6J("ngIf",!o.isError())("ngIfElse",i)}},dependencies:[c.ez,c.sg,c.O5,D.Q,m.Fv,p.rH,x.g,T.q]}),n})()}}]);