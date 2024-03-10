webglUtils = function(){
    "use strict"
    function compileShader(gl, shaderSource, opt_type){
        var shader = gl.createShader(opt_type);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if(!success){
            alert("yo theres an error with the shader compilation" + gl.getShaderInfoLog(shader));
        }

        return shader;
    }

    function createProgram(gl, vertexShader, fragShader){
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            var msg = "Uhm... your shader didn't link properly bro. Here's some deets: "
                        + "<pre>" + gl.getProgramInfoLog(program) + "</pre>";
            alert(msg);
        }

        return program;
    }

    function createShaderFromScripts(gl, scriptId, opt_type){
        var shaderScript = document.getElementById(scriptId);

        var shaderSource = shaderScript.text;

        if(!opt_type) {
            if (scriptId.type === "x-shader/x-vertex") {
                opt_type = gl.VERTEX_SHADER;
            } else if (scriptId.type === "x-shader/x-fragment") {
                opt_type = gl.FRAGMENT_SHADER;
            } else {
                alert("ayo bro you didn't specify a shader type. ya doink");
            }
        }

        return compileShader(gl, shaderSource, opt_type);
    }

    function createProgramFromScripts(gl, shaderScriptIds){
        var vertexShader = createShaderFromScripts(gl, shaderScriptIds[0], gl.VERTEX_SHADER);
        var fragShader = createShaderFromScripts(gl, shaderScriptIds[1], gl.FRAGMENT_SHADER);
        return createProgram(gl, vertexShader, fragShader);
    }

    return {
        createProgramFromScripts,
    };
}();