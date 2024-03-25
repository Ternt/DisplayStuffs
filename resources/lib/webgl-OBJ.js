OBJ = function(){
    "use strict";

    const getFileContents = async(filename) =>{
        const file = await fetch(filename)
        const body = await file.text();
        return body;
    };

    function stringsToValues(strings){
        const numbers = [];
        for(const str of strings){
            numbers.push(parseFloat(str));
        }
        return numbers;
    }

    function parseFile(fileContents){
        fileContents = fileContents.trim();
        let lines = fileContents.split('\n');
        const positions = [];
        const normals   = [];
        const texCoords = [];

        const arrayBufferSource = [];

        lines.forEach(line => {
            if(line.startsWith('#')){
                return;
            }

            const [ command, ...values ] = line.split(' ', 4);

            if(command === 'v'){
                positions.push(stringsToValues(values));
            }else if(command === 'vn'){
                normals.push(stringsToValues(values));
            }else if(command === 'vt'){
                texCoords.push(stringsToValues(values));
            }else if(command === 'f'){
                for(const group of values){
                    const [ positionIndexBuffer, texCoordIndex, normalIndex] = stringsToValues(group.split('/'));

                    arrayBufferSource.push(...positions[positionIndexBuffer-1]);
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

    function verifyAttribute(attribute){
        for(let i = 0; i < attribute.length ; i++){
            if(attribute[i] === undefined){
                return false;
            }
        }

        return true;
    }

    return{
        load: loadObject,
        verifyAttribute,
    }
}();