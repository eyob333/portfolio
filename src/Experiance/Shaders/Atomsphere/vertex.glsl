

void main(){
    gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec4(position, 1.);
}