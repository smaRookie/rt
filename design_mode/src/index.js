class Person {
    constructor (name) {
        this.name = name
    }
    getName () {
        alert(this.name)
    }
}
let p = new Person('卡布达')
class Student extends Person {
    constructor (name, age) {
        super(name)
        this.age = age
    }
}
let s = new Student('葫芦娃', 15)
s.getName()
