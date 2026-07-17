- Another common machine learning algorithm
is k-means clustering.
K-means clustering
is an unsupervised machine learning algorithm.
It's used to create clusters
based on what your machine sees in the data.
Let's go back to the animal shelter in Chicago.
The shelter used to have a large social room
where the dogs got together, sniffed and played.
The dogs had their group of friends,
and they played and hung out together.
Each time they had a social hour,
they would self-organize into these social groups.
Now, imagine that the shelter
was closing and all the dogs
were going to be distributed to three different shelters.
To make it easier for the dogs,
the organizers decided to cluster the dogs
based on their friend groups.
So the shelter created three clusters.
That means the k in k means equal three,
because they wanted to divide
the groups into three clusters.
To start, the machine put a red, yellow,
or blue-colored collar on three random dogs.
Each color represented
a potential cluster based on their social group.
These would be your three centroid dogs.
Each of the centroid dogs
would look at the mean or average distance
between it itself and all of the surrounding dogs.
Then the machine would put the same-colored collar
on the dogs that were closest to a centroid.
Since these centroid dogs were selected randomly,
there was a pretty good chance
that they wouldn't really have any good clusters.
Maybe all three centroid dogs were in the same social group.
If that happened,
then most of the dogs would be far away
from their nearest centroid,
so it would redistribute collars
until the algorithm could find a good centroid dog.
The machine would try
over and over again until it picked the best centroid,
and it might even do this one cluster at a time.
At the end of each iteration,
the machine learning algorithm checked
the variance between each dog and the centroid.
Once there was a good centroid,
then it would put the same-colored collars
on the friends of the dogs in each cluster.
Now, keep in mind that the dogs themselves
did not cluster into three groups.
There might be seven or eight different social groups,
but there were only three shelters,
so the algorithm had to do its best to cluster
the dogs' natural social grouping.
The algorithm also had to consider very social dogs
that jumped from group to group.
If the dogs were moving around too much,
then it'd be difficult to form real clusters.
Another challenge with k-means
is it can be very sensitive to outliers.
So if you had a dog that wasn't hanging out with other dogs,
it would still have to be clustered
into one of these three groups.
Essentially, the dog would be forced to find friends.
Organizing dogs into three clusters
for three different shelters is probably
not a problem you'll run into every day.
But k-means clustering
is one of the most popular machine learning algorithms.
One of the more interesting applications
is when retailers use clustering to decide
who gets promotions.
They might have the system create three clusters
to find loyal customers, regular customers,
and lowest-price shoppers.
Then they'll create strategies
to elevate regular customers into loyal customers.
Many organizations are looking for better ways
to cluster together their customers.
If they can get all of their loyal customers
into one cluster, then they can really improve
their business.
K-means clustering is a good way
for the system to cluster people
or things by looking at hundreds of different variables.
