
//writing the Javascript code which will draw the graphics //

 // now we made them global variable 
var gl;   
var theta=0.0;
var thetaLoc;
var inverse = false;
var rotation = false;
var delay = 50;
var delay2;
var sizeC = 0.0;
var sizeX = 1.0;
var sizeY = 1.0;
var scaleC ;
var scaleX ;
var scaleY ;
var Tx = 0;
var Ty = 0;
var color=[1.0,1.0,1.0,1.0];


window.onload = function main() {  // main();

/*********************************************************************************/
// Initializing the GL context
  const canvas = document.querySelector("#glcanvas"); 
  gl = canvas.getContext("webgl");

  // if WebGL is available and working , can continue
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

/********************************************************************************/
    var program = initShaders(gl,"vertexShaderId","fragmentShaderId");
    gl.useProgram( program );

/**************************************************************************/
//SCALING

   document.getElementById("slide").onchange = function(){sizeC = this.value;};
   scaleC = gl.getUniformLocation(program,"sizeC");

   document.getElementById("scale_x").onchange= function(){sizeX=this.value;};
   document.getElementById("scale_y").onchange= function(){ sizeY=this.value;};

   scaleX = gl.getUniformLocation(program,"sizeX");
   scaleY = gl.getUniformLocation(program,"sizeY");

/**************************************************************************/
//STOP OR START ROTATING

   var startButton = document.getElementById("startButton");
   startButton.addEventListener("click",
                        function(){
                           rotation=true;
                        });
   var stopButton = document.getElementById("stopButton");
   stopButton.addEventListener("click",
                        function(){
                           rotation=false;
                        });
/**************************************************************************************/
// CHANGING THE COLORS

   var buttonColor = document.getElementById("ColorButton");
   var colorLocation = gl.getUniformLocation(program,"fColor");

   document.getElementById("color").onchange = function(){delay2 = this.value;};
  
   var blue =[0.0,0.0,0.5,0.5];
   var red =[1.0, 0.0, 0.0, 1.0];
   var white =[1.0,1.0,1.0,1.0];
   var green =[0.0, 0.5, 0.0,1.0];

   buttonColor.addEventListener("click",
                        function(){ 
                          if(delay2=="white"){color = white;gl.uniform4fv(colorLocation,color);}
                          else if(delay2=="blue"){color = blue;gl.uniform4fv(colorLocation,color);}
                          else if(delay2=="red"){color = red;gl.uniform4fv(colorLocation,color);}
                          else if(delay2=="green"){color = green;gl.uniform4fv(colorLocation,color);} 
                          else if(delay2 == "random"){
                                  color = [Math.random(), Math.random(), Math.random(), Math.random()];
                                  gl.uniform4fv(colorLocation,color);                            
                          }                    
                         } );
/**********************************************************************************/ 

//SET SPEED OF ROTATING
   window.addEventListener("keydown",
                     function(){
                              switch(event.keyCode){
                                case 82 : 
                                  inverse = !inverse;
                                  break;
                                case 107 :
                                 delay /=1.25;
                                 break;
                                 case 109 :
                                 if(delay<2000)
                                    delay *= 1.25;
                                 break;
                              }                         
                        });
                    

/****************************************************************************************/

//LOCATION FOR ROTATING

thetaLoc = gl.getUniformLocation(program,"theta");

/*************************************************************************************/
//RELOCATING

var right_x = document.getElementById("right_x");
    right_x.addEventListener("click",
                        function(){ Tx += 10;                        
                        });                                               
var left_x = document.getElementById("left_x");
    left_x.addEventListener("click",
                        function(){  Tx -= 10;                         
                        }); 

var up_y = document.getElementById("up_y");
    up_y.addEventListener("click",
                        function(){  Ty += 10;                         
                        });                                               
var down_y = document.getElementById("down_y");
    down_y.addEventListener("click",
                        function(){ Ty -= 10;                          
                        }); 


/*************************************************************************************/

//COORDINATES OF LETTERS

    var vertices = [ 
        // letter Z :  
                 vec2(0.1,0.6),vec2(0.6,0.6),
                 vec2(0.6,0.55),vec2(0.6,0.55),
                 vec2(0.1, 0.6),vec2(0.1, 0.55),

                 vec2(0.55,0.55),vec2(0.6,0.55),
                 vec2(0.15,-0.55),vec2(0.15,-0.55),
                 vec2(0.1, -0.55),vec2(0.55,0.55),

                 vec2(0.1,-0.55),vec2(0.6,-0.55),
                 vec2(0.1,-0.6),vec2(0.1,-0.6),
                 vec2(0.6, -0.6),vec2(0.6,-0.55),

         // letter B : 
                 vec2(-0.7,0.6),vec2(-0.25,0.6),
                 vec2(-0.25,0.55),vec2(-0.25,0.55),
                 vec2(-0.7,0.6),vec2(-0.7,0.55),

                 vec2(-0.3, 0.55),vec2(-0.25, 0.55),
                 vec2(-0.25,0.1),vec2(-0.25,0.1),
                 vec2(-0.3,0.1),vec2(-0.3,0.55),

                 vec2(-0.7, 0.55),vec2(-0.65, 0.55),
                 vec2(-0.65,0.1),vec2(-0.65,0.1),
                 vec2(-0.7,0.1),vec2(-0.7,0.55),

                 vec2(-0.7, 0.1),vec2(-0.1, 0.1),
                 vec2(-0.1,0.05),vec2(-0.1,0.05),
                 vec2(-0.7,0.05),vec2(-0.7,0.1),

                 vec2(-0.7, 0.05),vec2(-0.65, 0.05),
                 vec2(-0.65,-0.6),vec2(-0.65,-0.6),
                 vec2(-0.7,-0.6),vec2(-0.7,0.05),

                 vec2(-0.15, 0.05),vec2(-0.1, 0.05),
                 vec2(-0.1,-0.6),vec2(-0.1,-0.6),
                 vec2(-0.15,-0.6),vec2(-0.15,0.05),

                 vec2(-0.65, -0.55),vec2(-0.15, -0.55),
                 vec2(-0.15,-0.6),vec2(-0.15,-0.6),
                 vec2(-0.65,-0.6),vec2(-0.65,-0.55)
            ];
                
/**************************************************************************/
//CREATING A VERTEX BUFFER OBJECT ON THE GPU

var bufferId = gl.createBuffer();  

//making this buffer the current buffer to use
gl.bindBuffer( gl.ARRAY_BUFFER, bufferId ); 

gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

// Associating our shader variables with our data buffer
var vPosition = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition );

//******************************************************************************//

    render();


}


function setRotating(){
    theta += (inverse ? -0.1 : 0.1);
    gl.uniform1f(thetaLoc,theta);
}


function render(){
    
    // first background color
    gl.clearColor(0.9, 0.9, 0.7, 1.0);   

    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays( gl.TRIANGLES, 0, 60 );  

           
    gl.uniform1f(scaleC,sizeC);
    gl.viewport(Tx,Ty,glcanvas.width,glcanvas.height);

    gl.uniform1f(scaleX,sizeX);
    gl.uniform1f(scaleY,sizeY);

     if(rotation == true){       
         setRotating();
        }

    setTimeout(function(){
        requestAnimFrame(render);
      },delay);

}









