
attribute float aSpeed;

uniform float uSize;
uniform float uTime;
uniform float uSpeed;

varying float uStrength;
#define max_z 100.



void main(){
    vec3 newPos = position;

    float distance = length(newPos);
    newPos.xyz *=  10.;
    
    newPos.z  -= max_z - 20.;
    float mov = pow(fract(uTime * .001  * aSpeed * uSpeed), 3.) * max_z ;
    newPos.z += mov;

    // newPos.x = newPos.x + sin(+ uTime * uSpeed * .0001);
    vec4 mvPosition = modelViewMatrix * vec4( newPos, 1.);
    
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize =  (uSize * 10. ) / -mvPosition.z;

    uStrength =1.-( mov/max_z);

    // // newPos.x *= sin(uTime * .001);
    // vec4 instancePosition = instanceMatrix * vec4(newPos, 1.0);

    // instancePosition.x += sin(uTime * .002);
    // // Deform the point. Let's elongate it on the Y-axis
    // // and make it a bit random.
    // // instancePosition.y *= 5.0 + sin(uTime * .01) * 2.0;
    
    // // Now, apply the standard MVP transformation
    // gl_Position = projectionMatrix * modelViewMatrix * instancePosition;


}