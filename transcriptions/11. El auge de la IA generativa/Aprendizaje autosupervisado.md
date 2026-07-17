- In 1798, Napoleon Bonaparte invaded Egypt.
In the small town of Rosetta,
the French army rediscovered a stone
with three ancient languages.
When the French lost Egypt to the British,
the soldiers took this large Rosetta Stone back to London.
The stone was unique because it contained Greek translations
of ancient Egyptian hieroglyphs.
This was a terrific discovery because there were no labels
of ancient Egyptian hieroglyphs.
Since many historians knew Greek, they were able
to then label these hieroglyphs with a known language.
The British historians looked at the data they knew
and then used it as a guide
to make guesses about data they didn't know.
Those guesses became the foundation
for understanding Egyptian hieroglyphs.
It might sound strange,
but modern generative AI systems use a similar technique
called self-supervised learning.
Remember that most of the data in the world is unstructured.
That means that there's no label to understand the data.
So gen AI systems need to compare this unlabeled data
with data it already knows.
In a sense, it makes guesses about the data based
on the contents.
Then it will label this data based on these guesses.
Gen AI uses unsupervised learning to analyze this data
and generate pseudo labels.
These are called pseudo labels
because they're just guesses made by the machine.
These pseudo labels allow it to be used
with supervised learning.
Imagine creating a self-supervised system
to label all available dog pictures.
This could be billions of images.
Most of these images won't be labeled.
That means that most won't have a caption
that says, image of a dog.
Instead, they'll just be included in a social media post
where someone says something like out for morning walk.
The first thing the self-supervised learning system does
is to use unsupervised learning
to cluster similar images together.
So maybe most of them are outside.
It'll likely pick up on patterns of images that contain fur.
It might pick up on a pattern in the dog's tail or ears.
Then it will use another form of unsupervised learning
to see if it can find other data.
That data will act as a guide to help it make a guess.
It will be the Rosetta Stone that the system uses
to label the image as a dog.
Maybe it will find common patterns and captions
that say something like walk, outside, and park.
It'll then make a guess that images near these captions
are more likely to contain a dog.
Then it will allow the system to create pseudo labels
for billions of dog images that would otherwise be buried
in all that unstructured data.
With these pseudo labels,
the supervised learning system will be able
to classify these dog images based on what it learns.
That means that you could have classifications based
on dog breeds or even their height and weight.
Now, it's important to keep in mind
that self-supervised learning solves a specific problem.
It's about getting value from massive amounts
of unstructured data.
It vacuums up so much data that there aren't many companies
that have the computing power to process it all.
Even though most companies probably won't be building
their own self-supervised systems,
the ones that do will get an enormous learning power
from this approach.
