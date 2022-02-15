const express = require('express');
const ExpressError = require('./expressError')
const app = express();

const { convertAndValidateNumsArray, mode, mean, median, findMode } = require('./helpers');

app.get("/mean", function (req, res, next) {
    if (!req.query.numbers){
        throw new ExpressError("You must pass a query key of numbers which is a comma-separated list of numbers.", 400)
    }

    let numsAsStrings = req.query.numbers.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
  
    let result = {
        operation: "mean",
        result: mean(nums)
    }

    return res.send(result);

});

app.get("/median", (req, res, next) => {
    if (!req.query.numbers){
        throw new ExpressError("You must pass a query key of numbers which is a comma-separated list of numbers.", 400)
    }

    let numsAsStrings = req.query.numbers.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
  
    let result = {
        operation: "median",
        result: median(nums)
    }

    return res.send(result);

})

app.get('/mode', (req, res, next) => {
    if (!req.query.numbers){
        throw new ExpressError("You must pass a query key of numbers which is a comma-separated list of numbers.", 400)
    }

    let numsAsStrings = req.query.numbers.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
  
    let result = {
        operation: "mode",
        result: mode(nums)
    }

    return res.send(result);
})

app.get('/mode-solution', (req, res, next) => {
    if (!req.query.numbers){
        throw new ExpressError("You must pass a query key of numbers which is a comma-separated list of numbers.", 400)
    }

    let numsAsStrings = req.query.numbers.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
  
    let result = {
        operation: "mode",
        result: findMode(nums)
    }

    return res.send(result);
})

app.get("/all", function (req, res, next) {
    if (!req.query.numbers){
        throw new ExpressError("You must pass a query key of numbers which is a comma-separated list of numbers.", 400)
    }

    let numsAsStrings = req.query.numbers.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
  
    let result = {
        operation: "all",
        mean: mean(nums),
        median: median(nums),
        mode: mode(nums)
    }

    return res.send(result);

});

// If no other route matches, respond with a 404
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404)
    return next(e)
})


// Error handler
app.use(function (err, req, res, next) { //Note the 4 parameters!
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.msg;

    // set the status and alert the user
    return res.status(status).json({
        error: { message, status }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
});