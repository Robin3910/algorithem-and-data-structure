

### 前言介绍

HashMap这类数据结构目前在JS中还未被实现，只有Map数据结构。本质上，Map和HashMap都是采用键值对（key, value）的形式进行数据存储。

通过了解JAVA中的HashMap结构，我们也可以尝试利用TS对于HashMap进行实现。

### JAVA中的HashMap

---

#### HashMap的数据结构组成

在JAVA中，HashMap实现了Map的接口，键key不能重复可以为null，值value可以重复可以为null，元素无需，若存储键值对时键已经存在，新值会覆盖旧值。

哈希表随着数据量的增加，必然会存在哈希冲突问题，解决哈希冲突的方式主要两种：

- 开放地址（线性探查）：产生哈希冲突时，重新探测一个新的空闲空间，将其置入，当数据量不大时这种处理是比较简单便捷的，但是一旦数据量一大，就会显得费时费力
- 拉链法：产生哈希冲突时，在冲突位置建立链表，并将其置入链表当中

JDK1.7之前，HashMap的结构是由数组+链表组成的，而JDK1.8之后，HashMap的结构是由数组+链表+红黑树组成的。当链表的长度超过一定长度后，就转换成红黑树，这样能大大减少查找时间（优化长链表效率低的问题）。

#### Hash算法

哈希表查询、插入、删除数据的时间复杂度都为O(1)，所以其中的哈希算法尤为重要，不能过于复杂，且生成的索引值要尽量随机且均匀分布。可以看一下JAVA源码中hashCode代码：

- ##### JDK 1.7

```java
public V put(K key, V value) {
    // ...
    int hash = hash(key.hashCode());
    int i = indexFor(hash, table.length);
    // ...
}
static int hash(int h) {
    h ^= (h >>> 20) ^ (h >>> 12);
    return h ^ (h >>> 7) ^ (h >>> 4);
}
static int indexFor(int h, int length) {
    return h & (length-1);
}
```

- ##### JDK 1.8

```java
public V put(K key, V value) {
  	// 存值
    return putVal(hash(key), key, value, false, true);
}

final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
  	// hash是传过来的，其中n是底层数组的长度，用&运算符计算出i的值,用计算出来的i的值作为下标从数组中元素
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    		// ...
}
// 哈希算法：采用hashCode() + 移位操作
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

#### 数组中存储的Node数据结构

```java
static class Node<K, V> implements Map.Entry<K, V> {
  	final int hash;
  	// key, value用于存取键值
  	final K key;
  	V value;
  	// 下个节点，参考链表
  	Node<K, V> next;
  	// 构造函数
  	Node(int hash, K key, V value, Node<K,V> next){
      	this.hash = hash;
      	this.key = key;
      	this.value = value;
      	this.next = next;
    }
}
```

node的数据结构比较简单，key和value用于存值，next用来标记Node节点的下一个元素，hash用来记录key做哈希算法之后的hash值。

#### 解决冲突

就拿JDK1.8的代码来分析，在用putVal进行存值操作时，如果数组的下标已经被之前的数据占了，产生了冲突，便会在该位置上转成一个单向链表，并new一个新的Node对象来存值，代码如下：

```java
if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
else {
  	// ...
  	// p为当前节点，p.next赋予了一个新的Node节点来存值
  	p.next = new Node(hash, key, value, null);
}
```

这里源码中还有一个逻辑：当链表长度到达8时，便会将链表转为红黑树，这里不深入探究。在JDK1.7及以前的版本中，HashMap里面是没有红黑树的，JDK1.8加入红黑树是为了防止哈希表碰撞，当链表长度为8时，及时转成红黑树，提高Map的查找效率。

#### 存储putVal

1、计算key的hash值，算出元素在底层数组中的下标位置。

2、通过下标位置定位到底层数组里的元素（也有可能是链表也有可能是树）。

3、取到元素，判断放入元素的key是否==或equals当前位置的key，成立则替换value值，返回旧值。

4、如果是树，循环树中的节点，判断放入元素的key是否==或equals节点的key，成立则替换树里的value，并返回旧值，不成立就添加到树里。

5、否则就顺着元素的链表结构循环节点，判断放入元素的key是否==或equals节点的key，成立则替换链表里value，并返回旧值，找不到就添加到链表的最后。



### TS实现HashMap

---

下面代码中实现了键值对对象，Map接口，链表以及链表节点对象，借助以上提及的数据结构，来实现了哈希表。由于红黑树比较复杂，这里仅实现到了链表层。

```typescript
/***
 * 键值对对象
 */
