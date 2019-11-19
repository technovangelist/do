# do
**Do** is a tool to help me get better at standup. Where I work, we do standup everyday. The main part of standup is a slack channel where we post our status:

  1) what we did yesterday
  2) what we are going to do today
  3) any blockers
  
If I don't write down what I am doing today, I will have no recollection of what I did yesterday when tomorrow comes around. So this tool helps me do that.

Essentially, you are creating a list of things you are going to do. Then you mark the things you have done. Finally you can spit out a report in the format above.

## How to use it

`do here is a task i am going to do` - adds a task to the list of things you plan to do today

`do here is a task that i did and forgot to add yesterday -y` - adds a task to the list of things you did yesterday because you forgot to add it at the time.

`do` - show an interactive list of tasks added to today and yesterday that you haven't marked as done. You might not have completed the task, but you did in fact do some work on it. 

`do -r` - show the report and copy it to the clipboard for easy pasting into **slack**.

## But `do` does something special in my shell and this doesn't work

If you are using **bash** or **zsh** then `do` does something useful and won't run my tool. My suggestion is to upgrade to a modern shell like **fish**. Otherwise create an alias to something like `d`. In fact, using `d` on its own is pretty cool:
  ```alias d=/usr/local/bin/do```

# Revision History

**0.1.7** - today on a weekend is now a friday. Yesterday on a Sunday or Monday is now a friday.
**0.1.8** - remove some of the extra debug statements