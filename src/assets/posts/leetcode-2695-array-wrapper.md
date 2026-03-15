---
{
  "title": "2695. Array Wrapper",
  "categoryId": 5,
  "categoryName": "Leetcode",
  "labels": [
    {
      "labelId": 9,
      "labelName": "Typescript"
    }
  ],
  "createDate": "2023-05-24T21:40:31.807Z",
  "references": [
    "https://leetcode.com/problems/array-wrapper/description/"
  ],
  "flag": "Y"
}
---
Create a class `ArrayWrapper` that accepts an array of integers in it's constructor. This class should have two features:

-   When two instances of this class are added together with the `+` operator, the resulting value is the sum of all the elements in both arrays.
-   When the `String()` function is called on the instance, it will return a comma separated string surrounded by brackets. For example, `[1,2,3]`.

**Example 1:**

```plaintext
Input: nums = [[1,2],[3,4]], operation = "Add"
Output: 10
Explanation:
const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);
obj1 + obj2; // 10
```

**Example 2:**

```plaintext
Input: nums = [[23,98,42,70]], operation = "String"
Output: "[23,98,42,70]"
Explanation:
const obj = new ArrayWrapper([23,98,42,70]);
String(obj); // "[23,98,42,70]"
```

**Example 3:**

```plaintext
Input: nums = [[],[]], operation = "Add"
Output: 0
Explanation:
const obj1 = new ArrayWrapper([]);
const obj2 = new ArrayWrapper([]);
obj1 + obj2; // 0
```

**Constraints:**

```plaintext
0 <= nums.length <= 1000
0 <= nums[i] <= 1000
Note: nums is the array passed to the constructor
```

## 解法

這題是在建構類別時提供一個數字陣列，要求實作兩個 function：

1\. valueOf => 得到當前數組的加總，使用reduce來實作

2\. toString => 當前數組轉成文字，直接使用轉JSON方式處理

```typescript
class ArrayWrapper {
    private _nums: number[];
	constructor(nums: number[]) {
        this._nums = nums;
    }

	valueOf() {
        return this._nums.reduce((pre, cur)=> pre + cur, 0);
    }

	toString() {
        return JSON.stringify(this._nums);
    }
};
```
