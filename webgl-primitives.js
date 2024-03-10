primitive = function(){
    "use strict";

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
    };
}();