/**
 * 节点颜色枚举
 */
enum NODE_COLOR {
    RED = 1,
    BLACK,
}

/**
 * 树节点
 */
class TreeNode {
    public value: number;
    public left: TreeNode | null;
    public right: TreeNode | null;
    public parent: TreeNode | null;
    public color: NODE_COLOR;
    
    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.color = NODE_COLOR.RED;
    }
    
    /**
     * 获取祖父节点
     */
    public getGrandParent(): TreeNode | null {
        if (!this.parent) {
            return null;
        }
        return this.parent.parent;
    }
    
    /**
     * 获取叔节点
     */
    public getUncle(): TreeNode | null {
        let g = this.getGrandParent();
        if (!g) {
            return null;
        }
        if (this.parent === g.left) {
            return g.right;
        } else {
            return g.left;
        }
    }
    
    /**
     * 获取兄弟节点
     */
    public sibling(): TreeNode | null {
        if (!this.parent) {
            return null;
        }
        if (this === this.parent.left) {
            return this.parent.right;
        } else {
            return this.parent.left;
        }
    }
}

/**
 * 红黑树
 */
class RBTree {
    private root: TreeNode | null;
    
    constructor(value: number) {
        this.root = new TreeNode(value);
        this.root.color = NODE_COLOR.BLACK;
    }
    
    /**
     * 前序遍历
     * */
    public static PRE_ORDER_TRAVERSE(node: TreeNode): void {
        if (!node) return;
        console.log(node.value);
        this.PRE_ORDER_TRAVERSE(node.left);
        this.PRE_ORDER_TRAVERSE(node.right);
    }
    
    /**
     * 中序遍历
     * */
    public static IN_ORDER_TRAVERSE(node: TreeNode): void {
        if (!node) return;
        this.IN_ORDER_TRAVERSE(node.left);
        console.log(node);
        this.IN_ORDER_TRAVERSE(node.right);
    }
    
    /**
     * 后序遍历
     * */
    public static POST_ORDER_TRAVERSE(node: TreeNode): void {
        if (!node) return;
        this.POST_ORDER_TRAVERSE(node.left);
        this.POST_ORDER_TRAVERSE(node.right);
        console.log(node.value);
    }
    
    /**
     *  对节点y进行向右旋转操作，返回旋转后新的根节点x
     *        y                              x
     *       / \                           /   \
     *      x   T4     向右旋转 (y)        z     y
     *     / \       - - - - - - - ->    / \   / \
     *    z   T3                       T1  T2 T3 T4
     *   / \
     * T1   T2
     * */
    public rightRotate(node: TreeNode): TreeNode {
        if (!node) return;
        const leftNode = node.left;
        node.left = leftNode.right;
        if (leftNode.right) {
            leftNode.right.parent = node;
        }
        leftNode.right = node;
        if (node.parent) {
            leftNode.parent = node.parent;
            if (node.parent.left === node) {
                node.parent.left = leftNode;
            } else {
                node.parent.right = leftNode;
            }
        } else {
            leftNode.parent = null;
            this.root = leftNode;
        }
        node.parent = leftNode;
    }
    
    /**
     * 对节点y进行向左旋转操作，返回旋转后新的根节点x
     *    y                             x
     *  /  \                          /   \
     * T1   x      向左旋转 (y)       y     z
     *     / \   - - - - - - - ->   / \   / \
     *   T2  z                     T1 T2 T3 T4
     *      / \
     *     T3 T4
     * */
    public leftRotate(node: TreeNode): TreeNode {
        if (!node) return;
        const rightNode = node.right;
        node.right = rightNode.left;
        if (rightNode.left) {
            rightNode.left.parent = node;
        }
        rightNode.left = node;
        if (node.parent) {
            rightNode.parent = node.parent;
            if (node.parent.left === node) {
                node.parent.left = rightNode;
            } else {
                node.parent.right = rightNode;
            }
        } else {
            rightNode.parent = null;
            this.root = rightNode;
        }
        node.parent = rightNode;
    }
    
    /**
     * 获取根节点
     */
    public getRoot() {
        if (!this.root) return null;
        return this.root;
    }
    
