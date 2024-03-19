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
        const n = size || 1;

        // FRONT (z: -1)
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

        var uvCoords = [
            [1, 0],
            [0, 0],
            [0, 1],
            [1, 1],
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
            texcoord: texCoords,
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
