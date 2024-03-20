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
        const k = size/2 || 2.0;

        var vertices = [
            // Vertex Data        // Normal Data            // Texture Data
            // front face (z: +1)
            k,  k,  k,           0.0, 0.0, 1.0,            1.0, 1.0,
            -k,  k,  k,           0.0, 0.0, 1.0,            0.0, 1.0,
            -k, -k,  k,           0.0, 0.0, 1.0,            0.0, 0.0,
            k, -k,  k,           0.0, 0.0, 1.0,            1.0, 0.0,
            // right face (x: +1)
            k,  k, -k,           1.0, 0.0, 0.0,            1.0, 1.0,
            k,  k,  k,           1.0, 0.0, 0.0,            0.0, 1.0,
            k, -k,  k,           1.0, 0.0, 0.0,            0.0, 0.0,
            k, -k, -k,           1.0, 0.0, 0.0,            1.0, 0.0,
            // top face (y: +1)
            k,  k, -k,           0.0, 1.0, 0.0,            1.0, 1.0,
            -k,  k, -k,           0.0, 1.0, 0.0,            0.0, 1.0,
            -k,  k,  k,           0.0, 1.0, 0.0,            0.0, 0.0,
            k,  k,  k,           0.0, 1.0, 0.0,            1.0, 0.0,
            // left face (x: -1)
            -k,  k,  k,           -1.0, 0.0, 0.0,           1.0, 1.0,
            -k,  k, -k,           -1.0, 0.0, 0.0,           0.0, 1.0,
            -k, -k, -k,           -1.0, 0.0, 0.0,           0.0, 0.0,
            -k, -k,  k,           -1.0, 0.0, 0.0,           1.0, 0.0,
            // bottom face (y: -1)
            k, -k,  k,           0.0, -1.0, 0.0,           1.0, 1.0,
            -k, -k,  k,           0.0, -1.0, 0.0,           0.0, 1.0,
            -k, -k, -k,           0.0, -1.0, 0.0,           0.0, 0.0,
            k, -k, -k,           0.0, -1.0, 0.0,           1.0, 0.0,
            // back face (z: -1)
            -k,  k, -k,           0.0, 0.0, -1.0,           1.0, 1.0,
            k,  k, -k,           0.0, 0.0, -1.0,           0.0, 1.0,
            k, -k, -k,           0.0, 0.0, -1.0,           0.0, 0.0,
            -k, -k, -k,           0.0, 0.0, -1.0,           1.0, 0.0,
        ];

        var indices = [
            0,  1,  2,   0,  2,  3,
            4,  5,  6,   4,  6,  7,
            8,  9, 10,   8, 10, 11,
            12, 13, 14,  12, 14, 15,
            16, 17, 18,  16, 18, 19,
            20, 21, 22,  20, 22, 23
        ];

        return {
            vertices: vertices, // 0.75 KiB
            indices: indices,   // 72 bytes
        };
    }

    const cubeData = createCubeVertices(0.5);
    const vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeData.vertices), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(
        positionAttributeLocation,
        3,
        gl.FLOAT,
        false,
        8 * Float32Array.BYTES_PER_ELEMENT,
        0);

    gl.enableVertexAttribArray(normalAttributeLocation);
    gl.vertexAttribPointer(
        normalAttributeLocation,
        3,
        gl.FLOAT,
        false,
        8 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT);

    var indexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeData.indices), gl.STATIC_DRAW);

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
            m4.mult(m4.xRotate(alpha), m4.yRotate(-alpha)));

        gl.drawElements(gl.TRIANGLES, cubeData.indices.length, gl.UNSIGNED_SHORT,0);
        requestAnimationFrame(draw);
    }
}