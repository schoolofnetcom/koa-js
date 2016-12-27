import Koa    from 'koa';
import Chalk  from 'chalk';
import Router from 'koa-router';
import Body   from 'koa-body-parser';
import Override   from 'koa-override';
import Render from 'koa-swig';
import Static from 'koa-static';
import db     from './models/index';
import Person from './models/person';
import path   from 'path';

const koa    = new Koa();
const router = new Router({
    prefix: '/people'
});

koa.context.render = Render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory',
    ext: 'html'
});

koa.use(Body())
koa.use(Override());
koa.use(Static(path.join(__dirname, 'public')));

koa.use(function *(next) {
    yield next;

    console.log(Chalk.green(`${this.request.method} ${this.request.url} - ${this.response.status}`));
});

router
    .get('/', function *() {
        let results = yield Person.find({});
        console.log(results);
        yield this.render('index', {
            people: results
        })
    })
    .get('/new', function *() {
       yield this.render('new')
    })
    .post('/', function *() {
        let person = new Person(this.request.body)

        yield person.save()

        this.redirect('/people')
    })
    .del('/:id', function *() {
        yield Person.remove({
            _id: this.params.id
        });
        this.redirect('/people')
    })

koa.use(router.routes());
koa.use(router.allowedMethods());
koa.listen(3000, () => {
    console.log('This server has been ignite');
});