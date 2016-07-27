function Dot () {
  this.x = Math.random() * canvas.width
  this.y = Math.random() * canvas.height
  this.vx = -0.5 + Math.random()
  this.vy = -0.5 + Math.random()
  this.radius = Math.random()
}
Dot.prototype = {
  create: function () {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fill()
  },
  animate: function () {
    for (var i = 0; i < dots.nb; i++) {
      var dot = dots.array[i]
      if (dot.y < 0 || dot.y > canvas.height) {
        dot.vx = dot.vx
        dot.vy = -dot.vy
      } else if (dot.x < 0 || dot.x > canvas.width) {
        dot.vx = -dot.vx
        dot.vy = dot.vy
      }
      dot.x += dot.vx
      dot.y += dot.vy
    }
  }
}

function createDots () {
  var dot
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (var i = 0; i < dots.nb; i++) {
    dots.array.push(new Dot())
    dot = dots.array[i]
    dot.create()
  }
  dot.animate()
}

var canvas = document.querySelector('canvas')
if (canvas) {
  var ctx = canvas.getContext('2d')
  var color = '#72cc96'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.display = 'block'
  ctx.fillStyle = color
  ctx.lineWidth = 0.1
  ctx.strokeStyle = color
  var dots = {
    nb: 500,
    distance: 80,
    d_radius: 150,
    array: []
  }
  setInterval(createDots, 1000 / 30)
}