class ValuePair<K, V>{
    constructor(public key: K, public value: V) {
    }
}
/***
 * Map接口，哈希表实现了Map接口
 */
interface MapType<K, V> {
    hasKey(key: K): boolean;
    set(key: K, value: V): boolean;
    get(key: K): V | undefined;
    entries(): ValuePair<K, V>[];
    keys(): K[];
    values(): V[];
    size(): number;
    isEmpty(): boolean;
    clear(): void;
    delete(key: K): boolean;
}

/***
 * 链表节点数据结构
 */
class LinkedListNode<T> {
    public next: LinkedListNode<T> | null;
    public value: T;
    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

/***
 * 链表数据结构
 */
class LinkedList<T> {
    public head: LinkedListNode<T> = null;
    public length: number = 0;
    // 获取root节点
    getHead(){
        return this.head;
    }
    constructor(head?: LinkedListNode<T>) {
        if(head) {
            this.head = head;
            this.length ++;
        }
    }
    // 此处仅为了满足哈希表存数需求，仅实现了append方法
    // 关于链表其余方法不深入探讨
    // 链表添加节点操作
    public append(value: T){
        const node = new LinkedListNode(value);
        if(!this.head) {
            this.head = node;
        } else {
            let cur = this.head;
            while (cur.next) {
                cur = cur.next;
            }
            cur.next = node;
        }
        this.length ++;
    }
    
