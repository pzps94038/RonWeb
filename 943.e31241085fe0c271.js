"use strict";(self.webpackChunkRonWeb=self.webpackChunkRonWeb||[]).push([[943],{5853:(R,u,t)=>{t.r(u),t.d(u,{ArticleCreateComponent:()=>y});var e=t(2223),p=t(4755),v=t(6355),h=t(5177),r=t(9401),d=t(9096),g=t(6274),C=t(166),c=t(9300),o=t(4004),m=t(8505),A=t(4128),E=t(8746),M=t(3900),f=t(5855),O=t(8884),I=t(3262),D=t(2436),P=t(1514),x=t(9379),L=t(7929),T=t(4052);function U(n,_){if(1&n){const s=e.EpF();e.ynx(0),e.TgZ(1,"form",2),e.NdJ("ngSubmit",function(){e.CHM(s);const a=e.oxw();return e.KtG(a.submit())}),e.TgZ(2,"div",3),e._UZ(3,"app-input",4),e.qZA(),e.TgZ(4,"div",3),e._UZ(5,"app-select",5),e.qZA(),e.TgZ(6,"div",3),e._UZ(7,"app-multiple-select",6),e.qZA(),e.TgZ(8,"div",3),e._UZ(9,"app-editor",7),e.qZA(),e.TgZ(10,"div",3),e._UZ(11,"app-editor",8),e.qZA(),e.TgZ(12,"div",9)(13,"button",10),e._uU(14," \u65b0\u589e\u6587\u7ae0 "),e.qZA()()(),e.BQk()}if(2&n){const s=e.oxw();e.xp6(1),e.Q6J("formGroup",s.form),e.xp6(4),e.Q6J("options",s.categoryOptions()),e.xp6(2),e.Q6J("options",s.labelOptions()),e.xp6(6),e.ekj("loading",s.createIsLoading()),e.Q6J("disabled",s.createIsLoading())}}function B(n,_){1&n&&e._UZ(0,"app-load-article")}let y=(()=>{class n{constructor(){this.apiSrv=(0,e.f3M)(L.s),this.userSrv=(0,e.f3M)(T.K),this.swalSrv=(0,e.f3M)(d.J),this.articleCategorySrv=(0,e.f3M)(g.h),this.articleLabelSrv=(0,e.f3M)(P.F),this.articleSrv=(0,e.f3M)(O.n),this.router=(0,e.f3M)(I.F0),this.isLoading=(0,e.tdS)(!1),this.createIsLoading=(0,e.tdS)(!1),this.categoryOptions=(0,e.tdS)([]),this.labelOptions=(0,e.tdS)([]),this.prevFiles=(0,e.tdS)([]),this.contentFiles=(0,e.tdS)([]),this.form=new r.cw({articleTitle:new r.NI("",[r.kI.required]),previewContent:new r.NI("",[r.kI.required,r.kI.maxLength(500)]),labels:new r.NI([],[r.kI.required]),content:new r.NI("",[r.kI.required]),categoryId:new r.NI("",[r.kI.required])}),this._destroyRef=(0,e.f3M)(e.ktI)}ngOnInit(){this.isLoading.set(!0);const s=this.articleCategorySrv.getArticleCategory(void 0,!1).pipe((0,c.h)(a=>this.apiSrv.ifSuccess(a)),(0,o.U)(({data:{categorys:a}})=>a),(0,o.U)(a=>a.map(({categoryId:l,categoryName:b})=>({value:l,text:b}))),(0,m.b)(a=>{a=[{text:"\u8acb\u9078\u64c7\u6587\u7ae0\u5206\u985e",value:"",disabled:!0},...a],this.categoryOptions.set(a)})),i=this.articleLabelSrv.getArticleLabel(void 0,!1).pipe((0,c.h)(a=>this.apiSrv.ifSuccess(a)),(0,o.U)(({data:{labels:a}})=>a),(0,o.U)(a=>a.map(l=>({value:l.labelId,text:l.labelName}))),(0,m.b)(a=>this.labelOptions.set(a)));(0,A.D)([s,i]).pipe((0,E.x)(()=>this.isLoading.set(!1)),(0,f.sL)(this._destroyRef)).subscribe()}submit(){if(this.form.markAllAsTouched(),!this.form.valid)return;const s=this.form.get("labels")?.value??[],i=this.labelOptions().filter(l=>s.includes(l.value)).map(l=>({labelId:l.value,labelName:l.text})),a={articleTitle:this.form.get("articleTitle").value,previewContent:this.form.get("previewContent").value,content:this.form.get("content").value,categoryId:this.form.get("categoryId").value,userId:this.userSrv.getUserId(),prevFiles:this.prevFiles(),contentFiles:this.contentFiles(),labels:i};this.createIsLoading.set(!0),this.articleSrv.createArticle(a).pipe((0,c.h)(l=>this.apiSrv.ifSuccess(l)),(0,M.w)(({returnMessage:l})=>this.swalSrv.alert({icon:d.u.Success,text:l})),(0,E.x)(()=>this.createIsLoading.set(!1)),(0,f.sL)(this._destroyRef)).subscribe(()=>{this.router.navigate(["/setting/article"])})}previewUpload(s){this.prevFiles.update(i=>[...i,s])}contentUpload(s){this.contentFiles.update(i=>[...i,s])}}return n.\u0275fac=function(s){return new(s||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-article-create"]],standalone:!0,features:[e.jDz],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["loading",""],[3,"formGroup","ngSubmit"],[1,"my-5"],["labelName","\u6587\u7ae0\u6a19\u984c","labelClass","text-lg my-2 text-center md:text-left","placeholder","\u8acb\u8f38\u5165\u6587\u7ae0\u6a19\u984c","formControlName","articleTitle",1,"w-full"],["labelName","\u6587\u7ae0\u5206\u985e","labelClass","text-lg my-2 text-center md:text-left","formControlName","categoryId",1,"w-full",3,"options"],["labelName","\u6587\u7ae0\u6a19\u7c64","placeholder","\u8acb\u9078\u64c7\u6587\u7ae0\u6a19\u7c64","labelClass","text-lg my-2 text-center md:text-left","formControlName","labels",1,"w-full",3,"options"],["labelName","\u9810\u89bd\u5167\u5bb9","labelClass","text-lg my-2 text-center md:text-left","placeholder","\u8acb\u8f38\u5165\u9810\u89bd\u5167\u5bb9","formControlName","previewContent"],["labelName","\u6587\u7ae0\u5167\u5bb9","labelClass","text-lg my-2 text-center md:text-left","formControlName","content"],[1,"flex","justify-end","items-center"],["type","submit",1,"btn","btn-primary",3,"disabled"]],template:function(s,i){if(1&s&&(e.YNc(0,U,15,6,"ng-container",0),e.YNc(1,B,1,0,"ng-template",null,1,e.W1O)),2&s){const a=e.MAs(2);e.Q6J("ngIf",!i.isLoading())("ngIfElse",a)}},dependencies:[p.ez,p.O5,v.a,h.P,r.UX,r._Y,r.JJ,r.JL,r.sg,r.u,C.H,x.M,D.$]}),n})()}}]);