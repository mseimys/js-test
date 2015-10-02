TASK
--------

So I made this basic proof-of-concept application that can fetch basic stock data about
companies. But there is still lot's of things that needs to be done, could you maybe complete it for me?

You are free to modify what's already there or simply scrap it and start over. I have some idea of what is lacking and have listed 
some bullet points below, but feel free to go as far as you want but make sure to try and show what you are capable of when it comes
to javascript, html, css and avoid using large frameworks and limit yourself to libs/plugins. I am sure you are an awesome programmer and javascript
ninja, show it! :)

The data is fetched from Markit On Demand API and the documentation for that API can be found [here](http://dev.markitondemand.com/).

## Ideas for improvement

* Form validation is missing, this must be added.
* Currently there is no handling or errors in the application, for example if there is no company that matches a search the application simply crashes.
* The code is already starting to be a good example of the pyramid of doom when it comes to callbacks inside callbacks. Please improve on the architecture! 
* The presentation of the data is not really that fun to try and read, would be nice if it could be presented in a more useful way. Show us that CSS/LESS,SASS magic.... :)
* The search function could possible return multiple companies, but the application currently always takes the first and returns the quote. Maybe support for showing every match in a meaningful way.
* You could do further queries to the API for the matching company and render graphs for them perhaps for changes over time.
* Probably a lot more! add/fix what you feel is important. The API is able to provide different kinds of data, come up with cool ways of combining requests and visualize the resulting data.

## Technical Requirements

* Keep in mind that if you decide to use a framework like AngularJS or Backbone it solves to many of the basic problems relating to structure, conventions and gives a lot of features for "free". For us to be able to judge your submission we must be able to read code that you have written yourself showing architecture, structure, correctness etc. This means your will then have to show of the ability to write such code in the actual application logic.
* Libraries !== Frameworks
* Please fork this repository and make all your changes on the fork with a branching strategy you see fit. Once completed make a pull request targeted at the master branch of this repository containing all your changes.
* Don't forget things like linting, testing etc. There are tools like Grunt, Gulp and others out there that can help you.
* Keep in mind that you should write code that is targeting **Google Chrome 45.0** and **Firefox v41.0.1**, So no need to care about legacy things. Show us the good stuff :)
