## Error Estimation In Monte Carlo Methods

---
### Average Squared Error
$$
\tag{1.1} 
\frac{\sigma^2}{n}
$$

It is often difficult to precisely evaluate $\sigma$, so we need to estimate it from the sample values. The most popular used estimates of $\sigma$ are

$$
\tag{1.2}
s^2 = \frac{1}{n - 1}\sum_{n=1}^{n}(Y_i - \hat{\mu_n})^2
$$

$$
\tag{1.3}
\hat{\sigma}^2 = \frac{1}{n}\sum_{n=1}^{n}(Y_i - \hat{\mu_n})^2
$$

---
### Standard Normal Distribution

The standard normal distribution is the normal distribution with mean 0 and variance 1, which has the following probability density function

$$
\tag{1.4}
\varphi(t) = \frac{e^{-\frac{1}{2}t^2}}{\sqrt{2\pi}}, ~~~~for~~-\infty < x < \infty
$$

<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/mc/standard_normal_distribution_pdf.png" width="45%"/>

The cumulative distribution function is 

$$
\tag{1.5}
\Phi(x) = \int_{-\infty}^{x} \varphi(t) dt
$$

<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/mc/standard_normal_distribution_cdf.png" width="45%"/>