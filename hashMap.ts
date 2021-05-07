/***
 * 键值对对象
 */
class ValuePair<K, V>{
    constructor(public key: K, public value: V) {
    }
}
/***
 * Map接口，哈希表实现了Map接口里面的方法
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
