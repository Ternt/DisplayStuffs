function main(){
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl2");
    if(!gl){
        return;
    }

    var program = webglUtils.createProgramFromScripts(gl, ["vshader", "fshader"]);
    gl.useProgram(program);
    console.log(gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var points = new Float32Array([
        -0.5,  0.5,
         0.0, -0.5,
         0.5,  0.5
    ]);


    const pointBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    const bufferInfo = primitive.createQuadBufferVertices(2);
    Log(bufferInfo);
    requestAnimationFrame(draw);

    function draw(){
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

        gl.drawArrays(gl.POINTS, 0, 3);
        gl.drawArrays(gl.LINE_LOOP, 0, 3);
        requestAnimationFrame(draw);
    }
}

function Log(field){
    if(field !== undefined){
        console.log(JSON.parse(JSON.stringify(field)));
    }
}
