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

    function mult(a, b, mat){
        mat = mat || new Float32Array(16);

    }


    return{
        identity: identity,
        mult: mult
    }
}();
