// npm install --global --production windows-build-tools
let robot = require('robotjs')
function capArrow () {
	arrowCords = {
		x: 799,
		y: 362,
	}
	let capture = robot.screen.capture()
	arrowColor = capture.colorAt(arrowCords.x,arrowCords.y)
	return arrowColor
}
function interact() {
	restreamCords = {
		x: 350,
		y: 850,
	}
	interactCords = {
		x: 400,
		y: 790,
	}
	robot.setMouseDelay(250)
	robot.moveMouse(restreamCords.x,restreamCords.y)
	robot.mouseClick('right')
	robot.moveMouse(interactCords.x,interactCords.y)
	robot.mouseClick('left')
}
let arrowColor = capArrow()
if (arrowColor == 'e6e6e6') {
	interact()
}
