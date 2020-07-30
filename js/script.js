window.onload = () => {
  let ball = document.getElementById("ball"),
      range = document.getElementById("range"),
      rangeMove = function() {
        let increment = true,
            inc = setInterval(() => {
              if (range.value == "100") {
                clearInterval(inc)
                increment = false
              }
              console.log(range.value)
              range.setAttribute("value", String(Number(range.getAttribute("value")) + 1))
            }, 8),
            dec = setInterval(() => {
              if (range.value == "1") {
                clearInterval(dec)
                rangeMove()
              }
              console.log(range.value)
              increment == false ? range.setAttribute("value", String(Number(range.getAttribute("value")) - 1)) : null
            }, 8)
      }
  function miniGame() {
    range.style.visibility = "visible"
    rangeMove()
  }
  ball.onmousedown = (e) => {
    let coords = getCoords(ball),
        shiftX = e.pageX - coords.left,
        shiftY = e.pageY - coords.top
    ball.style.position = "absolute"
    document.body.appendChild(ball)
    moveAt(e)
    ball.style.zIndex = 1000
    function moveAt(e) {
      ball.style.left = e.pageX - shiftX + "px"
      ball.style.top = e.pageY - shiftY + "px"
    }
    document.onmousemove = function(e) {
      moveAt(e)
    }
    ball.onmouseup = () => {
      coords = getCoords(ball)
      if (Math.hypot(coords.centerX - 380, coords.centerY - 340) < 100) {
        setPos(ball, 325, 260)
        miniGame()
      }
      document.onmousemove = null
      ball.onmouseup = null
    }
    ball.ondragstart = () => {
      return false;
    }
  }
  function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      centerX: box.left + pageXOffset + (box.width / 2),
      centerY: box.top + pageYOffset + (box.height / 2)
    }
  }
  function setPos(elem, left, top) {
    elem.style.left = left + "px"
    elem.style.top = top + "px"
  }
}