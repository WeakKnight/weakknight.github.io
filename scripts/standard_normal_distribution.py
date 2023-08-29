import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

# Generate x values from -3 to 3 with small intervals
x = np.linspace(-3, 3, 1000)

# Compute the PDF values for the standard normal distribution
y = norm.pdf(x, 0, 1)

# Create the plot
plt.plot(x, y)

# Set x-axis label
plt.xlabel('Value')

# Set y-axis label
plt.ylabel('Probability Density')

# Set plot title
plt.title('Standard Normal Distribution')

# Display the plot
plt.show()

# Generate x values from -3 to 3 with small intervals
x = np.linspace(-3, 3, 1000)

# Compute the CDF values for the standard normal distribution
y = norm.cdf(x, 0, 1)

# Create the plot
plt.plot(x, y)

# Set x-axis label
plt.xlabel('Value')

# Set y-axis label
plt.ylabel('Cumulative Probability')

# Set plot title
plt.title('CDF of Standard Normal Distribution')

# Display the plot
plt.show()