- As human beings, we add weights to our data all the time.
We look at the features of the data
to better predict our output.
Let's say that you're looking at a photograph
of a beautiful grassy open space.
Then, you see a little blurry object in the photo.
What do you think the odds are
that that blurry object is a dog?
Now, imagine you're looking at an image of a dry desert.
This picture also has a little blurry object.
What do you think the odds are that this object is a dog?
If you're like most people,
you'd guess that a dog is much more likely
to be in a grassy field,
so your human neural connections
added a positive weight to the grassy field
and a negative way to the arid desert.
Artificial neural networks do the same thing.
Like us, these networks need to work
in a world of probabilities.
It's possible that there's a dog
in the middle of the desert,
but if you're an artificial neuron,
you're going to be very skeptical about activating.
An artificial neural network is structured in a way
so that it can better tune itself
to understand your data.
It's almost like a self-tuning musical instrument.
To tune an instrument like a guitar,
you need knobs to twist as you strum the note.
With artificial neural networks,
these knobs change the weights
of your connections between your neurons.
An artificial neuron network adds weights to the connections
between neurons in each layer.
Each neuron in the hidden layer
feeds forward into every other neuron in the next layer.
So if there are a hundred neurons in every hidden layer,
each neuron in that layer
will have a hundred connections going out.
That's a lot of connectivity,
but where it gets really powerful
is that each one of these connections will have a weight.
That's why if you've ever seen a sketch of a neural network,
you'll see that each one of the connection lines
has a W with a number.
So in this case, you would have a W1, W2, W3,
all the way up to W100.
You'd see this for each one of the hidden layers.
Now, the weights in each one of these connections
is a key part
of how an artificial neural network tunes itself.
Keep in mind, an artificial neural network
is just a form of supervised machine learning.
So data scientists use the same technique
that they've used to train the network.
Remember that supervised machine learning
starts out with a training set.
Then once the algorithm is tuned
to make accurate predictions,
you can then move on to the larger test data set.
The same thing happens with your artificial neural network.
When you first initialize your neural network,
the systems will randomly assign numbers
to these thousands of weights.
Then you'll feed your training data into the network
and let the system adjust the weights
based on whether you're getting correct output.
The network will repeat this over and over again
until it's accurately identifying
the patterns for the output.
It'll tune itself over time
to zero in on the best predictions.
