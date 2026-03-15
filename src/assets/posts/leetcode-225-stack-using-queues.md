---
{
  "title": "225. Implement Stack using Queues",
  "categoryId": 5,
  "categoryName": "Leetcode",
  "labels": [
    {
      "labelId": 9,
      "labelName": "Typescript"
    }
  ],
  "createDate": "2023-08-27T20:13:04.016Z",
  "references": [
    "https://leetcode.com/problems/implement-stack-using-queues/"
  ],
  "flag": "Y"
}
---
Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).

Implement the `MyStack` class:

-   `void push(int x)` Pushes element x to the top of the stack.
-   `int pop()` Removes the element on the top of the stack and returns it.
-   `int top()` Returns the element on the top of the stack.
-   `boolean empty()` Returns `true` if the stack is empty, `false` otherwise.

**Notes:**

-   You must use **only** standard operations of a queue, which means that only `push to back`, `peek/pop from front`, `size` and `is empty` operations are valid.
-   Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.  
      
    **Example 1:**

```plaintext
Input
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 2, 2, false]

Explanation
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False

```

**Constraints:**

```plaintext
1 <= x <= 9
At most 100 calls will be made to push, pop, top, and empty.
All the calls to pop and top are valid.
```

## 解法

實作陣列的堆疊（Stack）功能。

```typescript
class MyStack {
    array: number[] = [];

    constructor() {}

    push(x: number): void {
        this.array.push(x);
    }

    pop(): number {
        return this.array.pop();
    }

    top(): number {
        if(this.array.length){
            return this.array[this.array.length - 1];
        }else{
            return null;
        }
    }

    empty(): boolean {
        return !!!this.array.length;
    }
}
```
