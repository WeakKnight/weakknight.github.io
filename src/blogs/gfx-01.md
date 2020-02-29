## Graphics Library Abstraction Layer Devlog 1
### 2020-2-28

As I recently said, I need migrate to Vulkan eco-system. The most substancial step is to build a graphics abstraction layer. There are many popular api-agnostic library we can choose, such as bgfx, sokol, why I still need to develop my own one. It is mainly because my goal is to build up a hybrid renderer(ray tracing and rasteraztion). Ray tracing Api is still in an early stage, as a consquent, all these popular libraries still don't support ray tracing features. So why not just use raw vulkan api call? It is not a bad idea, however it is quite verbose for me. I want to make an abstraction which try to hide many complex detail so that I can focus on algorithm aspect. It needn't to be the best practice, just need to be uasble for ray tracing work.

After several days hard working, I finished a triangle example. Inspired by sokol-gfx, I currently imlemented several basic resource concepts.

#### Pipeline
<code>
struct Pipeline
{
    uint32_t id = 0;
};
</code>

#### Shader

#### Renderpass