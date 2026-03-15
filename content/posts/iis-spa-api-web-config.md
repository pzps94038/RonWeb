---
{
  'title': 'IIS 部署前端 SPA + API 共存範例：完整 web.config 設定',
  'categoryId': 1,
  'categoryName': '前端',
  'labels': [{ 'labelId': 7, 'labelName': '.Net Core' }, { 'labelId': 33, 'labelName': 'Angular' }],
  'createDate': '2025-06-16T18:30:01.208Z',
  'references': [],
  'flag': 'Y',
}
---

## IIS 站台配置

![](/assets/images/iis-spa-api-web-config/1.png)

## 資料夾配置

![](/assets/images/iis-spa-api-web-config/2.png)

## web.config 配置

```plaintext
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
				<!-- 前端的靜態檔 -->
      	<rule name="wwwroot-static" stopProcessing="true">
					<match url="([\w\W]+[.](html|htm|svg|js|css|png|gif|jpg|jpeg|json)$)" />
					<action type="Rewrite" url="wwwroot/{R:1}" />
				</rule>
				<!-- 空路由處理 -->
				<rule name="empty-root-index" stopProcessing="true">
					<match url="^$" />
					<action type="Rewrite" url="wwwroot/index.html" />
				</rule>
				<!-- 前端SPA路由處理 -->
				<rule name="Html5-Routes" stopProcessing="true">
					<match url=".*" />
					<conditions logicalGrouping="MatchAll">
						<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
    				<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
						<add input="{REQUEST_URI}" pattern="api/" negate="true" />
					</conditions>
					<action type="Rewrite" url="wwwroot/{R:1}" />
				</rule>
      </rules>
    </rewrite>
		<!-- 如果是 C# .net Core 後端 /> -->
   	<!-- <handlers>
			<add name="StaticFileModuleHtml" path="*.htm*" verb="*" modules="StaticFileModule" resourceType="File" requireAccess="Read" />
			<add name="StaticFileModuleSvg" path="*.svg" verb="*" modules="StaticFileModule" resourceType="File" requireAccess="Read" />
			<add name="StaticFileModuleJs" path="*.js" verb="*" modules="StaticFileModule" resourceType="File" requireAccess="Read" />
			<add name="StaticFileModuleSecureJs" path="*.securejs" verb="*" modules="StaticFileModule" resourceType="File" requireAccess="Read" />
			<add name="StaticFileModuleCss" path="*.css" verb="*" modules="StaticFileModule" resourceType="File" requireAccess="Read" />
			<add name="StaticFileModuleJpeg" path="*.jpeg" verb="*" modules="StaticFileModule" resourceType="File" requireAccess="Read" />
			<add name="StaticFileModuleJpg" path="*.jpg" verb="*" modules="StaticFileModule" resourceType="File" requireAccess="Read" />
			<add name="StaticFileModulePng" path="*.png" verb="*" modules="StaticFileModule" resourceType="File" requireAccess="Read" />
			<add name="StaticFileModuleGif" path="*.gif" verb="*" modules="StaticFileModule" resourceType="File" requireAccess="Read" />
			<add name="StaticFileModuleJson" path="*.json" verb="*" modules="StaticFileModule" resourceType="File" requireAccess="Read" />
			<add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
		</handlers> -->
		<!-- 如果是 C# .net Core 後端 /> -->
		<!-- <aspNetCore processPath="dotnet" arguments=".\API.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" hostingModel="inprocess" >
		</aspNetCore>	   -->
  </system.webServer>
</configuration>

```
