---
{
  "title": "C# 簡易驗證碼",
  "categoryId": 2,
  "categoryName": "後端",
  "labels": [
    {
      "labelId": 11,
      "labelName": "驗證碼"
    }
  ],
  "createDate": "2023-05-28T21:42:28.331Z",
  "references": [],
  "flag": "Y"
}
---
## 產生隨機亂數

先產生隨機亂數，並且把亂數存在 Session：

```csharp
/// <summary>
///  產生指定長度的隨機數
/// </summary>
/// <param name="length"></param>
/// <returns></returns>
private static string RandomCode(int length)
{
	string s = "0123456789ZXCVBNMASDFGHJKLQWERTYUIOP";
	StringBuilder sb = new StringBuilder();
	Random rand = new Random();
	int index;
	for (int i = 0; i < length; i++)
	{
		index = rand.Next(0, s.Length);
		sb.Append(s[index]);
	}
	return sb.ToString();
}
```

```csharp
HttpContext.Current.Session["CaptchaCode"] = code;
```

## 隨機顏色

```csharp
/// <summary>
/// 隨機Brushe
/// </summary>
/// <returns></returns>
private static Brush GetRandomBrushe()
{
	Brush[] brus = new Brush[] {
		Brushes.Black,
		Brushes.Red,
		Brushes.DarkBlue,
		Brushes.Brown,
		Brushes.DarkCyan,
		Brushes.Purple
	};
	Random rand = new Random();
    int index;
    index = rand.Next(0, brus.Length);
    return brus[index];
}
```

## 產生驗證碼圖片

範例程式如下：

```csharp
public static byte[] GetCaptchaCode(int len)
{
	byte[] data;
	string code = RandomCode(len);
	HttpContext.Current.Session["CaptchaCode"] = code;
	MemoryStream ms = new MemoryStream();
	using (Bitmap map = new Bitmap(100, 40))
	using (Graphics g = Graphics.FromImage(map))
	{
		// 背景色
		g.Clear(Color.White);
		var brushe = GetRandomBrushe();
		g.DrawString(code, new Font("黑體", 18.0F), brushe, new Point(10, 8));
		//繪製干擾線(數字代表幾條)
		var lineColor = GetRandomBrushe();
		while (lineColor == brushe)
		{
			lineColor = GetRandomBrushe();
		}
		PaintInterLine(g, lineColor, 10, map.Width, map.Height);
		// 繪製干擾點
		var pointColor = GetRandomBrushe();
		while (pointColor == lineColor || pointColor == brushe)
		{
			pointColor = GetRandomBrushe();
		}
		PaintInterPoint(g, pointColor, 50, map.Width, map.Height);
		map.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
	}
	data = ms.GetBuffer();
	return data;
}
```

## 回傳驗證碼

這邊是產生一個 Byte 之後回傳給前端一個檔案，但這個檔案並不存在伺服器上。驗證碼圖片的容量也蠻可觀的，驗證方式再拿 Session 跟輸入做核對即可。

```csharp
/// <summary>
///  取得及顯示驗證碼
/// </summary>
/// <returns></returns>
[HttpGet]
public ActionResult GetValidateCaptchaCode()
{
	byte[] data = CaptchaHelper.GetCaptchaCode(4);
	return File(data, "image/jpeg");
}
```

## 實作完成範例

![](/assets/images/csharp-simple-captcha/1.png)