    // 链表长度
    size(){
        return this.length;
    }
}

/***
 * 哈希表实现
 */
class HashMap<K, V> implements MapType<K, V> {
    // 数组，里面可能存储键值对链表，也可能直接存储了键值对
    private table: Array<LinkedList<ValuePair<K, V>> | ValuePair<K, V>>;
    // 初始化时生成一个数组
    constructor() {
        this.table = [];
    }
    // 哈希算法
    hashCode(key: K){
        if (typeof key === 'number'){
            return key;
        }
        const tableKey = key.toString();
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++){
            // 获取每个字符的ASCII码将其拼接至hash中
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    // 存放数据
    set(key: K, value: V): boolean {
        if(!key) return false;
        // 先计算hash值
        let hash = this.hashCode(key);
        // 如果数组下标中已有该key计算出的hash值了，则将数组该下标位置的值转换成链表进行存储
        if(this.table[hash]) {
            let item = this.table[hash];
            if('length' in item) {
                // 当前存储的数据是链表
                item.append(new ValuePair(key, value));
            } else {
                // 当前位置的数据是ValuePair
                // 以原有的键值对为value生成链表节点对象
                let preNode = new LinkedListNode(item);
                // 将数组该hash下标的数据转换成链表
                this.table[hash] = new LinkedList(preNode) as LinkedList<ValuePair<K, V>>;
                // 将新值插入链表末，存值结束
                (this.table[hash] as LinkedList<ValuePair<K, V>>).append(new ValuePair(key, value));
            }
        } else {
            // 若该数组hash的下标未被占用，则在该位置写入数据
            this.table[hash] = new ValuePair(key, value);
        }
        return true;
    }
    
    hasKey(key: K): boolean {
        if(!key) return false;
        let hash = this.hashCode(key);
        return !!this.table[hash];
    }
    
    get(key: K): V| undefined {
        // 如果key不存在，则返回
        if(!key) return undefined;
        
        // 如果数组hash下标值为空，则返回
        const hash = this.hashCode(key);
        if(!this.table[hash]) return undefined;
        
        // 数组hash下标的值存在，先判断是键值对还是链表
        const item = this.table[hash];
        if('length' in item) {
            // 遍历链表，判读key进行取值
            let cur = item.getHead();
            while(cur.value.key !== key) {
                cur = cur.next;
            }
            return cur.value.value;
        } else {
            // 如果为键值对，则直接取出value
            return item.value;
        }
    }
    
    entries(): ValuePair<K, V>[] {
        const entries = [];
        this.table.forEach((item, index) => {
            // 如果当前位置是链表，遍历链表，取出所有数据
            if('length' in item) {
                let cur = item.getHead();
                while(cur) {
                    entries.push(cur.value);
                    cur = cur.next;
                }
            } else {
                // 如果当前位置是键值对，直接放入entries
                entries.push(item);
            }
        });
        return entries;
    }
    
    keys(): K[] {
        const entries = this.entries();
        const res = [];
        entries.forEach((item, index)=>{
            res.push(item.key);
        });
        return res;
    }
    
    values(): V[] {
        const entries = this.entries();
        const res = [];
        entries.forEach((item, index)=>{
            res.push(item.value);
        });
        return res;
    }
    size(): number {
        return this.entries().length;
    }
    
    isEmpty(): boolean {
        return !this.size();
    }
    
    clear() {
        this.table = [];
    }
    
    delete(key: K): boolean {
        if(!key) return false;
        const hash = this.hashCode(key);
        if(!hash) return false;
        const item = this.table[hash];
        // 如果当前位置是链表，需要做链表删除处理
        if('length' in item) {
            // 如果要删除的是链表的root节点，则将root节点的next节点作为head，断开原来head与head.next的关系
            let cur = item.getHead();
            if(cur.value.key === key) {
                let node = cur.next;
                cur.next = null;
                item.head = node;
                item.length --;
                return true;
            }
            // 如果要删除的节点位于链表中间以及最后，做相应的删除节点操作
            let pre = cur;
            cur = cur.next;
            while(cur.value.key !== key) {
                pre = cur;
                cur = cur.next;
            }
            pre.next = cur.next;
            item.length --;
            return true;
        } else {
            // 如果当前位置上的数据是键值对，直接从数组中剔除
            this.table.splice(hash, 1);
            return true;
        }
    }
}


// test
// const hashMap = new HashMap();
// hashMap.set("name", "张三");
// hashMap.set("id", 1);
// hashMap.set("class", "产品");
// console.log("判断class是否存在与HashMap中", hashMap.hasKey("class"));
// hashMap.delete("id");
// console.log("判断id是否存在于HashMap中", hashMap.hasKey("id"))
// console.log(hashMap.get("name"));
// console.log("判断HashMap中的数据是否为空",hashMap.isEmpty());
// console.log("输出HashMap中所有key对应的value",hashMap.entries());
// console.log("获取HashMap中的所有key值",hashMap.keys());
// console.log("获取HashMap中的所有Value值",hashMap.values());
// console.log("获取HashMap的大小",hashMap.size());
// console.log("清空HashMap中的数据");
// hashMap.clear();
// // 测试hash值冲突问题
// hashMap.set('Ygritte', 'ygritte@email.com');
// hashMap.set('Jonathan', 'jonathan@email.com');
// hashMap.set('Jamie', 'jamie@email.com');
// hashMap.set('Jack', 'jack@email.com');
// hashMap.set('Jasmine', 'jasmine@email.com');
// hashMap.set('Jake', 'jake@email.com');
// hashMap.set('Nathan', 'nathan@email.com');
// hashMap.set('Athelstan', 'athelstan@email.com');
// hashMap.set('Sue', 'sue@email.com');
// hashMap.set('Aethelwulf', 'aethelwulf@email.com');
// hashMap.set('Sargeras', 'sargeras@email.com');
// hashMap.delete('Sargeras');

```

