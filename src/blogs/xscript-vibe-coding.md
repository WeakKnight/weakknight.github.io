## XScript: A One-Night Vibe Coding Surprise
### 2026-01-15

Recently I did a little vibe coding experiment and ended up with something I honestly did not expect: **XScript**, a GPU-native scripting language built around ECS and a GPU VM.

**Repo:** https://github.com/WeakKnight/xscript

I have been thinking about how game logic could live closer to the GPU for a long time, but I always assumed it would be a heavy, multi-week prototype. Instead, vibe coding made it feel *lightweight and fluid*. I focused on the *idea* first, and the structure appeared almost naturally:

- **ECS-first design**: entities are tables, components are keys, systems are dispatches.
- **SIMT execution**: one GPU thread per entity, all processed in parallel.
- **GPU VM**: a stack-based bytecode interpreter running in compute shaders.
- **GPU spawning**: entities can spawn new entities without a CPU round-trip.

The pleasant surprise is not only that it works, but that the mental model feels clean and consistent. ECS maps to GPU execution in a very direct way, and the VM keeps it flexible even with dynamic typing and runtime behavior.

Some of the highlights I pulled straight from the project notes:

- **10,000 entities, one dispatch**: the SIMT/ECS mapping makes the execution model obvious and scalable.
- **GPU-side filtering**: component checks are performed on the GPU.
- **Bytecode VM**: ~40 opcodes with Lua-like semantics and a 32-bit tagged `XValue`.
- **Slang/HLSL runtime**: the VM runs as compute shaders, with per-thread VM state and shared heaps.
- **Same bytecode on CPU or GPU**: no special-case authoring for different backends.

Here is a minimal example that shows the programming model:

```python
import xscript as xs

ctx = xs.Context(device="cuda")

# Compile system
systems = ctx.compile('''
    func movement(entity, dt) {
        entity.position.x += entity.velocity.x * dt;
        entity.position.y += entity.velocity.y * dt;
    }
''')

# Spawn 10,000 entities
for i in range(10000):
    ctx.spawn({"position": {"x": i, "y": 0}, "velocity": {"x": 1, "y": 0.5}})

# Execute on ALL in parallel
ctx.dispatch(systems, "movement", ctx.filter("position", "velocity"), dt=0.016)
```

This snippet captures the ECS mapping in a few lines. Each entity is a table with `position` and `velocity` components. The `movement` function is compiled into a GPU system, and `dispatch` runs it across every entity that matches the filter. That is the whole vibe: author once, run everywhere in parallel.

This is a **concept proof**, not a performance study. I did not optimize or benchmark it, and it intentionally ignores real-world performance trade-offs. The goal was simply to see whether the idea could be made concrete in a single night.

Still, the *speed* and *clarity* I felt while building it in a single night is exactly the kind of energy I want more of. Vibe coding is not a shortcut for me; it is a way to unlock momentum and turn a big conceptual idea into a working prototype before doubt kicks in. If you are curious, check the repo and let me know what you think.
