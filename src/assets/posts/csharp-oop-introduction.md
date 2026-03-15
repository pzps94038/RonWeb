---
{
  "title": "C#  物件導向程式設計（Object-Oriented Programming, OOP）介紹",
  "categoryId": 2,
  "categoryName": "後端",
  "labels": [
    {
      "labelId": 7,
      "labelName": ".Net Core"
    },
    {
      "labelId": 8,
      "labelName": ".Net Framework"
    }
  ],
  "createDate": "2024-08-26T03:55:27.522Z",
  "references": [],
  "flag": "Y"
}
---
## OOP 的四大核心概念

### 封裝（Encapsulation）

將資料和方法封裝在類別中，對外部隱藏內部實現，只暴露必要的接口。這可以保護資料不被外部直接修改。

### 繼承（Inheritance）

允許一個類別從另一個類別繼承屬性和方法，讓子類別（derived class）可以重用父類別（base class）的程式碼，並在此基礎上擴展或修改功能。

### 多型（Polymorphism）

允許不同的類別以相同的接口呼叫相同的方法，實現不同的行為。這通常透過方法覆寫（override）或介面（interface）來達成。

### 抽象（Abstraction）

透過介面或抽象類別來定義類別的行為，而不關注具體的實現細節。這可以讓程式設計更加靈活和可擴展。

## 封裝範例

```csharp
public class Account
{
    // 封裝資料，使用 private 保護變數
    private decimal balance;

    // 透過公開的方法來操作資料
    public void Deposit(decimal amount)
    {
        if (amount > 0)
        {
            balance += amount;
        }
    }

    public void Withdraw(decimal amount)
    {
        if (amount > 0 && amount <= balance)
        {
            balance -= amount;
        }
    }

    public decimal GetBalance()
    {
        return balance;
    }
}

```

## 繼承範例

```csharp
// 基礎類別
public class Animal
{
    public string Name { get; set; }

    public void Eat()
    {
        Console.WriteLine($"{Name} is eating.");
    }
}

// 繼承類別
public class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine($"{Name} is barking.");
    }
}
```

## 多型範例

**基底**：提供了一個共同的方法或屬性，可以被多個不同的類別繼承或實現。

**覆寫**：子類別可以根據需求，覆寫基底類別的方法，以達到多型的效果。

```csharp
public class Animal
{
    public virtual void Speak()
    {
        Console.WriteLine("The animal makes a sound.");
    }
}

public class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("The dog barks.");
    }
}

public class Cat : Animal
{
    public override void Speak()
    {
        Console.WriteLine("The cat meows.");
    }
}

```

## 抽象範例

抽象更像是「合約」，它強制子類別或實現該介面的類別必須實作特定的方法或屬性。抽象類別或介面本身不提供具體實現，而是定義了一個通用的框架，讓子類別決定如何實作。

### 抽象類別

可以包含抽象方法（無實作）和具體方法（有實作）。子類別必須實作所有抽象方法。

### 介面

完全由抽象方法組成，沒有任何具體實作。實現介面的類別必須實作所有方法。

```csharp
// 抽象類別
public abstract class Shape
{
    // 抽象方法，必須由子類別實現
    public abstract double GetArea();

    public void Describe()
    {
        Console.WriteLine($"This shape has an area of {GetArea()} square units.");
    }
}

// 子類別實現抽象方法
public class Circle : Shape
{
    public double Radius { get; set; }

    public override double GetArea()
    {
        return Math.PI * Radius * Radius;
    }
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public override double GetArea()
    {
        return Width * Height;
    }
}

```
