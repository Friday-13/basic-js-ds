const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(value) {
    this.rootNode = new Node(value);
  }

  root() {
    const node = this.rootNode;
    if (node.data === undefined) return null;
    return node;
  }

  add(data) {
    if (this.root() === null) {
      this.rootNode.data = data;
      return;
    }

    let currentNode = this.root();
    let searchPosition = true;
    while (searchPosition) {
      if (currentNode.data < data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(data);
          searchPosition = false;
        } else {
          currentNode = currentNode.right;
        }
      } else if (currentNode.data > data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(data);
          searchPosition = false;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        searchPosition = false;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let currentNode = this.root();

    while (currentNode) {
      if (currentNode.data === data) return currentNode;
      if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
    return null;
  }

  remove(data) {
    let currentNode = this.root();
    let prevNode = null;

    while (currentNode) {
      if (currentNode.data === data) {
        break;
      }
      if (data > currentNode.data) {
        prevNode = currentNode;
        currentNode = currentNode.right;
      } else {
        prevNode = currentNode;
        currentNode = currentNode.left;
      }
    }

    if (currentNode === null) return;

    /* if it's leaf */
    if (currentNode.left === null && currentNode.right === null) {
      if (prevNode.left === currentNode) {
        prevNode.left = null;
      } else {
        prevNode.right = null;
      }
      return;
    }

    /* if only right child */
    if (currentNode.left === null && currentNode.right !== null) {
      if (prevNode !== null) {
        if (prevNode.left === currentNode) {
          prevNode.left = currentNode.right;
        } else {
          prevNode.right = currentNode.right;
        }
      } else {
        this.rootNode = currentNode.right;
      }
      return;
    }

    /* if only left child */
    if (currentNode.left !== null && currentNode.right === null) {
      if (prevNode !== null) {
        if (prevNode.left === currentNode) {
          prevNode.left = currentNode.left;
        } else {
          prevNode.right = currentNode.left;
        }
      } else {
        this.rootNode = currentNode.left;
      }
      return;
    }

    /* if both child - change to min element from right subtree */
    let minRight = currentNode.right;
    while (minRight.left !== null) {
      minRight = minRight.left;
    }
    this.remove(minRight.data);
    currentNode.data = minRight.data;
  }

  min() {
    let currentNode = this.root();
    if (currentNode === null) return null;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this.root();
    if (currentNode === null) return null;
    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
