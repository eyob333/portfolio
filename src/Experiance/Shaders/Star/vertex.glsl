attribute float aScale;

uniform float uSize;

void main(){
    vec3 newPos = position;
    newPos -= .5;
    float rad = length(newPos);
    gl_Position =  projectionMatrix * viewMatrix * modelMatrix * vec4(vec3(newPos), 1.);
    gl_PointSize = aScale * uSize;

}