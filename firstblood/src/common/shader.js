
/**
 * Created by fable on 15/11/09.
 * @Author fable
 * @desc   shader 相关处理
 *
 * 
**/

var Shader = 
{
  MVP_VERTEX_SHADER:
    "attribute vec4 a_position; \n"
    + "attribute vec2 a_texCoord; \n"
    + "attribute vec4 a_color; \n"
    //+ "varying mediump vec2 v_texCoord; \n"
    //+ "#ifdef GL_ES \n"
    + "varying mediump vec4 v_fragmentColor; \n"
    + "varying mediump vec2 v_texCoord; \n"
    //+ "#else \n "
    //+ "varying vec4 v_fragmentColor; \n"
    //+ "varying vec2 v_texCoord; \n"
    //+ "#endif \n"
    + "void main() \n"
    + "{ \n"
    //+ " gl_Position = (CC_PMatrix) * a_position;  \n"  //?????, spine只能用CC_MVPMatrix, NO CC_PMatrix, 不能坐标会偏移，不知html5会不会
    + " gl_Position = (CC_PMatrix * CC_MVMatrix) * a_position;  \n"
    + " v_texCoord = a_texCoord; \n"
    + " v_fragmentColor = a_color; \n"
    + "}",


  NOMVP_VERTEX_SHADER:
    "attribute vec4 a_position; \n"
    + "attribute vec2 a_texCoord; \n"
    + "attribute vec4 a_color; \n"
    //+ "varying mediump vec2 v_texCoord; \n"
    //+ "#ifdef GL_ES \n"
    + "varying mediump vec4 v_fragmentColor; \n"
    + "varying mediump vec2 v_texCoord; \n"
    //+ "#else \n "
    //+ "varying vec4 v_fragmentColor; \n"
    //+ "varying vec2 v_texCoord; \n"
    //+ "#endif \n"
    + "void main() \n"
    + "{ \n"
    + " gl_Position = (CC_PMatrix) * a_position;  \n"  //?????, sprite等只能用CC_PMatrix, NO CC_MVPMatrix, 不能坐标会偏移，不知html5会不会
    //+ " gl_Position = (CC_PMatrix * CC_MVMatrix) * a_position;  \n"
    + " v_texCoord = a_texCoord; \n"
    + "	v_fragmentColor = a_color; \n"
    + "}",

  GRAY_SCALE_FRAGMENT_SHADER:
    "varying vec2 v_texCoord;   \n"
    //+ "uniform sampler2D CC_Texture0; \n"   //cocos2d 3.0jsb 3.1jsb/html5开始自动加入这个属性，不需要手工声明
    + "void main() \n"
    + "{  \n"
    + "	vec4 texColor = texture2D(CC_Texture0, v_texCoord);  \n"
    + "	float gray = texColor.r * 0.299 + texColor.g * 0.587 + texColor.b * 0.114; \n"
    + "	gl_FragColor = vec4(gray,gray,gray,texColor.a);  \n"
    + "}",

  SEPIA_FRAGMENT_SHADER:
    "varying vec2 v_texCoord;   \n"
    //+ "uniform sampler2D CC_Texture0; \n"
    + "uniform float u_degree; \n"
    //+ "uniform float u_xxxxxx; \n"
    + "void main() \n"
    + "{  \n"
    + "	vec4 texColor = texture2D(CC_Texture0, v_texCoord);  \n"
    + " float r = texColor.r * 0.393 + texColor.g * 0.769 + texColor.b * 0.189; \n"
    + "	float g = texColor.r * 0.349 + texColor.g * 0.686 + texColor.b * 0.168; \n"
    + "	float b = texColor.r * 0.272 + texColor.g * 0.534 + texColor.b * 0.131; \n"
    + " gl_FragColor = mix(texColor, vec4(r, g, b, texColor.a), float(u_degree));  \n"
    //+ "	gl_FragColor = vec4(u_xxxxxx, 0, 0, texColor.a);  \n"
    + "}",

  OUTLINE_FRAGMENT_SHADER:
    "varying vec2 v_texCoord;  \n"
    + "varying vec4 v_fragmentColor;  \n"
    + "uniform vec3 u_outlineColor;  \n"
    + "uniform float u_threshold;  \n"
    + "uniform float u_radius;  \n"
    + "void main()  \n"
    + "{  \n"
    + "    float radius = u_radius;  \n"
    + "    vec4 accum = vec4(0.0);  \n"
    + "    vec4 normal = vec4(0.0);  \n"
    + "    normal = texture2D(CC_Texture0, vec2(v_texCoord.x, v_texCoord.y));   \n"
    + "    accum += texture2D(CC_Texture0, vec2(v_texCoord.x - radius, v_texCoord.y - radius));  \n"
    + "    accum += texture2D(CC_Texture0, vec2(v_texCoord.x + radius, v_texCoord.y - radius));  \n"
    + "    accum += texture2D(CC_Texture0, vec2(v_texCoord.x + radius, v_texCoord.y + radius));  \n"
    + "    accum += texture2D(CC_Texture0, vec2(v_texCoord.x - radius, v_texCoord.y + radius));  \n"
    + "    accum *= u_threshold;  \n"
    + "    accum.rgb = u_outlineColor * accum.a;  \n"
    + "    normal = ( accum * (1.0 - normal.a)) + (normal * normal.a);  \n"
    + "    gl_FragColor = v_fragmentColor * normal;  \n"
    //+ "    gl_FragColor = vec4(0.2,0.2,0.2,1);  \n"
    + "} ",

  BLUR_FRAGMENT_SHADER:
    "#ifdef GL_ES  \n"
    + "precision mediump float;  \n"
    + "#endif  \n"
    + "varying vec4 v_fragmentColor;  \n"
    + "varying vec2 v_texCoord;  \n"
    + "uniform vec2 blurSize;  \n"
    + "uniform vec4 substract;  \n"
    + "void main() {  \n"
    + " vec4 sum = vec4(0.0);  \n"
    + " sum += texture2D(CC_Texture0, v_texCoord - 4.0 * blurSize) * 0.05;  \n"
    + " sum += texture2D(CC_Texture0, v_texCoord - 3.0 * blurSize) * 0.09;  \n"
    + " sum += texture2D(CC_Texture0, v_texCoord - 2.0 * blurSize) * 0.12;  \n"
    + " sum += texture2D(CC_Texture0, v_texCoord - 1.0 * blurSize) * 0.15;  \n"
    + " sum += texture2D(CC_Texture0, v_texCoord                 ) * 0.16;  \n"
    + " sum += texture2D(CC_Texture0, v_texCoord + 1.0 * blurSize) * 0.15;  \n"
    + " sum += texture2D(CC_Texture0, v_texCoord + 2.0 * blurSize) * 0.12;  \n"
    + " sum += texture2D(CC_Texture0, v_texCoord + 3.0 * blurSize) * 0.09;  \n"
    + " sum += texture2D(CC_Texture0, v_texCoord + 4.0 * blurSize) * 0.05;  \n"
    + " gl_FragColor = (sum - substract) * v_fragmentColor;  \n"
    + "}  ",
  BLUR_EX_FRAGMENT_SHADER:
    "#ifdef GL_ES  \n"
    + "precision mediump float;  \n"
    + "#endif  \n"
    + "varying vec4 v_fragmentColor;  \n"
    + "varying vec2 v_texCoord;  \n"
    + "uniform vec2 resolution;  \n"
    + "uniform float blurRadius;  \n"
    + "uniform float sampleNum;  \n"
    + "vec4 blur(vec2);  \n"
    + "void main(void)  \n"
    + "{  \n"
    + "    vec4 col = blur(v_texCoord); //* v_fragmentColor.rgb;  \n"
    + "    gl_FragColor = vec4(col) * v_fragmentColor;  \n"
    + "}  \n"
    + "vec4 blur(vec2 p)  \n"
    + "{  \n"
    + "    if (blurRadius > 0.0 && sampleNum > 1.0)  \n"
    + "    {  \n"
    + "        vec4 col = vec4(0);  \n"
    + "        vec2 unit = 1.0 / resolution.xy;          \n"
    + "        float r = blurRadius;  \n"
    + "        float sampleStep = r / sampleNum;    \n"
    + "        float count = 0.0;         \n"
    + "        for(float x = -r; x < r; x += sampleStep)  \n"
    + "        {  \n"
    + "            for(float y = -r; y < r; y += sampleStep)  \n"
    + "            {  \n"
    + "                float weight = (r - abs(x)) * (r - abs(y));  \n"
    + "                col += texture2D(CC_Texture0, p + vec2(x * unit.x, y * unit.y)) * weight;  \n"
    + "                count += weight;  \n"
    + "            }  \n"
    + "        }          \n"
    + "        return col / count;  \n"
    + "    }   \n"
    + "    return texture2D(CC_Texture0, p);  \n"
    + "}  ",

  programs:{},

    //????,重置shader特效
  reset:function(sprite){
      var program = cc.shaderCache.getProgram(cc.SHADER_POSITION_TEXTURECOLOR);
      program.use();
      sprite.shaderProgram = program;  
  },

  /**
   * 灰度
   * @param sprite
   */
  grayScale: function (sprite) {
    sprite
    var program = Shader.programs["grayScale"];
    if(!program && 'opengl' in cc.sys.capabilities){
      if(cc.sys.isNative){
          program = new cc.GLProgram();
          program.retain();     //jsb需要retain一下，否则会被回收了          
          program.initWithString(Shader.NOMVP_VERTEX_SHADER, Shader.GRAY_SCALE_FRAGMENT_SHADER);          
          program.link();
          program.updateUniforms();
      }
      else{
          program = new cc.GLProgram();
          program.retain();     //jsb需要retain一下，否则会被回收了            
          program.initWithString(Shader.NOMVP_VERTEX_SHADER, Shader.GRAY_SCALE_FRAGMENT_SHADER);             
          program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
          program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
          program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

          program.link();
          program.updateUniforms();
          program.use();    
      }
      Shader.programs["grayScale"] = program;
    }

    if(cc.sys.isNative){
        var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
        sprite.setGLProgramState(glProgram_state);
    }
    else{
        sprite.shaderProgram = program;
    } 
  },


  /**
   * 造旧
   * @param sprite
   * @param degree 旧的程度 0~1
   */
  sepia: function (sprite, degree) {
    var program = Shader.programs["sepia"+degree];
    if(!program &&  'opengl' in cc.sys.capabilities ){
      if(cc.sys.isNative){
          program = new cc.GLProgram();
          program.retain();     //jsb需要retain一下，否则会被回收了          
          program.initWithString(Shader.NOMVP_VERTEX_SHADER, Shader.SEPIA_FRAGMENT_SHADER);          
          program.link();
          program.updateUniforms();
      }
      else{
          program = new cc.GLProgram();
          program.retain();     //jsb需要retain一下，否则会被回收了            
          program.initWithString(Shader.NOMVP_VERTEX_SHADER, Shader.SEPIA_FRAGMENT_SHADER);             
          program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
          program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
          program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

          program.link();
          program.updateUniforms();
          program.use();
          program.setUniformLocationWith1f(program.getUniformLocationForName('u_degree'), degree);
      }

      if(cc.sys.isNative){
          var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
          // glProgram_state.setUniformFloat("u_threshold", 1.75);
          // glProgram_state.setUniformVec3("u_outlineColor", {x: 0/255, y: 255/255, z: 0/255});
          glProgram_state.setUniformFloat("u_degree", degree);
          sprite.setGLProgramState(glProgram_state);
      }
      else{
          this.sprite.shaderProgram = program;
      }
 
      Shader.programs["sepia"+degree] = program;
    }
    // sprite.scheduleUpdate();
    // sprite.update=function(dt) {
    //     if( 'opengl' in cc.sys.capabilities ) {
    //         if(cc.sys.isNative){
    //             sprite.getGLProgramState().setUniformFloat("u_radius", Math.abs(this.sprite.getRotation() / 500));
    //         }else{
    //             program.use();
    //             program.setUniformLocationWith1f(program.getUniformLocationForName('u_radius'), Math.abs(this.sprite.getRotation() / 500));
    //             program.updateUniforms();
    //         }
    //     }
    // }
  },

  /**
   * outline
   * @param sprite
   */
  outline: function (sprite) {
    var program = Shader.programs["outline"];
    if(!program &&  'opengl' in cc.sys.capabilities ){
      if(cc.sys.isNative){
          program = new cc.GLProgram();
          program.retain();     //jsb需要retain一下，否则会被回收了          
          program.initWithString(Shader.MVP_VERTEX_SHADER, Shader.OUTLINE_FRAGMENT_SHADER);          
          program.link();
          program.updateUniforms();
      }
      else{
          program = new cc.GLProgram();
          program.retain();     //jsb需要retain一下，否则会被回收了            
          program.initWithString(Shader.MVP_VERTEX_SHADER, Shader.OUTLINE_FRAGMENT_SHADER);             
          program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
          program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
          program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

          program.link();
          program.updateUniforms();
          program.use();
          program.setUniformLocationWith1f(program.getUniformLocationForName('u_threshold'), 1.75);
          program.setUniformLocationWith1f(program.getUniformLocationForName('u_radius'), 10/500);
          program.setUniformLocationWith3f(program.getUniformLocationForName('u_outlineColor'), 0 / 255, 255 / 255, 0 / 255);  
      }
      Shader.programs["outline"] = program;
    }

    if(cc.sys.isNative){
        var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
        glProgram_state.setUniformFloat("u_threshold", 1.75);
        glProgram_state.setUniformFloat("u_radius",    10/500);
        glProgram_state.setUniformVec3("u_outlineColor", {x: 0/255, y: 255/255, z: 0/255});
        sprite.setGLProgramState(glProgram_state);
    }
    else{
        this.sprite.shaderProgram = program;
    }  
  },

  /*
   * 模糊效果
   * @param sprite
   */
  blur: function (sprite, blurSize, substract) {
    var program = Shader.programs["blur"];
    if(!program &&  'opengl' in cc.sys.capabilities ){
      if(cc.sys.isNative){
          program = new cc.GLProgram();
          program.retain();     //jsb需要retain一下，否则会被回收了          
          program.initWithString(Shader.MVP_VERTEX_SHADER, Shader.BLUR_FRAGMENT_SHADER);          
          program.link();
          program.updateUniforms();
      }
      else{
          program = new cc.GLProgram();
          program.retain();     //jsb需要retain一下，否则会被回收了            
          program.initWithString(Shader.MVP_VERTEX_SHADER, Shader.BLUR_FRAGMENT_SHADER);             
          program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
          program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
          program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

          program.link();
          program.updateUniforms();
          program.use();
          program.setUniformLocationWith2f(program.getUniformLocationForName('blurSize'), blurSize.x, blurSize.y);
          program.setUniformLocationWith4f(program.getUniformLocationForName('substract'), substract.x, substract.y, substract.z, substract.w);  
      }
      Shader.programs["blur"] = program;
    }

    if(cc.sys.isNative){
        var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
        glProgram_state.setUniformVec2("blurSize",  blurSize);
        glProgram_state.setUniformVec4("substract", substract);
        sprite.setGLProgramState(glProgram_state);
    }
    else{
        this.sprite.shaderProgram = program;
    }  
  },


  /*
   * 模糊效果
   * @param sprite
   * @param blurRadius 0-1
   * @param sprite     0-7
   * @param resolution     {x:100, y:100}
   */
  blur_ex: function (sprite, blurRadius, sampleNum, resolution) {
    var program = Shader.programs["blur_ex"];
    if(!program &&  'opengl' in cc.sys.capabilities ){
      if(cc.sys.isNative){
          program = new cc.GLProgram();
          program.retain();     //jsb需要retain一下，否则会被回收了          
          program.initWithString(Shader.MVP_VERTEX_SHADER, Shader.BLUR_EX_FRAGMENT_SHADER);          
          program.link();
          program.updateUniforms();
      }
      else{
          program = new cc.GLProgram();
          program.retain();     //jsb需要retain一下，否则会被回收了            
          program.initWithString(Shader.MVP_VERTEX_SHADER, Shader.BLUR_EX_FRAGMENT_SHADER);             
          program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
          program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
          program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

          program.link();
          program.updateUniforms();
          program.use();
          program.setUniformLocationWith2f(program.getUniformLocationForName('resolution'), resolution.x, resolution.y);
          program.setUniformLocationWith1f(program.getUniformLocationForName('blurRadius'), blurRadius);
          program.setUniformLocationWith1f(program.getUniformLocationForName('sampleNum'), sampleNum);  
      }
      Shader.programs["blur_ex"] = program;
    }

    if(cc.sys.isNative){
        var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
        glProgram_state.setUniformVec2("resolution",  resolution);
        glProgram_state.setUniformFloat("blurRadius", blurRadius);
        glProgram_state.setUniformFloat("sampleNum", sampleNum);
        sprite.setGLProgramState(glProgram_state);
    }
    else{
        this.sprite.shaderProgram = program;
    }  
  }  




};