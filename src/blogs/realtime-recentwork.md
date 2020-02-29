## My Recent Work On Realtime Rendering
### 2020-2-25

Recently, I spent lots of time developing a realtime renderer, which currently supports deferred rendering, screen-space reflection, post-processing, and is heavily data-driven. Below are some screenshots:

<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/0/image0.png" width="80%" alt="Editor Overview"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/0/image2.png" width="80%" alt="Deferred-Final Result"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/0/image1.png" width="80%" alt="Deferred-Normal Pass"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/0/image3.png" width="80%" alt="Deferred-Position Pass"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/0/image4.png" width="80%" alt="Deferred-Screen Space Reflection Pass"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/0/image5.png" width="80%" alt="Deferred-Roughness Pass"/>

Looks kind of OK, but I am not very satisfied with current work. The main reason is it is limited in OpenGL Context, which means it is tough to be combined with hardware ray tracing pipeline(but it is still possible, we have Vulkan OpenGL interop support). I am in a dilemma, continuing developing much other fancy stuff like other screen space solution(SSGI, SS Shadow), or aggressively embracing next-gen hardware-accelerated ray tracing pipeline, which may lead me to be stuck in overwhelmingly verbose API. The rational part in my head told me should be more conservative. However, I was persuaded again by the emotional and passional part in my head, to challenge my self in the wildest extent. So my new goal becomes migrating to Vulkan ecosystem. This can be divided into several steps:

#### Step 1 Build A Basic But Highly Usable Vulkan Abstraction Layer

Via this abstraction layer, I should be able to easily control memory allocation, uniform creation and binding, render pass management, pipeline creation. This step is for getting away from the verbose API.

#### Step 2 Build A usable enough, data driven material system based on the abstraction layer

It was aimed at easy and fast iteration.

#### Step 2 Scene Hierachy

Necessary Things

#### Step 2 Model Abstraction

Relavant Thing With Materials And Scene Hierachy

#### Step 3 Camera And Basic Diferred Rendering Pipeline

Necessary Things

Step 1 turns out to be most possibly the substantial part. I will be into this work for several weeks, with many demos to test abstraction usability. 







