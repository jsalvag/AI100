- If you've ever worked as a product manager
or a software developer, then you know
that applications need very explicit instructions.
Every time you open Microsoft Windows
or open an app on your iPhone,
you're benefiting from a programmer
coding the input and output.
But we've seen that this type
of programming doesn't work well
with artificial intelligence.
There's too many combinations
to tie every input to an output.
In these cases, you need a programming model
that allows the machine to learn.
You also must give the machine some ability
to respond to feedback.
Imagine you're creating a program
that detects Spam messages.
These messages are filled
with unwanted advertisements or viruses.
You could easily program a word filter that deletes messages
with common Spam words.
If you frequently get messages on entering contests,
you can filter words like "Gold," "Lottery" or "Winner."
So you can program that if the message contains "Gold,"
then treat the message as Spam.
But complex challenges don't work well
when you're limited to programmed instructions.
That's why machine learning switches this around.
Instead of inputting instructions, you're inputting data.
Instead of a program response,
you let the machine learn from the patterns it identifies.
You can start with supervised machine learning.
Here, you need to split your data into a training set
and a test set.
The training data is a smaller chunk of data
that the machine uses to learn.
The system will use machine learning algorithms.
These algorithms rely on statistics.
You'll see a bunch of these machine learning algorithms
later on.
These algorithms help the machine find relationships
within the data.
So the machine uses an algorithm
that if the email message contains the word "Lucky,"
"Winner" or "Congratulations,"
then it's 50% more likely to be Spam.
Then once the algorithm is accurate enough,
you can use what the system learned
on a larger test dataset.
This test data is usually many times larger
than the data that the machine used to train.
Let's think about how machine learning might work
with our Spam detection program.
We'll set aside 10,000 email messages for our training set.
We'll use it to build our model.
This training data has 9,000 regular messages
and 1,000 messages labeled as Spam.
We'll also set aside a million messages for our test data.
This test data is unlabeled.
That means that it's unlike our training set.
No one has correctly labeled any of the messages as Spam.
That would be a lot of work for a million messages.
Your training data is then used
to let the machine identify the Spam messages.
Then once the machine learning algorithm gets close
to identifying the 1,000 Spam messages,
you'll try it on the larger test dataset.
Once you're satisfied, that will be your initial data model.
Now, this machine learning algorithm only has two options.
Is that a regular message or a Spam message?
That's why this is called a Binary Classification Challenge.
You'll only need to classify your email message
into one or two groups.
This is one of the most common uses for machine learning.
The key thing to remember
is that machine learning algorithms use statistics
to find patterns in your data.
Once your machine identifies these patterns,
it can then classify your data based on what it's learned.
