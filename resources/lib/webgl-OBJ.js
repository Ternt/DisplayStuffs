class OBJLoader{

    objParsed = false;
    vertices = [];
    faceIndex = [];

    constructor(path) {
        path = this.createURL(path);
        this.loadFile(path, this.parseFile.bind(this));
    }

    createURL(path){
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port = window.location.port;
        path = protocol + "//" + hostname + ":" + port + "/" + path;
        return path;
    }

    loadFile(path, parseFile) {
        // Asynchronously load file
        let req = new XMLHttpRequest(); // See [1]
        req.overrideMimeType( "text/plain; charset=x-user-defined" );   // Ensure correct MIME type (see [3])
        req.open('GET', path);
        req.onreadystatechange = function() {
            if (req.readyState === 4 && req.status === 200) {
                let file = req.responseText;

                console.log(path);

                // Parse the file
                parseFile(file);
            }
        }
        req.send(null);
    }

    parseFile(file){
        file = file.trim();
        let lines = file.split("\n");
        //console.log(lines);

        for(let line = 0 ; line < lines.length ; line++){
            if(lines[line].startsWith("#")){
                continue;
            }

            if(lines[line].startsWith("v")){
                let v = lines[line].match(/-*\d.\w*(\s)*/g);
                this.vertices.push(v[0], v[1], v[2]);
            }

            if(lines[line].startsWith("f")){
                let f = lines[line].match(/(\d)+(\s)*/g);
                this.faceIndex.push(f[0], f[1], f[2]);
            }
        }

        this.objParsed = true;
        console.log(this.vertices, this.faceIndex);
    }
}