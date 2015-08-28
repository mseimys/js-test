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

* Some basic form of input validation.
* Currently there is no handling or errors in the application, for example if there is no company that matches a search the application simply crashes.
* The code is already starting to be a good example of the pyramid of doom when it comes to callbacks inside callbacks, is there a better way to handle this? 
* The presentation of the data is not really that fun to try and read, would be nice if it could be presented in a more useful way.
* The search function could possible return multiple companies, but the application currently always takes the first and returns the quote. Maybe support for showing every match in a meaningful way.
* You could do further queries to the API for the matching company and render graphs for them perhaps for changes over time.
* Not sure the overall "architecture" currently used will scale well if we keep adding functionality do you have any input on this?
* Probably a lot more! add/fix what you feel is important.
