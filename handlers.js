const pathlib = require('path');
const db = require( pathlib.join(liliumroot, 'includes', 'db') );

function handleGetFun(cli) {
    cli.sendJSON({ number : Math.random() });
};

function handleRandomPost(cli) {
    db.aggregate(cli._c, 'content', [
        { $match : { status : 'published' } },
        { $sort : { _id : -1 } },
        { $skip : Math.floor(Math.random() * 1000) },
        { $limit : 1 }
    ], array => {
        cli.sendJSON({ randompost : array[0] });
    });
};

function handleReadMyPost(cli) {
    cli.readPostData(data => {
        if (!data) {
            return cli.throwHTTP(400, 'bad request');
        }

        if (data.echo) {
            data.replied = true;

            cli.sendJSON(data);
        } else {
            cli.sendJSON({ read : true })
        }
    });
};

function handleSearchWordInTitle(cli) {
    const word = cli.routeinfo.params.word;

    if (!word) {
        cli.throwHTTP(400, 'missing word');
    } else {
        db.count(cli._c, 'content', { 
            $or : [
                { title : new RegExp(word, 'i') },
                { subtitle : new RegExp(word, 'i') }
            ]
        }, (err, count) => {
            if (err) {
                cli.throwHTTP(500, err);
            } else {
                cli.sendJSON({
                    word, count
                });
            }
        });
    }
};

module.exports = { handleGetFun, handleRandomPost, handleReadMyPost, handleSearchWordInTitle };
