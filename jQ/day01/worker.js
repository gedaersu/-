function fibonacci(n) {
  return n<=2 ? 1 : (fibonacci(n-1)+fibonacci(n-2))
  n = null
}

var onmessage = function (event) {
  var number = event.Date
  var result = fibonacci(number)
  postMessage(result)
}