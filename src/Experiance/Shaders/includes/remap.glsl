
#define sat (x, .0, 1.)

float remap01( float a, float b, float t){
    return (t - a) / (b - a);
}

float remap( float a, float b, float c,  float d, float t){

    return remap01(a, b, t) * (d - c) + c;
}