"use strict";(self.webpackChunkRonWeb=self.webpackChunkRonWeb||[]).push([[227],{5227:(O,u,s)=>{s.r(u),s.d(u,{CodeTypeEditComponent:()=>M});var e=s(9416),l=s(4755),o=s(9401),E=s(6355),p=s(1415),m=s(9096),c=s(5855),h=s(8505),d=s(9300),_=s(4004),f=s(3900),g=s(8746),C=s(7929),T=s(4052),v=s(358);function y(n,a){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"form",2),e.NdJ("ngSubmit",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.submit())}),e.TgZ(2,"div",3),e._UZ(3,"app-input",4),e.qZA(),e.TgZ(4,"div",3),e._UZ(5,"app-input",5),e.qZA(),e.TgZ(6,"div",6)(7,"button",7),e._uU(8," \u4fee\u6539\u4ee3\u78bc\u985e\u578b "),e.qZA()()(),e.BQk()}if(2&n){const t=e.oxw();e.xp6(1),e.Q6J("formGroup",t.form),e.xp6(6),e.ekj("loading",t.isLoading()),e.Q6J("disabled",t.isLoading())}}function I(n,a){1&n&&(e.TgZ(0,"div",8)(1,"div")(2,"div",9),e._UZ(3,"div",10),e.qZA()()())}let M=(()=>{class n{constructor(){this.apiSrv=(0,e.f3M)(C.s),this.userSrv=(0,e.f3M)(T.K),this.swalSrv=(0,e.f3M)(m.J),this.adminCodeTypeSrv=(0,e.f3M)(v.B),this.route=(0,e.f3M)(p.gz),this.router=(0,e.f3M)(p.F0),this.isLoading=(0,e.tdS)(!1),this.editIsLoading=(0,e.tdS)(!1),this.isError=(0,e.tdS)(!1),this._destroyRef=(0,e.f3M)(e.ktI),this.form=new o.cw({id:new o.NI(void 0,[o.kI.required]),codeTypeId:new o.NI("",[o.kI.required]),codeTypeName:new o.NI("",[o.kI.required])})}ngOnInit(){this.route.paramMap.pipe((0,h.b)(()=>this.isLoading.set(!0)),(0,d.h)(t=>!!t.get("id")),(0,_.U)(t=>t.get("id")),(0,d.h)(t=>!isNaN(parseInt(t))),(0,_.U)(t=>parseInt(t)),(0,f.w)(t=>this.adminCodeTypeSrv.getAdminCodeTypeById(t)),(0,d.h)(t=>this.apiSrv.ifSuccess(t)),(0,_.U)(({data:t})=>t),(0,c.sL)(this._destroyRef)).subscribe(t=>{const{id:r,codeTypeId:i,codeTypeName:D}=t;this.form.controls.id.setValue(r),this.form.controls.codeTypeId.setValue(i),this.form.controls.codeTypeName.setValue(D),this.isLoading.set(!1)})}submit(){if(this.form.markAllAsTouched(),this.form.invalid)return;const t={codeTypeId:this.form.controls.codeTypeId.value,codeTypeName:this.form.controls.codeTypeName.value,userId:this.userSrv.getUserId()};this.editIsLoading.set(!0),this.adminCodeTypeSrv.updateAdminCodeType(this.form.controls.id.value,t).pipe((0,d.h)(r=>this.apiSrv.ifSuccess(r,!0)),(0,f.w)(({returnMessage:r})=>this.swalSrv.alert({icon:m.u.Success,text:r})),(0,g.x)(()=>this.editIsLoading.set(!1)),(0,c.sL)(this._destroyRef)).subscribe(()=>this.router.navigate(["/setting/code-type"]))}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-code-type-edit"]],standalone:!0,features:[e.jDz],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["loading",""],[3,"formGroup","ngSubmit"],[1,"my-5"],["labelName","\u4ee3\u78bc\u985e\u578bID","labelClass","text-lg my-2 text-center md:text-left","placeholder","\u8acb\u8f38\u5165\u4ee3\u78bc\u985e\u578bID","formControlName","codeTypeId",1,"w-full"],["labelName","\u4ee3\u78bc\u985e\u578b\u540d\u7a31","labelClass","text-lg my-2 text-center md:text-left","placeholder","\u8acb\u8f38\u5165\u4ee3\u78bc\u985e\u578b\u540d\u7a31","formControlName","codeTypeName",1,"w-full"],[1,"flex","justify-end","items-center"],["type","submit",1,"btn","btn-primary",3,"disabled"],[1,"bg-base-100","border","border-base-content/10","text-base-content","rounded-md","p-5","mb-5"],[1,"flex","items-center"],[1,"h-5","my-2","w-full","rounded-lg","bg-slate-300/10","relative","before:absolute","before:inset-0","before:-translate-x-full","before:animate-[shimmer_2s_infinite]","before:border-t","before:border-slate-300/10","before:bg-gradient-to-r","before:from-transparent","before:bg-slate-300/10","before:to-transparent","overflow-hidden"]],template:function(t,r){if(1&t&&(e.YNc(0,y,9,4,"ng-container",0),e.YNc(1,I,4,0,"ng-template",null,1,e.W1O)),2&t){const i=e.MAs(2);e.Q6J("ngIf",!r.isLoading())("ngIfElse",i)}},dependencies:[l.ez,l.O5,E.a,o.UX,o._Y,o.JJ,o.JL,o.sg,o.u]}),n})()}}]);