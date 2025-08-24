
attribute float aSpeed;

uniform float uSize;
uniform float uTime;
uniform float uSpeed;

varying float uStrength;
#define max_z 7.



void main(){
    vec3 newPos = position;
    // newPos.x  -= max_z;
    float mov = fract(uTime * .001  * aSpeed * uSpeed) * max_z + 4.;
    // newPos.x += mov;


    // newPos.x = newPos.x + sin(+ uTime * uSpeed * .0001);
    vec4 mvPosition = modelViewMatrix * vec4( newPos, 1.);
    
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize =  (uSize * 10. ) / -mvPosition.z;

    uStrength = 1.;// mov;

    // // newPos.x *= sin(uTime * .001);
    // vec4 instancePosition = instanceMatrix * vec4(newPos, 1.0);

    // instancePosition.x += sin(uTime * .002);
    // // Deform the point. Let's elongate it on the Y-axis
    // // and make it a bit random.
    // // instancePosition.y *= 5.0 + sin(uTime * .01) * 2.0;
    
    // // Now, apply the standard MVP transformation
    // gl_Position = projectionMatrix * modelViewMatrix * instancePosition;


}