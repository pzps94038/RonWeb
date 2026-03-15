---
{
  "title": "705. Design HashSet",
  "categoryId": 5,
  "categoryName": "Leetcode",
  "labels": [
    {
      "labelId": 9,
      "labelName": "Typescript"
    }
  ],
  "createDate": "2023-05-29T21:25:20.800Z",
  "references": [
    "https://leetcode.com/problems/design-hashset/description/"
  ],
  "flag": "Y"
}
---
Design a HashSet without using any built-in hash table libraries.

Implement `MyHashSet` class:

-   `void add(key)` Inserts the value `key` into the HashSet.
-   `bool contains(key)` Returns whether the value `key` exists in the HashSet or not.
-   `void remove(key)` Removes the value `key` in the HashSet. If `key` does not exist in the HashSet, do nothing.

**Example 1:**

```plaintext
Input
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
Output
[null, null, null, true, false, null, true, null, false]

Explanation
MyHashSet myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(1); // return True
myHashSet.contains(3); // return False, (not found)
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(2); // return True
myHashSet.remove(2);   // set = [1]
myHashSet.contains(2); // return False, (already removed)
```

**Constraints:**

```plaintext
0 <= key <= 106
At most 104 calls will be made to add, remove, and contains.
```

## 解法

練習不用 ES6 中 Set 的類似實作。

```typescript
class MyHashSet {
    private _set = {};

    add = (key: number) => this._set[key] = key;

    remove = (key: number) => delete this._set[key];

    contains = (key: number) => this._set[key] !== undefined;
}
```
