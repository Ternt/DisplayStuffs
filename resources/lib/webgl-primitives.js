primitive = function(){
    "use strict";

    const CUBE_FACES_INDICES = [
        [3, 2, 0, 1], // FRONT
        [7, 6, 4, 5], // BACK
        [2, 6, 4, 0],
    ]

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

    function createQuadBufferVertices(size){
        size = size || 2;
        return{
            position: {
                numComponents: 2,
                data: [
                    -1 * size, -1 * size,
                         size, -1 * size,
                    -1 * size,      size,
                         size,      size
                ]},
            normal: {
                numComponents: 3,
                data: [
                    0, 0, 1,
                    0, 0, 1,
                    0, 0, 1,
                    0, 0, 1
                ]},
            texcoord: {
                numComponents: 2,
                data: [
                    0, 0,
                    1, 0,
                    0, 1,
                    1, 1,
                ]},
            indices: [0, 1, 2, 2, 1, 3],
        }
    }

    return{
        createQuadBufferVertices,
        createCubeVertices,
    };
}();
