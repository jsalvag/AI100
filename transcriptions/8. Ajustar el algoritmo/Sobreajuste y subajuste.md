- When my son was three years old,
we told him that he needed to brush his teeth, floss,
and take a shower before going to bed.
Then one day I got a call from his preschool
that said he wouldn't take a nap
unless they provided him with a shower,
toothbrush and flosser.
I explained to him that it was okay to nap
without following those rules.
He seemed annoyed, but agreed.
The rules we had created for him were too simple.
They worked well at home
but didn't fit well in the outside world,
so we added greater complexity.
He didn't have to follow the rules for preschool naps,
when visiting grandparents, or when flying on an airplane.
Each time we added more variables,
he became more annoyed with the complexity.
In supervised machine learning,
your AI system can run into the same problem.
The system can create simple rules for its training data
that doesn't work well when looking at the larger test data.
It was like what my son was going through.
What works well at home doesn't work well
in the outside world.
This challenge is called underfitting the data.
Sometimes data scientists add more complexity,
and then that complexity makes it more difficult
for the system to handle.
This was like all the variables we added
to my son's simple rule.
This is called overfitting the data.
Imagine that you work for a website like Zillow
that matches up buyers and sellers of homes.
One of the key things that you need to do
is estimate the value of the home.
Your machine could use Naive Bayes
to create four predictors, the square footage, the location,
number of bathrooms, and the number of bedrooms.
That way it could look at each predictor independently
and then compare it to recently sold houses.
Then the system would come up with an accurate estimate.
Now, keep in mind that you're only using four predictors
to train your system on how to estimate
so the machine is learning from a simple rule.
It's the same as the simple rule to always shower
and brush your teeth before sleeping,
so there's a very good chance this rule
will underfit the data.
It's not going to work well when you look
at hundreds of thousands of homes.
On top of that, housing data usually has a lot of variance.
Remember, that's when your data is spread out.
There's a lot of homes with different prices
that have the same square footage, the same location,
and the same number of bathrooms
so that makes it difficult to find a close group.
So to fix this, data scientists can create new predictors.
Maybe they'll create predictors for quality of view,
modern appliances, wood floors, or walkability.
This creates a much more complex prediction
because now your machine
needs to balance a lot more predictors.
So here your rule is overfitting the data.
The system needs to look at a lot more relationships
between these predictors to make an accurate prediction.
The key thing to keep in mind is there isn't really one way
to fix this problem.
When you're training the system,
you need to reach a compromise between simple rules
and giving the rules enough complexity
to make good predictions.
You need to balance underfitting or overfitting the data.
