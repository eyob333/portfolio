

uniform float uSize;


void main(){
    gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec4( position, 1.);

    gl_PointSize =  uSize;

}