## Monte Carlo Notes 1

### Simple Monte Carlo

Simply, we can express a quantity by the expected value of a random variable $Y$, such as $\mu = \mathbb{E}(Y)$. Then we can generate values $Y_1,...,Y_n$ independently and randomly from the distribution of $Y$ and take their average as our estimate of $\mu$.

$$
\hat{\mu}_n = \frac{1}{n}\sum_{n=1}^{n} Y_i 
$$ (1.1)

---

### Strong law of large numbers

> $\mathbb{P}(\lim_{n\to\infty} |\hat{\mu}_n-\mu| = 0) = 1$ (1.2)

While strong law tell us that Monte Carlo will eventually produce an error as small as we like, it does not tell us how large n has to be for this to happen. It also does not say for a given sample $Y_1, ..., Y_n$ whether the error is likely to be small.

---

### Unbiased Estimator

> $\tag{1.3} \mathbb{E}(\hat{\mu}_n) = \mu$ 

---

### Variance

Suppose that $Var(Y) = \sigma^2 < \infty$, the variance of $\hat{\mu}_n$ is

> $\tag{1.4} \mathbb{E}((\hat{\mu}_n - \mu)^2) = \frac{\sigma^2}{n}$

---

### Root Mean Squared Error(RMSE)

> $\tag{1.5} RMSE = \sqrt{\mathbb{E}((\hat{\mu}_n - \mu)^2)} = O(n^{-\frac{1}{2}})$

$equation 1.5$ illustrates that to get one more digit of accuracy, we need pay 99 times more samples.

---

### In Comparison With Simpson's Rule

For simpson's rule with d dimensions,

$$
{RMSE}_{simpson} = O(n^{-\frac{4}{d}})
$$