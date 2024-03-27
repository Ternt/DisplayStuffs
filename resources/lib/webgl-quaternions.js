q = function(){
    "use strict";
    const mData = new Float32Array(4);
    function identity(){
        mData[0] = 0;
        mData[1] = 0;
        mData[2] = 0;
        mData[3] = 1;
        return mData;
    }

    function quaternion(x, y, z, w){
        mData[0] = x;
        mData[1] = y;
        mData[2] = z;
        mData[3] = w;
        return mData;
    }

    function rotationX(rotationAngle, rotationAxis){
        const c = Math.sin(rotationAngle/2);
        mData[0] = rotationAxis[0] * c;
        mData[1] = rotationAxis[1] * c;
        mData[2] = rotationAxis[2] * c;
        mData[3] = Math.cos(rotationAngle/2);
    }

    return{
        identity: identity,
        quaternion: quaternion,
    }
}();