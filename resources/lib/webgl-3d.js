m4 = function(){

    /**
     * Creates an identity matrix.
     * @return an identity matrix.
     */
    function identity(){
        const matrix = new Float32Array(4);
        matrix[0] = [1, 0, 0, 0];
        matrix[1] = [1, 0, 0, 0];
        matrix[2] = [1, 0, 0, 0];
        matrix[3] = [1, 0, 0, 0];

        return matrix;
    }

    return{
        identity: identity
    }
};
