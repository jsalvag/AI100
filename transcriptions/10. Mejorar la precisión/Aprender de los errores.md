- We humans tend to think
of right and wrong as one or the other.
You're either right or you're wrong.
But artificial neural networks
need to be much more specific.
To a neural network,
95% right is much different from 97% right.
The challenge is how the system figures out
how wrong that is.
In a sense, the neural network needs
a measure of wrongness.
In neural networks,
this is measured as a cost function.
The cost function is just a number
that the system uses to measure its answer
against the correct answer.
If it's really close, then that number will be small.
But if it's really far off, then that number will be larger.
Say your neural network
is trying to determine if an image contains a dog.
The network says there's a 97% chance that it's a dog photo,
but it turns out that it's a cat photo.
That wrongness will have a slight cost.
Now let's say that the network says
that there's a 99% chance that it's a dog photo,
but this time, it's a photo of a snow-covered mountain.
This wrongness will have a much higher cost.
That's because here, the network was very, very wrong,
so it needs to make more aggressive adjustments
to its weights and biases.
Trying to correct for wrongness is a tricky thing.
For that, a lot of neural networks
use something called gradient descent.
Gradient means steepness and descent means going down.
So imagine that your artificial neural network
is playing darts again.
It's making predictions and seeing
how close it gets to the bullseye.
Some of the predictions are way off,
but other predictions are close.
When it throws a dart,
there's a distance between it and the dart board.
When it's in the air, the dart travels
at an upward angle and then a downward angle.
Then it hits the board.
If it misses the board entirely,
it'll want to make a bigger change to the angle.
If it's very close to the target,
then it'll want to make the tiniest change to the angle.
That way, it can hit the bullseye.
Well, the neural network does pretty much the same thing.
It uses calculations of gradient descent
to adjust the weights and biases in the network.
It's not using darts,
but it's using a very similar calculation
to measure the angle of its wrongness.
In fact, this is one of the biggest innovations
in artificial neural networks.
It's called the back propagation of errors
in the network, or backprop for short.
Remember, we're using what's called
a feedforward artificial network.
Your data goes from left to right.
It starts at the input layer
and moves forward to the output layer.
But when your network makes a mistake,
it needs to go backwards.
It needs to use the gradient descent
to determine its wrongness.
Then it will use backprop to adjust
the weights and biases
based on the seriousness of its error.
If the network really overshoots the target,
it'll want to make extreme adjustments.
But if the prediction is very close,
then the network should be much more careful.
The network will feed forward and then correct backward.
That way, it can tune itself towards the correct answer.
