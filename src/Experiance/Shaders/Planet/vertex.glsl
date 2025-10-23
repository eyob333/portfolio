

void main(){
    
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(Position, 1.);
}