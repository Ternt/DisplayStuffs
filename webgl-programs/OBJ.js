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

    let renderPrimtive = gl.TRIANGLES;
    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, "a_position");
    const modelMatrixUniformLocation = gl.getUniformLocation(shaderProgram, "modelMatrix");
    const projectionMatrixUniformLocation = gl.getUniformLocation(shaderProgram, "projMatrix");

    const bunny = new OBJLoader("DisplayStuffs/resources/models/stanfordbunny/stanford_bunny.obj");
    //const dragon = new OBJLoader("DisplayStuffs/resources/models/asiandragon/xyzrgb_dragon.obj");


    const vertexBufferObject = gl.createBuffer();

    requestAnimationFrame(draw);

    let alpha = 0;
    function draw(){
        gl.clear(gl.COLOR_BUFFER_BIT);

        alpha += 0.5;
        gl.uniformMatrix4fv(projectionMatrixUniformLocation,
            false,
            m4.orthographic(-1, 1, -1, 1, -1, 1));
        gl.uniformMatrix4fv(modelMatrixUniformLocation,
            false,
            m4.mult(
                m4.yRotate(-alpha),
                m4.scale(3.0, 3.0, 3.0)));
            // m4.mult(
            //     m4.xRotate(alpha),
            //     m4.mult(
            //         m4.yRotate(-alpha),
            //         m4.scale(3.0, 3.0, 3.0))));

        if(bunny.objParsed){
            //console.log(bunny.verifyAttribute(bunny.positions));

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bunny.positions), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.vertexAttribPointer(
                positionAttributeLocation,
                3,
                gl.FLOAT,
                false,
                0,
                0);
            gl.drawArrays(gl.TRIANGLES, 0, bunny.positions.length/3);
        }
        requestAnimationFrame(draw);
    }
}