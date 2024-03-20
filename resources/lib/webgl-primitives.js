primitive = function(){
    "use strict";

    function createTetrahedronVertices(){
        var cornerVertices = new Float32Array([
            -0.5, -0.5, -0.5,
             0.5, -0.5,  0.0,
             0.0,  0.5,  0.0,
            -0.5, -0.5,  0.5,
             0.5, -0.5,  0.0,
             0.0,  0.5,  0.0,
        ]);

        return {
            position: cornerVertices
        };
    }

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
        createQuadBufferVertices: createQuadBufferVertices,
        createTetrahedronVertices: createTetrahedronVertices,
        createCubeVertices,
    };
}();
