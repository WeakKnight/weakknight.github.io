var c=Object.defineProperty;var d=(s,e,t)=>e in s?c(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var a=(s,e,t)=>d(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();const u=` // data structure to store output of vertex function\r
struct VertexOut \r
{\r
    @builtin(position) pos: vec4f,\r
    @location(0) texCoord: vec2f\r
};\r
\r
// process the points of the triangle\r
@vertex \r
fn vs(@builtin(vertex_index) vertexIndex : u32) -> VertexOut \r
{\r
    let pos = array(\r
        vec2f(-1, 1),  // top left\r
        vec2f(-1, -1),  // bottom left\r
        vec2f(1, -1), // bottom right\r
        vec2f(1, -1),\r
        vec2f(1, 1),\r
        vec2f(-1, 1)   \r
    );\r
\r
    let texCoord = array(\r
        vec2f(0.0, .0),\r
        vec2f( .0, 1.),\r
        vec2f( 1.0, 1.0),\r
        vec2f(1.0, 1.0),\r
        vec2f( 1.0, 0.),\r
        vec2f( 0.0, .0)\r
    );\r
\r
    var out: VertexOut;\r
    out.pos = vec4f(pos[vertexIndex], 0.0, 1.0);\r
    out.texCoord = texCoord[vertexIndex];\r
\r
    return out;\r
}`,l=`struct VertexOut \r
{\r
    @builtin(position) pos: vec4f,\r
    @location(0) texCoord: vec2f\r
};\r
\r
@group(0) @binding(0) var _sampler: sampler;\r
@group(0) @binding(1) var _texture: texture_2d<f32>;\r
\r
@fragment \r
fn fs(in: VertexOut) -> @location(0) vec4f \r
{\r
    return textureSample(_texture, _sampler, in.texCoord);\r
}`;class h{constructor(e){a(this,"device");a(this,"context");a(this,"presentationFormat");a(this,"vertexShader");a(this,"fragmentShader");a(this,"pipeline");a(this,"renderPassDescriptor");a(this,"texture");a(this,"linearSampler");a(this,"bindGroup");a(this,"frameIndex");this.canvas=e,this.frameIndex=0}async init(){await this.getGPUDevice(),this.setupCanvasResizing(),this.configCanvas(),this.loadShaders(),this.configurePipeline();{const e=await fetch("https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/image.png"),t=await createImageBitmap(await e.blob());this.texture=this.device.createTexture({size:[t.width,t.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),this.device.queue.copyExternalImageToTexture({source:t},{texture:this.texture},[t.width,t.height]),this.linearSampler=this.device.createSampler({magFilter:"linear",minFilter:"linear"}),this.bindGroup=this.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:this.linearSampler},{binding:1,resource:this.texture.createView()}]})}this.configureRenderPassDescriptor(),this.startAnimation(60,this)}setupCanvasResizing(){function e(t){t.canvas.width=Math.max(1,Math.min(document.body.clientWidth,t.device.limits.maxTextureDimension2D)),t.canvas.height=Math.max(1,Math.min(document.body.clientHeight,t.device.limits.maxTextureDimension2D))}window.addEventListener("resize",()=>e(this)),e(this)}startAnimation(e,t){let i;const r=Math.round(1e3/e);t.render(),requestAnimationFrame(n);function n(o){i===void 0&&(i=o),o-i>=r&&(i=void 0,t.render()),requestAnimationFrame(n)}}render(){this.frameIndex++,this.renderPassDescriptor.colorAttachments[0].view=this.context.getCurrentTexture().createView();const e=this.device.createCommandEncoder({label:"render encoder"}),t=e.beginRenderPass(this.renderPassDescriptor);t.setPipeline(this.pipeline),t.setBindGroup(0,this.bindGroup);for(let i=0;i<16;i++)t.setViewport((i*128+10*this.frameIndex)%this.canvas.width,i*128,128,128,0,1),t.draw(6);t.end(),this.device.queue.submit([e.finish()])}async getGPUDevice(){var i;var e=await((i=navigator.gpu)==null?void 0:i.requestAdapter());const t=await(e==null?void 0:e.requestDevice());if(!t){this.fail("Browser does not support WebGPU");return}this.device=t}fail(e){document.body.innerHTML=`<H1>${e}</H1>`}configCanvas(){var e=this.canvas.getContext("webgpu");if(!e){this.fail("Failed to get canvas context");return}this.context=e,this.presentationFormat=navigator.gpu.getPreferredCanvasFormat(),e.configure({device:this.device,format:this.presentationFormat})}loadShaders(){this.loadVertexShader(),this.loadFragmentShader()}configurePipeline(){this.pipeline=this.device.createRenderPipeline({label:"Render Pipeline",layout:"auto",vertex:{module:this.vertexShader},fragment:{module:this.fragmentShader,targets:[{format:this.presentationFormat}]}})}configureRenderPassDescriptor(){this.renderPassDescriptor={label:"Render Pass Description",colorAttachments:[{clearValue:[0,0,0,1],loadOp:"clear",storeOp:"store",view:this.context.getCurrentTexture().createView()}]}}loadVertexShader(){this.vertexShader=this.device.createShaderModule({label:"Vertex Shader",code:u})}loadFragmentShader(){this.fragmentShader=this.device.createShaderModule({label:"Fragment Shader",code:l})}}const f=document.getElementById("GLCanvas"),p=new h(f);p.init();
