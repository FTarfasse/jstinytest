
var simpleTestHelper = {
  renderStats: function(tests, failures) {

    var url = window.location.href;
    var urlArrayed = url.split('/');
    var maxIndex = urlArrayed.length - 1;

    var numberOfTests = Object.keys(tests).length;
    var successes = numberOfTests - failures;

    var titleString = urlArrayed[maxIndex];
    var summaryString = 'Ran ' + numberOfTests + ' tests: '
                        + successes + (successes > 1 ? ' successes, ' : ' success, ')
                        + failures + (failures > 1 ? ' failures' : ' failure')
    var title = document.createElement('h2')
    var summaryElement = document.createElement('h1');
    
    title.textContent = titleString;
    summaryElement.textContent = summaryString;
    document.body.appendChild(title);
    document.body.appendChild(summaryElement);

    // creating an image with a meme if only successes
    if(numberOfTests === successes) {
        var yodaImg = 'http://www.quickmeme.com/img/9c/9c973c71365035fcae728a65b287acb8feb6b9cd07e41f6cb86c046c72c8db2c.jpg';
        var babyImg = 'https://memegenerator.net/img/instances/61102706/smell-that-thats-the-smell-of-victory.jpg';
        var rockyImg = 'https://memegenerator.net/img/instances/59217574/thats-how-winning-is-done.jpg';
        var squirrelImg = 'https://media.makeameme.org/created/victory-at-last.jpg';

        var randomNumber = Math.trunc(Math.random() * 100);
        
        if(randomNumber > 75) {
            totalVictoryMemeUrl = yodaImg;
        } else if(randomNumber >50 && randomNumber <= 75) {
            totalVictoryMemeUrl = babyImg;
        } else if (randomNumber > 25 && randomNumber <= 50) {
            totalVictoryMemeUrl = rockyImg;
        } else {
            totalVictoryMemeUrl = squirrelImg;
        };

        var victoryImage = document.createElement('img');
        victoryImage.setAttribute('src', totalVictoryMemeUrl);
        document.body.appendChild(victoryImage);
    }
  }
}

var simpleTest = {

    run: function(tests) {
        var failures = 0;
        for (var testName in tests) {
            var testAction = tests[testName];
            try {
                testAction.apply(this);
                console.log('%c' + testName, "color: green;");
            } catch (e) {
                failures++;
                console.groupCollapsed('%c' + testName, "color: red;");
                console.error(e.stack);
                console.groupEnd();
            }
        }
        
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                simpleTestHelper.renderStats(tests, failures);
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },
};

var fail               = simpleTest.fail.bind(simpleTest),
    assert             = simpleTest.assert.bind(simpleTest),
    assertEquals       = simpleTest.assertEquals.bind(simpleTest),
    eq                 = simpleTest.assertEquals.bind(simpleTest), // alias for assertEquals
    assertStrictEquals = simpleTest.assertStrictEquals.bind(simpleTest),
    tests              = simpleTest.run.bind(simpleTest);
