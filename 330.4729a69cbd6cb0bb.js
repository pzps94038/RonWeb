"use strict";(self.webpackChunkRonWeb=self.webpackChunkRonWeb||[]).push([[330],{5330:(L,d,r)=>{r.r(d),r.d(d,{ArticleEditComponent:()=>T});var t=r(3020),u=r(4755),s=r(5030),p=r(1686),h=r(6355),v=r(166),m=r(6736),E=r(8505),o=r(9300),l=r(4004),c=r(3900),I=r(8746),C=r(6274),A=r(8884),M=r(3500),g=r(9096),f=r(9148),O=r(2436);function D(i,_){if(1&i){const e=t.EpF();t.ynx(0),t.TgZ(1,"form",2),t.NdJ("ngSubmit",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.submit())}),t.TgZ(2,"div",3),t._UZ(3,"app-input",4),t.qZA(),t.TgZ(4,"div",3),t._UZ(5,"app-select",5),t.qZA(),t.TgZ(6,"div",3),t._UZ(7,"app-editor",6),t.qZA(),t.TgZ(8,"div",3),t._UZ(9,"app-editor",7),t.qZA(),t.TgZ(10,"div",8)(11,"button",9),t._uU(12," \u4fee\u6539\u6587\u7ae0 "),t.qZA()()(),t.BQk()}if(2&i){const e=t.oxw();t.xp6(1),t.Q6J("formGroup",e.form),t.xp6(4),t.Q6J("options",e.categoryOptions()),t.xp6(6),t.ekj("loading",e.editIsLoading()),t.Q6J("disabled",e.editIsLoading())}}function P(i,_){1&i&&t._UZ(0,"app-load-article")}let T=(()=>{class i{constructor(){this.sharedSrv=(0,t.f3M)(M.F),this.swalSrv=(0,t.f3M)(g.J),this.articleCategorySrv=(0,t.f3M)(C.h),this.articleSrv=(0,t.f3M)(A.n),this.route=(0,t.f3M)(f.gz),this.router=(0,t.f3M)(f.F0),this.isLoading=(0,t.tdS)(!1),this.editIsLoading=(0,t.tdS)(!1),this._destroyRef=(0,t.f3M)(t.ktI),this.categoryOptions=(0,t.tdS)([]),this.form=new s.cw({articleId:new s.NI("",[s.kI.required]),articleTitle:new s.NI("",[s.kI.required]),previewContent:new s.NI("",[s.kI.required]),content:new s.NI("",[s.kI.required]),categoryId:new s.NI("",[s.kI.required])})}ngOnInit(){this.route.paramMap.pipe((0,E.b)(()=>this.isLoading.set(!0)),(0,o.h)(e=>!!e.get("id")),(0,l.U)(e=>e.get("id")),(0,c.w)(e=>this.articleSrv.getArticleById(e)),(0,o.h)(e=>this.sharedSrv.ifSuccess(e)),(0,l.U)(({data:e})=>e),(0,E.b)(({articleId:e,articleTitle:a,previewContent:n,content:x,categoryId:B})=>{this.form.get("articleId")?.setValue(e),this.form.get("articleTitle")?.setValue(a),this.form.get("content")?.setValue(x),this.form.get("categoryId")?.setValue(B),this.form.get("previewContent")?.setValue(n)}),(0,c.w)(()=>this.articleCategorySrv.getArticleCategory()),(0,o.h)(e=>this.sharedSrv.ifSuccess(e,!0)),(0,l.U)(({data:{categorys:e}})=>e),(0,l.U)(e=>e.map(({categoryId:a,categoryName:n})=>({value:a,text:n}))),(0,m.sL)(this._destroyRef)).subscribe(e=>{e=[{text:"\u8acb\u9078\u64c7\u6587\u7ae0\u5206\u985e",value:"",disabled:!0},...e],this.categoryOptions.set(e),this.isLoading.set(!1)})}submit(){if(this.form.markAllAsTouched(),!this.form.valid)return;const e={articleId:this.form.get("articleId").value,articleTitle:this.form.get("articleTitle").value,previewContent:this.form.get("previewContent").value,content:this.form.get("content").value,categoryId:this.form.get("categoryId").value,userId:this.sharedSrv.getUserId()};this.editIsLoading.set(!0),this.articleSrv.updateArticle(e).pipe((0,o.h)(a=>this.sharedSrv.ifSuccess(a,!0)),(0,c.w)(({returnMessage:a})=>this.swalSrv.alert({icon:g.u.Success,text:a})),(0,I.x)(()=>this.editIsLoading.set(!1)),(0,m.sL)(this._destroyRef)).subscribe(()=>{this.router.navigate(["/setting/article"])})}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-article-edit"]],standalone:!0,features:[t.jDz],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["loading",""],[3,"formGroup","ngSubmit"],[1,"my-5"],["labelName","\u6587\u7ae0\u6a19\u984c","labelClass","text-lg my-2 text-center md:text-left","placeholder","\u8acb\u8f38\u5165\u6587\u7ae0\u6a19\u984c","formControlName","articleTitle",1,"w-full"],["labelName","\u6587\u7ae0\u5206\u985e","labelClass","text-lg my-2 text-center md:text-left","formControlName","categoryId",1,"w-full",3,"options"],["labelName","\u9810\u89bd\u5167\u5bb9","labelClass","text-lg my-2 text-center md:text-left","placeholder","\u8acb\u8f38\u5165\u9810\u89bd\u5167\u5bb9","formControlName","previewContent"],["labelName","\u6587\u7ae0\u5167\u5bb9","labelClass","text-lg my-2 text-center md:text-left","formControlName","content"],[1,"flex","justify-end","items-center"],["type","submit",1,"btn","btn-primary",3,"disabled"]],template:function(e,a){if(1&e&&(t.YNc(0,D,13,5,"ng-container",0),t.YNc(1,P,1,0,"ng-template",null,1,t.W1O)),2&e){const n=t.MAs(2);t.Q6J("ngIf",!a.isLoading())("ngIfElse",n)}},dependencies:[u.ez,u.O5,h.a,p.P,s.UX,s._Y,s.JJ,s.JL,s.sg,s.u,v.H,O.$]}),i})()}}]);