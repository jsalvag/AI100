- So what does it take to build an AI system?
To think about this,
let's go back to our challenge of finding dogs in images.
The first step data scientists need to do is figure out
what they want from the data.
In this case, they're not asking the AI system
to cluster together its own groups,
instead, they're asking the system
to classify data into two categories.
One category will have images with dogs,
and the others will be not dogs.
This is a classic binary classification challenge.
Remember, that's when the neural network just has
two possible classifications.
This means they'll be doing supervised machine learning.
Remember that supervised machine learning starts out
with labeled data.
Here, the system will be trained with hundreds of thousands
of images known to contain dogs.
The next step for data scientists is to figure out
if they want to use standard machine learning algorithms
or if they'd like to use an artificial neural network.
Remember that this is a classification problem,
so if they go with machine learning algorithms,
they'll probably either use K nearest neighbor
or naive Bayes.
You've seen that the system will break down
each image into pixels.
That means that this is going to be a complex challenge
with a lot of data,
so they're going to use an artificial neural network.
They'll create the input layer,
hidden layers, and output layer.
Now, remember that since this is
a binary classification challenge,
there are only two options: dog or not dog,
so they'll need just two nodes for the output layer.
Next, the neural network will be initialized.
The system will assign random numbers to all the weights
of the connections.
Then the system will set the bias on all the nodes to zero.
This is almost like shaking an Etch A Sketch
to give itself a clean slate.
Now, the training set needs to be fed
into the neural network.
The first few images will probably be not
that much better than random guesses.
The neural network will say something like:
there's a 62% chance that the image contains a dog,
or a 55% chance it's not.
Then the network will compare its answer
to the label on the data.
If it mis-identifies the dog image,
then it will look at the gradient descent to determine
how much to change the weights and biases.
The neural network will go through all the data
in your training set to fine tune its results.
Remember that the network will tune itself
by using back propagation to change the weights
and bias to lower the cost function.
In a sense, it will go backward through the network
and twist all the dials to increase its accuracy.
Once the artificial neural network has gone
through the training set, the data will be added
from the test set.
The test set will not be labeled.
It could be hundreds of thousands of images of anything.
Then you'll see how well your neural network perform
when identifying dog photos.
Sometimes the neural network will do very well
with the training set, but not so well with the test set.
When this happens, it usually means
that you are under-fitting the data.
Remember, that's when the system's really good
at identifying the smaller training set,
but doesn't have enough complexity to deal with
the new data in the test set.
Now, it's unlikely that your team will classify dog
or not dog anytime soon.
However, this approach to binary classification is
a powerful way to get insights from your data.
Think about your customer data, your sales data,
or even data from your IOT devices,
and what you can learn from this approach.
