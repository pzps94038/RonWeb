"use strict";(self.webpackChunkRonWeb=self.webpackChunkRonWeb||[]).push([[943],{5853:(N,u,t)=>{t.r(u),t.d(u,{ArticleCreateComponent:()=>K});var e=t(9416),p=t(4755),C=t(6355),h=t(5028),l=t(9401),m=t(9096),A=t(166),d=t(9300),_=t(4004),f=t(8505),g=t(4128),E=t(8746),M=t(3900),v=t(5855),O=t(1415),I=t(2436),D=t(9379),x=t(7929),P=t(4052),U=t(8184),T=t(1781),L=t(2144),B=t(1514),y=t(6274),b=t(231);function R(n,c){if(1&n){const r=e.EpF();e.ynx(0),e.TgZ(1,"form",2),e.NdJ("ngSubmit",function(){e.CHM(r);const a=e.oxw();return e.KtG(a.submit())}),e.TgZ(2,"div",3),e._UZ(3,"app-input",4),e.qZA(),e.TgZ(4,"div",3),e._UZ(5,"app-select",5),e.qZA(),e.TgZ(6,"div",3),e._UZ(7,"app-multiple-select",6),e.qZA(),e.TgZ(8,"div",3),e._UZ(9,"app-toggle",7),e.qZA(),e.TgZ(10,"div",3)(11,"app-editor",8),e.NdJ("upload",function(a){e.CHM(r);const s=e.oxw();return e.KtG(s.previewUpload(a))}),e.qZA()(),e.TgZ(12,"div",3)(13,"app-editor",9),e.NdJ("upload",function(a){e.CHM(r);const s=e.oxw();return e.KtG(s.contentUpload(a))}),e.qZA()(),e.TgZ(14,"div",3),e._UZ(15,"app-dynamic-input",10),e.qZA(),e.TgZ(16,"div",11)(17,"button",12),e._uU(18," \u65b0\u589e\u6587\u7ae0 "),e.qZA()()(),e.BQk()}if(2&n){const r=e.oxw();e.xp6(1),e.Q6J("formGroup",r.form),e.xp6(4),e.Q6J("options",r.categoryOptions()),e.xp6(2),e.Q6J("options",r.labelOptions()),e.xp6(4),e.Q6J("adapter",r.previewContentUploadAdapter),e.xp6(2),e.Q6J("adapter",r.contentUploadAdapter),e.xp6(4),e.ekj("loading",r.createIsLoading()),e.Q6J("disabled",r.createIsLoading())}}function S(n,c){1&n&&e._UZ(0,"app-load-article")}let K=(()=>{class n{constructor(){this.apiSrv=(0,e.f3M)(x.s),this.userSrv=(0,e.f3M)(P.K),this.swalSrv=(0,e.f3M)(m.J),this.articleCategorySrv=(0,e.f3M)(y.h),this.articleLabelSrv=(0,e.f3M)(B.F),this.articleSrv=(0,e.f3M)(U.r),this.uploadAdapterSrv=(0,e.f3M)(b.z),this.router=(0,e.f3M)(O.F0),this.location=(0,e.f3M)(p.Ye),this.isLoading=(0,e.tdS)(!1),this.createIsLoading=(0,e.tdS)(!1),this.categoryOptions=(0,e.tdS)([]),this.labelOptions=(0,e.tdS)([]),this.prevFiles=(0,e.tdS)([]),this.contentFiles=(0,e.tdS)([]),this.previewContentUploadAdapter=this.uploadAdapterSrv.createArticleAdapter(),this.contentUploadAdapter=this.uploadAdapterSrv.createArticleAdapter(),this.form=new l.cw({articleTitle:new l.NI("",[l.kI.required]),labels:new l.NI([],[]),flag:new l.NI("Y",[l.kI.required]),previewContent:new l.NI("",[l.kI.required]),content:new l.NI("",[l.kI.required]),categoryId:new l.NI("",[l.kI.required]),references:new l.NI([])}),this._destroyRef=(0,e.f3M)(e.ktI)}ngOnInit(){this.isLoading.set(!0);const r=this.articleCategorySrv.getArticleCategory().pipe((0,d.h)(a=>this.apiSrv.ifSuccess(a)),(0,_.U)(({data:{categorys:a}})=>a),(0,_.U)(a=>a.map(({categoryId:s,categoryName:i})=>({value:s,text:i}))),(0,f.b)(a=>{a=[{text:"\u8acb\u9078\u64c7\u6587\u7ae0\u5206\u985e",value:"",disabled:!0},...a],this.categoryOptions.set(a)})),o=this.articleLabelSrv.getArticleLabel().pipe((0,d.h)(a=>this.apiSrv.ifSuccess(a)),(0,_.U)(({data:{labels:a}})=>a),(0,_.U)(a=>a.map(s=>({value:s.labelId,text:s.labelName}))),(0,f.b)(a=>this.labelOptions.set(a)));(0,g.D)([r,o]).pipe((0,E.x)(()=>this.isLoading.set(!1)),(0,v.sL)(this._destroyRef)).subscribe()}submit(){var r;if(this.form.markAllAsTouched(),this.form.invalid)return;const o=null!==(r=this.form.controls.labels.value)&&void 0!==r?r:[],a=this.labelOptions().filter(i=>o.includes(i.value)).map(i=>({labelId:i.value,labelName:i.text})),s={articleTitle:this.form.controls.articleTitle.value,previewContent:this.form.controls.previewContent.value,content:this.form.controls.content.value,categoryId:this.form.controls.categoryId.value,flag:this.form.controls.flag.value,userId:this.userSrv.getUserId(),prevFiles:this.prevFiles(),contentFiles:this.contentFiles(),labels:a,references:this.form.controls.references.value};this.createIsLoading.set(!0),this.articleSrv.createArticle(s).pipe((0,d.h)(i=>this.apiSrv.ifSuccess(i)),(0,M.w)(({returnMessage:i})=>this.swalSrv.alert({icon:m.u.Success,text:i})),(0,E.x)(()=>this.createIsLoading.set(!1)),(0,v.sL)(this._destroyRef)).subscribe(()=>this.location.back())}previewUpload(r){this.prevFiles.update(o=>[...o,r])}contentUpload(r){this.contentFiles.update(o=>[...o,r])}}return n.\u0275fac=function(r){return new(r||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-article-create"]],standalone:!0,features:[e.jDz],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["loading",""],[3,"formGroup","ngSubmit"],[1,"my-5"],["labelName","\u6587\u7ae0\u6a19\u984c","labelClass","text-lg my-2 text-center md:text-left","placeholder","\u8acb\u8f38\u5165\u6587\u7ae0\u6a19\u984c","formControlName","articleTitle",1,"w-full"],["labelName","\u6587\u7ae0\u5206\u985e","labelClass","text-lg my-2 text-center md:text-left","formControlName","categoryId",1,"w-full",3,"options"],["labelName","\u6587\u7ae0\u6a19\u7c64","placeholder","\u8acb\u9078\u64c7\u6587\u7ae0\u6a19\u7c64","labelClass","text-lg my-2 text-center md:text-left","formControlName","labels",1,"w-full",3,"options"],["labelName","\u555f\u7528\u6587\u7ae0","labelClass","text-lg my-2 text-center md:text-left","formControlName","flag"],["labelName","\u9810\u89bd\u5167\u5bb9","labelClass","text-lg my-2 text-center md:text-left","placeholder","\u8acb\u8f38\u5165\u9810\u89bd\u5167\u5bb9","formControlName","previewContent",3,"adapter","upload"],["labelName","\u6587\u7ae0\u5167\u5bb9","labelClass","text-lg my-2 text-center md:text-left","formControlName","content",3,"adapter","upload"],["labelName","\u53c3\u8003\u6587\u7ae0","labelClass","text-lg my-2 text-center md:text-left","placeholder","\u8acb\u8f38\u5165\u53c3\u8003\u6587\u7ae0","formControlName","references",1,"w-full"],[1,"flex","justify-end","items-center"],["type","submit",1,"btn","btn-primary",3,"disabled"]],template:function(r,o){if(1&r&&(e.YNc(0,R,19,8,"ng-container",0),e.YNc(1,S,1,0,"ng-template",null,1,e.W1O)),2&r){const a=e.MAs(2);e.Q6J("ngIf",!o.isLoading())("ngIfElse",a)}},dependencies:[p.ez,p.O5,C.a,h.P,l.UX,l._Y,l.JJ,l.JL,l.sg,l.u,A.H,D.M,I.$,T.n,L.b]}),n})()}}]);