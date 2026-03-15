---
{
  "title": "2621. Sleep",
  "categoryId": 5,
  "categoryName": "Leetcode",
  "labels": [
    {
      "labelId": 9,
      "labelName": "Typescript"
    }
  ],
  "createDate": "2023-05-22T21:25:41.935Z",
  "references": [
    "https://leetcode.com/problems/sleep/description/"
  ],
  "flag": "Y"
}
---
Given a positive integer `millis`, write an asyncronous function that sleeps for `millis` milliseconds. It can resolve any value.

**Example 1:**

```plaintext
Input: millis = 100
Output: 100
Explanation: It should return a promise that resolves after 100ms.
let t = Date.now();
sleep(100).then(() => {
  console.log(Date.now() - t); // 100
});
```

**Example 2:**

```plaintext
Input: millis = 200
Output: 200
Explanation: It should return a promise that resolves after 200ms.
```

**Constraints:**

```plaintext
1 <= millis <= 1000
```

## 解法

這題是在講非同步的概念，指定要多長時間才能夠做回應。

```typescript
const sleep = async(millis: number) => {
    return await new Promise<void>(resolve=>  setTimeout(()=> resolve(), millis))
}
```
