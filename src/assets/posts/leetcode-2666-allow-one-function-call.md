---
{
  "title": "2666. Allow One Function Call",
  "categoryId": 5,
  "categoryName": "Leetcode",
  "labels": [
    {
      "labelId": 9,
      "labelName": "Typescript"
    }
  ],
  "createDate": "2023-05-25T18:19:12.934Z",
  "references": [
    "https://leetcode.com/problems/allow-one-function-call/description/"
  ],
  "flag": "Y"
}
---
Given a function `fn`, return a new function that is identical to the original function except that it ensures `fn` is called at most once.

-   The first time the returned function is called, it should return the same result as `fn`.
-   Every subsequent time it is called, it should return `undefined`.

**Example 1:**

```plaintext
Input: fn = (a,b,c) => (a + b + c), calls = [[1,2,3],[2,3,6]]
Output: [{"calls":1,"value":6}]
Explanation:
const onceFn = once(fn);
onceFn(1, 2, 3); // 6
onceFn(2, 3, 6); // undefined, fn was not called
```

**Example 2:**

```plaintext
Input: fn = (a,b,c) => (a * b * c), calls = [[5,7,4],[2,3,6],[4,6,8]]
Output: [{"calls":1,"value":140}]
Explanation:
const onceFn = once(fn);
onceFn(5, 7, 4); // 140
onceFn(2, 3, 6); // undefined, fn was not called
onceFn(4, 6, 8); // undefined, fn was not called
```

**Constraints:**

```plaintext
1 <= calls.length <= 10
1 <= calls[i].length <= 100
2 <= JSON.stringify(calls).length <= 1000
```

## 解法

這題是講一個函式傳入另一個函式，這個函式要控管呼叫只能在第一次有回傳結果，後續都是 undefined。

type Fn = (...args: any\[\]) => any;

```typescript
const once = <T extends Fn>(fn: T): ((...args: Parameters<T>) => ReturnType<T> | undefined) => {
  let isCall = false;
  return (...args) => {
    if(isCall){
      return undefined;
    }else {
      isCall = true;
      return fn(...args);
    }
  }
}
```
