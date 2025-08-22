


void main(){
    gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec3( position, 1.);
}