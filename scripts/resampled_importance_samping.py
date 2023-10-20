import math
import random
import scipy.integrate as integrate

class CDF:
    def __init__(self):
        self.items = []
        self.cdf = []
        self.weight = 0.0

    def insert(self, item, weight):
        self.weight = self.weight + weight
        self.items.append(item)
        self.cdf.append(self.weight)

    def normalize(self):
        for i in range(len(self.items)):
            self.cdf[i] = self.cdf[i] / self.weight

    def sample(self):
        x = random.uniform(0.0, 1.0)
        for i in range(len(self.items)):
            if x <= self.cdf[i]:
                return (self.items[i], self.cdf[i])

def FunctionToIntegrate(x):
    return math.sin(x) * math.cos(x) * x * x

def TargetFunction(x):
    return math.sin(x)

def ris(N, M):
    res = 0
    for s in range(N):
        cdf = CDF()
        for i in range(0, M):
            pi = 1.0 # uniform rng
            xi = random.uniform(0.0, 1.0)
            mi = 1.0 / M
            Wi = 1.0 / pi
            wi = mi * TargetFunction(xi) * Wi
            cdf.insert(xi, wi)

        cdf.normalize()
        sample = cdf.sample()
        ucw = cdf.weight / TargetFunction(sample[0])
        
        res += (ucw * FunctionToIntegrate(xi) * (1.0 / N)) 
    return res

def naive(N):
    res = 0
    weight = 1.0 / N
    for i in range(N):
        xi = random.uniform(0.0, 1.0)
        res += (weight * FunctionToIntegrate(xi))
    return res

def testCDF():
    cdf = CDF()
    cdf.insert(0.0, 0.9)
    cdf.insert(0.5, 0.05)
    cdf.insert(1.0, 0.05)
    cdf.normalize()

    timer = 0
    for i in range(10000):
        sample = cdf.sample()[0]
        if (sample > 0.4 and sample < 0.6):
            timer += 1
    print(timer)

# referrence = integrate.quad(lambda x: FunctionToIntegrate(x), 0, 1.0)[0]
# print(referrence)

# print(naive(100000))

# print(ris(1000, 32))