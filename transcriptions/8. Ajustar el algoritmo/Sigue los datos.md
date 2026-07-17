- In the old movie, "All the President's Men,"
the top informant of the Nixon scandal
met in a parking lot and said,
"Follow the money."
Only by following the money
could the reporter find the truth.
Like the reporter, machine learning algorithms
must follow the data to get to the truth,
but that's easier said than done.
In fact, one of the biggest challenges in machine learning
is balancing the bias and the variance.
Bias is the gap between the predicted value
and the actual outcome.
Let's say that you were playing dice
and predicted that you would roll 5 three times,
but you rolled 4 three times.
Then your prediction would have a high bias.
You were off by one each time.
Variance is when the predicted values
are scattered all over the place.
So if you were playing dice and you predicted
that you would roll 5 three times,
but you actually rolled 2, 4, and 6,
then you'd be off by different amounts.
Then your data would be too spread out.
Now, it might seem strange to make such a big deal
about how the system was wrong,
but when you're working with machine learning algorithms,
these are two separate challenges.
So the system needs to fix it in different ways.
Think about the game of darts.
The center of the dartboard
is the machine's best prediction.
That means that the little red bullseye in the middle
is the right prediction.
The machine could throw three darts,
and each one of them would be consistently wrong.
They'd all land in the upper right hand corner,
just above the red bullseye.
This is called having a high bias and low variance.
The darts are grouped together closely,
but all of them are too far to the right.
The dataset would have a high bias.
That means to make a better prediction,
the machine would just have to pull the group of darts
down into the left.
Now imagine a different challenge.
The machine throws the darts at the dartboard
and they're all over the place.
That means that the data has a wide spread,
so this data would have a high variance.
To make a better prediction,
the machine would want to tighten up the darts
closest to the bullseye.
Ideally, you want the predictions to have a low bias
and a low variance.
That means that all the darts are in the bullseye,
but in most cases, the machine is going to have to fix
either a high bias or a high variance.
In machine learning, this is such a common problem
that it's referred to as the bias variance trade off.
Like any trade off,
it means that the system tries to balance the impact of one,
it has to look at the impact on the other.
So if the machine decreases the variant spread,
it will also have to increase the bias.
If the machine decreases the bias,
it will increase the variant spread.
This is why the machine needs to follow the data.
The machine will turn each of these knobs
to find the best trade off between bias and variance.
That way it can zero in on the best predictions.
