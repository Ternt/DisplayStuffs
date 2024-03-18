m4 = function(){

    /**
     * Creates an identity matrix.
     * @return {number[]} identity
     */
    function identity(){
        const matrix = new Float32Array([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]]);

        return matrix;
    }

    return{

    }
};
