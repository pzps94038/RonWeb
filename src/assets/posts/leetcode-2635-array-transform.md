---
{
  "title": "2635. Apply Transform Over Each Element in Array",
  "categoryId": 5,
  "categoryName": "Leetcode",
  "labels": [
    {
      "labelId": 9,
      "labelName": "Typescript"
    }
  ],
  "createDate": "2023-05-24T20:20:17.201Z",
  "references": [
    "https://leetcode.com/problems/apply-transform-over-each-element-in-array/description/"
  ],
  "flag": "Y"
}
---
Given an integer array `arr` and a mapping function `fn`, return a new array with a transformation applied to each element.

The returned array should be created such that `returnedArray[i] = fn(arr[i], i)`.

Please solve it without the built-in `Array.map` method.

**Example 1:**

```plaintext
Input: arr = [1,2,3], fn = function plusone(n) { return n + 1; }
Output: [2,3,4]
Explanation:
const newArray = map(arr, plusone); // [2,3,4]
The function increases each value in the array by one.
```

**Example 2:**

```plaintext
Input: arr = [1,2,3], fn = function plusI(n, i) { return n + i; }
Output: [1,3,5]
Explanation: The function increases each value by the index it resides in.
```

**Example 3:**

```plaintext
Input: arr = [10,20,30], fn = function constant() { return 42; }
Output: [42,42,42]
Explanation: The function always returns 42.
```

**Constraints:**

```plaintext
0 <= arr.length <= 1000
-109 <= arr[i] <= 109
fn returns a number
```

## 解法

這題是給定一個數字陣列以及一個運算 function，這個運算 function 可以帶入兩個參數（數字和索引位置），然後回傳一個數字。需要把陣列中每個數字都傳給這個 function，並以回傳值做為新的數字。

```typescript
const map = (arr: number[], fn: (n: number, i: number) => number) => arr.map((num, i)=> fn(num, i));
```
