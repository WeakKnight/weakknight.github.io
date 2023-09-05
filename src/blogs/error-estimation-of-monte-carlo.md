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

With a large $n$, we can assume that $$E(s)=\sigma$$

---
### Standard Normal Distribution

The standard normal distribution is the normal distribution with mean 0 and variance 1, which has the following probability density function

$$
\tag{1.4}
\varphi(t) = \frac{e^{-\frac{1}{2}t^2}}{\sqrt{2\pi}}, ~~~~for~~-\infty < t < \infty
$$

<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/mc/standard_normal_distribution_pdf.png" width="45%"/>

The cumulative distribution function is 

$$
\tag{1.5}
\Phi(x) = \int_{-\infty}^{x} \varphi(t) dt
$$

<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/mc/standard_normal_distribution_cdf.png" width="45%"/>

When T has the standard normal distribution, we write it as $T \backsim \mathcal{N}(0, 1)$

---
### Confidence Interval

To understand how to compute a confidence interval, it is necessary to first introduce the IID (independently and identically distributed) Central Limit Theorem.

##### IID Central Limit Theorem
Let $Y_1, Y_2, ..., Y_n$ be independent and identically distributed random variables with mean $\mu$ and finite variance $\sigma^2 > 0$. Let $\hat{\mu_n}=\frac{1}{n}\sum_{n=1}^{n}{Y_i}$. Then for all $z\in\mathbb{R}$
$$
\tag{1.6}
\mathbb{P}(\sqrt{n}\frac{\hat{\mu_n}-\mu}{\sigma} \le z) \to \Phi(z)
$$

We also need Slutsky's Theorm for safely plugging estimated variables.

##### Slutsky’s Theorem
Suppose that random variables $Y_n \xrightarrow{d} Y$ and $Z_n \xrightarrow{d} \tau$. Then $Y_n + Z_n \xrightarrow{d} Y + \tau$ and $Y_n Z_n \xrightarrow{d} \tau Y$. If $\tau \ne 0$ then $Y_n/Z_n \xrightarrow{d} Y/\tau$.

Now we have enough facilities to derive what we want.

Assuming $\Delta > 0$, we can write the probability that a random variable is outside the confidence intervel as follows, 

$$
\mathbb{P}(|\hat{\mu_n}-\mu| \ge \frac{\Delta\sigma}{\sqrt{n}}) 
$$

Which correspond to the following confidence interval

$$
 \tag{1.7}
 \hat{\mu_n} - \frac{\Delta \sigma}{\sqrt{n}} \le \mu \le  \hat{\mu_n} + \frac{\Delta \sigma}{\sqrt{n}}
$$

And because $\sigma \xrightarrow{d} s$,

$$
\mathbb{P}(|\hat{\mu_n}-\mu| \ge \frac{\Delta\sigma}{\sqrt{n}})  \xrightarrow{d} \mathbb{P}(|\hat{\mu_n}-\mu| \ge \frac{\Delta s}{\sqrt{n}}) 
$$

Then we have

$$
\mathbb{P}(|\hat{\mu_n}-\mu| \ge \frac{\Delta s}{\sqrt{n}}) = \mathbb{P}(\sqrt{n}\frac{\hat{\mu_n}-\mu}{s} \ge \Delta)+ \mathbb{P}(\sqrt{n}\frac{\hat{\mu_n}-\mu}{s} \le -\Delta)
$$

Based on $1.6$,

$$
\mathbb{P}(\sqrt{n}\frac{\hat{\mu_n}-\mu}{s} \ge \Delta) \to 1 - \Phi(\Delta)
$$

$$
\mathbb{P}(\sqrt{n}\frac{\hat{\mu_n}-\mu}{s} \le -\Delta) \to \Phi(-\Delta)
$$

Because $\varphi(\Delta) = \varphi(-\Delta)$ and $\Phi(\infty) = 1$,
$$
\Phi(\Delta) + \Phi(-\Delta) = 1
$$

Then we have

$$
\tag{1.8}
\mathbb{P}(|\hat{\mu_n}-\mu| \ge \frac{\Delta s}{\sqrt{n}}) \to 2\Phi(-\Delta) 
$$

With $1.7$ and $1.8$, we can derive confidence interval with different converging chances. For example, if we want to have a confidence interval with 99% converging chance, based on $1.8$ we can have

$$
2\Phi(-\Delta) = 0.01
$$

$$
\Phi(\Delta) = 0.995
$$

$$
\Delta = \Phi^{-1}(0.995) \approx 2.58
$$

Finally, based on $1.7$, we can write the confidence interval with 99% converging chance as follows,

$$
\hat{\mu_n} - \frac{2.58 s}{\sqrt{n}} \le \mu \le  \hat{\mu_n} + \frac{2.58 s}{\sqrt{n}}
$$

For confidence chance $\alpha$, we have the confidence interval as follows,

$$
\tag{1.9}
\hat{\mu_n} \pm \frac{\Phi^{-1}(1 - \alpha / 2) s}{\sqrt{n}}
$$

However, our definition of confidence interval is still in an estimated form. For a small n, it is better to use the Student's t-distribution instead of the standard normal distribution. Then we can have

$$
\tag{1.10}
\hat{\mu_n} \pm {t_{(1 - \alpha/2, n-1)}} s / \sqrt{n}
$$

In realtime rendering, we often have a limited sample count like 8 or 16. Let us compute the confidence interval with convering chance 99% using normal distribution and t-distribution. Assuming $n = 16$,

If using normal distribution,
$$
\hat{\mu_n} \pm  0.645s
$$

If using t-distribution,
$$
\hat{\mu_n} \pm  0.737s
$$

Using t-distribution, the confidence interval is roughly $28.5\%$ larger.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>