###  How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

I spent around 48h to complete the test. Probably improve the rendering and display of the restaurants list, where I could have added pagination for example ( since a large list of items is expected to be rendered). Most of the time I spent in the challenge was about discovering the Angular framework and reviewing some Typescript concepts. After realising how powerfull Angular is I quickly started to understand its features and organized the app in a proper way.
Additional tests could have been made ( end to end tests for example ) and also more unit tests.
  

###  What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

Keep in mind that the feature I am going to talk about was not used in any professional experience, just the fact that I read about it makes it one of the best latest features. It is called Top-level await which comes with ECMAScript 2022 and it enables developers to write the await keyword in a top level scope.

Before update:
  
```js
await  Promise.resolve(console.log('await/async test'))  // throws error

(async  function()  {  // workaround
	await  Promise.resolve(console.log('await/async test')))
}())
```

  

After update:

```js
await  Promise.resolve(console.log('await/async test'))
```

###  How would you track down a performance issue in production? Have you ever had to do this?

Back when I was working in my ex-company I had to deal with a performance issue that was related to gigantic quantities of elements that were needed to display in the browser which was taking to much of RAM memory and would eventually crash the app. In order to understand the problem one would require to inspect more on a hardware level than the software level. Also using dev tools from the browser it was possible to track down this performance issue and where/when the peek ( crash ) was taking place.