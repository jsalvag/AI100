- We've seen that sometimes you can classify items
based on the nearest neighbor.
You can also classify based on trends in the data,
but sometimes you want to classify items
based on many features in the data.
For that, you can use something called Naive Bayes.
Naive Bayes is one of the most popular
machine learning algorithms.
It's naive because it assumes all the predictors
are independent from one another.
So let's go back to our animal shelter.
Imagine we want to classify all the dogs
based on their breeds.
Let's look at the problem using a Naive Bayes
machine learning algorithm.
To start, let's create three classes of dog breeds.
We'll use terrier, hounds, and sport dogs.
Now, for each of these classes,
we'll use three features as predictors.
Let's use hair length, height, and weight.
Remember that some of these predictors
will be closely auto correlated.
A tall dog is more likely to weigh more,
but Naive Bayes considers each one
of these predictors independently.
Remember, that's why it's called naive.
Once you have your classes and predictors set up,
then the Naive Bayes will do something
called class predictor probability.
This is when it looks at each one of the predictors
and creates a probability
that the dog belongs in this class.
So let's see what happens when we try
to identify an unknown dog.
The first predictor we look at is hair length.
The machine learning algorithm checks the probability
of a dog with this hair length belonging
in the three breeds.
It finds that a dog
with this hair length has a 40% chance of being a terrier,
a 10% chance of being a hound,
and a 50% chance that it's a sport dog.
The next thing you check is the unknown dog's height.
It looks at this predictor independently
and tries to calculate the class predictor probability.
So it looks at the training data
and finds that there's a 20% chance that it's a terrier,
a 10% chance it's a hound,
and a 70% chance that it's a sport dog.
The final thing you want to check is the unknown dog's weight.
This might seem like a strange predictor
because it's closely related to height,
but remember that Naive Bayes is evaluating the probability
of each predictor independently.
It looks at the training data
and finds that there's a 10% chance that it's a terrier,
a 5% chance that it's a hound,
and an 85% chance that it's a sports dog.
So now you have this table with the unknown dog's
class predictor probability.
If you look at it,
you can see that the dog is probably a sport dog.
As you can imagine, organizations can use Naive Bayes
to do much more than just classify dog breeds.
Banks use it to check for fraud.
They look at each banking predictor independently
and then measure the likelihood that it's fraud.
Then they use a class predictor probability
to classify the transaction.
Cybersecurity firms also use Naive Bayes
to look for securities threats.
It looks at each threat predictor independently,
and then flags items for security review.
The key thing is that
because Naive Bayes makes so few assumptions,
it can look in an enormous amount of predictors.
Often these extra predictors make it much more accurate
when classifying your data.
