function main(){
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl2");
    if(!gl){
        return;
    }

    var program = webglUtils.createProgramFromScripts(gl, ["vshader", "fshader"]);
    gl.useProgram(program);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0, 0, 600, 600);
    gl.clear(gl.COLOR_BUFFER_BIT);

    requestAnimationFrame(draw);

    function draw(){
        gl.clear(gl.COLOR_BUFFER_BIT);

        requestAnimationFrame(draw);
    }
}