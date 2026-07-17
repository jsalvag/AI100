- Machine learning algorithms see patterns in your data,
but sometimes you just have too much data
to use these algorithms.
So many large organizations
use artificial neural networks instead.
Artificial neural networks are a type of machine learning
that uses a structure like the human brain
to break down massive data sets.
Instead of using the previous machine learning algorithms,
an artificial neural network breaks down your data
into much smaller pieces.
Earlier, we talked about artificial neural networks
as a machine learning technique that mimics the brain.
The network is structured with neurons
that are organized into layers.
The layers move from left to right.
There's the input layer, the hidden layers,
and the output layer.
If the network has a lot of hidden layers,
then it's called a deep learning artificial neural network.
That's because the network is many layers deep.
The more hidden layers the network has,
the easier it'll be for the network
to identify very complex patterns.
So let's imagine creating an artificial neural network
to identify whether there's a dog in an image.
Think of it as a binary classification: dog or not dog.
To do this, the image from the input layer
into dog or not dog needs to be classified.
You have the image coming in on the input layer,
then the output will be
the classification into dog or not dog.
We've already seen that to a machine,
an image is just a collection of different bits of data.
So in this case, you'll have a bunch of pixels.
These are the tiny points of color on the image
and the different levels of brightness or contrast.
Let's take an image of a dog and break it into pixels.
Let's say that your image is 25 pixels high
and 25 pixels wide.
So your entire image holds 625 pixels.
That means that each image has 625 data points.
Let's say that we take these 625 pixels
and feed them into a neural network.
Each pixel is fed into the input layer.
Each of the 625 neurons in the input layer has a number
based on the color of the pixel.
Each of the neurons in the hidden layer has something called
an activation function.
An activation function is like a tiny gateway.
It lets the neuron decide whether it wants to send the data
to the next hidden layer in the network.
Each hidden layer feeds the pixel data forward
to the next hidden layer.
Then at the very end,
there'll be two nodes in the output layer.
Remember, this is a binary classification challenge.
So there are only two options, is there a dog or not dog?
Since the pixel data moves through the layers
from left to right,
this is called a feed forward neural network.
One of the great strengths of artificial neural networks
is that they're self-tuning.
They're almost like a musical instrument
that tunes themselves until they get the perfect note.
So each of the two neurons in the output layer
will have a probability score.
The key thing to remember
is that an artificial neural network
is most often used for supervised learning.
You can train the network and then it will tune itself
based on whether it correctly identified your input.
