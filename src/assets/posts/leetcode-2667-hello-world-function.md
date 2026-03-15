---
{
  "title": "2667. Create Hello World Function",
  "categoryId": 5,
  "categoryName": "Leetcode",
  "labels": [
    {
      "labelId": 9,
      "labelName": "Typescript"
    }
  ],
  "createDate": "2023-05-25T18:25:31.124Z",
  "references": [
    "https://leetcode.com/problems/create-hello-world-function/description/"
  ],
  "flag": "Y"
}
---
Write a function `createHelloWorld`. It should return a new function that always returns `"Hello World"`.

createHelloWorld 是一個回傳函式的函式，回傳的函式不管傳入什麼參數都是回傳 'Hello World'。

**Example 1:**

```plaintext
Input: args = []
Output: "Hello World"
Explanation:
const f = createHelloWorld();
f(); // "Hello World"

The function returned by createHelloWorld should always return "Hello World".
```

**Example 2:**

```plaintext
Input: args = [{},null,42]
Output: "Hello World"
Explanation:
const f = createHelloWorld();
f({}, null, 42); // "Hello World"

Any arguments could be passed to the function but it should still always return "Hello World".
```

**Constraints:**

```plaintext
0 <= args.length <= 10
```

## 解法

```typescript
const createHelloWorld = () => (...args) => 'Hello World';

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```
