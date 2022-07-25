## Monte Carlo Notes 1

### Simple Monte Carlo
Simply, we can express a quantity by the expected value of a random variable $Y$, such as $\mu = \mathbb{E}(Y)$. Then we can generate values $Y_1,...,Y_n$ independently and randomly from the distribution of $Y$ and take their average as our estimate of $\mu$.
>$\hat{\mu}_n = \frac{1}{n}\sum_{n=1}^{n} Y_i$

### Strong law of large numbers
> $\mathbb{P}(\lim_{n\to\infty} |\hat{\mu}_n-\mu| = 0) = 1$