---
{
  "title": "2665. Counter II",
  "categoryId": 5,
  "categoryName": "Leetcode",
  "labels": [
    {
      "labelId": 9,
      "labelName": "Typescript"
    }
  ],
  "createDate": "2023-05-25T04:52:39.180Z",
  "references": [
    "https://leetcode.com/problems/counter-ii/description/"
  ],
  "flag": "Y"
}
---
Write a function `createCounter`. It should accept an initial integer `init`. It should return an object with three functions.

The three functions are:

-   `increment()` increases the current value by 1 and then returns it.
-   `decrement()` reduces the current value by 1 and then returns it.
-   `reset()` sets the current value to `init` and then returns it.

**Example 1:**

```plaintext
Input: init = 5, calls = ["increment","reset","decrement"]
Output: [6,5,4]
Explanation:
const counter = createCounter(5);
counter.increment(); // 6
counter.reset(); // 5
counter.decrement(); // 4
```

**Example 2:**

```plaintext
Input: init = 0, calls = ["increment","increment","decrement","reset","reset"]
Output: [1,2,1,0,0]
Explanation:
const counter = createCounter(0);
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
counter.reset(); // 0
counter.reset(); // 0
```

**Constraints:**

```plaintext
-1000 <= init <= 1000
total calls not to exceed 1000
```

## 解法

這題是建立一個計數器，會給定一個初始值，要求回傳一個物件型別為 **ReturnObj**，其中有三個要實作的 function：

increment → 增加1 回傳當前值

decrement → 減1 回傳當前值

reset → 重設為預設值

把初始值拿一個參數接

並且把操作變數放在這個scope的函式內來做操作

```typescript
type ReturnObj = {
    increment: () => number,
    decrement: () => number,
    reset: () => number,
}

const createCounter = (init: number) => {
    const initVal = init;
    let val = initVal;
    return {
        increment: () => {
            val += 1;
            return val;
        },
        decrement: () => {
             val -= 1;
            return val;
        },
        reset: () => {
            val = initVal;
            return val;
        },
    } as ReturnObj;
};
```
