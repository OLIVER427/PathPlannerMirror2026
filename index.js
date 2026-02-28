let pathJSON
let file
let reader = new FileReader()
let fileLoaded = false
let fileProcessed = false

const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");
// ctx.strokeStyle = "white";
ctx.lineWidth = 5

// ctx.beginPath();
// ctx.moveTo(0,0);
// ctx.lineTo(1650, 800);
// ctx.stroke()

document.getElementById("pathInput").addEventListener("change", async () => {
    [file] = document.getElementById("pathInput").files
    reader.readAsText(file)
    fileLoaded = true

    setTimeout(() => {
        visualizePath()
    }, 100);
})

function visualizePath() {
    ctx.strokeStyle = "white";
    let startX = (JSON.parse(reader.result).waypoints[0].anchor.x) * 100
    let startY = ((1 - (Number(JSON.parse(reader.result).waypoints[0].anchor.y) / 8)) * 8) * 100
    let endX = (JSON.parse(reader.result).waypoints[1].anchor.x) * 100
    let endY = ((1 - (Number(JSON.parse(reader.result).waypoints[1].anchor.y) / 8)) * 8) * 100
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke()

    if (document.getElementById("horizontal").checked) {
        startX = ((1 - (Number(JSON.parse(reader.result).waypoints[0].anchor.x) / 16.5)) * 16.5) * 100
        endX = ((1 - (Number(JSON.parse(reader.result).waypoints[1].anchor.x) / 16.5)) * 16.5) * 100
    }
    if (document.getElementById("vertical").checked) {
        // ctx.strokeStyle = "#d934eba4";
        startY = (JSON.parse(reader.result).waypoints[0].anchor.y) * 100
        endY = (JSON.parse(reader.result).waypoints[1].anchor.y) * 100
    }

    if (startX < 825) {
        ctx.strokeStyle = "#5234eba4";
        console.log(startX)
    } else if (startX > 825) {
        ctx.strokeStyle = "#eb3434a4";
    }
    //NOTE FOR WHEN YOU GET BACK: DO THE STARTY AND ENDY (also do vertical.checked one for graph too)

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke()


}

function processPath() {
    //"reader.result" is just the text file
    // let [file] = document.getElementById("pathInput").files
    // let reader = new FileReader()

    //X and Y are normal for this
    //  the X is [0, 16.5]
    //  the Y is  [0, 8]
    pathJSON = JSON.parse(reader.result)
    console.log(pathJSON)
    document.getElementById("input").innerHTML = JSON.stringify(pathJSON)
    console.log("START X: " + pathJSON.waypoints[0].anchor.x)
    console.log("START Y: " + pathJSON.waypoints[0].anchor.y)
    console.log("END X: " + pathJSON.waypoints[1].anchor.x)
    console.log("END Y: " + pathJSON.waypoints[1].anchor.y)

    if (document.getElementById("horizontal").checked) {
        pathJSON.waypoints[0].anchor.x = ((1 - (Number(pathJSON.waypoints[0].anchor.x) / 16.5)) * 16.5)
        pathJSON.waypoints[1].anchor.x = ((1 - (Number(pathJSON.waypoints[1].anchor.x) / 16.5)) * 16.5)
    }

    if (document.getElementById("vertical").checked) {
        pathJSON.waypoints[0].anchor.y = ((1 - (Number(pathJSON.waypoints[0].anchor.y) / 8)) * 8)
        pathJSON.waypoints[1].anchor.y = ((1 - (Number(pathJSON.waypoints[1].anchor.y) / 8)) * 8)
    }
    console.log("CONVERTED START X: " + pathJSON.waypoints[0].anchor.x)
    console.log("CONVERTED START Y: " + pathJSON.waypoints[0].anchor.y)
    console.log("CONVERTED END X: " + pathJSON.waypoints[1].anchor.x)
    console.log("CONVERTED END Y: " + pathJSON.waypoints[1].anchor.y)

    document.getElementById("result").innerHTML = JSON.stringify(pathJSON)
    if (fileProcessed == false) {
        document.getElementById("downloadBtn").style.visibility = "visible"
        document.getElementById("downloadBtn").style.opacity = 1
        document.getElementById("infoText").style.opacity = 1
    }
}