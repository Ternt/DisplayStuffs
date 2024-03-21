OBJ = function(){
    "use strict"

    function importMesh(filePath){
        // Parse the OBJ file

        loadFile(filePath);
    }

    function loadFile(path) {
        // Asynchronously load file
        let req = new XMLHttpRequest(); // See [1]
        req.overrideMimeType( "text/plain; charset=x-user-defined" );   // Ensure correct MIME type (see [3])
        req.open('GET', path);
        req.onreadystatechange = function() {
            if (req.readyState === 4 && req.status === 200) {
                let file = req.responseText;

                // console.log(path);

                // Parse the file
                console.log(file);
            }
        }
        req.send(null);
    }

    return {
        import: importMesh
    }
}();