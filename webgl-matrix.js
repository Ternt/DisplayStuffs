(function(root, factory) {  // eslint-disable-line
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.matrix = factory();
    }
}(this, function() {
    "use strict";

    function identity(matrix){
        matrix = matrix || new Float32Array(16);
        matrix[ 0] = 1;
        matrix[ 1] = 0;
        matrix[ 2] = 0;
        matrix[ 3] = 0;
        matrix[ 4] = 0;
        matrix[ 5] = 1;
        matrix[ 6] = 0;
        matrix[ 7] = 0;
        matrix[ 8] = 0;
        matrix[ 9] = 0;
        matrix[10] = 1;
        matrix[11] = 0;
        matrix[12] = 0;
        matrix[13] = 0;
        matrix[14] = 0;
        matrix[15] = 1;
        return matrix;
    }

    function multiply(a, b, matrix){
        matrix = matrix || new Float32Array(16);
        var a00 = a[0 * 4 + 0];
        var a01 = a[0 * 4 + 1];
        var a02 = a[0 * 4 + 2];
        var a03 = a[0 * 4 + 3];
        var a10 = a[1 * 4 + 0];
        var a11 = a[1 * 4 + 1];
        var a12 = a[1 * 4 + 2];
        var a13 = a[1 * 4 + 3];
        var a20 = a[2 * 4 + 0];
        var a21 = a[2 * 4 + 1];
        var a22 = a[2 * 4 + 2];
        var a23 = a[2 * 4 + 3];
        var a30 = a[3 * 4 + 0];
        var a31 = a[3 * 4 + 1];
        var a32 = a[3 * 4 + 2];
        var a33 = a[3 * 4 + 3];
        var b00 = b[0 * 4 + 0];
        var b01 = b[0 * 4 + 1];
        var b02 = b[0 * 4 + 2];
        var b03 = b[0 * 4 + 3];
        var b10 = b[1 * 4 + 0];
        var b11 = b[1 * 4 + 1];
        var b12 = b[1 * 4 + 2];
        var b13 = b[1 * 4 + 3];
        var b20 = b[2 * 4 + 0];
        var b21 = b[2 * 4 + 1];
        var b22 = b[2 * 4 + 2];
        var b23 = b[2 * 4 + 3];
        var b30 = b[3 * 4 + 0];
        var b31 = b[3 * 4 + 1];
        var b32 = b[3 * 4 + 2];
        var b33 = b[3 * 4 + 3];
        matrix[ 0] = a00*b00 + a01*b10 + a02*b20 + a03*b30;
        matrix[ 1] = a00*b01 + a01*b11 + a02*b21 + a03*b31;
        matrix[ 2] = a00*b02 + a01*b12 + a02*b22 + a03*b32;
        matrix[ 3] = a00*b03 + a01*b13 + a02*b23 + a03*b33;
        matrix[ 4] = a10*b00 + a11*b10 + a12*b20 + a13*b30;
        matrix[ 5] = a10*b01 + a11*b11 + a12*b21 + a13*b31;
        matrix[ 6] = a10*b02 + a11*b12 + a12*b22 + a13*b32;
        matrix[ 7] = a10*b03 + a11*b13 + a12*b23 + a13*b33;
        matrix[ 8] = a20*b00 + a21*b10 + a22*b20 + a23*b30;
        matrix[ 9] = a20*b01 + a21*b11 + a22*b21 + a23*b31;
        matrix[10] = a20*b02 + a21*b12 + a22*b22 + a23*b32;
        matrix[11] = a20*b03 + a21*b13 + a22*b23 + a23*b33;
        matrix[12] = a30*b00 + a31*b10 + a32*b20 + a33*b30;
        matrix[13] = a30*b01 + a31*b11 + a32*b21 + a33*b31;
        matrix[14] = a30*b02 + a31*b12 + a32*b22 + a33*b32;
        matrix[15] = a30*b03 + a31*b13 + a32*b23 + a33*b33;
        return matrix;
    }

    function add(a, b, matrix){
        matrix = matrix || new Float32Array(16);
        for(let i = 0 ; i < matrix.length ; i++){
            matrix[i] = a[i] + b[i];
        }

        return matrix;
    }

    return{
        identity: identity,
        multiply: multiply,
        add: add,
    };
}));