    /**
     * 插入节点
     * 先找到插入的位置，插入的位置都在叶子节点上，插入后再进行旋转和变色操作，保持树高度最小
     */
    public insert(node: TreeNode, value: number) {
        let curNode = node;
        // 重复插入的情况无需做处理
        if (value > curNode.value) {
            if (curNode.right) {
                // 递归找到叶子节点
                this.insert(curNode.right, value);
            } else {
                const newNode = new TreeNode(value);
                curNode.right = newNode;
                newNode.parent = curNode;
                this.insertCase(newNode);
            }
        } else if (value < node.value) {
            if (curNode.left) {
                this.insert(curNode.left, value);
            } else {
                const newNode = new TreeNode(value);
                curNode.left = newNode;
                newNode.parent = curNode;
                this.insertCase(newNode);
            }
        }
    }
    
    /**
     * 插入节点辅助函数
     * 插入的过程中有以下几种情况：（要插入的节点为N，叔节点为U，父节点为P，祖父节点为G）
     * 一、插入位置的父节点不存在，则插入的节点就是根节点
     * 二、插入位置的父节点为黑色，直接插入不做其他处理
     * 三、插入位置的父节点为红色，需要考虑以下几种情况：
     *  1、叔节点U也为红色，节点N也为红色，祖父G为黑色，不满足红黑树的性质（不允许连续两个红色节点相连），将叔和父都变成黑色，祖父变成红色，
     *     重新递归插入祖父G
     *  2、叔节点U不存在或者U为黑色，有以下4种情况：
     *      a.左左情况，即P为G的左节点，N为P的左节点，此时，将P变黑，G变红，对G右旋即可
     *      b.右右情况，P为G的右节点，N为P的右节点，同理，将P变黑，G变红，对G左旋
     *      c.左右情况，P为G的左节点，N为P的右节点，先对P左旋，变成左左情况后，再执行a操作
     *      d.右左情况，P为G的右节点，N为P的左节点，先对P右旋，变成右右情况后，再执行b操作
     */
    private insertCase(node: TreeNode) {
        const parent = node.parent;
        if (parent === null) {
            node.color = NODE_COLOR.BLACK;
            this.root = node;
            return;
        }
        if (parent.color === NODE_COLOR.BLACK) {
            return;
        }
        if (parent.color === NODE_COLOR.RED) {
            const uncle = node.getUncle();
            const grandParent = node.getGrandParent();
            if (uncle && uncle.color === NODE_COLOR.RED) {
                parent.color = NODE_COLOR.BLACK;
                uncle.color = NODE_COLOR.BLACK;
                grandParent.color = NODE_COLOR.RED;
                this.insertCase(grandParent);
            } else if ((uncle && uncle.color === NODE_COLOR.BLACK) || !uncle) {
                if (grandParent.left === parent && parent.left === node) {
                    parent.color = NODE_COLOR.BLACK;
                    grandParent.color = NODE_COLOR.RED;
                    this.rightRotate(grandParent);
                } else if (grandParent.left === parent && parent.right === node) {
                    this.leftRotate(parent);
                    node.color = NODE_COLOR.BLACK;
                    node.parent.color = NODE_COLOR.RED;
                    this.rightRotate(node.parent);
                } else if (grandParent.right === parent && parent.right === node) {
                    parent.color = NODE_COLOR.BLACK;
                    grandParent.color = NODE_COLOR.RED;
                    this.leftRotate(grandParent);
                } else if (grandParent.right === parent && parent.left === node) {
                    this.rightRotate(parent);
                    node.color = NODE_COLOR.BLACK;
                    node.parent.color = NODE_COLOR.RED;
                    this.leftRotate(node.parent);
                }
            }
        }
    }
}

const rbt = new RBTree(1);
rbt.insert(rbt.getRoot(), 2);
rbt.insert(rbt.getRoot(), 3);
rbt.insert(rbt.getRoot(), 4);
rbt.insert(rbt.getRoot(), 5);
rbt.insert(rbt.getRoot(), 6);
rbt.insert(rbt.getRoot(), 7);
rbt.insert(rbt.getRoot(), 8);
RBTree.IN_ORDER_TRAVERSE(rbt.getRoot());



