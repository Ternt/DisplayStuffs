function main(){
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl2");
    if(!gl){
        return;
    }

    console.log(document.getElementById("vshader"));
    var program = webglUtils.createProgramFromScripts(gl, ["vshader", "fshader"]);
    gl.useProgram(program);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    function createCubeVertices(size){
        const n = size || 1;

        var vertices = [
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
        ];

        var texture = [
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
        ];

        var normals = [
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
        ];

        var indices = [
            0,  1,  2,   0,  2,  3,
            4,  5,  6,   4,  6,  7,
            8,  9, 10,   8,  10, 11,
            12, 13, 14,  12, 14, 15,
            16, 17, 18,  16, 18, 19,
            20, 21, 22,  20, 22, 23
        ]

        return {
            positions: vertices,
            normals: normals,
            texCoords: texture,
            indices: indices,
        }
    }


    const pointBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
}