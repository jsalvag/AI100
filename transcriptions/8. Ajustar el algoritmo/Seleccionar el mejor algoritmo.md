- So now you've seen three examples
of supervised machine learning algorithms.
There was K nearest neighbor,
regression analysis, and naive bayes.
These are most often used for classifying.
And then there was K means clustering,
which is used for unsupervised learning and clustering.
Remember that each of these is like a kitchen tool.
These tools are designed for something specific,
but you can still be creative with how you use them.
It's the same way you can use a fork to whip up eggs
or a knife to pitch your avocado.
But as any good chef knows, you never just present one dish.
Instead, you're judged by the whole meal.
That's why it's very common for data science teams
to do something called ensemble modeling.
If you're an actor or a music fan,
then you've probably have heard the term ensemble.
It's when a group performs together.
It's the same thing with machine learning algorithms.
There's a few different ways to create ensembles.
The most popular is bagging and stacking.
Bagging is when you use several versions
of the same machine learning algorithm.
Stacking is when you use several different
machine learning algorithms,
then you stack them on top of one another.
I used to work for a large home improvement retailer.
One of their challenges was what items
do they put near the checkout?
You'd be surprised how much retailers earn
by selling something just a few minutes
before your checkout.
So this was a big challenge,
and they wanted to create an ensemble
of machine learning algorithms.
They debated which ensemble might lead to the best results.
They could use bagging to try different results
of the same algorithm.
Then they'd see if they could improve their accuracy.
This was a national retail chain,
so they could pull training data from stores
throughout the country.
So they could get data samples from random stores,
then use K nearest neighbor
to classify those data sets separately.
Then they would aggregate those results together
to see if they could come up with a larger trend.
They would aggregate the insights of what people purchased
right before checkout.
In a sense, they were averaging out the insights
to see if they could come up with a more accurate result.
The retailer could also try boosting.
Here, instead of averaging the insights together,
they'd boost the results step-by-step.
So the retailer could take a training set
of their most popular items.
Let's say that their bestselling item was a hammer.
Then they could use K nearest neighbor
to see what's often bought with the hammer.
Let's just say it was nails and a tool belt.
Now, most of us intuitively know
that if someone buys a hammer,
they're more likely to buy nails,
but that might not help us
if we want to put something near the checkout line.
For that, we might want to use something like naive bayes.
Remember that naive bayes is naive
because it doesn't assume that predictors are correlated.
So we don't assume that if you're buying a hammer,
you're going to need nails.
Instead, it will other items that are popular
but might not seem related.
Maybe people who buy hammers
are more likely to buy chocolate bars.
Mixing and matching your machine learning algorithms
will give you different insights with different results.
Like any good ensemble, the accuracy of predictions
will depend on the creativity of your data science team.
