export class TargetToneNode {
	constructor(val=null) {
		this.value = val;
		this.next = null;
		this.previous = null;
	}
}

export class TargetsLinkedList {
	constructor(val=null) {
		this.head = val;
		this.tail = null;
		this.length = 0;
	}

	addToHead(target) {
		let targetNode = new TargetToneNode(target);
		if (!this.head) {
			this.head = targetNode;
			this.tail = targetNode;
		}
		else {
			let oldHead = this.head;
			this.head.next = oldHead;
			this.head.previous = targetNode;
			this.head = targetNode;
			this.head.next = oldHead;
		}
		this.length++;
	}

	removeHead() {
		if (!this.head) return;

		let toRemove = this.head;
		this.head = this.head.next;
		if (!this.head) this.tail = null;
		else this.head.previous = null;

		this.length--;

		return toRemove;
	}

	removeTail () {
		if (!this.tail) return;

		let toRemove = this.tail;
		this.tail = this.tail.previous;
		if (!this.tail) this.head = null;
		else this.tail.next = null;

		this.length--;

		return toRemove;
	}
}