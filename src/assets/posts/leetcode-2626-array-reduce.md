---
{
  "title": "2626. Array Reduce Transformation",
  "categoryId": 5,
  "categoryName": "Leetcode",
  "labels": [
    {
      "labelId": 9,
      "labelName": "Typescript"
    }
  ],
  "createDate": "2023-05-22T21:34:54.249Z",
  "references": [
    "https://leetcode.com/problems/array-reduce-transformation/description/"
  ],
  "flag": "Y"
}
---
Given an integer array `nums`, a reducer function `fn`, and an initial value `init`, return a **reduced** array.

A **reduced** array is created by applying the following operation: `val = fn(init, nums[0])`, `val = fn(val, nums[1])`, `val = fn(val, nums[2])`, `...` until every element in the array has been processed. The final value of `val` is returned.

If the length of the array is 0, it should return `init`.

Please solve it without using the built-in `Array.reduce` method.

**Example 1:**

```plaintext
Input: 
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr; }
init = 0
Output: 10
Explanation:
initially, the value is init=0.
(0) + nums[0] = 1
(1) + nums[1] = 3
(3) + nums[2] = 6
(6) + nums[3] = 10
The final answer is 10.
```

**Example 2:**

```plaintext
Input: 
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr * curr; }
init = 100
Output: 130
Explanation:
initially, the value is init=100.
(100) + nums[0]^2 = 101
(101) + nums[1]^2 = 105
(105) + nums[2]^2 = 114
(114) + nums[3]^2 = 130
The final answer is 130.
```

**Example 3:**

```plaintext
Input: 
nums = []
fn = function sum(accum, curr) { return 0; }
init = 25
Output: 25
Explanation: For empty arrays, the answer is always init.
```

**Constraints:**

```plaintext
0 <= nums.length <= 1000
0 <= nums[i] <= 1000
0 <= init <= 1000
```

## 解法

這題是在講類似 Sum 的實作，需遍歷每個元素並用提供的 fn 來做運算。

```typescript
type Fn = (accum: number, curr: number) => number;
// pre 為當前計算值，cur 為當前元素, init = 初值
// 每次reduce 需要回傳一個計算的結果回去
const reduce = (nums: number[], fn: Fn, init: number) => nums.reduce((pre,cur)=> fn(pre, cur), init);
```
