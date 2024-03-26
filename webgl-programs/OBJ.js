async function main(){
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl2");
    if(!gl){
        return;
    }

    var shaderProgram = webglUtils.createProgramFromScripts(gl, ["vshader", "fshader"]);
    gl.useProgram(shaderProgram);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let   renderPrimtive                    = gl.TRIANGLES;
    const positionAttributeLocation         = gl.getAttribLocation(shaderProgram, "a_position");
    const normalAttributeLocation           = gl.getAttribLocation(shaderProgram, "a_normal");
    const texCoordAttributeLocation         = gl.getAttribLocation(shaderProgram, "a_texCoord");
    const modelMatrixUniformLocation        = gl.getUniformLocation(shaderProgram, "modelMatrix");
    const projectionMatrixUniformLocation   = gl.getUniformLocation(shaderProgram, "projMatrix");
    const diffuseSamplerUniformLocation     = gl.getUniformLocation(shaderProgram, "uSampler_diffuse");
    const normalSamplerUniformLocation      = gl.getUniformLocation(shaderProgram, "uSampler_normal");
    const AOSamplerUniformLocation          = gl.getUniformLocation(shaderProgram, "uSampler_AO");

    // const arrayBuffer = await OBJ.load("/resources/models/asiandragon/xyzrgb_dragon.obj");
    // const arrayBuffer = await OBJ.load("/resources/models/stanfordbunny/bunny.obj");
    const arrayBuffer   = await OBJ.loadObject("/resources/models/meteor/Iron_Meteorite.obj");
    const diffuse       = await OBJ.loadMTL("/resources/models/meteor/Iron_Meteorite-diffuse.png");
    const normal        = await OBJ.loadMTL("/resources/models/meteor/Iron_Meteorite-normal.png");
    const AO            = await OBJ.loadMTL("/resources/models/meteor/Iron_Meteorite-AO.png");
    //console.log(arrayBuffer);

    const vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, arrayBuffer, gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 20, 12);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(texCoordAttributeLocation);

    const transformation = m4.mult(m4.scale(0.06, 0.06, 0.06), m4.xRotate(-90));
    gl.uniformMatrix4fv(projectionMatrixUniformLocation, false, m4.orthographic(-1, 1, -1, 1, -1, 1));

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    function configureImage(index, textureSlot, opt_width, opt_height, sourceImage){
        gl.activeTexture(gl.TEXTURE0 + textureSlot);
        gl.uniform1i(index, textureSlot);

        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        let bindingTarget   = gl.TEXTURE_2D;
        let mipmapLevel     = 0;
        let internalFormat  = gl.RGBA;           // Used to describe the color of the final texture.
        let width           = opt_width  || 2;
        let height          = opt_height || 2;
        let border          = 0;
        let format          = gl.RGBA;
        let type            = gl.UNSIGNED_BYTE;
        gl.texImage2D(bindingTarget, mipmapLevel, internalFormat, width, height, border, format, type, sourceImage);
        gl.generateMipmap(gl.TEXTURE_2D);
    }

    configureImage(diffuseSamplerUniformLocation, 0, 8192, 8192, diffuse);
    configureImage(normalSamplerUniformLocation, 1, 8192, 8192, normal);
    //configureImage(AOSamplerUniformLocation, 1, 4096, 4096, AO);

    requestAnimationFrame(draw);

    let alpha = 0;
    let count = arrayBuffer.byteLength/20;
    function draw(){
        gl.clear(gl.COLOR_BUFFER_BIT);

        alpha += 1;
        gl.uniformMatrix4fv(modelMatrixUniformLocation, false, m4.mult(m4.zRotate(alpha), transformation));
        gl.drawArrays(gl.TRIANGLES, 0, count);
        requestAnimationFrame(draw);
    }
}