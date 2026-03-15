---
{
  "title": "2619. Array Prototype Last",
  "categoryId": 5,
  "categoryName": "Leetcode",
  "labels": [
    {
      "labelId": 9,
      "labelName": "Typescript"
    }
  ],
  "createDate": "2023-05-22T06:20:11.073Z",
  "references": [
    "https://leetcode.com/problems/array-prototype-last/description/"
  ],
  "flag": "Y"
}
---
Write code that enhances all arrays such that you can call the `array.last()` method on any array and it will return the last element. If there are no elements in the array, it should return `-1`.

**Example 1:**

```xml
Input: nums = [1,2,3]
Output: 3
Explanation: Calling nums.last() should return the last element: 3.
```

**Example 2:**

```xml
Input: nums = []
Output: -1
Explanation: Because there are no elements, return -1.
```

**Constraints:**

```plaintext
0 <= arr.length <= 1000
0 <= arr[i] <= 1000
```

## 解法

這題是在講 Array 這個類別的擴展 function，當呼叫 last() 方法時需要回傳最後一個元素。

```typescript
declare global {
    interface Array<T> {
        last(): T | -1;
    }
}

Array.prototype.last = function() {

	// 找最後一個項目，找不到回傳-1
    const last = this.at(this.length - 1);
    return last ?? -1; 
};
```
