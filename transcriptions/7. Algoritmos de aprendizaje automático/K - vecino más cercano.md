- In machine learning,
one of the best ways to learn more about your data
is by classifying it with what you already know.
Think of it this way.
When I was younger,
I worked for an animal shelter in Chicago.
One of the most difficult jobs
was classifying the breed of incoming dogs.
There are hundreds of different dog breeds
and most dogs are mixed.
Each time we got a new dog, we would hold it up
to the dogs whose breed we already knew.
Then we'd look at some of the features.
Maybe it was the shape of their face
or the color of their hair.
In a sense, the shelter was classifying the unknown dog
by looking at its nearest neighbor.
Of course, it's not easy to tell
whether a dog was a Boston Terrier or a French Bulldog.
The closer the match,
the more likely it was to be classified.
Another way to look at it is we were trying
to minimize the distance between the unknown dog
and the known breeds.
If the features were closely matched,
then there was a short distance between the unknown dog
and its nearest neighbor.
A very common supervised machine learning algorithm
for multi-class classification is called K Nearest Neighbor.
The algorithm plots new data
and compares it to the data that you already have.
Multi-class classification
is different from binary classification
because there are more than two dog breeds.
Minimizing the distance is a key part of K Nearest Neighbor.
The closer you are to your nearest neighbors,
the more likely you are to be accurate.
The most common way to do that
is through something called Euclidean Distance.
This is a mathematical formula
that can help see the distance between data points.
Now imagine you had millions of dogs
and you wanted to classify them based on their breed.
To start out, you might want to create two key features.
These will help you classify the dogs
that share the same breed.
These are often called classification predictors,
so let's use their weight and the length of their hair.
Then we'll take these two features
and put them on an XY axis diagram.
This is the same diagram
that you used in geometry in school.
Let's put the length of their hair along the Y-axis
and their weight along the X-axis.
Now take 1000 labeled dogs for the training set.
This will be like the shelter dogs
where we already knew the breed.
We'll put them on the graph
based on their weight and hair length.
Now let's take our unknown dog and put it on the chart.
You can see that it's not matched with another dog,
but it has a bunch of neighbors.
Let's say we use a K of five.
That means that we'd want to put a circle
around our unclassified dog and its five nearest neighbors.
We can see if the distance of the other dogs is shorter,
will get a much more accurate classification.
Now let's look at the five nearest neighbors.
You'll see that three of them are shepherds
and two of them are huskies.
You can be somewhat confident
to classify your unknown dog as a Shepherd.
There's also a reasonable chance that it's a Husky.
K Nearest Neighbor is a very common
and powerful machine learning algorithm.
That's because it can do more than just classify dogs.
In fact, it's commonly used in finance
to look for the best stocks
and even predict future performance.
