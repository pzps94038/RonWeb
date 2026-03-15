---
{
  'title': '2637. Promise Time Limit',
  'categoryId': 5,
  'categoryName': 'Leetcode',
  'labels': [{ 'labelId': 9, 'labelName': 'Typescript' }],
  'createDate': '2023-05-23T19:06:08.587Z',
  'references': ['https://leetcode.com/problems/promise-time-limit/description/'],
  'flag': 'Y',
}
---

Given an asyncronous function `fn` and a time `t` in milliseconds, return a new **time limited** version of the input function.

A **time limited** function is a function that is identical to the original unless it takes longer than `t` milliseconds to fullfill. In that case, it will reject with `"Time Limit Exceeded"`.  Note that it should reject with a string, not an `Error`.

**Example 1:**

```plaintext
Input:
fn = async (n) => {
  await new Promise(res => setTimeout(res, 100));
  return n * n;
}
inputs = [5]
t = 50
Output: {"rejected":"Time Limit Exceeded","time":50}
Explanation:
The provided function is set to resolve after 100ms. However, the time limit is set to 50ms. It rejects at t=50ms because the time limit was reached.
```

**Example 2:**

```plaintext
Input:
fn = async (n) => {
  await new Promise(res => setTimeout(res, 100));
  return n * n;
}
inputs = [5]
t = 150
Output: {"resolved":25,"time":100}
Explanation:
The function resolved 5 * 5 = 25 at t=100ms. The time limit is never reached.
```

**Example 3:**

```plaintext
Input:
fn = async (a, b) => {
  await new Promise(res => setTimeout(res, 120));
  return a + b;
}
inputs = [5,10]
t = 150
Output: {"resolved":15,"time":120}
Explanation:
The function resolved 5 + 10 = 15 at t=120ms. The time limit is never reached.
```

**Example 4:**

```plaintext
Input:
fn = async () => {
  throw "Error";
}
inputs = []
t = 1000
Output: {"rejected":"Error","time":0}
Explanation:
The function immediately throws an error.
```

**Constraints:**

```plaintext
0 <= inputs.length <= 10
0 <= t <= 1000
fn returns a promise
```

## 解法

這題是在介紹超時 Timeout 的實作，會給定一個非同步的 function 跟超時的毫秒數。

當超過指定時間，就拋出一個 "Time Limit Exceeded" 的字串錯誤。

```typescript
type Fn = (...params: any[]) => Promise<any>;

const timeLimit = (fn: Fn, t: number) => {
  return async (...args) => {
    return Promise.race([
      new Promise((resolve, reject) => setTimeout(() => reject('Time Limit Exceeded'), t)),
      new Promise(resolve => setTimeout(() => resolve(fn(...args)))),
    ]);
  };
};
```
