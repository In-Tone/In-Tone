# In-Tone

## Git/Waffle Workflow

#### Naming Conventions:

Follow a `family-genus-species-issue#` model. 
Families: 
* database 
* server 
* app
Genus (FILENAME): 
* users
* audio input 
* audio output 
Species: 
* models, associations, methods, etc.
* routes, tests
* reducers, containers, components
Issue#: This is for synching up with waffle.io.

The family tells us where in our repository you're working; the genus (filename) tells us the file you're working in, and the species tells us what you're doing in the file.

Example:
* _Waffle Issue_: "db - audio input - associations";
* _Branch name_: 'db-audio-input-associations-#43'

The issue number what waffle needs to synch branches and issues. Keeping the issue request and branch name the same name (or nearly so) keeps _you, the developer_ in synch with waffle and git.

Why this convention? So we can look at waffle and be sure that no one is working in the same file at the same time. When two people are working on the same file at the same time, merge conflicts happen. When merge conflicts happen, everything goes to hell.

#### Issue Requests on Waffle

Add an issue on Waffle. Name the issue according to the convention above. Add extra information to the description field (e.g., whether you're refactoring, debugging, implementing a new feature, etc.). 

Then go to the command line. _Add the issue number to your branch name_. Never worry about waffle again.

#### The Command Line

Create a branch and name it according to the convention above:

```
    git checkout -b db-audio-input-associations-#43
```

Once you create the branch, you will be automatically set on that branch.

Need to switch to another branch? Use the following command:

```
    git checkout master
        // => takes you to the master branch

    git checkout db-audio-input-associations-#43
        // => takes you back to the db-audio-input-associations-#43 branch 
```

Notice that the `-b` is used for _creating_ branches.

After the branch is created, set its upstream destination (i.e, the place it's going to go when you send it up to GitHub):

```
    git push --set-upstream origin db-audio-input-associations-#43
```

If you've followed the naming convention above, this command will cause the issue on waffle to move from the `backlog` to the `in progress` section.

(NOTE: You should be able to complete an autocomplete if your branch name is unique (if you have other existing branches on your machine that begin `db-audio` you may have to hit `tab` a few times before you find the branch you want).)

Add and commit frequently. Please use an informative commit message.

When your finished and ready to push up, commit like so:

```
    git commit -m 'closes #43'
```

This command will move prep Waffle to move the issue from the `in progress` column to the `done` column (which happens when a pull request is accepted). 

Then go to commit, make a pull request, get someone to review the work, and rework or merge to master as necessary.

When the branch is merged, pull down to your master. Then, when working on something else, start a new branch:

```
    git checkout master
    git pull origin master
    git checkout -b { new branch name }
```

Also, when the branch is merged, you might want to delete the branch you were working on:

``` 
    git checkout master
    git branch -d db-audio-input-associations-#43
```

NOTE: You cannot delete the branch that you are on. So if you want to delete a branch you were working on, switch over to another branch.

If you want to know what branches on your machine, use this command:

```
    git branch 
```

##Group Workflow 

5 three-day sprints 
The day of a new sprint begins with a code review / mob coding code clean up / and an outline of the new sprint's goal.

*NO COWBOY CODING*

Always work on *one file* at a time. If in working in that file you see that you need to update another file, _then make a waffle request_. Working one more than one file at a time opens the door to merge conflicts. Merge conflicts make evertyhing go to hell. One issue and one file at a time. 