OBJ = function(){
    "use strict";

    const positions = [];
    const normals   = [];
    const texCoords = [];

    const getFileContents = async(filename) =>{
        const file = await fetch(filename)
        const body = await file.text();
        return body;
    };

    function stringToNumber(strings){
        const numbers = [];
        for(const str of strings){
            numbers.push(parseFloat(str));
        }
        return numbers;
    }

    function parseFile(fileContents){
        fileContents = fileContents.trim();
        let lines = fileContents.split('\n');
        const arrayBufferSource = [];

        lines.forEach(line => {
            if(line.startsWith('#')){
                return;
            }

            const [ command, ...values ] = line.split(' ', 4);
            if(command === 'v'){
                positions.push(stringToNumber(values));
            }else if(command === 'vn'){
                normals.push(stringToNumber(values));
            }else if(command === 'vt'){
                texCoords.push(stringToNumber(values));
            }else if(command === 'f'){
                for(const group of values){
                    const [ positionIndexBuffer, texCoordIndexBuffer, normalIndexBuffer] = stringToNumber(group.split('/'));
                    arrayBufferSource.push(...positions[positionIndexBuffer-1]);

                    if(normalIndexBuffer) {
                        arrayBufferSource.push(...normals[normalIndexBuffer - 1]);
                    }else if(texCoordIndexBuffer){
                        arrayBufferSource.push(...texCoords[texCoordIndexBuffer-1]);
                    }
                }
            }
        })
        return new Float32Array(arrayBufferSource).buffer;
    }

    const loadObject = async(filename) => {
        const file = await getFileContents(filename);
        const arrayBuffer = await parseFile(file);
        return arrayBuffer;
    }

    const loadMTL = (path) => new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image))
        image.src = path;
    });

    function calculateCentroid(){

    }

    function verifyAttribute(attribute){
        for(let i = 0; i < attribute.length ; i++){
            if(attribute[i] === undefined){
                return false;
            }
        }

        return true;
    }

    return{
        loadObject: loadObject,
        loadMTL: loadMTL,
        verify: verifyAttribute,
    }
}();