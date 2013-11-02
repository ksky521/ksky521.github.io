var fs = require('fs');
var path = require('path');
var _ = require('../node_modules/hexo-migrator-wordpress/node_modules/underscore/underscore.js');

function recurse(rootdir, callback, subdir, judgeFunction) {
    var abspath = subdir ? path.join(rootdir, subdir) : rootdir;
    judgeFunction = typeof judgeFunction === 'function' ? judgeFunction : function() {
        return true;
    };
    fs.readdirSync(abspath).forEach(function(filename) {
        var filepath = path.join(abspath, filename);
        if (fs.statSync(filepath).isDirectory() && judgeFunction(filename)) {
            recurse(rootdir, callback, unixifyPath(path.join(subdir, filename)), judgeFunction);
        } else {
            judgeFunction(filename) && callback(unixifyPath(filepath), rootdir, subdir, filename, judgeFunction);
        }
    });

}

var win32 = process.platform === 'win32';
var unixifyPath = function(filepath) {
    if (win32) {
        return filepath.replace(/\\/g, '/');
    } else {
        return filepath;
    }
};
var EOL = '\n';

var startTime = +new Date('2011-08-04 00:00:00');
recurse('./_posts', function(abspath, rootdir, subdir, filename) {
    var content = fs.readFileSync(abspath, 'utf-8').toString();

    var data = content.split('---')[0];
    var obj = parseCover(data, abspath);
    var title = obj.title;
    var date = obj.date;
    var id = obj.id;
    var time = +new Date(date);
    if (time < startTime) {
        var arr = content.split('---');
        arr.splice(0, 1);
        var postTag = obj.tag;
        // console.log(postTag);
        if (postTag.length) {
            postTag = '\n- ' + _.uniq(postTag).join('\n- ');
        }
        content = [
            'title: ' + title,
            'id: ' + id,
            'date: ' + date,
            'tags:' + postTag,
            'categories:\n- ' + (obj.cate === '' ? '乱七八糟' : obj.cate),
            '---',
            arr.join('---').trim()
        ];
        content = content.join(EOL);
        // console.log(obj);
        content = content.replace(/<pre lang=["|'](.*)["|']>/g, '\n```$1\n')
            .replace(/<\/pre>/g, '```')
            .replace(/http:\/\/js8\.in\/wp-content\/uploads/g, '/uploads')
            .replace(/\[\/caption\]/g, '')
            .replace(/\[caption.*?\]/g, '');
        // console.log(content);
        fs.writeFileSync(abspath, content);
        console.log(title);
    }
});


function parseCover(str, url) {
    var arr = str.split('categories:')[1];
    arr = arr.split(EOL);
    var cate = '',
        tags = [];
    var cateReg = /-\s+(.+)/;
    arr.forEach(function(val) {
        if (val = cateReg.exec(val)) {
            var tag = val[1].toLowerCase();
            if (tag === 'web前端开发' || tag === 'css' || tag === 'javascript' || tag === '前端开发') {
                cate = '前端开发';
            } else if (tag === 'php' || tag === '后端运维') {
                cate = '后端运维';
            }
            if (tag === '后端运维' || tag === '前端开发' || tag === '王婆卖瓜' || tag === '读书笔记') {
                return;
            }
            // if (tag === '更新公告') {
            //     fs.unlink(url);
            // }
            tags.push(tag);
        }
    });
    // console.log(tags, cate);
    str = str.split(EOL);
    var obj = {
        tag: tags,
        cate: cate
    };
    var reg = /(\w+)\s?:\s?(.+)/;
    str.forEach(function(val) {
        if (val = reg.exec(val)) {
            obj[val[1]] = val[2];
        }
    });

    return obj;
}
