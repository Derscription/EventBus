class WestEventBus {
	constructor() {
		this.eventBus = {}
	}

	// 监听事件
	on(eventName, eventCallback, thisArg = globalThis) {
		// 根据事件名去eventBus中找事件处理函数
		let handlers = this.eventBus[eventName]
		// 判断当前事件名是否有值
		if (!handlers) {
			handlers = []
			this.eventBus[eventName] = handlers
		}
		// 将需要回调的函数添加进去
		handlers.push({
			eventCallback,
			thisArg,
		})
	}

	// 取消事件
	off(eventName, eventCallback) {
		const handlers = this.eventBus[eventName]
		if (!handlers) return
		// 对原数组进行拷贝
		const newHandlers = [...handlers]
		// 对新数组进行遍历
		newHandlers.forEach(item => {
			// 判断item中的eventCallback是否和传入的eventCallback相同
			if (item.eventCallback === eventCallback) {
				// 相同则找到原数组中对象的下标
				const index = handlers.indexOf(item)
				// 对其进行删除
				handlers.splice(index, 1)
			}
		})
	}

	// 发射事件
	emit(eventName, ...payload) {
		const handlers = this.eventBus[eventName]
		// 判断数组中是否有值
		if (!handlers) return
		handlers.forEach(handlerFn =>
			handlerFn.eventCallback.apply(handlerFn.thisArg, payload)
		)
	}
}

// 测试
const eventBus = new WestEventBus()

eventBus.on(
	"west",
	function () {
		console.log("监听west函数被执行了~", this)
	},
	{ aaa: 123 }
)

const callback = function () {
	console.log("监听west函数被执行了~", this)
}
eventBus.on("west", callback, { bbb: 456 })

eventBus.emit("west")

eventBus.off("west", callback)

eventBus.emit("west")
