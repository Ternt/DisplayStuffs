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

    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, "a_position");
    const normalAttributeLocation = gl.getAttribLocation(shaderProgram, "a_normal");
    const modelMatrixUniformLocation = gl.getUniformLocation(shaderProgram, "modelMatrix");
    const projectionMatrixUniformLocation = gl.getUniformLocation(shaderProgram, "projMatrix");

    function createCubeVertices(size){
        const n = size || 1;

        var cornerVertices = [
            [-n, -n, -n],   // 0
            [+n, -n, -n],   // 1
            [-n, +n, -n],   // 2
            [+n, +n, -n],   // 3
            [-n, -n, +n],   // 4
            [+n, -n, +n],   // 5
            [-n, +n, +n],   // 6
            [+n, +n, +n]    // 7
        ];

        var faceNormals = [
            [+0, +0, +1],   // FRONT
            [+1, +0, +0],   // RIGHT
            [+0, +1, +0],   // TOP
            [-1, +0, +0],   // LEFT
            [+0, -1, +0],   // BOTTOM
            [+0, +0, -1],   // BACK
        ];

        var CUBE_FACE_INDICES = [
            [3, 2, 0], [3, 0, 1],   // FRONT
            [7, 3, 1], [1, 5, 7],   // RIGHT
            [7, 6, 2], [7, 2, 3],   // TOP
            [2, 6, 4], [2, 4, 0],   // LEFT
            [1, 0, 4], [1, 4, 5],   // BOTTOM
            [6, 7, 5], [5, 4, 6]    // BACK
        ];

        const numVertices = 3 * 2 * 6;
        const positions = webglUtils.createAugmentedTypedArray(3, numVertices);
        const normals   = webglUtils.createAugmentedTypedArray(3, numVertices);
        const texCoords = webglUtils.createAugmentedTypedArray(2 , numVertices);

        for (let f = 0; f < 6; ++f) {
            for(let t = 0; t < 2; t ++) {
                const triIndices = CUBE_FACE_INDICES[(2 * f) + t];
                for (let v = 0; v < 3; v++) {
                    positions.push(cornerVertices[triIndices[v]]);
                    normals.push(faceNormals[f]);
                }
            }
        }

        return {
            position: positions,
            normal: normals,
        };
    }

    const cubeData = createCubeVertices(0.5);
    const pointBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cubeData.position, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cubeData.normal, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(normalAttributeLocation);
    gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    console.log(cubeData);

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
                m4.mult(m4.xRotate(-alpha),
                        m4.yRotate(alpha)));

        gl.drawArrays(gl.TRIANGLES, 0, 36);
        requestAnimationFrame(draw);
    }
}