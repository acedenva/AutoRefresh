// npm install --global --production windows-build-tools
// make sure python is in env and points to 2.7.x
// use quote fixed fork by github:sidharth0094/robotjs 
const robot = require('robotjs')
const fs = require('fs')
const Jimp = require('jimp')
async function checkTest(x,y,testFile) {
	let cords = {
		x,
		y
	}
	let testImage = await Jimp.read(`./tests/${testFile}`)
	let buffer = robot.screen.capture(cords.x, cords.y, testImage.bitmap.width, testImage.bitmap.height).image
	let captureImage = await new Jimp({
		data: buffer,
		width: testImage.bitmap.width,
		height: testImage.bitmap.height
	})
	let result = Jimp.diff(testImage, captureImage)
	result.image.write('./tests/fail.png')
	console.log(result.percent)
	return result.percent
}
function interact() {
	// 4 line in Sources Tab
	let restreamSourceCords = {
		x: 360,
		y: 880,
	}
	let interactContextCords = {
		x: 400,
		y: 820,
	}
	let interactWindowCords = {
		x: 870,
		y: 520,
	}
	let interactWindowCloseCords = {
		x: 1267,
		y: 228,
	}
	robot.setMouseDelay(450)
	robot.moveMouse(restreamSourceCords.x,restreamSourceCords.y)
	robot.mouseClick('right')
	robot.moveMouse(interactContextCords.x,interactContextCords.y)
	robot.mouseClick('left')
	robot.moveMouse(interactWindowCords.x,interactWindowCords.y)
	robot.mouseClick('left')
	robot.moveMouse(interactWindowCloseCords.x,interactWindowCloseCords.y)
	robot.mouseClick('left')
}
async function main () {
	if (await checkTest(3,6,'obs.png') <= 0) {
		if (await checkTest(881,365,'arrow.png') <= 0) {
			interact()
		}
	}
};
function loop () {
	setInterval(()=>{
		main()
	},1000)
};loop()
async function off () {
	let data = robot.screen.capture(3,6,10,10)
	let image = await new Jimp({
		data: data.image,
		width: data.width,
		height: data.height
	})
	image.write('./new.png')
}//;off()
