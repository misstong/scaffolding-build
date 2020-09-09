const { series, parallel } = require('gulp')

const task1 = done => {
    setTimeout(() => {
        console.log('task1 working')
        done()
    },1000)
}

const task2 = done => {
    setTimeout(() => {
        console.log('task2 working')
        done()
    })
}

exports.foo = series(task1, task2)

exports.bar = parallel(task1, task2)