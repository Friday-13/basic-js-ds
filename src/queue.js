const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = new ListNode();
  }

  getUnderlyingList() {
    return this.head;
  }

  enqueue(value) {
    let currentNode = this.head;
    if (this.head.value === undefined) {
      this.head.value = value;
      return;
    }

    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    currentNode.next = new ListNode(value);
  }

  dequeue() {
    const oldHead = this.head;
    this.head = oldHead.next;
    return oldHead.value;
  }
}

module.exports = {
  Queue,
};
