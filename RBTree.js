var NODE_COLOR;
(function (NODE_COLOR) {
    NODE_COLOR[NODE_COLOR["RED"] = 1] = "RED";
    NODE_COLOR[NODE_COLOR["BLACK"] = 2] = "BLACK";
})(NODE_COLOR || (NODE_COLOR = {}));
/**
 * 树节点
 */
var TreeNode = /** @class */ (function () {
    function TreeNode(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.color = NODE_COLOR.RED;
    }
    TreeNode.prototype.getGrandParent = function () {
        if (!this.parent) {
            return null;
        }
        return this.parent.parent;
    };
    TreeNode.prototype.getUncle = function () {
        var g = this.getGrandParent();
        if (!g) {
            return null;
        }
        if (this.parent === g.left) {
            return g.right;
        }
        else {
            return g.left;
        }
    };
    TreeNode.prototype.sibling = function () {
        if (!this.parent) {
            return null;
        }
        if (this === this.parent.left) {
            return this.parent.right;
        }
        else {
            return this.parent.left;
        }
    };
    return TreeNode;
}());
var RBTree = /** @class */ (function () {
    function RBTree(value) {
        this.root = new TreeNode(value);
        this.root.color = NODE_COLOR.BLACK;
    }
    /**
     * 前序遍历
     * */
    RBTree.PRE_ORDER_TRAVERSE = function (node) {
        if (!node)
            return;
        console.log(node.value);
        this.PRE_ORDER_TRAVERSE(node.left);
        this.PRE_ORDER_TRAVERSE(node.right);
    };
    /**
     * 中序遍历
     * */
    RBTree.IN_ORDER_TRAVERSE = function (node) {
        if (!node)
            return;
        this.IN_ORDER_TRAVERSE(node.left);
        console.log(node);
        this.IN_ORDER_TRAVERSE(node.right);
    };
    /**
     * 后序遍历
     * */
    RBTree.POST_ORDER_TRAVERSE = function (node) {
        if (!node)
            return;
        this.POST_ORDER_TRAVERSE(node.left);
        this.POST_ORDER_TRAVERSE(node.right);
        console.log(node.value);
    };
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
    RBTree.prototype.rightRotate = function (node) {
        if (!node)
            return;
        var leftNode = node.left;
        node.left = leftNode.right;
        if (leftNode.right) {
            leftNode.right.parent = node;
        }
        leftNode.right = node;
        if (node.parent) {
            leftNode.parent = node.parent;
            if (node.parent.left === node) {
                node.parent.left = leftNode;
            }
            else {
                node.parent.right = leftNode;
            }
        }
        else {
            leftNode.parent = null;
            this.root = leftNode;
        }
        node.parent = leftNode;
    };
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
    RBTree.prototype.leftRotate = function (node) {
        if (!node)
            return;
        var rightNode = node.right;
        node.right = rightNode.left;
        if (rightNode.left) {
            rightNode.left.parent = node;
        }
        rightNode.left = node;
        if (node.parent) {
            rightNode.parent = node.parent;
            if (node.parent.left === node) {
                node.parent.left = rightNode;
            }
            else {
                node.parent.right = rightNode;
            }
        }
        else {
            rightNode.parent = null;
            this.root = rightNode;
        }
        node.parent = rightNode;
    };
    RBTree.prototype.getRoot = function () {
        if (!this.root)
            return null;
        return this.root;
    };
    RBTree.prototype.insert = function (node, value) {
        var curNode = node;
        if (value > curNode.value) {
            if (curNode.right) {
                this.insert(curNode.right, value);
            }
            else {
                var newNode = new TreeNode(value);
                curNode.right = newNode;
                newNode.parent = curNode;
                this.insertCase(newNode);
            }
        }
        else if (value < node.value) {
            if (curNode.left) {
                this.insert(curNode.left, value);
            }
            else {
                var newNode = new TreeNode(value);
                curNode.left = newNode;
                newNode.parent = curNode;
                this.insertCase(newNode);
            }
        }
        else {
            if (curNode === this.root) {
                curNode.color = NODE_COLOR.BLACK;
            }
            else {
                return;
            }
        }
    };
    RBTree.prototype.insertCase = function (node) {
        var parent = node.parent;
        if (parent === null) {
            node.color = NODE_COLOR.BLACK;
            return;
        }
        if (parent.color === NODE_COLOR.BLACK) {
            return;
        }
        if (parent.color === NODE_COLOR.RED) {
            var uncle = node.getUncle();
            var grandParent = node.getGrandParent();
            if (uncle && uncle.color === NODE_COLOR.RED) {
                parent.color = NODE_COLOR.BLACK;
                uncle.color = NODE_COLOR.BLACK;
                grandParent.color = NODE_COLOR.RED;
                this.insertCase(grandParent);
            }
            else if ((uncle && uncle.color === NODE_COLOR.BLACK) || !uncle) {
                if (grandParent.left === parent && parent.left === node) {
                    parent.color = NODE_COLOR.BLACK;
                    grandParent.color = NODE_COLOR.RED;
                    this.rightRotate(grandParent);
                }
                else if (grandParent.left === parent && parent.right === node) {
                    this.leftRotate(parent);
                    node.color = NODE_COLOR.BLACK;
                    node.parent.color = NODE_COLOR.RED;
                    this.rightRotate(node.parent);
                }
                else if (grandParent.right === parent && parent.right === node) {
                    parent.color = NODE_COLOR.BLACK;
                    grandParent.color = NODE_COLOR.RED;
                    this.leftRotate(grandParent);
                }
                else if (grandParent.right === parent && parent.left === node) {
                    this.rightRotate(parent);
                    node.color = NODE_COLOR.BLACK;
                    node.parent.color = NODE_COLOR.RED;
                    this.leftRotate(node.parent);
                }
            }
        }
    };
    return RBTree;
}());
var rbt = new RBTree(1);
rbt.insert(rbt.getRoot(), 2);
rbt.insert(rbt.getRoot(), 3);
rbt.insert(rbt.getRoot(), 4);
rbt.insert(rbt.getRoot(), 5);
rbt.insert(rbt.getRoot(), 6);
rbt.insert(rbt.getRoot(), 7);
rbt.insert(rbt.getRoot(), 8);
RBTree.IN_ORDER_TRAVERSE(rbt.getRoot());
