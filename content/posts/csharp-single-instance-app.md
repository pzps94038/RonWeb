---
{
  'title': 'C# 檢核程式為單一應用',
  'categoryId': 2,
  'categoryName': '後端',
  'labels':
    [{ 'labelId': 7, 'labelName': '.Net Core' }, { 'labelId': 8, 'labelName': '.Net Framework' }],
  'createDate': '2024-09-03T02:53:52.286Z',
  'references': [],
  'flag': 'Y',
}
---

## 檢核程式碼

以下程式碼用於檢核程序是否為單一實例：

```csharp
System.Diagnostics.Process process = Process.GetCurrentProcess();

if (System.Diagnostics.Process.GetProcessesByName(process.ProcessName).Any(a => a.ProcessName == process.ProcessName && a.Id != process.Id))
{
	Console.WriteLine("Another instance of the application is already running.");
	return;
}
```
