attribute float aScale;

uniform float uSize;
uniform float uResolution;
uniform float uTime;
uniform float uSpeed;

// varying vec2 vUv;

void main(){
    vec3 pos = position;
    // pos -= .5;
    float d = length(pos);
    d = pow(d, .5);
    float g = pow(smoothstep(1., .2 , d), .5 ) * 100. ;


    vec3 finPos = vec3(  g * pos ) ;
    // csm_Position = finPos;
    // csm_PointSize = aScale * uSize;
    // vUv = uv;
}