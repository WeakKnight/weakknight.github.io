## Accuracy of simple Monte Carlo

### Simple Monte Carlo

$$
\tag{1.1} 
\hat{\mu}_n = \frac{1}{n}\sum_{n=1}^{n} Y_i
$$

Simply, we can express a quantity by the expected value of a random variable $Y$, such as $\mu = \mathbb{E}(Y)$. Then we can generate values $Y_1,...,Y_n$ independently and randomly from the distribution of $Y$ and take their average as our estimate of $\mu$.

---

### Strong law of large numbers

$$
\tag{1.2}
\mathbb{P}(\lim_{n\to\infty} |\hat{\mu}_n-\mu| = 0) = 1
$$

While strong law tell us that Monte Carlo will eventually produce an error as small as we like, it does not tell us how large n has to be for this to happen. It also does not say for a given sample $Y_1, ..., Y_n$ whether the error is likely to be small.

---

### Unbiased Estimator

$$
\tag{1.3}
\mathbb{E}(\hat{\mu}_n) = \mu
$$

---

### Variance

Suppose that $Var(Y) = \sigma^2 < \infty$, the variance of $\hat{\mu}_n$ is

$$
\tag{1.4}
\mathbb{E}((\hat{\mu}_n - \mu)^2) = \frac{\sigma^2}{n}
$$

---

### Root Mean Squared Error(RMSE)

$$
\tag{1.5}
RMSE = \sqrt{\mathbb{E}((\hat{\mu}_n - \mu)^2)} = O(n^{-\frac{1}{2}})
$$

$eq~1.5$ illustrates that to get one more digit of accuracy, we need pay 99 times more samples.

---

### In Comparison With Simpson's Rule

$$
\tag{1.6}
{RMSE}_{Simpson} = O(n^{-\frac{4}{d}})
$$

Although Simpson's rule is characterized by an error rate of $O(n^{-4})$, its precision experiences a rapid degradation as the dimensions of the problem escalate. Consequently, Monte Carlo methods emerge as a more practical alternative for addressing problems exhibiting higher dimensions.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>