let pathInput = document.getElementById("pathInput")

pathInput.addEventListener("change", async () => {
    let [file] = pathInput.files
    let reader = new FileReader()

    reader.readAsText(file)

    reader.onload = () => {
        //"reader.result" is just the text file
        console.log(JSON.parse(reader.result))


    };
})