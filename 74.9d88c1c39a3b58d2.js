"use strict";(self.webpackChunkRonWeb=self.webpackChunkRonWeb||[]).push([[74],{2074:(E,_,t)=>{t.r(_),t.d(_,{ArticleLabelCreateComponent:()=>f});var e=t(9416),o=t(4755),r=t(9401),u=t(6355),l=t(9096),m=t(1415),a=t(5855),c=t(9300),A=t(3900),p=t(8746),L=t(7929),h=t(4052),v=t(7134);let f=(()=>{class i{constructor(){this.apiSrv=(0,e.f3M)(L.s),this.userSrv=(0,e.f3M)(h.K),this.swalSrv=(0,e.f3M)(l.J),this.articleLabelSrv=(0,e.f3M)(v.j),this.router=(0,e.f3M)(m.F0),this.isLoading=(0,e.tdS)(!1),this._destroyRef=(0,e.f3M)(e.ktI),this.form=new r.cw({labelName:new r.NI("",[r.kI.required])})}submit(){if(this.form.markAllAsTouched(),!this.form.valid)return;const n={labelName:this.form.get("labelName").value,userId:this.userSrv.getUserId()};this.isLoading.set(!0),this.articleLabelSrv.createArticleLabel(n).pipe((0,c.h)(s=>this.apiSrv.ifSuccess(s)),(0,A.w)(({returnMessage:s})=>this.swalSrv.alert({icon:l.u.Success,text:s})),(0,p.x)(()=>this.isLoading.set(!1)),(0,a.sL)(this._destroyRef)).subscribe(()=>{this.router.navigate(["/setting/article-label"])})}}return i.\u0275fac=function(n){return new(n||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-article-label-create"]],standalone:!0,features:[e.jDz],decls:6,vars:4,consts:[[3,"formGroup","ngSubmit"],[1,"my-5"],["labelName","\u6a19\u7c64","labelClass","text-lg my-2 text-center md:text-left","placeholder","\u8acb\u8f38\u5165\u6a19\u7c64","formControlName","labelName",1,"w-full"],[1,"flex","justify-end","items-center"],["type","submit",1,"btn","btn-primary",3,"disabled"]],template:function(n,s){1&n&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return s.submit()}),e.TgZ(1,"div",1),e._UZ(2,"app-input",2),e.qZA(),e.TgZ(3,"div",3)(4,"button",4),e._uU(5," \u65b0\u589e\u6a19\u7c64 "),e.qZA()()()),2&n&&(e.Q6J("formGroup",s.form),e.xp6(4),e.ekj("loading",s.isLoading()),e.Q6J("disabled",s.isLoading()))},dependencies:[o.ez,u.a,r.UX,r._Y,r.JJ,r.JL,r.sg,r.u]}),i})()},7134:(E,_,t)=>{t.d(_,{j:()=>u});var e=t(3144),o=t(9416),r=t(2340);let u=(()=>{class l{constructor(){this.http=(0,o.f3M)(e.eN)}getArticleLabel(a){const c=a?(new e.LE).append("page",a):void 0;return this.http.get(`${r.N.baseUrl}/adminArticleLabel`,{params:c})}getArticleLabelById(a,c=!0){return this.http.get(`${r.N.baseUrl}/adminArticleLabel/${a}`)}updateArticleLabel(a){return this.http.patch(`${r.N.baseUrl}/adminArticleLabel/${a.labelId}`,a)}createArticleLabel(a){return this.http.post(`${r.N.baseUrl}/adminArticleLabel`,a)}deleteArticleLabel(a){return this.http.delete(`${r.N.baseUrl}/adminArticleLabel/${a}`)}}return l.\u0275fac=function(a){return new(a||l)},l.\u0275prov=o.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()}}]);