async function main(){
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

    let renderPrimtive = gl.TRIANGLES;
    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, "a_position");
    const modelMatrixUniformLocation = gl.getUniformLocation(shaderProgram, "modelMatrix");
    const projectionMatrixUniformLocation = gl.getUniformLocation(shaderProgram, "projMatrix");

    const bunnyArrayBuffer = await OBJ.load("/resources/models/asiandragon/xyzrgb_dragon.obj");
    console.log(bunnyArrayBuffer);

    const vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, bunnyArrayBuffer, gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttributeLocation);

    requestAnimationFrame(draw);

    let alpha = 0;
    let count = 0;
    function draw(){
        gl.clear(gl.COLOR_BUFFER_BIT);

        alpha += 0.5;
        gl.uniformMatrix4fv(projectionMatrixUniformLocation, false, m4.orthographic(-1, 1, -1, 1, -1, 1));
        gl.uniformMatrix4fv(modelMatrixUniformLocation, false, m4.mult(m4.yRotate(-alpha), m4.scale(0.01, 0.01, 0.01)));
        gl.drawArrays(gl.TRIANGLES, 0, bunnyArrayBuffer.byteLength/12);
        requestAnimationFrame(draw);
    }
}