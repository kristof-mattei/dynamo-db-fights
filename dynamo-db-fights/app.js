var vogels = require("vogels");
var Joi = require("Joi");

vogels.AWS.config.update({ region: "eu-west-1" });

var foobar = vogels.define("foo-bar", {
    tableName: "foo-bar",
    hashKey: "foo",
    rangeKey: "bar",
    schema: {
        "foo": Joi.string(),
        "bar": Joi.string(),
        "name": Joi.string()
    }
});

var itemToInsert = {
    foo: "foo",
    bar: "bar2",
    name: "TEST"
};

var params = {
    ConditionExpression: "foo <> :foo AND name <> :name",
    ExpressionAttributeValues: {
        ":foo": itemToInsert.foo,
        ":name": itemToInsert.name
    }
};

foobar
    .create(itemToInsert, params, function(error, data) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
        }
    });