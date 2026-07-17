- An artificial neural network is self-tuning.
You've seen it's like a musical instrument.
It compares the output of the perfect note
and then twists its own dials to match the sound.
But at the end of the day, an artificial neural network
is still a form of machine learning.
That means it uses many of the same tools
and techniques to help the system learn.
You've already seen that an artificial neural network
tunes itself by adding weights to the connections,
but adding weights to these connections
only corrects the variance.
Remember earlier that the system
is trying to throw darts in a tight cluster
near the bullseye.
The network will throw a dart
and then measure how close it is
to making the right prediction.
Then it will adjust the weights
and throw another dart to see if it's closer.
Remember that when you're making a prediction,
you need to balance the bias and variance in the data.
This is called the bias-variance tradeoff.
So adjusting the variance will have an impact on the bias.
In an artificial neural network, the bias is the number
that the system assigns to each neuron.
This bias number will shift the data
in a different direction to make it more accurate.
The network must tune itself
to find a sweet spot between the data bias
and the data variance.
The main dial that it has to tune itself
is adding weights to the connections
and adding a bias to the neuron.
Sometimes you almost feel bad
for making the artificial neural network
go through this tuning process.
It adjusts the weights of its connections
to decrease the variant spread,
but that shifts it slightly away from the target.
Then it adds a bias to correct for the shift,
but then that makes the data spread out again.
Humans would find this very frustrating.
It's like the machine is trying to throw darts
in a tight formation while the same time using bias
to shift the whole dartboard closer to the bullseye.
On top of that,
artificial neural networks tend to overfit the data.
Remember that overfitting
is when the system adds a lot of complexity
when it's training.
So when an artificial neural network
is looking at the data in a training set,
it might overlearn lessons about the data.
Since it's overfitting its training set,
it might make big shifts when you adjust the variance.
That makes it even more difficult for the machine
to find a nice balance between the bias and the variance.
It's like the system is trying to drive straight
on an icy road, on one side of the road is too much bias,
and on the other side of the road is too much variance.
If it slides too much in one direction,
it has to steer its way back.
One key thing to remember about bias
is that it's on the neuron
and not assigned to the connection like the weights.
If you think about it, that makes a lot of sense.
The machine can only add the bias
after it sees what happens with the variance.
In a sense, it can only shift the dartboard
after it's already thrown a few darts.
Otherwise, the machine wouldn't know
which way to make the shifts.
