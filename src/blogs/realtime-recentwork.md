## My Recent Work On Realtime Rendering
### 2020-2-25

Recently, I spent lots of time on developing a realtime renderer, which currently supports deferred rendering, screen space reflection, post processing and is heavily data driven. Blow are some screen shots:
![alt](https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/0/image0.png =964x524 "Editor Overview") 
![alt](https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/0/image1.png "Deferred-Normal Pass") 
![alt](https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/0/image2.png "Deferred-Final Result") 
![alt](https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/0/image3.png "Deferred-Position Pass") 
![alt](https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/0/image4.png "Deferred-Screen Space Reflection Pass") 
![alt](https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/0/image5.png "Deferred-Roughness Pass") 

Looks kind of OK, but I am not very satisfied with current work. The main reason is it is limited in OpenGL Context, which means it is very hard to be combined with hardware ray tracing pipeline(but it is still possible, we have vulkan openGL interop support). I am in a dilemma, continuing developing many other fancy stuff like other screen space solution(SSGI ,SS Shadow), or agressively embracing next-gen hardware accelerated ray tracing pipeline, which may lead me to be stucked in overwhelmingly verbose api. The rational part in my head told me should be more conservative. However, I was persuaded again by the emotional and passional part in my head, to chanllenge my self in a wildest extent. So my recent goal becomes migrating to Vulkan ecosystem. This can be divided into several steps:

#### Step 1 Build A Basic But Highly Usable Vulkan Abstraction Layer

Via this abstaction layer, I should be able to easily control memory allocation, uniform creation and binding, render pass management, pipeline creation. This step is for getting away from verbose api.

#### Step 2 Build A usable enough, data driven material system based on the abstraction layer

It was aimed at easy and fast iteration.

#### Step 2 Scene Hierachy

Necessary Things

#### Step 2 Model Abstraction

Relavant Thing With Materials And Scene Hierachy

#### Step 3 Camera And Basic Diferred Rendering Pipeline

Necessary Things

It turns out Step 1 would be most possibly the heavy part. I will be into this work for several weeks, with many demos to test abstaction usability. 







