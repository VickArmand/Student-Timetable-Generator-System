const home = (req, res)=>{
    res.render('index', {'title': 'Home'});
}
exports.add = function (num1, num2){
    return (num1 + num2);
}