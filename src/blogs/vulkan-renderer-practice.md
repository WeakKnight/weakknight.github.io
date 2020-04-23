## Vulkan Practice For CS6610
### 2020-4-23

### Frame Dissecting

#### CSM Shadow Pass
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/csm0.jpg" width="400px" alt="ShadowMap0"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/csm1.jpg" width="400px" alt="ShadowMap1"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/csm2.jpg" width="400px" alt="ShadowMap2"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/csmsplitcolor.jpg" width="400px" alt="split color"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/csmresult.jpg" width="400px" alt="csm result"/>

#### G Buffer Pass
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/albedo.jpg" width="400px" alt="albedo"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/normal.jpg" width="400px" alt="normal"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/depth.jpg" width="400px" alt="depth"/>

#### Composite Pass
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/irradiancemap.jpg" width="400px" alt="irradiance"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/skybox.jpg" width="400px" alt="skybox"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/gather_result.jpg" width="400px" alt="csm result"/>

#### SSR Pass
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/ssr_albedo.jpg" width="400px" alt="csm result"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/ssr_result.jpg" width="400px" alt="csm result"/>

#### SSR Composite Pass
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/ssr_gather_result.jpg" width="400px" alt="csm result"/>

#### Post Processing Pass
##### Depth Of Field
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/ssr_final_no_dof.jpg" width="400px" alt="csm result"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/ssr_final_dof.jpg" width="400px" alt="csm result"/>

##### Dither
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/no_dither.png" width="800px" alt="csm result"/>
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/cs6610/dither.png" width="800px" alt="csm result"/>

##### FXAA, Tone Mapping, Gamma Correction and so on...
