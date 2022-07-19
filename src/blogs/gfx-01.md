## Graphics Library Abstraction Layer Devlog 1
### 2020-2-28

As I recently said, I need migrate to Vulkan eco-system. The most substancial step is to build a graphics abstraction layer. There are many popular api-agnostic library we can choose, such as bgfx, sokol, why I still need to develop my own one. It is mainly because my goal is to build up a hybrid renderer(ray tracing and rasteraztion). Ray tracing Api is still in an early stage, as a consquent, all these popular libraries still don't support ray tracing features. So why not just use raw vulkan api call? It is not a bad idea, however it is quite verbose for me. I want to make an abstraction which try to hide many complex detail so that I can focus on algorithm aspect. It needn't to be the best practice, just need to be uasble for ray tracing work.

After several days hard working, I finished a triangle example. Inspired by sokol-gfx, I currently imlemented basic lifecycles and several resource concepts.

### Resources
```cpp
struct Pipeline
{
    uint32_t id = 0;
};
```

it is just a id wrapper. Actual vulkan objects are handled in object pool. Same for other resource types.

```cpp
static HandlePool&lt;PipelineResource&gt; s_pipelineHandlePool = HandlePool&lt;PipelineResource&gt;(200);
static HandlePool&lt;ShaderResource&gt; s_shaderHandlePool = HandlePool&lt;ShaderResource&gt;(200);
static HandlePool&lt;RenderPassResource&gt; s_renderPassHandlePool = HandlePool&lt;RenderPassResource&gt;(200);
```

Every pool has a preset capacity but can grow.

### Api Style

The first principle is the ease of use, so I try to make the API as easy as possible. For a triangle example, it only takes dozens of lines code.

#### Initializition

```cpp
GFX::InitialDescription initDesc = {};
initDesc.debugMode = true;
initDesc.window = m_window;

GFX::Init(initDesc);
```

#### Resource Creation

```cpp
GFX::ShaderDescription vertDesc = {};
vertDesc.name = "default";
vertDesc.codes = StringUtils::ReadFile("default.vert");
vertDesc.stage = GFX::ShaderStage::Vertex;

GFX::ShaderDescription fragDesc = {};
fragDesc.name = "default";
fragDesc.codes = StringUtils::ReadFile("default.frag");
fragDesc.stage = GFX::ShaderStage::Fragment;

vertShader = GFX::CreateShader(vertDesc);
fragShader = GFX::CreateShader(fragDesc);

GFX::GraphicsPipelineDescription pipelineDesc = {};
pipelineDesc.primitiveTopology = GFX::PrimitiveTopology::TriangleList;
pipelineDesc.shaders.push_back(vertShader);
pipelineDesc.shaders.push_back(fragShader);
pipeline = GFX::CreatePipeline(pipelineDesc);
```

#### Render Loop

```cpp
GFX::BeginFrame();
		
GFX::BeginDefaultRenderPass();

GFX::SetViewport(0, 0, WIDTH, HEIGHT);
GFX::ApplyPipeline(pipeline);
GFX::Draw(3, 1, 0, 0);

GFX::EndRenderPass();

GFX::EndFrame();
```

#### Terminate

```cpp
GFX::DestroyPipeline(pipeline);

GFX::DestroyShader(vertShader);
GFX::DestroyShader(fragShader);

GFX::Shutdown();
```

### Final Result

<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/1/triangles.jpg" width="80%" alt="Final Result"/>
