var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = (_.filter(products, function(prod){
        return !prod.containsNuts && (_.all(prod.ingredients, function(ingredient){return ingredient!="mushrooms";}));
      }));
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(0,1000).reduce(function(accumulator, currVal){
      return (currVal % 3 === 0 || currVal % 5 === 0) ? accumulator + currVal : accumulator;
    });    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
    /* chain() together map(), flatten() and reduce() */
    ingredientCount['mushrooms'] = _.chain(products)
                        .map(function(prod){ return prod.ingredients; })
                        .flatten()
                        .reduce(function(accumulator, ingredient){
                          return accumulator + (ingredient === "mushrooms");
                        }, 0).value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    function findLargestPrimeFactor(composite) {
      var curFactor = 2;
      var curLargest = 1;

      while (composite > 1) {
        while (composite % curFactor === 0) {
          curLargest = curFactor;
          composite /= curFactor;
        }
        curFactor++;
      }

      return curLargest;
    }

    expect(findLargestPrimeFactor(720720)).toBe(13);
    expect(findLargestPrimeFactor(2520)).toBe(7);

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function findLargestPalindrome() {
      var curLargest = 0;
      // Check the product of every combination of 3-digit numbers to see if it's a palindrome
      for (let i = 100; i < 1000; i++) {
        for (let j = 100; j < 1000; j++) {
          var prod = i * j;
          if (isPalindrome(prod)) {
            curLargest = prod > curLargest ? prod : curLargest;
          }
        }
      }

      // Compares number with its reverse
      function isPalindrome(number) {
        var str = number.toString();
        var rev = str.split('').reverse().join('');
        return str === rev;
      }
      return curLargest;
    }

    expect(findLargestPalindrome()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    // 1. Prime factorize each number from 1 to 20
    // 2. Multiply together the highest exponent for each prime factor within the pool
    // i.e. (highest power for 2) * (highest power for 3) * ... * (highest power for 20)
    function findSmallestNumDivByOneToTwenty() {
      var result = 0;

      return result;
    }
    //expect(findSmallestNumDivByOneToTwenty()).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    function diffSumSquares(number) {
      // 1^2 + 2^2 + .... + (n-1)^2 + n^2
      function sumSquares(number) {
        var sumSquares = 0;
        for (let i = 1; i <= number; i++) {
          sumSquares += i * i;
        }
        return sumSquares;
      }

      // (1 + 2 + ... + (n-1) + n)^2
      function squareOfSums(number) {
        var sum = number * (number + 1) / 2;
        return sum * sum;
      }

      return sumSquares(number) - squareOfSums(number);
    }

    expect(diffSumSquares(1)).toBe(0);
    expect(diffSumSquares(10)).toBe(-2640);
    expect(diffSumSquares(25)).toBe(-100100);
  });

  it("should find the 10001st prime", function () {
    function find10001stPrime() {
      // Prime def: natural number > 1 that has no positive divisors other than 1 and itself
      var check = 3;
      var numPrime = 1;
      while (numPrime < 10001) {
        if (isPrime(check)) {
          numPrime++;
        }
        check++;
      }

      // Doesn't work for 2
      function isPrime(number) {
        var upperLim = Math.ceil(Math.sqrt(number));
        for (let i = 2; i < upperLim+1; i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
      }

      return --check;
    }

    expect(find10001stPrime()).toBe(104743);
  });

});
