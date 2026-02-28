let pathJSON
let file
let reader = new FileReader()
document.getElementById("pathInput").addEventListener("change", async () => {
    [file] = document.getElementById("pathInput").files
    reader.readAsText(file)
})

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
    }

    if (document.getElementById("horizontal").checked) {
        pathJSON.waypoints[1].anchor.y = ((1 - (Number(pathJSON.waypoints[1].anchor.y) / 8)) * 8)
    }
    console.log("CONVERTED START X: " + pathJSON.waypoints[0].anchor.x)
    console.log("CONVERTED START Y: " + pathJSON.waypoints[0].anchor.y)
    console.log("CONVERTED END X: " + pathJSON.waypoints[1].anchor.x)
    console.log("CONVERTED END Y: " + pathJSON.waypoints[1].anchor.y)

    document.getElementById("result").innerHTML = JSON.stringify(pathJSON)
};