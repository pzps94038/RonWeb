"use strict";(self.webpackChunkRonWeb=self.webpackChunkRonWeb||[]).push([[478],{7478:(B,l,o)=>{o.r(l),o.d(l,{ProjectExperienceDetailComponent:()=>I});var _=o(4755),e=o(9416),s=o(5855),d=o(9401),p=o(1415),g=o(2993),E=o(5249),h=o(8746),u=o(9300),x=o(3900),m=o(2266),P=o(8028),D=o(7915),C=o(3665),M=o(7929),f=o(9096);const j=function(n){return["/setting","project-experience","edit",n]};function T(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"tr")(1,"th",10)(2,"a",11),e._UZ(3,"ng-icon",12),e.qZA(),e.TgZ(4,"button",13),e.NdJ("click",function(){const c=e.CHM(t).$implicit,L=e.oxw(3);return e.KtG(L.deleteProjectExperience(c.projectExperienceId))}),e._UZ(5,"ng-icon",14),e.qZA()(),e.TgZ(6,"td"),e._uU(7),e.qZA(),e.TgZ(8,"td"),e._uU(9),e.ALo(10,"dayJs"),e.qZA()()}if(2&n){const t=a.$implicit;e.xp6(2),e.Q6J("routerLink",e.VKq(6,j,t.projectExperienceId)),e.xp6(5),e.Oqu(t.name),e.xp6(2),e.Oqu(e.xi3(10,3,t.createDate,"YYYY/MM/DD"))}}function v(n,a){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"div",3)(2,"button",4),e._uU(3," \u65b0\u589e\u5c08\u6848\u7d93\u6b77 "),e.qZA()(),e.TgZ(4,"div",5)(5,"table",6)(6,"thead")(7,"tr"),e._UZ(8,"th"),e.TgZ(9,"th",7),e._uU(10,"\u5c08\u6848\u540d\u7a31"),e.qZA(),e.TgZ(11,"th",7),e._uU(12,"\u5efa\u7acb\u65e5\u671f"),e.qZA()()(),e.TgZ(13,"tbody"),e.YNc(14,T,11,8,"tr",8),e.qZA()()(),e.TgZ(15,"app-pagination",9),e.NdJ("change",function(i){e.CHM(t);const c=e.oxw(2);return e.KtG(c.paginationChange(i))}),e.qZA(),e.BQk()}if(2&n){const t=e.oxw(2);e.xp6(14),e.Q6J("ngForOf",t.projectExperiences()),e.xp6(1),e.Q6J("total",t.total())("currentPage",t.page())}}function A(n,a){if(1&n&&(e.ynx(0),e.YNc(1,v,16,3,"ng-container",0),e.BQk()),2&n){const t=e.oxw(),r=e.MAs(2);e.xp6(1),e.Q6J("ngIf",!t.isLoading())("ngIfElse",r)}}function Z(n,a){1&n&&(e.TgZ(0,"tr")(1,"td"),e._UZ(2,"div",15),e.qZA(),e.TgZ(3,"td"),e._UZ(4,"div",15),e.qZA(),e.TgZ(5,"td"),e._UZ(6,"div",15),e.qZA()())}const O=function(){return[1,2,3,4,5]};function b(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"div",5)(1,"table",6)(2,"tbody")(3,"tr"),e._UZ(4,"td"),e.TgZ(5,"td",7),e._uU(6,"\u5c08\u6848\u540d\u7a31"),e.qZA(),e.TgZ(7,"td",7),e._uU(8,"\u5efa\u7acb\u65e5\u671f"),e.qZA()(),e.YNc(9,Z,7,0,"tr",8),e.qZA()()(),e.TgZ(10,"app-pagination",9),e.NdJ("change",function(i){e.CHM(t);const c=e.oxw();return e.KtG(c.paginationChange(i))}),e.qZA()}if(2&n){const t=e.oxw();e.xp6(9),e.Q6J("ngForOf",e.DdM(3,O)),e.xp6(1),e.Q6J("total",t.total())("currentPage",t.page())}}function U(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"div",16)(1,"app-error",17),e.NdJ("refresh",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.getProjectExperience(i.page()))}),e.qZA()()}}let I=(()=>{class n{constructor(){this.projectExperienceSrv=(0,e.f3M)(m.n),this.apiSrv=(0,e.f3M)(M.s),this.swalSrv=(0,e.f3M)(f.J),this.route=(0,e.f3M)(p.gz),this.router=(0,e.f3M)(p.F0),this.total=(0,e.tdS)(0),this.projectExperiences=(0,e.tdS)([]),this.isLoading=(0,e.tdS)(!1),this.isError=(0,e.tdS)(!1),this.page=(0,e.tdS)(1),this._destroyRef=(0,e.f3M)(e.ktI)}ngOnInit(){this.route.queryParamMap.pipe((0,s.sL)(this._destroyRef)).subscribe(t=>{const r=t.get("page"),i=r?parseInt(r):1;this.page.set(isNaN(i)?1:i),this.getProjectExperience(this.page())})}getProjectExperience(t){this.isError.set(!1),this.isLoading.set(!0),this.projectExperienceSrv.getProjectExperience(t).pipe((0,h.x)(()=>this.isLoading.set(!1)),(0,s.sL)(this._destroyRef)).subscribe({next:r=>{if(this.apiSrv.ifSuccess(r,!1)){const{data:{total:i,projectExperiences:c}}=r;this.total.set(i),this.projectExperiences.set(c)}else this.isError.set(!0)},error:()=>{this.isError.set(!0)}})}paginationChange(t){this.router.navigate(["/setting/project-experience/detail"],{queryParams:{page:t}})}deleteProjectExperience(t){this.swalSrv.confirm({text:"\u78ba\u5b9a\u8981\u522a\u9664\u5c08\u6848\u7d93\u6b77\u55ce?"}).pipe((0,u.h)(({isConfirmed:r})=>r),(0,x.w)(()=>this.projectExperienceSrv.deleteProjectExperience(t)),(0,u.h)(r=>this.apiSrv.ifSuccess(r)),(0,x.w)(r=>this.swalSrv.alert({icon:f.u.Success,text:r.returnMessage})),(0,s.sL)(this._destroyRef)).subscribe(()=>this.paginationChange(1))}search(){this.paginationChange(1)}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-project-experience-detail"]],standalone:!0,features:[e._Bn([(0,g.kp)({heroPencilSquare:E.yUl,heroTrash:E.ciC})]),e.jDz],decls:5,vars:2,consts:[[4,"ngIf","ngIfElse"],["loading",""],["error",""],[1,"mb-5","flex","justify-end"],["routerLink","/setting/project-experience/create",1,"btn","btn-primary"],[1,"overflow-x-auto","w-full"],[1,"table","table-zebra","w-full"],[1,"text-lg"],[4,"ngFor","ngForOf"],[3,"total","currentPage","change"],[1,"flex"],[1,"btn","btn-primary","m-1","flex","justify-center","items-center",3,"routerLink"],["name","heroPencilSquare"],["type","button",1,"btn","btn-error","m-1","flex","justify-center","items-center",3,"click"],["name","heroTrash"],[1,"h-5","my-3","w-full","rounded-lg","bg-slate-300/10","relative","before:absolute","before:inset-0","before:-translate-x-full","before:animate-[shimmer_2s_infinite]","before:border-t","before:border-slate-300/10","before:bg-gradient-to-r","before:from-transparent","before:bg-slate-300/10","before:to-transparent","overflow-hidden"],[1,"bg-base-100","border","border-base-content/10","text-base-content","rounded-md","mx-0","md:mx-5","p-5","mb-5"],[3,"refresh"]],template:function(t,r){if(1&t&&(e.YNc(0,A,2,2,"ng-container",0),e.YNc(1,b,11,4,"ng-template",null,1,e.W1O),e.YNc(3,U,2,0,"ng-template",null,2,e.W1O)),2&t){const i=e.MAs(4);e.Q6J("ngIf",!r.isError())("ngIfElse",i)}},dependencies:[_.ez,_.sg,_.O5,g.Fv,P.q,D.Q,C.g,p.rH,d.u5]}),n})()}}]);