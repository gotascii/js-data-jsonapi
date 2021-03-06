﻿describe('Test Examples', function () {
    
    var ds;
    var example = {};
    
    
    beforeEach(function () {
        ds = new JSData.DS();
        var dsAdapter = new DSJsonApiAdapter.JsonApiAdapter({
            queryTransform: queryTransform
        });
        ds.registerAdapter('jsonApi', dsAdapter, { default: true });
    });
    

    describe('oneToMany Example', function () {
                
        // Load onetomany example
        beforeEach(function () {
            
            // Configure
            example.config = examples.oneToMany.config(ds);

            return loadJSON('/base/examples/oneToMany/oneToMany.json').then(function (json) {
                example.json = json;
            });
        });
        

        it('Should Deserialize the sample oneToMany Json', function () {
            var _this = this;
            
            setTimeout(function () {
                assert.equal(1, _this.requests.length);
                
                _this.requests[_this.requests.length-1].respond(200, { 'Content-Type': 'application/vnd.api+json' }, example.json);
            }, 30);
            
            return example.config.article.find(1).then(function (data) {
                assert.isDefined(example.config.article.get(1), 'Expect article#1 to exist');
                assert.isDefined(example.config.comment.get(1), 'Expect comment#1 to exist');
                assert.isDefined(example.config.comment.get(2), 'Expect comment#2 to exist');
                assert.isDefined(example.config.author.get(9), 'Expect author#9 to exist');
                
                var article = example.config.article.get(1);
                var author = example.config.author.get(9);
                var comment1 = example.config.comment.get(1);
                var comment2 = example.config.comment.get(2);


                assert.equal(article.IsJsonApiReference,  false, 'Expect article to be fully populated');
                assert.equal(comment1.IsJsonApiReference, false, 'Expect comment#1 to be fully populated');
                assert.equal(comment2.IsJsonApiReference, false, 'Expect comment#2 to be fully populated');

                assert.equal(author.IsJsonApiReference, true , 'Expect author to be a reference object only');
            });

        });
    });


    describe('manyToMany Example', function () {
        
        // Load manytomany example
        beforeEach(function () {
            
            // Configure
            example.config = examples.manyToMany.config(ds);
            
            return loadJSON('/base/examples/manyToMany/manyToMany.json').then(function (json) {
                example.json = json;
            });
        });

        it('Should Deserialize the sample manyToMany Json', function () {
            var _this = this;
            
            setTimeout(function () {
                assert.equal(1, _this.requests.length);
                
                _this.requests[_this.requests.length - 1].respond(200, { 'Content-Type': 'application/vnd.api+json' }, example.json);
            }, 30);
            
            return example.config.article.find(1).then(function (data) {
                var article = example.config.article.get(1);
                var person1 = example.config.person.get(1);
                var person2 = example.config.person.get(2);

                assert.isDefined(article, 'Expect article#1 to exist');
                assert.isDefined(person1, 'Expect person#1 to exist');
                assert.isDefined(person2, 'Expect person#2 to exist');

                assert.equal(article.IsJsonApiReference, false, 'Expect article to be fully populated');
                assert.equal(person1.IsJsonApiReference, false, 'Expect person#1 to be fully populated');
                assert.equal(person2.IsJsonApiReference, false, 'Expect person#2 to be fully populated');

                assert.isDefined(article.authors[0], 'Expect article.authors joining data to be populated');
                assert.strictEqual(article.authors[0].article, article, 'Expect article_person person to be person 1');
                assert.strictEqual(article.authors[0].author, person1, 'Expect article_person person to be person 1');
                assert.strictEqual(article.authors[1].author, person2, 'Expect article_person person to be person 2');
                
                assert.strictEqual(article.authors[0].author.articles[0].article, article, 'Expect article stored in joining table to be same article');
                
                assert.isDefined(person1.articles[0], 'Expect person1.articles joining data to be populated');
                assert.strictEqual(person1.articles[0].author, person1, 'Expect person1 author to be person1');
                assert.strictEqual(person1.articles[0].article, article, 'Expect person1 article to be article1');

                assert.isDefined(person2.articles[0], 'Expect person2.articles joining data to be populated');
                assert.strictEqual(person2.articles[0].author, person2, 'Expect person2 author to be person 2');
                assert.strictEqual(person2.articles[0].article, article, 'Expect person2 article to be article1');

            });

        });
    });
 
});