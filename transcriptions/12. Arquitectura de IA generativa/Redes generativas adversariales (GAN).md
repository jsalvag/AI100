- Self supervised foundation models, like diffusion models,
have been one of the most successful ways
to generate new images.
It's a foundation model, so these systems
need a lot of data,
but have a lot of flexibility.
But sometimes people just want a more common image.
They just want the system
to generate a portrait or a mountain range.
They don't need a mouse wearing a hat
or an astronaut standing on a brick wall.
If you're okay giving up some flexibility,
then there are other ways
to generate photorealistic images.
One of the most popular is creating
a generative adversarial network, or GAN.
These GANs don't use self supervised learning
or a foundation model.
In fact, you could get by
with just regular, old unsupervised and supervised learning.
The key to thinking about GANs
is to focus on the word adversarial.
It's like putting two artificial neural networks
in a boxing ring and having them fight it out.
One neural network is called the generator.
This system uses unsupervised learning
to generate new images.
Its first attempts will look like
splashing paint on the wall.
The second neural network is called the discriminator.
This system uses a form of supervised learning
that classifies photos.
It'll look at an image and determine
whether it's real or a fake photograph.
So imagine that you created this adversarial network
to create a professional looking portrait.
The generator might start by just splashing color,
then will forward that splashed image to the discriminator.
The discriminator will quickly recognize
that this is not a real photograph.
It will reject the image and have the generator try again.
Then the generator will tweak the image
based on the discriminator's feedback.
Maybe it will splash color in the form of a circle
as an attempt to generate a face.
Again, the discriminator will reject the image
and give the generator feedback.
The discriminator and the generator
will be locked in this battle.
The generator tries to trick the discriminator,
and the discriminator tries to classify real photographs.
After billions of failed attempts,
the generator will start producing photorealistic images.
The discriminator will start having a difficult time
figuring out if the image is a real photograph.
At some point, the generator will create an image
that the discriminator won't be able to classify as fake,
and by that time, there's a good chance
you won't be able to tell either.
Generative adversarial networks
can produce extremely photorealistic images,
but there are a couple of downsides
compared to diffusion models.
The first is that the discriminator
only classifies photographs where it's been trained.
So if the discriminator is only trained on human portraits,
the system can only generate these portraits.
Plus, as you've already seen,
you can't really use this system to generate compositions.
You can't create images of dolphins in spacesuits.
It can only generate images trained on existing photos.
The upside to these systems
is that they don't rely on a foundation model,
so they need much less data, and are easier to set up.
That's why generative adversarial networks are great
for creating an AI system
that can produce realistic looking photographs.
You can generate fake human portraits or landscape photos,
while diffusion models work better
if you want to generate something completely new.
