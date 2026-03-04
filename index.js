let pathJSON
let importedPath
let reader = new FileReader()
let fileLoaded = false
let fileVisualized = false

const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");
// ctx.strokeStyle = "white";
ctx.lineWidth = 5

// ctx.beginPath();
// ctx.moveTo(0,0);
// ctx.lineTo(1650, 800);
// ctx.stroke()

document.getElementById("pathInput").addEventListener("change", async () => {
    [importedPath] = document.getElementById("pathInput").files
    reader.readAsText(importedPath)
    fileLoaded = true

    // setTimeout(() => {
    //     visualizePath()
    // }, 100);
})

function visualizePath() {
    if (fileVisualized == false && fileLoaded) {
        document.getElementById("downloadBtn").style.visibility = "visible"
        document.getElementById("downloadBtn").style.opacity = 1
        document.getElementById("downloadAllBtn").style.visibility = "visible"
        document.getElementById("downloadAllBtn").style.opacity = 1
        document.getElementById("infoText").style.opacity = 1
        fileVisualized = true
    }
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

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke()
}

function exportPath() {
    //"reader.result" is just the text file
    // let [file] = document.getElementById("pathInput").files
    // let reader = new FileReader()

    //X and Y are normal for this
    //  the X is [0, 16.5]
    //  the Y is  [0, 8]
    pathJSON = JSON.parse(reader.result)
    console.log(pathJSON)
    // document.getElementById("input").innerHTML = JSON.stringify(pathJSON)
    console.log("START X: " + pathJSON.waypoints[0].anchor.x)
    console.log("START Y: " + pathJSON.waypoints[0].anchor.y)
    console.log("END X: " + pathJSON.waypoints[1].anchor.x)
    console.log("END Y: " + pathJSON.waypoints[1].anchor.y)

    //normal X and Y point flipping
    if (document.getElementById("horizontal").checked) {
        pathJSON.waypoints[0].anchor.x = ((1 - (Number(pathJSON.waypoints[0].anchor.x) / 16.5)) * 16.5)
        pathJSON.waypoints[1].anchor.x = ((1 - (Number(pathJSON.waypoints[1].anchor.x) / 16.5)) * 16.5)

        pathJSON.waypoints[0].nextControl.x = ((1 - (Number(pathJSON.waypoints[0].nextControl.x) / 16.5)) * 16.5)
        pathJSON.waypoints[1].prevControl.x = ((1 - (Number(pathJSON.waypoints[1].prevControl.x) / 16.5)) * 16.5)
    }

    if (document.getElementById("vertical").checked) {
        pathJSON.waypoints[0].anchor.y = ((1 - (Number(pathJSON.waypoints[0].anchor.y) / 8)) * 8)
        pathJSON.waypoints[1].anchor.y = ((1 - (Number(pathJSON.waypoints[1].anchor.y) / 8)) * 8)

        pathJSON.waypoints[0].nextControl.y = ((1 - (Number(pathJSON.waypoints[0].nextControl.y) / 8)) * 8)
        pathJSON.waypoints[1].prevControl.y = ((1 - (Number(pathJSON.waypoints[1].prevControl.y) / 8)) * 8)
    }

    // next stuff is for point towards zones
    for (let i = 0; i < pathJSON.pointTowardsZones.length; i++) {
        if (document.getElementById("horizontal").checked) {
            pathJSON.pointTowardsZones[i].fieldPosition.x = ((1 - (Number(pathJSON.pointTowardsZones[i].fieldPosition.x) / 16.5)) * 16.5)
        }
        if (document.getElementById("vertical").checked) {
            pathJSON.pointTowardsZones[i].fieldPosition.y = ((1 - (Number(pathJSON.pointTowardsZones[i].fieldPosition.y) / 8)) * 8)
        }

        if (document.getElementById("horizontal").checked && document.getElementById("vertical").checked == false) {
            pathJSON.pointTowardsZones[i].rotationOffset = Number(pathJSON.pointTowardsZones[i].rotationOffset) * -1
        } else if (document.getElementById("horizontal").checked && document.getElementById("vertical").checked) {
            pathJSON.pointTowardsZones[i].rotationOffset = Number(pathJSON.pointTowardsZones[i].rotationOffset)
        } else if (document.getElementById("horizontal").checked == false && document.getElementById("vertical").checked) {
            pathJSON.pointTowardsZones[i].rotationOffset = -Number(pathJSON.pointTowardsZones[i].rotationOffset)
        }
        console.log("point towards zone: " + i)
    }

    // now into the starting state and end state rotation craziness
    if (document.getElementById("horizontal").checked && document.getElementById("vertical").checked == false) {
        pathJSON.idealStartingState.rotation = 180 - Number(pathJSON.idealStartingState.rotation)
        pathJSON.goalEndState.rotation = 180 - Number(pathJSON.goalEndState.rotation)
    } else if (document.getElementById("horizontal").checked && document.getElementById("vertical").checked) {
        pathJSON.idealStartingState.rotation = 180 + Number(pathJSON.idealStartingState.rotation)
        pathJSON.goalEndState.rotation = 180 + Number(pathJSON.goalEndState.rotation)
    } else if (document.getElementById("horizontal").checked == false && document.getElementById("vertical").checked) {
        pathJSON.idealStartingState.rotation = -Number(pathJSON.idealStartingState.rotation)
        pathJSON.goalEndState.rotation = -Number(pathJSON.goalEndState.rotation)
    }

    //this is for the mid-path rotations
    for (let i = 0; i < pathJSON.rotationTargets.length; i++) {
        if (document.getElementById("horizontal").checked && document.getElementById("vertical").checked == false) {
            pathJSON.rotationTargets[i].rotationDegrees = 180 - Number(pathJSON.rotationTargets[i].rotationDegrees)
        } else if (document.getElementById("horizontal").checked && document.getElementById("vertical").checked) {
            pathJSON.rotationTargets[i].rotationDegrees = 180 + Number(pathJSON.rotationTargets[i].rotationDegrees)
        } else if (document.getElementById("horizontal").checked == false && document.getElementById("vertical").checked) {
            pathJSON.rotationTargets[i].rotationDegrees = -Number(pathJSON.rotationTargets[i].rotationDegrees)
        }
        // console.log("rotation target: " + i)
    }

    console.log("CONVERTED START X: " + pathJSON.waypoints[0].anchor.x)
    console.log("CONVERTED START Y: " + pathJSON.waypoints[0].anchor.y)
    console.log("CONVERTED END X: " + pathJSON.waypoints[1].anchor.x)
    console.log("CONVERTED END Y: " + pathJSON.waypoints[1].anchor.y)

    // document.getElementById("result").innerHTML = JSON.stringify(pathJSON)

    let pathMirror = new File(["\ufeff" + JSON.stringify(pathJSON)], "Mirrored " + importedPath.name);
    document.getElementById("hiddenDownloader").href = window.URL.createObjectURL(pathMirror);
    document.getElementById("hiddenDownloader").download = pathMirror.name
    document.getElementById("hiddenDownloader").click()
}

function exportAllMirrors() {
    document.getElementById("vertical").checked = true
    document.getElementById("horizontal").checked = false
    exportPath()
    document.getElementById("vertical").checked = true
    document.getElementById("horizontal").checked = true
    exportPath()
    document.getElementById("vertical").checked = false
    document.getElementById("horizontal").checked = true
    exportPath()
    document.getElementById("vertical").checked = false
    document.getElementById("horizontal").checked = false

    alert("Mirrored paths have been downloaded. ")
}