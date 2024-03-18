function main(){
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl2");
    if(!gl){
        return;
    }


    var program = webglUtils.createProgramFromScripts(gl, ["vshader", "fshader"]);
    gl.useProgram(program);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const normalAttributeLocation = gl.getAttribLocation(program, "a_normal");

    function createCubeVertices(size){
        const n = size || 1;

        var vertices = new Float32Array([
            // FRONT (z: -1)
            +n, +n, -n,
            -n, +n, -n,
            -n, -n, -n,
            +n, -n, -n,
            // RIGHT
            +n, +n, +n,
            +n, +n, -n,
            +n, -n, -n,
            +n, -n, +n,
            // TOP
            +n, +n, +n,
            -n, +n, +n,
            -n, +n, -n,
            +n, +n, -n,
            // LEFT
            -n, +n, -n,
            -n, +n, +n,
            -n, -n, +n,
            -n, -n, -n,
            // BOTTOM
            +n, -n, -n,
            -n, -n, -n,
            -n, -n, +n,
            +n, -n, +n,
            // BACK
            -n, +n, +n,
            +n, +n, +n,
            +n, -n, +n,
            -n, -n, +n
        ]);

        var texture = new Uint8Array([
            1, 1,
            0, 1,
            0, 0,
            1, 0,

            1, 1,
            0, 1,
            0, 0,
            1, 0,

            1, 1,
            0, 1,
            0, 0,
            1, 0,

            1, 1,
            0, 1,
            0, 0,
            1, 0,

            1, 1,
            0, 1,
            0, 0,
            1, 0,

            1, 1,
            0, 1,
            0, 0,
            1, 0
        ]);

        var normals = new Int16Array([
            // FRONT
            0,  0, -1,
            0,  0, -1,
            0,  0, -1,
            0,  0, -1,
            // RIGHT
            1,  0,  0,
            1,  0,  0,
            1,  0,  0,
            1,  0,  0,
            // TOP
            0,  1,  0,
            0,  1,  0,
            0,  1,  0,
            0,  1,  0,
            // LEFT
            -1,  0,  0,
            -1,  0,  0,
            -1,  0,  0,
            -1,  0,  0,
            // BOTTOM
            0, -1,  0,
            0, -1,  0,
            0, -1,  0,
            0, -1,  0,
            // BACK
            0,  0,  1,
            0,  0,  1,
            0,  0,  1,
            0,  0,  1
        ]);

        var indices = new Uint16Array([
            0,  1,  2,   0,  2,  3,
            4,  5,  6,   4,  6,  7,
            8,  9, 10,   8,  10, 11,
            12, 13, 14,  12, 14, 15,
            16, 17, 18,  16, 18, 19,
            20, 21, 22,  20, 22, 23
        ]);

        return {
            positions: vertices,
            normals: normals,
            texCoords: texture,
            indices: indices,
        }
    }

    const cubeData = createCubeVertices(0.5);
    const pointBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cubeData.positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    // const normalBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, cubeData.normals, gl.STATIC_DRAW);
    // gl.enableVertexAttribArray(normalAttributeLocation);
    // gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);


    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cubeData.indices, gl.STATIC_DRAW);


   requestAnimationFrame(draw);

    function draw(){
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(draw);
    }
}