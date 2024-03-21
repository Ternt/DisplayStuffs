function main(){
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl2");
    if(!gl){
        return;
    }

    var shaderProgram = webglUtils.createProgramFromScripts(gl, ["vshader", "fshader"]);
    gl.useProgram(shaderProgram);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const model = new OBJLoader("http://localhost:63342/DisplayStuffs/resources/models/stanford-bunny.obj");

    const vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);

    requestAnimationFrame(draw);

    let alpha = 0;
    let count = 0;
    function draw(){
        gl.clear(gl.COLOR_BUFFER_BIT);

        if(model.objParsed && count < 1){
            ++count;
            console.log(model.vertices);
            console.log(model.faceIndex);
        }

        requestAnimationFrame(draw);
    }
}