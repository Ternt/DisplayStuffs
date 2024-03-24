class OBJLoader{

    objParsed = false;
    positions = [];

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

        const vertices = [];
        for(let line = 0 ; line < lines.length ; line++){
            if(lines[line].startsWith("#")){
                continue;
            }

            if(lines[line].startsWith("v")){
                let v = lines[line].match(/-*\d.\w*(\s)*/g);
                vertices.push(v[0], v[1], v[2]);
            }

            if(lines[line].startsWith("f")){
                let f = lines[line].match(/(\d)+(\s)*/g);
                this.positions.push(vertices[(f[0]*3)-1], vertices[(f[0]*3)-2], vertices[(f[0]*3)-3]);
                this.positions.push(vertices[(f[1]*3)-1], vertices[(f[1]*3)-2], vertices[(f[1]*3)-3]);
                this.positions.push(vertices[(f[2]*3)-1], vertices[(f[2]*3)-2], vertices[(f[2]*3)-3]);
            }
        }

        this.objParsed = true;
        console.log(vertices, this.positions);
    }

    verifyAttribute(attribute){
        for(let i = 0; i < attribute.length ; i++){
            if(attribute[i] === undefined){
                return false;
            }
        }

        return true;
    }
}