## Resampled Importance Sampling

### Formulation

$$
w_i = \frac{1}{M}\frac{\hat{p}(X_i)}{p(X_i)}
$$

$$
W_Y= \frac{1}{\hat{p}(X_i)}
$$

### RIS Random Process

<pre class="pseudocode" lineNumber="true">
    \begin{algorithm}
    \caption{Resampled Importance Sampling}
    \begin{algorithmic}
    \PROCEDURE{RIS}{$M$}
        \FOR{$i = 1$ \TO $M$}
            \STATE Generate $X_i$
        \ENDFOR
        \IF{$p < r$} 
            \STATE $q = $ \CALL{Partition}{$A, p, r$}
            \STATE \CALL{Quicksort}{$A, p, q - 1$}
            \STATE \CALL{Quicksort}{$A, q + 1, r$}
        \ENDIF
    \ENDPROCEDURE
    \PROCEDURE{Partition}{$A, p, r$}
        \STATE $x = A[r]$
        \STATE $i = p - 1$
        \FOR{$j = p$ \TO $r - 1$}
            \IF{$A[j] < x$}
                \STATE $i = i + 1$
                \STATE exchange
                $A[i]$ with $A[j]$
            \ENDIF
            \STATE exchange $A[i]$ with $A[r]$
        \ENDFOR
    \ENDPROCEDURE
    \end{algorithmic}
    \end{algorithm}
</pre>