import math
import random

def FunctionToIntegrate(x):
    return math.sin(x) * math.cos(x) * x * x

def TargetFunction(x):
    return math.sin(x)

def ris():
    M = 5
    W = 1.0
    m = 1.0 / M
    for i in range(0, 5):
        xi = random.uniform(0.0, 1.0)
        print(xi)

ris()
