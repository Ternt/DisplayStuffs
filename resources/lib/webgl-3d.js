m4 = function(){

    /**
     * Creates an identity matrix.
     * @return an identity matrix.
     */
    function identity(mat){
        mat = mat || new Float32Array(16);
        mat[ 0] = 1;
        mat[ 1] = 0;
        mat[ 2] = 0;
        mat[ 3] = 0;
        mat[ 4] = 0;
        mat[ 5] = 1;
        mat[ 6] = 0;
        mat[ 7] = 0;
        mat[ 8] = 0;
        mat[ 9] = 0;
        mat[10] = 1;
        mat[11] = 0;
        mat[12] = 0;
        mat[13] = 0;
        mat[14] = 0;
        mat[15] = 1;

        return mat;
    }

    /**
     * Creates a 4D matrix. Can take in an optional matrix
     * @return {Float32Array}
     */
    function createMat4(){
        return new Float32Array(16);
    }

    function add(a, b, mat){
        mat = mat || new Float32Array(16);
        let index = 0;
        for(let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                index = (i*4) + j;
                mat[index] = a[index] + b[index];
            }
        }
        return mat;
    }

    function subtract(a, b, mat){
        mat = mat || new Float32Array(16);
        let index = 0;
        for(let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                index = (i*4) + j;
                mat[index] = a[index] - b[index];
            }
        }
        return mat;
    }

    function multiplyScalar(n, mat){
        for(let i = 0; i < 16; i++){
            mat[i] = n * mat[i];
        }
        return mat;
    }

    /**
     * Performs matrix multiplication on two matrices with the same dimensions.
     * @param {Mat4} a
     * @param {Mat4} b
     * @param {Mat4} mat
     * @return {Mat4}
     */
    function mult(a, b, mat){
        mat = mat || new Float32Array(16);
        let a00 = a[0];
        let a01 = a[1];
        let a02 = a[2];
        let a03 = a[3];
        let b00 = b[(4 * 0)];
        let b01 = b[(4 * 1)];
        let b02 = b[(4 * 2)];
        let b03 = b[(4 * 3)];

        let a10 = a[4];
        let a11 = a[5];
        let a12 = a[6];
        let a13 = a[7];
        let b10 = b[(4 * 0) + 1];
        let b11 = b[(4 * 1) + 1];
        let b12 = b[(4 * 2) + 1];
        let b13 = b[(4 * 3) + 1];

        let a20 = a[8];
        let a21 = a[9];
        let a22 = a[10];
        let a23 = a[11];
        let b20 = b[(4 * 0) + 2];
        let b21 = b[(4 * 1) + 2];
        let b22 = b[(4 * 2) + 2];
        let b23 = b[(4 * 3) + 2];

        let a30 = a[12];
        let a31 = a[13];
        let a32 = a[14];
        let a33 = a[15];
        let b30 = b[(4 * 0) + 3];
        let b31 = b[(4 * 1) + 3];
        let b32 = b[(4 * 2) + 3];
        let b33 = b[(4 * 3) + 3];

        mat[0]  = (a00*b00) + (a01*b01) + (a02*b02) + (a03*b03);
        mat[1]  = (a00*b10) + (a01*b11) + (a02*b12) + (a03*b13);
        mat[2]  = (a00*b20) + (a01*b21) + (a02*b22) + (a03*b23);
        mat[3]  = (a00*b30) + (a01*b31) + (a02*b32) + (a03*b33);

        mat[4]  = (a10*b00) + (a11*b01) + (a12*b02) + (a13*b03);
        mat[5]  = (a10*b10) + (a11*b11) + (a12*b12) + (a13*b13);
        mat[6]  = (a10*b20) + (a11*b21) + (a12*b22) + (a13*b23);
        mat[7]  = (a10*b30) + (a11*b31) + (a12*b32) + (a13*b33);

        mat[8]  = (a20*b00) + (a21*b01) + (a22*b02) + (a23*b03);
        mat[9]  = (a20*b10) + (a21*b11) + (a22*b12) + (a23*b13);
        mat[10] = (a20*b20) + (a21*b21) + (a22*b22) + (a23*b23);
        mat[11] = (a20*b30) + (a21*b31) + (a22*b32) + (a23*b33);

        mat[12] = (a30*b00) + (a31*b01) + (a32*b02) + (a33*b03);
        mat[13] = (a30*b10) + (a31*b11) + (a32*b12) + (a33*b13);
        mat[14] = (a30*b20) + (a31*b21) + (a32*b22) + (a33*b23);
        mat[15] = (a30*b30) + (a31*b31) + (a32*b32) + (a33*b33);

        return mat;
    }

    function translate(tx, ty, tz, mat){
        mat = mat || new Float32Array(16);
        mat[ 0] = 1;
        mat[ 1] = 0;
        mat[ 2] = 0;
        mat[ 3] = 0;
        mat[ 4] = 0;
        mat[ 5] = 1;
        mat[ 6] = 0;
        mat[ 7] = 0;
        mat[ 8] = 0;
        mat[ 9] = 0;
        mat[10] = 1;
        mat[11] = 0;
        mat[12] = tx;
        mat[13] = ty;
        mat[14] = tz;
        mat[15] = 1;
        return mat;
    }

    function scale(sx, sy, sz, mat){
        mat = mat || new Float32Array(16);
        mat[ 0] = sx;
        mat[ 1] = 0;
        mat[ 2] = 0;
        mat[ 3] = 0;
        mat[ 4] = 0;
        mat[ 5] = sy;
        mat[ 6] = 0;
        mat[ 7] = 0;
        mat[ 8] = 0;
        mat[ 9] = 0;
        mat[10] = sz;
        mat[11] = 0;
        mat[12] = 0;
        mat[13] = 0;
        mat[14] = 0;
        mat[15] = 1;
        return mat;
    }

    function xRotate(angle, mat){
        mat = mat || new Float32Array(16);
        const angleInRad = angle * (Math.PI/180);
        const cos = Math.cos(angleInRad);
        const sin = Math.sin(angleInRad);

        mat[ 0] = 1;
        mat[ 1] = 0;
        mat[ 2] = 0;
        mat[ 3] = 0;
        mat[ 4] = 0;
        mat[ 5] = cos;
        mat[ 6] = sin;
        mat[ 7] = 0;
        mat[ 8] = 0;
        mat[ 9] = -sin;
        mat[10] = cos;
        mat[11] = 0;
        mat[12] = 0;
        mat[13] = 0;
        mat[14] = 0;
        mat[15] = 1;

        return mat;
    }

    function yRotate(angle, mat){
        mat = mat || new Float32Array(16);
        const angleInRad = angle * (Math.PI/180);
        const cos = Math.cos(angleInRad);
        const sin = Math.sin(angleInRad);

        mat[ 0] = cos;
        mat[ 1] = 0;
        mat[ 2] = -sin;
        mat[ 3] = 0;
        mat[ 4] = 0;
        mat[ 5] = 1;
        mat[ 6] = 0;
        mat[ 7] = 0;
        mat[ 8] = sin;
        mat[ 9] = 0;
        mat[10] = cos;
        mat[11] = 0;
        mat[12] = 0;
        mat[13] = 0;
        mat[14] = 0;
        mat[15] = 1;

        return mat;
    }


    function zRotate(angle, mat){
        mat = mat || new Float32Array(16);
        const angleInRad = angle * (Math.PI/180);
        const cos = Math.cos(angleInRad);
        const sin = Math.sin(angleInRad);

        mat[ 0] = cos;
        mat[ 1] = sin;
        mat[ 2] = 0;
        mat[ 3] = 0;
        mat[ 4] = -sin;
        mat[ 5] = cos;
        mat[ 6] = 0;
        mat[ 7] = 0;
        mat[ 8] = 0;
        mat[ 9] = 0;
        mat[10] = 1;
        mat[11] = 0;
        mat[12] = 0;
        mat[13] = 0;
        mat[14] = 0;
        mat[15] = 1;

        return mat;
    }

    return{
        identity: identity,
        createMat4: createMat4,
        add: add,
        subtract: subtract,
        multiplyScalar: multiplyScalar,
        mult: mult,
        translate: translate,
        scale: scale,
        xRotate: xRotate,
        yRotate: yRotate,
        zRotate: zRotate,
    }
}();
