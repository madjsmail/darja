for (let index = 1; index < 100; index++) {
    var output = '';
    if (index % 3 === 0)
        output += 'Fizz'
    if (index % 5 === 0)
        output += 'Buzz'
    console.log(output ? output : index);
}